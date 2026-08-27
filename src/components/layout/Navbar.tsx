import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, User as UserIcon, Scale, Menu, X, Shield, LogOut, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    favorites,
    comparisonIds,
    setSearchOpen,
    currentUser,
    isAuthenticated,
    isAdmin,
    logout
  } = useApp();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'SHOWROOM' },
    { path: '/fleet', label: 'THE FLEET' },
    { path: '/fleet?category=hypercar', label: 'HYPERCARS' },
    { path: '/fleet?category=supercar', label: 'SUPERCAR' },
    { path: '/fleet?category=luxury', label: 'ULTRA-LUXURY' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-velocity-black/90 backdrop-blur-xl border-b border-velocity-border py-4 shadow-2xl'
          : 'bg-gradient-to-b from-velocity-black/90 via-velocity-black/50 to-transparent py-6'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-velocity-gold/10 border border-velocity-gold/40 flex items-center justify-center group-hover:bg-velocity-gold transition-colors">
            <span className="font-display font-bold text-velocity-gold group-hover:text-velocity-black text-sm transition-colors">V</span>
          </div>
          <div>
            <span className="font-display text-2xl tracking-[0.25em] text-velocity-white block font-bold leading-none">
              VELOCITY
            </span>
            <span className="text-[9px] tracking-[0.3em] text-velocity-gold font-semibold uppercase block mt-0.5">
              PHILIPPINES
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname + location.search === link.path);
            return (
              <Link
                key={link.path + link.label}
                to={link.path}
                className={`nav-link text-xs font-semibold tracking-widest transition-colors relative py-1 ${
                  isActive ? 'text-velocity-gold font-bold' : 'text-velocity-silver hover:text-velocity-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-velocity-gold"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Icons */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 border border-velocity-border flex items-center justify-center text-velocity-silver hover:text-velocity-gold hover:border-velocity-gold transition-colors"
            title="Search Fleet"
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          {/* Comparison indicator */}
          {comparisonIds.length > 0 && (
            <div className="relative">
              <span className="w-10 h-10 border border-velocity-gold/60 bg-velocity-gold/10 flex items-center justify-center text-velocity-gold">
                <Scale size={16} />
              </span>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-velocity-gold text-velocity-black text-[9px] font-bold flex items-center justify-center rounded-full">
                {comparisonIds.length}
              </span>
            </div>
          )}

          {/* Favorites */}
          <Link
            to={isAuthenticated ? "/account?tab=favorites" : "/signin"}
            className="relative w-10 h-10 border border-velocity-border flex items-center justify-center text-velocity-silver hover:text-velocity-gold hover:border-velocity-gold transition-colors"
            title="Saved Machines"
          >
            <Heart size={16} fill={favorites.length > 0 ? 'currentColor' : 'none'} className={favorites.length > 0 ? 'text-velocity-gold' : ''} />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-velocity-gold text-velocity-black text-[9px] font-bold flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* User Account / Auth Status Dropdown */}
          <div className="relative">
            {isAuthenticated ? (
              <div>
                <button
                  onClick={() => setUserDropdownOpen(o => !o)}
                  className="flex items-center gap-2.5 px-3.5 py-2 border border-velocity-border hover:border-velocity-gold text-xs transition-colors bg-velocity-surface"
                >
                  <div className="w-5 h-5 bg-velocity-gold text-velocity-black text-[10px] font-bold flex items-center justify-center rounded-full">
                    {currentUser?.name.charAt(0)}
                  </div>
                  <span className="text-velocity-white font-semibold tracking-wider truncate max-w-[120px]">
                    {currentUser?.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={13} className="text-velocity-muted" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-velocity-surface border border-velocity-border shadow-2xl p-2 z-50 space-y-1"
                    >
                      <div className="px-3 py-2 border-b border-velocity-border">
                        <p className="text-velocity-white text-xs font-bold truncate">{currentUser?.name}</p>
                        <p className="text-velocity-gold text-[10px] uppercase font-mono tracking-widest">{currentUser?.role}</p>
                      </div>

                      <Link
                        to="/account"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-velocity-silver hover:text-velocity-white hover:bg-velocity-dark transition-colors"
                      >
                        <UserIcon size={14} /> My Dashboard
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-3 py-2 text-xs text-velocity-gold hover:bg-velocity-dark transition-colors"
                        >
                          <Shield size={14} /> Admin Control
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/signin" className="btn-outline text-[11px] py-2 px-4">
                  Sign In
                </Link>
                <Link to="/signup" className="btn-primary text-[11px] py-2 px-4">
                  Join VIP
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 border border-velocity-border flex items-center justify-center text-velocity-silver"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            className="w-10 h-10 border border-velocity-border flex items-center justify-center text-velocity-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-velocity-black border-b border-velocity-border overflow-hidden px-6 py-6"
          >
            <div className="space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.path + link.label}
                  to={link.path}
                  className="block text-sm font-semibold tracking-widest text-velocity-silver hover:text-velocity-gold"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-velocity-border space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center justify-between text-xs text-velocity-silver py-1">
                      <span>Signed in as <strong className="text-velocity-white">{currentUser?.name}</strong></span>
                      <span className="badge-gold text-[9px]">{currentUser?.role}</span>
                    </div>
                    <Link to="/account" className="btn-outline w-full justify-center text-xs py-2.5">
                      My Account & Dashboard
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="btn-primary w-full justify-center text-xs py-2.5">
                        Admin Control Panel
                      </Link>
                    )}
                    <button onClick={handleLogout} className="w-full text-rose-400 text-xs py-2 hover:underline text-center">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/signin" className="btn-outline justify-center text-xs py-2.5">Sign In</Link>
                    <Link to="/signup" className="btn-primary justify-center text-xs py-2.5">Join VIP</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
