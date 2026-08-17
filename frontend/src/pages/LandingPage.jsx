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
  Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ChatDrawer from '../components/ChatDrawer';
import PdfReceiptModal from '../components/PdfReceiptModal';
import RegistrationModal from '../components/RegistrationModal';
import TaxSavingsCalculatorModal from '../components/TaxSavingsCalculatorModal';

export default function LandingPage() {
  const { user, logout, t } = useAuth();
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

  const recentDonations = [
    { id: 'DON-901', item: 'Shahi Paneer & Garlic Naan Bulk Meal', quantity: '25 kg', ngo: 'Food Relief Foundation', date: 'Today, 2:30 PM', taxSaved: '₹2,850', status: 'COMPLETED' },
    { id: 'DON-902', item: 'Artisanal Sourdough & Pastry Assortment', quantity: '15 kg', ngo: 'Hope Shelter Delhi', date: 'Yesterday', taxSaved: '₹1,400', status: 'COMPLETED' },
    { id: 'DON-903', item: 'Hyderabadi Chicken Biryani Surplus', quantity: '40 kg', ngo: 'City Child Care NGO', date: '16 Aug 2026', taxSaved: '₹4,500', status: 'COMPLETED' },
  ];

  return (
    <div className="min-h-screen bg-[#f3f6f3] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Main 3-Column Grid matching Sage Green Dashboard UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            
            {/* User Profile Badge */}
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-slate-700">
              <img src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} alt={user?.name} className="w-11 h-11 rounded-xl object-cover border border-emerald-500" />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{user?.name || 'Som Prakash'}</h4>
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">{user?.role || 'RESTAURANT'}</span>
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
            </div>

            {/* Tax Section */}
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
            <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                  Your FoodBridge Impact
                </span>
                <span className="text-xs font-bold text-emerald-200">100% Tax Deductible (Sec 80G)</span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center py-2">
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                  <div className="text-2xl font-black">26</div>
                  <div className="text-[10px] text-emerald-100 font-semibold">Total Donations</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                  <div className="text-2xl font-black">₹8,750</div>
                  <div className="text-[10px] text-emerald-100 font-semibold">Tax Saved</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs">
                  <div className="text-2xl font-black">18</div>
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

            {/* Recent Donations Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Recent Donations & Tax Credits</h3>
                <button onClick={() => navigate('/restaurant')} className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
              </div>

              <div className="space-y-3">
                {recentDonations.map((don) => (
                  <div key={don.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
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
            </div>

          </main>

          {/* RIGHT PANELS */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Demo Restaurant Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80" alt="Haldiram Sweets" className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">Haldiram Sweets & Dining</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Chandni Chowk Main Rd, Delhi</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>FSSAI License:</span>
                  <span className="font-bold text-slate-900 dark:text-white">10019011006542</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>Status:</span>
                  <span className="font-bold text-emerald-600">VERIFIED DONOR</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/settings')}
                className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
              >
                Edit Business Profile
              </button>
            </div>

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
