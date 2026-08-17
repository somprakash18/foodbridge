import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, ShoppingBag, HeartHandshake, User, AlertCircle, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MobileBottomNav({ onOpenSos }) {
  const location = useLocation();
  const { t } = useAuth();

  const navItems = [
    { path: '/', label: t.home, icon: Home },
    { path: '/map', label: t.map, icon: MapPin },
    { path: '/buyer', label: t.marketplace, icon: ShoppingBag },
    { path: '/community', label: 'Community', icon: Award },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${
              isActive
                ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}

      {/* SOS Button */}
      <button
        onClick={onOpenSos}
        className="flex flex-col items-center py-1 px-2.5 rounded-2xl text-rose-600 dark:text-rose-400 font-bold"
      >
        <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] animate-pulse">
          SOS
        </div>
        <span className="text-[10px] mt-0.5">Emergency</span>
      </button>
    </div>
  );
}
