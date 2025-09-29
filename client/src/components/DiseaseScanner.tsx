import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Upload, 
  Scan, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  FileImage,
  Loader2,
  Download,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface DiseaseAnalysis {
  diseaseName: string;
  confidence: number;
  severity: string;
  treatment: string;
  preventionTips: string;
}

export function DiseaseScanner() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [analysis, setAnalysis] = useState<DiseaseAnalysis | null>(null);
  const { toast } = useToast();

  const analyzeDiseaseMutation = useMutation({
    mutationFn: async (imageData: string) => {
      const response = await apiRequest('POST', '/api/disease/analyze', {
        farmId: 'demo-farm-1',
        imageData
      });
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysis(data.detection);
      toast({
        title: "Analysis Complete",
        description: `Disease detected: ${data.detection.diseaseName}`
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive"
      });
      console.error('Disease analysis error:', error);
    }
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setSelectedImage(result);
          setAnalysis(null);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive"
        });
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      analyzeDiseaseMutation.mutate(selectedImage);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
      case 'mild':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'medium':
      case 'moderate':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'high':
      case 'severe':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      default:
        return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
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
              <Camera className="w-5 h-5 text-blue-400" />
              AI Disease Scanner
            </CardTitle>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Image Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
              dragOver 
                ? 'border-blue-400 bg-blue-400/10' 
                : selectedImage 
                ? 'border-green-400 bg-green-400/10' 
                : 'border-slate-600 hover:border-slate-500'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => document.getElementById('image-upload')?.click()}
            data-testid="drop-zone-disease-image"
          >
            {selectedImage ? (
              <div className="space-y-4">
                <img 
                  src={selectedImage} 
                  alt="Selected crop" 
                  className="max-h-32 mx-auto rounded-lg object-cover"
                />
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Image ready for analysis</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto flex items-center justify-center">
                  <FileImage className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-300 mb-2">Upload crop image for disease detection</p>
                  <p className="text-sm text-slate-400">
                    Drag & drop or click to browse • JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
            )}
            
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              data-testid="input-disease-image"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 border-slate-600 text-slate-300"
              onClick={() => {
                setSelectedImage(null);
                setAnalysis(null);
              }}
              disabled={analyzeDiseaseMutation.isPending}
              data-testid="button-clear-image"
            >
              Clear
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleAnalyze}
              disabled={!selectedImage || analyzeDiseaseMutation.isPending}
              data-testid="button-analyze-disease"
            >
              {analyzeDiseaseMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4 mr-2" />
                  Analyze Disease
                </>
              )}
            </Button>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Detection Results */}
              <div className="p-4 glass-effect rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">Detection Results</h4>
                  <Badge className={getSeverityColor(analysis.severity)}>
                    {analysis.severity} Risk
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300">Disease Identified</span>
                      <span className="text-sm font-medium text-white">{analysis.diseaseName}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">Confidence Level</span>
                      <span className={`text-sm font-medium ${getConfidenceColor(analysis.confidence)}`}>
                        {Math.round(analysis.confidence * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={analysis.confidence * 100} 
                      className="h-2 bg-slate-700"
                      data-testid="progress-confidence"
                    />
                  </div>
                </div>
              </div>

              {/* Treatment Recommendations */}
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h5 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Treatment Recommendations
                </h5>
                <p className="text-sm text-slate-300 mb-3">{analysis.treatment}</p>
                
                <div className="space-y-2">
                  <h6 className="text-sm font-medium text-white">Prevention Tips:</h6>
                  <p className="text-sm text-slate-300">{analysis.preventionTips}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-slate-600 text-slate-300"
                  data-testid="button-save-report"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save Report
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="button-get-expert-help"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Get Expert Help
                </Button>
              </div>
            </motion.div>
          )}

          {/* Sample Analysis (when no image is selected) */}
          {!selectedImage && !analysis && (
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <h5 className="font-medium text-white mb-2">How it works:</h5>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Upload clear photos of affected plant leaves or stems</li>
                <li>• AI analyzes visual symptoms using computer vision</li>
                <li>• Get instant disease identification with confidence score</li>
                <li>• Receive treatment recommendations and prevention tips</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
