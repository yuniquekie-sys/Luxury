import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, ArrowRight, Check, Zap, Gauge, Fuel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getVehicleById } from '../../data/vehicles';
import { formatPHP } from '../../utils/currency';

export default function ComparisonBar() {
  const { comparisonIds, toggleComparison, clearComparison } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  if (comparisonIds.length === 0) return null;

  const compareVehicles = comparisonIds
    .map(id => getVehicleById(id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <>
      {/* Floating Bottom Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-3xl glass-dark border border-velocity-gold/30 p-4 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-velocity-gold/20 border border-velocity-gold/40 flex items-center justify-center text-velocity-gold">
              <Scale size={16} />
            </div>
            <div>
              <p className="text-velocity-white text-xs font-semibold tracking-widest uppercase">
                Machine Comparison ({comparisonIds.length}/3)
              </p>
              <p className="text-velocity-muted text-[11px]">Compare technical benchmarks & daily rates</p>
            </div>
          </div>

          {/* Selected thumbnails */}
          <div className="flex items-center gap-2">
            {compareVehicles.map(v => (
              <div key={v.id} className="relative group/thumb">
                <img
                  src={v.thumbnail}
                  alt={v.model}
                  className="w-12 h-9 object-cover border border-velocity-gold/40"
                />
                <button
                  onClick={() => toggleComparison(v.id)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-velocity-dark border border-velocity-gold/60 text-velocity-gold text-[9px] flex items-center justify-center rounded-full hover:bg-velocity-gold hover:text-velocity-black transition-colors"
                  aria-label={`Remove ${v.model} from comparison`}
                >
                  <X size={10} />
                </button>
              </div>
            ))}

            {Array.from({ length: 3 - compareVehicles.length }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-9 border border-dashed border-velocity-border flex items-center justify-center text-velocity-muted text-[10px]"
              >
                +Slot
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary text-xs py-2 px-4 whitespace-nowrap"
            >
              Compare ({comparisonIds.length})
              <ArrowRight size={13} />
            </button>
            <button
              onClick={clearComparison}
              className="text-velocity-muted hover:text-velocity-white text-xs px-2 py-1 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Comparison Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-velocity-black/95 backdrop-blur-2xl overflow-y-auto p-4 md:p-10 flex flex-col"
          >
            {/* Header */}
            <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between mb-8 pb-4 border-b border-velocity-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Scale size={14} className="text-velocity-gold" />
                  <span className="section-label">Technical Analysis</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-velocity-white">MACHINE COMPARISON</h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-10 h-10 border border-velocity-border flex items-center justify-center text-velocity-silver hover:text-velocity-white hover:border-velocity-gold transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="max-w-[1600px] w-full mx-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Column Headers / Specs Labels */}
                <div className="hidden md:block space-y-6 pt-36">
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">Daily Rate</div>
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">Category</div>
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">Horsepower</div>
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">0–100 km/h</div>
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">Top Speed</div>
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">Engine</div>
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">Transmission</div>
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">Drivetrain</div>
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">Fuel Type</div>
                  <div className="py-3 border-b border-velocity-border text-velocity-muted text-xs uppercase tracking-widest font-semibold">Location</div>
                </div>

                {/* Vehicle Columns */}
                {compareVehicles.map(v => (
                  <div key={v.id} className="bg-velocity-surface border border-velocity-border p-6 relative flex flex-col justify-between">
                    <button
                      onClick={() => toggleComparison(v.id)}
                      className="absolute top-4 right-4 p-1 text-velocity-muted hover:text-velocity-white transition-colors"
                      aria-label="Remove vehicle"
                    >
                      <X size={16} />
                    </button>

                    <div>
                      {/* Vehicle Thumbnail + Title */}
                      <img src={v.thumbnail} alt={v.model} className="w-full aspect-[16/10] object-cover mb-4 border border-velocity-border" />
                      <p className="text-velocity-gold text-xs tracking-widest uppercase mb-1 font-semibold">{v.brand}</p>
                      <h3 className="font-display text-2xl text-velocity-white mb-4">{v.model}</h3>

                      {/* Specs Row by Row */}
                      <div className="space-y-4 md:space-y-6">
                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">Daily Rate</span>
                          <span className="font-display text-2xl text-velocity-gold">{formatPHP(v.pricePerDay)}</span>
                          <span className="text-velocity-muted text-xs">/day</span>
                        </div>

                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">Category</span>
                          <span className="text-velocity-white text-sm capitalize">{v.category}</span>
                        </div>

                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">Horsepower</span>
                          <span className="text-velocity-white text-lg font-semibold">{v.horsepower} <span className="text-velocity-gold text-xs">HP</span></span>
                        </div>

                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">0–100 km/h</span>
                          <span className="text-velocity-white text-lg font-semibold">{v.acceleration} <span className="text-velocity-gold text-xs">s</span></span>
                        </div>

                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">Top Speed</span>
                          <span className="text-velocity-white text-lg font-semibold">{v.topSpeed} <span className="text-velocity-gold text-xs">km/h</span></span>
                        </div>

                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">Engine</span>
                          <span className="text-velocity-subtle text-xs font-medium">{v.engine}</span>
                        </div>

                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">Transmission</span>
                          <span className="text-velocity-white text-sm uppercase">{v.transmission}</span>
                        </div>

                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">Drivetrain</span>
                          <span className="text-velocity-white text-sm">{v.drivetrain}</span>
                        </div>

                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">Fuel Type</span>
                          <span className="text-velocity-white text-sm capitalize">{v.fuelType}</span>
                        </div>

                        <div className="py-2 border-b border-velocity-border/60">
                          <span className="md:hidden text-velocity-muted text-xs block mb-1">Location</span>
                          <span className="text-velocity-subtle text-xs">{v.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-velocity-border">
                      <Link
                        to={`/booking/${v.id}`}
                        onClick={() => setModalOpen(false)}
                        className="btn-primary w-full justify-center text-xs"
                      >
                        Reserve Vehicle
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
