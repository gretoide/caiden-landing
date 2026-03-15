import OptimizedImage from '../../OptimizedImage';

type ZoomDetail = {
  id: number;
  label: string;
  zoom: number;
  position: string;
};

type OverlayDetail = {
  title: string;
  description: string;
};

type Props = {
  mainImageId: string;
  details: ZoomDetail[];
  onOpen: (publicId: string) => void;
  overlayDetails?: OverlayDetail[];
};

export default function ZoomFocusGrid({ mainImageId, details, onOpen, overlayDetails }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 h-auto md:h-[120vh]">
      {/* Main View - Large Left */}
      <div className="md:col-span-7 h-[60vh] md:h-full relative group">
        <OptimizedImage
          publicId={mainImageId}
          alt="Main Showcase View"
          variant="full"
          className="w-full h-full"
          imgClassName="grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 cursor-pointer"
          sizes="(min-width: 1024px) 60vw, 100vw"
          onClick={() => onOpen(mainImageId)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Overlay Details */}
        {overlayDetails && (
          <div className="absolute bottom-16 left-6 right-6 flex flex-wrap gap-8 md:gap-12 animate-in fade-in duration-1000">
            {overlayDetails.map((detail, idx) => (
              <div key={idx} className="max-w-xs drop-shadow-lg">
                <p className="text-white font-serif text-lg md:text-xl mb-1">{detail.title}</p>
                <p className="text-white/70 font-sans uppercase tracking-[0.2em] text-[8px] md:text-[10px] leading-relaxed">
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="absolute bottom-6 left-6">
          <span className="text-white/40 font-sans text-xs tracking-widest uppercase italic">Master Composition</span>
        </div>
      </div>

      {/* Right Column - Details */}
      <div className="md:col-span-5 grid grid-cols-1 gap-2 md:gap-4 h-auto md:h-full">
        {/* Top Detail - First Zoom */}
        {details[0] && (
          <div className="h-[40vh] md:h-full relative group overflow-hidden border border-white/5">
            <OptimizedImage
              publicId={mainImageId}
              alt={details[0].label}
              variant="full"
              className="w-full h-full"
              imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
              zoom={details[0].zoom}
              objectPosition={details[0].position}
              sizes="(min-width: 1024px) 40vw, 100vw"
              onClick={() => onOpen(mainImageId)}
            />
            <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none"></div>
            <div className="absolute top-4 right-4 text-[10px] text-white/30 tracking-[0.3em] uppercase">Focus 01 // {details[0].label}</div>
          </div>
        )}

        {/* Bottom Details Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 h-[40vh] md:h-full">
          {details.slice(1, 3).map((detail, idx) => (
            <div key={detail.id} className="relative group overflow-hidden border border-white/5">
              <OptimizedImage
                publicId={mainImageId}
                alt={detail.label}
                variant="full"
                className="w-full h-full"
                imgClassName="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                zoom={detail.zoom}
                objectPosition={detail.position}
                onClick={() => onOpen(mainImageId)}
              />
              <div className="absolute inset-0 border-[0.5px] border-white/10 pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 text-[8px] text-white/30 tracking-[0.2em] uppercase">Focus 0{idx + 2} // {detail.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
