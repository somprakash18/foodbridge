import React, { useState } from 'react';
import { ShieldAlert, TrendingUp, Users, DollarSign, Leaf, HeartHandshake, Utensils, CheckCircle2, XCircle, FileText, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PdfReceiptModal from '../components/PdfReceiptModal';

export default function OwnerDashboard() {
  const { listings } = useApp();

  const [pendingNgos, setPendingNgos] = useState([
    { id: 1, name: "Hope Family Shelter", regNo: "NGO-REG-2024-551", city: "Delhi", contact: "Priya Sharma", capacity: "400 meals/day", status: "PENDING" },
    { id: 2, name: "Community Kitchen Trust", regNo: "NGO-REG-2023-882", city: "Delhi", contact: "Rajesh Kumar", capacity: "850 meals/day", status: "PENDING" },
  ]);

  const [approvedCount, setApprovedCount] = useState(14);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  const handleApproveNgo = (ngoId) => {
    setPendingNgos(prev => prev.filter(n => n.id !== ngoId));
    setApprovedCount(prev => prev + 1);
  };

  const handleRejectNgo = (ngoId) => {
    setPendingNgos(prev => prev.filter(n => n.id !== ngoId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Command Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Platform Owner & Admin Command</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">Multi-city surplus marketplace, NGO verification workflow & Stripe subscriptions</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
          SYSTEM HEALTH: 100% OPERATIONAL
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Subscription Revenue</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">₹68,40,000</div>
          <p className="text-xs text-emerald-600 font-semibold">+24.5% Stripe MoM growth</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Platform Partners</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{450 + approvedCount} Entities</div>
          <p className="text-xs text-brand-600 font-semibold">Restaurants, Bakeries & Approved NGOs</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Meals Saved</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">18,450 Meals</div>
          <p className="text-xs text-emerald-600 font-semibold">Zero food waste milestone</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tax-Deduction Receipts</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">1,240 PDF Receipts</div>
          <p className="text-xs text-amber-600 font-semibold">Section 80G Compliant</p>
        </div>
      </div>

      {/* ADMIN WORKFLOW: NGO Verification & Approval Queue */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-300 dark:border-amber-900 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HeartHandshake className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">NGO Verification Approval Queue</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            {pendingNgos.length} Pending Approvals
          </span>
        </div>

        {pendingNgos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="pb-3">NGO Name</th>
                  <th className="pb-3">Reg Number</th>
                  <th className="pb-3">Contact Person</th>
                  <th className="pb-3">Pickup Capacity</th>
                  <th className="pb-3 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {pendingNgos.map((ngo) => (
                  <tr key={ngo.id}>
                    <td className="py-3 font-bold text-slate-900 dark:text-white">{ngo.name}</td>
                    <td className="py-3 font-mono">{ngo.regNo}</td>
                    <td className="py-3">{ngo.contact}</td>
                    <td className="py-3 text-emerald-600 font-bold">{ngo.capacity}</td>
                    <td className="py-3 text-right space-x-2">
                      <button
                        onClick={() => handleApproveNgo(ngo.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve NGO</span>
                      </button>
                      <button
                        onClick={() => handleRejectNgo(ngo.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold text-xs hover:bg-rose-200"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <span>All NGO verification requests approved! Live feed unlocked for verified shelters.</span>
          </div>
        )}
      </div>

      {/* Verified Partner Overview & Section 80G PDF Receipts */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Active Verified Partners & Subscription Tiers</h3>
          <button
            onClick={() => setReceiptModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-bold flex items-center space-x-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Sample 80G Tax Receipt</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="pb-3">Partner Entity</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">City</th>
                <th className="pb-3">Subscription Tier</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              <tr>
                <td className="py-3 font-bold text-slate-900 dark:text-white">Domino's Pizza Center</td>
                <td className="py-3">RESTAURANT</td>
                <td className="py-3">New Delhi</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-brand-100 text-brand-800 font-bold">STARTER (₹1,999/mo)</span></td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 dark:text-white">The Grand Palace Hotel</td>
                <td className="py-3">HOTEL</td>
                <td className="py-3">New Delhi</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">GROWTH (₹6,999/mo)</span></td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">ACTIVE</span></td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-slate-900 dark:text-white">Food Relief Foundation</td>
                <td className="py-3">NGO</td>
                <td className="py-3">New Delhi</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">FREE (VERIFIED NGO)</span></td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">VERIFIED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <PdfReceiptModal isOpen={receiptModalOpen} onClose={() => setReceiptModalOpen(false)} />

    </div>
  );
}
