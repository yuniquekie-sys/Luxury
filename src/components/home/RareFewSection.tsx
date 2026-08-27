import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { getExclusiveVehicles } from '../../data/vehicles';
import { formatPHP } from '../../utils/currency';
import ScrollReveal from '../ui/ScrollReveal';

export default function RareFewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const rareVehicles = getExclusiveVehicles();

  return (
    <section className="py-28 md:py-36 bg-velocity-dark relative overflow-hidden border-y border-velocity-gold/20">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-velocity-gold/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <Flame size={16} className="text-velocity-gold animate-pulse" />
                <span className="section-label text-velocity-gold">Exclusive Hypercars & Megacars</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] text-velocity-white leading-none">
                THE RARE FEW
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-velocity-subtle text-base md:text-lg max-w-xl mt-3 font-light">
                For those who don't settle for ordinary. The absolute pinnacle of global automotive engineering, available exclusively through VELOCITY.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={0.2}>
            <Link
              to="/fleet?category=hypercar"
              className="btn-outline text-xs border-velocity-gold/40 text-velocity-gold hover:bg-velocity-gold hover:text-velocity-black"
            >
              Explore All Megacars
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Featured Big Showcase Card (First Vehicle) */}
        {rareVehicles.length > 0 && (
          <ScrollReveal className="mb-12">
            <Link to={`/vehicle/${rareVehicles[0].id}`} className="block group">
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-velocity-gold/40 bg-velocity-surface hover:border-velocity-gold transition-colors duration-200">
                <img
                  loading="lazy"
                  src={rareVehicles[0].thumbnail}
                  alt={rareVehicles[0].model}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-200 ease-out transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-velocity-black via-velocity-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <span className="badge-gold mb-3 inline-block text-xs">Pinnacle Hypercar</span>
                    <p className="text-velocity-gold text-sm tracking-widest uppercase font-semibold mb-1">
                      {rareVehicles[0].brand}
                    </p>
                    <h3 className="font-display text-4xl md:text-6xl text-velocity-white leading-none mb-3 group-hover:text-velocity-gold transition-colors duration-200">
                      {rareVehicles[0].model}
                    </h3>
                    <p className="text-velocity-silver text-sm max-w-2xl hidden md:block line-clamp-2">
                      {rareVehicles[0].description}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end flex-shrink-0">
                    <span className="text-velocity-muted text-xs tracking-widest uppercase mb-1">Daily Rental</span>
                    <span className="font-display text-4xl md:text-5xl text-velocity-gold">
                      {formatPHP(rareVehicles[0].pricePerDay)}
                    </span>
                    <span className="text-velocity-subtle text-xs">/ DAY</span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Grid for remaining Rare Few vehicles */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rareVehicles.slice(1, 9).map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Link to={`/vehicle/${v.id}`} className="block group">
                <div className="bg-velocity-surface border border-velocity-border p-5 hover:border-velocity-gold/70 hover:-translate-y-1 transition-all duration-200 shadow-lg">
                  <div className="aspect-[16/10] overflow-hidden mb-4 relative bg-velocity-dark">
                    <img
                      loading="lazy"
                      src={v.thumbnail}
                      alt={v.model}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200 ease-out transform-gpu"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 text-[9px] bg-velocity-gold text-velocity-black font-bold tracking-widest uppercase">
                        RARE FEW
                      </span>
                    </div>
                  </div>
                  <p className="text-velocity-gold text-xs font-semibold tracking-widest uppercase mb-0.5">{v.brand}</p>
                  <h4 className="font-display text-2xl text-velocity-white mb-2 group-hover:text-velocity-gold transition-colors duration-200">{v.model}</h4>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-velocity-border/60">
                    <span className="text-velocity-subtle text-xs">{v.horsepower} HP · {v.acceleration}s</span>
                    <span className="font-display text-lg text-velocity-gold">{formatPHP(v.pricePerDay)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
