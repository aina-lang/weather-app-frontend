import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { register } from '../api/auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(username, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400 && err.response.data.error === 'Username already exists') {
          setError('Cet utilisateur est déjà enregistré.');
        } else {
          setError(`Erreur API: ${err.response.data.error || 'Erreur inconnue'}`);
        }
      } else {
        setError('Erreur réseau. Impossible de contacter le serveur.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex justify-center items-center py-8 px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Compte créé !</h2>
          <p className="text-sm text-slate-500 mb-8">
            Votre compte a été créé avec succès. Redirection vers la page de connexion...
          </p>
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Aller à la connexion maintenant
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 text-center tracking-tight mb-1.5">
          Créer un compte
        </h2>
        <p className="text-sm text-slate-400 text-center mb-8">
          Rejoignez-nous pour consulter la météo
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-3.5 py-3 text-sm font-medium">
              <AlertCircle size={15} strokeWidth={2} className="shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Utilisateur
            </label>
            <div className="relative">
              <User
                size={16}
                strokeWidth={2}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                placeholder="Choisissez un pseudo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Mot de passe
            </label>
            <div className="relative">
              <Lock
                size={16}
                strokeWidth={2}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="password"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-lg py-3 transition-colors cursor-pointer disabled:cursor-not-allowed shadow-sm shadow-blue-500/10"
          >
            {loading ? (
              <>
                <Loader2 size={16} strokeWidth={2} className="animate-spin" />
                Création…
              </>
            ) : (
              'Créer le compte'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Vous avez déjà un compte ?{' '}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
