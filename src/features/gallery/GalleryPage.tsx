import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Layout from '../layout/Layout';
import Lightbox from '../../shared/ui/Lightbox';
import EldenRing from '../showcase/sections/EldenRing';
import DiabloIV from '../showcase/sections/DiabloIV';
import Skyrim from '../showcase/sections/Skyrim';

const SUITS = [
  { id: 'elden-ring', label: 'Elden Ring' },
  { id: 'diablo-iv', label: 'Diablo IV' },
  { id: 'skyrim', label: 'Skyrim' },
];

/**
 * Go back to the landing. When this tab was opened from the landing (it keeps `window.opener` thanks
 * to rel="opener"), scroll that tab to `sectionId` if given, focus it and close this one, so the user
 * is back where they were. If the original tab is gone (or this page was opened directly), navigate
 * here instead.
 */
function returnToSite(e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) {
  // Let modified clicks (new tab/window) behave like a normal link.
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const opener = window.opener as Window | null;
  let sameOriginOpener = false;
  try {
    sameOriginOpener = !!opener && !opener.closed && opener.location.origin === window.location.origin;
  } catch {
    sameOriginOpener = false; // cross-origin opener: not ours
  }
  if (!sameOriginOpener || !opener) return; // fall back to the link's own href in this tab
  e.preventDefault();
  const href = e.currentTarget.href;
  if (sectionId) {
    opener.document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    opener.history.replaceState(null, '', `#${sectionId}`);
  }
  opener.focus();
  window.close();
  // Some browsers refuse to close a tab; if we are still here, just navigate in this tab.
  window.setTimeout(() => {
    window.location.href = href;
  }, 150);
}

/**
 * Full gallery page (/gallery), opened in a new tab from the landing's "Full gallery" links.
 * Shows every suit in its original full-screen layout, without collapsibles.
 */
export default function GalleryPage() {
  const [expandedPublicId, setExpandedPublicId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Full Gallery | CAIDEN DRI';
  }, []);

  // Opened as /gallery#skyrim: jump to that suit once the sections are on the page.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    const frame = requestAnimationFrame(jump);
    // Images above can still change the layout while loading: settle again once the page has loaded.
    window.addEventListener('load', jump, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', jump);
    };
  }, []);

  return (
    <Layout>
      <header className="relative bg-black pt-28 md:pt-40 pb-12 md:pb-16 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.12),transparent_60%)] pointer-events-none" />
        <div className="relative container mx-auto px-6">
          <a
            href="/#work"
            onClick={(e) => returnToSite(e)}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] transition-colors mb-10 md:mb-14"
          >
            <ArrowLeft size={14} aria-hidden /> Back to site
          </a>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-[1px] bg-brand-400/80" />
            <span className="text-brand-400 font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">Portfolio</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif text-white tracking-wide leading-none">Full Gallery</h1>
          <p className="text-white/50 font-sans mt-6 max-w-xl leading-relaxed">
            Every photo of each build, in detail. Click any image to view it full size.
          </p>
          <nav aria-label="Suits" className="flex flex-wrap gap-3 mt-10">
            {SUITS.map((suit) => (
              <a
                key={suit.id}
                href={`#${suit.id}`}
                className="px-4 py-2.5 bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-white/[0.06] text-white/70 hover:text-white text-[10px] md:text-xs font-sans uppercase tracking-[0.25em] transition-colors"
              >
                {suit.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="bg-black w-full flex flex-col">
        <EldenRing onOpen={setExpandedPublicId} />
        <DiabloIV onOpen={setExpandedPublicId} />
        <Skyrim onOpen={setExpandedPublicId} />
      </div>

      <section className="bg-black border-t border-white/5 py-20 md:py-28">
        <div className="container mx-auto px-6 flex flex-col items-center text-center gap-8">
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide">Have a build in mind?</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/#contact"
              onClick={(e) => returnToSite(e, 'contact')}
              className="px-8 py-4 bg-white text-black font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-brand-400 transition-colors"
            >
              Get in touch
            </a>
            <a
              href="/#work"
              onClick={(e) => returnToSite(e)}
              className="px-8 py-4 bg-white/[0.03] backdrop-blur-md border border-white/15 hover:border-white/40 text-white font-sans font-bold text-xs uppercase tracking-[0.3em] transition-colors"
            >
              Back to site
            </a>
          </div>
        </div>
      </section>

      {expandedPublicId && (
        <Lightbox key={expandedPublicId} publicId={expandedPublicId} onClose={() => setExpandedPublicId(null)} />
      )}
    </Layout>
  );
}
