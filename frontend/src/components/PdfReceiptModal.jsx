import React from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PdfReceiptModal({ isOpen, onClose }) {
  const { user } = useAuth();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Donation ID,Item,Quantity,Value INR,NGO Partner,Tax Benefit,Date\n"
      + "DON-901,Shahi Paneer Meal,25 kg,2850,Food Relief Foundation,Section 80G,2026-08-17\n"
      + "DON-902,Sourdough Bakery,15 kg,1400,Hope Shelter Delhi,Section 80G,2026-08-16\n"
      + "DON-903,Chicken Biryani,40 kg,4500,City Child Care,Section 80G,2026-08-15\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "FoodBridge_Tax_Donations_Report_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-emerald-200 dark:border-emerald-800 shadow-2xl animate-in fade-in">
        
        {/* Printable Tax Certificate Card */}
        <div id="printable-tax-receipt" className="p-6 rounded-2xl border-2 border-emerald-600 bg-emerald-50/40 dark:bg-slate-800/80 space-y-4 text-xs font-semibold">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Section 80G Tax Exemption Certificate</h3>
                <p className="text-[10px] text-slate-500">Government of India Income Tax Act 1961</p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-full text-[9.5px] font-extrabold">VERIFIED RECEIPT</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px]">Donor Name:</span>
              <strong className="text-slate-900 dark:text-white">{user?.name || 'Haldiram Sweets & Dining'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">FSSAI License:</span>
              <strong className="text-slate-900 dark:text-white">10019011006542</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Total Food Valued:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">₹8,750 INR</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Certificate No:</span>
              <strong className="text-slate-900 dark:text-white">FB-80G-2026-9041</strong>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 text-[10px] text-slate-500 space-y-1">
            <div>This certificate confirms that surplus food donations were distributed to registered 80G NGOs (Food Relief Foundation). Eligible for 50% Tax Deduction under IT Act.</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs"
          >
            Close
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadCsv}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center space-x-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
