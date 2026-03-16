import type { ReactNode } from 'react';

export type ZoomDetail = {
  id: number;
  label: string;
  zoom: number;
  position: string;
};

export type ProjectShowcaseData = {
  title: ReactNode;
  subtitle: string;
  subtitleClassName?: string;
  description: string;
  descBorderClassName?: string;
  main: string;
  banner?: string;
  bg: string;
  gallery: readonly string[];
  zoomDetails: ZoomDetail[];
};

export const PROJECTS: Record<string, ProjectShowcaseData> = {
  eldenRing: {
    title: 'Elden Ring',
    subtitle: 'Shadow of the Erdtree — 2024',
    subtitleClassName: 'text-brand-400',
    description:
      'Built to match the brutal, gothic world of the Lands Between. High-fidelity craftsmanship with active motorized components.',
    descBorderClassName: 'border-brand-400',
    main: 'elden_ring_6_k5z39c',
    banner: 'elden_ring_1_e7ast7',
    // Note: this points to an existing Cloudinary asset path. Keep as-is unless you rename it in Cloudinary.
    bg: 'v1773586265/4d1442bd6c1ab961e1fdb99498c10bfc_x51l89.jpg',
    gallery: ['elden_ring_5_nbxteg', 'elden_ring_10_n1jah8', 'elden_ring_8_gmazch', 'elden_ring_7_mpj69h'],
    zoomDetails: [
      { id: 1, label: 'Torso', zoom: 1.8, position: '10% 90%' },
      { id: 2, label: 'Leather', zoom: 2.5, position: '55% 50%' },
      { id: 3, label: 'Metal', zoom: 2.5, position: '80% 90%' },
    ],
  },
  diabloIV: {
    title: 'Diablo IV',
    subtitle: 'Blizzard Ent. — 2023',
    subtitleClassName: 'text-[#dc2626]',
    description:
      'Built to match the brutal, gothic world of Sanctuary. The core structure uses reinforced fiberglass for durability.',
    descBorderClassName: 'border-[#dc2626]',
    main: 'diablo_iv_5_k4ddrg',
    bg: 'diablo_iv_4_hwuzom',
    gallery: ['diablo_iv_3_yuwkeo', 'diablo_iv_5_k4ddrg', 'diablo_iv_5_k4ddrg', 'diablo_iv_3_yuwkeo'],
    zoomDetails: [
      { id: 1, label: 'Shoulders', zoom: 3.5, position: '50% 30%' },
      { id: 2, label: 'Texture', zoom: 3.2, position: '60% 90%' },
    ],
  },
  skyrim: {
    title: 'Skyrim',
    subtitle: 'Bethesda — 2011',
    subtitleClassName: 'text-[#9ca3af]',
    description: "Forging the Dragonborn's legacy. Intricate weathering and Nordic motifs carved into every piece.",
    descBorderClassName: 'border-[#9ca3af]',
    main: 'skyrim_7_yqhwyx',
    bg: 'skyrim_6_b9efrf',
    gallery: ['skyrim_6_b9efrf', 'skyrim_8_nabnf5', 'skyrim_8_nabnf5', 'skyrim_7_yqhwyx'],
    zoomDetails: [
      { id: 1, label: 'Helmet', zoom: 2.8, position: '50% 15%' },
      { id: 2, label: 'Engraving', zoom: 1.5, position: '40% 120%' },
    ],
  },
  chainsawMan: {
    title: 'Chainsaw Man',
    subtitle: 'MAPPA — 2023',
    subtitleClassName: 'text-[#f97316]',
    description:
      'A highly complex helmet and weapon rig prioritizing visual accuracy. Incorporates active motorized electronics.',
    descBorderClassName: 'border-[#f97316]',
    main: 'chainsaw_3_uligns',
    bg: 'chainsaw_3_uligns',
    gallery: ['chainsaw_2_qwerzf', 'chainsaw_1_azfqly', 'chainsaw_2_qwerzf', 'chainsaw_1_azfqly'],
    zoomDetails: [
      { id: 2, label: 'Engine', zoom: 1.5, position: '40% 10%' },
      { id: 1, label: 'Saw Detail', zoom: 1.0, position: '50% 20%' },
    ],
  },
  hipo: {
    title: 'Hiccup',
    subtitle: 'How to Train Your Dragon — 2022',
    subtitleClassName: 'text-[#dc2626]',
    description: 'Study of organic surfaces and anatomy through a multi-material sculpture build.',
    descBorderClassName: 'border-[#dc2626]',
    main: 'hipo_1_lsxprc',
    bg: 'hipo_2_j75ppj',
    gallery: ['hipo_1_lsxprc', 'hipo_2_j75ppj', 'hipo_3_d3dn5v'],
    zoomDetails: [{ id: 1, label: 'Detail', zoom: 2.2, position: '50% 45%' }],
  },
} as const;
