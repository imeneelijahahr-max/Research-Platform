import React from 'react';
import { Stethoscope, LogIn, LogOut, Plus, Lock } from 'lucide-react';
import { OWNER_NAME, OWNER_TITLE } from '../constants';
import { ViewState } from '../types';

interface HeaderProps {
  isOwner: boolean;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLoginClick: () => void;
  onLogout: () => void;
  onPublishClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isOwner,
  currentView,
  onNavigate,
  onLoginClick,
  onLogout,
  onPublishClick
}) => {
  return (
    <header className="bg-gradient-to-r from-medical-teal to-medical-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Owner Info */}
          <div 
            className="flex items-center space-x-4 cursor-pointer group" 
            onClick={() => onNavigate('landing')}
          >
            <div className="bg-white p-2 rounded-full shadow-md transition-transform duration-300 group-hover:rotate-12">
              <Stethoscope className="h-8 w-8 text-medical-teal" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-wide">{OWNER_NAME}</h1>
              <p className="text-xs text-blue-100 uppercase tracking-wider font-medium">{OWNER_TITLE}</p>
            </div>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('library')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                currentView === 'library' 
                  ? 'bg-white text-medical-blue shadow-inner' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Library
            </button>

            {isOwner ? (
              <div className="flex items-center space-x-3 pl-4 border-l border-white/30">
                 <div className="flex items-center text-xs font-medium bg-green-400/20 px-3 py-1 rounded-full border border-green-200/40">
                    <Lock className="w-3 h-3 mr-1" /> Owner Mode
                 </div>
                <button
                  onClick={onPublishClick}
                  className="flex items-center space-x-1 bg-white text-medical-teal px-4 py-2 rounded-full shadow-md hover:bg-gray-50 hover:scale-105 transition-all text-sm font-bold"
                >
                  <Plus className="h-4 w-4" />
                  <span>Publish</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-1 text-white hover:text-blue-100 transition-colors text-sm font-medium ml-4"
              >
                <LogIn className="h-4 w-4" />
                <span>Owner Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};