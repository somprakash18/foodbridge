import React, { useState } from 'react';
import { Sparkles, Calendar, Users, MapPin, Truck, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EventRescuePage() {
  const [submitted, setSubmitted] = useState(false);
  const [eventData, setEventData] = useState({
    eventName: 'Grand Royal Wedding Reception',
    organizerName: 'Anand & Kavita Marriage Function',
    eventType: 'Wedding',
    foodServings: '350 Servings',
    foodDetails: 'Dal Makhani, Paneer Butter Masala, Naan, Rice & Gulab Jamun',
    pickupTime: '11:30 PM (Tonight)',
    venueAddress: 'The Imperial Banquet Hall, MG Road, New Delhi',
    contactPhone: '+91 98111 22334'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-800 p-8 sm:p-10 text-white shadow-2xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Exclusive Feature • Wedding & Event Food Rescue</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Turn Wedding Surplus into Community Celebrations.
        </h1>
        <p className="text-sm sm:text-base text-amber-100 max-w-2xl font-medium">
          Don't let leftover food from weddings, banquets, and corporate galas go to waste. FoodBridge dispatches dedicated temperature-controlled vans & verified NGO volunteers to rescue bulk meals in 30 minutes.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bulk Upload Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Schedule Event Bulk Pickup</h2>
              <p className="text-xs text-slate-500">Free van pickup • Tax Deduction Certificate Issued</p>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Bulk Rescue Scheduled!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto font-medium">
                Our heavy-capacity insulated van & 3 NGO volunteers have been dispatched. You will receive Section 80G tax receipt immediately after pickup verification.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-md hover:bg-emerald-700"
              >
                Schedule Another Event
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Event Title</label>
                  <input
                    type="text"
                    value={eventData.eventName}
                    onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Host / Organizer Name</label>
                  <input
                    type="text"
                    value={eventData.organizerName}
                    onChange={(e) => setEventData({ ...eventData, organizerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Event Type</label>
                  <select
                    value={eventData.eventType}
                    onChange={(e) => setEventData({ ...eventData, eventType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  >
                    <option>Wedding</option>
                    <option>Corporate Reception</option>
                    <option>Birthday Gala</option>
                    <option>Religious Feast</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Approx. Food Servings</label>
                  <input
                    type="text"
                    value={eventData.foodServings}
                    onChange={(e) => setEventData({ ...eventData, foodServings: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Pickup Time Window</label>
                  <input
                    type="text"
                    value={eventData.pickupTime}
                    onChange={(e) => setEventData({ ...eventData, pickupTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Food Items & Menu Details</label>
                <textarea
                  rows="3"
                  value={eventData.foodDetails}
                  onChange={(e) => setEventData({ ...eventData, foodDetails: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Venue Address</label>
                <input
                  type="text"
                  value={eventData.venueAddress}
                  onChange={(e) => setEventData({ ...eventData, venueAddress: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-xl flex items-center justify-center space-x-2 transition-all"
              >
                <Truck className="w-5 h-5" />
                <span>Dispatch Bulk Event Rescue Van</span>
              </button>
            </form>
          )}
        </div>

        {/* Impact Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Why Donate Wedding Surplus?</h3>
            
            <div className="space-y-3 text-xs font-medium text-slate-600 dark:text-slate-300">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">FSSAI Hygiene Guarantee</strong>
                  Insulated food grade containers keep food hot at 65°C+ during transport.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <HeartHandshake className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Feed 300+ People Tonight</strong>
                  Direct transfer to night shelters and orphanage community kitchens.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
