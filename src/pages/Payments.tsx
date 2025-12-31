import { useState } from 'react';
import { motion } from 'framer-motion';

const Payments = () => {
  const [selectedService, setSelectedService] = useState('');
  const [paymentType, setPaymentType] = useState('deposit');
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const services = [
    { 
      id: 'nye-platform', 
      name: 'NYE Emergency Platform', 
      fullPrice: 1500, 
      depositPrice: 750,
      description: 'Last-minute NYE event platform - Deploy in 3 hours',
      timeline: '3 hours',
      features: ['Guest management', 'Live photo sharing', 'Countdown timer', 'Music requests', 'Virtual toast'],
      urgency: '🚨 LAST 2 SLOTS AVAILABLE'
    },
    { 
      id: 'pitch-battle', 
      name: 'Pitch Battle OS', 
      fullPrice: 3500, 
      depositPrice: 1750,
      description: 'Corporate pitch competition platform',
      timeline: '24-48 hours',
      features: ['Live voting', 'Real-time results', 'Corporate branding', 'Analytics', 'Sponsor integration'],
      urgency: '⚡ POPULAR CHOICE'
    },
    { 
      id: 'wedding-os', 
      name: 'Wedding OS', 
      fullPrice: 2500, 
      depositPrice: 1250,
      description: 'Complete wedding management platform',
      timeline: '48 hours',
      features: ['Digital guestbook', 'RSVP management', 'Photo sharing', 'Timeline coordination', 'Vendor management'],
      urgency: '💝 PERFECT FOR WEDDINGS'
    },
    { 
      id: 'gaming-os', 
      name: 'Gaming OS', 
      fullPrice: 2000, 
      depositPrice: 1000,
      description: 'Tournament and gaming platform',
      timeline: '24 hours',
      features: ['Bracket system', 'Live streaming', 'Player profiles', 'Score tracking', 'Chat integration'],
      urgency: '🎮 GAMERS LOVE IT'
    },
    { 
      id: 'brand-identity', 
      name: 'Brand Identity Package', 
      fullPrice: 2500, 
      depositPrice: 1250,
      description: 'Complete brand identity design',
      timeline: '1-2 weeks',
      features: ['Logo design', 'Color palette', 'Typography', 'Brand guidelines', 'Social media kit'],
      urgency: '🎨 PROFESSIONAL BRANDING'
    },
    { 
      id: 'ui-ux-design', 
      name: 'UI/UX Design', 
      fullPrice: 3000, 
      depositPrice: 1500,
      description: 'User interface and experience design',
      timeline: '2-3 weeks',
      features: ['Wireframes', 'Prototypes', 'Design system', 'User testing', 'Responsive design'],
      urgency: '💻 MODERN DESIGN'
    }
  ];

  const currentService = services.find(s => s.id === selectedService);
  const currentPrice = paymentType === 'deposit' ? currentService?.depositPrice : currentService?.fullPrice;

  const handlePaymentSubmit = () => {
    if (!selectedService || !clientInfo.name || !clientInfo.email) {
      alert('Please fill in all required fields');
      return;
    }

    const paymentData = {
      service: currentService?.name,
      price: currentPrice,
      clientInfo,
      paymentType,
      timestamp: new Date().toISOString()
    };

    // Generate email with payment instructions
    const subject = encodeURIComponent(`Payment Request - ${currentService?.name}`);
    const body = encodeURIComponent(
      `Service Request Details:\n\n` +
      `Service: ${currentService?.name}\n` +
      `Price: $${currentService?.fullPrice}\n` +
      `${paymentType === 'deposit' ? `Deposit (50%): $${currentService?.depositPrice}\n` : ''}\n` +
      `Client Information:\n` +
      `Name: ${clientInfo.name}\n` +
      `Email: ${clientInfo.email}\n` +
      `Company: ${clientInfo.company || 'N/A'}\n` +
      `Phone: ${clientInfo.phone || 'N/A'}\n\n` +
      `Payment Options:\n\n` +
      `Option 1: E-Transfer (Recommended - No Fees)\n` +
      `Send to: 9lmntstudio@gmail.com\n` +
      `Security Question: What is company name?\n` +
      `Security Answer: 9LMNTS Studio\n\n` +
      `Option 2: Credit Card (2.9% + $0.30 fee)\n` +
      `Visit: https://9lmntsstudio.com/pay\n` +
      `Click "Pay with Credit Card" button\n\n` +
      `After payment, reply to this email with:\n` +
      `- Payment confirmation\n` +
      `- Your logo/branding files\n` +
      `- Special requirements\n\n` +
      `Work begins immediately upon payment confirmation.\n` +
      `${currentService?.timeline.includes('hour') ? 'Platform will be live within ' + currentService?.timeline : 'Design work will begin immediately'}.\n\n` +
      `Thank you!\n` +
      `9LMNTS Studio`
    );

    window.location.href = `mailto:9lmntstudio@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
            9LMNTS Studio Payments
          </h1>
          <p className="text-xl text-gray-400">Secure e-transfer payment processing - 50% deposit starts work</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-4">Select Service</h2>
            {services.map((service) => (
              <motion.button
                key={service.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedService(service.id)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  selectedService === service.id
                    ? 'border-orange-500 bg-gradient-to-r from-orange-500/10 to-pink-500/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{service.name}</h3>
                  <div className="text-right">
                    <span className="text-orange-400 font-bold">${service.fullPrice}</span>
                    <div className="text-sm text-gray-400">50%: ${service.depositPrice}</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                      +{service.features.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{service.timeline}</span>
                  <span className="text-xs text-yellow-400 font-bold">{service.urgency}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            
            {currentService && (
              <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-2">{currentService.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Selected Service:</span>
                  <span className="text-orange-400 font-bold">${currentService.fullPrice}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Timeline:</span>
                  <span>{currentService.timeline}</span>
                </div>
              </div>
            )}

            {/* Payment Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Payment Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentType('deposit')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    paymentType === 'deposit'
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-gray-700 bg-gray-900'
                  }`}
                >
                  <div className="font-bold">50% Deposit</div>
                  <div className="text-sm text-gray-400">
                    ${currentService?.depositPrice || 0}
                  </div>
                  <div className="text-xs text-green-400">Work starts immediately</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType('full')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    paymentType === 'full'
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-gray-700 bg-gray-900'
                  }`}
                >
                  <div className="font-bold">Full Payment</div>
                  <div className="text-sm text-gray-400">
                    ${currentService?.fullPrice || 0}
                  </div>
                  <div className="text-xs text-blue-400">Save time</div>
                </button>
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-orange-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-orange-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company/Organization</label>
                <input
                  type="text"
                  value={clientInfo.company}
                  onChange={(e) => setClientInfo({...clientInfo, company: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-orange-500 focus:outline-none"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:border-orange-500 focus:outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Payment Summary */}
            {currentService && (
              <div className="bg-gray-900 p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-3">Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Service:</span>
                    <span>{currentService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Type:</span>
                    <span>{paymentType === 'deposit' ? '50% Deposit' : 'Full Payment'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-orange-400">${currentPrice}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handlePaymentSubmit}
              disabled={!selectedService || !clientInfo.name || !clientInfo.email}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-lg font-bold hover:from-orange-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Payment Instructions
            </button>

            {/* Payment Instructions */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-bold text-blue-400 mb-2">💳 Payment Options:</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• <strong>E-Transfer (Recommended)</strong>: No fees, instant processing</li>
                <li>• Send to: <strong>9lmntstudio@gmail.com</strong></li>
                <li>• Security Question: <strong>"What is company name?"</strong></li>
                <li>• Security Answer: <strong>"9LMNTS Studio"</strong></li>
                <li>• <strong>Credit Card</strong>: 2.9% + $0.30 fee via Stripe</li>
                <li>• Work starts immediately upon payment confirmation</li>
                <li>• Platform delivered within promised timeline</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
