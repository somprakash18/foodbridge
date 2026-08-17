import React, { createContext, useContext, useState, useEffect } from 'react';

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
  },
  BN: {
    brand: "ফুডব্রিজ",
    tagline: "উদ্বৃত্ত খাবার মার্কেটপ্লেস",
    home: "হোম",
    marketplace: "মার্কেটপ্লেস",
    map: "লাইভ ম্যাপ",
    ngoPortal: "এনজিও পোর্টাল",
    restaurantPortal: "রেস্তোরাঁ পোর্টাল",
    deliveryPortal: "ডেলিভারি পার্টনার",
    adminPortal: "অ্যাডমিন প্যানেল",
    impact: "ইমপ্যাক্ট পরিসংখ্যান",
    eventRescue: "বিবাহ ও অনুষ্ঠান উদ্ধার",
    campusRescue: "ক্যাম্পাস ফুড রেসকিউ",
    community: "কমিউনিটি ও স্ট্রিকস",
    makeDonation: "খাবার দান করুন",
    sosEmergency: "জরুরী SOS",
    switchRole: "রোল পরিবর্তন করুন",
    wallet: "ওয়ালেট",
    login: "সাইন ইন করুন",
    logout: "লগআউট",
    searchPlaceholder: "খাবার, রেস্তোরাঁ, এনজিও খুঁজুন..."
  },
  TA: {
    brand: "ஃபுட்பிரிட்ஜ்",
    tagline: "உணவு சந்தை",
    home: "முகப்பு",
    marketplace: "சந்தை",
    map: "நேரலை வரைபடம்",
    ngoPortal: "தண்டு போர்ட்டல்",
    restaurantPortal: "உணவக போர்ட்டல்",
    deliveryPortal: "டெலிவரி பார்ட்னர்",
    adminPortal: "நிர்வாகி பேனல்",
    impact: "தாக்கம் புள்ளிவிவரங்கள்",
    eventRescue: "திருமண உணவு மீட்பு",
    campusRescue: "கேம்பஸ் உணவு மீட்பு",
    community: "சமூகம்",
    makeDonation: "உணவு தானம் செய்",
    sosEmergency: "அவசர SOS",
    switchRole: "பங்கு மாறு",
    wallet: "வாலெட்",
    login: "உள்நுழை",
    logout: "வெளியேறு",
    searchPlaceholder: "உணவு, உணவகம், என்ஜிஓ தேடுங்கள்..."
  }
};

export function AuthProvider({ children }) {
  // Current active language (EN, HI, BN, TA)
  const [lang, setLang] = useState('EN');

  // Simulated logged-in user with role & KYC badge
  const [user, setUser] = useState({
    id: 'USR-9041',
    name: 'Som Prakash',
    email: 'somprakash@foodbridge.org',
    phone: '+91 98765 43210',
    role: 'RESTAURANT', // RESTAURANT, HOTEL, BAKERY, NGO, BUYER, DELIVERY_PARTNER, OWNER_ADMIN
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    kycStatus: 'APPROVED',
    verificationBadge: 'FSSAI VERIFIED DONOR',
    coinsBalance: 450,
    referralCode: 'SOM2026'
  });

  const switchRole = (newRole) => {
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
    setUser(null);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.EN;

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
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
