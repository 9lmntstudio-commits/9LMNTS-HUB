import { useState } from 'react';
import { Crown, Zap, Sparkles, Check, Star, ArrowRight } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingTiers = [
    {
      name: "EVENT OS STARTER",
      price: 750,
      yearlyPrice: 7500,
      tagline: "24-Hour Event Platform",
      color: "cyber-blue",
      badge: "MOST POPULAR",
      icon: Zap,
      features: [
        "✅ Complete EVENT OS deployment",
        "✅ LOA AI Agent setup",
        "✅ Basic customization (colors/logo)",
        "✅ 7-day support window",
        "✅ Mobile responsive",
        "✅ Basic analytics dashboard",
        "⏳ 24-hour deployment guarantee",
        "📞 Email support"
      ],
      stripeLink: "https://buy.stripe.com/starter_750"
    },
    {
      name: "EVENT OS PRO",
      price: 2500,
      yearlyPrice: 25000,
      tagline: "Premium Event Experience",
      color: "cyber-purple",
      badge: "PREMIUM",
      icon: Crown,
      features: [
        "✅ Everything in Starter PLUS:",
        "🎨 Advanced customization",
        "🤖 LOA AI Agent training",
        "📊 Advanced analytics",
        "🎟️ Custom ticketing system",
        "📱 Native mobile app shell",
        "⏳ 12-hour deployment",
        "📞 Priority phone support",
        "🔒 SSL & Security suite",
        "🔄 Monthly maintenance"
      ],
      stripeLink: "https://buy.stripe.com/pro_2500"
    },
    {
      name: "ENTERPRISE SUITE",
      price: 5000,
      yearlyPrice: 50000,
      tagline: "Full-Scale Event Ecosystem",
      color: "vip-gold",
      badge: "ENTERPRISE",
      icon: Sparkles,
      features: [
        "✅ Everything in Pro PLUS:",
        "🏢 Multiple event management",
        "👥 Team collaboration dashboard",
        "🔌 API access & webhooks",
        "📈 Custom reporting suite",
        "🎬 Video streaming integration",
        "💬 Live chat support",
        "⚡ 6-hour emergency deployment",
        "🔐 Enterprise security",
        "🛠️ Dedicated LOA AI Agent",
        "📅 Quarterly strategy sessions",
        "🎯 Custom feature development"
      ],
      stripeLink: "https://buy.stripe.com/enterprise_5000"
    }
  ];

  const microInvestmentTiers = [
    { amount: 250, returns: "12.5%", description: "Micro Investor Entry" },
    { amount: 500, returns: "15%", description: "Active Participant" },
    { amount: 1000, returns: "17.5%", description: "Event Sponsor" },
    { amount: 2000, returns: "20%", description: "VIP Micro Investor" }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    // In real implementation, this would open Stripe checkout
    window.open(plan.stripeLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-cyan-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Crown className="text-vip-gold mx-auto mb-6" size={48} />
            <h1 className="text-5xl font-black text-white font-futuristic mb-4">
              Choose Your <span className="text-vip-gold">Event OS</span> Plan
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional event platforms with AI-powered customization. Deploy in 24 hours or less.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex justify-center items-center mb-8">
              <div className="glass px-6 py-3 rounded-lg flex items-center space-x-4">
                <button 
                  className={`px-4 py-2 rounded-lg transition-all ${
                    billingCycle === 'monthly' 
                      ? 'bg-cyber-blue text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Monthly
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg transition-all ${
                    billingCycle === 'yearly' 
                      ? 'bg-vip-gold text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Yearly <span className="text-cyber-green text-sm">Save 20%</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            const displayPrice = billingCycle === 'yearly' ? tier.yearlyPrice : tier.price;
            
            return (
              <div 
                key={tier.name}
                className={`glass border-${tier.color} hover:scale-105 transition-all duration-300 fade-in relative ${
                  tier.badge === 'MOST POPULAR' ? 'ring-2 ring-cyber-blue ring-offset-2' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black ${
                    tier.badge === 'MOST POPULAR' ? 'bg-cyber-blue' :
                    tier.badge === 'PREMIUM' ? 'bg-cyber-purple' :
                    'bg-vip-gold'
                  }`}>
                    {tier.badge}
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 bg-${tier.color} rounded-xl flex items-center justify-center text-black`}>
                      <Icon size={32} />
                    </div>
                  </div>

                  {/* Plan Info */}
                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-bold text-${tier.color} mb-2`}>
                      {tier.name}
                    </h3>
                    <p className="text-gray-400 mb-6">{tier.tagline}</p>
                    
                    <div className="mb-6">
                      {billingCycle === 'yearly' && (
                        <div className="text-gray-400 line-through text-lg mb-2">
                          ${tier.price}/mo
                        </div>
                      )}
                      <div className="text-4xl font-black text-white mb-2">
                        ${displayPrice}
                        <span className="text-lg text-gray-400">/{billingCycle === 'yearly' ? 'year' : 'mo'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-300">
                        <Check className="text-cyber-green mr-3 mt-0.5 flex-shrink-0" size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => handleSelectPlan(tier)}
                    className={`btn-glow bg-${tier.color} text-black font-bold w-full`}
                  >
                    {tier.badge === 'MOST POPULAR' ? (
                      <>
                        <Zap size={16} className="mr-2" />
                        Launch Your Event
                      </>
                    ) : tier.badge === 'PREMIUM' ? (
                      <>
                        <Crown size={16} className="mr-2" />
                        Go Premium
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} className="mr-2" />
                        Contact Enterprise
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Micro Investment Section */}
        <div className="glass border-cyber-green rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-cyber-green mb-4 font-futuristic">
              Micro Investment Opportunities
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Start investing in events with as little as $250. Get returns up to 20% with our micro-investment program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {microInvestmentTiers.map((tier, index) => (
              <div 
                key={tier.amount}
                className="glass border-glass-border rounded-lg p-6 text-center hover:border-cyber-green transition-all fade-in"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="text-2xl font-bold text-white mb-2">
                  ${tier.amount}
                </div>
                <div className="text-cyber-green font-bold mb-2">
                  {tier.returns} Returns
                </div>
                <div className="text-sm text-gray-400">
                  {tier.description}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="btn-glow bg-cyber-green text-black font-bold">
              <Star size={16} className="mr-2" />
              Start Micro Investing
            </button>
          </div>
        </div>

        {/* Live LOA Dashboard */}
        <div className="glass border-vip-gold rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-vip-gold mb-4 font-futuristic">
              Live LOA Dashboard
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Real-time deployment tracking and analytics for all Event OS platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="financial-card">
              <div className="text-xs text-gray-400 uppercase font-bold mb-2">Active Deployments</div>
              <div className="text-3xl text-white font-bold mono">12</div>
              <div className="text-xs text-gray-500 mt-1">+2 today</div>
            </div>
            <div className="financial-card">
              <div className="text-xs text-gray-400 uppercase font-bold mb-2">Revenue Today</div>
              <div className="text-3xl text-cyber-blue font-bold mono">$7,500</div>
              <div className="text-xs text-gray-500 mt-1">+15% vs yesterday</div>
            </div>
            <div className="financial-card">
              <div className="text-xs text-gray-400 uppercase font-bold mb-2">System Health</div>
              <div className="text-3xl text-cyber-green font-bold mono">98%</div>
              <div className="text-xs text-gray-500 mt-1">Optimal</div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="btn-glow bg-vip-gold text-black font-bold"
            >
              <ArrowRight size={16} className="mr-2" />
              View Full Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
