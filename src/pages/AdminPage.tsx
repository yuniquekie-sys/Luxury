import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  LayoutDashboard, Car, Calendar, Users, TrendingUp,
  CheckCircle, XCircle, Plus, Edit, Trash2, Shield
} from 'lucide-react';
import { adminStats, mockBookings } from '../data/mockData';
import { vehicles } from '../data/vehicles';
import { formatPHP } from '../utils/currency';

type AdminTab = 'overview' | 'vehicles' | 'bookings' | 'customers';

const PIE_COLORS = ['#c9a84c', '#888', '#555', '#333'];

const StatCard = ({ label, value, sub, icon: Icon, trend }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; trend?: string;
}) => (
  <div className="bg-velocity-surface border border-velocity-border p-5">
    <div className="flex items-start justify-between mb-4">
      <div className="w-9 h-9 bg-velocity-dark border border-velocity-border flex items-center justify-center">
        <Icon size={16} className="text-velocity-gold" />
      </div>
      {trend && <span className="text-emerald-400 text-xs font-semibold">{trend}</span>}
    </div>
    <p className="font-display text-3xl text-velocity-white mb-1">{value}</p>
    <p className="text-velocity-muted text-[10px] uppercase tracking-widest">{label}</p>
    {sub && <p className="text-velocity-subtle text-xs mt-1">{sub}</p>}
  </div>
);

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const tabs = [
    { id: 'overview' as AdminTab, label: 'Overview & Analytics', icon: LayoutDashboard },
    { id: 'vehicles' as AdminTab, label: 'Fleet Management (40+)', icon: Car },
    { id: 'bookings' as AdminTab, label: 'Reservations', icon: Calendar },
    { id: 'customers' as AdminTab, label: 'VIP Clients', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-velocity-black pt-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-10">

        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={14} className="text-velocity-gold" />
              <span className="section-label">Philippines Fleet Admin</span>
            </div>
            <h1 className="font-display text-4xl text-velocity-white">VELOCITY MANAGEMENT</h1>
          </div>
          <span className="badge-gold">Fleet Administrator</span>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-velocity-border mb-8 gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs tracking-widest uppercase font-semibold border-b-2 transition-all whitespace-nowrap -mb-px ${
                activeTab === tab.id
                  ? 'border-velocity-gold text-velocity-gold bg-velocity-gold/5'
                  : 'border-transparent text-velocity-muted hover:text-velocity-white'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ══ Overview ══ */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Revenue (PHP)" value={formatPHP(adminStats.totalRevenue)} icon={TrendingUp} trend="+28% YoY" />
                <StatCard label="Total Reservations" value={adminStats.totalBookings} icon={Calendar} trend="+24 this month" />
                <StatCard label="Active Fleet on Road" value={adminStats.activeRentals} icon={Car} sub="Live active rentals" />
                <StatCard label="Fleet Utilization" value={`${adminStats.fleetUtilization}%`} icon={LayoutDashboard} sub="of total catalog" />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Bar Chart */}
                <div className="lg:col-span-2 bg-velocity-surface border border-velocity-border p-6">
                  <h3 className="text-velocity-white font-semibold text-xs tracking-widest uppercase mb-6">2026 Monthly Revenue (PHP)</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={adminStats.revenueByMonth} barSize={24}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₱${v/1000000}M`} />
                      <Tooltip
                        contentStyle={{ background: '#0a0a0a', border: '1px solid #c9a84c', color: '#fff' }}
                        formatter={(v: number) => [formatPHP(v), 'Revenue']}
                      />
                      <Bar dataKey="revenue" fill="#c9a84c" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Bookings Pie Chart */}
                <div className="bg-velocity-surface border border-velocity-border p-6">
                  <h3 className="text-velocity-white font-semibold text-xs tracking-widest uppercase mb-6">Bookings by Category</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={adminStats.bookingsByCategory}
                        dataKey="count"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        innerRadius={40}
                      >
                        {adminStats.bookingsByCategory.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid #222' }} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-2 mt-4">
                    {adminStats.bookingsByCategory.map((cat, i) => (
                      <div key={cat.category} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                          <span className="text-velocity-muted">{cat.category}</span>
                        </div>
                        <span className="text-velocity-white font-semibold">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Vehicles Table */}
              <div className="bg-velocity-surface border border-velocity-border">
                <div className="px-6 py-4 border-b border-velocity-border">
                  <h3 className="text-velocity-white font-semibold text-xs tracking-widest uppercase">Top Performing Revenue Machines</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-velocity-border text-velocity-muted uppercase tracking-widest">
                        <th className="text-left px-6 py-3">Vehicle</th>
                        <th className="text-left px-6 py-3">Completed Rentals</th>
                        <th className="text-left px-6 py-3">Total Gross Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminStats.topVehicles.map((v, i) => (
                        <tr key={i} className="border-b border-velocity-border/60 hover:bg-velocity-dark/50">
                          <td className="px-6 py-3.5 text-velocity-white font-medium">{v.vehicle}</td>
                          <td className="px-6 py-3.5 text-velocity-subtle">{v.rentals}</td>
                          <td className="px-6 py-3.5 text-velocity-gold font-bold">{formatPHP(v.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ Fleet Management Table ══ */}
          {activeTab === 'vehicles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-3xl text-velocity-white">FLEET CATALOG ({vehicles.length} MACHINES)</h2>
                  <p className="text-velocity-muted text-xs">Manage vehicles, pricing, variants, and image assets</p>
                </div>
                <button className="btn-primary text-xs py-2.5 px-4">
                  <Plus size={14} /> Add New Machine
                </button>
              </div>

              <div className="bg-velocity-surface border border-velocity-border overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-velocity-border text-velocity-muted uppercase tracking-widest">
                      <th className="text-left px-5 py-3">Machine</th>
                      <th className="text-left px-5 py-3 hidden md:table-cell">Category</th>
                      <th className="text-left px-5 py-3">Daily Rate</th>
                      <th className="text-left px-5 py-3 hidden lg:table-cell">Power</th>
                      <th className="text-left px-5 py-3 hidden xl:table-cell">Variant</th>
                      <th className="text-left px-5 py-3">Status</th>
                      <th className="text-left px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map(v => (
                      <tr key={v.id} className="border-b border-velocity-border/60 hover:bg-velocity-dark/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img src={v.thumbnail} alt={v.model} className="w-12 h-8 object-cover border border-velocity-border hidden sm:block" />
                            <div>
                              <p className="text-velocity-white font-bold">{v.brand} {v.model}</p>
                              <p className="text-velocity-muted text-[10px]">{v.engine}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-velocity-subtle capitalize hidden md:table-cell">{v.category}</td>
                        <td className="px-5 py-3.5 text-velocity-gold font-semibold">{formatPHP(v.pricePerDay)}</td>
                        <td className="px-5 py-3.5 text-velocity-subtle hidden lg:table-cell">{v.horsepower} HP</td>
                        <td className="px-5 py-3.5 text-velocity-silver hidden xl:table-cell">{v.variant || 'Standard'}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 text-[9px] tracking-widest uppercase font-semibold border ${
                            v.availability === 'available' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
                            v.availability === 'reserved' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                            'text-rose-400 border-rose-500/30 bg-rose-500/10'
                          }`}>
                            {v.availability}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-velocity-muted hover:text-velocity-gold transition-colors" title="Edit Vehicle Specs & Images">
                              <Edit size={13} />
                            </button>
                            <button className="p-1.5 text-velocity-muted hover:text-rose-400 transition-colors" title="Remove Vehicle">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ Bookings Management ══ */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-velocity-white">RESERVATIONS MANAGEMENT</h2>
              <div className="bg-velocity-surface border border-velocity-border overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-velocity-border text-velocity-muted uppercase tracking-widest">
                      <th className="text-left px-5 py-3">Booking ID</th>
                      <th className="text-left px-5 py-3">Vehicle</th>
                      <th className="text-left px-5 py-3 hidden md:table-cell">Dates</th>
                      <th className="text-left px-5 py-3">Total Amount</th>
                      <th className="text-left px-5 py-3">Status</th>
                      <th className="text-left px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map(b => (
                      <tr key={b.id} className="border-b border-velocity-border/60 hover:bg-velocity-dark/50">
                        <td className="px-5 py-3.5 font-mono text-velocity-gold font-bold">{b.id}</td>
                        <td className="px-5 py-3.5 text-velocity-white font-medium">{b.vehicleName}</td>
                        <td className="px-5 py-3.5 text-velocity-subtle hidden md:table-cell">{b.pickupDate} → {b.returnDate}</td>
                        <td className="px-5 py-3.5 text-velocity-gold font-semibold">{formatPHP(b.total)}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 text-[9px] uppercase border ${
                            b.status === 'upcoming' ? 'text-sky-400 border-sky-400/20 bg-sky-400/10' :
                            b.status === 'completed' ? 'text-velocity-muted border-velocity-border' :
                            'text-rose-400 border-rose-400/20 bg-rose-400/10'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-velocity-muted hover:text-emerald-400" title="Approve Reservation">
                              <CheckCircle size={13} />
                            </button>
                            <button className="p-1.5 text-velocity-muted hover:text-rose-400" title="Cancel Reservation">
                              <XCircle size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ Customers ══ */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-velocity-white">VIP CLIENT DIRECTORY</h2>
              <div className="bg-velocity-surface border border-velocity-border p-6 max-w-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-velocity-gold text-velocity-black font-display text-xl flex items-center justify-center font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-velocity-white font-bold text-base">Alexander Chen</p>
                    <p className="text-velocity-muted text-xs">alexander@velocity.ph · VIP Tier Member</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center border-t border-velocity-border pt-4">
                  <div>
                    <p className="text-velocity-gold font-display text-2xl">₱2.7M</p>
                    <p className="text-velocity-muted text-[10px] uppercase">Lifetime Spent</p>
                  </div>
                  <div>
                    <p className="text-velocity-white font-display text-2xl">3</p>
                    <p className="text-velocity-muted text-[10px] uppercase">Total Rentals</p>
                  </div>
                  <div>
                    <p className="text-velocity-white font-display text-2xl">5.0★</p>
                    <p className="text-velocity-muted text-[10px] uppercase">VIP Rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
