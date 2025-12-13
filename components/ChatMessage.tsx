import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';
import { EMOTION_THEMES } from '../constants';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  // If it's a user message, we might want to show the emotion context they sent
  const emotionContext = message.relatedEmotion;
  const theme = emotionContext ? EMOTION_THEMES[emotionContext.primary_emotion] : null;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 group animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm
          ${isUser ? 'bg-gray-800 text-white' : 'bg-white text-indigo-600'}
        `}>
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>

        {/* Bubble */}
        <div className="flex flex-col gap-1">
          {/* Metadata for User Messages showing context sent */}
          {isUser && emotionContext && theme && (
            <div className={`
              text-[10px] uppercase tracking-wider font-bold mb-1 self-end flex items-center gap-1
              ${theme.accentColor} opacity-70 group-hover:opacity-100 transition-opacity
            `}>
               <span>Context: {emotionContext.primary_emotion}</span>
               <span className="bg-current rounded-full w-1 h-1"></span>
               <span>{Math.round(emotionContext.intensity * 100)}%</span>
            </div>
          )}

          <div className={`
            p-4 rounded-2xl shadow-sm leading-relaxed text-sm md:text-base prose prose-sm max-w-none
            ${isUser 
              ? 'bg-gray-800 text-white rounded-tr-sm' 
              : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
            }
          `}>
             <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
