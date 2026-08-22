import { Check, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { SEO } from './SEO';

interface PricingPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const agencyServices = [
    {
      name: 'One-Time Service',
      price: '$499',
      description: 'Perfect for single projects',
      features: [
        'Logo Design',
        'Business Card Design',
        'Social Media Graphics (3)',
        'Basic Brand Guidelines',
        '2 Revision Rounds',
        '1 Week Delivery',
      ],
      popular: false,
    },
  ];

  const retainers = [
    {
      name: 'Starter Retainer',
      price: '$999/month',
      description: 'Essential ongoing support',
      features: [
        'Branding Full Kit Package',
        'Basic Web/App Design',
        'SEO Optimization',
        'Email Marketing Setup',
        'Standard Business Documents',
        'Contracts & Agreements',
        'Terms of Service',
        'Email Outreach Writing',
        'Custom AI Assistant (1)',
        'Business Hours Support',
      ],
      popular: false,
    },
    {
      name: 'Growth Retainer',
      price: '$2,499/month',
      description: 'Comprehensive growth package',
      features: [
        'Everything in Starter',
        'Advanced Web/App Development',
        'Video Editing (5 videos/month)',
        'Marketing Campaign Management',
        'Custom AI Assistants (3)',
        'Priority Support',
        '24/7 Monitoring Service',
        'Help Desk Access',
        'Weekly Strategy Calls',
      ],
      popular: true,
    },
    {
      name: 'Enterprise Retainer',
      price: '$4,999/month',
      description: 'Full-service partnership',
      features: [
        'Everything in Growth',
        'Unlimited Design Requests',
        'Full Development Team',
        'Video Production Suite',
        'Advanced Marketing Automation',
        'Custom AI Assistants (Unlimited)',
        'Dedicated Account Manager',
        '24/7 Priority Support',
        'Real-time Monitoring',
        'Monthly Business Strategy',
      ],
      popular: false,
    },
  ];

  const osSeriesTiers = [
    {
      name: 'Free Tier',
      price: '$0',
      description: 'Start your OS journey',
      profitSplit: '70/30',
      features: [
        'Basic OS Access',
        'Standard Templates',
        'Community Support',
        '70% Your Revenue / 30% Platform Fee',
        'Monthly Reporting',
      ],
      popular: false,
    },
    {
      name: 'Starter OS',
      price: '$499',
      description: 'Enhanced OS features',
      profitSplit: '80/20',
      features: [
        'Everything in Free',
        'Custom Branding',
        'Advanced Analytics',
        'Priority Support',
        '80% Your Revenue / 20% Platform Fee',
        'Includes 9LMNTS Studio Services',
      ],
      popular: false,
    },
    {
      name: 'Pro OS',
      price: '$1,499',
      description: 'Professional OS solution',
      profitSplit: '85/15',
      features: [
        'Everything in Starter',
        'White Label Option',
        'Custom Integrations',
        'Dedicated Support',
        '85% Your Revenue / 15% Platform Fee',
        'Full 9LMNTS Studio Services',
      ],
      popular: true,
    },
    {
      name: 'Enterprise OS',
      price: '$4,999',
      description: 'Complete OS ecosystem',
      profitSplit: '95/5',
      features: [
        'Everything in Pro',
        'Custom Development',
        'API Access',
        '24/7 Priority Support',
        '95% Your Revenue / 5% Platform Fee',
        'Premium 9LMNTS Studio Services',
        'Revenue Sharing Optimization',
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'What is the difference between Agency Services and OS Series?',
      answer: 'Agency Services are one-time or monthly retainers for creative agency work (design, development, marketing). OS Series is our proprietary operating system platform with revenue sharing models for event management and business operations.',
    },
    {
      question: 'How does the profit split work for OS Series?',
      answer: 'Free Tier: You keep 70%, platform takes 30%. Starter OS: You keep 80%, platform takes 20%. Pro OS: You keep 85%, platform takes 15%. Enterprise OS: You keep 95%, platform takes 5%.',
    },
    {
      question: 'Can I switch between retainer plans?',
      answer: 'Yes, you can upgrade or downgrade your retainer plan at any time. Changes take effect at the start of the next billing cycle.',
    },
    {
      question: 'What is included in the "Branding Full Kit Package"?',
      answer: 'The branding kit includes logo design, color palette, typography system, brand guidelines document, social media templates, business card design, and brand asset library.',
    },
    {
      question: 'Do the OS Series tiers include 9LMNTS Studio services?',
      answer: 'Yes, all paid OS tiers (Starter, Pro, Enterprise) include corresponding 9LMNTS Studio services. The higher the tier, the more comprehensive the included services.',
    },
    {
      question: 'What is the "Custom AI Assistant" feature?',
      answer: 'Our custom AI assistants are tailored to your business needs - from customer service chatbots to content generation tools, marketing automation, and data analysis helpers.',
    },
    {
      question: 'How does 24/7 monitoring service work?',
      answer: 'Our team monitors your systems, website, and applications around the clock. We detect and resolve issues proactively, ensuring maximum uptime and performance.',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 font-['Orbitron'] text-foreground">
      <SEO 
        title="Pricing | 9LMNTS Studio" 
        description="Transparent and modular pricing tiers for our cyber aesthetic web experiences. Choose between Flow, Beat, and Cypher elements." 
      />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-card border border-primary/30 rounded-full text-primary text-sm uppercase tracking-widest">
              Transparent Pricing
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 font-bold">
            <span className="font-['Orbitron'] uppercase tracking-tighter">Choose Your</span> <span className="font-['Mrs_Saint_Delafield'] text-primary text-6xl sm:text-7xl lg:text-8xl capitalize ml-[-10px] -rotate-3 inline-block">Plan</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
            Agency services and OS Series tiers to fit your needs
          </p>
        </div>
      </section>

      {/* Agency Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">Agency</span> <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">Services</span>
            </h2>
            <p className="text-muted-foreground font-sans">One-time services and monthly retainers</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {agencyServices.map((tier, index) => (
              <div
                key={index}
                className="p-8 rounded-none transition-all flex flex-col bg-background border border-primary/20"
              >
                <h3 className="text-foreground text-xl mb-2 font-bold uppercase tracking-widest">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl text-primary font-black">{tier.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6 font-sans">{tier.description}</p>
                <ul className="space-y-3 mb-8 flex-1 font-sans">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-muted-foreground flex items-start text-sm">
                      <Check className="text-primary mr-2 flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-none font-bold uppercase tracking-widest transition-all border bg-primary text-primary-foreground border-primary hover:bg-primary/90">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retainers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">Monthly</span> <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">Retainers</span>
            </h2>
            <p className="text-muted-foreground font-sans">Ongoing comprehensive support packages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {retainers.map((tier, index) => (
              <div
                key={index}
                className={`p-8 rounded-none transition-all flex flex-col ${
                  tier.popular
                    ? 'bg-background border-2 border-primary shadow-[0_0_40px_rgba(255,69,0,0.2)] scale-105 z-10'
                    : 'bg-background border border-primary/20'
                }`}
              >
                {tier.popular && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-foreground text-xl mb-2 font-bold uppercase tracking-widest">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl text-primary font-black">{tier.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6 font-sans">{tier.description}</p>
                <ul className="space-y-3 mb-8 flex-1 font-sans">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-muted-foreground flex items-start text-sm">
                      <Check className="text-primary mr-2 flex-shrink-0" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-none font-bold uppercase tracking-widest transition-all border ${
                  tier.popular
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    : 'bg-transparent border-primary text-primary hover:bg-primary/10'
                }`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OS Series Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">9LMNTS OS</span> <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">Series</span>
            </h2>
            <p className="text-muted-foreground font-sans">Proprietary operating system with revenue sharing</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {osSeriesTiers.map((tier, index) => (
              <div
                key={index}
                className={`p-6 rounded-none transition-all flex flex-col ${
                  tier.popular
                    ? 'bg-background border-2 border-primary shadow-[0_0_40px_rgba(255,69,0,0.2)] scale-105 z-10'
                    : 'bg-background border border-primary/20'
                }`}
              >
                {tier.popular && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest">
                      Recommended
                    </span>
                  </div>
                )}
                <h3 className="text-foreground text-lg mb-2 font-bold uppercase tracking-widest">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-2xl text-primary font-black">{tier.price}</span>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">
                    {tier.profitSplit} Split
                  </span>
                </div>
                <p className="text-muted-foreground text-xs mb-6 font-sans">{tier.description}</p>
                <ul className="space-y-2 mb-6 flex-1 font-sans">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-muted-foreground flex items-start text-xs">
                      <Check className="text-primary mr-2 flex-shrink-0" size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-none font-bold uppercase tracking-widest transition-all border text-xs ${
                  tier.popular
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    : 'bg-transparent border-primary text-primary hover:bg-primary/10'
                }`}>
                  Choose Tier
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">Compare All</span> <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">Features</span>
            </h2>
            <p className="text-muted-foreground font-sans">Detailed feature comparison across all tiers</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-none border border-primary/20 font-sans text-xs">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left p-4 text-foreground uppercase tracking-widest text-xs">Features</th>
                  <th className="text-center p-4 text-foreground uppercase tracking-widest text-xs">One-Time</th>
                  <th className="text-center p-4 text-foreground uppercase tracking-widest text-xs">Starter</th>
                  <th className="text-center p-4 text-foreground uppercase tracking-widest text-xs bg-primary/10">
                    Growth
                    <div className="text-[9px] text-primary mt-1">Popular</div>
                  </th>
                  <th className="text-center p-4 text-foreground uppercase tracking-widest text-xs">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Logo Design', onetime: true, starter: true, growth: true, enterprise: true },
                  { feature: 'Web/App Design', onetime: false, starter: true, growth: true, enterprise: true },
                  { feature: 'SEO Optimization', onetime: false, starter: true, growth: true, enterprise: true },
                  { feature: 'Video Editing', onetime: false, starter: false, growth: true, enterprise: true },
                  { feature: 'Marketing Campaigns', onetime: false, starter: false, growth: true, enterprise: true },
                  { feature: 'Custom AI Assistants', onetime: false, starter: '1', growth: '3', enterprise: 'Unlimited' },
                  { feature: '24/7 Monitoring', onetime: false, starter: false, growth: true, enterprise: true },
                  { feature: 'Dedicated Account Manager', onetime: false, starter: false, growth: false, enterprise: true },
                  { feature: 'Business Strategy', onetime: false, starter: false, growth: false, enterprise: true },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                    <td className="p-4 text-muted-foreground text-sm font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.onetime === 'boolean' ? (
                        row.onetime ? <Check className="text-primary mx-auto" size={16} /> : <span className="text-muted-foreground/30">—</span>
                      ) : (
                        <span className="text-muted-foreground text-xs font-bold uppercase">{row.onetime}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check className="text-primary mx-auto" size={16} /> : <span className="text-muted-foreground/30">—</span>
                      ) : (
                        <span className="text-muted-foreground text-xs font-bold uppercase">{row.starter}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-primary/5">
                      {typeof row.growth === 'boolean' ? (
                        row.growth ? <Check className="text-primary mx-auto" size={16} /> : <span className="text-muted-foreground/30">—</span>
                      ) : (
                        <span className="text-primary text-xs font-bold uppercase">{row.growth}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check className="text-primary mx-auto" size={16} /> : <span className="text-muted-foreground/30">—</span>
                      ) : (
                        <span className="text-muted-foreground text-xs font-bold uppercase">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">Frequently Asked</span> <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">Questions</span>
            </h2>
            <p className="text-muted-foreground font-sans">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-4 font-sans">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background rounded-none border border-primary/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(faq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
                >
                  <span className="text-foreground font-bold text-sm uppercase tracking-widest">{faq.question}</span>
                  <HelpCircle
                    className={`text-primary flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 border-t border-primary/10 pt-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl text-foreground mb-6 font-bold leading-tight">
          <span className="font-['Orbitron'] uppercase tracking-tighter">Still Have</span> <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl sm:text-6xl lg:text-8xl capitalize ml-[-15px] -rotate-6 inline-block">Questions?</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8 font-sans">
          Our team is ready to help you choose the perfect plan
        </p>
        <button className="px-10 py-4 bg-primary text-primary-foreground rounded-none font-bold hover:bg-primary/90 transition-all transform hover:scale-105 border border-primary uppercase tracking-widest">
          Schedule a Consultation
        </button>
      </div>
    </section>
  </div>
  );
}