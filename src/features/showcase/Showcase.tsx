import { useState, useRef, lazy, Suspense } from 'react';
import Lightbox from '../../shared/ui/Lightbox';
import { useLazyPreload } from '../../shared/hooks/useLazyPreload';

const EldenRing = lazy(() => import('./sections/EldenRing'));
const DiabloIV = lazy(() => import('./sections/DiabloIV'));
const Skyrim = lazy(() => import('./sections/Skyrim'));

const SectionPlaceholder = ({ height = '800px' }) => (
  <div className="w-full bg-black border-t border-white/5 animate-pulse" style={{ minHeight: height }}>
    <div className="w-full h-full bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
       <div className="w-8 h-8 border-2 border-white/10 border-t-brand-400 rounded-full animate-spin" />
    </div>
  </div>
);

export default function Showcase() {
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);
  
  const eldenRef = useRef<HTMLDivElement>(null);
  const diabloRef = useRef<HTMLDivElement>(null);
  const skyrimRef = useRef<HTMLDivElement>(null);

  // Pre-fetch chunks when near
  useLazyPreload(eldenRef, () => import('./sections/EldenRing'));
  useLazyPreload(diabloRef, () => import('./sections/DiabloIV'));
  useLazyPreload(skyrimRef, () => import('./sections/Skyrim'));

  return (
    <div className="bg-black w-full flex flex-col">
      <div ref={eldenRef}>
        <Suspense fallback={<SectionPlaceholder />}>
          <EldenRing onOpen={setExpandedPublicId} />
        </Suspense>
      </div>

      <div ref={diabloRef}>
        <Suspense fallback={<SectionPlaceholder />}>
          <DiabloIV onOpen={setExpandedPublicId} />
        </Suspense>
      </div>

      <div ref={skyrimRef}>
        <Suspense fallback={<SectionPlaceholder />}>
          <Skyrim onOpen={setExpandedPublicId} />
        </Suspense>
      </div>

      {expandedPublicId && (
        <Lightbox key={expandedPublicId} publicId={expandedPublicId} onClose={() => setExpandedPublicId(null)} />
      )}
    </div>
  );
}
