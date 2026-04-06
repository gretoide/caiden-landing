import type { CraftsmanshipCategory } from '../types';
import { SKILL_GALLERIES } from '../galleries';

export const MATERIALS: CraftsmanshipCategory = {
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
};
