import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  AlertTriangle,
  Building2,
  Utensils,
  HeartHandshake,
  ShoppingBag,
  Upload,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleAuthService } from '../services/GoogleAuthService';
import { FirebasePhoneAuthService } from '../services/FirebasePhoneAuthService';
import { FoodBridgeApi } from '../services/apiClient';

export default function RegistrationModal({ isOpen, onClose }) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  
  // WIZARD STEPS: 1=SIGNUP/LOGIN, 2=VERIFY_OTP, 3=CHOOSE_ROLE, 4=ROLE_ONBOARDING
  const [step, setStep] = useState(1);
  const [authMode, setAuthMode] = useState('SIGNUP'); // SIGNUP, LOGIN, PHONE_OTP

  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+91 ',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
    otpCode: ''
  });

  // Account Type Choice & Onboarding State
  const [selectedRole, setSelectedRole] = useState('BUYER'); // BUYER, RESTAURANT, NGO
  const [onboardingData, setOnboardingData] = useState({
    city: 'New Delhi',
    preferredLocation: 'Connaught Place',
    restaurantName: '',
    address: '',
    fssaiLicense: '',
    logoUrl: '',
    orgName: '',
    orgType: 'NGO',
    regNumber: ''
  });

  const [cooldown, setCooldown] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset wizard on modal open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setAuthMode('SIGNUP');
      setCooldown(0);
      setErrorMessage('');
      setSuccessMessage('');
      setFormData(prev => ({ ...prev, otpCode: '' }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Google OAuth
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await GoogleAuthService.signInWithGoogle(selectedRole);
      if (res.success) {
        setStep(3); // Proceed to Account Type Choice!
      }
    } catch (err) {
      setErrorMessage(err.message || "Google Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Create Account -> Triggers Real SMS OTP Verification
  const handleCreateAccountSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (authMode === 'SIGNUP') {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match. Please re-enter passwords.");
        return;
      }
      if (!formData.agreeTerms) {
        setErrorMessage("Please agree to the Terms & Privacy Policy.");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await FirebasePhoneAuthService.requestPhoneOtp(formData.phone);
      setSuccessMessage(res.message);
      setFormData(prev => ({ ...prev, otpCode: '' }));
      setStep(2); // Proceed to Verification Step!
      
      // Start 45-Second Cooldown Timer
      setCooldown(45);
      const interval = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      setErrorMessage(err.message || "Unable to send OTP. Please check your phone number and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Phone OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await FirebasePhoneAuthService.verifyPhoneOtp(formData.phone, formData.otpCode, selectedRole);
      setSuccessMessage("Account successfully verified!");
      setStep(3); // Proceed to Choose Account Type!
    } catch (err) {
      setErrorMessage(err.message || "Invalid OTP code entered. Please check your SMS and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Choose Account Type
  const handleSelectAccountType = (roleType) => {
    setSelectedRole(roleType);
    setStep(4); // Proceed to Role Onboarding!
  };

  // Step 4: Complete Role-Specific Onboarding & Enter Dashboard
  const handleCompleteOnboarding = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      let finalRole = 'BUYER';
      let businessProfile = null;

      if (selectedRole === 'RESTAURANT') {
        finalRole = 'RESTAURANT_OWNER';
        const res = await FoodBridgeApi.onboardBusiness({
          restaurantName: onboardingData.restaurantName || `${formData.name}'s Restaurant`,
          address: onboardingData.address || 'New Delhi, India',
          fssaiLicense: onboardingData.fssaiLicense || `100${Date.now()}`
        });
        businessProfile = res.business;
      } else if (selectedRole === 'NGO') {
        finalRole = 'NGO';
        await FoodBridgeApi.onboardNgo({
          orgName: onboardingData.orgName || `${formData.name} Relief Foundation`,
          orgType: onboardingData.orgType
        });
      }

      // Set Authenticated User State (Brand-new user starts with 0 stats and PENDING verification!)
      const newUser = {
        id: Date.now(),
        name: formData.name || 'New Member',
        email: formData.email || `user.${Date.now()}@foodbridge.org`,
        phone: formData.phone,
        role: finalRole,
        isVerified: false, // Default PENDING verification for new accounts!
        verificationBadge: "VERIFICATION PENDING",
        isNewAccount: true,
        businessName: businessProfile?.businessName || onboardingData.restaurantName || null,
        fssaiLicense: businessProfile?.fssaiLicense || onboardingData.fssaiLicense || null,
        address: businessProfile?.address || onboardingData.address || null,
        logoUrl: onboardingData.logoUrl || null
      };

      setUser(newUser);
      localStorage.setItem('foodbridge_jwt_token', `JWT_AUTH_${Date.now()}`);
      setLoading(false);
      onClose();

      // Redirect to correct dashboard based on role
      if (finalRole === 'BUYER') {
        navigate('/buyer');
      } else if (finalRole === 'NGO') {
        navigate('/ngo');
      } else {
        navigate('/');
      }

    } catch (err) {
      setErrorMessage(err.message || "Failed to complete onboarding.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {step === 1 ? (authMode === 'SIGNUP' ? 'Create FoodBridge Account' : 'Sign In to FoodBridge') :
               step === 2 ? 'Account Verification' :
               step === 3 ? 'Welcome to FoodBridge' : 'Complete Setup'}
            </h3>
            <p className="text-[11px] text-slate-500 font-semibold">Real Verification & Role Onboarding</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ===================================================================
            STEP 1: REGISTRATION / SIGN UP FORM
           =================================================================== */}
        {step === 1 && (
          <div className="space-y-4">
            
            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center space-x-2.5 transition-all border border-slate-200 dark:border-slate-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative text-center my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
              <span className="relative bg-white dark:bg-slate-900 px-3 text-[10px] text-slate-400 font-extrabold uppercase">or use details</span>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center justify-center space-x-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('SIGNUP')}
                className={authMode === 'SIGNUP' ? 'text-emerald-600 underline font-black' : 'text-slate-400'}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('LOGIN')}
                className={authMode === 'LOGIN' ? 'text-emerald-600 underline font-black' : 'text-slate-400'}
              >
                Log In
              </button>
            </div>

            <form onSubmit={handleCreateAccountSubmit} className="space-y-3.5 text-xs font-semibold">
              {authMode === 'SIGNUP' && (
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Som Prakash"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Phone Number (+91)</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>

              {authMode === 'SIGNUP' && (
                <>
                  <div>
                    <label className="text-slate-700 dark:text-slate-300 block mb-1">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="terms" className="text-[11px] text-slate-500 font-medium">
                      I agree to the <span className="text-emerald-600 font-bold">Terms & Privacy Policy</span>
                    </label>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-all mt-2"
              >
                <span>{authMode === 'SIGNUP' ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ===================================================================
            STEP 2: ACCOUNT SMS OTP VERIFICATION
           =================================================================== */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs font-semibold">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center space-y-1">
              <div className="text-emerald-800 dark:text-emerald-300 font-extrabold">We sent a verification code to</div>
              <div className="text-emerald-900 dark:text-white font-black text-sm">{formData.phone}</div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">Enter 6-Digit Verification Code</label>
              <input
                type="text"
                placeholder="[ _ _ _ _ _ _ ]"
                value={formData.otpCode}
                onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white text-center text-base tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !formData.otpCode}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-all"
            >
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[11px] text-slate-400 font-semibold pt-1">
              {cooldown > 0 ? (
                <span>Resend code in <strong>{cooldown} seconds</strong></span>
              ) : (
                <button type="button" onClick={handleCreateAccountSubmit} className="text-emerald-600 hover:underline font-extrabold">Resend Code Now</button>
              )}
            </div>
          </form>
        )}

        {/* ===================================================================
            STEP 3: CHOOSE ACCOUNT TYPE
           =================================================================== */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h4 className="text-base font-black text-slate-900 dark:text-white">How will you use FoodBridge?</h4>
              <p className="text-xs text-slate-500">Select your account role to set up your profile.</p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectAccountType('BUYER')}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 text-left space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-sm text-slate-900 dark:text-white group-hover:text-emerald-600">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span>Buyer</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Find surplus food deals and discover zero-waste opportunities nearby.</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectAccountType('RESTAURANT')}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 text-left space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-sm text-slate-900 dark:text-white group-hover:text-emerald-600">
                    <Utensils className="w-4 h-4 text-emerald-600" />
                    <span>Restaurant</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Donate surplus food from your restaurant, hotel, bakery, or supermarket.</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectAccountType('NGO')}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 text-left space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-sm text-slate-900 dark:text-white group-hover:text-emerald-600">
                    <HeartHandshake className="w-4 h-4 text-emerald-600" />
                    <span>NGO / Shelter</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Find and receive fresh surplus food for shelters and people in need.</p>
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            STEP 4: ROLE-SPECIFIC ONBOARDING
           =================================================================== */}
        {step === 4 && (
          <form onSubmit={handleCompleteOnboarding} className="space-y-4 text-xs font-semibold">
            {selectedRole === 'BUYER' && (
              <>
                <div className="text-center space-y-1 pb-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">Complete Buyer Profile</h4>
                  <p className="text-xs text-slate-500">Set location to find nearby surplus deals.</p>
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">City</label>
                  <input
                    type="text"
                    value={onboardingData.city}
                    onChange={(e) => setOnboardingData({ ...onboardingData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Preferred Neighborhood</label>
                  <input
                    type="text"
                    value={onboardingData.preferredLocation}
                    onChange={(e) => setOnboardingData({ ...onboardingData, preferredLocation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </>
            )}

            {selectedRole === 'RESTAURANT' && (
              <>
                <div className="text-center space-y-1 pb-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">Restaurant Setup</h4>
                  <p className="text-xs text-slate-500">Submit business information for verification review.</p>
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Restaurant / Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Dining & Bakery"
                    value={onboardingData.restaurantName}
                    onChange={(e) => setOnboardingData({ ...onboardingData, restaurantName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Restaurant Address</label>
                  <input
                    type="text"
                    placeholder="B-Block Connaught Place, New Delhi"
                    value={onboardingData.address}
                    onChange={(e) => setOnboardingData({ ...onboardingData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">FSSAI License Number</label>
                  <input
                    type="text"
                    placeholder="14-Digit License (e.g. 10019011006542)"
                    value={onboardingData.fssaiLicense}
                    onChange={(e) => setOnboardingData({ ...onboardingData, fssaiLicense: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </>
            )}

            {selectedRole === 'NGO' && (
              <>
                <div className="text-center space-y-1 pb-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">Organization Setup</h4>
                  <p className="text-xs text-slate-500">Provide registration details for NGO/Shelter verification.</p>
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Organization Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Food Relief Foundation"
                    value={onboardingData.orgName}
                    onChange={(e) => setOnboardingData({ ...onboardingData, orgName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1">Organization Type</label>
                  <select
                    value={onboardingData.orgType}
                    onChange={(e) => setOnboardingData({ ...onboardingData, orgType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  >
                    <option value="NGO">Registered NGO (80G Eligible)</option>
                    <option value="SHELTER">Community Shelter / Orphanage</option>
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-all mt-2"
            >
              <span>Enter FoodBridge App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
