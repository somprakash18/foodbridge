import React, { useState } from 'react';
import { X, Utensils, HeartHandshake, ShoppingBag, Truck, CheckCircle2, ShieldCheck, Phone, Lock, Upload, MapPin } from 'lucide-react';
import { FirebasePhoneAuthService } from '../services/FirebasePhoneAuthService';
import { GoogleAuthService } from '../services/GoogleAuthService';
import { useAuth } from '../context/AuthContext';

export default function RegistrationModal({ isOpen, onClose, initialRole = 'RESTAURANT' }) {
  const { switchRole } = useAuth();
  const [role, setRole] = useState(initialRole);
  const [step, setStep] = useState('FORM'); // FORM, OTP, SUCCESS

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [fssaiLicense, setFssaiLicense] = useState('');
  const [ngoRegNo, setNgoRegNo] = useState('');
  const [vehicleType, setVehicleType] = useState('ELECTRIC_SCOOTER');
  const [address, setAddress] = useState('Connaught Place, Block B, New Delhi');

  // OTP Fields
  const [otpCode, setOtpCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    FirebasePhoneAuthService.sendPhoneOtp(phone, (res) => {
      setStep('OTP');
    });
  };

  const handleVerifyOtp = async () => {
    setVerifying(true);
    try {
      await FirebasePhoneAuthService.verifyPhoneOtp(otpCode);
      setVerifying(false);
      setStep('SUCCESS');
      switchRole(role);
    } catch (err) {
      setVerifying(false);
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    const res = await GoogleAuthService.signInWithGoogle(role);
    switchRole(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Join FoodBridge Platform</h3>
            <p className="text-xs text-slate-500">Sign up & verify your account for real surplus access</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        {step === 'FORM' && (
          <div className="grid grid-cols-4 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setRole('RESTAURANT')}
              className={`py-2 rounded-xl transition-all ${role === 'RESTAURANT' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500'}`}
            >
              Restaurant
            </button>
            <button
              onClick={() => setRole('NGO')}
              className={`py-2 rounded-xl transition-all ${role === 'NGO' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm' : 'text-slate-500'}`}
            >
              NGO
            </button>
            <button
              onClick={() => setRole('BUYER')}
              className={`py-2 rounded-xl transition-all ${role === 'BUYER' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm' : 'text-slate-500'}`}
            >
              Buyer
            </button>
            <button
              onClick={() => setRole('DELIVERY_PARTNER')}
              className={`py-2 rounded-xl transition-all ${role === 'DELIVERY_PARTNER' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-sm' : 'text-slate-500'}`}
            >
              Rider
            </button>
          </div>
        )}

        {/* STEP 1: Registration Form */}
        {step === 'FORM' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">
                {role === 'RESTAURANT' ? 'Restaurant / Hotel Name' : role === 'NGO' ? 'NGO Organization Name' : 'Full Name'}
              </label>
              <input
                type="text"
                required
                placeholder={role === 'RESTAURANT' ? "Domino's Pizza Center" : role === 'NGO' ? "Food Relief Foundation" : "Aarav Mehta"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="contact@entity.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Phone Number (Indian SMS)</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-bold"
                />
              </div>
            </div>

            {/* Role Specific Extra Inputs */}
            {role === 'RESTAURANT' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">FSSAI License Number</label>
                  <input
                    type="text"
                    required
                    placeholder="FSSAI-10019011000123"
                    value={fssaiLicense}
                    onChange={(e) => setFssaiLicense(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Google Maps Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-bold"
                  />
                </div>
              </div>
            )}

            {role === 'NGO' && (
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">NGO Registration Number</label>
                <input
                  type="text"
                  required
                  placeholder="NGO-REG-2021-987"
                  value={ngoRegNo}
                  onChange={(e) => setNgoRegNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-bold"
                />
              </div>
            )}

            {role === 'DELIVERY_PARTNER' && (
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  <option value="ELECTRIC_SCOOTER">Electric Scooter</option>
                  <option value="BICYCLE">Bicycle</option>
                  <option value="MOTORCYCLE">Motorcycle</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-700 to-emerald-600 hover:from-brand-800 hover:to-emerald-700 text-white font-extrabold text-xs shadow-soft flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Send Firebase Phone Verification OTP</span>
            </button>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Or Continue with Google OAuth2
            </button>
          </form>
        )}

        {/* STEP 2: Phone OTP Verification */}
        {step === 'OTP' && (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 space-y-2">
              <h4 className="text-sm font-bold text-brand-900 dark:text-brand-300">Enter 6-Digit Phone OTP</h4>
              <p className="text-xs text-slate-500">Firebase SMS OTP dispatched to {phone}. (Mock Code: 123456)</p>
            </div>

            <input
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="1 2 3 4 5 6"
              className="w-48 mx-auto px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center text-xl font-extrabold tracking-widest border border-brand-500 focus:outline-none"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={verifying}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-soft"
            >
              {verifying ? 'Verifying Phone Code...' : 'Verify OTP & Activate Account'}
            </button>
          </div>
        )}

        {/* STEP 3: Success Screen */}
        {step === 'SUCCESS' && (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">Registration & Verification Complete!</h4>
            <p className="text-xs text-slate-500">Your account is active. Redirecting to your role portal...</p>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-brand-600 text-white font-bold text-xs shadow-soft"
            >
              Go To Portal
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
