import { useEffect, useRef, useState, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  minHeight?: string;
  className?: string;
}

/**
 * SectionLoader wraps lazy components and only renders them when they 
 * enter the viewport (plus a margin). This prevents early JS execution 
 * and image fetching for sections the user hasn't reached yet.
 */
export default function SectionLoader({ 
  children, 
  threshold = 0.01, 
  rootMargin = '400px', 
  minHeight = '600px',
  className = ''
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`}
      style={{ minHeight: isVisible ? 'auto' : minHeight }}
    >
      {isVisible ? children : null}
    </div>
  );
}
