import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    
    // Fallback to 123456 if env variable is not set
    const correctPin = process.env.ADMIN_PIN || '123456';

    if (pin === correctPin) {
      const response = NextResponse.json({ success: true });
      
      // Set HttpOnly cookie
      response.cookies.set({
        name: 'admin_auth',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json({ error: 'Code PIN incorrect' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
