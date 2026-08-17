import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Truck, 
  Utensils, 
  HeartHandshake, 
  ShieldCheck, 
  Clock, 
  Search,
  Filter,
  Building2,
  Cookie,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LiveMap({ height = "h-[600px]" }) {
  const { listings } = useApp();

  // User Live GPS state
  const [userCoords, setUserCoords] = useState({ lat: 28.6315, lng: 77.2167 });
  const [gpsActive, setGpsActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [navigationRoute, setNavigationRoute] = useState(null);

  // Auto-detect user GPS on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGpsActive(true);
        },
        (err) => {
          console.warn("[FoodBridge Map] Geolocation fallback used:", err.message);
        }
      );
    }
  }, []);

  // Map Entities (Restaurants, Hotels, Bakeries, NGOs, Drivers)
  const MAP_ENTITIES = [
    {
      id: 'R1',
      name: "Domino's Pizza Center",
      type: 'RESTAURANT',
      subType: 'RESTAURANT',
      rating: 4.85,
      lat: 28.6315,
      lng: 77.2167,
      top: 35,
      left: 30,
      distanceKm: 1.2,
      address: "Connaught Place, Block B, New Delhi",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
      isOpen: true,
      surplusTitle: "Surplus Veg Supreme & Garlic Bread",
      surplusPrice: 350,
      expiryHours: 3.5
    },
    {
      id: 'R2',
      name: "Haldiram Sweets & Dining",
      type: 'RESTAURANT',
      subType: 'RESTAURANT',
      rating: 4.90,
      lat: 28.6506,
      lng: 77.2303,
      top: 25,
      left: 75,
      distanceKm: 2.4,
      address: "Chandni Chowk Main Rd, Delhi",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
      isOpen: true,
      surplusTitle: "Shahi Paneer & Jeera Rice Bulk Meal",
      surplusPrice: 0, // Free NGO
      isFree: true,
      expiryHours: 4.0
    },
    {
      id: 'H1',
      name: "The Grand Palace Hotel",
      type: 'HOTEL',
      subType: 'HOTEL',
      rating: 4.95,
      lat: 28.5910,
      lng: 77.1925,
      top: 70,
      left: 25,
      distanceKm: 3.1,
      address: "Diplomatic Enclave, Chanakyapuri",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
      isOpen: true,
      surplusTitle: "Royal Hyderabadi Chicken Biryani",
      surplusPrice: 1250,
      expiryHours: 3.0
    },
    {
      id: 'B1',
      name: "BakeHouse Artisanal Bakery",
      type: 'BAKERY',
      subType: 'BAKERY',
      rating: 4.80,
      lat: 28.6000,
      lng: 77.2270,
      top: 60,
      left: 65,
      distanceKm: 1.8,
      address: "Khan Market, New Delhi",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
      isOpen: true,
      surplusTitle: "Artisanal Sourdough & Croissants",
      surplusPrice: 450,
      expiryHours: 12.0
    },
    {
      id: 'N1',
      name: "Food Relief Foundation",
      type: 'NGO',
      subType: 'NGO',
      rating: 5.0,
      lat: 28.5918,
      lng: 77.2274,
      top: 55,
      left: 80,
      distanceKm: 2.1,
      address: "Lodhi Road Community Center",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80",
      capacity: "1,200 meals/day",
      isOpen: true,
      surplusTitle: "Active Volunteer Pickup Station"
    },
    {
      id: 'D1',
      name: "Vikram (Driver #4092)",
      type: 'DELIVERY',
      subType: 'DELIVERY',
      rating: 4.92,
      lat: 28.6250,
      lng: 77.2180,
      top: 45,
      left: 45,
      distanceKm: 0.5,
      address: "En Route on EV Scooter",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80",
      isOpen: true
    }
  ];

  // Filtering Logic
  const filteredEntities = MAP_ENTITIES.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.address.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'RESTAURANTS' && (item.type === 'RESTAURANT' || item.type === 'HOTEL' || item.type === 'BAKERY')) return true;
    if (activeFilter === 'NGO' && item.type === 'NGO') return true;
    if (activeFilter === 'HOTELS' && item.type === 'HOTEL') return true;
    if (activeFilter === 'BAKERIES' && item.type === 'BAKERY') return true;
    if (activeFilter === 'FREE' && item.isFree) return true;
    return true;
  });

  const handleStartNavigation = (place) => {
    setNavigationRoute({
      destination: place.name,
      distanceKm: place.distanceKm,
      etaMinutes: Math.round(place.distanceKm * 4 + 3)
    });
  };

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden shadow-soft-lg border border-slate-200 dark:border-slate-800 bg-slate-950`}>
      
      {/* Map Grid Background Simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>

      {/* SVG Vector Roads & Route Line */}
      <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-[2] fill-none">
        <path d="M 0 120 Q 300 180 600 120 T 1200 240" />
        <path d="M 200 0 Q 300 400 500 800" />
        <path d="M 600 0 Q 400 300 800 600" />

        {/* Animated Navigation Polyline */}
        {navigationRoute && (
          <path
            d="M 250 250 L 300 350 L 450 450"
            className="stroke-emerald-400 stroke-[4] stroke-dasharray-[8] animate-pulse"
          />
        )}
      </svg>

      {/* Top Search Bar */}
      <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 z-30">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Places, NGOs, Areas, Food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl glass-card text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-soft-lg"
          />
        </div>
      </div>

      {/* Top Right Controls & GPS */}
      <div className="absolute top-4 right-4 z-30 flex items-center space-x-2">
        <div className="px-3 py-2 rounded-2xl glass-panel text-xs font-bold text-white flex items-center space-x-2 border border-slate-700">
          <span className={`w-2.5 h-2.5 rounded-full ${gpsActive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
          <span>{gpsActive ? 'GPS Live Location' : 'Default Delhi View'}</span>
        </div>
      </div>

      {/* Floating Filter Chips */}
      <div className="absolute top-20 left-4 right-4 z-30 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { key: 'ALL', label: 'All Markers' },
          { key: 'RESTAURANTS', label: 'Restaurants' },
          { key: 'HOTELS', label: 'Hotels' },
          { key: 'BAKERIES', label: 'Bakeries' },
          { key: 'NGO', label: 'NGOs' },
          { key: 'FREE', label: 'Free Donations' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap backdrop-blur-md transition-all shadow-sm ${
              activeFilter === f.key
                ? 'bg-brand-600 text-white shadow-soft'
                : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Live GPS User Marker (Blue Pulse) */}
      <div className="absolute top-[45%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-500/30 animate-ping absolute"></div>
          <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      {/* Filtered Map Entities */}
      {filteredEntities.map((entity) => {
        const isSelected = selectedPlace?.id === entity.id;

        return (
          <div
            key={entity.id}
            onClick={() => setSelectedPlace(entity)}
            style={{ top: `${entity.top}%`, left: `${entity.left}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-transform duration-200 ${
              isSelected ? 'scale-125 z-30' : 'hover:scale-110'
            }`}
          >
            {/* Red Fork (Restaurant) */}
            {entity.type === 'RESTAURANT' && (
              <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-rose-600/30">
                <Utensils className="w-5 h-5" />
              </div>
            )}

            {/* Purple Building (Hotel) */}
            {entity.type === 'HOTEL' && (
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-purple-600/30">
                <Building2 className="w-5 h-5" />
              </div>
            )}

            {/* Orange Bread (Bakery) */}
            {entity.type === 'BAKERY' && (
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-amber-500/30">
                <Cookie className="w-5 h-5" />
              </div>
            )}

            {/* Green Heart (NGO) */}
            {entity.type === 'NGO' && (
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-emerald-500/30">
                <HeartHandshake className="w-5 h-5" />
              </div>
            )}

            {/* Blue Bike (Delivery Rider) */}
            {entity.type === 'DELIVERY' && (
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-brand-500/30 animate-pulse">
                <Truck className="w-5 h-5" />
              </div>
            )}
          </div>
        );
      })}

      {/* Selected Marker Premium Glassmorphic Popup */}
      {selectedPlace && (
        <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-sm glass-card p-5 rounded-3xl shadow-soft-lg border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in slide-in-from-bottom-2">
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <img src={selectedPlace.image} alt={selectedPlace.name} className="w-14 h-14 rounded-2xl object-cover" />
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                  {selectedPlace.type}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">{selectedPlace.name}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{selectedPlace.address}</p>
              </div>
            </div>
          </div>

          {selectedPlace.surplusTitle && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Available Surplus</span>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{selectedPlace.surplusTitle}</div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                  {selectedPlace.isFree ? 'FREE NGO DONATION' : `₹${selectedPlace.surplusPrice}`}
                </span>
                {selectedPlace.expiryHours && (
                  <span className="text-[10px] text-amber-500 font-semibold flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Expires in {selectedPlace.expiryHours}h
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleStartNavigation(selectedPlace)}
              className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center space-x-1"
            >
              <Navigation className="w-3.5 h-3.5 text-brand-500" />
              <span>Navigate Route</span>
            </button>
            <button
              onClick={() => alert(`Reserved surplus from ${selectedPlace.name}!`)}
              className="py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-soft"
            >
              Reserve Now
            </button>
          </div>

        </div>
      )}

      {/* Active Navigation HUD Bar */}
      {navigationRoute && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-2xl glass-panel border border-emerald-500/40 text-xs font-bold text-white flex items-center space-x-3 shadow-soft-lg animate-in fade-in">
          <Navigation className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Routing to <strong>{navigationRoute.destination}</strong> ({navigationRoute.distanceKm} km • {navigationRoute.etaMinutes} mins ETA)</span>
          <button onClick={() => setNavigationRoute(null)} className="text-slate-400 hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

    </div>
  );
}
