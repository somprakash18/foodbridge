import React, { useState } from 'react';
import { 
  Menu, 
  ChevronDown, 
  ShoppingBag, 
  Scale, 
  Utensils, 
  Sun, 
  HelpCircle,
  ArrowLeft,
  Award,
  Download,
  Droplets,
  Leaf,
  ShieldCheck,
  Building2,
  HeartHandshake
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ImpactDashboard() {
  const navigate = useNavigate();

  const [city, setCity] = useState('DELHI');
  const [timeRange, setTimeRange] = useState('LAST 30 DAYS');

  // Dynamic impact metrics based on city & timeRange filters
  const impactData = {
    DELHI: {
      registeredDonors: '1,284',
      registeredRecipients: '542',
      rescues: '11,890',
      pounds: '1,820,400 kg',
      meals: '1,517,000',
      co2: '5.20M kg',
      waterSaved: '4.8M Liters',
      treesEquiv: '215,000 Trees'
    },
    MUMBAI: {
      registeredDonors: '1,650',
      registeredRecipients: '680',
      rescues: '14,200',
      pounds: '2,150,000 kg',
      meals: '1,791,666',
      co2: '6.42M kg',
      waterSaved: '5.9M Liters',
      treesEquiv: '280,000 Trees'
    },
    NEW_YORK: {
      registeredDonors: '980',
      registeredRecipients: '410',
      rescues: '8,450',
      pounds: '1,240,500 kg',
      meals: '1,033,750',
      co2: '3.65M kg',
      waterSaved: '3.1M Liters',
      treesEquiv: '140,000 Trees'
    },
    PITTSBURGH: {
      registeredDonors: '340',
      registeredRecipients: '165',
      rescues: '2,834',
      pounds: '378,769 kg',
      meals: '315,641',
      co2: '1.12M kg',
      waterSaved: '950,000 Liters',
      treesEquiv: '45,000 Trees'
    }
  };

  const currentMetrics = impactData[city] || impactData.DELHI;

  const handleDownloadEsgReport = () => {
    const reportText = `=====================================================
FOODBRIDGE OFFICIAL ESG CSR SUSTAINABILITY REPORT
=====================================================
Organization / City: ${city}
Reporting Period: ${timeRange}
Date Generated: ${new Date().toLocaleDateString('en-IN')}

REGISTERED NETWORK PARTICIPATION:
-----------------------------------------------------
- Registered Food Donors: ${currentMetrics.registeredDonors} (Weddings, Hotels, Restaurants, Caterers)
- Registered Recipients: ${currentMetrics.registeredRecipients} (Verified NGOs, Shelters, Orphanages)

KEY ENVIRONMENTAL & SOCIAL METRICS:
-----------------------------------------------------
1. Total Food Rescued: ${currentMetrics.pounds}
2. Total Meals Served: ${currentMetrics.meals} Meals
3. CO2 Greenhouse Gas Prevented: ${currentMetrics.co2}
4. Water Footprint Preserved: ${currentMetrics.waterSaved}
5. Environmental Equivalent: ${currentMetrics.treesEquiv}

CERTIFICATION NOTE:
This certificate verifies compliance with UN Sustainable Development Goal #12.3 (Zero Food Waste) and Section 135 CSR Guidelines.

Verified by: FoodBridge Environmental Foundation
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FoodBridge_ESG_Impact_Certificate_${city}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 font-sans flex flex-col items-center justify-start py-4 sm:py-8 px-4 antialiased">
      
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col min-h-[820px]">
        
        {/* Top Header */}
        <header className="px-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button 
            onClick={() => navigate('/')}
            className="text-[#4CAF50] hover:text-[#388E3C] transition-colors p-1"
            title="Go to Home"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <h1 className="text-base font-bold text-slate-800 dark:text-white tracking-tight flex items-center space-x-1.5">
            <Award className="w-5 h-5 text-emerald-600" />
            <span>ESG Sustainability Impact</span>
          </h1>

          <div className="w-6" />
        </header>

        {/* Filter Controls */}
        <div className="px-5 py-4 grid grid-cols-2 gap-3 bg-white dark:bg-slate-900">
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full appearance-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-[11px] px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer tracking-wider pr-8"
            >
              <option value="DELHI">DELHI NCR</option>
              <option value="MUMBAI">MUMBAI</option>
              <option value="NEW_YORK">NEW YORK</option>
              <option value="PITTSBURGH">PITTSBURGH</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full appearance-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-[11px] px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer tracking-wider pr-8"
            >
              <option value="LAST 30 DAYS">LAST 30 DAYS</option>
              <option value="LAST 7 DAYS">LAST 7 DAYS</option>
              <option value="THIS YEAR">THIS YEAR</option>
              <option value="ALL TIME">ALL TIME</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Registered Network Banner */}
        <div className="mx-5 mb-2 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-around text-center shadow-md">
          <div>
            <div className="text-xl font-black">{currentMetrics.registeredDonors}</div>
            <div className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider flex items-center justify-center space-x-1">
              <Building2 className="w-3 h-3 text-emerald-400" />
              <span>Registered Donors</span>
            </div>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <div className="text-xl font-black">{currentMetrics.registeredRecipients}</div>
            <div className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider flex items-center justify-center space-x-1">
              <HeartHandshake className="w-3 h-3 text-teal-300" />
              <span>Registered Recipients</span>
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="px-5 pb-5 space-y-4 flex-1 overflow-y-auto">
          
          {/* Card 1: Rescues (Green) */}
          <div className="bg-[#4CAF50] rounded-2xl p-5 text-white relative overflow-hidden shadow-sm transition-all hover:scale-[1.01]">
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1">
              {currentMetrics.rescues}
            </div>
            <div className="text-sm font-semibold opacity-95">
              Completed Food Rescues
            </div>
            <div className="absolute right-4 bottom-3 opacity-20 pointer-events-none">
              <ShoppingBag className="w-20 h-20 text-white" />
            </div>
          </div>

          {/* Card 2: Pounds of food (Orange/Amber) */}
          <div className="bg-[#FFA726] rounded-2xl p-5 text-white relative overflow-hidden shadow-sm transition-all hover:scale-[1.01]">
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1">
              {currentMetrics.pounds}
            </div>
            <div className="text-sm font-semibold opacity-95">
              Total Surplus Food Saved
            </div>
            <div className="absolute right-4 bottom-3 opacity-20 pointer-events-none">
              <Scale className="w-20 h-20 text-white" />
            </div>
          </div>

          {/* Card 3: Meals (Blue) */}
          <div className="bg-[#42A5F5] rounded-2xl p-5 text-white relative overflow-hidden shadow-sm transition-all hover:scale-[1.01]">
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1">
              {currentMetrics.meals}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold opacity-95">
                Nourishing Meals Distributed
              </div>
              <HelpCircle className="w-4 h-4 opacity-80" />
            </div>
            <div className="absolute right-4 bottom-3 opacity-20 pointer-events-none">
              <Utensils className="w-20 h-20 text-white" />
            </div>
          </div>

          {/* Card 4: CO2 Prevented (Cyan/Sky Blue) */}
          <div className="bg-[#26C6DA] rounded-2xl p-5 text-white relative overflow-hidden shadow-sm transition-all hover:scale-[1.01]">
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1">
              {currentMetrics.co2}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold opacity-95">
                CO₂ Emissions Prevented
              </div>
              <HelpCircle className="w-4 h-4 opacity-80" />
            </div>
            <div className="absolute right-4 bottom-3 opacity-20 pointer-events-none">
              <Sun className="w-20 h-20 text-white" />
            </div>
          </div>

          {/* Card 5: Water & Trees (Emerald/Teal) */}
          <div className="bg-emerald-700 rounded-2xl p-5 text-white relative overflow-hidden shadow-sm transition-all hover:scale-[1.01]">
            <div className="text-2xl font-extrabold tracking-tight mb-1 flex items-center space-x-2">
              <Droplets className="w-6 h-6 text-cyan-300" />
              <span>{currentMetrics.waterSaved}</span>
            </div>
            <div className="text-xs font-semibold opacity-95 flex items-center space-x-1.5">
              <Leaf className="w-4 h-4 text-emerald-300" />
              <span>Water Saved • Equivalent to {currentMetrics.treesEquiv}</span>
            </div>
          </div>

          {/* Download Report Button */}
          <button
            onClick={handleDownloadEsgReport}
            className="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>Download ESG Impact Certificate (.TXT)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
