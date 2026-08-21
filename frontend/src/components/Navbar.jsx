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
  Siren,
  MapPin,
  Search,
  FileText
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
import FoodSafetyModal from './FoodSafetyModal';
import TopRatedRestaurantsModal from './TopRatedRestaurantsModal';

export default function Navbar({ onOpenAuth }) {
  const auth = useAuth() || {};
  const { user, switchRole, logout, lang = 'EN', setLanguage, t = {} } = auth;
  
  const themeCtx = useTheme() || {};
  const { theme, toggleTheme } = themeCtx;

  const appCtx = useApp() || {};
  const { notifications = [], walletBalance = 0, orders = [] } = appCtx;

  const navigate = useNavigate();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [quickDonateOpen, setQuickDonateOpen] = useState(false);
  const [foodSafetyOpen, setFoodSafetyOpen] = useState(false);
  const [topRestaurantsOpen, setTopRestaurantsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('New Delhi NCR, India');
  const [locationLoading, setLocationLoading] = useState(false);

  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  const handleUseCurrentLocation = () => {
    setLocationLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation(`GPS (${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)})`);
          setLocationLoading(false);
          setLocationDropdownOpen(false);
        },
        (error) => {
          setSelectedLocation('Connaught Place, New Delhi');
          setLocationLoading(false);
          setLocationDropdownOpen(false);
        }
      );
    } else {
      setSelectedLocation('New Delhi NCR, India');
      setLocationLoading(false);
      setLocationDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    if (logout) logout();
    navigate('/');
  };

  const handleSignInClick = () => {
    if (onOpenAuth) {
      onOpenAuth();
    } else {
      setRegModalOpen(true);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 shrink-0">
              <Link to="/" className="flex items-center space-x-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-emerald-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
                  <Utensils className="w-5.5 h-5.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-800 via-brand-600 to-emerald-600 dark:from-brand-300 dark:via-brand-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    {t?.brand || "FoodBridge"}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 tracking-wider">Surplus Food Rescue</span>
                </div>
              </Link>
            </div>

            {/* LOCATION SELECTOR SYSTEM */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/90 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all max-w-[200px]"
              >
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-left truncate">
                  <div className="text-[9px] text-slate-400 font-extrabold uppercase">Delivering In</div>
                  <div className="truncate font-extrabold">{locationLoading ? 'Locating...' : selectedLocation}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
              </button>

              {locationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-3xl glass-card shadow-2xl p-2 border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={handleUseCurrentLocation}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black flex items-center space-x-2 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Use My Current Location</span>
                  </button>

                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1.5 mt-1">Select City</div>
                  {['New Delhi NCR, India', 'Mumbai, Maharashtra', 'Bengaluru, Karnataka', 'Hyderabad, Telangana'].map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedLocation(city);
                        setLocationDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Emergency Donate CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setQuickDonateOpen(true)}
                className="px-3.5 py-2 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-lg flex items-center space-x-1.5 transition-transform hover:scale-105 animate-pulse"
              >
                <Siren className="w-4 h-4" />
                <span>Donate Food Now</span>
              </button>

              <Link to="/buyer" className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-colors">
                Marketplace
              </Link>
              
              <Link to="/orders" className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-colors flex items-center space-x-1">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                <span>My Orders</span>
                {orders.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[9px] font-black">{orders.length}</span>
                )}
              </Link>

              <button
                onClick={() => setTopRestaurantsOpen(true)}
                className="px-3 py-1.5 text-xs font-extrabold text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700/80 rounded-xl flex items-center space-x-1.5 transition-all shadow-sm transform hover:scale-105"
                title="View Top Rated Restaurant Partners & Recipient Reviews"
              >
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Top Donors</span>
              </button>

              <Link to="/event-rescue" className="px-3 py-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Wedding Rescue</span>
              </Link>

              <button
                onClick={() => setFoodSafetyOpen(true)}
                className="px-3 py-1.5 text-xs font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 hover:bg-emerald-200 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-700/80 rounded-xl flex items-center space-x-1.5 transition-all shadow-sm transform hover:scale-105"
                title="View FoodBridge 100% Quality & FSSAI Safety Shield"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Safety Shield</span>
              </button>
            </div>

            {/* Right Side Tools & Profile Dropdown */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
              </button>

              {/* User Account Dropdown */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <img src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} alt={user.name || "User"} className="w-8 h-8 rounded-xl object-cover border border-emerald-500" />
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white max-w-[100px] truncate">{user.name || "User"}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-3xl glass-card shadow-2xl py-2 border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                        <div className="text-xs font-black text-slate-900 dark:text-white">{user.name || "User"}</div>
                        <div className="text-[10px] text-emerald-600 font-black uppercase tracking-wider">{user.role || 'VERIFIED USER'}</div>
                      </div>

                      <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-2">
                        <User className="w-4 h-4 text-emerald-600" />
                        <span>My Profile</span>
                      </Link>

                      <Link to="/orders" onClick={() => setProfileDropdownOpen(false)} className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-2">
                        <ShoppingBag className="w-4 h-4 text-emerald-600" />
                        <span>My Orders & Pickups</span>
                      </Link>

                      <Link to="/impact" onClick={() => setProfileDropdownOpen(false)} className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Impact Dashboard</span>
                      </Link>

                      <Link to="/settings" onClick={() => setProfileDropdownOpen(false)} className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-2">
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Settings</span>
                      </Link>

                      <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center space-x-2 border-t border-slate-100 dark:border-slate-800 mt-1 pt-2">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleSignInClick}
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
      <FoodSafetyModal isOpen={foodSafetyOpen} onClose={() => setFoodSafetyOpen(false)} />
      <TopRatedRestaurantsModal isOpen={topRestaurantsOpen} onClose={() => setTopRestaurantsOpen(false)} />
    </>
  );
}
