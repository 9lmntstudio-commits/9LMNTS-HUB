import { Check, HelpCircle, Shield, Zap, Sparkles, CreditCard, ArrowRight, Layers, Flame } from 'lucide-react';
import { useState } from 'react';
import { GateOSCheckoutModal } from './GateOSCheckoutModal';
import { SEO } from './SEO';

interface PricingPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const handleOpenCheckout = (tier: any) => {
    setSelectedInvoice({
      id: `PAYPAL-${Math.floor(1000 + Math.random() * 9000)}`,
      title: tier.title || tier.name,
      amount: typeof tier.price === 'number' ? tier.price : parseFloat(String(tier.price).replace(/[^0-9.]/g, '')) || 1500,
      description: tier.pay_in_4 ? `Eligible for PayPal Pay in 4 (${tier.pay_in_4}). ${tier.subtitle || ''}` : (tier.subtitle || '9LMNTS Studio Official Tier')
    });
    setIsModalOpen(true);
  };

  const agencySprints = [
    {
      id: 'starter-sprint',
      title: 'Starter Sprint',
      price: '$1,500',
      numericPrice: 1500,
      currency: 'CAD',
      billing: 'One-time or Installments',
      pay_in_4: '4 payments of $375.00 CAD (0% Int)',
      popular: false,
      deliverables: [
        'Figma Design System & Brand Tokens',
        'Mobile-First Glassmorphic Dark UI',
        'Netlify/Vercel Instant Production Deployment',
        'ManyChat Social Lead Capture Funnel',
        '7-Day Turnkey Production Cycle',
      ],
    },
    {
      id: 'pro-custom-sprint',
      title: 'Pro Custom Sprint',
      price: '$2,500 – $3,500',
      numericPrice: 2500,
      currency: 'CAD',
      billing: 'One-time or Installments',
      pay_in_4: '4 payments of $625.00 CAD (0% Int)',
      popular: true,
      deliverables: [
        'Full Web App or Vertical Creator OS',
        'ManyChat DM Funnel + n8n Orchestration',
        'Supabase Database & Real-time Lead Sync',
        'WebAR Interactive 3D Asset Integration',
        '14-Day Priority Technical Support & Warranty',
      ],
    },
    {
      id: 'enterprise-scale',
      title: 'Enterprise Scale Build',
      price: '$5,000',
      numericPrice: 5000,
      currency: 'CAD',
      billing: 'One-time or Monthly Financing',
      pay_in_4: 'PayPal Monthly Installment Financing',
      popular: false,
      deliverables: [
        'Bespoke Multi-Tenant OS Engine',
        'Domain-Specific Autonomous AI Agents',
        'Complete 3D WebAR & Cyber Brand Identity',
        'Dedicated Production Architect & SLA',
        'Custom Smart Contracts & High-Throughput Rails',
      ],
    },
  ];

  const superAgentTiers = [
    {
      id: 'super-agent-companion',
      title: 'The Super Agent Companion',
      subtitle: 'Personal Life, Study & Creative OS',
      price: '$99',
      frequency: '/ month CAD',
      numericPrice: 99,
      type: 'Recurring PayPal Subscription',
      popular: false,
      color: '#00D4FF',
      deliverables: [
        'The Accountability Mirror (Word to Bond): daily goal tracking',
        'Personal Routine Architecture: morning habits, workouts & sleep',
        '120 Study & Skill Engine: curriculum breakdown & active recall',
        'Idea-to-Production Velocity: turn voice memos into deliverables',
        'Direct access via private WhatsApp, Telegram & Web HUD',
      ],
    },
    {
      id: 'super-agent-sovereign',
      title: 'Bespoke Sovereign Super Agent',
      subtitle: 'Founders, Executives & Pro Athletes',
      price: '$1,500',
      frequency: 'CAD',
      numericPrice: 1500,
      type: 'PayPal Pay in 4: 4x $375.00 CAD (0% Int)',
      popular: true,
      color: '#FF5500',
      deliverables: [
        'Private-Tenant Dedicated Vector Knowledge Base (Supabase pgvector)',
        'Custom Autonomous Multi-Agent Workflows (n8n Engine)',
        'Bespoke Prompt Bibles & Voice Synthesis Integration',
        '100% Sovereign Data Ownership & Custom Web/Mobile Interface',
        '30-Day Engineering Handoff & Priority SLA',
      ],
    },
  ];

  const monthlyRetainers = [
    {
      id: 'pro-retainer',
      title: 'Pro Retainer',
      price: '$1,500',
      frequency: '/ month CAD',
      numericPrice: 1500,
      type: 'PayPal Subscriptions',
      deliverables: [
        'Monthly UI/UX Enhancements & Design Sprints',
        'Platform & Dynamic Asset Maintenance',
        'Remote Live-Event Technical Support (1 event/mo)',
        'Continuous Performance Audits & Monitoring',
      ],
    },
    {
      id: 'premier-operations',
      title: 'Premier Operations Retainer',
      price: '$2,500 – $3,500',
      frequency: '/ month CAD',
      numericPrice: 2500,
      type: 'PayPal Subscriptions',
      popular: true,
      deliverables: [
        'Bi-Weekly Feature Sprints & Custom Components',
        'Dedicated On-Site Venue Operator (2 events/mo)',
        'Live Jumbotron Sync & Real-Time Arena Telemetry',
        'Priority Emergency SLA & Hotfix Dispatch',
      ],
    },
    {
      id: 'enterprise-custom-retainer',
      title: 'Enterprise Custom Retainer',
      price: '$5,000',
      frequency: '/ month CAD',
      numericPrice: 5000,
      type: 'PayPal Subscriptions',
      deliverables: [
        'Full Bespoke Studio Engineering & Architecture',
        'Dedicated On-Site Operator for All Client Events',
        'White-Label Architecture & Horizontal Scaling',
        '24/7 Dedicated Priority Technical SLA',
      ],
    },
  ];

  const osSeries = [
    {
      title: 'Free Performance Tier',
      fee: '$0 Upfront',
      split: '80% Creator / 20% Studio',
      note: 'PayPal E-Commerce Direct Split',
      features: ['Zero setup cost', 'Full Sound Clash or Artist OS engine', 'Instant activation'],
    },
    {
      title: 'Monthly OS Maintenance',
      fee: '$500 / month CAD',
      split: 'Monthly Subscription',
      note: 'Continuous feature updates & uptime guarantee',
      features: ['Security patches', 'Database backups', 'Uptime monitoring'],
    },
    {
      title: 'Pro OS Setup',
      fee: '$500 Setup',
      split: '90% Creator / 10% Studio',
      note: 'Includes $250/mo support',
      features: ['Custom branding', 'Domain integration', '90/10 revenue retention'],
    },
    {
      title: 'Elite OS Setup',
      fee: '$1,500 Setup',
      split: '95% Creator / 5% Studio',
      note: 'PayPal Pay in 4: 4x $375 CAD • $500/mo maint.',
      popular: true,
      features: ['Priority support', 'Pay in 4 eligible', '95% creator revenue share'],
    },
    {
      title: 'Enterprise Custom OS',
      fee: '$5,000 Setup',
      split: '100% Creator / 0% Studio',
      note: 'Full IP & code ownership • $500/mo maint.',
      features: ['100% revenue retention', 'Full source code handoff', 'Dedicated deployment'],
    },
  ];

  const inVenueGrid = [
    { box: 'Box 01', name: 'General Admission Cover & Ballot', price: '$20 CAD', payIn4: '4x $5.00 CAD', desc: 'Entry pass & 1 tournament ballot' },
    { box: 'Box 02', name: 'Micro-Tip & Feature Drink Token', price: '$10 CAD', payIn4: 'Direct checkout', desc: 'Direct Contender Appreciation' },
    { box: 'Box 03', name: 'Power Hype Pack (25x Votes + Screen Sync)', price: '$50 CAD', payIn4: '4x $12.50 CAD', desc: '25x Votes + Jumbotron screen takeover' },
    { box: 'Box 04', name: 'VIP Hospitality Table & Bottle Service', price: '$150 – $250 CAD', payIn4: '4x $37.50 CAD', desc: 'Dedicated booth, bottle service & judge voting' },
  ];

  const faqs = [
    {
      question: 'How does PayPal Pay Later (Pay in 4) work?',
      answer: 'PayPal Pay Later splits your sprint or VIP pass payment into 4 equal bi-weekly payments with 0% interest and no hidden fees. Eligible for Canadian and international buyers at checkout.',
    },
    {
      question: 'Are retainers recurring subscriptions?',
      answer: 'Yes, all monthly retainers ($1,500, $2,500-$3,500, and $5,000/mo) are billed recurringly via verified PayPal Subscriptions with transparent monthly invoicing.',
    },
    {
      question: 'What is the turnaround time for a Starter or Pro Sprint?',
      answer: 'Our sprints deliver production-ready assets and web applications within 7 to 14 business days, backed by our battle-tested modular architecture.',
    },
    {
      question: 'Do you offer on-site operators for live events outside Ottawa?',
      answer: 'Yes! Our Premier Operations ($2,500-$3,500/mo) and Enterprise Custom ($5,000/mo) retainers include dedicated on-site technical operators for Toronto, Montreal, Ottawa, and travel-scheduled tours.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-16 font-sans text-white">
      <SEO 
        title="Official Pricing Matrix & PayPal Payment Plans | 9LMNTS Studio" 
        description="Official pricing for 9LMNTS Studio agency sprints, monthly retainers, turnkey OS platforms, and live venue grids. Powered by PayPal E-Commerce Services with 0% interest Pay in 4." 
      />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF5500]/10 border border-[#FF5500]/30 rounded-full text-[#FF5500] text-xs font-mono tracking-widest uppercase mb-6">
            <Zap size={13} /> OFFICIAL STUDIO PRICING MATRIX // CAD
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 font-['Orbitron']">
            Production Sprints <span className="text-[#FF5500]">&amp; Retainers</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            High-velocity AI automation sprints, live tournament operating systems, and dedicated on-site venue production. 
            All transactions powered strictly by <span className="text-[#00D4FF] font-semibold">PayPal E-Commerce Services</span> with native 0% interest Pay Later financing.
          </p>
        </div>
      </section>

      {/* PayPal Trust & Features Banner */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#0070BA]/20 via-[#0A0F1A] to-[#050505] border border-[#0070BA]/40 rounded-2xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0070BA] flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,112,186,0.5)]">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-[#93C5FD] text-xs font-mono font-bold tracking-widest uppercase">Verified Infrastructure</p>
              <h3 className="text-white font-bold text-lg font-['Orbitron']">PayPal E-Commerce Services Rail</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'PayPal Complete Payments',
              'PayPal Pay Later (0% Pay in 4)',
              'PayPal Monthly Installments',
              'PayPal Subscriptions (Recurring)',
              'Smart Payment Buttons',
            ].map((feature, i) => (
              <span key={i} className="px-3 py-1 bg-[#0070BA]/20 border border-[#0070BA]/30 rounded-lg text-xs font-mono text-[#93C5FD]">
                ✓ {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 1. Creative Agency & AI Automation Sprints */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#080A0F] border-y border-[#222222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF5500] text-xs font-mono uppercase tracking-widest font-bold">CATEGORY 01</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1 font-['Orbitron']">
              Creative Agency &amp; AI Sprints
            </h2>
            <p className="text-gray-400 text-sm mt-2">One-time production builds with guaranteed turnkey delivery and PayPal Pay in 4</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {agencySprints.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl p-8 flex flex-col transition-all duration-300 relative ${
                  tier.popular
                    ? 'bg-[#101420] border-2 border-[#FF5500] shadow-[0_0_35px_rgba(255,85,0,0.25)] scale-105 z-10'
                    : 'bg-[#0F1118] border border-[#222222] hover:border-[#FF5500]/40'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5500] text-black text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_0_15px_rgba(255,85,0,0.6)]">
                    Most Popular Sprint
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-white text-xl font-bold font-['Orbitron']">{tier.title}</h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white font-['Orbitron']">{tier.price}</span>
                    <span className="text-gray-400 text-xs font-mono">{tier.currency}</span>
                  </div>
                  <div className="mt-2 text-xs font-mono text-[#93C5FD] bg-[#0070BA]/20 border border-[#0070BA]/30 px-2.5 py-1 rounded">
                    💳 {tier.pay_in_4}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1 border-t border-[#222222] pt-5">
                  {tier.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <Check size={14} className="text-[#FF5500] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleOpenCheckout(tier)}
                  className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-[#FF5500] hover:bg-[#E64A19] text-white shadow-[0_0_20px_rgba(255,85,0,0.5)]'
                      : 'bg-[#181C28] hover:bg-[#FF5500] text-white border border-[#2A2E3D]'
                  }`}
                >
                  <span>Select via PayPal</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Personal Mastery & The Super Agent (Element 09) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#06080D] border-b border-[#222222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#00D4FF] text-xs font-mono uppercase tracking-widest font-bold">ELEMENT 09 // KNOWLEDGE OF SELF</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1 font-['Orbitron']">
              The Super Agent: Personal Life, Study &amp; Creative OS
            </h2>
            <p className="text-gray-400 text-sm mt-2">Built for personal mastery, mental sovereignty, habits, study acceleration, and uncompromised accountability</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {superAgentTiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl p-8 flex flex-col transition-all duration-300 relative bg-[#0F1118] border ${
                  tier.popular
                    ? 'border-[#FF5500] shadow-[0_0_30px_rgba(255,85,0,0.2)]'
                    : 'border-[#00D4FF]/40 hover:border-[#00D4FF]'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5500] text-black text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full">
                    Sovereign Build
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-white text-xl font-bold font-['Orbitron']">{tier.title}</h3>
                  <p className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">{tier.subtitle}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-white font-['Orbitron']">{tier.price}</span>
                    <span className="text-gray-400 text-xs font-mono">{tier.frequency}</span>
                  </div>
                  <div className="mt-2 text-xs font-mono text-[#93C5FD] bg-[#0070BA]/20 border border-[#0070BA]/30 px-2.5 py-1 rounded inline-block">
                    {tier.type}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1 border-t border-[#222222] pt-5">
                  {tier.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <Check size={14} className="text-[#00D4FF] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleOpenCheckout(tier)}
                  className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-[#FF5500] hover:bg-[#E64A19] text-white shadow-[0_0_20px_rgba(255,85,0,0.5)]'
                      : 'bg-[#00D4FF]/10 hover:bg-[#00D4FF] text-white hover:text-black border border-[#00D4FF]/30'
                  }`}
                >
                  <span>Select via PayPal</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Monthly Retainers & On-Site Event Operations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#10B981] text-xs font-mono uppercase tracking-widest font-bold">CATEGORY 02</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1 font-['Orbitron']">
              Monthly Retainers &amp; Venue Operations
            </h2>
            <p className="text-gray-400 text-sm mt-2">Billed recurringly via PayPal Subscriptions with dedicated on-site event operators</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {monthlyRetainers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl p-8 flex flex-col transition-all duration-300 bg-[#0F1118] border ${
                  tier.popular ? 'border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-[#222222] hover:border-[#10B981]/40'
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-white text-xl font-bold font-['Orbitron']">{tier.title}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#10B981] font-['Orbitron']">{tier.price}</span>
                    <span className="text-gray-400 text-xs font-mono">{tier.frequency}</span>
                  </div>
                  <div className="mt-2 text-xs font-mono text-[#93C5FD] bg-[#0070BA]/20 border border-[#0070BA]/30 px-2.5 py-1 rounded inline-block">
                    {tier.type}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1 border-t border-[#222222] pt-5">
                  {tier.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <Check size={14} className="text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleOpenCheckout(tier)}
                  className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest bg-[#181C28] hover:bg-[#10B981] hover:text-black text-white border border-[#2A2E3D] transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe via PayPal</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 9LMNTS OS Series Licensing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#080A0F] border-y border-[#222222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#00D4FF] text-xs font-mono uppercase tracking-widest font-bold">CATEGORY 03</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1 font-['Orbitron']">
              9LMNTS OS Series Licensing
            </h2>
            <p className="text-gray-400 text-sm mt-2">Sound Clash OS, Artist OS &amp; Gate OS turn-key deployment tiers</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {osSeries.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-[#0F1118] p-5 rounded-xl border flex flex-col justify-between ${
                  tier.popular ? 'border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.2)]' : 'border-[#222222]'
                }`}
              >
                <div>
                  <h4 className="text-white text-sm font-bold font-['Orbitron'] mb-2">{tier.title}</h4>
                  <div className="text-lg font-black text-[#00D4FF] font-['Orbitron'] mb-1">{tier.fee}</div>
                  <div className="text-xs font-mono text-gray-300 font-bold mb-2">{tier.split}</div>
                  <p className="text-[11px] text-gray-400 mb-4">{tier.note}</p>
                </div>
                <button
                  onClick={() => handleOpenCheckout({ name: tier.title, price: tier.fee })}
                  className="w-full py-2.5 bg-[#181C28] hover:bg-[#00D4FF] hover:text-black text-white text-[11px] font-bold uppercase rounded-lg border border-[#2A2E3D] transition-colors"
                >
                  Configure OS
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Universal 4-Box In-Venue Monetization Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF5500] text-xs font-mono uppercase tracking-widest font-bold">CATEGORY 04</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1 font-['Orbitron']">
              Universal 4-Box In-Venue Monetization
            </h2>
            <p className="text-gray-400 text-sm mt-2">Tested live arena monetization rails for tournament crowds and VIPs</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inVenueGrid.map((box, idx) => (
              <div key={idx} className="bg-[#0F1118] border border-[#222222] p-6 rounded-2xl flex flex-col justify-between hover:border-[#FF5500]/50 transition-colors">
                <div>
                  <span className="text-xs font-mono text-[#FF5500] font-bold uppercase">{box.box}</span>
                  <h3 className="text-white font-bold text-base mt-1 mb-2">{box.name}</h3>
                  <div className="text-2xl font-black text-white font-['Orbitron'] mb-1">{box.price}</div>
                  <div className="text-xs font-mono text-[#93C5FD] mb-3">Pay Later: {box.payIn4}</div>
                  <p className="text-xs text-gray-400">{box.desc}</p>
                </div>
                <button
                  onClick={() => handleOpenCheckout(box)}
                  className="mt-6 w-full py-3 bg-[#181C28] hover:bg-[#FF5500] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Checkout
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#080A0F] border-t border-[#222222]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase text-white font-['Orbitron']">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-sm mt-2">Everything you need to know about payment processing and delivery</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#0F1118] border border-[#222222] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#151926] transition-colors"
                >
                  <span className="text-white font-bold text-sm">{faq.question}</span>
                  <HelpCircle
                    className={`text-[#FF5500] flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    size={18}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 border-t border-[#222222] pt-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return to Cockpit CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#222222] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase text-white font-['Orbitron'] mb-4">
            Ready to Build or Return to the Cockpit?
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Experience the 4K interactive spatial studio or submit your production brief directly to Darnley Sanon and the engineering dispatch.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="index.html"
              className="px-8 py-4 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(255,85,0,0.5)] transition-all"
            >
              ← Return to Studio Cockpit
            </a>
            <a
              href="services.html"
              className="px-8 py-4 bg-[#181C28] hover:bg-[#252C3F] text-white font-bold rounded-xl text-xs uppercase tracking-widest border border-[#2A2E3D] transition-colors"
            >
              Services &amp; 9 Pillars →
            </a>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {selectedInvoice && (
        <GateOSCheckoutModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          invoiceDetails={selectedInvoice}
        />
      )}
    </div>
  );
}