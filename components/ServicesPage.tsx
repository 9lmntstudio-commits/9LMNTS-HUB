import { useRef, useState, useEffect } from "react";
import {
  Mic2,
  Disc3,
  Paintbrush,
  Users,
  Radio,
  BookOpen,
  Lightbulb,
  Code,
  Globe,
  Check,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Zap,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SEO } from "./SEO";
import {
  publicAnonKey,
  projectId,
} from "../utils/supabase/info";

const N8N_WEBHOOK_URL =
  "https://ixlmnts.app.n8n.cloud/webhook/9lmnts-leads";
const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-662c70dc`;

interface ServicesPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

const NINE_PILLARS = [
  {
    id: "ai-brand-voice",
    element: "MCing Element",
    service: "AI Brand Voice & Content Generation",
    icon: Mic2,
    price: 2500,
    priceLabel: "From $2,500",
    description:
      "Custom GPT trained on your brand voice — automated content, social campaigns, email copy, and brand consistency at scale.",
    features: [
      "Custom GPT brand voice model",
      "Automated social media content",
      "Email campaign automation",
      "Brand voice consistency audit",
      "Performance analytics dashboard",
    ],
    paypalLink: "https://PayPal.Me/9LMNTSSTUDIO/2500",
    image: "https://images.unsplash.com/photo-1753410642481-9306b48b45de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwYWJzdHJhY3QlMjAzZCUyMGJsYWNrfGVufDF8fHx8MTc3Nzk2NjczOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "ai-ux-flow",
    element: "DJing Element",
    service: "AI User Experience Flow",
    icon: Disc3,
    price: 3000,
    priceLabel: "From $3,000",
    description:
      "AI-powered UX optimization, personalization engines, and conversion flows that remix your digital experience for maximum impact.",
    features: [
      "AI-powered UX audit & mapping",
      "Personalization engine setup",
      "Conversion funnel optimization",
      "A/B testing automation",
      "User behaviour analytics",
    ],
    paypalLink: "https://PayPal.Me/9LMNTSSTUDIO/3000",
    image: "https://images.unsplash.com/photo-1718910259504-906abd8dc1ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5JTIwbmlnaHQlMjBkYXJrfGVufDF8fHx8MTc3Nzk2NjczOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "ai-visual-design",
    element: "Graffiti Element",
    service: "AI Visual Design System",
    icon: Paintbrush,
    price: 2000,
    priceLabel: "From $2,000",
    description:
      "AI-generated logo, brand identity, and full visual design system — bold marks that leave a lasting impression on the digital landscape.",
    features: [
      "AI-generated logo variations",
      "Full brand identity system",
      "Colour palette & typography AI",
      "Social media design templates",
      "Brand guidelines document",
    ],
    paypalLink: "https://PayPal.Me/9LMNTSSTUDIO/2000",
    image: "https://images.unsplash.com/photo-1749581134865-6b8255950548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ2xvd2luZyUyMHNlcnZlciUyMG5lb258ZW58MXx8fHwxNzc3OTY2NzM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "ai-innovation",
    element: "Breaking Element",
    service: "AI Innovation & Disruption",
    icon: Users,
    price: 1500,
    priceLabel: "From $1,500",
    description:
      "AI trend prediction, competitive intelligence, and market disruption strategy — breaking conventional thinking with data-driven insights.",
    features: [
      "AI trend prediction reports",
      "Competitor intelligence automation",
      "Market disruption roadmap",
      "Innovation sprint facilitation",
      "Strategic growth playbook",
    ],
    paypalLink: "https://PayPal.Me/9LMNTSSTUDIO/1500",
    image: "https://images.unsplash.com/photo-1760931969401-9bd6ee902798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwbmVvbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3Nzc5NjY3Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "ai-interaction",
    element: "Beatboxing Element",
    service: "AI Interaction & Animation",
    icon: Radio,
    price: 2000,
    priceLabel: "From $2,000",
    description:
      "AI-powered micro-interactions, real-time animations, and dynamic interfaces that give your digital product its own rhythm and energy.",
    features: [
      "AI micro-interaction design",
      "Real-time animation system",
      "Dynamic UI components",
      "Motion design library",
      "Interactive prototype delivery",
    ],
    paypalLink: "https://PayPal.Me/9LMNTSSTUDIO/2000",
    image: "https://images.unsplash.com/photo-1742477012583-804ba592b2c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW90aGVyYm9hcmQlMjBvcmFuZ2UlMjBnbG93fGVufDF8fHx8MTc3Nzk2Njc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "ai-content-learning",
    element: "Knowledge Element",
    service: "AI Content & Learning Systems",
    icon: BookOpen,
    price: 1000,
    priceLabel: "From $1,000",
    description:
      "AI-powered content curation, LMS integration, and personalized learning paths that position you as the authority in your space.",
    features: [
      "AI content curation engine",
      "LMS platform integration",
      "Personalized learning paths",
      "Automated knowledge base",
      "Content repurposing system",
    ],
    paypalLink: "https://PayPal.Me/9LMNTSSTUDIO/1000",
    image: "https://images.unsplash.com/photo-1612967690587-d741c8d7825d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGFzZXIlMjBncmlkJTIwZGFya3xlbnwxfHx8fDE3Nzc5NjY3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "ai-trend-forecasting",
    element: "Fashion Element",
    service: "AI Trend Forecasting",
    icon: Lightbulb,
    price: 2500,
    priceLabel: "From $2,500",
    description:
      "Real-time trend prediction, style adaptation, and market intelligence dashboards — keeping your brand ahead of every curve.",
    features: [
      "Real-time trend monitoring AI",
      "Style adaptation reports",
      "Market intelligence dashboard",
      "Consumer behaviour forecasting",
      "Trend-to-campaign pipeline",
    ],
    paypalLink: "https://PayPal.Me/9LMNTSSTUDIO/2500",
    image: "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlciUyMHRlY2glMjBhYnN0cmFjdCUyMG5lb258ZW58MXx8fHwxNzc3OTY2NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "ai-business-automation",
    element: "Entrepreneurship Element",
    service: "AI Business Automation",
    icon: Code,
    price: 3000,
    priceLabel: "From $3,000",
    description:
      "Full workflow automation, CRM integration, lead qualification, and revenue operations — the AI engine that runs your business.",
    features: [
      "End-to-end workflow automation",
      "AI lead qualification system",
      "CRM & tool integrations (n8n)",
      "Revenue operations dashboard",
      "Performance monitoring & alerts",
    ],
    paypalLink: "https://PayPal.Me/9LMNTSSTUDIO/3000",
    image: "https://images.unsplash.com/photo-1764347295958-6a729b1fdf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHQlMjB0cmFpbHMlMjBkYXJrfGVufDF8fHx8MTc3Nzk2Njc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "ai-multilingual",
    element: "Language Element",
    service: "AI Multilingual Communication",
    icon: Globe,
    price: 3500,
    priceLabel: "From $3,500",
    description:
      "AI translation, cultural adaptation, and global market entry systems — your brand speaking every language with authentic fluency.",
    features: [
      "AI translation & localization",
      "Cultural adaptation consulting",
      "Multi-language content system",
      "Global market entry strategy",
      "Multilingual chatbot deployment",
    ],
    paypalLink: "https://PayPal.Me/9LMNTSSTUDIO/3500",
    image: "https://images.unsplash.com/photo-1771873679764-4e5503b69040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbmVvbiUyMGFic3RyYWN0JTIwZ3JpZHxlbnwxfHx8fDE3Nzc5NjY3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function ServicesPage({
  onNavigate,
}: ServicesPageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [expandedCard, setExpandedCard] = useState<
    string | null
  >(null);

  // Diagnostic logging on mount
  useEffect(() => {
    console.log("📧 Email Configuration (Supabase Edge Function):", {
      serverUrl: SERVER_URL,
      currentDomain: window.location.hostname,
      currentUrl: window.location.href,
    });
    console.log(
      "ℹ️ Email is sent via Supabase Edge Function using Resend API\n" +
        "If emails fail:\n" +
        "1. Check Supabase Edge Function logs\n" +
        "2. Ensure RESEND_API_KEY is set in environment variables\n" +
        "3. Verify your domain is verified in Resend dashboard",
    );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    let emailOk = false;
    setEmailErrorMsg("");

    // Build email message
    const emailMessage = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW SERVICE INQUIRY — 9LMNTS STUDIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CONTACT INFORMATION
  Name:    ${formData.name}
  Email:   ${formData.email}
  Phone:   ${formData.phone || "Not provided"}

🎯 SERVICE INTEREST
  Service: ${formData.service}

💬 MESSAGE
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source: 9lmnts.com/services
Timestamp: ${new Date().toLocaleString()}
    `.trim();

    // Send email via Supabase Edge Function
    try {
      const emailResponse = await fetch(`${SERVER_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          to: "9lmntstudio@gmail.com",
          subject: `Service Inquiry - ${formData.service || "General"}`,
          message: emailMessage,
          replyTo: formData.email,
        }),
      });

      const emailResult = await emailResponse.json();

      if (emailResult.success) {
        emailOk = true;
        console.log("✅ Email sent successfully via Supabase Edge Function");
      } else {
        throw new Error(emailResult.error || "Email sending failed");
      }
    } catch (err: any) {
      console.error("❌ Email sending error:", err);
      let errorDetail = err.message || "Failed to send email notification";

      // Check if it's a configuration issue
      if (errorDetail.includes("not configured")) {
        errorDetail += "\n\nTO FIX:\n1. Go to your Supabase dashboard\n2. Navigate to Edge Functions → Environment Variables\n3. Add RESEND_API_KEY with your Resend API key\n4. Get free API key at https://resend.com/signup";
      }

      setEmailErrorMsg(errorDetail);
    }

    // n8n webhook (non-blocking, no-cors mode)
    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors", // Bypass CORS restrictions
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        source: "services-page",
        timestamp: new Date().toISOString(),
      }),
    })
      .then(() => console.log("🚀 n8n webhook sent successfully"))
      .catch((e) => console.warn("⚠️ n8n webhook error:", e));

    // KV store (non-blocking)
    fetch(`${SERVER_URL}/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        ...formData,
        source: "services-page",
      }),
    }).catch((e) => console.warn("KV error:", e));

    setFormStatus(emailOk ? "success" : "error");
    if (emailOk) {
      formRef.current?.reset();
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }
    setTimeout(() => setFormStatus("idle"), 6000);
  };

  return (
    <div className="min-h-screen bg-background pt-16 font-['Orbitron'] text-foreground">
      <SEO 
        title="Services & 9 Pillars | 9LMNTS Studio" 
        description="Discover our 9 Pillars of creation: 7-Day Agentic Sprints, Brand Identity, Web Design, and more. Transform your brand with cyber aesthetic digital solutions." 
      />
      {/* ── Background grid ──────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-primary) 1px,transparent 1px),linear-gradient(90deg,var(--color-primary) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded-full text-primary text-xs tracking-widest uppercase mb-6 bg-primary/5">
            <Zap size={11} /> AI-Powered Services
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-foreground leading-tight mb-6 font-bold">
            <span className="font-['Orbitron']">
              The Nine Pillars of
            </span>
            <br />
            <span className="font-['Mrs_Saint_Delafield'] text-primary text-6xl sm:text-7xl lg:text-9xl capitalize ml-[-15px] -rotate-3 inline-block">
              AI Dominance
            </span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
            Each element of Hip-Hop culture reimagined as a
            cutting-edge AI service. Nine disciplines. One
            studio. Infinite transformation.
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { val: "9", label: "AI Services" },
              { val: "4 Wks", label: "Max Delivery" },
              { val: "24hr", label: "Response Time" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-card border border-primary/15 rounded-none py-4"
              >
                <p className="text-primary text-2xl font-bold font-['Orbitron']">
                  {s.val}
                </p>
                <p className="text-muted-foreground text-xs mt-1 uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 PILLARS GRID ────────────────────────────────────────── */}
      <section
        id="services"
        className="py-16 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NINE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isExpanded = expandedCard === pillar.id;
              return (
                <div
                  key={pillar.id}
                  className="group bg-card border border-primary/15 hover:border-primary/50 rounded-none overflow-hidden transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={pillar.image}
                      alt={pillar.element}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    {/* Pillar number */}
                    <div className="absolute top-3 left-3 w-8 h-8 bg-background/80 border border-primary/30 rounded-none flex items-center justify-center">
                      <span className="text-primary text-xs font-mono font-bold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {/* Icon */}
                    <div className="absolute top-3 right-3 w-10 h-10 bg-primary rounded-none flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon
                        size={20}
                        className="text-primary-foreground"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-primary text-[10px] font-semibold uppercase tracking-widest mb-1">
                      {pillar.element}
                    </p>
                    <h3 className="text-foreground text-lg font-bold mb-2 leading-snug">
                      {pillar.service}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-sans">
                      {pillar.description}
                    </p>

                    {/* Features (toggleable) */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedCard(
                          isExpanded ? null : pillar.id,
                        )
                      }
                      className="flex items-center gap-1.5 text-primary/70 text-xs hover:text-primary transition-colors mb-3 uppercase tracking-widest"
                    >
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                      {isExpanded
                        ? "Hide features"
                        : "View features"}
                    </button>

                    {isExpanded && (
                      <ul className="space-y-1.5 mb-4 font-sans">
                        {pillar.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-muted-foreground text-xs"
                          >
                            <Check
                              size={12}
                              className="text-primary flex-shrink-0 mt-0.5"
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Price + CTAs */}
                    <div className="mt-auto pt-4 border-t border-primary/10">
                      <p className="text-primary text-xl font-bold mb-3">
                        {pillar.priceLabel}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            onNavigate(
                              "start-project",
                              pillar.id,
                            )
                          }
                          className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-none text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 border border-primary"
                        >
                          Start Project <ArrowRight size={13} />
                        </button>
                        <a
                          href={pillar.paypalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2.5 border border-primary/30 text-primary rounded-none text-xs hover:border-primary hover:bg-primary/10 transition-all flex items-center gap-1 uppercase font-bold"
                          title="Pay via PayPal"
                        >
                          <ExternalLink size={12} /> Pay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7-DAY SPRINT FEATURE ─────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded-full text-primary text-xs tracking-widest uppercase mb-5 bg-primary/5">
                <Zap size={11} /> Fastest Track
              </div>
              <h2 className="text-3xl sm:text-4xl text-foreground mb-5 leading-tight font-bold">
                <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl sm:text-6xl capitalize ml-[-10px] -rotate-3 inline-block">
                  7-Day Agentic Sprint
                </span>
                <br />
                <span className="font-['Orbitron'] text-2xl uppercase tracking-wider">
                  AI-Powered MVPs & Automation
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed font-sans">
                Turn your business into an autonomous revenue
                machine in one week. We deploy custom AI agents,
                build rapid MVPs, and automate your
                highest-value workflows using n8n, CrewAI, and
                Supabase.
              </p>
              <ul className="space-y-3 mb-8 font-sans">
                {[
                  "AI Digital Twins for customer service & FAQ automation",
                  "WhatsApp/SMS lead qualification bots (30-second response)",
                  "MVP development with Lovable + Supabase",
                  "CrewAI workflow automation (LinkedIn scraping, email outreach)",
                  "Content factories (1 speech → 30 viral clips)",
                  "Vector search for intelligent product catalogs",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-muted-foreground text-sm"
                  >
                    <Check
                      size={14}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() =>
                    onNavigate("start-project", "7-day-sprint")
                  }
                  className="px-7 py-3.5 bg-primary text-primary-foreground font-bold rounded-none hover:bg-primary/90 transition-all text-sm uppercase border border-primary"
                >
                  Start Your Sprint
                </button>
                <p className="flex items-center text-primary font-bold text-lg">
                  From $1,500
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-none overflow-hidden border border-primary/20 bg-background">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760931969401-9bd6ee902798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMG5lb24lMjBhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc3Nzk2NjczOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="AI Automation"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-foreground mb-4">
              <span className="font-['Orbitron']">Our</span>{" "}
              <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">
                Process
              </span>
            </h2>
            <p className="text-muted-foreground text-lg font-sans">
              A systematic flow from concept to autonomous
              launch
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "Deep-dive into your business, goals, and AI opportunities",
              },
              {
                step: "02",
                title: "Design",
                desc: "Craft the system architecture and user experience",
              },
              {
                step: "03",
                title: "Deploy",
                desc: "Build, integrate, and launch with precision",
              },
              {
                step: "04",
                title: "Dominate",
                desc: "Automate, monitor, and scale your AI infrastructure",
              },
            ].map((phase, i) => (
              <div key={phase.step} className="relative group">
                <div className="text-6xl font-bold text-primary/10 mb-4 group-hover:text-primary/20 transition-colors">
                  {phase.step}
                </div>
                <h3 className="text-foreground text-xl mb-2 font-bold uppercase tracking-widest">
                  {phase.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  {phase.desc}
                </p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTOS DEMO ──────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-video rounded-none overflow-hidden border border-primary/20 bg-background">
                  {/* Placeholder for EventOS screenshot/preview */}
                  <div className="w-full h-full flex items-center justify-center text-primary/40 bg-black">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎫</div>
                      <p className="text-sm uppercase tracking-widest font-bold">Live Battle Events System</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded-full text-primary text-xs tracking-widest uppercase mb-5 bg-primary/5">
                <Zap size={11} /> Live Interactive Demo
              </div>
              <h2 className="text-3xl sm:text-4xl text-foreground mb-5 leading-tight font-bold">
                <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl sm:text-6xl capitalize ml-[-10px] -rotate-3 inline-block">
                  EventOS Demo
                </span>
                <br />
                <span className="font-['Orbitron'] text-2xl uppercase tracking-wider">
                  See Our Battle Event Platform in Action
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed font-sans">
                Experience a fully functional battle event management system with
                live ticketing, real-time battles, leaderboards, and interactive
                features. Built with Supabase, React, and our signature cyber aesthetic.
              </p>
              <ul className="space-y-3 mb-8 font-sans">
                {[
                  "Live ticket purchasing & QR code generation",
                  "Real-time battle voting & scoring system",
                  "Dynamic leaderboards & fighter profiles",
                  "Admin panel for event management",
                  "Mobile-responsive cyber design",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-muted-foreground text-sm"
                  >
                    <Check
                      size={14}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate("event-os-demo")}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-none hover:bg-primary/90 transition-all text-sm inline-flex items-center gap-2 border border-primary uppercase tracking-widest"
              >
                Launch EventOS Demo <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ──────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded-full text-primary text-xs tracking-widest uppercase mb-5 bg-primary/5">
              <Send size={11} /> Quick Inquiry
            </div>
            <h2 className="text-3xl sm:text-5xl text-foreground mb-4">
              <span className="font-['Orbitron']">
                Start Your
              </span>{" "}
              <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">
                AI Journey
              </span>
            </h2>
            <p className="text-muted-foreground text-lg font-sans">
              Fill out the form — we respond within 24 hours
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
            {/* Form */}
            <div className="bg-card border border-primary/15 rounded-none overflow-hidden">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="p-8">
                <form
                  ref={formRef}
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="svc-name"
                        className="block text-primary text-xs font-bold uppercase tracking-widest mb-2"
                      >
                        Full Name{" "}
                        <span className="text-primary">
                          *
                        </span>
                      </label>
                      <input
                        id="svc-name"
                        type="text"
                        name="user_name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="svc-email"
                        className="block text-primary text-xs font-bold uppercase tracking-widest mb-2"
                      >
                        Email Address{" "}
                        <span className="text-primary">
                          *
                        </span>
                      </label>
                      <input
                        id="svc-email"
                        type="email"
                        name="user_email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="svc-phone"
                        className="block text-primary text-xs font-bold uppercase tracking-widest mb-2"
                      >
                        Phone
                      </label>
                      <input
                        id="svc-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="svc-service"
                        className="block text-primary text-xs font-bold uppercase tracking-widest mb-2"
                      >
                        Service Interest{" "}
                        <span className="text-primary">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <select
                          id="svc-service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground text-sm appearance-none focus:border-primary focus:outline-none transition-all cursor-pointer font-sans"
                        >
                          <option value="">
                            Select a service
                          </option>
                          {NINE_PILLARS.map((p) => (
                            <option
                              key={p.id}
                              value={p.id}
                              className="bg-card"
                            >
                              {p.element} — {p.service} (
                              {p.priceLabel})
                            </option>
                          ))}
                          <option
                            value="7-day-sprint"
                            className="bg-card"
                          >
                            7-Day Agentic Sprint — From $1,500
                          </option>
                          <option
                            value="custom"
                            className="bg-card"
                          >
                            Custom Solution
                          </option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="svc-message"
                      className="block text-primary text-xs font-bold uppercase tracking-widest mb-2"
                    >
                      Project Details{" "}
                      <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="svc-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project goals, timeline, and any specific requirements…"
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm resize-none focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className={`w-full py-4 rounded-none font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 border border-primary ${
                      formStatus === "sending"
                        ? "bg-primary/40 text-primary-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_28px_rgba(255,69,0,0.4)] hover:-translate-y-0.5"
                    }`}
                  >
                    {formStatus === "sending" ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />{" "}
                        Transmitting…
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Start AI
                        Transformation
                      </>
                    )}
                  </button>

                  {formStatus === "success" && (
                    <div className="flex items-start gap-3 p-4 rounded-none bg-primary/10 border border-primary/40 font-sans">
                      <CheckCircle
                        size={18}
                        className="text-primary flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-primary font-bold text-sm">
                          Message transmitted!
                        </p>
                        <p className="text-muted-foreground text-xs mt-0.5">
                          We'll be in touch within 24 hours.
                        </p>
                      </div>
                    </div>
                  )}
                  {formStatus === "error" && (
                    <div className="flex items-start gap-3 p-4 rounded-none bg-destructive/10 border border-destructive/30 font-sans">
                      <AlertCircle
                        size={18}
                        className="text-destructive flex-shrink-0 mt-0.5"
                      />
                      <div className="flex-1">
                        <p className="text-destructive font-bold text-sm mb-2">
                          Email Notification Failed
                        </p>
                        {emailErrorMsg && (
                          <p className="text-destructive/80 text-xs leading-relaxed whitespace-pre-wrap break-words mb-3">
                            {emailErrorMsg}
                          </p>
                        )}
                        <p className="text-muted-foreground text-xs pt-3 border-t border-border">
                          ℹ️ Inquiry saved. We'll respond within 24 hours, or email us at{" "}
                          <a
                            href="mailto:9lmntstudio@gmail.com"
                            className="underline hover:text-primary transition-colors"
                          >
                            9lmntstudio@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact info panel */}
            <div className="space-y-5">
              <div className="bg-card border border-primary/15 rounded-none p-6">
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-5">
                  Reach Us Directly
                </p>
                <div className="space-y-5 font-sans">
                  {[
                    {
                      icon: "📧",
                      label: "Email",
                      val: "9lmntstudio@gmail.com",
                      href: "mailto:9lmntstudio@gmail.com",
                    },
                    {
                      icon: "📞",
                      label: "Phone",
                      val: "(613) 400-9691",
                      href: "tel:+16134009691",
                    },
                    {
                      icon: "📷",
                      label: "Instagram",
                      val: "@9lmntstudio",
                      href: "https://instagram.com/9lmntstudio",
                    },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xl">{c.icon}</span>
                      <div>
                        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-0.5">
                          {c.label}
                        </p>
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground text-sm hover:text-primary transition-colors font-bold"
                        >
                          {c.val}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-none p-6">
                <Zap
                  size={20}
                  className="text-primary mb-3"
                />
                <h4 className="text-foreground font-bold uppercase tracking-widest text-sm mb-2">
                  Automation Starts Immediately
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Contact us today and we begin your AI-powered
                  transformation within 24 hours. All services
                  include setup, integration, and 30-day
                  support.
                </p>
              </div>

              <div className="bg-card border border-primary/15 rounded-none p-6">
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                  Why 9LMNTS
                </p>
                <div className="space-y-3 font-sans">
                  {[
                    "24-Hour Response Guarantee",
                    "Free Discovery Call",
                    "Max 4-Week Delivery",
                    "n8n + Supabase Native",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2"
                    >
                      <Check
                        size={13}
                        className="text-primary flex-shrink-0"
                      />
                      <span className="text-muted-foreground text-sm font-bold">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-foreground mb-6 font-bold leading-tight">
            <span className="font-['Orbitron'] uppercase tracking-tighter">
              Ready to Build Something
            </span>
            <br />
            <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl sm:text-6xl lg:text-8xl capitalize ml-[-15px] -rotate-6 inline-block">
              Legendary?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 font-sans">
            All nine elements. One studio. Unlimited potential.
          </p>
          <button
            onClick={() => onNavigate("start-project")}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-none font-bold hover:bg-primary/90 hover:shadow-[0_0_32px_rgba(255,69,0,0.4)] transition-all text-sm tracking-widest border border-primary uppercase"
          >
            Start Your Project <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}