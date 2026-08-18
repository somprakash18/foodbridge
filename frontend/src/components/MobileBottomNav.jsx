import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Siren, Package, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MobileBottomNav({ onOpenRescue }) {
  const location = useLocation();
  const { t } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/buyer', label: 'Explore', icon: Compass },
    { path: '/orders', label: 'Orders', icon: Package },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {navItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-1 px-3.5 rounded-2xl transition-all ${
              isActive
                ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-bold">{item.label}</span>
          </Link>
        );
      })}

      {/* Center Emergency Rescue Button */}
      <button
        onClick={onOpenRescue}
        className="flex flex-col items-center -mt-5"
      >
        <div className="w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-900 animate-pulse">
          <Siren className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 mt-0.5">Rescue</span>
      </button>

      {navItems.slice(2).map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-1 px-3.5 rounded-2xl transition-all ${
              isActive
                ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-bold">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
