import React, { useState, useEffect } from 'react';
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
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const services = [
    { 
      id: 'nye-platform', 
      name: 'NYE Emergency Platform', 
      fullPrice: 1500, 
      depositPrice: 750,
      description: 'Last-minute NYE event platform - Deploy by 6 PM EST',
      timeline: '24 hours',
      features: ['Live voting', 'Guest management', 'Real-time updates', 'Mobile app']
    },
    { 
      id: 'pitch-battle', 
      name: 'Pitch Battle OS', 
      fullPrice: 3500, 
      depositPrice: 1750,
      description: 'Corporate pitch competition platform',
      timeline: '24-48 hours',
      features: ['Live judging', 'Audience voting', 'Sponsor integration', 'Analytics']
    },
    { 
      id: 'wedding-os', 
      name: 'Wedding OS', 
      fullPrice: 2500, 
      depositPrice: 1250,
      description: 'Complete wedding management platform',
      timeline: '48 hours',
      features: ['Digital guestbook', 'RSVP management', 'Photo sharing', 'Timeline coordination']
    },
    { 
      id: 'gaming-os', 
      name: 'Gaming OS', 
      fullPrice: 2000, 
      depositPrice: 1000,
      description: 'Tournament and gaming platform',
      timeline: '24 hours',
      features: ['Bracket system', 'Live streaming', 'Player profiles', 'Score tracking']
    },
    { 
      id: 'brand-identity', 
      name: 'Brand Identity Package', 
      fullPrice: 2500, 
      depositPrice: 1250,
      description: 'Complete brand identity design',
      timeline: '1-2 weeks',
      features: ['Logo design', 'Color palette', 'Typography', 'Brand guidelines']
    },
    { 
      id: 'ui-ux-design', 
      name: 'UI/UX Design', 
      fullPrice: 3000, 
      depositPrice: 1500,
      description: 'User interface and experience design',
      timeline: '2-3 weeks',
      features: ['Wireframes', 'Prototypes', 'Design system', 'User testing']
    }
  ];

  const currentService = services.find(s => s.id === selectedService);
  const currentPrice = paymentType === 'deposit' ? currentService?.depositPrice : currentService?.fullPrice;

  const generatePaymentReference = () => {
    const timestamp = Date.now();
    const serviceCode = selectedService?.toUpperCase().replace('-', '').substring(0, 8);
    return `9LMNTS-${serviceCode}-${timestamp}`;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);

    const paymentReference = generatePaymentReference();
    const paymentData = {
      ...clientInfo,
      service: currentService,
      paymentType,
      amount: currentPrice,
      reference: paymentReference,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Store payment data (in real app, this would go to a database)
    localStorage.setItem(`payment_${paymentReference}`, JSON.stringify(paymentData));

    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentComplete(true);
      
      // Send confirmation email (in real app)
      window.location.href = `mailto:3dkane@gmail.com?subject=E-Transfer%20Payment%20Request%20-%20${paymentReference}&body=Payment%20Details:%0A%0AService:%20${currentService?.name}%0AAmount:%20$${currentPrice}%0AReference:%20${paymentReference}%0AClient:%20${clientInfo.name}%0AEmail:%20${clientInfo.email}%0A%0APlease%20send%20e-transfer%20to%203dkane@gmail.com%20with%20this%20reference%20number.%0A%0AThank%20you!`;
    }, 2000);
  };

  const generateInvoice = () => {
    if (!currentService || !clientInfo.name) return null;

    const invoiceNumber = `INV-${Date.now()}`;
    const invoiceData = {
      invoiceNumber,
      date: new Date().toLocaleDateString(),
      client: clientInfo,
      service: currentService,
      paymentType,
      amount: currentPrice,
      hst: currentPrice * 0.13,
      total: paymentType === 'deposit' ? currentPrice : currentPrice * 1.13
    };

    return invoiceData;
  };

  const invoice = generateInvoice();

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-600 to-green-700 p-8 rounded-2xl text-center"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Payment Request Generated!</h1>
            <p className="text-xl mb-6">Check your email for e-transfer instructions</p>
            <div className="bg-white/20 p-6 rounded-xl mb-6">
              <h3 className="font-bold mb-2">Payment Details:</h3>
              <p className="text-lg">Amount: ${currentPrice}</p>
              <p className="text-lg">Send to: 3dkane@gmail.com</p>
              <p className="text-sm mt-2">Reference: {generatePaymentReference()}</p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Return to Homepage
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
            9LMNTS Studio Payments
          </h1>
          <p className="text-xl text-gray-400">Secure e-transfer payment processing</p>
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
                  <span className="text-orange-400 font-bold">${service.fullPrice}</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, index) => (
                    <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  Timeline: {service.timeline}
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
              </div>
            )}

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {/* Payment Type */}
              <div>
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
                  </button>
                </div>
              </div>

              {/* Client Information */}
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

              {/* Payment Summary */}
              {currentService && (
                <div className="bg-gray-900 p-4 rounded-lg">
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
                type="submit"
                disabled={!selectedService || !clientInfo.name || !clientInfo.email || paymentProcessing}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-lg font-bold hover:from-orange-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paymentProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Generate E-Transfer Request - $${currentPrice || 0}`
                )}
              </button>
            </form>

            {/* E-Transfer Instructions */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-bold text-blue-400 mb-2">E-Transfer Instructions:</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• After submission, you'll receive an email with payment details</li>
                <li>• Send e-transfer to: <strong>3dkane@gmail.com</strong></li>
                <li>• Use the reference number provided in the email</li>
                <li>• Work begins immediately upon deposit confirmation</li>
                <li>• 24-hour deployment guarantee for Event OS platforms</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Invoice Preview */}
        {invoice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-gray-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Invoice Preview</h2>
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">9LMNTS Studio</h3>
                  <p className="text-gray-400">Creative Digital Agency</p>
                  <p className="text-gray-400">Invoice: {invoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Date: {invoice.date}</p>
                  <p className="text-gray-400">Due: Upon receipt</p>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="mb-4">
                  <p className="text-gray-400">Bill To:</p>
                  <p className="font-bold">{invoice.client.name}</p>
                  <p>{invoice.client.email}</p>
                  {invoice.client.company && <p>{invoice.client.company}</p>}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{invoice.service.name}</span>
                    <span>${invoice.amount}</span>
                  </div>
                  {invoice.paymentType === 'full' && (
                    <div className="flex justify-between text-gray-400">
                      <span>HST (13%)</span>
                      <span>${invoice.hst.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700">
                    <span>Total</span>
                    <span className="text-orange-400">${invoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Payments;
