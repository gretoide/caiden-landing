import type { CraftsmanshipCategory } from '../types';
import { SKILL_GALLERIES } from '../galleries';

export const SCULPTING: CraftsmanshipCategory = {
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
};
