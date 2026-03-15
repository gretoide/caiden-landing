import ProjectShowcase from '../ProjectShowcase';
import CompactTechnicalGrid from '../CompactTechnicalGrid';
import { PROJECTS } from '../../../../content/images';

type Props = {
  onOpen: (publicId: string) => void;
};

export default function Hipo({ onOpen }: Props) {
  // Access the correctly named property in images.ts
  const data = PROJECTS.hipo;

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
      />
    </ProjectShowcase>
  );
}
