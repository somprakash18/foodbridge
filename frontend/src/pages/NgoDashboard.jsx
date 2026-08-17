import React, { useState, useEffect } from 'react';
import { Leaf, Clock, Check, X, ShieldCheck, CheckCircle2, HeartHandshake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function NgoDashboard() {
  const { user } = useAuth();

  // Live Digital Clock state
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // State for donations list
  const [pendingDonations, setPendingDonations] = useState([
    { id: 1, restaurant: 'Foodies Hub', food: 'Biryani', qty: '20 Plates', time: '2:00 PM' },
    { id: 2, restaurant: 'Cedar Street Bakery', food: 'Assorted Pastries', qty: '15 Boxes', time: '3:30 PM' }
  ]);

  const [historyDonations, setHistoryDonations] = useState([
    { id: 101, restaurant: 'Green Leaf Grocers', food: 'Fresh Produce', qty: '30 kg', time: '11:15 AM', status: 'Accepted', pickup: 'Picked Up' },
    { id: 102, restaurant: 'Marco\'s Trattoria', food: 'Pasta & Sauce', qty: '25 Servings', time: '12:45 PM', status: 'Accepted', pickup: 'Scheduled' }
  ]);

  const [counts, setCounts] = useState({
    pending: 2,
    accepted: 2,
    rejected: 0,
    picked: 1
  });

  const handleAccept = (donation) => {
    setPendingDonations(pendingDonations.filter(d => d.id !== donation.id));
    setHistoryDonations([
      { ...donation, status: 'Accepted', pickup: 'Scheduled' },
      ...historyDonations
    ]);
    setCounts(prev => ({
      ...prev,
      pending: prev.pending - 1,
      accepted: prev.accepted + 1
    }));
  };

  const handleReject = (donation) => {
    setPendingDonations(pendingDonations.filter(d => d.id !== donation.id));
    setCounts(prev => ({
      ...prev,
      pending: prev.pending - 1,
      rejected: prev.rejected + 1
    }));
  };

  return (
    <div className="min-h-screen bg-[#DDE9D9] font-sans flex flex-col justify-between antialiased">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER BAR */}
      {/* ------------------------------------------------------------- */}
      <header className="bg-[#1C3D28] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#346644] flex items-center justify-center text-emerald-300">
            <Leaf className="w-4 h-4" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F8EE]">
            FoodBridge – NGO Dashboard
          </h1>
        </div>

        {/* Live Digital Clock */}
        <div className="bg-[#2D553A] text-slate-200 text-xs font-mono font-bold px-3.5 py-1.5 rounded-lg border border-[#3C6B4A] shadow-inner">
          {timeString || '7:42:20 AM'}
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CENTERED CARD CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#CDE0C6] space-y-8">
          
          {/* 4 Status Counter Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[#F3F8F1] border border-[#D3E5CC] rounded-full py-2 px-4 flex items-center justify-center space-x-2 text-xs font-bold text-[#1C3D28]">
              <span>Pending 🍽️ :</span>
              <span className="text-[#2D553A] font-extrabold">{counts.pending}</span>
            </div>

            <div className="bg-[#F3F8F1] border border-[#D3E5CC] rounded-full py-2 px-4 flex items-center justify-center space-x-2 text-xs font-bold text-[#1C3D28]">
              <span>Accepted 💚 :</span>
              <span className="text-[#2D553A] font-extrabold">{counts.accepted}</span>
            </div>

            <div className="bg-[#F3F8F1] border border-[#D3E5CC] rounded-full py-2 px-4 flex items-center justify-center space-x-2 text-xs font-bold text-[#1C3D28]">
              <span>Rejected ❌ :</span>
              <span className="text-rose-600 font-extrabold">{counts.rejected}</span>
            </div>

            <div className="bg-[#F3F8F1] border border-[#D3E5CC] rounded-full py-2 px-4 flex items-center justify-center space-x-2 text-xs font-bold text-[#1C3D28]">
              <span>Picked ✅ :</span>
              <span className="text-[#2D553A] font-extrabold">{counts.picked}</span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* PENDING DONATIONS SECTION */}
          {/* ------------------------------------------------------------- */}
          <div className="space-y-4">
            <h2 className="text-center text-lg font-extrabold text-[#1C3D28]">
              Pending Donations
            </h2>

            <div className="rounded-xl border border-[#CDE0C6] overflow-hidden shadow-xs">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#C5DFB9] text-[#1C3D28] text-xs font-extrabold uppercase">
                    <th className="py-2.5 px-3 border-r border-[#B3D4A4]">Restaurant</th>
                    <th className="py-2.5 px-3 border-r border-[#B3D4A4]">Food</th>
                    <th className="py-2.5 px-3 border-r border-[#B3D4A4]">Qty</th>
                    <th className="py-2.5 px-3 border-r border-[#B3D4A4]">Time</th>
                    <th className="py-2.5 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2EEDC] text-xs font-semibold text-slate-700">
                  {pendingDonations.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-6 text-slate-400 text-xs italic">
                        No pending donations right now
                      </td>
                    </tr>
                  ) : (
                    pendingDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-[#F8FAF6] transition-colors">
                        <td className="py-3 px-3 border-r border-[#F0F6EC] font-bold text-[#1C3D28]">{d.restaurant}</td>
                        <td className="py-3 px-3 border-r border-[#F0F6EC]">{d.food}</td>
                        <td className="py-3 px-3 border-r border-[#F0F6EC] font-bold text-slate-800">{d.qty}</td>
                        <td className="py-3 px-3 border-r border-[#F0F6EC] text-slate-600">{d.time}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleAccept(d)}
                              className="px-3.5 py-1.5 rounded-md bg-[#255234] hover:bg-[#1C3D28] text-white text-xs font-bold transition-all shadow-xs"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(d)}
                              className="px-3.5 py-1.5 rounded-md bg-[#C83434] hover:bg-[#A62727] text-white text-xs font-bold transition-all shadow-xs"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* DONATION HISTORY SECTION */}
          {/* ------------------------------------------------------------- */}
          <div className="space-y-4 pt-2">
            <h2 className="text-center text-lg font-extrabold text-[#1C3D28]">
              Donation History
            </h2>

            <div className="rounded-xl border border-[#CDE0C6] overflow-hidden shadow-xs">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#C5DFB9] text-[#1C3D28] text-xs font-extrabold uppercase">
                    <th className="py-2.5 px-3 border-r border-[#B3D4A4]">Restaurant</th>
                    <th className="py-2.5 px-3 border-r border-[#B3D4A4]">Food</th>
                    <th className="py-2.5 px-3 border-r border-[#B3D4A4]">Qty</th>
                    <th className="py-2.5 px-3 border-r border-[#B3D4A4]">Time</th>
                    <th className="py-2.5 px-3 border-r border-[#B3D4A4]">Status</th>
                    <th className="py-2.5 px-3">Pickup</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2EEDC] text-xs font-semibold text-slate-700">
                  {historyDonations.map((h) => (
                    <tr key={h.id} className="hover:bg-[#F8FAF6] transition-colors">
                      <td className="py-3 px-3 border-r border-[#F0F6EC] font-bold text-[#1C3D28]">{h.restaurant}</td>
                      <td className="py-3 px-3 border-r border-[#F0F6EC]">{h.food}</td>
                      <td className="py-3 px-3 border-r border-[#F0F6EC] font-bold text-slate-800">{h.qty}</td>
                      <td className="py-3 px-3 border-r border-[#F0F6EC] text-slate-600">{h.time}</td>
                      <td className="py-3 px-3 border-r border-[#F0F6EC]">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#E2F0D9] text-[#2E5B27]">
                          {h.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                          h.pickup === 'Picked Up' ? 'bg-[#D2EBD4] text-[#1F5425]' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {h.pickup}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER BAR */}
      {/* ------------------------------------------------------------- */}
      <footer className="bg-[#1C3D28] text-[#C5DFB9] py-3 text-center text-xs font-medium border-t border-[#295237]">
        © 2026 FoodBridge – Connecting Restaurants & NGOs for a Better Tomorrow 🌏
      </footer>

    </div>
  );
}
