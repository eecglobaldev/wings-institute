import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Set Turbopack root to silence workspace warning
  // This tells Next.js that the project root is wings-ssr, not the parent directory
  turbopack: {
    root: process.cwd(),
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wingsinstitute.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Enable image optimization
    // Reduced sizes for lower memory usage (optimized for 1GB RAM)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Image quality options (75 is default, 90 for better quality on critical images)
    qualities: [75, 90],
    // Minimum quality for optimized images
    minimumCacheTTL: 60,
    // Enable unoptimized for faster dev builds (disable in production)
    unoptimized: false,
    // Enable faster image loading
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers (migrated from vercel.json)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value:
              'accelerometer=(), camera=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(self), payment=(), usb=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
      // Cache static assets
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/PA-audiofiles/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache sitemaps
      {
        source: '/:path(sitemap.*\\.xml)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },

  // Redirects (legacy URLs)
  async redirects() {
    return [
      {
        source: '/advantage',
        destination: '/',
        permanent: true,
      },
      {
        source: '/air-hostess',
        destination: '/air-hostess-training',
        permanent: true,
      },
      {
        source: '/airport-mgmt',
        destination: '/airport-management',
        permanent: true,
      },
      {
        source: '/hotel-mgmt',
        destination: '/hotel-management',
        permanent: true,
      },
      {
        source: '/culinary',
        destination: '/culinary-cooking-course',
        permanent: true,
      },
      {
        source: '/travel-tourism',
        destination: '/travel-tourism-management',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/jobs-at-wings',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/events',
        destination: '/free-workshops-events',
        permanent: true,
      },
      {
        source: '/scholarship',
        destination: '/scholarship-test',
        permanent: true,
      },
      {
        source: '/roi-calculator',
        destination: '/salary-roi-calculator',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      // AI Tools redirects (short URLs to full paths)
      {
        source: '/resume-builder',
        destination: '/ai-tools/resume-builder',
        permanent: true,
      },
      {
        source: '/interview-coach',
        destination: '/ai-tools/interview-coach',
        permanent: true,
      },
      {
        source: '/pa-simulator',
        destination: '/ai-tools/pa-simulator',
        permanent: true,
      },
      {
        source: '/career-navigator',
        destination: '/ai-tools/career-navigator',
        permanent: true,
      },
      {
        source: '/career-quest',
        destination: '/ai-tools/career-quest',
        permanent: true,
      },
    ];
  },

  // Remove trailing slashes
  trailingSlash: false,
};

export default nextConfig;
