import { useEffect, useState } from 'react';

/**
 * A hook that uses IntersectionObserver to trigger a callback when an element
 * is near the viewport (default 400px margin).
 * Useful for pre-fetching lazy-loaded component chunks.
 */
export function useLazyPreload(ref: React.RefObject<Element | null>, onNear: () => void, margin = '400px') {
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!ref.current || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onNear();
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, onNear, hasStarted, margin]);

  return hasStarted;
}
