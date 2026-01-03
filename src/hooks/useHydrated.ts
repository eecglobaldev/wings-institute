'use client';

import { useSyncExternalStore } from 'react';

/**
 * Subscribe function for useSyncExternalStore
 * Returns a no-op function since we don't need to track changes
 */
function subscribe() {
  return () => {};
}

/**
 * useHydrated hook
 * Returns true on the client after hydration, false during SSR
 * Uses useSyncExternalStore for optimal performance and consistency
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,  // Client: always true after hydration
    () => false  // Server: always false
  );
}

export default useHydrated;

