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
    title: 'Makeup & Prosthetics',
    subtitle: 'Prosthetics & Skin Textures',
    description: 'Advanced multidisciplinary practice combining artistic makeup, prosthetic integration, and SFX fabrication techniques, with an emphasis on lifelike finishes, dimensional depth, and material-driven texture creation.',
    expandedDetails:
      'Mastery of color theory. High-fidelity makeup artistry encompassing beauty, character, and creature work, integrating prosthetics and SFX, achieving cinematic-grade depth through translucent layering and detail-driven finishes.',
    publicId: 'got_1_otuw4y',
    subSkills: [
      {
        id: 'prosthetics',
        title: 'Artistic Makeup',
        description: 'Experience in makeup application for high-impact character and creature transformations, with a focus on building realistic and expressive skin textures.',
        publicId: '1.1_-_Makeup_wpqu4o',
        tags: ['Makeup', 'Skin', 'Textures'],
        gallery: SKILL_GALLERIES['prosthetics'] || [],
      },
      {
        id: 'finishing',
        title: 'Molding Making',
        description: 'Technical artist specializing in mold making for special effects. Strong understanding of anatomy and material chemistry to ensure successful casts and durable molds.',
        publicId: '2.2_-_Resin_Casting_Mold_Making_-_1_cwu6qz',
        tags: ['PROSTHETICS', 'ANATOMY', 'APPLIANCES'],
        gallery: SKILL_GALLERIES['finishing'] || [],
      },
      {
        id: 'sculpting',
        title: 'Prosthetic & SFX',
        description: 'SPFX Artist specializing in the design and creation of fantasy prosthetic appliances. Experienced in sculpting and casting high-detail pieces, with a strong focus on bringing imaginative characters to life.',
        publicId: 'got_1_otuw4y',
        tags: ['Prosthetics', 'Anatomy', 'Appliances'],
        gallery: SKILL_GALLERIES['sculpting'] || [],
      },
    ],
    gallery: [{ type: 'image', publicId: 'got_1_otuw4y' }],
  },
  {
    id: 'woodworking',
    title: 'Wood working',
    subtitle: 'Modern Craftsmanship',
    description: 'Comprehensive woodworking services blending manual hand working with modern fabrication for structural prop integrity.',
    expandedDetails:
      'Versatile Woodworker blending traditional hand-craftsmanship with modern automated and manually techniques. Experienced in delivering high-quality, custom pieces by selecting the best approach for every project, ensuring each work stands out through technical precision and artistic detail.',
    publicId: '0_-_Wood_Working_qttihy',
    subSkills: [
      { id: 'wood-1', title: 'Wood Works', description: 'Artistic Woodworker skilled in blending traditional hand-carving with modern techniques. Focused on creating unique, standout pieces through a balance of technical precision and creative craftsmanship.', publicId: '1.1_-_Wood_works_woq1um', tags: ['Timber', 'MDF', 'Structure'], gallery: SKILL_GALLERIES['wood-1'] || [] },
      { id: 'wood-2', title: 'Handpower Tools', description: 'Highly skilled in the expert operation of power tools, including jigsaws, grinders, lathes, and sanders. Experienced in precision clamping and assembly to ensure a high-quality finish on every artistic project.', publicId: '1.2_-_Handpower_tools_dhfkes', tags: ['Powertools', 'Shaping', 'Sanding'], gallery: SKILL_GALLERIES['wood-2'] || [] },
      { id: 'wood-3', title: 'Laser Cutting', description: 'Proficient in automated laser cutting and digital fabrication. Expert in designing precision vectors using Adobe Illustrator and CorelDRAW to translate complex concepts into high-quality physical pieces with technical accuracy.', publicId: '1.3_-_Laser_Cutting_uznupv', tags: ['Laser', 'Precision', 'Software'], gallery: SKILL_GALLERIES['wood-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'wp_god_of_war_1_rskssx' }],
  },
  {
    id: '3d-design',
    title: '3D & Digital',
    subtitle: '3D Modeling and Artistic Digital Media',
    description: 'Multidisciplinary designer with experience in the full creative process. Fully oriented to bring the ideas to the real world.',
    expandedDetails: 'Specialist focused on the transition from digital concepts to physical objects. Expertise encompasses advanced 3D design and technical modeling, specifically optimized for 3D printing workflows. Adept at managing the entire development cycle, ensuring structural feasibility and precision from the initial software environment to the final manufactured output.',
    publicId: '0_-_3D_Digital_qcfqhs',
    subSkills: [
      { id: 'dig-1', title: '3D Design', description: '3D modeling and digital geometry creation. Skilled in developing complex volumes and surfaces, ensuring clean topology and technical accuracy for real production purposes.', publicId: '1.1_-_3D_Design_azycbq', tags: ['Modeling', '3D Print', 'Blender'], gallery: SKILL_GALLERIES['dig-1'] || [] },
      { id: 'dig-2', title: 'Digital Programs', description: 'Wide digital ecosystem, including the Adobe Creative Suite, 3D modeling environments, Bridging software design with hardware through Arduino programming and 3D printing optimization.', publicId: '1.2_-_Digital_Programs_gju26u', tags: ['Software', 'Adobe', 'Digital'], gallery: SKILL_GALLERIES['dig-2'] || [] },
      { id: 'dig-3', title: '3D Print', description: 'Extensive background in 3D printing projects, ranging from decorative pieces to functional wearables.', publicId: '1.3_-_3D_Print_n9ixal', tags: ['3D Printing', 'PLA', 'Resin'], gallery: SKILL_GALLERIES['dig-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'diablo_iv_2_thyv5o' }],
  },
  {
    id: 'textiles',
    title: 'Fabrics & Sewing',
    subtitle: 'Fabrics & Patterning',
    description: 'Experience in garment construction, manual and computerized embroidery, and pattern making.',
    expandedDetails: 'Involved in the full textile process, from initial design and pattern development to final assembly and specialized finishes.',
    publicId: '0_-_Fabrics_Sewing_xt7zay',
    subSkills: [
      { id: 'tex-1', title: 'Fabrics Sewing', description: 'Focused on the complete process, including textile selection, fitting, and assembly for high-quality finishes.', publicId: '1.1_-_Fabrics_Sewing_pzg0dj', tags: ['Sewing', 'Machines', 'Tailoring'], gallery: SKILL_GALLERIES['tex-1'] || [] },
      { id: 'tex-2', title: 'Pattern Design', description: 'Experience in garment construction and pattern making for costumes and apparel.', publicId: '1.2_-_Design_utu8dg', tags: ['Silhouette', 'Patterns', 'Design'], gallery: SKILL_GALLERIES['tex-2'] || [] },
      { id: 'tex-3', title: 'Embroidery', description: 'Manual and computerized embroidery for high-end finishes and decorative details. Focused on precision stitching and luxury applications for garments.', publicId: '1.3_-_Embroidery_btgnap', tags: ['Detail', 'Manual', 'Automatized'], gallery: SKILL_GALLERIES['tex-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'mordred_fate_2_rkpzpt' }],
  },
  {
    id: 'lights-work',
    title: 'Lighting',
    subtitle: 'Electronics & Arduino',
    description: 'Integrated electronic systems and interactive illumination designed to bring props to life.',
    expandedDetails: 'Circuit soldering and LED system integration. Focused on designing and programming lighting sequences, including assembly and hardware troubleshooting for custom electronic projects.',
    publicId: '0_-_Lightning_lblfpq',
    subSkills: [
      { id: 'elec-1', title: 'LEDs', description: 'LED system design and implementation. Experienced in programming lighting sequences and integrating light-emitting components for aesthetic purposes.', publicId: '1_-_LEDs_civgrw', tags: ['LEDs', 'Lights', 'Alive Objects'], gallery: SKILL_GALLERIES['elec-1'] || [] },
      { id: 'elec-2', title: 'Arduino', description: 'Micro-controller programming for basic automation in interactive prop projects and hardware control.', publicId: '1.3_-_Arduino_u3bgqb', tags: ['Arduino', 'Logic', 'Programming'], gallery: SKILL_GALLERIES['elec-2'] || [] },
      { id: 'elec-3', title: 'Circuits', description: 'Physical circuit assembly and lead-free or electronic soldering. Focused on component placement, wiring, and hardware assembly.', publicId: '2.1_-_Circuits_-_0_w7evsy', tags: ['Circuits', 'Welding', 'Power'], gallery: SKILL_GALLERIES['elec-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'wp_al_hacha_1_citmzg' }],
  },
  {
    id: 'skilled-materials',
    title: 'Skilled Materials',
    subtitle: 'Resins & Synthetics',
    description: 'Master-level manipulation of specialized composites and industrial synthetics for unique material properties.',
    expandedDetails: 'Composite materials and mold making using resins, fiberglass, and silicone rubbers. Casting techniques and the use of putties for surface finishing and structural repair for long-term projects.',
    publicId: '2.1_-_Resins_-_0_el9as6',
    subSkills: [
      { id: 'mat-1', title: 'Resins', description: 'Resin casting and processing. Experienced in mixing, degassing, and curing techniques for both structural parts and aesthetic finishes.', publicId: '1.1_-_Resins_bzvqg3', tags: ['Resin', 'Casting', 'Clear'], gallery: SKILL_GALLERIES['mat-1'] || [] },
      { id: 'mat-2', title: 'Fiberglass & Putties', description: 'Structural reinforcement and surface modeling using industrial composites and specialized filler compounds.', publicId: '1.2_-_Fiberglass_Putties_vv8rv0', tags: ['Composite', 'Putty', 'Strength'], gallery: SKILL_GALLERIES['mat-2'] || [] },
      { id: 'mat-3', title: 'Rubber & Molderie', description: 'Creation and construction of multi-part molds and support shells to handle significant volumes for a better accuracy and surface detail.', publicId: '1.3_-_Rubber_Molderie_lf2drd', tags: ['Rubber', 'Molds', 'Flexible'], gallery: SKILL_GALLERIES['mat-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: '2.2_-_Resin_Casting_Mold_Making_-_1_cwu6qz' }],
  },
  {
    id: 'painting',
    title: 'Painting',
    subtitle: 'Airbrushing & Weathering',
    description: 'Cinematic finishing techniques focused on material realism, environmental aging, and visual contrast.',
    expandedDetails: 'Skilled in manual and digital painting capturing moments and conveying them through diverse aesthetics. Highly Proficient in Adobe Photoshop for image editing, photo manipulation, and complex compositing.',
    publicId: '0_-_Painting_nisxnq',
    subSkills: [
      { id: 'paint-1', title: 'Traditional & Digital Drawing', description: 'Seamlessly transition between traditional sketching/painting and digital rendering.', publicId: '1.1_-_Traditional_Digital_drawing_xwppb7', tags: ['Drawing', 'DigitalArt', 'Concept'], gallery: SKILL_GALLERIES['paint-1'] || [] },
      { id: 'paint-2', title: 'Painting', description: 'Traditional painter. Expert in handling physical media—including oils, acrylics, and watercolors—to create evocative, high-texture compositions with a focus on classical techniques and light manipulation.', publicId: '1.2_-_Painting_bbkiac', tags: ['Color', 'Aesthetic', 'Acrylics'], gallery: SKILL_GALLERIES['paint-2'] || [] },
      { id: 'paint-3', title: 'Photomanipulation', description: 'Skilled in manual and digital painting capturing moments and conveying them through diverse aesthetics. Highly Proficient in Adobe Photoshop for image editing, photo manipulation, and complex compositing.', publicId: '1.3_-_Photomanipulation_pjfox0', tags: ['Photoshop', 'Composite', 'Edit'], gallery: SKILL_GALLERIES['paint-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'skyrim_1_llcbuo' }],
  },
  {
    id: 'inorganic',
    title: 'Sculpting & Modeling',
    subtitle: 'High Definition Textures',
    description: 'Mastery of non-organic textures and industrial modeling to replicate hard-surface materials with hyper-realistic detail.',
    expandedDetails: 'Applying advanced sculpting techniques to synthetic bases to simulate the weight and character of forged metal and weathered stone. Our process focuses on weight-accurate massing and believable structural wear patterns.',
    publicId: '0_-_Sculping_Modeling_xlweee',
    subSkills: [
      { id: 'scul-1', title: 'Patterns & Modeling', description: 'Creation of precise structural templates and architectural patterns for large-scale hard-surface builds.', publicId: '1.1_-_Patterns_Modeling_igkhws', tags: ['Templates', 'Measurements', 'Design'], gallery: SKILL_GALLERIES['scul-1'] || [] },
      { id: 'scul-2', title: 'Sculpting', description: 'Versatile sculptor with a comprehensive command of form and volume across physical and digital media. Expert in traditional hand-modeling—using clay, plasticine, and polymers—as well as advanced 3D digital sculpting optimized for high-precision printing and manufacturing.', publicId: '1.2_-_Sculpting_lanu6k', tags: ['Plasticine', 'Manual', 'Clay'], gallery: SKILL_GALLERIES['scul-2'] || [] },
      { id: 'scul-3', title: 'Textures', description: 'Expert artist specializing in the high-fidelity recreation of inorganic textures. Proficient in manipulating paints, resins, and polymers to convincingly simulate weathered metals, oxidized surfaces, natural stone, leathers, and gemstones.', publicId: '1.3_-_Textures_bqtcht', tags: ['Visual', 'Fake Materials', 'Textures'], gallery: SKILL_GALLERIES['scul-3'] || [] }
    ],
    gallery: [{ type: 'image', publicId: 'elden_ring_8_gmazch' }],
  },
] as const;
