// Restored from the old showcase (removed in "desacople zoom grid"), in the current data format.
// NOTE: these Cloudinary photos (hipo_1/2/3) no longer exist (404), so the section is not shown on
// /gallery yet. Upload the photos again (or put their new public IDs here) and enable it in GalleryPage.
export const hipoData = {
  title: 'DreamWorks',
  subtitle: 'Hiccup – How to Train Your Dragon // 2022',
  subtitleClassName: 'text-[#dc2626]',
  description: 'Study of organic surfaces and anatomy through a multi-material sculpture build.',
  descBorderClassName: 'border-[#dc2626]',
  bg: 'hipo_2_j75ppj',
  bgOverlayClassName: 'bg-red-600/20 mix-blend-overlay',
  blurClassName: 'blur-md',
  // [0] and [1] are the two context photos, [2] is the one used for the zoom studies
  gallery: [
    'hipo_2_j75ppj',
    'hipo_3_d3dn5v',
    'hipo_1_lsxprc',
  ],
  zoomDetails: [{ id: 1, label: 'Detail', zoom: 2.2, position: '50% 45%' }],
} as const;
