import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { amount, currency, description, returnUrl, cancelUrl } = await req.json();

    // Validate required fields
    if (!amount || !currency || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, currency, description' },
        { status: 400 }
      );
    }

    // Generate PayPal payment URL
    const paypalBaseUrl = 'https://www.paypal.com/cgi-bin/webscr';
    const businessEmail = 'darnley@9lmnts.com';
    
    const paymentParams = new URLSearchParams({
      cmd: '_xclick',
      business: businessEmail,
      currency_code: currency,
      amount: amount,
      item_name: description,
      return: returnUrl,
      cancel_return: cancelUrl,
      no_shipping: '1',
      no_note: '1',
      bn: 'PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest',
    });

    const paypalUrl = `${paypalBaseUrl}?${paymentParams.toString()}`;

    return NextResponse.json({
      success: true,
      paymentUrl: paypalUrl,
      amount,
      currency,
      description,
      businessEmail,
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}
