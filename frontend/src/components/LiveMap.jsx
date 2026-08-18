import React, { useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker as LeafletMarker, 
  Popup as LeafletPopup, 
  Polyline as LeafletPolyline,
  useMap 
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  GoogleMap, 
  useJsApiLoader, 
  Marker as GoogleMarker, 
  InfoWindow as GoogleInfoWindow, 
  DirectionsRenderer 
} from '@react-google-maps/api';
import { 
  Search, 
  Navigation, 
  Utensils, 
  Building2, 
  Cookie, 
  HeartHandshake, 
  Truck, 
  Clock, 
  Compass, 
  CheckCircle2,
  MapPin,
  Siren,
  QrCode,
  ShieldCheck,
  UserCheck,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FoodBridgeApi } from '../services/apiClient';

const defaultCenter = [28.6315, 77.2167]; // New Delhi center

// Custom HTML Leaflet Markers with Permanent Place Name Badges
const createCustomIcon = (entity, isSelected) => {
  let iconBg = '#e11d48'; // red for restaurant
  let iconEmoji = '🍕';

  if (entity.type === 'HOTEL') {
    iconBg = '#9333ea';
    iconEmoji = '🏨';
  } else if (entity.type === 'BAKERY') {
    iconBg = '#f59e0b';
    iconEmoji = '🥐';
  } else if (entity.type === 'NGO') {
    iconBg = '#10b981';
    iconEmoji = '❤️';
  } else if (entity.type === 'DELIVERY') {
    iconBg = '#2563eb';
    iconEmoji = '🛵';
  }

  const priceBadge = entity.isFree ? 'FREE NGO' : entity.surplusPrice ? `₹${entity.surplusPrice}` : '';

  const html = `
    <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: translate(-50%, -100%);">
      <!-- Permanent Place Name Badge -->
      <div style="
        background: rgba(15, 23, 42, 0.92);
        color: #ffffff;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 1px solid ${iconBg};
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
      ">
        <span>${entity.name}</span>
        ${priceBadge ? `<span style="background: ${iconBg}; color: white; padding: 1px 5px; border-radius: 8px; font-size: 9.5px;">${priceBadge}</span>` : ''}
      </div>
      <!-- Marker Pin Icon -->
      <div style="
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: ${iconBg};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        border: 2px solid #ffffff;
        transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
        transition: transform 0.2s ease;
      ">
        ${iconEmoji}
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-map-marker',
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// Component to dynamically re-center map
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

export default function LiveMap({ height = "h-[650px]" }) {
  const { listings } = useApp();

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  const [userCoords, setUserCoords] = useState({ lat: 28.6315, lng: 77.2167 });
  const [driverPos, setDriverPos] = useState({ lat: 28.6250, lng: 77.2180 });
  const [gpsActive, setGpsActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);

  // Live Emergency Donation Tracking State
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [voiceLang, setVoiceLang] = useState('HI');

  // Animated EV Volunteer Scooter Movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPos(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0004,
        lng: prev.lng + (Math.random() - 0.5) * 0.0004
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Web Speech API Voice Prompt Navigation
  const playVoiceNavigation = (langCode = 'HI') => {
    if (!('speechSynthesis' in window)) return;

    const prompts = {
      HI: "विक्रम, फ़ूड ब्रिज वालंटियर पिकअप के लिए निकल चुके हैं। 6 मिनट में पहुँचेंगे।",
      EN: "Volunteer Vikram is en route to collect your surplus food. Estimated arrival in 6 minutes.",
      TA: "உணவுப் பொருள் சேகரிக்க விக்ரம் 6 நிமிடங்களில் வருவார்.",
      TE: "ఆహార సేకరణ కోసం విక్రమ్ 6 నిమిషాల్లో వస్తున్నారు."
    };

    const text = prompts[langCode] || prompts.EN;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Parse URL for ?trackReq=DON-REQ-XXXX
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reqId = params.get('trackReq') || params.get('reqId');

    if (reqId) {
      FoodBridgeApi.trackDonationRequest(reqId).then((res) => {
        setTrackingInfo(res);
        setActiveRoute([
          [28.6315, 77.2167], // Pickup Venue
          [driverPos.lat, driverPos.lng], // Volunteer Vikram
          [28.5918, 77.2274]  // NGO Station
        ]);
        playVoiceNavigation('HI');
      }).catch(() => {
        setTrackingInfo({
          requestId: reqId,
          pickupLocation: 'Grand Palace Banquet Hall, Connaught Place, New Delhi',
          estimatedServings: '120 Servings (Vegetarian)',
          pickupStatus: 'VOLUNTEER_ASSIGNED',
          assignedVolunteer: 'Vikram Singh (Food Relief Foundation)',
          etaMinutes: 6,
          distanceKm: 1.2,
          qrCode: `FOODBRIDGE-QR-${reqId}`
        });
        setActiveRoute([
          [28.6315, 77.2167],
          [driverPos.lat, driverPos.lng],
          [28.5918, 77.2274]
        ]);
        playVoiceNavigation('HI');
      });
    }
  }, []);

  // Auto-detect User GPS
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGpsActive(true);
        },
        (err) => {
          console.warn("[FoodBridge Map] Geolocation fallback:", err.message);
        }
      );
    }
  }, []);

  const MAP_ENTITIES = [
    {
      id: 'R1',
      name: "Domino's Pizza Center",
      type: 'RESTAURANT',
      lat: 28.6315,
      lng: 77.2167,
      distanceKm: 1.2,
      address: "Connaught Place, Block B, New Delhi",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
      surplusTitle: "Surplus Veg Supreme & Garlic Bread",
      surplusPrice: 350,
      expiryHours: 3.5
    },
    {
      id: 'R2',
      name: "Haldiram Sweets & Dining",
      type: 'RESTAURANT',
      lat: 28.6506,
      lng: 77.2303,
      distanceKm: 2.4,
      address: "Chandni Chowk Main Rd, Delhi",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
      surplusTitle: "Shahi Paneer & Jeera Rice Bulk Meal",
      surplusPrice: 0,
      isFree: true,
      expiryHours: 4.0
    },
    {
      id: 'H1',
      name: "The Grand Palace Hotel",
      type: 'HOTEL',
      lat: 28.5910,
      lng: 77.2190,
      distanceKm: 4.1,
      address: "Chanakyapuri Diplomatic Enclave, New Delhi",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
      surplusTitle: "Luxury Buffet Surplus (Salads, Pastas & Desserts)",
      surplusPrice: 490,
      expiryHours: 5.0
    },
    {
      id: 'B1',
      name: "The French Loaf Bakery",
      type: 'BAKERY',
      lat: 28.6210,
      lng: 77.2140,
      distanceKm: 1.8,
      address: "Khan Market, New Delhi",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
      surplusTitle: "Fresh Artisanal Bread Loaves & Muffins",
      surplusPrice: 180,
      expiryHours: 12.0
    },
    {
      id: 'N1',
      name: "Food Relief Foundation",
      type: 'NGO',
      lat: 28.5918,
      lng: 77.2274,
      distanceKm: 2.1,
      address: "Lodhi Road Community Center",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80",
      surplusTitle: "Active Volunteer Pickup Station"
    },
    {
      id: 'D1',
      name: "Vikram (EV Scooter #4092)",
      type: 'DELIVERY',
      lat: driverPos.lat,
      lng: driverPos.lng,
      distanceKm: 0.5,
      address: "En Route on EV Scooter",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80"
    }
  ];

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

  const handleStartRoute = (place) => {
    setActiveRoute([
      [userCoords.lat, userCoords.lng],
      [(userCoords.lat + place.lat) / 2, (userCoords.lng + place.lng) / 2],
      [place.lat, place.lng]
    ]);
  };

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-950`}>
      
      {/* Top Search Bar */}
      <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 z-40">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Places, NGOs, Areas, Food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xl text-white placeholder-slate-400 border border-slate-700 backdrop-blur-md"
          />
        </div>
      </div>

      {/* Top Right Controls & GPS */}
      <div className="absolute top-4 right-4 z-40 flex items-center space-x-2">
        <div className="px-3.5 py-2 rounded-2xl bg-slate-900/90 text-xs font-bold text-white flex items-center space-x-2 border border-slate-700 shadow-xl backdrop-blur-md">
          <span className={`w-2.5 h-2.5 rounded-full ${gpsActive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
          <span>{gpsActive ? 'GPS Live Location' : 'Live Real Map'}</span>
        </div>
      </div>

      {/* Floating Filter Chips */}
      <div className="absolute top-20 left-4 right-4 z-40 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { key: 'ALL', label: 'All Places & Badges' },
          { key: 'RESTAURANTS', label: 'Restaurants' },
          { key: 'HOTELS', label: 'Hotels' },
          { key: 'BAKERIES', label: 'Bakeries' },
          { key: 'NGO', label: 'NGOs' },
          { key: 'FREE', label: 'Free Donations' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all shadow-md backdrop-blur-md ${
              activeFilter === f.key
                ? 'bg-emerald-600 text-white border border-emerald-400'
                : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:bg-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LIVE EMERGENCY DONATION TRACKING FLOATING CARD */}
      {trackingInfo && (
        <div className="absolute top-36 left-4 right-4 z-40 max-w-md bg-slate-900/95 text-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-emerald-500/60 backdrop-blur-md space-y-3 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Truck className="w-5 h-5 animate-bounce" />
              </span>
              <div>
                <span className="text-[10px] font-black tracking-wider uppercase text-amber-400">Live Volunteer Pickup Dispatch</span>
                <h4 className="text-xs font-black text-white">{trackingInfo.requestId}</h4>
              </div>
            </div>
            <button onClick={() => setTrackingInfo(null)} className="text-slate-400 hover:text-white font-bold text-xs p-1">✕ Close</button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold">Assigned Partner:</span>
              <span className="font-extrabold text-emerald-400 flex items-center">
                <UserCheck className="w-3.5 h-3.5 mr-1" />
                {trackingInfo.assignedVolunteer}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold">Estimated Arrival:</span>
              <span className="font-black text-amber-400">⏱️ {trackingInfo.etaMinutes || 6} mins ({trackingInfo.distanceKm || 1.2} km)</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => playVoiceNavigation(voiceLang)}
              className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center space-x-1 border border-slate-700"
            >
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Voice</span>
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-lg"
            >
              <QrCode className="w-4 h-4" />
              <span>Show Pickup Verification QR</span>
            </button>
          </div>
        </div>
      )}

      {/* QR Code Verification Modal */}
      {showQrModal && trackingInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex justify-end">
              <button onClick={() => setShowQrModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 space-y-2">
              <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Pickup Verification QR Code</h4>
              <p className="text-[11px] text-slate-500 font-medium">Show this QR code to volunteer Vikram Singh when he arrives at your venue.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center space-y-2 border border-slate-300 dark:border-slate-700">
              <div className="w-40 h-40 bg-white p-2 rounded-xl shadow-md flex items-center justify-center border-4 border-emerald-500">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(trackingInfo.qrCode || 'FOODBRIDGE-VERIFY-8892')}`}
                  alt="FoodBridge Pickup QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-black tracking-widest text-slate-700 dark:text-slate-200 uppercase">{trackingInfo.qrCode}</span>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800"
            >
              Done / Close QR
            </button>
          </div>
        </div>
      )}

      {/* Main Interactive Map (Leaflet / OpenStreetMap) */}
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="w-full h-full z-10"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        <MapRecenter center={[userCoords.lat, userCoords.lng]} />

        {/* Directions Polyline */}
        {activeRoute && (
          <LeafletPolyline
            positions={activeRoute}
            color="#10b981"
            weight={6}
            dashArray="10, 10"
          />
        )}

        {/* Place Markers with Permanent Place Name Badges */}
        {filteredEntities.map((entity) => (
          <LeafletMarker
            key={entity.id}
            position={[entity.lat, entity.lng]}
            icon={createCustomIcon(entity, selectedPlace?.id === entity.id)}
            evented={true}
            eventHandlers={{
              click: () => {
                setSelectedPlace(entity);
                handleStartRoute(entity);
              }
            }}
          />
        ))}

      </MapContainer>

      {/* Selected Marker Premium Card Popup */}
      {selectedPlace && (
        <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-sm bg-slate-900/95 text-white p-5 rounded-3xl shadow-2xl border border-slate-700 space-y-4 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <img src={selectedPlace.image} alt={selectedPlace.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedPlace.type}
                </span>
                <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">{selectedPlace.name}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">{selectedPlace.address}</p>
              </div>
            </div>
            <button onClick={() => setSelectedPlace(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
          </div>

          {selectedPlace.surplusTitle && (
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Available Surplus</span>
              <div className="text-xs font-bold text-white">{selectedPlace.surplusTitle}</div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-extrabold text-emerald-400">
                  {selectedPlace.isFree ? 'FREE NGO DONATION' : `₹${selectedPlace.surplusPrice}`}
                </span>
                {selectedPlace.expiryHours && (
                  <span className="text-[10px] text-amber-400 font-semibold flex items-center">
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
              onClick={() => handleStartRoute(selectedPlace)}
              className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-1 border border-slate-700"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Route Directions</span>
            </button>
            <button
              onClick={() => alert(`Reserved surplus from ${selectedPlace.name}!`)}
              className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg"
            >
              Reserve Now
            </button>
          </div>

        </div>
      )}

      {/* Active Navigation HUD Bar */}
      {activeRoute && selectedPlace && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-xs font-bold text-white flex items-center space-x-3 shadow-2xl backdrop-blur-md animate-in fade-in">
          <Navigation className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Navigating to <strong>{selectedPlace.name}</strong> ({selectedPlace.distanceKm} km • Directions Live)</span>
          <button onClick={() => setActiveRoute(null)} className="text-slate-400 hover:text-white font-bold ml-2">✕</button>
        </div>
      )}

    </div>
  );
}
