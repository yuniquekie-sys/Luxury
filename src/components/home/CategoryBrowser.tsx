import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';

const categories = [
  {
    id: 'hypercar',
    label: 'Hypercars & Megacars',
    count: '20+ Models',
    image: '/cars/category-hypercar.jpg',
    description: 'The absolute pinnacle of performance, rarity, and extreme engineering.',
  },
  {
    id: 'supercar',
    label: 'Supercars & Sports Cars',
    count: '16+ Models',
    image: '/cars/category-supercar.jpg',
    description: 'High-performance road cars, track specials, and precision exotica.',
  },
  {
    id: 'luxury',
    label: 'Ultra-Luxury & Grand Tourers',
    count: '15+ Models',
    image: '/cars/category-luxury.jpg',
    description: 'Opulence without compromise — bespoke luxury sedans, GTs, and elite SUVs.',
  },
];

export default function CategoryBrowser() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="categories-heading">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="divider" />
              <span className="section-label">Browse by Category</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 id="categories-heading" className="font-display text-section text-velocity-white">
              FIND YOUR DRIVE
            </h2>
          </ScrollReveal>
        </div>

        {/* 3 Main Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.1}>
              <Link to={`/fleet?category=${cat.id}`} className="block">
                <motion.div
                  className="category-card relative overflow-hidden group cursor-pointer border border-velocity-border hover:border-velocity-gold/50 transition-colors"
                  whileHover="hover"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <motion.img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover"
                      variants={{
                        hover: { scale: 1.08 },
                      }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-velocity-black/95 via-velocity-black/40 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <p className="text-velocity-gold text-xs font-semibold tracking-widest uppercase mb-1">{cat.count}</p>
                      <h3 className="font-display text-3xl md:text-4xl text-velocity-white mb-3 leading-tight">
                        {cat.label}
                      </h3>
                      <p className="text-velocity-silver text-sm leading-relaxed mb-4 opacity-90">
                        {cat.description}
                      </p>

                      <div className="flex items-center gap-2 text-velocity-gold text-xs font-semibold tracking-widest uppercase group-hover:translate-x-1 transition-transform">
                        Explore Collection →
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
