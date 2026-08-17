import React, { useState } from 'react';
import { HeartHandshake, Users, Leaf, MapPin, Clock, ShieldCheck, CheckCircle2, Truck, Navigation } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import LiveMap from '../components/LiveMap';

export default function NgoDashboard() {
  const { listings, claimDonation, donations } = useApp();
  const { user } = useAuth();
  const [volunteerName, setVolunteerName] = useState('Rahul Sharma');

  const freeListings = listings.filter(l => l.isFreeDonation || l.discountedPrice === 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* NGO Header */}
      <div className="relative rounded-3xl overflow-hidden glass-panel p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=80"}
              alt="NGO Logo"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {user?.name || "Food Relief Foundation"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                  VERIFIED NGO
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Reg: NGO-REG-2021-987 • Capacity: 1,200 meals/day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Meals Distributed</span>
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">14,200</div>
          <p className="text-xs text-emerald-600 font-semibold">+1,200 meals this week</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-brand-600 dark:text-brand-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Families Served</span>
            <Users className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">3,550</div>
          <p className="text-xs text-brand-600 font-semibold">Across 12 shelter hubs</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CO₂ Prevented</span>
            <Leaf className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">35,500 kg</div>
          <p className="text-xs text-amber-600 font-semibold">Methane diversion metric</p>
        </div>
      </div>

      {/* Live Map Feed */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Nearby Food Rescue Feed</h2>
        <LiveMap height="h-[380px]" />
      </div>

      {/* Free Food Listings Available */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Available Free Surplus Donations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeListings.map((item) => (
            <div key={item.id} className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    100% FREE DONATION
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mt-1">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.restaurantName} • {item.distanceKm} km away</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px]">Quantity</span>
                  <span className="font-bold">{item.quantityKg} kg ({item.servings} meals)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Pickup Deadline</span>
                  <span className="font-bold text-amber-600">{item.pickupDeadline}</span>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Volunteer Name (e.g. Rahul Sharma)"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-semibold"
                />
                <button
                  onClick={() => claimDonation(item.id, volunteerName)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-soft flex items-center justify-center space-x-1"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Reserve Donation Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
