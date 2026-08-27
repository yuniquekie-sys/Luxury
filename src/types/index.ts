export type VehicleCategory = 'hypercar' | 'supercar' | 'luxury';
export type VehicleSubcategory =
  | 'hypercar' | 'megacar' | 'track-hypercar' | 'hyper-gt' | 'electric-hypercar'
  | 'supercar' | 'sports' | 'hybrid-supercar' | 'american-supercar' | 'roadster'
  | 'ultra-luxury' | 'grand-tourer' | 'luxury-suv' | 'executive';
export type FuelType = 'petrol' | 'hybrid' | 'phev' | 'electric';
export type TransmissionType = 'automatic' | 'manual' | 'dct' | 'sequential' | 'lst' | 'dual-mode';
export type AvailabilityStatus = 'available' | 'reserved' | 'rented' | 'maintenance';
export type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type BookingStep = 1 | 2 | 3 | 4;
export type UserRole = 'customer' | 'admin';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  subcategory: VehicleSubcategory;
  year: number;
  pricePerDay: number;          // PHP
  horsepower: number;
  acceleration: number;         // 0–100 km/h seconds
  topSpeed: number;             // km/h
  engine: string;
  transmission: TransmissionType;
  seats: number;
  fuelType: FuelType;
  drivetrain: string;
  torque?: number;              // Nm
  weight?: number;              // kg
  description: string;
  features: string[];
  images: string[];
  thumbnail: string;
  availability: AvailabilityStatus;
  location: string;
  popular?: boolean;
  exclusive?: boolean;          // "The Rare Few"
  featured?: boolean;
  variant?: string;             // e.g. "Attack", "Absolut", "BC"
}

export interface Booking {
  id: string;
  vehicleId: string;
  vehicleName?: string;
  vehicle?: Vehicle;
  userId: string;
  status: BookingStatus;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  totalDays: number;
  basePricePerDay: number;
  addOns: AddOn[];
  subtotal: number;
  taxes: number;
  total: number;
  createdAt: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  pricePerDay?: number;   // PHP
  priceFlat?: number;     // PHP
  selected?: boolean;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  memberSince: string;
  licenseNumber?: string;
  dateOfBirth?: string;
  favoriteIds: string[];
  bookings: Booking[];
}

export interface FilterState {
  search: string;
  categories: VehicleCategory[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  hpRange: 'all' | 'sub500' | '500-700' | '700-1000' | '1000plus';
  fuelTypes: FuelType[];
  transmissions: TransmissionType[];
  availableOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'hp-desc' | 'speed-desc' | 'popular';
}

export interface ComparisonItem {
  vehicleId: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalBookings: number;
  activeRentals: number;
  availableVehicles: number;
  revenueByMonth: { month: string; revenue: number }[];
  bookingsByCategory: { category: string; count: number }[];
  topVehicles: { vehicle: string; rentals: number; revenue: number }[];
  fleetUtilization: number;
}
