import { ARGENTINA_LOCATIONS } from './locations/argentina';
import { INTERNATIONAL_LOCATIONS } from './locations/international';
import type { LocationItem } from './types';

export * from './types';

export const LOCATIONS: LocationItem[] = [
  ...ARGENTINA_LOCATIONS,
  ...INTERNATIONAL_LOCATIONS,
];
