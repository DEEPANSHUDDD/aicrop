import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Globe, 
  Headphones,
  Waves,
  Activity,
  Languages,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceAssistantProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export function VoiceAssistant({ isActive, onToggle }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [audioLevel, setAudioLevel] = useState(0);
  const [lastCommand, setLastCommand] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  const voiceCommands = {
    hi: [
      'मिट्टी का विश्लेषण दिखाओ',
      'आज का मौसम कैसा है',
      'फसल की सिफारिश दो',
      'बाजार की कीमत बताओ'
    ],
    en: [
      'Show soil analysis',
      'What\'s the weather today',
      'Give crop recommendations',
      'Tell me market prices'
    ]
  };

  // Check for speech recognition support
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (isSupported && (isActive || isListening)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedLanguage === 'en' ? 'en-US' : `${selectedLanguage}-IN`;
        
        recognition.onstart = () => {
          setIsListening(true);
          toast({
            title: "Voice Assistant Active",
            description: selectedLanguage === 'hi' ? 'बोलना शुरू करें...' : 'Start speaking...'
          });
        };
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setLastCommand(transcript);
          
          if (event.results[event.results.length - 1].isFinal) {
            handleVoiceCommand(transcript);
          }
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description: "Please try again or check your microphone permissions.",
            variant: "destructive"
          });
        };
        
        recognition.onend = () => {
          setIsListening(false);
          if (isActive) {
            // Restart if still active
            setTimeout(() => {
              if (isActive && recognitionRef.current) {
                recognitionRef.current.start();
              }
            }, 1000);
          }
        };
        
        if (isActive) {
          recognition.start();
        }
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isActive, selectedLanguage, isSupported]);

  // Simulate audio level for visualization
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening]);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Simulate voice command processing
    setTimeout(() => {
      let response = '';
      
      if (selectedLanguage === 'hi') {
        if (lowerCommand.includes('मिट्टी') || lowerCommand.includes('soil')) {
          response = 'आपकी मिट्टी में नाइट्रोजन 120, फास्फोरस 45, और पोटाशियम 78 है। pH 6.8 है जो अच्छा है।';
        } else if (lowerCommand.includes('मौसम') || lowerCommand.includes('weather')) {
          response = 'आज का तापमान 32 डिग्री है। आसमान साफ है और बारिश की संभावना नहीं है।';
        } else if (lowerCommand.includes('फसल') || lowerCommand.includes('crop')) {
          response = 'आपकी मिट्टी के लिए बाजरा सबसे अच्छा विकल्प है। 95% मैच स्कोर के साथ।';
        } else if (lowerCommand.includes('बाजार') || lowerCommand.includes('market')) {
          response = 'गेहूं की आज की कीमत 2150 रुपये प्रति क्विंटल है। पिछले सप्ताह से 5% बढ़ी है।';
        } else {
          response = 'मैं आपकी मदद करने के लिए यहाँ हूँ। आप मुझसे मिट्टी, मौसम, फसल या बाजार के बारे में पूछ सकते हैं।';
        }
      } else {
        if (lowerCommand.includes('soil')) {
          response = 'Your soil has nitrogen 120, phosphorus 45, and potassium 78. pH is 6.8 which is good.';
        } else if (lowerCommand.includes('weather')) {
          response = 'Today\'s temperature is 32 degrees. Sky is clear with no chance of rain.';
        } else if (lowerCommand.includes('crop')) {
          response = 'Pearl millet is the best option for your soil with 95% match score.';
        } else if (lowerCommand.includes('market')) {
          response = 'Wheat price today is 2150 rupees per quintal. It\'s up 5% from last week.';
        } else {
          response = 'I\'m here to help you. You can ask me about soil, weather, crops, or market prices.';
        }
      }
      
      speakResponse(response);
    }, 1000);
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'en' ? 'en-US' : `${selectedLanguage}-IN`;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const handleToggle = () => {
    if (recognitionRef.current) {
      if (isActive) {
        recognitionRef.current.stop();
      }
    }
    onToggle(!isActive);
  };

  if (!isSupported) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MicOff className="w-5 h-5 text-red-400" />
            Voice Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center">
          <MicOff className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-slate-400 mb-4">Voice recognition not supported in your browser</p>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300" disabled>
            Not Available
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
              <Headphones className="w-5 h-5 text-purple-400" />
              Voice Assistant
            </CardTitle>
            <div className="flex items-center gap-2">
              {isActive && (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              )}
              {isSpeaking && (
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Speaking
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Language Selector */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
              data-testid="select-voice-language"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Voice Visualizer */}
          <div className="relative">
            <div className="h-32 bg-slate-700/30 rounded-lg p-4 flex items-end justify-center gap-1">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-purple-400 rounded-t"
                  animate={{
                    height: isListening 
                      ? `${Math.random() * audioLevel + 10}%` 
                      : '10%'
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
            
            {isListening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-purple-500/20 rounded-full p-4">
                  <Waves className="w-8 h-8 text-purple-400 animate-pulse" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleToggle}
              className={`flex-1 ${
                isActive 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
              data-testid="button-toggle-voice"
            >
              {isActive ? (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Listening
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300"
              onClick={() => {
                if (isSpeaking) {
                  speechSynthesis.cancel();
                  setIsSpeaking(false);
                } else {
                  speakResponse(
                    selectedLanguage === 'hi' 
                      ? 'नमस्ते! मैं आपका AI कृषि सहायक हूँ।' 
                      : 'Hello! I am your AI agricultural assistant.'
                  );
                }
              }}
              data-testid="button-test-speech"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Last Command Display */}
          {lastCommand && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20"
            >
              <div className="text-sm text-purple-400 mb-1">Last command:</div>
              <div className="text-white">{lastCommand}</div>
            </motion.div>
          )}

          {/* Voice Commands Help */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">Try saying:</h4>
            <div className="space-y-2">
              {voiceCommands[selectedLanguage as keyof typeof voiceCommands]?.map((command, index) => (
                <div key={index} className="p-2 glass-effect rounded text-sm text-slate-300">
                  "{command}"
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Globe className="w-4 h-4" />
              <span>Multi-language support</span>
            </div>
            <div className={`flex items-center gap-2 ${
              isActive ? 'text-green-400' : 'text-slate-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isActive ? 'bg-green-400 animate-pulse' : 'bg-slate-400'
              }`}></div>
              <span>{isActive ? 'Listening' : 'Inactive'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
