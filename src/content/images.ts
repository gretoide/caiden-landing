import type { ReactNode } from 'react';

export type GalleryItem = {
  id: string;
  title?: string;
  description?: string;
  technicalInfo?: string[];
  publicId: string;
  additionalImages?: string[];
};

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
    description: 'Built to match the brutal, gothic world of the Lands Between. High-fidelity craftsmanship with active motorized components.',
    descBorderClassName: 'border-brand-400',
    main: 'elden_ring_6_k5z39c',
    banner: 'elden_ring_1_e7ast7',
    bg: 'v1773586265/4d1442bd6c1ab961e1fdb99498c10bfc_x51l89.jpg',
    gallery: [
      'elden_ring_5_nbxteg',
      'elden_ring_10_n1jah8',
      'elden_ring_8_gmazch',
      'elden_ring_7_mpj69h',
    ],
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
    description: 'Built to match the brutal, gothic world of Sanctuary. The core structure uses reinforced fiberglass for durability.',
    descBorderClassName: 'border-[#dc2626]',
    main: 'diablo_iv_5_k4ddrg',
    bg: 'diablo_iv_4_hwuzom',
    gallery: [
      'diablo_iv_3_yuwkeo',
      'diablo_iv_5_k4ddrg',
      'diablo_iv_5_k4ddrg',
      'diablo_iv_3_yuwkeo',
    ],
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
    gallery: [
      'skyrim_6_b9efrf',
      'skyrim_8_nabnf5',
      'skyrim_8_nabnf5',
      'skyrim_7_yqhwyx',
    ],
    zoomDetails: [
      { id: 1, label: 'Helmet', zoom: 2.8, position: '50% 15%' },
      { id: 2, label: 'Engraving', zoom: 1.5, position: '40% 120%' },
    ],
  },
  chainsawMan: {
    title: 'Chainsaw Man',
    subtitle: 'MAPPA — 2023',
    subtitleClassName: 'text-[#f97316]',
    description: 'A highly complex helmet and weapon rig prioritizing visual accuracy. Incorporates active motorized electronics.',
    descBorderClassName: 'border-[#f97316]',
    main: 'chainsaw_3_uligns',
    bg: 'chainsaw_3_uligns',
    gallery: [
      'chainsaw_2_qwerzf',
      'chainsaw_1_azfqly',
      'chainsaw_2_qwerzf',
      'chainsaw_1_azfqly',
    ],
    zoomDetails: [
      { id: 1, label: 'Saw Detail', zoom: 1.0, position: '50% 20%' },
      { id: 2, label: 'Engine', zoom: 1.5, position: '40% 10%' },
    ],
  },
};

export type SkillItem = string;

export type CraftsmanshipCategory = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  expandedDetails: string;
  publicId: string;
  projects: GalleryItem[];
};

export const TECHNICAL_SKILLS: Record<string, SkillItem[]> = {
  fabrication: [
    'Fiberglass',
    'Resin casting & mold making',
    'Foam crafting',
    'Polyurethane',
    'Polyethylene',
    'Silicone rubber molds',
    'Thermoforming materials',
    'Wood',
    'Impresión 3D',
    'Professional handheld power tools'
  ],
  finishing: [
    'Painting & airbrushing',
    'Weathering',
    'SFX',
    'Sculpting',
    'LED design',
    'Electronics'
  ],
  digital: [
    '3D Design (Blender)',
    '3D Printing',
    'Drawing'
  ]
};

export const CRAFTSMANSHIP: CraftsmanshipCategory[] = [
  {
    id: 'inorganic',
    title: 'Inorganic textures',
    subtitle: 'Metal, Stone & Synthetic',
    description: 'Mastery of non-organic surfaces through advanced painting, weathering, and material manipulation.',
    expandedDetails: 'Our process for inorganic surfaces involves complex multi-layering techniques. We use automotive-grade paints and custom-mixed washes to simulate everything from oxidized iron to ancient basalt. High-durability clear coats ensure these finishes withstand the rigors of production use.',
    publicId: 'elden_ring_8_gmazch',
    projects: [
      { 
        id: 'malenia', 
        title: 'Malenia Armor Detail', 
        description: 'Advanced metallic finishing using multi-stage reactive paints to achieve authentic aged gold and bronze patinas.',
        technicalInfo: ['Reactive Metallic Paints', 'Hand-applied oxidation', 'Industrial clear-coat'],
        publicId: 'elden_ring_8_gmazch' 
      },
      { 
        id: 'diablo_texture', 
        title: 'Diablo IV Surface Study', 
        description: 'Creating realistic stone and bone textures through specialized texturing pastes and organic-inspired weathering.',
        technicalInfo: ['Texture pastes', 'Raw pigment layering', 'Structural resin'],
        publicId: 'diablo_iv_3_yuwkeo' 
      },
      { 
        id: 'skyrim_metal', 
        title: 'Steel Plate Engraving', 
        description: 'Combining traditional Nord motifs with professional weathering to create a surface that tells a story of a thousand battles.',
        technicalInfo: ['Deep engraving', 'Oil-based aging', 'Cold-cast iron'],
        publicId: 'skyrim_8_nabnf5' 
      }
    ]
  },
  {
    id: 'woodworking',
    title: 'Wood working',
    subtitle: 'Classic Craftsmanship',
    description: 'Traditional and modern woodworking techniques for structural prop integrity and organic finishes.',
    expandedDetails: 'Combining CNC precision with hand-carved finishing. We specialize in choosing the right timber for weight, durability, and grain aesthetics. From structural cores to intricate decorative engravings, our woodwork forms the backbone of our premium weaponry.',
    publicId: 'skyrim_6_b9efrf',
    projects: [
      { 
        id: 'skyrim_wood', 
        title: 'Skyrim Nordic Bow', 
        description: 'Fully structural bow core combining lightweight wood with rigid fiberglass reinforcement for performance and visual fidelity.',
        technicalInfo: ['Composite wood core', 'Heat-formed limbs', 'Nordic carving'],
        publicId: 'skyrim_7_yqhwyx' 
      },
      { 
        id: 'drag1', 
        title: 'Ancient Dragon Sculpture', 
        description: 'Intricate wood-sculpted elements integrated into multi-material builds to provide organic warmth and structural depth.',
        technicalInfo: ['Hand-carved detail', 'Grain enhancement', 'Structural anchoring'],
        publicId: 'wp_añ_1_nsin4f' 
      }
    ]
  },
  {
    id: 'fx-makeup',
    title: 'FX makeup',
    subtitle: 'Prosthetics & Skin',
    description: 'High-end SFX work involving silicone appliances, dental acrylics, and realistic flesh textures.',
    expandedDetails: 'Using industry-standard materials like Platsil Gel-10. We create high-fidelity skin textures that move naturally. Our process includes life-casting, digital sculpting patterns, and multi-tone pigment injection for translucent, lifelike depth.',
    publicId: 'fx_devil_may_cry_1_e2s58p',
    projects: [
      { 
        id: 'got', 
        title: 'Game of Thrones White Walker', 
        description: 'Complete character transformation using professional prosthetic appliances and multi-layered translucent skin finishes.',
        technicalInfo: ['Silicone appliances', 'Alcohol-based pigments', 'Translucent layering'],
        publicId: 'got_1_otuw4y' 
      },
      { 
        id: 'dmc1', 
        title: 'Devil May Cry FX Skin', 
        description: 'Organic mutation study focusing on the transition between human skin and demonic texture using mixed-media prosthetics.',
        technicalInfo: ['Platsil Gel-10', 'Encapsulated silicone', 'Intrinsically pigmented'],
        publicId: 'fx_devil_may_cry_1_e2s58p' 
      }
    ]
  },
  {
    id: 'lights-work',
    title: 'Lights work',
    subtitle: 'Electronics & Arduino',
    description: 'Integrated circuit design, custom LED arrays, and motorized components for interactive props.',
    expandedDetails: 'Prop logic powered by Arduino and ESP32. We design custom PCBs and 3D-printed housing for all electronic components. Our systems include remote control via Wi-Fi/Bluetooth, synced RGB lighting paths, and high-torque motorized rigs for mechanical movement.',
    publicId: 'chainsaw_1_azfqly',
    projects: [
      { 
        id: 'gow', 
        title: 'God of War Leviathan Axe', 
        description: 'Advanced electronics integration with custom-programmed rune sequences that pulse with dynamic Nordic logic.',
        technicalInfo: ['Arduino Micro', 'Adalight Protocol', 'Lithium Polymer Power'],
        publicId: 'wp_god_of_war_1_rskssx' 
      },
      { 
        id: 'apex_hacha', 
        title: 'Apex Legends Heirloom', 
        description: 'High-density LED integration with wireless control paths to simulate the high-tech energy flows of the Outlands.',
        technicalInfo: ['ESP32 Web Server', 'Custom LED Channels', '3D Printed Optics'],
        publicId: 'wp_al_hacha_1_citmzg' 
      },
      { 
        id: 'chainsaw_engine', 
        title: 'Motorized Head Rig', 
        description: 'Mechanical engineering meets prop design: a high-torque internal skeleton capable of sustained motorized operation.',
        technicalInfo: ['High-torque DC Motors', 'Planetary Gearboxes', 'Integrated Sound System'],
        publicId: 'chainsaw_2_qwerzf' 
      }
    ]
  }
];

export const IMAGES = {
  hero: {
    background: 'elden_ring_2_hhaclm',
  },
  contact: {
    background: 'elden_ring_4_y0e6ou',
  },
  featured: {
    eldenRing: {
      main: 'elden_ring_6_k5z39c',
      sub1: 'elden_ring_7_mpj69h',
      sub2: 'elden_ring_6_k5z39c',
      detail1: 'elden_ring_10_n1jah8',
      bg: 'alfombra_roja',
    },
    diabloIV: {
      img1: 'diablo_iv_3_yuwkeo',
      img2: 'diablo_iv_5_k4ddrg',
      bg: 'diablo_iv_4_hwuzom',
    },
    skyrim: {
      img1: 'skyrim_7_yqhwyx',
      img2: 'skyrim_8_nabnf5',
      bg: 'skyrim_6_b9efrf',
    },
    chainsawMan: {
      img1: 'chainsaw_1_azfqly',
      img2: 'chainsaw_2_qwerzf',
      bg: 'chainsaw_3_uligns',
    },
  },
  projects: PROJECTS,
} as const;
