import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, ShieldCheck, Lock, X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RazorpayModal({ isOpen, onClose, amount = 375, listingId, onSuccess }) {
  const { buyListing } = useApp();
  const [method, setMethod] = useState('UPI');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      buyListing(listingId, method);
      if (onSuccess) onSuccess();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Razorpay Branded Top bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              RZP
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Razorpay Secure</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Pay ₹{amount.toLocaleString('en-IN')}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">Payment Successful!</h4>
            <p className="text-xs text-slate-500">Transaction ID: RZP-TXN-{Math.floor(100000 + Math.random() * 900000)}</p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-soft"
            >
              View Order Confirmation
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setMethod('UPI')}
                className={`p-3 rounded-2xl border text-center transition-all ${method === 'UPI' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
              >
                <Smartphone className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">GPay / PhonePe</span>
              </button>
              <button
                onClick={() => setMethod('CARD')}
                className={`p-3 rounded-2xl border text-center transition-all ${method === 'CARD' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">Cards</span>
              </button>
              <button
                onClick={() => setMethod('NETBANKING')}
                className={`p-3 rounded-2xl border text-center transition-all ${method === 'NETBANKING' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
              >
                <Building className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">NetBanking</span>
              </button>
            </div>

            {/* Input Mock */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              {method === 'UPI' && (
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Enter VPA / UPI ID</label>
                  <input
                    type="text"
                    defaultValue="user@okaxis"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {method === 'CARD' && (
                <div className="space-y-2">
                  <input type="text" placeholder="Card Number (4532 •••• •••• 8901)" className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-sm font-semibold" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="MM/YY" className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-sm font-semibold" />
                    <input type="password" placeholder="CVV" className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-sm font-semibold" />
                  </div>
                </div>
              )}
              {method === 'NETBANKING' && (
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Select Bank</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-sm font-semibold">
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India (SBI)</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-soft flex items-center justify-center space-x-2 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>{processing ? 'Authorizing Payment...' : `Pay ₹${amount.toLocaleString('en-IN')} Now`}</span>
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>256-Bit SSL Encrypted by Razorpay</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
