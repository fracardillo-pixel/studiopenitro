import { 
  Heart, 
  Bone, 
  Baby, 
  Brain, 
  Ear, 
  Pill, 
  Activity,
  Scan,
  Sparkles,
  Wind,
  Dumbbell,
  Stethoscope,
  Droplets,
  Phone,
  ArrowRight,
  Apple,
  Syringe,
  CircleDot
} from 'lucide-react';

interface Specialization {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const specializations: Specialization[] = [
  {
    icon: <Bone size={32} />,
    name: 'Ortopedia',
    description: 'Visite ortopediche, trattamento patologie muscolo-scheletriche, infiltrazioni articolari.',
  },
  {
    icon: <Baby size={32} />,
    name: 'Ginecologia',
    description: 'Visite ginecologiche, ecografie, pap test, controlli in gravidanza e menopausa.',
  },
  {
    icon: <Heart size={32} />,
    name: 'Cardiologia',
    description: 'Visite cardiologiche, ECG, Holter pressorio e cardiaco, ecocardiogramma.',
  },
  {
    icon: <Brain size={32} />,
    name: 'Psichiatria',
    description: 'Visite psichiatriche, diagnosi e trattamento disturbi dell\'umore e ansia.',
  },
  {
    icon: <Activity size={32} />,
    name: 'Reumatologia',
    description: 'Diagnosi e cura di artriti, artrosi, osteoporosi e malattie autoimmuni.',
  },
  {
    icon: <Pill size={32} />,
    name: 'Endocrinologia',
    description: 'Visite endocrinologiche, ecografie tiroidee, gestione diabete e metabolismo.',
  },
  {
    icon: <Sparkles size={32} />,
    name: 'Medicina Estetica',
    description: 'Trattamenti estetici, filler, botox, biorivitalizzazione e chirurgia plastica.',
  },
  {
    icon: <Syringe size={32} />,
    name: 'Allergologia',
    description: 'Test allergologici, prick test, diagnosi e trattamento allergie e intolleranze.',
  },
  {
    icon: <Dumbbell size={32} />,
    name: 'Medicina dello Sport',
    description: 'Certificati medico-sportivi, valutazione funzionale, prevenzione infortuni.',
  },
  {
    icon: <CircleDot size={32} />,
    name: 'Chirurgia Vascolare',
    description: 'Visite angiologiche, ecocolordoppler arterioso e venoso, trattamento varici.',
  },
  {
    icon: <Ear size={32} />,
    name: 'Otorinolaringoiatria',
    description: 'Visite ORL, esame audiometrico, impedenzometria, rinofibroscopia.',
  },
  {
    icon: <Brain size={32} />,
    name: 'Neurologia',
    description: 'Visite neurologiche, elettromiografia, trattamento cefalee e disturbi del sonno.',
  },
  {
    icon: <Wind size={32} />,
    name: 'Pneumologia',
    description: 'Visite pneumologiche, spirometria, diagnosi e cura patologie respiratorie.',
  },
  {
    icon: <Stethoscope size={32} />,
    name: 'Fisiatria',
    description: 'Valutazioni fisiatriche, programmi riabilitativi, trattamento dolore cronico.',
  },
  {
    icon: <Droplets size={32} />,
    name: 'Urologia',
    description: 'Visite urologiche, ecografie prostatiche, uroflussometria e prevenzione.',
  },
  {
    icon: <Scan size={32} />,
    name: 'Ecografia',
    description: 'Ecografie addominali, pelviche, tiroidee, mammarie e muscolo-tendinee.',
  },
  {
    icon: <Stethoscope size={32} />,
    name: 'Gastroenterologia',
    description: 'Visite gastroenterologiche, diagnosi e cura patologie gastrointestinali.',
  },
  {
    icon: <Apple size={32} />,
    name: 'Nutrizione',
    description: 'Visite nutrizionali, piani alimentari personalizzati, educazione alimentare.',
  },
];

export default function Specializations() {
  return (
    <section id="specializzazioni" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            I Nostri Servizi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Le nostre Specializzazioni
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Un'ampia gamma di servizi medici specialistici per prenderci cura di te e della tua famiglia. 
            Contatta la segreteria per informazioni su tariffe e preparazioni.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specializations.map((spec, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                {spec.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{spec.name}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{spec.description}</p>
              <a
                href="tel:+390771000000"
                className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
              >
                <Phone size={16} />
                <span>Chiedi info</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl">
            <div className="text-white text-center sm:text-left">
              <h3 className="text-xl font-bold mb-1">Non trovi la specializzazione che cerchi?</h3>
              <p className="text-blue-100">Contattaci per scoprire tutti i nostri servizi</p>
            </div>
            <a
              href="tel:+390771000000"
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              <Phone size={20} />
              <span>Chiama la Segreteria</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
