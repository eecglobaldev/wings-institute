import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { language } = await request.json();
    
    if (language !== 'en' && language !== 'hi' && language !== 'gu') {
      return NextResponse.json(
        { error: 'Invalid language value' },
        { status: 400 }
      );
    }
    
    const cookieStore = await cookies();
    cookieStore.set('lang', language, {
      maxAge: 31536000, // 1 year
      path: '/',
      sameSite: 'lax',
    });
    
    return NextResponse.json({ success: true, language });
  } catch {
    return NextResponse.json(
      { error: 'Failed to set language' },
      { status: 500 }
    );
  }
}

