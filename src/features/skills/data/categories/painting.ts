import type { CraftsmanshipCategory } from '../types';
import { SKILL_GALLERIES } from '../galleries';

export const PAINTING: CraftsmanshipCategory = {
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
};
