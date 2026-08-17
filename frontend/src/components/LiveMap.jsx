import React, { useState, useEffect, useCallback } from 'react';
import { 
  GoogleMap, 
  useJsApiLoader, 
  Marker, 
  InfoWindow, 
  DirectionsRenderer 
} from '@react-google-maps/api';
import { 
  MapPin, 
  Navigation, 
  Truck, 
  Utensils, 
  HeartHandshake, 
  Clock, 
  Search,
  Building2,
  Cookie,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 28.6315,
  lng: 77.2167 // New Delhi
};

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1d2c1d' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a2a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b0' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#c5e0b8' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7cb387' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#273e27' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#2b3f2b' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2e1f' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#385638' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0e1d14' }]
  }
];

export default function LiveMap({ height = "h-[600px]" }) {
  const { listings } = useApp();

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  const [userCoords, setUserCoords] = useState(defaultCenter);
  const [gpsActive, setGpsActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  // Auto-detect user live GPS
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserCoords(coords);
          setGpsActive(true);
        },
        (err) => {
          console.warn("[FoodBridge Google Maps] Geolocation fallback:", err.message);
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
      top: 35,
      left: 30,
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
      top: 25,
      left: 75,
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
      lng: 77.1925,
      top: 70,
      left: 25,
      distanceKm: 3.1,
      address: "Diplomatic Enclave, Chanakyapuri",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
      surplusTitle: "Royal Hyderabadi Chicken Biryani",
      surplusPrice: 1250,
      expiryHours: 3.0
    },
    {
      id: 'B1',
      name: "BakeHouse Artisanal Bakery",
      type: 'BAKERY',
      lat: 28.6000,
      lng: 77.2270,
      top: 60,
      left: 65,
      distanceKm: 1.8,
      address: "Khan Market, New Delhi",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
      surplusTitle: "Artisanal Sourdough & Croissants",
      surplusPrice: 450,
      expiryHours: 12.0
    },
    {
      id: 'N1',
      name: "Food Relief Foundation",
      type: 'NGO',
      lat: 28.5918,
      lng: 77.2274,
      top: 55,
      left: 80,
      distanceKm: 2.1,
      address: "Lodhi Road Community Center",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80",
      surplusTitle: "Active Volunteer Pickup Station"
    },
    {
      id: 'D1',
      name: "Vikram (Driver #4092)",
      type: 'DELIVERY',
      lat: 28.6250,
      lng: 77.2180,
      top: 45,
      left: 45,
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

  const calculateRoute = async (destination) => {
    if (!window.google) {
      alert(`Routing to ${destination.name} (${destination.distanceKm} km away)!`);
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: userCoords,
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: window.google.maps.TravelMode.DRIVING
    });
    setDirectionsResponse(results);
  };

  const onLoad = useCallback((map) => {
    setMapRef(map);
  }, []);

  return (
    <div className={`relative w-full ${height} rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-[#142316]`}>
      
      {/* Top Search Bar */}
      <div className="absolute top-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 z-30">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Places, NGOs, Areas, Food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl glass-card text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Top Right Controls & GPS */}
      <div className="absolute top-4 right-4 z-30 flex items-center space-x-2">
        <div className="px-3 py-2 rounded-2xl bg-[#1C3D28]/90 text-xs font-bold text-white flex items-center space-x-2 border border-emerald-800 shadow-md backdrop-blur-md">
          <span className={`w-2.5 h-2.5 rounded-full ${gpsActive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
          <span>Google Maps API Connected</span>
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
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-[#1C3D28]/80 text-slate-200 border border-emerald-900 hover:bg-[#255234]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Real Google Maps Component when API key is provided */}
      {isLoaded && apiKey ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userCoords}
          zoom={13}
          onLoad={onLoad}
          options={{
            styles: darkMapStyle,
            disableDefaultUI: false,
            zoomControl: true,
          }}
        >
          {/* User Marker */}
          <Marker position={userCoords} title="Your Location" />

          {/* Entity Markers */}
          {filteredEntities.map((entity) => (
            <Marker
              key={entity.id}
              position={{ lat: entity.lat, lng: entity.lng }}
              onClick={() => setSelectedPlace(entity)}
              title={entity.name}
            />
          ))}

          {/* Directions Renderer */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}

          {/* Info Window for Selected Place */}
          {selectedPlace && (
            <InfoWindow
              position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="p-2 text-slate-900 max-w-xs space-y-2">
                <h4 className="font-bold text-sm">{selectedPlace.name}</h4>
                <p className="text-xs text-slate-600">{selectedPlace.address}</p>
                {selectedPlace.surplusTitle && (
                  <div className="text-xs font-semibold text-emerald-700">
                    {selectedPlace.surplusTitle}
                  </div>
                )}
                <button
                  onClick={() => calculateRoute(selectedPlace)}
                  className="w-full py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Get Route Directions
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        /* Fallback Vector Interactive Map */
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-[radial-gradient(#2d553a_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>
          
          <svg className="absolute inset-0 w-full h-full stroke-[#2d553a] stroke-[2] fill-none">
            <path d="M 0 120 Q 300 180 600 120 T 1200 240" />
            <path d="M 200 0 Q 300 400 500 800" />
            <path d="M 600 0 Q 400 300 800 600" />
          </svg>

          {/* GPS Pulse */}
          <div className="absolute top-[45%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute"></div>
              <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center text-white">
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
                {entity.type === 'RESTAURANT' && (
                  <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <Utensils className="w-5 h-5" />
                  </div>
                )}
                {entity.type === 'HOTEL' && (
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <Building2 className="w-5 h-5" />
                  </div>
                )}
                {entity.type === 'BAKERY' && (
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <Cookie className="w-5 h-5" />
                  </div>
                )}
                {entity.type === 'NGO' && (
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                )}
                {entity.type === 'DELIVERY' && (
                  <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                    <Truck className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Selected Place Popup */}
          {selectedPlace && (
            <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-sm bg-white p-5 rounded-3xl shadow-2xl border border-slate-200 space-y-4 animate-in fade-in slide-in-from-bottom-2 text-slate-900">
              <div className="flex items-center space-x-3">
                <img src={selectedPlace.image} alt={selectedPlace.name} className="w-14 h-14 rounded-2xl object-cover" />
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                    {selectedPlace.type}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{selectedPlace.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{selectedPlace.address}</p>
                </div>
              </div>

              {selectedPlace.surplusTitle && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                  <div className="text-xs font-bold text-slate-900">{selectedPlace.surplusTitle}</div>
                  <div className="text-xs font-extrabold text-emerald-700">
                    {selectedPlace.isFree ? 'FREE NGO DONATION' : `₹${selectedPlace.surplusPrice}`}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => calculateRoute(selectedPlace)}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-1"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Navigate Route</span>
                </button>
                <button
                  onClick={() => alert(`Reserved surplus from ${selectedPlace.name}!`)}
                  className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
