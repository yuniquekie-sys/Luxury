import { User, Booking, AdminStats } from '../types';

export const mockCustomerUser: User = {
  id: 'usr-001',
  name: 'Alexander Chen',
  email: 'alexander@velocity.ph',
  phone: '+63 917 888 9999',
  role: 'customer',
  memberSince: 'Mar 2023',
  licenseNumber: 'N01-18-999999',
  dateOfBirth: '1992-06-15',
  favoriteIds: [
    'bugatti-tourbillon-2025',
    'koenigsegg-jesko-absolut-2024',
    'ferrari-f80-2025',
    'lamborghini-revuelto-2024',
  ],
  bookings: [],
};

export const mockAdminUser: User = {
  id: 'adm-001',
  name: 'Senior Administrator',
  email: 'admin@velocity.ph',
  phone: '+63 2 8888 0000',
  role: 'admin',
  memberSince: 'Jan 2022',
  licenseNumber: 'A01-00-000001',
  favoriteIds: [],
  bookings: [],
};

export const mockUser = mockCustomerUser;

export const mockBookings: Booking[] = [
  {
    id: 'VLT-PH-982143',
    vehicleId: 'lamborghini-revuelto-2024',
    vehicleName: 'Lamborghini Revuelto',
    userId: 'usr-001',
    status: 'upcoming',
    pickupDate: '2026-09-10',
    returnDate: '2026-09-13',
    pickupLocation: 'Manila — Bonifacio Global City (BGC)',
    totalDays: 3,
    basePricePerDay: 320000,
    addOns: [
      {
        id: 'white-glove-delivery',
        name: 'White-Glove VIP Delivery',
        description: 'Enclosed trailer delivery',
        priceFlat: 25000,
        icon: 'MapPin',
      },
      {
        id: 'zero-excess-insurance',
        name: 'Comprehensive Zero-Excess Protection',
        description: '0% deductible coverage',
        pricePerDay: 35000,
        icon: 'Shield',
      },
    ],
    subtotal: 1090000,
    taxes: 98100,
    total: 1188100,
    createdAt: '2026-08-20',
  },
  {
    id: 'VLT-PH-871290',
    vehicleId: 'ferrari-sf90-xx-stradale-2024',
    vehicleName: 'Ferrari SF90 XX Stradale',
    userId: 'usr-001',
    status: 'completed',
    pickupDate: '2026-07-15',
    returnDate: '2026-07-17',
    pickupLocation: 'Manila — Makati Financial Center',
    totalDays: 2,
    basePricePerDay: 350000,
    addOns: [],
    subtotal: 700000,
    taxes: 63000,
    total: 763000,
    createdAt: '2026-07-10',
  },
  {
    id: 'VLT-PH-761245',
    vehicleId: 'rolls-royce-phantom-viii-2024',
    vehicleName: 'Rolls-Royce Phantom VIII',
    userId: 'usr-001',
    status: 'completed',
    pickupDate: '2026-05-01',
    returnDate: '2026-05-04',
    pickupLocation: 'Manila — Bonifacio Global City (BGC)',
    totalDays: 3,
    basePricePerDay: 250000,
    addOns: [],
    subtotal: 750000,
    taxes: 67500,
    total: 817500,
    createdAt: '2026-04-25',
  },
];

export const adminStats: AdminStats = {
  totalRevenue: 48500000, // PHP
  totalBookings: 142,
  activeRentals: 8,
  availableVehicles: 34,
  fleetUtilization: 82,
  revenueByMonth: [
    { month: 'Jan', revenue: 3200000 },
    { month: 'Feb', revenue: 4100000 },
    { month: 'Mar', revenue: 5800000 },
    { month: 'Apr', revenue: 6400000 },
    { month: 'May', revenue: 7200000 },
    { month: 'Jun', revenue: 8900000 },
    { month: 'Jul', revenue: 9400000 },
    { month: 'Aug', revenue: 11200000 },
  ],
  bookingsByCategory: [
    { category: 'Hypercars & Megacars', count: 48 },
    { category: 'Supercars & Sports', count: 64 },
    { category: 'Ultra-Luxury GT', count: 30 },
  ],
  topVehicles: [
    { vehicle: 'Bugatti Tourbillon', rentals: 14, revenue: 21000000 },
    { vehicle: 'Lamborghini Revuelto', rentals: 22, revenue: 7040000 },
    { vehicle: 'Ferrari F80', rentals: 12, revenue: 16800000 },
    { vehicle: 'Rolls-Royce Phantom VIII', rentals: 18, revenue: 4500000 },
    { vehicle: 'Koenigsegg Jesko Attack', rentals: 10, revenue: 11000000 },
  ],
};
