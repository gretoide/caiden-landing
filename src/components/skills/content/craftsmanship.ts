export type GalleryItem = {
  type: 'image' | 'video';
  publicId: string;
};

/**
 * SKILL_GALLERIES
 * Use this section to easily add, remove, or reorder images and videos for any subskill.
 * Each key matches the subskill ID.
 */
export const SKILL_GALLERIES: Record<string, GalleryItem[]> = {
  // Makeup (fx-makeup)
  'prosthetics': [
    { type: 'image', publicId: '2.1_-_Makeup_-_0_acok40' },
    { type: 'image', publicId: '2.1_-_Makeup_-_1_mztxon' },
    { type: 'image', publicId: '1.1_-_Makeup_wpqu4o' }
  ],
  'finishing': [
    { type: 'image', publicId: '2.2_-_Resin_Casting_Mold_Making_-_0_u1t1aq' },
    { type: 'image', publicId: '2.2_-_Resin_Casting_Mold_Making_-_1_cwu6qz' },
    { type: 'image', publicId: '2.2_-_Resin_Casting_Mold_Making_-_2_kwmjkc' }
  ],
  'sculpting': [
    { type: 'image', publicId: '2.3_-_Prosthetic_SFX_-_0_dgjh12' },
    { type: 'image', publicId: '2.3_-_Prosthetic_SFX_-_1_uw24yv' },
    { type: 'image', publicId: '1.3_-_Prosthetic_SFX_yeskoq' }
  ],

  // Wood working (woodworking)
  'wood-1': [
    { type: 'image', publicId: '2.1_-_Wood_works_-_0_uskd80' },
    { type: 'image', publicId: '2.1_-_Wood_works_-_1_b6lrdg' },
    { type: 'image', publicId: '2.1_-_Wood_works_-_2_hyr4un' },
    { type: 'image', publicId: '2.1_-_Wood_works_-_3_sqqvdv' },
  ],
  'wood-2': [
    { type: 'image', publicId: '2.2_-_Handpower_tools_-_0_dlawqw' },
    { type: 'image', publicId: '2.2_-_Handpower_tools_-_1_ssoyn0' },
    { type: 'image', publicId: '2.2_-_Handpower_tools_-_2_vsavum' },
  ],
  'wood-3': [
    { type: 'image', publicId: '2.3_-_Laser_Cutting_-_0_g8rerj' },
    { type: 'image', publicId: '2.3_-_Laser_Cutting_-_1_fl0h9e' },
    { type: 'image', publicId: '2.3_-_Laser_Cutting_-_2_qfnzig' },
  ],

  // 3D & Digital (3d-design)
  'dig-1': [
    { type: 'image', publicId: '2.1_-_3D_Design_-_0_bjwo8g' },
    { type: 'image', publicId: '2.1_-_3D_Design_-_1_rafm9i' },
    { type: 'image', publicId: '2.1_-_3D_Design_-_2_qllsou' },
  ],
  'dig-2': [
    { type: 'image', publicId: '2.2_-_Digital_Programs_-_1_k8vz9j' },
    { type: 'image', publicId: '2.2_-_Digital_Programs_-_2_tnhf3b' }
  ],
  'dig-3': [
    { type: 'image', publicId: '2.3_-_3D_Print_-_0_twknsk' },
    { type: 'image', publicId: '2.3_-_3D_Print_-_1_diaesz' },
    { type: 'image', publicId: '2.3_-_3D_Print_-_2_xndf49' },
  ],

  // Fabrics & Patterning (textiles)
  'tex-1': [
    { type: 'image', publicId: '2.1_-_Fabrics_Sewing_-_0_ntlan4' },
    { type: 'image', publicId: '2.1_-_Fabrics_Sewing_-_1_wifnr1' },
    { type: 'image', publicId: '2.1_-_Fabrics_Sewing_-_2_mwx8dc' },
  ],
  'tex-2': [
    { type: 'image', publicId: '2.2_-_Design_-_0_mvtqap' },
    { type: 'image', publicId: '2.2_-_Design_-_1_eq9qix' },
    { type: 'image', publicId: '2.2_-_Design_-_2_aoj6qm' },
  ],
  'tex-3': [
    { type: 'image', publicId: '2.3_-_Embroidery_-_0_zfqdhq' },
    { type: 'image', publicId: '2.3_-_Embroidery_-_1_v1qdow' },
    { type: 'image', publicId: '2.3_-_Embroidery_-_2_ctdvmi' },
  ],

  // Electronics & Arduino (lights-work)
  'elec-1': [
    { type: 'video', publicId: '2.2_LEDs_jw4wlo' }
  ],
  'elec-2': [
    { type: 'image', publicId: '2.3_-_Arduino_-_0_w4xd5z' },
    { type: 'image', publicId: '2.3_-_Arduino_-_1_k59myb' },
    { type: 'image', publicId: '2.3_-_Arduino_-_2_bufyyl' },
  ],
  'elec-3': [
    { type: 'image', publicId: '2.1_-_Circuits_-_0_w7evsy' },
    { type: 'image', publicId: '2.1_-_Circuits_-_1_wmje7m' },
    { type: 'image', publicId: 'hola_popo' },
  ],

  // Skilled Materials (skilled-materials)
  'mat-1': [
    { type: 'image', publicId: '2.1_-_Resins_-_1_gcrpdu' },
    { type: 'image', publicId: '2.1_-_Resins_-_2_bik2dy' }
  ],
  'mat-2': [
    { type: 'image', publicId: '2.2_-_Fiberglass_Putties_-_0_uv89dr' },
    { type: 'image', publicId: '2.2_-_Fiberglass_Putties_-_1_f7pvcb' },
    { type: 'image', publicId: '2.2_-_Fiberglass_Putties_-_2_ublcxv' }
  ],
  'mat-3': [
    { type: 'image', publicId: '2.3_-_Rubber_Molderie_-_0_wx8aih' },
    { type: 'image', publicId: '2.3_-_Rubber_Molderie_-_1_lwyhnq' },
    { type: 'image', publicId: '2.3_-_Rubber_Molderie_-_2_ski8fm' }
  ],

  // Painting (painting)
  'paint-1': [
    { type: 'image', publicId: '2.1_-_Traditional_Digital_drawing_-_0_jr2xii' },
    { type: 'image', publicId: '2.1_-_Traditional_Digital_drawing_-_1_a23q7x' },
    { type: 'image', publicId: '2.1_-_Traditional_Digital_drawing_-_2_glv0sg' }
  ],
  'paint-2': [
    { type: 'image', publicId: '2.2_-_Painting_-_0_knlr9r' },
    { type: 'image', publicId: '2.2_-_Painting_-_1_p5piki' },
    { type: 'image', publicId: '2.2_-_Painting_-_2_dcsh9r' }
  ],
  'paint-3': [
    { type: 'image', publicId: '2.3_-_Photomanipulation_-_0_nplrdy' },
    { type: 'image', publicId: '2.3_-_Photomanipulation_-_1_oviqze' },
    { type: 'image', publicId: '2.3_-_Photomanipulation_-_2_qb6m3t' }
  ],

  // Sculpting & Modeling (inorganic) - RECENT EDITS INCLUDED
  'scul-1': [
    { type: 'image', publicId: '2.1_-_Patterns_Modeling_-_0_zh7cif' },
    { type: 'image', publicId: '2.1_-_Patterns_Modeling_-_1_idxuou' },
    { type: 'image', publicId: '2.1_-_Patterns_Modeling_-_2_blrbir' }
  ],
  'scul-2': [
    { type: 'image', publicId: '2.2_-_Sculpting_-_0_qq99lr' },
    { type: 'image', publicId: '2.2_-_Sculpting_-_1_nvzsm2' },
    { type: 'image', publicId: '2.2_-_Sculpting_-_2_kv1qno' }
  ],
  'scul-3': [
    { type: 'image', publicId: '2.3_-_Textures_-_0_epr0wi' },
    { type: 'image', publicId: '2.3_-_Textures_-_1_gugwio' },
    { type: 'image', publicId: '2.3_-_Textures_-_2_tsjew7' }
  ],
};

export type SubSkill = {
  id: string;
  title: string;
  description: string;
  publicId: string;
  tags: string[];
  gallery: GalleryItem[]; 
};

export type CraftsmanshipCategory = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  expandedDetails: string;
  publicId: string;
  subSkills: SubSkill[]; 
  gallery: GalleryItem[]; 
};

export const CRAFTSMANSHIP: CraftsmanshipCategory[] = [
  {
    id: 'fx-makeup',
    title: 'Makeup',
    subtitle: 'Prosthetics & Skin',
    description: 'Specialized application of prosthetic appliances and skin-mimicking textures for high-fidelity creature and character design.',
    expandedDetails:
      'Mastery of silicone encapsulation and multi-part mold systems. We utilize Platsil Gel-10 and various additives to achieve realistic tissue density and translucency, complemented by advanced airbrush pigmentation.',
    publicId: 'got_1_otuw4y',
    subSkills: [
      {
        id: 'prosthetics',
        title: 'Makeup',
        description: 'On-set application and blending of complex silicone appliances for seamless character transformations.',
        publicId: '1.1_-_Makeup_wpqu4o',
        tags: ['SFX', 'Silicon'],
        gallery: SKILL_GALLERIES['prosthetics'] || [],
      },
      {
        id: 'finishing',
        title: 'Resin Casting & Mold Making',
        description: 'High-precision reproduction through multi-part matrix molds and varied resin formulations.',
        publicId: '2.2_-_Resin_Casting_Mold_Making_-_1_cwu6qz',
        tags: ['Moldmaking', 'Resin'],
        gallery: SKILL_GALLERIES['finishing'] || [],
      },
      {
        id: 'sculpting',
        title: 'Prosthetic & SFX',
        description: 'Advanced anatomical sculpting designed specifically for mechanical or wearable integration.',
        publicId: 'got_1_otuw4y',
        tags: ['Sculpting', 'SFX'],
        gallery: SKILL_GALLERIES['sculpting'] || [],
      },
    ],
    gallery: [{ type: 'image', publicId: 'got_1_otuw4y' }],
  },
  {
    id: 'woodworking',
    title: 'Wood working',
    subtitle: 'Classic Craftsmanship',
    description: 'Marriage of traditional joinery and modern structural engineering to create high-impact, durable prop foundations.',
    expandedDetails:
      'We leverage both CNC precision for internal skeletons and hand-carved detailing for organic finishes, ensuring every piece can withstand the rigors of production.',
    publicId: '0_-_Wood_Working_qttihy',
    subSkills: [
      { id: 'wood-1', title: 'Wood Works', description: 'Selection and treatment of premium timbers for optimal weight and structural integrity.', publicId: '1.1_-_Wood_works_woq1um', tags: ['Timber', 'Structure'], gallery: SKILL_GALLERIES['wood-1'] || [] },
      { id: 'wood-2', title: 'Handpower Tools', description: 'Expert manipulation of manual tools for bespoke detailing and rapid structural adjustments.', publicId: '1.2_-_Handpower_tools_dhfkes', tags: ['Handheld', 'Detailing'], gallery: SKILL_GALLERIES['wood-2'] || [] },
      { id: 'wood-3', title: 'Laser Cutting', description: 'Precision vector-based cutting for intricate patterns, complex gears, and decorative overlays.', publicId: '1.3_-_Laser_Cutting_uznupv', tags: ['Laser', 'Vector'], gallery: SKILL_GALLERIES['wood-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'wp_god_of_war_1_rskssx' }],
  },
  {
    id: '3d-design',
    title: '3D & Digital',
    subtitle: 'Blender & Prototyping',
    description: 'Digital-first workflow for architectural drafting, mechanical logic, and complex surface modeling.',
    expandedDetails: 'Virtual prototyping allows us to stress-test articulated joints and electronic housing before the first physical cut is made.',
    publicId: '0_-_3D_Digital_qcfqhs',
    subSkills: [
      { id: 'dig-1', title: '3D Design', description: 'High-poly organic sculpting and precise mechanical drafting using industry-standard software.', publicId: '1.1_-_3D_Design_azycbq', tags: ['Blender', 'CAD'], gallery: SKILL_GALLERIES['dig-1'] || [] },
      { id: 'dig-2', title: 'Digital Programs', description: 'Advanced mesh optimization and preparation for industrial-grade fabrication methods.', publicId: '1.2_-_Digital_Programs_gju26u', tags: ['Optimization', 'CAM'], gallery: SKILL_GALLERIES['dig-2'] || [] },
      { id: 'dig-3', title: '3D Print', description: 'High-fidelity output utilizing FDM and SLA technologies for rapid iteration of mechanical components.', publicId: '1.3_-_3D_Print_n9ixal', tags: ['SLA', 'Prototyping'], gallery: SKILL_GALLERIES['dig-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'diablo_iv_2_thyv5o' }],
  },
  {
    id: 'textiles',
    title: 'Fabrics & Sewing',
    subtitle: 'Fabrics & Patterning',
    description: 'Technical garment construction focusing on silhouette, durability, and multi-layered cinematic textures.',
    expandedDetails: 'We specialize in custom patterning that balances aesthetic screen accuracy with the mobility requirements of high-performance wear.',
    publicId: '0_-_Fabrics_Sewing_xt7zay',
    subSkills: [
      { id: 'tex-1', title: 'Fabrics Sewing', description: 'Advanced tailoring and industrial machine sewing for heavy-duty textiles and structured garments.', publicId: '1.1_-_Fabrics_Sewing_pzg0dj', tags: ['Tailoring', 'Fit'], gallery: SKILL_GALLERIES['tex-1'] || [] },
      { id: 'tex-2', title: 'Design', description: 'Conceptual drafting and material layering to achieve complex, weather-resistant period aesthetics.', publicId: '1.2_-_Design_utu8dg', tags: ['Concept', 'Texture'], gallery: SKILL_GALLERIES['tex-2'] || [] },
      { id: 'tex-3', title: 'Embroidery', description: 'Intricate surface detailing and specialized trim work for regal and highly-decorative character designs.', publicId: '1.3_-_Embroidery_btgnap', tags: ['Detail', 'Finish'], gallery: SKILL_GALLERIES['tex-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'mordred_fate_2_rkpzpt' }],
  },
  {
    id: 'lights-work',
    title: 'Lighting',
    subtitle: 'Electronics & Arduino',
    description: 'Dynamic illumination and mechatronic integration to bring artifacts to life through code and light.',
    expandedDetails: 'From simple LED arrays to complex ESP32-powered interactive systems, we build custom circuits designed for prop-specific environments.',
    publicId: '0_-_Lightning_lblfpq',
    subSkills: [
      { id: 'elec-1', title: 'LEDs', description: 'Implementation of high-density addressable Neopixels for vibrant, localized lighting effects.', publicId: '1_-_LEDs_civgrw', tags: ['Neopixel', 'Light'], gallery: SKILL_GALLERIES['elec-1'] || [] },
      { id: 'elec-2', title: 'Arduino', description: 'Micro-controller programming for responsive behaviors, motorized actions, and synced light patterns.', publicId: '1.3_-_Arduino_u3bgqb', tags: ['Logic', 'Code'], gallery: SKILL_GALLERIES['elec-2'] || [] },
      { id: 'elec-3', title: 'Circuits', description: 'Bespoke PCB design and wiring harnesses optimized for weight, portability, and reliable power distribution.', publicId: '2.1_-_Circuits_-_0_w7evsy', tags: ['PCB', 'Systems'], gallery: SKILL_GALLERIES['elec-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'wp_al_hacha_1_citmzg' }],
  },
  {
    id: 'skilled-materials',
    title: 'Skilled Materials',
    subtitle: 'Resins & Synthetics',
    description: 'Expertise in advanced chemical solutions, specialized casting, and composite manipulation for unique prop characteristics.',
    expandedDetails: 'We push the limits of traditional materials, developing custom mixes of urethanes, clears, and flexible foams to match exact production needs.',
    publicId: '0_-_Resin_Casting_Mold_Making_eyv00v',
    subSkills: [
      { id: 'mat-1', title: 'Resins', description: 'Pressure-pot casting of crystal-clear resins and high-impact polymers with zero-bubble integrity.', publicId: '1.1_-_Resins_bzvqg3', tags: ['ClearCast', 'Polymer'], gallery: SKILL_GALLERIES['mat-1'] || [] },
      { id: 'mat-2', title: 'Fiberglass & Putties', description: 'Manipulation of thermoplastic and synthetic foams to simulate varied organic and industrial surfaces.', publicId: '1.2_-_Fiberglass_Putties_vv8rv0', tags: ['EVA', 'Synthetic'], gallery: SKILL_GALLERIES['mat-2'] || [] },
      { id: 'mat-3', title: 'Rubber & Molderie', description: 'Structural reinforcing using carbon fiber, fiberglass, and specialized woven textiles for unmatched durability.', publicId: '1.3_-_Rubber_Molderie_lf2drd', tags: ['CarbonFiber', 'Strength'], gallery: SKILL_GALLERIES['mat-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: '2.2_-_Resin_Casting_Mold_Making_-_1_cwu6qz' }],
  },
  {
    id: 'painting',
    title: 'Painting',
    subtitle: 'Airbrushing & Weathering',
    description: 'Cinematic finishing focused on depth, light behavior, and believable battle-hardened aesthetics.',
    expandedDetails: 'Our painting process replicates natural oxidation, grime accumulation, and material-specific light response (specularity) across varied surfaces.',
    publicId: '0_-_Painting_nisxnq',
    subSkills: [
      { id: 'paint-1', title: 'Traditional & Digital Drawing', description: 'Precision paint application for smooth value gradients, highlight transitions, and subtle organic mottling.', publicId: '1.1_-_Traditional_Digital_drawing_xwppb7', tags: ['Airbrush', 'Depth'], gallery: SKILL_GALLERIES['paint-1'] || [] },
      { id: 'paint-2', title: 'Painting', description: 'Aggressive material aging, including simulated corrosion, battle-damage, and environmental buildup.', publicId: '1.2_-_Painting_bbkiac', tags: ['Aging', 'Damage'], gallery: SKILL_GALLERIES['paint-2'] || [] },
      { id: 'paint-3', title: 'Photomanipulation', description: 'Specialized clear-coats and varnishes to define varied surface properties from metallic sheen to matte leather.', publicId: '1.3_-_Photomanipulation_pjfox0', tags: ['Coatings', 'Luster'], gallery: SKILL_GALLERIES['paint-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'skyrim_1_llcbuo' }],
  },
  {
    id: 'inorganic',
    title: 'Sculpting & Modeling',
    subtitle: 'Metal, Stone & Synthetic',
    description: 'Mastery of non-organic textures and industrial modeling to replicate hard-surface materials with hyper-realistic detail.',
    expandedDetails: 'Applying advanced sculpting techniques to synthetic bases to simulate the weight and character of forged and weathered stone.',
    publicId: '0_-_Sculping_Modeling_xlweee',
    subSkills: [
      { id: 'scul-1', title: 'Patterns & Modeling', description: 'Pattern-making and structural modeling for large-scale environmental and architectural props.', publicId: '1.1_-_Patterns_Modeling_igkhws', tags: ['Modeling', 'Architecture'], gallery: SKILL_GALLERIES['scul-1'] || [] },
      { id: 'scul-2', title: 'Sculpting', description: 'Aggressive texturing and surface manipulation to achieve hyper-realistic inorganic detail.', publicId: '1.2_-_Sculpting_lanu6k', tags: ['Carving', 'HardSurface'], gallery: SKILL_GALLERIES['scul-2'] || [] },
      { id: 'scul-3', title: 'Textures', description: 'Surface engineering for high-fidelity material simulation across varied synthetic substrates.', publicId: '1.3_-_Textures_bqtcht', tags: ['Oxidation', 'Pitting'], gallery: SKILL_GALLERIES['scul-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'elden_ring_8_gmazch' }],
  },
] as const;
