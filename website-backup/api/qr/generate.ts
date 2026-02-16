import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { eventId, eventType, timestamp, location, features } = await req.json();

    // Generate QR code data
    const qrData = {
      eventId: eventId || `event-${Date.now()}`,
      eventType: eventType || 'unknown',
      timestamp: timestamp || new Date().toISOString(),
      location: location || 'https://9lmnts-eventos.vercel.app',
      features: features || [],
      generatedAt: new Date().toISOString(),
    };

    // Generate QR code (simplified version)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(qrData))}`;

    return NextResponse.json({
      success: true,
      qrCode: qrCodeUrl,
      data: qrData,
    });
  } catch (error) {
    console.error('QR Code generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
