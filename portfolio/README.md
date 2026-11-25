# CMD Arts — portfolio booklet

12-page A4 booklet (cover, about, Elden Ring ×2, Diablo IV, Skyrim, Chainsaw Man + Hiccup,
character builds, skills, track record, partners, contact). Content merges the CV
(`CMD Arts.pdf`) with the landing's data; photos load from Cloudinary at print resolution.

```
node portfolio/build.mjs          # CMD-Arts-Portfolio.pdf      (print, ~17 MB)
node portfolio/build.mjs --light  # CMD-Arts-Portfolio-web.pdf  (email/WhatsApp, ~5 MB)
```

Needs internet (Cloudinary + Google Fonts) and Chrome or Edge (or `CHROME_PATH`).
Edit texts/photos in `build.mjs`; `portfolio.html` is generated (open it to preview).
`assets/` holds the map and QR cropped from the original CV.
