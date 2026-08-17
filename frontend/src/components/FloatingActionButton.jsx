import React, { useState } from 'react';
import { Plus, AlertTriangle, Utensils, HeartHandshake, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function FloatingActionButton({ onOpenDonation, onOpenSos }) {
  const [open, setOpen] = useState(false);
  const { t } = useAuth();

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Sub-Actions */}
      {open && (
        <div className="flex flex-col items-end space-y-2.5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* SOS Emergency Button */}
          <button
            onClick={() => {
              setOpen(false);
              onOpenSos();
            }}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-xl transition-all scale-105"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{t.sosEmergency || 'SOS Emergency'}</span>
          </button>

          {/* Post Surplus Food */}
          <button
            onClick={() => {
              setOpen(false);
              onOpenDonation();
            }}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl transition-all"
          >
            <Utensils className="w-4 h-4" />
            <span>{t.makeDonation || 'Post Surplus Food'}</span>
          </button>

        </div>
      )}

      {/* Main Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-200 border-2 border-white dark:border-slate-800 ${
          open ? 'rotate-45' : ''
        }`}
        title="Quick Actions"
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
}
