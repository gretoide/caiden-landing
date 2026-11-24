// Restored from the old showcase (removed in "desacople zoom grid"), in the current data format.
export const chainsawManData = {
  title: 'MAPPA',
  subtitle: 'Chainsaw Man // 2023',
  subtitleClassName: 'text-[#f97316]',
  description: 'A highly complex helmet and weapon rig prioritizing visual accuracy. Incorporates active motorized electronics.',
  descBorderClassName: 'border-[#f97316]',
  bg: 'chainsaw_3_uligns',
  bgOverlayClassName: 'bg-orange-600/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one used for the zoom studies
  gallery: [
    'chainsaw_2_qwerzf',
    'chainsaw_1_azfqly',
    'chainsaw_3_uligns',
  ],
  zoomDetails: [
    { id: 2, label: 'Engine', zoom: 1.1, position: '45% 25%' },
    { id: 1, label: 'Saw Detail', zoom: 1.0, position: '50% 20%' },
  ],
} as const;
