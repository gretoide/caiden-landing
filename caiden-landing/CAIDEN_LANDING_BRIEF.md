# Caiden Mikael Dri — Landing Page Brief
> This document contains all design decisions, content structure, and technical requirements for the portfolio landing page.

---

## 1. Project Overview

| | |
|---|---|
| **Client** | Caiden Mikael Dri |
| **Purpose** | Professional portfolio to get clients and recognition |
| **Discipline** | Prop Maker only (no cosplay, no acting) |
| **Language** | English only |
| **Location** | Argentina — Available Worldwide |
| **Instagram** | @cai.cosplay |
| **Email** | scyther149@gmail.com |
| **Phone** | 0494 412 012 |

---

## 1b. About Caiden (source: official CV/PDF)

**Bio — short version (for hero or intro):**
> *"I am a passionate artist and creator with a strong work ethic and an unwavering commitment to excellence. I excel at fast learning and continuously seek new techniques to refine my craft. Honesty, dedication, and creativity are the pillars of my work, allowing me to tackle every project with precision and enthusiasm. Always ready to take on new challenges, I bring innovative solutions and ensure high-quality results in every production."*

**Cover letter opening (tone reference):**
> *"With over ten years of experience in prop making, I have mastered a wide range of techniques that have established me as one of the most recognized professionals in my field in Argentina. My work has been acknowledged at the prestigious Martin Fierro Awards, Argentina's equivalent of the Oscars."*

**Background:**
- **10+ years** as a professional prop maker (Nov 2015 – Jan 2025)
- Trained as **Actor and Film Director** at the Cinematic Investigation Center (C.I.C.), Buenos Aires — 2019
- Based in Argentina, currently also working in **Australia**
- Languages: **English** (TOEFL certified, 4/5) + Spanish (native, 5/5)

---

## 1c. Technical Skills (can be shown as tags or a subtle list)

Extracted verbatim from CV — use as skill tags in the UI:

**Materials & Fabrication:**
Fiberglass · Resin casting & mold making · Foam crafting · Polyurethane · Polyethylene · Silicone rubber molds · Thermoforming materials · Wood · Professional handheld power tools

**Finishing & FX:**
Painting & airbrushing · Weathering · SFX · Sculpting · LED design · Electronics

**Digital:**
3D Design (Blender) · 3D Printing · Drawing

---

## 1d. Work Experience (source: CV)

**Professional Propmaker — Nov 2015 to Jan 2025 · Argentina**

Full description from CV (can be adapted for an "about" or "process" section if needed):

- Worked with resin, fiberglass, foam, and wood to create high-quality props for different productions
- Mastered mold-making techniques, casting resin pieces with precision, sanding and polishing to smooth finish
- Fiberglass work: layering and resin application to build durable, lightweight structures
- Foam crafting: cutting, shaping, sealing, heat shaping and coating for realistic textures
- Woodworking: measuring, cutting and assembling with precision, combining traditional tools with modern fabrication
- Painting, airbrushing and weathering techniques to give props lifelike appearances
- Collaborated with designers and clients to translate concepts into functional, visually impressive props ready for stage or screen

---

## 1e. Competition History (source: CV — page 3)

### Contest Results
| Year | Event | Result |
|---|---|---|
| 2015 | Asia Fest (1°) | 🥇 1st Place |
| 2015 | Anime Friends | 🥉 3rd Place |
| 2015 | Anicubic | 🥇 1st Place |
| 2015 | ComiCópolis | 🥉 3rd Place |
| 2016 | Comic Con | 4th Place |
| 2018 | Anime Expo | 🥇 1st Place |
| 2022 | Comic Con | 🥈 2nd Place |
| 2023 | Frikimania (10°) | 🥇 1st Place |
| 2023 | AGS (Argentina Game Show) | 🥇 1st Place |
| 2023 | Comic Con | 🥈 2nd Place |
| 2024 | San Francisco Friki Fest | 🥈 2nd Place |

### Special Guest — Selected highlights (60+ events total, 2016–2024)
Caiden was invited as Special Guest across all of Argentina — from Buenos Aires to Patagonia. Key recurring events:
- **Frikimania** (Entre Ríos) — attended 11 editions
- **Comic Con** (CABA) — multiple editions
- **Anime Con** (CABA)
- **Martin Fierro Digital** (CABA)
- **Expo Convention** (Uruguay) — international presence
- **K-Anime** (Corrientes) — 16th edition 2024

> This map of events spanning the entire country is a strong visual asset. Consider an interactive or decorative map element in the landing — it communicates scale and professionalism instantly.

---

## 2. Design Principles

- **Images first, text second** — photos are the main communication tool
- **Minimal text** — when text appears, it's brief and secondary to the visual
- **No clutter** — high quality bar. As Caiden said: *"Whoever represents my talent will be my worst work — the floor can't be low"*
- **Showcase the work, not the person** — no photos where the prop isn't the focus
- **Subtle animations** — nothing that causes motion sickness or distracts from the photos

---

## 3. Visual Style

- **Glassmorphism** as the UI language — frosted glass cards, blurred backgrounds, translucent panels
- **Base palette:** deep dark blue (`#020b1a`) with blue accents (`#1a6cff`, `#60a5fa`)
- **Dynamic palette:** each build section should subtly pull colors from its featured image
- **Typography:** cinematic serif for titles (e.g. Cinzel), clean sans-serif for body
- **Modern and current** — think film director / concept artist portfolio, not generic template
- **Reference site for interaction feel:** https://cognitfy.com/

---

## 4. Key Interaction — Scroll-Driven Animation

This is the core UX of the page. Caiden described it as:

> *"Two or three panels, and when you hover over one it slides to the side, hiding the others and revealing text behind it"*

> *"I saw a page that worked with the scroll wheel instead of hover — the page stayed still and the scroll wheel drove the animation"*

**Implementation:** Use **scroll-driven animations** (CSS `animation-timeline: scroll()` or GSAP ScrollTrigger).
- The page "pauses" vertically while the user scrolls
- The scroll position drives the animation instead of moving the page
- Each scroll step reveals the next build with a horizontal slide transition
- Text appears from behind the image as it slides away
- Keep transitions **subtle and smooth** — not aggressive or dizzying

---

## 5. Page Structure

### Section 1 — Hero
- Full viewport, immersive
- **Elden Ring** as the sole featured build
- Large, cinematic, dark atmosphere
- Name: **CAIDEN MIKAEL DRI** + subtitle: **Prop Maker**
- Minimal UI — just the image and the name

### Section 2 — Top Tier Builds (scroll narrative, main showcase)
The best full-armor builds. These go in the scroll-driven panels, full bleed, maximum visual impact.

| # | Build | Folder |
|---|---|---|
| 1 | **Elden Ring** | `1_elden_ring` |
| 2 | **Diablo IV** | `2_diablo_iv` |
| 3 | **Skyrim** | `3_skyrim` |
| 4 | **Chainsaw Man** | `5_chainsaw` |

Each panel shows:
- Full-bleed image of the build
- On scroll: image slides to reveal text underneath
- Text per panel: **Build name + franchise + key materials + year** (2-3 lines max)

---

### Section 3 — Weapons & Props
Grid layout — commissioned weapons and standalone props.

| Build | Folder | Notes |
|---|---|---|
| **Apex Legends — Hacha** | `8_apex_legends_hacha` | Check photo quality |
| **Apex Legends — Kunai** | `8_apex_legends_kunai` | |
| **Apex Legends — Nose** | `8_apex_legends_nose` | |
| **Dragones** | `8_dragones` | Potentially very impactful visually |
| **God of War** | `8_god_of_war` | |

---

### Section 4 — Prosthetics & FX
Specialty work — prosthetic-level craftsmanship and special effects pieces.

| Build | Folder | Notes |
|---|---|---|
| **Devil May Cry** | `7_devil_may_cry` | |

---

### Section 5 — Commercial & Advertising Work
Builds created for or used in commercial/advertising contexts. Demonstrates professional production work.

| Build | Folder | Notes |
|---|---|---|
| **Star Wars** | `6_star_wars` | Few photos — use the best one |
| **Fate / Mordred** | `4_mordred_fate` | Older build, lower visual priority |
| **Aion** | `4_aion` | Great suit, confirmed high quality |
| **Hipo** (How to Train Your Dragon) | `4_hipo` | |
| **GOT** (blue creature) | `6_got` | Include only if photo quality is good |

### Section 6 — Contact
- Simple, clean
- Glass form: Name, Email, Project type (dropdown), Message
- Contact details: email + phone
- Social links: Instagram (@cai.cosplay)
- Badge: "Available for Projects"

---

## 6. Image Assets

All images are organized in folders and will be provided as **WebP format**, already optimized.

```
assets/
├── 1_elden_ring/
├── 2_diablo_iv/
├── 3_skyrim/
├── 4_aion/
├── 4_hipo/
├── 4_mordred_fate/
├── 5_chainsaw/
├── 6_got/
├── 6_star_wars/
├── 7_devil_may_cry/
├── 8_apex_legends_hacha/
├── 8_apex_legends_kunai/
├── 8_apex_legends_nose/
├── 8_dragones/
└── 8_god_of_war/
```

**Recommended sizes:**
- Hero / full-screen: max 1920px wide, ~150-200kb
- Scroll panels: max 1200px wide, ~80-120kb
- Props grid: max 800px wide, ~50-80kb

---

## 7. Achievements to Include (subtle, not boastful)

These can appear as small badges, a ticker, or footnotes in the UI — **not a dedicated section**, just woven into the layout.

| Achievement | Context |
|---|---|
| 🏆 **Martin Fierro Digital 2024** — Nominated | Argentina's equivalent of the Oscars |
| 🥇 **Argentina Game Show 2024** — National Champion | Largest gaming/cosplay event in Argentina |
| ⚖️ **Yamato Cosplay Cup 2024** — International Judge | 2nd largest cosplay competition in the world, after World Cosplay Summit |
| 📅 **10+ years** professional experience | Nov 2015 – present |
| 🗺️ **60+ events** across Argentina as Special Guest | From Buenos Aires to Patagonia and beyond |

> These achievements are significant — the Yamato Cosplay Cup judge role especially establishes international credibility. Worth highlighting without being flashy about it.

---

## 8. Technical Notes

- **Single page** with anchor navigation
- **Fixed nav** — glassmorphism, shrinks on scroll
- Smooth scroll between sections
- Mobile responsive — on mobile, scroll-driven animation can fall back to a simpler swipe/fade
- No external frameworks required, but **GSAP ScrollTrigger** is recommended for the scroll animation
- Fonts: load via Google Fonts (Cinzel + a clean sans-serif pairing)
- No prices, no services list for now
- Form doesn't need backend — a mailto link or a service like Formspree is enough

---

## 9. What NOT to do

- ❌ No purple gradients or generic AI-looking design
- ❌ No walls of text
- ❌ No photos where props aren't the focus (no casual/personal photos)
- ❌ No Leon, Gojo or other characters where the craftmanship isn't the highlight
- ❌ No aggressive or dizzying animations
- ❌ No Spanish text anywhere

---

*Brief compiled from client conversations — March 2026*
