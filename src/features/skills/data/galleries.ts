import type { GalleryItem } from './types';

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
    { type: 'image', publicId: '2.2_-_Design_-_1_eq9qix' },
    { type: 'image', publicId: '2_hukhxv' },
    { type: 'image', publicId: '3_eqqlnm' },
  ],
  'tex-3': [
    { type: 'image', publicId: '4_y2xgef' },
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

  // Sculpting & Modeling (inorganic)
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
