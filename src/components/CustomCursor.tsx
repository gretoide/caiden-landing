import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    const spotlight = spotlightRef.current;

    if (!cursorDot || !cursorOutline || !spotlight) return;

    // Set initial scale to 0
    gsap.set([cursorDot, cursorOutline], { scale: 0 });

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const { clientX: x, clientY: y } = e;

      // Inner dot follows instantly
      gsap.to(cursorDot, {
        x,
        y,
        scale: 1,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Outer outline follows with a smooth lag
      gsap.to(cursorOutline, {
        x,
        y,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      });

      // Spotlight effect follows with even more lag for a "lazy" atmospheric feel
      gsap.to(spotlight, {
        x,
        y,
        duration: 1.2,
        ease: 'power2.out',
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursorDot, { scale: 0.8, duration: 0.2 });
      gsap.to(cursorOutline, { scale: 1.5, duration: 0.2 });
    };

    const handleMouseUp = () => {
      gsap.to(cursorDot, { scale: 1, duration: 0.2 });
      gsap.to(cursorOutline, { scale: 1, duration: 0.2 });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer = target.closest('a, button, [role="button"], [data-cursor="pointer"]');
      
      if (isPointer) {
        gsap.to(cursorOutline, {
          scale: 2.5,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3,
        });
        gsap.to(cursorDot, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer = target.closest('a, button, [role="button"], [data-cursor="pointer"]');
      
      if (isPointer) {
        gsap.to(cursorOutline, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'white',
          duration: 0.3,
        });
        gsap.to(cursorDot, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isVisible]);

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
      />
      
      <div 
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-[border-color,background-color] duration-300"
      />
    </>
  );
}
