import type { CraftsmanshipCategory } from '../types';
import { SKILL_GALLERIES } from '../galleries';

export const HAIR: CraftsmanshipCategory = {
  id: 'hair',
  title: 'Hair & Wigs',
  subtitle: 'Wig Styling & Cutting',
  description: 'Wig preparation for character work, including cutting, shaping and styling to match each design.',
  expandedDetails: 'Each wig is adjusted to the character and the wearer, with attention to cut, volume, direction and a natural-looking finish on camera.',
  publicId: 'caiden_landing_images/gallery/hair/hair_1',
  subSkills: [
    { id: 'hair-1', title: 'Wig Styling', description: 'Cutting and styling of wigs for different characters, from long loose hair to short, structured looks.', publicId: 'caiden_landing_images/gallery/hair/hair_1', tags: ['Wigs', 'Cutting', 'Styling'], gallery: SKILL_GALLERIES['hair-1'] || [] }
  ],
  gallery: [{ type: 'image', publicId: 'caiden_landing_images/gallery/hair/hair_1' }],
};
