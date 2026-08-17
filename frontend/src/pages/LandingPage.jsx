import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package, Truck, MapPin, Clock, ArrowRight, Check,
  Utensils, Building2, Receipt, BarChart3, Leaf, ChevronRight,
  Sparkles, HeartHandshake, ShoppingBag, ShieldCheck
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import LiveMap from "../components/LiveMap";
import RegistrationModal from "../components/RegistrationModal";
import AiAssistantModal from "../components/AiAssistantModal";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

const manifestRows = [
  { time: "07:42", from: "Cedar Street Bakery", to: "Riverside Shelter", item: "Bread, pastries", status: "EN ROUTE" },
  { time: "07:55", from: "Green Leaf Grocers", to: "Second Harvest Food Bank", item: "Produce, dairy", status: "CLAIMED" },
  { time: "08:10", from: "Marco's Trattoria", to: "St. Anne's Kitchen", item: "Pasta, sauces", status: "SCHEDULED" },
  { time: "08:22", from: "Sunrise Diner", to: "Downtown Mission", item: "Baked goods", status: "EN ROUTE" },
  { time: "08:30", from: "Corner Market", to: "Hope Family Shelter", item: "Produce", status: "CLAIMED" },
  { time: "08:47", from: "Blue Fig Cafe", to: "Riverside Shelter", item: "Sandwiches, soup", status: "SCHEDULED" },
  { time: "09:03", from: "Green Leaf Grocers", to: "Third Street Pantry", item: "Bread, canned goods", status: "EN ROUTE" },
  { time: "09:15", from: "Marco's Trattoria", to: "Second Harvest Food Bank", item: "Pasta, sauces", status: "CLAIMED" },
];

const statusStyle = {
  "EN ROUTE": { color: "#E8A33D", label: "EN ROUTE" },
  "CLAIMED": { color: "#2F5233", label: "CLAIMED" },
  "SCHEDULED": { color: "#8A7458", label: "SCHEDULED" },
};

function useManifestTicker(rowCount, visible) {
  const [start, setStart] = useState(0);
  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => {
      setStart((s) => (s + 1) % rowCount);
    }, 2800);
    return () => clearInterval(id);
  }, [rowCount]);
  const rows = [];
  for (let i = 0; i < visible; i++) rows.push(manifestRows[(start + i) % rowCount]);
  return rows;
}

function ManifestBoard() {
  const rows = useManifestTicker(manifestRows.length, 5);
  return (
    <div
      style={{
        background: "#1F2A1F",
        border: "1px solid #3A4A3A",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 30px 60px -20px rgba(31,42,31,0.45)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid #3A4A3A",
        }}
      >
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.14em",
            color: "#B9C4B4",
          }}
        >
          MANIFEST — TODAY'S LIVE ROUTES
        </span>
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#E8A33D",
            boxShadow: "0 0 0 4px rgba(232,163,61,0.18)",
          }}
        />
      </div>
      <div>
        {rows.map((r, i) => (
          <div
            key={r.time + r.from + i}
            style={{
              display: "grid",
              gridTemplateColumns: "52px 1fr 22px 1fr 92px",
              gap: "10px",
              alignItems: "center",
              padding: "13px 18px",
              borderBottom: i === rows.length - 1 ? "none" : "1px solid #2A362A",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            <span style={{ color: "#8A9A85", fontSize: "12px" }}>{r.time}</span>
            <span style={{ color: "#F1EEE4", fontSize: "12.5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {r.from}
            </span>
            <ChevronRight size={13} color="#5C6B57" />
            <span style={{ color: "#D8D2C2", fontSize: "12.5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {r.to}
            </span>
            <span
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.06em",
                color: statusStyle[r.status].color,
                textAlign: "right",
                fontWeight: 600
              }}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "11.5px",
        letterSpacing: "0.16em",
        color: "#8A7458",
        textTransform: "uppercase",
        marginBottom: "14px",
        fontWeight: 600
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, dark }) {
  return (
    <h2
      style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 600,
        fontSize: "clamp(28px, 3.4vw, 40px)",
        color: dark ? "#F1EEE4" : "#1F2A1F",
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

function Card({ icon: Icon, title, text, accent }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E4DFD1",
        borderRadius: "16px",
        padding: "26px 24px",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: accent ? "#FBEFDB" : "#E9EFE7",
          marginBottom: "16px",
        }}
      >
        <Icon size={20} color={accent ? "#B5791F" : "#2F5233"} />
      </div>
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "16px", color: "#1F2A1F", marginBottom: "6px" }}>
        {title}
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#5C5648", lineHeight: 1.6 }}>
        {text}
      </p>
    </div>
  );
}

function StepRow({ number, title, text, last }) {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#1F2A1F",
            color: "#F1EEE4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "13px",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        {!last && <div style={{ width: "1px", flex: 1, background: "#D8D2C2", marginTop: "6px" }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : "26px" }}>
        <h4 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "15px", color: "#1F2A1F", marginBottom: "4px" }}>
          {title}
        </h4>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13.5px", color: "#5C5648", lineHeight: 1.6, maxWidth: "340px" }}>
          {text}
        </p>
      </div>
    </div>
  );
}

function PriceCard({ tag, name, price, unit, features, highlight, onSelect }) {
  return (
    <div
      style={{
        background: highlight ? "#1F2A1F" : "#FFFFFF",
        border: highlight ? "1px solid #1F2A1F" : "1px solid #E4DFD1",
        borderRadius: "16px",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "10.5px",
            letterSpacing: "0.12em",
            color: highlight ? "#B9C4B4" : "#8A7458",
            marginBottom: "10px",
            fontWeight: 600
          }}
        >
          {tag}
        </div>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "20px", color: highlight ? "#F1EEE4" : "#1F2A1F" }}>
          {name}
        </h3>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "32px", color: highlight ? "#F1EEE4" : "#1F2A1F" }}>
          {price}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: highlight ? "#8A9A85" : "#8A7458" }}>{unit}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        {features.map((f) => (
          <div key={f} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <Check size={14} color={highlight ? "#E8A33D" : "#2F5233"} style={{ marginTop: "2px", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13.5px", color: highlight ? "#D8D2C2" : "#3A3527", lineHeight: 1.5 }}>
              {f}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={onSelect}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          background: highlight ? "#E8A33D" : "#1F2A1F",
          color: highlight ? "#1F2A1F" : "#F1EEE4",
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          cursor: "pointer"
        }}
      >
        Get Started
      </button>
    </div>
  );
}

function Counter({ value, label }) {
  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "clamp(30px, 4vw, 44px)",
          fontWeight: 600,
          color: "#1F2A1F",
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5C5648", marginTop: "4px" }}>{label}</div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const [regModalOpen, setRegModalOpen] = useState(false);
  const [regRole, setRegRole] = useState("RESTAURANT");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleOpenSignup = (role = "RESTAURANT") => {
    setRegRole(role);
    setRegModalOpen(true);
  };

  const handleRoleNavigate = (roleKey, path) => {
    switchRole(roleKey);
    navigate(path);
  };

  return (
    <div style={{ background: "#F7F5EF", minHeight: "100vh" }} className="dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <style>{FONTS}</style>

      {/* HERO */}
      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "64px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }} className="fb-hero-grid">
          <div>
            <Eyebrow>Surplus food, rerouted live</Eyebrow>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                fontSize: "clamp(34px, 5vw, 54px)",
                lineHeight: 1.08,
                color: "#1F2A1F",
                letterSpacing: "-0.015em",
                marginBottom: "22px",
              }}
              className="dark:text-white"
            >
              The last mile between a full kitchen and an empty pantry.
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", color: "#5C5648", lineHeight: 1.65, maxWidth: "480px", marginBottom: "32px" }} className="dark:text-slate-300">
              FoodBridge turns unsold restaurant, bakery, and grocery food into scheduled pickups for shelters and food banks nearby — automatically, safely, and in minutes. Free for nonprofits. Simple for businesses.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => handleOpenSignup("RESTAURANT")}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  color: "#1F2A1F",
                  background: "#E8A33D",
                  border: "none",
                  borderRadius: "10px",
                  padding: "13px 22px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                List surplus food <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate("/map")}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  color: "#1F2A1F",
                  background: "transparent",
                  border: "1px solid #C9C2AC",
                  borderRadius: "10px",
                  padding: "13px 22px",
                  cursor: "pointer",
                }}
                className="dark:text-white dark:border-slate-700"
              >
                Find food nearby (Live Map)
              </button>
            </div>
          </div>
          <ManifestBoard />
        </div>
      </section>

      {/* LIVE MAP PREVIEW */}
      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
          <div>
            <Eyebrow>Live Interactive Network</Eyebrow>
            <SectionTitle>Surplus Map & Routing</SectionTitle>
          </div>
          <Link to="/map" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#2F5233", fontWeight: 600, textDecoration: "none" }} className="dark:text-emerald-400">
            Open Full Screen Map →
          </Link>
        </div>
        <LiveMap height="h-[480px]" />
      </section>

      {/* PROBLEM */}
      <section style={{ background: "#1F2A1F", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <Eyebrow>The gap</Eyebrow>
          <SectionTitle dark>Two sides of the same problem, never talking to each other.</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "#3A4A3A", marginTop: "40px", borderRadius: "16px", overflow: "hidden" }} className="fb-problem-grid">
            <div style={{ background: "#243024", padding: "32px" }}>
              <Utensils size={22} color="#E8A33D" style={{ marginBottom: "16px" }} />
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "17px", color: "#F1EEE4", marginBottom: "12px" }}>
                What restaurants face
              </h3>
              <ul style={darkList}>
                <li>No fast, trusted way to find a nearby NGO before food goes bad</li>
                <li>Manual coordination by phone or WhatsApp doesn't scale</li>
                <li>Unaware that donations are often tax-deductible</li>
                <li>Liability concerns without proper documentation</li>
              </ul>
            </div>
            <div style={{ background: "#243024", padding: "32px" }}>
              <Building2 size={22} color="#E8A33D" style={{ marginBottom: "16px" }} />
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "17px", color: "#F1EEE4", marginBottom: "12px" }}>
                What shelters face
              </h3>
              <ul style={darkList}>
                <li>Unpredictable, inconsistent food supply week to week</li>
                <li>Staff time lost cold-calling businesses for donations</li>
                <li>No visibility into what's available nearby, right now</li>
                <li>Little say in food type or pickup timing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ maxWidth: "1120px", margin: "0 auto", padding: "88px 24px" }}>
        <Eyebrow>How it works</Eyebrow>
        <SectionTitle>One feed. Two very different jobs to do.</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "56px", marginTop: "44px" }} className="fb-how-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <Utensils size={18} color="#2F5233" />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.1em", color: "#2F5233", fontWeight: 600 }} className="dark:text-emerald-400">
                FOR RESTAURANTS &amp; STORES
              </span>
            </div>
            <StepRow number="1" title="List what's left over" text="Snap a photo, note quantity, packaging, and pickup window. Takes under a minute." />
            <StepRow number="2" title="Get matched automatically" text="Nearby verified NGOs and buyers are notified; AI certifies food safety score." />
            <StepRow number="3" title="Get your receipt & payout" text="A tax-deduction receipt and impact stats land in your inbox after QR pickup." last />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              <Building2 size={18} color="#B5791F" />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", letterSpacing: "0.1em", color: "#B5791F", fontWeight: 600 }}>
                FOR SHELTERS &amp; NGOS
              </span>
            </div>
            <StepRow number="1" title="Browse what's nearby" text="A live interactive map feed of surplus food, filterable by distance and category." />
            <StepRow number="2" title="Claim in one tap" text="No calls, no waiting — first claim locks it in for pickup or volunteer delivery." />
            <StepRow number="3" title="Pick up on schedule" text="Riders use dynamic QR scanner codes for instant transfer verification." last />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#EFEBDD", padding: "88px 24px" }} className="dark:bg-slate-900">
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <Eyebrow>What's included</Eyebrow>
          <SectionTitle>Built to remove every excuse not to donate.</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", marginTop: "40px" }} className="fb-feature-grid">
            <Card icon={Package} title="One-tap listings" text="Photo, quantity, pickup window — posted in under a minute, from any device." />
            <Card icon={Truck} title="Automated routing" text="Matches surplus to the nearest verified NGO and handles driver scheduling." accent />
            <Card icon={Receipt} title="Tax-deduction receipts" text="Every completed donation generates a compliant receipt automatically." />
            <Card icon={BarChart3} title="Impact reporting" text="Monthly meals-saved and CO2-avoided reports, ready for ESG or PR use." accent />
            <Card icon={MapPin} title="Real-time nearby feed" text="NGOs see what's available close by, updated the moment it's listed." />
            <Card icon={Clock} title="Pickup windows & QR Scanner" text="Clear time slots & dynamic QR codes reduce no-shows and ensure accountability." accent />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ maxWidth: "1120px", margin: "0 auto", padding: "88px 24px" }}>
        <Eyebrow>Pricing</Eyebrow>
        <SectionTitle>Free where it matters. Simple where it doesn't.</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "18px", marginTop: "40px" }} className="fb-price-grid">
          <PriceCard
            tag="NONPROFIT"
            name="NGO / Shelter"
            price="Free"
            unit="forever"
            features={["Full access to surplus map feed", "One-tap claim & scheduling", "Verified restaurant partners", "Volunteer dispatch tool"]}
            onSelect={() => handleOpenSignup("NGO")}
          />
          <PriceCard
            tag="SINGLE LOCATION"
            name="Starter"
            price="₹1,999"
            unit="/ month"
            features={["Unlimited listings", "Automated scheduling", "Tax-deduction receipts", "Razorpay payout wallet"]}
            highlight
            onSelect={() => handleOpenSignup("RESTAURANT")}
          />
          <PriceCard
            tag="MULTI-LOCATION"
            name="Growth"
            price="₹6,999"
            unit="/ month"
            features={["Everything in Starter", "ESG Impact reporting", "Priority AI route optimization", "Multi-branch admin panel"]}
            onSelect={() => handleOpenSignup("RESTAURANT")}
          />
          <PriceCard
            tag="CHAINS & HOTELS"
            name="Enterprise"
            price="Custom"
            unit="pricing"
            features={["Everything in Growth", "Spring Boot API access", "Dedicated account manager", "Custom SLAs & verification"]}
            onSelect={() => handleOpenSignup("RESTAURANT")}
          />
        </div>
      </section>

      {/* IMPACT STATS */}
      <section id="impact" style={{ background: "#FFFFFF", borderTop: "1px solid #E4DFD1", borderBottom: "1px solid #E4DFD1", padding: "72px 24px" }} className="dark:bg-slate-900 dark:border-slate-800">
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <Eyebrow>Live Network Impact</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", marginTop: "24px" }} className="fb-counter-grid">
            <Counter value="18,450+" label="Meals saved and delivered across cities" />
            <Counter value="46,125 kg" label="CO2 emissions prevented from landfill" />
            <Counter value="< 1 min" label="Time to list surplus food on mobile or web" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <SectionTitle>Ready to reduce waste and feed your community?</SectionTitle>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#5C5648", marginTop: "16px", marginBottom: "32px" }} className="dark:text-slate-400">
            Join as a business or a nonprofit — setup takes under 2 minutes.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => handleOpenSignup("RESTAURANT")}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14.5px",
                fontWeight: 600,
                color: "#1F2A1F",
                background: "#E8A33D",
                border: "none",
                borderRadius: "10px",
                padding: "13px 22px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              List surplus food <ArrowRight size={15} />
            </button>
            <button
              onClick={() => handleOpenSignup("NGO")}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14.5px",
                fontWeight: 600,
                color: "#1F2A1F",
                background: "transparent",
                border: "1px solid #C9C2AC",
                borderRadius: "10px",
                padding: "13px 22px",
                cursor: "pointer",
              }}
              className="dark:text-white dark:border-slate-700"
            >
              Claim Food as NGO
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <RegistrationModal isOpen={regModalOpen} onClose={() => setRegModalOpen(false)} initialRole={regRole} />
      <AiAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />

      <style>{`
        @media (min-width: 860px) {
          .fb-hero-grid { grid-template-columns: 1.05fr 0.95fr !important; align-items: center; }
          .fb-problem-grid { grid-template-columns: 1fr 1fr !important; }
          .fb-how-grid { grid-template-columns: 1fr 1fr !important; }
          .fb-feature-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .fb-price-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .fb-counter-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        button:focus-visible, a:focus-visible {
          outline: 2px solid #E8A33D;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

const darkList = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "13.5px",
  color: "#B9C4B4",
  lineHeight: 1.9,
  paddingLeft: "18px",
};
