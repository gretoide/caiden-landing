import type { CraftsmanshipCategory, CraftsmanshipMetadata } from './types';

export * from './types';

export const SKILLS_CONTENT = {
  mainHeader: {
    title: 'CRAFTSMANSHIP',
  },
  allExpertiseHeader: {
    title: 'ALL EXPERTISE',
    description: 'A comprehensive collection of specialized technical skills and artistic disciplines developed across a decade of professional practice in the entertainment industry.',
  },
  categories: [
    {
      id: 'fx-makeup',
      title: 'Makeup & Prosthetics',
      subtitle: 'Prosthetics & Skin Textures',
      description: 'Advanced multidisciplinary practice combining artistic makeup, prosthetic integration, and SFX fabrication techniques, with an emphasis on lifelike finishes, dimensional depth, and material-driven texture creation.',
      publicId: 'got_1_otuw4y',
    },
    {
      id: 'woodworking',
      title: 'Wood working',
      subtitle: 'Modern Craftsmanship',
      description: 'Comprehensive woodworking services blending manual hand working with modern fabrication for structural prop integrity.',
      publicId: '0_-_Wood_Working_qttihy',
    },
    {
      id: '3d-design',
      title: '3D & Digital',
      subtitle: '3D Modeling and Artistic Digital Media',
      description: 'Multidisciplinary designer with experience in the full creative process. Fully oriented to bring the ideas to the real world.',
      publicId: '0_-_3D_Digital_qcfqhs',
    },
    {
      id: 'textiles',
      title: 'Fabrics & Sewing',
      subtitle: 'Fabrics & Patterning',
      description: 'Experience in garment construction, manual and computerized embroidery, and pattern making.',
      publicId: '0_-_Fabrics_Sewing_xt7zay',
    },
    {
      id: 'lights-work',
      title: 'Lighting',
      subtitle: 'Electronics & Arduino',
      description: 'Integrated electronic systems and interactive illumination designed to bring props to life.',
      publicId: '0_-_Lightning_lblfpq',
    },
    {
      id: 'skilled-materials',
      title: 'Skilled Materials',
      subtitle: 'Resins & Synthetics',
      description: 'Master-level manipulation of specialized composites and industrial synthetics for unique material properties.',
      publicId: '2.1_-_Resins_-_0_el9as6',
    },
    {
      id: 'painting',
      title: 'Painting',
      subtitle: 'Airbrushing & Weathering',
      description: 'Cinematic finishing techniques focused on material realism, environmental aging, and visual contrast.',
      publicId: '0_-_Painting_nisxnq',
    },
    {
      id: 'inorganic',
      title: 'Sculpting & Modeling',
      subtitle: 'High Definition Textures',
      description: 'Mastery of non-organic textures and industrial modeling to replicate hard-surface materials with hyper-realistic detail.',
      publicId: '0_-_Sculping_Modeling_xlweee',
    },
  ] as CraftsmanshipMetadata[],
  uiLabels: {
    ctaExplore: 'Explore Work',
    back: 'Return to Categories',
    explore: 'Explore More',
    jump: 'Quick Jump',
  },
};

/**
 * Dynamically loads the full details for a skill category.
 */
export async function loadCategoryDetails(id: string): Promise<CraftsmanshipCategory> {
  switch (id) {
    case 'fx-makeup':
      return (await import('./categories/makeup')).FX_MAKEUP;
    case 'woodworking':
      return (await import('./categories/woodworking')).WOODWORKING;
    case '3d-design':
      return (await import('./categories/digital')).DIGITAL;
    case 'textiles':
      return (await import('./categories/textiles')).TEXTILES;
    case 'lights-work':
      return (await import('./categories/lighting')).LIGHTING;
    case 'skilled-materials':
      return (await import('./categories/materials')).MATERIALS;
    case 'painting':
      return (await import('./categories/painting')).PAINTING;
    case 'inorganic':
      return (await import('./categories/sculpting')).SCULPTING;
    default:
      throw new Error(`Unknown category: ${id}`);
  }
}
