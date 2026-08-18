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
    discountedPrice: 149,
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
    title: "Royal Hyderabadi Chicken Biryani Combo",
    description: "Premium hotel buffet surplus cooked with aromatic basmati rice.",
    category: "MEALS",
    dietaryType: "NON_VEG",
    quantityKg: 15.0,
    servings: 35,
    originalPrice: 5200,
    discountedPrice: 99,
    isFreeDonation: false,
    prepTime: "2 Hours Ago",
    expiryHours: 2.0,
    pickupDeadline: "2 Hours",
    storageTemp: "HOT",
    packagingStatus: "SEALED_CONTAINER",
    aiSafetyScore: 0.98,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 1.2,
    location: { lat: 28.5910, lng: 77.1925 },
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-003"
  },
  {
    id: 4,
    restaurantId: 4,
    restaurantName: "BakeHouse Artisanal Bakery",
    restaurantLogo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80",
    title: "Artisanal Sourdough & Belgian Chocolate Croissant Box",
    description: "Crispy sourdough loaves, butter croissants, and fresh muffins.",
    category: "BAKERY",
    dietaryType: "VEG",
    quantityKg: 5.0,
    servings: 20,
    originalPrice: 1800,
    discountedPrice: 49,
    isFreeDonation: false,
    prepTime: "4 Hours Ago",
    expiryHours: 5.0,
    pickupDeadline: "5 Hours",
    storageTemp: "ROOM_TEMP",
    packagingStatus: "PACKED_BOX",
    aiSafetyScore: 0.99,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 1.8,
    location: { lat: 28.6000, lng: 77.2270 },
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-004"
  },
  {
    id: 5,
    restaurantId: 5,
    restaurantName: "Saravana Bhavan South Dining",
    restaurantLogo: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=200&q=80",
    title: "South Indian Idli Sambhar & Crispy Vada Tiffin Box",
    description: "Steaming hot idlis, Medu Vada, coconut chutney & Sambhar.",
    category: "MEALS",
    dietaryType: "VEGAN",
    quantityKg: 6.0,
    servings: 15,
    originalPrice: 450,
    discountedPrice: 39,
    isFreeDonation: false,
    prepTime: "1 Hour Ago",
    expiryHours: 2.5,
    pickupDeadline: "2 Hours",
    storageTemp: "HOT",
    packagingStatus: "PACKED_BOX",
    aiSafetyScore: 0.97,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 0.8,
    location: { lat: 28.6320, lng: 77.2190 },
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-005"
  },
  {
    id: 6,
    restaurantId: 6,
    restaurantName: "Bikanervala Dining & Sweets",
    restaurantLogo: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80",
    title: "Amritsari Chole Bhature & Sweet Lassi Special",
    description: "Fluffy bhature paired with spicy Amritsari chole & cool sweet lassi.",
    category: "MEALS",
    dietaryType: "VEG",
    quantityKg: 7.5,
    servings: 10,
    originalPrice: 500,
    discountedPrice: 45,
    isFreeDonation: false,
    prepTime: "1.5 Hours Ago",
    expiryHours: 3.0,
    pickupDeadline: "2.5 Hours",
    storageTemp: "HOT",
    packagingStatus: "SEALED_CONTAINER",
    aiSafetyScore: 0.95,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 1.5,
    location: { lat: 28.6280, lng: 77.2150 },
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-006"
  },
  {
    id: 7,
    restaurantId: 7,
    restaurantName: "Green Cafe & Organic Bistro",
    restaurantLogo: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&q=80",
    title: "Organic Avocado & Quinoa Detox Grain Bowl",
    description: "Superfood grain bowl with fresh avocado, organic quinoa & tahini dressing.",
    category: "MEALS",
    dietaryType: "VEGAN",
    quantityKg: 3.0,
    servings: 8,
    originalPrice: 750,
    discountedPrice: 89,
    isFreeDonation: false,
    prepTime: "45 Mins Ago",
    expiryHours: 6.0,
    pickupDeadline: "4 Hours",
    storageTemp: "REFRIGERATED",
    packagingStatus: "PACKED_BOX",
    aiSafetyScore: 0.99,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 2.1,
    location: { lat: 28.5950, lng: 77.2200 },
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-007"
  },
  {
    id: 8,
    restaurantId: 8,
    restaurantName: "The French Loaf Bakery",
    restaurantLogo: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=200&q=80",
    title: "Midnight Bakery Box: Muffins, Doughnuts & Danish",
    description: "Assorted blueberry muffins, chocolate glazed doughnuts & fruit danish pastry.",
    category: "BAKERY",
    dietaryType: "VEG",
    quantityKg: 4.0,
    servings: 12,
    originalPrice: 900,
    discountedPrice: 49,
    isFreeDonation: false,
    prepTime: "3 Hours Ago",
    expiryHours: 10.0,
    pickupDeadline: "6 Hours",
    storageTemp: "ROOM_TEMP",
    packagingStatus: "PACKED_BOX",
    aiSafetyScore: 0.98,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 1.6,
    location: { lat: 28.6100, lng: 77.2300 },
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-008"
  },
  {
    id: 9,
    restaurantId: 9,
    restaurantName: "Pind Balluchi Authentic Kitchen",
    restaurantLogo: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=200&q=80",
    title: "Tandoori Malai Chaap & Butter Roti Thali",
    description: "Creamy tandoori chaap, rich gravy & fresh butter rotis.",
    category: "MEALS",
    dietaryType: "VEG",
    quantityKg: 8.0,
    servings: 14,
    originalPrice: 650,
    discountedPrice: 79,
    isFreeDonation: false,
    prepTime: "2 Hours Ago",
    expiryHours: 3.5,
    pickupDeadline: "3 Hours",
    storageTemp: "HOT",
    packagingStatus: "SEALED_CONTAINER",
    aiSafetyScore: 0.96,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 2.8,
    location: { lat: 28.6400, lng: 77.2000 },
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-009"
  },
  {
    id: 10,
    restaurantId: 10,
    restaurantName: "Kake Da Nake Sweet House",
    restaurantLogo: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=200&q=80",
    title: "Fresh Mango Rabri & Kesar Gulab Jamun Sweet Box",
    description: "Traditional Indian sweet box featuring Alphonso Rabri & soft Gulab Jamuns.",
    category: "BAKERY",
    dietaryType: "VEG",
    quantityKg: 5.0,
    servings: 18,
    originalPrice: 850,
    discountedPrice: 69,
    isFreeDonation: false,
    prepTime: "3.5 Hours Ago",
    expiryHours: 12.0,
    pickupDeadline: "8 Hours",
    storageTemp: "REFRIGERATED",
    packagingStatus: "PACKED_BOX",
    aiSafetyScore: 0.99,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 1.1,
    location: { lat: 28.6350, lng: 77.2250 },
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-010"
  },
  {
    id: 11,
    restaurantId: 11,
    restaurantName: "Smoke House Deli Bistro",
    restaurantLogo: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=200&q=80",
    title: "Gourmet Wild Mushroom Risotto & Garlic Bruschetta",
    description: "Italian arborio rice cooked with wild truffled mushrooms & crispy garlic bread.",
    category: "MEALS",
    dietaryType: "VEG",
    quantityKg: 3.5,
    servings: 6,
    originalPrice: 1200,
    discountedPrice: 179,
    isFreeDonation: false,
    prepTime: "1 Hour Ago",
    expiryHours: 3.0,
    pickupDeadline: "2 Hours",
    storageTemp: "HOT",
    packagingStatus: "SEALED_CONTAINER",
    aiSafetyScore: 0.97,
    aiRecommendation: "SELL_NOW",
    status: "AVAILABLE",
    distanceKm: 3.4,
    location: { lat: 28.5800, lng: 77.2100 },
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-011"
  },
  {
    id: 12,
    restaurantId: 12,
    restaurantName: "Taj Palace Hotel Catering",
    restaurantLogo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80",
    title: "Dal Makhani & Jeera Rice Family Pack (Free Shelter Rescue)",
    description: "Slow-cooked black lentils in butter & aromatic basmati rice for emergency shelter pickup.",
    category: "MEALS",
    dietaryType: "VEG",
    quantityKg: 25.0,
    servings: 45,
    originalPrice: 4500,
    discountedPrice: 0,
    isFreeDonation: true,
    prepTime: "1.5 Hours Ago",
    expiryHours: 4.0,
    pickupDeadline: "3 Hours",
    storageTemp: "HOT",
    packagingStatus: "SEALED_CONTAINER",
    aiSafetyScore: 0.99,
    aiRecommendation: "DONATE_NOW",
    status: "AVAILABLE",
    distanceKm: 2.9,
    location: { lat: 28.5900, lng: 77.1850 },
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    qrCode: "FOODBRIDGE-QR-012"
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
      aiSafetyScore: 0.98,
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
      totalAmount: item.discountedPrice > 0 ? item.discountedPrice + 25 : 25,
      status: 'PLACED',
      paymentMethod,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setOrders((prev) => [newOrder, ...prev]);

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
    return newOrder;
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
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
