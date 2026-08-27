import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginAdmin } = useApp();

  const [email, setEmail] = useState('admin@velocity.ph');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter administrator credentials.');
      return;
    }

    setLoading(true);
    try {
      await loginAdmin(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Access denied. Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-velocity-black flex items-center justify-center p-6 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-velocity-surface border border-velocity-gold/40 p-8 md:p-10 shadow-2xl relative overflow-hidden"
      >
        {/* Top Accent Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-velocity-gold" />

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-velocity-gold/10 border border-velocity-gold/40 flex items-center justify-center mx-auto mb-4 text-velocity-gold">
            <Shield size={24} />
          </div>
          <p className="text-velocity-gold text-xs tracking-widest uppercase font-semibold mb-1">SECURE ACCESS</p>
          <h1 className="font-display text-3xl text-velocity-white">VELOCITY CONTROL</h1>
          <p className="text-velocity-muted text-xs mt-1">Fleet Administrator Portal</p>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="section-label block mb-1.5" htmlFor="admin-email">Admin Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
              <input
                id="admin-email"
                type="email"
                required
                placeholder="admin@velocity.ph"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-luxury pl-10 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="section-label block mb-1.5" htmlFor="admin-pass">Secret Key / Password</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
              <input
                id="admin-pass"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-luxury pl-10 text-xs font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center text-xs py-3.5 tracking-widest uppercase mt-6"
          >
            {loading ? 'Verifying Credentials...' : 'ACCESS ADMIN PANEL'}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-velocity-border text-center">
          <button
            onClick={() => navigate('/')}
            className="text-velocity-muted text-xs hover:text-velocity-white transition-colors"
          >
            ← Return to Public Website
          </button>
        </div>
      </motion.div>
    </div>
  );
}
