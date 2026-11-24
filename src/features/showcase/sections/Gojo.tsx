import ProjectSection from '../ProjectSection';
import DetailGrid from '../DetailGrid';
import { gojoData as data } from '../data/gojo';

type Props = {
  onOpen: (publicId: string) => void;
};

// Suit shown on the /gallery page: header + Context 01 | Study | Context 02.
export default function Gojo({ onOpen }: Props) {
  return (
    <ProjectSection id="gojo" data={data} onOpen={onOpen}>
      <DetailGrid studies={1} studyInMiddle imageIds={[...data.gallery]} details={data.zoomDetails.map((d) => ({ ...d }))} onOpen={onOpen} />
    </ProjectSection>
  );
}
