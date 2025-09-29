import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Mic, 
  Volume2, 
  MessageSquare, 
  Users, 
  Headphones,
  Play,
  Pause,
  RotateCcw,
  MapPin,
  BookOpen,
  Heart
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  speakers: string;
  support: {
    voice: boolean;
    text: boolean;
    tts: boolean;
  };
  sampleText: string;
  voiceCommand: string;
}

export function LanguageSupport() {
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingLanguage, setPlayingLanguage] = useState<string | null>(null);

  const languages: Language[] = [
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      flag: '🇮🇳',
      region: 'North India',
      speakers: '600M+',
      support: { voice: true, text: true, tts: true },
      sampleText: 'नमस्ते! मैं आपका AI कृषि सहायक हूँ। मैं आपकी फसल और खेती से जुड़े सवालों का जवाब दे सकता हूँ।',
      voiceCommand: 'मिट्टी का विश्लेषण दिखाओ'
    },
    {
      code: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      flag: '🇧🇩',
      region: 'West Bengal, Bangladesh',
      speakers: '300M+',
      support: { voice: true, text: true, tts: true },
      sampleText: 'নমস্কার! আমি আপনার AI কৃষি সহায়ক। আমি ফসল এবং কৃষি সম্পর্কিত আপনার প্রশ্নের উত্তর দিতে পারি।',
      voiceCommand: 'মাটির বিশ্লেষণ দেখান'
    },
    {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      flag: '🇮🇳',
      region: 'Andhra Pradesh, Telangana',
      speakers: '95M+',
      support: { voice: true, text: true, tts: true },
      sampleText: 'నమస్కారం! నేను మీ AI వ్యవసాయ సహాయకుడను. పంటలు మరియు వ్యవసాయానికి సంబంధించిన మీ ప్రశ్నలకు నేను సమాధానం ఇవ్వగలను.',
      voiceCommand: 'మట్టి విశ్లేషణ చూపించండి'
    },
    {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      flag: '🇮🇳',
      region: 'Maharashtra',
      speakers: '85M+',
      support: { voice: true, text: true, tts: true },
      sampleText: 'नमस्कार! मी तुमचा AI कृषी सहाय्यक आहे. मी पिकांचे आणि शेतीशी संबंधित तुमच्या प्रश्नांची उत्तरे देऊ शकतो.',
      voiceCommand: 'मातीचे विश्लेषण दाखवा'
    },
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇮🇳',
      region: 'Tamil Nadu',
      speakers: '80M+',
      support: { voice: true, text: true, tts: true },
      sampleText: 'வணக்கம்! நான் உங்கள் AI விவசாய உதவியாளர். பயிர்கள் மற்றும் விவசாயம் தொடர்பான உங்கள் கேள்விகளுக்கு நான் பதிலளிக்க முடியும்.',
      voiceCommand: 'மண் பகுப்பாய்வு காட்டுங்கள்'
    },
    {
      code: 'gu',
      name: 'Gujarati',
      nativeName: 'ગુજરાતી',
      flag: '🇮🇳',
      region: 'Gujarat',
      speakers: '60M+',
      support: { voice: true, text: true, tts: true },
      sampleText: 'નમસ્તે! હું તમારો AI કૃષિ સહાયક છું. હું પાકો અને ખેતી સંબંધિત તમારા પ્રશ્નોના જવાબ આપી શકું છું.',
      voiceCommand: 'માટીનું વિશ્લેષણ બતાવો'
    },
    {
      code: 'kn',
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      flag: '🇮🇳',
      region: 'Karnataka',
      speakers: '50M+',
      support: { voice: true, text: true, tts: true },
      sampleText: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಬೆಳೆಗಳು ಮತ್ತು ಕೃಷಿಗೆ ಸಂಬಂಧಿಸಿದ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ನಾನು ಉತ್ತರಿಸಬಹುದು.',
      voiceCommand: 'ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ತೋರಿಸಿ'
    },
    {
      code: 'ml',
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      flag: '🇮🇳',
      region: 'Kerala',
      speakers: '38M+',
      support: { voice: true, text: true, tts: true },
      sampleText: 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കൃഷി സഹായകൻ ആണ്. വിളകളും കൃഷിയുമായി ബന്ധപ്പെട്ട നിങ്ങളുടെ ചോദ്യങ്ങൾക്ക് ഞാൻ മറുപടി നൽകാൻ കഴിയും.',
      voiceCommand: 'മണ്ണിന്റെ വിശകലനം കാണിക്കുക'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handlePlayAudio = (langCode: string) => {
    if ('speechSynthesis' in window) {
      const lang = languages.find(l => l.code === langCode);
      if (lang) {
        setIsPlaying(true);
        setPlayingLanguage(langCode);
        
        const utterance = new SpeechSynthesisUtterance(lang.sampleText);
        utterance.lang = langCode === 'en' ? 'en-US' : `${langCode}-IN`;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        utterance.onend = () => {
          setIsPlaying(false);
          setPlayingLanguage(null);
        };
        
        speechSynthesis.speak(utterance);
      }
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setPlayingLanguage(null);
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
          <span className="gradient-text">Multi-Language</span> Support
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Breaking language barriers in agriculture with comprehensive support for 8+ Indian languages
        </p>
      </motion.div>

      {/* Language Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {languages.map((language, index) => (
          <motion.button
            key={language.code}
            onClick={() => setSelectedLanguage(language.code)}
            className={`p-4 rounded-lg border transition-all text-center ${
              selectedLanguage === language.code
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-slate-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            data-testid={`language-select-${language.code}`}
          >
            <div className="text-2xl mb-2">{language.flag}</div>
            <div className="font-semibold">{language.name}</div>
            <div className="text-sm opacity-75">{language.nativeName}</div>
            <div className="text-xs mt-2">{language.speakers} speakers</div>
          </motion.button>
        ))}
      </motion.div>

      {/* Selected Language Details */}
      <motion.div
        key={selectedLanguage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Language Info */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="text-3xl">{currentLanguage.flag}</div>
              <div>
                <div className="text-xl">{currentLanguage.name}</div>
                <div className="text-lg text-slate-400">{currentLanguage.nativeName}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-slate-400">Region</div>
                  <div className="text-white">{currentLanguage.region}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-400" />
                <div>
                  <div className="text-slate-400">Speakers</div>
                  <div className="text-white">{currentLanguage.speakers}</div>
                </div>
              </div>
            </div>

            {/* Feature Support */}
            <div className="space-y-3">
              <h4 className="font-medium text-white">Supported Features:</h4>
              <div className="flex flex-wrap gap-2">
                {currentLanguage.support.voice && (
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    <Mic className="w-3 h-3 mr-1" />
                    Voice Input
                  </Badge>
                )}
                {currentLanguage.support.text && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Text Chat
                  </Badge>
                )}
                {currentLanguage.support.tts && (
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    <Volume2 className="w-3 h-3 mr-1" />
                    Text-to-Speech
                  </Badge>
                )}
              </div>
            </div>

            {/* Sample Voice Command */}
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Headphones className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-white">Sample Voice Command:</span>
              </div>
              <div className="text-emerald-400 font-medium">{currentLanguage.voiceCommand}</div>
              <div className="text-xs text-slate-400 mt-1">Try saying this to test voice recognition</div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demo */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Volume2 className="w-5 h-5 text-emerald-400" />
              Interactive Language Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Sample Text */}
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="text-sm text-slate-400 mb-2">AI Assistant Introduction:</div>
              <div className="text-white leading-relaxed" dir={['ar', 'ur'].includes(currentLanguage.code) ? 'rtl' : 'ltr'}>
                {currentLanguage.sampleText}
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex gap-3">
              <Button
                onClick={() => handlePlayAudio(currentLanguage.code)}
                disabled={isPlaying}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                data-testid="button-play-audio"
              >
                {isPlaying && playingLanguage === currentLanguage.code ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play Audio
                  </>
                )}
              </Button>
              
              {isPlaying && (
                <Button
                  onClick={stopAudio}
                  variant="outline"
                  className="border-slate-600 text-slate-300"
                  data-testid="button-stop-audio"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Language Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">100%</div>
                <div className="text-xs text-slate-400">Feature Parity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">95%</div>
                <div className="text-xs text-slate-400">Voice Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technology Behind Languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Neural Machine Translation</h3>
            <p className="text-sm text-slate-300">
              Advanced AI models trained on agricultural terminology for accurate translation
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Voice Recognition</h3>
            <p className="text-sm text-slate-300">
              Optimized for Indian accents and agricultural terminology recognition
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Cultural Context</h3>
            <p className="text-sm text-slate-300">
              Understanding regional farming practices and cultural nuances
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Accessibility & Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center bg-gradient-to-r from-emerald-900/50 to-blue-900/50 rounded-2xl p-8 border border-emerald-500/20"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-6 h-6 text-red-400" />
          <h3 className="text-2xl font-bold text-white">Bridging the Digital Divide</h3>
        </div>
        <p className="text-slate-300 mb-6 max-w-3xl mx-auto">
          Our multi-language support ensures that every farmer, regardless of their linguistic background, 
          can access the power of AI-driven agricultural intelligence. Breaking barriers, building futures.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { value: '8+', label: 'Languages' },
            { value: '800M+', label: 'People Reached' },
            { value: '95%', label: 'Voice Accuracy' },
            { value: '100%', label: 'Feature Parity' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
