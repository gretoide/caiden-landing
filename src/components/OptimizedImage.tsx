import { useMemo, useState } from 'react';
import {
  cloudinaryPlaceholderUrl,
  cloudinaryUrl,
  type CloudinaryVariant,
  variantSrcSet,
} from '../lib/cloudinary';

type Props = {
  publicId: string;
  alt: string;
  variant: CloudinaryVariant;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLImageElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLImageElement>) => void;
  onPointerEnter?: () => void;
  onTouchStart?: () => void;
  fill?: boolean;
};

function widthsFor(variant: CloudinaryVariant): number[] {
  switch (variant) {
    case 'thumb':
      return [480, 768, 1024];
    case 'bg':
      return [480, 768, 1024];
    case 'hero':
      return [1200, 1600, 2000];
    case 'full':
    default:
      return [800, 1200, 1600, 2000];
  }
}

export default function OptimizedImage({
  publicId,
  alt,
  variant,
  className,
  imgClassName,
  sizes,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onTouchStart,
  fill = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const widths = useMemo(() => widthsFor(variant), [variant]);
  const src = useMemo(() => cloudinaryUrl(publicId, { variant, width: widths[0] }), [publicId, variant, widths]);
  const srcSet = useMemo(() => variantSrcSet(publicId, variant, widths), [publicId, variant, widths]);
  const placeholder = useMemo(() => cloudinaryPlaceholderUrl(publicId), [publicId]);

  const wrapperClass = [
    className,
    'bg-center bg-cover',
    fill ? 'absolute inset-0' : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  const imageClass = [
    imgClassName,
    fill ? 'absolute inset-0 w-full h-full object-cover' : 'block',
    'transition-[opacity,filter] duration-500 will-change-[opacity,filter]',
    loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass} style={loaded ? undefined : { backgroundImage: `url(${placeholder})` }}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={imageClass}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerEnter={onPointerEnter}
        onTouchStart={onTouchStart}
        draggable={false}
      />
    </div>
  );
}
