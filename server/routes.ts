import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  generateCropRecommendations, 
  analyzeDiseaseFromImage, 
  generateChatResponse,
  analyzeMarketTrends 
} from "./services/openai";
import { 
  insertChatMessageSchema, 
  insertDiseaseDetectionSchema,
  insertCropRecommendationSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get dashboard data
  app.get("/api/dashboard/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      const farms = await storage.getFarmData(userId);
      if (farms.length === 0) {
        return res.status(404).json({ message: "No farm data found" });
      }
      
      const farm = farms[0];
      const satelliteData = await storage.getSatelliteData(farm.id);
      const weatherData = await storage.getWeatherData("Delhi, India");
      const marketData = await storage.getMarketData("Wheat");
      const recommendations = await storage.getCropRecommendations(farm.id);
      
      res.json({
        soilData: farm.soilData,
        satelliteData,
        weatherData,
        marketData,
        recommendations
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Generate AI crop recommendations
  app.post("/api/recommendations/generate", async (req, res) => {
    try {
      const { farmId, location } = req.body;
      
      const farms = await storage.getFarmData("demo-user-1");
      const farm = farms.find(f => f.id === farmId);
      if (!farm) {
        return res.status(404).json({ message: "Farm not found" });
      }
      
      const weatherData = await storage.getWeatherData(location || "Delhi, India");
      const marketData = await storage.getMarketData("Wheat");
      
      const recommendations = await generateCropRecommendations({
        soilData: farm.soilData,
        weatherData,
        marketData,
        location: location || "Delhi, India"
      });
      
      // Store recommendations
      for (const rec of recommendations) {
        const recommendationData = insertCropRecommendationSchema.parse({
          farmId,
          cropName: rec.cropName,
          matchScore: rec.matchScore,
          expectedYield: rec.expectedYield,
          profitMargin: rec.profitMargin,
          waterRequirement: rec.waterRequirement,
          sustainability: rec.sustainability,
          marketDemand: rec.marketDemand,
          reasoning: rec.reasoning
        });
        
        await storage.createCropRecommendation(recommendationData);
      }
      
      res.json({ recommendations });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({ message: "Failed to generate recommendations" });
    }
  });

  // Disease detection from image
  app.post("/api/disease/analyze", async (req, res) => {
    try {
      const { farmId, imageData } = req.body;
      
      if (!imageData) {
        return res.status(400).json({ message: "Image data is required" });
      }
      
      // Remove data URL prefix if present
      const base64Image = imageData.replace(/^data:image\/[a-z]+;base64,/, "");
      
      const analysis = await analyzeDiseaseFromImage(base64Image);
      
      // Store detection result
      const detectionData = insertDiseaseDetectionSchema.parse({
        farmId,
        imagePath: "uploaded_image.jpg",
        diseaseName: analysis.diseaseName,
        confidence: analysis.confidence,
        treatment: analysis.treatment,
        severity: analysis.severity
      });
      
      const detection = await storage.createDiseaseDetection(detectionData);
      
      res.json({ 
        detection: {
          ...analysis,
          id: detection.id
        }
      });
    } catch (error) {
      console.error("Error analyzing disease:", error);
      res.status(500).json({ message: "Failed to analyze disease" });
    }
  });

  // AI Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { userId, message, language } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }
      
      // Get farm context
      const farms = await storage.getFarmData(userId || "demo-user-1");
      const context = farms.length > 0 ? {
        farm: farms[0],
        satelliteData: await storage.getSatelliteData(farms[0].id),
        weatherData: await storage.getWeatherData("Delhi, India")
      } : {};
      
      const aiResponse = await generateChatResponse(message, context, language);
      
      // Store chat message
      const chatData = insertChatMessageSchema.parse({
        userId: userId || "demo-user-1",
        message,
        response: aiResponse.response,
        language: language || "en"
      });
      
      await storage.createChatMessage(chatData);
      
      res.json(aiResponse);
    } catch (error) {
      console.error("Error processing chat:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  // Get chat history
  app.get("/api/chat/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const messages = await storage.getChatMessages(userId);
      res.json({ messages });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  // Market analysis
  app.get("/api/market/:cropName", async (req, res) => {
    try {
      const { cropName } = req.params;
      const { region } = req.query;
      
      const marketData = await storage.getMarketData(cropName);
      const analysis = await analyzeMarketTrends(cropName, region as string || "India");
      
      res.json({
        marketData,
        analysis
      });
    } catch (error) {
      console.error("Error fetching market analysis:", error);
      res.status(500).json({ message: "Failed to fetch market analysis" });
    }
  });

  // Get satellite data
  app.get("/api/satellite/:farmId", async (req, res) => {
    try {
      const { farmId } = req.params;
      const satelliteData = await storage.getSatelliteData(farmId);
      
      if (!satelliteData) {
        return res.status(404).json({ message: "No satellite data found" });
      }
      
      res.json(satelliteData);
    } catch (error) {
      console.error("Error fetching satellite data:", error);
      res.status(500).json({ message: "Failed to fetch satellite data" });
    }
  });

  // Get weather data
  app.get("/api/weather/:location", async (req, res) => {
    try {
      const { location } = req.params;
      const weatherData = await storage.getWeatherData(location);
      
      if (!weatherData) {
        return res.status(404).json({ message: "No weather data found" });
      }
      
      res.json(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
