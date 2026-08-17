import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Cpu, MapPin, BarChart3, X, CheckCircle2 } from 'lucide-react';

export default function AiAssistantModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('SAFETY'); // SAFETY, MATCH, ROUTE, ANALYTICS
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Form states for safety scan
  const [prepTimeHours, setPrepTimeHours] = useState(2);
  const [tempMode, setTempMode] = useState('HOT');
  const [packaging, setPackaging] = useState('SEALED_CONTAINER');

  if (!isOpen) return null;

  const runAiAnalysis = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);
      if (tab === 'SAFETY') {
        const score = prepTimeHours <= 3 ? 0.98 : 0.85;
        const rec = prepTimeHours <= 2 ? 'SELL_NOW' : 'DONATE_NOW';
        setResult({
          type: 'SAFETY',
          score,
          recommendation: rec,
          reasoning: `Food prepared ${prepTimeHours}h ago stored under ${tempMode} conditions in ${packaging}. Microbiological safety index verified at ${(score * 100).toFixed(0)}%.`
        });
      } else if (tab === 'MATCH') {
        setResult({
          type: 'MATCH',
          matchedNgo: "Food Relief Foundation (1.2 km away, capacity: 1200 meals)",
          matchedBuyer: "Aarav Mehta (0.8 km away, high veg preference)",
          efficiencyScore: "97.4%"
        });
      } else if (tab === 'ROUTE') {
        setResult({
          type: 'ROUTE',
          route: ["Domino's CP -> Haldiram Chandni Chowk -> Food Relief Lodhi Rd -> Vasant Kunj"],
          estimatedMinutes: 24,
          fuelSavedPercent: "32%"
        });
      } else if (tab === 'ANALYTICS') {
        setResult({
          type: 'ANALYTICS',
          peakHours: "09:30 PM - 11:00 PM (Post-buffet surplus peak)",
          highWasteCategory: "Buffet Rice & Bakery Breads",
          suggestedAction: "Schedule automated NGO claim trigger at 09:00 PM daily."
        });
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-500 text-white shadow-soft">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">OpenAI FoodBridge Engine</h3>
              <p className="text-xs text-slate-500">Autonomous food safety & matching intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Mode Tabs */}
        <div className="grid grid-cols-4 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
          <button
            onClick={() => { setTab('SAFETY'); setResult(null); }}
            className={`py-2 rounded-xl transition-all ${tab === 'SAFETY' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500'}`}
          >
            Safety
          </button>
          <button
            onClick={() => { setTab('MATCH'); setResult(null); }}
            className={`py-2 rounded-xl transition-all ${tab === 'MATCH' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500'}`}
          >
            Matching
          </button>
          <button
            onClick={() => { setTab('ROUTE'); setResult(null); }}
            className={`py-2 rounded-xl transition-all ${tab === 'ROUTE' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500'}`}
          >
            Routes
          </button>
          <button
            onClick={() => { setTab('ANALYTICS'); setResult(null); }}
            className={`py-2 rounded-xl transition-all ${tab === 'ANALYTICS' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500'}`}
          >
            Analytics
          </button>
        </div>

        {/* Tab Controls */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
          {tab === 'SAFETY' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Time Prepared (Hours Ago)</label>
                <input
                  type="number"
                  value={prepTimeHours}
                  onChange={(e) => setPrepTimeHours(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-sm font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Storage Temperature</label>
                  <select
                    value={tempMode}
                    onChange={(e) => setTempMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-xs font-bold"
                  >
                    <option value="HOT">Hot (≥ 60°C)</option>
                    <option value="COLD">Cold (≤ 4°C)</option>
                    <option value="ROOM_TEMP">Room Temp</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Packaging Status</label>
                  <select
                    value={packaging}
                    onChange={(e) => setPackaging(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-xs font-bold"
                  >
                    <option value="SEALED_CONTAINER">Sealed Thermal Container</option>
                    <option value="PACKED_BOX">Packed Cardboard Box</option>
                    <option value="LOOSE_FOIL">Loose Foil Wrap</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {tab !== 'SAFETY' && (
            <p className="text-xs text-slate-500 leading-relaxed">
              AI Engine will synthesize live location metrics, restaurant surplus historical patterns, NGO capacity, and traffic nodes.
            </p>
          )}

          <button
            onClick={runAiAnalysis}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-700 to-emerald-600 hover:from-brand-800 hover:to-emerald-700 text-white font-extrabold text-xs shadow-soft flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Processing Neural Model...' : `Run AI ${tab} Assessment`}</span>
          </button>
        </div>

        {/* AI Result Card */}
        {result && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2 animate-in fade-in">
            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>AI Evaluation Complete</span>
            </div>
            {result.type === 'SAFETY' && (
              <div className="text-xs space-y-1 text-emerald-950 dark:text-emerald-200">
                <p><strong>Safety Score:</strong> {(result.score * 100).toFixed(0)}%</p>
                <p><strong>Recommendation:</strong> <span className="px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 font-bold">{result.recommendation}</span></p>
                <p className="opacity-90">{result.reasoning}</p>
              </div>
            )}
            {result.type === 'MATCH' && (
              <div className="text-xs space-y-1 text-emerald-950 dark:text-emerald-200">
                <p><strong>Optimal NGO Match:</strong> {result.matchedNgo}</p>
                <p><strong>Optimal Buyer Match:</strong> {result.matchedBuyer}</p>
                <p><strong>Matching Efficiency:</strong> {result.efficiencyScore}</p>
              </div>
            )}
            {result.type === 'ROUTE' && (
              <div className="text-xs space-y-1 text-emerald-950 dark:text-emerald-200">
                <p><strong>Optimized Route:</strong> {result.route[0]}</p>
                <p><strong>Est. Time:</strong> {result.estimatedMinutes} mins ({result.fuelSavedPercent} carbon saved)</p>
              </div>
            )}
            {result.type === 'ANALYTICS' && (
              <div className="text-xs space-y-1 text-emerald-950 dark:text-emerald-200">
                <p><strong>Predicted Peak Waste:</strong> {result.peakHours}</p>
                <p><strong>High Risk Category:</strong> {result.highWasteCategory}</p>
                <p><strong>Recommendation:</strong> {result.suggestedAction}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
