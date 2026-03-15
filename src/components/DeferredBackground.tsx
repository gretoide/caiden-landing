import { useEffect, useMemo, useRef, useState } from 'react';
import { cloudinaryPlaceholderUrl, cloudinaryUrl } from '../lib/cloudinary';

type Props = {
  publicId: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  rootMargin?: string;
};

export default function DeferredBackground({
  publicId,
  className,
  style,
  width = 768,
  rootMargin = '300px',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const placeholder = useMemo(() => cloudinaryPlaceholderUrl(publicId), [publicId]);
  const url = useMemo(() => cloudinaryUrl(publicId, { variant: 'bg', width }), [publicId, width]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        backgroundImage: `url(${active ? url : placeholder})`,
      }}
    />
  );
}

