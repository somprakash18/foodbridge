import React from 'react';
import { Bell, Check, X, ShieldAlert, HeartHandshake, ShoppingBag, Truck, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotificationCenter({ isOpen, onClose }) {
  const { notifications } = useApp();

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'FOOD_ALERT': return <ShieldAlert className="w-4 h-4 text-emerald-500" />;
      case 'ORDER_UPDATE': return <ShoppingBag className="w-4 h-4 text-blue-500" />;
      case 'DONATION_UPDATE': return <HeartHandshake className="w-4 h-4 text-rose-500" />;
      case 'DELIVERY_UPDATE': return <Truck className="w-4 h-4 text-amber-500" />;
      case 'REFERRAL': return <Gift className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4 text-brand-500" />;
    }
  };

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 w-full max-w-sm glass-card rounded-3xl p-4 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h3>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3 rounded-2xl border transition-colors ${
              n.unread
                ? 'bg-brand-50/50 dark:bg-brand-950/40 border-brand-200 dark:border-brand-800/60'
                : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{n.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
