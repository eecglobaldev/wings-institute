import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  // Read the robots.txt file from public directory
  // This ensures we use the exact same file from the original CSR website
  const robotsPath = join(process.cwd(), 'public', 'robots.txt');
  const robotsContent = readFileSync(robotsPath, 'utf8');
  
  return new NextResponse(robotsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
