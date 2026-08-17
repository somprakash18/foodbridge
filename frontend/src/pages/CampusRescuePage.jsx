import React, { useState } from 'react';
import { Building2, Utensils, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CampusRescuePage() {
  const [submitted, setSubmitted] = useState(false);
  const [campusData, setCampusData] = useState({
    collegeName: 'Indian Institute of Technology (IIT) Delhi Mess',
    messName: 'Hostel 7 Dining Hall',
    quantityKg: '45 kg (180 Servings)',
    mealType: 'Dinner Mess Surplus',
    contactPerson: 'Prof. Ramesh Verma / Student Secretary'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-900 p-8 sm:p-10 text-white shadow-2xl space-y-4">
        <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider">
          University & Hostel Mess Rescue
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Zero-Waste Campus Movement.
        </h1>
        <p className="text-sm sm:text-base text-emerald-100 max-w-2xl font-medium">
          Connect college dining halls, hostel canteens, and university messes directly with nearby student volunteers and shelters.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Post Mess / Canteen Surplus</h2>

        {submitted ? (
          <div className="py-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Campus Alert Broadcasted!</h3>
            <p className="text-xs text-slate-500">Student volunteers & local shelters notified for instant pickup.</p>
            <button onClick={() => setSubmitted(false)} className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs">
              Post New Mess Batch
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">University / College Name</label>
              <input
                type="text"
                value={campusData.collegeName}
                onChange={(e) => setCampusData({ ...campusData, collegeName: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Hostel / Mess Name</label>
                <input
                  type="text"
                  value={campusData.messName}
                  onChange={(e) => setCampusData({ ...campusData, messName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Quantity (kg / Servings)</label>
                <input
                  type="text"
                  value={campusData.quantityKg}
                  onChange={(e) => setCampusData({ ...campusData, quantityKg: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Broadcast Campus Rescue Alert</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
