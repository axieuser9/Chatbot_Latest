import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatMessage, ChatbotConfig, translations } from '../../types/chat';
import { detectLanguage, generateMessageId, LanguageCode } from '../../lib/utils';
import { theme } from '../../styles/theme';
import ChatHeader from './ChatHeader';
import ChatMessageComponent from './ChatMessage';
import ChatInput from './ChatInput';
import BookingModal from './BookingModal';

const defaultConfig: ChatbotConfig = {
  webhookUrl: 'https://stefan0987.app.n8n.cloud/webhook/156b9b80-a524-4116-9b0a-f93aa729a5ea',
  bookingUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0QR3uRxVB7rb4ZHqJ1qYmz-T0e2CFtV5MYekvGDq1qyWxsV_Av3nP3zEGk0DrH2HqpTLoXuK0h',
  title: translations.sv.title,
  subtitle: translations.sv.subtitle,
  language: 'sv'
};

interface ChatbotProps {
  config?: Partial<ChatbotConfig>;
}

const TypingIndicator = () => (
  <div className="flex justify-start mb-4">
    <div className="flex items-start space-x-3 max-w-[80%]">
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.lavender[500]})` 
        }}
      >
        <MessageCircle size={16} className="text-white" />
      </div>
      <div 
        className="rounded-2xl px-4 py-3 border shadow-sm"
        style={{
          backgroundColor: theme.colors.secondary.white,
          borderColor: theme.colors.secondary.gray[200]
        }}
      >
        <div className="flex space-x-1">
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ backgroundColor: theme.colors.secondary.gray[400] }}
          ></div>
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: theme.colors.secondary.gray[400],
              animationDelay: '0.1s' 
            }}
          ></div>
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              backgroundColor: theme.colors.secondary.gray[400],
              animationDelay: '0.2s' 
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export default function Chatbot({ config = {} }: ChatbotProps) {
  const finalConfig = { ...defaultConfig, ...config };
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(finalConfig.language || 'sv');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const t = translations[currentLanguage];
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: t.welcomeMessage,
      type: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(prev => [
      {
        id: '1',
        content: t.welcomeMessage,
        type: 'bot',
        timestamp: new Date()
      },
      ...prev.slice(1)
    ]);
  }, [currentLanguage, t.welcomeMessage]);

  const handleLanguageDetection = (text: string) => {
    const detectedLanguage = detectLanguage(text);
    if (detectedLanguage !== currentLanguage) {
      setCurrentLanguage(detectedLanguage);
      return detectedLanguage;
    }
    return currentLanguage;
  };

  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isLoading) return;

    const detectedLanguage = handleLanguageDetection(message);

    const userMessage: ChatMessage = {
      id: generateMessageId(),
      content: message,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams({
        message: message,
        sessionId: sessionId,
        time: new Date().toISOString()
      });

      const response = await fetch(`${finalConfig.webhookUrl}?${queryParams.toString()}`);
      const data = await response.json();
      
      let responseText = '';
      let shouldShowBooking = false;

      if (data.response) {
        responseText = data.response;
      }

      if (data.showBookingPopup) {
        shouldShowBooking = true;
        if (!responseText) {
          responseText = '**Booking System**\nOur Booking System will show in a moment!';
        }
      }

      if (typeof data.output === 'string') {
        try {
          const innerData = JSON.parse(data.output);
          if (typeof innerData === 'object' && innerData !== null) {
            if (innerData.showBookingPopup === true) {
              shouldShowBooking = true;
              responseText = '**Booking System**\nOur Booking System will show in a moment!';
            }
            if (innerData.response) {
              responseText = innerData.response;
            }
          }
        } catch {
          responseText = data.output;
        }
      }

      if (typeof data === 'string') {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.showBookingPopup === true) {
            shouldShowBooking = true;
            responseText = '**Booking System**\nOur Booking System will show in a moment!';
          }
          if (parsedData.response) {
            responseText = parsedData.response;
          }
        } catch {
          responseText = data;
        }
      }
      
      if (responseText) {
        responseText = responseText
          .replace(/\n/g, '<br/>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
      }

      const botMessage: ChatMessage = {
        id: generateMessageId(),
        content: responseText || t.errorMessage,
        type: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      if (shouldShowBooking) {
        setShowBookingModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessage = {
        id: generateMessageId(),
        content: t.errorMessage,
        type: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (message: string) => {
    setInputValue(message);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group text-white"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.lavender[500]})`
          }}
        >
          <MessageCircle size={24} className="group-hover:rotate-12 transition-transform duration-300" />
          <div 
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-pulse"
            style={{ backgroundColor: theme.colors.status.online }}
          >
            {messages.filter(m => m.type === 'bot').length}
          </div>
        </button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group text-white"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.accent.green[500]}, ${theme.colors.accent.lavender[500]})`
          }}
        >
          <MessageCircle size={24} className="group-hover:rotate-12 transition-transform duration-300" />
          <div 
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-pulse"
            style={{ backgroundColor: theme.colors.status.online }}
          >
            {messages.filter(m => m.type === 'bot').length}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-6 right-6 w-96 h-[600px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-4 duration-500"
      style={{
        backgroundColor: theme.colors.secondary.white,
        borderColor: theme.colors.secondary.gray[200]
      }}
    >
      {/* Header */}
      <ChatHeader
        title={t.title}
        subtitle={t.subtitle}
        onMinimize={() => setIsMinimized(true)}
      />

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4"
        style={{
          background: `linear-gradient(to bottom, ${theme.colors.secondary.gray[50]}, ${theme.colors.secondary.white})`
        }}
      >
        {messages.map((message) => (
          <ChatMessageComponent key={message.id} message={message} language={currentLanguage} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div 
        className="px-4 py-2 border-t"
        style={{
          backgroundColor: theme.colors.secondary.white,
          borderColor: theme.colors.secondary.gray[100]
        }}
      >
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickAction(t.quickActions.whatIsAxie)}
            className="text-xs px-3 py-2 rounded-full transition-colors border"
            style={{
              backgroundColor: theme.colors.accent.green[50],
              color: theme.colors.accent.green[700],
              borderColor: theme.colors.accent.green[200]
            }}
          >
            {t.quickActions.whatIsAxie}
          </button>
          <button
            onClick={() => handleQuickAction(t.quickActions.checkAvailability)}
            className="text-xs px-3 py-2 rounded-full transition-colors border"
            style={{
              backgroundColor: theme.colors.accent.yellow[50],
              color: theme.colors.accent.yellow[600],
              borderColor: theme.colors.accent.yellow[100]
            }}
          >
            {t.quickActions.checkAvailability}
          </button>
          <button
            onClick={() => handleQuickAction(t.quickActions.bookConsultation)}
            className="text-xs px-3 py-2 rounded-full transition-colors border"
            style={{
              backgroundColor: theme.colors.accent.lavender[50],
              color: theme.colors.accent.lavender[600],
              borderColor: theme.colors.accent.lavender[100]
            }}
          >
            {t.quickActions.bookConsultation}
          </button>
        </div>
      </div>

      {/* Input */}
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
        placeholder={t.inputPlaceholder}
        disabled={isLoading}
        sendButtonLabel={t.sendButton}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        bookingUrl={finalConfig.bookingUrl}
        title={t.bookingTitle}
        closeLabel={t.closeBooking}
      />
    </div>
  );
}