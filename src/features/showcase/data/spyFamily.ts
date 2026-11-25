export const spyFamilyData = {
  title: 'Wit Studio',
  subtitle: 'Spy x Family // 2022',
  subtitleClassName: 'text-[#eab308]',
  description: 'Loid Forger, a clean and tailored take on the spy known as Twilight.',
  descBorderClassName: 'border-[#eab308]',
  bg: 'caiden_landing_images/gallery/spy_family/spy_family_3',
  bgOverlayClassName: 'bg-yellow-700/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one shown in the middle as the study
  gallery: [
    'caiden_landing_images/gallery/spy_family/spy_family_1',
    'caiden_landing_images/gallery/spy_family/spy_family_2',
    'caiden_landing_images/gallery/spy_family/spy_family_3',
  ],
  zoomDetails: [
    { id: 1, label: 'Detail', zoom: 1.1, position: '50% 40%' },
    { id: 2, label: 'Full', zoom: 1.0, position: '50% 50%' },
  ],
} as const;
