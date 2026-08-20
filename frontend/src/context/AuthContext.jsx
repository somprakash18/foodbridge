import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodBridgeApi } from '../services/apiClient';

const AuthContext = createContext();

export const TRANSLATIONS = {
  EN: {
    brand: "FoodBridge",
    tagline: "Surplus Food Marketplace",
    home: "Home",
    marketplace: "Marketplace",
    map: "Live Map",
    ngoPortal: "NGO Portal",
    restaurantPortal: "Restaurant Portal",
    deliveryPortal: "Delivery Partner",
    adminPortal: "Admin Panel",
    impact: "Impact Stats",
    eventRescue: "Wedding & Event Rescue",
    campusRescue: "Campus Rescue",
    community: "Community & Streaks",
    makeDonation: "Make Donation",
    sosEmergency: "SOS Emergency",
    switchRole: "Switch Role",
    wallet: "Wallet",
    login: "Sign In / Sign Up",
    logout: "Logout",
    searchPlaceholder: "Search meals, restaurants, NGOs, shelters..."
  },
  HI: {
    brand: "फूडब्रिज",
    tagline: "अतिरिक्त भोजन बाज़ार",
    home: "मुख्य पृष्ठ",
    marketplace: "मार्केटप्लेस",
    map: "लाइव नक्शा",
    ngoPortal: "एनजीओ पोर्टल",
    restaurantPortal: "रेस्तरां पोर्टल",
    deliveryPortal: "डिलीवरी पार्टनर",
    adminPortal: "एडमिन पैनल",
    impact: "प्रभाव आंकड़े",
    eventRescue: "शादी और इवेंट बचाव",
    campusRescue: "कैंपस भोजन बचाव",
    community: "समुदाय और स्ट्रीक्स",
    makeDonation: "भोजन दान करें",
    sosEmergency: "आपातकालीन SOS",
    switchRole: "रोल बदलें",
    wallet: "वॉलेट",
    login: "साइन इन / साइन अप",
    logout: "लॉगआउट",
    searchPlaceholder: "भोजन, रेस्तरां, एनजीओ खोजें..."
  }
};

export function AuthProvider({ children }) {
  const [lang, setLang] = useState('EN');

  // Authenticated User State (Starts NULL if not logged in!)
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('foodbridge_jwt_token');
    const storedUser = localStorage.getItem('foodbridge_user_profile');
    if (token && storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        return null;
      }
    }
    return null; // Unauthenticated state for first-time visitors!
  });

  const [businessData, setBusinessData] = useState(null);

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('foodbridge_user_role', user.role || 'USER');
      localStorage.setItem('foodbridge_user_id', user.id || 1);
      localStorage.setItem('foodbridge_user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodbridge_user_role');
      localStorage.removeItem('foodbridge_user_id');
      localStorage.removeItem('foodbridge_user_profile');
    }
  }, [user]);

  // Fetch Business Data ONLY if user is authorized owner
  useEffect(() => {
    const isOwnerRole = user && (user.role === 'OWNER_ADMIN' || user.role === 'RESTAURANT_OWNER');
    if (isOwnerRole) {
      if (user.businessData) {
        setBusinessData(user.businessData);
      } else if (user.businessName || user.name) {
        setBusinessData({
          businessName: user.businessName || user.name,
          address: user.address || 'New Delhi, India',
          fssaiLicense: user.fssaiLicense || null
        });
      } else if (typeof FoodBridgeApi?.getOwnerBusinessProfile === 'function') {
        FoodBridgeApi.getOwnerBusinessProfile()
          .then(res => {
            if (res) {
              setBusinessData(res);
            } else {
              setBusinessData({ businessName: user.businessName || user.name || 'Food Donor' });
            }
          })
          .catch(() => setBusinessData({ businessName: user.businessName || user.name || 'Food Donor' }));
      } else {
        setBusinessData({ businessName: user.businessName || user.name || 'Food Donor' });
      }
    } else {
      setBusinessData(null);
    }
  }, [user]);

  const switchRole = (newRole) => {
    if (!user) return;
    setUser(prev => ({
      ...prev,
      role: newRole
    }));
  };

  const setLanguage = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      setLang(newLang);
    }
  };

  const logout = () => {
    localStorage.removeItem('foodbridge_jwt_token');
    localStorage.removeItem('foodbridge_user_role');
    localStorage.removeItem('foodbridge_user_id');
    localStorage.removeItem('foodbridge_user_profile');
    setUser(null);
    setBusinessData(null);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.EN;
  const isBusinessOwner = user && (user.role === 'OWNER_ADMIN' || user.role === 'RESTAURANT_OWNER');

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      businessData,
      setBusinessData,
      isBusinessOwner,
      switchRole,
      logout,
      lang,
      setLanguage,
      t
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
