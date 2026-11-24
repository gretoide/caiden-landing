import ProjectSection from '../ProjectSection';
import DetailGrid from '../DetailGrid';
import { spyFamilyData as data } from '../data/spyFamily';

type Props = {
  onOpen: (publicId: string) => void;
};

// Suit shown on the /gallery page: header + Context 01 | Study | Context 02.
export default function SpyFamily({ onOpen }: Props) {
  return (
    <ProjectSection id="spy-family" data={data} onOpen={onOpen}>
      <DetailGrid studies={1} studyInMiddle imageIds={[...data.gallery]} details={data.zoomDetails.map((d) => ({ ...d }))} onOpen={onOpen} />
    </ProjectSection>
  );
}
