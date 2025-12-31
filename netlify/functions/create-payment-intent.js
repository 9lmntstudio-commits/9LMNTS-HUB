const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  try {
    const { service, price, currency = 'cad' } = JSON.parse(event.body);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: currency,
      payment_method_types: ['card'],
      metadata: {
        service: service,
        company: '9LMNTS Studio'
      },
      // Automatic payment methods for customers
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
