import { useState } from 'react';
import { IMAGES } from '../content/images';
import ImageModal from './ImageModal';
import EldenRingSection from './featured/EldenRingSection';
import FeatureSplitSection from './featured/FeatureSplitSection';

export default function FeaturedBuilds() {
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);

  return (
    <div id="work" className="bg-black w-full flex flex-col">
      <EldenRingSection imageIds={IMAGES.featured.eldenRing} onOpen={setExpandedPublicId} />

      <FeatureSplitSection
        title="Diablo IV"
        subtitle="Blizzard Ent. — 2023"
        subtitleClassName="text-[#dc2626]"
        description="Built to match the brutal, gothic world of Sanctuary. The core structure uses reinforced fiberglass for durability."
        borderClassName="border-[#dc2626]"
        layout="left"
        bgPublicId={IMAGES.featured.diabloIV.bg}
        image1={{
          publicId: IMAGES.featured.diabloIV.img1,
          alt: 'Diablo 1',
          className: 'w-full h-[50vh] md:h-[65vh]',
          objectClassName: 'object-top',
        }}
        image2={{
          publicId: IMAGES.featured.diabloIV.img2,
          alt: 'Diablo 2',
          className: 'w-full h-[40vh] md:h-[55vh]',
        }}
        onOpen={setExpandedPublicId}
      />

      <FeatureSplitSection
        title="Skyrim"
        subtitle="Bethesda — 2011"
        subtitleClassName="text-[#9ca3af]"
        description="Forging the Dragonborn's legacy. Intricate weathering and Nordic motifs carved into every piece."
        borderClassName="border-[#9ca3af]"
        layout="right"
        bgPublicId={IMAGES.featured.skyrim.bg}
        image1={{
          publicId: IMAGES.featured.skyrim.img1,
          alt: 'Skyrim 1',
          className: 'w-full h-[40vh] md:h-[55vh]',
          objectClassName: 'object-top',
        }}
        image2={{
          publicId: IMAGES.featured.skyrim.img2,
          alt: 'Skyrim 2',
          className: 'w-full h-[50vh] md:h-[65vh]',
        }}
        onOpen={setExpandedPublicId}
      />

      <FeatureSplitSection
        title={
          <>
            Chainsaw <br /> Man
          </>
        }
        subtitle="MAPPA — 2023"
        subtitleClassName="text-[#f97316]"
        description="A highly complex helmet and weapon rig prioritizing visual accuracy. Incorporates active motorized electronics."
        borderClassName="border-[#f97316]"
        layout="left"
        bgPublicId={IMAGES.featured.chainsawMan.bg}
        image1={{
          publicId: IMAGES.featured.chainsawMan.img1,
          alt: 'Chainsaw 1',
          className: 'w-full h-[50vh] md:h-[65vh]',
          objectClassName: 'object-top',
        }}
        image2={{
          publicId: IMAGES.featured.chainsawMan.img2,
          alt: 'Chainsaw 2',
          className: 'w-full h-[40vh] md:h-[55vh]',
        }}
        onOpen={setExpandedPublicId}
      />

      {expandedPublicId && (
        <ImageModal key={expandedPublicId} publicId={expandedPublicId} onClose={() => setExpandedPublicId(null)} />
      )}
    </div>
  );
}
