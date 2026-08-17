import React, { useState } from 'react';
import { Gift, Copy, Share2, Award, Trophy, Users, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ReferralPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralCode = user?.referralCode || "FOODBRIDGE2026";
  const referralLink = `https://foodbridge.org/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Referral Hero */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-6 max-w-3xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-soft">
          <Gift className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Refer Restaurants & NGOs</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Invite local food businesses, hotels, or NGOs to join FoodBridge. Earn ₹50 wallet credits for every verified onboarding!
        </p>

        {/* Link Box */}
        <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center max-w-md mx-auto shadow-sm">
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 flex-1 truncate px-2">{referralLink}</span>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-soft flex items-center space-x-1"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Top Referrers Leaderboard</h2>
        </div>

        <div className="space-y-3">
          {[
            { rank: 1, name: 'Chef Maria D\'Souza', points: '42 Onboarded', reward: '₹2,100' },
            { rank: 2, name: 'Food Relief Foundation', points: '38 Onboarded', reward: '₹1,900' },
            { rank: 3, name: 'Aarav Mehta', points: '24 Onboarded', reward: '₹1,200' }
          ].map((item) => (
            <div key={item.rank} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${item.rank === 1 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                  #{item.rank}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h4>
                  <span className="text-[10px] text-slate-400">{item.points}</span>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{item.reward}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
