export const eldenRingData = {
  title: 'Elden Ring',
  subtitle: 'Shadow of the Erdtree — 2024',
  subtitleClassName: 'text-red-500',
  description: 'Built to match the brutal, gothic world of the Lands Between. High-fidelity craftsmanship with active motorized components.',
  descBorderClassName: 'border-red-500',
  bg: 'horizontal_algún_lado_ta_fachera_ogjucf',
  bgOverlayClassName: 'bg-red-600/20 mix-blend-overlay',
  blurClassName: 'blur-sm',
  // Consolidated everything into gallery as requested. 
  // [0] is banner, [1-4] are mosaic, [5-8] are focus grid
  gallery: [
    'elden_ring_1_e7ast7',  // Banner
    'elden_ring_5_nbxteg',  // Mosaic 1
    'elden_ring_10_n1jah8', // Mosaic 2
    'elden_ring_8_gmazch',  // Mosaic 3
    'elden_ring_7_mpj69h',  // Mosaic 4
    'elden_ring_6_k5z39c',  // Focus Main
    'elden_ring_5_nbxteg',  // Focus Detail 1 (placeholder/repeat if no more unique)
    'elden_ring_10_n1jah8', // Focus Detail 2
    'elden_ring_8_gmazch',  // Focus Detail 3
  ]
} as const;
