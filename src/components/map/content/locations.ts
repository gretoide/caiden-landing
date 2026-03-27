// src/modules/EventMap/content/locations.ts
export const LOCATIONS = [
  {
    id: 'entre-rios',
    name: 'Entre Ríos',
    provinceName: 'Entre Ríos', 
    country: 'Argentina',
    lat: -31.7747,
    lng: -60.4956,
    description: 'Central operations hub with a rich history of recurring conventions and thematic festivals in Paraná and Concordia.',
    events: [
      { city: 'Paraná', name: 'Asia Fest', logoId: '2016_Jul_wddizo', years: ['2016', '2017', '2018', '2019'], type: 'Festival', rank: '1º Puesto' },
      { city: 'Paraná', name: 'Zombie Walk', logoId: '2018_Nov_m4b5rz', years: ['2016', '2017'], type: 'Themed' },
      { city: 'Concordia', name: 'Frikimania', logoId: '2019_Feb_i8ywbx', years: ['2017', '2018', '2019', '2020', '2021', '2022', '2024'], type: 'Convention', rank: '1º Puesto' },
      { city: 'Paraná', name: 'Neko Fest', logoId: '2017_May_kcz85v', years: ['2017', '2018'], type: 'Fan Event' },
      { city: 'Paraná', name: 'Mirai Fest', logoId: '2022_Feb_niodok', years: ['2022', '2023'], type: 'Festival' },
      { city: 'Paraná', name: 'Kyubi Fest', logoId: '2018_Abril_2_yo6cug', years: ['2018'], type: 'Festival' },
      { city: 'Concordia', name: 'Gamer Fest', logoId: '2023_May_2_m6mzrr', years: ['2023'], type: 'Gaming' },
      { city: 'Paraná', name: 'Paraná Comic Con', logoId: '2024_May_2_nnfc8i', years: ['2024'], type: 'Comic Con' },
      { city: 'Paraná', name: 'Neo Freak', logoId: '2024_Ago_1_m01lci', years: ['2024'], type: 'Convention' }
    ]
  },
  // ... (other locations omitted for brevity; copy from original file as needed)
];
