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
  BarChart3,
  Globe,
  Award,
  Calendar,
  Building2,
  User,
  Settings,
  Gift,
  LogOut,
  ShieldCheck,
  Siren
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import NotificationCenter from './NotificationCenter';
import ChatDrawer from './ChatDrawer';
import RegistrationModal from './RegistrationModal';
import QuickDonateModal from './QuickDonateModal';
import AiFreshnessCalculatorModal from './AiFreshnessCalculatorModal';
import TaxSavingsCalculatorModal from './TaxSavingsCalculatorModal';

const ROLES_INFO = [
  { key: 'RESTAURANT', label: 'Restaurant / Donor Portal', icon: Utensils, path: '/restaurant' },
  { key: 'NGO', label: 'NGO Portal', icon: HeartHandshake, path: '/ngo' },
  { key: 'BUYER', label: 'Buyer Marketplace', icon: ShoppingBag, path: '/buyer' },
  { key: 'DELIVERY_PARTNER', label: 'Delivery Partner', icon: Truck, path: '/delivery' },
  { key: 'OWNER_ADMIN', label: 'Platform Admin', icon: ShieldAlert, path: '/admin' },
];

export default function Navbar() {
  const { user, switchRole, logout, lang, setLanguage, t } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, walletBalance } = useApp();
  const navigate = useNavigate();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [quickDonateOpen, setQuickDonateOpen] = useState(false);
  const [freshnessModalOpen, setFreshnessModalOpen] = useState(false);
  const [taxModalOpen, setTaxModalOpen] = useState(false);

  const unreadNotifsCount = notifications.filter(n => n.unread).length;

  const handleRoleSelect = (roleObj) => {
    switchRole(roleObj.key);
    setRoleDropdownOpen(false);
    navigate(roleObj.path);
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo & Language Switcher */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-emerald-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
                  <Utensils className="w-5.5 h-5.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-800 via-brand-600 to-emerald-600 dark:from-brand-300 dark:via-brand-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    {t.brand || "FoodBridge"}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 tracking-wider">{t.tagline || "Surplus Food Marketplace"}</span>
                </div>
              </Link>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-[11px] font-extrabold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-32 rounded-2xl glass-card shadow-soft-lg py-1 border border-slate-200 dark:border-slate-800 z-50">
                    <button onClick={() => { setLanguage('EN'); setLangDropdownOpen(false); }} className="w-full px-3 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">English (EN)</button>
                    <button onClick={() => { setLanguage('HI'); setLangDropdownOpen(false); }} className="w-full px-3 py-1.5 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">हिंदी (HI)</button>
                  </div>
                )}
              </div>
            </div>

            {/* Middle Nav: Quick Links & Role Switcher */}
            <div className="hidden lg:flex items-center space-x-3">
              
              {/* EMERGENCY LEFTOVER FOOD RESCUE BUTTON */}
              <button
                onClick={() => setQuickDonateOpen(true)}
                className="px-3.5 py-2 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-lg flex items-center space-x-1.5 transition-transform hover:scale-105 animate-pulse"
              >
                <Siren className="w-4 h-4" />
                <span>Donate Food Now</span>
              </button>

              <Link to="/buyer" className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-colors">
                {t.marketplace || "Marketplace"}
              </Link>
              <Link to="/event-rescue" className="px-3 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Wedding Rescue</span>
              </Link>
            </div>

            {/* Right Action Tools */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
              </button>

              {/* User Profile / Login */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
                  >
                    <img src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} alt={user.name} className="w-8 h-8 rounded-xl object-cover border border-emerald-500" />
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white max-w-[100px] truncate">{user.name}</span>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-card shadow-soft-lg py-2 border border-slate-200 dark:border-slate-800 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                        <div className="text-xs font-black text-slate-900 dark:text-white">{user.name}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{user.role}</div>
                      </div>
                      <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setRegModalOpen(true)}
                  className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md"
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Global Modals */}
      <RegistrationModal isOpen={regModalOpen} onClose={() => setRegModalOpen(false)} />
      <QuickDonateModal isOpen={quickDonateOpen} onClose={() => setQuickDonateOpen(false)} />
    </>
  );
}
