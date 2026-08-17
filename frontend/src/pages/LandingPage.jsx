import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  MessageSquare, 
  History, 
  Package, 
  Receipt, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Heart, 
  Building2, 
  CheckCircle2, 
  Plus, 
  ShieldCheck, 
  ArrowUpRight, 
  ChevronRight,
  Clock,
  Sparkles,
  Download,
  User,
  ShoppingBag,
  Info,
  ArrowRight,
  Users,
  ShieldAlert,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ChatDrawer from '../components/ChatDrawer';
import PdfReceiptModal from '../components/PdfReceiptModal';
import RegistrationModal from '../components/RegistrationModal';
import TaxSavingsCalculatorModal from '../components/TaxSavingsCalculatorModal';

export default function LandingPage({ onOpenAuth }) {
  const { user, businessData, isBusinessOwner, logout, t } = useAuth();
  const { listings } = useApp();
  const navigate = useNavigate();

  const [chatOpen, setChatOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [taxModalOpen, setTaxModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine if this is a brand-new restaurant owner with zero stats
  const isNewAccount = user && user.isNewAccount;

  // Business Owner Donations Data (Empty list if brand new account!)
  const ownerDonations = isNewAccount ? [] : [
    { id: 'DON-901', item: 'Shahi Paneer & Garlic Naan Bulk Meal', quantity: '25 kg', ngo: 'Food Relief Foundation', date: 'Today, 2:30 PM', taxSaved: '₹2,850', status: 'COMPLETED' },
    { id: 'DON-902', item: 'Artisanal Sourdough & Pastry Assortment', quantity: '15 kg', ngo: 'Hope Shelter Delhi', date: 'Yesterday', taxSaved: '₹1,400', status: 'COMPLETED' },
    { id: 'DON-903', item: 'Hyderabadi Chicken Biryani Surplus', quantity: '40 kg', ngo: 'City Child Care NGO', date: '16 Aug 2026', taxSaved: '₹4,500', status: 'COMPLETED' },
  ];

  // =========================================================================
  // 1. PUBLIC LANDING VIEW FOR UNAUTHENTICATED FIRST-TIME VISITORS
  // =========================================================================
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Public Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-8 sm:p-12 text-white shadow-2xl space-y-6">
          <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-xs tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>India's Premium Surplus Food Marketplace</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Turn Surplus Food into <span className="text-emerald-400 underline decoration-emerald-500">Social Impact & Tax Credits</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              FoodBridge connects restaurants, hotels, bakeries, NGOs, shelters, and individual buyers to rescue fresh surplus meals before expiry with real-time routing, Section 80G tax receipts, and automated matching.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenAuth}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl flex items-center space-x-2 transition-all hover:scale-105"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAuth}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm backdrop-blur-md border border-white/20 transition-all"
            >
              Log In to Portal
            </button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">How FoodBridge Works</h2>
            <p className="text-slate-500 text-xs sm:text-sm">Real-time surplus food matching in 4 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Post Surplus Food', desc: 'Restaurants & bakeries list extra meals with expiry duration and category.', icon: UtensilsIcon },
              { num: '02', title: 'Smart Matching', desc: 'Nearby NGOs, shelters, and buyers get instant notification alerts.', icon: Building2 },
              { num: '03', title: 'QR Verification', desc: 'Secure QR code scan verifies food pickup and prevents claim abuse.', icon: ShieldCheck },
              { num: '04', title: '80G Tax Credit', desc: 'Generates official 100% tax deductible donation receipts instantly.', icon: Receipt }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3 relative">
                <span className="text-3xl font-black text-emerald-500/20 absolute top-4 right-6">{step.num}</span>
                <step.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Marketplace Deals Preview */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Available Surplus Food Preview</h2>
              <p className="text-xs text-slate-500">Live listings updated in real time</p>
            </div>
            <button onClick={onOpenAuth} className="text-xs font-extrabold text-emerald-600 hover:underline">Sign Up to Reserve</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Shahi Paneer & Garlic Naan Meal", restaurant: "Haldiram Sweets", price: 49, orig: 280, distance: "2.4 km", tag: "25 kg Left" },
              { title: "Artisanal Sourdough & Pastry Box", restaurant: "BakeHouse Bakery", price: 79, orig: 320, distance: "1.8 km", tag: "15 kg Left" },
              { title: "Hyderabadi Chicken Biryani Pot", restaurant: "Paradise Dining", price: 99, orig: 450, distance: "3.1 km", tag: "40 kg Left" }
            ].map((deal, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black">{deal.tag}</span>
                  <span className="text-[10px] text-slate-400 font-bold">📍 {deal.distance}</span>
                </div>
                <h4 className="font-black text-sm text-slate-900 dark:text-white">{deal.title}</h4>
                <p className="text-xs text-slate-500">{deal.restaurant}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-black text-emerald-600 text-sm">₹{deal.price} <span className="line-through text-slate-400 text-xs">₹{deal.orig}</span></span>
                  <button onClick={onOpenAuth} className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs">Sign Up to Claim</button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED USER DASHBOARD VIEW
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#f3f6f3] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            
            {/* User Profile Badge */}
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-slate-700">
              <img src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} alt={user?.name} className="w-11 h-11 rounded-xl object-cover border border-emerald-500" />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{user?.name || 'User'}</h4>
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">{user?.role || 'BUYER'}</span>
                </div>
              </div>
            </div>

            {/* Overview Links Group */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">Overview</div>
              
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => navigate('/map')}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Shelter Map</span>
              </button>

              <button
                onClick={() => setChatOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Messages</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full font-black">2 New</span>
              </button>

              {/* Owner-Only Links vs General User Links */}
              {isBusinessOwner ? (
                <>
                  <button
                    onClick={() => navigate('/restaurant')}
                    className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
                  >
                    <History className="w-4 h-4 text-emerald-600" />
                    <span>Donation History</span>
                  </button>

                  <button
                    onClick={() => navigate('/restaurant')}
                    className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
                  >
                    <Package className="w-4 h-4 text-emerald-600" />
                    <span>Items & Inventory</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate('/buyer')}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  <span>Marketplace Deals</span>
                </button>
              )}
            </div>

            {/* Tax Section (Owner Only) */}
            {isBusinessOwner && (
              <div className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax & Reports</div>
                
                <button
                  onClick={() => setTaxModalOpen(true)}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
                >
                  <Receipt className="w-4 h-4 text-emerald-600" />
                  <span>Tax Savings Overview</span>
                </button>

                <button
                  onClick={() => setPdfModalOpen(true)}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Download 80G Receipts</span>
                </button>
              </div>
            )}

            {/* Account Settings */}
            <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => navigate('/settings')}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold text-xs transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

          </aside>

          {/* CENTER DASHBOARD PANEL */}
          <main className="lg:col-span-6 space-y-6">
            
            {/* Impact Banner Card */}
            {isBusinessOwner ? (
              <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    Business Owner Impact • {user?.businessName || 'My Restaurant Entity'}
                  </span>
                  <span className="text-xs font-bold text-emerald-200">
                    {user?.isVerified ? '✓ Verified 80G Eligible' : 'Verification Review Pending'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center py-2">
                  <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                    <div className="text-2xl font-black">{isNewAccount ? '0' : '26'}</div>
                    <div className="text-[10px] text-emerald-100 font-semibold">Total Donations</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                    <div className="text-2xl font-black">{isNewAccount ? '₹0' : '₹8,750'}</div>
                    <div className="text-[10px] text-emerald-100 font-semibold">Tax Saved</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                    <div className="text-2xl font-black">{isNewAccount ? '0' : '18'}</div>
                    <div className="text-[10px] text-emerald-100 font-semibold">Shelters Helped</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setDonationModalOpen(true)}
                    className="px-5 py-2.5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs shadow-lg flex items-center space-x-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post Surplus Food</span>
                  </button>

                  <button
                    onClick={() => setPdfModalOpen(true)}
                    className="px-4 py-2.5 rounded-2xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 border border-emerald-500/40"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Tax PDF</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-cyan-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    Community Member • Welcome {user?.name}
                  </span>
                  <span className="text-xs font-bold text-emerald-200">Zero Waste Mission</span>
                </div>

                <div className="py-2 space-y-1">
                  <h2 className="text-xl font-extrabold">Discover & Rescue Surplus Meals Nearby</h2>
                  <p className="text-xs text-emerald-100 font-medium">Save money while supporting local food shelters and zero-waste initiatives.</p>
                </div>

                <div className="flex items-center space-x-3 pt-1">
                  <button
                    onClick={() => navigate('/buyer')}
                    className="px-5 py-2.5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs shadow-lg flex items-center space-x-1.5 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Browse Surplus Marketplace</span>
                  </button>
                  <button
                    onClick={() => navigate('/map')}
                    className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center space-x-1 backdrop-blur-md"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Explore Map</span>
                  </button>
                </div>
              </div>
            )}

            {/* Recent Donations Table / Empty State for Brand New Accounts */}
            {isBusinessOwner ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Business Donations & Tax Credits</h3>
                  <button onClick={() => navigate('/restaurant')} className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
                </div>

                {ownerDonations.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 space-y-3">
                    <Package className="w-8 h-8 text-slate-400 mx-auto" />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">No donations yet</h4>
                      <p className="text-[11px] text-slate-400 font-medium">Post your first surplus meal to start accumulating tax credits.</p>
                    </div>
                    <button
                      onClick={() => setDonationModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-md"
                    >
                      Post Surplus Meal
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {ownerDonations.map((don) => (
                      <div key={don.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <div className="font-extrabold text-slate-900 dark:text-white line-clamp-1">{don.item}</div>
                          <div className="text-slate-500 font-medium">{don.quantity} • {don.ngo}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-emerald-600 dark:text-emerald-400">{don.taxSaved} Credit</div>
                          <div className="text-[10px] text-slate-400 font-semibold">{don.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Featured Surplus Meals</h3>
                  <button onClick={() => navigate('/buyer')} className="text-xs font-bold text-emerald-600 hover:underline">View All Deals</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Shahi Paneer & Garlic Naan", restaurant: "Haldiram Sweets", price: 49, orig: 280, distance: "2.4 km" },
                    { title: "Sourdough & Chocolate Croissant", restaurant: "BakeHouse Bakery", price: 79, orig: 320, distance: "1.8 km" }
                  ].map((deal, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 space-y-2 text-xs">
                      <div className="font-extrabold text-slate-900 dark:text-white">{deal.title}</div>
                      <div className="text-slate-500 text-[11px]">{deal.restaurant} • 📍 {deal.distance}</div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-black text-emerald-600 text-sm">₹{deal.price} <span className="line-through text-slate-400 text-[10px]">₹{deal.orig}</span></span>
                        <button onClick={() => navigate('/buyer')} className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-[10px]">Reserve</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

          {/* RIGHT PANELS */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Owner Business Card */}
            {isBusinessOwner ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center space-x-3">
                  <img src={user?.logoUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"} alt="Restaurant Entity" className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{user?.businessName || 'Som Prakash Restaurant'}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{user?.address || 'Chandni Chowk Main Rd, Delhi'}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>FSSAI License:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{user?.fssaiLicense || '10019011006542'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span>Status:</span>
                    <span className={`font-bold ${user?.isVerified ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {user?.isVerified ? 'VERIFIED DONOR' : 'VERIFICATION PENDING'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/settings')}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
                >
                  Edit Business Profile
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-10 h-10 p-2 rounded-2xl bg-emerald-100 text-emerald-700" />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{user?.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
                >
                  View My Profile
                </button>
              </div>
            )}

            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Quick Actions</h4>
              
              <button
                onClick={() => navigate('/map')}
                className="w-full py-2.5 px-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-between border border-emerald-200 dark:border-emerald-800"
              >
                <span>Find Nearby Shelters</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setChatOpen(true)}
                className="w-full py-2.5 px-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-between"
              >
                <span>Chat with NGO Coordinator</span>
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

          </aside>

        </div>

      </div>

      {/* Interactive Modals */}
      <ChatDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <PdfReceiptModal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} />
      <RegistrationModal isOpen={donationModalOpen} onClose={() => setDonationModalOpen(false)} initialRole="RESTAURANT" />
      <TaxSavingsCalculatorModal isOpen={taxModalOpen} onClose={() => setTaxModalOpen(false)} />
    </div>
  );
}

function UtensilsIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2v6a6 6 0 0 1-6 6v8" />
      <path d="M6 2v20" />
      <path d="M10 2v10" />
    </svg>
  );
}
