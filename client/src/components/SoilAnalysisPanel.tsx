import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Layers, 
  Droplets, 
  Thermometer, 
  Zap, 
  Leaf, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

interface SoilData {
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
}

interface SoilAnalysisPanelProps {
  data?: SoilData;
  isLoading?: boolean;
}

export function SoilAnalysisPanel({ data, isLoading }: SoilAnalysisPanelProps) {
  const getNPKStatus = (value: number, nutrient: string) => {
    const ranges = {
      nitrogen: { low: 100, high: 150 },
      phosphorus: { low: 40, high: 60 },
      potassium: { low: 60, high: 100 }
    };
    
    const range = ranges[nutrient as keyof typeof ranges];
    if (value < range.low) return { status: 'low', color: 'text-red-400', bg: 'bg-red-400' };
    if (value > range.high) return { status: 'high', color: 'text-yellow-400', bg: 'bg-yellow-400' };
    return { status: 'optimal', color: 'text-green-400', bg: 'bg-green-400' };
  };

  const getPHStatus = (ph: number) => {
    if (ph < 6.0) return { status: 'acidic', color: 'text-red-400', recommendation: 'Add lime to increase pH' };
    if (ph > 7.5) return { status: 'alkaline', color: 'text-yellow-400', recommendation: 'Add organic matter to lower pH' };
    return { status: 'optimal', color: 'text-green-400', recommendation: 'pH level is optimal for most crops' };
  };

  const getMoistureStatus = (moisture: number) => {
    if (moisture < 25) return { status: 'low', color: 'text-red-400', icon: AlertTriangle };
    if (moisture > 45) return { status: 'high', color: 'text-blue-400', icon: Droplets };
    return { status: 'optimal', color: 'text-green-400', icon: CheckCircle };
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Layers className="w-5 h-5 text-emerald-400" />
            Soil Analysis
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
            <Layers className="w-5 h-5 text-emerald-400" />
            Soil Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center">
          <AlertTriangle className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-slate-400 mb-4">No soil data available</p>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </CardContent>
      </Card>
    );
  }

  const phStatus = getPHStatus(data.ph);
  const moistureStatus = getMoistureStatus(data.moisture);
  const nitrogenStatus = getNPKStatus(data.npk.nitrogen, 'nitrogen');
  const phosphorusStatus = getNPKStatus(data.npk.phosphorus, 'phosphorus');
  const potassiumStatus = getNPKStatus(data.npk.potassium, 'potassium');

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
              <Layers className="w-5 h-5 text-emerald-400" />
              Soil Analysis
            </CardTitle>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Live Data
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* NPK Levels */}
          <div className="space-y-4">
            <h4 className="font-medium text-white mb-3">NPK Nutrients (kg/ha)</h4>
            
            {/* Nitrogen */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Nitrogen (N)</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{data.npk.nitrogen}</span>
                  <div className={`w-2 h-2 rounded-full ${nitrogenStatus.bg}`}></div>
                </div>
              </div>
              <Progress 
                value={(data.npk.nitrogen / 200) * 100} 
                className="h-2 bg-slate-700"
                data-testid="progress-nitrogen"
              />
            </div>

            {/* Phosphorus */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Phosphorus (P)</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{data.npk.phosphorus}</span>
                  <div className={`w-2 h-2 rounded-full ${phosphorusStatus.bg}`}></div>
                </div>
              </div>
              <Progress 
                value={(data.npk.phosphorus / 80) * 100} 
                className="h-2 bg-slate-700"
                data-testid="progress-phosphorus"
              />
            </div>

            {/* Potassium */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Potassium (K)</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{data.npk.potassium}</span>
                  <div className={`w-2 h-2 rounded-full ${potassiumStatus.bg}`}></div>
                </div>
              </div>
              <Progress 
                value={(data.npk.potassium / 120) * 100} 
                className="h-2 bg-slate-700"
                data-testid="progress-potassium"
              />
            </div>
          </div>

          {/* Other Soil Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {/* pH Level */}
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">pH Level</span>
              </div>
              <div className="text-lg font-bold text-white">{data.ph}</div>
              <div className={`text-xs ${phStatus.color}`}>{phStatus.status}</div>
            </div>

            {/* Moisture */}
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Moisture</span>
              </div>
              <div className="text-lg font-bold text-white">{data.moisture}%</div>
              <div className={`text-xs flex items-center gap-1 ${moistureStatus.color}`}>
                <moistureStatus.icon className="w-3 h-3" />
                {moistureStatus.status}
              </div>
            </div>

            {/* Temperature */}
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-slate-300">Temperature</span>
              </div>
              <div className="text-lg font-bold text-white">{data.temperature}°C</div>
              <div className="text-xs text-slate-400">Optimal range</div>
            </div>

            {/* Organic Matter */}
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">Organic Matter</span>
              </div>
              <div className="text-lg font-bold text-white">{data.organicMatter}%</div>
              <div className="text-xs text-green-400">Good</div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <h5 className="font-medium text-emerald-400 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Recommendations
            </h5>
            <p className="text-sm text-slate-300 mb-2">{phStatus.recommendation}</p>
            {nitrogenStatus.status !== 'optimal' && (
              <p className="text-sm text-slate-300">
                • {nitrogenStatus.status === 'low' ? 'Apply nitrogen-rich fertilizer' : 'Reduce nitrogen application'}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
