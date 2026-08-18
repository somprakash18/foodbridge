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
  Award,
  Siren,
  PartyPopper,
  Utensils
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ChatDrawer from '../components/ChatDrawer';
import PdfReceiptModal from '../components/PdfReceiptModal';
import RegistrationModal from '../components/RegistrationModal';
import QuickDonateModal from '../components/QuickDonateModal';
import TaxSavingsCalculatorModal from '../components/TaxSavingsCalculatorModal';

export default function LandingPage({ onOpenAuth }) {
  const { user, businessData, isBusinessOwner, logout, t } = useAuth();
  const { listings } = useApp();
  const navigate = useNavigate();

  const [chatOpen, setChatOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [quickDonateOpen, setQuickDonateOpen] = useState(false);
  const [taxModalOpen, setTaxModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isNewAccount = user && user.isNewAccount;

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
            <span>Surplus Food Rescue Platform • Weddings, Events, Hotels & Restaurants</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Turn Leftover Food from <span className="text-emerald-400 underline decoration-emerald-500">Weddings, Events & Businesses</span> into Meals
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              FoodBridge connects wedding organizers, event managers, hotels, hostels, caterers, restaurants, and NGOs to rescue fresh surplus food with instant volunteer dispatch and 80G tax receipts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setQuickDonateOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm shadow-xl flex items-center space-x-2 transition-all hover:scale-105 animate-pulse"
            >
              <Siren className="w-5 h-5" />
              <span>Donate Leftover Food Now</span>
            </button>
            <button
              onClick={onOpenAuth}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl flex items-center space-x-2 transition-all"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Multi-Donor Type Cards Section */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Who Can Donate on FoodBridge?</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Anyone with safe surplus food can donate in 1 minute. No restaurant FSSAI license required for private events!</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: "Weddings & Ceremonies", desc: "100+ leftover portions from marriage functions", icon: PartyPopper },
              { title: "Hotels & Hostels", desc: "Daily buffet surplus and dining meals", icon: Building2 },
              { title: "Parties & Events", desc: "Birthdays, anniversaries & celebrations", icon: Sparkles },
              { title: "Restaurants & Bakeries", desc: "Daily surplus food & bakery items", icon: Utensils }
            ].map((card, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-2">
                <card.icon className="w-7 h-7 text-emerald-600" />
                <h3 className="text-xs font-black text-slate-900 dark:text-white">{card.title}</h3>
                <p className="text-[11px] text-slate-500 font-medium">{card.desc}</p>
              </div>
            ))}
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
              { num: '01', title: 'Post Surplus Food', desc: 'Weddings, events, or restaurants list leftover food details and quantity.', icon: Utensils },
              { num: '02', title: 'Smart Matching', desc: 'Nearby verified NGOs, shelters, and volunteers get instant pickup alerts.', icon: Building2 },
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

        {/* Quick Emergency Modal */}
        <QuickDonateModal isOpen={quickDonateOpen} onClose={() => setQuickDonateOpen(false)} />
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

            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">Overview</div>
              
              <button
                onClick={() => setQuickDonateOpen(true)}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md transition-all animate-pulse"
              >
                <Siren className="w-4 h-4" />
                <span>Donate Food Now</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => navigate('/map')}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 font-bold text-xs transition-colors"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Shelter Map</span>
              </button>

              <button
                onClick={() => setChatOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 font-bold text-xs transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Messages</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 rounded-full font-black">2 New</span>
              </button>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => navigate('/settings')}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 font-bold text-xs transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

          </aside>

          {/* CENTER PANEL */}
          <main className="lg:col-span-6 space-y-6">
            
            <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                  Food Donor • {user?.businessName || user?.eventName || 'Surplus Food Rescue'}
                </span>
                <span className="text-xs font-bold text-emerald-200">
                  {user?.isVerified ? '✓ Verified Donor' : 'Verification Review Pending'}
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
                  onClick={() => setQuickDonateOpen(true)}
                  className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg flex items-center space-x-1.5 transition-all animate-pulse"
                >
                  <Siren className="w-4 h-4" />
                  <span>Donate Leftover Food Now</span>
                </button>

                <button
                  onClick={() => setDonationModalOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs shadow-lg flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Standard Listing</span>
                </button>
              </div>
            </div>

            {/* Recent Donations Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Recent Leftover Food Donations</h3>
                <button onClick={() => navigate('/restaurant')} className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
              </div>

              {ownerDonations.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 space-y-3">
                  <Package className="w-8 h-8 text-slate-400 mx-auto" />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">No food donations yet</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Click "Donate Leftover Food Now" to rescue surplus food in 1 minute.</p>
                  </div>
                  <button
                    onClick={() => setQuickDonateOpen(true)}
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-md"
                  >
                    Donate Leftover Food Now
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

          </main>

          {/* RIGHT PANELS */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Quick Actions</h4>
              
              <button
                onClick={() => setQuickDonateOpen(true)}
                className="w-full py-2.5 px-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center justify-between border border-rose-200"
              >
                <span className="flex items-center space-x-1">
                  <Siren className="w-3.5 h-3.5 text-rose-600" />
                  <span>Donate Food Now</span>
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/map')}
                className="w-full py-2.5 px-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-between border border-emerald-200"
              >
                <span>Find Nearby Shelters</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </aside>

        </div>

      </div>

      {/* Interactive Modals */}
      <ChatDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <PdfReceiptModal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} />
      <RegistrationModal isOpen={donationModalOpen} onClose={() => setDonationModalOpen(false)} initialRole="RESTAURANT" />
      <QuickDonateModal isOpen={quickDonateOpen} onClose={() => setQuickDonateOpen(false)} />
      <TaxSavingsCalculatorModal isOpen={taxModalOpen} onClose={() => setTaxModalOpen(false)} />
    </div>
  );
}
