import { Phone, Mail, MapPin, Clock, Car, Facebook, Instagram, Linkedin, Settings } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer id="contatti" className="bg-blue-900 text-white">
      {/* Contact & Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Come Raggiungerci</h2>
            <p className="text-blue-200 mb-8">
              Siamo facilmente raggiungibili da Formia centro e dai comuni limitrofi. 
              Parcheggio riservato ai pazienti disponibile presso la struttura.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Indirizzo</h3>
                  <p className="text-blue-200">Via dei Platani, 58B</p>
                  <p className="text-blue-200">04023 Penitro di Formia (LT)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Telefono</h3>
                  <a href="tel:+390771000000" className="text-blue-200 hover:text-white transition-colors">
                    +39 0771 000 000
                  </a>
                  <p className="text-sm text-blue-300 mt-1">WhatsApp: +39 331 000 0000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <a href="mailto:info@penitromed.it" className="text-blue-200 hover:text-white transition-colors">
                    info@penitromed.it
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Orari di Apertura</h3>
                  <p className="text-blue-200">Lunedì - Venerdì: 08:00 - 20:00</p>
                  <p className="text-blue-200">Sabato: 08:00 - 13:00</p>
                  <p className="text-blue-300 text-sm">Domenica: Chiuso</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Car size={24} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Parcheggio</h3>
                  <p className="text-blue-200">Parcheggio riservato ai pazienti</p>
                  <p className="text-sm text-blue-300">Gratuito e direttamente presso la struttura</p>
                </div>
              </div>
            </div>

            {/* Directions */}
            <div className="mt-8 p-6 bg-blue-800/50 rounded-2xl">
              <h3 className="font-semibold text-lg mb-3">Come arrivare</h3>
              <ul className="space-y-2 text-blue-200">
                <li><strong>Da Formia centro:</strong> 10 minuti in auto via SS7</li>
                <li><strong>Da Gaeta:</strong> 15 minuti via Via Flacca</li>
                <li><strong>Da Minturno:</strong> 12 minuti via SS7</li>
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden h-[500px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.5!2d13.5833!3d41.2667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia%20dei%20Platani%2058B%2C%20Penitro%20di%20Formia!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa PenitroMed - Via dei Platani 58B, Penitro di Formia"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <div>
                <span className="text-xl font-bold">Penitro<span className="text-teal-400">Med</span></span>
                <p className="text-xs text-blue-300">Poliambulatorio Medico</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-blue-300 text-sm">
                © {new Date().getFullYear()} PenitroMed. Tutti i diritti riservati.
              </p>
              <p className="text-blue-400 text-xs mt-1">
                P.IVA: 00000000000 | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Cookie Policy</a>
              </p>
            </div>
          </div>

          {/* Admin Test Button - discreto in basso */}
          {onAdminClick && (
            <div className="mt-6 pt-4 border-t border-blue-800/50 flex justify-center">
              <button
                onClick={onAdminClick}
                className="flex items-center gap-2 px-4 py-2 text-xs text-blue-400 hover:text-white hover:bg-blue-800 rounded-lg transition-all duration-200 opacity-60 hover:opacity-100"
              >
                <Settings size={14} />
                Admin Test
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
