import { ImageOff } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

type Props = {
  /** The media is still loading (usually `!loaded`). */
  active: boolean;
  /** The media failed: show a quiet "unavailable" icon instead of the spinner. */
  error?: boolean;
  className?: string;
};

/**
 * Loading state for images and videos. While the media loads normally nothing is shown (the blurred
 * placeholder / poster is enough); only if it is still missing after a short delay while on screen
 * does the classic spinner with "Loading" appear (see LoadingSpinner). It disappears as soon as the
 * media loads, fails, or after a timeout, so it can never stay stuck. The parent must be positioned.
 */
export default function MediaLoader({ active, error = false, className = '' }: Props) {
  if (error) {
    return (
      <div
        data-media-loader
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[1] flex items-center justify-center bg-white/[0.02] ${className}`}
      >
        <ImageOff className="w-5 h-5 text-white/25" strokeWidth={1.5} />
      </div>
    );
  }
  if (!active) return null;
  return (
    <div data-media-loader className={`pointer-events-none absolute inset-0 z-[1] ${className}`}>
      <LoadingSpinner className="absolute inset-0" />
    </div>
  );
}
