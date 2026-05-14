import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Weather from './components/Weather';
import ProtectedRoute from './components/ProtectedRoute';
import { LogOut, Wind } from 'lucide-react';
import { useAuth } from './hooks/useAuth';

function AppContent() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto px-6 flex flex-col min-h-screen">
        <header className="flex justify-between items-center py-8 border-b border-slate-200 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Wind size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none mb-1">Météo API</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Decoupled Architecture</p>
            </div>
          </div>

          {isAuthenticated && (
            <button 
              onClick={logout} 
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all cursor-pointer shadow-sm"
            >
              <LogOut size={14} strokeWidth={2} />
              Déconnexion
            </button>
          )}
        </header>

        <main className="flex-grow animate-in fade-in duration-700">
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Weather />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="mt-20 py-10 border-t border-slate-200 text-center flex items-center justify-center gap-2 text-slate-400 text-xs font-medium shrink-0">
          <span>© 2026 Météo Moderne</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full" />
          <span>Django REST & React</span>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;