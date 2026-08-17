import React, { useState } from 'react';
import { Truck, Navigation, QrCode, DollarSign, Star, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import QrScannerModal from '../components/QrScannerModal';
import LiveMap from '../components/LiveMap';

export default function DeliveryDashboard() {
  const { deliveries } = useApp();
  const { user } = useAuth();
  const [online, setOnline] = useState(true);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedQrHash, setSelectedQrHash] = useState('FOODBRIDGE-QR-001');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Driver Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80"}
            alt="Driver"
            className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-500 shadow-sm"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">{user?.name || "Vikram Singh"}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">★ 4.92 Rating</span>
            </div>
            <p className="text-xs text-slate-500">EV Scooter: DL-01-EV-4092 • 312 Deliveries Completed</p>
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl">
          <span className="text-xs font-bold text-slate-500">Duty Status:</span>
          <button
            onClick={() => setOnline(!online)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${online ? 'bg-emerald-600 text-white shadow-soft' : 'bg-slate-300 dark:bg-slate-700 text-slate-600'}`}
          >
            {online ? 'ONLINE (READY)' : 'OFFLINE'}
          </button>
        </div>
      </div>

      {/* Driver Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Earnings</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">₹1,240.00</div>
          <p className="text-xs text-emerald-600 font-semibold">+₹45/delivery base pay</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed Pickups</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">12 Pickups</div>
          <p className="text-xs text-brand-600 font-semibold">100% QR Code Verified</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Distance</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">28.4 km</div>
          <p className="text-xs text-amber-600 font-semibold">AI Optimized Route active</p>
        </div>
      </div>

      {/* Map Route Guidance */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">AI Optimized Pickup Route</h2>
        <LiveMap height="h-[360px]" />
      </div>

      {/* Pickup Requests Feed */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Assigned Pickup Orders</h2>
        <div className="space-y-4">
          {deliveries.map((del) => (
            <div key={del.id} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400">{del.id}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{del.listingTitle}</span>
                </div>
                <p className="text-xs text-slate-500 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-rose-500" />
                  Pickup: {del.pickupAddress}
                </p>
                <p className="text-xs text-slate-500 flex items-center">
                  <Navigation className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  Dropoff: {del.dropoffAddress} ({del.distanceKm} km)
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">₹{del.earnings}</span>
                  <span className="text-[10px] text-slate-400 block">{del.status}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedQrHash(del.qrCode);
                    setQrModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-soft flex items-center space-x-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Scan Pickup QR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QrScannerModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} qrHash={selectedQrHash} />

    </div>
  );
}
