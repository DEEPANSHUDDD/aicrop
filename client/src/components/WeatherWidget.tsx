import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye,
  AlertTriangle,
  RefreshCw,
  Calendar,
  MapPin
} from 'lucide-react';

interface WeatherForecast {
  day: string;
  high: number;
  low: number;
  icon: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  forecast: WeatherForecast[];
}

interface WeatherWidgetProps {
  data?: WeatherData;
  isLoading?: boolean;
}

export function WeatherWidget({ data, isLoading }: WeatherWidgetProps) {
  const getWeatherIcon = (condition: string, size: string = 'w-6 h-6') => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
      return <Sun className={`${size} text-yellow-400`} />;
    }
    if (lowerCondition.includes('rain') || lowerCondition.includes('shower')) {
      return <CloudRain className={`${size} text-blue-400`} />;
    }
    if (lowerCondition.includes('cloud')) {
      return <Cloud className={`${size} text-slate-400`} />;
    }
    return <Sun className={`${size} text-yellow-400`} />;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 35) return 'text-red-400';
    if (temp > 25) return 'text-orange-400';
    if (temp > 15) return 'text-green-400';
    return 'text-blue-400';
  };

  const getHumidityColor = (humidity: number) => {
    if (humidity > 80) return 'text-blue-400';
    if (humidity > 60) return 'text-green-400';
    if (humidity > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAgriculturalAdvice = (temp: number, humidity: number, condition: string) => {
    if (condition.toLowerCase().includes('rain')) {
      return {
        type: 'info',
        message: 'Good for irrigation. Consider postponing fertilizer application.',
        icon: CloudRain
      };
    }
    if (temp > 35 && humidity < 50) {
      return {
        type: 'warning',
        message: 'High temperature and low humidity. Increase irrigation frequency.',
        icon: AlertTriangle
      };
    }
    if (humidity > 80) {
      return {
        type: 'warning',
        message: 'High humidity detected. Monitor for fungal diseases.',
        icon: Droplets
      };
    }
    return {
      type: 'success',
      message: 'Favorable conditions for crop growth.',
      icon: Sun
    };
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Cloud className="w-5 h-5 text-blue-400" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded mb-2"></div>
              <div className="h-8 bg-slate-700 rounded"></div>
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
            <Cloud className="w-5 h-5 text-blue-400" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center">
          <AlertTriangle className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-slate-400 mb-4">No weather data available</p>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </CardContent>
      </Card>
    );
  }

  const advice = getAgriculturalAdvice(data.temperature, data.humidity, data.condition);

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
              <Cloud className="w-5 h-5 text-blue-400" />
              Weather Forecast
            </CardTitle>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <MapPin className="w-3 h-3 mr-1" />
              Delhi, India
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Weather */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getWeatherIcon(data.condition, 'w-16 h-16')}
              <div>
                <div className={`text-4xl font-bold ${getTemperatureColor(data.temperature)}`}>
                  {data.temperature}°C
                </div>
                <div className="text-slate-300">{data.condition}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-1">Humidity</div>
              <div className={`text-2xl font-bold ${getHumidityColor(data.humidity)}`}>
                {data.humidity}%
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-slate-300">Feels Like</span>
              </div>
              <div className="text-lg font-bold text-white">{data.temperature + 2}°C</div>
            </div>
            
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Wind Speed</span>
              </div>
              <div className="text-lg font-bold text-white">12 km/h</div>
            </div>
            
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">Visibility</span>
              </div>
              <div className="text-lg font-bold text-white">10 km</div>
            </div>
            
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Pressure</span>
              </div>
              <div className="text-lg font-bold text-white">1013 hPa</div>
            </div>
          </div>

          {/* 3-Day Forecast */}
          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              3-Day Forecast
            </h4>
            
            <div className="space-y-2">
              {data.forecast.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 glass-effect rounded-lg hover:bg-slate-700/30 transition-colors"
                  data-testid={`forecast-day-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{day.icon}</div>
                    <div>
                      <div className="font-medium text-white">{day.day}</div>
                      <div className="text-sm text-slate-400">
                        {index === 0 ? data.condition : 
                         index === 1 ? 'Partly cloudy' : 'Light rain'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium text-white">{day.high}°</div>
                    <div className="text-sm text-slate-400">{day.low}°</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Agricultural Alert */}
          <div className={`p-4 rounded-lg border ${
            advice.type === 'warning' 
              ? 'bg-yellow-500/10 border-yellow-500/20' 
              : advice.type === 'info'
              ? 'bg-blue-500/10 border-blue-500/20'
              : 'bg-green-500/10 border-green-500/20'
          }`}>
            <h5 className={`font-medium mb-2 flex items-center gap-2 ${
              advice.type === 'warning' 
                ? 'text-yellow-400' 
                : advice.type === 'info'
                ? 'text-blue-400'
                : 'text-green-400'
            }`}>
              <advice.icon className="w-4 h-4" />
              Agricultural Alert
            </h5>
            <p className="text-sm text-slate-300">{advice.message}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 border-slate-600 text-slate-300"
              data-testid="button-weather-history"
            >
              <Calendar className="w-4 h-4 mr-2" />
              7-Day Forecast
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-weather-alerts"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Set Alerts
            </Button>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Updated 15 minutes ago</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-400 hover:text-white"
              data-testid="button-refresh-weather"
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
