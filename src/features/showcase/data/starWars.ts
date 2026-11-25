export const starWarsData = {
  title: 'Lucasfilm',
  subtitle: 'Star Wars',
  subtitleClassName: 'text-[#ef4444]',
  description: 'Praetorian Guard armor, the red elite protectors of the Supreme Leader.',
  descBorderClassName: 'border-[#ef4444]',
  bg: 'caiden_landing_images/gallery/star_wars/star_wars_2',
  bgOverlayClassName: 'bg-red-700/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one shown in the middle as the study
  gallery: [
    'caiden_landing_images/gallery/star_wars/star_wars_1',
    'caiden_landing_images/gallery/star_wars/star_wars_3',
    'caiden_landing_images/gallery/star_wars/star_wars_2',
  ],
  zoomDetails: [
    { id: 1, label: 'Detail', zoom: 1.1, position: '50% 40%' },
    { id: 2, label: 'Full', zoom: 1.0, position: '50% 50%' },
  ],
} as const;
