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
    { type: 'image', publicId: '2.1_-_Resins_-_0_el9as6' },
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
    description: 'High-fidelity character makeup and prosthetic application focusing on skin realism and seamless transformation.',
    expandedDetails:
      'Mastery of silicone appliance application, edge blending, and advanced skin-tone pigmentation. We focus on achieving cinematic-grade character depth through translucent layering and professional-grade prosthetic integration.',
    publicId: 'got_1_otuw4y',
    subSkills: [
      {
        id: 'prosthetics',
        title: 'Makeup',
        description: 'On-set application of complex silicone appliances for seamless character transformations.',
        publicId: '1.1_-_Makeup_wpqu4o',
        tags: ['Makeup', 'Prosthetics', 'Skin'],
        gallery: SKILL_GALLERIES['prosthetics'] || [],
      },
      {
        id: 'finishing',
        title: 'Resin Casting & Mold Making',
        description: 'Creation of high-detail negative molds for the fabrication of specific character appliances and makeup components.',
        publicId: '2.2_-_Resin_Casting_Mold_Making_-_1_cwu6qz',
        tags: ['Molds', 'Casting', 'Appliances'],
        gallery: SKILL_GALLERIES['finishing'] || [],
      },
      {
        id: 'sculpting',
        title: 'Prosthetic & SFX',
        description: 'Specialized organic sculpting focusing on skin textures and anatomical modifications for character enhancements.',
        publicId: 'got_1_otuw4y',
        tags: ['Character', 'Prosthetics', 'Anatomy'],
        gallery: SKILL_GALLERIES['sculpting'] || [],
      },
    ],
    gallery: [{ type: 'image', publicId: 'got_1_otuw4y' }],
  },
  {
    id: 'woodworking',
    title: 'Wood working',
    subtitle: 'Classic Craftsmanship',
    description: 'Comprehensive woodworking services blending traditional joinery with modern fabrication for structural prop integrity.',
    expandedDetails:
      'We combine artisanal hand-tools with modern machinery to create complex armatures and detailed decorative elements. Our process ensures that wooden components are engineered for durability in high-performance environments.',
    publicId: '0_-_Wood_Working_qttihy',
    subSkills: [
      { id: 'wood-1', title: 'Wood Works', description: 'Professional timber selection and joinery techniques for structural prop foundations.', publicId: '1.1_-_Wood_works_woq1um', tags: ['Timber', 'Joinery', 'Structure'], gallery: SKILL_GALLERIES['wood-1'] || [] },
      { id: 'wood-2', title: 'Handpower Tools', description: 'Expert use of specialized machinery for rapid prototyping and bespoke internal geometries.', publicId: '1.2_-_Handpower_tools_dhfkes', tags: ['PowerTools', 'Shaping', 'Fabricating'], gallery: SKILL_GALLERIES['wood-2'] || [] },
      { id: 'wood-3', title: 'Laser Cutting', description: 'Precision digital cutting for intricate decorative patterns and functional mechanical components.', publicId: '1.3_-_Laser_Cutting_uznupv', tags: ['Laser', 'Precision', 'Vector'], gallery: SKILL_GALLERIES['wood-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'wp_god_of_war_1_rskssx' }],
  },
  {
    id: '3d-design',
    title: '3D & Digital',
    subtitle: 'Blender & Prototyping',
    description: 'High-end digital design and rapid prototyping workflows for complex prop geometry and precision mechanical fit.',
    expandedDetails: 'Using advanced modeling software, we create architectural drafts and high-poly organic sculpts before moving to physical production. Our digital-first approach allows for perfect symmetry and mechanical testing.',
    publicId: '0_-_3D_Digital_qcfqhs',
    subSkills: [
      { id: 'dig-1', title: '3D Design', description: 'Conceptual modeling and architectural drafting for complex props and character accessories.', publicId: '1.1_-_3D_Design_azycbq', tags: ['Blender', 'Modeling', 'CAD'], gallery: SKILL_GALLERIES['dig-1'] || [] },
      { id: 'dig-2', title: 'Digital Programs', description: 'Optimization of digital assets for varied manufacturing methods and mechanical logic testing.', publicId: '1.2_-_Digital_Programs_gju26u', tags: ['Software', 'CAM', 'Logic'], gallery: SKILL_GALLERIES['dig-2'] || [] },
      { id: 'dig-3', title: '3D Print', description: 'Industrial-grade additive manufacturing using SLA and FDM technologies for high-fidelity physical replicas.', publicId: '1.3_-_3D_Print_n9ixal', tags: ['3DPrinting', 'SLA', 'Resin'], gallery: SKILL_GALLERIES['dig-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'diablo_iv_2_thyv5o' }],
  },
  {
    id: 'textiles',
    title: 'Fabrics & Sewing',
    subtitle: 'Fabrics & Patterning',
    description: 'Technical garment construction and fabric manipulation focusing on silhouette, character period accuracy, and mobility.',
    expandedDetails: 'We specialize in custom patterning that balances aesthetic screen accuracy with the mobility requirements of high-performance wear. Our expertise covers layered garment construction and specialized textile aging.',
    publicId: '0_-_Fabrics_Sewing_xt7zay',
    subSkills: [
      { id: 'tex-1', title: 'Fabrics Sewing', description: 'Advanced tailoring and industrial machine sewing for heavy-duty textiles and structured garments.', publicId: '1.1_-_Fabrics_Sewing_pzg0dj', tags: ['Sewing', 'Tailoring', 'Fit'], gallery: SKILL_GALLERIES['tex-1'] || [] },
      { id: 'tex-2', title: 'Design', description: 'Period-accurate garment drafting and visual research for character-driven textile designs.', publicId: '1.2_-_Design_utu8dg', tags: ['Drafting', 'Silhouette', 'Period'], gallery: SKILL_GALLERIES['tex-2'] || [] },
      { id: 'tex-3', title: 'Embroidery', description: 'Intricate surface detailing and specialized trim work for high-status and decorative garments.', publicId: '1.3_-_Embroidery_btgnap', tags: ['Detail', 'Texture', 'Trim'], gallery: SKILL_GALLERIES['tex-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'mordred_fate_2_rkpzpt' }],
  },
  {
    id: 'lights-work',
    title: 'Lighting',
    subtitle: 'Electronics & Arduino',
    description: 'Integrated electronic systems and interactive illumination designed to bring props to life.',
    expandedDetails: 'We develop custom PCB layouts and program micro-controllers to handle complex lighting sequences. Our systems are miniaturized for prop integration, focusing on battery efficiency and high-intensity output.',
    publicId: '0_-_Lightning_lblfpq',
    subSkills: [
      { id: 'elec-1', title: 'LEDs', description: 'High-density addressable lighting arrays with custom sequences for vibrant visual feedback.', publicId: '1_-_LEDs_civgrw', tags: ['LEDs', 'Programming', 'Light'], gallery: SKILL_GALLERIES['elec-1'] || [] },
      { id: 'elec-2', title: 'Arduino', description: 'Micro-controller programming for interactive prop logic and sensor-driven environmental responses.', publicId: '1.3_-_Arduino_u3bgqb', tags: ['Arduino', 'Logic', 'Interactive'], gallery: SKILL_GALLERIES['elec-2'] || [] },
      { id: 'elec-3', title: 'Circuits', description: 'Bespoke wiring harness design and power management for portable, high-performance prop electronics.', publicId: '2.1_-_Circuits_-_0_w7evsy', tags: ['Circuits', 'Power', 'PCB'], gallery: SKILL_GALLERIES['elec-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'wp_al_hacha_1_citmzg' }],
  },
  {
    id: 'skilled-materials',
    title: 'Skilled Materials',
    subtitle: 'Resins & Synthetics',
    description: 'Master-level manipulation of specialized composites and industrial synthetics for unique material properties.',
    expandedDetails: 'We push the boundaries of materials science, creating custom blends of urethanes, flexible foams, and polymers to achieve specific characteristics like weight, flexibility, or hyper-realistic finishes.',
    publicId: '2.1_-_Resins_-_0_el9as6',
    subSkills: [
      { id: 'mat-1', title: 'Resins', description: 'Advanced clear-casting and high-strength resin builds with a focus on optical clarity and durability.', publicId: '1.1_-_Resins_bzvqg3', tags: ['Resin', 'Casting', 'Clear'], gallery: SKILL_GALLERIES['mat-1'] || [] },
      { id: 'mat-2', title: 'Fiberglass & Putties', description: 'Structural reinforcement and surface modeling using industrial composites and specialized filler compounds.', publicId: '1.2_-_Fiberglass_Putties_vv8rv0', tags: ['Composite', 'Putty', 'Strength'], gallery: SKILL_GALLERIES['mat-2'] || [] },
      { id: 'mat-3', title: 'Rubber & Molderie', description: 'Creation of flexible components and complex multi-part elastic molds for organic movement simulation.', publicId: '1.3_-_Rubber_Molderie_lf2drd', tags: ['Rubber', 'Molds', 'Flexible'], gallery: SKILL_GALLERIES['mat-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: '2.2_-_Resin_Casting_Mold_Making_-_1_cwu6qz' }],
  },
  {
    id: 'painting',
    title: 'Painting',
    subtitle: 'Airbrushing & Weathering',
    description: 'Cinematic finishing techniques focused on material realism, environmental aging, and visual contrast.',
    expandedDetails: 'Our painting workflow utilizes airbrushing, hand-painting, and chemical aging to simulate natural wear. We emphasize specularity and color depth to ensure props look authentic under any lighting condition.',
    publicId: '0_-_Painting_nisxnq',
    subSkills: [
      { id: 'paint-1', title: 'Traditional & Digital Drawing', description: 'Concept art illustration and manual drafting for pre-visualization and detailed surface patterns.', publicId: '1.1_-_Traditional_Digital_drawing_xwppb7', tags: ['Drawing', 'DigitalArt', 'Concept'], gallery: SKILL_GALLERIES['paint-1'] || [] },
      { id: 'paint-2', title: 'Painting', description: 'High-end color theory application and multi-layer finishing for hyper-realistic textures.', publicId: '1.2_-_Painting_bbkiac', tags: ['Color', 'Weathering', 'Realism'], gallery: SKILL_GALLERIES['paint-2'] || [] },
      { id: 'paint-3', title: 'Photomanipulation', description: 'Digital post-processing and composite editing for high-impact visual presentation.', publicId: '1.3_-_Photomanipulation_pjfox0', tags: ['Photoshop', 'Composite', 'Edit'], gallery: SKILL_GALLERIES['paint-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'skyrim_1_llcbuo' }],
  },
  {
    id: 'inorganic',
    title: 'Sculpting & Modeling',
    subtitle: 'Metal, Stone & Synthetic',
    description: 'Mastery of non-organic textures and industrial modeling to replicate hard-surface materials with hyper-realistic detail.',
    expandedDetails: 'Applying advanced sculpting techniques to synthetic bases to simulate the weight and character of forged metal and weathered stone. Our process focuses on weight-accurate massing and believable structural wear patterns.',
    publicId: '0_-_Sculping_Modeling_xlweee',
    subSkills: [
      { id: 'scul-1', title: 'Patterns & Modeling', description: 'Creation of precise structural templates and architectural patterns for large-scale hard-surface builds.', publicId: '1.1_-_Patterns_Modeling_igkhws', tags: ['Templates', 'Patterns', 'Industrial'], gallery: SKILL_GALLERIES['scul-1'] || [] },
      { id: 'scul-2', title: 'Sculpting', description: 'Manual surface sculpting focusing on high-contrast inorganic textures like corroded metal and carved stone.', publicId: '1.2_-_Sculpting_lanu6k', tags: ['HardSurface', 'Iron', 'Carving'], gallery: SKILL_GALLERIES['scul-2'] || [] },
      { id: 'scul-3', title: 'Textures', description: 'Engineering of realistic surface oxidation, pitting, and material-specific grain patterns on synthetic substrates.', publicId: '1.3_-_Textures_bqtcht', tags: ['Texture', 'Oxidation', 'Stone'], gallery: SKILL_GALLERIES['scul-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'elden_ring_8_gmazch' }],
  },
] as const;
