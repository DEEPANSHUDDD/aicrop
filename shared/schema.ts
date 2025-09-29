import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const farmData = pgTable("farm_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  farmName: text("farm_name").notNull(),
  location: jsonb("location").$type<{lat: number, lng: number}>(),
  area: real("area").notNull(),
  soilData: jsonb("soil_data").$type<{
    moisture: number;
    ph: number;
    npk: {
      nitrogen: number;
      phosphorus: number;
      potassium: number;
    };
    temperature: number;
    conductivity: number;
    organicMatter: number;
  }>(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const cropRecommendations = pgTable("crop_recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmId: varchar("farm_id").notNull(),
  cropName: text("crop_name").notNull(),
  matchScore: integer("match_score").notNull(),
  expectedYield: text("expected_yield").notNull(),
  profitMargin: text("profit_margin").notNull(),
  waterRequirement: text("water_requirement").notNull(),
  sustainability: text("sustainability").notNull(),
  marketDemand: text("market_demand").notNull(),
  reasoning: text("reasoning"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const diseaseDetections = pgTable("disease_detections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmId: varchar("farm_id").notNull(),
  imagePath: text("image_path").notNull(),
  diseaseName: text("disease_name"),
  confidence: real("confidence"),
  treatment: text("treatment"),
  severity: text("severity"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  message: text("message").notNull(),
  response: text("response"),
  language: varchar("language").default("en"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const satelliteData = pgTable("satellite_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  farmId: varchar("farm_id").notNull(),
  ndvi: real("ndvi").notNull(),
  fieldBoundary: real("field_boundary").notNull(),
  vegetationHealth: text("vegetation_health").notNull(),
  lastUpdated: timestamp("last_updated").default(sql`now()`),
});

export const marketData = pgTable("market_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cropName: text("crop_name").notNull(),
  currentPrice: real("current_price").notNull(),
  priceChange: real("price_change").notNull(),
  weatherFavorability: integer("weather_favorability").notNull(),
  riskAssessment: text("risk_assessment").notNull(),
  lastUpdated: timestamp("last_updated").default(sql`now()`),
});

export const weatherData = pgTable("weather_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  location: text("location").notNull(),
  temperature: real("temperature").notNull(),
  humidity: integer("humidity").notNull(),
  condition: text("condition").notNull(),
  forecast: jsonb("forecast").$type<Array<{
    day: string;
    high: number;
    low: number;
    icon: string;
  }>>(),
  lastUpdated: timestamp("last_updated").default(sql`now()`),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertFarmDataSchema = createInsertSchema(farmData).omit({ id: true, createdAt: true });
export const insertCropRecommendationSchema = createInsertSchema(cropRecommendations).omit({ id: true, createdAt: true });
export const insertDiseaseDetectionSchema = createInsertSchema(diseaseDetections).omit({ id: true, createdAt: true });
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, createdAt: true });
export const insertSatelliteDataSchema = createInsertSchema(satelliteData).omit({ id: true, lastUpdated: true });
export const insertMarketDataSchema = createInsertSchema(marketData).omit({ id: true, lastUpdated: true });
export const insertWeatherDataSchema = createInsertSchema(weatherData).omit({ id: true, lastUpdated: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type FarmData = typeof farmData.$inferSelect;
export type InsertFarmData = z.infer<typeof insertFarmDataSchema>;
export type CropRecommendation = typeof cropRecommendations.$inferSelect;
export type InsertCropRecommendation = z.infer<typeof insertCropRecommendationSchema>;
export type DiseaseDetection = typeof diseaseDetections.$inferSelect;
export type InsertDiseaseDetection = z.infer<typeof insertDiseaseDetectionSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type SatelliteData = typeof satelliteData.$inferSelect;
export type InsertSatelliteData = z.infer<typeof insertSatelliteDataSchema>;
export type MarketData = typeof marketData.$inferSelect;
export type InsertMarketData = z.infer<typeof insertMarketDataSchema>;
export type WeatherData = typeof weatherData.$inferSelect;
export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;
