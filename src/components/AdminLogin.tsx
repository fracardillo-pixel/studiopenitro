import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export default function AdminLogin({ onLoginSuccess, onCancel }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Penitro2026!') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Password errata. Riprova.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">PenitroMed Admin</h2>
          </div>
          <button 
            onClick={onCancel} 
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password di Accesso
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { 
                setPassword(e.target.value); 
                setError(''); 
              }}
              className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300 focus:ring-red-600/20 focus:border-red-600' : 'border-slate-200 focus:ring-blue-600/20 focus:border-blue-600'} focus:outline-none focus:ring-2 transition-all`}
              placeholder="Inserisci la password"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-red-600 inline-block"></span>
                {error}
              </p>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
            >
              Accedi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
