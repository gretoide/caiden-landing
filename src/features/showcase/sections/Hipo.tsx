import ProjectSection from '../ProjectSection';
import DetailGrid from '../DetailGrid';
import { hipoData as data } from '../data/hipo';

type Props = {
  onOpen: (publicId: string) => void;
};

// Suit shown on the /gallery page: header + Context 01 | Study | Context 02.
export default function Hipo({ onOpen }: Props) {
  return (
    <ProjectSection id="hipo" data={data} onOpen={onOpen}>
      <DetailGrid studies={1} studyInMiddle imageIds={[...data.gallery]} details={data.zoomDetails.map((d) => ({ ...d }))} onOpen={onOpen} />
    </ProjectSection>
  );
}
