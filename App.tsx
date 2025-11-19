import React, { useState, useEffect } from 'react';
import { Article, ViewState } from './types';
import { INITIAL_ARTICLES, OWNER_PASSWORD } from './constants';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { ResearchGrid } from './components/ResearchGrid';
import { ArticleModal } from './components/ArticleModal';
import { LoginModal } from './components/LoginModal';
import { PublishModal } from './components/PublishModal';
import { EditModal } from './components/EditModal';

const STORAGE_KEY = 'medical_research_articles';

const App: React.FC = () => {
  // -- State Management --
  const [isOwner, setIsOwner] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [articles, setArticles] = useState<Article[]>([]);
  
  // Modals
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReadingOpen, setIsReadingOpen] = useState(false);

  // -- Effects --
  
  // Load data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Migration check: ensure views property exists for old data
        const migrated = parsed.map((a: any) => ({
          ...a,
          views: a.views || 0
        }));
        setArticles(migrated);
      } catch (e) {
        setArticles(INITIAL_ARTICLES);
      }
    } else {
      setArticles(INITIAL_ARTICLES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES));
    }
  }, []);

  // Save data on change
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    }
  }, [articles]);

  // -- Handlers --

  const handleLogin = (password: string) => {
    if (password === OWNER_PASSWORD) {
      setIsOwner(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsOwner(false);
    setCurrentView('landing');
  };

  const handlePublish = (newArticle: Article) => {
    const articleWithViews = { ...newArticle, views: 0 };
    setArticles(prev => [articleWithViews, ...prev]);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this research article? This action cannot be undone.")) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setIsEditOpen(true);
  };

  const handleUpdate = (updatedArticle: Article) => {
    setArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
  };

  const handleViewArticle = (article: Article) => {
    // Increment view count in state immediately
    const updatedArticles = articles.map(a => 
      a.id === article.id ? { ...a, views: (a.views || 0) + 1 } : a
    );
    setArticles(updatedArticles);

    // Use the updated article object for the modal so it shows the new count
    const currentArticle = updatedArticles.find(a => a.id === article.id);
    setSelectedArticle(currentArticle || article);
    
    setIsReadingOpen(true);
  };

  return (
    // Main container with context menu disabled for basic protection
    <div 
      className="min-h-screen bg-gradient-to-br from-medical-light to-medical-sky text-gray-800 font-sans selection:bg-medical-teal selection:text-white"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Header 
        isOwner={isOwner}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onPublishClick={() => setIsPublishOpen(true)}
      />

      <main className="relative">
        {currentView === 'landing' ? (
          <LandingHero onEnterLibrary={() => setCurrentView('library')} />
        ) : (
          <div className="animate-fadeIn">
            <ResearchGrid 
              articles={articles}
              isOwner={isOwner}
              onDelete={handleDelete}
              onView={handleViewArticle}
              onEdit={handleEdit}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />

      <PublishModal 
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        onPublish={handlePublish}
      />

      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleUpdate}
        article={editingArticle}
      />

      <ArticleModal 
        isOpen={isReadingOpen}
        article={selectedArticle}
        onClose={() => setIsReadingOpen(false)}
      />

    </div>
  );
};

export default App;