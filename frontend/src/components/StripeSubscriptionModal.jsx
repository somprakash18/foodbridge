import React, { useState } from 'react';
import { X, Check, CreditCard, ShieldCheck, Zap, Sparkles, Building2, HeartHandshake, Utensils } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StripeSubscriptionModal({ isOpen, onClose, initialRole = 'RESTAURANT' }) {
  const { user } = useAuth();
  const [roleType, setRoleType] = useState(initialRole === 'NGO' ? 'NGO' : 'RESTAURANT'); // 'RESTAURANT', 'NGO'
  const [billingCycle, setBillingCycle] = useState('MONTHLY'); // 'MONTHLY', 'YEARLY'
  const [selectedPlan, setSelectedPlan] = useState('STARTER');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const RESTAURANT_PLANS = [
    {
      key: 'STARTER',
      name: 'Starter Restaurant',
      monthlyPrice: '₹1,999',
      yearlyPrice: '₹1,599',
      periodMonthly: '/ month',
      periodYearly: '/ month (Billed ₹19,188/yr)',
      subtitle: 'Single restaurant, bakery or cafe',
      features: [
        'Unlimited surplus food listings',
        'Automated NGO route matching',
        'Instant Tax-Deduction 80G receipts',
        'Standard 24h wallet payouts'
      ]
    },
    {
      key: 'GROWTH',
      name: 'Growth Chain / Hotel',
      monthlyPrice: '₹6,999',
      yearlyPrice: '₹5,599',
      periodMonthly: '/ month',
      periodYearly: '/ month (Billed ₹67,188/yr)',
      subtitle: 'Multi-branch hotels & banquet chains',
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
      name: 'Enterprise Franchise',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      periodMonthly: 'pricing',
      periodYearly: 'annual contract',
      subtitle: 'Supermarket chains & franchises',
      features: [
        'Everything in Growth',
        'Custom Spring Boot API integration',
        'Dedicated account manager & SLA',
        'Multi-city automated dispatch'
      ]
    }
  ];

  const NGO_PLANS = [
    {
      key: 'NGO_FREE',
      name: 'Community NGO (Free)',
      monthlyPrice: '₹0',
      yearlyPrice: '₹0',
      periodMonthly: '/ forever',
      periodYearly: '/ forever',
      subtitle: 'Local community shelters & orphanages',
      features: [
        'Unlimited surplus food claims',
        'Real-time SMS & WhatsApp alerts',
        'Standard volunteer pickup assignment',
        'Basic receipt download'
      ]
    },
    {
      key: 'NGO_PRO',
      name: 'Express Rescue NGO Pro',
      monthlyPrice: '₹499',
      yearlyPrice: '₹399',
      periodMonthly: '/ month',
      periodYearly: '/ month (Billed ₹4,788/yr)',
      subtitle: 'Large regional shelters & food banks',
      popular: true,
      features: [
        'Everything in Free Plan',
        'Priority thermal van dispatch (Under 30 mins)',
        'Zero delivery fees on all claims',
        'Dedicated emergency SOS dispatch button',
        'Automated monthly impact certificate'
      ]
    }
  ];

  const currentPlans = roleType === 'RESTAURANT' ? RESTAURANT_PLANS : NGO_PLANS;

  const handleStripeCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        onClose();
      }, 2200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 uppercase tracking-widest">
              Stripe Secure Subscription
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              FoodBridge Business &amp; NGO Subscription
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role & Billing Cycle Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-100 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          
          {/* Role Toggle */}
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
            <button
              onClick={() => setRoleType('RESTAURANT')}
              className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-black rounded-lg transition-all flex items-center justify-center space-x-1.5 ${roleType === 'RESTAURANT' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Restaurant / Hotel Plans</span>
            </button>
            <button
              onClick={() => setRoleType('NGO')}
              className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-black rounded-lg transition-all flex items-center justify-center space-x-1.5 ${roleType === 'NGO' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>NGO / Shelter Plans</span>
            </button>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-center">
            <button
              onClick={() => setBillingCycle('MONTHLY')}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all ${billingCycle === 'MONTHLY' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('YEARLY')}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all flex items-center space-x-1 ${billingCycle === 'YEARLY' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <span>Yearly Billing</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">
                Save 20%
              </span>
            </button>
          </div>

        </div>

        {/* Success Screen */}
        {successMsg ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <Check className="w-10 h-10 animate-bounce" />
            </div>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {billingCycle === 'YEARLY' ? 'Yearly' : 'Monthly'} Subscription Activated!
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your {roleType === 'RESTAURANT' ? 'Restaurant Donor' : 'NGO Shelter'} plan is now active. Tax-deduction receipts, priority dispatch, and ESG reports enabled.
            </p>
          </div>
        ) : (
          <>
            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentPlans.map((plan) => {
                const isSelected = selectedPlan === plan.key;
                const priceDisplay = billingCycle === 'YEARLY' ? plan.yearlyPrice : plan.monthlyPrice;
                const periodDisplay = billingCycle === 'YEARLY' ? plan.periodYearly : plan.periodMonthly;

                return (
                  <div
                    key={plan.key}
                    onClick={() => setSelectedPlan(plan.key)}
                    className={`relative p-5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-emerald-500 shadow-xl ring-2 ring-emerald-500/50'
                        : 'bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-sm">
                        MOST POPULAR
                      </span>
                    )}

                    <div className="text-xs font-extrabold uppercase text-emerald-500 tracking-wider mb-1">{plan.name}</div>
                    <div className="flex items-baseline space-x-1 mb-1">
                      <span className="text-2xl font-black">{priceDisplay}</span>
                      <span className="text-[10px] opacity-80">{periodDisplay}</span>
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
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm shadow-xl flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>
                  {isProcessing ? 'Connecting to Stripe Checkout...' : `Subscribe via Stripe (${billingCycle === 'YEARLY' ? 'Yearly 20% OFF' : 'Monthly'})`}
                </span>
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
