import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Utensils, 
  HeartHandshake, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Award, 
  TrendingUp, 
  Zap, 
  Siren, 
  Plus, 
  FileText, 
  MessageSquare, 
  LogOut, 
  Settings, 
  LayoutDashboard, 
  Package, 
  ArrowUpRight, 
  Bot, 
  QrCode, 
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import FoodCard from '../components/FoodCard';
import LiveMap from '../components/LiveMap';
import RegistrationModal from '../components/RegistrationModal';
import QuickDonateModal from '../components/QuickDonateModal';
import PdfReceiptModal from '../components/PdfReceiptModal';
import ChatDrawer from '../components/ChatDrawer';
import TaxSavingsCalculatorModal from '../components/TaxSavingsCalculatorModal';
import AiFreshnessCalculatorModal from '../components/AiFreshnessCalculatorModal';

export default function LandingPage({ onOpenAuth }) {
  const navigate = useNavigate();
  const auth = useAuth() || {};
  const { user, logout } = auth;
  
  const appCtx = useApp() || {};
  const { listings = [], donations = [], orders = [] } = appCtx;

  const [quickDonateOpen, setQuickDonateOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [freshnessModalOpen, setFreshnessModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handleLogout = () => {
    if (logout) logout();
    navigate('/');
  };

  // =========================================================================
  // 1. PUBLIC LANDING PAGE (UNAUTHENTICATED)
  // =========================================================================
  if (!user) {
    return (
      <div className="space-y-16 pb-16 antialiased">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-brand-50/60 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-black tracking-wide shadow-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>UN SDG #12.3 Compliant Emergency Surplus Rescue</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Rescue Food <br />
                  <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-500 bg-clip-text text-transparent">
                    Feed Communities.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Connecting weddings, hotels, marriage halls, and restaurants with nearby verified shelters and discounted surplus buyers. Zero waste. 100% Tax Deductible under Section 80G.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => setQuickDonateOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm shadow-xl flex items-center justify-center space-x-2.5 transition-transform hover:scale-105 animate-pulse"
                  >
                    <Siren className="w-5 h-5" />
                    <span>Emergency Leftover Rescue</span>
                  </button>

                  <button
                    onClick={() => navigate('/buyer')}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-105"
                  >
                    <Utensils className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
                    <span>Browse Marketplace</span>
                  </button>
                </div>

                {/* Live Stats Pill Bar */}
                <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg mx-auto lg:mx-0">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                    <div className="text-xl font-black text-slate-900 dark:text-white">1.8M kg</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Food Rescued</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">1.5M</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Meals Served</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                    <div className="text-xl font-black text-amber-500">500+</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">NGO Partners</div>
                  </div>
                </div>

              </div>

              {/* Right Interactive Card / Map Preview */}
              <div className="lg:col-span-5 relative">
                <div className="glass-card rounded-3xl p-4 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden space-y-3">
                  <div className="flex items-center justify-between px-2 pt-1">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center">
                      <MapPin className="w-4 h-4 text-emerald-600 mr-1" />
                      Live Volunteer Telemetry (Delhi NCR)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">ONLINE</span>
                  </div>
                  <LiveMap height="h-72" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURED SURPLUS MARKETPLACE HIGHLIGHTS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Surplus Food Near You</h2>
              <p className="text-xs text-slate-500 font-semibold">Freshly prepared, hygiene certified evening surplus available for pickup</p>
            </div>
            <button onClick={() => navigate('/buyer')} className="text-xs font-extrabold text-emerald-600 hover:underline flex items-center">
              <span>View All Listings</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.slice(0, 4).map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Quick Emergency Modal */}
        <QuickDonateModal isOpen={quickDonateOpen} onClose={() => setQuickDonateOpen(false)} />
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED USER DASHBOARD VIEW (CLEAN, UNCLUTTERED, NO DUPLICATE BUTTONS)
  // =========================================================================
  const isDonorRole = user?.role === 'RESTAURANT_OWNER' || user?.role === 'RESTAURANT' || user?.donorType;
  const isNewAccount = user?.isNewAccount;

  // Format clean human-readable role badge
  const roleBadgeDisplay = user?.donorType 
    ? `${user.donorType.replace('_', ' ')} DONOR` 
    : (user?.role === 'RESTAURANT_OWNER' ? 'VERIFIED FOOD DONOR' : user?.role === 'NGO' ? 'NGO COORDINATOR' : 'VERIFIED MEMBER');

  const ownerDonations = donations.length > 0 ? donations : [
    {
      id: 'DON-REQ-9012',
      item: '120 Servings - Royal Wedding Feast (Biryani & Paneer)',
      ngo: 'Food Relief Foundation (NGO)',
      quantity: '45.0 kg',
      taxSaved: '₹3,600',
      date: 'Today, 2:15 PM',
      status: 'VOLUNTEER EN ROUTE',
      driver: 'Vikram (EV Scooter #4092)',
      eta: '6 mins away',
      qrCode: 'FOODBRIDGE-QR-9012'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f6f3] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Main 3-Column Clean Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 1. LEFT SIDEBAR NAVIGATION (CLEANED UP - NO DUPLICATE DONATE BUTTON!) */}
          <aside className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            
            {/* User Profile Summary Card */}
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-slate-700">
              <img 
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
                alt={user?.name} 
                className="w-11 h-11 rounded-xl object-cover border-2 border-emerald-500" 
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{user?.name || 'Rahul Sharma'}</h4>
                <div className="flex items-center space-x-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider truncate">
                    {roleBadgeDisplay}
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar Clean Navigation Links */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">Workspace Menu</div>
              
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => navigate('/orders')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span>My Orders & Pickups</span>
                </div>
                {orders.length > 0 && <span className="px-2 py-0.5 text-[9px] bg-emerald-100 text-emerald-800 rounded-full font-black">{orders.length}</span>}
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
                  <span>Live Messages</span>
                </div>
                <span className="px-2 py-0.5 text-[9px] bg-emerald-100 text-emerald-800 rounded-full font-black">2 New</span>
              </button>
            </div>

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

          {/* 2. CENTER WORKSPACE PANEL */}
          <main className="lg:col-span-6 space-y-6">
            
            {/* Top Impact Banner */}
            <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                  Food Donor • {user?.businessName || user?.eventName || 'Rahul & Priya Wedding'}
                </span>
                <span className="text-xs font-bold text-emerald-200">
                  {user?.isVerified ? '✓ Verified Donor' : 'Verification Review Pending'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center py-2">
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                  <div className="text-2xl font-black">{isNewAccount ? '1' : '26'}</div>
                  <div className="text-[10px] text-emerald-100 font-semibold">Total Donations</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                  <div className="text-2xl font-black">{isNewAccount ? '₹3,600' : '₹8,750'}</div>
                  <div className="text-[10px] text-emerald-100 font-semibold">Tax Saved</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                  <div className="text-2xl font-black">{isNewAccount ? '1' : '18'}</div>
                  <div className="text-[10px] text-emerald-100 font-semibold">Shelters Helped</div>
                </div>
              </div>

              {/* Primary Action Buttons (2 Non-Conflicting Options) */}
              <div className="flex items-center justify-between pt-1 gap-3">
                <button
                  onClick={() => setQuickDonateOpen(true)}
                  className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg flex items-center justify-center space-x-1.5 transition-all animate-pulse"
                >
                  <Siren className="w-4 h-4" />
                  <span>⚡ Emergency Leftover Rescue</span>
                </button>

                <button
                  onClick={() => setDonationModalOpen(true)}
                  className="py-3 px-4 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs shadow-lg flex items-center justify-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Standard Listing</span>
                </button>
              </div>
            </div>

            {/* Active Leftover Food Donations & Telemetry Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <span>Active & Recent Leftover Donations</span>
                </h3>
                <button onClick={() => navigate('/restaurant')} className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
              </div>

              {/* Active Telemetry Cards List */}
              <div className="space-y-3">
                {ownerDonations.map((don) => (
                  <div key={don.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black tracking-wide border border-emerald-500/20 uppercase">
                          {don.status || 'VOLUNTEER EN ROUTE'}
                        </span>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1">{don.item}</h4>
                        <p className="text-xs text-slate-500 font-semibold">{don.quantity} • {don.ngo}</p>
                      </div>

                      <div className="text-right">
                        <div className="font-black text-emerald-600 dark:text-emerald-400">{don.taxSaved} 80G Credit</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{don.date}</div>
                      </div>
                    </div>

                    {/* Driver & Action Toolbar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 gap-2">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <span>Rider: <strong>{don.driver || 'Vikram (EV Scooter)'}</strong> • {don.eta || '6 mins'}</span>
                      </div>

                      <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <button
                          onClick={() => setSelectedReceipt({
                            id: don.id,
                            donorName: user?.name || 'Rahul & Priya Wedding',
                            businessName: user?.eventName || 'Rahul & Priya Wedding',
                            date: new Date().toISOString().split('T')[0],
                            servings: 120,
                            estimatedValueInr: 3600,
                            taxSavedInr: 3600,
                            ngoName: 'Food Relief Foundation (80G Regd)',
                            fssaiNumber: 'N/A (Private Wedding Rescue)'
                          })}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center space-x-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          <span>80G Receipt</span>
                        </button>

                        <button
                          onClick={() => setChatOpen(true)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat Driver</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </main>

          {/* 3. RIGHT QUICK ACTIONS PANEL (CLEANED UP - HIGH-VALUE ACTIONS ONLY!) */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-3">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-1">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Quick Actions</span>
              </h4>
              
              <button
                onClick={() => setFreshnessModalOpen(true)}
                className="w-full py-2.5 px-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all"
              >
                <span className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-emerald-600" />
                  <span>AI Freshness Scanner</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => setTaxModalOpen(true)}
                className="w-full py-2.5 px-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all"
              >
                <span className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>80G Tax Credit Calculator</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/map')}
                className="w-full py-2.5 px-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-between border border-emerald-200 transition-all"
              >
                <span className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Find Nearby Shelters</span>
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </aside>

        </div>

      </div>

      {/* Interactive Modals */}
      <ChatDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      {selectedReceipt && (
        <PdfReceiptModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
      )}
      <PdfReceiptModal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} />
      <RegistrationModal isOpen={donationModalOpen} onClose={() => setDonationModalOpen(false)} initialRole="RESTAURANT" />
      <QuickDonateModal isOpen={quickDonateOpen} onClose={() => setQuickDonateOpen(false)} />
      <TaxSavingsCalculatorModal isOpen={taxModalOpen} onClose={() => setTaxModalOpen(false)} />
      <AiFreshnessCalculatorModal isOpen={freshnessModalOpen} onClose={() => setFreshnessModalOpen(false)} />
    </div>
  );
}
