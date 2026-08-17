import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const DEMO_USERS = {
  RESTAURANT: {
    id: 1,
    name: "Domino's Pizza Center",
    email: "partner@dominos.com",
    phone: "+91 98765 43210",
    role: "RESTAURANT",
    avatarUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    verificationBadge: "GOLD_PARTNER",
    referralCode: "DOMINOS2026",
    licenseNumber: "FSSAI-10019011000123",
    rating: 4.85
  },
  NGO: {
    id: 5,
    name: "Food Relief Foundation",
    email: "contact@foodrelief.org",
    phone: "+91 98765 43220",
    role: "NGO",
    avatarUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    verificationBadge: "VERIFIED_NGO",
    referralCode: "FOODRELIEF2026",
    registrationNumber: "NGO-REG-2021-987",
    capacityPerDay: 1200
  },
  BUYER: {
    id: 7,
    name: "Aarav Mehta",
    email: "aarav.buyer@gmail.com",
    phone: "+91 98765 43230",
    role: "BUYER",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    verificationBadge: "GOLD_SAVER",
    referralCode: "AARAV2026",
    savedMealsCount: 24,
    moneySavedInr: 3800.00
  },
  DELIVERY_PARTNER: {
    id: 9,
    name: "Vikram Singh (Express Driver)",
    email: "vikram.delivery@gmail.com",
    phone: "+91 98765 43240",
    role: "DELIVERY_PARTNER",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    verificationBadge: "TOP_RIDER",
    referralCode: "VIKRAM2026",
    vehicleType: "ELECTRIC_SCOOTER",
    vehicleNumber: "DL-01-EV-4092",
    rating: 4.92,
    status: "AVAILABLE"
  },
  OWNER_ADMIN: {
    id: 10,
    name: "FoodBridge Admin Owner",
    email: "admin@foodbridge.org",
    phone: "+91 98765 43200",
    role: "OWNER_ADMIN",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    isVerified: true,
    verificationBadge: "PLATINUM_ADMIN",
    referralCode: "ADMIN2026"
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEMO_USERS.RESTAURANT);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const switchRole = (roleKey) => {
    if (DEMO_USERS[roleKey]) {
      setUser(DEMO_USERS[roleKey]);
    }
  };

  const loginWithGoogle = (roleKey = 'BUYER') => {
    const targetUser = {
      ...DEMO_USERS[roleKey],
      name: "Google Authenticated User",
      email: "user.google@gmail.com",
      googleId: "google-oauth-109283749",
      isVerified: true
    };
    setUser(targetUser);
    setAuthModalOpen(false);
  };

  const sendOtp = (identifier) => {
    setOtpSent(true);
    alert(`6-Digit OTP sent successfully to ${identifier}! (Mock OTP: 123456)`);
  };

  const verifyOtp = (enteredOtp, roleKey = 'BUYER') => {
    if (enteredOtp === '123456' || enteredOtp.length === 6) {
      setUser(DEMO_USERS[roleKey]);
      setOtpSent(false);
      setAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      switchRole,
      loginWithGoogle,
      sendOtp,
      verifyOtp,
      otpSent,
      logout,
      updateUserProfile,
      authModalOpen,
      setAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
