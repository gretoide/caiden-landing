import type { CraftsmanshipCategory } from '../types';
import { SKILL_GALLERIES } from '../galleries';

export const WOODWORKING: CraftsmanshipCategory = {
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
};
