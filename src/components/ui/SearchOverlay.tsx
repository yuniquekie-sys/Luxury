import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { formatPHPPerDay } from '../../utils/currency';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, searchResults } = useApp();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/vehicle/${id}`);
  };

  const categoryLabel: Record<string, string> = {
    hypercar: 'Hypercars & Megacars',
    supercar: 'Supercars & Sports',
    luxury: 'Ultra-Luxury GT',
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-velocity-black/95 backdrop-blur-xl flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search vehicles"
        >
          {/* Header */}
          <div className="max-w-3xl mx-auto w-full px-6 pt-24 pb-8">
            <div className="flex items-center gap-4 border-b-2 border-velocity-gold pb-4">
              <Search className="text-velocity-gold flex-shrink-0" size={22} />
              <input
                autoFocus
                type="text"
                placeholder="Search by brand, model, engine (V16, W16, V12), or category..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-2xl text-velocity-white placeholder-velocity-muted outline-none font-body"
                aria-label="Search input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-velocity-muted hover:text-velocity-white">
                  <X size={18} />
                </button>
              )}
            </div>
            <p className="text-velocity-muted text-xs mt-3 tracking-wider uppercase">
              Press <kbd className="bg-velocity-surface-2 px-1.5 py-0.5 text-velocity-silver border border-velocity-border">ESC</kbd> to close
            </p>
          </div>

          {/* Results */}
          <div className="max-w-3xl mx-auto w-full px-6 flex-1 overflow-y-auto">
            {searchQuery && searchResults.length === 0 && (
              <div className="text-center py-16">
                <p className="text-velocity-subtle text-lg">No vehicles found for "{searchQuery}"</p>
                <p className="text-velocity-muted text-sm mt-2">Try searching for Ferrari, Koenigsegg, Bugatti, Tourbillon, Jesko, etc.</p>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-1">
                {searchResults.map((vehicle, i) => (
                  <motion.button
                    key={vehicle.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleSelect(vehicle.id)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-velocity-surface border border-transparent hover:border-velocity-border transition-all duration-200 group text-left"
                  >
                    <div className="w-16 h-12 overflow-hidden flex-shrink-0 bg-velocity-surface border border-velocity-border">
                      <img
                        src={vehicle.thumbnail}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-velocity-gold font-semibold text-xs tracking-widest uppercase">{vehicle.brand}</span>
                        <span className="text-velocity-muted">—</span>
                        <span className="text-velocity-white text-sm font-medium">{vehicle.model}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="badge-subtle text-[10px]">{categoryLabel[vehicle.category] || vehicle.category}</span>
                        <span className="text-velocity-muted text-xs flex items-center gap-1">
                          <Zap size={10} className="text-velocity-gold" />{vehicle.horsepower} HP
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-velocity-gold font-display text-lg">{formatPHPPerDay(vehicle.pricePerDay)}</span>
                      <ArrowRight size={14} className="text-velocity-muted group-hover:text-velocity-gold group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {!searchQuery && (
              <div className="py-8">
                <p className="section-label mb-6">Popular Machine Searches</p>
                <div className="flex flex-wrap gap-3">
                  {['Bugatti Tourbillon', 'Jesko Absolut', 'Ferrari F80', 'McLaren W1', 'Pagani Utopia', 'Rolls-Royce Spectre', 'Revuelto', 'GT3 RS'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-2 border border-velocity-border text-velocity-subtle text-xs tracking-wider uppercase hover:border-velocity-gold hover:text-velocity-gold transition-all duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
            className="fixed top-6 right-6 w-10 h-10 border border-velocity-border flex items-center justify-center text-velocity-subtle hover:text-velocity-white hover:border-velocity-white transition-all duration-200"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
