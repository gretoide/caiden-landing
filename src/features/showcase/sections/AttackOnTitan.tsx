import ProjectSection from '../ProjectSection';
import DetailGrid from '../DetailGrid';
import { attackOnTitanData as data } from '../data/attackOnTitan';

type Props = {
  onOpen: (publicId: string) => void;
};

// Suit shown on the /gallery page: header + Context 01 | Study | Context 02.
export default function AttackOnTitan({ onOpen }: Props) {
  return (
    <ProjectSection id="attack-on-titan" data={data} onOpen={onOpen}>
      <DetailGrid studies={1} studyInMiddle context1Position={data.context1Position} imageIds={[...data.gallery]} details={data.zoomDetails.map((d) => ({ ...d }))} onOpen={onOpen} />
    </ProjectSection>
  );
}
