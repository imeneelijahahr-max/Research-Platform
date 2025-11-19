import React from 'react';
import { X, Printer, ShieldCheck, Eye } from 'lucide-react';
import { Article } from '../types';
import { OWNER_NAME } from '../constants';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  const timestamp = new Date().toLocaleString();

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel */}
        <div className="relative inline-block bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
          
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-medical-teal to-medical-blue px-6 py-4 flex justify-between items-center">
            <div className="flex items-center text-white/90 text-sm">
               <ShieldCheck className="w-4 h-4 mr-2" />
               Protected Content • Read-Only
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 rounded-full p-2 text-white hover:bg-white hover:text-medical-blue transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Container */}
          <div className="px-8 py-10 sm:px-12 relative bg-white min-h-[60vh]">
            
            {/* Watermark Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none z-0">
               <div className="transform -rotate-45 opacity-[0.04] text-gray-900 text-5xl font-extrabold whitespace-nowrap text-center">
                  {OWNER_NAME}<br/>
                  {OWNER_NAME}<br/>
                  {OWNER_NAME}<br/>
                  COPYRIGHT
               </div>
            </div>

            {/* Metadata & Timestamp Watermark (Small) */}
            <div className="absolute bottom-4 right-6 text-[10px] text-gray-300 font-mono pointer-events-none select-none">
               Viewed by Guest on {timestamp}
            </div>

            {/* Actual Text Content */}
            <div className="relative z-10 select-none" onContextMenu={(e) => e.preventDefault()}>
              <div className="flex justify-between items-start mb-4">
                 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-3xl">{article.title}</h2>
                 <div className="flex items-center text-gray-400 text-sm bg-gray-50 px-3 py-1 rounded-full">
                    <Eye className="w-4 h-4 mr-1" />
                    {article.views ? article.views.toLocaleString() : 0}
                 </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm mb-8 pb-6 border-b border-gray-100">
                <span className="text-medical-teal font-bold">{article.authors}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{article.date}</span>
              </div>

              <div className="prose prose-lg prose-teal max-w-none text-gray-700 leading-loose whitespace-pre-wrap text-justify font-light">
                {article.content}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
             <span className="text-xs text-gray-400 font-medium">
               &copy; {new Date().getFullYear()} {OWNER_NAME}. All rights reserved.
             </span>
             <div className="flex items-center text-gray-400 text-xs gap-2">
                <Printer className="w-4 h-4" /> Printing Disabled
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};