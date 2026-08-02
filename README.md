# Will Smith, Portfolio

**Live: https://willsmith8418-code.github.io/**

Static HTML/CSS/JS portfolio. No build step, no dependencies.

## Publishing an update

GitHub Pages serves the `main` branch of this repo. Any push goes live in
about a minute.

```bash
cd C:/Users/William/MindfulFable
git add -A && git commit -m "Describe the change" && git push
```

`index.html` is at the repo root and every path is relative, so the site also
opens correctly straight off the filesystem for local review.

## Structure

```
index.html                        Home, hero + 2x2 work grid
about.html                        Bio, capabilities, path, certifications
contact.html                      Email + LinkedIn
nutrition-support-assistant.html  Case study 01, Research
wind-down-ar-glasses.html         Case study 02, Prototyping
effortcircles.html                Case study 03, Product Design
nosedive-ethics-evaluation.html   Case study 04, Critical Analysis
css/style.css                     Design system (single stylesheet)
js/main.js                        Scroll reveals, parallax, nav, progress bar
img/                              Case study imagery
```

## Design system

Three typefaces, each with one job:

| Face | Role |
|------|------|
| **Fraunces** | Display, headlines, pull quotes, big numbers |
| **Inter** | Body copy |
| **IBM Plex Mono** | Micro-labels: kickers, meta labels, nav, captions, table headers |

Base palette is a neutral bone paper (`#f7f7f5`) with cool near-black ink.
Each case study sets its own accent via `<body data-accent="...">`:

| Value      | Colour       | Used by          |
|------------|--------------|------------------|
| *(none)*   | Deep teal    | Site + Nutrition |
| `dusk`     | Slate indigo | Wind-Down        |
| `forest`   | Deep green   | EffortCircles    |
| `oxblood`  | Deep red     | Nosedive         |

The home page cards carry the same values so each thumbnail picks up its
project's accent on hover.

Motion is CSS transitions driven by an IntersectionObserver. Elements marked
`data-reveal` fade up on entry; `data-stagger="90"` on a parent auto-delays its
children; `data-reveal="mask"` opts a heading out of the fade so its child
`.mask` spans do the sliding instead. All motion is disabled under
`prefers-reduced-motion`, and a 900ms failsafe reveals above-the-fold content if
the observer never fires.

## Images

Every image is a plain `<img>`. Replace the file, keep the name.

**Important:** each `<img>` carries `width` and `height` attributes matching the
file's true pixel dimensions. Browsers derive the aspect ratio from those, so a
wrong value visibly stretches the photo. If you swap an image for one with a
different shape, update those two numbers (or delete both attributes and accept
a small layout shift on load).

**Portrait.** `about.html` expects `img/portrait.jpg`. Until that file exists the
placeholder label shows and the `<img>` hides itself, so nothing looks broken.
Drop the file in and it appears. The frame is 4:5 and crops with
`object-position: center 22%`, which favours the top of the image, tuned for a
head-and-shoulders shot.

**Unused extras** already extracted and available in `img/`:
`windown-cards.png`, `windown-sketch-jess.png`, `windown-sketch-will-depth.png`,
`nutrition-packet.png`.

## House style

No em dashes or en dashes anywhere in the copy, by preference. Use commas,
colons, or a middot (`·`) as a separator instead.

## Local preview

```bash
npx serve -l 8317 C:/Users/William/MindfulFable
```
