import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/39331000000?text=Ciao%2C%20vorrei%20informazioni%20sui%20vostri%20servizi%20medici"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="Contattaci su WhatsApp"
    >
      {/* Pulse animation */}
      <span className="absolute inset-0 animate-ping bg-green-500 rounded-full opacity-25"></span>
      
      {/* Button */}
      <div className="relative flex items-center gap-3 px-5 py-4 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-105">
        <MessageCircle size={28} className="flex-shrink-0" />
        <span className="hidden sm:block font-semibold whitespace-nowrap">
          Scrivici su WhatsApp
        </span>
      </div>

      {/* Tooltip on mobile */}
      <div className="sm:hidden absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Scrivici su WhatsApp
        <div className="absolute top-full left-4 border-8 border-transparent border-t-gray-900"></div>
      </div>
    </a>
  );
}
