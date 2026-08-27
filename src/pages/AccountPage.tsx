import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Heart, User, Car } from 'lucide-react';
import { mockUser, mockBookings } from '../data/mockData';
import { vehicles } from '../data/vehicles';
import { useApp } from '../context/AppContext';
import { formatPHP } from '../utils/currency';
import VehicleCard from '../components/ui/VehicleCard';
import ScrollReveal from '../components/ui/ScrollReveal';

type Tab = 'dashboard' | 'bookings' | 'favorites' | 'profile';

const STATUS_STYLE: Record<string, string> = {
  upcoming: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  completed: 'text-velocity-muted bg-velocity-surface border-velocity-border',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const { favorites } = useApp();

  const favoriteVehicles = vehicles.filter(v => favorites.includes(v.id));

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: Car },
    { id: 'bookings' as Tab, label: 'My Reservations', icon: Calendar },
    { id: 'favorites' as Tab, label: 'Saved Machines', icon: Heart },
    { id: 'profile' as Tab, label: 'Member Profile', icon: User },
  ];

  const filteredBookings = bookingFilter === 'all'
    ? mockBookings
    : mockBookings.filter(b => b.status === bookingFilter);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-velocity-dark border-b border-velocity-border py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <ScrollReveal>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-velocity-gold flex items-center justify-center">
                <span className="font-display text-2xl text-velocity-black font-bold">
                  {mockUser.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="section-label mb-0.5">VELOCITY Member</p>
                <h1 className="font-display text-4xl text-velocity-white">{mockUser.name.toUpperCase()}</h1>
                <p className="text-velocity-muted text-xs">Member since {mockUser.memberSince} · License: {mockUser.licenseNumber}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all text-xs tracking-widest uppercase font-semibold ${
                    activeTab === tab.id
                      ? 'bg-velocity-gold/10 border-l-2 border-velocity-gold text-velocity-gold'
                      : 'border-l-2 border-transparent text-velocity-subtle hover:text-velocity-white hover:bg-velocity-surface'
                  }`}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Quick stats */}
            <div className="mt-6 p-4 border border-velocity-border space-y-4 bg-velocity-surface">
              <div>
                <p className="text-velocity-muted text-[10px] uppercase tracking-widest mb-1">Total Rentals</p>
                <p className="font-display text-3xl text-velocity-white">{mockBookings.length}</p>
              </div>
              <div>
                <p className="text-velocity-muted text-[10px] uppercase tracking-widest mb-1">Saved Machines</p>
                <p className="font-display text-3xl text-velocity-white">{favorites.length}</p>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <h2 className="font-display text-3xl text-velocity-white">ACCOUNT DASHBOARD</h2>

                  {/* Active / Next Booking */}
                  {mockBookings.find(b => b.status === 'upcoming') && (
                    <div>
                      <p className="section-label mb-4">Upcoming Reservation</p>
                      <BookingCard booking={mockBookings.find(b => b.status === 'upcoming')!} />
                    </div>
                  )}

                  {/* Recent Activity */}
                  <div>
                    <p className="section-label mb-4">Recent Rentals</p>
                    <div className="space-y-3">
                      {mockBookings.slice(0, 3).map(b => (
                        <BookingCard key={b.id} booking={b} compact />
                      ))}
                    </div>
                  </div>

                  {/* Favorites preview */}
                  {favoriteVehicles.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="section-label">Saved Favorites</p>
                        <button onClick={() => setActiveTab('favorites')} className="text-velocity-gold text-xs hover:underline">
                          View All ({favorites.length})
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {favoriteVehicles.slice(0, 2).map(v => (
                          <VehicleCard key={v.id} vehicle={v} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <h2 className="font-display text-3xl text-velocity-white">RESERVATION HISTORY</h2>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'upcoming', 'completed', 'cancelled'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setBookingFilter(f)}
                        className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all ${
                          bookingFilter === f
                            ? 'border-velocity-gold text-velocity-gold bg-velocity-gold/10'
                            : 'border-velocity-border text-velocity-muted hover:border-velocity-white hover:text-velocity-white'
                        }`}
                      >
                        {f.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-16 border border-velocity-border">
                      <Calendar size={36} className="text-velocity-border mx-auto mb-4" />
                      <p className="text-velocity-subtle text-sm">No reservations found in this category</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredBookings.map(b => <BookingCard key={b.id} booking={b} />)}
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div className="space-y-6">
                  <h2 className="font-display text-3xl text-velocity-white">SAVED MACHINES ({favoriteVehicles.length})</h2>
                  {favoriteVehicles.length === 0 ? (
                    <div className="text-center py-16 border border-velocity-border">
                      <Heart size={36} className="text-velocity-border mx-auto mb-4" />
                      <p className="text-velocity-subtle text-sm mb-4">You have not saved any vehicles yet</p>
                      <Link to="/fleet" className="btn-outline text-xs px-6 py-2">Explore Fleet</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {favoriteVehicles.map(v => (
                        <VehicleCard key={v.id} vehicle={v} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <h2 className="font-display text-3xl text-velocity-white">MEMBER PROFILE</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { label: 'Full Name', value: mockUser.name, id: 'profile-name' },
                      { label: 'Email Address', value: mockUser.email, id: 'profile-email' },
                      { label: 'Phone Number', value: mockUser.phone, id: 'profile-phone' },
                      { label: 'License Number', value: mockUser.licenseNumber || 'N01-18-999999', id: 'profile-license' },
                    ].map(field => (
                      <div key={field.id}>
                        <label className="section-label block mb-2" htmlFor={field.id}>{field.label}</label>
                        <input
                          id={field.id}
                          type="text"
                          defaultValue={field.value}
                          className="input-luxury"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary text-xs">Save Profile Changes</button>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking, compact = false }: { booking: typeof mockBookings[0]; compact?: boolean }) {
  return (
    <div className={`border border-velocity-border bg-velocity-surface p-5 ${compact ? 'flex items-center justify-between gap-4' : ''}`}>
      {compact ? (
        <>
          <div>
            <div className="flex items-center gap-3">
              <p className="text-velocity-white text-sm font-semibold">{booking.vehicleName}</p>
              <span className={`px-2 py-0.5 text-[9px] tracking-widest uppercase border ${STATUS_STYLE[booking.status]}`}>
                {booking.status}
              </span>
            </div>
            <p className="text-velocity-muted text-xs mt-0.5">{booking.pickupDate} → {booking.returnDate}</p>
          </div>
          <p className="text-velocity-gold font-display text-xl">{formatPHP(booking.total)}</p>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-velocity-gold text-xs font-bold">{booking.id}</span>
                <span className={`px-2 py-0.5 text-[9px] tracking-widest uppercase border ${STATUS_STYLE[booking.status]}`}>
                  {booking.status}
                </span>
              </div>
              <h3 className="text-velocity-white font-bold text-xl">{booking.vehicleName}</h3>
            </div>
            <p className="font-display text-3xl text-velocity-gold">{formatPHP(booking.total)}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs pt-3 border-t border-velocity-border">
            <div>
              <p className="text-velocity-muted uppercase text-[10px]">Pickup Date</p>
              <p className="text-velocity-white font-medium">{booking.pickupDate}</p>
            </div>
            <div>
              <p className="text-velocity-muted uppercase text-[10px]">Return Date</p>
              <p className="text-velocity-white font-medium">{booking.returnDate}</p>
            </div>
            <div>
              <p className="text-velocity-muted uppercase text-[10px]">Duration</p>
              <p className="text-velocity-white font-medium">{booking.totalDays} Days</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
