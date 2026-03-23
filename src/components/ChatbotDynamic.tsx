import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Phone, RotateCcw, User, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { 
  getActiveSpecializationsWithDoctors, 
  generateContactLink, 
  generateClinicWhatsAppLink,
  formatDoctorSchedule 
} from '../utils/chatbotHelpers';
import { Doctor, Specialization } from '../types';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  options?: ChatOption[];
  specializations?: Specialization[];
  doctors?: { doctor: Doctor; schedule: any }[];
}

interface ChatOption {
  id: string;
  label: string;
  icon?: string;
}

const ChatbotDynamic: React.FC = () => {
  const { state } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      showWelcomeMessage();
    }
  }, [isOpen]);

  const showWelcomeMessage = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: 1,
          text: 'Ciao! 👋 Sono l\'assistente virtuale di PenitroMed. Come posso aiutarti oggi?',
          isBot: true,
          options: [
            { id: 'book', label: '🗓️ Prenotare una visita', icon: 'calendar' },
            { id: 'info', label: 'ℹ️ Informazioni e orari', icon: 'info' },
            { id: 'location', label: '📍 Come raggiungerci', icon: 'map' },
          ],
        },
      ]);
    }, 500);
  };

  const addBotMessage = (text: string, options?: ChatOption[], extra?: Partial<Message>) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text,
          isBot: true,
          options,
          ...extra,
        },
      ]);
    }, 600);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        isBot: false,
      },
    ]);
  };

  const handleOptionClick = (optionId: string) => {
    const activeSpecsWithDoctors = getActiveSpecializationsWithDoctors(state);
    const activeSpecs = activeSpecsWithDoctors.map(s => s.specialization);

    switch (optionId) {
      case 'book':
        addUserMessage('Vorrei prenotare una visita');
        addBotMessage(
          'Perfetto! Quale specializzazione ti interessa? Seleziona tra quelle disponibili:',
          undefined,
          { specializations: activeSpecs }
        );
        break;

      case 'info':
        addUserMessage('Informazioni e orari');
        const clinicHours = state.clinicHours.weekSchedule;
        const openDays = Object.entries(clinicHours)
          .filter(([_, day]) => (day as any).isOpen)
          .map(([dayKey, day]) => {
            const dayData = day as { slots: { start: string; end: string }[] };
            const slots = dayData.slots.map(s => `${s.start}-${s.end}`).join(', ');
            const dayNames: Record<string, string> = {
              monday: 'Lun',
              tuesday: 'Mar',
              wednesday: 'Mer',
              thursday: 'Gio',
              friday: 'Ven',
              saturday: 'Sab',
              sunday: 'Dom',
            };
            return `${dayNames[dayKey]}: ${slots}`;
          })
          .join('\n');

        addBotMessage(
          `📍 PenitroMed\nVia dei Platani, 58B\nPenitro di Formia (LT)\n\n🕐 Orari:\n${openDays}\n\n📞 Tel: 0771 123456\n\nPosso aiutarti con altro?`,
          [
            { id: 'book', label: '🗓️ Prenota visita', icon: 'calendar' },
            { id: 'location', label: '📍 Indicazioni', icon: 'map' },
          ]
        );
        break;

      case 'location':
        addUserMessage('Come raggiungervi');
        addBotMessage(
          '📍 Ci trovi in Via dei Platani, 58B - Penitro di Formia (LT)\n\n🚗 Da Formia Centro: 5 minuti\n🚗 Da Gaeta: 10 minuti\n🚗 Da Minturno: 8 minuti\n\n🅿️ Parcheggio riservato ai pazienti\n\nVuoi prenotare una visita?',
          [
            { id: 'book', label: '🗓️ Prenota visita', icon: 'calendar' },
            { id: 'call', label: '📞 Chiama ora', icon: 'phone' },
          ]
        );
        break;

      case 'call':
        window.location.href = 'tel:+390771123456';
        break;

      case 'whatsapp':
        window.open(generateClinicWhatsAppLink(selectedSpec || undefined), '_blank');
        break;

      case 'restart':
        setMessages([]);
        setSelectedSpec(null);
        showWelcomeMessage();
        break;

      default:
        // Gestione selezione specializzazione
        if (optionId.startsWith('spec_')) {
          const specId = optionId.replace('spec_', '');
          const specData = activeSpecsWithDoctors.find(s => s.specialization.id === specId);
          
          if (specData) {
            setSelectedSpec(specData.specialization.name);
            addUserMessage(specData.specialization.name);

            if (specData.doctors.length > 0) {
              addBotMessage(
                `Ottima scelta! Ecco i nostri specialisti in ${specData.specialization.name}:`,
                undefined,
                { doctors: specData.doctors }
              );
            } else {
              addBotMessage(
                `Per ${specData.specialization.name} i nostri specialisti hanno disponibilità variabile. Contatta la segreteria per maggiori informazioni:`,
                [
                  { id: 'call', label: '📞 Chiama', icon: 'phone' },
                  { id: 'whatsapp', label: '💬 WhatsApp', icon: 'message' },
                ]
              );
            }
          }
        }

        // Gestione selezione medico
        if (optionId.startsWith('doc_')) {
          const docId = optionId.replace('doc_', '');
          const doctor = state.doctors.find(d => d.id === docId);
          
          if (doctor) {
            const schedule = state.doctorSchedules.find(ds => ds.doctorId === docId);
            const scheduleText = formatDoctorSchedule(schedule);
            const whatsappLink = generateContactLink(doctor, selectedSpec || 'visita specialistica', 'whatsapp');
            const phoneLink = generateContactLink(doctor, selectedSpec || 'visita specialistica', 'phone');

            addUserMessage(`Voglio prenotare con ${doctor.name}`);
            addBotMessage(
              `Perfetto! ${doctor.name} riceve:\n${scheduleText}\n\nPer prenotare la tua visita${selectedSpec ? ` di ${selectedSpec}` : ''}, contattaci:`,
              [
                { id: 'call_doc', label: '📞 Chiama', icon: 'phone' },
                { id: 'whatsapp_doc', label: '💬 WhatsApp', icon: 'message' },
                { id: 'restart', label: '🔄 Altra specializzazione', icon: 'refresh' },
              ]
            );

            // Salva i link per questo medico
            (window as any).__penitromed_contact = { whatsappLink, phoneLink, doctor };
          }
        }

        if (optionId === 'call_doc') {
          const contact = (window as any).__penitromed_contact;
          if (contact?.phoneLink) {
            window.location.href = contact.phoneLink.url;
          }
        }

        if (optionId === 'whatsapp_doc') {
          const contact = (window as any).__penitromed_contact;
          if (contact?.whatsappLink) {
            window.open(contact.whatsappLink.url, '_blank');
          }
        }
    }
  };

  const handleSpecClick = (spec: Specialization) => {
    handleOptionClick(`spec_${spec.id}`);
  };

  const handleDoctorClick = (doctor: Doctor) => {
    handleOptionClick(`doc_${doctor.id}`);
  };

  return (
    <>
      {/* Pulsante Chatbot */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      </button>

      {/* Finestra Chat */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">PenitroMed</h3>
                <p className="text-blue-200 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMessages([]);
                  setSelectedSpec(null);
                  showWelcomeMessage();
                }}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Ricomincia"
              >
                <RotateCcw size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Messaggi */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.isBot
                      ? 'bg-gray-100 text-gray-800 rounded-bl-md'
                      : 'bg-blue-600 text-white rounded-br-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </div>

              {/* Opzioni */}
              {msg.options && (
                <div className="mt-3 space-y-2">
                  {msg.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(opt.id)}
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Griglia Specializzazioni */}
              {msg.specializations && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {msg.specializations.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => handleSpecClick(spec)}
                      className="p-3 text-left bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-800">{spec.name}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Lista Medici */}
              {msg.doctors && (
                <div className="mt-3 space-y-2">
                  {msg.doctors.map(({ doctor, schedule }) => (
                    <button
                      key={doctor.id}
                      onClick={() => handleDoctorClick(doctor)}
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {doctor.photo ? (
                          <img
                            src={doctor.photo}
                            alt={doctor.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User size={20} className="text-blue-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{doctor.name}</p>
                          {schedule && (
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock size={10} />
                              Disponibile
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <a
                      href="tel:+390771123456"
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Phone size={16} />
                      Chiama
                    </a>
                    <a
                      href={generateClinicWhatsAppLink(selectedSpec || undefined)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <a
              href="tel:+390771123456"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <Phone size={18} />
              Chiama
            </a>
            <a
              href={generateClinicWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotDynamic;
