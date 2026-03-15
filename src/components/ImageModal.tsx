import { useEffect, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { cloudinaryUrl } from '../lib/cloudinary';

export default function ImageModal({ publicId, onClose }: { publicId: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.min(Math.max(1, scale - e.deltaY * 0.01), 5);
    setScale(newScale);
    if (newScale === 1) setPosition({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handlePointerUp = () => setIsDragging(false);

  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  const src = cloudinaryUrl(publicId, { variant: 'full', width: 1600 });
  const srcSet = [
    cloudinaryUrl(publicId, { variant: 'full', width: 800 }) + ' 800w',
    cloudinaryUrl(publicId, { variant: 'full', width: 1200 }) + ' 1200w',
    cloudinaryUrl(publicId, { variant: 'full', width: 1600 }) + ' 1600w',
    cloudinaryUrl(publicId, { variant: 'full', width: 2000 }) + ' 2000w',
  ].join(', ');

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-default backdrop-blur-md transition-opacity duration-300 overflow-hidden"
      onClick={onClose}
      onWheel={handleWheel}
    >
      <div className="absolute top-4 left-4 text-white/50 flex items-center gap-2 pointer-events-none z-10 bg-black/50 px-3 py-1.5 rounded-full">
        <ZoomIn className="w-4 h-4" />
        <span className="text-xs uppercase tracking-widest font-sans">Scroll to Zoom / Double-Click</span>
      </div>
      <button
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="w-8 h-8 md:w-12 md:h-12" />
      </button>
      <div
        className="w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <img
          src={src}
          srcSet={srcSet}
          sizes="100vw"
          className="max-w-full max-h-full object-contain cursor-move touch-none animate-in zoom-in duration-300"
          alt="Expanded view"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}

