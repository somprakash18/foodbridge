import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  HeartHandshake, 
  Edit3, 
  Check, 
  Trophy, 
  Sparkles, 
  Flame 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Som Prakash',
    email: user?.email || 'somprakash@foodbridge.org',
    phone: user?.phone || '+91 98765 43210',
    address: 'Connaught Place B-Block, New Delhi, 110001',
    role: user?.role || 'RESTAURANT',
    joinedDate: 'August 2026',
    mealsRescued: 315,
    co2SavedKg: 124.5,
    waterSavedLiters: 890
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone
    }));
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={profileData.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-white/30 shadow-xl"
          />

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h1 className="text-2xl font-black">{profileData.name}</h1>
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <p className="text-xs text-emerald-100 font-semibold">{profileData.email} • {profileData.phone}</p>
            
            <div className="flex items-center justify-center sm:justify-start space-x-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                {profileData.role}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold flex items-center space-x-1">
                <Flame className="w-3 h-3 fill-slate-900" />
                <span>14 Day Streak</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs flex items-center space-x-1.5 backdrop-blur-md"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Quick Impact Stats */}
        <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black">{profileData.mealsRescued}</div>
            <div className="text-[10px] text-emerald-200 uppercase font-bold">Meals Rescued</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black">{profileData.co2SavedKg} kg</div>
            <div className="text-[10px] text-emerald-200 uppercase font-bold">CO₂ Reduced</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black">{profileData.waterSavedLiters} L</div>
            <div className="text-[10px] text-emerald-200 uppercase font-bold">Water Saved</div>
          </div>
        </div>
      </div>

      {/* Main Profile Info / Edit Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span>Personal & Account Details</span>
          </h2>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-semibold">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">Primary Address</label>
              <input
                type="text"
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                required
              />
            </div>

            <button type="submit" className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-md">
              Save Profile Changes
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-medium">
            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">Email Address</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">{profileData.email}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">Phone Number</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">{profileData.phone}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">Primary Location</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">{profileData.address}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">Member Since</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">{profileData.joinedDate}</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
