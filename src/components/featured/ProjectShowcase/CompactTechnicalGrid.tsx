import OptimizedImage from '../../OptimizedImage';

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 h-auto md:h-[70vh]">
      {/* Zoom Study Column (Ordered first or last) */}
      <div className={`md:col-span-4 grid grid-rows-2 gap-2 md:gap-3 h-[60vh] md:h-full ${reversed ? 'md:order-first' : 'md:order-last'}`}>
        {details.slice(0, 2).map((detail, idx) => (
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
      <div className="md:col-span-4 h-[40vh] md:h-full relative group overflow-hidden border border-white/5">
        <OptimizedImage
          publicId={img1}
          alt="Compact View 1"
          variant="full"
          className="w-full h-full"
          imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
          onClick={() => onOpen(img1)}
        />
        <div className="absolute top-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase">Context // 01</div>
      </div>

      {/* Static View 2 */}
      <div className="md:col-span-4 h-[40vh] md:h-full relative group overflow-hidden border border-white/5">
        <OptimizedImage
          publicId={img2}
          alt="Compact View 2"
          variant="full"
          className="w-full h-full"
          imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer object-cover"
          onClick={() => onOpen(img2)}
        />
        <div className="absolute top-4 left-4 text-[10px] text-white/30 tracking-[0.3em] uppercase">Context // 02</div>
      </div>
    </div>
  );
}
