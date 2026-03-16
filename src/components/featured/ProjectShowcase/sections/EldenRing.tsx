import ProjectShowcase from '../ProjectShowcase';
import MosaicGallery from '../MosaicGallery';
import ZoomFocusGrid from '../ZoomFocusGrid';
import ShowcaseBanner from '../ShowcaseBanner';
import { PROJECTS } from '../../../../content/projects';

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
        overlayDetails={[
          {
            title: "The Crucible Knight",
            description: "Reinforced polymer & Hand-painted oxidation. Integrated harness system for 20kg load-bearing."
          },
          {
            title: "Artifact Anatomy",
            description: "Composite fiberglass & resin foundation. 1:1 Scale accuracy for high-fidelity cinematography."
          }
        ]}
      />
    </ProjectShowcase>
  );
}
