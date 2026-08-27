import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  brand: string;
  name: string;
  tagline: string;
  image: string;
  badge: string;
}

const AUTH_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'tourbillon',
    brand: 'BUGATTI',
    name: 'TOURBILLON (2025)',
    tagline: '1,775 HP · Naturally Aspirated 8.3L V16 Hybrid Masterpiece',
    image: '/cars/bugatti-tourbillon.jpg',
    badge: 'FLAGSHIP MEGACAR',
  },
  {
    id: 'chiron-ss',
    brand: 'BUGATTI',
    name: 'CHIRON SUPER SPORT 300+',
    tagline: '1,577 HP · 490 KM/H World Record Aerodynamic Longtail',
    image: '/cars/bugatti-chiron-ss300.jpg',
    badge: 'SPEED RECORD HOLDER',
  },
  {
    id: 'porsche-gt3rs',
    brand: 'PORSCHE',
    name: '911 GT3 RS (992)',
    tagline: '525 HP · 9,000 RPM Flat-Six with Active Swan-Neck DRS Wing',
    image: '/cars/porsche-911-gt3rs-992.jpg',
    badge: 'PURE TRACK WEAPON',
  },
  {
    id: 'ferrari-sf90',
    brand: 'FERRARI',
    name: 'SF90 STRADALE',
    tagline: '1,000 HP · Maranello Twin-Turbo V8 Hybrid with AWD Launch',
    image: '/cars/category-supercar.jpg',
    badge: 'HYBRID SUPERCAR',
  },
  {
    id: 'maserati-mc20',
    brand: 'MASERATI',
    name: 'MC20 NETTUNO',
    tagline: '621 HP · F1 Pre-Chamber Twin-Spark V6 inside Carbon Monocoque',
    image: '/cars/maserati-mc20.jpg',
    badge: 'ITALIAN EXOTICA',
  },
  {
    id: 'rolls-royce',
    brand: 'ROLLS-ROYCE',
    name: 'GHOST EXTENDED',
    tagline: 'Bespoke Starlight Headliner & 6.75L Twin-Turbo V12 Grand Tourer',
    image: '/cars/category-luxury.jpg',
    badge: 'ULTRA-LUXURY PINNACLE',
  },
];

const ROTATION_INTERVAL = 4500; // Changes every 4.5 seconds

interface AuthShowcasePanelProps {
  headline?: string;
  subtitle?: string;
  badgeText?: string;
}

export default function AuthShowcasePanel({
  headline = 'RENT THE EXTRAORDINARY.',
  subtitle = 'Unlock instant VIP reservation access to over 50 hypercars, supercars, and ultra-luxury machines across the Philippines.',
  badgeText = 'VELOCITY MEMBERSHIP',
}: AuthShowcasePanelProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIdx(prev => (prev + 1) % AUTH_SHOWCASE_ITEMS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        nextSlide();
      }
    }, ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const activeItem = AUTH_SHOWCASE_ITEMS[currentIdx];

  return (
    <div className="lg:w-1/2 relative hidden lg:block overflow-hidden bg-velocity-dark border-r border-velocity-border">
      {/* Background Image with 1.0s Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeItem.image}
            alt={`${activeItem.brand} ${activeItem.name}`}
            className="w-full h-full object-cover object-center hero-live-bg"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Ambient Moving Light Sweep & Depth Overlays */}
      <div className="hero-light-sweep" />
      <div className="absolute inset-0 bg-gradient-to-t from-velocity-black via-velocity-black/50 to-velocity-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-velocity-black/70 via-transparent to-velocity-black/40" />

      {/* Top Floating Machine Spec Pill */}
      <div className="absolute top-8 left-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-velocity-black/80 border border-velocity-gold/40 backdrop-blur-md"
          >
            <Sparkles size={11} className="text-velocity-gold animate-pulse" />
            <span className="text-[10px] tracking-widest font-semibold text-velocity-gold uppercase">
              {activeItem.badge}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Information Banner */}
      <div className="absolute bottom-12 left-12 right-12 text-velocity-white z-10 space-y-4">
        <div>
          <span className="badge-gold text-[10px] tracking-widest mb-2 inline-block">
            {badgeText}
          </span>
          <h2 className="font-display text-4xl leading-tight">
            {headline}
          </h2>
          <p className="text-velocity-silver text-sm max-w-md font-light leading-relaxed mt-1">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Machine HUD Card */}
        <div className="pt-3 border-t border-velocity-border/70 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-velocity-gold text-[11px] font-semibold tracking-widest uppercase">
                {activeItem.brand} · {activeItem.name}
              </p>
              <p className="text-velocity-muted text-[10px] tracking-wider truncate max-w-xs">
                {activeItem.tagline}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {AUTH_SHOWCASE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 transition-all duration-300 rounded-none ${
                  idx === currentIdx
                    ? 'w-6 bg-velocity-gold'
                    : 'w-1.5 bg-velocity-muted hover:bg-velocity-silver'
                }`}
                title={`View ${item.name}`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
