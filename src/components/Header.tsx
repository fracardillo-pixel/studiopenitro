import { useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useAppContext();
  const { phone, whatsapp } = state.contactInfo;

  const phoneHref = `tel:${phone.replace(/\s/g, '')}`;
  const whatsappHref = `https://wa.me/${whatsapp.replace(/[\s+]/g, '')}`;

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Specializzazioni', href: '#specializzazioni' },
    { name: 'Equipe Medica', href: '#equipe' },
    { name: 'Recensioni', href: '#recensioni' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contatti', href: '#contatti' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Double click per accedere all'admin */}
          <a 
            href="#home" 
            className="flex items-center gap-3"
            onDoubleClick={(e) => {
              e.preventDefault();
              window.location.hash = 'admin';
            }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-900">Penitro<span className="text-teal-500">Med</span></span>
              <p className="text-xs text-gray-500 -mt-1">Poliambulatorio Medico</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={phoneHref}
              className="flex items-center gap-2 px-4 py-2 text-blue-700 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium"
            >
              <Phone size={18} />
              <span>Chiama ora</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-medium"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-3 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <a
                href={phoneHref}
                className="flex items-center justify-center gap-2 px-4 py-3 text-blue-700 border-2 border-blue-600 rounded-full font-medium"
              >
                <Phone size={18} />
                <span>Chiama ora</span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-full font-medium"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
