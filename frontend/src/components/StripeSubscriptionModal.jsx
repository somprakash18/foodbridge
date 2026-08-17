import React, { useState } from 'react';
import { X, Check, CreditCard, ShieldCheck, Zap, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StripeSubscriptionModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('STARTER');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const PLANS = [
    {
      key: 'STARTER',
      name: 'Starter Plan',
      price: '₹1,999',
      period: '/ month',
      subtitle: 'Single restaurant or bakery',
      features: [
        'Unlimited surplus food listings',
        'Automated NGO route matching',
        'Instant Tax-Deduction PDF receipts',
        'Standard 24h wallet payouts',
      ]
    },
    {
      key: 'GROWTH',
      name: 'Growth Plan',
      price: '₹6,999',
      period: '/ month',
      subtitle: 'Hotels & multi-branch chains',
      popular: true,
      features: [
        'Everything in Starter',
        'Priority AI route & safety scoring',
        'Automated ESG CO2 & Impact PDF reports',
        'Dedicated multi-branch dashboard',
        'Same-day express wallet payouts'
      ]
    },
    {
      key: 'ENTERPRISE',
      name: 'Enterprise Plan',
      price: 'Custom',
      period: 'pricing',
      subtitle: 'Supermarket chains & franchises',
      features: [
        'Everything in Growth',
        'Custom Spring Boot API integration',
        'Dedicated account manager & SLA',
        'Multi-city automated dispatch'
      ]
    }
  ];

  const handleStripeCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-8 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 uppercase tracking-widest">
              Stripe Secure Subscription
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">Upgrade FoodBridge Business Tier</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {successMsg ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <Check className="w-10 h-10 animate-bounce" />
            </div>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">Stripe Subscription Activated!</h4>
            <p className="text-xs text-slate-500">Your restaurant tier is now active. Tax-deduction receipts & priority dispatch enabled.</p>
          </div>
        ) : (
          <>
            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.key;
                return (
                  <div
                    key={plan.key}
                    onClick={() => setSelectedPlan(plan.key)}
                    className={`relative p-5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-brand-500 shadow-soft-lg ring-2 ring-brand-500/50'
                        : 'bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-gradient-to-r from-brand-600 to-emerald-500 text-white shadow-sm">
                        MOST POPULAR
                      </span>
                    )}

                    <div className="text-xs font-extrabold uppercase text-brand-500 tracking-wider mb-1">{plan.name}</div>
                    <div className="flex items-baseline space-x-1 mb-1">
                      <span className="text-2xl font-extrabold">{plan.price}</span>
                      <span className="text-[11px] opacity-70">{plan.period}</span>
                    </div>
                    <p className="text-[11px] opacity-60 mb-4">{plan.subtitle}</p>

                    <div className="space-y-2 text-xs border-t border-slate-200/20 pt-3">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-start space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug opacity-90">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checkout CTA */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleStripeCheckout}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-600 hover:from-brand-800 hover:to-emerald-700 text-white font-extrabold text-sm shadow-soft-lg flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>{isProcessing ? 'Connecting to Stripe Checkout...' : `Subscribe via Stripe (${selectedPlan} Plan)`}</span>
              </button>
              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Encrypted 256-bit SSL Stripe Checkout. Cancel or switch plans anytime.</span>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
