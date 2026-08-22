import { useState } from "react";
import { Check, ArrowRight, Zap, Shield, Users, Code, Globe, FileText, Bot, Clock } from "lucide-react";
import { SEO } from "./SEO";
import { motion } from "motion/react";

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [activeTab, setActiveTab] = useState<"studio" | "os">("studio");

  const studioServices = [
    {
      name: "One-Time Service",
      price: "$499",
      period: "one-time",
      description: "Perfect for single projects",
      features: [
        "Single project delivery",
        "Basic branding elements",
        "Web/app design (single page)",
        "1 revision round",
        "7-day support",
        "Project documentation",
      ],
      highlight: false,
    },
    {
      name: "Starter Retainer",
      price: "$999",
      period: "monthly",
      description: "Essential ongoing support",
      features: [
        "Branding kit (logo, colors, fonts)",
        "Basic web/app maintenance",
        "SEO optimization",
        "Email marketing setup",
        "Video editing (2 videos/month)",
        "Business plan template",
        "Standard contracts & agreements",
        "Email outreach templates",
        "Basic AI assistant setup",
        "Business hours support (9-5)",
      ],
      highlight: false,
    },
    {
      name: "Growth Retainer",
      price: "$2,499",
      period: "monthly",
      description: "Comprehensive growth package",
      features: [
        "Full branding kit package",
        "Web/app design & development",
        "Advanced SEO & marketing",
        "Video editing (5 videos/month)",
        "Custom business plan",
        "Legal documents (contracts, TOS, agreements)",
        "Email outreach writing",
        "Custom AI assistants (2)",
        "24/7 monitoring service",
        "Priority support",
        "Monthly strategy calls",
        "Performance analytics",
      ],
      highlight: true,
    },
    {
      name: "Enterprise Retainer",
      price: "$4,999",
      period: "monthly",
      description: "Full-service partnership",
      features: [
        "Everything in Growth Retainer",
        "Unlimited web/app development",
        "Advanced marketing campaigns",
        "Unlimited video editing",
        "Custom AI assistants (5)",
        "Dedicated account manager",
        "24/7 emergency support",
        "White-label solutions",
        "Custom integrations",
        "Quarterly strategy reviews",
        "Team training sessions",
        "SLA guarantees",
      ],
      highlight: false,
    },
  ];

  const osTiers = [
    {
      name: "Free Tier",
      price: "$0",
      period: "forever",
      profitSplit: "70/30",
      description: "Start building your OS",
      features: [
        "Basic OS platform access",
        "Standard templates",
        "Community support",
        "70/30 profit split",
        "Basic analytics",
        "Email support",
      ],
      highlight: false,
    },
    {
      name: "Starter OS",
      price: "$499",
      period: "one-time",
      profitSplit: "20%",
      description: "Launch your custom OS",
      features: [
        "Custom OS branding",
        "Advanced templates",
        "Priority support",
        "20% profit split",
        "Advanced analytics",
        "Custom integrations",
        "9LMNTS Studio services included",
        "Setup assistance",
      ],
      highlight: false,
    },
    {
      name: "Pro OS",
      price: "$1,499",
      period: "one-time",
      profitSplit: "15%",
      description: "Professional OS solution",
      features: [
        "Everything in Starter",
        "White-label option",
        "Dedicated support",
        "15% profit split",
        "Real-time analytics",
        "API access",
        "Custom features",
        "Training sessions",
        "Marketing materials",
      ],
      highlight: true,
    },
    {
      name: "Enterprise OS",
      price: "$4,999",
      period: "one-time",
      profitSplit: "5%",
      description: "Full enterprise solution",
      features: [
        "Everything in Pro",
        "Source code access",
        "24/7 dedicated support",
        "5% profit split",
        "Custom development",
        "Unlimited users",
        "SLA guarantees",
        "On-site training",
        "Custom integrations",
        "Revenue sharing options",
      ],
      highlight: false,
    },
  ];

  const comparisonFeatures = [
    { feature: "Branding Kit", studio: ["Basic", "Full", "Full", "Full"], os: ["-", "Custom", "White-label", "White-label"] },
    { feature: "Web/App Development", studio: ["Single", "Basic", "Full", "Unlimited"], os: ["-", "Templates", "Custom", "Custom"] },
    { feature: "SEO & Marketing", studio: ["-", "Basic", "Advanced", "Advanced"], os: ["-", "-", "-", "-"] },
    { feature: "Video Editing", studio: ["-", "2/mo", "5/mo", "Unlimited"], os: ["-", "-", "-", "-"] },
    { feature: "Business Documents", studio: ["-", "Templates", "Custom", "Custom"], os: ["-", "-", "-", "-"] },
    { feature: "AI Assistants", studio: ["-", "1 Basic", "2 Custom", "5 Custom"], os: ["-", "-", "-", "-"] },
    { feature: "Support Level", studio: ["7-day", "Business Hours", "24/7", "24/7 Priority"], os: ["Community", "Email", "Priority", "Dedicated"] },
    { feature: "Profit Split", studio: ["-", "-", "-", "-"], os: ["70/30", "20%", "15%", "5%"] },
    { feature: "Analytics", studio: ["-", "-", "Advanced", "Advanced"], os: ["Basic", "Advanced", "Real-time", "Real-time"] },
    { feature: "Custom Integrations", studio: ["-", "-", "-", "Unlimited"], os: ["-", "Basic", "Custom", "Custom"] },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 font-['Orbitron'] text-foreground">
      <SEO 
        title="Pricing | 9LMNTS Studio" 
        description="Transparent pricing for 9LMNTS Studio creative services and 9LMNTS OS Series. One-time services from $499, retainers from $999/month, and OS tiers with profit sharing." 
      />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pricing
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your path. Build with 9LMNTS Studio services or launch your own OS with the 9LMNTS OS Series.
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("studio")}
              className={`px-6 py-3 rounded-none text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === "studio"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              Studio Services
            </button>
            <button
              onClick={() => setActiveTab("os")}
              className={`px-6 py-3 rounded-none text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === "os"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              OS Series
            </button>
          </div>
        </div>
      </section>

      {/* Studio Services Pricing */}
      {activeTab === "studio" && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studioServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative p-6 rounded-none border ${
                    service.highlight
                      ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(255,69,0,0.2)]"
                      : "border-primary/20 bg-card"
                  }`}
                >
                  {service.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs font-black uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-black uppercase tracking-wider mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black">{service.price}</span>
                      <span className="text-sm text-muted-foreground">/{service.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onNavigate("login")}
                    className={`w-full py-3 rounded-none text-sm font-bold uppercase tracking-wider transition-all ${
                      service.highlight
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-primary text-primary hover:bg-primary/10"
                    }`}
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OS Series Pricing */}
      {activeTab === "os" && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-4">
                9LMNTS OS Series
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Launch your own event management platform. Choose your tier and keep more of your profits as you grow.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {osTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative p-6 rounded-none border ${
                    tier.highlight
                      ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(255,69,0,0.2)]"
                      : "border-primary/20 bg-card"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs font-black uppercase tracking-wider">
                      Best Value
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-black uppercase tracking-wider mb-2">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-black">{tier.price}</span>
                      <span className="text-sm text-muted-foreground">/{tier.period}</span>
                    </div>
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
                      {tier.profitSplit} Profit Split
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onNavigate("login")}
                    className={`w-full py-3 rounded-none text-sm font-bold uppercase tracking-wider transition-all ${
                      tier.highlight
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-primary text-primary hover:bg-primary/10"
                    }`}
                  >
                    Launch OS
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-4">
              Full Comparison
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare all features across Studio Services and OS Series tiers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left p-4 font-bold uppercase tracking-wider text-sm">Feature</th>
                  <th className="text-center p-4 font-bold uppercase tracking-wider text-sm">One-Time</th>
                  <th className="text-center p-4 font-bold uppercase tracking-wider text-sm">Starter</th>
                  <th className="text-center p-4 font-bold uppercase tracking-wider text-sm">Growth</th>
                  <th className="text-center p-4 font-bold uppercase tracking-wider text-sm">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr key={row.feature} className={`border-b border-primary/10 ${index % 2 === 0 ? "bg-background/30" : ""}`}>
                    <td className="p-4 font-bold text-sm">{row.feature}</td>
                    {row.studio.map((value, i) => (
                      <td key={i} className="p-4 text-center text-sm text-muted-foreground">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us to discuss your needs and find the perfect plan for your business.
            </p>
            <button
              onClick={() => onNavigate("login")}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-none text-sm font-black uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-[0_0_30px_rgba(255,69,0,0.3)]"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
