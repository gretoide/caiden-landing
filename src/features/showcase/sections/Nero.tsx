import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectSection from '../ProjectSection';
import DetailGrid from '../DetailGrid';
import Image from '../../../shared/ui/Image';
import { neroData as data } from '../data/nero';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpen: (publicId: string) => void;
};

// Suit shown on the /gallery page: header + Context 01 | Study | Context 02.
export default function Nero({ onOpen }: Props) {
  const featureRef = useRef<HTMLDivElement>(null);

  // The grid above slides its photos up as it appears; the arm shot does the same, on its own trigger,
  // so it is never on screen while those photos are still moving over it.
  useGSAP(() => {
    gsap.from(featureRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: featureRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
    });
  });

  return (
    <ProjectSection id="nero" data={data} onOpen={onOpen}>
      <DetailGrid studies={1} studyInMiddle imageIds={[...data.gallery]} details={data.zoomDetails.map((d) => ({ ...d }))} onOpen={onOpen} />
      {/* Wide shot of the Devil Bringer arm */}
      <div ref={featureRef} className="relative group overflow-hidden border border-white/5 mt-2 md:mt-3 aspect-[4/3] sm:aspect-[2/1]">
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
