import React, { useState } from 'react';
import { 
  PlusCircle, 
  Utensils, 
  Leaf, 
  DollarSign, 
  HeartHandshake, 
  Sparkles, 
  Clock, 
  Thermometer, 
  CheckCircle2, 
  ShieldAlert, 
  Layers,
  CreditCard,
  FileText,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import QrScannerModal from '../components/QrScannerModal';
import StripeSubscriptionModal from '../components/StripeSubscriptionModal';
import PdfReceiptModal from '../components/PdfReceiptModal';

export default function RestaurantDashboard() {
  const { listings, addFoodListing, walletBalance } = useApp();
  const { user } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [stripeModalOpen, setStripeModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [activeQrHash, setActiveQrHash] = useState('FOODBRIDGE-QR-001');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('MEALS');
  const [dietaryType, setDietaryType] = useState('VEG');
  const [quantityKg, setQuantityKg] = useState(5);
  const [servings, setServings] = useState(15);
  const [originalPrice, setOriginalPrice] = useState(1500);
  const [discountedPrice, setDiscountedPrice] = useState(400);
  const [isFreeDonation, setIsFreeDonation] = useState(false);
  const [storageTemp, setStorageTemp] = useState('HOT');
  const [packagingStatus, setPackagingStatus] = useState('PACKED_BOX');

  const restaurantListings = listings.filter(l => l.restaurantId === 1 || l.restaurantName?.includes("Domino"));

  const handleSubmitListing = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addFoodListing({
      restaurantId: user?.id || 1,
      restaurantName: user?.name || "Domino's Pizza Center",
      restaurantLogo: user?.avatarUrl || "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
      title,
      description: `Fresh surplus batch prepared by ${user?.name || "Restaurant Kitchen"}. Stored hot under hygiene compliance.`,
      category,
      dietaryType,
      quantityKg: Number(quantityKg),
      servings: Number(servings),
      originalPrice: Number(originalPrice),
      discountedPrice: isFreeDonation ? 0 : Number(discountedPrice),
      isFreeDonation,
      prepTime: "Just now",
      expiryHours: 4,
      pickupDeadline: "2.5 Hours",
      storageTemp,
      packagingStatus
    });

    setModalOpen(false);
    setTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80"}
              alt="Restaurant Logo"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {user?.name || "Domino's Pizza Center"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                  FSSAI VERIFIED
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 border border-brand-300">
                  STARTER TIER
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Connaught Place, Block B • License: FSSAI-10019011000123</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <button
              onClick={() => setStripeModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-slate-800 font-bold text-xs hover:bg-slate-800 flex items-center space-x-2 border border-slate-700 shadow-sm"
            >
              <CreditCard className="w-4 h-4 text-brand-400" />
              <span>Stripe Tier</span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-700 to-emerald-600 hover:from-brand-800 hover:to-emerald-700 text-white font-extrabold text-sm shadow-soft flex items-center space-x-2 transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Upload Surplus Food</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-brand-600 dark:text-brand-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Food Saved</span>
            <Utensils className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">120.5 kg</div>
          <p className="text-xs text-emerald-600 font-semibold">+18.2% from last month</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Money Recovered</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">₹{walletBalance.toLocaleString('en-IN')}</div>
          <p className="text-xs text-amber-600 font-semibold">Direct wallet payout</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CO₂ Prevented</span>
            <Leaf className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">301.2 kg</div>
          <p className="text-xs text-emerald-600 font-semibold">Equivalent to 12 trees planted</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-rose-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">NGO Donations</span>
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">14 Batches</div>
          <p className="text-xs text-rose-600 font-semibold">350 Meals served to shelters</p>
        </div>
      </div>

      {/* Active Surplus Listings Table */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Active Food Surplus Uploads</h2>
          <span className="text-xs font-bold text-slate-400">Total: {restaurantListings.length} Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold tracking-wider">
                <th className="pb-3">Surplus Food Item</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Qty (kg)</th>
                <th className="pb-3">AI Safety</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-200">
              {restaurantListings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 flex items-center space-x-3">
                    <img src={item.image} alt={item.title} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</div>
                      <div className="text-[10px] text-slate-400">Expiry in {item.expiryHours} hours</div>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 font-bold">{item.quantityKg} kg ({item.servings} srv)</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold">
                      {(item.aiSafetyScore * 100).toFixed(0)}% Safe
                    </span>
                  </td>
                  <td className="py-3.5 font-extrabold text-brand-700 dark:text-brand-300">
                    {item.isFreeDonation ? 'FREE DONATION' : `₹${item.discountedPrice}`}
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${item.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right space-x-2">
                    {item.isFreeDonation && (
                      <button
                        onClick={() => setReceiptModalOpen(true)}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[11px] hover:bg-emerald-200 inline-flex items-center space-x-1"
                      >
                        <FileText className="w-3 h-3" />
                        <span>80G Receipt</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setActiveQrHash(item.qrCode);
                        setQrModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition-colors"
                    >
                      Show QR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD FOOD MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Utensils className="w-5 h-5 text-brand-600" />
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Upload Surplus Food</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitListing} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Food Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh Veg Supreme Pizza & Garlic Bread Batch"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-bold focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                  >
                    <option value="MEALS">Prepared Meals</option>
                    <option value="BAKERY">Bakery & Breads</option>
                    <option value="FRUITS_VEG">Fruits & Vegetables</option>
                    <option value="DAIRY">Dairy & Paneer</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Dietary Type</label>
                  <select
                    value={dietaryType}
                    onChange={(e) => setDietaryType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                  >
                    <option value="VEG">Veg</option>
                    <option value="NON_VEG">Non-Veg</option>
                    <option value="VEGAN">Vegan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Est. Servings</label>
                  <input
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 py-2">
                <input
                  type="checkbox"
                  id="freeCheck"
                  checked={isFreeDonation}
                  onChange={(e) => setIsFreeDonation(e.target.checked)}
                  className="w-4 h-4 text-brand-600 rounded"
                />
                <label htmlFor="freeCheck" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Mark as 100% Free NGO Donation
                </label>
              </div>

              {!isFreeDonation && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Discounted Surplus Price (₹)</label>
                    <input
                      type="number"
                      value={discountedPrice}
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-700 to-emerald-600 text-white font-extrabold text-sm shadow-soft"
              >
                Publish Surplus Food Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODALS */}
      <QrScannerModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} qrHash={activeQrHash} />
      <StripeSubscriptionModal isOpen={stripeModalOpen} onClose={() => setStripeModalOpen(false)} />
      <PdfReceiptModal isOpen={receiptModalOpen} onClose={() => setReceiptModalOpen(false)} />

    </div>
  );
}
