import React from 'react';
import { Article } from '../types';
import { Trash2, BookOpen, Calendar, User, Eye, Edit } from 'lucide-react';

interface ResearchGridProps {
  articles: Article[];
  isOwner: boolean;
  onDelete: (id: string) => void;
  onView: (article: Article) => void;
  onEdit: (article: Article) => void;
}

export const ResearchGrid: React.FC<ResearchGridProps> = ({ articles, isOwner, onDelete, onView, onEdit }) => {
  
  const getPreview = (content: string) => {
    const words = content.split(/\s+/);
    if (words.length <= 50) return content;
    return words.slice(0, 50).join(' ') + '...';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Research Library</h2>
          <p className="text-gray-600 mt-2">Browse published works and clinical findings.</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border">
          {articles.length} Publication{articles.length !== 1 && 's'}
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-lg">No research articles published yet.</p>
          {isOwner && <p className="text-medical-teal mt-2 text-sm">Click "Publish" to add your first article.</p>}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
            >
              <div className="h-2 bg-gradient-to-r from-medical-teal to-medical-blue w-full" />
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center" title="Total Views">
                      <Eye className="w-3 h-3 mr-1 text-gray-400" />
                      {article.views ? article.views.toLocaleString() : 0}
                    </div>
                  </div>
                  {article.authors === 'Imene Ahmed Omar' && (
                     <span className="bg-blue-50 text-medical-blue px-2 py-0.5 rounded-full text-[10px] font-semibold">Author</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-medical-blue transition-colors">
                  {article.title}
                </h3>

                <div className="flex items-center text-xs text-medical-teal font-medium mb-4">
                  <User className="w-3 h-3 mr-1" />
                  {article.authors}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow border-t border-gray-50 pt-4">
                  {getPreview(article.content)}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                  <button
                    onClick={() => onView(article)}
                    className="flex items-center text-sm font-bold text-medical-teal hover:text-medical-blue transition-colors"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Full Paper
                  </button>

                  {isOwner && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(article)}
                        className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(article.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};