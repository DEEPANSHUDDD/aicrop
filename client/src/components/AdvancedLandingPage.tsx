import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Satellite, 
  Brain, 
  Leaf, 
  Globe, 
  Camera, 
  TrendingUp, 
  Shield, 
  Smartphone,
  Zap,
  Users,
  Award,
  Play,
  ChevronRight,
  Check
} from 'lucide-react';

interface AdvancedLandingPageProps {
  onEnterDashboard: () => void;
  onStartDemo: (demoType: string) => void;
}

export function AdvancedLandingPage({ onEnterDashboard, onStartDemo }: AdvancedLandingPageProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Get personalized crop suggestions based on soil, weather, and market data",
      color: "text-emerald-400"
    },
    {
      icon: Camera,
      title: "Disease Detection",
      description: "Instantly identify crop diseases using AI-powered image analysis",
      color: "text-blue-400"
    },
    {
      icon: Satellite,
      title: "Satellite Monitoring",
      description: "Real-time field monitoring with NDVI and vegetation health analysis",
      color: "text-purple-400"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Available in 8+ Indian languages with voice assistance",
      color: "text-yellow-400"
    }
  ];

  const stats = [
    { value: "1,247", label: "Active Farmers", icon: Users },
    { value: "95%", label: "Accuracy Rate", icon: Award },
    { value: "8+", label: "Languages", icon: Globe },
    { value: "24/7", label: "AI Support", icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
                Smart India Hackathon 2025
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">AI CropAdvisor</span>
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto">
                Revolutionizing Indian agriculture with AI-powered crop recommendations, 
                disease detection, and multi-language support
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button 
                size="lg" 
                onClick={onEnterDashboard}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
                data-testid="button-enter-dashboard"
              >
                <Play className="w-5 h-5 mr-2" />
                Enter Dashboard
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onStartDemo('live-demo')}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-4 text-lg"
                data-testid="button-live-demo"
              >
                <Zap className="w-5 h-5 mr-2" />
                Live Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <Leaf className="w-10 h-10 text-emerald-400" />
          </div>
        </div>
        <div className="absolute top-40 right-10 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Satellite className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Powerful <span className="gradient-text">AI Features</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Advanced agricultural intelligence platform designed specifically for Indian farmers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setActiveFeature(index)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeFeature === index 
                      ? 'bg-slate-800/80 border-emerald-500/50' 
                      : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
                  }`}
                  data-testid={`feature-card-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-slate-700/50 ${feature.color}`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                      <p className="text-slate-300">{feature.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Demo Area */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Try Our AI Features</h3>
                  <p className="text-slate-300">Experience the power of agricultural AI</p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={() => onStartDemo('ai-recommendations')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    data-testid="button-demo-recommendations"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    AI Crop Recommendations
                  </Button>
                  <Button 
                    onClick={() => onStartDemo('disease-detection')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    data-testid="button-demo-disease"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Disease Detection
                  </Button>
                  <Button 
                    onClick={() => onStartDemo('voice-assistant')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    data-testid="button-demo-voice"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Voice Assistant
                  </Button>
                </div>

                {/* Animated background */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Built with <span className="gradient-text">Cutting-Edge Tech</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Powered by advanced AI, satellite data, and modern web technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "OpenAI GPT-5", description: "Latest AI model for intelligent recommendations" },
              { icon: Satellite, title: "Satellite Integration", description: "Real-time NDVI and field monitoring" },
              { icon: Smartphone, title: "PWA Support", description: "Works offline with local data caching" },
              { icon: Globe, title: "Multi-Language", description: "8+ Indian languages with voice support" },
              { icon: Shield, title: "Enterprise Security", description: "Secure data handling and privacy protection" },
              { icon: TrendingUp, title: "Market Analysis", description: "Real-time price trends and forecasting" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <tech.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <CardTitle className="text-white">{tech.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-emerald-900/50 to-blue-900/50 rounded-3xl p-12 border border-emerald-500/20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join thousands of farmers already using AI CropAdvisor to increase yields and reduce risks
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onEnterDashboard}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
                data-testid="button-cta-get-started"
              >
                <Check className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onStartDemo('full-demo')}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-4 text-lg"
                data-testid="button-cta-watch-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                Free for farmers
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                Works offline
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                Multi-language support
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
