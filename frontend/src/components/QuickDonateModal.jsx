import React, { useState } from 'react';
import { 
  Siren, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Utensils, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Package, 
  X, 
  ArrowRight, 
  Truck, 
  Heart,
  Camera
} from 'lucide-react';
import { FoodBridgeApi } from '../services/apiClient';

export default function QuickDonateModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1 = Form, 2 = Live Tracking Confirmation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    location: 'Grand Palace Banquet Hall, Connaught Place, New Delhi',
    contactPerson: 'Rahul Sharma',
    phone: '+91 75630 45006',
    foodDescription: 'Rice, dal, paneer, naan and mixed vegetables (Wedding Feast)',
    servings: '120',
    approxKg: '45',
    foodType: 'VEG',
    pickupDeadline: '11:30 PM Today',
    storageCondition: 'HOT',
    photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    safetyConfirmed: false
  });

  const [requestDetails, setRequestDetails] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.safetyConfirmed) {
      setError("Please confirm that the food is safe and handled appropriately.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await FoodBridgeApi.requestEmergencyDonation({
        address: formData.location,
        phone: formData.phone,
        servings: formData.servings,
        foodType: formData.foodType === 'VEG' ? 'Vegetarian' : 'Non-Vegetarian'
      });

      setRequestDetails(res);
      setStep(2); // Proceed to Confirmation & Live Status Tracker!
    } catch (err) {
      setError(err.message || "Failed to submit emergency food donation request.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setRequestDetails(null);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600">
              <Siren className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">Donate Leftover Food Now</h3>
              <p className="text-[11px] text-slate-500 font-semibold">1-Minute Emergency Surplus Rescue</p>
            </div>
          </div>
          <button onClick={handleReset} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: FAST-TRACK 1-MINUTE FORM */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            
            {/* Safety Warning Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 text-amber-800 dark:text-amber-300 text-[11px] font-medium leading-relaxed space-y-1">
              <div className="flex items-center space-x-1.5 font-bold text-amber-900 dark:text-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Food Safety Requirement</span>
              </div>
              <p>Only donate food that has been safely prepared, stored and handled. FoodBridge partners may reject food that does not meet safety standards.</p>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">Pickup Location / Venue</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Contact Person</label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Contact Phone (+91)</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 block mb-1">Food Description</label>
              <input
                type="text"
                placeholder="e.g. Rice, dal, paneer, naan and mixed vegetables"
                value={formData.foodDescription}
                onChange={(e) => setFormData({ ...formData, foodDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Approx. Servings (People)</label>
                <input
                  type="number"
                  value={formData.servings}
                  onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Food Type</label>
                <select
                  value={formData.foodType}
                  onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                >
                  <option value="VEG">Vegetarian</option>
                  <option value="NON_VEG">Non-Vegetarian</option>
                  <option value="BOTH">Both Veg & Non-Veg</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Pickup Deadline Time</label>
                <input
                  type="text"
                  value={formData.pickupDeadline}
                  onChange={(e) => setFormData({ ...formData, pickupDeadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1">Storage Condition</label>
                <select
                  value={formData.storageCondition}
                  onChange={(e) => setFormData({ ...formData, storageCondition: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none font-bold text-slate-900 dark:text-white"
                >
                  <option value="HOT">Hot / Warm</option>
                  <option value="REFRIGERATED">Refrigerated</option>
                  <option value="ROOM_TEMPERATURE">Room Temperature</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <input
                type="checkbox"
                id="emergencySafety"
                checked={formData.safetyConfirmed}
                onChange={(e) => setFormData({ ...formData, safetyConfirmed: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <label htmlFor="emergencySafety" className="text-[11px] text-slate-700 dark:text-slate-300 font-bold leading-snug">
                I confirm that the food is safe for donation and has been stored/handled appropriately.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl flex items-center justify-center space-x-2 transition-all mt-2"
            >
              <span>Submit Emergency Food Rescue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: REAL-TIME CONFIRMATION & PICKUP TRACKER */}
        {step === 2 && requestDetails && (
          <div className="space-y-5 text-xs">
            
            {/* Success Header */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-center space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-base font-black text-emerald-900 dark:text-emerald-300">Food Donation Request Created Successfully!</h4>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">Request ID: <strong>{requestDetails.requestId}</strong></p>
            </div>

            {/* Request Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-slate-500 font-semibold">
                <span>Pickup Location:</span>
                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{requestDetails.pickupLocation}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 font-semibold">
                <span>Estimated Quantity:</span>
                <span className="font-black text-emerald-600">{requestDetails.estimatedServings} Servings ({requestDetails.foodType})</span>
              </div>
            </div>

            {/* Live Pickup Status Timeline */}
            <div className="space-y-3 pt-1">
              <h5 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wider">Live Pickup Status</h5>

              <div className="space-y-2">
                {[
                  { key: 'SEARCHING_FOR_PICKUP', label: 'Searching for Pickup', desc: 'Alerting nearby verified NGOs and volunteers', color: 'bg-amber-500 text-white', active: true },
                  { key: 'VOLUNTEER_ASSIGNED', label: 'Volunteer Assigned', desc: 'Pickup partner en route to venue', color: 'bg-slate-200 text-slate-500', active: false },
                  { key: 'FOOD_COLLECTED', label: 'Food Collected', desc: 'Food quality checked and loaded into vehicle', color: 'bg-slate-200 text-slate-500', active: false },
                  { key: 'DELIVERED', label: 'Delivered to People in Need', desc: 'Distributed to community shelter', color: 'bg-slate-200 text-slate-500', active: false }
                ].map((st, idx) => (
                  <div key={st.key} className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] shrink-0 ${st.active ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-black text-slate-900 dark:text-white text-xs">{st.label}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{st.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matched Nearby Partners Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-300 font-extrabold">
                <span className="flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Nearby Partners Available</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black">
                  {requestDetails.matchedPartners?.count || 3} Partners
                </span>
              </div>
              <div className="space-y-1.5 pt-1">
                {requestDetails.matchedPartners?.partners?.map((pt) => (
                  <div key={pt.id} className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    <span>• {pt.name}</span>
                    <span className="text-emerald-600 font-bold">📍 {pt.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs transition-all border border-rose-200"
              >
                Cancel Request
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg transition-all"
              >
                Track Live Pickup
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
