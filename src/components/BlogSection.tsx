import React, { useState } from 'react';
import { BookOpen, Search, Clock, Tag, MessageSquare, ArrowRight } from 'lucide-react';
import { BlogArticle } from '../types';

interface BlogSectionProps {
  articles: BlogArticle[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ articles }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedArticleModal, setSelectedArticleModal] = useState<BlogArticle | null>(null);
  const [commentsMap, setCommentsMap] = useState<Record<string, { author: string; text: string; date: string }[]>>({});
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const categories = ['Todos', 'Grabación', 'Mezcla', 'Equipamiento', 'Tutoriales'];

  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'Todos' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddComment = (articleId: string) => {
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    const commentObj = {
      author: newCommentName,
      text: newCommentText,
      date: 'Hoy'
    };
    setCommentsMap(prev => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), commentObj]
    }));
    setNewCommentName('');
    setNewCommentText('');
  };

  return (
    <section id="blog" className="py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Guías & Artículos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Secretos de Grabación & Mezcla.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl">
              Artículos educativos redactados por Maxi Alzugaray para ayudarte a mejorar tus producciones y grabaciones de estudio.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar tema o guía..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Category Filters - Apple Pill Style */}
        <div className="flex flex-wrap gap-2 my-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-zinc-950 font-bold shadow-xs'
                  : 'bg-[#f5f5f7] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const extraComments = commentsMap[article.id]?.length || 0;
            const totalComments = article.commentsCount + extraComments;

            return (
              <article
                key={article.id}
                className="bg-[#f5f5f7] dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-primary/60 transition-all duration-300 group hover:shadow-lg"
              >
                <div>
                  <div className="relative aspect-video bg-zinc-950 overflow-hidden cursor-pointer" onClick={() => setSelectedArticleModal(article)}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {article.readTime}
                      </span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedArticleModal(article)}
                      className="text-lg font-bold text-zinc-900 dark:text-white hover:text-primary transition-colors cursor-pointer leading-snug"
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-200/80 dark:border-zinc-800 text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-primary" />
                      {totalComments} comentarios
                    </span>

                    <button
                      onClick={() => setSelectedArticleModal(article)}
                      className="text-primary font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>Leer Guía</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* Full Article Modal */}
        {selectedArticleModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">
              
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                ✕
              </button>

              <div className="space-y-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{selectedArticleModal.category}</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">{selectedArticleModal.title}</h3>
                <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>Por <strong>{selectedArticleModal.author}</strong></span>
                  <span>•</span>
                  <span>{selectedArticleModal.date}</span>
                  <span>•</span>
                  <span>{selectedArticleModal.readTime}</span>
                </div>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-950">
                <img src={selectedArticleModal.image} alt={selectedArticleModal.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed border-t border-b border-zinc-200 dark:border-zinc-800 py-6">
                {selectedArticleModal.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 items-center">
                <Tag className="w-4 h-4 text-primary" />
                {selectedArticleModal.tags.map((t, i) => (
                  <span key={i} className="text-xs bg-[#f5f5f7] dark:bg-zinc-950 px-3 py-1 rounded-full border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Interactive Comments Section */}
              <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <h4 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span>Comentarios ({selectedArticleModal.commentsCount + (commentsMap[selectedArticleModal.id]?.length || 0)})</span>
                </h4>

                {/* Existing added comments */}
                <div className="space-y-3">
                  {(commentsMap[selectedArticleModal.id] || []).map((c, i) => (
                    <div key={i} className="p-3 bg-[#f5f5f7] dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-primary">
                        <span>{c.author}</span>
                        <span className="text-zinc-400">{c.date}</span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300">{c.text}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Form */}
                <div className="bg-[#f5f5f7] dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-300">Dejar un Comentario:</span>
                  <input
                    type="text"
                    placeholder="Tu nombre o seudónimo"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                  <textarea
                    rows={2}
                    placeholder="Escribe tu comentario sobre esta guía..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white"
                  />
                  <button
                    onClick={() => handleAddComment(selectedArticleModal.id)}
                    className="px-4 py-2 rounded-full bg-primary text-zinc-950 font-bold text-xs"
                  >
                    Publicar Comentario
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
