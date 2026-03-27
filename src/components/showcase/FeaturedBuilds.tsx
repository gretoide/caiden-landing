import { useState } from 'react';
import ImageModal from '../ui/ImageModal';
import EldenRing from './sections/EldenRing';
import DiabloIV from './sections/DiabloIV';
import Skyrim from './sections/Skyrim';

export default function FeaturedBuilds() {
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);

  return (
    <div id="work" className="bg-black w-full flex flex-col">
      <EldenRing onOpen={setExpandedPublicId} />
      <DiabloIV onOpen={setExpandedPublicId} />
      <Skyrim onOpen={setExpandedPublicId} />

      {expandedPublicId && (
        <ImageModal key={expandedPublicId} publicId={expandedPublicId} onClose={() => setExpandedPublicId(null)} />
      )}
    </div>
  );
}
