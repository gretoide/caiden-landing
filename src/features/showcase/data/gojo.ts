export const gojoData = {
  title: 'MAPPA',
  subtitle: 'Jujutsu Kaisen // 2020',
  subtitleClassName: 'text-[#a78bfa]',
  description: 'Satoru Gojo brought to life for an advertising campaign with IVREA, the manga publisher.',
  descBorderClassName: 'border-[#a78bfa]',
  bg: 'caiden_landing_images/gallery/gojo/gojo_2',
  bgOverlayClassName: 'bg-violet-600/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one shown in the middle as the study
  gallery: [
    'caiden_landing_images/gallery/gojo/gojo_1',
    'caiden_landing_images/gallery/gojo/gojo_3',
    'caiden_landing_images/gallery/gojo/gojo_2',
  ],
  zoomDetails: [
    { id: 1, label: 'Detail', zoom: 1.1, position: '50% 50%' },
    { id: 2, label: 'Full', zoom: 1.0, position: '50% 50%' },
  ],
} as const;
