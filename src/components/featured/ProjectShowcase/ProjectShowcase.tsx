import type { ReactNode } from 'react';
import type { ProjectShowcaseData } from '../../../content/images';
import DeferredBackground from '../../DeferredBackground';

export type ShowcaseData = ProjectShowcaseData;

type Props = {
  data: ShowcaseData;
  onOpen: (publicId: string) => void;
  children: ReactNode;
};

export default function ProjectShowcase({ data, children }: Props) {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden py-24 md:py-32 border-t border-white/5">
      <DeferredBackground
        publicId={data.bg}
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none blur-md scale-105"
        style={{ backgroundAttachment: 'fixed' }}
        width={1024}
        rootMargin="1200px"
      />
      
      {/* Gradient Transitions */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-1"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-1"></div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 md:mb-24 max-w-4xl">
           <h2 className="text-6xl md:text-[10rem] font-serif text-white leading-none drop-shadow-2xl">
             {data.title}
           </h2>
           <div className="flex flex-col md:flex-row md:items-end gap-6 mt-6">
             <p className={`text-xl md:text-3xl font-sans tracking-widest font-bold uppercase drop-shadow-md ${data.subtitleClassName || 'text-brand-400'}`}>
               {data.subtitle}
             </p>
             <div className={`h-[1px] flex-grow bg-gradient-to-r ${data.subtitleClassName ? 'from-current' : 'from-brand-400'} to-transparent mb-4 opacity-30 hidden md:block`}></div>
           </div>
           {data.description && (
             <p className={`text-white/50 font-sans mt-8 max-w-sm tracking-wide leading-relaxed pl-4 border-l-2 ${data.descBorderClassName || 'border-brand-400'}`}>
               {data.description}
             </p>
           )}
        </div>

        {children}
      </div>
    </section>
  );
}
