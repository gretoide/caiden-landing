import { useState } from 'react';
import Lightbox from '../../shared/ui/Lightbox';
import EldenRing from './sections/EldenRing';
import DiabloIV from './sections/DiabloIV';
import Skyrim from './sections/Skyrim';

export default function Showcase() {
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);

  return (
    <div className="bg-black w-full flex flex-col">
      <EldenRing onOpen={setExpandedPublicId} />
      <DiabloIV onOpen={setExpandedPublicId} />
      <Skyrim onOpen={setExpandedPublicId} />

      {expandedPublicId && (
        <Lightbox key={expandedPublicId} publicId={expandedPublicId} onClose={() => setExpandedPublicId(null)} />
      )}
    </div>
  );
}
