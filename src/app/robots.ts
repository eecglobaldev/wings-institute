import { MetadataRoute } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Robots.txt route handler
 * Serves the exact robots.txt content from the original CSR website
 * This file is read from public/robots.txt to maintain consistency
 */
export default function robots(): MetadataRoute.Robots | string {
  try {
    // Read the robots.txt file from public directory
    // This ensures we use the exact same file from the original CSR website
    const robotsPath = join(process.cwd(), 'public', 'robots.txt');
    const robotsContent = readFileSync(robotsPath, 'utf8');
    
    // Return the raw content as a string
    // Next.js will serve this as text/plain
    return robotsContent as any;
  } catch (error) {
    console.error('Error reading robots.txt:', error);
    // Fallback to default robots configuration
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://wingsinstitute.com/sitemap_index.xml',
    };
  }
}
