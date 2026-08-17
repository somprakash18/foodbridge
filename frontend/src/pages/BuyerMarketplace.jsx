import React, { useState } from 'react';
import { Search, Filter, ShoppingBag, Heart, Star, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import FoodCard from '../components/FoodCard';

export default function BuyerMarketplace() {
  const { listings, orders } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [dietaryFilter, setDietaryFilter] = useState('ALL');

  const filteredListings = listings.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const matchesDietary = dietaryFilter === 'ALL' || item.dietaryType === dietaryFilter;
    return matchesSearch && matchesCategory && matchesDietary;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search & Filter Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Discount Food Marketplace</h1>
            <p className="text-xs text-slate-500">Fresh surplus meals from top local restaurants at 50-80% off</p>
          </div>
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pizza, biryani, bakery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 border border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 mr-2">
            <Filter className="w-4 h-4 text-brand-500" />
            <span>Category:</span>
          </div>
          {['ALL', 'MEALS', 'BAKERY', 'FRUITS_VEG', 'DAIRY'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${categoryFilter === cat ? 'bg-brand-600 text-white shadow-soft' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
            >
              {cat}
            </button>
          ))}

          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 ml-4 mr-2">
            <span>Dietary:</span>
          </div>
          {['ALL', 'VEG', 'NON_VEG'].map((diet) => (
            <button
              key={diet}
              onClick={() => setDietaryFilter(diet)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${dietaryFilter === diet ? 'bg-emerald-600 text-white shadow-soft' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredListings.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>

      {/* Active Buyer Orders Section */}
      {orders.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Your Live Order History</h2>
          <div className="space-y-3">
            {orders.map((ord, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{ord.listing.title}</h4>
                    <p className="text-xs text-slate-500">{ord.orderNumber} • ₹{ord.totalAmount} • {ord.paymentMethod}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {ord.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
