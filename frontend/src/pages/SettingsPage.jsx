import React from 'react';
import { Settings, Moon, Sun, Eye, Bell, Lock, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPage() {
  const { theme, toggleTheme, highContrast, toggleHighContrast } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center space-x-3">
        <Settings className="w-6 h-6 text-brand-600 dark:text-brand-400" />
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Account & Accessibility Settings</h1>
          <p className="text-xs text-slate-500">Configure theme, contrast, notifications, and security</p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Appearance Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">Appearance & Accessibility</h3>
          
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-slate-600" />}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Dark Theme Mode</h4>
                <p className="text-[11px] text-slate-500">Switch between light and dark UI interfaces</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${theme === 'dark' ? 'bg-brand-600' : 'bg-slate-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-brand-500" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">High Contrast Mode</h4>
                <p className="text-[11px] text-slate-500">Enhance text sharpness for screen readers & low vision</p>
              </div>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${highContrast ? 'bg-emerald-600' : 'bg-slate-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
