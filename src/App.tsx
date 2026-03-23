import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsDynamic from './components/StatsDynamic';
import SpecializationsDynamic from './components/SpecializationsDynamic';
import TeamDynamic from './components/TeamDynamic';
import Reviews from './components/Reviews';
import BlogDynamic from './components/BlogDynamic';
import Footer from './components/Footer';
import ChatbotDynamic from './components/ChatbotDynamic';
import WhatsAppButton from './components/WhatsAppButton';
import AdminPanel from './admin/AdminPanel';
import AdminLogin from './components/AdminLogin';

function AppContent() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Se l'admin panel è aperto, mostra solo quello
  if (isAdminOpen) {
    return <AdminPanel onExit={() => setIsAdminOpen(false)} />;
  }

  // Altrimenti mostra il sito pubblico e l'eventuale modale di login
  return (
    <div className="min-h-screen relative">
      <Header />
      <Hero />
      <StatsDynamic />
      <SpecializationsDynamic />
      <TeamDynamic />
      <Reviews />
      <BlogDynamic />
      <Footer onAdminClick={() => setIsLoginModalOpen(true)} />
      <ChatbotDynamic />
      <WhatsAppButton />

      {isLoginModalOpen && (
        <AdminLogin 
          onLoginSuccess={() => {
            setIsLoginModalOpen(false);
            setIsAdminOpen(true);
          }}
          onCancel={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
