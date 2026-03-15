import ProjectShowcase from '../ProjectShowcase';
import MosaicGallery from '../MosaicGallery';
import ZoomFocusGrid from '../ZoomFocusGrid';
import ShowcaseBanner from '../ShowcaseBanner';
import { PROJECTS } from '../../../../content/images';

type Props = {
  onOpen: (publicId: string) => void;
};

export default function EldenRing({ onOpen }: Props) {
  const data = PROJECTS.eldenRing;
  
  return (
    <ProjectShowcase data={data} onOpen={onOpen}>
      <ShowcaseBanner 
        publicId={data.banner!} 
        title="Elden Ring" 
        onOpen={onOpen} 
      />
      <MosaicGallery 
        galleryIds={data.gallery} 
        onOpen={onOpen} 
      />
      <ZoomFocusGrid 
        mainImageId={data.main} 
        details={data.zoomDetails} 
        onOpen={onOpen} 
      />
      
      {/* Footer Info specifically for Elden Ring */}
      <div className="mt-12 flex flex-wrap gap-12 border-t border-white/10 pt-8">
        <div className="max-w-xs">
          <p className="text-white font-serif text-xl mb-2">The Crucible Knight</p>
          <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px] leading-relaxed">
            Reinforced polymer & Hand-painted oxidation. Integrated harness system for 20kg load-bearing.
          </p>
        </div>
        <div className="max-w-xs">
          <p className="text-white font-serif text-xl mb-2">Artifact Anatomy</p>
          <p className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px] leading-relaxed">
            Composite fiberglass & resin foundation. 1:1 Scale accuracy for high-fidelity cinematography.
          </p>
        </div>
      </div>
    </ProjectShowcase>
  );
}
