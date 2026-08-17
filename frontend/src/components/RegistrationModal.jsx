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
  Sparkles,
  PartyPopper,
  Hotel,
  GraduationCap,
  Briefcase,
  ChefHat,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleAuthService } from '../services/GoogleAuthService';
import { FirebasePhoneAuthService } from '../services/FirebasePhoneAuthService';
import { FoodBridgeApi } from '../services/apiClient';

export default function RegistrationModal({ isOpen, onClose, initialRole = null }) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  
  // WIZARD STEPS: 1=SIGNUP/LOGIN, 2=VERIFY_OTP, 3=CHOOSE_ROLE, 4=ROLE_ONBOARDING
  const [step, setStep] = useState(1);
  const [authMode, setAuthMode] = useState('SIGNUP');

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

  // Account Type & Donor Type State
  const [selectedRole, setSelectedRole] = useState('RESTAURANT'); // BUYER, RESTAURANT, NGO
  const [donorType, setDonorType] = useState('WEDDING'); // WEDDING, RESTAURANT, HOTEL, HOSTEL, PARTY, COLLEGE, CORPORATE_EVENT, CATERER, COMMUNITY_EVENT, OTHER

  // Flexible Onboarding State
  const [onboardingData, setOnboardingData] = useState({
    // Restaurant Specific
    restaurantName: '',
    fssaiLicense: '',

    // Wedding & Event Specific (Zero FSSAI required!)
    eventName: 'Rahul & Priya Wedding',
    eventType: 'Wedding',
    venueName: 'Grand Palace Banquet Hall',
    approxGuests: '250',
    estimatedServings: '120',
    approxKg: '45',
    foodAvailableFrom: '10:00 PM Today',
    availableUntil: '11:30 PM Today',
    foodType: 'VEG',
    foodDescription: 'Rice, dal, paneer, naan and mixed vegetables',
    prepTime: '7:30 PM Today',
    timeSitting: '2.5 hours',
    storageCondition: 'HOT',
    photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    specialInstructions: 'Please collect from Main Catering Entrance',

    // Shared Details
    city: 'New Delhi',
    address: 'B-Block Connaught Place, New Delhi',
    preferredLocation: 'Connaught Place',
    contactPerson: '',
    phone: '',
    orgName: '',
    orgType: 'NGO',
    safetyConfirmed: false
  });

  const [cooldown, setCooldown] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setAuthMode('SIGNUP');
      setCooldown(0);
      setErrorMessage('');
      setSuccessMessage('');
      setFormData(prev => ({ ...prev, otpCode: '' }));
      if (initialRole) setSelectedRole(initialRole);
    }
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await GoogleAuthService.signInWithGoogle(selectedRole);
      if (res.success) {
        setStep(3);
      }
    } catch (err) {
      setErrorMessage(err.message || "Google Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

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
      setStep(2);
      
      setCooldown(60);
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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await FirebasePhoneAuthService.verifyPhoneOtp(formData.phone, formData.otpCode, selectedRole);
      setSuccessMessage("Account successfully verified!");
      setStep(3);
    } catch (err) {
      setErrorMessage(err.message || "Invalid OTP code entered. Please check your SMS and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAccountType = (roleType) => {
    setSelectedRole(roleType);
    setStep(4);
  };

  const handleCompleteOnboarding = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (selectedRole === 'RESTAURANT' && !onboardingData.safetyConfirmed) {
      setErrorMessage("Please confirm that the food is safe for donation and stored appropriately.");
      setLoading(false);
      return;
    }

    try {
      let finalRole = 'BUYER';
      let donorProfile = null;

      if (selectedRole === 'RESTAURANT') {
        finalRole = 'RESTAURANT_OWNER';
        const res = await FoodBridgeApi.onboardFoodDonor({
          donorType: donorType,
          name: donorType === 'RESTAURANT' ? (onboardingData.restaurantName || `${formData.name}'s Restaurant`) : onboardingData.eventName,
          eventName: onboardingData.eventName,
          venueName: onboardingData.venueName,
          address: onboardingData.address || 'New Delhi, India',
          fssaiLicense: donorType === 'RESTAURANT' ? (onboardingData.fssaiLicense || `100${Date.now()}`) : null,
          foodType: onboardingData.foodType,
          estimatedServings: onboardingData.estimatedServings,
          storageCondition: onboardingData.storageCondition,
          availableUntil: onboardingData.availableUntil
        });
        donorProfile = res.donor;
      } else if (selectedRole === 'NGO') {
        finalRole = 'NGO';
        await FoodBridgeApi.onboardNgo({
          orgName: onboardingData.orgName || `${formData.name} Relief Foundation`,
          orgType: onboardingData.orgType
        });
      }

      const newUser = {
        id: Date.now(),
        name: formData.name || 'New Member',
        email: formData.email || `user.${Date.now()}@foodbridge.org`,
        phone: FirebasePhoneAuthService.normalizePhone(formData.phone),
        role: finalRole,
        donorType: donorType,
        isVerified: false,
        verificationBadge: "VERIFICATION PENDING",
        isNewAccount: true,
        businessName: donorProfile?.businessName || onboardingData.restaurantName || onboardingData.eventName || null,
        eventName: onboardingData.eventName,
        venueName: onboardingData.venueName,
        fssaiLicense: donorProfile?.fssaiLicense || null,
        address: donorProfile?.address || onboardingData.address || null
      };

      setUser(newUser);
      localStorage.setItem('foodbridge_jwt_token', `JWT_AUTH_${Date.now()}`);
      setLoading(false);
      onClose();

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

  const normalizedPhone = FirebasePhoneAuthService.normalizePhone(formData.phone);
  const maskedPhoneDisplay = normalizedPhone.length >= 7 ? `${normalizedPhone.substring(0, 3)}******${normalizedPhone.slice(-4)}` : normalizedPhone;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {step === 1 ? (authMode === 'SIGNUP' ? 'Create FoodBridge Account' : 'Sign In to FoodBridge') :
               step === 2 ? 'Phone SMS Authentication' :
               step === 3 ? 'Welcome to FoodBridge' : 'Food Donor Setup'}
            </h3>
            {step === 4 && selectedRole === 'RESTAURANT' && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                Type: {donorType.replace('_', ' ')}
              </span>
            )}
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

        {/* STEP 1: SIGN UP */}
        {step === 1 && (
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center space-x-2.5 border border-slate-200 dark:border-slate-700"
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
                    placeholder="Rahul Sharma"
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
                  placeholder="rahul@example.com"
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
                  placeholder="7563045006"
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
                <span>{authMode === 'SIGNUP' ? 'Send OTP & Create Account' : 'Send OTP & Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: VERIFY OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs font-semibold">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center space-y-1">
              <div className="text-emerald-800 dark:text-emerald-300 font-extrabold">OTP sent to</div>
              <div className="text-emerald-900 dark:text-white font-black text-sm">{maskedPhoneDisplay}</div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">Enter 6-Digit OTP</label>
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
              disabled={loading || !formData.otpCode || formData.otpCode.length !== 6}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-all"
            >
              <span>Verify OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[11px] text-slate-400 font-semibold pt-1">
              {cooldown > 0 ? (
                <span>Resend OTP in <strong>{cooldown} seconds</strong></span>
              ) : (
                <button type="button" onClick={handleCreateAccountSubmit} className="text-emerald-600 hover:underline font-extrabold">Resend OTP Now</button>
              )}
            </div>
          </form>
        )}

        {/* STEP 3: CHOOSE ACCOUNT ROLE */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h4 className="text-base font-black text-slate-900 dark:text-white">How will you use FoodBridge?</h4>
              <p className="text-xs text-slate-500">Select your role to set up your profile.</p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectAccountType('RESTAURANT')}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 text-left space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-sm text-slate-900 dark:text-white group-hover:text-emerald-600">
                    <Utensils className="w-4 h-4 text-emerald-600" />
                    <span>Food Donor (Wedding, Event, Restaurant, Hotel, Caterer)</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Donate surplus food from weddings, events, hotels, hostels, bakeries, or private parties.</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectAccountType('BUYER')}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 text-left space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-sm text-slate-900 dark:text-white group-hover:text-emerald-600">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span>Individual Buyer</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Discover affordable surplus meal deals and zero-waste offers nearby.</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectAccountType('NGO')}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 text-left space-y-1 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-black text-sm text-slate-900 dark:text-white group-hover:text-emerald-600">
                    <HeartHandshake className="w-4 h-4 text-emerald-600" />
                    <span>NGO / Shelter Coordinator</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Find and receive fresh surplus food for shelters and community kitchens.</p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DYNAMIC MULTI-DONOR ONBOARDING SETUP */}
        {step === 4 && (
          <form onSubmit={handleCompleteOnboarding} className="space-y-4 text-xs font-semibold">
            
            {selectedRole === 'RESTAURANT' && (
              <>
                {/* 1. DONOR TYPE SELECTION CARDS */}
                <div className="space-y-2">
                  <label className="text-slate-900 dark:text-white font-black text-xs block">What type of food donor are you?</label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'WEDDING', label: 'Wedding Event', icon: PartyPopper },
                      { id: 'RESTAURANT', label: 'Restaurant', icon: Utensils },
                      { id: 'HOTEL', label: 'Hotel / Hostel', icon: Hotel },
                      { id: 'PARTY', label: 'Private Party', icon: Sparkles },
                      { id: 'COLLEGE', label: 'College Event', icon: GraduationCap },
                      { id: 'CORPORATE_EVENT', label: 'Corporate Event', icon: Briefcase },
                      { id: 'CATERER', label: 'Caterer', icon: ChefHat },
                      { id: 'COMMUNITY_EVENT', label: 'Community', icon: Users },
                      { id: 'OTHER', label: 'Other Event', icon: Building2 }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDonorType(item.id)}
                        className={`p-2.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1 transition-all ${
                          donorType === item.id 
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-black shadow-sm' 
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${donorType === item.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span className="text-[10px] leading-tight font-extrabold">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Safety Warning Disclaimer Banner */}
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-800 dark:text-amber-300 text-[10px] leading-relaxed">
                  ⚠️ <strong>Food Safety Note:</strong> Only donate food that has been safely prepared, stored and handled. FoodBridge partners may reject food that does not meet safety standards.
                </div>

                {/* 2. WEDDING & PRIVATE EVENT SPECIFIC FIELDS (NO FSSAI REQUIRED!) */}
                {(donorType === 'WEDDING' || donorType === 'PARTY' || donorType === 'COLLEGE' || donorType === 'CORPORATE_EVENT' || donorType === 'COMMUNITY_EVENT' || donorType === 'OTHER') && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 block mb-1">Event / Function Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul & Priya Wedding"
                        value={onboardingData.eventName}
                        onChange={(e) => setOnboardingData({ ...onboardingData, eventName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 block mb-1">Venue Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Grand Palace Banquet"
                          value={onboardingData.venueName}
                          onChange={(e) => setOnboardingData({ ...onboardingData, venueName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 block mb-1">Pickup Address</label>
                        <input
                          type="text"
                          placeholder="Complete Address"
                          value={onboardingData.address}
                          onChange={(e) => setOnboardingData({ ...onboardingData, address: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 block mb-1">Est. Servings (People)</label>
                        <input
                          type="number"
                          placeholder="120"
                          value={onboardingData.estimatedServings}
                          onChange={(e) => setOnboardingData({ ...onboardingData, estimatedServings: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 block mb-1">Food Type</label>
                        <select
                          value={onboardingData.foodType}
                          onChange={(e) => setOnboardingData({ ...onboardingData, foodType: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                        >
                          <option value="VEG">Vegetarian</option>
                          <option value="NON_VEG">Non-Vegetarian</option>
                          <option value="BOTH">Both Veg & Non-Veg</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-700 dark:text-slate-300 block mb-1">Food Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Rice, dal, paneer, naan and mixed vegetables"
                        value={onboardingData.foodDescription}
                        onChange={(e) => setOnboardingData({ ...onboardingData, foodDescription: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 block mb-1">Pickup Available Until</label>
                        <input
                          type="text"
                          placeholder="11:30 PM Today"
                          value={onboardingData.availableUntil}
                          onChange={(e) => setOnboardingData({ ...onboardingData, availableUntil: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-slate-700 dark:text-slate-300 block mb-1">Storage Condition</label>
                        <select
                          value={onboardingData.storageCondition}
                          onChange={(e) => setOnboardingData({ ...onboardingData, storageCondition: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                        >
                          <option value="HOT">Hot / Warm</option>
                          <option value="REFRIGERATED">Refrigerated</option>
                          <option value="ROOM_TEMPERATURE">Room Temperature</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. RESTAURANT SPECIFIC FIELDS (FSSAI LICENSE REQUIRED) */}
                {donorType === 'RESTAURANT' && (
                  <div className="space-y-3 pt-1">
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
                  </div>
                )}

                {/* 4. HOTEL / HOSTEL / CATERER SPECIFIC FIELDS */}
                {(donorType === 'HOTEL' || donorType === 'CATERER') && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 block mb-1">Hotel / Hostel / Caterer Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Grand Heritage Hotel & Catering"
                        value={onboardingData.restaurantName}
                        onChange={(e) => setOnboardingData({ ...onboardingData, restaurantName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 block mb-1">Address</label>
                      <input
                        type="text"
                        placeholder="Complete Hotel/Caterer Address"
                        value={onboardingData.address}
                        onChange={(e) => setOnboardingData({ ...onboardingData, address: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 dark:text-slate-300 block mb-1">FSSAI License Number (Optional if applicable)</label>
                      <input
                        type="text"
                        placeholder="14-Digit License (Optional)"
                        value={onboardingData.fssaiLicense}
                        onChange={(e) => setOnboardingData({ ...onboardingData, fssaiLicense: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Mandatory Safety Checkbox */}
                <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <input
                    type="checkbox"
                    id="safetyConfirm"
                    checked={onboardingData.safetyConfirmed}
                    onChange={(e) => setOnboardingData({ ...onboardingData, safetyConfirmed: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <label htmlFor="safetyConfirm" className="text-[11px] text-slate-700 dark:text-slate-300 font-bold leading-snug">
                    I confirm that the food is safe for donation and has been stored/handled appropriately.
                  </label>
                </div>
              </>
            )}

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
