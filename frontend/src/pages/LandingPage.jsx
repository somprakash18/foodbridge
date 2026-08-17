import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  MessageSquare,
  FileText,
  Package,
  Receipt,
  Settings,
  LogOut,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building2,
  Utensils,
  ChevronRight,
  Play,
  ArrowLeft,
  Search,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import RegistrationModal from '../components/RegistrationModal';
import LiveMap from '../components/LiveMap';

export default function LandingPage() {
  const navigate = useNavigate();
  const { listings, addListing } = useApp();
  const { user, logout } = useAuth();

  const [activeNav, setActiveNav] = useState('Dashboard');
  const [makeDonationOpen, setMakeDonationOpen] = useState(false);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);

  // Form state for Make Donation modal
  const [newItem, setNewItem] = useState({
    title: 'Chicken Curry & Rice',
    shelter: 'Demo Shelter 1',
    category: 'Cooked Meals',
    quantity: '25 kg',
    value: '$450',
    taxCredit: '$112'
  });

  const donations = [
    { id: 1, foodItem: 'Chicken curry', date: 'Nov 23, 2025', shelter: 'Demo Shelter 1', category: 'Other', quantity: '20 kg', value: '$400', taxCredit: '$100' },
    { id: 2, foodItem: 'Chicken curry', date: 'Nov 19, 2025', shelter: 'Demo Shelter 2', category: 'Other', quantity: '20 kg', value: '$400', taxCredit: '$100' },
    { id: 3, foodItem: 'Apples', date: 'Nov 16, 2025', shelter: 'Demo Shelter 1', category: 'Fruits', quantity: '20 lbs', value: '$40', taxCredit: '$10' },
    { id: 4, foodItem: 'Apples', date: 'Nov 15, 2025', shelter: 'Demo Shelter 1', category: 'Fruits', quantity: '20 lbs', value: '$40', taxCredit: '$10' },
    { id: 5, foodItem: 'Chicken curry', date: 'Nov 14, 2025', shelter: 'Demo Shelter 1', category: 'Other', quantity: '20 kg', value: '$400', taxCredit: '$100' },
  ];

  const handleCreateDonation = (e) => {
    e.preventDefault();
    addListing({
      title: newItem.title,
      type: 'surplus',
      quantity: newItem.quantity,
      donor: 'Demo Restaurant',
      location: 'New York, NY',
      distance: '1.2 km',
      expiry: '4 hours left',
      claimed: false,
      tag: 'Fresh Cooked',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'
    });
    setMakeDonationOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F0] font-sans text-slate-800 flex flex-col lg:flex-row antialiased">
      
      {/* ------------------------------------------------------------- */}
      {/* LEFT SIDEBAR NAVIGATION */}
      {/* ------------------------------------------------------------- */}
      <aside className="w-full lg:w-64 bg-[#F8FAF5] border-r border-[#E2E8DC] flex flex-col justify-between shrink-0 p-5">
        <div>
          {/* Logo */}
          <div className="flex items-center space-x-2.5 px-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#2E5B27] flex items-center justify-center text-white shadow-sm">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight text-[#1E3A1A] uppercase">
              FOODBRIDGE
            </span>
          </div>

          {/* Nav Section: OVERVIEW */}
          <div className="mb-6">
            <div className="px-3 mb-2 text-[10.5px] font-extrabold tracking-widest text-[#7C8E76] uppercase">
              Overview
            </div>
            <nav className="space-y-1">
              {[
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'Shelter Map', icon: MapPin },
                { name: 'Messages', icon: MessageSquare },
                { name: 'Donation History', icon: FileText },
                { name: 'Items', icon: Package }
              ].map((item) => {
                const Icon = item.icon;
                const active = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveNav(item.name)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-[#E3EEDC] text-[#244E1E] shadow-xs font-bold'
                        : 'text-[#5C6E56] hover:bg-[#EEF4E9] hover:text-[#244E1E]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-[#244E1E]' : 'text-[#7C8E76]'}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Nav Section: TAX */}
          <div className="mb-6">
            <div className="px-3 mb-2 text-[10.5px] font-extrabold tracking-widest text-[#7C8E76] uppercase">
              Tax
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveNav('Tax Overview')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeNav === 'Tax Overview'
                    ? 'bg-[#E3EEDC] text-[#244E1E] shadow-xs font-bold'
                    : 'text-[#5C6E56] hover:bg-[#EEF4E9] hover:text-[#244E1E]'
                }`}
              >
                <Receipt className="w-4 h-4 text-[#7C8E76]" />
                <span>Tax Overview</span>
              </button>
            </nav>
          </div>

          {/* Nav Section: SETTINGS */}
          <div>
            <div className="px-3 mb-2 text-[10.5px] font-extrabold tracking-widest text-[#7C8E76] uppercase">
              Settings
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveNav('Settings')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeNav === 'Settings'
                    ? 'bg-[#E3EEDC] text-[#244E1E] shadow-xs font-bold'
                    : 'text-[#5C6E56] hover:bg-[#EEF4E9] hover:text-[#244E1E]'
                }`}
              >
                <Settings className="w-4 h-4 text-[#7C8E76]" />
                <span>Settings</span>
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#5C6E56] hover:bg-rose-50 hover:text-rose-700 transition-all"
              >
                <LogOut className="w-4 h-4 text-[#7C8E76]" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
        
        {activeNav === 'Shelter Map' ? (
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8DC] shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#1E3A1A]">Shelter & Surplus Map</h2>
            <LiveMap height="h-[600px]" />
          </div>
        ) : (
          <>
            {/* Impact Banner Container */}
            <div className="bg-[#DCECD4] rounded-2xl p-6 border border-[#CDDF2] shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-extrabold text-[#1E3A1A]">Your Impact</h1>
                <button
                  onClick={() => setMakeDonationOpen(true)}
                  className="flex items-center space-x-1.5 bg-white hover:bg-slate-50 text-[#1E3A1A] px-4 py-2 rounded-xl text-xs font-extrabold border border-[#C5D9BA] shadow-xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Make Donation</span>
                </button>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 border border-[#D5E4CC] shadow-xs">
                  <div className="text-3xl font-black text-[#1E3A1A] mb-1">26</div>
                  <div className="text-xs font-medium text-[#65795E]">Total Donations</div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-[#D5E4CC] shadow-xs">
                  <div className="text-3xl font-black text-[#1E3A1A] mb-1">$2851</div>
                  <div className="text-xs font-medium text-[#65795E]">Value Donated</div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-[#D5E4CC] shadow-xs">
                  <div className="text-3xl font-black text-[#1E3A1A] mb-1">18</div>
                  <div className="text-xs font-medium text-[#65795E]">Shelters Helped</div>
                </div>
              </div>
            </div>

            {/* Recent Donations Table Section */}
            <div className="bg-white rounded-2xl border border-[#E2E8DC] shadow-xs overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b border-[#F0F4EC]">
                <h2 className="text-base font-bold text-[#1E3A1A]">Recent Donations</h2>
                <button
                  onClick={() => setActiveNav('Donation History')}
                  className="text-xs font-bold text-[#4B7A42] hover:underline flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#F0F4EC] bg-[#FAFCF8] text-[10.5px] font-extrabold text-[#7C8E76] uppercase tracking-wider">
                      <th className="py-3.5 px-5">Food Item</th>
                      <th className="py-3.5 px-5">Shelter</th>
                      <th className="py-3.5 px-5">Category</th>
                      <th className="py-3.5 px-5">Quantity</th>
                      <th className="py-3.5 px-5">Value</th>
                      <th className="py-3.5 px-5">Tax Credit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F4EC] text-xs">
                    {donations.map((d) => (
                      <tr key={d.id} className="hover:bg-[#F8FAF5] transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-bold text-[#1E3A1A]">{d.foodItem}</div>
                          <div className="text-[10px] font-medium text-[#8B9C85]">{d.date}</div>
                        </td>
                        <td className="py-4 px-5 font-semibold text-[#3A4E35]">{d.shelter}</td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-1 rounded-full bg-[#E2F0D9] text-[#2E5B27] text-[11px] font-bold">
                            {d.category}
                          </span>
                        </td>
                        <td className="py-4 px-5 font-semibold text-[#3A4E35]">{d.quantity}</td>
                        <td className="py-4 px-5 font-bold text-[#1E3A1A]">{d.value}</td>
                        <td className="py-4 px-5 font-bold text-[#2E5B27]">{d.taxCredit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tax Benefit Bottom Banner */}
              <div className="p-4 bg-[#EDF5E8] border-t border-[#DDECD4] flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#C5E0B8] flex items-center justify-center text-[#2E5B27] shrink-0">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E3A1A]">All donations qualify for tax benefits</div>
                  <div className="text-[11px] font-medium text-[#65795E]">Keep donating to maximize your tax credits</div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT SIDEBAR / PANEL */}
      {/* ------------------------------------------------------------- */}
      <aside className="w-full lg:w-80 bg-[#F8FAF5] border-l border-[#E2E8DC] p-5 space-y-5 shrink-0">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8DC] p-4 space-y-3 shadow-xs">
          <div className="text-sm font-extrabold text-[#1E3A1A]">Demo Restaurant</div>
          <div className="h-32 rounded-xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60"
              alt="Demo Restaurant Storefront"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Urgent Help Needed Card */}
        <div className="bg-[#EEF6EB] rounded-2xl border border-[#D5E6CF] p-4 space-y-3 shadow-xs">
          <div>
            <div className="text-xs font-extrabold text-[#1E3A1A]">Urgent Help Needed</div>
            <div className="text-[11px] font-medium text-[#65795E]">These shelters are critically low on supplies</div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-[#D8E8D2] flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#1E3A1A]">Harbor Haven Shelter</div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Critical
              </span>
            </div>
          </div>

          <button
            onClick={() => setMakeDonationOpen(true)}
            className="w-full py-2.5 rounded-xl bg-[#68AA37] hover:bg-[#59962C] text-white font-extrabold text-xs shadow-xs transition-all"
          >
            Donate Now
          </button>
        </div>

        {/* Recent Shelters */}
        <div className="space-y-3">
          <div className="text-xs font-extrabold text-[#1E3A1A]">Recent Shelters</div>
          
          <div className="space-y-2">
            {[
              { name: 'Harbor Haven Shelter' },
              { name: 'Sunrise Housing' },
              { name: 'Hope Center Harlem' }
            ].map((s) => (
              <div key={s.name} className="bg-white rounded-xl p-3 border border-[#E2E8DC] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1E3A1A]">{s.name}</span>
                <button
                  onClick={() => setMakeDonationOpen(true)}
                  className="px-3 py-1 rounded-lg bg-[#EFF6EC] text-[#2E5B27] border border-[#C5E0B8] text-[11px] font-bold hover:bg-[#E2F0D9] transition-all"
                >
                  Donate
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveNav('Shelter Map')}
            className="w-full py-2.5 rounded-xl bg-[#68AA37] hover:bg-[#59962C] text-white font-extrabold text-xs shadow-xs transition-all"
          >
            View All Shelters
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 space-y-2">
          <button
            onClick={() => setRegModalOpen(true)}
            className="w-full py-2.5 rounded-xl bg-[#1E2D1B] hover:bg-[#2C3E28] text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Demo</span>
          </button>

          <button
            onClick={() => window.open('https://youtube.com', '_blank')}
            className="w-full py-2.5 rounded-xl bg-[#8A9687] hover:bg-[#788475] text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Watch Demo Video</span>
          </button>
        </div>
      </aside>

      {/* Make Donation Modal */}
      {makeDonationOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E2E8DC] shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#1E3A1A]">Create Food Donation</h3>
              <button onClick={() => setMakeDonationOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateDonation} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Food Item Title</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#68AA37] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Shelter</label>
                  <select
                    value={newItem.shelter}
                    onChange={(e) => setNewItem({ ...newItem, shelter: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#68AA37] outline-none"
                  >
                    <option>Demo Shelter 1</option>
                    <option>Demo Shelter 2</option>
                    <option>Harbor Haven Shelter</option>
                    <option>Sunrise Housing</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#68AA37] outline-none"
                  >
                    <option>Other</option>
                    <option>Fruits</option>
                    <option>Cooked Meals</option>
                    <option>Bakery</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quantity</label>
                  <input
                    type="text"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Value</label>
                  <input
                    type="text"
                    value={newItem.value}
                    onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setMakeDonationOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#68AA37] text-white font-extrabold hover:bg-[#59962C]"
                >
                  Submit Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <RegistrationModal isOpen={regModalOpen} onClose={() => setRegModalOpen(false)} />
    </div>
  );
}
