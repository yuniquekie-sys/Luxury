import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VehicleCard from '../ui/VehicleCard';
import ScrollReveal from '../ui/ScrollReveal';
import { getFeaturedVehicles } from '../../data/vehicles';

export default function FeaturedFleet() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const vehicles = getFeaturedVehicles();

  return (
    <section className="py-24 md:py-32" aria-labelledby="collection-heading">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="divider" />
                <span className="section-label">Curated Selection</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                id="collection-heading"
                className="font-display text-section text-velocity-white"
              >
                THE COLLECTION
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="left" delay={0.2}>
            <Link
              to="/fleet"
              className="flex items-center gap-2 text-velocity-subtle text-sm tracking-widest uppercase hover:text-velocity-gold transition-colors duration-200 group"
            >
              View All Vehicles
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {vehicles.map((vehicle, i) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Link to={`/vehicle/${vehicle.id}`}>
                <VehicleCard vehicle={vehicle} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
