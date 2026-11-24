import ProjectSection from '../ProjectSection';
import DetailGrid from '../DetailGrid';
import { hippolytaData as data } from '../data/hippolyta';

type Props = {
  onOpen: (publicId: string) => void;
};

// Suit shown on the /gallery page: header + Context 01 | Study | Context 02.
export default function Hippolyta({ onOpen }: Props) {
  return (
    <ProjectSection id="hippolyta" data={data} onOpen={onOpen}>
      <DetailGrid studies={1} studyInMiddle imageIds={[...data.gallery]} details={data.zoomDetails.map((d) => ({ ...d }))} onOpen={onOpen} />
    </ProjectSection>
  );
}
