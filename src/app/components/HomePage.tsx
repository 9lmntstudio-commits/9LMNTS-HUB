import { StudioMobileHorizon } from "./StudioMobileHorizon";
import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Music,
  Trophy,
  Mic,
  Smile,
  Shirt,
  Utensils,
  Briefcase,
  TrendingUp,
  Heart,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Users,
  Clock,
  Crown,
  Flame,
  Play,
  Maximize2,
  Video,
  Scan,
  Smartphone,
  Eye,
  Box
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import img1 from "../imports/image-1.png";
import img2 from "../imports/image-2.png";
import img3 from "../imports/image-3.png";
import { SEO } from "./SEO";
import presentingImg from "../imports/PRESENTING.png";
import clashImg2 from "../imports/Clash_OS_image_2.png";
import gateImg from "../imports/Gate_OS_image-1.png";
import sc1 from "../imports/sound-clash-1.png";

import { GateOSCheckoutModal } from "./GateOSCheckoutModal";

const soundClashImg = img3;
const weddingImg    = img2;
const corporateImg  = img1;

interface HomePageProps {
  onNavigate: (page: string, plan?: string) => void;
}

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  thumbnail: string;
  duration: string;
  videoUrl?: string; // YouTube embed ID or direct MP4 URL
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<'sprints' | 'subscriptions' | 'event-passes' | 'ar-services'>('sprints');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({
    id: "SPRINT-1500",
    title: "Starter Creative Sprint",
    amount: 1500.00,
    description: "7-Day Turnkey Portal, WebAR & Lead Automation",
    paypalCheckoutUrl: "https://www.paypal.com/ncp/payment/YOUR_SPRINT_1500_LINK"
  });

  // Video Player Modal State
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Event Calculator State
  const [attendance, setAttendance] = useState<number>(500);
  const [ticketPrice, setTicketPrice] = useState<number>(20);
  const [voteSpend, setVoteSpend] = useState<number>(10);
  const [vipTables, setVipTables] = useState<number>(6);

  const voteRev = attendance * voteSpend;
  const gross = (attendance * ticketPrice) + voteRev + (vipTables * 150);
  const prizePot = Math.round(voteRev * 0.7);
  const studioTake = 500 + Math.round(gross * 0.05);
  const promoterNet = gross - prizePot - studioTake;

  const handleOpenCheckout = (title: string, amount: number, id: string, desc: string, link: string) => {
    setSelectedInvoice({
      id,
      title,
      amount,
      description: desc,
      paypalCheckoutUrl: link
    });
    setIsCheckoutOpen(true);
  };

  const platforms = [
    {
      name: "Artist OS",
      category: "Music & Audio",
      desc: "24/7 Creator Hub with uncompressed WAV vaults, direct fan tipping, and stem licensing.",
      icon: Music,
      badge: "LIVE SHOWROOM",
      color: "#FF5500",
      action: () => onNavigate("event-os-demo")
    },
    {
      name: "Sound Clash OS",
      category: "Live DJ Battles",
      desc: "Universal 8-DJ bracket tournament engine with real-time crowd voting & dynamic prize pots.",
      icon: Zap,
      badge: "FLAGSHIP ARENA",
      color: "#00D4FF",
      action: () => onNavigate("event-os-demo")
    },
    {
      name: "Sports OS / The League",
      category: "Athletics & Streetball",
      desc: "Verified digital Athlete Cards, 3v3 tournament live scorekeeping, and player sponsorships.",
      icon: Trophy,
      badge: "3v3 ARENA",
      color: "#00FF9D",
      action: () => onNavigate("event-os-demo")
    },
    {
      name: "Bars OS",
      category: "Battle Rap",
      desc: "8-MC head-to-head lyric showdowns, live bar boosts, and crowd punchline reaction meters.",
      icon: Mic,
      badge: "LYRIC SHOWDOWN",
      color: "#FF5500",
      action: () => onNavigate("event-os-demo")
    },
    {
      name: "Comedian OS / Roast Battle",
      category: "Stand-Up Comedy",
      desc: "Live digital comedy specials, on-stage Heckle Shields, and crowd laugh-o-meters.",
      icon: Smile,
      badge: "ROAST ARENA",
      color: "#00D4FF",
      action: () => onNavigate("event-os-demo")
    },
    {
      name: "Runway OS",
      category: "Fashion & Streetwear",
      desc: "Live runway designer battles, capsule lookbooks, and WebAR apparel scan markers.",
      icon: Shirt,
      badge: "DESIGNER BATTLE",
      color: "#FF5500",
      action: () => onNavigate("event-os-demo")
    },
  ];

  const videos: VideoItem[] = [
    {
      id: "vid-1",
      title: "Artist OS & AR Service Commercial",
      subtitle: "Full-length commercial showcase demonstrating WebAR digital wings & artist portals.",
      category: "Commercial & WebAR",
      duration: "0:45",
      thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "vid-2",
      title: "Sound Clash OS Arena Walkthrough",
      subtitle: "Complete mobile tour: 8-contender live bracket, split duel cards, and real-time voting.",
      category: "Arena Walkthrough",
      duration: "1:15",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: "vid-3",
      title: "Project LOA & 9LMNTS Ecosystem",
      subtitle: "The transmedia concept combining Hip-Hop culture, battle rap mechanics, and gaming systems.",
      category: "Concept Teaser",
      duration: "0:50",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Orbitron',sans-serif] relative selection:bg-[#FF5500] selection:text-white">
      <SEO 
        title="9LMNTS Studio | Futuristic Web Experiences & Event OS" 
        description="Where Hip-Hop culture, live competition arenas, and vertical operating systems collide. Turnkey 8-contender live arenas, creator platforms, WebAR advertising, and AI agency sprints." 
      />

      {/* FIXED FAINT BACKGROUND TEXTURE LAYER FOR SUBTLE SCROLLING DEPTH */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-cover bg-center bg-fixed mix-blend-luminosity filter contrast-125"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')`
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/95 to-[#050505]" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10">

        {/* MOBILE ONLY: PANORAMIC STROLL ACROSS FRONT-FACING STUDIO (ELIMINATES MOBILE CUTOFF) */}
        <div className="block md:hidden">
          <StudioMobileHorizon onNavigate={onNavigate} />
        </div>

        {/* DESKTOP ONLY: FULL WIDE STUDIO WORKSTATION */}
        <div className="hidden md:block">
          {/* MOBILE ONLY: PANORAMIC STROLL ACROSS FRONT-FACING STUDIO (ELIMINATES MOBILE CUTOFF) */}
        <div className="block md:hidden">
          <StudioMobileHorizon onNavigate={onNavigate} />
        </div>

        {/* DESKTOP ONLY: FULL WIDE STUDIO WORKSTATION */}
        <div className="hidden md:block">
          {/* HERO SECTION WITH NEO-OTTAWA CYBER ATMOSPHERE */}
        <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/10" style={{ backgroundImage: `linear-gradient(180deg, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.92) 60%, #050505 100%), url(${presentingImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF5500]/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 max-w-6xl mx-auto text-center py-24">
            {/* Status Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF5500]/10 border border-[#FF5500]/40 rounded-full shadow-[0_0_20px_rgba(255,85,0,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping" />
              <span className="text-[#FF5500] text-xs font-bold tracking-widest uppercase font-mono">
                9LMNTS STUDIO // DUAL-ENGINE ARCHITECTURE
              </span>
            </div>

            {/* Master Logo Composition */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
              <span className="text-[#FF5500]">9L</span>
              <span>MNTS </span>
              <span className="font-['Caveat'] text-[#FF5500] lowercase text-6xl sm:text-7xl lg:text-9xl ml-[-15px] -rotate-6 inline-block capitalize font-normal">
                Studio
              </span>
              <br />
              Where Hip-Hop Culture &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#00D4FF] to-[#00FF9D]">
                Vertical OS Collide
              </span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mb-10 font-sans leading-relaxed">
              We convert concepts into high-performance digital ecosystems. Specializing in turnkey 8-contender live competition arenas, 24/7 creator operating systems, WebAR advertising, and rapid AI agency sprints.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate("event-os-demo")}
                className="w-full sm:w-auto px-8 py-4 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-xl shadow-[#FF5500]/30 transition-all flex items-center justify-center gap-2 group border border-[#FF5500]"
              >
                <span>Launch Live Arena Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate("loa")}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF5500]/20 to-[#00D2FF]/20 hover:from-[#FF5500]/30 hover:to-[#00D2FF]/30 text-white border border-[#FF5500]/60 font-bold text-xs uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,85,0,0.3)]"
              >
                <Flame className="w-4 h-4 text-[#FF5500]" />
                <span>Project LOA (0K Goal)</span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("video-vault");
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-[#0B0F17] hover:bg-white/10 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-[#FF5500]" />
                <span>Watch Commercials</span>
              </button>
            </div>

            
            {/* Direct Live Subdomain Arenas */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
              <a
                href="https://clash.9lmntsstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#FF5500]/15 hover:bg-[#FF5500]/25 text-[#FF5500] border border-[#FF5500]/40 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,85,0,0.2)]"
              >
                <Music className="w-3.5 h-3.5" />
                <span>clash.9lmntsstudio.com</span>
                <Maximize2 className="w-3 h-3" />
              </a>
              <a
                href="https://artist.9lmntsstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#00D2FF]/15 hover:bg-[#00D2FF]/25 text-[#00D2FF] border border-[#00D2FF]/40 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,210,255,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>artist.9lmntsstudio.com</span>
                <Maximize2 className="w-3 h-3" />
              </a>
            </div>

            {/* Quick Trigger Chips */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-3 text-[11px] text-gray-400">
              <span className="font-bold text-white uppercase tracking-wider">ManyChat Direct Triggers:</span>
              <span className="px-3 py-1 bg-[#0B0F17] border border-white/10 text-[#FF5500] font-mono">DM "DEV" → Sprints</span>
              <span className="px-3 py-1 bg-[#0B0F17] border border-white/10 text-[#00D4FF] font-mono">DM "CLASH" → DJ Battles</span>
              <span className="px-3 py-1 bg-[#0B0F17] border border-white/10 text-[#00FF9D] font-mono">DM "ARTIST" → Creator Hub</span>
            </div>
          </div>
        </section>
        </div>

        {/* MULTIMEDIA & COMMERCIAL VIDEO VAULT */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07090E]/90 border-b border-white/10" id="video-vault">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-[#FF5500] text-xs font-bold tracking-widest uppercase mb-2">
                  <Video className="w-4 h-4" />
                  <span>Multimedia Showcase</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  Studio Commercials & OS Walkthroughs
                </h2>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm font-sans max-w-md mt-2 sm:mt-0">
                Explore our high-fidelity cinematic commercials, live platform demos, and WebAR product activations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videos.map((vid) => (
                <div 
                  key={vid.id}
                  className="bg-[#0B0F17] border border-white/10 rounded-xl overflow-hidden hover:border-[#FF5500]/60 transition-all group flex flex-col justify-between shadow-lg"
                >
                  <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setActiveVideo(vid)}>
                    <img 
                      src={vid.thumbnail} 
                      alt={vid.title} 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#FF5500]/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,85,0,0.5)] group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    <span className="absolute bottom-3 right-3 text-[10px] font-mono font-bold bg-black/80 text-white px-2 py-0.5 rounded border border-white/10">
                      {vid.duration}
                    </span>
                    <span className="absolute top-3 left-3 text-[10px] font-mono font-bold bg-[#FF5500] text-black px-2 py-0.5 uppercase tracking-wider">
                      {vid.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#FF5500] transition-colors">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
                      {vid.subtitle}
                    </p>
                    <button
                      onClick={() => setActiveVideo(vid)}
                      className="w-full py-2.5 bg-white/5 hover:bg-[#FF5500] text-white text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-[#FF5500] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Watch Preview</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEDICATED WEBAR ADVERTISING & PHYGITAL MERCH SECTION */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-b border-white/10" id="webar">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-[#00D4FF] text-xs font-bold tracking-widest uppercase">
                  <Scan className="w-4 h-4" />
                  <span>Next-Gen Immersion</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
                  WebAR Advertising & Phygital Merch
                </h2>
                <p className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed">
                  Bridge physical apparel and live stage events into interactive augmented reality experiences. Powered by 8th Wall and Three.js, fans simply point their phone camera at physical markers or QR codes—zero app downloads required.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#FF5500]/10 border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500] shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dynamic 3D Glowing Wings</h4>
                      <p className="text-xs text-gray-400 font-sans">Scanning apparel markers renders animated cyber-neon or holographic wings directly onto the wearer in live camera feeds.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] shrink-0 mt-0.5">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Zero App Download (WebAR)</h4>
                      <p className="text-xs text-gray-400 font-sans">Runs seamlessly in Safari and Chrome. Instant mobile browser engagement with sub-2-second asset hydration.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#00FF9D]/10 border border-[#00FF9D]/30 flex items-center justify-center text-[#00FF9D] shrink-0 mt-0.5">
                      <Crown className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Token-Gated Merch & VIP Badges</h4>
                      <p className="text-xs text-gray-400 font-sans">Integrated with Artist OS and Sound Clash OS to grant verified backstage perks and digital credentials.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Showcase Graphic Card */}
              <div className="lg:col-span-6 bg-gradient-to-br from-[#0B0F17] to-[#121622] border-2 border-[#00D4FF]/40 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#00D4FF]/10 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-black border border-[#00D4FF]/50 flex items-center justify-center shadow-[0_0_40px_rgba(0,212,255,0.2)]">
                    <Box className="w-10 h-10 text-cyber-cyan" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">Interactive WebAR Campaign Sprints</h3>
                    <p className="text-xs text-gray-400 font-sans max-w-sm mx-auto mt-2">
                      Custom 3D GLTF asset modeling, camera marker calibration, and Netlify edge hosting for your next product drop.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10 text-left">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-mono">STARTER</p>
                      <p className="text-base font-bold text-white font-mono">$1,500</p>
                      <p className="text-[10px] text-gray-500 font-sans">1 Marker / Model</p>
                    </div>
                    <div className="border-x border-white/10 px-3">
                      <p className="text-[10px] text-[#00D4FF] uppercase font-mono">PRO CUSTOM</p>
                      <p className="text-base font-bold text-[#00D4FF] font-mono">$2,500+</p>
                      <p className="text-[10px] text-gray-400 font-sans">Full Merch Line</p>
                    </div>
                    <div className="pl-2">
                      <p className="text-[10px] text-[#FF5500] uppercase font-mono">ENTERPRISE</p>
                      <p className="text-base font-bold text-white font-mono">$5,000</p>
                      <p className="text-[10px] text-gray-500 font-sans">Arena Activation</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenCheckout(
                      "Pro WebAR & Phygital Campaign Sprint",
                      2500.00,
                      "WEBAR-2500",
                      "Full 3D WebAR marker integration, custom apparel scan effects, and browser hosting",
                      "https://www.paypal.com/ncp/payment/YOUR_WEBAR_LINK"
                    )}
                    className="w-full py-4 bg-[#00D4FF] hover:bg-[#00b4d8] text-black font-bold uppercase tracking-widest text-xs rounded-none transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00D4FF]/20"
                  >
                    <span>Launch WebAR Campaign ($2,500)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DUAL-ENGINE ECOSYSTEM SHOWCASE */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#07090E]/95 border-b border-white/10 overflow-hidden" style={{ backgroundImage: `linear-gradient(180deg, rgba(7,9,14,0.92) 0%, rgba(7,9,14,0.96) 100%), url(${clashImg2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-[#FF5500] text-xs font-bold tracking-widest uppercase mb-3">
                <Layers className="w-4 h-4" />
                <span>Modular Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4">
                The 9LMNTS Dual-Engine Ecosystem
              </h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans">
                Engine 01 delivers 24/7 creator monetization hubs. Engine 02 drives high-stakes 8-contender live crowd voting arenas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((p, idx) => (
                <div 
                  key={idx}
                  className="bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-[#FF5500]/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[#FF5500]">
                        <p.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                        {p.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-1 group-hover:text-[#FF5500] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#00D4FF] font-mono mb-3">{p.category}</p>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
                      {p.desc}
                    </p>
                  </div>
                  <button
                    onClick={p.action}
                    className="w-full py-2.5 bg-black hover:bg-[#FF5500] text-white text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-[#FF5500] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Launch Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENT REVENUE YIELD CALCULATOR */}
        <section className="py-24 bg-[#050505] border-b border-white/10" id="calculator">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4 text-[#FF5500]">
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-bold tracking-widest uppercase">Live Financial Engine</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4">
              Interactive Event & Revenue Yield Calculator
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mb-12 font-sans">
              Model your live event attendance, ticketing tiers, and crowd voting to project surging cash prize pots and promoter net margin in real-time.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sliders Box */}
              <div className="lg:col-span-7 space-y-6 bg-[#0B0F17]/90 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/10">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-300">Expected Attendance</span>
                    <span className="text-[#FF5500] font-mono font-bold">{attendance} Guests</span>
                  </div>
                  <input 
                    type="range" min="50" max="2000" step="25" value={attendance}
                    onChange={(e) => setAttendance(+e.target.value)}
                    className="w-full accent-[#FF5500] bg-gray-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-300">Base Ticket Price</span>
                    <span className="text-[#FF5500] font-mono font-bold">${ticketPrice} CAD</span>
                  </div>
                  <input 
                    type="range" min="10" max="50" step="5" value={ticketPrice}
                    onChange={(e) => setTicketPrice(+e.target.value)}
                    className="w-full accent-[#FF5500] bg-gray-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-300">Avg Vote Spend Per Guest</span>
                    <span className="text-[#FF5500] font-mono font-bold">${voteSpend} CAD</span>
                  </div>
                  <input 
                    type="range" min="0" max="30" step="2" value={voteSpend}
                    onChange={(e) => setVoteSpend(+e.target.value)}
                    className="w-full accent-[#FF5500] bg-gray-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-300">VIP Hospitality Tables ($150 ea)</span>
                    <span className="text-[#FF5500] font-mono font-bold">{vipTables} Tables</span>
                  </div>
                  <input 
                    type="range" min="0" max="20" step="1" value={vipTables}
                    onChange={(e) => setVipTables(+e.target.value)}
                    className="w-full accent-[#FF5500] bg-gray-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Financial Projection Box */}
              <div className="lg:col-span-5 bg-[#0B0F17]/90 backdrop-blur-md p-8 rounded-xl border-2 border-[#FF5500]/50 shadow-2xl space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-white/10 pb-3">
                  Projected Event Financial Ledger
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Projected Gross Revenue:</span>
                    <span className="text-2xl font-bold font-mono text-[#FF5500]">${gross.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Winning DJ Prize Pot (70% Votes):</span>
                    <span className="font-mono font-bold text-cyber-cyan">${prizePot.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">9LMNTS Studio Fee ($500 + 5%):</span>
                    <span className="font-mono text-gray-400">${studioTake.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm font-bold text-white uppercase">Promoter Net Profit:</span>
                    <span className="text-2xl font-bold font-mono text-matrix-green">${promoterNet.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleOpenCheckout(
                    "Event OS Complete Setup & Licensing",
                    500.00,
                    "EVENT-OS-500",
                    "Turnkey 8-contender live bracket, QR check-in & PayPal rails",
                    "https://www.paypal.com/ncp/payment/YOUR_EVENT_SETUP_LINK"
                  )}
                  className="w-full py-4 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-center uppercase tracking-wider text-xs rounded-none transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FF5500]/20"
                >
                  <span>Deploy This Exact Event OS ($500)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 9 ELEMENTS HIP-HOP CULTURE CONCEPT */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07090E]/90 border-b border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl text-white mb-4 uppercase tracking-tight font-bold">
                The <span className="text-[#FF5500]">9LMNTS</span> Concept
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-sans">
                Just like the 9 foundational elements of Hip-Hop culture, we unify design, code, sound, and live interactive competition into a cohesive digital discipline.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
              {[
                "Breaking", "MCing", "Graffiti", "DJs", "Knowledge",
                "Beatboxing", "Street Style", "Language", "Entrepreneurship"
              ].map((element, index) => (
                <div
                  key={element}
                  className="p-4 bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 text-center hover:border-[#FF5500] transition-colors group"
                >
                  <div className="text-xs font-mono text-gray-500 mb-1 group-hover:text-[#FF5500]">
                    0{index + 1}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    {element}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMMERCIAL SERVICES & PRICING */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505]" id="pricing">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4">
                Commercial Agency & Subscriptions
              </h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans mb-8">
                Choose between rapid 7-day custom sprints, monthly studio retainers, or recurring live event season passes.
              </p>

              {/* Segment Switcher */}
              <div className="inline-flex flex-wrap p-1 bg-[#0B0F17] border border-white/10 rounded-lg">
                <button
                  onClick={() => setActiveTab('sprints')}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                    activeTab === 'sprints' ? 'bg-[#FF5500] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Agency Sprints
                </button>
                <button
                  onClick={() => setActiveTab('subscriptions')}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                    activeTab === 'subscriptions' ? 'bg-[#FF5500] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Monthly Retainers
                </button>
                <button
                  onClick={() => setActiveTab('event-passes')}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                    activeTab === 'event-passes' ? 'bg-[#FF5500] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Live Event Passes
                </button>
              </div>
            </div>

            {/* TAB 1: AGENCY SPRINTS */}
            {activeTab === 'sprints' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between hover:border-white/30 transition-all">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-widest">7-DAY BUILD</span>
                    <h3 className="text-2xl font-bold text-white uppercase mt-1 mb-2">Starter Sprint</h3>
                    <div className="text-3xl font-mono font-bold text-white mb-6">$1,500 <span className="text-xs text-gray-400">/ build</span></div>
                    <ul className="space-y-3 text-xs text-gray-300 font-sans mb-8">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> High-fidelity Figma design & code</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Single landing page or event portal</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> WebAR interactive preview</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Netlify deployment & domain setup</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleOpenCheckout(
                      "Starter Creative Sprint (7-Day Build)",
                      1500.00,
                      "SPRINT-1500",
                      "High-fidelity UI/UX design, WebAR preview, and automated lead capture",
                      "https://www.paypal.com/ncp/payment/YOUR_SPRINT_1500_LINK"
                    )}
                    className="w-full py-3.5 bg-white/10 hover:bg-[#FF5500] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Book Starter Sprint ($1.5k)
                  </button>
                </div>

                <div className="bg-[#0B0F17]/80 backdrop-blur-md border-2 border-[#FF5500] p-8 flex flex-col justify-between shadow-xl shadow-[#FF5500]/10 relative">
                  <div className="absolute top-0 right-0 bg-[#FF5500] text-black font-bold text-[9px] uppercase px-3 py-1 font-mono tracking-wider">
                    MOST POPULAR
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-widest">FULL-STACK APP</span>
                    <h3 className="text-2xl font-bold text-white uppercase mt-1 mb-2">Pro Custom Sprint</h3>
                    <div className="text-3xl font-mono font-bold text-white mb-6">$2,500 – $3,500</div>
                    <ul className="space-y-3 text-xs text-gray-300 font-sans mb-8">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Full custom web application build</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Supabase database & auth integration</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> ManyChat automation & CRM pipelines</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Digital wallet & credit card checkouts</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> 14-day dedicated post-launch support</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleOpenCheckout(
                      "Pro Custom Sprint Deposit",
                      2500.00,
                      "SPRINT-2500",
                      "Full bespoke platform build, Supabase real-time backend, and ManyChat funnels",
                      "https://www.paypal.com/ncp/payment/YOUR_SPRINT_2500_LINK"
                    )}
                    className="w-full py-3.5 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Secure Pro Sprint ($2.5k)
                  </button>
                </div>

                <div className="bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between hover:border-white/30 transition-all">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-widest">ENTERPRISE OS</span>
                    <h3 className="text-2xl font-bold text-white uppercase mt-1 mb-2">Enterprise Build</h3>
                    <div className="text-3xl font-mono font-bold text-white mb-6">$5,000</div>
                    <ul className="space-y-3 text-xs text-gray-300 font-sans mb-8">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Custom white-label Web 2.5 OS engine</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Multi-tenant database & on-chain features</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Autonomous CrewAI agent workflows</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Priority SLA & dedicated lead architect</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleOpenCheckout(
                      "Enterprise Scale Build",
                      5000.00,
                      "ENTERPRISE-5000",
                      "Comprehensive bespoke platform development, AI workflows, and priority SLA",
                      "https://www.paypal.com/ncp/payment/YOUR_SPRINT_5000_LINK"
                    )}
                    className="w-full py-3.5 bg-white/10 hover:bg-[#FF5500] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Retain Enterprise ($5k)
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: MONTHLY STUDIO SUBSCRIPTIONS */}
            {activeTab === 'subscriptions' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">MONTH-TO-MONTH</span>
                    <h3 className="text-xl font-bold text-white uppercase mt-1 mb-2">Starter Maintenance</h3>
                    <div className="text-3xl font-mono font-bold text-white mb-6">$500 <span className="text-xs text-gray-400">/ mo</span></div>
                    <ul className="space-y-3 text-xs text-gray-300 font-sans mb-8">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Cloud uptime & security patches</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Minor UI/UX & asset updates</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> SEO & domain management</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleOpenCheckout(
                      "Starter Studio Retainer",
                      500.00,
                      "RETAINER-500",
                      "Monthly cloud infrastructure monitoring, security updates, and bug fixes",
                      "https://www.paypal.com/webapps/billing/plans/sub/YOUR_500_SUB_LINK"
                    )}
                    className="w-full py-3 bg-white/10 hover:bg-[#FF5500] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Subscribe ($500/mo)
                  </button>
                </div>

                <div className="bg-[#0B0F17]/80 backdrop-blur-md border-2 border-[#FF5500] p-8 flex flex-col justify-between shadow-xl shadow-[#FF5500]/10">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-widest">CORE STUDIO</span>
                    <h3 className="text-xl font-bold text-white uppercase mt-1 mb-2">Pro Studio (Design & Dev)</h3>
                    <div className="text-3xl font-mono font-bold text-white mb-6">$1,500 <span className="text-xs text-gray-400">/ mo</span></div>
                    <ul className="space-y-3 text-xs text-gray-300 font-sans mb-8">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Ongoing web development & feature releases</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Full graphic design & event flyers</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Remote technical support for 1 live event/mo</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleOpenCheckout(
                      "Pro Studio Retainer",
                      1500.00,
                      "RETAINER-1500",
                      "Full ongoing UI/UX graphic design, web development, and live event technical support",
                      "https://www.paypal.com/webapps/billing/plans/sub/YOUR_1500_SUB_LINK"
                    )}
                    className="w-full py-3.5 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Subscribe ($1,500/mo)
                  </button>
                </div>

                <div className="bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">CUSTOM OS</span>
                    <h3 className="text-xl font-bold text-white uppercase mt-1 mb-2">Enterprise Web 2.5 OS</h3>
                    <div className="text-3xl font-mono font-bold text-white mb-6">$3,500 <span className="text-xs text-gray-400">/ mo</span></div>
                    <ul className="space-y-3 text-xs text-gray-300 font-sans mb-8">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Bespoke OS architecture & AI agents</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Dedicated on-site event technical operator</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Priority 24/7 SLA</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleOpenCheckout(
                      "Enterprise Studio Retainer",
                      3500.00,
                      "RETAINER-3500",
                      "Complete bespoke operating system architecture, AI agents, and on-site production",
                      "https://www.paypal.com/webapps/billing/plans/sub/YOUR_3500_SUB_LINK"
                    )}
                    className="w-full py-3 bg-white/10 hover:bg-[#FF5500] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Subscribe ($3,500/mo)
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: LIVE EVENT PASSES */}
            {activeTab === 'event-passes' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#00FF9D] uppercase tracking-widest">ROLLOVER INCLUDED</span>
                    <h3 className="text-xl font-bold text-white uppercase mt-1 mb-2">Arena Fan Pass</h3>
                    <div className="text-3xl font-mono font-bold text-white mb-6">$25 <span className="text-xs text-gray-400">/ mo</span></div>
                    <ul className="space-y-3 text-xs text-gray-300 font-sans mb-8">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00FF9D]" /> 1 GA Ticket to monthly live battle</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00FF9D]" /> 1 Live mobile voting ballot per set</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00FF9D]" /> Miss an event? Ticket rolls over!</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleOpenCheckout(
                      "Arena Fan Pass (Monthly Rollover)",
                      25.00,
                      "PASS-25",
                      "1 GA Ticket per monthly event, voting ballot, with full unused ticket rollover",
                      "https://www.paypal.com/webapps/billing/plans/sub/YOUR_25_SUB_LINK"
                    )}
                    className="w-full py-3 bg-white/10 hover:bg-[#FF5500] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Join Fan Pass ($25/mo)
                  </button>
                </div>

                <div className="bg-[#0B0F17]/80 backdrop-blur-md border-2 border-[#00D4FF] p-8 flex flex-col justify-between shadow-xl shadow-[#00D4FF]/10">
                  <div>
                    <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-widest">HYPE MULTIPLIER</span>
                    <h3 className="text-xl font-bold text-white uppercase mt-1 mb-2">Power Pass</h3>
                    <div className="text-3xl font-mono font-bold text-white mb-6">$50 <span className="text-xs text-gray-400">/ mo</span></div>
                    <ul className="space-y-3 text-xs text-gray-300 font-sans mb-8">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyber-cyan" /> 1 Priority Entry Ticket (Rollover included)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyber-cyan" /> 25x Power Hype Vote Pack per match</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyber-cyan" /> WebAR digital camera filter access</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleOpenCheckout(
                      "Power Pass (Trendsetter)",
                      50.00,
                      "PASS-50",
                      "Priority entry, 25x vote multiplier, drink token, and WebAR filter",
                      "https://www.paypal.com/webapps/billing/plans/sub/YOUR_50_SUB_LINK"
                    )}
                    className="w-full py-3.5 bg-cyber-cyan hover:bg-[#00b4d8] text-black font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Join Power Pass ($50/mo)
                  </button>
                </div>

                <div className="bg-[#0B0F17]/80 backdrop-blur-md border border-[#FF5500] p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-widest">BACKSTAGE + AR MERCH</span>
                    <h3 className="text-xl font-bold text-white uppercase mt-1 mb-2">Black Card VIP</h3>
                    <div className="text-3xl font-mono font-bold text-white mb-6">$150 <span className="text-xs text-gray-400">/ mo</span></div>
                    <ul className="space-y-3 text-xs text-gray-300 font-sans mb-8">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> 1 VIP Front-Stage Pass / Table Access</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> 50x Mega Vote Boost per match</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Phygital AR Garment (3D animated wings)</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleOpenCheckout(
                      "Black Card VIP Pass",
                      150.00,
                      "PASS-150",
                      "VIP table access, 50x votes, and physical AR garment shipped to member",
                      "https://www.paypal.com/webapps/billing/plans/sub/YOUR_150_SUB_LINK"
                    )}
                    className="w-full py-3 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Join Black Card ($150/mo)
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* VIDEO PREVIEW MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#07090E] border border-[#FF5500]/40 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0B0F17]">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{activeVideo.title}</h3>
                <p className="text-[11px] text-[#00D4FF] font-mono">{activeVideo.category}</p>
              </div>
              <button 
                onClick={() => setActiveVideo(null)}
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <img 
                src={activeVideo.thumbnail} 
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FF5500] text-white flex items-center justify-center shadow-lg shadow-[#FF5500]/50 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div>
                  <p className="text-white font-bold uppercase tracking-wider text-base">{activeVideo.title}</p>
                  <p className="text-gray-400 text-xs font-sans max-w-md mt-1">
                    Direct media playback connected to 9LMNTS Studio Video Assets.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#0B0F17] flex justify-between items-center text-xs">
              <span className="text-gray-400 font-sans">{activeVideo.subtitle}</span>
              <button 
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 bg-[#FF5500] text-white font-bold uppercase tracking-wider rounded text-[10px]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL WIRED WITH PAYPAL E-COMMERCE & DEMO SIMULATION */}
      <GateOSCheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        invoiceDetails={selectedInvoice}
        onSimulateSuccess={() => {
          console.log("Demo purchase simulated successfully!");
        }}
      />
    </div>
  );
}
