import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Gauge, Wind, Fuel, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedVehicles } from '../../data/vehicles';
import { formatPHPPerDay } from '../../utils/currency';
import ScrollReveal from '../ui/ScrollReveal';

export default function ShowroomSection() {
  const showroomVehicles = getFeaturedVehicles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVehicle = showroomVehicles[currentIndex] || showroomVehicles[0];

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % showroomVehicles.length);
  }, [showroomVehicles.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + showroomVehicles.length) % showroomVehicles.length);
  }, [showroomVehicles.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="py-28 md:py-36 bg-velocity-black relative overflow-hidden border-b border-velocity-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="divider" />
                <span className="section-label">Interactive Exhibition</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-section text-velocity-white">
                SHOWROOM MODE
              </h2>
            </ScrollReveal>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 border border-velocity-border flex items-center justify-center text-velocity-silver hover:text-velocity-gold hover:border-velocity-gold transition-colors"
              aria-label="Previous vehicle"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-velocity-muted font-mono text-xs px-2">
              0{currentIndex + 1} / 0{showroomVehicles.length}
            </span>
            <button
              onClick={handleNext}
              className="w-12 h-12 border border-velocity-border flex items-center justify-center text-velocity-silver hover:text-velocity-gold hover:border-velocity-gold transition-colors"
              aria-label="Next vehicle"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Main Showroom Hero Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-velocity-surface border border-velocity-border p-6 md:p-12 relative overflow-hidden">
          {/* Background Brand Watermark */}
          <div className="absolute top-10 right-10 text-[120px] md:text-[180px] font-display font-bold text-velocity-white/[0.02] select-none pointer-events-none leading-none">
            {currentVehicle.brand.toUpperCase()}
          </div>

          {/* Left / Main Stage: Vehicle Image with Parallax Transition */}
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-velocity-dark border border-velocity-border/60">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentVehicle.id}
                src={currentVehicle.thumbnail}
                alt={currentVehicle.model}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.06, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -40 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </AnimatePresence>

            <div className="absolute bottom-4 left-4">
              <span className="badge-gold text-[10px] tracking-widest uppercase">
                {currentVehicle.category}
              </span>
            </div>
          </div>

          {/* Right Stage: Specs & Vehicle Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-velocity-gold text-sm font-semibold tracking-widest uppercase block mb-1">
                    {currentVehicle.brand}
                  </span>
                  <h3 className="font-display text-4xl md:text-5xl text-velocity-white mb-2 leading-none">
                    {currentVehicle.model}
                  </h3>
                  <p className="font-display text-3xl text-velocity-gold mb-4">
                    {formatPHPPerDay(currentVehicle.pricePerDay)}
                  </p>
                  <p className="text-velocity-subtle text-sm leading-relaxed line-clamp-3">
                    {currentVehicle.description}
                  </p>
                </div>

                {/* Staggered Specs Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-velocity-border">
                  <div className="p-3 bg-velocity-dark border border-velocity-border/60">
                    <div className="text-velocity-muted text-[10px] uppercase flex items-center gap-1 mb-1">
                      <Zap size={12} className="text-velocity-gold" /> Power Output
                    </div>
                    <div className="text-velocity-white font-display text-2xl">{currentVehicle.horsepower} <span className="text-xs text-velocity-gold">HP</span></div>
                  </div>

                  <div className="p-3 bg-velocity-dark border border-velocity-border/60">
                    <div className="text-velocity-muted text-[10px] uppercase flex items-center gap-1 mb-1">
                      <Gauge size={12} className="text-velocity-gold" /> 0–100 Acceleration
                    </div>
                    <div className="text-velocity-white font-display text-2xl">{currentVehicle.acceleration} <span className="text-xs text-velocity-gold">sec</span></div>
                  </div>

                  <div className="p-3 bg-velocity-dark border border-velocity-border/60">
                    <div className="text-velocity-muted text-[10px] uppercase flex items-center gap-1 mb-1">
                      <Wind size={12} className="text-velocity-gold" /> Max Velocity
                    </div>
                    <div className="text-velocity-white font-display text-2xl">{currentVehicle.topSpeed} <span className="text-xs text-velocity-gold">km/h</span></div>
                  </div>

                  <div className="p-3 bg-velocity-dark border border-velocity-border/60">
                    <div className="text-velocity-muted text-[10px] uppercase flex items-center gap-1 mb-1">
                      <Settings size={12} className="text-velocity-gold" /> Gearbox
                    </div>
                    <div className="text-velocity-white font-display text-xl uppercase truncate">{currentVehicle.transmission}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Link
                    to={`/vehicle/${currentVehicle.id}`}
                    className="btn-outline flex-1 justify-center text-xs"
                  >
                    View Machine Details
                  </Link>
                  <Link
                    to={`/booking/${currentVehicle.id}`}
                    className="btn-primary flex-1 justify-center text-xs"
                  >
                    Book Machine
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
