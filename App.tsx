import React, { useState, useRef, useEffect } from 'react';
import { EmotionType, EmotionData, Message } from './types';
import { EMOTION_THEMES } from './constants';
import { sendMessageToGemini } from './services/geminiService';
import EmotionControl from './components/EmotionControl';
import ChatMessage from './components/ChatMessage';
import DisclaimerModal from './components/DisclaimerModal';
import { Send, Loader2, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData>({
    primary_emotion: EmotionType.NEUTRAL,
    intensity: 0.5,
    confidence: 0.9,
    timestamp: new Date().toISOString()
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello. I'm capable of sensing emotional context. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Derived theme based on current emotion selection
  const activeTheme = EMOTION_THEMES[currentEmotion.primary_emotion];

  // --- Handlers ---
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    const emotionContext = { ...currentEmotion, timestamp: new Date().toISOString() };
    
    setInput('');
    setIsLoading(true);

    // Optimistic UI update
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date(),
      relatedEmotion: emotionContext
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);

    try {
      const responseText = await sendMessageToGemini(userText, emotionContext, newHistory);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I apologize, but I'm having trouble connecting to my cognitive services right now. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out bg-gradient-to-br ${activeTheme.bgGradient}`}>
      
      {showDisclaimer && <DisclaimerModal onClose={() => setShowDisclaimer(false)} />}

      <div className="container mx-auto h-screen p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
        
        {/* Left Panel: Emotion Controls (The "Sensor") */}
        <aside className="w-full md:w-80 lg:w-96 flex-shrink-0 order-2 md:order-1 h-[300px] md:h-auto">
          <EmotionControl 
            currentEmotion={currentEmotion} 
            onUpdate={setCurrentEmotion} 
          />
        </aside>

        {/* Right Panel: Chat Interface */}
        <main className="flex-1 flex flex-col bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl overflow-hidden order-1 md:order-2 h-full relative">
          
          {/* Header */}
          <header className="p-4 border-b border-white/20 flex items-center justify-between bg-white/40 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${activeTheme.bgGradient} shadow-inner`}>
                <Sparkles className={`w-5 h-5 ${activeTheme.accentColor}`} />
              </div>
              <div>
                <h1 className="font-bold text-gray-800 leading-tight">Empathic AI</h1>
                <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                  Active Mode: 
                  <span className={`${activeTheme.accentColor} font-bold transition-colors duration-500`}>
                    {currentEmotion.primary_emotion.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            
            {/* Visual Indicator of current state intensity */}
            <div className="flex items-center gap-1">
               <div className="flex gap-0.5 items-end h-6 w-12 justify-between">
                 {[...Array(5)].map((_, i) => (
                   <div 
                    key={i}
                    className={`w-1.5 rounded-t-sm transition-all duration-500 ${i / 5 < currentEmotion.intensity ? activeTheme.accentColor.replace('text', 'bg') : 'bg-gray-300'}`}
                    style={{ height: `${20 + Math.random() * 80}%`, opacity: 0.8 }}
                   />
                 ))}
               </div>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 text-sm ml-2 animate-pulse">
                <activeTheme.icon className={`w-4 h-4 animate-bounce ${activeTheme.accentColor}`} />
                <span>Analysing emotional context...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/50 border-t border-white/20 backdrop-blur-md">
            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-white/80 border-0 rounded-xl px-5 py-4 pr-12 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`
                  absolute right-2 p-2 rounded-lg transition-all duration-200
                  ${input.trim() 
                    ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
            <div className="text-center mt-2">
               <p className="text-[10px] text-gray-400">
                 AI interprets tone based on the Emotion Sensor settings in the sidebar.
               </p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default App;