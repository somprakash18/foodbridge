import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import FloatingActionButton from './components/FloatingActionButton';
import SosEmergencyModal from './components/SosEmergencyModal';
import RegistrationModal from './components/RegistrationModal';

import LandingPage from './pages/LandingPage';
import RestaurantDashboard from './pages/RestaurantDashboard';
import NgoDashboard from './pages/NgoDashboard';
import BuyerMarketplace from './pages/BuyerMarketplace';
import DeliveryDashboard from './pages/DeliveryDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import ImpactDashboard from './pages/ImpactDashboard';
import EventRescuePage from './pages/EventRescuePage';
import CampusRescuePage from './pages/CampusRescuePage';
import CommunityPage from './pages/CommunityPage';
import WalletPage from './pages/WalletPage';
import ReferralPage from './pages/ReferralPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import LiveMap from './components/LiveMap';

function MainLayout() {
  const [sosOpen, setSosOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-16 lg:pb-0">
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="/buyer" element={<BuyerMarketplace />} />
            <Route path="/event-rescue" element={<EventRescuePage />} />
            <Route path="/campus-rescue" element={<CampusRescuePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/restaurant" element={<RestaurantDashboard />} />
            <Route path="/ngo" element={<NgoDashboard />} />
            <Route path="/delivery" element={<DeliveryDashboard />} />
            <Route path="/admin" element={<OwnerDashboard />} />
            <Route path="/map" element={<div className="max-w-7xl mx-auto px-4 py-8"><LiveMap height="h-[650px]" /></div>} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/referral" element={<ReferralPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </main>
      </div>

      <Footer />

      {/* Floating Action Buttons & Mobile Navigation */}
      <FloatingActionButton
        onOpenDonation={() => setDonationOpen(true)}
        onOpenSos={() => setSosOpen(true)}
      />

      <MobileBottomNav onOpenSos={() => setSosOpen(true)} />

      {/* Global Modals */}
      <SosEmergencyModal isOpen={sosOpen} onClose={() => setSosOpen(false)} />
      <RegistrationModal isOpen={donationOpen} onClose={() => setDonationOpen(false)} initialRole="RESTAURANT" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <MainLayout />
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
