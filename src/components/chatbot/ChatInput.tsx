import React from 'react';
import { Send } from 'lucide-react';
import { theme } from '../../styles/theme';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  placeholder: string;
  disabled: boolean;
  sendButtonLabel: string;
}

export default function ChatInput({ 
  value, 
  onChange, 
  onSend, 
  onKeyPress, 
  placeholder, 
  disabled, 
  sendButtonLabel 
}: ChatInputProps) {
  return (
    <div className="p-4 border-t" style={{ 
      backgroundColor: theme.colors.secondary.white,
      borderColor: theme.colors.secondary.gray[200]
    }}>
      <div className="flex items-end space-x-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          className="flex-1 resize-none border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent max-h-24 text-sm transition-all duration-200"
          style={{
            borderColor: theme.colors.secondary.gray[300],
            backgroundColor: theme.colors.secondary.white,
            color: theme.colors.primary.dark,
          }}
          rows={1}
          disabled={disabled}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="p-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 transform hover:scale-105 text-white"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.green[600]})`,
          }}
          aria-label={sendButtonLabel}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}