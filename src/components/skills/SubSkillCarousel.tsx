import OptimizedImage from '../ui/OptimizedImage';

type Props = {
  publicIds: string[];
  activeIndex: number;
};

export default function SubSkillCarousel({ publicIds, activeIndex }: Props) {
  if (!publicIds || publicIds.length === 0) return null;

  // Ensure index is within bounds
  const safeIndex = ((activeIndex % publicIds.length) + publicIds.length) % publicIds.length;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center">
      {publicIds.map((pid, idx) => {
        const isActive = idx === safeIndex;
        // Optimization: only render the active image and the adjacent ones to save resources
        // But for a cross-fade, we need to keep them in the DOM or let React handle it.
        // Given small gallery sizes, rendering all with opacity control is fast.
        
        return (
          <div
            key={`${pid}-${idx}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Single full-bleed image to ensure no lateral borders */}
            <OptimizedImage
              publicId={pid}
              alt=""
              variant="hero"
              fill
              objectFit="cover"
              objectPosition="center"
              imgClassName="transition-transform duration-[10s] ease-out hover:scale-105"
            />
          </div>
        );
      })}
    </div>
  );
}
