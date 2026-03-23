import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, ExternalLink } from 'lucide-react';

interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
  source: 'google' | 'miodottore';
}

const reviews: Review[] = [
  {
    name: 'Maria G.',
    date: 'Gennaio 2024',
    rating: 5,
    text: 'Struttura eccellente! Personale cortese e professionale. Il Dott. Rossi mi ha seguita con grande attenzione per la mia problematica cardiaca. Consiglio vivamente!',
    source: 'google',
  },
  {
    name: 'Antonio P.',
    date: 'Febbraio 2024',
    rating: 5,
    text: 'Finalmente un poliambulatorio serio a Formia. Parcheggio comodo, sala d\'attesa pulita e moderna. La Dott.ssa Bianchi è stata molto empatica e competente.',
    source: 'miodottore',
  },
  {
    name: 'Lucia D.',
    date: 'Dicembre 2023',
    rating: 5,
    text: 'Ho portato mio figlio per una visita ortopedica. Il Dott. Verdi è stato bravissimo, ha messo subito a suo agio il bambino. Prezzi onesti e trasparenti.',
    source: 'google',
  },
  {
    name: 'Giuseppe M.',
    date: 'Gennaio 2024',
    rating: 5,
    text: 'Ecografia eseguita con macchinari di ultima generazione. Referto chiaro e dettagliato. La segreteria è sempre disponibile e gentilissima al telefono.',
    source: 'google',
  },
  {
    name: 'Francesca R.',
    date: 'Novembre 2023',
    rating: 5,
    text: 'Mi sono trovata benissimo per la visita ginecologica. Ambiente accogliente, nessuna attesa. Tornerò sicuramente per i prossimi controlli.',
    source: 'miodottore',
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const visibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  return (
    <section id="recensioni" className="py-24 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
            Testimonianze
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Cosa dicono i nostri pazienti
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            La soddisfazione dei nostri pazienti è la nostra priorità. Ecco alcune delle loro recensioni.
          </p>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-blue-900">4.9/5</span>
            <span className="text-gray-500">basato su 150+ recensioni</span>
          </div>
        </div>

        {/* Reviews Carousel - Desktop */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-3 gap-6">
            {visibleReviews().map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
          
          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Reviews - Mobile */}
        <div className="lg:hidden">
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4" style={{ width: `${reviews.length * 320}px` }}>
              {reviews.map((review, index) => (
                <div key={index} className="w-80 flex-shrink-0">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Links to review platforms */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-700 font-medium"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>Vedi su Google</span>
            <ExternalLink size={16} />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-700 font-medium"
          >
            <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</span>
            <span>Vedi su MioDottore</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg h-full flex flex-col">
      {/* Quote icon */}
      <Quote size={32} className="text-blue-200 mb-4" />
      
      {/* Review text */}
      <p className="text-gray-700 leading-relaxed flex-grow mb-6">"{review.text}"</p>
      
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={18} className="text-yellow-400 fill-current" />
        ))}
      </div>
      
      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="font-semibold text-blue-900">{review.name}</p>
          <p className="text-sm text-gray-500">{review.date}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          review.source === 'google' 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-teal-100 text-teal-700'
        }`}>
          {review.source === 'google' ? 'Google' : 'MioDottore'}
        </div>
      </div>
    </div>
  );
}
