import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cloudinaryUrl } from '../lib/cloudinary';

const RING_SIZE = 32; // w-8
const LENS_SIZE = 176; // w-44 — bubble magnifier diameter
// Magnification inside the bubble. Kept moderate so the hi-res source stays sharp.
const IMAGE_ZOOM = 1.8;
const ZOOM_SOURCE_WIDTH = 2000;
const POINTER_SELECTOR = 'a, button, [role="button"], [data-cursor="pointer"], .cursor-pointer';

/** Size and viewport offset of the image inside `el` as actually drawn (object-fit: cover + object-position). */
function renderedImageBox(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const img = el.querySelector('img');
  const nw = img?.naturalWidth || 0;
  const nh = img?.naturalHeight || 0;
  if (!img || !nw || !nh) {
    return { w: rect.width, h: rect.height, left: rect.left, top: rect.top };
  }
  const imgRect = img.getBoundingClientRect();
  const scale = Math.max(imgRect.width / nw, imgRect.height / nh);
  const w = nw * scale;
  const h = nh * scale;
  const [posX = '50%', posY = '50%'] = getComputedStyle(img).objectPosition.split(' ');
  const frac = (v: string) => (v.endsWith('%') ? parseFloat(v) / 100 : 0.5);
  return {
    w,
    h,
    left: imgRect.left + (imgRect.width - w) * frac(posX),
    top: imgRect.top + (imgRect.height - h) * frac(posY),
  };
}

export default function Cursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    const spotlight = spotlightRef.current;
    if (!cursorDot || !cursorOutline || !spotlight) return;

    const canZoom = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const dotX = gsap.quickTo(cursorDot, 'x', { duration: 0.15, ease: 'power2.out' });
    const dotY = gsap.quickTo(cursorDot, 'y', { duration: 0.15, ease: 'power2.out' });
    const outlineX = gsap.quickTo(cursorOutline, 'x', { duration: 0.4, ease: 'power3.out' });
    const outlineY = gsap.quickTo(cursorOutline, 'y', { duration: 0.4, ease: 'power3.out' });
    const spotlightX = gsap.quickTo(spotlight, 'x', { duration: 1.2, ease: 'power2.out' });
    const spotlightY = gsap.quickTo(spotlight, 'y', { duration: 1.2, ease: 'power2.out' });

    // ---------- Visibility (hidden until first move, when leaving the window or dragging the scrollbar) ----------
    let visible = false;
    let lastX = 0;
    let lastY = 0;
    const show = (x: number, y: number) => {
      if (visible) return;
      visible = true;
      // Jump to the pointer instead of animating in from the last (edge) position.
      gsap.set([cursorDot, cursorOutline], { x, y });
      gsap.set(spotlight, { x, y });
      dotX(x); dotY(y); outlineX(x); outlineY(y); spotlightX(x); spotlightY(y);
      gsap.to([cursorDot, cursorOutline, spotlight], { opacity: 1, duration: 0.25, overwrite: 'auto' });
    };
    const hide = () => {
      if (!visible) return;
      visible = false;
      gsap.to([cursorDot, cursorOutline, spotlight], { opacity: 0, duration: 0.2, overwrite: 'auto' });
      exitZoom();
      setMode('default');
    };

    // ---------- Modes: default (dot + small ring), pointer (glowing dot), zoom (ring with "+") ----------
    type Mode = 'default' | 'pointer' | 'zoom';
    let mode: Mode | null = null;
    let pressed = false;

    const applyMode = () => {
      const press = pressed ? 0.8 : 1;
      if (mode === 'pointer') {
        gsap.to(cursorOutline, { scale: 0, opacity: visible ? 1 : 0, duration: 0.25, overwrite: 'auto' });
        gsap.to(cursorDot, {
          scale: 4 * press,
          boxShadow: '0 0 24px rgba(96,165,250,0.75)',
          duration: 0.3,
          ease: 'back.out(2)',
          overwrite: 'auto',
        });
        cursorDot.classList.add('animate-pulse');
      } else if (mode === 'zoom') {
        cursorDot.classList.remove('animate-pulse');
        gsap.to(cursorDot, { scale: 0, boxShadow: '0 0 0 rgba(96,165,250,0)', duration: 0.2, overwrite: 'auto' });
        gsap.to(cursorOutline, {
          width: LENS_SIZE,
          height: LENS_SIZE,
          scale: 1,
          borderColor: 'rgba(255,255,255,0.4)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)',
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else {
        cursorDot.classList.remove('animate-pulse');
        gsap.to(cursorDot, {
          scale: 1,
          boxShadow: '0 0 0 rgba(96,165,250,0)',
          duration: 0.2,
          overwrite: 'auto',
        });
        gsap.to(cursorOutline, {
          width: RING_SIZE,
          height: RING_SIZE,
          scale: press,
          borderColor: 'rgba(255,255,255,0.5)',
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
      cursorOutline.dataset.mode = mode ?? 'default';
    };

    const setMode = (next: Mode) => {
      if (next === mode) return;
      mode = next;
      applyMode();
    };

    // ---------- Bubble magnifier (the ring becomes a lens over images) ----------
    let zoomId: string | null = null;

    const enterZoom = (el: HTMLElement, publicId: string) => {
      zoomId = publicId;
      const img = el.querySelector('img');
      // Show the already-loaded image right away, then swap to the hi-res one when ready.
      if (img?.currentSrc) cursorOutline.style.backgroundImage = `url("${img.currentSrc}")`;
      const hiRes = cloudinaryUrl(publicId, { variant: 'full', width: ZOOM_SOURCE_WIDTH });
      const loader = new globalThis.Image();
      loader.onload = () => {
        if (zoomId === publicId) cursorOutline.style.backgroundImage = `url("${hiRes}")`;
      };
      loader.src = hiRes;
    };

    const updateLens = (el: HTMLElement, x: number, y: number) => {
      const box = renderedImageBox(el);
      const half = LENS_SIZE / 2;
      // Point under the pointer, in the coordinates of the image as rendered (object-fit: cover).
      const ix = x - box.left;
      const iy = y - box.top;
      cursorOutline.style.backgroundSize = `${box.w * IMAGE_ZOOM}px ${box.h * IMAGE_ZOOM}px`;
      cursorOutline.style.backgroundPosition = `${half - ix * IMAGE_ZOOM}px ${half - iy * IMAGE_ZOOM}px`;
    };

    const exitZoom = () => {
      if (!zoomId) return;
      zoomId = null;
      cursorOutline.style.backgroundImage = 'none';
    };

    // ---------- Events ----------
    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const { clientX: x, clientY: y } = e;
      lastX = x;
      lastY = y;
      show(x, y);
      dotX(x); dotY(y);
      outlineX(x); outlineY(y);
      spotlightX(x); spotlightY(y);

      const target = e.target as HTMLElement | null;
      const el = canZoom ? target?.closest<HTMLElement>('[data-zoom-src]') : null;
      const publicId = el?.dataset.zoomSrc;

      if (el && publicId) {
        if (publicId !== zoomId) enterZoom(el, publicId);
        updateLens(el, x, y);
        setMode('zoom');
        return;
      }

      exitZoom();
      setMode(target?.closest(POINTER_SELECTOR) ? 'pointer' : 'default');
    };

    const handleDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      // Clicking the page scrollbar: no further moves arrive while dragging, so hide instead of freezing.
      if (e.clientX >= document.documentElement.clientWidth || e.clientY >= document.documentElement.clientHeight) {
        hide();
        return;
      }
      pressed = true;
      applyMode();
    };

    const release = () => {
      if (!pressed) return;
      pressed = false;
      applyMode();
    };

    const handleBlur = () => {
      release();
      hide();
    };

    // The page moved under a still pointer: re-evaluate what is under it so no state (lens, glowing
    // pointer dot) stays stuck on an element that scrolled away.
    let scrollFrame = 0;
    const handleScroll = () => {
      if (!visible || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const under = document.elementFromPoint(lastX, lastY) as HTMLElement | null;
        const el = canZoom ? under?.closest<HTMLElement>('[data-zoom-src]') : null;
        const publicId = el?.dataset.zoomSrc;
        if (el && publicId) {
          if (publicId !== zoomId) enterZoom(el, publicId);
          updateLens(el, lastX, lastY);
          setMode('zoom');
          return;
        }
        exitZoom();
        setMode(under?.closest(POINTER_SELECTOR) ? 'pointer' : 'default');
      });
    };

    const root = document.documentElement;
    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    window.addEventListener('pointercancel', release, { passive: true });
    window.addEventListener('blur', handleBlur);
    window.addEventListener('scroll', handleScroll, { passive: true });
    root.addEventListener('mouseleave', handleBlur);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('scroll', handleScroll);
      root.removeEventListener('mouseleave', handleBlur);
      cancelAnimationFrame(scrollFrame);
    };
  }, []); // Setup once, never recreate

  return (
    <>
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[90] opacity-0 mix-blend-screen hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.125) 0%, rgba(96, 165, 250, 0.025) 40%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block"
      />

      <div
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0 hidden md:block overflow-hidden bg-no-repeat"
      />
    </>
  );
}
