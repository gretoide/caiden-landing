import type { CraftsmanshipCategory } from './types';
import { FX_MAKEUP } from './categories/makeup';
import { WOODWORKING } from './categories/woodworking';
import { DIGITAL } from './categories/digital';
import { TEXTILES } from './categories/textiles';
import { LIGHTING } from './categories/lighting';
import { MATERIALS } from './categories/materials';
import { PAINTING } from './categories/painting';
import { SCULPTING } from './categories/sculpting';

export * from './types';

export const SKILLS_CONTENT = {
  mainHeader: {
    title: 'Skills',
  },
  allExpertiseHeader: {
    title: 'ALL EXPERTISE',
    description: 'A comprehensive collection of specialized technical skills and artistic disciplines developed across a decade of professional practice in the entertainment industry.',
  },
  categories: [
    FX_MAKEUP,
    WOODWORKING,
    DIGITAL,
    TEXTILES,
    LIGHTING,
    MATERIALS,
    PAINTING,
    SCULPTING
  ] as CraftsmanshipCategory[],
  uiLabels: {
    ctaExplore: 'Explore Work',
    back: 'Return to Categories',
    explore: 'Explore More',
    jump: 'Quick Jump',
  },
};

/**
 * Returns the full details for a skill category.
 * Now synchronous as all data is loaded upfront.
 */
export function loadCategoryDetails(id: string): CraftsmanshipCategory {
  const category = SKILLS_CONTENT.categories.find(c => c.id === id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}
