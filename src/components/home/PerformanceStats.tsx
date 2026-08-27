import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '../../hooks';

const stats = [
  { target: 1600, suffix: '+', label: 'Peak Horsepower', unit: 'HP' },
  { target: 1.85, suffix: 's', label: 'Fastest 0–100', decimals: 2 },
  { target: 531, suffix: '', label: 'Top Speed Record', unit: 'KM/H' },
  { target: 50, suffix: '+', label: 'Exotic Vehicles', unit: '' },
];

interface StatCounterProps {
  target: number;
  suffix: string;
  label: string;
  unit?: string;
  decimals?: number;
  start: boolean;
}

function StatCounter({ target, suffix, label, unit, decimals = 0, start }: StatCounterProps) {
  const count = useCountUp(target, 2000, start);
  const displayValue = decimals > 0 ? target.toFixed(decimals) : count.toLocaleString();

  return (
    <div className="text-center group">
      <div className="flex items-end justify-center gap-1 mb-2">
        <span className="font-display text-[clamp(3rem,6vw,5.5rem)] text-velocity-white leading-none">
          {displayValue}
        </span>
        <span className="font-display text-[clamp(2rem,4vw,3.5rem)] text-velocity-gold leading-none mb-1">
          {suffix}
        </span>
      </div>
      {unit && (
        <div className="text-velocity-gold text-xs tracking-[0.3em] uppercase mb-1 font-medium">{unit}</div>
      )}
      <div className="text-velocity-muted text-sm tracking-wide uppercase">{label}</div>
    </div>
  );
}

export default function PerformanceStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 border-y border-velocity-border relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(45deg, #c9a84c 1px, transparent 1px), linear-gradient(-45deg, #c9a84c 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div ref={ref} className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="divider" />
            <span className="section-label">Performance Benchmarks</span>
            <div className="divider" />
          </div>
          <h2 className="font-display text-section text-velocity-white">BY THE NUMBERS</h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <StatCounter {...stat} start={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
