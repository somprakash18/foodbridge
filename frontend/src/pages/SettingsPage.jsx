import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Bell, 
  Globe, 
  Moon, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2, 
  Camera,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPage() {
  const { user, setUser, lang, setLanguage } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Som Prakash',
    email: user?.email || 'somprakash@foodbridge.org',
    phone: user?.phone || '+91 98765 43210',
    currentPassword: '',
    newPassword: '',
    pushNotifs: true,
    emailNotifs: true,
    smsNotifs: false,
    whatsappNotifs: true,
    googleLinked: true,
    twoFactor: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    }));

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Account Settings & Security
        </h1>
        <p className="text-xs text-slate-500 mt-1">Manage your profile, login credentials, privacy, and notifications</p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Section 1: Profile Information & Avatar Upload */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span>Profile Information</span>
          </h2>

          <div className="flex items-center space-x-5">
            <div className="relative">
              <img src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'} alt="Profile Avatar" className="w-20 h-20 rounded-3xl object-cover border-2 border-emerald-500 shadow-md" />
              <button
                type="button"
                onClick={() => alert("Upload feature ready! Select an image from your device.")}
                className="absolute bottom-0 right-0 p-1.5 rounded-xl bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{formData.name}</h3>
              <p className="text-xs text-slate-500 font-medium">Role: {user?.role || 'RESTAURANT'}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200">
                VERIFIED ACCOUNT
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Password & Account Security */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <span>Security & Authentication</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Google OAuth Account Linked</div>
              <div className="text-slate-500">Fast sign-in enabled with {formData.email}</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">LINKED</span>
          </div>
        </div>

        {/* Section 3: Preferences (Language, Notifications, Dark Mode) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            <span>App Preferences & Notifications</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-2">Display Language</label>
              <select
                value={lang}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white outline-none"
              >
                <option value="EN">English</option>
                <option value="HI">हिंदी (Hindi)</option>
                <option value="BN">বাংলা (Bengali)</option>
                <option value="TA">தமிழ் (Tamil)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-2">Theme Mode</label>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white flex items-center justify-between"
              >
                <span>Current Mode: {theme.toUpperCase()}</span>
                <Moon className="w-4 h-4 text-emerald-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs flex items-center space-x-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl transition-transform hover:scale-105"
          >
            Save All Settings
          </button>
        </div>

      </form>

      {/* Delete Account Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 space-y-4 border border-rose-200 dark:border-rose-900 text-center shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-rose-600 mx-auto" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Delete Account?</h3>
            <p className="text-xs text-slate-500">This action is permanent and will delete all your donation history and wallet balance.</p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 font-bold text-xs">Cancel</button>
              <button onClick={() => { alert("Account deleted."); setDeleteModalOpen(false); }} className="px-4 py-2 rounded-xl bg-rose-600 text-white font-extrabold text-xs">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
