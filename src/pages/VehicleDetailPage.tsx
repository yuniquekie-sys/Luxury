import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Scale, Zap, Gauge, Wind, ArrowLeft, ArrowRight, MapPin, Users, Fuel, Settings, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { getVehicleById } from '../data/vehicles';
import { useApp } from '../context/AppContext';
import { formatPHP, formatPHPPerDay } from '../utils/currency';
import ScrollReveal from '../components/ui/ScrollReveal';

const CATEGORY_LABELS: Record<string, string> = {
  hypercar: 'Hypercar / Megacar',
  supercar: 'Supercar & Sports',
  luxury: 'Ultra-Luxury GT',
};

const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  available: { label: 'AVAILABLE FOR RESERVATION', class: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  reserved: { label: 'CURRENTLY RESERVED', class: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  rented: { label: 'CURRENTLY ON ROAD (RENTED)', class: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
  maintenance: { label: 'SCHEDULED MAINTENANCE', class: 'text-gray-400 bg-gray-500/10 border-gray-500/30' },
};

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const vehicle = id ? getVehicleById(id) : undefined;
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, toggleComparison, isInComparison } = useApp();
  const [activeImage, setActiveImage] = useState(0);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center pt-20">
        <div>
          <h1 className="font-display text-5xl text-velocity-white mb-4">Machine Not Found</h1>
          <p className="text-velocity-muted mb-8">The requested vehicle is not present in our current catalog.</p>
          <Link to="/fleet" className="btn-primary">Browse Available Fleet</Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(vehicle.id);
  const compared = isInComparison(vehicle.id);
  const allImages = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.thumbnail];
  const status = STATUS_CONFIG[vehicle.availability] || STATUS_CONFIG.available;

  return (
    <>
      {/* Cinematic Full Hero Stage */}
      <div className="relative h-[75vh] md:h-[85vh] overflow-hidden bg-velocity-dark">
        <motion.img
          key={activeImage}
          src={allImages[activeImage]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-velocity-black via-velocity-black/30 to-velocity-black/40" />

        {/* Top Controls */}
        <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 glass-dark px-4 py-2 text-xs uppercase tracking-widest text-velocity-silver hover:text-velocity-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleComparison(vehicle.id)}
              className={`flex items-center gap-2 glass-dark px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                compared ? 'text-velocity-gold border-velocity-gold' : 'text-velocity-silver hover:text-velocity-white'
              }`}
            >
              <Scale size={14} />
              {compared ? 'In Comparison' : 'Compare'}
            </button>

            <button
              onClick={() => toggleFavorite(vehicle.id)}
              className={`w-9 h-9 glass-dark flex items-center justify-center transition-colors ${
                favorite ? 'text-velocity-gold' : 'text-velocity-silver hover:text-velocity-white'
              }`}
            >
              <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Gallery Image Switcher Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveImage(i => (i - 1 + allImages.length) % allImages.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-dark flex items-center justify-center text-velocity-white hover:bg-velocity-gold hover:text-velocity-black transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setActiveImage(i => (i + 1) % allImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-dark flex items-center justify-center text-velocity-white hover:bg-velocity-gold hover:text-velocity-black transition-all"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Hero Bottom Content Banner */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="badge-gold text-xs">{CATEGORY_LABELS[vehicle.category]}</span>
                  {vehicle.variant && (
                    <span className="px-2.5 py-1 text-[10px] bg-velocity-gold/20 border border-velocity-gold/40 text-velocity-gold tracking-widest uppercase font-semibold">
                      VARIANT: {vehicle.variant}
                    </span>
                  )}
                  <span className="text-velocity-muted text-sm font-mono">{vehicle.year} MODEL</span>
                </div>
                <p className="text-velocity-gold text-sm tracking-widest uppercase font-semibold mb-1">{vehicle.brand}</p>
                <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] text-velocity-white leading-none">
                  {vehicle.model}
                </h1>
              </div>

              <div className="text-left md:text-right flex-shrink-0">
                <p className="text-velocity-muted text-xs tracking-widest uppercase mb-1">DAILY RENTAL RATE</p>
                <p className="font-display text-4xl md:text-6xl text-velocity-gold">{formatPHPPerDay(vehicle.pricePerDay)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="bg-velocity-dark border-b border-velocity-border">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-4 flex gap-3 overflow-x-auto custom-scrollbar">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-24 h-16 overflow-hidden flex-shrink-0 border-2 transition-all ${
                  i === activeImage ? 'border-velocity-gold' : 'border-velocity-border hover:border-velocity-white'
                }`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left / Main Column */}
          <div className="lg:col-span-2 space-y-14">

            {/* PERFORMANCE DATA VISUALIZATION */}
            <ScrollReveal>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="divider" />
                  <span className="section-label">Performance Benchmarks</span>
                </div>
                <div className="grid grid-cols-3 gap-px bg-velocity-border">
                  <div className="bg-velocity-dark p-6 text-center">
                    <div className="text-velocity-muted text-[10px] tracking-widest uppercase mb-1 flex items-center justify-center gap-1">
                      <Zap size={12} className="text-velocity-gold" /> POWER
                    </div>
                    <div className="font-display text-4xl md:text-5xl text-velocity-white mb-1">
                      {vehicle.horsepower ? `${vehicle.horsepower}` : 'N/A'}
                      {vehicle.horsepower ? <span className="text-2xl text-velocity-gold"> HP</span> : null}
                    </div>
                    <div className="text-velocity-muted text-xs uppercase">Peak Output</div>
                  </div>

                  <div className="bg-velocity-dark p-6 text-center">
                    <div className="text-velocity-muted text-[10px] tracking-widest uppercase mb-1 flex items-center justify-center gap-1">
                      <Gauge size={12} className="text-velocity-gold" /> 0–100 KM/H
                    </div>
                    <div className="font-display text-4xl md:text-5xl text-velocity-white mb-1">
                      {vehicle.acceleration ? `${vehicle.acceleration}` : 'N/A'}
                      {vehicle.acceleration ? <span className="text-2xl text-velocity-gold"> SEC</span> : null}
                    </div>
                    <div className="text-velocity-muted text-xs uppercase">Acceleration</div>
                  </div>

                  <div className="bg-velocity-dark p-6 text-center">
                    <div className="text-velocity-muted text-[10px] tracking-widest uppercase mb-1 flex items-center justify-center gap-1">
                      <Wind size={12} className="text-velocity-gold" /> TOP SPEED
                    </div>
                    <div className="font-display text-4xl md:text-5xl text-velocity-white mb-1">
                      {vehicle.topSpeed ? `${vehicle.topSpeed}` : 'N/A'}
                      {vehicle.topSpeed ? <span className="text-2xl text-velocity-gold"> KM/H</span> : null}
                    </div>
                    <div className="text-velocity-muted text-xs uppercase">Maximum Velocity</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* TECHNICAL SPECIFICATIONS GRID */}
            <ScrollReveal delay={0.1}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="divider" />
                  <span className="section-label">Technical Specifications</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Settings, label: 'ENGINE', value: vehicle.engine || 'N/A' },
                    { icon: Zap, label: 'TRANSMISSION', value: vehicle.transmission ? vehicle.transmission.toUpperCase() : 'N/A' },
                    { icon: Fuel, label: 'POWERTRAIN', value: vehicle.fuelType ? vehicle.fuelType.toUpperCase() : 'N/A' },
                    { icon: Users, label: 'DRIVETRAIN', value: vehicle.drivetrain || 'N/A' },
                    { icon: Gauge, label: 'TORQUE', value: vehicle.torque ? `${vehicle.torque} Nm` : 'N/A' },
                    { icon: MapPin, label: 'SEATING', value: vehicle.seats ? `${vehicle.seats} Occupants` : 'N/A' },
                  ].map(spec => (
                    <div key={spec.label} className="flex items-start gap-3.5 p-4 bg-velocity-surface border border-velocity-border">
                      <spec.icon size={18} className="text-velocity-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-velocity-muted text-[10px] uppercase tracking-widest mb-0.5">{spec.label}</p>
                        <p className="text-velocity-white text-sm font-medium">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* DESCRIPTION */}
            <ScrollReveal delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="divider" />
                  <span className="section-label">Overview & Engineering</span>
                </div>
                <p className="text-velocity-subtle text-base md:text-lg leading-relaxed font-light">
                  {vehicle.description}
                </p>
              </div>
            </ScrollReveal>

            {/* FEATURES & EQUIPMENT */}
            <ScrollReveal delay={0.3}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="divider" />
                  <span className="section-label">Key Features & Equipment</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {vehicle.features.map(feat => (
                    <div key={feat} className="flex items-center gap-3 p-3 bg-velocity-surface/50 border border-velocity-border/60 text-sm text-velocity-silver">
                      <ShieldCheck size={16} className="text-velocity-gold flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column / Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <ScrollReveal direction="left">
                <div className="bg-velocity-surface border border-velocity-border p-6 shadow-2xl">
                  {/* Daily Price */}
                  <div className="border-b border-velocity-border pb-5 mb-5">
                    <p className="text-velocity-muted text-xs uppercase tracking-widest mb-1">DAILY RENTAL RATE</p>
                    <p className="font-display text-4xl text-velocity-gold">{formatPHP(vehicle.pricePerDay)}</p>
                    <p className="text-velocity-muted text-xs">/ DAY (EXCL. TAXES & ADD-ONS)</p>
                  </div>

                  {/* Availability Badge */}
                  <div className="mb-6">
                    <span className={`block w-full text-center py-2 px-3 text-xs tracking-widest font-semibold uppercase border ${status.class}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-6 pb-5 border-b border-velocity-border">
                    <MapPin size={16} className="text-velocity-gold" />
                    <span className="text-velocity-subtle text-xs font-medium">{vehicle.location}</span>
                  </div>

                  {/* Rental Requirements */}
                  <div className="mb-6 space-y-2">
                    <p className="text-velocity-white text-xs font-semibold tracking-widest uppercase mb-3">Rental Requirements</p>
                    <ul className="space-y-2 text-velocity-muted text-xs">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-velocity-gold" /> Valid international / PH license</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-velocity-gold" /> Minimum age 25 years old</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-velocity-gold" /> Refundable security deposit</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-velocity-gold" /> Identity verification pass</li>
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link
                      to={vehicle.availability === 'available' ? `/booking/${vehicle.id}` : '#'}
                      className={`btn-primary w-full justify-center text-xs py-3.5 tracking-widest uppercase ${
                        vehicle.availability !== 'available' ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
                      }`}
                    >
                      {vehicle.availability === 'available' ? 'RESERVE THIS MACHINE' : 'UNAVAILABLE'}
                      {vehicle.availability === 'available' && <ArrowRight size={14} />}
                    </Link>

                    <button
                      onClick={() => toggleComparison(vehicle.id)}
                      className={`w-full flex items-center justify-center gap-2 py-3 border text-xs tracking-widest uppercase transition-colors ${
                        compared ? 'border-velocity-gold text-velocity-gold bg-velocity-gold/10' : 'border-velocity-border text-velocity-subtle hover:text-velocity-white'
                      }`}
                    >
                      <Scale size={14} />
                      {compared ? 'REMOVE FROM COMPARISON' : 'ADD TO COMPARISON'}
                    </button>
                  </div>
                </div>

                {/* Direct Concierge Contact */}
                <div className="mt-4 p-4 border border-velocity-border text-center bg-velocity-dark">
                  <p className="text-velocity-muted text-xs mb-1">Custom itinerary or private jet transport?</p>
                  <a href="tel:+63288888888" className="text-velocity-gold text-xs font-semibold hover:underline">
                    CALL VELOCITY CONCIERGE: +63 2 8888 8888
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
