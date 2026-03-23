import { useMemo } from 'react';
import { Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { WeekSchedule } from '../types';

// Helper per convertire le chiavi inglesi in italiano abbreviato
const dayNames: { key: keyof WeekSchedule; abbr: string; full: string }[] = [
  { key: 'monday', abbr: 'Lun', full: 'Lunedì' },
  { key: 'tuesday', abbr: 'Mar', full: 'Martedì' },
  { key: 'wednesday', abbr: 'Mer', full: 'Mercoledì' },
  { key: 'thursday', abbr: 'Gio', full: 'Giovedì' },
  { key: 'friday', abbr: 'Ven', full: 'Venerdì' },
  { key: 'saturday', abbr: 'Sab', full: 'Sabato' },
  { key: 'sunday', abbr: 'Dom', full: 'Domenica' },
];

export default function Hero() {
  const { state } = useAppContext();
  
  // Formatta gli orari del poliambulatorio per la visualizzazione raggruppando i giorni
  const groupedSchedules = useMemo(() => {
    const weekSchedule = state.clinicHours?.weekSchedule;
    if (!weekSchedule) return [];

    // Estrai le info base per ogni giorno attivo
    const activeDaysInfo = dayNames.map(({ key, abbr }) => {
      const day = weekSchedule[key];
      if (!day || !day.isOpen || !day.slots || day.slots.length === 0) return null;
      
      // Unisce le fasce orarie spezzate: "09:00-13:00 / 15:00-19:00"
      const hours = day.slots.map(s => `${s.start}-${s.end}`).join(' / ');
      return { abbr, hours };
    }).filter(Boolean) as { abbr: string; hours: string }[];

    if (activeDaysInfo.length === 0) return [];

    // Raggruppa giorni consecutivi con gli stessi orari
    const groups: { startAbbr: string; endAbbr: string; hours: string }[] = [];
    let currentGroup = { 
      startAbbr: activeDaysInfo[0].abbr, 
      endAbbr: activeDaysInfo[0].abbr, 
      hours: activeDaysInfo[0].hours 
    };

    for (let i = 1; i < activeDaysInfo.length; i++) {
      const currentDay = activeDaysInfo[i];
      if (currentDay.hours === currentGroup.hours) {
        currentGroup.endAbbr = currentDay.abbr;
      } else {
        groups.push({ ...currentGroup });
        currentGroup = { 
          startAbbr: currentDay.abbr, 
          endAbbr: currentDay.abbr, 
          hours: currentDay.hours 
        };
      }
    }
    groups.push(currentGroup);

    // Formatta il testo dei gruppi (es. "Lun - Ven" o "Sab")
    return groups.map(g => {
      let days = g.startAbbr;
      if (g.startAbbr !== g.endAbbr) {
        days = `${g.startAbbr} - ${g.endAbbr}`;
      }
      return { days, hours: g.hours };
    });
  }, [state.clinicHours]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Accettiamo nuovi pazienti
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight mb-6">
              La tua salute al centro,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                a Penitro di Formia
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Un'équipe di oltre <strong>20 medici specialisti</strong> in 15+ branche mediche, 
              pronti ad accoglierti con professionalità, empatia e tecnologie all'avanguardia.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {['Visite specialistiche', 'Medicina estetica', 'Ecografie'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="text-teal-500" size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="tel:+390771000000"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-300 font-semibold text-lg"
              >
                <Phone size={22} />
                <span>Chiama ora</span>
              </a>
              <a
                href="https://wa.me/39331000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all shadow-lg shadow-green-200 font-semibold text-lg"
              >
                <MessageCircle size={22} />
                <span>Scrivici su WhatsApp</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Riconosciuto per qualità e professionalità</p>
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">4.9/5 su Google</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://i.ibb.co/4wdCJQJW/penitromed4.png"
                alt="Team medico PenitroMed"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 z-20 hidden sm:block min-w-[280px]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-base font-bold text-blue-900 mb-2 leading-none">Orari di Apertura</h3>
                  {groupedSchedules.length > 0 ? (
                    <div className="space-y-1.5">
                      {groupedSchedules.map((schedule, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm gap-4">
                          <span className="font-semibold text-gray-700">{schedule.days}:</span>
                          <span className="text-gray-600 font-medium whitespace-nowrap">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Chiamaci per info</p>
                  )}
                </div>
              </div>
            </div>

            {/* Another floating card */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 z-20 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-blue-900">+500</p>
                  <p className="text-sm text-gray-500">Pazienti soddisfatti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
