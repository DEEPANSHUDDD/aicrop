import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map, 
  MapPin, 
  Layers, 
  Satellite, 
  Navigation, 
  Maximize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Settings,
  Info,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity
} from 'lucide-react';

interface Field {
  id: string;
  name: string;
  crop: string;
  area: number;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  coordinates: { x: number; y: number };
  ndvi: number;
  issues?: string[];
}

interface FarmMapProps {
  expanded?: boolean;
}

export function FarmMap({ expanded = false }: FarmMapProps) {
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [mapMode, setMapMode] = useState<'satellite' | 'terrain' | 'hybrid'>('satellite');
  const [showLabels, setShowLabels] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const fields: Field[] = [
    {
      id: 'field-a',
      name: 'Field A',
      crop: 'Wheat',
      area: 2.5,
      health: 'excellent',
      coordinates: { x: 25, y: 30 },
      ndvi: 0.72,
      issues: []
    },
    {
      id: 'field-b',
      name: 'Field B',
      crop: 'Rice',
      area: 1.8,
      health: 'good',
      coordinates: { x: 60, y: 25 },
      ndvi: 0.68,
      issues: []
    },
    {
      id: 'field-c',
      name: 'Field C',
      crop: 'Corn',
      area: 3.2,
      health: 'warning',
      coordinates: { x: 40, y: 65 },
      ndvi: 0.54,
      issues: ['Low soil moisture', 'Nutrient deficiency']
    },
    {
      id: 'field-d',
      name: 'Field D',
      crop: 'Cotton',
      area: 2.1,
      health: 'critical',
      coordinates: { x: 75, y: 70 },
      ndvi: 0.42,
      issues: ['Pest infestation', 'Disease detected']
    }
  ];

  const getHealthColor = (health: Field['health']) => {
    switch (health) {
      case 'excellent': return 'text-green-400 bg-green-400';
      case 'good': return 'text-green-300 bg-green-300';
      case 'warning': return 'text-yellow-400 bg-yellow-400';
      case 'critical': return 'text-red-400 bg-red-400';
      default: return 'text-slate-400 bg-slate-400';
    }
  };

  const getHealthIcon = (health: Field['health']) => {
    switch (health) {
      case 'excellent':
      case 'good':
        return CheckCircle;
      case 'warning':
      case 'critical':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setSelectedField(null);
  };

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
              <Map className="w-5 h-5 text-blue-400" />
              Farm Field Map
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Activity className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                className="border-slate-600 text-slate-300"
                data-testid="button-map-settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Map Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <select
                value={mapMode}
                onChange={(e) => setMapMode(e.target.value as any)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1 text-sm text-white"
                data-testid="select-map-mode"
              >
                <option value="satellite">Satellite</option>
                <option value="terrain">Terrain</option>
                <option value="hybrid">Hybrid</option>
              </select>
              
              <Button
                variant={showLabels ? "default" : "outline"}
                size="sm"
                onClick={() => setShowLabels(!showLabels)}
                className="text-xs"
                data-testid="button-toggle-labels"
              >
                <Layers className="w-3 h-3 mr-1" />
                Labels
              </Button>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.6}
                className="border-slate-600 text-slate-300"
                data-testid="button-zoom-out"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <span className="text-xs text-slate-400 px-2">
                {Math.round(zoomLevel * 100)}%
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2}
                className="border-slate-600 text-slate-300"
                data-testid="button-zoom-in"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="border-slate-600 text-slate-300"
                data-testid="button-map-reset"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Map Visualization */}
          <div 
            className={`${expanded ? 'h-96' : 'h-64'} bg-gradient-to-br from-green-900 to-emerald-800 rounded-xl relative overflow-hidden border-2 border-slate-600 transition-all`}
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {[...Array(96)].map((_, i) => (
                  <div 
                    key={i}
                    className={`border border-green-500/10 ${
                      i % 4 === 0 ? 'bg-green-600/30' : 
                      i % 4 === 1 ? 'bg-green-700/30' : 
                      i % 4 === 2 ? 'bg-emerald-600/30' : 'bg-green-800/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Field Markers */}
            {fields.map((field) => {
              const HealthIcon = getHealthIcon(field.health);
              const healthColors = getHealthColor(field.health);
              
              return (
                <div
                  key={field.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ 
                    left: `${field.coordinates.x}%`, 
                    top: `${field.coordinates.y}%` 
                  }}
                  onClick={() => setSelectedField(field)}
                  data-testid={`field-marker-${field.id}`}
                >
                  {/* Field Boundary Circle */}
                  <div className={`w-12 h-12 rounded-full border-2 ${healthColors.replace('bg-', 'border-')} bg-black/20 backdrop-blur-sm flex items-center justify-center relative`}>
                    <HealthIcon className={`w-6 h-6 ${healthColors.split(' ')[0]}`} />
                    
                    {/* Pulsing effect for critical issues */}
                    {field.health === 'critical' && (
                      <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping"></div>
                    )}
                  </div>
                  
                  {/* Field Label */}
                  {showLabels && (
                    <div className="absolute top-14 left-1/2 transform -translate-x-1/2 glass-effect px-2 py-1 rounded text-xs whitespace-nowrap">
                      <div className="font-medium text-white">{field.name}</div>
                      <div className="text-xs text-slate-300">{field.crop} • {field.area}ha</div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Farm Center Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <Target className="w-4 h-4 text-white" />
              </div>
              {showLabels && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 glass-effect px-2 py-1 rounded text-xs whitespace-nowrap">
                  <div className="font-medium text-white">Farm Center</div>
                </div>
              )}
            </div>

            {/* Selected Field Highlight */}
            {selectedField && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ 
                  left: `${selectedField.coordinates.x}%`, 
                  top: `${selectedField.coordinates.y}%` 
                }}
              >
                <div className="w-16 h-16 rounded-full border-2 border-white animate-pulse"></div>
              </div>
            )}

            {/* Map Legend */}
            <div className="absolute top-4 left-4 glass-effect p-3 rounded-lg">
              <div className="text-xs font-medium text-white mb-2">Field Health</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-300">Excellent</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-slate-300">Warning</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-slate-300">Critical</span>
                </div>
              </div>
            </div>

            {/* Map Scale */}
            <div className="absolute bottom-4 left-4 glass-effect px-2 py-1 rounded text-xs text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-white"></div>
                <span>100m</span>
              </div>
            </div>

            {/* Coordinates Display */}
            <div className="absolute bottom-4 right-4 glass-effect px-2 py-1 rounded text-xs text-slate-300">
              28.6139°N, 77.2090°E
            </div>
          </div>

          {/* Field Information Panel */}
          {selectedField && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {selectedField.name}
                  </h4>
                  <p className="text-sm text-slate-400">{selectedField.crop} • {selectedField.area} hectares</p>
                </div>
                <Badge className={`${getHealthColor(selectedField.health).replace('bg-', 'bg-').replace('text-', 'text-')} border-current`}>
                  {selectedField.health}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs text-slate-400">NDVI Value</div>
                  <div className="text-lg font-bold text-emerald-400">{selectedField.ndvi}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Health Status</div>
                  <div className={`text-lg font-bold ${getHealthColor(selectedField.health).split(' ')[0]}`}>
                    {selectedField.health}
                  </div>
                </div>
              </div>
              
              {selectedField.issues && selectedField.issues.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-red-400">Issues Detected:</div>
                  <ul className="space-y-1">
                    {selectedField.issues.map((issue, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                        <AlertTriangle className="w-3 h-3 text-red-400" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex gap-2 mt-4">
                <Button 
                  size="sm" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="button-view-field-details"
                >
                  <Satellite className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedField(null)}
                  className="border-slate-600 text-slate-300"
                  data-testid="button-close-field-info"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          )}

          {/* Farm Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div className="text-center p-3 glass-effect rounded-lg">
              <div className="text-lg font-bold text-white">{fields.length}</div>
              <div className="text-xs text-slate-400">Total Fields</div>
            </div>
            
            <div className="text-center p-3 glass-effect rounded-lg">
              <div className="text-lg font-bold text-emerald-400">
                {fields.reduce((sum, field) => sum + field.area, 0).toFixed(1)}ha
              </div>
              <div className="text-xs text-slate-400">Total Area</div>
            </div>
            
            <div className="text-center p-3 glass-effect rounded-lg">
              <div className="text-lg font-bold text-green-400">
                {fields.filter(f => f.health === 'excellent' || f.health === 'good').length}
              </div>
              <div className="text-xs text-slate-400">Healthy Fields</div>
            </div>
            
            <div className="text-center p-3 glass-effect rounded-lg">
              <div className="text-lg font-bold text-blue-400">
                {(fields.reduce((sum, field) => sum + field.ndvi, 0) / fields.length).toFixed(2)}
              </div>
              <div className="text-xs text-slate-400">Avg NDVI</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 border-slate-600 text-slate-300"
              data-testid="button-satellite-view"
            >
              <Satellite className="w-4 h-4 mr-2" />
              Satellite View
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-navigation"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Navigate
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-slate-600 text-slate-300"
              data-testid="button-fullscreen-map"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
