import React, { useState } from 'react';
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
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import RazorpayModal from '../components/RazorpayModal';

export default function BuyerMarketplace() {
  const { listings, claimDonation } = useApp();
  const { t } = useAuth();

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([1, 3]);
  const [selectedMealPay, setSelectedMealPay] = useState(null);

  const categories = [
    { key: 'ALL', label: 'All Deals' },
    { key: 'UNDER_50', label: 'Under ₹50' },
    { key: 'VEG', label: 'Veg' },
    { key: 'NON_VEG', label: 'Non-Veg' },
    { key: 'VEGAN', label: 'Vegan' },
    { key: 'BAKERY', label: 'Bakery & Sweets' },
    { key: 'EXPIRING', label: 'Expiring Soon' },
  ];

  const mealsList = [
    {
      id: 1,
      title: "Royal Hyderabadi Chicken Biryani Combo",
      restaurant: "The Grand Palace Hotel",
      logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=150&q=80",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      originalPrice: 450,
      discountPrice: 99,
      veg: false,
      rating: 4.85,
      reviewsCount: 142,
      distanceKm: 1.2,
      safetyScore: 98,
      expiryTime: "2 hours left",
      quantity: "8 Portions left",
      calories: "650 kcal",
      isUnder50: false,
      isExpiring: true,
      category: 'NON_VEG'
    },
    {
      id: 2,
      title: "Shahi Paneer Butter Masala & Garlic Naan",
      restaurant: "Haldiram Sweets & Dining",
      logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
      originalPrice: 280,
      discountPrice: 49,
      veg: true,
      rating: 4.90,
      reviewsCount: 230,
      distanceKm: 2.4,
      safetyScore: 96,
      expiryTime: "3 hours left",
      quantity: "12 Packs left",
      calories: "520 kcal",
      isUnder50: true,
      isExpiring: false,
      category: 'VEG'
    },
    {
      id: 3,
      title: "Artisanal Sourdough & Belgian Chocolate Croissant",
      restaurant: "BakeHouse Artisanal Bakery",
      logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
      originalPrice: 320,
      discountPrice: 79,
      veg: true,
      rating: 4.80,
      reviewsCount: 98,
      distanceKm: 1.8,
      safetyScore: 99,
      expiryTime: "5 hours left",
      quantity: "6 Boxes left",
      calories: "410 kcal",
      isUnder50: false,
      isExpiring: false,
      category: 'BAKERY'
    },
    {
      id: 4,
      title: "Surplus Veg Supreme Pizza (12 inch)",
      restaurant: "Domino's Pizza Center",
      logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80",
      image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80",
      originalPrice: 599,
      discountPrice: 120,
      veg: true,
      rating: 4.75,
      reviewsCount: 310,
      distanceKm: 0.9,
      safetyScore: 95,
      expiryTime: "1 hour left",
      quantity: "4 Pizzas left",
      calories: "780 kcal",
      isUnder50: false,
      isExpiring: true,
      category: 'VEG'
    }
  ];

  const filteredMeals = mealsList.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'UNDER_50' && m.discountPrice <= 50) return true;
    if (activeCategory === 'VEG' && m.veg) return true;
    if (activeCategory === 'NON_VEG' && !m.veg) return true;
    if (activeCategory === 'BAKERY' && m.category === 'BAKERY') return true;
    if (activeCategory === 'EXPIRING' && m.isExpiring) return true;
    return true;
  });

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Surplus Food Marketplace
          </h1>
          <p className="text-xs text-slate-500 mt-1">Up to 80% Off Surplus Meals from Top Restaurants & Bakeries</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchPlaceholder || "Search deals, dishes, restaurants..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCategory(c.key)}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all shadow-xs ${
              activeCategory === c.key
                ? 'bg-emerald-600 text-white shadow-soft scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Zomato-Style Food Cards Grid */}
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
                  <div className="text-[10px] text-slate-400 line-through">₹{meal.originalPrice}</div>
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">₹{meal.discountPrice}</div>
                </div>

                <button
                  onClick={() => setSelectedMealPay(meal)}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center space-x-1.5 transition-transform hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Reserve & Pay</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

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
