import React from 'react';
import { Phone, Video, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TeamDynamic: React.FC = () => {
  const { state } = useAppContext();
  
  // Filtra solo i medici attivi
  const activeDoctors = state.doctors.filter(doc => doc.isActive);

  const getSpecNames = (specIds: string[]): string => {
    return specIds
      .map(id => state.specializations.find(s => s.id === id)?.name)
      .filter(Boolean)
      .slice(0, 2)
      .join(' • ');
  };

  return (
    <section id="equipe" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Il nostro team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            L'Equipe Medica
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professionisti qualificati e sempre aggiornati, pronti a prendersi cura di te con competenza e umanità
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                {doctor.photo ? (
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <User size={80} className="text-blue-300" />
                  </div>
                )}
                
                {doctor.videoUrl && (
                  <div className="absolute top-4 right-4">
                    <a
                      href={doctor.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors shadow-lg"
                    >
                      <Video size={16} />
                      Video presentazione
                    </a>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                  <p className="text-blue-200 font-medium text-sm">
                    {getSpecNames(doctor.specializations)}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {doctor.bio}
                </p>

                <div className="flex gap-3">
                  <a
                    href="tel:+390771123456"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Phone size={16} />
                    Prenota
                  </a>
                  {doctor.videoUrl && (
                    <a
                      href={doctor.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 border border-purple-200 text-purple-600 rounded-xl font-medium text-sm hover:bg-purple-50 transition-colors"
                    >
                      <Video size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeDoctors.length === 0 && (
          <div className="text-center py-12">
            <User size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nessun medico disponibile al momento</p>
          </div>
        )}

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-full">
            <Video size={20} />
            <span className="font-medium">
              Guarda le video-presentazioni per conoscere i nostri medici
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDynamic;
