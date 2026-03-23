import React, { useState } from 'react';
import { Clock, ArrowRight, User, Calendar, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BlogArticle } from '../types';

const BlogDynamic: React.FC = () => {
  const { state } = useAppContext();
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const publishedArticles = state.blogArticles
    .filter(article => article.isPublished)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (publishedArticles.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Consigli di salute
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Il Blog dei Nostri Medici
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Articoli, consigli e approfondimenti dai nostri specialisti per aiutarti a prenderti cura della tua salute
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedArticles.map((article, index) => (
            <article
              key={article.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                    <Calendar size={48} className="text-blue-300" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-blue-600 rounded-full text-xs font-medium shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{article.author}</p>
                      <p className="text-xs text-gray-500">{article.authorRole}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors group/btn"
                  >
                    Leggi
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Vedi tutti gli articoli
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cover image */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              {selectedArticle.image ? (
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                  <Calendar size={80} className="text-blue-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-blue-600 rounded-full text-xs font-semibold shadow-sm">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(selectedArticle.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {selectedArticle.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                {selectedArticle.title}
              </h2>

              {/* Author */}
              <div className="flex items-center gap-3 py-3 border-y border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{selectedArticle.author}</p>
                  <p className="text-sm text-gray-500">{selectedArticle.authorRole}</p>
                </div>
              </div>

              {/* Content */}
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedArticle.content || selectedArticle.excerpt}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogDynamic;
