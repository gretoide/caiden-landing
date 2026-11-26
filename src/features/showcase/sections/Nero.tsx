import ProjectSection from '../ProjectSection';
import DetailGrid from '../DetailGrid';
import Image from '../../../shared/ui/Image';
import { neroData as data } from '../data/nero';

type Props = {
  onOpen: (publicId: string) => void;
};

// Suit shown on the /gallery page: header + Context 01 | Study | Context 02.
export default function Nero({ onOpen }: Props) {
  return (
    <ProjectSection id="nero" data={data} onOpen={onOpen}>
      <DetailGrid studies={1} studyInMiddle imageIds={[...data.gallery]} details={data.zoomDetails.map((d) => ({ ...d }))} onOpen={onOpen} />
      {/* Wide shot of the Devil Bringer arm */}
      <div className="relative group overflow-hidden border border-white/5 mt-2 md:mt-4 aspect-[4/3] sm:aspect-[2/1]">
        <Image
          publicId={data.feature}
          alt="Nero's glowing Devil Bringer arm"
          variant="full"
          className="w-full h-full"
          imgClassName="object-cover object-[50%_55%] cursor-pointer transition-transform duration-1000 group-hover:scale-[1.02]"
          sizes="100vw"
          onClick={() => onOpen(data.feature)}
        />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 text-[7px] md:text-[10px] text-white/50 tracking-[0.3em] uppercase z-20 pointer-events-none">
          Devil Bringer // LED arm
        </div>
      </div>
    </ProjectSection>
  );
}
