import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BatchCountdownBar } from '@/components/BatchCountdownBar';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import { AitoolWidget } from '@/components/AitoolWidget';
import { LemonSliceWidget } from '@/components/LemonSliceWidget';

export const metadata: Metadata = {
  // Inherited from root layout
};

/**
 * Main Layout
 * Full layout with Header, Footer, and floating widgets (BatchCountdownBar, WhatsApp, AI widget)
 * Used for most pages
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Breadcrumbs />
      
      <main className="relative z-10 flex-grow min-h-[60vh]">
        {children}
      </main>
      
      <Footer />
      
      {/* Floating Widgets */}
      <BatchCountdownBar />
      <AitoolWidget />
      <WhatsAppWidget />
      <LemonSliceWidget />
    </>
  );
}
