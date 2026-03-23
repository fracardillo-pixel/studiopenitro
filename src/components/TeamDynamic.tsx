import React, { useState } from 'react';
import { Phone, Video, User, X, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Doctor } from '../types';

const getYouTubeEmbedUrl = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const TeamDynamic: React.FC = () => {
  const { state } = useAppContext();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const activeDoctors = state.doctors.filter(doc => doc.isActive);
  const { phone, whatsapp, email } = state.contactInfo;
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`;
  const whatsappHref = `https://wa.me/${whatsapp.replace(/[\s+]/g, '')}`;
  const mailHref = `mailto:${email}`;

  const getSpecNames = (specIds: string[]): string => {
    return specIds
      .map(id => state.specializations.find(s => s.id === id)?.name)
      .filter(Boolean)
      .slice(0, 2)
      .join(' • ');
  };

  const getAllSpecNames = (specIds: string[]): string => {
    return specIds
      .map(id => state.specializations.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join(' • ');
  };

  const embedUrl = selectedDoctor?.videoUrl ? getYouTubeEmbedUrl(selectedDoctor.videoUrl) : null;

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
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedDoctor(doctor)}
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
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doctor); }}
                      className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors shadow-lg"
                    >
                      <Video size={16} />
                      Video presentazione
                    </button>
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
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doctor); }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Phone size={16} />
                    Prenota
                  </button>
                  {doctor.videoUrl && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doctor); }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 border border-purple-200 text-purple-600 rounded-xl font-medium text-sm hover:bg-purple-50 transition-colors"
                    >
                      <Video size={16} />
                    </button>
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

      {/* Doctor Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with photo */}
            <div className="relative h-72 overflow-hidden rounded-t-3xl">
              {selectedDoctor.photo ? (
                <img
                  src={selectedDoctor.photo}
                  alt={selectedDoctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <User size={100} className="text-blue-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">{selectedDoctor.name}</h2>
                <p className="text-blue-200 font-medium">
                  {getAllSpecNames(selectedDoctor.specializations)}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Biografia</h3>
                <p className="text-gray-700 leading-relaxed">{selectedDoctor.bio}</p>
              </div>

              {/* Video embed */}
              {embedUrl && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Video Presentazione</h3>
                  <div className="rounded-2xl overflow-hidden aspect-video">
                    <iframe
                      src={embedUrl}
                      title={`Video presentazione ${selectedDoctor.name}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Non-youtube video link */}
              {selectedDoctor.videoUrl && !embedUrl && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Video Presentazione</h3>
                  <a
                    href={selectedDoctor.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl text-purple-700 hover:bg-purple-100 transition-colors font-medium"
                  >
                    <Video size={20} />
                    <span>Guarda il video di presentazione</span>
                    <ExternalLink size={16} className="ml-auto" />
                  </a>
                </div>
              )}

              {/* Contact buttons */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Prenota una visita</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={phoneHref}
                    className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Phone size={18} />
                    Chiama
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                  <a
                    href={mailHref}
                    className="flex items-center justify-center gap-2 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-600 transition-colors"
                  >
                    <Mail size={18} />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamDynamic;
