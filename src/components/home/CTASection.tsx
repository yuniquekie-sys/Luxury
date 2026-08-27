import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

export default function CTASection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000&auto=format&fit=crop&q=80"
          alt="Luxury car rear"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-velocity-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-velocity-black/60 to-velocity-black/40" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 text-center">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="divider" />
            <span className="section-label">Begin Your Journey</span>
            <div className="divider" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-hero text-velocity-white mb-6 leading-[0.9]">
            YOUR NEXT DRIVE<br />
            <span className="text-gold-gradient">STARTS HERE.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-velocity-silver text-lg md:text-xl max-w-xl mx-auto mb-10 font-light">
            Explore the complete VELOCITY fleet and reserve your extraordinary vehicle today.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/fleet"
              id="cta-explore-collection"
              className="btn-primary"
            >
              Explore the Collection
              <ArrowRight size={16} />
            </Link>
            <Link to="/account" className="btn-outline">
              Create Account
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
