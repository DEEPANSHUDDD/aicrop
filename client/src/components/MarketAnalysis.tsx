import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Shield, 
  AlertTriangle, 
  Target,
  Zap,
  Clock,
  Globe
} from 'lucide-react';

interface MarketData {
  currentPrice: number;
  weatherFavorability: number;
  riskAssessment: string;
  priceChange: number;
}

interface MarketAnalysisProps {
  data?: MarketData;
  isLoading?: boolean;
}

export function MarketAnalysis({ data, isLoading }: MarketAnalysisProps) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'high': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded mb-2"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center">
          <AlertTriangle className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-slate-400 mb-4">No market data available</p>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            Refresh Data
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card className="bg-slate-800/50 border-slate-700 h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="w-5 h-5 text-green-400" />
              Market Analysis
            </CardTitle>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Clock className="w-3 h-3 mr-1" />
              Real-time
            </Badge>
          </div>
          <p className="text-sm text-slate-400">Wheat Market • Delhi Mandi</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Price */}
          <div className="p-4 glass-effect rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="font-medium text-white">Current Price</span>
              </div>
              <div className="flex items-center gap-2">
                {data.priceChange > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-medium ${
                  data.priceChange > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {data.priceChange > 0 ? '+' : ''}{data.priceChange}%
                </span>
              </div>
            </div>
            
            <div className="text-3xl font-bold text-white mb-2">
              ₹{data.currentPrice.toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">Per Quintal</div>
          </div>

          {/* Price Chart Simulation */}
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              7-Day Price Trend
            </h4>
            <div className="relative h-24">
              <svg className="w-full h-full">
                <defs>
                  <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgb(34, 197, 94)', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: 'rgb(34, 197, 94)', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,60 Q50,40 100,45 T200,35 T300,40 T400,30" 
                  stroke="rgb(34, 197, 94)" 
                  strokeWidth="2" 
                  fill="none"
                />
                <path 
                  d="M0,60 Q50,40 100,45 T200,35 T300,40 T400,30 L400,96 L0,96 Z" 
                  fill="url(#priceGradient)"
                />
              </svg>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>7 days ago</span>
              <span>Today</span>
            </div>
          </div>

          {/* Market Indicators */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Market Indicators</h4>
            
            {/* Weather Favorability */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Weather Favorability
                </span>
                <span className="text-sm font-medium text-white">{data.weatherFavorability}%</span>
              </div>
              <Progress 
                value={data.weatherFavorability} 
                className="h-2 bg-slate-700"
                data-testid="progress-weather-favorability"
              />
              <div className="text-xs text-slate-400">
                Good weather conditions supporting stable prices
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  Risk Assessment
                </span>
                <Badge className={getRiskColor(data.riskAssessment)}>
                  {data.riskAssessment} Risk
                </Badge>
              </div>
              <div className="text-xs text-slate-400">
                Based on price volatility, demand patterns, and seasonal factors
              </div>
            </div>
          </div>

          {/* Market Insights */}
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h5 className="font-medium text-green-400 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Market Insights
            </h5>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                <span>Demand is higher than usual due to festival season</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                <span>Export opportunities to Bangladesh looking promising</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                <span>Monitor monsoon patterns for next quarter pricing</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 glass-effect rounded-lg text-center">
              <div className="text-lg font-bold text-green-400">Sell</div>
              <div className="text-xs text-slate-400">Recommended action</div>
            </div>
            <div className="p-3 glass-effect rounded-lg text-center">
              <div className="text-lg font-bold text-white">₹2,200</div>
              <div className="text-xs text-slate-400">Target price</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300">
              <Globe className="w-4 h-4 mr-2" />
              View Global Trends
            </Button>
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              Set Price Alert
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
