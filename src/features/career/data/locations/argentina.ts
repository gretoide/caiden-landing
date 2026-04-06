import type { LocationItem } from '../types';

export const ARGENTINA_LOCATIONS: LocationItem[] = [
  {
    id: 'entre-rios',
    name: 'Entre Ríos',
    provinceName: 'Entre Ríos', 
    country: 'Argentina',
    lat: -31.7747,
    lng: -60.4956,
    description: 'Central hub with a rich history of brand collaborations across Concordia, Paraná, and the Uruguay River region.',
    events: [
      { city: 'Concordia', name: 'Frikimania', logoId: '2019_Feb_i8ywbx', years: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], type: 'CONVENTION', lat: -31.3927, lng: -58.0202 },
      { city: 'Paraná', name: 'Paraná Comic Con', logoId: '2024_May_2_nnfc8i', years: ['2024'], type: 'INTERNATIONAL', lat: -31.7444, lng: -60.5175 },
      { city: 'Gualeguaychú', name: 'Neo Freak', logoId: '2024_Ago_1_m01lci', years: ['2024'], type: 'CONVENTION', lat: -33.0094, lng: -58.5147 },
      { city: 'Villa Adela', name: 'Mirai Fest', logoId: '2022_Feb_niodok', years: ['2022', '2023'], type: 'FESTIVAL', lat: -31.4397, lng: -58.0673 },
      { city: 'Concordia', name: 'Gamer Fest', logoId: '2023_May_2_m6mzrr', years: ['2023'], type: 'GAMING EXHIBITION', lat: -31.3927, lng: -58.0202 },
      { city: 'Concordia', name: 'Asia Fest', logoId: '2016_Jul_wddizo', years: ['2015', '2016', '2017', '2018', '2019'], type: 'FESTIVAL', lat: -31.3927, lng: -58.0202 },
      { city: 'Paraná', name: 'Ein B-Pop', logoId: '2023_May_1_mq94dr', years: ['2023'], type: 'EVENT', lat: -31.7444, lng: -60.5175 },
      { city: 'Villaguay', name: 'Neko Fest', logoId: '2017_May_kcz85v', years: ['2017', '2018'], type: 'FAN EVENT', lat: -31.8653, lng: -59.0269 },
      { city: 'Colón', name: 'Kyubi Fest', logoId: '2018_Abril_2_yo6cug', years: ['2018'], type: 'FESTIVAL', lat: -32.2217, lng: -58.1439 },
      { city: 'Concordia', name: 'Zombie Walk', logoId: '2018_Nov_m4b5rz', years: ['2016', '2017'], type: 'THEMED', lat: -31.3927, lng: -58.0202 }
    ]
  },
  {
    id: 'misiones',
    name: 'Misiones',
    provinceName: 'Misiones',
    country: 'Argentina',
    lat: -27.3671,
    lng: -55.8961,
    description: 'Northeastern operations with focus on long-running series like Ichi Ni San in Posadas.',
    events: [
      { city: 'Posadas', name: 'Ichi Ni San Fest', logoId: '2016_Nov_udjntt', years: ['2016', '2023'], type: 'FESTIVAL' },
      { city: 'Posadas', name: 'Cosplay & Games', logoId: '2017_Ago_2_z4f0xp', years: ['2017'], type: 'GAMING EXHIBITION' }
    ]
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires / CABA',
    provinceName: 'Buenos Aires',
    country: 'Argentina',
    lat: -34.6037,
    lng: -58.3816,
    description: 'National capital operations and major event headquarters, including international Comic Con brand.',
    events: [
      { city: 'CABA', name: 'Comic Con', logoId: '2023_Dec_sevrvj', years: ['2016', '2017', '2023', '2024', '2025'], type: 'INTERNATIONAL', lat: -34.6037, lng: -58.3816 },
      { city: 'CABA', name: 'Anime Con', logoId: '2023_Sep_2_npt6jh', years: ['2022', '2024'], type: 'INTERNATIONAL', lat: -34.6037, lng: -58.3816 },
      { city: 'CABA', name: 'Anime Friends', logoId: '2015_Jul_2_l0hym6', years: ['2015'], type: 'EXHIBITION', lat: -34.6037, lng: -58.3816 },
      { city: 'CABA', name: 'ComiCópolis', logoId: '2015_Sep_kmri9d', years: ['2015'], type: 'CONVENTION', lat: -34.6037, lng: -58.3816 },
      { city: 'CABA', name: 'Anime Expo', logoId: '2018_Jul_2_pxdngc', years: ['2018'], type: 'CONVENTION', lat: -34.6037, lng: -58.3816 },
      { city: 'CABA', name: 'AGS', logoId: '2023_Oct_kja7mq', years: ['2023'], type: 'GAMING EXHIBITION', lat: -34.6037, lng: -58.3816 },
      { city: 'Tandil', name: 'Kawaii Koto', logoId: '2023_Sep_1_ajbiqh', years: ['2023'], type: 'CULTURE', lat: -37.3217, lng: -59.1331 },
      { city: 'CABA', name: 'Martin Fierro Digital', logoId: '2024_Ago_3_rlvmal', years: ['2024'], type: 'AWARDS', rank: 'AWARD', lat: -34.6037, lng: -58.3816 }
    ]
  },
  {
    id: 'santa-cruz',
    name: 'Santa Cruz',
    provinceName: 'Santa Cruz',
    country: 'Argentina',
    lat: -51.62,
    lng: -69.21,
    description: 'Deep south operational coverage and extreme environment deployments.',
    events: [
      { city: 'Caleta Olivia', name: 'Kogarashi Fest', logoId: '2024_May_1_tiod5h', years: ['2024'], type: 'FESTIVAL', lat: -46.4397, lng: -67.5200 },
      { city: 'Calafate', name: 'Feña', logoId: '2024_Nov_2_tn9sgf', years: ['2024'], type: 'THEMED', lat: -50.3449, lng: -72.2721 }
    ]
  },
  {
    id: 'chubut',
    name: 'Chubut',
    provinceName: 'Chubut',
    country: 'Argentina',
    lat: -43.29,
    lng: -65.10,
    description: 'Patagonian presence through strategic event collaborations.',
    events: [
      { city: 'Comodoro Rivadavia', name: 'Banzai', logoId: '2017_Ago_1_ebbazm', years: ['2017'], type: 'CONVENTION' }
    ]
  },
  {
    id: 'formosa',
    name: 'Formosa',
    provinceName: 'Formosa',
    country: 'Argentina',
    lat: -26.18,
    lng: -58.17,
    description: 'Northern frontier brand integrations.',
    events: [
      { city: 'Formosa Capital', name: 'AVK Natsu Geek', logoId: '2018_Ene_zfirdd', years: ['2018'], type: 'CONVENTION' }
    ]
  },
  {
    id: 'santiago-del-estero',
    name: 'Santiago del Estero',
    provinceName: 'Santiago del Estero',
    country: 'Argentina',
    lat: -27.78,
    lng: -64.26,
    description: 'North-central regional deployments.',
    events: [
      { city: 'Santiago Capital', name: 'Anime Town', logoId: '2018_Abril_1_t2twv4', years: ['2018'], type: 'FESTIVAL' }
    ]
  },
  {
    id: 'santa-fe',
    name: 'Santa Fe',
    provinceName: 'Santa Fe',
    country: 'Argentina',
    lat: -31.63,
    lng: -60.70,
    description: 'Major regional coordination and commercial integrations.',
    events: [
      { city: 'Rosario', name: 'D.M.O', logoId: '2019_Mar_a4qoex', years: ['2019'], type: 'EXHIBITION', lat: -32.9468, lng: -60.6393 },
      { city: 'Rosario', name: 'Crack Bang Boom', logoId: '2023_Ago_2_ugqa2j', years: ['2016', '2023', '2024'], type: 'INTERNATIONAL', lat: -32.9416, lng: -60.6322 }
    ]
  },
  {
    id: 'rio-negro',
    name: 'Río Negro',
    provinceName: 'Río Negro',
    country: 'Argentina',
    lat: -40.81,
    lng: -63.00,
    description: 'Southern operational baseline in Viedma region.',
    events: [
      { city: 'Viedma', name: 'Comarca Fest', logoId: '2019_Jul_gwrkyu', years: ['2019'], type: 'FESTIVAL' }
    ]
  },
  {
    id: 'cordoba',
    name: 'Córdoba',
    provinceName: 'Córdoba',
    country: 'Argentina',
    lat: -31.42,
    lng: -64.18,
    description: 'Central logistic and marketing hub for nationwide events.',
    events: [
      { city: 'Córdoba Capital', name: 'CAF', logoId: '2023_Abr_dssdkl', years: ['2023'], type: 'CONVENTION' },
      { city: 'San Francisco', name: 'FrikiFest', logoId: '2024_Sep_1_oam2kd', years: ['2024'], type: 'EVENT' }
    ]
  },
  {
    id: 'la-pampa',
    name: 'La Pampa',
    provinceName: 'La Pampa',
    country: 'Argentina',
    lat: -36.61,
    lng: -64.28,
    description: 'Strategic integrations for national gaming expos.',
    events: [
      { city: 'General Pico', name: 'Fan Expo 4.0 x AGS', logoId: '2023_Sep_3_f6pict', years: ['2023'], type: 'GAMING EXHIBITION' }
    ]
  },
  {
    id: 'chaco',
    name: 'Chaco',
    provinceName: 'Chaco',
    country: 'Argentina',
    lat: -27.45,
    lng: -58.98,
    description: 'Northeastern regional brand reach.',
    events: [
      { city: 'Resistencia', name: 'Comic World', logoId: '2023_Nov_wbqtbx', years: ['2023'], type: 'INTERNATIONAL' }
    ]
  },
  {
    id: 'jujuy',
    name: 'Jujuy',
    provinceName: 'Jujuy',
    country: 'Argentina',
    lat: -24.18,
    lng: -65.30,
    description: 'Northernmost operational sector tracking.',
    events: [
      { city: 'San Salvador', name: 'Funnanime', logoId: '2024_Sep_2_vyqyqb', years: ['2024'], type: 'EXHIBITION' }
    ]
  },
  {
    id: 'san-luis',
    name: 'San Luis',
    provinceName: 'San Luis',
    country: 'Argentina',
    lat: -33.30,
    lng: -66.33,
    description: 'Cuyo region strategic integrations.',
    events: [
      { city: 'San Luis Capital', name: '3DFest', logoId: '2024_Oct_2_gj9wxq', years: ['2024'], type: 'FESTIVAL' }
    ]
  },
  {
    id: 'corrientes',
    name: 'Corrientes',
    provinceName: 'Corrientes',
    country: 'Argentina',
    lat: -27.46,
    lng: -58.83,
    description: 'Mesopotamian regional coordination and brand awards.',
    events: [
      { city: 'Corrientes Capital', name: 'K-Anime', logoId: '2024_Nov_1_zkt9qu', years: ['2024'], type: 'EVENT' },
      { city: 'Corrientes Capital', name: 'Blaze Awards', logoId: 'B_jdz75u', years: ['2024'], type: 'AWARDS', rank: 'AWARD' }
    ]
  }
];
