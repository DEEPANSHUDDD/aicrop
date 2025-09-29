import OpenAI from "openai";
import { z } from "zod";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

const CropRecommendationSchema = z.object({
  recommendations: z.array(z.object({
    cropName: z.string(),
    matchScore: z.number().min(0).max(100),
    expectedYield: z.string(),
    profitMargin: z.string(),
    waterRequirement: z.string(),
    sustainability: z.string(),
    marketDemand: z.string(),
    reasoning: z.string()
  }))
});

const DiseaseAnalysisSchema = z.object({
  diseaseName: z.string(),
  confidence: z.number().min(0).max(1),
  severity: z.string(),
  treatment: z.string(),
  preventionTips: z.string()
});

const ChatResponseSchema = z.object({
  response: z.string(),
  followUpQuestions: z.array(z.string()).optional()
});

export async function generateCropRecommendations(data: {
  soilData: any;
  weatherData: any;
  marketData: any;
  location: string;
}): Promise<any[]> {
  try {
    const prompt = `You are an expert agricultural AI advisor. Based on the following data, provide crop recommendations for an Indian farmer:

Soil Data: ${JSON.stringify(data.soilData)}
Weather Data: ${JSON.stringify(data.weatherData)}
Market Data: ${JSON.stringify(data.marketData)}
Location: ${data.location}

Please provide 3-5 crop recommendations with match scores (0-100), expected yield, profit margins in Indian Rupees, water requirements, sustainability rating, and market demand. Consider Indian agricultural conditions and crops suitable for the region.

Respond with JSON in this format: { "recommendations": [{ "cropName": "string", "matchScore": number, "expectedYield": "string", "profitMargin": "string", "waterRequirement": "string", "sustainability": "string", "marketDemand": "string", "reasoning": "string" }] }`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert agricultural AI advisor specializing in Indian farming conditions and crops."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    const validated = CropRecommendationSchema.parse(result);
    return validated.recommendations;
  } catch (error) {
    console.error('Error generating crop recommendations:', error);
    throw new Error('Failed to generate crop recommendations');
  }
}

export async function analyzeDiseaseFromImage(base64Image: string): Promise<{
  diseaseName: string;
  confidence: number;
  severity: string;
  treatment: string;
  preventionTips: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert plant pathologist. Analyze crop disease images and provide diagnosis with treatment recommendations suitable for Indian farmers."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this crop image for diseases. Provide disease name, confidence score (0-1), severity level, treatment recommendations, and prevention tips. Focus on diseases common in Indian agriculture. Respond with JSON: { \"diseaseName\": \"string\", \"confidence\": number, \"severity\": \"string\", \"treatment\": \"string\", \"preventionTips\": \"string\" }"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 2048
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    const validated = DiseaseAnalysisSchema.parse(result);
    return validated;
  } catch (error) {
    console.error('Error analyzing disease image:', error);
    throw new Error('Failed to analyze disease image');
  }
}

export async function generateChatResponse(
  message: string, 
  context: any, 
  language: string = 'en'
): Promise<{ response: string; followUpQuestions?: string[] }> {
  try {
    const languageMap: { [key: string]: string } = {
      'hi': 'Hindi',
      'bn': 'Bengali',
      'te': 'Telugu',
      'mr': 'Marathi',
      'ta': 'Tamil',
      'gu': 'Gujarati',
      'kn': 'Kannada',
      'ml': 'Malayalam',
      'en': 'English'
    };

    const responseLanguage = languageMap[language] || 'English';
    
    const prompt = `You are an AI agricultural assistant helping Indian farmers. 

User's question: ${message}
Context (farm data): ${JSON.stringify(context)}
Response language: ${responseLanguage}

Provide helpful agricultural advice based on the context. If responding in a language other than English, ensure the response is culturally appropriate and uses agricultural terms familiar to farmers in that region.

Respond with JSON: { "response": "string", "followUpQuestions": ["string"] }`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an expert agricultural AI assistant specializing in Indian farming. Respond in ${responseLanguage} if specified.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    const validated = ChatResponseSchema.parse(result);
    return validated;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw new Error('Failed to generate chat response');
  }
}

export async function analyzeMarketTrends(cropName: string, region: string): Promise<{
  priceAnalysis: string;
  demandForecast: string;
  recommendations: string;
}> {
  try {
    const prompt = `Analyze market trends for ${cropName} in ${region}, India. Provide:
1. Current price analysis and trends
2. Demand forecast for the next 3-6 months
3. Recommendations for farmers

Consider seasonal patterns, government policies, and regional market conditions.

Respond with JSON: { "priceAnalysis": "string", "demandForecast": "string", "recommendations": "string" }`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert agricultural market analyst specializing in Indian commodity markets."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error analyzing market trends:', error);
    throw new Error('Failed to analyze market trends');
  }
}
