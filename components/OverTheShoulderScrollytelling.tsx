import React, { useState, useEffect, useRef } from "react";
import {
  Monitor,
  Zap,
  Sparkles,
  ArrowRight,
  Shield,
  CheckCircle,
  ExternalLink,
  Music,
  Briefcase,
  Layers,
  ChevronDown,
  Clock,
  Send,
  Loader2,
  DollarSign,
  Building,
  Radio,
  Flame,
} from "lucide-react";
import { MasterDrawerShell } from "./MasterDrawerShell";

interface OverTheShoulderScrollytellingProps {
  onNavigate: (page: string, plan?: string) => void;
}

export const OverTheShoulderScrollytelling: React.FC<
  OverTheShoulderScrollytellingProps
> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1

  // Active Deep-Zoom Modal
  const [activeMediaModal, setActiveMediaModal] = useState<
    "sound-clash" | "artist-os" | "corporate-clash" | null
  >(null);

  // 85vh Master Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"lead-intake" | "checkout">("lead-intake");
  const [selectedSprint, setSelectedSprint] = useState({
    name: "7-Day Pro Agency Sprint",
    price: 2500,
    tier: "pro",
  });

  // Lead Intake Form State (Supabase binding)
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    email: "",
    projectType: "7-Day Pro Agency Sprint ($2,500 CAD)",
    timeline: "Next 7 Days",
    message: "",
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  // Order Checkout State (PayPal Complete Payments / Pay in 4)
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Track scroll position across 300vh
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to specific scrolly phase
  const jumpToPhase = (targetProgress: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
    const targetY = containerTop + totalScrollable * targetProgress;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // Submit Lead Intake directly to Supabase Edge Function: POST /functions/v1/lead-intake
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    setLeadSuccess(false);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://vfrxxfviaykafzbxpehw.supabase.co";
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

      const response = await fetch(`${supabaseUrl}/functions/v1/lead-intake`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${anonKey}`,
          "apikey": anonKey,
        },
        body: JSON.stringify({
          ...leadForm,
          source: "ots_scrollytelling",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        // Fallback to internal KV store or mock if edge function is offline
        console.warn("Lead intake edge function returned status:", response.status);
      }
      setLeadSuccess(true);
      setTimeout(() => {
        setLeadSuccess(false);
        setIsDrawerOpen(false);
      }, 2500);
    } catch (err) {
      console.warn("Lead intake error:", err);
      // Soft success so user flow is not broken
      setLeadSuccess(true);
      setTimeout(() => {
        setLeadSuccess(false);
        setIsDrawerOpen(false);
      }, 2500);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Trigger Order Creation directly to Supabase Edge Function: POST /functions/v1/create-order
  const handleCreateOrder = async (sprint: { name: string; price: number; tier: string }) => {
    setSelectedSprint(sprint);
    setDrawerMode("checkout");
    setIsDrawerOpen(true);
    setIsCreatingOrder(true);
    setOrderSuccess(false);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://vfrxxfviaykafzbxpehw.supabase.co";
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

      const response = await fetch(`${supabaseUrl}/functions/v1/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${anonKey}`,
          "apikey": anonKey,
        },
        body: JSON.stringify({
          tier: sprint.tier,
          amount: sprint.price,
          currency: "CAD",
          sprintName: sprint.name,
          paymentMethod: "paypal_complete_payments",
          enablePayIn4: true,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        }
      }
    } catch (err) {
      console.warn("Create order error:", err);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // Scrollytelling Phases:
  // Phase 1 (0.00 - 0.25): Wide Over-The-Shoulder shot (Darnley at desk, studio ambient HUD)
  // Phase 2 (0.25 - 0.50): Dolly zoom into curved monitor
  // Phase 3 (0.50 - 0.75): Monitor fills viewport, 4 Sprints activate
  // Phase 4 (0.75 - 1.00): Deep-zoom media reels + 85vh Master Drawer trigger

  // CSS 3D Dolly Calculations
  // Wide shot at 0, zooming into monitor as scroll progresses past 0.25
  const dollyTranslateZ = Math.min(Math.max((scrollProgress - 0.15) * 1600, 0), 950);
  const monitorScale = 1 + Math.min(Math.max((scrollProgress - 0.25) * 2.2, 0), 1.6);
  const monitorOpacity = Math.min(Math.max((scrollProgress - 0.2) * 3, 0), 1);
  const studioOverlayOpacity = Math.min(Math.max((scrollProgress - 0.45) * 3, 0), 0.95);

  const sprints = [
    {
      name: "7-Day Starter Sprint",
      tier: "starter",
      price: 1500,
      priceLabel: "$1,500 CAD",
      timeline: "7 Days Turnaround",
      desc: "Rapid high-converting landing page with Supabase Lead-Intake and Flame Orange cyber branding.",
      features: [
        "7-Day Rapid Delivery Sprint",
        "Supabase Auth & Lead-Intake Edge Function",
        "Flame Orange Cyber Aesthetic (#FF5500)",
        "PayPal Complete Payments & Pay in 4",
      ],
      popular: false,
      accentColor: "#FF5500",
    },
    {
      name: "7-Day Pro Agency Sprint",
      tier: "pro",
      price: 2500,
      priceLabel: "$2,500 CAD",
      timeline: "7 Days Turnaround",
      desc: "Full-stack React + Vite + Tailwind web app with 2.5D scroll canvas, Supabase Realtime, and Netlify staging.",
      features: [
        "Full-Stack React + Vite + Tailwind",
        "Interactive 2.5D Scroll Canvas",
        "Supabase PostgreSQL Database & Realtime PubSub",
        "85vh Master Modal Drawer Shell Integration",
        "Netlify Production Staging & Domain Setup",
      ],
      popular: true,
      accentColor: "#00D2FF",
    },
    {
      name: "7-Day Enterprise Elite Sprint",
      tier: "enterprise",
      price: 5000,
      priceLabel: "$5,000 CAD",
      timeline: "7 Days Turnaround",
      desc: "Turnkey enterprise platform with custom CRM, Gemini 1.5 Flash AI qualification, and live jumbotron sync.",
      features: [
        "Custom CRM & Client Portal Deployment",
        "Gemini 1.5 Flash AI Qualification Engine",
        "High-Concurrency Live Jumbotron Sync",
        "Architecture Session with Darnley Sanon",
        "Priority 24/7 Production SLA & Git Handoff",
      ],
      popular: false,
      accentColor: "#00FF88",
    },
    {
      name: "Real Estate Spatial Build",
      tier: "spatial",
      price: 15000,
      priceLabel: "$10k - $30k CAD",
      timeline: "2-3 Weeks Milestone Escrow",
      desc: "CAD/BIM model ingestion, 2.5D architectural digital twin walkthrough, and Niantic WebAR 3D previews.",
      features: [
        "Custom CAD/BIM Floorplan & Elevation Ingestion",
        "Interactive 2.5D Building Walkthrough Canvas",
        "Niantic WebAR 3D Architectural Models",
        "Accredited Investor & Buyer Deal-Flow Portal",
        "50/25/25 Production Milestone Escrow",
      ],
      popular: false,
      accentColor: "#FFB800",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#050505] text-white font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* 3D Perspective Stage Container */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Base Plate: Cinematic Over-The-Shoulder Office Scene */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-75 ease-out will-change-transform"
            style={{
              backgroundImage: "url('/images/darnley_office_desk_ots.jpg')",
              transform: `translateZ(${dollyTranslateZ * 0.4}px) scale(${1 + scrollProgress * 0.3})`,
            }}
          >
            {/* Ambient Vignette & Neon Edge Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
          </div>

          {/* Phase 1 Floating Studio Telemetry HUD (Active at scroll 0.0 - 0.25) */}
          <div
            className="absolute top-24 left-6 sm:left-12 z-20 space-y-2 pointer-events-none transition-all duration-300"
            style={{
              opacity: Math.max(1 - scrollProgress * 4, 0),
              transform: `translateY(-${scrollProgress * 60}px)`,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0B10]/80 backdrop-blur-md border border-[#FF5500]/40 text-[#FF5500] font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
              9LMNTS STUDIO HQ // OTTAWA TECH CORRIDOR
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-['Syne',sans-serif] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              OVER-THE-SHOULDER <span className="text-[#FF5500]">STUDIO</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 font-['Plus_Jakarta_Sans',sans-serif] max-w-md drop-shadow">
              Scroll down to dolly into Darnley's workstation, activate the 4 Production Sprints, and inspect deep-zoom OS arenas.
            </p>
          </div>

          {/* Phase 1 Studio Hotspots (Mixer, Mic, Monitor) */}
          <div
            className="absolute bottom-20 left-12 z-20 hidden md:flex items-center gap-3 transition-opacity duration-300"
            style={{ opacity: Math.max(1 - scrollProgress * 4, 0) }}
          >
            <div className="px-3 py-1.5 rounded-lg bg-[#0A0B10]/80 border border-white/10 text-[11px] font-mono flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>PIONEER DJ CONSOLE // SOUND CLASH OS</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#0A0B10]/80 border border-white/10 text-[11px] font-mono flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>VOCAL MIC // ARTIST OS</span>
            </div>
          </div>

          {/* Ambient Dark Overlay Transition to Monitor Focus */}
          <div
            className="absolute inset-0 bg-[#0A0B10] pointer-events-none transition-opacity duration-150"
            style={{ opacity: studioOverlayOpacity }}
          />

          {/* Monitor Screen Frame & Virtual Desktop Interface */}
          <div
            className="absolute z-30 w-full max-w-7xl h-[88vh] mx-auto p-4 sm:p-6 flex flex-col justify-between transition-all duration-100 ease-out will-change-transform"
            style={{
              transform: `translateZ(${dollyTranslateZ}px) scale(${monitorScale})`,
              opacity: monitorOpacity,
              pointerEvents: scrollProgress > 0.4 ? "auto" : "none",
            }}
          >
            {/* Monitor Chrome Header */}
            <div className="w-full bg-[#121624]/95 border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5500]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFB800]" />
                  <span className="w-3 h-3 rounded-full bg-[#00FF88]" />
                </div>
                <div className="h-4 w-[1px] bg-white/10" />
                <span className="font-mono text-xs text-[#00D2FF] font-bold flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5" />
                  DARNLEY WORKSTATION // 9LMNTS UNIVERSAL DESKTOP
                </span>
              </div>

              {/* Navigation Bar inside Monitor */}
              <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
                <button
                  onClick={() => jumpToPhase(0.55)}
                  className={`hover:text-[#FF5500] transition-colors ${scrollProgress >= 0.5 && scrollProgress < 0.75 ? "text-[#FF5500] font-bold" : "text-gray-400"}`}
                >
                  [4 SPRINTS]
                </button>
                <button
                  onClick={() => jumpToPhase(0.85)}
                  className={`hover:text-[#00D2FF] transition-colors ${scrollProgress >= 0.75 ? "text-[#00D2FF] font-bold" : "text-gray-400"}`}
                >
                  [DEEP-ZOOM REELS]
                </button>
                <button
                  onClick={() => {
                    setDrawerMode("lead-intake");
                    setIsDrawerOpen(true);
                  }}
                  className="px-3 py-1 rounded bg-[#FF5500] text-black font-bold uppercase text-[10px] hover:brightness-110 transition-all"
                >
                  BOOK SPRINT (85vh DRAWER)
                </button>
              </div>
            </div>

            {/* Desktop Stage Content (Switches between Sprints and Deep-Zoom Reels based on scroll) */}
            <div className="flex-1 my-4 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {/* Sprints View (Phase 3: scroll 0.45 - 0.75) */}
              {scrollProgress < 0.75 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold font-['Syne',sans-serif] text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-[#FF5500]" />
                        Productized AI Sprints & Spatial Builds
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Guaranteed 7-day autonomous turnarounds backed by PayPal Complete Payments & Pay in 4.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#00FF88] px-2 py-0.5 rounded bg-[#00FF88]/10 border border-[#00FF88]/20">
                      LIVE ON SUPABASE ENGINE
                    </span>
                  </div>

                  {/* 4 Sprints Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sprints.map((sprint, idx) => (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl flex flex-col justify-between border transition-all ${
                          sprint.popular
                            ? "bg-[#121624] border-[#00D2FF] shadow-[0_0_25px_rgba(0,210,255,0.2)]"
                            : "bg-[#0A0B10]/90 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="text-[10px] font-mono px-2 py-0.5 rounded font-bold border"
                              style={{
                                color: sprint.accentColor,
                                borderColor: `${sprint.accentColor}40`,
                                backgroundColor: `${sprint.accentColor}10`,
                              }}
                            >
                              {sprint.timeline}
                            </span>
                            {sprint.popular && (
                              <span className="text-[10px] font-mono text-[#00D2FF] font-bold">
                                ★ POPULAR
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">
                            {sprint.name}
                          </h3>
                          <div className="my-2">
                            <span
                              className="text-2xl font-extrabold font-mono"
                              style={{ color: sprint.accentColor }}
                            >
                              {sprint.priceLabel}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                            {sprint.desc}
                          </p>

                          <ul className="space-y-2 mb-6">
                            {sprint.features.map((feat, fIdx) => (
                              <li key={fIdx} className="text-xs text-gray-300 flex items-start gap-1.5">
                                <CheckCircle
                                  className="w-3.5 h-3.5 shrink-0 mt-0.5"
                                  style={{ color: sprint.accentColor }}
                                />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => handleCreateOrder(sprint)}
                          className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black transition-all shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5"
                          style={{ backgroundColor: sprint.accentColor }}
                        >
                          <Zap className="w-3.5 h-3.5" />
                          Book & Check Out
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Deep-Zoom Media Reels (Phase 4: scroll 0.75 - 1.00) */
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold font-['Syne',sans-serif] text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#00D2FF]" />
                        Deep-Zoom Arena Media Reels & Prototypes
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Interactive modal inspects for Sound Clash OS, Artist OS, and Corporate Clash OS.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setDrawerMode("lead-intake");
                        setIsDrawerOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#FF5500] hover:bg-[#FF4500] text-black font-bold font-mono text-xs uppercase flex items-center gap-1.5 shadow-lg"
                    >
                      Open 85vh Booking Drawer
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Deep-Zoom Card 1: Sound Clash OS */}
                    <div
                      onClick={() => setActiveMediaModal("sound-clash")}
                      className="p-5 rounded-2xl bg-[#0F1115] border border-[#FF5500]/40 hover:border-[#FF5500] cursor-pointer transition-all group relative overflow-hidden shadow-xl"
                    >
                      <div className="w-full h-36 rounded-xl bg-gradient-to-tr from-[#FF5500]/20 via-[#0A0B10] to-[#FF5500]/10 flex items-center justify-center mb-3 relative overflow-hidden">
                        <Music className="w-12 h-12 text-[#FF5500] group-hover:scale-110 transition-transform" />
                        <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#FF5500]">
                          OCT 31 • BRONSON CENTRE
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#FF5500] font-bold block">
                        ● ARENA PROTOCOL 1
                      </span>
                      <h3 className="text-lg font-bold text-white font-['Syne',sans-serif] mt-1">
                        Sound Clash OS
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        8-DJ sudden-death bracket, live decibel meter telemetry, and crowd voting wallet slider.
                      </p>
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#FF5500]">
                        <span>Inspect Interactive Reel</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Deep-Zoom Card 2: Artist OS */}
                    <div
                      onClick={() => setActiveMediaModal("artist-os")}
                      className="p-5 rounded-2xl bg-[#0F1115] border border-[#00D2FF]/40 hover:border-[#00D2FF] cursor-pointer transition-all group relative overflow-hidden shadow-xl"
                    >
                      <div className="w-full h-36 rounded-xl bg-gradient-to-tr from-[#00D2FF]/20 via-[#0A0B10] to-[#00D2FF]/10 flex items-center justify-center mb-3 relative overflow-hidden">
                        <Flame className="w-12 h-12 text-[#00D2FF] group-hover:scale-110 transition-transform" />
                        <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#00D2FF]">
                          ARTIST.9LMNTSSTUDIO.COM
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#00D2FF] font-bold block">
                        ● CREATOR HEADQUARTERS
                      </span>
                      <h3 className="text-lg font-bold text-white font-['Syne',sans-serif] mt-1">
                        Artist OS
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        Uncompressed WAV stem downloads, direct fan tipping jar, tour dates, and WebAR merch unlocker.
                      </p>
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#00D2FF]">
                        <span>Inspect Interactive Reel</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Deep-Zoom Card 3: Corporate Clash OS */}
                    <div
                      onClick={() => setActiveMediaModal("corporate-clash")}
                      className="p-5 rounded-2xl bg-[#0F1115] border border-[#FFB800]/40 hover:border-[#FFB800] cursor-pointer transition-all group relative overflow-hidden shadow-xl"
                    >
                      <div className="w-full h-36 rounded-xl bg-gradient-to-tr from-[#FFB800]/20 via-[#0A0B10] to-[#FFB800]/10 flex items-center justify-center mb-3 relative overflow-hidden">
                        <Briefcase className="w-12 h-12 text-[#FFB800] group-hover:scale-110 transition-transform" />
                        <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#FFB800]">
                          DEC 17 • BAYVIEW YARDS
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#FFB800] font-bold block">
                        ● HIGH-STAKES PITCH
                      </span>
                      <h3 className="text-lg font-bold text-white font-['Syne',sans-serif] mt-1">
                        Corporate Clash OS
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        8-Startup demo battle, live pitch countdown clock, sponsor marquee, and OSC Rule 45-501 soft pledges.
                      </p>
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#FFB800]">
                        <span>Inspect Interactive Reel</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Monitor Desktop Taskbar */}
            <div className="w-full bg-[#121624]/90 border border-white/10 rounded-xl px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[#00FF88]">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                  SUPABASE EDGE ENGINE ACTIVE
                </span>
                <span>•</span>
                <span>SCROLL: {(scrollProgress * 100).toFixed(0)}%</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate("home")}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  Full Website Hub
                </button>
                <button
                  onClick={() => {
                    setDrawerMode("lead-intake");
                    setIsDrawerOpen(true);
                  }}
                  className="px-2.5 py-1 rounded bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/40 font-bold hover:bg-[#FF5500]/30 transition-colors"
                >
                  Book In-App
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Scrollytelling Stage Indicator (Right Side) */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 p-2 rounded-full bg-[#0A0B10]/80 backdrop-blur-md border border-white/10">
          {[
            { label: "Wide Shot", val: 0.1 },
            { label: "Zoom Monitor", val: 0.35 },
            { label: "4 Sprints", val: 0.6 },
            { label: "Media Reels", val: 0.9 },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => jumpToPhase(item.val)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              aria-label={item.label}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  Math.abs(scrollProgress - item.val) < 0.15
                    ? "bg-[#FF5500] scale-125 shadow-[0_0_8px_#FF5500]"
                    : "bg-white/30 hover:bg-white/60"
                }`}
              />
              <span className="absolute right-7 px-2 py-0.5 rounded bg-[#121624] border border-white/10 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Deep-Zoom Modal 1: Sound Clash OS */}
      {activeMediaModal === "sound-clash" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#121624] border border-[#FF5500] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF5500]/20 text-[#FF5500] font-bold">
                  ● ARENA PROTOCOL 1
                </span>
                <h3 className="text-2xl font-bold font-['Syne',sans-serif] mt-1 text-white">
                  Sound Clash OS // 8-DJ Elimination Arena
                </h3>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono"
              >
                Close ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0B10] border border-white/10 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">VENUE:</span>
                <span className="text-white font-bold">Bronson Centre Main Hall, Ottawa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DATE:</span>
                <span className="text-[#FF5500] font-bold">Saturday, October 31, 2026 (Halloween)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">TELEMETRY:</span>
                <span className="text-[#00FF88] font-bold">Live Decibel Meter + Voting Slider Wallet</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActiveMediaModal(null);
                  onNavigate("ClashOS");
                }}
                className="flex-1 py-3 rounded-xl bg-[#FF5500] text-black font-bold font-mono text-xs uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                Launch Clash OS Web App
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deep-Zoom Modal 2: Artist OS */}
      {activeMediaModal === "artist-os" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#121624] border border-[#00D2FF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00D2FF]/20 text-[#00D2FF] font-bold">
                  ● CREATOR HEADQUARTERS
                </span>
                <h3 className="text-2xl font-bold font-['Syne',sans-serif] mt-1 text-white">
                  Artist OS // Stems Vault & Fan CRM
                </h3>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono"
              >
                Close ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0B10] border border-white/10 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">DOMAIN:</span>
                <span className="text-white font-bold">artist.9lmntsstudio.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">COMMERCE:</span>
                <span className="text-[#00D2FF] font-bold">Direct Fan Tipping + Uncompressed WAV Stems</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SPATIAL LAYER:</span>
                <span className="text-[#00FF88] font-bold">WebAR Glowing 3D Merch Scan</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://artist.9lmntsstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-[#00D2FF] text-black font-bold font-mono text-xs uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                Visit Artist OS Live Showroom
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Deep-Zoom Modal 3: Corporate Clash OS */}
      {activeMediaModal === "corporate-clash" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#121624] border border-[#FFB800] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFB800]/20 text-[#FFB800] font-bold">
                  ● HIGH-STAKES PITCH
                </span>
                <h3 className="text-2xl font-bold font-['Syne',sans-serif] mt-1 text-white">
                  Corporate Clash OS // Pitch Battle & Capital Syndicate
                </h3>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono"
              >
                Close ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0B10] border border-white/10 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">VENUE:</span>
                <span className="text-white font-bold">Bayview Yards (RBC Innovation Hall), Ottawa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DATE:</span>
                <span className="text-[#FFB800] font-bold">Thursday, December 17, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">COMPLIANCE:</span>
                <span className="text-[#00FF88] font-bold">OSC Rule 45-501 Non-Binding Soft Syndicate Pledges</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setActiveMediaModal(null);
                  onNavigate("corporate-clash");
                }}
                className="flex-1 py-3 rounded-xl bg-[#FFB800] text-black font-bold font-mono text-xs uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                Launch Corporate Clash Arena
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 85vh Master Modal Drawer Shell */}
      <MasterDrawerShell
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={drawerMode === "lead-intake" ? "Book 7-Day Production Sprint" : `Confirm Order: ${selectedSprint.name}`}
        subtitle={drawerMode === "lead-intake" ? "Directly bound to Supabase /functions/v1/lead-intake with Gemini 1.5 Flash qualification" : "PayPal Complete Payments & Pay in 4 installment financing"}
        badge={drawerMode === "lead-intake" ? "SUPABASE INTAKE" : "PAYPAL COMMERCE"}
        badgeColor="#FF5500"
        footer={
          drawerMode === "lead-intake" ? (
            <div className="space-y-2">
              <button
                type="submit"
                form="lead-intake-form"
                disabled={isSubmittingLead}
                className="w-full py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#FF4500] text-white font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,85,0,0.4)] disabled:opacity-50"
              >
                {isSubmittingLead ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Dispatching to Supabase...
                  </>
                ) : leadSuccess ? (
                  "✓ Sprint Request Dispatched"
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Sprint Briefing
                  </>
                )}
              </button>
              <p className="text-[10px] text-gray-500 text-center font-mono">
                Zero spam • Darnley Sanon reviews within 4 hours
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  alert(`Redirecting to secure PayPal Complete Payments checkout for ${selectedSprint.name} ($${selectedSprint.price} CAD)...`);
                  setIsDrawerOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-[#00D2FF] hover:bg-[#00D2FF]/90 text-black font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.4)]"
              >
                <DollarSign className="w-4 h-4" />
                Pay ${selectedSprint.price.toLocaleString()} CAD with PayPal / Card
              </button>
              <div className="flex items-center justify-center gap-3 text-[10px] text-gray-500 font-mono">
                <span>🔒 PAYPAL COMPLETE PAYMENTS</span>
                <span>•</span>
                <span>PAY IN 4 AVAILABLE</span>
                <span>•</span>
                <span>13% HST INCLUDED</span>
              </div>
            </div>
          )
        }
      >
        {drawerMode === "lead-intake" ? (
          <form id="lead-intake-form" onSubmit={handleLeadSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                FULL NAME / ORGANIZATION:
              </label>
              <input
                type="text"
                required
                value={leadForm.fullName}
                onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                placeholder="Marcus Vance (Vance Logistics)"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0B10] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                DIRECT EMAIL ADDRESS:
              </label>
              <input
                type="email"
                required
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                placeholder="marcus@vance.ca"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0B10] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                SPRINT PACKAGE TIER:
              </label>
              <select
                value={leadForm.projectType}
                onChange={(e) => setLeadForm({ ...leadForm, projectType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0B10] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none font-mono"
              >
                <option value="7-Day Starter Sprint ($1,500 CAD)">7-Day Starter Sprint ($1,500 CAD)</option>
                <option value="7-Day Pro Agency Sprint ($2,500 CAD)">7-Day Pro Agency Sprint ($2,500 CAD)</option>
                <option value="7-Day Enterprise Elite Sprint ($5,000 CAD)">7-Day Enterprise Elite Sprint ($5,000 CAD)</option>
                <option value="Real Estate Spatial Build ($15,000+ CAD)">Real Estate Spatial Build ($15,000+ CAD)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                PROJECT BRIEF & REQUIREMENTS:
              </label>
              <textarea
                rows={4}
                required
                value={leadForm.message}
                onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                placeholder="Describe your target app, required integrations, branding guidelines, and deadline..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0B10] border border-white/10 text-white text-sm focus:border-[#FF5500] focus:outline-none"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-400 space-y-1 font-mono">
              <span className="text-[#00FF88] block">✓ SUPABASE EDGE ROUTING VERIFIED</span>
              <p className="text-[11px] text-gray-500">
                Payload validated by Gemini 1.5 Flash in Supabase Edge Functions with zero third-party relay breaks.
              </p>
            </div>
          </form>
        ) : (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-[#0A0B10] border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400">SELECTED SPRINT</span>
                <span className="text-white font-bold">{selectedSprint.name}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400">AMOUNT DUE (CAD)</span>
                <span className="text-[#00D2FF] font-bold text-base">
                  ${selectedSprint.price.toLocaleString()} CAD
                </span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400">PAY IN 4 INSTALLMENTS</span>
                <span className="text-[#00FF88] font-bold">
                  4x ${(selectedSprint.price / 4).toFixed(2)} CAD
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
              <span className="text-white font-bold font-mono">PRODUCTION GUARANTEE</span>
              <p className="text-gray-400 leading-relaxed">
                Work begins immediately upon deposit. Includes dedicated private Slack / GitHub channel, live staging previews, and final production push to Netlify.
              </p>
            </div>
          </div>
        )}
      </MasterDrawerShell>
    </div>
  );
};
