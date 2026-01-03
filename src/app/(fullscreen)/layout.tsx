import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Inherited from root layout
};

/**
 * Fullscreen Layout
 * Minimal layout WITHOUT Header, Footer, or any widgets
 * Used for immersive experiences like Virtual Tour
 */
export default function FullscreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      {children}
    </main>
  );
}

