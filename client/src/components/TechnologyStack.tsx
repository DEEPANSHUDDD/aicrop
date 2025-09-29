import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  Smartphone,
  Globe,
  Code,
  Layers,
  Monitor,
  Satellite,
  Lock,
  ArrowRight,
  CheckCircle,
  Cpu,
  Server
} from 'lucide-react';

interface TechCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  technologies: Technology[];
}

interface Technology {
  name: string;
  description: string;
  version?: string;
  type: 'core' | 'ai' | 'data' | 'infrastructure';
  logo?: string;
}

export function TechnologyStack() {
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const techCategories: TechCategory[] = [
    {
      id: 'frontend',
      title: 'Frontend & UI',
      description: 'Modern, responsive user interface built with cutting-edge web technologies',
      icon: Monitor,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      technologies: [
        { name: 'React 18', description: 'Modern UI library with concurrent features', version: '18.3.1', type: 'core' },
        { name: 'TypeScript', description: 'Type-safe JavaScript development', version: '5.6.3', type: 'core' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework', version: '3.4.17', type: 'core' },
        { name: 'Framer Motion', description: 'Advanced animations and interactions', version: '11.13.1', type: 'core' },
        { name: 'Shadcn/UI', description: 'Beautiful and accessible UI components', type: 'core' },
        { name: 'Lucide Icons', description: 'Beautiful & consistent icon library', type: 'core' }
      ]
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Advanced AI models and machine learning capabilities for intelligent farming',
      icon: Brain,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      technologies: [
        { name: 'OpenAI GPT-5', description: 'Latest AI model for natural language processing', version: 'gpt-5', type: 'ai' },
        { name: 'Computer Vision', description: 'Advanced image analysis for disease detection', type: 'ai' },
        { name: 'TensorFlow', description: 'Machine learning framework', type: 'ai' },
        { name: 'Speech Recognition', description: 'Multi-language voice processing', type: 'ai' },
        { name: 'Predictive Analytics', description: 'ML-powered forecasting models', type: 'ai' },
        { name: 'Neural Networks', description: 'Deep learning for pattern recognition', type: 'ai' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      description: 'Robust server infrastructure and API services for reliable data processing',
      icon: Server,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      technologies: [
        { name: 'Node.js', description: 'High-performance JavaScript runtime', version: '20.x', type: 'core' },
        { name: 'Express.js', description: 'Fast, minimalist web framework', version: '4.21.2', type: 'core' },
        { name: 'RESTful APIs', description: 'Standard HTTP API architecture', type: 'core' },
        { name: 'WebSocket', description: 'Real-time bidirectional communication', type: 'core' },
        { name: 'Zod Validation', description: 'TypeScript-first schema validation', version: '3.24.2', type: 'core' },
        { name: 'Rate Limiting', description: 'API protection and performance optimization', type: 'infrastructure' }
      ]
    },
    {
      id: 'data',
      title: 'Data & Storage',
      description: 'Advanced data management and storage solutions for agricultural intelligence',
      icon: Database,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      technologies: [
        { name: 'PostgreSQL', description: 'Advanced relational database', version: '16.x', type: 'data' },
        { name: 'Drizzle ORM', description: 'Type-safe database toolkit', version: '0.39.1', type: 'data' },
        { name: 'Redis Cache', description: 'In-memory data structure store', type: 'data' },
        { name: 'Time Series DB', description: 'Optimized for sensor data storage', type: 'data' },
        { name: 'Data Validation', description: 'Comprehensive data integrity checks', type: 'data' },
        { name: 'Backup Systems', description: 'Automated data backup and recovery', type: 'infrastructure' }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure & DevOps',
      description: 'Cloud-native infrastructure for scalability, security, and reliability',
      icon: Cloud,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      technologies: [
        { name: 'Docker', description: 'Containerization platform', type: 'infrastructure' },
        { name: 'Kubernetes', description: 'Container orchestration', type: 'infrastructure' },
        { name: 'AWS Cloud', description: 'Scalable cloud infrastructure', type: 'infrastructure' },
        { name: 'CDN', description: 'Global content delivery network', type: 'infrastructure' },
        { name: 'Load Balancing', description: 'High availability and performance', type: 'infrastructure' },
        { name: 'Monitoring', description: 'Real-time system monitoring', type: 'infrastructure' }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      description: 'Enterprise-grade security measures to protect farmer data and privacy',
      icon: Shield,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      technologies: [
        { name: 'HTTPS/TLS', description: 'End-to-end encryption', type: 'infrastructure' },
        { name: 'JWT Auth', description: 'Secure authentication tokens', type: 'infrastructure' },
        { name: 'CORS Policy', description: 'Cross-origin request security', type: 'infrastructure' },
        { name: 'Data Encryption', description: 'AES-256 data protection', type: 'infrastructure' },
        { name: 'Privacy Controls', description: 'GDPR compliant data handling', type: 'infrastructure' },
        { name: 'Security Audits', description: 'Regular security assessments', type: 'infrastructure' }
      ]
    }
  ];

  const currentCategory = techCategories.find(cat => cat.id === selectedCategory);

  const getTypeColor = (type: Technology['type']) => {
    switch (type) {
      case 'core': return 'text-blue-400 bg-blue-500/20';
      case 'ai': return 'text-emerald-400 bg-emerald-500/20';
      case 'data': return 'text-cyan-400 bg-cyan-500/20';
      case 'infrastructure': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Technology <span className="gradient-text">Stack</span>
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Built with cutting-edge technologies for performance, scalability, and reliability
        </p>
      </motion.div>

      {/* Category Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {techCategories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-lg border transition-all text-left ${
              selectedCategory === category.id
                ? 'bg-slate-700 border-slate-600 ring-2 ring-emerald-500/50'
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid={`tech-category-${category.id}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${category.bgColor}`}>
                <category.icon className={`w-5 h-5 ${category.color}`} />
              </div>
              <h3 className="font-semibold text-white">{category.title}</h3>
            </div>
            <p className="text-sm text-slate-400">{category.description}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Selected Category Details */}
      {currentCategory && (
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${currentCategory.bgColor}`}>
                  <currentCategory.icon className={`w-8 h-8 ${currentCategory.color}`} />
                </div>
                <div>
                  <CardTitle className="text-white">{currentCategory.title}</CardTitle>
                  <p className="text-slate-400 text-sm mt-1">{currentCategory.description}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCategory.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-slate-400" />
                        <h4 className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                          {tech.name}
                        </h4>
                      </div>
                      {tech.version && (
                        <Badge className="text-xs bg-slate-600 text-slate-300">
                          v{tech.version}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-slate-400 mb-3">{tech.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getTypeColor(tech.type)}`}>
                        {tech.type}
                      </Badge>
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Technical Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">High Performance</h3>
            <p className="text-sm text-slate-300 mb-4">
              Optimized for speed with sub-second response times and efficient resource utilization
            </p>
            <div className="text-2xl font-bold text-emerald-400 mb-1">&lt;500ms</div>
            <div className="text-xs text-slate-400">Average Response Time</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Scalable Architecture</h3>
            <p className="text-sm text-slate-300 mb-4">
              Microservices architecture designed to scale horizontally with growing user base
            </p>
            <div className="text-2xl font-bold text-blue-400 mb-1">99.9%</div>
            <div className="text-xs text-slate-400">System Uptime</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Enterprise Security</h3>
            <p className="text-sm text-slate-300 mb-4">
              Bank-grade security with end-to-end encryption and privacy-first design
            </p>
            <div className="text-2xl font-bold text-purple-400 mb-1">256-bit</div>
            <div className="text-xs text-slate-400">AES Encryption</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Architecture Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              System Architecture Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-700/30 rounded-lg relative overflow-hidden">
              {/* Simplified Architecture Visualization */}
              <div className="absolute inset-0 p-6">
                <div className="grid grid-cols-4 gap-4 h-full">
                  {/* Frontend Layer */}
                  <div className="flex flex-col items-center justify-center bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <Monitor className="w-8 h-8 text-blue-400 mb-2" />
                    <div className="text-sm font-medium text-white">Frontend</div>
                    <div className="text-xs text-slate-400">React + TypeScript</div>
                  </div>
                  
                  {/* API Gateway */}
                  <div className="flex flex-col items-center justify-center bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <Globe className="w-8 h-8 text-purple-400 mb-2" />
                    <div className="text-sm font-medium text-white">API Gateway</div>
                    <div className="text-xs text-slate-400">Express.js</div>
                  </div>
                  
                  {/* AI Services */}
                  <div className="flex flex-col items-center justify-center bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                    <Brain className="w-8 h-8 text-emerald-400 mb-2" />
                    <div className="text-sm font-medium text-white">AI Services</div>
                    <div className="text-xs text-slate-400">OpenAI + ML</div>
                  </div>
                  
                  {/* Data Layer */}
                  <div className="flex flex-col items-center justify-center bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                    <Database className="w-8 h-8 text-cyan-400 mb-2" />
                    <div className="text-sm font-medium text-white">Data Layer</div>
                    <div className="text-xs text-slate-400">PostgreSQL</div>
                  </div>
                </div>
                
                {/* Connection Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                              refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="rgb(34, 197, 94)" />
                      </marker>
                    </defs>
                    <line x1="25%" y1="50%" x2="37%" y2="50%" 
                          stroke="rgb(34, 197, 94)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="50%" y1="50%" x2="62%" y2="50%" 
                          stroke="rgb(34, 197, 94)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="75%" y1="50%" x2="87%" y2="50%" 
                          stroke="rgb(34, 197, 94)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-center bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Built for the Future of Agriculture
        </h3>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          Our technology stack is carefully chosen to deliver the best possible experience 
          for farmers while ensuring scalability, security, and performance.
        </p>
        <Button 
          size="lg" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          data-testid="button-explore-technology"
        >
          <Code className="w-5 h-5 mr-2" />
          Explore Our Technology
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
