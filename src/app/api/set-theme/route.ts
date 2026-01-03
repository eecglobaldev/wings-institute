import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { theme } = await request.json();
    
    if (theme !== 'light' && theme !== 'dark') {
      return NextResponse.json(
        { error: 'Invalid theme value' },
        { status: 400 }
      );
    }
    
    const cookieStore = await cookies();
    cookieStore.set('theme', theme, {
      maxAge: 31536000, // 1 year
      path: '/',
      sameSite: 'lax',
    });
    
    return NextResponse.json({ success: true, theme });
  } catch {
    return NextResponse.json(
      { error: 'Failed to set theme' },
      { status: 500 }
    );
  }
}

