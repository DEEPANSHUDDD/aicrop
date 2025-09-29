import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  X, 
  Globe, 
  Volume2,
  Minimize2,
  Maximize2,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  message: string;
  response?: string;
  language: string;
  createdAt: Date;
  isUser: boolean;
}

interface AIAssistantChatProps {
  isOpen: boolean;
  onClose?: () => void;
  isFloating?: boolean;
}

export function AIAssistantChat({ isOpen, onClose, isFloating = false }: AIAssistantChatProps) {
  const [message, setMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  // Fetch chat history
  const { data: chatHistory } = useQuery({
    queryKey: ['/api/chat', 'demo-user-1'],
    enabled: isOpen
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { message: string; language: string }) => {
      const response = await apiRequest('POST', '/api/chat', {
        userId: 'demo-user-1',
        message: messageData.message,
        language: messageData.language
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat'] });
      setMessage('');
      toast({
        title: "Message sent",
        description: "AI assistant is responding..."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      console.error('Chat error:', error);
    }
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    sendMessageMutation.mutate({
      message: message.trim(),
      language: selectedLanguage
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(!isListening);
      
      if (!isListening) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = selectedLanguage === 'en' ? 'en-US' : `${selectedLanguage}-IN`;
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = () => {
          toast({
            title: "Listening",
            description: "Speak now..."
          });
        };
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setMessage(transcript);
          setIsListening(false);
        };
        
        recognition.onerror = () => {
          setIsListening(false);
          toast({
            title: "Error",
            description: "Voice recognition failed. Please try again.",
            variant: "destructive"
          });
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      }
    } else {
      toast({
        title: "Not supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive"
      });
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'en' ? 'en-US' : `${selectedLanguage}-IN`;
      speechSynthesis.speak(utterance);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  if (!isOpen) return null;

  const containerClass = isFloating 
    ? "fixed bottom-4 right-4 w-96 h-[500px] z-50" 
    : "w-full h-full";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={containerClass}
    >
      <Card className={`bg-slate-800/95 border-slate-600 text-white backdrop-blur-lg ${isFloating ? 'shadow-2xl' : ''} h-full flex flex-col`}>
        <CardHeader className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">AI Assistant</CardTitle>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Online • Multilingual</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-2 py-1 text-sm text-white"
                data-testid="select-chat-language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              
              {isFloating && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-slate-400 hover:text-white"
                    data-testid="button-minimize-chat"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-slate-400 hover:text-white"
                    data-testid="button-close-chat"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex-1 p-0 flex flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {/* Welcome Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 glass-effect rounded-lg p-3">
                    <p className="text-sm text-white">
                      {selectedLanguage === 'hi' ? 'नमस्ते! मैं आपका AI कृषि सहायक हूँ। आप मुझसे फसल, मिट्टी, मौसम या बाजार के बारे में कुछ भी पूछ सकते हैं।' :
                       selectedLanguage === 'bn' ? 'নমস্কার! আমি আপনার AI কৃষি সহায়ক। আপনি ফসল, মাটি, আবহাওয়া বা বাজার সম্পর্কে যেকোনো প্রশ্ন করতে পারেন।' :
                       'Hello! I\'m your AI agricultural assistant. Ask me anything about crops, soil, weather, or market conditions.'}
                    </p>
                  </div>
                </motion.div>

                {/* Chat Messages */}
                {chatHistory?.messages?.map((msg: Message, index: number) => (
                  <div key={msg.id || index}>
                    {/* User Message */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-3 justify-end mb-2"
                    >
                      <div className="bg-emerald-600 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-white">{msg.message}</p>
                      </div>
                      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>

                    {/* AI Response */}
                    {msg.response && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 glass-effect rounded-lg p-3">
                          <p className="text-sm text-white">{msg.response}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakText(msg.response!)}
                              className="text-slate-400 hover:text-white h-6 px-2"
                              data-testid="button-speak-response"
                            >
                              <Volume2 className="w-3 h-3" />
                            </Button>
                            <Badge variant="secondary" className="text-xs">
                              {languages.find(l => l.code === msg.language)?.name || 'English'}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Loading indicator */}
                {sendMessageMutation.isPending && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="glass-effect rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-slate-400">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      selectedLanguage === 'hi' ? 'अपना प्रश्न टाइप करें...' :
                      selectedLanguage === 'bn' ? 'আপনার প্রশ্ন টাইপ করুন...' :
                      'Type your question...'
                    }
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 resize-none min-h-[40px] max-h-24"
                    disabled={sendMessageMutation.isPending}
                    data-testid="textarea-chat-message"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={toggleVoiceRecognition}
                    variant={isListening ? "default" : "outline"}
                    size="sm"
                    className={`${isListening ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}
                    data-testid="button-voice-input"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || sendMessageMutation.isPending}
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    data-testid="button-send-message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  selectedLanguage === 'hi' ? 'मिट्टी का विश्लेषण' : 'Soil analysis',
                  selectedLanguage === 'hi' ? 'फसल की सिफारिश' : 'Crop recommendation',
                  selectedLanguage === 'hi' ? 'मौसम की जानकारी' : 'Weather forecast',
                  selectedLanguage === 'hi' ? 'बाजार की कीमत' : 'Market prices'
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => setMessage(action)}
                    className="text-xs text-slate-400 hover:text-white hover:bg-slate-700"
                    data-testid={`button-quick-action-${index}`}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
