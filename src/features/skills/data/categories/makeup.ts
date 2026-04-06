import type { CraftsmanshipCategory } from '../types';
import { SKILL_GALLERIES } from '../galleries';

export const FX_MAKEUP: CraftsmanshipCategory = {
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
};
