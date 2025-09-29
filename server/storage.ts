import { 
  type User, 
  type InsertUser,
  type FarmData,
  type InsertFarmData,
  type CropRecommendation,
  type InsertCropRecommendation,
  type DiseaseDetection,
  type InsertDiseaseDetection,
  type ChatMessage,
  type InsertChatMessage,
  type SatelliteData,
  type InsertSatelliteData,
  type MarketData,
  type InsertMarketData,
  type WeatherData,
  type InsertWeatherData
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Farm data operations
  getFarmData(userId: string): Promise<FarmData[]>;
  createFarmData(farmData: InsertFarmData): Promise<FarmData>;
  updateFarmData(id: string, farmData: Partial<InsertFarmData>): Promise<FarmData | undefined>;
  
  // Crop recommendations
  getCropRecommendations(farmId: string): Promise<CropRecommendation[]>;
  createCropRecommendation(recommendation: InsertCropRecommendation): Promise<CropRecommendation>;
  
  // Disease detection
  getDiseaseDetections(farmId: string): Promise<DiseaseDetection[]>;
  createDiseaseDetection(detection: InsertDiseaseDetection): Promise<DiseaseDetection>;
  
  // Chat messages
  getChatMessages(userId: string, limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Satellite data
  getSatelliteData(farmId: string): Promise<SatelliteData | undefined>;
  createOrUpdateSatelliteData(data: InsertSatelliteData): Promise<SatelliteData>;
  
  // Market data
  getMarketData(cropName: string): Promise<MarketData | undefined>;
  createOrUpdateMarketData(data: InsertMarketData): Promise<MarketData>;
  
  // Weather data
  getWeatherData(location: string): Promise<WeatherData | undefined>;
  createOrUpdateWeatherData(data: InsertWeatherData): Promise<WeatherData>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private farmData: Map<string, FarmData>;
  private cropRecommendations: Map<string, CropRecommendation>;
  private diseaseDetections: Map<string, DiseaseDetection>;
  private chatMessages: Map<string, ChatMessage>;
  private satelliteData: Map<string, SatelliteData>;
  private marketData: Map<string, MarketData>;
  private weatherData: Map<string, WeatherData>;

  constructor() {
    this.users = new Map();
    this.farmData = new Map();
    this.cropRecommendations = new Map();
    this.diseaseDetections = new Map();
    this.chatMessages = new Map();
    this.satelliteData = new Map();
    this.marketData = new Map();
    this.weatherData = new Map();
    
    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo user
    const demoUser: User = {
      id: "demo-user-1",
      username: "demo_farmer",
      password: "hashed_password"
    };
    this.users.set(demoUser.id, demoUser);

    // Create demo farm
    const demoFarm: FarmData = {
      id: "demo-farm-1",
      userId: "demo-user-1",
      farmName: "Green Valley Farm",
      location: { lat: 28.6139, lng: 77.2090 },
      area: 5.2,
      soilData: {
        moisture: 34,
        ph: 6.8,
        npk: {
          nitrogen: 120,
          phosphorus: 45,
          potassium: 78
        },
        temperature: 24.5,
        conductivity: 1.2,
        organicMatter: 3.8
      },
      createdAt: new Date()
    };
    this.farmData.set(demoFarm.id, demoFarm);

    // Create demo satellite data
    const demoSatellite: SatelliteData = {
      id: "demo-satellite-1",
      farmId: "demo-farm-1",
      ndvi: 0.72,
      fieldBoundary: 4.8,
      vegetationHealth: "Healthy vegetation detected",
      lastUpdated: new Date()
    };
    this.satelliteData.set(demoSatellite.id, demoSatellite);

    // Create demo weather data
    const demoWeather: WeatherData = {
      id: "demo-weather-1",
      location: "Delhi, India",
      temperature: 32,
      humidity: 65,
      condition: "Clear sky",
      forecast: [
        { day: "Today", high: 32, low: 24, icon: "☀️" },
        { day: "Tomorrow", high: 30, low: 22, icon: "⛅" },
        { day: "Thu", high: 28, low: 20, icon: "🌧️" }
      ],
      lastUpdated: new Date()
    };
    this.weatherData.set(demoWeather.id, demoWeather);

    // Create demo market data
    const demoMarket: MarketData = {
      id: "demo-market-1",
      cropName: "Wheat",
      currentPrice: 2150,
      priceChange: 5,
      weatherFavorability: 85,
      riskAssessment: "Low",
      lastUpdated: new Date()
    };
    this.marketData.set(demoMarket.id, demoMarket);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFarmData(userId: string): Promise<FarmData[]> {
    return Array.from(this.farmData.values()).filter(farm => farm.userId === userId);
  }

  async createFarmData(insertFarmData: InsertFarmData): Promise<FarmData> {
    const id = randomUUID();
    const farmData: FarmData = { ...insertFarmData, id, createdAt: new Date() };
    this.farmData.set(id, farmData);
    return farmData;
  }

  async updateFarmData(id: string, updates: Partial<InsertFarmData>): Promise<FarmData | undefined> {
    const existing = this.farmData.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.farmData.set(id, updated);
    return updated;
  }

  async getCropRecommendations(farmId: string): Promise<CropRecommendation[]> {
    return Array.from(this.cropRecommendations.values()).filter(rec => rec.farmId === farmId);
  }

  async createCropRecommendation(insertRecommendation: InsertCropRecommendation): Promise<CropRecommendation> {
    const id = randomUUID();
    const recommendation: CropRecommendation = { ...insertRecommendation, id, createdAt: new Date() };
    this.cropRecommendations.set(id, recommendation);
    return recommendation;
  }

  async getDiseaseDetections(farmId: string): Promise<DiseaseDetection[]> {
    return Array.from(this.diseaseDetections.values()).filter(detection => detection.farmId === farmId);
  }

  async createDiseaseDetection(insertDetection: InsertDiseaseDetection): Promise<DiseaseDetection> {
    const id = randomUUID();
    const detection: DiseaseDetection = { ...insertDetection, id, createdAt: new Date() };
    this.diseaseDetections.set(id, detection);
    return detection;
  }

  async getChatMessages(userId: string, limit: number = 50): Promise<ChatMessage[]> {
    const messages = Array.from(this.chatMessages.values())
      .filter(msg => msg.userId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(0, limit);
    return messages.reverse();
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = { ...insertMessage, id, createdAt: new Date() };
    this.chatMessages.set(id, message);
    return message;
  }

  async getSatelliteData(farmId: string): Promise<SatelliteData | undefined> {
    return Array.from(this.satelliteData.values()).find(data => data.farmId === farmId);
  }

  async createOrUpdateSatelliteData(insertData: InsertSatelliteData): Promise<SatelliteData> {
    const existing = Array.from(this.satelliteData.values()).find(data => data.farmId === insertData.farmId);
    
    if (existing) {
      const updated = { ...existing, ...insertData, lastUpdated: new Date() };
      this.satelliteData.set(existing.id, updated);
      return updated;
    } else {
      const id = randomUUID();
      const data: SatelliteData = { ...insertData, id, lastUpdated: new Date() };
      this.satelliteData.set(id, data);
      return data;
    }
  }

  async getMarketData(cropName: string): Promise<MarketData | undefined> {
    return Array.from(this.marketData.values()).find(data => data.cropName.toLowerCase() === cropName.toLowerCase());
  }

  async createOrUpdateMarketData(insertData: InsertMarketData): Promise<MarketData> {
    const existing = Array.from(this.marketData.values()).find(data => data.cropName.toLowerCase() === insertData.cropName.toLowerCase());
    
    if (existing) {
      const updated = { ...existing, ...insertData, lastUpdated: new Date() };
      this.marketData.set(existing.id, updated);
      return updated;
    } else {
      const id = randomUUID();
      const data: MarketData = { ...insertData, id, lastUpdated: new Date() };
      this.marketData.set(id, data);
      return data;
    }
  }

  async getWeatherData(location: string): Promise<WeatherData | undefined> {
    return Array.from(this.weatherData.values()).find(data => data.location.toLowerCase().includes(location.toLowerCase()));
  }

  async createOrUpdateWeatherData(insertData: InsertWeatherData): Promise<WeatherData> {
    const existing = Array.from(this.weatherData.values()).find(data => data.location.toLowerCase() === insertData.location.toLowerCase());
    
    if (existing) {
      const updated = { ...existing, ...insertData, lastUpdated: new Date() };
      this.weatherData.set(existing.id, updated);
      return updated;
    } else {
      const id = randomUUID();
      const data: WeatherData = { ...insertData, id, lastUpdated: new Date() };
      this.weatherData.set(id, data);
      return data;
    }
  }
}

export const storage = new MemStorage();
