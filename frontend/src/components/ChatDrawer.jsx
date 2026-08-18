import React, { useState } from 'react';
import { Send, Image, Paperclip, X, CheckCheck, User, ShieldCheck, HeartHandshake, Utensils, Truck, HelpCircle, Sparkles } from 'lucide-react';

export default function ChatDrawer({ isOpen, onClose }) {
  const [activeThread, setActiveThread] = useState('NGO'); // NGO, RESTAURANT, DRIVER, SUPPORT

  const [threads, setThreads] = useState({
    NGO: [
      { id: 1, sender: 'Food Relief Foundation', text: 'Hi! Our driver Vikram is en route for the 25kg Shahi Paneer pickup.', time: '2:25 PM', isUser: false },
      { id: 2, sender: 'You', text: 'Great! The food is packed in insulated containers at Gate 2.', time: '2:26 PM', isUser: true },
      { id: 3, sender: 'Food Relief Foundation', text: 'Perfect, Vikram will reach in 8 minutes.', time: '2:27 PM', isUser: false },
    ],
    RESTAURANT: [
      { id: 101, sender: 'Domino\'s Manager', text: 'Hello! The Veg Supreme pizza batch is freshly packed in thermal box #3.', time: '1:14 PM', isUser: false },
      { id: 102, sender: 'You', text: 'Awesome! I have placed the pickup order via Razorpay.', time: '1:15 PM', isUser: true },
      { id: 103, sender: 'Domino\'s Manager', text: 'Great! Show the QR code at counter 2 for instant collection.', time: '1:16 PM', isUser: false }
    ],
    DRIVER: [
      { id: 201, sender: 'Vikram (EV Scooter Rider)', text: 'Namaste! I am 3 minutes away from your wedding venue gate.', time: '2:30 PM', isUser: false },
      { id: 202, sender: 'You', text: 'I am standing near the main entrance with 120 servings packed.', time: '2:31 PM', isUser: true },
      { id: 203, sender: 'Vikram (EV Scooter Rider)', text: 'Arriving now! Please keep the QR code ready for verification.', time: '2:32 PM', isUser: false }
    ],
    SUPPORT: [
      { id: 301, sender: 'FoodBridge 24/7 Helpline', text: 'Welcome to FoodBridge Support! Ask me any question about your food order, live delivery tracking, or 80G tax receipt.', time: '10:00 AM', isUser: false }
    ]
  });

  const [inputMsg, setInputMsg] = useState('');
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  if (!isOpen) return null;

  const currentMessages = threads[activeThread] || [];

  const generateSmartResponse = (query, thread) => {
    const q = query.toLowerCase().trim();

    // 1. Tax / 80G Receipts
    if (q.includes('tax') || q.includes('80g') || q.includes('receipt') || q.includes('certificate') || q.includes('deduct')) {
      return "You can download your signed 80G Tax Exemption Certificate (PDF) instantly under 'My Orders' or from your donation confirmation screen. All NGO food donations qualify for 100% tax credit under Section 80G!";
    }

    // 2. Driver / Tracking / Location / ETA
    if (q.includes('driver') || q.includes('track') || q.includes('where') || q.includes('location') || q.includes('eta') || q.includes('reach') || q.includes('time') || q.includes('late') || q.includes('scooter') || q.includes('map')) {
      if (thread === 'DRIVER') {
        return "Namaste! I am on my EV Scooter (#4092) approximately 2.8 km away. I will reach your entrance in about 6 minutes. Please keep your QR code ready!";
      }
      return "Driver Vikram (EV Scooter #4092) is currently en route and tracked live on OpenStreetMap with real-time GPS telemetry. Estimated arrival is within 8 minutes!";
    }

    // 3. QR Code / Payment / Razorpay / Pickup
    if (q.includes('qr') || q.includes('code') || q.includes('pay') || q.includes('order') || q.includes('confirm') || q.includes('counter') || q.includes('pickup')) {
      if (thread === 'RESTAURANT') {
        return "Your surplus food order #FB-ORD-530010 is packed and sealed in thermal boxes at Counter 2! Show your 6-digit QR code upon arrival.";
      }
      return "Your order is confirmed! Show the 6-digit Pickup QR code from your 'My Orders' screen to the counter manager to collect your meal.";
    }

    // 4. Food Safety / Freshness / AI Confidence Score
    if (q.includes('safe') || q.includes('fresh') || q.includes('quality') || q.includes('score') || q.includes('temp') || q.includes('spoil') || q.includes('hygiene')) {
      return "All surplus batches pass our Gemini AI Freshness Inspection with a 98% safety confidence score. Food is stored at 68°C in insulated containers with 4.5 hours remaining shelf-life.";
    }

    // 5. Wedding / Event Leftovers
    if (q.includes('wedding') || q.includes('event') || q.includes('marriage') || q.includes('party') || q.includes('bulk') || q.includes('catering')) {
      return "Our Emergency Event Rescue team dispatches insulated van pickups within 30 minutes for large wedding/event surplus (50 to 500+ servings). Trigger 'Wedding Rescue' on the home screen!";
    }

    // 6. Greetings & Help
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('namaste')) {
      return `Hello! Welcome to FoodBridge ${thread} channel. How can I assist you with your surplus food rescue, live delivery tracking, or order confirmation today?`;
    }

    if (q.includes('price') || q.includes('cost') || q.includes('discount') || q.includes('free')) {
      return "FoodBridge surplus meals are discounted up to 75% off (e.g. ₹99 for biryani combos), while NGO emergency donations are 100% free!";
    }

    // Context-sensitive Fallback dynamically incorporating query subject
    if (thread === 'DRIVER') {
      return `Understood regarding "${query}". I am currently navigating traffic towards your pickup address. I will update you as soon as I pull up!`;
    } else if (thread === 'RESTAURANT') {
      return `Got your note about "${query}". Our kitchen team has prepared and thermal-sealed your surplus food order. See you at the counter!`;
    } else if (thread === 'NGO') {
      return `Received your inquiry about "${query}". Food Relief Foundation team has logged this update and notified our field coordinator.`;
    } else {
      return `Regarding "${query}": Our 24/7 FoodBridge Support Desk has logged your ticket. An agent is verifying your order details right now!`;
    }
  };

  const handleSendQuery = (textToSend) => {
    if (!textToSend.trim() && !attachmentPreview) return;

    const userMsg = {
      id: Date.now(),
      sender: 'You',
      text: textToSend,
      image: attachmentPreview,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setThreads((prev) => ({
      ...prev,
      [activeThread]: [...(prev[activeThread] || []), userMsg]
    }));

    setInputMsg('');
    setAttachmentPreview(null);

    // Smart contextual response based on exact query
    setTimeout(() => {
      const smartAnswer = generateSmartResponse(textToSend, activeThread);
      let replySender = 'Support Desk';

      if (activeThread === 'DRIVER') replySender = 'Vikram (EV Driver)';
      if (activeThread === 'RESTAURANT') replySender = 'Restaurant Manager';
      if (activeThread === 'NGO') replySender = 'Food Relief Lead';

      const autoReply = {
        id: Date.now() + 1,
        sender: replySender,
        text: smartAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };

      setThreads((prev) => ({
        ...prev,
        [activeThread]: [...(prev[activeThread] || []), autoReply]
      }));
    }, 800);
  };

  const handleSendForm = (e) => {
    e.preventDefault();
    handleSendQuery(inputMsg);
  };

  const getTabLabel = (tab) => {
    if (tab === 'NGO') return { label: 'NGO', icon: HeartHandshake };
    if (tab === 'RESTAURANT') return { label: 'RESTAURANT', icon: Utensils };
    if (tab === 'DRIVER') return { label: 'DRIVER', icon: Truck };
    return { label: 'SUPPORT', icon: HelpCircle };
  };

  const quickQuestions = [
    "Where is my driver?",
    "How to get 80G tax receipt?",
    "Is the food safe & fresh?",
    "How to pick up order?"
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            💬
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-1">
              <span>Live Messages & Dispatch</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            </h3>
            <p className="text-[10px] text-emerald-600 font-semibold">Smart AI Support • Online</p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
      </div>

      {/* Thread Tabs */}
      <div className="flex items-center justify-around border-b border-slate-100 dark:border-slate-800 p-2 text-xs font-bold bg-slate-50 dark:bg-slate-900">
        {['NGO', 'RESTAURANT', 'DRIVER', 'SUPPORT'].map((t) => {
          const tabInfo = getTabLabel(t);
          const TabIcon = tabInfo.icon;
          const isActive = activeThread === t;

          return (
            <button
              key={t}
              onClick={() => setActiveThread(t)}
              className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center space-x-1 ${
                isActive ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              <span>{tabInfo.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {currentMessages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.isUser ? 'items-end' : 'items-start'}`}
          >
            <div className="text-[10px] font-bold text-slate-400 mb-0.5 px-1">{m.sender}</div>
            <div className={`max-w-[85%] p-3 rounded-2xl text-xs space-y-1 ${
              m.isUser
                ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none border border-slate-200 dark:border-slate-700'
            }`}>
              {m.image && <img src={m.image} alt="attachment" className="w-full rounded-xl object-cover max-h-40" />}
              <div className="leading-relaxed">{m.text}</div>
              <div className={`text-[9px] flex items-center justify-end space-x-1 ${m.isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                <span>{m.time}</span>
                {m.isUser && <CheckCheck className="w-3 h-3 text-emerald-200" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Suggested Questions Pills */}
      <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">Ask Quick Question:</span>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((qText) => (
            <button
              key={qText}
              onClick={() => handleSendQuery(qText)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-200 dark:border-slate-700 transition-all text-left shadow-2xs"
            >
              💬 {qText}
            </button>
          ))}
        </div>
      </div>

      {/* Attachment Preview Box */}
      {attachmentPreview && (
        <div className="p-2 bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-bold truncate">Photo Attached</span>
          <button onClick={() => setAttachmentPreview(null)} className="text-rose-500 font-bold">✕</button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendForm} className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2 bg-white dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setAttachmentPreview("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80")}
          className="p-2 text-slate-400 hover:text-emerald-600"
          title="Attach Image"
        >
          <Image className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder={`Ask ${activeThread.toLowerCase()} a question...`}
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold focus:outline-none border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
        />

        <button
          type="submit"
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
