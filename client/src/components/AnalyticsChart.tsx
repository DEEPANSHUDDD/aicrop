import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Leaf, 
  Droplets,
  Calendar,
  Download,
  Maximize2,
  RefreshCw,
  Target,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

interface ChartData {
  month: string;
  yield: number;
  revenue: number;
  cost: number;
  profit: number;
  rainfall: number;
  temperature: number;
}

interface AnalyticsChartProps {
  expanded?: boolean;
}

export function AnalyticsChart({ expanded = false }: AnalyticsChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('12months');
  const [activeChart, setActiveChart] = useState('yield');
  const [isLoading, setIsLoading] = useState(false);

  const periods = [
    { id: '3months', label: '3 Months' },
    { id: '6months', label: '6 Months' },
    { id: '12months', label: '12 Months' },
    { id: '24months', label: '2 Years' }
  ];

  const chartTypes = [
    { id: 'yield', label: 'Crop Yield', icon: Leaf, color: 'text-green-400' },
    { id: 'revenue', label: 'Revenue', icon: DollarSign, color: 'text-blue-400' },
    { id: 'weather', label: 'Weather Patterns', icon: Droplets, color: 'text-cyan-400' },
    { id: 'profit', label: 'Profit Analysis', icon: TrendingUp, color: 'text-emerald-400' }
  ];

  // Sample data - in a real app, this would come from an API
  const chartData: ChartData[] = [
    { month: 'Jan', yield: 2.3, revenue: 45000, cost: 25000, profit: 20000, rainfall: 45, temperature: 22 },
    { month: 'Feb', yield: 2.1, revenue: 42000, cost: 24000, profit: 18000, rainfall: 30, temperature: 25 },
    { month: 'Mar', yield: 2.8, revenue: 56000, cost: 28000, profit: 28000, rainfall: 20, temperature: 28 },
    { month: 'Apr', yield: 3.2, revenue: 64000, cost: 30000, profit: 34000, rainfall: 15, temperature: 32 },
    { month: 'May', yield: 3.5, revenue: 70000, cost: 32000, profit: 38000, rainfall: 25, temperature: 35 },
    { month: 'Jun', yield: 3.1, revenue: 62000, cost: 35000, profit: 27000, rainfall: 85, temperature: 30 },
    { month: 'Jul', yield: 2.9, revenue: 58000, cost: 33000, profit: 25000, rainfall: 120, temperature: 28 },
    { month: 'Aug', yield: 3.3, revenue: 66000, cost: 31000, profit: 35000, rainfall: 95, temperature: 29 },
    { month: 'Sep', yield: 3.7, revenue: 74000, cost: 33000, profit: 41000, rainfall: 75, temperature: 31 },
    { month: 'Oct', yield: 3.4, revenue: 68000, cost: 30000, profit: 38000, rainfall: 40, temperature: 28 },
    { month: 'Nov', yield: 3.0, revenue: 60000, cost: 28000, profit: 32000, rainfall: 20, temperature: 25 },
    { month: 'Dec', yield: 2.6, revenue: 52000, cost: 26000, profit: 26000, rainfall: 35, temperature: 23 }
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const getChartColor = (type: string) => {
    switch (type) {
      case 'yield': return 'rgb(34, 197, 94)';
      case 'revenue': return 'rgb(59, 130, 246)';
      case 'weather': return 'rgb(6, 182, 212)';
      case 'profit': return 'rgb(16, 185, 129)';
      default: return 'rgb(34, 197, 94)';
    }
  };

  const getCurrentData = () => {
    switch (activeChart) {
      case 'yield': return chartData.map(d => ({ ...d, value: d.yield }));
      case 'revenue': return chartData.map(d => ({ ...d, value: d.revenue }));
      case 'weather': return chartData.map(d => ({ ...d, value: d.rainfall }));
      case 'profit': return chartData.map(d => ({ ...d, value: d.profit }));
      default: return chartData.map(d => ({ ...d, value: d.yield }));
    }
  };

  const getStatistics = () => {
    const data = getCurrentData();
    const values = data.map(d => d.value);
    const total = values.reduce((sum, val) => sum + val, 0);
    const avg = total / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const trend = values[values.length - 1] > values[0] ? 'up' : 'down';
    const change = ((values[values.length - 1] - values[0]) / values[0] * 100);

    return { total, avg, max, min, trend, change };
  };

  const stats = getStatistics();
  const currentChartType = chartTypes.find(ct => ct.id === activeChart);

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
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Farm Analytics
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <Activity className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="border-slate-600 text-slate-300"
                data-testid="button-refresh-analytics"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Chart Type and Period Selection */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Tabs value={activeChart} onValueChange={setActiveChart} className="flex-1">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-slate-700/50">
                {chartTypes.map((chart) => (
                  <TabsTrigger 
                    key={chart.id}
                    value={chart.id}
                    className="data-[state=active]:bg-slate-600"
                    data-testid={`chart-type-${chart.id}`}
                  >
                    <chart.icon className={`w-4 h-4 mr-2 ${chart.color}`} />
                    {chart.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
              data-testid="select-time-period"
            >
              {periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          {/* Statistics Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-400">Average</span>
              </div>
              <div className="text-lg font-bold text-white">
                {activeChart === 'revenue' || activeChart === 'profit' 
                  ? `₹${Math.round(stats.avg).toLocaleString()}`
                  : activeChart === 'yield'
                  ? `${stats.avg.toFixed(1)} tons/ha`
                  : `${Math.round(stats.avg)}mm`
                }
              </div>
            </div>
            
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400">Peak</span>
              </div>
              <div className="text-lg font-bold text-white">
                {activeChart === 'revenue' || activeChart === 'profit' 
                  ? `₹${Math.round(stats.max).toLocaleString()}`
                  : activeChart === 'yield'
                  ? `${stats.max.toFixed(1)} tons/ha`
                  : `${Math.round(stats.max)}mm`
                }
              </div>
            </div>
            
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                {stats.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className="text-xs text-slate-400">Trend</span>
              </div>
              <div className={`text-lg font-bold ${stats.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {stats.change > 0 ? '+' : ''}{stats.change.toFixed(1)}%
              </div>
            </div>
            
            <div className="p-3 glass-effect rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-slate-400">Period</span>
              </div>
              <div className="text-lg font-bold text-white">
                {periods.find(p => p.id === selectedPeriod)?.label}
              </div>
            </div>
          </div>

          {/* Chart Visualization */}
          <div className={`${expanded ? 'h-96' : 'h-64'} bg-slate-700/30 rounded-lg p-4 relative overflow-hidden transition-all`}>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-2" />
                  <p className="text-slate-400">Loading analytics...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Chart Title */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white flex items-center gap-2">
                    {currentChartType?.icon && (
                      <currentChartType.icon className={`w-4 h-4 ${currentChartType.color}`} />
                    )}
                    {currentChartType?.label} Analytics
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                      data-testid="button-chart-expand"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Simplified Chart Visualization */}
                <div className="relative h-48">
                  <svg className="w-full h-full">
                    <defs>
                      <linearGradient id={`chartGradient-${activeChart}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: getChartColor(activeChart), stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: getChartColor(activeChart), stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Chart Line */}
                    <polyline
                      fill="none"
                      stroke={getChartColor(activeChart)}
                      strokeWidth="3"
                      points={getCurrentData().map((item, index) => {
                        const x = (index / (getCurrentData().length - 1)) * 100;
                        const normalizedValue = ((item.value - stats.min) / (stats.max - stats.min)) * 80 + 10;
                        const y = 100 - normalizedValue;
                        return `${x}%,${y}%`;
                      }).join(' ')}
                    />
                    
                    {/* Area Fill */}
                    <polygon
                      fill={`url(#chartGradient-${activeChart})`}
                      points={`0,100% ${getCurrentData().map((item, index) => {
                        const x = (index / (getCurrentData().length - 1)) * 100;
                        const normalizedValue = ((item.value - stats.min) / (stats.max - stats.min)) * 80 + 10;
                        const y = 100 - normalizedValue;
                        return `${x}%,${y}%`;
                      }).join(' ')} 100%,100%`}
                    />
                    
                    {/* Data Points */}
                    {getCurrentData().map((item, index) => {
                      const x = (index / (getCurrentData().length - 1)) * 100;
                      const normalizedValue = ((item.value - stats.min) / (stats.max - stats.min)) * 80 + 10;
                      const y = 100 - normalizedValue;
                      return (
                        <circle
                          key={index}
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r="4"
                          fill={getChartColor(activeChart)}
                          className="hover:r-6 transition-all cursor-pointer"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Month Labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 px-4">
                    {chartData.slice(0, 6).map((item, index) => (
                      <span key={index}>{item.month}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Key Insights */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">Key Insights</h4>
            <div className="space-y-2">
              {activeChart === 'yield' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Peak yield season: April-September</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-slate-300">25% improvement over last year</span>
                  </div>
                </>
              )}
              
              {activeChart === 'revenue' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-slate-300">Highest revenue during harvest season</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">22% growth in market value</span>
                  </div>
                </>
              )}
              
              {activeChart === 'weather' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-slate-300">Monsoon peak: June-August</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-slate-300">Optimal rainfall for current crops</span>
                  </div>
                </>
              )}
              
              {activeChart === 'profit' && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-slate-300">Profit margins improved by 18%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-slate-300">Cost optimization opportunities identified</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 border-slate-600 text-slate-300"
              data-testid="button-export-data"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              data-testid="button-detailed-report"
            >
              <PieChart className="w-4 h-4 mr-2" />
              Detailed Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
