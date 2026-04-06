import { useState, lazy, Suspense } from 'react';
import Lightbox from '../../shared/ui/Lightbox';

const EldenRing = lazy(() => import('./sections/EldenRing'));
const DiabloIV = lazy(() => import('./sections/DiabloIV'));
const Skyrim = lazy(() => import('./sections/Skyrim'));

const ShowcaseFallback = () => (
  <div className="w-full h-[600px] bg-black border-y border-white/5 animate-pulse flex items-center justify-center">
    <div className="text-[10px] text-white/20 uppercase tracking-[0.4em]">INITIATING SHOWCASE...</div>
  </div>
);

export default function Showcase() {
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);

  return (
    <div id="work" className="bg-black w-full flex flex-col">
      <Suspense fallback={<ShowcaseFallback />}>
        <EldenRing onOpen={setExpandedPublicId} />
      </Suspense>
      <Suspense fallback={<ShowcaseFallback />}>
        <DiabloIV onOpen={setExpandedPublicId} />
      </Suspense>
      <Suspense fallback={<ShowcaseFallback />}>
        <Skyrim onOpen={setExpandedPublicId} />
      </Suspense>

      {expandedPublicId && (
        <Lightbox key={expandedPublicId} publicId={expandedPublicId} onClose={() => setExpandedPublicId(null)} />
      )}
    </div>
  );
}
