import ProjectSection from '../ProjectSection';
import DetailGrid from '../DetailGrid';
import { chainsawManData as data } from '../data/chainsawMan';

type Props = {
  onOpen: (publicId: string) => void;
};

// Suit shown on the /gallery page: header + Context 01 | zoom study | Context 02 (3 views).
export default function ChainsawMan({ onOpen }: Props) {
  return (
    <ProjectSection id="chainsaw-man" data={data} onOpen={onOpen}>
      <DetailGrid studies={1} studyInMiddle imageIds={[...data.gallery]} details={data.zoomDetails.map((d) => ({ ...d }))} onOpen={onOpen} />
    </ProjectSection>
  );
}
