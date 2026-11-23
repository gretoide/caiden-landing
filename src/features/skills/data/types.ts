export type GalleryItem = {
  type: 'image' | 'video';
  publicId: string;
  /** Videos only: cut the clip at this second (e.g. to drop dead/black footage so it loops cleanly). */
  endOffset?: number;
  /** Videos only: [start, end] ranges (seconds) the player jumps over, e.g. a badly edited clip. */
  skip?: [number, number][];
};

export type SubSkill = {
  id: string;
  title: string;
  description: string;
  publicId: string;
  tags: string[];
  gallery: GalleryItem[]; 
};

/** Metadata required to render the initial UI blades/tabs */
export type CraftsmanshipMetadata = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  publicId: string;
};

/** Full category data including subskills and galleries */
export type CraftsmanshipCategory = CraftsmanshipMetadata & {
  expandedDetails: string;
  subSkills: SubSkill[]; 
  gallery: GalleryItem[]; 
};
