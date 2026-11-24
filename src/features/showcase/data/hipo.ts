// Restored from the old showcase (removed in "desacople zoom grid"), in the current data format.
// Photos re-uploaded to Cloudinary under caiden_landing_images/gallery/hipo (the old hipo_1/2/3 IDs were 404).
export const hipoData = {
  title: 'DreamWorks',
  subtitle: 'Hiccup – How to Train Your Dragon // 2022',
  subtitleClassName: 'text-[#dc2626]',
  description: 'Study of organic surfaces and anatomy through a multi-material sculpture build.',
  descBorderClassName: 'border-[#dc2626]',
  bg: 'caiden_landing_images/gallery/hipo/hipo_3',
  bgOverlayClassName: 'bg-red-600/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one used for the zoom studies
  gallery: [
    'caiden_landing_images/gallery/hipo/hipo_2',
    'caiden_landing_images/gallery/hipo/hipo_4',
    'caiden_landing_images/gallery/hipo/hipo_3',
  ],
  zoomDetails: [
    { id: 1, label: 'Detail', zoom: 1.1, position: '50% 35%' },
    { id: 2, label: 'Full', zoom: 1.0, position: '50% 50%' },
  ],
} as const;
