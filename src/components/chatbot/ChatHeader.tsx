import React from 'react';
import { Bot, Minimize2 } from 'lucide-react';
import { theme } from '../../styles/theme';

interface ChatHeaderProps {
  title: string;
  subtitle: string;
  onMinimize: () => void;
}

export default function ChatHeader({ title, subtitle, onMinimize }: ChatHeaderProps) {
  return (
    <div 
      className="p-4 flex items-center justify-between text-white"
      style={{ backgroundColor: theme.colors.primary.dark }}
    >
      <div className="flex items-center space-x-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Bot size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm opacity-90" style={{ color: theme.colors.accent.green[100] }}>
            {subtitle}
          </p>
        </div>
      </div>
      <button
        onClick={onMinimize}
        className="p-2 rounded-lg transition-all duration-200 hover:bg-white/20"
        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
      >
        <Minimize2 size={18} />
      </button>
    </div>
  );
}