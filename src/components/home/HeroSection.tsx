import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  name: string;
  brand: string;
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'bugatti-tourbillon-2025',
    brand: 'BUGATTI',
    name: 'TOURBILLON',
    image: '/cars/bugatti-tourbillon.jpg',
  },
  {
    id: 'bugatti-chiron-ss300-2023',
    brand: 'BUGATTI',
    name: 'CHIRON SUPER SPORT 300+',
    image: '/cars/bugatti-chiron-ss300.jpg',
  },
  {
    id: 'porsche-911-gt3rs-992-2024',
    brand: 'PORSCHE',
    name: '911 GT3 RS (992)',
    image: '/cars/porsche-911-gt3rs-992.jpg',
  },
  {
    id: 'ferrari-sf90',
    brand: 'FERRARI',
    name: 'SF90 STRADALE',
    image: '/cars/category-supercar.jpg',
  },
  {
    id: 'rolls-royce-ghost',
    brand: 'ROLLS-ROYCE',
    name: 'GHOST EXTENDED',
    image: '/cars/category-luxury.jpg',
  },
  {
    id: 'night-alpine-drive',
    brand: 'VELOCITY',
    name: 'EXOTIC FLEET',
    image: '/cars/category-hypercar.jpg',
  },
];

const SLIDE_DURATION = 5500; // 5.5 seconds per slide

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 100]);
  const contentY = useTransform(scrollY, [0, 700], [0, -50]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const activeSlide = HERO_SLIDES[currentIdx];

  const nextSlide = useCallback(() => {
    setCurrentIdx(prev => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Automatic slide rotation every 5.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        nextSlide();
      }
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-velocity-black select-none"
      aria-label="Hero showcase section"
    >
      {/* ─── DYNAMIC ROTATING BACKGROUND WITH CROSSFADE ─── */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ y: imageY }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img
              src={activeSlide.image}
              alt={`${activeSlide.brand} ${activeSlide.name}`}
              className="w-full h-full object-cover object-center hero-live-bg"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Moving Light Reflection Layer */}
        <div className="hero-light-sweep" />

        {/* Ambient Depth Glows */}
        <div className="hero-ambient-glow top-[30%] left-[45%]" />
        <div className="hero-ambient-glow top-[40%] right-[10%] opacity-40" />

        {/* Multi-Stop Cinematic Vignette & Contrast Overlays */}
        {/* Left-side dark mask for razor-sharp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-velocity-black via-velocity-black/80 to-velocity-black/30" />
        
        {/* Top/Bottom atmospheric fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-velocity-black/85 via-transparent to-velocity-black" />
        
        {/* Radial lens focus */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 65% 50%, transparent 25%, rgba(8,8,8,0.7) 100%)',
          }}
        />
      </motion.div>

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* ─── FOREGROUND CONTENT (CLEAN, STABLE & CRISP) ─── */}
      <motion.div
        className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 w-full pt-28 pb-20"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-3xl">
          {/* Pre-label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="divider" />
            <span className="section-label">Philippine Premier Automotive Fleet</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-hero text-velocity-white mb-6 leading-[0.9]">
            RENT THE<br />
            <span className="text-gold-gradient">EXTRAORDINARY.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-velocity-silver text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-body font-light">
            Experience the world's most coveted hypercars, supercars, and ultra-luxury grand tourers. Delivered white-glove across the Philippines.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              to="/fleet"
              id="hero-explore-fleet"
              className="btn-primary"
            >
              EXPLORE THE FLEET
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/fleet?category=hypercar"
              id="hero-book-drive"
              className="btn-outline"
            >
              VIEW MEGACARS
            </Link>
          </div>

          {/* Micro Stats Benchmark */}
          <div className="mt-14 flex flex-wrap items-center gap-8 md:gap-12 pt-8 border-t border-velocity-border/40">
            <div>
              <div className="font-display text-3xl md:text-4xl text-velocity-gold mb-0.5">54</div>
              <div className="text-velocity-muted text-[11px] tracking-widest uppercase font-semibold">Elite Machines</div>
            </div>

            <div>
              <div className="font-display text-3xl md:text-4xl text-velocity-white mb-0.5">1,775 <span className="text-sm font-sans font-normal text-velocity-muted">HP</span></div>
              <div className="text-velocity-muted text-[11px] tracking-widest uppercase font-semibold">Peak Power Output</div>
            </div>

            <div>
              <div className="font-display text-3xl md:text-4xl text-velocity-gold mb-0.5">100%</div>
              <div className="text-velocity-muted text-[11px] tracking-widest uppercase font-semibold">White-Glove VIP Service</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-velocity-muted text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-velocity-gold" size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
