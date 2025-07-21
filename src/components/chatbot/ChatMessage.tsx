import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { formatTime, LanguageCode } from '../../lib/utils';
import { theme } from '../../styles/theme';

interface ChatMessageProps {
  message: ChatMessageType;
  language: LanguageCode;
}

export default function ChatMessage({ message, language }: ChatMessageProps) {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4 animate-in slide-in-from-bottom-2 duration-300`}>
      <div className="flex items-start max-w-[85%] group">
        {message.type === 'bot' && (
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.lavender[500]})` 
            }}
          >
            <Bot size={16} className="text-white" />
          </div>
        )}
        <div className="flex flex-col">
          <div 
            className={`rounded-2xl px-4 py-3 shadow-sm ${
              message.type === 'user'
                ? 'ml-auto text-white'
                : 'border'
            }`}
            style={{
              backgroundColor: message.type === 'user' 
                ? theme.colors.primary.dark 
                : theme.colors.secondary.white,
              color: message.type === 'user' 
                ? theme.colors.secondary.white 
                : theme.colors.primary.dark,
              borderColor: message.type === 'bot' 
                ? theme.colors.secondary.gray[200] 
                : 'transparent'
            }}
          >
            <div 
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: message.content }}
            />
          </div>
          <div className={`text-xs mt-1 opacity-60 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp, language)}
          </div>
        </div>
        {message.type === 'user' && (
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center ml-3 mt-1 shadow-lg"
            style={{ backgroundColor: theme.colors.secondary.gray[600] }}
          >
            <User size={16} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
}