import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Phone, Clock, Stethoscope, ArrowLeft } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  options?: ChatOption[];
  isSpecialty?: boolean;
}

interface ChatOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const specializzazioni = [
  "Ortopedia", "Ginecologia", "Cardiologia", "Psichiatria", 
  "Reumatologia", "Endocrinologia", "Medicina Estetica", 
  "Allergologia", "Medicina dello Sport", "Chirurgia Vascolare",
  "Otorinolaringoiatria", "Neurologia", "Pneumologia", "Fisiatria",
  "Urologia", "Ecografia", "Gastroenterologia", "Nutrizione"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [, setStep] = useState<'welcome' | 'specialties' | 'contact' | 'info'>('welcome');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
    }
  }, [isOpen]);

  const startConversation = () => {
    setMessages([]);
    setStep('welcome');
    setSelectedSpecialty(null);
    
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: 1,
            text: "👋 Ciao! Sono l'assistente virtuale di PenitroMed. Come posso aiutarti oggi?",
            isBot: true,
            options: [
              { label: "🗓️ Prenotare una visita", value: "prenota" },
              { label: "ℹ️ Informazioni e orari", value: "info" },
              { label: "📍 Come raggiungerci", value: "dove" }
            ]
          }
        ]);
      }, 1000);
    }, 300);
  };

  const addBotMessage = (text: string, options?: ChatOption[], isSpecialty?: boolean) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isBot: true,
        options,
        isSpecialty
      }]);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      isBot: false
    }]);
  };

  const handleOptionClick = (value: string, label: string) => {
    addUserMessage(label.replace(/^[^\w\s]+\s*/, '')); // Rimuove emoji dal messaggio utente

    switch (value) {
      case 'prenota':
        setStep('specialties');
        setTimeout(() => {
          addBotMessage(
            "Perfetto! Per quale specializzazione desideri prenotare una visita? Scegli dalla lista qui sotto:",
            undefined,
            true
          );
        }, 300);
        break;

      case 'info':
        setStep('info');
        setTimeout(() => {
          addBotMessage(
            "📍 **PenitroMed** si trova in:\n\n**Via dei Platani, 58B**\nPenitro di Formia (LT)\n\n🕐 **Orari:**\nLun-Ven: 8:00 - 20:00\nSabato: 8:00 - 13:00\n\n🅿️ Parcheggio riservato ai pazienti\n\nPosso aiutarti con altro?",
            [
              { label: "🗓️ Prenotare una visita", value: "prenota" },
              { label: "📞 Chiama ora", value: "chiama" },
              { label: "💬 Scrivi su WhatsApp", value: "whatsapp" }
            ]
          );
        }, 300);
        break;

      case 'dove':
        setTimeout(() => {
          addBotMessage(
            "📍 Ci trovi in **Via dei Platani, 58B - Penitro di Formia (LT)**\n\n🚗 **Come arrivare:**\n• Da Formia Centro: 5 minuti in auto\n• Da Gaeta: 10 minuti via SS7\n• Da Minturno: 15 minuti via Appia\n\n🅿️ **Parcheggio gratuito** riservato ai pazienti!\n\nVuoi prenotare una visita?",
            [
              { label: "🗓️ Sì, prenota visita", value: "prenota" },
              { label: "📞 Chiama per info", value: "chiama" }
            ]
          );
        }, 300);
        break;

      case 'chiama':
        window.location.href = 'tel:+390771123456';
        break;

      case 'whatsapp':
        const msgBase = "Salve, vorrei informazioni su PenitroMed.";
        window.open(`https://wa.me/393331234567?text=${encodeURIComponent(msgBase)}`, '_blank');
        break;

      case 'altra_specialita':
        setTimeout(() => {
          addBotMessage(
            "Per specializzazioni non in elenco o informazioni specifiche, ti consiglio di contattare direttamente la nostra segreteria:",
            [
              { label: "📞 Chiama la segreteria", value: "chiama" },
              { label: "💬 Scrivi su WhatsApp", value: "whatsapp" }
            ]
          );
        }, 300);
        break;

      case 'nuova_prenotazione':
        startConversation();
        break;

      default:
        break;
    }
  };

  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty);
    addUserMessage(specialty);
    setStep('contact');

    setTimeout(() => {
      addBotMessage(
        `Ottima scelta! Per prenotare una visita di **${specialty}** puoi contattare la nostra segreteria.\n\n📞 Ti forniranno tutte le informazioni su:\n• Disponibilità del medico\n• Tariffe della visita\n• Eventuali preparazioni necessarie\n\nCome preferisci contattarci?`,
        [
          { label: "📞 Chiama ora", value: "chiama_specialty" },
          { label: "💬 WhatsApp", value: "whatsapp_specialty" }
        ]
      );
    }, 300);
  };

  const handleContactChoice = (type: 'call' | 'whatsapp') => {
    const specialty = selectedSpecialty || "una visita specialistica";
    
    if (type === 'call') {
      addUserMessage("Chiama ora");
      setTimeout(() => {
        addBotMessage(
          "📞 Ti sto collegando con la segreteria di PenitroMed...\n\nSe la linea è occupata, riprova tra qualche minuto o scrivici su WhatsApp!",
          [
            { label: "🔄 Nuova prenotazione", value: "nuova_prenotazione" }
          ]
        );
        setTimeout(() => {
          window.location.href = 'tel:+390771123456';
        }, 1500);
      }, 300);
    } else {
      addUserMessage("WhatsApp");
      const msg = `Salve, vorrei prenotare una visita di ${specialty} presso PenitroMed. Potete indicarmi le disponibilità e le tariffe? Grazie.`;
      setTimeout(() => {
        addBotMessage(
          "💬 Perfetto! Ti sto reindirizzando su WhatsApp con un messaggio precompilato. La nostra segreteria ti risponderà al più presto!",
          [
            { label: "🔄 Nuova prenotazione", value: "nuova_prenotazione" }
          ]
        );
        setTimeout(() => {
          window.open(`https://wa.me/393331234567?text=${encodeURIComponent(msg)}`, '_blank');
        }, 1000);
      }, 300);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setStep('welcome');
    setSelectedSpecialty(null);
    startConversation();
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-40 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110 ${isOpen ? 'hidden' : 'flex'} items-center gap-2 group`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Prenota ora
        </span>
        
        {/* Ping animation */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Assistente PenitroMed</h3>
                <div className="flex items-center gap-1 text-xs text-blue-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online ora
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetChat}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Ricomincia"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                        : 'bg-blue-600 text-white rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>

                {/* Options */}
                {message.options && (
                  <div className="mt-3 space-y-2">
                    {message.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (option.value === 'chiama_specialty') {
                            handleContactChoice('call');
                          } else if (option.value === 'whatsapp_specialty') {
                            handleContactChoice('whatsapp');
                          } else {
                            handleOptionClick(option.value, option.label);
                          }
                        }}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-left text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Specialty Grid */}
                {message.isSpecialty && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {specializzazioni.map((spec, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSpecialtySelect(spec)}
                        className="p-2.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm text-center"
                      >
                        {spec}
                      </button>
                    ))}
                    <button
                      onClick={() => handleOptionClick('altra_specialita', 'Altra specialità')}
                      className="col-span-2 p-2.5 bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-200 transition-all duration-200"
                    >
                      🔍 Altra specialità / Non trovo quello che cerco
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <a href="tel:+390771123456" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                <Phone className="w-3 h-3" />
                0771 123456
              </a>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Lun-Sab
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
