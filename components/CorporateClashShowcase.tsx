import React, { useState, useEffect } from "react";
import {
  Briefcase,
  TrendingUp,
  Clock,
  Users,
  Shield,
  Award,
  Zap,
  CheckCircle,
  ExternalLink,
  DollarSign,
  Building,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import { MasterDrawerShell } from "./MasterDrawerShell";

interface CorporateClashShowcaseProps {
  onNavigate?: (page: string, plan?: string) => void;
}

export const CorporateClashShowcase: React.FC<CorporateClashShowcaseProps> = ({
  onNavigate,
}) => {
  // Timer State (3-minute pitch timer simulation)
  const [timeLeft, setTimeLeft] = useState(164); // 2m 44s
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Active Startup on Stage
  const [activeStartup, setActiveStartup] = useState<number>(0);

  // Drawer Modals
  const [activeDrawer, setActiveDrawer] = useState<
    "pledge" | "dossier" | "ticket" | "intro" | null
  >(null);
  const [selectedTicket, setSelectedTicket] = useState<string>("exec-vip");
  const [pledgeAmount, setPledgeAmount] = useState<number>(25000);
  const [pledgeSubmitted, setPledgeSubmitted] = useState<boolean>(false);

  // Timer Tick
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 180));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startups = [
    {
      id: "startup-1",
      name: "Apex PropTech Twin",
      track: "PropTech & Real Estate",
      stage: "Seed ($1.5M Target)",
      leadFounder: "Devon Vance",
      description:
        "Automated BIM/CAD 2.5D architectural digital twin telemetry for multi-family residential towers.",
      softPledges: "$450,000 CAD",
      traction: "3 Canadian Tier-1 GCs onboarded • $32k MRR",
      tag: "CURRENTLY PITCHING",
    },
    {
      id: "startup-2",
      name: "Sovereign AI Rail",
      track: "Enterprise AI & Compliance",
      stage: "Series A ($3.2M Target)",
      leadFounder: "Maya Chen",
      description:
        "On-premise zero-retention LLM orchestration proxy for financial institutions and defense contractors.",
      softPledges: "$680,000 CAD",
      traction: "12 Enterprise pilots • SOC2 Type II Certified",
      tag: "ROUND 1 BATTLE",
    },
    {
      id: "startup-3",
      name: "StrataClean Geo",
      track: "CleanTech & Infrastructure",
      stage: "Pre-Seed ($800k Target)",
      leadFounder: "Liam O'Connor",
      description:
        "Direct-subsurface thermal capture modeling for commercial district heating retrofits.",
      softPledges: "$210,000 CAD",
      traction: "City of Ottawa pilot approved • NRC Grant Recipient",
      tag: "SEMIFINALS",
    },
    {
      id: "startup-4",
      name: "VaultPay Protocol",
      track: "FinTech & Payments",
      stage: "Seed ($2.0M Target)",
      leadFounder: "Amara Diallo",
      description:
        "Instant cross-border payroll rail for Canadian-US distributed engineering organizations.",
      softPledges: "$390,000 CAD",
      traction: "$1.4M annualized GMV • 18% MoM growth",
      tag: "ROUND 1 BATTLE",
    },
  ];

  const tickets = [
    {
      id: "corp-table",
      name: "Corporate Delegation Table",
      seats: "8 Executive VIP Seats",
      price: "$2,000 CAD",
      features: [
        "Reserved front-row prime arena table",
        "Corporate brand plaque on table & screen loop",
        "Sommelier wine & premium bottle service",
        "Full investor deal-flow dossier access",
      ],
      popular: false,
    },
    {
      id: "exec-vip",
      name: "Executive & Investor VIP Pass",
      seats: "1 VIP Guest",
      price: "$250 CAD",
      features: [
        "Executive VIP Lounge & Barista hospitality",
        "3x Accredited Syndicate Voting Power",
        "Direct 1:1 founder warm intro privileges",
        "Post-event private investor dinner access",
      ],
      popular: true,
    },
    {
      id: "founder-pro",
      name: "Founder & Tech Pro Pass",
      seats: "1 Professional",
      price: "$95 CAD",
      features: [
        "General arena seating & mixer access",
        "Real-time mobile app interactive voting",
        "Access to digital contender pitch decks",
        "Networking deal mixer reception",
      ],
      popular: false,
    },
    {
      id: "startup-contender",
      name: "Startup Contender Package",
      seats: "2 Team Founders",
      price: "$390 CAD",
      features: [
        "High-stakes 3-minute stage battle slot",
        "Branded demo kiosk in Bayview Innovation Hall",
        "4K edited multi-camera pitch video",
        "Turnkey 9LMNTS OS deployment for your startup",
      ],
      popular: false,
    },
  ];

  return (
    <div className="w-full bg-[#0A0B10] text-white font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
      {/* 1. Persistent Rotating Sponsor Marquee */}
      <div className="bg-[#121624]/90 border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-xs overflow-x-auto">
        <div className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00D2FF]/15 text-[#00D2FF] font-mono text-[11px] font-bold border border-[#00D2FF]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
            TITLE SPONSOR
          </span>
          <span className="text-gray-300 hidden sm:inline">
            Tonight’s PropTech & AI Track presented by{" "}
            <strong className="text-white">BDO Canada & Dentons</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveDrawer("dossier")}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30 font-mono text-[11px] transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Unlock Founder Dealbook
          </button>
        </div>
      </div>

      {/* Hero Header & Event Coordinates */}
      <div className="px-6 py-8 sm:px-10 border-b border-white/10 bg-gradient-to-b from-[#121624]/60 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs">
              <span className="text-[#FF5500] font-bold">● ARENA CIRCUIT EVENT 4</span>
              <span className="text-gray-500">•</span>
              <span className="text-[#00D2FF]">OTTAWA TECH CORRIDOR</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-['Syne',sans-serif] tracking-tight">
              CORPORATE CLASH OS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#FFB800]">// PITCH BATTLE</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              8 Contenders • PropTech & Enterprise AI Tracks • Live Capital Syndicate Soft Pledges • Bayview Yards Innovation Hall
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveDrawer("ticket")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5500] to-[#FF3300] hover:brightness-110 text-white font-bold text-sm shadow-[0_0_25px_rgba(255,85,0,0.4)] transition-all flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              Reserve Corporate Table / Pass
            </button>
          </div>
        </div>

        {/* Live Event Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/5 font-mono text-xs">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-gray-500 block text-[10px]">LOCKED DATE</span>
            <span className="text-white font-bold text-sm">Thu, Dec 17, 2026</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-gray-500 block text-[10px]">VENUE LOCATION</span>
            <span className="text-[#00D2FF] font-bold text-sm">Bayview Yards, Ottawa</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-gray-500 block text-[10px]">CAPITAL SYNDICATE</span>
            <span className="text-[#00FF88] font-bold text-sm">$1,730,000 Pledged</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-gray-500 block text-[10px]">ARENA CAPACITY</span>
            <span className="text-[#FFB800] font-bold text-sm">300 C-Suite & Angels</span>
          </div>
        </div>
      </div>

      {/* Main Duel Stage & Interactive Contenders */}
      <div className="p-6 sm:p-10 space-y-8">
        {/* Live Pitch Clock & Current Contender Stage */}
        <div className="p-6 rounded-2xl bg-[#121624]/80 border border-[#00D2FF]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00FF88] animate-ping" />
              <span className="font-mono text-xs text-[#00FF88] uppercase tracking-wider font-bold">
                ON STAGE NOW: ROUND 1
              </span>
            </div>

            {/* Pitch Clock Telemetry */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0A0B10] border border-white/10 font-mono">
              <Clock className="w-4 h-4 text-[#FF5500]" />
              <span className="text-xs text-gray-400">PITCH CLOCK:</span>
              <span className="text-xl font-bold text-[#FF5500] tracking-wider">
                {formatTime(timeLeft)}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-[10px] text-gray-500 hover:text-white underline ml-1"
              >
                {isTimerRunning ? "PAUSE" : "RESUME"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-block px-3 py-1 rounded-md bg-[#00D2FF]/15 text-[#00D2FF] text-xs font-mono font-bold">
                {startups[activeStartup].track}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif]">
                {startups[activeStartup].name}
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {startups[activeStartup].description}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-gray-400">
                <span>FOUNDER: <strong className="text-white">{startups[activeStartup].leadFounder}</strong></span>
                <span>TARGET: <strong className="text-[#FFB800]">{startups[activeStartup].stage}</strong></span>
                <span>TRACTION: <strong className="text-[#00FF88]">{startups[activeStartup].traction}</strong></span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0A0B10]/90 border border-white/10 space-y-4">
              <div>
                <span className="text-xs text-gray-500 font-mono block">SOFT CAPITAL PLEDGED</span>
                <span className="text-2xl font-bold text-[#00FF88] font-mono">
                  {startups[activeStartup].softPledges}
                </span>
                <span className="text-[10px] text-gray-400 block mt-0.5">Non-binding LOI (OSC Rule 45-501)</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveDrawer("pledge")}
                  className="w-full py-2.5 rounded-lg bg-[#00FF88] hover:bg-[#00FF88]/90 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                >
                  <DollarSign className="w-4 h-4" />
                  Signal Soft Pledge / LOI
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveDrawer("dossier")}
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-colors"
                  >
                    View Deck ($50)
                  </button>
                  <button
                    onClick={() => setActiveDrawer("intro")}
                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-colors"
                  >
                    1:1 Intro ($150)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Contender High-Stakes Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold font-['Syne',sans-serif] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FFB800]" />
              Tournament Contenders & Industry Tracks
            </h3>
            <span className="text-xs font-mono text-gray-400">8 Selected Founders</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {startups.map((startup, index) => (
              <div
                key={startup.id}
                onClick={() => setActiveStartup(index)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  activeStartup === index
                    ? "bg-[#121624] border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.25)]"
                    : "bg-[#0F1115] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="text-gray-400">{startup.track}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded font-bold ${
                      activeStartup === index
                        ? "bg-[#00D2FF]/20 text-[#00D2FF]"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {startup.tag}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base mb-1">{startup.name}</h4>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                  {startup.description}
                </p>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-500">Pledges:</span>
                  <span className="text-[#00FF88] font-bold">{startup.softPledges}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticketing & Corporate Delegation Tables */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold font-['Syne',sans-serif] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#FF5500]" />
                Corporate Passes & Hospitality Tables (300 Cap)
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Ottawa Tech Corridor & Real Estate Syndicate Admissions • 1-Tap Checkout via PayPal Complete Payments
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tickets.map((t) => (
              <div
                key={t.id}
                className={`p-5 rounded-xl border flex flex-col justify-between ${
                  t.popular
                    ? "bg-[#121624] border-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.2)]"
                    : "bg-[#0F1115] border-white/10"
                }`}
              >
                <div>
                  {t.popular && (
                    <span className="inline-block mb-2 text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF5500]/20 text-[#FF5500] font-bold border border-[#FF5500]/30">
                      ★ MOST POPULAR PASS
                    </span>
                  )}
                  <h4 className="font-bold text-white text-base">{t.name}</h4>
                  <span className="text-xs text-gray-400 block mb-3 font-mono">{t.seats}</span>
                  <div className="text-2xl font-extrabold font-mono text-white mb-4">
                    {t.price}
                  </div>

                  <ul className="space-y-2 mb-6">
                    {t.features.map((f, i) => (
                      <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00FF88] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedTicket(t.id);
                    setActiveDrawer("ticket");
                  }}
                  className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                    t.popular
                      ? "bg-[#FF5500] hover:bg-[#FF4500] text-white shadow-lg"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  }`}
                >
                  Select & Check Out
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Real Estate Spatial Builds & Agency Sprints Backend Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121624] via-[#0F1115] to-[#121624] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#00D2FF] font-bold">
              9LMNTS ENTERPRISE SERVICES
            </span>
            <h3 className="text-xl font-bold font-['Syne',sans-serif]">
              Need a CAD/BIM Real Estate Spatial Build or 7-Day Sprint?
            </h3>
            <p className="text-xs text-gray-400 max-w-xl">
              Turn commercial blueprints into 2.5D interactive digital twins and WebAR customer walkthroughs ($15k–$25k CAD), or deploy custom AI workflows in 7 days ($1,500–$5,000 CAD).
            </p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate("start-project", "enterprise")}
            className="px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-wider shrink-0 transition-all flex items-center gap-2"
          >
            Schedule Discovery Sprint ($250 Deposit)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 85vh Master Modal Drawer 1: Soft Capital Syndicate Pledge */}
      <MasterDrawerShell
        isOpen={activeDrawer === "pledge"}
        onClose={() => setActiveDrawer(null)}
        title={`Syndicate Soft Pledge: ${startups[activeStartup].name}`}
        subtitle="Ontario Securities Commission (OSC) Rule 45-501 Non-Binding Expression of Interest"
        badge="ACCREDITED SYNDICATE"
        badgeColor="#00FF88"
        footer={
          <div className="space-y-2">
            <button
              onClick={() => {
                setPledgeSubmitted(true);
                setTimeout(() => {
                  setPledgeSubmitted(false);
                  setActiveDrawer(null);
                }, 2000);
              }}
              className="w-full py-3.5 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-black font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,136,0.3)]"
            >
              {pledgeSubmitted ? "✓ LOI SOFT COMMITMENT RECORDED" : `Submit $${pledgeAmount.toLocaleString()} CAD Soft Pledge`}
            </button>
            <p className="text-[10px] text-gray-500 text-center">
              Pledges are strictly non-binding expressions of interest. No equity, funds, or securities are exchanged in-app.
            </p>
          </div>
        }
      >
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-[#0A0B10] border border-white/10 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">FOUNDER</span>
              <span className="text-white font-bold">{startups[activeStartup].leadFounder}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">TARGET ROUND</span>
              <span className="text-[#FFB800] font-bold">{startups[activeStartup].stage}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">TRACK</span>
              <span className="text-[#00D2FF] font-bold">{startups[activeStartup].track}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2">
              SELECT SOFT PLEDGE AMOUNT (CAD):
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[5000, 10000, 25000, 50000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setPledgeAmount(amt)}
                  className={`py-2 rounded-lg font-mono text-xs font-bold border transition-colors ${
                    pledgeAmount === amt
                      ? "bg-[#00FF88]/20 border-[#00FF88] text-[#00FF88]"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  ${(amt / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#FFB800] font-bold font-mono">
              <Shield className="w-4 h-4" />
              OSC RULE 45-501 COMPLIANCE NOTICE
            </div>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              This interactive syndicate module registers non-binding expressions of interest (Letters of Intent). All subsequent diligence, accredited investor verification, subscription documentation, and capital transfers occur post-event via regulated counsel (Dentons LLP).
            </p>
          </div>
        </div>
      </MasterDrawerShell>

      {/* 85vh Master Modal Drawer 2: Ticket Checkout via PayPal / Cards */}
      <MasterDrawerShell
        isOpen={activeDrawer === "ticket"}
        onClose={() => setActiveDrawer(null)}
        title="Corporate Clash Admissions & Table Checkout"
        subtitle="1-Tap Instant Checkout • PayPal Complete Payments & Apple Pay"
        badge="LOCKED TICKETING"
        badgeColor="#FF5500"
        footer={
          <div className="space-y-2">
            <button
              onClick={() => {
                alert("Redirecting to 1-Tap Secure PayPal / Card checkout rail...");
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF5500] to-[#FF3300] hover:brightness-110 text-white font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,85,0,0.4)]"
            >
              Pay with PayPal / Card / Apple Pay
            </button>
            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-mono">
              <span>🔒 256-BIT ENCRYPTION</span>
              <span>•</span>
              <span>HST INCLUDED (13% ON)</span>
              <span>•</span>
              <span>INSTANT DIGITAL WALLET PASS</span>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <label className="block text-xs font-mono text-gray-400">
            SELECT YOUR ADMISSION TIER:
          </label>
          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(t.id)}
                className={`p-4 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                  selectedTicket === t.id
                    ? "bg-[#121624] border-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.2)]"
                    : "bg-[#0A0B10] border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <span className="text-xs text-gray-400 font-mono">{t.seats}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold font-mono text-white block">
                    {t.price}
                  </span>
                  <span className="text-[10px] text-[#00FF88] font-mono">INSTANT PASS</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
            <span className="text-gray-400 font-mono block">VENUE & ACCESS</span>
            <p className="text-gray-300">
              Bayview Yards (RBC Innovation Hall), 7 Bayview Station Rd, Ottawa, ON. Doors open 5:30 PM EST on Thursday, Dec 17, 2026.
            </p>
          </div>
        </div>
      </MasterDrawerShell>

      {/* 85vh Master Modal Drawer 3: Deal-Flow Dossier Unlock */}
      <MasterDrawerShell
        isOpen={activeDrawer === "dossier"}
        onClose={() => setActiveDrawer(null)}
        title="Founder Deal-Flow Dossier ($50 CAD)"
        subtitle="Uncompressed Pitch Decks, Cap Tables, Financial Models & Audit Metrics"
        badge="INSTANT DOSSIER"
        badgeColor="#FFB800"
        footer={
          <button
            onClick={() => {
              alert("Dossier unlocked! Direct download link dispatched to your email.");
              setActiveDrawer(null);
            }}
            className="w-full py-3.5 rounded-xl bg-[#FFB800] hover:bg-[#FFB800]/90 text-black font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,184,0,0.3)]"
          >
            Unlock All 8 Founder Dossiers ($50 CAD)
          </button>
        }
      >
        <div className="space-y-4">
          <p className="text-xs text-gray-300 leading-relaxed">
            Gain immediate confidential access to all 8 pitch decks, verified MRR telemetry, cap table breakdowns, and IP patent claims submitted for the Corporate Clash Ottawa Arena.
          </p>
          <div className="space-y-2">
            {startups.map((s) => (
              <div key={s.id} className="p-3 rounded-lg bg-[#0A0B10] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-white font-bold">{s.name}</span>
                <span className="text-[#00D2FF] font-mono">{s.track}</span>
              </div>
            ))}
          </div>
        </div>
      </MasterDrawerShell>

      {/* 85vh Master Modal Drawer 4: 1:1 Founder Warm Intro Pass */}
      <MasterDrawerShell
        isOpen={activeDrawer === "intro"}
        onClose={() => setActiveDrawer(null)}
        title="Direct 1:1 Founder Warm Intro Pass ($150 CAD)"
        subtitle="Private 30-Minute Post-Event Executive Introduction via 9LMNTS Studio"
        badge="WARM INTRO RAIL"
        badgeColor="#00D2FF"
        footer={
          <button
            onClick={() => {
              alert("Warm Intro booked! Founder briefing scheduled.");
              setActiveDrawer(null);
            }}
            className="w-full py-3.5 rounded-xl bg-[#00D2FF] hover:bg-[#00D2FF]/90 text-black font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.3)]"
          >
            Book Warm Intro with {startups[activeStartup].leadFounder} ($150 CAD)
          </button>
        }
      >
        <div className="space-y-4">
          <p className="text-xs text-gray-300 leading-relaxed">
            Skip the cold outreach queue. 9LMNTS Studio coordinates a structured 30-minute private introduction between you and {startups[activeStartup].leadFounder}, complete with mutual confidentiality protection and prepared deal-flow memos.
          </p>
        </div>
      </MasterDrawerShell>
    </div>
  );
};
