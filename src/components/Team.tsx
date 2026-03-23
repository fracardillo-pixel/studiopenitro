import { Play, Phone } from 'lucide-react';

interface Doctor {
  name: string;
  specialization: string;
  image: string;
  hasVideo: boolean;
}

const doctors: Doctor[] = [
  {
    name: 'Dott. Marco Rossi',
    specialization: 'Cardiologia',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hasVideo: true,
  },
  {
    name: 'Dott.ssa Laura Bianchi',
    specialization: 'Ginecologia',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hasVideo: true,
  },
  {
    name: 'Dott. Giuseppe Verdi',
    specialization: 'Ortopedia',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hasVideo: true,
  },
  {
    name: 'Dott.ssa Anna Ferrari',
    specialization: 'Medicina Estetica',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hasVideo: false,
  },
  {
    name: 'Dott. Francesco Russo',
    specialization: 'Chirurgia Vascolare',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hasVideo: true,
  },
  {
    name: 'Dott.ssa Elena Marino',
    specialization: 'Endocrinologia',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hasVideo: false,
  },
];

export default function Team() {
  return (
    <section id="equipe" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            Il Nostro Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            La nostra Équipe Medica
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professionisti qualificati, con anni di esperienza e un approccio umano alla medicina. 
            Conosci i nostri medici attraverso le loro video-presentazioni.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent"></div>
                
                {/* Video Badge */}
                {doctor.hasVideo && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-full text-sm font-medium shadow-lg">
                    <Play size={16} fill="white" />
                    <span>Video</span>
                  </div>
                )}

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                  <p className="text-blue-200 font-medium">{doctor.specialization}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 bg-gray-50">
                <div className="flex gap-3">
                  {doctor.hasVideo && (
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors">
                      <Play size={18} />
                      <span>Guarda il video</span>
                    </button>
                  )}
                  <a
                    href="tel:+390771000000"
                    className={`flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors ${!doctor.hasVideo ? 'flex-1' : ''}`}
                  >
                    <Phone size={18} />
                    <span>Prenota</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Vuoi conoscere tutti i medici della nostra struttura?</p>
          <a
            href="tel:+390771000000"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors"
          >
            <Phone size={20} />
            <span>Contatta la Segreteria</span>
          </a>
        </div>
      </div>
    </section>
  );
}
