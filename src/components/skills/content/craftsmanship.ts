export type SubSkill = {
  id: string;
  title: string;
  description: string;
  publicId: string;
  tags: string[];
  gallery: string[]; // Added at the subskill level
};

export type CraftsmanshipCategory = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  expandedDetails: string;
  publicId: string;
  subSkills: SubSkill[]; // User wants 3 specifically
  gallery: string[]; // Keeping this at category level as a default fallback
};

export const CRAFTSMANSHIP: CraftsmanshipCategory[] = [
  {
    id: 'fx-makeup',
    title: 'Makeup',
    subtitle: 'Prosthetics & Skin',
    description: 'High-end SFX work involving silicone appliances, dental acrylics, and realistic flesh textures.',
    expandedDetails:
      'Using industry-standard materials like Platsil Gel-10. We create high-fidelity skin textures that move naturally. Our process includes life-casting, digital sculpting patterns, and multi-tone pigment injection for translucent, lifelike depth.',
    publicId: 'got_1_otuw4y',
    subSkills: [
      {
        id: 'prosthetics',
        title: 'Makeup',
        description: 'Advanced anatomical sculpting and molding for heavy appliances.',
        publicId: '1.1_-_Makeup_wpqu4o',
        tags: [],
        gallery: ['2.1_-_Makeup_-_0_acok40', '2.1_-_Makeup_-_1_mztxon', '1.1_-_Makeup_wpqu4o'],
      },
      {
        id: 'finishing',
        title: 'Resin Casting & Mold Making',
        description: 'Multi-layer painting for translucent skin and organic details.',
        publicId: '2.2_-_Resin_Casting_Mold_Making_-_1_cwu6qz',
        tags: [],
        gallery: ['2.2_-_Resin_Casting_Mold_Making_-_1_cwu6qz', 'fx_devil_may_cry_1_e2s58p'],
      },
      {
        id: 'sculpting',
        title: 'Prosthetic & SFX',
        description: 'Traditional and digital clay modeling for creature design.',
        publicId: 'got_1_otuw4y',
        tags: [],
        gallery: ['got_1_otuw4y'],
      },
    ],
    gallery: ['got_1_otuw4y', 'fx_devil_may_cry_1_e2s58p'],
  },
  {
    id: 'woodworking',
    title: 'Wood working',
    subtitle: 'Classic Craftsmanship',
    description: 'Traditional and modern woodworking techniques for structural prop integrity and organic finishes.',
    expandedDetails:
      'Combining CNC precision with hand-carved finishing. We specialize in choosing the right timber for weight, durability, and grain aesthetics.',
    publicId: '0_-_Wood_Working_qttihy',
    subSkills: [
      { id: 'wood-1', title: 'Wood Works', description: 'Choosing the right grain and density for each build.', publicId: 'wp_god_of_war_5_shbod3', tags: ['Wood', 'Structure'], gallery: ['wp_god_of_war_5_shbod3'] },
      { id: 'wood-2', title: 'Handpower Tools', description: 'Digital cutting for complex internal geometries.', publicId: 'wp_god_of_war_1_rskssx', tags: ['CNC', 'Digital'], gallery: ['wp_god_of_war_1_rskssx'] },
      { id: 'wood-3', title: 'Laser Cutting', description: 'Artisanal finishing for organic and decorative elements.', publicId: 'skyrim_7_yqhwyx', tags: ['Handheld', 'Carving'], gallery: ['skyrim_7_yqhwyx'] }
    ],
    gallery: ['wp_god_of_war_1_rskssx', 'wp_god_of_war_5_shbod3', 'skyrim_7_yqhwyx'],
  },
  {
    id: '3d-design',
    title: '3D & Digital',
    subtitle: 'Blender & Prototyping',
    description: 'Digital planning and prototyping to accelerate complex builds and ensure perfect fit.',
    expandedDetails: 'We use 3D design to test proportions and logic before physical fabrication.',
    publicId: '0_-_3D_Digital_qcfqhs',
    subSkills: [
      { id: 'dig-1', title: '3D Modeling', description: 'High-poly sculpting and architectural drafting in Blender.', publicId: 'diablo_iv_2_thyv5o', tags: ['Blender', '3D'], gallery: ['diablo_iv_2_thyv5o'] },
      { id: 'dig-2', title: 'Prep for Print', description: 'Optimizing meshes and supports for SLA/FDM printing.', publicId: 'wp_al_kunai_2_vaqwpg', tags: ['3D Printing', 'SLA'], gallery: ['wp_al_kunai_2_vaqwpg'] },
      { id: 'dig-3', title: 'Assembly Logic', description: 'Planning internal housing for electronics and lights.', publicId: 'chainsaw_1_azfqly', tags: ['CAD', 'Proto'], gallery: ['chainsaw_1_azfqly'] }
    ],
    gallery: ['diablo_iv_2_thyv5o', 'wp_al_kunai_2_vaqwpg', 'chainsaw_1_azfqly'],
  },
  {
    id: 'textiles',
    title: 'Fabrics & Sewing',
    subtitle: 'Fabrics & Patterning',
    description: 'Fabric work for costumes, straps, and layered garments with clean finishing and fit.',
    expandedDetails: 'Focus on silhouette, mobility, and believable layering.',
    publicId: '0_-_Fabrics_Sewing_xt7zay',
    subSkills: [
      { id: 'tex-1', title: 'Patterning', description: 'Precise drafting for complex wearable silhouettes.', publicId: 'mordred_fate_2_rkpzpt', tags: ['Patterning', 'Wearable'], gallery: ['mordred_fate_2_rkpzpt'] },
      { id: 'tex-2', title: 'Detail Stitching', description: 'High-end garment finishing and functional straps.', publicId: 'mordred_fate_3_jubhnt', tags: ['Sewing', 'Detail'], gallery: ['mordred_fate_3_jubhnt'] },
      { id: 'tex-3', title: 'Material Choice', description: 'Selection of specific textiles for durability and screen accuracy.', publicId: 'mordred_fate_1_hvpnwf', tags: ['Textiles', 'Fabric'], gallery: ['mordred_fate_1_hvpnwf'] }
    ],
    gallery: ['mordred_fate_2_rkpzpt', 'mordred_fate_3_jubhnt', 'mordred_fate_1_hvpnwf'],
  },
  {
    id: 'lights-work',
    title: 'Lighting',
    subtitle: 'Electronics & Arduino',
    description: 'Integrated circuit design, custom LED arrays, and motorized components.',
    expandedDetails: 'Prop logic powered by Arduino and ESP32 with custom PCB housing.',
    publicId: '0_-_Lightning_lblfpq',
    subSkills: [
      { id: 'elec-1', title: 'Arduino Logic', description: 'Programmed interactive responses and lighting paths.', publicId: 'wp_al_hacha_1_citmzg', tags: ['Arduino', 'Logic'], gallery: ['wp_al_hacha_1_citmzg'] },
      { id: 'elec-2', title: 'LED Arrays', description: 'Custom wired RGB strips for high-intensity glow.', publicId: 'wp_al_kunai_1_m96nky', tags: ['LED', 'Electronics'], gallery: ['wp_al_kunai_1_m96nky'] },
      { id: 'elec-3', title: 'Power MGMT', description: 'Integrated battery solutions for portable props.', publicId: 'chainsaw_2_qwerzf', tags: ['Power', 'Motors'], gallery: ['chainsaw_2_qwerzf'] }
    ],
    gallery: ['wp_al_hacha_1_citmzg', 'wp_al_kunai_1_m96nky', 'chainsaw_2_qwerzf', 'wp_añ_2_yatjho'],
  },
  {
    id: 'painting',
    title: 'Painting',
    subtitle: 'Airbrushing & Weathering',
    description: 'High-end painting workflows focused on realism and contrast.',
    expandedDetails: 'Believable metal, worn leather, and true-to-life grime.',
    publicId: '0_-_Painting_nisxnq',
    subSkills: [
      { id: 'paint-1', title: 'Airbrushing', description: 'Smooth gradients and high-contrast color transitions.', publicId: 'skyrim_1_llcbuo', tags: ['Airbrushing', 'Gradients'], gallery: ['skyrim_1_llcbuo'] },
      { id: 'paint-2', title: 'Weathering', description: 'Simulated wear, grit, and battle damage.', publicId: 'elden_ring_8_gmazch', tags: ['Weathering', 'Realism'], gallery: ['elden_ring_8_gmazch'] },
      { id: 'paint-3', title: 'Finishes', description: 'Professional clear coats for material-specific sheen.', publicId: 'diablo_iv_3_yuwkeo', tags: ['Finish', 'Metallic'], gallery: ['diablo_iv_3_yuwkeo'] }
    ],
    gallery: ['skyrim_1_llcbuo', 'elden_ring_8_gmazch', 'diablo_iv_3_yuwkeo'],
  },
  {
    id: 'inorganic',
    title: 'Sculpting & Modeling',
    subtitle: 'Metal, Stone & Synthetic',
    description: 'Mastery of non-organic surfaces through advanced painting and material manipulation.',
    expandedDetails: 'Multi-layering techniques to simulate stone and metal.',
    publicId: '0_-_Sculping_Modeling_xlweee',
    subSkills: [
      { id: 'scul-1', title: 'Clay Masters', description: 'Traditional sculpting for highly detailed textures.', publicId: 'elden_ring_8_gmazch', tags: ['Sculpting', 'Clay'], gallery: ['elden_ring_8_gmazch'] },
      { id: 'scul-2', title: 'Material Breakup', description: 'Creating organic surface irregularities.', publicId: 'diablo_iv_3_yuwkeo', tags: ['Texture', 'Synthetic'], gallery: ['diablo_iv_3_yuwkeo'] },
      { id: 'scul-3', title: 'Metal FX', description: 'Advanced techniques for realistic oxidized surfaces.', publicId: 'skyrim_3_m46jso', tags: ['Metal', 'Oxidized'], gallery: ['skyrim_3_m46jso'] }
    ],
    gallery: ['elden_ring_8_gmazch', 'diablo_iv_3_yuwkeo', 'skyrim_3_m46jso'],
  },
] as const;
