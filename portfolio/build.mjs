// CMD Arts — printable portfolio booklet generator.
//
//   node portfolio/build.mjs          -> portfolio/CMD-Arts-Portfolio.pdf      (print quality, ~300dpi photos)
//   node portfolio/build.mjs --light  -> portfolio/CMD-Arts-Portfolio-web.pdf  (lighter, for email/WhatsApp)
//
// Writes portfolio/portfolio.html (open it in a browser to preview) and prints it to PDF with
// headless Chrome / Edge. Photos come straight from Cloudinary (same public ids as the landing,
// see src/features/**/data). Standalone on purpose: it does not import from src/.

import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const light = process.argv.includes('--light');
const SCALE = light ? 0.45 : 1;
const QUALITY = light ? 72 : 88;

// --- Cloudinary ------------------------------------------------------------------------------
function envValue(key) {
  if (process.env[key]) return process.env[key];
  const envFile = join(root, '.env');
  if (!existsSync(envFile)) return undefined;
  const line = readFileSync(envFile, 'utf8').split(/\r?\n/).find((l) => l.startsWith(`${key}=`));
  return line?.slice(key.length + 1).trim();
}
const CLOUD = envValue('VITE_CLOUDINARY_CLOUD_NAME') || 'dxsdxzyeb';
const FOLDER = (envValue('VITE_CLOUDINARY_FOLDER') || '').replace(/^\/+|\/+$/g, '');

/** Cloudinary URL sized for print: `w` is the pixel width at 300dpi for the slot it fills. */
function img(publicId, w = 2480) {
  const pid = (FOLDER ? `${FOLDER}/${publicId}` : publicId).split('/').map(encodeURIComponent).join('/');
  const width = Math.round(w * SCALE);
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_jpg,q_${QUALITY},c_limit,w_${width}/${pid}`;
}
/** Logos keep transparency. */
function logo(publicId) {
  const pid = encodeURIComponent(publicId);
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_png,c_limit,w_${Math.round(900 * SCALE)}/${pid}`;
}

// --- Content (from the landing data files + the CV "CMD Arts.pdf") -------------------------
const BRANDS = [
  'Elden_Ring_1_gslevl', 'Diablo_otxcsa', 'Skyrim_gajcky', 'Chainsawman_i4lslc',
  'x_-_Attack_on_titan_sn2mkr', 'God_of_war_fzssrq', 'Leon_xywbmb', 'Elden_Ring_2_okov1l',
  'x_-_Detroit_Become_Human_mikxlu', 'Fate_xjczcv', 'Demon_Slayer_wifdmp',
  'Como_entrenar_a_tu_dragon_luqvxc', 'Aion_b7nzoh', 'Apex_Legends_dbovff',
];

const SKILLS = [
  { title: 'Sculpting & Modeling', sub: 'High Definition Textures', id: '0_-_Sculping_Modeling_xlweee', desc: 'Non-organic textures and industrial modeling that replicate hard-surface materials with hyper-realistic detail.' },
  { title: 'Skilled Materials', sub: 'Resins & Synthetics', id: '2.1_-_Resins_-_0_el9as6', desc: 'Specialized composites and industrial synthetics: fiberglass, resin casting, silicone molds, thermoforming.' },
  { title: 'Painting', sub: 'Airbrushing & Weathering', id: '0_-_Painting_nisxnq', desc: 'Cinematic finishing focused on material realism, environmental aging and visual contrast.' },
  { title: 'Lighting', sub: 'Electronics & Arduino', id: '0_-_Lightning_lblfpq', desc: 'Integrated electronic systems and interactive illumination designed to bring props to life.' },
  { title: '3D & Digital', sub: '3D Modeling & Digital Media', id: '0_-_3D_Digital_qcfqhs', desc: 'Blender modeling, 3D printing and vector work, from the first idea to a real-world object.' },
  { title: 'Makeup & Prosthetics', sub: 'Prosthetics & Skin Textures', id: 'got_1_otuw4y', desc: 'Artistic makeup, prosthetic integration and SFX fabrication with lifelike, dimensional finishes.' },
  { title: 'Fabrics & Sewing', sub: 'Fabrics & Patterning', id: '0_-_Fabrics_Sewing_xt7zay', desc: 'Garment construction, manual and computerized embroidery, and pattern making.' },
  { title: 'Wood Working', sub: 'Modern Craftsmanship', id: '0_-_Wood_Working_qttihy', desc: 'Hand working blended with modern fabrication for structural prop integrity.' },
];

const TOOLKIT = [
  'Fiberglass', 'Resins', 'Rubber Molding', 'Putties', 'Sculpting', 'Painting', 'Prosthetic & SFX',
  'Artistic Makeup', 'Wood Working', 'Hand Powertools', 'Sewing & Embroidery', '3D Design & 3D Printing',
  'Arduino & LED Design', 'Drawing', 'Adobe', 'SVG Vectoring',
];

const BUILDS = [
  { title: 'Survey Corps', sub: 'Attack on Titan', color: '#a3b18a', id: 'caiden_landing_images/gallery/aot/aot_3', pos: 'center 30%' },
  { title: 'Leon S. Kennedy', sub: 'Resident Evil 4', color: '#a8a29e', id: 'caiden_landing_images/gallery/leon/leon_1', pos: 'center 30%' },
  { title: 'Praetorian Guard', sub: 'Star Wars', color: '#ef4444', id: 'caiden_landing_images/gallery/star_wars/star_wars_2', pos: 'center 30%' },
  { title: 'Hippolyta', sub: 'Queen of the Amazons', color: '#d4a373', id: 'caiden_landing_images/gallery/hippolyta/hippolyta_3', pos: 'center 25%' },
  { title: 'Nero', sub: 'Devil May Cry', color: '#38bdf8', id: 'caiden_landing_images/gallery/nero/nero_3', pos: 'center 30%' },
  { title: 'Loid Forger', sub: 'Spy x Family', color: '#eab308', id: 'caiden_landing_images/gallery/spy_family/spy_family_3', pos: 'center 30%' },
  { title: 'Satoru Gojo', sub: 'Jujutsu Kaisen', color: '#a78bfa', id: 'caiden_landing_images/gallery/gojo/gojo_1', pos: 'center 30%' },
];

const GUEST_YEARS = [
  ['2024', 'Expo Convention (Uruguay) · Kogarashi Fest · Paraná Comic Con · Comic Con · Frikimania · Neo Freak · Anime Con · Martín Fierro Digital · FunnAnime · 3D Fest · K-Anime · Feña · Blaze Awards Friki · San Francisco Friki Fest'],
  ['2023', 'Mirai Fest · CAF · Gamer Fest · Comic Con · Ichi Ni San · Frikimania · AGS · Kawaii Koto · Fan Expo 4.0 × AGS · Comic World'],
  ['2022', 'Comic Con · Mirai Fest · Frikimania · Anime Con'],
  ['2020–21', 'Frikimania (three editions)'],
  ['2019', 'D.M.O · Comarca Fest · Asia Fest'],
  ['2018', 'AVK Natsu Geek · Frikimania · Anime Town · Kyubi Fest · Anime Expo · Neko Fest · Asia Fest'],
  ['2017', 'Frikimania · Neko Fest · Cosplay & Games · Banzai · Asia Fest · Comic Con · Zombie Walk'],
  ['2015–16', 'Asia Fest · Anime Friends · Anicubic · ComiCópolis · Crack Bang Boom · Comic Con · Zombie Walk · Ichi Ni San Fest'],
];

// --- Building blocks -----------------------------------------------------------------------
const footer = (n, tone = '') => `
  <div class="folio ${tone}"><span>CMD Arts — Caiden Dri</span><span>${String(n).padStart(2, '0')}</span></div>`;

const eyebrow = (text, color = 'var(--brand)') =>
  `<div class="eyebrow" style="--c:${color}"><i></i><span>${text}</span></div>`;

const photo = (id, w, pos = 'center', extra = '') =>
  `<div class="ph ${extra}"><img src="${img(id, w)}" style="object-position:${pos}" alt=""></div>`;

function projectHead({ num, client, title, subtitle, color, desc }) {
  return `
    <div class="proj-head" style="--c:${color}">
      <div class="proj-num">${num}</div>
      <div>
        ${eyebrow(client, color)}
        <h2 class="proj-title">${title}</h2>
        <div class="proj-sub">${subtitle}</div>
        ${desc ? `<p class="proj-desc">${desc}</p>` : ''}
      </div>
    </div>`;
}

// --- Pages ---------------------------------------------------------------------------------
const pages = [];

// 1. Cover
pages.push(`
<section class="page cover">
  <img class="bleed" src="${img('elden_ring_2_hhaclm', 3200)}" style="object-position:58% center" alt="">
  <div class="shade" style="background:linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 45%, rgba(0,0,0,.85) 72%, #000 100%)"></div>
  <div class="cover-top">
    <span>CMD Arts</span><span>Portfolio · 2026</span>
  </div>
  <div class="cover-body">
    <div class="kicker">― Asset Crafter ―</div>
    <h1 class="cover-name">CAIDEN <span>DRI</span></h1>
    <div class="cover-roles">
      <span>Professional <b>Propmaker</b></span><em>//</em><span>Reality <b>Sculptor</b></span>
    </div>
    <p class="cover-line">Bridging the gap between design vision and physical reality through a decade of mastery in cross-disciplinary fabrication.</p>
    <div class="cover-meta"><span>Argentina · Australia</span><span>Available worldwide</span><span>caiden.art</span></div>
  </div>
</section>`);

// 2. About
pages.push(`
<section class="page about">
  <div class="about-photo">
    <img src="${img('skyrim_6_b9efrf', 1400)}" style="object-position:40% center" alt="">
    <div class="shade" style="background:linear-gradient(to right, #050505 0%, rgba(5,5,5,.2) 28%, rgba(5,5,5,0) 60%), linear-gradient(to top, rgba(5,5,5,.9), rgba(5,5,5,0) 30%)"></div>
  </div>
  <div class="about-text">
    ${eyebrow('About the artist')}
    <h2 class="display">Good day!<br><i>I'm Caiden Mikael Dri.</i></h2>
    <p class="lead">A passionate artist who has dedicated his life to expanding his knowledge within the artistic world. Creativity and consistency are the pillars of the work.</p>
    <p>With over ten years of experience in prop making, I have mastered a wide range of techniques that have established me as one of the most recognized professionals in my field in Argentina, working on ad campaigns for multiple renowned brands and franchises.</p>
    <p>In my last year before Australia I was honored as the <b>Argentinian Cosplay Champion</b>, served as an <b>International Judge</b> at the Yamato Cosplay Cup, and my work was acknowledged at the <b>Martín Fierro Awards</b>, Argentina's equivalent of the Oscars.</p>
    <p>Today I'm based in Perth, ready to bring your dream projects to life, with every piece durable and visually stunning for any production environment.</p>
    <div class="stats">
      <div class="glass"><b>10+</b><span>Years of professional prop making</span></div>
      <div class="glass"><b>60+</b><span>Events as special guest</span></div>
      <div class="glass"><b>14</b><span>Franchises &amp; brand partners</span></div>
    </div>
    <div class="facts">
      <div><h4>Education</h4><p>Actor &amp; Film Director<br><span>C.I.C. Cinematic Investigation Center<br>Buenos Aires · 2019</span></p></div>
      <div><h4>Languages</h4><p>Spanish — native<br>English — TOEFL certified</p></div>
    </div>
    <blockquote class="quote">“Whoever represents my talent will be my worst work — the floor can't be low.”</blockquote>
  </div>
  ${footer(2)}
</section>`);

// 3. Elden Ring — opener
pages.push(`
<section class="page" style="--c:#ef4444">
  <div class="top-img" style="height:63%">
    <img src="${img('elden_ring_5_nbxteg', 2600)}" style="object-position:center 40%" alt="">
    <div class="shade" style="background:linear-gradient(to top, #050505 0%, rgba(5,5,5,0) 35%)"></div>
    <div class="glow" style="background:radial-gradient(ellipse at 30% 100%, rgba(220,38,38,.28), transparent 60%)"></div>
  </div>
  <div class="pad" style="margin-top:-10mm;position:relative">
    ${projectHead({
      num: '01',
      client: 'Bandai Namco',
      title: 'Elden Ring',
      subtitle: 'FromSoftware // 2024',
      color: '#ef4444',
      desc: 'Built to match the brutal, gothic world of the Lands Between. High-fidelity craftsmanship for a marketing campaign: a full suit of sculpted armor, weapon and shield finished to hold up under close-up photography and live events.',
    })}
    <div class="strip3">
      ${photo('copy_of_copy_of_h5_p0mki9_987d97_75b764', 900)}
      ${photo('H7_yzdgsy', 900)}
      ${photo('copy_of_h3_tntpjf_6d8eb5', 900)}
    </div>
  </div>
  ${footer(3)}
</section>`);

// 4. Elden Ring — gallery
pages.push(`
<section class="page">
  <div class="er-grid">
    ${photo('H4_ptxoik', 1300, 'center 20%', 'a')}
    ${photo('H1_l72pkt', 1600, 'center 35%', 'b')}
    ${photo('elden_ring_6_k5z39c', 900, 'center 20%', 'c')}
    ${photo('elden_ring_8_gmazch', 900, 'center 30%', 'd')}
    ${photo('elden_ring_1_e7ast7', 2480, 'center 35%', 'e')}
  </div>
  <div class="caption" style="--c:#ef4444"><b>Elden Ring</b> — Sculpted armor plates, weathered metal finishes and a full-scale weapon set, built for Bandai Namco's campaign.</div>
  ${footer(4)}
</section>`);

// 5. Diablo IV
pages.push(`
<section class="page" style="--c:#dc2626">
  <div class="pad" style="padding-bottom:6mm">
    ${projectHead({
      num: '02',
      client: 'Blizzard Entertainment',
      title: 'Diablo IV',
      subtitle: 'Blizzard // 2023',
      color: '#dc2626',
      desc: 'Built to match the brutal, gothic world of Sanctuary. The core structure uses reinforced fiberglass for durability, with ornate sculpted detail and a hand-painted gold and steel finish.',
    })}
  </div>
  <div class="d4-grid">
    ${photo('diablo_iv_3_yuwkeo', 2480, 'center 35%', 'a')}
    ${photo('diablo_iv_5_k4ddrg', 900, 'center 20%', 'b')}
    ${photo('D1_ocz8io', 900, 'center 30%', 'c')}
    ${photo('2_qsee4y', 900, 'center 40%', 'd')}
  </div>
  ${footer(5)}
</section>`);

// 6. Skyrim
pages.push(`
<section class="page" style="--c:#9ca3af">
  <div class="sk-grid">
    ${photo('skyrim_7_yqhwyx', 1300, 'center 25%')}
    ${photo('skyrim_8_nabnf5', 1300, 'center 25%')}
  </div>
  <div class="shade" style="top:auto;height:55%;background:linear-gradient(to top, #050505 30%, rgba(5,5,5,0))"></div>
  <div class="pad bottom">
    ${projectHead({
      num: '03',
      client: 'Bethesda',
      title: 'Skyrim',
      subtitle: 'The Elder Scrolls V // 2016',
      color: '#9ca3af',
      desc: "Forging the Dragonborn's legacy. Intricate use of materials to bring the celebrated Daedric armor to life in every piece, from the horned helm to the serrated war axe.",
    })}
  </div>
  ${footer(6)}
</section>`);

// 7. Chainsaw Man + Hiccup
pages.push(`
<section class="page duo">
  <div class="duo-half" style="--c:#f97316">
    <div class="row3">
      ${photo('chainsaw_2_qwerzf', 900, 'center 20%')}
      ${photo('chainsaw_1_azfqly', 900, 'center 20%')}
      ${photo('chainsaw_3_uligns', 900, 'center 20%')}
    </div>
    ${projectHead({
      num: '04',
      client: 'MAPPA',
      title: 'Chainsaw Man',
      subtitle: 'Chainsaw Man // 2023',
      color: '#f97316',
      desc: 'A highly complex helmet and weapon rig prioritizing visual accuracy. Incorporates active motorized electronics.',
    })}
  </div>
  <div class="duo-half" style="--c:#dc2626">
    <div class="row3">
      ${photo('caiden_landing_images/gallery/hipo/hipo_2', 900, 'center 20%')}
      ${photo('caiden_landing_images/gallery/hipo/hipo_3', 900, 'center 30%')}
      ${photo('caiden_landing_images/gallery/hipo/hipo_4', 900, 'center 30%')}
    </div>
    ${projectHead({
      num: '05',
      client: 'DreamWorks',
      title: 'Hiccup',
      subtitle: 'How to Train Your Dragon // 2022',
      color: '#dc2626',
      desc: 'Study of organic surfaces and anatomy through a multi-material sculpture build: Night Fury-inspired armor in sculpted leather textures.',
    })}
  </div>
  ${footer(7)}
</section>`);

// 8. Character builds
pages.push(`
<section class="page">
  <div class="builds">
    <div class="builds-intro">
      ${eyebrow('Gallery')}
      <h2 class="display sm">Character<br><i>Builds</i></h2>
      <p>Full character builds across anime, film and games: armor, weapons, wardrobe and finishing, each one made from scratch.</p>
    </div>
    ${BUILDS.map((b) => `
      <figure class="build" style="--c:${b.color}">
        <img src="${img(b.id, 800)}" style="object-position:${b.pos}" alt="">
        <figcaption><span>${b.sub}</span><b>${b.title}</b></figcaption>
      </figure>`).join('')}
    <div class="builds-more glass">
      <span>Full gallery</span>
      <b><a href="https://caiden.art/">caiden.art</a></b>
      <i>Instagram @cai.cosplay</i>
    </div>
  </div>
  ${footer(8)}
</section>`);

// 9. Skills
pages.push(`
<section class="page">
  <div class="pad">
    ${eyebrow('All expertise')}
    <h2 class="display">Skills</h2>
    <p class="lead narrow">A comprehensive collection of specialized technical skills and artistic disciplines developed across a decade of professional practice in the entertainment industry.</p>
  </div>
  <div class="skills">
    ${SKILLS.map((s) => `
      <div class="skill">
        <div class="ph"><img src="${img(s.id, 700)}" alt=""></div>
        <h3>${s.title}</h3>
        <div class="skill-sub">${s.sub}</div>
        <p>${s.desc}</p>
      </div>`).join('')}
  </div>
  <div class="pad toolkit">
    <h4>Toolkit</h4>
    <div class="tags">${TOOLKIT.map((t) => `<span>${t}</span>`).join('')}</div>
  </div>
  ${footer(9)}
</section>`);

// 10. Career / track record
pages.push(`
<section class="page career">
  <div class="pad" style="padding-bottom:5mm">
    ${eyebrow('Career')}
    <h2 class="display">Track record<br><i>across the Southern Cone</i></h2>
  </div>
  <div class="career-row">
    <div class="map glass"><img src="assets/track-record-map.jpg" alt="Map of events across Argentina and Uruguay"></div>
    <div class="career-col">
      <div class="block">
        <h4>Experience</h4>
        <h3>Lead Prop Maker &amp; Multimedia Fabricator</h3>
        <div class="when">Nov 2015 — Jan 2025 · Argentina</div>
        <p>Ten years translating complex creative briefs into production-ready physical assets for large-scale advertising events and brand activations. Composites like fiberglass, putties and resins; foams, plastics and paints; sewing and embroidery; 3D modeling, vectorization and Arduino programming.</p>
      </div>
      <div class="block">
        <h4>Great achievements</h4>
        <ul class="awards">
          <li><b>Martín Fierro Digital 2024</b><span>Prestigious national awards</span></li>
          <li><b>Argentina Game Show 2024</b><span>National champion</span></li>
          <li><b>Yamato Cosplay Cup 2024</b><span>International judge</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="pad guest">
    <h4>Special guest · 60+ events, 2015 — 2024</h4>
    <div class="years">
      ${GUEST_YEARS.map(([y, e]) => `<div><b>${y}</b><span>${e}</span></div>`).join('')}
    </div>
  </div>
  ${footer(10)}
</section>`);

// 11. Partners
pages.push(`
<section class="page partners">
  <div class="pad center">
    ${eyebrow('Trusted alliances')}
    <div class="laurels">
      <i class="laurel flip"></i>
      <h2 class="display">Strategic<br>Partners</h2>
      <i class="laurel"></i>
    </div>
    <div class="partners-line">Collaborations // Marketing // Global outreach // Cross-over events</div>
  </div>
  <div class="logos">
    ${BRANDS.map((b) => `<div class="logo glass"><img src="${logo(b)}" alt=""></div>`).join('')}
  </div>
  <div class="partners-photo">
    <img src="${img('horizontal_algún_lado_ta_fachera_ogjucf', 2480)}" style="object-position:center 45%" alt="">
    <div class="shade" style="background:linear-gradient(to bottom, #050505 0%, rgba(5,5,5,.1) 40%, rgba(5,5,5,.5) 100%)"></div>
  </div>
  ${footer(11)}
</section>`);

// 12. Back cover / contact
pages.push(`
<section class="page back">
  <img class="bleed" src="${img('elden_ring_4_y0e6ou', 2480)}" style="object-position:center 30%;opacity:.55" alt="">
  <div class="shade" style="background:linear-gradient(to bottom, #000 0%, rgba(0,0,0,.55) 35%, rgba(0,0,0,.85) 70%, #000 100%)"></div>
  <div class="back-body">
    <div class="kicker muted">Inquiries &amp; Commissions</div>
    <h2 class="back-title">Let's craft the<br><i>extraordinary</i></h2>
    <div class="rule"></div>
    <p class="back-lead">Available for film props, commercial projects and high-end private commissions. Bring your vision to life.</p>
    <div class="back-grid">
      <div class="contacts">
        <div class="contact glass"><span>WhatsApp direct</span><b><a href="https://wa.me/61494412012">+61 494 412 012</a></b></div>
        <div class="contact glass"><span>Direct email</span><b><a href="mailto:caidenmikaeldri@gmail.com">caidenmikaeldri@gmail.com</a></b></div>
        <div class="contact glass"><span>Visual portfolio</span><b><a href="https://instagram.com/cai.cosplay">@cai.cosplay</a></b></div>
        <div class="contact glass"><span>Website</span><b><a href="https://caiden.art/">caiden.art</a></b></div>
      </div>
      <a class="qr" href="https://caiden.art/"><img src="assets/qr-caiden-art.png" alt="QR code to caiden.art"></a>
    </div>
    <div class="status glass"><i></i>Currently receiving new project briefs</div>
  </div>
  <div class="back-sign">
    <span class="sig">Caiden Mikael Dri</span>
    <span>CMD Arts · Propmaker &amp; Visual Artist</span>
  </div>
</section>`);

// Inlined: file:// pages cannot load mask images from disk.
const LAUREL = `data:image/png;base64,${readFileSync(join(root, 'public/laurel_leaf.png')).toString('base64')}`;

// --- Styles --------------------------------------------------------------------------------
const css = `
@page { size: A4; margin: 0; }
:root { --brand: #60a5fa; --brand-500: #1a6cff; --bg: #050505; --navy: #020b1a; --serif: 'Cormorant Garamond', serif; --sans: 'Outfit', sans-serif; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #111; }
body { font-family: var(--sans); color: #e5e7eb; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
@media screen { body { display: flex; flex-direction: column; align-items: center; gap: 8mm; padding: 8mm 0; } }
.page { width: 210mm; height: 297mm; position: relative; overflow: hidden; background: var(--bg); break-after: page; }
.page:last-child { break-after: auto; }
img { display: block; }
a { color: inherit; text-decoration: none; }
.qr { display: block; }
.bleed { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.shade, .glow { position: absolute; inset: 0; pointer-events: none; }
.ph { position: relative; overflow: hidden; background: #0d0d0d; }
.ph img { width: 100%; height: 100%; object-fit: cover; }
.pad { padding: 16mm 16mm 0; }
.pad.bottom { position: absolute; left: 0; right: 0; bottom: 18mm; }
.center { text-align: center; display: flex; flex-direction: column; align-items: center; }
.glass { background: linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.02)); border: .25mm solid rgba(255,255,255,.12); }

/* type */
.eyebrow { display: flex; align-items: center; gap: 3mm; color: var(--c); font: 700 6.5pt var(--sans); letter-spacing: .5em; text-transform: uppercase; margin-bottom: 4mm; }
.eyebrow i { width: 9mm; height: .3mm; background: var(--c); opacity: .7; }
.center .eyebrow::after { content: ''; width: 9mm; height: .3mm; background: var(--c); opacity: .7; }
.display { font: 400 40pt/0.95 var(--serif); color: #fff; letter-spacing: .01em; }
.display i { color: rgba(255,255,255,.45); }
.display.sm { font-size: 32pt; }
.lead { font: 300 10.5pt/1.6 var(--sans); color: rgba(255,255,255,.7); margin-top: 5mm; }
.lead.narrow { max-width: 125mm; }
h4 { font: 700 6.5pt var(--sans); letter-spacing: .4em; text-transform: uppercase; color: var(--brand); margin-bottom: 3mm; }
.folio { position: absolute; left: 16mm; right: 16mm; bottom: 8mm; display: flex; justify-content: space-between; font: 500 6pt var(--sans); letter-spacing: .45em; text-transform: uppercase; color: rgba(255,255,255,.35); }

/* cover */
.cover-top { position: absolute; top: 14mm; left: 16mm; right: 16mm; display: flex; justify-content: space-between; font: 600 7pt var(--sans); letter-spacing: .6em; text-transform: uppercase; color: rgba(255,255,255,.8); }
.cover-body { position: absolute; left: 0; right: 0; bottom: 20mm; text-align: center; padding: 0 14mm; }
.kicker { color: var(--brand); font: 700 7.5pt var(--sans); letter-spacing: .6em; text-transform: uppercase; margin-bottom: 7mm; }
.kicker.muted { color: rgba(255,255,255,.45); }
.cover-name { font: italic 400 82pt/0.85 var(--serif); letter-spacing: .1em; color: #fff; margin-bottom: 8mm; }
.cover-name span { color: rgba(255,255,255,.35); }
.cover-roles { display: flex; justify-content: center; align-items: center; gap: 6mm; font: 300 10pt var(--sans); letter-spacing: .45em; text-transform: uppercase; color: #fff; margin-bottom: 8mm; }
.cover-roles b { font-weight: 700; color: var(--brand); }
.cover-roles em { font-style: normal; font-weight: 700; color: rgba(96,165,250,.8); letter-spacing: .1em; }
.cover-line { max-width: 120mm; margin: 0 auto; font: 400 7.5pt/2 var(--sans); letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.45); }
.cover-meta { margin-top: 12mm; padding-top: 5mm; border-top: .25mm solid rgba(255,255,255,.15); display: flex; justify-content: space-between; font: 500 6.5pt var(--sans); letter-spacing: .4em; text-transform: uppercase; color: rgba(255,255,255,.55); }

/* about */
.about-photo { position: absolute; top: 0; right: 0; bottom: 0; width: 50%; }
.about-photo img { width: 100%; height: 100%; object-fit: cover; }
.about-text { position: relative; width: 62%; padding: 20mm 0 0 16mm; }
.about-text .display { font-size: 36pt; }
.about-text p:not(.lead) { font: 300 8.6pt/1.65 var(--sans); color: rgba(255,255,255,.62); margin-top: 3.5mm; max-width: 108mm; }
.about-text p b { color: #fff; font-weight: 500; }
.about-text .lead { max-width: 108mm; color: rgba(255,255,255,.85); }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin-top: 9mm; max-width: 104mm; }
.stats > div { padding: 4mm; background: linear-gradient(135deg, rgba(5,5,5,.85), rgba(20,20,20,.75)); }
.stats b { display: block; font: 400 26pt/1 var(--serif); color: #fff; }
.stats span { display: block; margin-top: 2mm; font: 500 6pt/1.5 var(--sans); letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.5); }
.facts { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 9mm; max-width: 108mm; padding-top: 6mm; border-top: .25mm solid rgba(255,255,255,.12); }
.facts p { font: 400 8pt/1.55 var(--sans) !important; color: #fff !important; margin: 0 !important; }
.quote { margin-top: 14mm; max-width: 95mm; padding-left: 5mm; border-left: .6mm solid var(--brand); font: italic 400 15pt/1.3 var(--serif); color: rgba(255,255,255,.75); }
.facts p span { color: rgba(255,255,255,.5); }

/* project */
.top-img { position: relative; overflow: hidden; }
.top-img img { width: 100%; height: 100%; object-fit: cover; }
.proj-head { display: grid; grid-template-columns: auto 1fr; gap: 6mm; align-items: start; }
.proj-num { font: 400 54pt/0.8 var(--serif); color: transparent; -webkit-text-stroke: .3mm var(--c); opacity: .9; }
.proj-title { font: 400 44pt/0.9 var(--serif); color: #fff; }
.proj-sub { margin-top: 2.5mm; font: 700 7pt var(--sans); letter-spacing: .45em; text-transform: uppercase; color: var(--c); }
.proj-desc { margin-top: 5mm; padding-left: 4mm; border-left: .6mm solid var(--c); font: 300 8.8pt/1.6 var(--sans); color: rgba(255,255,255,.7); max-width: 135mm; }
.strip3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; height: 38mm; margin-top: 7mm; }

.er-grid { position: absolute; top: 12mm; left: 12mm; right: 12mm; bottom: 34mm; display: grid; gap: 3mm; grid-template-columns: 1.15fr 1fr 1fr; grid-template-rows: 1fr 1fr 0.95fr; grid-template-areas: 'a b b' 'a c d' 'e e e'; }
.er-grid .a { grid-area: a; } .er-grid .b { grid-area: b; } .er-grid .c { grid-area: c; } .er-grid .d { grid-area: d; } .er-grid .e { grid-area: e; }
.caption { position: absolute; left: 12mm; right: 12mm; bottom: 17mm; padding-left: 4mm; border-left: .6mm solid var(--c); font: 300 8pt/1.5 var(--sans); color: rgba(255,255,255,.6); }
.caption b { font: 400 12pt var(--serif); color: #fff; letter-spacing: .03em; }

.d4-grid { position: absolute; left: 12mm; right: 12mm; bottom: 18mm; top: 98mm; display: grid; gap: 3mm; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1.35fr 1fr; grid-template-areas: 'a a a' 'b c d'; }
.d4-grid .a { grid-area: a; } .d4-grid .b { grid-area: b; } .d4-grid .c { grid-area: c; } .d4-grid .d { grid-area: d; }

.sk-grid { position: absolute; top: 0; left: 0; right: 0; height: 74%; display: grid; grid-template-columns: 1fr 1fr; gap: 2mm; }

.duo { display: flex; flex-direction: column; padding: 13mm 12mm 18mm; gap: 9mm; }
.duo-half { flex: 1; display: flex; flex-direction: column; gap: 6mm; }
.row3 { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; }
.duo .proj-title { font-size: 32pt; }
.duo .proj-num { font-size: 40pt; }
.duo .proj-desc { margin-top: 3.5mm; }

/* builds */
.builds { position: absolute; top: 12mm; left: 12mm; right: 12mm; bottom: 18mm; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 3mm; }
.builds-intro { padding: 6mm 4mm 0 2mm; }
.builds-intro p { margin-top: 5mm; font: 300 8pt/1.6 var(--sans); color: rgba(255,255,255,.6); }
.build { position: relative; overflow: hidden; background: #0d0d0d; }
.build img { width: 100%; height: 100%; object-fit: cover; }
.build::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.9), rgba(0,0,0,0) 45%); }
.build figcaption { position: absolute; z-index: 1; left: 4mm; right: 4mm; bottom: 4mm; border-left: .5mm solid var(--c); padding-left: 2.5mm; }
.build figcaption span { display: block; font: 700 5.5pt var(--sans); letter-spacing: .35em; text-transform: uppercase; color: var(--c); }
.build figcaption b { display: block; margin-top: 1mm; font: 400 14pt/1 var(--serif); color: #fff; font-weight: 400; }
.builds-more { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 3mm; }
.builds-more span { font: 700 6pt var(--sans); letter-spacing: .45em; text-transform: uppercase; color: var(--brand); }
.builds-more b { font: italic 400 24pt var(--serif); color: #fff; font-weight: 400; }
.builds-more i { font: 400 6.5pt var(--sans); letter-spacing: .25em; text-transform: uppercase; color: rgba(255,255,255,.5); font-style: normal; }

/* skills */
.skills { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7mm 4mm; padding: 9mm 16mm 0; }
.skill .ph { aspect-ratio: 3 / 3.6; }
.skill h3 { margin-top: 3mm; font: 400 13pt/1.05 var(--serif); color: #fff; }
.skill-sub { margin-top: 1.2mm; font: 700 5.5pt var(--sans); letter-spacing: .3em; text-transform: uppercase; color: var(--brand); }
.skill p { margin-top: 2mm; font: 300 7pt/1.5 var(--sans); color: rgba(255,255,255,.55); }
.toolkit { padding-top: 8mm; }
.tags { display: flex; flex-wrap: wrap; gap: 2mm; }
.tags span { padding: 1.6mm 3mm; border: .25mm solid rgba(96,165,250,.35); background: rgba(96,165,250,.06); font: 500 6.3pt var(--sans); letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.8); }

/* career */
.career { background: radial-gradient(ellipse at 0% 0%, rgba(26,108,255,.14), transparent 55%), var(--navy); }
.career-row { display: grid; grid-template-columns: 82mm 1fr; gap: 8mm; padding: 4mm 16mm 0; }
.map { padding: 2mm; }
.map img { width: 100%; height: auto; }
.block + .block { margin-top: 8mm; }
.block h3 { font: 400 17pt/1.1 var(--serif); color: #fff; }
.when { margin-top: 1.5mm; font: 500 6.5pt var(--sans); letter-spacing: .3em; text-transform: uppercase; color: rgba(255,255,255,.45); }
.block p { margin-top: 3.5mm; font: 300 8pt/1.6 var(--sans); color: rgba(255,255,255,.65); }
.awards { list-style: none; }
.awards li { padding: 3mm 0; border-bottom: .25mm solid rgba(255,255,255,.1); }
.awards li:first-child { border-top: .25mm solid rgba(255,255,255,.1); }
.awards b { display: block; font: 400 13pt/1.1 var(--serif); color: #fff; }
.awards span { display: block; margin-top: 1mm; font: 500 6pt var(--sans); letter-spacing: .3em; text-transform: uppercase; color: var(--brand); }
.guest { padding-top: 7mm; }
.years { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: repeat(4, auto); grid-auto-flow: column; gap: 2.5mm 8mm; }
.years div { display: grid; grid-template-columns: 13mm 1fr; gap: 2mm; font: 300 6.8pt/1.45 var(--sans); color: rgba(255,255,255,.62); }
.years b { font: 400 10pt/1.1 var(--serif); color: #fff; }

/* partners */
.partners .display { font-size: 36pt; text-transform: uppercase; letter-spacing: .12em; text-align: center; }
.laurels { display: flex; align-items: center; gap: 6mm; }
.laurel { width: 24mm; height: 24mm; background: var(--brand); opacity: .25; -webkit-mask: url('${LAUREL}') center / contain no-repeat; mask: url('${LAUREL}') center / contain no-repeat; }
.laurel.flip { transform: scaleX(-1); }
.partners-line { margin-top: 6mm; padding-top: 4mm; border-top: .25mm solid rgba(255,255,255,.1); font: 500 6pt var(--sans); letter-spacing: .3em; text-transform: uppercase; color: rgba(255,255,255,.35); }
.logos { display: flex; flex-wrap: wrap; justify-content: center; gap: 3mm; padding: 10mm 16mm 0; }
.logo { width: calc((100% - 9mm) / 4); height: 22mm; display: flex; align-items: center; justify-content: center; padding: 4mm 5mm; }
.logo img { max-width: 100%; max-height: 100%; object-fit: contain; opacity: .9; }
.partners-photo { position: absolute; left: 0; right: 0; bottom: 0; height: 30%; }
.partners-photo img { width: 100%; height: 100%; object-fit: cover; }

/* back */
.back-body { position: absolute; top: 34mm; left: 16mm; right: 16mm; text-align: center; display: flex; flex-direction: column; align-items: center; }
.back-title { font: 400 54pt/0.92 var(--serif); color: #fff; letter-spacing: -.01em; }
.back-title i { color: rgba(255,255,255,.4); }
.rule { width: 24mm; height: .25mm; background: rgba(255,255,255,.25); margin: 8mm 0; }
.back-lead { max-width: 120mm; font: 300 10.5pt/1.6 var(--sans); color: rgba(255,255,255,.6); }
.back-grid { margin-top: 14mm; width: 100%; display: grid; grid-template-columns: 1fr 44mm; gap: 6mm; align-items: center; text-align: left; }
.contacts { display: grid; gap: 3mm; }
.contact { padding: 4mm 5mm; border-left: .7mm solid var(--brand); background: linear-gradient(135deg, rgba(0,0,0,.55), rgba(255,255,255,.04)); }
.contact span { display: block; font: 600 6pt var(--sans); letter-spacing: .35em; text-transform: uppercase; color: rgba(255,255,255,.45); }
.contact b { display: block; margin-top: 1.5mm; font: 300 13pt var(--sans); letter-spacing: .04em; color: #fff; }
.qr img { width: 100%; }
.status { margin-top: 8mm; display: flex; align-items: center; gap: 3mm; padding: 3mm 5mm; font: 500 6.5pt var(--sans); letter-spacing: .3em; text-transform: uppercase; color: rgba(255,255,255,.55); }
.status i { width: 2.4mm; height: 2.4mm; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 1mm rgba(34,197,94,.25); }
.back-sign { position: absolute; left: 0; right: 0; bottom: 14mm; text-align: center; display: flex; flex-direction: column; gap: 2mm; font: 500 6pt var(--sans); letter-spacing: .45em; text-transform: uppercase; color: rgba(255,255,255,.4); }
.back-sign .sig { font: italic 400 22pt var(--serif); letter-spacing: .02em; text-transform: none; color: #fff; }
`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>CMD Arts — Caiden Mikael Dri · Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500;600;700&display=block" rel="stylesheet">
<style>${css}</style>
</head>
<body>
${pages.join('\n')}
</body>
</html>`;

const htmlPath = join(here, 'portfolio.html');
writeFileSync(htmlPath, html);
console.log(`HTML  -> ${htmlPath}`);

// --- Print with headless Chrome / Edge -----------------------------------------------------
const browsers = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const browser = browsers.find((p) => existsSync(p));
if (!browser) {
  console.error('No Chrome/Edge found. Set CHROME_PATH, or open portfolio.html and print to PDF (A4, no margins, backgrounds on).');
  process.exit(1);
}
const pdfPath = join(here, light ? 'CMD-Arts-Portfolio-web.pdf' : 'CMD-Arts-Portfolio.pdf');
execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=90000',
  `--print-to-pdf=${pdfPath}`,
  pathToFileURL(htmlPath).href,
], { stdio: 'inherit', timeout: 300000 });
console.log(`PDF   -> ${pdfPath}`);
