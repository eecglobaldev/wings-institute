import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Gujarati } from 'next/font/google';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { Providers } from '@/components/Providers';
import type { Language } from '@/types';
import './globals.css';

// Font configuration - Using Google Fonts CDN to match original exactly
// Note: next/font applies size-adjust which changes font sizes, so we use CDN instead
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false, // Disable size-adjust to match original
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-devanagari',
  adjustFontFallback: false,
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-gujarati',
  adjustFontFallback: false,
});

// Root metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://wingsinstitute.com'),
  title: {
    default: 'Wings Institute Vadodara | Air Hostess & Hotel Management Training Since 2008',
    template: '%s | Wings Institute',
  },
  description: "Gujarat's premier aviation & hospitality institute. Professional Air Hostess, Cabin Crew, Hotel Management, Culinary Arts & Travel Tourism courses. Airbus A330 Mock Cabin training. 100% placement assistance. Since 2008.",
  keywords: ['air hostess training Vadodara', 'cabin crew course Gujarat', 'hotel management institute', 'aviation academy India', 'ground staff training', 'culinary arts course', 'travel tourism diploma', 'best aviation institute Gujarat', 'Wings Institute'],
  authors: [{ name: 'Wings Institute Air Hostess & Hotel Management' }],
  creator: 'Wings Institute',
  publisher: 'Wings Institute',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://wingsinstitute.com/',
    siteName: 'Wings Institute',
    title: 'Wings Institute Vadodara | Air Hostess & Hotel Management Training',
    description: "Gujarat's premier aviation & hospitality institute since 2008. Professional cabin crew, hotel management & culinary training with Airbus A330 Mock Cabin. 100% placement assistance.",
    images: [
      {
        url: '/images/wings-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wings Institute - Air Hostess and Hotel Management Training Campus in Vadodara',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wings Institute Vadodara | Aviation & Hospitality Training',
    description: 'Professional Air Hostess, Cabin Crew & Hotel Management courses in Gujarat. Airbus A330 Mock Cabin training. Since 2008.',
    images: ['/images/wings-twitter-card.jpg'],
    site: '@wingsinstitute',
    creator: '@wingsinstitute',
  },
  verification: {
    google: 'DRX9CpF4xmjWqjAhNqvkoa8hesUgrZUw3LjVof_GGPQ',
    yandex: '2de1d1512d4e703d',
    other: {
      'msvalidate.01': '9A9B2AD82F89ED85E7EA6D30FAD943EC',
      'facebook-domain-verification': 'eqjyfgrvcvlae6rar8kbcgilzxwbv9',
      'p:domain_verify': 'f322a851a0ee625a14f30abb8d526f73',
    },
  },
  alternates: {
    canonical: 'https://wingsinstitute.com/',
    languages: {
      'en-IN': 'https://wingsinstitute.com/',
      'en': 'https://wingsinstitute.com/',
      'x-default': 'https://wingsinstitute.com/',
    },
  },
  icons: {
    icon: [
      { url: '/images/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/images/wings-favicon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'geo.region': 'IN-GJ',
    'geo.placename': 'Vadodara, Gujarat, India',
    'geo.position': '22.3151688;73.1707874',
    'ICBM': '22.3151688, 73.1707874',
    'theme-color': '#4F46E5',
    'msapplication-TileColor': '#4F46E5',
    'ai-content-declaration': 'human-created',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get theme and language from cookies
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';
  const language = cookieStore.get('lang')?.value || 'en';

  return (
    <html
      lang={language}
      className={`light ${theme === 'dark' ? 'dark' : ''} ${inter.variable} ${notoDevanagari.variable} ${notoGujarati.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Preconnect for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load Google Fonts via CDN to match original exactly */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+Devanagari:wght@100..900&family=Noto+Sans+Gujarati:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} lang-${language} min-h-screen text-zinc-900 dark:text-white font-sans transition-colors duration-500`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PSH3QSWS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Aurora Background */}
        <div className="aurora-bg">
          <div className="bg-grid-pattern opacity-100 dark:opacity-50" />
          <div className="orb w-[800px] h-[800px] bg-blue-300/30 dark:bg-indigo-900/20 top-[-20%] left-[-10%] animate-blob" />
          <div className="orb w-[600px] h-[600px] bg-indigo-500/20 dark:bg-red-900/10 top-[20%] right-[-10%] animate-blob animation-delay-2000" />
        </div>

        <Providers language={language as Language}>
          {children}
        </Providers>

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PSH3QSWS');`}
        </Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','149635138106887');`}
        </Script>
      </body>
    </html>
  );
}
