import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  QrCode, 
  Navigation, 
  FileText, 
  MessageSquare, 
  ArrowLeft, 
  ChevronRight,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PdfReceiptModal from '../components/PdfReceiptModal';

export default function OrdersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders } = useApp();

  const searchParams = new URLSearchParams(location.search);
  const activeOrderNumber = searchParams.get('orderId');

  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [activeQrOrder, setActiveQrOrder] = useState(null);

  // Combine state orders with default realistic fallback orders if list is empty
  const allOrders = orders.length > 0 ? orders : [
    {
      orderNumber: 'FB-ORD-530010',
      listing: {
        title: "Royal Hyderabadi Chicken Biryani Combo",
        restaurantName: "The Grand Palace Hotel",
        restaurantLogo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        discountedPrice: 99,
        quantityKg: 3.5,
        servings: 8,
        address: "Diplomatic Enclave, Chanakyapuri, New Delhi",
        pickupDeadline: "Ready for Pickup (Next 2 Hours)",
        qrCode: "FOODBRIDGE-QR-530010"
      },
      totalAmount: 124,
      status: 'CONFIRMED',
      paymentMethod: 'Razorpay UPI',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      orderNumber: 'FB-ORD-410928',
      listing: {
        title: "Surplus Veg Supreme & Garlic Bread",
        restaurantName: "Domino's Pizza Center",
        restaurantLogo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        discountedPrice: 350,
        servings: 12,
        address: "Connaught Place, Block B, New Delhi",
        pickupDeadline: "Completed Pickup",
        qrCode: "FOODBRIDGE-QR-410928"
      },
      totalAmount: 375,
      status: 'COMPLETED',
      paymentMethod: 'Razorpay Card',
      date: 'Yesterday'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/buyer')}
            className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <ShoppingBag className="w-7 h-7 text-emerald-600" />
              <span>My Orders & Confirmations</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold">View confirmed surplus food reservations, pickup QR codes & 80G tax receipts</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {allOrders.map((ord) => {
          const isHighlighted = activeOrderNumber && ord.orderNumber === activeOrderNumber;

          return (
            <div 
              key={ord.orderNumber}
              className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all shadow-xl space-y-5 ${
                isHighlighted 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                  : 'border-slate-200/80 dark:border-slate-800'
              }`}
            >
              {/* Order Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="p-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </span>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black tracking-wide border border-emerald-500/20 uppercase">
                      {ord.status === 'COMPLETED' ? 'COMPLETED PICKUP' : 'ORDER CONFIRMED & RESERVED'}
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">Order #{ord.orderNumber}</h3>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs font-semibold text-slate-500">
                  <div className="flex items-center space-x-1 sm:justify-end">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ord.date}</span>
                  </div>
                  <div className="text-emerald-600 font-extrabold text-sm">₹{ord.totalAmount} ({ord.paymentMethod})</div>
                </div>
              </div>

              {/* Listing Details Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center space-x-4">
                  <img 
                    src={ord.listing?.image} 
                    alt={ord.listing?.title} 
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" 
                  />
                  <div>
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {ord.listing?.restaurantName}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{ord.listing?.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold flex items-center mt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1 shrink-0" />
                      <span className="truncate max-w-[280px]">{ord.listing?.address || 'Connaught Place, New Delhi'}</span>
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto text-left sm:text-right">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center sm:justify-end">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {ord.listing?.pickupDeadline}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium block">Show Pickup QR at venue counter</span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <button
                  onClick={() => setActiveQrOrder(ord)}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center space-x-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Show Pickup QR</span>
                </button>

                <button
                  onClick={() => navigate(`/map?search=${encodeURIComponent(ord.listing?.restaurantName || '')}`)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs flex items-center justify-center space-x-1.5"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Route Map</span>
                </button>

                <button
                  onClick={() => setSelectedReceipt(ord)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center space-x-1.5"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>80G Receipt</span>
                </button>

                <button
                  onClick={() => alert(`Connecting live chat with ${ord.listing?.restaurantName}...`)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span>Chat Venue</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Pickup QR Code Modal */}
      {activeQrOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-end">
              <button onClick={() => setActiveQrOrder(null)} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 space-y-1">
              <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Order Pickup Verification QR</h4>
              <p className="text-[11px] text-slate-500 font-semibold">{activeQrOrder.listing?.restaurantName}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center space-y-2 border border-slate-300 dark:border-slate-700">
              <div className="w-44 h-44 bg-white p-2.5 rounded-2xl shadow-lg flex items-center justify-center border-4 border-emerald-500">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(activeQrOrder.listing?.qrCode || 'FOODBRIDGE-QR-530010')}`}
                  alt="Order QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase">{activeQrOrder.listing?.qrCode || 'FOODBRIDGE-QR-530010'}</span>
            </div>

            <button
              onClick={() => setActiveQrOrder(null)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800"
            >
              Done / Close QR
            </button>
          </div>
        </div>
      )}

      {/* PDF Receipt Modal */}
      {selectedReceipt && (
        <PdfReceiptModal
          receipt={{
            id: selectedReceipt.orderNumber,
            donorName: selectedReceipt.listing?.restaurantName || 'FoodBridge Partner',
            businessName: selectedReceipt.listing?.restaurantName || 'FoodBridge Partner',
            date: new Date().toISOString().split('T')[0],
            servings: selectedReceipt.listing?.servings || 8,
            estimatedValueInr: selectedReceipt.totalAmount,
            taxSavedInr: selectedReceipt.totalAmount,
            ngoName: 'Food Relief Foundation (80G/12A Regd)',
            fssaiNumber: '10021011000492'
          }}
          onClose={() => setSelectedReceipt(null)}
        />
      )}

    </div>
  );
}
