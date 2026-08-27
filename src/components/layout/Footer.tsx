import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const footerLinks = {
  Fleet: [
    { label: 'Sports Cars', href: '/fleet?category=sports' },
    { label: 'Supercars', href: '/fleet?category=supercar' },
    { label: 'Hypercars', href: '/fleet?category=hypercar' },
    { label: 'Luxury GT', href: '/fleet?category=luxury' },
    { label: 'SUV', href: '/fleet?category=suv' },
  ],
  Services: [
    { label: 'Chauffeur Service', href: '#' },
    { label: 'Vehicle Delivery', href: '#' },
    { label: 'Track Day Experience', href: '#' },
    { label: 'Corporate Rentals', href: '#' },
    { label: 'Event Bookings', href: '#' },
  ],
  Company: [
    { label: 'About VELOCITY', href: '#' },
    { label: 'Our Locations', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Admin', href: '/admin' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-velocity-dark border-t border-velocity-border">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-8 h-8 bg-velocity-gold flex items-center justify-center">
                <span className="font-display text-velocity-black text-lg leading-none">V</span>
              </div>
              <span className="font-display text-2xl tracking-[0.15em] text-velocity-white">VELOCITY</span>
            </Link>
            <p className="text-velocity-subtle text-sm leading-relaxed max-w-xs mb-6">
              The world's most extraordinary cars, curated for the world's most discerning drivers. Available globally.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-velocity-border flex items-center justify-center text-velocity-muted hover:text-velocity-gold hover:border-velocity-gold transition-all duration-300"
                  aria-label="Social media"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="section-label mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-velocity-subtle text-sm hover:text-velocity-white transition-colors duration-200 animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-velocity-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-velocity-muted text-xs">
            © 2024 VELOCITY Luxury Rentals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#" className="text-velocity-muted text-xs hover:text-velocity-subtle transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
