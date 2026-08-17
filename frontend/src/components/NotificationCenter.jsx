import React, { useState } from 'react';
import { Bell, CheckCheck, Trash2, HeartHandshake, Truck, ShieldCheck, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotificationCenter({ isOpen, onClose }) {
  const { notifications, markAllNotificationsRead } = useApp();
  const [activeTab, setActiveTab] = useState('ALL');

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'UNREAD') return n.unread;
    return true;
  });

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Notifications</h3>
            <p className="text-[10px] text-slate-400">Live Platform Updates</p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
      </div>

      {/* Action Controls */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1 rounded-xl ${activeTab === 'ALL' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('UNREAD')}
            className={`px-3 py-1 rounded-xl ${activeTab === 'UNREAD' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}
          >
            Unread
          </button>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="text-emerald-600 hover:underline flex items-center space-x-1"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* List */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {filteredNotifs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs font-semibold">
            No notifications found
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all ${
                n.unread
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between font-extrabold text-slate-900 dark:text-white">
                <span>{n.title}</span>
                <span className="text-[9.5px] text-slate-400 font-semibold">{n.time}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium text-[11px]">{n.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs font-bold text-slate-400">
        FoodBridge Real-Time Dispatch System
      </div>

    </div>
  );
}
