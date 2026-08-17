import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, HeartHandshake, ShieldCheck, Leaf, Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-emerald-400 flex items-center justify-center text-white font-extrabold text-xl shadow-soft">
                🌱
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">FoodBridge</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Save Food. Feed People. Reduce Waste. Connect restaurants and hotels with verified NGOs and discount buyers before good food becomes waste.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800">
                <Leaf className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                46,125 kg CO₂ Prevented
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <HeartHandshake className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                18,450 Meals Saved
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Portals</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/restaurant" className="hover:text-brand-400 transition-colors">Restaurant & Hotel Dashboard</Link></li>
              <li><Link to="/ngo" className="hover:text-brand-400 transition-colors">NGO Surplus Rescue</Link></li>
              <li><Link to="/buyer" className="hover:text-brand-400 transition-colors">Discount Meal Marketplace</Link></li>
              <li><Link to="/delivery" className="hover:text-brand-400 transition-colors">Delivery Partner App</Link></li>
              <li><Link to="/admin" className="hover:text-brand-400 transition-colors">Platform Admin Portal</Link></li>
            </ul>
          </div>

          {/* Core Features */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Core Technology</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/map" className="hover:text-brand-400 transition-colors">Real-Time Google Maps</Link></li>
              <li><span className="text-slate-400">AI Safety Assistant</span></li>
              <li><span className="text-slate-400">QR Pickup Verification</span></li>
              <li><Link to="/wallet" className="hover:text-brand-400 transition-colors">Razorpay & Wallet</Link></li>
              <li><Link to="/referral" className="hover:text-brand-400 transition-colors">Referral & Rewards</Link></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Contact & Support</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li className="flex items-center space-x-2 text-slate-400">
                <Mail className="w-4 h-4 text-brand-400" />
                <span>support@foodbridge.org</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-400">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 1800-FOOD-BRIDGE</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-400">
                <Globe className="w-4 h-4 text-brand-400" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 FoodBridge Technologies Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">FSSAI Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
