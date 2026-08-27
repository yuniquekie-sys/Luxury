import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Calendar, MapPin, Shield, User, Plane, Gauge, Flag, Package } from 'lucide-react';
import { getVehicleById } from '../data/vehicles';
import { ADD_ONS, LOCATIONS } from '../data/addons';
import { AddOn, BookingStep } from '../types';
import { formatPHP } from '../utils/currency';

const ICONS: Record<string, React.ElementType> = {
  User, MapPin, Shield, Flag, Gauge, Plane, Package,
};

const STEPS = [
  { num: 1, label: 'Dates & Location' },
  { num: 2, label: 'Add-Ons' },
  { num: 3, label: 'Review' },
  { num: 4, label: 'Confirmation' },
];

export default function BookingPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const vehicle = vehicleId ? getVehicleById(vehicleId) : undefined;

  const [step, setStep] = useState<BookingStep>(1);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState(vehicle?.location || LOCATIONS[0]);
  const [delivery, setDelivery] = useState(false);
  const [addOns, setAddOns] = useState<AddOn[]>(ADD_ONS.map(a => ({ ...a, selected: false })));
  const [bookingId] = useState(`VLT-PH-${Date.now().toString().slice(-6)}`);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-4xl text-velocity-white mb-4">Vehicle Not Found</h1>
          <button onClick={() => navigate('/fleet')} className="btn-primary">Browse Available Fleet</button>
        </div>
      </div>
    );
  }

  const totalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    const ms = new Date(returnDate).getTime() - new Date(pickupDate).getTime();
    return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }, [pickupDate, returnDate]);

  const selectedAddOns = addOns.filter(a => a.selected);

  const addOnCost = useMemo(() =>
    selectedAddOns.reduce((sum, a) => {
      if (a.pricePerDay) return sum + a.pricePerDay * (totalDays || 1);
      if (a.priceFlat) return sum + a.priceFlat;
      return sum;
    }, 0),
    [selectedAddOns, totalDays]
  );

  const deliveryCost = delivery ? 25000 : 0;
  const baseTotal = vehicle.pricePerDay * (totalDays || 1);
  const subtotal = baseTotal + addOnCost + deliveryCost;
  const taxes = Math.round(subtotal * 0.09);
  const total = subtotal + taxes;

  const toggleAddOn = (id: string) => {
    setAddOns(prev => prev.map(a => a.id === id ? { ...a, selected: !a.selected } : a));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-velocity-black">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">

        {/* Step indicator bar */}
        <div className="flex items-center justify-center mb-12">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    step > s.num
                      ? 'bg-velocity-gold text-velocity-black'
                      : step === s.num
                      ? 'bg-velocity-gold/20 border-2 border-velocity-gold text-velocity-gold'
                      : 'bg-velocity-surface border border-velocity-border text-velocity-muted'
                  }`}
                >
                  {step > s.num ? <Check size={14} /> : s.num}
                </div>
                <span className={`text-[10px] mt-1.5 tracking-widest uppercase hidden md:block ${step === s.num ? 'text-velocity-gold font-semibold' : 'text-velocity-muted'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-16 md:w-28 h-px mx-2 transition-colors duration-500 ${step > s.num ? 'bg-velocity-gold' : 'bg-velocity-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form Step Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.35 }}
            >
              {/* ══ Step 1: Dates & Location ══ */}
              {step === 1 && (
                <div>
                  <h2 className="font-display text-4xl text-velocity-white mb-8">SELECT DATES & LOCATION</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="section-label block mb-2" htmlFor="pickup-date">Pickup Date</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                          <input
                            id="pickup-date"
                            type="date"
                            value={pickupDate}
                            min={today}
                            onChange={e => setPickupDate(e.target.value)}
                            className="input-luxury pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="section-label block mb-2" htmlFor="return-date">Return Date</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                          <input
                            id="return-date"
                            type="date"
                            value={returnDate}
                            min={pickupDate || today}
                            onChange={e => setReturnDate(e.target.value)}
                            className="input-luxury pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    {totalDays > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-4 py-3 bg-velocity-gold/10 border border-velocity-gold/30"
                      >
                        <Check size={14} className="text-velocity-gold" />
                        <span className="text-velocity-gold text-xs font-semibold uppercase tracking-widest">{totalDays} Rental Day{totalDays !== 1 ? 's' : ''} Selected</span>
                      </motion.div>
                    )}

                    <div>
                      <label className="section-label block mb-2" htmlFor="location">Pickup & Return Location</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-velocity-muted" />
                        <select
                          id="location"
                          value={pickupLocation}
                          onChange={e => setPickupLocation(e.target.value)}
                          className="input-luxury pl-10 appearance-none cursor-pointer"
                        >
                          {LOCATIONS.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <label className="flex items-start gap-4 p-4 border border-velocity-border cursor-pointer hover:border-velocity-gold transition-colors bg-velocity-surface">
                      <div
                        className={`w-5 h-5 border mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${delivery ? 'bg-velocity-gold border-velocity-gold' : 'border-velocity-border'}`}
                        onClick={() => setDelivery(d => !d)}
                      >
                        {delivery && <Check size={12} className="text-velocity-black" />}
                      </div>
                      <div>
                        <p className="text-velocity-white text-sm font-semibold">White-Glove Enclosed Trailer Delivery (+₱25,000)</p>
                        <p className="text-velocity-muted text-xs mt-0.5">We deliver your vehicle to your private address or VIP jet port.</p>
                      </div>
                    </label>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!pickupDate || !returnDate}
                    className={`btn-primary mt-8 ${(!pickupDate || !returnDate) ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    Continue to Add-Ons
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* ══ Step 2: Add-Ons ══ */}
              {step === 2 && (
                <div>
                  <h2 className="font-display text-4xl text-velocity-white mb-2">BESPOKE ADD-ONS</h2>
                  <p className="text-velocity-muted text-xs uppercase tracking-widest mb-8">Tailor your experience with premium services</p>

                  <div className="space-y-3">
                    {addOns.map(addon => {
                      const Icon = ICONS[addon.icon] || Package;
                      return (
                        <motion.div
                          key={addon.id}
                          whileHover={{ x: 2 }}
                          className={`p-5 border cursor-pointer transition-all ${
                            addon.selected ? 'border-velocity-gold bg-velocity-gold/5' : 'border-velocity-border hover:border-velocity-white bg-velocity-surface'
                          }`}
                          onClick={() => toggleAddOn(addon.id)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all ${addon.selected ? 'bg-velocity-gold text-velocity-black' : 'bg-velocity-dark text-velocity-muted'}`}>
                                <Icon size={16} />
                              </div>
                              <div>
                                <p className="text-velocity-white text-sm font-semibold mb-0.5">{addon.name}</p>
                                <p className="text-velocity-muted text-xs leading-relaxed">{addon.description}</p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-velocity-gold text-sm font-semibold">
                                {addon.pricePerDay ? `+${formatPHP(addon.pricePerDay)}/day` : `+${formatPHP(addon.priceFlat || 0)}`}
                              </p>
                              {addon.selected && <p className="text-velocity-gold text-[10px] tracking-widest uppercase font-bold mt-1">SELECTED</p>}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setStep(1)} className="btn-outline text-xs">Back</button>
                    <button onClick={() => setStep(3)} className="btn-primary text-xs">
                      Review Reservation
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ══ Step 3: Review ══ */}
              {step === 3 && (
                <div>
                  <h2 className="font-display text-4xl text-velocity-white mb-8">REVIEW RESERVATION</h2>
                  <div className="space-y-4">
                    {/* Machine card header */}
                    <div className="flex items-center gap-4 p-4 border border-velocity-border bg-velocity-surface">
                      <img src={vehicle.thumbnail} alt={vehicle.model} className="w-24 h-16 object-cover border border-velocity-border" />
                      <div>
                        <p className="text-velocity-gold text-xs uppercase tracking-widest font-semibold">{vehicle.brand}</p>
                        <p className="text-velocity-white font-bold text-lg">{vehicle.model}</p>
                        <p className="text-velocity-gold text-xs font-mono">{formatPHP(vehicle.pricePerDay)} / DAY</p>
                      </div>
                    </div>

                    {/* Itinerary */}
                    <div className="p-4 border border-velocity-border bg-velocity-surface space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-velocity-muted uppercase tracking-widest">Pickup Date</span>
                        <span className="text-velocity-white font-medium">{pickupDate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-velocity-muted uppercase tracking-widest">Return Date</span>
                        <span className="text-velocity-white font-medium">{returnDate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-velocity-muted uppercase tracking-widest">Rental Duration</span>
                        <span className="text-velocity-white font-medium">{totalDays} Day{totalDays !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-velocity-muted uppercase tracking-widest">Location</span>
                        <span className="text-velocity-white font-medium">{pickupLocation}</span>
                      </div>
                    </div>

                    {/* Itemized Price Breakdown */}
                    <div className="p-5 border border-velocity-border bg-velocity-surface space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-velocity-muted">Base Rate ({totalDays} days × {formatPHP(vehicle.pricePerDay)})</span>
                        <span className="text-velocity-white">{formatPHP(baseTotal)}</span>
                      </div>
                      {delivery && (
                        <div className="flex justify-between text-xs">
                          <span className="text-velocity-muted">Enclosed Trailer Delivery</span>
                          <span className="text-velocity-white">₱25,000</span>
                        </div>
                      )}
                      {selectedAddOns.map(a => (
                        <div key={a.id} className="flex justify-between text-xs">
                          <span className="text-velocity-muted">{a.name}</span>
                          <span className="text-velocity-white">
                            {formatPHP(a.pricePerDay ? a.pricePerDay * totalDays : a.priceFlat || 0)}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-velocity-border pt-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-velocity-muted">Subtotal</span>
                          <span className="text-velocity-white">{formatPHP(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-velocity-muted">PH Taxes & Processing Fees (9%)</span>
                          <span className="text-velocity-white">{formatPHP(taxes)}</span>
                        </div>
                      </div>
                      <div className="border-t border-velocity-border pt-3 flex justify-between items-center">
                        <span className="text-velocity-white font-semibold text-sm">TOTAL AMOUNT</span>
                        <span className="font-display text-3xl text-velocity-gold">{formatPHP(total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setStep(2)} className="btn-outline text-xs">Back</button>
                    <button onClick={() => setStep(4)} className="btn-primary text-xs">
                      Confirm & Pay Deposit
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ══ Step 4: Confirmation ══ */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 bg-velocity-gold flex items-center justify-center mx-auto mb-6"
                  >
                    <Check size={32} className="text-velocity-black" />
                  </motion.div>

                  <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] text-velocity-white mb-2 leading-none">
                    RESERVATION CONFIRMED.
                  </h2>
                  <p className="text-velocity-subtle mb-8 text-base font-light">
                    Your extraordinary experience has been booked. A VELOCITY concierge will reach out within 15 minutes.
                  </p>

                  <div className="max-w-md mx-auto p-6 border border-velocity-border bg-velocity-surface text-left space-y-3.5 mb-8">
                    <div className="flex justify-between text-xs">
                      <span className="text-velocity-muted uppercase tracking-widest">Booking Ref</span>
                      <span className="text-velocity-gold font-mono font-bold">{bookingId}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-velocity-muted uppercase tracking-widest">Vehicle</span>
                      <span className="text-velocity-white font-medium">{vehicle.brand} {vehicle.model}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-velocity-muted uppercase tracking-widest">Rental Window</span>
                      <span className="text-velocity-white font-medium">{pickupDate} → {returnDate}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-velocity-muted uppercase tracking-widest">Location</span>
                      <span className="text-velocity-white font-medium">{pickupLocation}</span>
                    </div>
                    <div className="border-t border-velocity-border pt-3 flex justify-between items-center">
                      <span className="text-velocity-white font-semibold text-xs uppercase">Total Paid</span>
                      <span className="text-velocity-gold font-display text-2xl">{formatPHP(total)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => navigate('/account')} className="btn-primary text-xs">
                      View My Account
                    </button>
                    <button onClick={() => navigate('/fleet')} className="btn-outline text-xs">
                      Explore More Vehicles
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Sidebar Summary Card */}
          {step < 4 && (
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-velocity-surface border border-velocity-border p-5">
                <img src={vehicle.thumbnail} alt={vehicle.model} className="w-full aspect-[16/10] object-cover mb-4 border border-velocity-border" />
                <p className="text-velocity-gold text-xs font-semibold tracking-widest uppercase mb-0.5">{vehicle.brand}</p>
                <p className="text-velocity-white font-bold text-lg mb-3">{vehicle.model}</p>

                <div className="border-t border-velocity-border pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-velocity-muted">Rate / Day</span>
                    <span className="text-velocity-gold font-semibold">{formatPHP(vehicle.pricePerDay)}</span>
                  </div>
                  {totalDays > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-velocity-muted">Duration</span>
                        <span className="text-velocity-white">{totalDays} days</span>
                      </div>
                      <div className="flex justify-between border-t border-velocity-border/60 pt-2 font-bold">
                        <span className="text-velocity-white">Est. Total</span>
                        <span className="text-velocity-gold font-display text-lg">{formatPHP(total)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
