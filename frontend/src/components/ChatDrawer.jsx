import React, { useState } from 'react';
import { Send, Image, X, CheckCheck, Paperclip, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ChatDrawer({ isOpen, onClose }) {
  const { chatMessages, sendChatMessage } = useApp();
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState(null);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() && !attachment) return;
    sendChatMessage(text, attachment);
    setText('');
    setAttachment(null);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 glass-panel shadow-soft-lg border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">FoodBridge Live Chat</h3>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">WebSocket Online (Typing...)</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/50">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs space-y-1 shadow-sm ${
                msg.isUser
                  ? 'bg-brand-600 text-white rounded-br-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
              }`}
            >
              <div className="font-bold opacity-75 text-[10px]">{msg.sender}</div>
              <p className="leading-relaxed">{msg.text}</p>
              {msg.attachment && (
                <img src={msg.attachment} alt="Attachment" className="w-40 h-28 object-cover rounded-lg mt-1" />
              )}
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-slate-400 mt-1 px-1">
              <span>{msg.time}</span>
              {msg.isUser && <CheckCheck className="w-3.5 h-3.5 text-brand-400" />}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center space-x-2">
        <label className="p-2 rounded-xl text-slate-400 hover:text-brand-600 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
          <Paperclip className="w-5 h-5" />
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files[0]) {
                setAttachment(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message or share photo..."
          className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-soft"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
