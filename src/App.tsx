import MainWebsite from './pages/MainWebsite';
import ChatbotPage from './pages/ChatbotPage';

export default function App() {
  return (
    <div>
      {/* Main Website */}
      <MainWebsite />
      
      {/* Chatbot - Always available */}
      <ChatbotPage />
    </div>
  )
}