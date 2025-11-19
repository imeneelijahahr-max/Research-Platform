import React from 'react';
import { ArrowRight, BookOpen, Activity } from 'lucide-react';

interface LandingHeroProps {
  onEnterLibrary: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onEnterLibrary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center animate-fadeIn">
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center justify-center p-3 bg-white/40 backdrop-blur-sm rounded-full shadow-sm mb-6">
           <Activity className="w-6 h-6 text-medical-teal mr-2" />
           <span className="text-medical-dark font-semibold tracking-wide">Pioneering Medical Research</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-medical-dark leading-tight drop-shadow-sm">
          Advancing Science, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-teal to-medical-blue">
            Improving Lives.
          </span>
        </h1>
        
        <p className="text-xl text-gray-700 md:max-w-2xl mx-auto leading-relaxed">
          Welcome to the official research portfolio of <span className="font-bold text-medical-teal">Imene Ahmed Omar</span>. 
          Explore a curated collection of peer-reviewed articles, clinical studies, and medical insights designed to share knowledge and foster innovation in healthcare.
        </p>

        <div className="pt-8">
          <button
            onClick={onEnterLibrary}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-medical-teal rounded-full hover:bg-medical-blue hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-teal shadow-lg hover:shadow-xl"
          >
            <span>Access Research Library</span>
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Full access available for public viewing</span>
          </p>
        </div>
      </div>
    </div>
  );
};