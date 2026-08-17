import React from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, FileText, ChevronRight } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-300 flex items-center justify-center mx-auto">
          <HelpCircle className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Help & Support Center</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Got questions about food safety guidelines, FSSAI compliance, Razorpay wallet payouts, or delivery QR verification?
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
        {[
          { q: 'How does FoodBridge verify food safety before distribution?', a: 'Our built-in OpenAI Food Safety Engine checks storage temperatures, time prepared, and sealed packaging standards to produce an AI Safety Score before any listing goes live.' },
          { q: 'How do NGOs receive free food donations?', a: 'Verified NGOs receive geo-fenced push alerts for 100% free surplus listings. They can reserve items instantly and assign a volunteer for pickup.' },
          { q: 'How does QR pickup verification work?', a: 'The restaurant generates a unique QR code for each order. The delivery driver or NGO volunteer scans the QR code via their app camera to confirm pickup.' }
        ].map((faq, i) => (
          <div key={i} className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{faq.q}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
