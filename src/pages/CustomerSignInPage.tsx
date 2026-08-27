import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AuthShowcasePanel from '../components/auth/AuthShowcasePanel';

export default function CustomerSignInPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';

  const { loginCustomer } = useApp();

  const [email, setEmail] = useState('alexander@velocity.ph');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await loginCustomer(email, password);
      navigate(redirect);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-velocity-black flex flex-col lg:flex-row pt-20">
      {/* Dynamic Left Showcase Panel (Rotates Every 4.5s) */}
      <AuthShowcasePanel
        headline="WELCOME BACK TO THE EXPERIENCE."
        subtitle="Sign in to manage your active reservations, saved hypercars, and white-glove itinerary preferences."
        badgeText="VELOCITY ACCESS"
      />

      {/* Right Form Area */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-velocity-gold" />
              <span className="section-label">Customer Portal</span>
            </div>
            <h1 className="font-display text-4xl text-velocity-white mb-2">SIGN IN TO VELOCITY</h1>
            <p className="text-velocity-subtle text-sm">Enter your credentials to access your account.</p>
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="section-label block mb-1.5" htmlFor="signin-email">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                <input
                  id="signin-email"
                  type="email"
                  required
                  placeholder="alexander@velocity.ph"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-luxury pl-10 text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="section-label block mb-0" htmlFor="signin-pass">Password</label>
                <button type="button" className="text-velocity-muted text-[11px] hover:text-velocity-gold transition-colors">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                <input
                  id="signin-pass"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-luxury pl-10 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-xs py-3.5 tracking-widest uppercase mt-4"
            >
              {loading ? 'Authenticating...' : 'SIGN IN'}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          {/* Quick Demo Fill Button */}
          <div className="p-3 bg-velocity-surface border border-velocity-border text-center">
            <p className="text-velocity-muted text-[11px] mb-2">Demo Quick Sign-In:</p>
            <button
              type="button"
              onClick={() => { setEmail('alexander@velocity.ph'); setPassword('demo123'); }}
              className="btn-outline w-full text-[11px] py-1.5 justify-center"
            >
              Use Demo Customer Account (Alexander Chen)
            </button>
          </div>

          <div className="pt-4 border-t border-velocity-border space-y-3 text-center">
            <p className="text-velocity-muted text-xs">
              Don't have a VELOCITY account yet?{' '}
              <Link to={`/signup${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-velocity-gold font-semibold hover:underline">
                Create Account
              </Link>
            </p>

            <div className="pt-2">
              <Link to="/admin/login" className="inline-flex items-center gap-1.5 text-velocity-muted text-xs hover:text-velocity-silver">
                <Shield size={12} className="text-velocity-gold" /> Administrator Portal
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
