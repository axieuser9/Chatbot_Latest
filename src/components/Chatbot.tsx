import React, { useState, useRef, useEffect } from 'react';
import { Send, Calendar, Bot, User, X } from 'lucide-react';
import { ChatMessage, ChatbotConfig, translations } from '../types/chat';
import { detectLanguage, formatTime, generateMessageId, LanguageCode } from '../lib/utils';

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

// Message bubble component
const MessageBubble = ({ message, language }: { message: ChatMessage; language: LanguageCode }) => (
  <div
    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
  >
    <div className="flex items-start max-w-[80%]">
      {message.type === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center mr-2 mt-1">
          <Bot size={16} className="text-neutral-700" />
        </div>
      )}
      <div
        className={`rounded-2xl px-4 py-2 ${
          message.type === 'user'
            ? 'bg-neutral-900 text-white'
            : 'bg-neutral-100 text-neutral-900'
        }`}
      >
        <div 
          className="text-sm whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
        <div className="text-xs mt-1 opacity-70">
          {formatTime(message.timestamp, language)}
        </div>
      </div>
      {message.type === 'user' && (
        <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center ml-2 mt-1">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  </div>
);

export default function Chatbot({ config = {} }: ChatbotProps) {
  const finalConfig = { ...defaultConfig, ...config };
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(finalConfig.language || 'sv');
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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Update welcome message when language changes
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

    // Detect language from user input
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

      // Handle the response from n8n webhook - based on script.js logic
      if (data.response) {
        responseText = data.response;
      }

      // Check if we should show booking popup
      if (data.showBookingPopup) {
        shouldShowBooking = true;
      }

      // Handle nested JSON responses
      if (typeof data.output === 'string') {
        try {
          const innerData = JSON.parse(data.output);
          if (typeof innerData === 'object' && innerData !== null) {
            if (innerData.showBookingPopup === true) {
              shouldShowBooking = true;
            }
            if (innerData.response) {
              responseText = innerData.response;
            }
          }
        } catch (innerError) {
          responseText = data.output;
        }
      }

      // Try to parse the entire response as JSON if it's a string
      if (typeof data === 'string') {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.showBookingPopup === true) {
            shouldShowBooking = true;
          }
          if (parsedData.response) {
            responseText = parsedData.response;
          }
        } catch (parseError) {
          responseText = data;
        }
      }
      
      // Format the response text with basic markdown
      if (responseText) {
        responseText = responseText
          .replace(/\n/g, '<br/>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
      }

      const botMessage: ChatMessage = {
        id: generateMessageId(),
        content: responseText || 'Sorry, there was an error processing your message.',
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
        content: 'Sorry, there was an error processing your message.',
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

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-900 text-white p-4 flex items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-medium text-lg">{t.title}</h3>
            <p className="text-neutral-300 text-sm">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} language={currentLanguage} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                <Bot size={16} className="text-neutral-700" />
              </div>
              <div className="bg-neutral-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 pt-2 pb-1 border-t border-neutral-100 bg-white">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickAction(t.quickActions.whatIsAxie)}
            className="text-sm px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-700"
          >
            {t.quickActions.whatIsAxie}
          </button>
          <button
            onClick={() => handleQuickAction(t.quickActions.checkAvailability)}
            className="text-sm px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-700"
          >
            {t.quickActions.checkAvailability}
          </button>
          <button
            onClick={() => handleQuickAction(t.quickActions.bookConsultation)}
            className="text-sm px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-700"
          >
            {t.quickActions.bookConsultation}
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-neutral-100 bg-white">
        <div className="flex items-end space-x-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.inputPlaceholder}
            className="flex-1 resize-none border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent max-h-24 text-sm"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-neutral-900 text-white p-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
            aria-label={t.sendButton}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center">
                  <Calendar className="text-white" size={20} />
                </div>
                <h2 className="text-2xl font-medium text-neutral-900">{t.bookingTitle}</h2>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-2"
                aria-label={t.closeBooking}
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={finalConfig.bookingUrl}
                className="w-full h-full border-none"
                title={t.bookingTitle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}