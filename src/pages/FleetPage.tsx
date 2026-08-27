import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react';
import VehicleCard from '../components/ui/VehicleCard';
import ScrollReveal from '../components/ui/ScrollReveal';
import { vehicles, getAllBrands } from '../data/vehicles';
import { VehicleCategory, FuelType, TransmissionType } from '../types';
import { formatPHP } from '../utils/currency';

const CATEGORY_LABELS: Record<VehicleCategory, string> = {
  hypercar: 'Hypercars & Megacars',
  supercar: 'Supercars & Sports',
  luxury: 'Ultra-Luxury & GT',
};

const HP_RANGES = [
  { id: 'all', label: 'All Outputs' },
  { id: 'sub500', label: 'Under 500 HP' },
  { id: '500-700', label: '500 – 700 HP' },
  { id: '700-1000', label: '700 – 1,000 HP' },
  { id: '1000plus', label: '1,000+ HP' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'hp-desc', label: 'Most Powerful' },
  { value: 'speed-desc', label: 'Fastest' },
];

export default function FleetPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<VehicleCategory[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [hpRange, setHpRange] = useState<string>('all');
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sortBy, setSortBy] = useState('popular');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const allBrands = getAllBrands();

  // Sync category from URL query param
  useEffect(() => {
    const cat = searchParams.get('category') as VehicleCategory | null;
    if (cat && ['hypercar', 'supercar', 'luxury'].includes(cat)) {
      setCategories([cat]);
    }
  }, [searchParams]);

  const toggleArray = <T,>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];

  const filtered = useMemo(() => {
    let result = [...vehicles];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(v =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.engine.toLowerCase().includes(q) ||
        (v.variant && v.variant.toLowerCase().includes(q))
      );
    }
    if (categories.length > 0) {
      result = result.filter(v => categories.includes(v.category));
    }
    if (brands.length > 0) {
      result = result.filter(v => brands.includes(v.brand));
    }
    if (fuelTypes.length > 0) {
      result = result.filter(v => fuelTypes.includes(v.fuelType));
    }
    if (transmissions.length > 0) {
      result = result.filter(v => transmissions.includes(v.transmission));
    }
    if (availableOnly) {
      result = result.filter(v => v.availability === 'available');
    }
    if (maxPrice < 2000000) {
      result = result.filter(v => v.pricePerDay <= maxPrice);
    }

    if (hpRange !== 'all') {
      if (hpRange === 'sub500') result = result.filter(v => v.horsepower < 500);
      else if (hpRange === '500-700') result = result.filter(v => v.horsepower >= 500 && v.horsepower <= 700);
      else if (hpRange === '700-1000') result = result.filter(v => v.horsepower > 700 && v.horsepower <= 1000);
      else if (hpRange === '1000plus') result = result.filter(v => v.horsepower > 1000);
    }

    switch (sortBy) {
      case 'price-asc': return result.sort((a, b) => a.pricePerDay - b.pricePerDay);
      case 'price-desc': return result.sort((a, b) => b.pricePerDay - a.pricePerDay);
      case 'hp-desc': return result.sort((a, b) => b.horsepower - a.horsepower);
      case 'speed-desc': return result.sort((a, b) => b.topSpeed - a.topSpeed);
      default: return result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
  }, [search, categories, brands, fuelTypes, transmissions, availableOnly, maxPrice, hpRange, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setCategories([]);
    setBrands([]);
    setHpRange('all');
    setFuelTypes([]);
    setTransmissions([]);
    setAvailableOnly(false);
    setMaxPrice(2000000);
    setSortBy('popular');
  };

  const activeFiltersCount = categories.length + brands.length + fuelTypes.length + transmissions.length +
    (hpRange !== 'all' ? 1 : 0) + (availableOnly ? 1 : 0) + (maxPrice < 2000000 ? 1 : 0);

  return (
    <>
      {/* Page Header */}
      <div className="pt-28 pb-12 border-b border-velocity-border bg-velocity-dark">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="divider" />
              <span className="section-label">Philippines VIP Fleet</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-section text-velocity-white mb-2">THE COLLECTION</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-velocity-subtle text-lg font-light">
              Explore {vehicles.length} extraordinary hypercars, supercars, and ultra-luxury vehicles.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-10">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch md:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
            <input
              type="text"
              placeholder="Search model, brand, or V16/W16..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-luxury pl-10"
              aria-label="Search vehicles"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 ml-auto flex-wrap">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="input-luxury pr-8 appearance-none cursor-pointer text-xs uppercase font-semibold"
                aria-label="Sort vehicles"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-velocity-muted pointer-events-none" />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className={`flex items-center gap-2 px-4 py-3 border text-xs tracking-widest uppercase transition-colors ${
                sidebarOpen || activeFiltersCount > 0
                  ? 'border-velocity-gold text-velocity-gold bg-velocity-gold/5'
                  : 'border-velocity-border text-velocity-subtle hover:border-velocity-white hover:text-velocity-white'
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-velocity-gold text-velocity-black text-[10px] font-bold flex items-center justify-center rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-velocity-muted text-xs hover:text-velocity-white transition-colors flex items-center gap-1"
              >
                <X size={12} /> Clear All
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 290, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex-shrink-0 overflow-hidden"
              >
                <div className="w-[290px] space-y-6 pr-2">
                  {/* Category */}
                  <FilterSection title="Category">
                    {(['hypercar', 'supercar', 'luxury'] as VehicleCategory[]).map(cat => (
                      <FilterCheckbox
                        key={cat}
                        label={CATEGORY_LABELS[cat]}
                        checked={categories.includes(cat)}
                        onChange={() => setCategories(c => toggleArray(c, cat))}
                      />
                    ))}
                  </FilterSection>

                  {/* Brand Filter */}
                  <FilterSection title="Manufacturer">
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {allBrands.map(brand => (
                        <FilterCheckbox
                          key={brand}
                          label={brand}
                          checked={brands.includes(brand)}
                          onChange={() => setBrands(b => toggleArray(b, brand))}
                        />
                      ))}
                    </div>
                  </FilterSection>

                  {/* HP Range */}
                  <FilterSection title="Power Benchmark">
                    {HP_RANGES.map(range => (
                      <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="hpRange"
                          checked={hpRange === range.id}
                          onChange={() => setHpRange(range.id)}
                          className="accent-velocity-gold"
                        />
                        <span className={`text-sm ${hpRange === range.id ? 'text-velocity-white font-medium' : 'text-velocity-muted group-hover:text-velocity-white'}`}>
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </FilterSection>

                  {/* Powertrain */}
                  <FilterSection title="Powertrain">
                    {(['petrol', 'hybrid', 'phev', 'electric'] as FuelType[]).map(fuel => (
                      <FilterCheckbox
                        key={fuel}
                        label={fuel.toUpperCase()}
                        checked={fuelTypes.includes(fuel)}
                        onChange={() => setFuelTypes(f => toggleArray(f, fuel))}
                      />
                    ))}
                  </FilterSection>

                  {/* Transmission */}
                  <FilterSection title="Gearbox">
                    {(['automatic', 'manual', 'dct', 'sequential', 'lst', 'dual-mode'] as TransmissionType[]).map(tx => (
                      <FilterCheckbox
                        key={tx}
                        label={tx.toUpperCase()}
                        checked={transmissions.includes(tx)}
                        onChange={() => setTransmissions(t => toggleArray(t, tx))}
                      />
                    ))}
                  </FilterSection>

                  {/* Price Range Slider in PHP */}
                  <FilterSection title="Max Daily Rental (PHP)">
                    <div>
                      <div className="flex justify-between text-xs text-velocity-subtle mb-2 font-mono">
                        <span>₱25K</span>
                        <span className="text-velocity-gold font-semibold">{formatPHP(maxPrice)}</span>
                      </div>
                      <input
                        type="range"
                        min={25000}
                        max={2000000}
                        step={25000}
                        value={maxPrice}
                        onChange={e => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-velocity-gold h-px cursor-pointer"
                        aria-label="Maximum daily rental rate"
                      />
                    </div>
                  </FilterSection>

                  {/* Availability */}
                  <FilterSection title="Availability">
                    <FilterCheckbox
                      label="Available Immediately"
                      checked={availableOnly}
                      onChange={() => setAvailableOnly(v => !v)}
                    />
                  </FilterSection>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Results Grid */}
          <div className="flex-1 min-w-0">
            {/* Category Quick Filter Pills */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-velocity-subtle text-sm">
                Showing <span className="text-velocity-white font-medium">{filtered.length}</span> of {vehicles.length} machines
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                {(['hypercar', 'supercar', 'luxury'] as VehicleCategory[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategories(c => toggleArray(c, cat))}
                    className={`text-xs px-3.5 py-1.5 border transition-all ${
                      categories.includes(cat)
                        ? 'border-velocity-gold text-velocity-gold bg-velocity-gold/10'
                        : 'border-velocity-border text-velocity-muted hover:border-velocity-white hover:text-velocity-white'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filtered.length === 0 ? (
              <div className="text-center py-32 border border-velocity-border bg-velocity-surface p-8">
                <Filter size={48} className="text-velocity-gold/40 mx-auto mb-4" />
                <h3 className="font-display text-2xl text-velocity-white mb-2 uppercase tracking-wide">
                  NO MACHINES MATCH YOUR SEARCH.
                </h3>
                <p className="text-velocity-muted text-sm mb-6">Try adjusting your category, price range, or power filters.</p>
                <button onClick={resetFilters} className="btn-outline text-xs px-6 py-2.5">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(vehicle => (
                  <div key={vehicle.id}>
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-velocity-border pb-6">
      <h3 className="text-velocity-white text-xs font-semibold tracking-widest uppercase mb-3.5">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
          checked ? 'border-velocity-gold bg-velocity-gold' : 'border-velocity-border group-hover:border-velocity-white'
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3L3 5L7 1" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span
        className={`text-xs transition-colors duration-150 ${checked ? 'text-velocity-white font-medium' : 'text-velocity-muted group-hover:text-velocity-white'}`}
        onClick={onChange}
      >
        {label}
      </span>
    </label>
  );
}
