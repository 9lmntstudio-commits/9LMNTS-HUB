import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_YOUR_STRIPE_PUBLIC_KEY'); // Replace with your actual Stripe public key

const StripePayment = ({ service, price, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async () => {
    setLoading(true);
    
    try {
      const stripe = await stripePromise;
      
      // Create payment session on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: service.name,
          price: price * 100, // Stripe uses cents
          currency: 'cad'
        }),
      });
      
      const session = await response.json();
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (result.error) {
        console.error(result.error.message);
        setLoading(false);
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleStripePayment}
      disabled={loading}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
    >
      {loading ? 'Processing...' : `Pay $${price} with Credit Card`}
    </button>
  );
};

export default StripePayment;
