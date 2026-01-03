'use client';

import { useEffect, useState, type PropsWithChildren } from 'react';

interface ClientOnlyProps extends PropsWithChildren {
  fallback?: React.ReactNode;
}

/**
 * ClientOnly wrapper component
 * Renders children only on the client side to prevent hydration mismatches
 * for components that use browser-only APIs
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default ClientOnly;

