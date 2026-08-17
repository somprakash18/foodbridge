import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const INITIAL_LISTINGS = [
  {
    id: 1,
    restaurantId: 1,
    restaurantName: "Domino's Pizza Center",
    restaurantLogo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
    title: "Surplus Veg Supreme & Garlic Bread Meal",
    description: "Freshly prepared evening surplus pizzas packed in thermal boxes.",
    category: "MEALS",
    dietaryType: "VEG",
    quantityKg: 4.5,
    servings: 12,
    originalPrice: 1200,
    discountedPrice: 350,
    isFreeDonation: false,
    prepTime: "1 Hour Ago",
    expiryHours: 3.5,
    pickupDeadline: "2 Hours",
    storageTemp: "HOT",
    packagingStatus: "PACKED_BOX",
    aiSafetyScore: 0.98,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 1.2,
    location: { lat: 28.6315, lng: 77.2167 },
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-001"
  },
  {
    id: 2,
    restaurantId: 2,
    restaurantName: "Haldiram Sweets & Dining",
    restaurantLogo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80",
    title: "Shahi Paneer & Jeera Rice Bulk Meal",
    description: "Hygienically stored buffet surplus prepared in pure ghee kitchen.",
    category: "MEALS",
    dietaryType: "VEG",
    quantityKg: 12.0,
    servings: 30,
    originalPrice: 3000,
    discountedPrice: 0,
    isFreeDonation: true,
    prepTime: "1.5 Hours Ago",
    expiryHours: 4.0,
    pickupDeadline: "2.5 Hours",
    storageTemp: "HOT",
    packagingStatus: "SEALED_CONTAINER",
    aiSafetyScore: 0.96,
    aiRecommendation: "DONATE_NOW",
    status: "AVAILABLE",
    distanceKm: 2.4,
    location: { lat: 28.6506, lng: 77.2303 },
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-002"
  },
  {
    id: 3,
    restaurantId: 3,
    restaurantName: "The Grand Palace Hotel",
    restaurantLogo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80",
    title: "Royal Hyderabadi Chicken Biryani Pot",
    description: "Premium hotel buffet surplus cooked with aromatic basmati rice.",
    category: "MEALS",
    dietaryType: "NON_VEG",
    quantityKg: 15.0,
    servings: 35,
    originalPrice: 5200,
    discountedPrice: 1250,
    isFreeDonation: false,
    prepTime: "2 Hours Ago",
    expiryHours: 3.0,
    pickupDeadline: "2 Hours",
    storageTemp: "HOT",
    packagingStatus: "SEALED_CONTAINER",
    aiSafetyScore: 0.94,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 3.1,
    location: { lat: 28.5910, lng: 77.1925 },
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-003"
  },
  {
    id: 4,
    restaurantId: 4,
    restaurantName: "BakeHouse Artisanal Bakery",
    restaurantLogo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80",
    title: "Artisanal Sourdough & Croissant Assortment Box",
    description: "Crispy sourdough loaves, butter croissants, and fresh muffins.",
    category: "BAKERY",
    dietaryType: "EGG",
    quantityKg: 5.0,
    servings: 20,
    originalPrice: 1800,
    discountedPrice: 450,
    isFreeDonation: false,
    prepTime: "4 Hours Ago",
    expiryHours: 12.0,
    pickupDeadline: "6 Hours",
    storageTemp: "ROOM_TEMP",
    packagingStatus: "PACKED_BOX",
    aiSafetyScore: 0.99,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 1.8,
    location: { lat: 28.6000, lng: 77.2270 },
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-004"
  }
];

export const AppProvider = ({ children }) => {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [walletBalance, setWalletBalance] = useState(14250.00);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'CREDIT', amount: 14250.00, category: 'FOOD_RECOVERY', desc: 'Surplus food sales recovery payout', date: 'Today, 10:30 AM' },
    { id: 2, type: 'DEBIT', amount: 350.00, category: 'PURCHASE', desc: 'Veg Supreme Pizza purchase #1042', date: 'Yesterday, 08:15 PM' },
    { id: 3, type: 'CREDIT', amount: 50.00, category: 'REFERRAL_REWARD', desc: 'Referral reward from Ananya Sharma', date: '2 days ago' }
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Surplus Food Nearby!', message: 'Haldiram listed 12kg Shahi Paneer available for free NGO donation.', type: 'FOOD_ALERT', time: '10m ago', unread: true },
    { id: 2, title: 'Pickup Request Accepted', message: 'Delivery partner Vikram Singh is en route to collect Order #FB-9081.', type: 'DELIVERY_UPDATE', time: '1h ago', unread: true },
    { id: 3, title: 'Wallet Credited +₹50', message: 'Your referral code was redeemed by new restaurant user.', type: 'REFERRAL', time: '5h ago', unread: false }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Domino\'s Manager', text: 'Hello! The Veg Supreme pizza batch is freshly packed in thermal box #3.', time: '10:14 AM', isUser: false },
    { id: 2, sender: 'You', text: 'Awesome! Our delivery rider Vikram is on the way to scan QR.', time: '10:15 AM', isUser: true }
  ]);
  const [orders, setOrders] = useState([]);
  const [donations, setDonations] = useState([]);
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL-101',
      listingTitle: 'Veg Supreme & Garlic Bread Meal',
      pickupAddress: "Domino's Connaught Place, Block B",
      dropoffAddress: "Vasant Kunj Sector C, New Delhi",
      distanceKm: 4.2,
      earnings: 45.00,
      status: 'ASSIGNED',
      qrCode: 'FOODBRIDGE-QR-001'
    }
  ]);

  const addFoodListing = (newListing) => {
    const listing = {
      ...newListing,
      id: Date.now(),
      status: 'AVAILABLE',
      aiSafetyScore: 0.96,
      distanceKm: (Math.random() * 3 + 0.5).toFixed(1),
      location: { lat: 28.6250 + (Math.random() - 0.5) * 0.05, lng: 77.2180 + (Math.random() - 0.5) * 0.05 },
      image: newListing.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      qrCode: `FOODBRIDGE-QR-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setListings((prev) => [listing, ...prev]);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  };

  const buyListing = (listingId, paymentMethod) => {
    const item = listings.find((l) => l.id === listingId);
    if (!item) return;

    setListings((prev) => prev.map((l) => (l.id === listingId ? { ...l, status: 'RESERVED' } : l)));
    const newOrder = {
      orderNumber: `FB-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      listing: item,
      totalAmount: item.discountedPrice + 25,
      status: 'PLACED',
      paymentMethod,
      date: new Date().toLocaleTimeString()
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Add notification
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: 'Order Confirmed! 🎉',
        message: `Your order for "${item.title}" is confirmed. Track live delivery on your dashboard.`,
        type: 'ORDER_UPDATE',
        time: 'Just now',
        unread: true
      },
      ...prev
    ]);

    confetti({ particleCount: 120, spread: 70, origin: { y: 0.5 } });
  };

  const claimDonation = (listingId, volunteerName) => {
    const item = listings.find((l) => l.id === listingId);
    if (!item) return;

    setListings((prev) => prev.map((l) => (l.id === listingId ? { ...l, status: 'RESERVED' } : l)));
    const newDonation = {
      donationNumber: `FB-NGO-${Math.floor(100000 + Math.random() * 900000)}`,
      listing: item,
      volunteerName,
      status: 'CLAIMED',
      date: new Date().toLocaleTimeString()
    };
    setDonations((prev) => [newDonation, ...prev]);

    setNotifications((prev) => [
      {
        id: Date.now(),
        title: 'Donation Reserved! 🌿',
        message: `Free surplus "${item.title}" reserved for Food Relief Foundation. Volunteer assigned: ${volunteerName}.`,
        type: 'DONATION_UPDATE',
        time: 'Just now',
        unread: true
      },
      ...prev
    ]);

    confetti({ particleCount: 100, spread: 65, origin: { y: 0.6 } });
  };

  const sendChatMessage = (text, attachment = null) => {
    const msg = {
      id: Date.now(),
      sender: 'You',
      text,
      attachment,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };
    setChatMessages((prev) => [...prev, msg]);

    // Simulated automated responder
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'Delivery Partner',
          text: 'Got it! I am scanning the QR code at the restaurant counter now.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false
        }
      ]);
    }, 1500);
  };

  const completeDeliveryViaQr = (qrCodeHash) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.qrCode === qrCodeHash ? { ...d, status: 'DELIVERED' } : d))
    );
    setWalletBalance((prev) => prev + 45.00);
    setTransactions((prev) => [
      { id: Date.now(), type: 'CREDIT', amount: 45.00, category: 'DELIVERY_EARNING', desc: 'Completed QR Verified Delivery #DEL-101', date: 'Just now' },
      ...prev
    ]);
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.4 } });
  };

  return (
    <AppContext.Provider value={{
      listings,
      addFoodListing,
      buyListing,
      claimDonation,
      walletBalance,
      transactions,
      notifications,
      chatMessages,
      sendChatMessage,
      orders,
      donations,
      deliveries,
      completeDeliveryViaQr
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
