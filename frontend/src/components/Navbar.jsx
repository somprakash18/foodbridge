import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Utensils, 
  HeartHandshake, 
  ShoppingBag, 
  Truck, 
  ShieldAlert, 
  Sun, 
  Moon, 
  Bell, 
  MessageSquare, 
  Wallet, 
  UserPlus, 
  ChevronDown, 
  Sparkles,
  Calculator,
  Menu,
  X,
  MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import NotificationCenter from './NotificationCenter';
import ChatDrawer from './ChatDrawer';
import RegistrationModal from './RegistrationModal';
import AiFreshnessCalculatorModal from './AiFreshnessCalculatorModal';
import TaxSavingsCalculatorModal from './TaxSavingsCalculatorModal';

const ROLES_INFO = [
  { key: 'RESTAURANT', label: 'Restaurant Portal', icon: Utensils, path: '/restaurant' },
  { key: 'NGO', label: 'NGO Portal', icon: HeartHandshake, path: '/ngo' },
  { key: 'BUYER', label: 'Buyer Marketplace', icon: ShoppingBag, path: '/buyer' },
  { key: 'DELIVERY_PARTNER', label: 'Delivery Partner', icon: Truck, path: '/delivery' },
  { key: 'OWNER_ADMIN', label: 'Platform Admin', icon: ShieldAlert, path: '/admin' },
];

export default function Navbar() {
  const { user, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, walletBalance } = useApp();
  const navigate = useNavigate();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [freshnessModalOpen, setFreshnessModalOpen] = useState(false);
  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifsCount = notifications.filter(n => n.unread).length;

  const handleRoleSelect = (roleObj) => {
    switchRole(roleObj.key);
    setRoleDropdownOpen(false);
    navigate(roleObj.path);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo & Live System Status */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-emerald-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
                  <Utensils className="w-5.5 h-5.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-800 via-brand-600 to-emerald-600 dark:from-brand-300 dark:via-brand-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    FoodBridge
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 tracking-wider">Surplus Food Marketplace</span>
                </div>
              </Link>

              {/* Status Badge */}
              <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live System</span>
              </div>
            </div>

            {/* Middle Nav: Active Role Selector & Quick Tools */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Role Switcher */}
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <span className="text-slate-400 font-medium">Role:</span>
                  <span className="text-brand-600 dark:text-brand-400 font-bold">{user?.role ? user.role.replace('_', ' ') : 'BUYER'}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl glass-card shadow-soft-lg py-2 border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                      Switch Active Portal
                    </div>
                    {ROLES_INFO.map((r) => {
                      const IconComponent = r.icon;
                      const isCurrent = user?.role === r.key;
                      return (
                        <button
                          key={r.key}
                          onClick={() => handleRoleSelect(r)}
                          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
                            isCurrent
                              ? 'bg-brand-50/80 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <div className={`p-1.5 rounded-xl ${isCurrent ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 font-semibold">{r.label}</div>
                          {isCurrent && <span className="w-2 h-2 rounded-full bg-brand-500"></span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* AI Freshness Predictor */}
              <button
                onClick={() => setFreshnessModalOpen(true)}
                className="px-3 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>AI Freshness</span>
              </button>

              {/* 80G Tax Calculator */}
              <button
                onClick={() => setTaxModalOpen(true)}
                className="px-3 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-500" />
                <span>Tax Calculator</span>
              </button>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center space-x-2.5">
              
              {/* Partner Signup Button */}
              <button
                onClick={() => setRegModalOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-brand-700 to-emerald-600 hover:from-brand-800 hover:to-emerald-700 text-white font-extrabold text-xs shadow-soft transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Partner Signup</span>
              </button>

              {/* Wallet Quick Badge */}
              <Link
                to="/wallet"
                className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 transition-all shadow-sm"
              >
                <Wallet className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>₹{walletBalance.toLocaleString('en-IN')}</span>
              </Link>

              {/* Chat Button */}
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="relative p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Live Chat Support"
              >
                <MessageSquare className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              </button>

              {/* Notifications Button */}
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-extrabold bg-rose-500 text-white rounded-full">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Toggle Dark/Light Mode"
              >
                {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
              </button>

              {/* User Profile Avatar */}
              {user && (
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 p-0.5 rounded-full hover:ring-2 hover:ring-brand-500 transition-all"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-brand-500 shadow-sm"
                  />
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Popovers & Modals */}
      <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
      <ChatDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <RegistrationModal isOpen={regModalOpen} onClose={() => setRegModalOpen(false)} />
      <AiFreshnessCalculatorModal isOpen={freshnessModalOpen} onClose={() => setFreshnessModalOpen(false)} />
      <TaxSavingsCalculatorModal isOpen={taxModalOpen} onClose={() => setTaxModalOpen(false)} />
    </>
  );
}
