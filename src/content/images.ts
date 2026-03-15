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
  hipo: {
    title: 'Hiccup Haddock',
    subtitle: 'How to Train Your Dragon',
    subtitleClassName: 'text-[#dc2626]',
    description: 'Complete character recreation featuring highly detailed flight suit mechanics, custom leatherwork, and scale-accurate weathering matching the cinematic references.',
    descBorderClassName: 'border-[#dc2626]',
    main: 'hipo_1_lsxprc', 
    bg: 'hipo_1_lsxprc',   
    gallery: [
      'hipo_1_lsxprc',
      'hipo_2_j75ppj',
    ],
    zoomDetails: [
      { id: 1, label: 'Details', zoom: 2.2, position: '70% 60%' },
      { id: 2, label: 'Leatherwork', zoom: 3.0, position: '40% 40%' },
    ],
  },
};

export type SkillItem = string;

export type CraftsmanshipGalleryItem = {
  id: string; // Cloudinary publicId
  title?: string;
};

export type CraftsmanshipCategory = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  expandedDetails: string;
  publicId: string;
  gallery: CraftsmanshipGalleryItem[];
};

export type ExpandableSkill = {
  id: string;
  category: 'Fabrication' | 'Finishing & FX' | 'Digital';
  title: string;
  description: string;
  publicId?: string;
  tags: string[];
};

export const ALL_SKILLS: ExpandableSkill[] = [
  {
    id: 'fiberglass-foam',
    category: 'Fabrication',
    title: 'Fiberglass & Foam Crafting',
    description: 'Expert structural and lightweight builds using high-durability fiberglass layering and precise foam carving for base armor and realistic textures.',
    tags: ['Fiberglass', 'Foam Crafting', 'Polyurethane', 'Polyethylene', 'Thermoforming'],
    publicId: 'csqe9z3ov4h5ow1ohcns' // Chainsaw Man reference 
  },
  {
    id: 'mold-making',
    category: 'Fabrication',
    title: 'Resin Casting & Mold Making',
    description: 'Precision silicone rubber molds designed for replicating highly detailed, complex parts in specialized resins.',
    tags: ['Silicone Rubber Molds', 'Resin Casting', 'Translucent Resins']
  },
  {
    id: 'wood-working',
    category: 'Fabrication',
    title: 'Traditional Woodworking',
    description: 'Classic and modern woodworking techniques combining structural integrity with organic, hand-carved finishing touches.',
    tags: ['Wood', 'Handheld Power Tools', 'CNC Preparation'],
    publicId: 'wp_god_of_war_5_shbod3' // God of War reference
  },
  {
    id: 'painting',
    category: 'Finishing & FX',
    title: 'Painting & Weathering',
    description: 'Master-level painting, airbrushing, and layered weathering to simulate organic decay, oxidized metals, and true-to-life battle damage.',
    tags: ['Airbrushing', 'Weathering', 'Metallic Finishes'],
    publicId: 'skyrim_1_c8hspk' // Skyrim reference
  },
  {
    id: 'sfx-prosthetics',
    category: 'Finishing & FX',
    title: 'SFX & Prosthetics',
    description: 'Creation of hyper-realistic silicone appliances, dental acrylics, and encapsulated FX makeup for high-end creature design.',
    tags: ['SFX', 'Silicone Appliances', 'Translucent Layering']
  },
  {
    id: 'sculpting',
    category: 'Finishing & FX',
    title: 'Hand Sculpting',
    description: 'Traditional analog sculpting for highly detailed statues and complex organic shapes prior to molding.',
    tags: ['Sculpting', 'Clay', 'Organic Textures']
  },
  {
    id: 'led-electronics',
    category: 'Finishing & FX',
    title: 'LED Design & Electronics',
    description: 'Integrated logic powered by Arduino, custom PCBs, motorized movement, and programmed RGB lighting for interactive props.',
    tags: ['LED design', 'Electronics', 'Arduino', 'Motors'],
    publicId: 'DSIAL_2_nnea0g' // Dragon LED reference
  },
  {
    id: '3d-design',
    category: 'Digital',
    title: '3D Design & Modeling',
    description: 'Advanced 3D modeling and specialized drafting to prepare precise, scale-accurate files for digital manufacturing.',
    tags: ['3D Design', 'Blender', 'CAD']
  },
  {
    id: '3d-printing',
    category: 'Digital',
    title: 'Additive Manufacturing',
    description: 'High-fidelity 3D printing across multiple resin and filament materials to achieve complex architectural bases.',
    tags: ['3D Printing', 'SLA Resin', 'FDM']
  }
];

export const CRAFTSMANSHIP: CraftsmanshipCategory[] = [
  {
    id: 'inorganic',
    title: 'Inorganic textures',
    subtitle: 'Metal, Stone & Synthetic',
    description: 'Mastery of non-organic surfaces through advanced painting, weathering, and material manipulation.',
    expandedDetails: 'Our process for inorganic surfaces involves complex multi-layering techniques. We use automotive-grade paints and custom-mixed washes to simulate everything from oxidized iron to ancient basalt. High-durability clear coats ensure these finishes withstand the rigors of production use.',
    publicId: 'DSIAL_2_nnea0g',
    gallery: [
      { id: 'DSIA_2_vfxi0m', title: 'Skyrim Dragons' },
    ]
  },
  {
    id: 'woodworking',
    title: 'Wood working',
    subtitle: 'Classic Craftsmanship',
    description: 'Traditional and modern woodworking techniques for structural prop integrity and organic finishes.',
    expandedDetails: 'Combining CNC precision with hand-carved finishing. We specialize in choosing the right timber for weight, durability, and grain aesthetics. From structural cores to intricate decorative engravings, our woodwork forms the backbone of our premium weaponry.',
    publicId: 'wp_god_of_war_5_shbod3',
    gallery: [
    ]
  },
  {
    id: 'fx-makeup',
    title: 'FX makeup',
    subtitle: 'Prosthetics & Skin',
    description: 'High-end SFX work involving silicone appliances, dental acrylics, and realistic flesh textures.',
    expandedDetails: 'Using industry-standard materials like Platsil Gel-10. We create high-fidelity skin textures that move naturally. Our process includes life-casting, digital sculpting patterns, and multi-tone pigment injection for translucent, lifelike depth.',
    publicId: 'got_1_otuw4y',
    gallery: [
      { id: 'got_1_otuw4y', title: 'Game of Thrones White Walker' },
      { id: 'fx_devil_may_cry_1_e2s58p', title: 'Devil May Cry FX Skin' }
    ]
  },
  {
    id: 'lights-work',
    title: 'Lights work',
    subtitle: 'Electronics & Arduino',
    description: 'Integrated circuit design, custom LED arrays, and motorized components for interactive props.',
    expandedDetails: 'Prop logic powered by Arduino and ESP32. We design custom PCBs and 3D-printed housing for all electronic components. Our systems include remote control via Wi-Fi/Bluetooth, synced RGB lighting paths, and high-torque motorized rigs for mechanical movement.',
    publicId: 'wp_al_kunai_2_vaqwpg',
    gallery: [
      { id: 'wp_añ_2_yatjho', title: 'Apex Legends' },
      { id: 'wp_al_kunai_3_wtnypm', title: 'Wraith Heirloom LED' },
      { id: 'IMG_20230818_040510_jizgjs', title: 'Hex' },
      { id: 'DSIAL_2_nnea0g', title: 'Dragons' },
      
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
