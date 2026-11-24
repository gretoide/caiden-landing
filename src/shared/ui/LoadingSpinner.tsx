import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Wait this long (ms, counted once the spot is on screen) before showing anything. */
  delay?: number;
  /** Safety net: never keep spinning longer than this (ms) once shown. */
  maxDuration?: number;
  label?: string;
  className?: string;
};

/**
 * Classic spinner + "Loading" label. It renders nothing visible while things load fast: it only
 * appears if whatever it stands in for is still missing after `delay` ms *while on screen*, so
 * offscreen lazy content (and normal / Lighthouse page loads) never show it. It also gives up after
 * `maxDuration`, so it can never stay stuck on the page.
 */
export default function LoadingSpinner({ delay = 600, maxDuration = 20000, label = 'Loading', className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let showTimer: number | undefined;
    let hideTimer: number | undefined;
    const start = () => {
      if (showTimer !== undefined) return;
      showTimer = window.setTimeout(() => {
        setShow(true);
        hideTimer = window.setTimeout(() => setShow(false), maxDuration);
      }, delay);
    };
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === 'undefined') {
      start();
    } else {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          observer?.disconnect();
        }
      });
      observer.observe(el);
    }
    return () => {
      observer?.disconnect();
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [delay, maxDuration]);

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={`pointer-events-none flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {show && (
        <>
          <span
            aria-hidden
            className="block w-8 h-8 rounded-full border-2 border-white/15 border-t-brand-400 animate-spin [animation-duration:900ms]"
          />
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/60">{label}</span>
        </>
      )}
    </div>
  );
}
