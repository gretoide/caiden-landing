export const eldenRingData = {
  title: 'Bandai Namco',
  subtitle: 'ELDEN RING – FROM SOFTWARE // 2024',
  subtitleClassName: 'text-red-500',
  description: 'Built to match the brutal, gothic world of the Lands Between. High-fidelity craftsmanship for marketing campaign.',
  descBorderClassName: 'border-red-500',
  bg: 'horizontal_algún_lado_ta_fachera_ogjucf',
  bgOverlayClassName: 'bg-red-600/20 mix-blend-overlay',
  blurClassName: 'blur-sm',
  // Consolidated everything into gallery as requested. 
  // [0] is banner, [1-4] are mosaic, [5-8] are focus grid
  gallery: [
    'elden_ring_1_e7ast7',  // Banner
    'elden_ring_5_nbxteg',  // Mosaic 1
    'H1_l72pkt', // Mosaic 2
    'copy_of_h3_tntpjf_6d8eb5',  // Mosaic 3
    'H2_farxom',  // Mosaic 4
    'elden_ring_6_k5z39c',  // Focus Main
    'H4_ptxoik',  // Focus Detail 1 (placeholder/repeat if no more unique)
    'copy_of_copy_of_h5_p0mki9_987d97_75b764', // Focus Detail 2
    'H7_yzdgsy',  // Focus Detail 3
  ]
} as const;
