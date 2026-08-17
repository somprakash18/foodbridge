import React, { useState } from 'react';
import { Clock, ShieldCheck, MapPin, HeartHandshake, ShoppingBag, Sparkles, Thermometer } from 'lucide-react';
import RazorpayModal from './RazorpayModal';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function FoodCard({ item }) {
  const { user } = useAuth();
  const { claimDonation } = useApp();
  const [razorpayOpen, setRazorpayOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleClaimDonation = () => {
    claimDonation(item.id, "Volunteer Rahul Sharma");
    setClaimed(true);
  };

  return (
    <>
      <div className="group relative glass-card rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-slate-200/80 dark:border-slate-800 flex flex-col h-full">
        
        {/* Top Image & Badges */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

          {/* Top Left: Category & Dietary Badge */}
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm ${item.dietaryType === 'VEG' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              {item.dietaryType}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
              {item.category}
            </span>
          </div>

          {/* Top Right: AI Safety Badge */}
          <div className="absolute top-3 right-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-[11px] font-extrabold backdrop-blur-md border border-emerald-500/40 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{(item.aiSafetyScore * 100).toFixed(0)}% Safe</span>
          </div>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span>{item.distanceKm} km away</span>
            </div>
            <div className="flex items-center space-x-1 text-amber-300">
              <Clock className="w-3.5 h-3.5" />
              <span>Expires in {item.expiryHours}h</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 mb-1">
              <img src={item.restaurantLogo} alt={item.restaurantName} className="w-4 h-4 rounded-full object-cover" />
              <span>{item.restaurantName}</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Quantity</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{item.quantityKg} kg ({item.servings} Servings)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Storage</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center">
                <Thermometer className="w-3 h-3 mr-1 text-brand-500" />
                {item.storageTemp}
              </span>
            </div>
          </div>

          {/* Pricing & Action */}
          <div className="flex items-center justify-between pt-1">
            <div>
              {item.isFreeDonation ? (
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">100% Free NGO Donation</span>
                  <span className="text-[11px] text-slate-400 line-through">₹{item.originalPrice}</span>
                </div>
              ) : (
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-extrabold text-brand-700 dark:text-brand-300">₹{item.discountedPrice}</span>
                  <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {Math.round(((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {item.isFreeDonation ? (
              <button
                onClick={handleClaimDonation}
                disabled={claimed}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-soft flex items-center space-x-1.5 transition-all"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{claimed ? 'Claimed!' : 'Reserve Free'}</span>
              </button>
            ) : (
              <button
                onClick={() => setRazorpayOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-700 to-emerald-600 hover:from-brand-800 hover:to-emerald-700 text-white font-bold text-xs shadow-soft flex items-center space-x-1.5 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy Now</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Razorpay Gateway Modal */}
      <RazorpayModal
        isOpen={razorpayOpen}
        onClose={() => setRazorpayOpen(false)}
        amount={item.discountedPrice + 25}
        listingId={item.id}
      />
    </>
  );
}
