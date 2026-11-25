import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Layout from '../layout/Layout';
import SuitNav, { type Suit } from './SuitNav';
import Lightbox from '../../shared/ui/Lightbox';
import EldenRing from '../showcase/sections/EldenRing';
import DiabloIV from '../showcase/sections/DiabloIV';
import Skyrim from '../showcase/sections/Skyrim';
import ChainsawMan from '../showcase/sections/ChainsawMan';
import Hipo from '../showcase/sections/Hipo';
import AttackOnTitan from '../showcase/sections/AttackOnTitan';
import Gojo from '../showcase/sections/Gojo';
import Hippolyta from '../showcase/sections/Hippolyta';
import Leon from '../showcase/sections/Leon';
import Nero from '../showcase/sections/Nero';
import SpyFamily from '../showcase/sections/SpyFamily';
import StarWars from '../showcase/sections/StarWars';
import CompactBuilds from '../showcase/sections/CompactBuilds';
import { compactBuilds, propBuilds } from '../showcase/data/compactBuilds';
import { SCROLL_TO_SKILLS_MESSAGE } from '../../shared/lib/scrollToSkills';

// `group` gives the side index its sections.
const SUITS: Suit[] = [
  { id: 'elden-ring', label: 'Elden Ring', group: 'Studio builds' },
  { id: 'diablo-iv', label: 'Diablo IV', group: 'Studio builds' },
  { id: 'skyrim', label: 'Skyrim', group: 'Studio builds' },
  { id: 'chainsaw-man', label: 'Chainsaw Man', group: 'Studio builds' },
  { id: 'hipo', label: 'Hiccup', group: 'Characters' },
  { id: 'attack-on-titan', label: 'Attack on Titan', group: 'Characters' },
  { id: 'gojo', label: 'Gojo', group: 'Characters' },
  { id: 'hippolyta', label: 'Hippolyta', group: 'Characters' },
  { id: 'leon', label: 'Leon', group: 'Characters' },
  { id: 'nero', label: 'Nero', group: 'Characters' },
  { id: 'spy-family', label: 'Spy x Family', group: 'Characters' },
  { id: 'star-wars', label: 'Star Wars', group: 'Characters' },
  { id: 'aion', label: 'Aion', group: 'More builds' },
  { id: 'hazbin-hotel', label: 'Hazbin Hotel', group: 'More builds' },
  { id: 'vikings', label: 'Vikings', group: 'More builds' },
  { id: 'zombie', label: 'Zombie', group: 'More builds' },
  { id: 'props', label: 'Props & Weapons', group: 'Props' },
];

// Set when one of the "back" links already decided where the landing tab should be.
let returnHandled = false;

/** Ask the landing tab to show the Skills section (heading under the navbar, slides in view). */
function showSkillsInLanding(opener: Window, behavior: 'smooth' | 'instant') {
  opener.postMessage({ type: SCROLL_TO_SKILLS_MESSAGE, behavior }, window.location.origin);
}

/** The landing tab that opened this one, if it is still there and same-origin. */
function landingOpener(): Window | null {
  const opener = window.opener as Window | null;
  try {
    return opener && !opener.closed && opener.location.origin === window.location.origin ? opener : null;
  } catch {
    return null; // cross-origin opener: not ours
  }
}

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
    if (sectionId === 'skills') showSkillsInLanding(opener, 'smooth');
    else opener.document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    opener.history.replaceState(null, '', `#${sectionId}`);
  }
  returnHandled = true;
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
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Full Gallery | CAIDEN DRI';
  }, []);

  // Closing this tab (not via one of the links above) leaves the landing tab on the Skills section.
  useEffect(() => {
    const onClose = () => {
      if (returnHandled) return;
      const opener = landingOpener();
      if (opener) showSkillsInLanding(opener, 'instant');
    };
    window.addEventListener('pagehide', onClose);
    return () => window.removeEventListener('pagehide', onClose);
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
      {/* No visible title: the page opens straight on the builds and the side index. */}
      <h1 className="sr-only">Full Gallery</h1>
      {/* Below xl (the side index is hidden there): the list of suits to jump to. */}
      <header className="relative bg-black pt-24 md:pt-32 pb-8 md:pb-12 border-b border-white/5 overflow-hidden xl:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.12),transparent_60%)] pointer-events-none" />
        <div className="relative container mx-auto px-6">
          <nav aria-label="Suits overview" className="flex flex-wrap gap-3">
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

      {/* Vertical index on the right edge: follows the scroll, opens on hover, click to jump. */}
      <SuitNav suits={SUITS} galleryRef={galleryRef} />

      {/* On xl the content of each build makes room for the side index on the right (backgrounds stay full width). */}
      <div ref={galleryRef} className="bg-black w-full flex flex-col xl:[&_.container]:pr-56">
        <EldenRing onOpen={setExpandedPublicId} />
        <DiabloIV onOpen={setExpandedPublicId} />
        <Skyrim onOpen={setExpandedPublicId} />
        <ChainsawMan onOpen={setExpandedPublicId} />
        <Hipo onOpen={setExpandedPublicId} />
        <AttackOnTitan onOpen={setExpandedPublicId} />
        <Gojo onOpen={setExpandedPublicId} />
        <Hippolyta onOpen={setExpandedPublicId} />
        <Leon onOpen={setExpandedPublicId} />
        <Nero onOpen={setExpandedPublicId} />
        <SpyFamily onOpen={setExpandedPublicId} />
        <StarWars onOpen={setExpandedPublicId} />
        <CompactBuilds id="more-builds" heading="More builds" builds={compactBuilds} onOpen={setExpandedPublicId} />
        <CompactBuilds id="props" heading="Props & weapons" builds={propBuilds} onOpen={setExpandedPublicId} />
      </div>

      <section className="bg-black border-t border-white/5 py-20 md:py-28">
        <div className="container mx-auto px-6 flex flex-col items-center text-center gap-4">
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide">There&apos;s more behind the armour</h2>
          <p className="text-white/50 font-sans max-w-md leading-relaxed">The skills and career behind every build.</p>
          {/* Keep exploring first (primary, left); contact stays available on the right */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
            <a
              href="/#skills"
              onClick={(e) => returnToSite(e, 'skills')}
              className="group inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-white text-black font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-brand-400 transition-colors"
            >
              Check my skills
              <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/#contact"
              onClick={(e) => returnToSite(e, 'contact')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/[0.03] backdrop-blur-md border border-white/15 hover:border-white/40 text-white/80 hover:text-white font-sans font-bold text-xs uppercase tracking-[0.3em] transition-colors"
            >
              Get in touch
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
