export type GalleryItem = {
  type: 'image' | 'video';
  publicId: string;
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
