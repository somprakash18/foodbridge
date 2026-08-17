import React, { useState } from 'react';
import { X, Calculator, Receipt, DollarSign, TrendingUp, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function TaxSavingsCalculatorModal({ isOpen, onClose }) {
  const [monthlyMealsKg, setMonthlyMealsKg] = useState(250);
  const [costPerKg, setCostPerKg] = useState(120);

  if (!isOpen) return null;

  const annualDonationValuation = monthlyMealsKg * costPerKg * 12;
  const estimatedTaxExemption80G = annualDonationValuation * 0.50; // 50% deduction under Section 80G
  const netTaxSavedInr = estimatedTaxExemption80G * 0.30; // 30% corporate tax bracket

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Section 80G Tax Savings Estimator</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Monthly Surplus Donated (kg)</label>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={monthlyMealsKg}
              onChange={(e) => setMonthlyMealsKg(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs font-extrabold text-brand-600 dark:text-brand-400 pt-1">
              <span>{monthlyMealsKg} kg / month</span>
              <span>(~{monthlyMealsKg * 2.5} Meals)</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Estimated Food Cost (₹ / kg)</label>
            <input
              type="number"
              value={costPerKg}
              onChange={(e) => setCostPerKg(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-bold"
            />
          </div>
        </div>

        {/* Results Box */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Estimated Annual Tax Savings</span>
          <div className="text-3xl font-extrabold text-amber-500">
            ₹{netTaxSavedInr.toLocaleString('en-IN', { maximumFractionDigits: 0 })} / year
          </div>
          <p className="text-[11px] text-slate-500">
            Based on Section 80G tax certificate valuation of <strong>₹{annualDonationValuation.toLocaleString('en-IN')}</strong> per year.
          </p>
        </div>

      </div>
    </div>
  );
}
