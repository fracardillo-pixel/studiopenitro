import React from 'react';
import {
  Stethoscope,
  Users,
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  Phone,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface DashboardSectionProps {
  onNavigate: (section: string) => void;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ onNavigate }) => {
  const { state } = useAppContext();

  const stats = [
    {
      label: 'Specializzazioni Attive',
      value: state.specializations.filter((s) => s.isActive).length,
      total: state.specializations.length,
      icon: Stethoscope,
      color: 'blue',
      section: 'specializations',
    },
    {
      label: 'Medici Attivi',
      value: state.doctors.filter((d) => d.isActive).length,
      total: state.doctors.length,
      icon: Users,
      color: 'green',
      section: 'doctors',
    },
    {
      label: 'Orari Configurati',
      value: state.doctorSchedules.length,
      total: state.doctors.length,
      icon: Calendar,
      color: 'purple',
      section: 'schedule',
    },
    {
      label: 'Articoli Pubblicati',
      value: state.blogArticles.filter((a) => a.isPublished).length,
      total: state.blogArticles.length,
      icon: FileText,
      color: 'orange',
      section: 'blog',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; iconBg: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100' },
      green: { bg: 'bg-green-50', text: 'text-green-600', iconBg: 'bg-green-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', iconBg: 'bg-orange-100' },
    };
    return colors[color] || colors.blue;
  };

  // Specializzazioni senza medici attivi
  const specsWithoutDoctors = state.specializations.filter((spec) => {
    if (!spec.isActive) return false;
    return !state.doctors.some(
      (doc) => doc.isActive && doc.specializations.includes(spec.id)
    );
  });

  // Medici senza orari
  const doctorsWithoutSchedule = state.doctors.filter((doc) => {
    if (!doc.isActive) return false;
    return !state.doctorSchedules.some((ds) => ds.doctorId === doc.id);
  });

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Benvenuto nel Pannello Admin</h2>
        <p className="text-blue-100">
          Gestisci le specializzazioni, l'equipe medica, gli orari e i contenuti del sito
          PenitroMed.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const colors = getColorClasses(stat.color);
          const Icon = stat.icon;
          return (
            <button
              key={stat.label}
              onClick={() => onNavigate(stat.section)}
              className={`${colors.bg} rounded-xl p-6 text-left hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${colors.iconBg} ${colors.text} p-3 rounded-xl`}>
                  <Icon size={24} />
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <TrendingUp size={14} />
                  <span>
                    {stat.value}/{stat.total}
                  </span>
                </div>
              </div>
              <p className={`text-3xl font-bold ${colors.text} mb-1`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </button>
          );
        })}
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Avvisi */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">⚠️ Avvisi</h3>
          
          {specsWithoutDoctors.length === 0 && doctorsWithoutSchedule.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-green-600 font-medium">✓ Tutto configurato correttamente!</p>
              <p className="text-sm text-gray-500 mt-1">
                Non ci sono problemi da segnalare
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {specsWithoutDoctors.map((spec) => (
                <div
                  key={spec.id}
                  className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
                >
                  <Stethoscope size={18} className="text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-800">
                      {spec.name} senza medici
                    </p>
                    <p className="text-xs text-orange-600">
                      Assegna almeno un medico a questa specializzazione
                    </p>
                  </div>
                </div>
              ))}
              
              {doctorsWithoutSchedule.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg"
                >
                  <Clock size={18} className="text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-800">
                      {doc.name} senza orari
                    </p>
                    <p className="text-xs text-yellow-600">
                      Configura gli orari di disponibilità
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contatti Rapidi */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">📞 Contatti Configurati</h3>
            <button
              onClick={() => onNavigate('contacts')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Modifica →
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-400 uppercase">Telefono</p>
                <p className="text-sm font-semibold text-gray-800">{state.contactInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-green-400 uppercase">WhatsApp</p>
                <p className="text-sm font-semibold text-gray-800">{state.contactInfo.whatsapp}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-teal-50 rounded-lg">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-teal-400 uppercase">Email</p>
                <p className="text-sm font-semibold text-gray-800">{state.contactInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultimi articoli */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">📝 Ultimi Articoli</h3>
          <button
            onClick={() => onNavigate('blog')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Vedi tutti →
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {state.blogArticles.slice(0, 3).map((article) => (
            <div key={article.id} className="py-3 flex items-center gap-4">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-16 h-12 object-cover rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{article.title}</p>
                <p className="text-sm text-gray-500">
                  {article.author} · {article.category}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  article.isPublished
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {article.isPublished ? 'Pubblicato' : 'Bozza'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
