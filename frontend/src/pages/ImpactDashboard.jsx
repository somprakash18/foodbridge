import React, { useState } from 'react';
import { 
  Menu, 
  ChevronDown, 
  ShoppingBag, 
  Scale, 
  Utensils, 
  Sun, 
  HelpCircle,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ImpactDashboard() {
  const navigate = useNavigate();

  const [city, setCity] = useState('PITTSBURGH');
  const [timeRange, setTimeRange] = useState('LAST 30 DAYS');

  // Dynamic impact metrics based on city & timeRange filters
  const impactData = {
    PITTSBURGH: {
      rescues: '2,834',
      pounds: '378,769',
      meals: '315,641',
      co2: '1.12M'
    },
    NEW_YORK: {
      rescues: '8,450',
      pounds: '1,240,500',
      meals: '1,033,750',
      co2: '3.65M'
    },
    MUMBAI: {
      rescues: '14,200',
      pounds: '2,150,000',
      meals: '1,791,666',
      co2: '6.42M'
    },
    DELHI: {
      rescues: '11,890',
      pounds: '1,820,400',
      meals: '1,517,000',
      co2: '5.20M'
    }
  };

  const currentMetrics = impactData[city] || impactData.PITTSBURGH;

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col items-center justify-start py-4 sm:py-8 px-4 antialiased">
      
      {/* Mobile Frame Container */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col min-h-[720px]">
        
        {/* Top Header */}
        <header className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
          <button 
            onClick={() => navigate('/')}
            className="text-[#4CAF50] hover:text-[#388E3C] transition-colors p-1"
            title="Go to Home"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <h1 className="text-base font-bold text-slate-800 tracking-tight">
            Impact
          </h1>

          <div className="w-6" /> {/* Spacer */}
        </header>

        {/* Filter Pill Controls */}
        <div className="px-5 py-4 grid grid-cols-2 gap-3 bg-white">
          
          {/* City Dropdown */}
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full appearance-none bg-slate-100 text-slate-800 font-bold text-[11px] px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none cursor-pointer tracking-wider pr-8"
            >
              <option value="PITTSBURGH">PITTSBURGH</option>
              <option value="NEW_YORK">NEW YORK</option>
              <option value="MUMBAI">MUMBAI</option>
              <option value="DELHI">DELHI</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Time Range Dropdown */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full appearance-none bg-slate-100 text-slate-800 font-bold text-[11px] px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none cursor-pointer tracking-wider pr-8"
            >
              <option value="LAST 30 DAYS">LAST 30 DAYS</option>
              <option value="LAST 7 DAYS">LAST 7 DAYS</option>
              <option value="THIS YEAR">THIS YEAR</option>
              <option value="ALL TIME">ALL TIME</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>

        </div>

        {/* Cards Container */}
        <div className="p-5 space-y-4 flex-1 overflow-y-auto">
          
          {/* Card 1: Rescues (Green) */}
          <div className="bg-[#4CAF50] rounded-2xl p-5 text-white relative overflow-hidden shadow-sm transition-all hover:scale-[1.01]">
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1">
              {currentMetrics.rescues}
            </div>
            <div className="text-sm font-semibold opacity-95">
              Rescues
            </div>
            
            {/* Watermark Icon */}
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
              Pounds of food
            </div>
            
            {/* Watermark Icon */}
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
                Meals
              </div>
              <HelpCircle className="w-4 h-4 opacity-80" />
            </div>
            
            {/* Watermark Icon */}
            <div className="absolute right-4 bottom-3 opacity-20 pointer-events-none">
              <Utensils className="w-20 h-20 text-white" />
            </div>
          </div>

          {/* Card 4: Lbs. of CO2 Prevented (Cyan/Sky Blue) */}
          <div className="bg-[#26C6DA] rounded-2xl p-5 text-white relative overflow-hidden shadow-sm transition-all hover:scale-[1.01]">
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-1">
              {currentMetrics.co2}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold opacity-95">
                Lbs. of CO2 Prevented
              </div>
              <HelpCircle className="w-4 h-4 opacity-80" />
            </div>
            
            {/* Watermark Icon */}
            <div className="absolute right-4 bottom-3 opacity-20 pointer-events-none">
              <Sun className="w-20 h-20 text-white" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
