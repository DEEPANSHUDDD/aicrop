import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Satellite, 
  MapPin, 
  Layers, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Download,
  Eye,
  Maximize2
} from 'lucide-react';

interface SatelliteData {
  ndvi: number;
  fieldBoundary: number;
  vegetationHealth: string;
  lastUpdated: string;
}

interface SatelliteMonitorProps {
  data?: SatelliteData;
  isLoading?: boolean;
  expanded?: boolean;
}

export function SatelliteMonitor({ data, isLoading, expanded = false }: SatelliteMonitorProps) {
  const getNDVIStatus = (ndvi: number) => {
    if (ndvi >= 0.7) return { status: 'excellent', color: 'text-green-400', bg: 'bg-green-400' };
    if (ndvi >= 0.5) return { status: 'good', color: 'text-yellow-400', bg: 'bg-yellow-400' };
    if (ndvi >= 0.3) return { status: 'moderate', color: 'text-orange-400', bg: 'bg-orange-400' };
    return { status: 'poor', color: 'text-red-400', bg: 'bg-red-400' };
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Satellite className="w-5 h-5 text-cyan-400" />
            Satellite Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded mb-2"></div>
              <div className="h-16 bg-slate-700 rounded"></div>
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
            <Satellite className="w-5 h-5 text-cyan-400" />
            Satellite Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center">
          <AlertTriangle className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-slate-400 mb-4">No satellite data available</p>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </CardContent>
      </Card>
    );
  }

  const ndviStatus = getNDVIStatus(data.ndvi);

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
              <Satellite className="w-5 h-5 text-cyan-400" />
              Satellite Monitoring
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                <Activity className="w-3 h-3 mr-1" />
                Live Feed
              </Badge>
              <span className="text-xs text-slate-400">{data.lastUpdated}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Satellite Map View */}
          <div className="relative">
            <div className={`${expanded ? 'h-80' : 'h-48'} bg-gradient-to-br from-green-900 to-emerald-800 rounded-xl relative overflow-hidden transition-all`}>
              {/* Grid pattern to simulate satellite imagery */}
              <div className="absolute inset-0 opacity-30">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {[...Array(48)].map((_, i) => (
                    <div 
                      key={i}
                      className={`border border-green-500/20 ${
                        i % 3 === 0 ? 'bg-green-600/40' : 
                        i % 3 === 1 ? 'bg-green-700/40' : 'bg-yellow-600/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Field Markers */}
              <div className="absolute top-4 left-4 glass-effect px-3 py-2 rounded-lg">
                <div className="text-sm font-medium text-white">Field A - Wheat</div>
                <div className="text-xs text-cyan-400">NDVI: {data.ndvi}</div>
              </div>
              
              <div className="absolute bottom-4 right-4 glass-effect px-3 py-2 rounded-lg">
                <div className="text-sm font-medium text-white">Area: {data.fieldBoundary} ha</div>
                <div className="text-xs text-emerald-400">Boundary Detected</div>
              </div>
              
              {/* Health Indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className={`w-6 h-6 ${ndviStatus.bg} rounded-full animate-ping opacity-75`}></div>
                  <div className={`absolute inset-0 w-6 h-6 ${ndviStatus.bg} rounded-full`}></div>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 glass-effect px-2 py-1 rounded text-xs whitespace-nowrap">
                  Health Monitor
                </div>
              </div>

              {/* Overlay Controls */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="bg-black/30 hover:bg-black/50 text-white"
                  data-testid="button-fullscreen-satellite"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="bg-black/30 hover:bg-black/50 text-white"
                  data-testid="button-satellite-layers"
                >
                  <Layers className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* NDVI and Health Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* NDVI Index */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="36" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent" 
                    className="text-slate-600"
                  />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="36" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="226" 
                    strokeDashoffset={226 - (data.ndvi * 226)}
                    className={ndviStatus.color}
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-lg font-bold ${ndviStatus.color}`}>{data.ndvi}</span>
                </div>
              </div>
              <div className="text-sm text-slate-300">NDVI Index</div>
              <div className={`text-xs ${ndviStatus.color} capitalize`}>{ndviStatus.status}</div>
            </div>
            
            {/* Vegetation Health */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
              </div>
              <div className="text-sm text-slate-300">Vegetation Health</div>
              <div className="text-xs text-emerald-400">{data.vegetationHealth}</div>
            </div>
            
            {/* Field Boundary */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="36" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent" 
                    className="text-slate-600"
                  />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="36" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="226" 
                    strokeDashoffset="45"
                    className="text-blue-400"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-400">{data.fieldBoundary}</span>
                </div>
              </div>
              <div className="text-sm text-slate-300">Field Area (ha)</div>
              <div className="text-xs text-blue-400">Boundary Mapped</div>
            </div>
          </div>

          {/* NDVI Analysis */}
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <h5 className="font-medium text-cyan-400 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Vegetation Analysis
            </h5>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Crop Vigor:</span>
                <span className={ndviStatus.color}>
                  {ndviStatus.status === 'excellent' ? 'Very High' :
                   ndviStatus.status === 'good' ? 'High' :
                   ndviStatus.status === 'moderate' ? 'Moderate' : 'Low'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Chlorophyll Content:</span>
                <span className="text-green-400">Optimal</span>
              </div>
              <div className="flex justify-between">
                <span>Stress Indicators:</span>
                <span className="text-green-400">None Detected</span>
              </div>
              <div className="flex justify-between">
                <span>Growth Stage:</span>
                <span className="text-white">Vegetative</span>
              </div>
            </div>
          </div>

          {/* Satellite Data Quality */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">Resolution</span>
              </div>
              <div className="text-white font-medium">10m/pixel</div>
              <div className="text-xs text-slate-400">High quality</div>
            </div>
            
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-green-400" />
                <span className="text-slate-300">Cloud Cover</span>
              </div>
              <div className="text-white font-medium">5%</div>
              <div className="text-xs text-slate-400">Clear view</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 border-slate-600 text-slate-300"
              data-testid="button-download-satellite-data"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
              data-testid="button-detailed-analysis"
            >
              <Eye className="w-4 h-4 mr-2" />
              Detailed Analysis
            </Button>
          </div>

          {/* Real-time Updates */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Real-time monitoring active</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-400 hover:text-white"
              data-testid="button-refresh-satellite"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
