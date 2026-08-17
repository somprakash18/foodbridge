import React, { useState } from 'react';
import { X, Sparkles, Thermometer, Clock, ShieldCheck, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AiFreshnessCalculatorModal({ isOpen, onClose }) {
  const [foodCategory, setFoodCategory] = useState('PREPARED_MEALS');
  const [prepTimeHours, setPrepTimeHours] = useState(2);
  const [storageTemp, setStorageTemp] = useState('HOT');
  const [packagingType, setPackagingType] = useState('SEALED_CONTAINER');

  if (!isOpen) return null;

  // Calculate AI Freshness Score & Remaining Shelf Life
  const calculateFreshness = () => {
    let baseScore = 98;

    // Deduct based on hours since preparation
    baseScore -= prepTimeHours * 4;

    // Temperature multiplier
    if (storageTemp === 'ROOM_TEMP' && prepTimeHours > 3) baseScore -= 15;
    if (storageTemp === 'FROZEN') baseScore += 5;
    if (storageTemp === 'HOT') baseScore += 2;

    // Packaging modifier
    if (packagingType === 'LOOSE_FOIL') baseScore -= 8;

    const finalScore = Math.max(20, Math.min(99, baseScore));

    let status = 'SAFE_TO_DONATE';
    let safeColor = 'text-emerald-500';
    let safeBg = 'bg-emerald-500/10 border-emerald-500/30';
    let hoursLeft = Math.max(1, 8 - prepTimeHours);

    if (finalScore < 70) {
      status = 'URGENT_PICKUP_REQUIRED';
      safeColor = 'text-amber-500';
      safeBg = 'bg-amber-500/10 border-amber-500/30';
    }
    if (finalScore < 45) {
      status = 'UNSAFE_FOR_DONATION';
      safeColor = 'text-rose-500';
      safeBg = 'bg-rose-500/10 border-rose-500/30';
      hoursLeft = 0;
    }

    return { score: finalScore, status, safeColor, safeBg, hoursLeft };
  };

  const result = calculateFreshness();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">AI Food Safety & Expiry Predictor</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Food Category</label>
            <select
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-bold"
            >
              <option value="PREPARED_MEALS">Cooked Meals (Biryani, Curry, Pasta)</option>
              <option value="BAKERY">Bakery & Breads (Pastries, Croissants)</option>
              <option value="DAIRY">Dairy & Paneer Products</option>
              <option value="FRUITS_VEG">Cut Fruits & Salads</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Hours Since Prep</label>
              <input
                type="number"
                min={1}
                max={12}
                value={prepTimeHours}
                onChange={(e) => setPrepTimeHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Storage Temp</label>
              <select
                value={storageTemp}
                onChange={(e) => setStorageTemp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-bold"
              >
                <option value="HOT">Hot Hold (&gt; 60°C)</option>
                <option value="COLD">Refrigerated (&lt; 4°C)</option>
                <option value="ROOM_TEMP">Room Temp (25°C)</option>
                <option value="FROZEN">Deep Frozen (&lt; -18°C)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Packaging Sealed Status</label>
            <select
              value={packagingType}
              onChange={(e) => setPackagingType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none font-bold"
            >
              <option value="SEALED_CONTAINER">Hermetically Sealed Food Container</option>
              <option value="PACKED_BOX">Sealed Food Box</option>
              <option value="LOOSE_FOIL">Loose Foil Wrap</option>
            </select>
          </div>
        </div>

        {/* AI Result Card */}
        <div className={`p-4 rounded-2xl border space-y-2 text-center transition-all ${result.safeBg}`}>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">AI Safety Score Result</span>
          <div className={`text-4xl font-extrabold ${result.safeColor}`}>
            {result.score}%
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{result.status.replace(/_/g, ' ')}</div>
          <p className="text-[11px] text-slate-500">
            Recommended Pickup Window: <strong>{result.hoursLeft} Hours Remaining</strong> before expiry.
          </p>
        </div>

      </div>
    </div>
  );
}
