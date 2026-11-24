export const hippolytaData = {
  title: 'Hippolyta',
  subtitle: 'Queen of the Amazons',
  subtitleClassName: 'text-[#d4a373]',
  description: '',
  descBorderClassName: 'border-[#d4a373]',
  bg: 'caiden_landing_images/gallery/hippolyta/hippolyta_3',
  bgOverlayClassName: 'bg-amber-600/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one shown in the middle as the study
  gallery: [
    'caiden_landing_images/gallery/hippolyta/hippolyta_1',
    'caiden_landing_images/gallery/hippolyta/hippolyta_2',
    'caiden_landing_images/gallery/hippolyta/hippolyta_3',
  ],
  zoomDetails: [
    { id: 1, label: 'Detail', zoom: 1.1, position: '50% 35%' },
    { id: 2, label: 'Full', zoom: 1.0, position: '50% 50%' },
  ],
} as const;
