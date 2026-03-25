import { useState } from 'react';
import ImageModal from './ImageModal';
import EldenRing from './featured/ProjectShowcase/sections/EldenRing';
import DiabloIV from './featured/ProjectShowcase/sections/DiabloIV';
import Skyrim from './featured/ProjectShowcase/sections/Skyrim';

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
