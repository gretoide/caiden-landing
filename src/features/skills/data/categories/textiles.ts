import type { CraftsmanshipCategory } from '../types';
import { SKILL_GALLERIES } from '../galleries';

export const TEXTILES: CraftsmanshipCategory = {
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
};
