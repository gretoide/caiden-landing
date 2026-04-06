import type { CraftsmanshipCategory } from '../types';
import { SKILL_GALLERIES } from '../galleries';

export const LIGHTING: CraftsmanshipCategory = {
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
};
