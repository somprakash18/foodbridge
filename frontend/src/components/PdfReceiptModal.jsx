import React, { useRef } from 'react';
import { X, Printer, Download, ShieldCheck, FileText, CheckCircle2, Building2, Utensils } from 'lucide-react';

export default function PdfReceiptModal({ isOpen, onClose, claimData }) {
  const receiptRef = useRef();

  if (!isOpen) return null;

  const data = claimData || {
    receiptId: `REC-80G-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
    restaurantName: "Domino's Pizza Center",
    fssaiLicense: "FSSAI-10019011000123",
    ngoName: "Food Relief Foundation",
    ngoRegNo: "NGO-REG-2021-987",
    foodTitle: "Surplus Veg Supreme & Garlic Bread",
    quantityKg: 45.0,
    servings: 120,
    fmvValuationInr: 14500.00,
    taxCertNo: "CERT-80G-DELHI-2026/89421"
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Section 80G Tax-Deduction Receipt</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Printable Certificate Area */}
        <div ref={receiptRef} className="p-6 rounded-2xl bg-white text-slate-900 shadow-sm border border-slate-200 space-y-6 print:shadow-none">
          
          {/* Certificate Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xl font-extrabold text-brand-700 tracking-tight">FoodBridge Foundation</span>
              <p className="text-[11px] text-slate-500">Official Surplus Food Tax Exemption Certificate</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase">Receipt No:</span>
              <div className="text-xs font-extrabold text-slate-800">{data.receiptId}</div>
              <div className="text-[10px] text-slate-500">Issued: {data.date}</div>
            </div>
          </div>

          {/* Donor & NGO Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">DONOR (RESTAURANT)</span>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{data.restaurantName}</div>
              <div className="text-[11px] text-slate-600">License: {data.fssaiLicense}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">RECIPIENT (NGO / SHELTER)</span>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{data.ngoName}</div>
              <div className="text-[11px] text-slate-600">Reg #: {data.ngoRegNo}</div>
            </div>
          </div>

          {/* Food Surplus Item Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                <th className="py-2">Description</th>
                <th className="py-2">Quantity</th>
                <th className="py-2 text-right">Fair Market Valuation (FMV)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="py-2.5 font-bold text-slate-800">{data.foodTitle} ({data.servings} Servings)</td>
                <td className="py-2.5 text-slate-600">{data.quantityKg} kg</td>
                <td className="py-2.5 text-right font-extrabold text-emerald-600">₹{data.fmvValuationInr.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          {/* Tax Exemption Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
            <div>
              <span className="font-bold text-slate-700">Tax Exemption Cert No:</span>
              <span className="ml-1 text-slate-500 font-mono">{data.taxCertNo}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-extrabold text-emerald-600">Tax Deduction Eligible: 100%</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
