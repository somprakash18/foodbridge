import React, { useState } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, DollarSign, ShieldCheck, Download, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WalletPage() {
  const { walletBalance, transactions } = useApp();
  const [topupModalOpen, setTopupModalOpen] = useState(false);
  const [amount, setAmount] = useState(500);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Wallet Balance Hero */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-brand-900 via-brand-800 to-emerald-900 text-white shadow-soft-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-300">FoodBridge Digital Wallet</span>
          <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">₹{walletBalance.toLocaleString('en-IN')}</div>
          <p className="text-xs text-brand-200 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
            Direct Razorpay Instant Payout Ready
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert(`₹${walletBalance} withdrawal initiated to linked bank account!`)}
            className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md border border-white/20 shadow-sm"
          >
            Withdraw Funds
          </button>
          <button
            onClick={() => setTopupModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow-soft flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Funds</span>
          </button>
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Transaction History</h2>
          <button className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1">
            <Download className="w-3.5 h-3.5" />
            <span>Export Statement (PDF)</span>
          </button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl ${tx.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'}`}>
                  {tx.type === 'CREDIT' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{tx.desc}</h4>
                  <span className="text-[10px] text-slate-400">{tx.category} • {tx.date}</span>
                </div>
              </div>
              <span className={`text-sm font-extrabold ${tx.type === 'CREDIT' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
