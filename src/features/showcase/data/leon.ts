export const leonData = {
  title: 'Leon S. Kennedy',
  subtitle: 'Resident Evil 4',
  subtitleClassName: 'text-[#a8a29e]',
  description: '',
  descBorderClassName: 'border-[#a8a29e]',
  bg: 'caiden_landing_images/gallery/leon/leon_3',
  bgOverlayClassName: 'bg-stone-600/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one shown in the middle as the study
  gallery: [
    'caiden_landing_images/gallery/leon/leon_2',
    'caiden_landing_images/gallery/leon/leon_1',
    'caiden_landing_images/gallery/leon/leon_3',
  ],
  zoomDetails: [
    { id: 1, label: 'Detail', zoom: 1.1, position: '50% 35%' },
    { id: 2, label: 'Full', zoom: 1.0, position: '50% 50%' },
  ],
} as const;
