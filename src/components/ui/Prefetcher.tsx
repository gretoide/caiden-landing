import { useEffect } from 'react';

type Props = {
  /** The import function to call, e.g. () => import('./MyComponent') */
  loader: () => Promise<any>;
};

/**
 * A simple utility to trigger the browser to pre-fetch a chunk.
 * Place it at a strategic point in the component tree to start background download
 * before the component is actually needed.
 */
export default function Prefetcher({ loader }: Props) {
  useEffect(() => {
    // Start loading the chunk in the background
    loader().catch(() => {
      // Fail silently, it's just a prefetch
    });
  }, [loader]);

  return null;
}
