import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import OrdersPage from './pages/OrdersPage';
import LiveMap from './components/LiveMap';

// Protected Route Component for Unauthenticated Security
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function MainLayout() {
  const { user } = useAuth();
  const [sosOpen, setSosOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-16 lg:pb-0">
      <div>
        <Navbar onOpenAuth={() => setAuthModalOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage onOpenAuth={() => setAuthModalOpen(true)} />} />
            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="/buyer" element={<BuyerMarketplace />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/event-rescue" element={<EventRescuePage />} />
            <Route path="/campus-rescue" element={<CampusRescuePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/map" element={<div className="max-w-7xl mx-auto px-4 py-8"><LiveMap height="h-[650px]" /></div>} />
            <Route path="/help" element={<HelpPage />} />

            {/* Protected Private Routes */}
            <Route path="/restaurant" element={<ProtectedRoute><RestaurantDashboard /></ProtectedRoute>} />
            <Route path="/ngo" element={<ProtectedRoute><NgoDashboard /></ProtectedRoute>} />
            <Route path="/delivery" element={<ProtectedRoute><DeliveryDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
            <Route path="/referral" element={<ProtectedRoute><ReferralPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>

      <Footer />

      {/* Floating Action Buttons & Mobile Navigation */}
      <FloatingActionButton
        onOpenDonation={() => setAuthModalOpen(true)}
        onOpenSos={() => setSosOpen(true)}
      />

      <MobileBottomNav onOpenRescue={() => setAuthModalOpen(true)} />

      {/* Global Modals */}
      <SosEmergencyModal isOpen={sosOpen} onClose={() => setSosOpen(false)} />
      <RegistrationModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
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
