import React from 'react';
import { Award, Flame, Trophy, Star, Users, HeartHandshake, ShieldCheck, MessageSquare, ThumbsUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CommunityPage() {
  const leaderboard = [
    { rank: 1, name: 'Rahul Sharma', points: 4850, streak: 14, meals: '1,240 meals', badge: 'Zero Waste Champion' },
    { rank: 2, name: 'Priya Patel', points: 3920, streak: 9, meals: '980 meals', badge: 'Top Volunteer' },
    { rank: 3, name: 'Aarav Mehta', points: 3410, streak: 7, meals: '820 meals', badge: 'Rescue Hero' },
    { rank: 4, name: 'Ananya Sen', points: 2890, streak: 5, meals: '650 meals', badge: '100 Meals Saved' },
  ];

  const badges = [
    { title: 'First Rescue', desc: 'Completed 1st surplus pickup', unlocked: true, icon: Star },
    { title: '100 Meals Saved', desc: 'Rescued 100+ meals for shelters', unlocked: true, icon: Trophy },
    { title: 'Zero Waste Champion', desc: '14-day consecutive rescue streak', unlocked: true, icon: Flame },
    { title: 'Community Hero', desc: 'Referred 5 restaurants to platform', unlocked: false, icon: Award }
  ];

  const triggerCelebration = () => {
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 text-white shadow-2xl">
        <div>
          <div className="flex items-center space-x-2 text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>Active Rescue Streak: 14 Days Active</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Community & Leaderboard</h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 font-medium">Earn FoodBridge Coins, unlock badges, and rank up by rescuing surplus food.</p>
        </div>
        <button
          onClick={triggerCelebration}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs shadow-lg self-start md:self-auto transition-transform hover:scale-105"
        >
          🎉 Claim Daily Streak Reward (+50 Coins)
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leaderboard Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <span>Volunteer Leaderboard</span>
            </h2>
            <span className="text-xs font-bold text-slate-400">Updated Hourly</span>
          </div>

          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 transition-all hover:bg-emerald-50/50"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm ${
                    user.rank === 1 ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}>
                    #{user.rank}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{user.name}</h4>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      {user.badge}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="font-extrabold text-slate-900 dark:text-white">{user.points} Coins</div>
                  <div className="text-[10px] text-slate-500 font-semibold">{user.meals} • 🔥 {user.streak}d streak</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-emerald-500" />
            <span>Achievement Badges</span>
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {badges.map((b) => {
              const IconComponent = b.icon;
              return (
                <div
                  key={b.title}
                  className={`p-3.5 rounded-2xl border text-center space-y-2 transition-all ${
                    b.unlocked
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl mx-auto flex items-center justify-center ${
                    b.unlocked ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-300 text-slate-500'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold line-clamp-1">{b.title}</div>
                    <div className="text-[9.5px] font-medium leading-tight mt-0.5 line-clamp-2">{b.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
