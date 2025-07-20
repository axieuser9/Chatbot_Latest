export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatbotConfig {
  webhookUrl: string;
  bookingUrl: string;
  title: string;
  subtitle: string;
  language?: 'sv' | 'en';
}

export const translations = {
  sv: {
    title: 'Axie Studio Support Bot',
    subtitle: 'Axie kan hjälpa dig att navigera, förstå eller hantera dina bokningar!',
    inputPlaceholder: 'Skriv ditt meddelande...',
    sendButton: 'Skicka meddelande',
    openChat: 'Öppna chat',
    closeChat: 'Stäng chat',
    bookingTitle: 'Boka ett möte',
    closeBooking: 'Stäng bokning',
    errorMessage: 'Tyvärr uppstod ett fel vid behandling av ditt meddelande. Försök igen.',
    welcomeMessage: 'Hej! Jag är här för att hjälpa dig. Ställ gärna frågor eller boka ett möte.',
    quickActions: {
      title: 'Föreslagna frågor:',
      whatIsAxie: 'Vad är Axie Studio?',
      checkAvailability: 'Kolla tillgänglighet',
      bookConsultation: 'Boka en konsultation'
    }
  },
  en: {
    title: 'Axie Studio Support Bot',
    subtitle: 'Axie can help you navigate, understand or manage your bookings!',
    inputPlaceholder: 'Type your message...',
    sendButton: 'Send message',
    openChat: 'Open chat',
    closeChat: 'Close chat',
    bookingTitle: 'Schedule a Meeting',
    closeBooking: 'Close booking',
    errorMessage: 'Sorry, there was an error processing your message. Please try again.',
    welcomeMessage: 'Hello! I\'m here to help you. Feel free to ask me anything or schedule a meeting.',
    quickActions: {
      title: 'Suggested questions:',
      whatIsAxie: 'What is Axie Studio?',
      checkAvailability: 'Check availability',
      bookConsultation: 'Book a consultation'
    }
  }
};