import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Globe, 
  Mic, 
  Bell, 
  User, 
  ChevronDown, 
  Wifi, 
  WifiOff,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  onVoiceToggle: (active: boolean) => void;
  onChatToggle: (open: boolean) => void;
  isVoiceActive: boolean;
  isChatOpen: boolean;
  onNavigate: (section: string) => void;
}

export function Header({ 
  onVoiceToggle, 
  onChatToggle, 
  isVoiceActive, 
  isChatOpen, 
  onNavigate 
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिंदी' },
    { code: 'BN', name: 'বাংলা' },
    { code: 'TE', name: 'తెలుగు' },
    { code: 'MR', name: 'मराठी' },
    { code: 'TA', name: 'தமிழ்' },
    { code: 'GU', name: 'ગુજરાતી' },
    { code: 'KN', name: 'ಕನ್ನಡ' }
  ];

  const navItems = [
    { label: 'Dashboard', value: 'overview' },
    { label: 'Monitoring', value: 'monitoring' },
    { label: 'Analysis', value: 'analysis' },
    { label: 'Recommendations', value: 'recommendations' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-dark border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              data-testid="button-logo"
            >
              <Brain className="w-8 h-8 text-emerald-400" />
              <span className="text-xl font-bold gradient-text">AI CropAdvisor</span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => onNavigate(item.value)}
                    className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    data-testid={`nav-${item.value}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors glass-effect rounded-lg">
                <Globe className="w-4 h-4 mr-2" />
                {selectedLanguage}
                <ChevronDown className="w-3 h-3 ml-2" />
              </button>
              
              {/* Language Dropdown */}
              <div className="absolute right-0 mt-2 w-48 glass-dark rounded-lg border border-slate-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang.code)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      data-testid={`lang-${lang.code.toLowerCase()}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Voice Assistant Toggle */}
            <button 
              onClick={() => onVoiceToggle(!isVoiceActive)}
              className={`relative p-2 rounded-lg transition-all hover-lift ${
                isVoiceActive 
                  ? 'bg-emerald-600 text-white' 
                  : 'glass-effect text-slate-300 hover:text-emerald-400'
              }`}
              data-testid="button-voice-toggle"
            >
              <Mic className="w-5 h-5" />
              {isVoiceActive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></span>
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-slate-300 hover:text-white transition-colors glass-effect rounded-lg hover-lift">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
            </button>

            {/* Network Status */}
            <div className="flex items-center px-3 py-2 glass-effect rounded-lg">
              <Wifi className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-xs text-slate-300">Online</span>
            </div>

            {/* User Profile */}
            <button className="flex items-center px-3 py-2 text-sm font-medium text-white glass-effect rounded-lg hover-lift">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mr-2">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden lg:inline">Farmer</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    onNavigate(item.value);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                  data-testid={`mobile-nav-${item.value}`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Voice & Chat */}
              <div className="flex gap-2 px-3 py-2">
                <Button
                  onClick={() => onVoiceToggle(!isVoiceActive)}
                  variant={isVoiceActive ? "default" : "ghost"}
                  size="sm"
                  className="flex-1"
                  data-testid="button-mobile-voice"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Voice
                </Button>
                <Button
                  onClick={() => onChatToggle(!isChatOpen)}
                  variant={isChatOpen ? "default" : "ghost"}
                  size="sm"
                  className="flex-1"
                  data-testid="button-mobile-chat"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  AI Chat
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
