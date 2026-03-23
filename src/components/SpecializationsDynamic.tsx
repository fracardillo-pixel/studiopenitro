import React from 'react';
import { Phone } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SpecializationsDynamic: React.FC = () => {
  const { state } = useAppContext();
  
  // Filtra solo le specializzazioni attive
  const activeSpecs = state.specializations.filter(spec => spec.isActive);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon size={28} /> : <LucideIcons.Stethoscope size={28} />;
  };

  return (
    <section id="specializzazioni" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            I nostri servizi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Le nostre Specializzazioni
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Un'ampia gamma di servizi medici specialistici per prenderci cura della tua salute a 360 gradi
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeSpecs.map((spec) => (
            <div
              key={spec.id}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {getIcon(spec.icon)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {spec.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {spec.description}
              </p>
              <a
                href="tel:+390771123456"
                className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
              >
                <Phone size={16} />
                Contatta la segreteria
              </a>
            </div>
          ))}
        </div>

        {activeSpecs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nessuna specializzazione disponibile al momento</p>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Per informazioni su tariffe e preparazioni, contatta la nostra segreteria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+390771123456"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <Phone size={20} />
              Chiama 0771 123456
            </a>
            <a
              href="https://wa.me/390771123456?text=Buongiorno%2C%20vorrei%20informazioni%20sulle%20vostre%20specializzazioni.%20Grazie."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Scrivi su WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializationsDynamic;
