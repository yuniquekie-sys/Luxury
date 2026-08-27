import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { FEATURED_COLLECTIONS, getVehicleById } from '../../data/vehicles';
import VehicleCard from '../ui/VehicleCard';
import ScrollReveal from '../ui/ScrollReveal';

type CollectionKey = keyof typeof FEATURED_COLLECTIONS;

export default function CuratedCollections() {
  const [activeTab, setActiveTab] = useState<CollectionKey>('hyperclass');

  const activeCollection = FEATURED_COLLECTIONS[activeTab];
  const collectionVehicles = activeCollection.ids
    .map(id => getVehicleById(id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <section className="py-24 md:py-32" aria-labelledby="collections-heading">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={16} className="text-velocity-gold" />
                <span className="section-label">Curated Fleets</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 id="collections-heading" className="font-display text-section text-velocity-white">
                CURATED SELECTIONS
              </h2>
            </ScrollReveal>
          </div>

          {/* Collection Tab Selector */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-2 border-b border-velocity-border pb-1">
              {(Object.keys(FEATURED_COLLECTIONS) as CollectionKey[]).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 relative ${
                    activeTab === key
                      ? 'text-velocity-gold font-bold'
                      : 'text-velocity-muted hover:text-velocity-white'
                  }`}
                >
                  {FEATURED_COLLECTIONS[key].title}
                  {activeTab === key && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-velocity-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Subtitle */}
        <p className="text-velocity-subtle text-sm md:text-base mb-10 font-light">
          {activeCollection.subtitle}
        </p>

        {/* Vehicle Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {collectionVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Link */}
        <div className="mt-12 text-center">
          <Link
            to="/fleet"
            className="btn-outline inline-flex text-xs px-8 py-3 tracking-widest uppercase"
          >
            Browse Entire Fleet ({collectionVehicles.length}+ Models Available)
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
