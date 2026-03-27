import { useMemo, useState } from 'react';
import {
  cloudinaryPlaceholderUrl,
  cloudinaryUrl,
  type CloudinaryVariant,
  variantSrcSet,
} from '../../lib/cloudinary';

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
  objectPosition?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  overflowHidden?: boolean;
  zoom?: number;
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
  objectPosition,
  objectFit = 'cover',
  overflowHidden = true,
  zoom = 1,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const widths = useMemo(() => {
    const baseWidths = widthsFor(variant);
    // Si hay zoom, pedimos resoluciones mucho más altas.
    // Ej: Para zoom 2.5x, multiplicamos la resolución base para no perder nitidez.
    const multiplier = zoom > 1.8 ? 2.5 : zoom > 1.1 ? 1.5 : 1;
    return baseWidths.map((w) => Math.round(w * multiplier));
  }, [variant, zoom]);

  // Si hay zoom, nos saltamos la primera resolución (pequeña) para el src inicial
  const srcWidth = zoom > 1.2 && widths.length > 1 ? widths[1] : widths[0];
  const src = useMemo(() => cloudinaryUrl(publicId, { variant, width: srcWidth }), [publicId, variant, srcWidth]);
  const srcSet = useMemo(() => variantSrcSet(publicId, variant, widths), [publicId, variant, widths]);
  const placeholder = useMemo(() => cloudinaryPlaceholderUrl(publicId), [publicId]);

  const wrapperClass = [
    className,
    'bg-center bg-cover',
    overflowHidden ? 'overflow-hidden' : undefined,
    fill ? 'absolute inset-0' : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  const imageClass = [
    imgClassName,
    fill ? 'absolute inset-0 w-full h-full' : 'block w-full h-full text-transparent',
    'transition-all duration-700 will-change-transform',
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
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          objectPosition: objectPosition ?? 'center',
          transform: zoom !== 1 ? `scale(${zoom})` : 'scale(1)',
          transformOrigin: objectPosition ?? 'center',
        }}
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
