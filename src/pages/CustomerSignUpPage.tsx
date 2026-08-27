import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Mail, Lock, Phone, CreditCard, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AuthShowcasePanel from '../components/auth/AuthShowcasePanel';

export default function CustomerSignUpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';

  const { signupCustomer } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await signupCustomer({
        name,
        email,
        phone,
        password,
        licenseNumber,
        dateOfBirth,
      });
      navigate(redirect);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-velocity-black flex flex-col lg:flex-row pt-20">
      {/* Dynamic Left Showcase Panel (Rotates Every 4.5s) */}
      <AuthShowcasePanel
        headline="RENT THE EXTRAORDINARY."
        subtitle="Unlock instant VIP reservation access to over 50 hypercars, megacars, and ultra-luxury machines across the Philippines."
        badgeText="VELOCITY MEMBERSHIP"
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
              <span className="section-label">VIP Registration</span>
            </div>
            <h1 className="font-display text-4xl text-velocity-white mb-2">CREATE YOUR ACCOUNT</h1>
            <p className="text-velocity-subtle text-sm">Join VELOCITY for access to the Philippines' premier automotive fleet.</p>
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="section-label block mb-1.5" htmlFor="signup-name">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                <input
                  id="signup-name"
                  type="text"
                  required
                  placeholder="Alexander Chen"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-luxury pl-10 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="section-label block mb-1.5" htmlFor="signup-email">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                <input
                  id="signup-email"
                  type="email"
                  required
                  placeholder="alexander@velocity.ph"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-luxury pl-10 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="section-label block mb-1.5" htmlFor="signup-phone">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                  <input
                    id="signup-phone"
                    type="tel"
                    placeholder="+63 917 888 9999"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="input-luxury pl-10 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="section-label block mb-1.5" htmlFor="signup-license">Driver's License No.</label>
                <div className="relative">
                  <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                  <input
                    id="signup-license"
                    type="text"
                    placeholder="N01-18-999999"
                    value={licenseNumber}
                    onChange={e => setLicenseNumber(e.target.value)}
                    className="input-luxury pl-10 text-xs"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="section-label block mb-1.5" htmlFor="signup-dob">Date of Birth</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                <input
                  id="signup-dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={e => setDateOfBirth(e.target.value)}
                  className="input-luxury pl-10 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="section-label block mb-1.5" htmlFor="signup-pass">Password *</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                  <input
                    id="signup-pass"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-luxury pl-10 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="section-label block mb-1.5" htmlFor="signup-confirm">Confirm Password *</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                  <input
                    id="signup-confirm"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="input-luxury pl-10 text-xs"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-xs py-3.5 tracking-widest uppercase mt-6"
            >
              {loading ? 'Creating Account...' : 'CREATE ACCOUNT'}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <div className="pt-4 border-t border-velocity-border text-center">
            <p className="text-velocity-muted text-xs">
              Already have an account?{' '}
              <Link to={`/signin${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-velocity-gold font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
