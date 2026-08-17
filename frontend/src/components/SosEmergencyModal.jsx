import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Send, MapPin, Phone, Users, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SosEmergencyModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: 'Urgent Shelter Food Shortage',
    location: 'Connaught Place Shelter Hub 4, Delhi',
    peopleCount: '150 People',
    contactPhone: '+91 98765 12345',
    urgencyLevel: 'CRITICAL (Next 2 Hours)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-5 border border-rose-200 dark:border-rose-900 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5 text-rose-600 dark:text-rose-400">
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">SOS Emergency Request</h3>
              <p className="text-[11px] text-slate-500">Instant Alert Broadcast to Nearby NGOs & Drivers</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">SOS Broadcast Sent!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Broadcasted alert to 14 nearby NGOs, shelters & EV delivery partners within 5 km.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Request Title / Event</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">People to Feed</label>
                <input
                  type="text"
                  value={formData.peopleCount}
                  onChange={(e) => setFormData({ ...formData, peopleCount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Urgency Window</label>
                <select
                  value={formData.urgencyLevel}
                  onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold outline-none"
                >
                  <option>CRITICAL (Next 2 Hours)</option>
                  <option>HIGH (Today Evening)</option>
                  <option>DISASTER RELIEF (Immediate)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Pickup / Delivery Address</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold outline-none"
                required
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">Emergency Contact Phone</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold outline-none"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold flex items-center space-x-1.5 shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast SOS Alert</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
