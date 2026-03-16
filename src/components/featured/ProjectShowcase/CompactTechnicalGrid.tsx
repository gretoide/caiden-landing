import { useRef } from 'react';
import OptimizedImage from '../../OptimizedImage';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ZoomDetail = {
  id: number;
  label: string;
  zoom: number;
  position: string;
};

type Props = {
  imageIds: string[]; // Two static images + one zoomable
  details: ZoomDetail[];
  onOpen: (publicId: string) => void;
  reversed?: boolean;
};

export default function CompactTechnicalGrid({ imageIds, details, onOpen, reversed = false }: Props) {
  const [img1, img2, zoomImg] = imageIds;
  const containerRef = useRef<HTMLDivElement>(null);
  const studyDetails = (() => {
    const base = details.slice(0, 2);
    if (base.length === 2) return base;
    if (base.length === 1) {
      return [
        base[0],
        { id: base[0].id + 1000, label: 'Overview', zoom: 1.2, position: '50% 50%' },
      ];
    }
    return [
      { id: 1001, label: 'Detail', zoom: 1.6, position: '50% 45%' },
      { id: 1002, label: 'Overview', zoom: 1.2, position: '50% 50%' },
    ];
  })();
  const orderedStudyDetails = (() => {
    if (studyDetails.length !== 2) return studyDetails;
    return studyDetails[0].zoom >= studyDetails[1].zoom ? studyDetails : [studyDetails[1], studyDetails[0]];
  })();

  useGSAP(() => {
    const items = gsap.utils.toArray('.compact-item-anim', containerRef.current);
    
    gsap.from(items, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 h-auto md:h-[70vh]">
      {/* Zoom Study Column (Ordered first or last) */}
      <div className={`compact-item-anim md:col-span-4 grid grid-rows-2 gap-2 md:gap-3 h-[60vh] md:h-full ${reversed ? 'md:order-last' : 'md:order-first'}`}>
        {orderedStudyDetails.map((detail, idx) => (
          <div key={detail.id} className="relative group overflow-hidden border border-white/5 h-full">
            <OptimizedImage
              publicId={zoomImg}
              alt={detail.label}
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
              zoom={detail.zoom}
              objectPosition={detail.position}
              onClick={() => onOpen(zoomImg)}
            />
            <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none"></div>
            <div className="absolute bottom-3 left-3 text-[8px] text-white/30 tracking-[0.2em] uppercase bg-black/40 px-2 py-1 backdrop-blur-sm">
              Study 0{idx + 1} // {detail.label}
            </div>
          </div>
        ))}
      </div>

       {/* Static View 1 */}
       <div className="compact-item-anim md:col-span-4 h-[40vh] md:h-full relative group overflow-hidden border border-white/5">
         <OptimizedImage
           publicId={img1}
           alt="Compact View 1"
           variant="full"
           className="w-full h-full"
           imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
           onClick={() => onOpen(img1)}
         />
         <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none"></div>
         <div className="absolute top-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase bg-black/40 px-2 py-1 backdrop-blur-sm pointer-events-none">
           Context // 01
         </div>
       </div>

       {/* Static View 2 */}
       <div className="compact-item-anim md:col-span-4 h-[40vh] md:h-full relative group overflow-hidden border border-white/5">
         <OptimizedImage
           publicId={img2}
           alt="Compact View 2"
           variant="full"
           className="w-full h-full"
           imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
           onClick={() => onOpen(img2)}
         />
         <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none"></div>
         <div className="absolute top-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase bg-black/40 px-2 py-1 backdrop-blur-sm pointer-events-none">
           Context // 02
         </div>
       </div>
     </div>
   );
 }
