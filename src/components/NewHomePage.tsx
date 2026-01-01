import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Globe, Bot, CheckCircle, Star, Users, Clock, DollarSign } from 'lucide-react';

interface NewHomePageProps {
  onNavigate: (page: string) => void;
}

export function NewHomePage({ onNavigate }: NewHomePageProps) {
  const [activePillar, setActivePillar] = useState(0);
  const [deployments, setDeployments] = useState(127);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeployments(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const pillars = [
    {
      title: "9LMNTS Studio",
      icon: Globe,
      description: "The AI-powered development studio",
      features: ["Expert development team", "AI-driven processes", "24/7 support", "Enterprise-grade solutions"],
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "EVENT OS",
      icon: Zap,
      description: "Complete event management platform",
      features: ["Ticket sales", "Attendee management", "Live analytics", "Mobile app included"],
      color: "from-purple-600 to-purple-800"
    },
    {
      title: "LOA AI Agent",
      icon: Bot,
      description: "Automated deployment & management",
      features: ["3-hour deployment", "Automated setup", "GitHub integration", "Zero maintenance"],
      color: "from-cyan-600 to-cyan-800"
    }
  ];

  const caseStudies = [
    {
      name: "Mr. Sanon",
      role: "Founder & First Client",
      quote: "I built this studio to prove AI can deliver premium event platforms in 24 hours",
      metrics: { deployment: "3 hours", revenue: "Scaling to $50K/month", platforms: "127+" }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            AI-Powered Event Platforms
            <br />
            <span className="text-4xl md:text-6xl">in 24 Hours</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            9LMNTS Studio × EVENT OS × LOA AI Agent
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => onNavigate('deploy-now')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Deploy Your EVENT OS - $750
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>{deployments} Platforms Deployed</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            The Three Pillars of Event Innovation
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActivePillar(index)}
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${pillar.color} cursor-pointer transform transition-all hover:scale-105 ${activePillar === index ? 'ring-4 ring-white/50' : ''}`}
              >
                <pillar.icon className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-gray-200 mb-4">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            How It Works: 4 Simple Steps
          </motion.h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Payment", desc: "Client pays $750", icon: DollarSign },
              { step: 2, title: "LOA Activation", desc: "AI agent activates", icon: Bot },
              { step: 3, title: "EVENT OS Deployment", desc: "Platform deployed", icon: Zap },
              { step: 4, title: "Client Access", desc: "Ready in 24 hours", icon: Globe }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="text-2xl font-bold mb-2">Step {item.step}</div>
                <div className="font-semibold mb-2">{item.title}</div>
                <div className="text-gray-400">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mr. Sanon Case Study */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-8 border border-blue-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Mr. Sanon</h3>
                <p className="text-gray-400">Founder & First Client</p>
              </div>
            </div>
            
            <blockquote className="text-xl mb-6 italic">
              "I built this studio to prove AI can deliver premium event platforms in 24 hours"
            </blockquote>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(caseStudies[0].metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{value}</div>
                  <div className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live LOA Agent Status */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            LOA Agent Status
          </motion.h2>
          
          <motion.div 
            className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-2xl p-8 border border-green-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xl font-semibold">LOA Agent Online & Operational</span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-green-400">{deployments}</div>
                <div className="text-gray-400">Platforms Deployed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">3h</div>
                <div className="text-gray-400">Average Deployment</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-gray-400">Availability</div>
              </div>
            </div>
            
            <button
              onClick={() => onNavigate('deploy-now')}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg font-semibold hover:from-green-700 hover:to-cyan-700 transition-all"
            >
              Test Deployment
            </button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Deploy Your EVENT OS?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join {deployments}+ clients who've transformed their events with AI-powered platforms
          </p>
          <button
            onClick={() => onNavigate('deploy-now')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Deploy Your EVENT OS - $750
          </button>
        </motion.div>
      </section>
    </div>
  );
}
