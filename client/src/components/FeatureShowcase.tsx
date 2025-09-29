import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Satellite, 
  Camera, 
  Globe, 
  Shield, 
  Zap, 
  TrendingUp,
  Leaf,
  Users,
  Award,
  Clock,
  MapPin,
  Smartphone,
  Wifi,
  WifiOff,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  category: string;
  benefits: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export function FeatureShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features: Feature[] = [
    {
      id: 'ai-recommendations',
      title: 'AI-Powered Crop Recommendations',
      description: 'Get personalized crop suggestions based on comprehensive data analysis including soil conditions, weather patterns, and market trends.',
      icon: Brain,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      category: 'ai',
      benefits: [
        'Increase crop yield by up to 25%',
        'Reduce farming risks significantly',
        'Optimize resource utilization',
        'Data-driven decision making'
      ],
      stats: [
        { label: 'Accuracy Rate', value: '95%' },
        { label: 'Yield Increase', value: '25%' }
      ]
    },
    {
      id: 'disease-detection',
      title: 'Advanced Disease Detection',
      description: 'AI-powered computer vision technology that instantly identifies plant diseases from photos with treatment recommendations.',
      icon: Camera,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      category: 'ai',
      benefits: [
        'Early disease detection',
        'Prevent crop loss',
        'Targeted treatment plans',
        'Reduce pesticide usage'
      ],
      stats: [
        { label: 'Detection Speed', value: '<2s' },
        { label: 'Disease Coverage', value: '200+' }
      ]
    },
    {
      id: 'satellite-monitoring',
      title: 'Real-time Satellite Monitoring',
      description: 'Monitor your fields 24/7 with satellite imagery, NDVI analysis, and vegetation health tracking.',
      icon: Satellite,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      category: 'monitoring',
      benefits: [
        'Real-time field monitoring',
        'NDVI vegetation analysis',
        'Growth stage tracking',
        'Stress area identification'
      ],
      stats: [
        { label: 'Update Frequency', value: 'Daily' },
        { label: 'Resolution', value: '10m' }
      ]
    },
    {
      id: 'voice-assistant',
      title: 'Multi-language Voice Assistant',
      description: 'Hands-free farming assistance with support for 8+ Indian languages and natural conversation capabilities.',
      icon: Globe,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      category: 'accessibility',
      benefits: [
        'Voice commands in native language',
        'Hands-free operation',
        'Natural conversation flow',
        'Audio responses'
      ],
      stats: [
        { label: 'Languages', value: '8+' },
        { label: 'Response Time', value: '<1s' }
      ]
    },
    {
      id: 'market-intelligence',
      title: 'Market Intelligence & Analytics',
      description: 'Real-time market analysis, price forecasting, and optimal selling recommendations powered by AI.',
      icon: TrendingUp,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      category: 'analytics',
      benefits: [
        'Price trend analysis',
        'Demand forecasting',
        'Risk assessment',
        'Optimal timing insights'
      ],
      stats: [
        { label: 'Market Coverage', value: '100+' },
        { label: 'Forecast Accuracy', value: '87%' }
      ]
    },
    {
      id: 'offline-capability',
      title: 'Offline-First Technology',
      description: 'Full functionality without internet connectivity using progressive web app technology and local AI processing.',
      icon: Shield,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      category: 'infrastructure',
      benefits: [
        'Works without internet',
        'Local data caching',
        'Offline AI processing',
        'Auto-sync when online'
      ],
      stats: [
        { label: 'Offline Features', value: '100%' },
        { label: 'Data Sync', value: 'Auto' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Features', icon: Star },
    { id: 'ai', label: 'AI & ML', icon: Brain },
    { id: 'monitoring', label: 'Monitoring', icon: Satellite },
    { id: 'accessibility', label: 'Accessibility', icon: Globe },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'infrastructure', label: 'Infrastructure', icon: Shield }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Powerful <span className="gradient-text">Features</span>
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Comprehensive agricultural intelligence platform designed specifically for Indian farmers
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            data-testid={`category-filter-${category.id}`}
          >
            <category.icon className="w-4 h-4" />
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredFeature(feature.id)}
            onHoverEnd={() => setHoveredFeature(null)}
            className="group"
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 h-full hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <Badge className={`${feature.bgColor} ${feature.color} border-current`}>
                    {feature.category}
                  </Badge>
                </div>
                <CardTitle className="text-white group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="font-medium text-white text-sm">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700">
                  {feature.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`text-lg font-bold ${feature.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Hover Action */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredFeature === feature.id ? 1 : 0,
                    height: hoveredFeature === feature.id ? 'auto' : 0
                  }}
                  className="overflow-hidden"
                >
                  <Button 
                    size="sm" 
                    className={`w-full ${feature.bgColor} ${feature.color} hover:bg-opacity-30`}
                    data-testid={`button-explore-${feature.id}`}
                  >
                    Explore Feature
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Platform Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { icon: Users, label: 'Active Farmers', value: '1,247+', color: 'text-blue-400' },
          { icon: Award, label: 'Accuracy Rate', value: '95%', color: 'text-green-400' },
          { icon: Clock, label: 'Uptime', value: '99.9%', color: 'text-yellow-400' },
          { icon: MapPin, label: 'Regions Covered', value: '28+', color: 'text-purple-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700"
          >
            <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center bg-gradient-to-r from-emerald-900/50 to-blue-900/50 rounded-2xl p-8 border border-emerald-500/20"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Ready to Transform Your Farming?
        </h3>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          Join thousands of farmers who are already using AI CropAdvisor to increase their yields, 
          reduce risks, and make data-driven farming decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            data-testid="button-get-started"
          >
            <Zap className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
            data-testid="button-learn-more"
          >
            Learn More
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
