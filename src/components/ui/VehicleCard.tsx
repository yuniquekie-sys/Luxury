import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Scale, ArrowRight, Gauge, Zap, Wind } from 'lucide-react';
import { Vehicle } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatPHPPerDay } from '../../utils/currency';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const CATEGORY_LABELS: Record<string, string> = {
  hypercar: 'Hypercar / Megacar',
  supercar: 'Supercar & Sports',
  luxury: 'Ultra-Luxury & GT',
};

const STATUS_CONFIG = {
  available: { label: 'AVAILABLE', class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  reserved: { label: 'RESERVED', class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  rented: { label: 'RENTED', class: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
  maintenance: { label: 'MAINTENANCE', class: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
};

function VehicleCardComponent({ vehicle }: VehicleCardProps) {
  const { toggleFavorite, isFavorite, toggleComparison, isInComparison } = useApp();
  const navigate = useNavigate();
  const favorite = isFavorite(vehicle.id);
  const compared = isInComparison(vehicle.id);
  const status = STATUS_CONFIG[vehicle.availability] || STATUS_CONFIG.available;

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (vehicle.availability === 'available') {
      navigate(`/booking/${vehicle.id}`);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleComparison(vehicle.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(vehicle.id);
  };

  return (
    <div className="vehicle-card group relative bg-velocity-surface border border-velocity-border overflow-hidden flex flex-col justify-between">
      <div>
        {/* Image Container with Reserved Aspect Ratio */}
        <div className="relative aspect-[16/10] overflow-hidden bg-velocity-dark">
          <img
            loading="lazy"
            src={vehicle.thumbnail}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="card-img"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-velocity-black via-velocity-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-200 pointer-events-none" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-2.5 py-1 text-[10px] tracking-widest font-semibold uppercase border ${status.class}`}>
              {status.label}
            </span>
          </div>

          {/* Action Buttons Top Right */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            {/* Compare Toggle */}
            <button
              onClick={handleCompareClick}
              className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all duration-150 ${
                compared
                  ? 'bg-velocity-gold border-velocity-gold text-velocity-black'
                  : 'bg-velocity-dark/90 border-velocity-border text-velocity-silver hover:text-velocity-gold hover:border-velocity-gold'
              }`}
              title={compared ? 'Remove from comparison' : 'Compare machine'}
              aria-label="Compare vehicle"
            >
              <Scale size={14} />
            </button>

            {/* Favorite Toggle */}
            <button
              onClick={handleFavoriteClick}
              className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all duration-150 ${
                favorite
                  ? 'bg-velocity-gold border-velocity-gold text-velocity-black'
                  : 'bg-velocity-dark/90 border-velocity-border text-velocity-silver hover:text-velocity-gold hover:border-velocity-gold'
              }`}
              title={favorite ? 'Remove from favorites' : 'Save vehicle'}
              aria-label="Favorite vehicle"
            >
              <Heart size={14} fill={favorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Rare / Exclusive Badge */}
          {vehicle.exclusive && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="badge-gold text-[9px] tracking-widest uppercase">
                RARE FEW
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-velocity-gold text-xs font-semibold tracking-widest uppercase">
              {vehicle.brand}
            </span>
            <span className="text-velocity-muted text-[11px] tracking-wider uppercase">
              {CATEGORY_LABELS[vehicle.category] || vehicle.category}
            </span>
          </div>

          {/* Model Title */}
          <h3 className="card-title font-display text-2xl md:text-3xl text-velocity-white mb-4">
            {vehicle.model}
          </h3>

          {/* Specs Benchmark Grid */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-velocity-border/60 mb-5 bg-velocity-dark/40 px-3">
            <div>
              <div className="text-velocity-muted text-[9px] tracking-widest uppercase flex items-center gap-1 mb-0.5">
                <Zap size={10} className="text-velocity-gold" /> HP
              </div>
              <div className="text-velocity-white text-xs font-bold">{vehicle.horsepower}</div>
            </div>

            <div>
              <div className="text-velocity-muted text-[9px] tracking-widest uppercase flex items-center gap-1 mb-0.5">
                <Gauge size={10} className="text-velocity-gold" /> 0–100
              </div>
              <div className="text-velocity-white text-xs font-bold">{vehicle.acceleration}s</div>
            </div>

            <div>
              <div className="text-velocity-muted text-[9px] tracking-widest uppercase flex items-center gap-1 mb-0.5">
                <Wind size={10} className="text-velocity-gold" /> MAX
              </div>
              <div className="text-velocity-white text-xs font-bold">{vehicle.topSpeed} km/h</div>
            </div>

            <div>
              <div className="text-velocity-muted text-[9px] tracking-widest uppercase mb-0.5">GEAR</div>
              <div className="text-velocity-white text-xs font-bold uppercase truncate">{vehicle.transmission}</div>
            </div>
          </div>

          {/* Price Per Day in PHP */}
          <div className="mb-6">
            <div className="text-velocity-muted text-[10px] tracking-widest uppercase mb-0.5">DAILY RENTAL RATE</div>
            <div className="font-display text-2xl md:text-3xl text-velocity-gold font-medium">
              {formatPHPPerDay(vehicle.pricePerDay)}
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-6 pb-6 pt-0 flex items-center gap-3">
        <Link
          to={`/vehicle/${vehicle.id}`}
          className="flex-1 btn-outline text-[11px] py-2.5 justify-center tracking-widest uppercase text-center"
        >
          VIEW VEHICLE
          <ArrowRight size={12} className="card-btn-arrow ml-1" />
        </Link>

        <button
          onClick={handleBookClick}
          disabled={vehicle.availability !== 'available'}
          className={`flex-1 btn-primary text-[11px] py-2.5 justify-center tracking-widest uppercase ${
            vehicle.availability !== 'available' ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}

export default memo(VehicleCardComponent);
