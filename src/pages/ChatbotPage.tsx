import React from 'react';
import { Chatbot } from '../components/chatbot';

export default function ChatbotPage() {
  return (
    <Chatbot
      config={{
        title: 'Axie Studio Support Bot',
        subtitle: 'Axie kan hjälpa dig att navigera, förstå eller hantera dina bokningar!'
      }}
    />
  );
}