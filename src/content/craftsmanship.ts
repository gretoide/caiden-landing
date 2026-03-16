export type CraftsmanshipGalleryItem = {
  id: string;
  title: string;
};

export type CraftsmanshipCategory = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  expandedDetails: string;
  publicId: string;
  gallery: CraftsmanshipGalleryItem[];
  expertiseSkillIds: string[];
};

export const CRAFTSMANSHIP: CraftsmanshipCategory[] = [
  {
    id: 'inorganic',
    title: 'Inorganic textures',
    subtitle: 'Metal, Stone & Synthetic',
    description: 'Mastery of non-organic surfaces through advanced painting, weathering, and material manipulation.',
    expandedDetails:
      'Our process for inorganic surfaces involves complex multi-layering techniques. We use automotive-grade paints and custom-mixed washes to simulate everything from oxidized iron to ancient basalt. High-durability clear coats ensure these finishes withstand the rigors of production use.',
    publicId: 'elden_ring_8_gmazch',
    gallery: [
      { id: 'elden_ring_8_gmazch', title: 'Elden Ring — Weathering' },
      { id: 'diablo_iv_3_yuwkeo', title: 'Diablo IV — Texture' },
      { id: 'skyrim_3_m46jso', title: 'Skyrim — Metal' },
    ],
    expertiseSkillIds: ['painting', 'sculpting', 'fiberglass-foam'],
  },
  {
    id: 'woodworking',
    title: 'Wood working',
    subtitle: 'Classic Craftsmanship',
    description: 'Traditional and modern woodworking techniques for structural prop integrity and organic finishes.',
    expandedDetails:
      'Combining CNC precision with hand-carved finishing. We specialize in choosing the right timber for weight, durability, and grain aesthetics. From structural cores to intricate decorative engravings, our woodwork forms the backbone of our premium weaponry.',
    publicId: 'wp_god_of_war_5_shbod3',
    gallery: [
      { id: 'wp_god_of_war_1_rskssx', title: 'Leviathan Axe — Core' },
      { id: 'wp_god_of_war_5_shbod3', title: 'Leviathan Axe — Finish' },
      { id: 'skyrim_7_yqhwyx', title: 'Skyrim — Bow' },
    ],
    expertiseSkillIds: ['wood-working', 'fiberglass-foam', 'mold-making'],
  },
  {
    id: 'fx-makeup',
    title: 'FX makeup',
    subtitle: 'Prosthetics & Skin',
    description: 'High-end SFX work involving silicone appliances, dental acrylics, and realistic flesh textures.',
    expandedDetails:
      'Using industry-standard materials like Platsil Gel-10. We create high-fidelity skin textures that move naturally. Our process includes life-casting, digital sculpting patterns, and multi-tone pigment injection for translucent, lifelike depth.',
    publicId: 'got_1_otuw4y',
    gallery: [
      { id: 'got_1_otuw4y', title: 'White Walker — Prosthetics' },
      { id: 'fx_devil_may_cry_1_e2s58p', title: 'Devil May Cry — FX Skin' },
    ],
    expertiseSkillIds: ['sfx-prosthetics', 'mold-making', 'sculpting'],
  },
  {
    id: 'lights-work',
    title: 'Lights work',
    subtitle: 'Electronics & Arduino',
    description: 'Integrated circuit design, custom LED arrays, and motorized components for interactive props.',
    expandedDetails:
      'Prop logic powered by Arduino and ESP32. We design custom PCBs and 3D-printed housing for all electronic components. Our systems include remote control via Wi-Fi/Bluetooth, synced RGB lighting paths, and high-torque motorized rigs for mechanical movement.',
    publicId: 'wp_al_kunai_1_m96nky',
    gallery: [
      { id: 'wp_al_hacha_1_citmzg', title: 'Apex — Heirloom LED' },
      { id: 'wp_al_kunai_1_m96nky', title: 'Apex — Kunai' },
      { id: 'chainsaw_2_qwerzf', title: 'Chainsaw — Engine' },
      { id: 'wp_añ_2_yatjho', title: 'Dragon — Lighting Study' },
    ],
    expertiseSkillIds: ['led-electronics', '3d-design', '3d-printing'],
  },
] as const;
