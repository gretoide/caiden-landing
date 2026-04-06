import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Cursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    const spotlight = spotlightRef.current;

    if (!cursorDot || !cursorOutline || !spotlight) return;

    // Reveal cursor on first mouse move using a one-time listener
    const showCursor = () => {
      gsap.to([cursorDot, cursorOutline], { scale: 1, duration: 0.3, ease: 'back.out(2)' });
      window.removeEventListener('mousemove', showCursor);
    };
    window.addEventListener('mousemove', showCursor, { once: true });

    // Use a single reusable quickTo for each axis — avoids creating a new tween per frame
    const dotX = gsap.quickTo(cursorDot, 'x', { duration: 0.15, ease: 'power2.out' });
    const dotY = gsap.quickTo(cursorDot, 'y', { duration: 0.15, ease: 'power2.out' });
    const outlineX = gsap.quickTo(cursorOutline, 'x', { duration: 0.4, ease: 'power3.out' });
    const outlineY = gsap.quickTo(cursorOutline, 'y', { duration: 0.4, ease: 'power3.out' });
    const spotlightX = gsap.quickTo(spotlight, 'x', { duration: 1.2, ease: 'power2.out' });
    const spotlightY = gsap.quickTo(spotlight, 'y', { duration: 1.2, ease: 'power2.out' });

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const isPointer = !!(e.target as HTMLElement)?.closest(
        'a, button, [role="button"], [data-cursor="pointer"], .cursor-pointer'
      );

      dotX(x); dotY(y);
      outlineX(x); outlineY(y);
      spotlightX(x); spotlightY(y);

      gsap.to(cursorDot, { scale: isPointer ? 0 : 1, opacity: isPointer ? 0 : 1, duration: 0.2 });
      gsap.to(cursorOutline, {
        scale: isPointer ? 2.5 : 1,
        backgroundColor: isPointer ? 'rgba(255,255,255,0.1)' : 'transparent',
        borderColor: isPointer ? 'rgba(255,255,255,0.3)' : 'white',
        duration: 0.3,
      });
    };

    const handleMouseDown = () => gsap.to(cursorOutline, { scale: 1.5, duration: 0.2 });
    const handleMouseUp = () => gsap.to(cursorOutline, { scale: 1, duration: 0.2 });

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []); // Empty deps — setup once, never recreate

  return (
    <>
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[90] opacity-50 mix-blend-screen hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, rgba(96, 165, 250, 0.05) 40%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ scale: 0 }}
      />

      <div
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-[border-color,background-color] duration-300"
        style={{ scale: 0 }}
      />
    </>
  );
}
