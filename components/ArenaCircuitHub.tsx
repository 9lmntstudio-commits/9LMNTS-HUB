import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Trophy,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
  Radio,
  Music,
  Dribbble,
  Scissors,
  Briefcase,
  Mic2,
  Utensils,
  Laugh,
  Flame,
  CheckCircle,
} from "lucide-react";
import { MasterDrawerShell } from "./MasterDrawerShell";

interface ArenaCircuitHubProps {
  onNavigate: (page: string, plan?: string) => void;
}

export const ArenaCircuitHub: React.FC<ArenaCircuitHubProps> = ({ onNavigate }) => {
  const [selectedEventDrawer, setSelectedEventDrawer] = useState<string | null>(null);

  const lockedEvents = [
    {
      id: "sound-clash",
      number: "EVENT 1",
      title: "Sound Clash OS",
      subtitle: "Nightlife & DJ Championship (Halloween Edition)",
      date: "Saturday, October 31, 2026",
      time: "9:00 PM - 3:00 AM EDT",
      venue: "Bronson Centre Main Hall",
      address: "211 Bronson Ave, Ottawa, ON",
      format: "8-DJ sudden-death elimination battle • Real-time decibel meter • In-app crowd voting wallet",
      color: "#FF5500",
      accentBorder: "border-[#FF5500]",
      glowColor: "rgba(255,85,0,0.3)",
      badge: "HALLOWEEN ARENA",
      netTarget: "$20,000 CAD Net Target",
      demoAction: () => onNavigate("ClashOS"),
      tickets: [
        { tier: "General Admission", price: "$35 CAD" },
        { tier: "VIP Balcony Pass", price: "$75 CAD" },
        { tier: "Backstage DJ Table (6 Passes)", price: "$650 CAD" },
      ],
    },
    {
      id: "sports-os",
      number: "EVENT 2",
      title: "Sports OS / The League",
      subtitle: "Indoor 3v3 Basketball Arena",
      date: "Saturday, November 14, 2026",
      time: "1:00 PM - 6:00 PM EST",
      venue: "RA Centre (House of Sport)",
      address: "2451 Riverside Dr, Ottawa, ON",
      format: "8-Squad 3v3 tournament • Live shot clock telemetry • Digital Athlete Cards • Crowd MVP tip jar",
      color: "#00D2FF",
      accentBorder: "border-[#00D2FF]",
      glowColor: "rgba(0,210,255,0.3)",
      badge: "BASKETBALL ARENA",
      netTarget: "$18,300 CAD Net Target",
      demoAction: () => onNavigate("event-os-demo"),
      tickets: [
        { tier: "Courtside Bleacher Pass", price: "$25 CAD" },
        { tier: "VIP Floor Seat", price: "$60 CAD" },
        { tier: "Team Contender Entry (4 Players)", price: "$250 CAD" },
      ],
    },
    {
      id: "runway-os",
      number: "EVENT 3",
      title: "Fashion OS / Runway OS",
      subtitle: "Live Runway Battle & Fashion Duel",
      date: "Friday, November 27, 2026",
      time: "7:30 PM - 11:00 PM EST",
      venue: "Horticulture Building (Lansdowne Park)",
      address: "1525 Princess Patricia Way, Ottawa, ON",
      format: "8-Designer duel • 60-ft runway • Model Walk Hype Meter • 85vh Lookbook Drawer • WebAR 3D previews",
      color: "#D946EF",
      accentBorder: "border-[#D946EF]",
      glowColor: "rgba(217,70,239,0.3)",
      badge: "RUNWAY ARENA",
      netTarget: "$30,250 CAD Net Target",
      demoAction: () => onNavigate("event-os-demo"),
      tickets: [
        { tier: "Runway General Standing", price: "$45 CAD" },
        { tier: "Front-Row Reserved Seat", price: "$120 CAD" },
        { tier: "Designer Sponsor Table (6 VIPs)", price: "$1,200 CAD" },
      ],
    },
    {
      id: "corporate-clash",
      number: "EVENT 4",
      title: "Corporate Clash / Pitch Battle OS",
      subtitle: "Enterprise & Real Estate Demo Day",
      date: "Thursday, December 17, 2026",
      time: "5:30 PM - 10:00 PM EST",
      venue: "Bayview Yards (RBC Innovation Hall)",
      address: "7 Bayview Station Rd, Ottawa, ON",
      format: "8-Startup battle • PropTech & AI tracks • Live capital syndicate soft pledges • Executive deal mixer",
      color: "#FFB800",
      accentBorder: "border-[#FFB800]",
      glowColor: "rgba(255,184,0,0.3)",
      badge: "ENTERPRISE ARENA",
      netTarget: "$64,950 CAD Net Target",
      demoAction: () => onNavigate("event-os-demo"),
      tickets: [
        { tier: "Founder & Tech Pro Pass", price: "$95 CAD" },
        { tier: "Executive / Investor VIP Pass", price: "$250 CAD" },
        { tier: "Corporate Delegation Table (8 Seats)", price: "$2,000 CAD" },
      ],
    },
  ];

  const nineOSVerticals = [
    {
      id: "sound-clash",
      name: "Sound Clash OS",
      vertical: "Nightlife & Music",
      desc: "8-DJ bracket, live decibel meter, waveform telemetries, crowd voting wallet.",
      icon: Music,
      color: "#FF5500",
      targetPage: "ClashOS",
    },
    {
      id: "artist-os",
      name: "Artist OS",
      vertical: "Creators & Musicians",
      desc: "24/7 Creator Hub, uncompressed WAV stems vault, direct fan tipping, WebAR merch.",
      icon: Flame,
      color: "#00D2FF",
      targetPage: "event-os-demo",
    },
    {
      id: "sports-os",
      name: "Sports OS",
      vertical: "Athletics & 3v3",
      desc: "3v3 live court scoreboard, shot clock telemetry, athlete trading cards.",
      icon: Dribbble,
      color: "#00FF88",
      targetPage: "event-os-demo",
    },
    {
      id: "runway-os",
      name: "Runway OS",
      vertical: "Fashion & Streetwear",
      desc: "Instant runway garment drops, lookbook drawer, 3D WebAR garment preview.",
      icon: Scissors,
      color: "#D946EF",
      targetPage: "event-os-demo",
    },
    {
      id: "corporate-clash",
      name: "Corporate Clash OS",
      vertical: "PropTech & Enterprise AI",
      desc: "8-Startup pitch battle, OSC Rule 45-501 soft pledges, sponsor marquee.",
      icon: Briefcase,
      color: "#FFB800",
      targetPage: "event-os-demo",
    },
    {
      id: "bars-os",
      name: "Bars OS",
      vertical: "Battle Rap & Spoken Word",
      desc: "Cypher round timer, bar-by-bar crowd rating, live rhyme scheme telemetry.",
      icon: Mic2,
      color: "#FF4500",
      targetPage: "event-os-demo",
    },
    {
      id: "feast-os",
      name: "Feast OS",
      vertical: "Culinary & Catering",
      desc: "Tasting course selector, chef duel voting, direct catering calculator.",
      icon: Utensils,
      color: "#F59E0B",
      targetPage: "event-os-demo",
    },
    {
      id: "roast-os",
      name: "Roast OS",
      vertical: "Comedy & Standup",
      desc: "Laugh-o-meter reaction tracker, comedian lineup cards, instant tip jar.",
      icon: Laugh,
      color: "#EC4899",
      targetPage: "event-os-demo",
    },
    {
      id: "motion-os",
      name: "Motion OS",
      vertical: "Dance & Choreography",
      desc: "Crew battle brackets, routine sync music meters, audience hype voting.",
      icon: Radio,
      color: "#8B5CF6",
      targetPage: "event-os-demo",
    },
  ];

  const currentEvent = lockedEvents.find((e) => e.id === selectedEventDrawer);

  return (
    <div className="w-full space-y-16">
      {/* Circuit Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] text-xs font-mono font-bold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
          9LMNTS STUDIO OFFICIAL MASTER ROADMAP
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-['Syne',sans-serif] tracking-tight text-white">
          Q4 2026 ARENA CIRCUIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#00D2FF] to-[#D946EF]">& 9 OS VERTICALS</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400 font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed">
          Four signature arena competitions locked between now and New Year's Eve in Ottawa, establishing the operational benchmark before scaling into our 2027 Quarterly Circuit.
        </p>
      </div>

      {/* 4 Locked Q4 Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lockedEvents.map((evt) => (
          <div
            key={evt.id}
            className={`p-6 sm:p-8 rounded-3xl bg-[#0F1115]/90 border ${evt.accentBorder}/40 hover:${evt.accentBorder} transition-all duration-300 relative overflow-hidden group shadow-2xl flex flex-col justify-between`}
            style={{
              boxShadow: `0 10px 30px -10px ${evt.glowColor}`,
            }}
          >
            {/* Top Accent Pill & Number */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded-md border"
                  style={{
                    color: evt.color,
                    borderColor: `${evt.color}40`,
                    backgroundColor: `${evt.color}15`,
                  }}
                >
                  ● {evt.number}: {evt.badge}
                </span>
                <span className="text-[11px] font-mono text-gray-500">
                  {evt.netTarget}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-['Syne',sans-serif] text-white group-hover:text-gray-100 transition-colors">
                {evt.title}
              </h3>
              <p className="text-xs text-gray-400 font-mono mb-4">
                {evt.subtitle}
              </p>

              {/* Event Coordinates */}
              <div className="space-y-2 py-3 border-y border-white/5 text-xs font-['Plus_Jakarta_Sans',sans-serif] text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="font-semibold text-white">{evt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-[#00D2FF] font-medium">{evt.venue}</span>
                  <span className="text-gray-500 text-[11px]">({evt.address})</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                {evt.format}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedEventDrawer(evt.id)}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black transition-all flex items-center justify-center gap-2 shadow-lg hover:brightness-110"
                style={{ backgroundColor: evt.color }}
              >
                <Ticket className="w-4 h-4" />
                Get Tickets / Table
              </button>

              <button
                onClick={evt.demoAction}
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-colors flex items-center gap-1.5"
              >
                Launch OS Demo
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nine OS Verticals Showcase Grid */}
      <div className="space-y-8 pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-[#FF5500] font-bold">
              UNIVERSAL ARENA CHASSIS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Syne',sans-serif] text-white">
              The 9 OS Verticals
            </h3>
            <p className="text-xs text-gray-400 max-w-xl mt-1">
              One unified high-concurrency event OS adapted across 9 specialized cultural and corporate verticals.
            </p>
          </div>
          <button
            onClick={() => onNavigate("event-os-demo")}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/15 transition-all flex items-center gap-2"
          >
            Explore Interactive Verticals Hub
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nineOSVerticals.map((os) => {
            const Icon = os.icon;
            return (
              <div
                key={os.id}
                onClick={() => onNavigate(os.targetPage)}
                className="p-5 rounded-2xl bg-[#0F1115] border border-white/10 hover:border-white/25 transition-all cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${os.color}15`,
                      borderColor: `${os.color}30`,
                      color: os.color,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">
                    {os.vertical}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-base group-hover:text-[#FF5500] transition-colors">
                    {os.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {os.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1 text-[11px] font-mono text-[#00D2FF]">
                  <span>Launch Live UI</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Master Drawer for Event Ticket / Table Reservations */}
      {currentEvent && (
        <MasterDrawerShell
          isOpen={!!selectedEventDrawer}
          onClose={() => setSelectedEventDrawer(null)}
          title={`${currentEvent.title} Passes`}
          subtitle={`${currentEvent.date} • ${currentEvent.venue}`}
          badge={currentEvent.number}
          badgeColor={currentEvent.color}
          footer={
            <div className="space-y-2">
              <button
                onClick={() => {
                  alert(`Redirecting to secure PayPal Complete Payments checkout for ${currentEvent.title}...`);
                  setSelectedEventDrawer(null);
                }}
                className="w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider text-black transition-all flex items-center justify-center gap-2 shadow-2xl hover:brightness-110"
                style={{ backgroundColor: currentEvent.color }}
              >
                Continue to 1-Tap Checkout
              </button>
              <div className="flex items-center justify-center gap-3 text-[10px] text-gray-500 font-mono">
                <span>🔒 SECURE CHECKOUT</span>
                <span>•</span>
                <span>PAYPAL & APPLE PAY</span>
                <span>•</span>
                <span>INSTANT WALLET PASS</span>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <label className="block text-xs font-mono text-gray-400">
              AVAILABLE ADMISSION & HOSPITALITY TIERS:
            </label>
            <div className="space-y-3">
              {currentEvent.tickets.map((t, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0A0B10] border border-white/10 hover:border-white/30 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="space-y-1">
                    <h5 className="font-bold text-white text-sm">{t.tier}</h5>
                    <span className="text-[11px] text-gray-400">
                      Includes mobile app crowd voting & telemetry access
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold font-mono text-white block">
                      {t.price}
                    </span>
                    <span className="text-[10px] text-[#00FF88] font-mono">AVAILABLE</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 text-xs">
              <span className="text-gray-400 font-mono block">VENUE ADMISSION</span>
              <p className="text-gray-300">
                Doors open 1 hour prior to scheduled battle time. Venue ID & digital pass verified at entrance.
              </p>
            </div>
          </div>
        </MasterDrawerShell>
      )}
    </div>
  );
};
