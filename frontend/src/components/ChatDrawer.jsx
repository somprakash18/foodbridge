import React, { useState } from 'react';
import { Send, Image, Paperclip, X, CheckCheck, User, ShieldCheck, HeartHandshake, Utensils, Truck, HelpCircle } from 'lucide-react';

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
      { id: 301, sender: 'FoodBridge 24/7 Helpline', text: 'Welcome to FoodBridge Support! How can we assist with your food donation, 80G tax receipt, or delivery dispatch today?', time: '10:00 AM', isUser: false }
    ]
  });

  const [inputMsg, setInputMsg] = useState('');
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  if (!isOpen) return null;

  const currentMessages = threads[activeThread] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim() && !attachmentPreview) return;

    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: inputMsg,
      image: attachmentPreview,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setThreads((prev) => ({
      ...prev,
      [activeThread]: [...(prev[activeThread] || []), newMsg]
    }));

    setInputMsg('');
    setAttachmentPreview(null);

    // Auto responder for interactive realism
    setTimeout(() => {
      let replyText = 'Thank you for your message! Our team is processing your request.';
      let replySender = 'Support Desk';

      if (activeThread === 'DRIVER') {
        replyText = 'Got it! I am approaching your location now. Keep QR ready.';
        replySender = 'Vikram (EV Driver)';
      } else if (activeThread === 'RESTAURANT') {
        replyText = 'Confirmed! Your surplus food order is packed and ready at the counter.';
        replySender = 'Restaurant Manager';
      } else if (activeThread === 'NGO') {
        replyText = 'Thank you! Food Relief Foundation team has updated the pickup status.';
        replySender = 'Food Relief Lead';
      }

      const autoReply = {
        id: Date.now() + 1,
        sender: replySender,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };

      setThreads((prev) => ({
        ...prev,
        [activeThread]: [...(prev[activeThread] || []), autoReply]
      }));
    }, 1200);
  };

  const getTabLabel = (tab) => {
    if (tab === 'NGO') return { label: 'NGO', icon: HeartHandshake };
    if (tab === 'RESTAURANT') return { label: 'RESTAURANT', icon: Utensils };
    if (tab === 'DRIVER') return { label: 'DRIVER', icon: Truck };
    return { label: 'SUPPORT', icon: HelpCircle };
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            💬
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Live Messages & Dispatch</h3>
            <p className="text-[10px] text-emerald-600 font-semibold">Active Dispatcher • Online</p>
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
              <div>{m.text}</div>
              <div className={`text-[9px] flex items-center justify-end space-x-1 ${m.isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                <span>{m.time}</span>
                {m.isUser && <CheckCheck className="w-3 h-3 text-emerald-200" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Attachment Preview Box */}
      {attachmentPreview && (
        <div className="p-2 bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-bold truncate">Photo Attached</span>
          <button onClick={() => setAttachmentPreview(null)} className="text-rose-500 font-bold">✕</button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2 bg-white dark:bg-slate-900">
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
          placeholder={`Message ${activeThread.toLowerCase()}...`}
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
