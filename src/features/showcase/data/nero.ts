export const neroData = {
  title: 'Capcom',
  subtitle: 'Devil May Cry 5',
  subtitleClassName: 'text-[#38bdf8]',
  description: 'Nero, built around the costume, wig styling and signature gear of the demon hunter.',
  descBorderClassName: 'border-[#38bdf8]',
  bg: 'caiden_landing_images/gallery/nero/nero_3',
  bgOverlayClassName: 'bg-sky-600/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one shown in the middle as the study
  gallery: [
    'caiden_landing_images/gallery/nero/nero_2',
    'caiden_landing_images/gallery/nero/nero_4',
    'caiden_landing_images/gallery/nero/nero_3',
  ],
  zoomDetails: [
    { id: 1, label: 'Detail', zoom: 1.1, position: '50% 40%' },
    { id: 2, label: 'Full', zoom: 1.0, position: '50% 50%' },
  ],
} as const;
