import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Prevenzione cardiovascolare: i controlli da fare dopo i 40 anni',
    excerpt: 'La salute del cuore si costruisce giorno dopo giorno. Scopri quali esami sono fondamentali per prevenire le malattie cardiache e quando effettuarli.',
    author: 'Dott. Marco Rossi',
    date: '15 Gennaio 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Cardiologia',
  },
  {
    title: 'Mal di schiena: cause, prevenzione e quando rivolgersi allo specialista',
    excerpt: 'Il dolore lombare colpisce l\'80% della popolazione almeno una volta nella vita. Impara a riconoscere i segnali d\'allarme e le buone abitudini quotidiane.',
    author: 'Dott. Giuseppe Verdi',
    date: '8 Gennaio 2024',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Ortopedia',
  },
  {
    title: 'Tiroide: i sintomi da non sottovalutare e l\'importanza della diagnosi precoce',
    excerpt: 'Le patologie tiroidee sono molto diffuse, soprattutto tra le donne. Ecco come riconoscere i primi segnali e l\'importanza degli esami periodici.',
    author: 'Dott.ssa Elena Marino',
    date: '2 Gennaio 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Endocrinologia',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
            Blog & Consigli
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Consigli di Salute dai nostri Medici
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Articoli informativi scritti dai nostri specialisti per aiutarti a prenderti cura della tua salute.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                  </div>
                  <button className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
                    Leggi
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors">
            <span>Vedi tutti gli articoli</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
