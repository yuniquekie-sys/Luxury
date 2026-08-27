import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Vehicle, FilterState, User, Booking } from '../types';
import { mockCustomerUser, mockAdminUser, mockBookings } from '../data/mockData';
import { vehicles } from '../data/vehicles';

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password?: string;
  licenseNumber?: string;
  dateOfBirth?: string;
}

interface AppContextType {
  // Auth & Roles
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginCustomer: (email: string, pass: string) => Promise<boolean>;
  signupCustomer: (data: SignupData) => Promise<boolean>;
  loginAdmin: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Comparison
  comparisonIds: string[];
  toggleComparison: (id: string) => void;
  isInComparison: (id: string) => boolean;
  clearComparison: () => void;

  // Search
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: Vehicle[];

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;

  // Bookings
  userBookings: Booking[];
  addBooking: (booking: Booking) => void;

  // Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // User accessor for backward compatibility
  user: User;
}

export const defaultFilters: FilterState = {
  search: '',
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 2000000,
  hpRange: 'all',
  fuelTypes: [],
  transmissions: [],
  availableOnly: false,
  sortBy: 'popular',
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to logged-in customer for seamless initial demo experience
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('velocity_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return mockCustomerUser;
  });

  const [userBookings, setUserBookings] = useState<Booking[]>(mockBookings);
  const [favorites, setFavorites] = useState<string[]>(mockCustomerUser.favoriteIds);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [toast, setToast] = useState<AppContextType['toast']>(null);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Save current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('velocity_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('velocity_user');
    }
  }, [currentUser]);

  // Auth Methods
  const loginCustomer = useCallback(async (email: string): Promise<boolean> => {
    const newUser: User = {
      ...mockCustomerUser,
      email: email.toLowerCase(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      role: 'customer',
    };
    setCurrentUser(newUser);
    showToast(`Welcome back, ${newUser.name}!`, 'success');
    return true;
  }, [showToast]);

  const signupCustomer = useCallback(async (data: SignupData): Promise<boolean> => {
    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone || '+63 917 000 0000',
      role: 'customer',
      memberSince: 'Aug 2026',
      licenseNumber: data.licenseNumber || 'N01-26-123456',
      dateOfBirth: data.dateOfBirth,
      favoriteIds: [],
      bookings: [],
    };
    setCurrentUser(newUser);
    showToast(`Account created! Welcome to VELOCITY, ${newUser.name}.`, 'success');
    return true;
  }, [showToast]);

  const loginAdmin = useCallback(async (email: string): Promise<boolean> => {
    const adminUser: User = {
      ...mockAdminUser,
      email: email.toLowerCase(),
      role: 'admin',
    };
    setCurrentUser(adminUser);
    showToast('Administrator Access Granted.', 'success');
    return true;
  }, [showToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    showToast('Signed out of VELOCITY', 'info');
  }, [showToast]);

  const toggleFavorite = useCallback((id: string) => {
    if (!currentUser) {
      showToast('Please sign in to save vehicles to your favorites', 'info');
      return;
    }
    setFavorites(prev => {
      if (prev.includes(id)) {
        showToast('Removed from saved machines', 'info');
        return prev.filter(f => f !== id);
      } else {
        showToast('Saved to your machine collection', 'success');
        return [...prev, id];
      }
    });
  }, [currentUser, showToast]);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleComparison = useCallback((id: string) => {
    setComparisonIds(prev => {
      if (prev.includes(id)) {
        showToast('Removed from machine comparison', 'info');
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 3) {
          showToast('Maximum 3 machines allowed in comparison', 'error');
          return prev;
        }
        showToast('Added to technical machine comparison', 'success');
        return [...prev, id];
      }
    });
  }, [showToast]);

  const isInComparison = useCallback((id: string) => comparisonIds.includes(id), [comparisonIds]);
  const clearComparison = useCallback(() => setComparisonIds([]), []);

  const addBooking = useCallback((booking: Booking) => {
    setUserBookings(prev => [booking, ...prev]);
  }, []);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = vehicles.filter(v =>
      v.brand.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.engine.toLowerCase().includes(q) ||
      (v.variant && v.variant.toLowerCase().includes(q))
    ).slice(0, 10);
    setSearchResults(results);
  }, [searchQuery]);

  // Close search on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => setFilters(defaultFilters), []);

  return (
    <AppContext.Provider value={{
      currentUser,
      isAuthenticated: Boolean(currentUser),
      isAdmin: currentUser?.role === 'admin',
      loginCustomer,
      signupCustomer,
      loginAdmin,
      logout,
      favorites,
      toggleFavorite,
      isFavorite,
      comparisonIds,
      toggleComparison,
      isInComparison,
      clearComparison,
      searchOpen,
      setSearchOpen,
      searchQuery,
      setSearchQuery,
      searchResults,
      filters,
      setFilters,
      updateFilter,
      resetFilters,
      userBookings,
      addBooking,
      toast,
      showToast,
      user: currentUser || mockCustomerUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
