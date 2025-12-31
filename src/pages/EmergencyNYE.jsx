import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const EmergencyNYE = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  // Countdown to 6 PM EST Dec 31
  useEffect(() => {
    const targetDate = new Date('December 31, 2025 18:00:00 EST').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const packages = [
    {
      id: 'basic',
      name: 'NYE Basic Platform',
      price: 1500,
      deposit: 750,
      features: [
        'Guest list management',
        'Live photo sharing',
        'Countdown timer',
        'Music requests',
        'Basic analytics'
      ],
      timeline: 'Deploy in 6 hours',
      urgency: '⚡ LAST 2 SLOTS AVAILABLE'
    },
    {
      id: 'premium',
      name: 'NYE Premium Platform',
      price: 2500,
      deposit: 1250,
      features: [
        'Everything in Basic +',
        'Live streaming',
        'Interactive polls',
        'Virtual champagne toast',
        'Advanced analytics',
        'Custom branding'
      ],
      timeline: 'Deploy in 4 hours',
      urgency: '🔥 ONLY 1 SLOT LEFT'
    },
    {
      id: 'enterprise',
      name: 'NYE Enterprise Platform',
      price: 3500,
      deposit: 1750,
      features: [
        'Everything in Premium +',
        'Multiple venue support',
        'VIP access control',
        'Sponsor integration',
        'Dedicated support',
        'White-label solution'
      ],
      timeline: 'Deploy in 2 hours',
      urgency: '🚨 FINAL SLOT - ACT NOW'
    }
  ];

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
    setShowPayment(true);
  };

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <h1 className="text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                🎊 NYE EMERGENCY DEPLOYMENT 🎊
              </span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Your event platform deployed before the ball drops
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-600 to-pink-600 p-8 rounded-2xl max-w-2xl mx-auto mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">⏰ DEPLOYMENT DEADLINE</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-5xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-sm uppercase">Hours</div>
              </div>
              <div>
                <div className="text-5xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-sm uppercase">Minutes</div>
              </div>
              <div>
                <div className="text-5xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-sm uppercase">Seconds</div>
              </div>
            </div>
            <p className="mt-4 text-xl">Until 6:00 PM EST Deployment Deadline</p>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 pb-16">
          {/* Urgency Message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-2xl mb-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-2">🚨 LAST-MINUTE NYE EVENT? 🚨</h2>
            <p className="text-xl">
              We can deploy your complete event platform in HOURS, not days
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                ✅ 24/7 Support
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                ✅ Instant Deployment
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                ✅ Money-Back Guarantee
              </div>
            </div>
          </motion.div>

          {/* Package Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gradient-to-br ${
                  pkg.id === 'enterprise' 
                    ? 'from-yellow-600 to-orange-600 border-4 border-yellow-400' 
                    : pkg.id === 'premium'
                    ? 'from-purple-600 to-pink-600 border-2 border-purple-400'
                    : 'from-blue-600 to-purple-600 border-2 border-blue-400'
                } p-6 rounded-2xl`}
              >
                {pkg.id === 'enterprise' && (
                  <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold mb-2">${pkg.price}</div>
                  <div className="text-lg">50% deposit: ${pkg.deposit}</div>
                  <div className="text-sm mt-2 bg-white/20 px-3 py-1 rounded-full inline-block">
                    {pkg.timeline}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-center text-sm font-bold mb-2 text-yellow-300">
                    {pkg.urgency}
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="mr-2">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    pkg.id === 'enterprise'
                      ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                      : 'bg-white text-purple-600 hover:bg-gray-100'
                  }`}
                >
                  {pkg.id === 'enterprise' ? '🚀 DEPLOY NOW' : 'Select Package'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Proven Track Record</h3>
              <p className="text-gray-400">50+ events delivered successfully</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Average deployment time: 4 hours</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Risk-Free Guarantee</h3>
              <p className="text-gray-400">Full refund if not delivered on time</p>
            </div>
          </motion.div>

          {/* Recent Work */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-8 rounded-2xl mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Recent Emergency Deployments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">TechCorp Holiday Party</h3>
                  <span className="text-green-400 text-sm">✅ Delivered</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">Deployed 3 hours before event</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">Live Voting</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">Photo Sharing</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">500+ Guests</span>
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">NYE Gala 2024</h3>
                  <span className="text-green-400 text-sm">✅ Delivered</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">Last-minute platform upgrade</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">Live Stream</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">VIP Access</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">1000+ Guests</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LOA Chat Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4">🤖 Meet LOA - Your AI Event Assistant</h2>
            <p className="text-xl mb-6">
              Available 24/7 to answer questions and process your order instantly
            </p>
            <div className="bg-white/10 p-6 rounded-xl mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div>
                  <div className="font-bold mb-2">⚡ Instant Responses</div>
                  <div className="text-sm">Get answers in seconds, not hours</div>
                </div>
                <div>
                  <div className="font-bold mb-2">🎯 Expert Guidance</div>
                  <div className="text-sm">AI-powered event recommendations</div>
                </div>
                <div>
                  <div className="font-bold mb-2">🔒 Secure Processing</div>
                  <div className="text-sm">Safe payment handling</div>
                </div>
              </div>
            </div>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Chat with LOA Now
            </button>
          </motion.div>
        </main>

        {/* Payment Modal */}
        <AnimatePresence>
          {showPayment && selectedPkg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              onClick={() => setShowPayment(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-4">Complete Your Order</h3>
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                  <h4 className="font-bold mb-2">{selectedPkg.name}</h4>
                  <div className="flex justify-between mb-2">
                    <span>50% Deposit:</span>
                    <span className="text-orange-400 font-bold">${selectedPkg.deposit}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${selectedPkg.price}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      window.location.href = `mailto:3dkane@gmail.com?subject=NYE%20Emergency%20Deployment%20-%20${selectedPkg.name}&body=Package:%20${selectedPkg.name}%0ADeposit:%20$${selectedPkg.deposit}%0ATotal:%20$${selectedPkg.price}%0A%0APlease%20send%20deposit%20to%203dkane@gmail.com%20to%20secure%20your%20slot.%0A%0AName:%0ACompany:%0APhone:%0AEvent%20Details:`;
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-pink-700 transition-all"
                  >
                    🚀 Send Deposit via E-Transfer
                  </button>
                  
                  <button
                    onClick={() => setShowPayment(false)}
                    className="w-full bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm">
                  <p className="text-blue-400">
                    <strong>Next Steps:</strong><br/>
                    1. Send deposit to 3dkane@gmail.com<br/>
                    2. We'll start deployment immediately<br/>
                    3. Platform live before 6 PM EST<br/>
                    4. Final payment due upon delivery
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmergencyNYE;
