import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Brain, 
  Camera, 
  Satellite, 
  Mic, 
  TrendingUp,
  Leaf,
  Globe,
  Shield,
  Zap,
  Eye,
  Monitor,
  Smartphone
} from 'lucide-react';

interface DemoFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  demoType: string;
  features: string[];
}

export function DemoSection() {
  const [activeDemo, setActiveDemo] = useState<string>('ai-recommendations');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoFeatures: DemoFeature[] = [
    {
      id: 'ai-recommendations',
      title: 'AI Crop Recommendations',
      description: 'Experience intelligent crop selection based on real-time data analysis',
      icon: Brain,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      demoType: 'ai-recommendations',
      features: [
        'Soil condition analysis',
        'Weather pattern integration',
        'Market demand forecasting',
        'Profit margin calculations'
      ]
    },
    {
      id: 'disease-detection',
      title: 'Disease Detection',
      description: 'AI-powered plant disease identification using computer vision',
      icon: Camera,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      demoType: 'disease-detection',
      features: [
        'Real-time image analysis',
        '95%+ accuracy rate',
        'Treatment recommendations',
        'Prevention strategies'
      ]
    },
    {
      id: 'satellite-monitoring',
      title: 'Satellite Monitoring',
      description: 'Real-time field monitoring with NDVI and vegetation health analysis',
      icon: Satellite,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      demoType: 'satellite-monitoring',
      features: [
        'NDVI vegetation index',
        'Field boundary detection',
        'Growth stage monitoring',
        'Stress area identification'
      ]
    },
    {
      id: 'voice-assistant',
      title: 'Voice Assistant',
      description: 'Multi-language voice interface for hands-free farming assistance',
      icon: Mic,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      demoType: 'voice-assistant',
      features: [
        '8+ Indian languages',
        'Natural conversation',
        'Voice commands',
        'Audio responses'
      ]
    },
    {
      id: 'market-analysis',
      title: 'Market Intelligence',
      description: 'Real-time market analysis and price forecasting',
      icon: TrendingUp,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      demoType: 'market-analysis',
      features: [
        'Price trend analysis',
        'Demand forecasting',
        'Risk assessment',
        'Optimal selling timing'
      ]
    },
    {
      id: 'offline-mode',
      title: 'Offline Capability',
      description: 'Full functionality without internet connectivity',
      icon: Shield,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      demoType: 'offline-mode',
      features: [
        'Local data caching',
        'Offline AI processing',
        'Sync when online',
        'PWA technology'
      ]
    }
  ];

  const demoSteps = [
    'Initializing AI models...',
    'Analyzing input data...',
    'Processing recommendations...',
    'Generating insights...',
    'Demo complete!'
  ];

  const handlePlayDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const handleResetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const currentFeature = demoFeatures.find(f => f.id === activeDemo);

  return (
    <div className="space-y-8">
      {/* Demo Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          <span className="gradient-text">Interactive Demo</span>
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Experience the power of AI-driven agriculture technology with our live interactive demonstrations
        </p>
      </motion.div>

      <Tabs value={activeDemo} onValueChange={setActiveDemo} className="space-y-6">
        {/* Demo Feature Selection */}
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-2 bg-transparent h-auto p-2">
          {demoFeatures.map((feature, index) => (
            <TabsTrigger
              key={feature.id}
              value={feature.id}
              className="flex flex-col items-center gap-3 p-4 h-auto data-[state=active]:bg-slate-700 border border-slate-600 rounded-lg"
              data-testid={`demo-tab-${feature.id}`}
            >
              <div className={`p-3 rounded-full ${feature.bgColor}`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <div className="text-center">
                <div className="font-medium text-white text-sm">{feature.title}</div>
                <div className="text-xs text-slate-400 mt-1">{feature.description}</div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Demo Content */}
        {demoFeatures.map((feature) => (
          <TabsContent key={feature.id} value={feature.id} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Demo Control Panel */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-300">{feature.description}</p>
                    
                    {/* Feature List */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">Key Features:</h4>
                      <ul className="space-y-1">
                        {feature.features.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                            <div className={`w-1.5 h-1.5 rounded-full ${feature.color.replace('text-', 'bg-')}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Demo Controls */}
                    <div className="space-y-3 pt-4 border-t border-slate-700">
                      <div className="flex gap-2">
                        <Button
                          onClick={handlePlayDemo}
                          disabled={isPlaying}
                          className={`flex-1 ${feature.bgColor} ${feature.color} hover:bg-opacity-30`}
                          data-testid="button-play-demo"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Running...
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start Demo
                            </>
                          )}
                        </Button>
                        
                        <Button
                          onClick={handleResetDemo}
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300"
                          data-testid="button-reset-demo"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Demo Progress */}
                      {(isPlaying || currentStep > 0) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          <div className="text-sm text-slate-400">Demo Progress:</div>
                          <div className="space-y-1">
                            {demoSteps.map((step, index) => (
                              <div
                                key={index}
                                className={`text-xs p-2 rounded ${
                                  index < currentStep ? 'bg-green-500/20 text-green-400' :
                                  index === currentStep ? 'bg-blue-500/20 text-blue-400' :
                                  'bg-slate-700/30 text-slate-500'
                                }`}
                              >
                                {index < currentStep ? '✓' : index === currentStep && isPlaying ? '⟳' : '○'} {step}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Demo Visualization */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-slate-700 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Live Demo Visualization</CardTitle>
                      <Badge className={`${feature.bgColor} ${feature.color} border-current`}>
                        <Sparkles className="w-3 h-3 mr-1" />
                        Interactive
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-slate-700/30 rounded-lg relative overflow-hidden">
                      {/* Demo Visualization Content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {!isPlaying && currentStep === 0 ? (
                          <div className="text-center">
                            <feature.icon className={`w-16 h-16 ${feature.color} mx-auto mb-4`} />
                            <p className="text-slate-400">Click "Start Demo" to begin the interactive demonstration</p>
                          </div>
                        ) : (
                          <div className="w-full h-full p-6">
                            {/* Simulated Demo Interface */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  isPlaying ? 'bg-green-400 animate-pulse' : 'bg-slate-400'
                                }`} />
                                <span className="text-white font-medium">
                                  {feature.title} Demo
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-600/30 rounded-lg">
                                  <div className="text-sm text-slate-400 mb-2">Input Data</div>
                                  <div className="space-y-2">
                                    {[...Array(3)].map((_, i) => (
                                      <div
                                        key={i}
                                        className={`h-2 rounded-full ${
                                          currentStep > i ? feature.color.replace('text-', 'bg-') : 'bg-slate-700'
                                        } transition-all duration-500`}
                                        style={{ width: `${60 + i * 20}%` }}
                                      />
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="p-4 bg-slate-600/30 rounded-lg">
                                  <div className="text-sm text-slate-400 mb-2">AI Processing</div>
                                  <div className="space-y-2">
                                    {[...Array(3)].map((_, i) => (
                                      <div
                                        key={i}
                                        className={`h-2 rounded-full ${
                                          currentStep > i + 1 ? 'bg-emerald-400' : 'bg-slate-700'
                                        } transition-all duration-500`}
                                        style={{ width: `${40 + i * 30}%` }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              {currentStep >= demoSteps.length - 1 && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center"
                                >
                                  <Eye className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                  <p className="text-green-400 font-medium">Demo Complete!</p>
                                  <p className="text-sm text-slate-300 mt-1">
                                    Experience the full functionality in the main dashboard
                                  </p>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Platform Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Web Dashboard</h3>
            <p className="text-sm text-slate-300">
              Full-featured web interface with real-time data visualization and comprehensive farm management tools
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Mobile Ready</h3>
            <p className="text-sm text-slate-300">
              Progressive Web App that works seamlessly across all devices with offline capabilities
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Real-time AI</h3>
            <p className="text-sm text-slate-300">
              Powered by latest AI models with real-time processing and intelligent recommendations
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
