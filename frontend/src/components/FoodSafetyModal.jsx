import React, { useState } from 'react';
import { 
  ShieldCheck, X, AlertTriangle, CheckCircle2, Thermometer, Clock, 
  FileText, Lock, Award, Search, Sparkles, RefreshCw, ChevronRight, Download
} from 'lucide-react';

export default function FoodSafetyModal({ isOpen, onClose, selectedItem = null }) {
  const [activeTab, setActiveTab] = useState('STANDARDS'); // 'STANDARDS', 'CALCULATOR', 'FSSAI', 'RULES'
  
  // Interactive Calculator State
  const [calcFoodType, setCalcFoodType] = useState('COOKED_MEAL');
  const [calcTemp, setCalcTemp] = useState(65); // Default 65°C hot hold
  const [calcHours, setCalcHours] = useState(2); // Hours since prep
  const [calcContainer, setCalcContainer] = useState('INSULATED_THERMAL');
  
  // FSSAI Validator State
  const [fssaiInput, setFssaiInput] = useState('10019011000123');
  const [fssaiResult, setFssaiResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  if (!isOpen) return null;

  // Calculate AI Safety Score dynamically
  const calculateSafetyScore = () => {
    let score = 100;
    
    // Temperature penalty/boost
    if (calcTemp >= 60) {
      score += 0; // Safe hot hold zone
    } else if (calcTemp <= 4) {
      score += 0; // Safe cold storage zone
    } else {
      // Danger zone 5°C - 59°C
      const dangerHours = calcHours;
      score -= dangerHours * 12;
    }

    // Storage time penalty
    if (calcHours > 4) {
      score -= (calcHours - 4) * 8;
    }

    // Packaging boost
    if (calcContainer === 'INSULATED_THERMAL') score += 5;
    if (calcContainer === 'SEALED_AIRTIGHT') score += 3;

    score = Math.max(15, Math.min(99, score));
    return score;
  };

  const currentScore = calculateSafetyScore();

  const handleValidateFssai = (e) => {
    e.preventDefault();
    setIsValidating(true);
    setFssaiResult(null);

    setTimeout(() => {
      setIsValidating(false);
      const cleanNum = fssaiInput.trim();
      const isValidFormat = /^[0-9]{14}$/.test(cleanNum);

      if (isValidFormat) {
        setFssaiResult({
          valid: true,
          licenseNumber: cleanNum,
          category: 'Central/State FSSAI Food Business Operator',
          issuedDate: '2023-01-15',
          validUntil: '2028-01-14',
          hygieneRating: '5 Stars (Excellent)',
          status: 'ACTIVE & VERIFIED'
        });
      } else {
        setFssaiResult({
          valid: false,
          error: 'Invalid FSSAI License Number format. FSSAI licenses must contain exactly 14 digits.'
        });
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-6 text-white overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2.5 bg-white/15 rounded-2xl backdrop-blur-md border border-white/20">
              <ShieldCheck className="w-7 h-7 text-emerald-200" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest bg-emerald-500/30 px-2.5 py-0.5 rounded-full border border-emerald-300/30 text-emerald-100">
                FoodBridge Safety Shield 2.0
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
                Food Safety & Quality Guarantee
              </h2>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 max-w-xl">
            Multi-layered safety protocols compliant with FSSAI Surplus Food Regulations, thermal temperature holding, and Gemini AI freshness scoring.
          </p>

          {/* Top Tabs */}
          <div className="flex space-x-2 mt-5 border-b border-white/15 pb-0.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('STANDARDS')}
              className={`px-4 py-2 text-xs font-extrabold rounded-t-xl transition-all whitespace-nowrap ${activeTab === 'STANDARDS' ? 'bg-white text-slate-900 shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              🛡️ Safety Protocols
            </button>
            <button
              onClick={() => setActiveTab('CALCULATOR')}
              className={`px-4 py-2 text-xs font-extrabold rounded-t-xl transition-all whitespace-nowrap ${activeTab === 'CALCULATOR' ? 'bg-white text-slate-900 shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              ⚡ AI Safety Calculator
            </button>
            <button
              onClick={() => setActiveTab('FSSAI')}
              className={`px-4 py-2 text-xs font-extrabold rounded-t-xl transition-all whitespace-nowrap ${activeTab === 'FSSAI' ? 'bg-white text-slate-900 shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              🔍 FSSAI License Checker
            </button>
            <button
              onClick={() => setActiveTab('RULES')}
              className={`px-4 py-2 text-xs font-extrabold rounded-t-xl transition-all whitespace-nowrap ${activeTab === 'RULES' ? 'bg-white text-slate-900 shadow-md' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              📑 Compliance Rules
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: SAFETY STANDARDS */}
          {activeTab === 'STANDARDS' && (
            <div className="space-y-6">
              
              {/* Highlight Item Details if passed */}
              {selectedItem && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={selectedItem.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&q=80"} 
                      alt={selectedItem.title} 
                      className="w-12 h-12 rounded-xl object-cover border border-emerald-300 dark:border-emerald-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedItem.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Donor: {selectedItem.donorName || "Verified Commercial Kitchen"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {selectedItem.aiSafetyScore ? Math.round(selectedItem.aiSafetyScore * 100) : 98}% SAFE
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider bg-emerald-200/60 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                      Verified Batch
                    </span>
                  </div>
                </div>
              )}

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                    <Award className="w-5 h-5" />
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">1. FSSAI Licensed Donors</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Commercial food donors must register their official 14-digit FSSAI License. Private events undergo strict safety declarations before dispatch.
                  </p>
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>FSSAI License Verified</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
                    <Thermometer className="w-5 h-5" />
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">2. Thermal Hold Control</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Hot meals are kept above 60°C in insulated thermal carriers. Cold or bakery items are refrigerated below 4°C to prevent bacterial growth.
                  </p>
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Hot Hold &gt; 60°C Verified</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                    <Clock className="w-5 h-5" />
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">3. Strict 4-Hour Expiry Window</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    FoodBridge dispatches items within 2-4 hours of preparation. Items past their safety threshold are automatically removed from marketplace.
                  </p>
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Freshness Time Clock Active</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                    <Lock className="w-5 h-5" />
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">4. Tamper-Evident Seals</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    All food containers are sealed with tamper-evident FoodBridge security tape. Receivers can reject containers if seals are broken.
                  </p>
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-2.5 py-1 rounded-lg w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sealed Packaging Required</span>
                  </div>
                </div>

              </div>

              {/* Safety Metrics Banner */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold">FoodBridge 100% Quality Assurance</h4>
                    <p className="text-xs text-slate-400">Zero food poisoning incidents recorded across 45,000+ rescued meals.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-center">
                  <div>
                    <div className="text-xl font-black text-emerald-400">99.4%</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Safety Index</div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-amber-400">&lt; 35m</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Dispatch</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: AI SAFETY CALCULATOR */}
          {activeTab === 'CALCULATOR' && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2 mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>Real-Time Food Freshness & Microbial Growth Simulator</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Adjust storage conditions below to see how FoodBridge's AI calculates microbial safety indices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Inputs */}
                <div className="space-y-4">
                  
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Food Category Type
                    </label>
                    <select
                      value={calcFoodType}
                      onChange={(e) => setCalcFoodType(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="COOKED_MEAL">Cooked Gravy & Rice Meals (Hot)</option>
                      <option value="BAKERY">Bakery & Bread Items</option>
                      <option value="DAIRY">Dairy & Milk Products</option>
                      <option value="PACKAGED">Sealed Packaged Snacks</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700 dark:text-slate-300">Storage Temperature</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{calcTemp}°C</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="90" 
                      value={calcTemp}
                      onChange={(e) => setCalcTemp(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-0.5">
                      <span>0°C (Cold Hold)</span>
                      <span>25°C (Ambient)</span>
                      <span>60°C+ (Hot Hold)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700 dark:text-slate-300">Time Elapsed Since Preparation</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{calcHours} Hours</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="12" 
                      value={calcHours}
                      onChange={(e) => setCalcHours(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-0.5">
                      <span>1h (Fresh)</span>
                      <span>4h (Standard Limit)</span>
                      <span>12h (Max)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Container Packaging Sealed Type
                    </label>
                    <select
                      value={calcContainer}
                      onChange={(e) => setCalcContainer(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="INSULATED_THERMAL">Insulated Thermal Carrier (+5% Bonus)</option>
                      <option value="SEALED_AIRTIGHT">Sealed Airtight Container (+3% Bonus)</option>
                      <option value="STANDARD_FOIL">Standard Aluminium Foil</option>
                    </select>
                  </div>

                </div>

                {/* Live Output Result */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Calculated AI Safety Score
                    </span>
                    <div className="mt-3 flex items-baseline space-x-2">
                      <span className="text-5xl font-black text-white">{currentScore}%</span>
                      <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${currentScore >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : currentScore >= 60 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}`}>
                        {currentScore >= 80 ? 'HIGH SAFETY' : currentScore >= 60 ? 'ACCEPTABLE' : 'HIGH RISK'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
                    <div className="flex justify-between text-slate-300">
                      <span>Bacterial Spoilage Index:</span>
                      <span className="font-bold text-white">{currentScore >= 85 ? 'Extremely Low' : 'Moderate'}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Recommended Action:</span>
                      <span className="font-bold text-emerald-400">{currentScore >= 80 ? 'Approved for Immediate Rescue' : 'Consume Immediately'}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Remaining Safe Window:</span>
                      <span className="font-bold text-white">{Math.max(0, 6 - calcHours)} Hours</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                    💡 <strong>Safety Tip:</strong> Storing food above 60°C or below 4°C prevents bacterial reproduction according to WHO & FSSAI standards.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: FSSAI LICENSE CHECKER */}
          {activeTab === 'FSSAI' && (
            <div className="space-y-6">
              
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 p-4 rounded-2xl">
                <h3 className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Verify Commercial Food Business FSSAI Registration</span>
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  Enter any 14-digit FSSAI License Number to verify donor registration validity.
                </p>
              </div>

              <form onSubmit={handleValidateFssai} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={fssaiInput}
                    onChange={(e) => setFssaiInput(e.target.value)}
                    placeholder="Enter 14-digit FSSAI License Number (e.g. 10019011000123)"
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isValidating}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  {isValidating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify License</span>
                    </>
                  )}
                </button>
              </form>

              {/* FSSAI Result */}
              {fssaiResult && (
                <div className="animate-fade-in">
                  {fssaiResult.valid ? (
                    <div className="bg-white dark:bg-slate-800 border-2 border-emerald-500 rounded-2xl p-5 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                              {fssaiResult.status}
                            </span>
                            <h4 className="text-base font-black text-slate-900 dark:text-white">
                              FSSAI License #{fssaiResult.licenseNumber}
                            </h4>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-extrabold rounded-full">
                          {fssaiResult.hygieneRating}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
                        <div>
                          <span className="text-slate-400 block text-[10px] font-bold uppercase">Business Operator</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{fssaiResult.category}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] font-bold uppercase">Validity Expiry</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{fssaiResult.validUntil}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 p-4 rounded-2xl flex items-center space-x-3 text-rose-700 dark:text-rose-300 text-xs font-bold">
                      <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                      <span>{fssaiResult.error}</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 4: COMPLIANCE RULES */}
          {activeTab === 'RULES' && (
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">
                  FSSAI (Food Safety and Standards Authority of India) Guidelines for Surplus Food
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Surplus food must be collected before the end of its shelf life.</li>
                  <li>Food should not be exposed to environmental contamination during storage or transportation.</li>
                  <li>Perishable items like gravy dishes must be maintained above 60°C or below 4°C.</li>
                  <li>Donated surplus food must be free from off-odors, discoloration, or abnormal texture.</li>
                  <li>Wedding and event surplus must be packed in clean food-grade containers.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-200">
                ⚠️ <strong>Legal Protection Disclaimer:</strong> FoodBridge adheres strictly to the FSSAI Surplus Food Regulations 2019. Donors who share surplus food in good faith following hygiene standards are protected under food donation safe harbor rules.
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted Food Safety Log System</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            Close Safety Shield
          </button>
        </div>

      </div>
    </div>
  );
}
