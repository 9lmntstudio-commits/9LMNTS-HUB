import React, { useState, useEffect } from 'react';

const EmergencyNYE = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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

  const handlePayment = (tier: string, price: number, deposit: number) => {
    window.location.href = `mailto:9lmntstudio@gmail.com?subject=NYE%20EMERGENCY%20-%20${tier}&body=URGENT%20NYE%20Platform%20Request%0A%0ATier:%20${tier}%0APrice:%20$${price}%0ADeposit:%20$${deposit}%0A%0AE-Transfer%20Instructions:%0ASend%20$${deposit}%20to:%209lmntstudio@gmail.com%0ASecurity%20Question:%20What%20is%20company%20name?%0ASecurity%20Answer:%209LMNTS%20Studio%0A%0AAfter%20sending,%20reply%20with:%0A-%20Event%20name%0A-%20Logo%20file%0A-%20Special%20requirements%0A%0APlatform%20will%20be%20live%20within%203%20hours.%0A%0AThank%20you!`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              🎆 NEW YEAR'S EVE EMERGENCY 🎆
            </span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Virtual NYE Platform Deployed in 3 Hours - Guaranteed Before Midnight!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 p-8 rounded-2xl max-w-2xl mx-auto mb-12 text-center">
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
          <p className="mt-4 text-xl">Until 6:00 PM EST Final Deadline</p>
        </div>

        {/* Urgency Message */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-2xl mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">🚨 LAST-MINUTE NYE PARTY? 🚨</h2>
          <p className="text-xl mb-4">
            We can deploy your complete NYE virtual party platform in HOURS, not days
          </p>
          <div className="flex justify-center space-x-4 flex-wrap">
            <div className="bg-white/20 px-4 py-2 rounded-lg mb-2">✅ 3-Hour Deployment</div>
            <div className="bg-white/20 px-4 py-2 rounded-lg mb-2">✅ Live Before Midnight</div>
            <div className="bg-white/20 px-4 py-2 rounded-lg mb-2">✅ Money-Back Guarantee</div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Basic Tier */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-2">Basic NYE Platform</h3>
            <div className="text-4xl font-bold mb-2">$1,500</div>
            <div className="text-lg mb-4">50% deposit: $750</div>
            <div className="text-sm bg-white/20 px-3 py-1 rounded-full inline-block mb-4">
              Deploy in 3 hours
            </div>
            <ul className="text-left mb-6 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Guest list management</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Live photo sharing</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Countdown timer</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Music requests</span>
              </li>
            </ul>
            <div className="text-sm text-yellow-300 mb-4 font-bold">
              ⚡ LAST 2 SLOTS AVAILABLE
            </div>
            <button
              onClick={() => handlePayment('Basic', 1500, 750)}
              className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              DEPLOY NOW - $750 Deposit
            </button>
          </div>

          {/* Premium Tier */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl text-center border-4 border-purple-400 relative">
            <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium NYE Platform</h3>
            <div className="text-4xl font-bold mb-2">$2,500</div>
            <div className="text-lg mb-4">50% deposit: $1,250</div>
            <div className="text-sm bg-white/20 px-3 py-1 rounded-full inline-block mb-4">
              Deploy in 2 hours
            </div>
            <ul className="text-left mb-6 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Everything in Basic +</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Live streaming</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Virtual champagne toast</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Custom branding</span>
              </li>
            </ul>
            <div className="text-sm text-yellow-300 mb-4 font-bold">
              🔥 ONLY 1 SLOT LEFT
            </div>
            <button
              onClick={() => handlePayment('Premium', 2500, 1250)}
              className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
            >
              DEPLOY NOW - $1,250 Deposit
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-gradient-to-br from-yellow-600 to-orange-600 p-6 rounded-2xl text-center border-4 border-yellow-400">
            <h3 className="text-2xl font-bold mb-2">Enterprise NYE Platform</h3>
            <div className="text-4xl font-bold mb-2">$3,500</div>
            <div className="text-lg mb-4">50% deposit: $1,750</div>
            <div className="text-sm bg-white/20 px-3 py-1 rounded-full inline-block mb-4">
              Deploy in 1 hour
            </div>
            <ul className="text-left mb-6 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Everything in Premium +</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Multiple venue support</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>VIP access control</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Dedicated support</span>
              </li>
            </ul>
            <div className="text-sm text-yellow-300 mb-4 font-bold animate-pulse">
              🚨 FINAL SLOT - ACT NOW
            </div>
            <button
              onClick={() => handlePayment('Enterprise', 3500, 1750)}
              className="w-full bg-white text-orange-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              DEPLOY NOW - $1,750 Deposit
            </button>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-gray-800 p-8 rounded-2xl mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">⚡ Payment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-orange-400">Option 1: E-Transfer (Fastest)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Send to:</span>
                  <span className="font-bold">9lmntstudio@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security Question:</span>
                  <span className="font-bold">What is company name?</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security Answer:</span>
                  <span className="font-bold">9LMNTS Studio</span>
                </div>
                <div className="text-sm text-green-400 mt-2">
                  ✓ Work starts immediately upon receipt<br/>
                  ✓ No processing fees<br/>
                  ✓ Direct to Desjardins bank account
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Option 2: Credit Card</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Processor:</span>
                  <span className="font-bold">Stripe Secure</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cards Accepted:</span>
                  <span className="font-bold">Visa, Mastercard, Amex</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Processing Time:</span>
                  <span className="font-bold">2-5 minutes</span>
                </div>
                <div className="text-sm text-blue-400 mt-2">
                  ✓ Instant processing<br/>
                  ✓ International cards accepted<br/>
                  ✓ 2.9% + $0.30 processing fee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">50+ NYE Events</h3>
            <p className="text-gray-400">Successfully delivered last year</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">3-Hour Average</h3>
            <p className="text-gray-400">Deployment time guaranteed</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-2">100% Refund</h3>
            <p className="text-gray-400">If not delivered on time</p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">🚨 NEED HELP IMMEDIATELY?</h2>
          <p className="text-xl mb-6">
            Email us now for instant response
          </p>
          <button
            onClick={() => window.location.href = 'mailto:9lmntstudio@gmail.com?subject=NYE%20EMERGENCY%20HELP&body=I%20need%20immediate%20help%20with%20NYE%20platform%20deployment.%0A%0AMy%20event%20starts%20in:%0A%0AI%20need:%0A%0APhone%20(if%20available):'}
            className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors"
          >
            📧 EMAIL US NOW
          </button>
          <p className="mt-4 text-sm">
            We respond within 5 minutes for NYE emergencies
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyNYE;
