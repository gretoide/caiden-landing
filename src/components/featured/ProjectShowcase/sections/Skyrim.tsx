import ProjectShowcase from '../ProjectShowcase';
import CompactTechnicalGrid from '../CompactTechnicalGrid';
import { PROJECTS } from '../../../../content/images';

type Props = {
  onOpen: (publicId: string) => void;
};

export default function Skyrim({ onOpen }: Props) {
  const data = PROJECTS.skyrim;

  return (
    <ProjectShowcase data={data} onOpen={onOpen}>
      <CompactTechnicalGrid 
        imageIds={[
          data.gallery[0],
          data.gallery[1],
          data.main
        ]}
        details={data.zoomDetails}
        onOpen={onOpen}
        reversed
      />
    </ProjectShowcase>
  );
}
