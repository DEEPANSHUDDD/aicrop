import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Droplets, 
  DollarSign, 
  Leaf, 
  BarChart3,
  RefreshCw,
  ChevronRight,
  Star,
  Target,
  Wallet,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface Recommendation {
  id: string;
  crop: string;
  matchScore: number;
  expectedYield: string;
  profitMargin: string;
  waterRequirement: string;
  sustainability: string;
  marketDemand: string;
  reasoning?: string;
}

interface CropRecommendationsProps {
  recommendations?: Recommendation[];
  isLoading?: boolean;
}

export function CropRecommendations({ recommendations, isLoading }: CropRecommendationsProps) {
  const [selectedCrop, setSelectedCrop] = useState<Recommendation | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Generate new recommendations mutation
  const generateRecommendationsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/recommendations/generate', {
        farmId: 'demo-farm-1',
        location: 'Delhi, India'
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      toast({
        title: "Recommendations Updated",
        description: `Generated ${data.recommendations.length} new crop recommendations`
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate new recommendations. Please try again.",
        variant: "destructive"
      });
      console.error('Recommendation generation error:', error);
    }
  });

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-400';
    if (score >= 75) return 'text-yellow-400 bg-yellow-400';
    if (score >= 60) return 'text-orange-400 bg-orange-400';
    return 'text-red-400 bg-red-400';
  };

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'high': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'low': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  const getSustainabilityColor = (sustainability: string) => {
    switch (sustainability.toLowerCase()) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-yellow-400';
      case 'fair': return 'text-orange-400';
      default: return 'text-red-400';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="w-5 h-5 text-emerald-400" />
            AI Crop Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse p-4 bg-slate-700/30 rounded-lg">
              <div className="h-4 bg-slate-700 rounded mb-2"></div>
              <div className="h-2 bg-slate-700 rounded mb-2"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-3 bg-slate-700 rounded"></div>
                <div className="h-3 bg-slate-700 rounded"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="w-5 h-5 text-emerald-400" />
              AI Crop Recommendations
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => generateRecommendationsMutation.mutate()}
                disabled={generateRecommendationsMutation.isPending}
                className="border-slate-600 text-slate-300"
                data-testid="button-refresh-recommendations"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${generateRecommendationsMutation.isPending ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {recommendations && recommendations.length > 0 ? (
            <>
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Based on your soil conditions, weather patterns, and market trends
              </div>

              <div className="space-y-4">
                {recommendations.map((recommendation, index) => (
                  <motion.div
                    key={recommendation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border transition-all cursor-pointer hover:scale-[1.02] ${
                      selectedCrop?.id === recommendation.id
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                    }`}
                    onClick={() => setSelectedCrop(
                      selectedCrop?.id === recommendation.id ? null : recommendation
                    )}
                    data-testid={`recommendation-card-${index}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <Leaf className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{recommendation.crop}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge className={getDemandColor(recommendation.marketDemand)}>
                              {recommendation.marketDemand} Demand
                            </Badge>
                            <Badge className="bg-slate-600/50 text-slate-300">
                              {recommendation.waterRequirement}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${getMatchScoreColor(recommendation.matchScore)}`}>
                            {recommendation.matchScore}%
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(recommendation.matchScore / 20) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-xs text-slate-400">Match Score</div>
                      </div>
                    </div>

                    <Progress 
                      value={recommendation.matchScore} 
                      className="h-2 bg-slate-700 mb-3"
                      data-testid={`progress-match-score-${index}`}
                    />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-slate-400">Yield</div>
                          <div className="text-white font-medium">{recommendation.expectedYield}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-green-400" />
                        <div>
                          <div className="text-slate-400">Profit</div>
                          <div className="text-white font-medium">{recommendation.profitMargin}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-slate-400">Water Need</div>
                          <div className="text-white font-medium">{recommendation.waterRequirement}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="text-slate-400">Sustainability</div>
                          <div className={`font-medium ${getSustainabilityColor(recommendation.sustainability)}`}>
                            {recommendation.sustainability}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-slate-400">
                        Click for detailed analysis
                      </div>
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                        selectedCrop?.id === recommendation.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Detailed View */}
              {selectedCrop && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
                >
                  <h4 className="font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Detailed Analysis for {selectedCrop.crop}
                  </h4>
                  
                  {selectedCrop.reasoning && (
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-white mb-2">AI Reasoning:</h5>
                        <p className="text-sm text-slate-300">{selectedCrop.reasoning}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="p-3 glass-effect rounded-lg">
                          <h6 className="font-medium text-white mb-2">Economic Factors</h6>
                          <ul className="text-sm text-slate-300 space-y-1">
                            <li>• Expected profit: {selectedCrop.profitMargin}</li>
                            <li>• Market demand: {selectedCrop.marketDemand}</li>
                            <li>• Risk assessment: Low to moderate</li>
                          </ul>
                        </div>
                        
                        <div className="p-3 glass-effect rounded-lg">
                          <h6 className="font-medium text-white mb-2">Environmental Impact</h6>
                          <ul className="text-sm text-slate-300 space-y-1">
                            <li>• Sustainability: {selectedCrop.sustainability}</li>
                            <li>• Water efficiency: {selectedCrop.waterRequirement}</li>
                            <li>• Soil health impact: Positive</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      data-testid="button-start-planning"
                    >
                      Start Planning
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-slate-600 text-slate-300"
                      data-testid="button-save-recommendation"
                    >
                      Save Recommendation
                    </Button>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Brain className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No recommendations available</p>
              <Button 
                onClick={() => generateRecommendationsMutation.mutate()}
                disabled={generateRecommendationsMutation.isPending}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                data-testid="button-generate-recommendations"
              >
                {generateRecommendationsMutation.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Recommendations
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
