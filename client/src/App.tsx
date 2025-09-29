import { useState, useEffect } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from 'framer-motion';
import { AdvancedLandingPage } from './components/AdvancedLandingPage';
import { Header } from './components/Header';
import { AIAssistantChat } from './components/AIAssistantChat';
import { SoilAnalysisPanel } from './components/SoilAnalysisPanel';
import { DiseaseScanner } from './components/DiseaseScanner';
import { CropRecommendations } from './components/CropRecommendations';
import { MarketAnalysis } from './components/MarketAnalysis';
import { VoiceAssistant } from './components/VoiceAssistant';
import { SatelliteMonitor } from './components/SatelliteMonitor';
import { WeatherWidget } from './components/WeatherWidget';
import { DemoSection } from './components/DemoSection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { TechnologyStack } from './components/TechnologyStack';
import { LanguageSupport } from './components/LanguageSupport';
import { AnalyticsChart } from './components/AnalyticsChart';
import { FarmMap } from './components/FarmMap';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  Satellite,
  Brain,
  TrendingUp,
  Leaf,
  MessageSquare,
  Mic,
  Camera,
  BarChart3,
  Globe,
  Zap,
  Activity,
  CheckCircle,
  Map,
  Cloud,
  Smartphone,
  Wifi,
  WifiOff,
  Target,
  Users,
  Shield,
  Sparkles,
  Home,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NotFound from "@/pages/not-found";

// Enhanced type definitions
interface DashboardData {
  soilData: {
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
  };
  satelliteData: {
    ndvi: number;
    fieldBoundary: number;
    vegetationHealth: string;
    lastUpdated: string;
  };
  weatherData: {
    temperature: number;
    humidity: number;
    condition: string;
    forecast: Array<{
      day: string;
      high: number;
      low: number;
      icon: string;
    }>;
  };
  recommendations: Array<{
    id: string;
    crop: string;
    matchScore: number;
    expectedYield: string;
    profitMargin: string;
    waterRequirement: string;
    sustainability: string;
    marketDemand: string;
  }>;
  marketData: {
    currentPrice: number;
    weatherFavorability: number;
    riskAssessment: string;
    priceChange: number;
  };
}

function AppContent() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState('overview');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const { toast } = useToast();

  // Load dashboard data when entering dashboard
  useEffect(() => {
    if (currentView === 'dashboard' && !dashboardData) {
      loadDashboardData();
    }
  }, [currentView, dashboardData]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use demo data
      setDashboardData({
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
        satelliteData: {
          ndvi: 0.72,
          fieldBoundary: 4.8,
          vegetationHealth: 'Healthy vegetation detected',
          lastUpdated: '2 hours ago'
        },
        weatherData: {
          temperature: 32,
          humidity: 65,
          condition: 'Clear sky',
          forecast: [
            { day: 'Today', high: 32, low: 24, icon: '☀️' },
            { day: 'Tomorrow', high: 30, low: 22, icon: '⛅' },
            { day: 'Thu', high: 28, low: 20, icon: '🌧️' }
          ]
        },
        recommendations: [
          {
            id: '1',
            crop: 'Pearl Millet',
            matchScore: 95,
            expectedYield: '2.5-3 tons/ha',
            profitMargin: '₹45,000/ha',
            waterRequirement: 'Low (350mm)',
            sustainability: 'Excellent',
            marketDemand: 'High'
          },
          {
            id: '2',
            crop: 'Groundnut',
            matchScore: 88,
            expectedYield: '1.5-2 tons/ha',
            profitMargin: '₹35,000/ha',
            waterRequirement: 'Medium (500mm)',
            sustainability: 'Good',
            marketDemand: 'High'
          }
        ],
        marketData: {
          currentPrice: 2150,
          weatherFavorability: 85,
          riskAssessment: 'Low',
          priceChange: 5
        }
      });

      toast({
        title: "Success",
        description: "Dashboard data loaded successfully!"
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterDashboard = () => {
    setCurrentView('dashboard');
    toast({
      title: "Welcome",
      description: "Welcome to AI CropAdvisor Dashboard!"
    });
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setActiveTab('overview');
    toast({
      title: "Info",
      description: "Returned to landing page"
    });
  };

  const handleStartDemo = (demoType: string) => {
    setCurrentView('dashboard');
    
    // Navigate to appropriate section based on demo type
    switch (demoType) {
      case 'ai-recommendations':
        setActiveTab('recommendations');
        toast({
          title: "Demo Started",
          description: "AI Recommendations demo started!"
        });
        break;
      case 'disease-detection':
        setActiveTab('overview');
        toast({
          title: "Demo Activated",
          description: "Disease Scanner demo activated!"
        });
        break;
      case 'voice-assistant':
        setActiveTab('chat');
        setIsVoiceActive(true);
        toast({
          title: "Voice Activated",
          description: "Voice Assistant activated!"
        });
        break;
      case 'satellite-monitoring':
        setActiveTab('monitoring');
        toast({
          title: "Demo Started",
          description: "Satellite Monitoring demo started!"
        });
        break;
      case 'offline-mode':
        setIsOfflineMode(true);
        setActiveTab('demo');
        toast({
          title: "Offline Mode",
          description: "Offline Mode activated!"
        });
        break;
      case 'market-analysis':
        setActiveTab('analysis');
        toast({
          title: "Demo Started",
          description: "Market Analysis demo started!"
        });
        break;
      default:
        setActiveTab('demo');
        toast({
          title: "Demo Started",
          description: "Live demo started!"
        });
    }
  };

  const handleNavigate = (section: string) => {
    if (section === 'landing') {
      handleBackToLanding();
      return;
    }
    
    if (currentView === 'landing') {
      setCurrentView('dashboard');
    }
    
    setActiveTab(section);
    toast({
      title: "Navigation",
      description: `Navigated to ${section.charAt(0).toUpperCase() + section.slice(1)}`
    });
  };

  const handleVoiceToggle = (active: boolean) => {
    setIsVoiceActive(active);
    toast({
      title: active ? "Voice Activated" : "Voice Deactivated",
      description: active ? "Voice Assistant activated!" : "Voice Assistant deactivated!"
    });
  };

  const handleChatToggle = (open: boolean) => {
    setIsChatOpen(open);
    toast({
      title: open ? "Chat Opened" : "Chat Closed",
      description: open ? "AI Chat opened!" : "AI Chat closed!"
    });
  };

  const handleOfflineToggle = () => {
    const newOfflineState = !isOfflineMode;
    setIsOfflineMode(newOfflineState);
    toast({
      title: newOfflineState ? "Offline Mode" : "Online Mode",
      description: newOfflineState ? "Offline Mode enabled!" : "Online Mode enabled!"
    });
  };

  // Landing Page View
  if (currentView === 'landing') {
    return (
      <AdvancedLandingPage 
        onEnterDashboard={handleEnterDashboard}
        onStartDemo={handleStartDemo}
      />
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <Header 
        onVoiceToggle={handleVoiceToggle}
        onChatToggle={handleChatToggle}
        isVoiceActive={isVoiceActive}
        isChatOpen={isChatOpen}
        onNavigate={handleNavigate}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6 text-sm text-slate-400"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToLanding}
            className="text-slate-400 hover:text-white hover:bg-slate-700 p-2"
            data-testid="button-back-to-landing"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Landing
          </Button>
          <span>/</span>
          <span className="text-white capitalize">{activeTab.replace('-', ' ')}</span>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 backdrop-blur-sm mb-8"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="max-w-3xl">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                >
                  AI CropAdvisor Dashboard
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-blue-100 mb-6"
                >
                  Complete agricultural intelligence platform with real-time insights and AI-powered recommendations.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-blue-200"
                >
                  <button 
                    onClick={() => handleNavigate('monitoring')}
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                    data-testid="button-satellite-data"
                  >
                    <Satellite className="w-4 h-4" />
                    Real-time Satellite Data
                  </button>
                  <button 
                    onClick={() => handleNavigate('recommendations')}
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                    data-testid="button-ai-engine"
                  >
                    <Brain className="w-4 h-4" />
                    AI/ML Engine
                  </button>
                  <button 
                    onClick={() => handleNavigate('chat')}
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                    data-testid="button-languages"
                  >
                    <Globe className="w-4 h-4" />
                    8+ Indian Languages
                  </button>
                  <button 
                    onClick={handleOfflineToggle}
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                    data-testid="button-offline-ready"
                  >
                    <WifiOff className="w-4 h-4" />
                    Offline Ready
                  </button>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-4 mt-6"
                >
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => handleNavigate('demo')}
                    data-testid="button-live-demo"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Try Live Demo
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={handleOfflineToggle}
                    data-testid="button-test-offline"
                  >
                    {isOfflineMode ? <Wifi className="w-5 h-5 mr-2" /> : <WifiOff className="w-5 h-5 mr-2" />}
                    {isOfflineMode ? 'Go Online' : 'Test Offline'}
                  </Button>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="hidden lg:block cursor-pointer"
                onClick={() => handleNavigate('overview')}
              >
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                      <Brain className="w-20 h-20 text-blue-400" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -left-2">
                    <Badge className="bg-blue-600 text-white">
                      SIH 2025
                    </Badge>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between mb-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300">System Online</span>
            </div>
            <button 
              onClick={() => handleNavigate('overview')}
              className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer"
              data-testid="button-active-farmers"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">1,247 Active Farmers</span>
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">99.9% Uptime</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isOfflineMode && (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                <WifiOff className="w-3 h-3 mr-1" />
                Offline Mode
              </Badge>
            )}
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Target className="w-3 h-3 mr-1" />
              95% Accuracy
            </Badge>
          </div>
        </motion.div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-slate-700">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-blue-600"
              data-testid="tab-overview"
            >
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="demo" 
              className="data-[state=active]:bg-purple-600"
              data-testid="tab-demo"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Live Demo
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="data-[state=active]:bg-green-600"
              data-testid="tab-analysis"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="recommendations" 
              className="data-[state=active]:bg-yellow-600"
              data-testid="tab-recommendations"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Recommendations
            </TabsTrigger>
            <TabsTrigger 
              value="monitoring" 
              className="data-[state=active]:bg-cyan-600"
              data-testid="tab-monitoring"
            >
              <Satellite className="w-4 h-4 mr-2" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="data-[state=active]:bg-pink-600"
              data-testid="tab-chat"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Soil Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <SoilAnalysisPanel data={dashboardData?.soilData} isLoading={isLoading} />
              </motion.div>

              {/* Disease Scanner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <DiseaseScanner />
              </motion.div>

              {/* Voice Assistant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <VoiceAssistant 
                  isActive={isVoiceActive}
                  onToggle={handleVoiceToggle}
                />
              </motion.div>
            </div>

            {/* Analytics and Map Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <AnalyticsChart />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FarmMap />
              </motion.div>
            </div>

            {/* Satellite Monitor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <SatelliteMonitor data={dashboardData?.satelliteData} isLoading={isLoading} />
            </motion.div>
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
            <DemoSection />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <MarketAnalysis data={dashboardData?.marketData} isLoading={isLoading} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <WeatherWidget data={dashboardData?.weatherData} isLoading={isLoading} />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnalyticsChart expanded={true} />
            </motion.div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CropRecommendations 
                recommendations={dashboardData?.recommendations} 
                isLoading={isLoading} 
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SatelliteMonitor 
                  data={dashboardData?.satelliteData} 
                  isLoading={isLoading}
                  expanded={true}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FarmMap expanded={true} />
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AIAssistantChat isOpen={true} />
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Feature Showcase - Only show on overview */}
        {activeTab === 'overview' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <FeatureShowcase />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8"
            >
              <TechnologyStack />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-8 mb-12"
            >
              <LanguageSupport />
            </motion.div>
          </>
        )}
      </main>

      {/* Floating AI Chat */}
      <AnimatePresence>
        {isChatOpen && activeTab !== 'chat' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <AIAssistantChat 
              isOpen={isChatOpen} 
              onClose={() => handleChatToggle(false)}
              isFloating={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/90 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <button 
                onClick={handleBackToLanding}
                className="flex items-center gap-2 mb-4 hover:text-blue-400 transition-colors"
                data-testid="button-footer-logo"
              >
                <Brain className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-lg text-white">AI CropAdvisor</span>
              </button>
              <p className="text-sm text-slate-400">
                Empowering farmers with AI-driven crop recommendations, multilingual support, and offline capabilities.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-3">Core Features</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button 
                    onClick={() => handleNavigate('recommendations')}
                    className="hover:text-blue-400 transition-colors"
                    data-testid="button-footer-recommendations"
                  >
                    • AI Crop Recommendations
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('overview')}
                    className="hover:text-blue-400 transition-colors"
                    data-testid="button-footer-disease-detection"
                  >
                    • Disease Detection
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('chat')}
                    className="hover:text-blue-400 transition-colors"
                    data-testid="button-footer-voice-assistant"
                  >
                    • Voice Assistant (8+ Languages)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleOfflineToggle}
                    className="hover:text-blue-400 transition-colors"
                    data-testid="button-footer-offline-mode"
                  >
                    • Offline Mode
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-3">Technology</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Machine Learning</li>
                <li>• Satellite Data Integration</li>
                <li>• Interactive Demo Platform</li>
                <li>• Natural Language Processing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-3">Languages Supported</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>🇮🇳 हिंदी • Hindi</li>
                <li>🇮🇳 বাংলা • Bengali</li>
                <li>🇮🇳 मराठी • Marathi</li>
                <li>🇮🇳 ગુજરાતી • Gujarati</li>
                <li>+4 more languages</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              © 2025 AI CropAdvisor • Smart India Hackathon 2025 • Built for Indian Farmers
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleNavigate('demo')}
              data-testid="button-footer-sih-demo"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Full SIH Demo
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={AppContent} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
