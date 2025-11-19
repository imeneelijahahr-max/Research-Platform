import React, { useState } from 'react';
import { X, Lock, AlertCircle } from 'lucide-react';
import { OWNER_NAME } from '../constants';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (success) {
      setPassword('');
      setError(false);
      onClose();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-medical-dark bg-opacity-80 transition-opacity backdrop-blur-sm" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="relative inline-block align-middle bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:max-w-sm w-full">
          <div className="bg-gradient-to-r from-medical-teal to-medical-blue h-2"></div>
          <div className="p-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 mb-4">
              <Lock className="h-6 w-6 text-medical-blue" />
            </div>
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Owner Access</h3>
              <p className="text-sm text-gray-500 mt-1">Login as {OWNER_NAME}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`w-full px-4 py-3 text-center tracking-widest border rounded-lg outline-none transition-all ${
                    error 
                      ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-2 focus:ring-medical-teal focus:border-transparent'
                  }`}
                  placeholder="Enter Password"
                />
                {error && (
                  <p className="mt-2 text-xs text-red-500 flex items-center justify-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Incorrect password
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-medical-dark text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors shadow-md"
              >
                Authenticate
              </button>
            </form>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};