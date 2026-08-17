import React, { useState } from 'react';
import { QrCode, Camera, CheckCircle2, X, RefreshCw, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QrScannerModal({ isOpen, onClose, qrHash = "FOODBRIDGE-QR-001" }) {
  const { completeDeliveryViaQr } = useApp();
  const [mode, setMode] = useState('SCAN'); // SCAN or SHOW
  const [isScanning, setIsScanning] = useState(false);
  const [scannedSuccess, setScannedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedSuccess(true);
      completeDeliveryViaQr(qrHash);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">QR Pickup Verification</h3>
              <p className="text-xs text-slate-500">Scan or Display QR to complete transfer</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switch */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            onClick={() => setMode('SCAN')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${mode === 'SCAN' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500'}`}
          >
            Scan QR Code
          </button>
          <button
            onClick={() => setMode('SHOW')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${mode === 'SHOW' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500'}`}
          >
            Show Pickup QR
          </button>
        </div>

        {/* Mode Content */}
        {mode === 'SCAN' ? (
          <div className="space-y-4 text-center">
            {scannedSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-lg font-extrabold text-emerald-800 dark:text-emerald-300">QR Code Verified!</h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Pickup authenticated successfully. Delivery partner wallet credited +₹45.00.
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="relative w-full h-56 rounded-2xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-brand-500">
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-brand-500 to-emerald-400 animate-pulse top-1/2"></div>
                )}
                <Camera className="w-12 h-12 text-slate-500 mb-2" />
                <span className="text-xs text-slate-400 font-medium">Align QR code inside frame</span>
                <button
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  className="mt-4 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-soft"
                >
                  {isScanning ? 'Verifying Scan...' : 'Simulate Camera Scan'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 inline-block shadow-soft">
              {/* Simulated QR Pattern */}
              <div className="w-48 h-48 bg-slate-900 rounded-xl p-3 flex flex-col items-center justify-center relative">
                <div className="w-full h-full border-4 border-white rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-mono tracking-widest font-bold">{qrHash}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500">Restaurant staff or delivery driver can scan this QR code.</p>
          </div>
        )}

      </div>
    </div>
  );
}
