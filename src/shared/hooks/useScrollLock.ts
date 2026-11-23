import { useEffect } from 'react';

// Shared counter so nested locks (e.g. modal + lightbox) don't release each other.
let lockCount = 0;
let saved: { htmlOverflow: string; bodyOverflow: string; bodyPaddingRight: string } | null = null;

/**
 * Locks page scroll (html + body) while `active` is true.
 * Compensates the scrollbar width to avoid layout shift and restores previous values on release.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const html = document.documentElement;
    const body = document.body;

    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      saved = {
        htmlOverflow: html.style.overflow,
        bodyOverflow: body.style.overflow,
        bodyPaddingRight: body.style.paddingRight,
      };
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    }
    lockCount++;

    return () => {
      lockCount--;
      if (lockCount === 0 && saved) {
        html.style.overflow = saved.htmlOverflow;
        body.style.overflow = saved.bodyOverflow;
        body.style.paddingRight = saved.bodyPaddingRight;
        saved = null;
      }
    };
  }, [active]);
}
