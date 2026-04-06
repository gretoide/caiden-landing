import type { CraftsmanshipCategory } from '../types';
import { SKILL_GALLERIES } from '../galleries';

export const DIGITAL: CraftsmanshipCategory = {
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
};
