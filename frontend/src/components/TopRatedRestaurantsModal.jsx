import React, { useState } from 'react';
import { 
  Star, Award, ShieldCheck, HeartHandshake, CheckCircle2, TrendingUp, 
  MessageSquare, X, Plus, Sparkles, Filter, Building2, Gift, ThumbsUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function TopRatedRestaurantsModal({ isOpen, onClose }) {
  const { topRestaurants = [], rateRestaurant, addRestaurantCredits } = useApp();
  const { user } = useAuth();

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [recipientName, setRecipientName] = useState(user?.name || 'NGO Recipient Partner');
  const [selectedTags, setSelectedTags] = useState(['Hot & Sealed', 'Punctual Pickup']);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Credit Boost State
  const [boostSuccess, setBoostSuccess] = useState(null);

  if (!isOpen) return null;

  const availableTags = ['Hot & Sealed', 'Punctual Pickup', 'Hygiene Guaranteed', 'Generous Portions', 'Thermal Insulated', 'Eco Packaging'];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!selectedRestaurant) return;

    const newReview = {
      id: Date.now(),
      recipientName: recipientName || 'Verified Recipient',
      rating: reviewRating,
      comment: reviewComment || 'Great quality surplus food, hygienically packed and delivered on time!',
      timeAgo: 'Just now',
      tags: selectedTags
    };

    if (rateRestaurant) {
      rateRestaurant(selectedRestaurant.id, newReview);
    }

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setSelectedRestaurant(null);
      setReviewComment('');
    }, 1800);
  };

  const handleBoostCredits = (restaurantId, currentCredits) => {
    const bonusCredits = 500;
    if (addRestaurantCredits) {
      addRestaurantCredits(restaurantId, bonusCredits);
    }
    setBoostSuccess(restaurantId);
    setTimeout(() => setBoostSuccess(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-600 via-amber-700 to-orange-800 p-6 text-white overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2.5 bg-white/15 rounded-2xl backdrop-blur-md border border-white/20">
              <Star className="w-7 h-7 text-amber-200 fill-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest bg-amber-400/30 px-2.5 py-0.5 rounded-full border border-amber-300/40 text-amber-100">
                FSSAI Verified Donors & Leaderboard
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
                Top Rated Restaurants & ESG Credits
              </h2>
            </div>
          </div>
          <p className="text-xs text-amber-100/90 max-w-2xl">
            Recognizing commercial kitchens, restaurants, and hotels rated highest by NGO recipients. Donating surplus food earns ESG Impact Credits and Tax Exemption Vouchers.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Top Summary Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center space-x-3">
              <div className="p-2 bg-amber-500 text-white rounded-xl">
                <Star className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900 dark:text-white">4.92 / 5.0</div>
                <div className="text-[10px] text-amber-700 dark:text-amber-300 font-bold uppercase">Avg Recipient Rating</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center space-x-3">
              <div className="p-2 bg-emerald-600 text-white rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900 dark:text-white">23,550+</div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase">Meals Rescued</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 flex items-center space-x-3">
              <div className="p-2 bg-purple-600 text-white rounded-xl">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900 dark:text-white">61,650</div>
                <div className="text-[10px] text-purple-700 dark:text-purple-300 font-bold uppercase">Total ESG Impact Credits</div>
              </div>
            </div>
          </div>

          {/* Restaurant List Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Top Rated Restaurant Partners ({topRestaurants.length})</span>
              <span className="text-xs font-semibold text-slate-400">Ranked by Recipient Reviews</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topRestaurants.map((resto, idx) => (
                <div 
                  key={resto.id} 
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 hover:border-amber-400/60 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start space-x-3">
                    <img 
                      src={resto.logo} 
                      alt={resto.name} 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black px-2 py-0.5 bg-amber-500 text-white rounded-full">
                          #{idx + 1}
                        </span>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                          {resto.name}
                        </h4>
                      </div>
                      
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {resto.location}
                      </p>

                      {/* Ratings & Badge */}
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex items-center space-x-1 text-amber-500 font-black text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{resto.rating}</span>
                          <span className="text-slate-400 text-[10px] font-normal">({resto.totalRatings})</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                          {resto.hygieneRating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Credits & Recipient Tags */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[9px] font-bold uppercase">ESG Impact Credits</span>
                      <span className="text-sm font-black text-purple-600 dark:text-purple-400">
                        {resto.impactCredits?.toLocaleString()} PTS
                      </span>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-black bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full border border-purple-300 dark:border-purple-800">
                      {resto.creditTier || 'PLATINUM DONOR'}
                    </span>
                  </div>

                  {/* Recipient Feedback Tags */}
                  {resto.recipientTags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {resto.recipientTags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full">
                          👍 {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons: Add Review & Boost Credits */}
                  <div className="flex space-x-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                    <button
                      onClick={() => setSelectedRestaurant(resto)}
                      className="flex-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-1 transition-all shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Rate &amp; Review</span>
                    </button>

                    <button
                      onClick={() => handleBoostCredits(resto.id, resto.impactCredits)}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-1 transition-all shadow-sm"
                      title="Grant +500 ESG Impact Reward Credits"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{boostSuccess === resto.id ? '+500 Added!' : '+500 Credits'}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* RECIPIENT REVIEW SUBMISSION MODAL / FORM */}
          {selectedRestaurant && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 animate-fade-in border-2 border-amber-400">
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <h4 className="text-base font-black">
                    Submit Recipient Review for {selectedRestaurant.name}
                  </h4>
                </div>
                <button 
                  onClick={() => setSelectedRestaurant(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {reviewSubmitted ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-300 rounded-2xl flex items-center space-x-3 text-xs font-extrabold">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-sm font-black text-white">Review &amp; Rating Submitted Successfully!</div>
                    <p className="text-emerald-300/90 font-normal">Thank you for rating {selectedRestaurant.name}. +100 ESG Impact credits awarded to donor.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Star Rating (1 to 5 Stars)</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`p-2 rounded-xl transition-all ${reviewRating >= star ? 'bg-amber-500 text-white scale-110' : 'bg-slate-800 text-slate-500 hover:text-amber-300'}`}
                        >
                          <Star className={`w-5 h-5 ${reviewRating >= star ? 'fill-white' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Your Organization / Recipient Name</label>
                    <input 
                      type="text" 
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Akshaya Patra Foundation NGO"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Feedback Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${selectedTags.includes(tag) ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                        >
                          {selectedTags.includes(tag) ? '✓ ' : '+ '}{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Recipient Review &amp; Comments</label>
                    <textarea 
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Write your feedback regarding food temperature, hygiene, packaging seal, and timeliness..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRestaurant(null)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl shadow-md flex items-center space-x-1.5"
                    >
                      <Star className="w-4 h-4 fill-white" />
                      <span>Post Review &amp; Grant Credits</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Top Donors receive ESG Tax Deductions &amp; Premium Recognition Badges</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            Close Leaderboard
          </button>
        </div>

      </div>
    </div>
  );
}
