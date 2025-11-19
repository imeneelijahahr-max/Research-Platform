import React, { useState } from 'react';
import { X, Save, FileText } from 'lucide-react';
import { Article } from '../types';
import { OWNER_NAME } from '../constants';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (article: Article) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, onPublish }) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState(OWNER_NAME);
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newArticle: Article = {
      id: Date.now().toString(),
      title,
      authors,
      date,
      content,
      views: 0
    };

    onPublish(newArticle);
    // Reset form
    setTitle('');
    setAuthors(OWNER_NAME);
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 text-medical-teal mr-2" />
              Publish New Research
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Research Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-transparent outline-none transition-all"
                placeholder="Enter the title of the paper"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Authors</label>
                  <input
                    type="text"
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-transparent outline-none transition-all"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-transparent outline-none transition-all"
                  />
               </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                 Content (Plain Text)
                 <span className="text-xs text-gray-400 font-normal ml-2">Paste your research body here</span>
              </label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-teal focus:border-transparent outline-none transition-all resize-none"
                placeholder="Abstract, introduction, methodology, and conclusion..."
              />
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-medical-teal rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-teal shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                Publish Research
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );