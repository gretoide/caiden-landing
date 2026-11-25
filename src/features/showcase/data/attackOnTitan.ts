export const attackOnTitanData = {
  title: 'MAPPA',
  subtitle: 'Attack on Titan // 2020',
  subtitleClassName: 'text-[#a3b18a]',
  description: 'Survey Corps uniform and signature ODM gear, built for an advertising campaign with IVREA, the manga publisher.',
  descBorderClassName: 'border-[#a3b18a]',
  bg: 'caiden_landing_images/gallery/aot/aot_3',
  bgOverlayClassName: 'bg-emerald-900/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one shown in the middle as the study
  gallery: [
    'caiden_landing_images/gallery/aot/aot_2',
    'caiden_landing_images/gallery/aot/aot_1',
    'caiden_landing_images/gallery/aot/aot_3',
  ],
  // aot_2 is a landscape shot with the subject right of center: shift the crop so he is centered
  context1Position: '74% 50%',
  zoomDetails: [
    { id: 1, label: 'Detail', zoom: 1.1, position: '50% 30%' },
    { id: 2, label: 'Full', zoom: 1.0, position: '50% 50%' },
  ],
} as const;
