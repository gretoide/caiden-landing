import { ImageOff } from 'lucide-react';

type Props = {
  /** Show the loader (usually `!loaded`). It fades out when false. */
  active: boolean;
  /** Replaces the shimmer with a quiet "unavailable" state. */
  error?: boolean;
  className?: string;
};

/**
 * Reusable loading overlay for images and videos: a soft brand-tinted shimmer that sits on top of
 * the media (and its blurred placeholder) until it finishes loading. The parent must be positioned.
 */
export default function MediaLoader({ active, error = false, className = '' }: Props) {
  const visible = active || error;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
          <ImageOff className="w-5 h-5 text-white/25" strokeWidth={1.5} />
        </div>
      ) : (
        <div className="absolute inset-0 bg-white/[0.02] bg-[linear-gradient(110deg,transparent_30%,rgba(96,165,250,0.10)_45%,rgba(255,255,255,0.10)_50%,rgba(96,165,250,0.10)_55%,transparent_70%)] bg-[length:250%_100%] animate-shimmer motion-reduce:animate-none" />
      )}
    </div>
  );
}
