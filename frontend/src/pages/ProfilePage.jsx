import React, { useState } from 'react';
import { Camera, ShieldCheck, Award, Utensils, HeartHandshake, ShoppingBag, Edit3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    updateUserProfile({ name, phone });
    setEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header with Cover */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 shadow-soft">
        
        {/* Cover Photo */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-800">
          <img
            src={user?.coverUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"}
            alt="Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <button className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/80 text-white hover:bg-slate-900 transition-colors backdrop-blur-md text-xs font-semibold flex items-center space-x-1.5">
            <Camera className="w-4 h-4" />
            <span>Edit Cover</span>
          </button>
        </div>

        {/* Profile Avatar & Info */}
        <div className="p-6 sm:p-8 relative pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div className="relative">
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80"}
                alt="Avatar"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-white dark:border-slate-900 shadow-lg"
              />
              <button className="absolute bottom-2 right-2 p-2 rounded-full bg-brand-600 text-white shadow-soft hover:bg-brand-700">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setEditing(!editing)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center space-x-1.5"
            >
              <Edit3 className="w-4 h-4" />
              <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          {editing ? (
            <div className="space-y-4 max-w-md">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 font-bold"
                />
              </div>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-soft"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{user?.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                  {user?.verificationBadge || 'VERIFIED'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{user?.email} • {user?.phone} • Role: {user?.role}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
