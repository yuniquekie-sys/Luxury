import { AddOn } from '../types';

export const ADD_ONS: AddOn[] = [
  {
    id: 'concierge-driver',
    name: 'Private Chauffeur Service',
    description: 'Professional bilingual driver dedicated to your itinerary 24/7.',
    pricePerDay: 15000,
    icon: 'User',
  },
  {
    id: 'white-glove-delivery',
    name: 'White-Glove VIP Delivery',
    description: 'Enclosed trailer delivery to your hotel, residence, or private helipad in the Philippines.',
    priceFlat: 25000,
    icon: 'MapPin',
  },
  {
    id: 'zero-excess-insurance',
    name: 'Comprehensive Zero-Excess Protection',
    description: 'Complete peace of mind with 0% deductible coverage for all damage and glass.',
    pricePerDay: 35000,
    icon: 'Shield',
  },
  {
    id: 'track-telemetry',
    name: 'Track & Telemetry Package',
    description: 'VBOX telemetry setup, tire temperature sensors, and high-speed circuit access pass.',
    pricePerDay: 50000,
    icon: 'Gauge',
  },
  {
    id: 'airport-tarmac',
    name: 'Airport Tarmac Meet & Greet',
    description: 'Direct tarmac transfer from your private jet or flight arrival gate to your vehicle.',
    priceFlat: 30000,
    icon: 'Plane',
  },
  {
    id: 'bespoke-detailing',
    name: 'Daily Executive Detailing',
    description: 'Daily hand wash and interior sanitization by VELOCITY master detailers.',
    pricePerDay: 10000,
    icon: 'Package',
  },
];

export const LOCATIONS = [
  'Manila — Bonifacio Global City (BGC)',
  'Manila — Makati Financial Center',
  'Manila — Ninoy Aquino Int\'l Airport (T3 VIP)',
  'Clark — Clark Int\'l Airport / Jet Center',
  'Cebu — Mactan-Cebu Int\'l Airport VIP Terminal',
  'Boracay — Caticlan Jetty VIP Port',
];
