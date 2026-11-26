const ROOT = 'caiden_landing_images/gallery';

export type CompactBuild = {
  /** Anchor id (e.g. /gallery#vikings). */
  id: string;
  title: string;
  subtitle: string;
  subtitleClassName: string;
  descBorderClassName: string;
  description: string;
  /** The first photo is the card; the others show as thumbnails over it. */
  gallery: readonly string[];
  position?: string;
  /** Scale the card photo to get closer to the piece. */
  zoom?: number;
  /** Takes two columns. */
  wide?: boolean;
  /** The card photo changes on its own through the gallery. */
  rotate?: boolean;
  /** Rotating photos shown whole (over a blurred copy) because cropping would cut the piece. */
  uncropped?: readonly string[];
};

const skyrim = {
  title: 'Bethesda',
  subtitleClassName: 'text-[#9ca3af]',
  descBorderClassName: 'border-[#9ca3af]',
};

/** Builds with only one or two photos: shown as compact cards instead of a full section each. */
export const compactBuilds: readonly CompactBuild[] = [
  {
    id: 'aion',
    title: 'NCSoft',
    subtitle: 'Aion // 2016',
    subtitleClassName: 'text-[#a5b4fc]',
    descBorderClassName: 'border-[#a5b4fc]',
    description: 'Full silver armor set with a large polearm and shield.',
    gallery: [`${ROOT}/aion/aion_1`, `${ROOT}/aion/aion_2`],
  },
  {
    id: 'hazbin-hotel',
    title: 'Prime Video',
    subtitle: 'Hazbin Hotel // 2019',
    subtitleClassName: 'text-[#facc15]',
    descBorderClassName: 'border-[#facc15]',
    description: 'Character costume with a sculpted mask, layered wings and staff.',
    gallery: [`${ROOT}/hazbin_hotel/hazbin_hotel_1`],
    position: '50% 20%',
  },
  {
    id: 'vikings',
    title: 'MGM Television',
    subtitle: 'Vikings // 2017',
    subtitleClassName: 'text-[#7dd3fc]',
    descBorderClassName: 'border-[#7dd3fc]',
    description: 'Made for an MGM Television advertising campaign. Lagertha, with leather armor, layered fabrics and sword.',
    gallery: [`${ROOT}/vikings/vikings_1`],
  },
  {
    ...skyrim,
    id: 'skyrim-companion',
    subtitle: 'Skyrim',
    description: 'Companion armor made for a dog, with horned helmet and layered plates.',
    gallery: [`${ROOT}/skyrim/skyrim_dog_1`],
  },
  {
    id: 'zombie',
    title: 'Zombie',
    subtitle: 'Makeup & Prosthetics',
    subtitleClassName: 'text-[#f87171]',
    descBorderClassName: 'border-[#f87171]',
    description: 'Undead makeup with a large mutated arm piece.',
    gallery: [`${ROOT}/unassigned/zombie_1`],
    position: '40% 30%',
    wide: true,
  },
];

/** Props and weapons, gathered in one grid at the end of the gallery. */
export const propBuilds: readonly CompactBuild[] = [
  {
    id: 'apex-legends',
    title: 'Respawn Entertainment',
    subtitle: 'Apex Legends // 2019',
    subtitleClassName: 'text-[#f87171]',
    descBorderClassName: 'border-[#f87171]',
    description: 'Weapons and heirlooms from the game, several of them with integrated lighting.',
    gallery: [
      `${ROOT}/apex/apex_5`,
      `${ROOT}/apex/apex_1`,
      `${ROOT}/apex/apex_4`,
      `${ROOT}/apex/apex_2`,
      `${ROOT}/apex/apex_3`,
      `${ROOT}/unassigned/props_10`,
    ],
    wide: true,
    rotate: true,
    uncropped: [`${ROOT}/apex/apex_4`],
  },
  {
    id: 'god-of-war',
    title: 'Santa Monica Studio',
    subtitle: 'God of War // 2018',
    subtitleClassName: 'text-[#fb923c]',
    descBorderClassName: 'border-[#fb923c]',
    description: 'The Leviathan Axe, with carved runes and a weathered finish.',
    gallery: [`${ROOT}/god_of_war/god_of_war_1`],
    zoom: 1.25,
    position: '65% 50%',
  },
  {
    ...skyrim,
    id: 'skyrim-skulls',
    subtitle: 'Skyrim',
    description: 'Dragon skull with a dark finish and red internal lighting.',
    gallery: [`${ROOT}/unassigned/props_6`],
  },
  {
    id: 'custom-weapons',
    title: 'Custom Weapons',
    subtitle: 'Props',
    subtitleClassName: 'text-[#60a5fa]',
    descBorderClassName: 'border-[#60a5fa]',
    description: 'Blades and sidearms with layered details and painted finishes.',
    gallery: [`${ROOT}/unassigned/props_3`],
    wide: true,
  },
];
