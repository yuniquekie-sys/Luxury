import { Truck, HeadphonesIcon, Shield, CalendarDays, Star, Globe } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const benefits = [
  {
    icon: Truck,
    title: 'Premium Delivery',
    description: 'We deliver your selected vehicle to your hotel, private address, or event venue anywhere in the world.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Concierge Service',
    description: '24/7 dedicated concierge available to handle every detail of your rental experience, from start to finish.',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Every vehicle in our fleet is comprehensively insured. Optional zero-excess coverage available.',
  },
  {
    icon: CalendarDays,
    title: 'Flexible Periods',
    description: 'Rent for a single day or an entire month. We accommodate any itinerary with no hidden restrictions.',
  },
  {
    icon: Star,
    title: 'Curated Fleet',
    description: 'Every vehicle is carefully selected, regularly maintained, and prepared to the highest standards before each rental.',
  },
  {
    icon: Globe,
    title: 'Global Locations',
    description: 'Access the VELOCITY fleet in Dubai, Monaco, London, Los Angeles, Miami, and more cities worldwide.',
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-24 md:py-32 bg-velocity-dark" aria-labelledby="experience-heading" id="experience">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="divider" />
                <span className="section-label">The VELOCITY Experience</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 id="experience-heading" className="font-display text-section text-velocity-white">
                WHY CHOOSE<br />VELOCITY
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2} direction="left">
            <p className="text-velocity-subtle text-lg leading-relaxed self-end">
              We don't just rent cars — we curate extraordinary automotive experiences. Every detail is handled with precision so you can focus entirely on the drive.
            </p>
          </ScrollReveal>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-velocity-border">
          {benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.title} delay={i * 0.08}>
              <div className="bg-velocity-dark p-8 group hover:bg-velocity-surface transition-colors duration-300">
                <div className="w-10 h-10 border border-velocity-border flex items-center justify-center mb-5 group-hover:border-velocity-gold transition-colors duration-300">
                  <benefit.icon
                    size={18}
                    className="text-velocity-muted group-hover:text-velocity-gold transition-colors duration-300"
                  />
                </div>
                <h3 className="text-velocity-white font-semibold text-base mb-3">{benefit.title}</h3>
                <p className="text-velocity-muted text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
