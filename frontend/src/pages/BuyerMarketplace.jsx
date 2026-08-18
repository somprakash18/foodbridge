import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Utensils, 
  Check, 
  RefreshCw, 
  ShieldCheck,
  Flame,
  Tag,
  ArrowUpDown,
  SlidersHorizontal,
  Gift
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import RazorpayModal from '../components/RazorpayModal';

export default function BuyerMarketplace() {
  const { listings = [], claimDonation } = useApp();
  const { t } = useAuth();

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [priceTagFilter, setPriceTagFilter] = useState('ALL'); // ALL, FREE, UNDER_50, 50_100, 100_200, ABOVE_200
  const [maxPriceSlider, setMaxPriceSlider] = useState(500);
  const [sortBy, setSortBy] = useState('FEATURED'); // FEATURED, PRICE_LOW_HIGH, PRICE_HIGH_LOW, HIGHEST_DISCOUNT, DISTANCE
  const [wishlist, setWishlist] = useState([1, 3, 5]);
  const [selectedMealPay, setSelectedMealPay] = useState(null);

  // Category Options
  const categories = [
    { key: 'ALL', label: 'All Deals' },
    { key: 'VEG', label: 'Veg' },
    { key: 'NON_VEG', label: 'Non-Veg' },
    { key: 'VEGAN', label: 'Vegan' },
    { key: 'BAKERY', label: 'Bakery & Sweets' },
    { key: 'EXPIRING', label: 'Expiring Soon' },
  ];

  // Price Tag Options
  const priceTags = [
    { key: 'ALL', label: 'All Prices', icon: Tag },
    { key: 'FREE', label: '🎁 FREE (NGO)', icon: Gift },
    { key: 'UNDER_50', label: '⚡ Under ₹50', icon: Tag },
    { key: '50_100', label: '🏷️ ₹50 - ₹100', icon: Tag },
    { key: '100_200', label: '🔥 ₹100 - ₹200', icon: Tag },
    { key: 'ABOVE_200', label: '👑 Above ₹200', icon: Tag },
  ];

  // Normalize & Combine listings
  const combinedMeals = useMemo(() => {
    return listings.map((item) => {
      const orig = item.originalPrice || 500;
      const disc = item.discountedPrice !== undefined ? item.discountedPrice : (item.discountPrice || 0);
      const discountPercent = orig > 0 ? Math.round(((orig - disc) / orig) * 100) : 0;
      
      return {
        id: item.id,
        title: item.title,
        restaurant: item.restaurantName || item.restaurant || 'Surplus Kitchen Partner',
        logo: item.restaurantLogo || item.logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80',
        image: item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        originalPrice: orig,
        discountPrice: disc,
        discountPercent: discountPercent,
        isFree: disc === 0 || item.isFreeDonation,
        veg: item.dietaryType === 'VEG' || item.dietaryType === 'VEGAN' || item.veg === true,
        dietaryType: item.dietaryType || (item.veg ? 'VEG' : 'NON_VEG'),
        rating: item.rating || (4.7 + (item.id % 4) * 0.08).toFixed(1),
        distanceKm: item.distanceKm || 1.5,
        safetyScore: item.aiSafetyScore ? Math.round(item.aiSafetyScore * 100) : (item.safetyScore || 98),
        expiryTime: item.pickupDeadline ? `${item.pickupDeadline} left` : (item.expiryTime || '3 hours left'),
        quantity: item.servings ? `${item.servings} Portions left` : (item.quantity || '8 Portions left'),
        calories: item.calories || `${400 + (item.id * 35) % 350} kcal`,
        category: item.category || 'MEALS'
      };
    });
  }, [listings]);

  // Filter & Sort Logic
  const filteredMeals = useMemo(() => {
    return combinedMeals.filter((m) => {
      // 1. Search Query Filter
      const matchesSearch = 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // 2. Category Filter
      if (activeCategory === 'VEG' && !m.veg) return false;
      if (activeCategory === 'NON_VEG' && m.veg) return false;
      if (activeCategory === 'VEGAN' && m.dietaryType !== 'VEGAN') return false;
      if (activeCategory === 'BAKERY' && m.category !== 'BAKERY') return false;

      // 3. Price Tag Filter
      if (priceTagFilter === 'FREE' && !m.isFree) return false;
      if (priceTagFilter === 'UNDER_50' && (m.discountPrice > 50 || m.isFree)) return false;
      if (priceTagFilter === '50_100' && (m.discountPrice < 50 || m.discountPrice > 100)) return false;
      if (priceTagFilter === '100_200' && (m.discountPrice < 100 || m.discountPrice > 200)) return false;
      if (priceTagFilter === 'ABOVE_200' && m.discountPrice <= 200) return false;

      // 4. Max Price Slider Filter
      if (m.discountPrice > maxPriceSlider) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW_HIGH') return a.discountPrice - b.discountPrice;
      if (sortBy === 'PRICE_HIGH_LOW') return b.discountPrice - a.discountPrice;
      if (sortBy === 'HIGHEST_DISCOUNT') return b.discountPercent - a.discountPercent;
      if (sortBy === 'DISTANCE') return a.distanceKm - b.distanceKm;
      return 0; // FEATURED
    });
  }, [combinedMeals, searchQuery, activeCategory, priceTagFilter, maxPriceSlider, sortBy]);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 antialiased">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Surplus Food Marketplace</span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold border border-emerald-300">
              {filteredMeals.length} Deals Active
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Up to 80% Off Surplus Meals & Free NGO Food Rescue</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchPlaceholder || "Search meals, restaurants, NGOs..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>
      </div>

      {/* FILTER TOOLBAR CONTAINER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
        
        {/* Row 1: Food Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-1 shrink-0 flex items-center">
            <Utensils className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Category:
          </span>
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all shadow-xs ${
                activeCategory === c.key
                  ? 'bg-emerald-600 text-white shadow-soft scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Row 2: Price Tag Quick Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-1 shrink-0 flex items-center">
            <Tag className="w-3.5 h-3.5 mr-1 text-amber-500" /> Price Tag:
          </span>
          {priceTags.map((p) => (
            <button
              key={p.key}
              onClick={() => {
                setPriceTagFilter(p.key);
                if (p.key === 'UNDER_50') setMaxPriceSlider(50);
                if (p.key === '50_100') setMaxPriceSlider(100);
                if (p.key === '100_200') setMaxPriceSlider(200);
                if (p.key === 'ALL') setMaxPriceSlider(500);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center space-x-1 ${
                priceTagFilter === p.key
                  ? 'bg-amber-500 text-white shadow-md scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Row 3: Interactive Max Price Slider & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 gap-4">
          
          {/* Max Price Range Slider */}
          <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/60 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 flex-1 max-w-md">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1 space-y-0.5">
              <div className="flex justify-between text-[11px] font-black text-slate-700 dark:text-slate-300">
                <span>Max Budget:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">₹{maxPriceSlider}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={maxPriceSlider}
                onChange={(e) => setMaxPriceSlider(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="FEATURED">🌟 Featured</option>
              <option value="PRICE_LOW_HIGH">🏷️ Price: Low to High</option>
              <option value="PRICE_HIGH_LOW">💰 Price: High to Low</option>
              <option value="HIGHEST_DISCOUNT">🔥 Highest Discount (%)</option>
              <option value="DISTANCE">📍 Distance (Nearest First)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Surplus Food Cards Grid */}
      {filteredMeals.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Tag className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">No meals match your price filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Try adjusting your price tag filter or moving the max budget slider.</p>
          <button
            onClick={() => {
              setPriceTagFilter('ALL');
              setMaxPriceSlider(500);
              setActiveCategory('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-md"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => {
            const isFavorited = wishlist.includes(meal.id);

            return (
              <div
                key={meal.id}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  {/* Image Box */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={meal.image}
                      alt={meal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges Overlay */}
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center border bg-white shadow-sm ${
                        meal.veg ? 'border-emerald-600' : 'border-rose-600'
                      }`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${meal.veg ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                      </span>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-md">
                        {meal.safetyScore}% Safety Score
                      </span>

                      {meal.discountPercent > 0 && (
                        <span className="px-2 py-1 rounded-full text-[10px] font-black bg-rose-600 text-white shadow-md">
                          -{meal.discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(meal.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:scale-110 transition-transform shadow-md"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Expiry Countdown */}
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-300 text-[11px] font-extrabold px-3 py-1 rounded-xl flex items-center space-x-1 border border-amber-500/30">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{meal.expiryTime}</span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img src={meal.logo} alt={meal.restaurant} className="w-6 h-6 rounded-lg object-cover border border-slate-200" />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 line-clamp-1">{meal.restaurant}</span>
                      </div>

                      <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-lg border border-amber-200 text-xs font-extrabold text-amber-700 dark:text-amber-300">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{meal.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2">
                      {meal.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>📍 {meal.distanceKm} km away</span>
                      <span>🔥 {meal.calories}</span>
                      <span className="text-emerald-600 font-bold">{meal.quantity}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Checkout Footer */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-2">
                  <div>
                    {meal.originalPrice > meal.discountPrice && (
                      <div className="text-[10px] text-slate-400 line-through">₹{meal.originalPrice}</div>
                    )}
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                      {meal.isFree ? 'FREE (Donation)' : `₹${meal.discountPrice}`}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMealPay(meal)}
                    className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center space-x-1.5 transition-transform hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{meal.isFree ? 'Claim Free' : 'Reserve & Pay'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Razorpay Payment Modal */}
      {selectedMealPay && (
        <RazorpayModal
          isOpen={!!selectedMealPay}
          onClose={() => setSelectedMealPay(null)}
          amount={selectedMealPay.discountPrice}
          itemTitle={selectedMealPay.title}
        />
      )}

    </div>
  );
}
