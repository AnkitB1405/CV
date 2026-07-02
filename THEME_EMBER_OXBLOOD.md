# Build Spec — Theme A: "Ember Oxblood"

> **Branch:** `new` · **North Star:** *The Signal in the Dark — a warm burn.*
> **What this file is:** a complete, self-contained set of instructions to re-skin and
> restructure the existing React + Vite + Tailwind portfolio into the **Ember Oxblood** theme.
> It is a build brief, not a diff. Follow it top to bottom. Nothing here should be applied to
> the Phosphor Sage build (branch `new-2`) — the two must feel like different sites.

---

## 0. Personality & aesthetic direction

Warm, cinematic, editorial-industrial. Near-black warm base with a single **ember** burn.
Think: a forge in a dark room, a photographic darkroom's safelight, matte metal that glows
where it's touched. **Restrained, not flashy.** The color does the talking; motion is slow and
deliberate; layout is asymmetric and editorial (left-anchored, ragged rhythm), not centered
card grids.

The whole tell that separates this from Phosphor Sage: **warmth, asymmetry, slow cinematic
reveals, and a master–detail project experience.** Phosphor is cool, grid-native, snappy, and
keyboard-driven — do not borrow its moves here.

---

## 1. Locked constants (identical across both themes — DO NOT change)

These are fixed so the three builds stay comparable:

- **Profile image:** `profilepic.jpeg` (same asset; framing/treatment may differ per theme).
- **Social links:** GitHub, LinkedIn, Email — sourced from `src/data/siteData.js` (`profile.github`,
  `profile.linkedin`, `profile.email`). Keep all three, keep `aria-label`s.
- **Downloadable resume:** `profile.resumeUrl` with the `download` attribute.
- **Section order (unchanged):** Hero/Home → About → Education → Skills → Projects → CTF Activity
  → Awards/Certificates → Contact → Footer.
- **Content source of truth:** everything renders from `src/data/siteData.js`. Keep all UI
  **data-driven** — map over `projects`, `skills`, `experiences`, `awards`, etc. New projects the
  user adds later must appear automatically with zero component edits.

Everything else — palette, fonts, layout, spacing, animation, project navigation, component
shapes — is theme-specific and should be **deliberately different** from Phosphor Sage.

---

## 2. Design tokens

### 2.1 Palette (matte surfaces, glossy ember accents)

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Body background | `bg` | `#0B0908` | Warm near-black. The void. |
| Surface (matte) | `surface` | `#17110E` | Cards, panels, nav backdrop. |
| Surface deep | `surface2` | `#100B09` | Card gradient bottom, insets. |
| Ink (primary text) | `ink` | `#F2ECE8` | Headings + body copy. |
| Muted (secondary) | `muted` | `#A6968E` | Meta, captions, secondary text only. |
| **Ember (signal)** | `ember` | `#B4503A` | Primary accent: buttons, links, active states. |
| Ember bright | `emberBright` | `#D46A4F` | Hover/gloss highlight, glow cores. |
| Oxblood (depth) | `oxblood` | `#7A2E22` | Deep shadows, gradient anchors, rare fills. |
| Hairline | `line` | `rgba(180,80,58,0.16)` | Borders/dividers. |

**Contrast (WCAG AA — verify after build):** body copy uses `ink` on `bg`/`surface` (~13:1, safe).
`muted` on `bg` ≈ 6:1 — fine for secondary text, **never** for long body paragraphs. `ember` as
text only for large/bold (≥18px) — passes ~3:1 for large; for small accent text use `emberBright`.
Glossy ember buttons use **dark** text (`#1a0f0c`) on the ember fill, not white.

### 2.2 Typography (new pairing — different from current & from Phosphor)

Replace Space Grotesk / Manrope with a warmer, more editorial voice:

- **Display:** `Bricolage Grotesque` (600–800) — characterful, slightly humanist grotesk.
- **Body:** `Hanken Grotesk` (400/500/600).
- **Mono (small meta/labels, sparing):** `Spline Sans Mono`.

Google Fonts import (put at top of `src/index.css`, replace the current `@import`):

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Hanken+Grotesk:wght@400;500;600&family=Spline+Sans+Mono:wght@400;500&display=swap');
```

Scale: fluid `clamp()`, ratio ≥1.25. Hero display `clamp(2.75rem, 7vw, 5.5rem)` (cap ≤6rem),
`letter-spacing: -0.03em`, `text-wrap: balance`. Body 16–18px, line-length capped 65–75ch,
`line-height: 1.6` (dark bg wants extra leading). Use `Bricolage` for h1–h3, `Hanken` for body,
`Spline Sans Mono` only for tiny labels (dates, tech tags, "01 —" style indices where a real
sequence exists).

### 2.3 Texture: matte vs glossy

- **Matte** = the default. Flat `surface`/`surface2` fills, hairline `line` borders, no shine.
- **Glossy** = reserved for the ember accent surfaces only (primary button, active project marker,
  hero glow). Achieve with a top-lit gradient + inner highlight:
  ```css
  background: linear-gradient(180deg, #D46A4F 0%, #B4503A 48%, #93402d 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.28), 0 10px 26px rgba(180,80,58,0.30);
  ```
- Add a **subtle film grain / noise** overlay on `bg` (a fixed, `pointer-events:none`,
  low-opacity SVG/`.png` noise at ~3–4% opacity) for the "matte photographic" feel. One shared
  overlay element in the app shell. Respect `prefers-reduced-motion` isn't needed here (static),
  but keep it very subtle.

### 2.4 Tailwind config

Replace `theme.extend` in `tailwind.config.js`:

```js
extend: {
  colors: {
    bg: '#0B0908', surface: '#17110E', surface2: '#100B09',
    ink: '#F2ECE8', muted: '#A6968E',
    ember: '#B4503A', emberBright: '#D46A4F', oxblood: '#7A2E22',
    line: 'rgba(180,80,58,0.16)'
  },
  fontFamily: {
    display: ['"Bricolage Grotesque"', 'sans-serif'],
    body: ['"Hanken Grotesk"', 'sans-serif'],
    mono: ['"Spline Sans Mono"', 'monospace']
  },
  boxShadow: {
    ember: '0 0 30px rgba(180,80,58,0.28)',
    gloss: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 10px 26px rgba(180,80,58,0.30)',
    card: '0 24px 50px rgba(0,0,0,0.55)'
  },
  borderRadius: { xl2: '1.25rem', pill: '999px' }
}
```

Update `body` background in `index.css` to warm radial atmosphere:
```css
background:
  radial-gradient(circle at 18% 12%, rgba(180,80,58,0.14), transparent 26%),
  radial-gradient(circle at 82% 78%, rgba(122,46,34,0.12), transparent 30%),
  #0B0908;
```

---

## 3. Layout language (this theme's structural signature)

**Asymmetric editorial.** Break away from the current centered/card-grid layout:

- Global content column: `width: min(1180px, 92%)`, but sections **alternate anchoring** —
  some left-aligned with a wide right margin, some using a 2-col `minmax` split. Not everything
  centered.
- A persistent **left gutter "index rail"** (see §4) gives every section a vertical anchor line.
- Generous vertical rhythm with variation: `clamp(5rem, 10vw, 8rem)` between major sections,
  tight groupings inside.
- **No identical card grid** for projects on the home page (that's an anti-reference). Use an
  editorial list/feature layout there; the full grid lives on the projects page.
- Section headers: drop the repeated pill "eyebrow on every section" from the current build.
  Use **one** ember hairline + section number only where a real sequence exists; otherwise just a
  strong `Bricolage` heading. (Avoid the AI "tiny uppercase eyebrow above every section" tell.)

---

## 4. Navigation solution (Ember's differentiator) — "Index Rail + Master–Detail"

The current flaw: to reach a project you scroll. Ember solves it two ways, both distinct from
Phosphor's command-palette/modal approach.

### 4.1 Home: fixed vertical Index Rail (scroll-spy)

- A **fixed vertical rail** pinned to the left edge (desktop ≥1024px), listing the section names
  vertically (rotated or stacked): About · Education · Skills · Projects · CTF · Certificates ·
  Contact.
- Active section tracked with **IntersectionObserver**; the active item gets the ember marker
  (a glossy ember dot + brightened label). Clicking smooth-scrolls to that section
  (`scrollIntoView({behavior:'smooth'})`, with a reduced-motion instant fallback).
- Keep a **slim top bar** with just: `AB.` logo (ember period), a "Résumé ↓" button, and the 3
  social icons. The heavy horizontal nav list is removed (the rail replaces it).
- Mobile (<1024px): the rail collapses into a **bottom-anchored floating "sections" sheet** — a
  small ember FAB that opens a compact section list; tapping jumps + closes.

### 4.2 Projects: dedicated `/projects` **Master–Detail** page

This is the headline UX. No scrolling to find a project.

- Route `/projects` renders a **two-pane layout**:
  - **Left pane (sticky):** a vertical list of *all* projects (title + status dot + one-line
    tagline), driven by the `projects` array. The selected item shows the glossy ember marker.
  - **Right pane:** the full detail of the selected project (all `detailSections`, media,
    technologies, GitHub link) — swapped **in place** when a left item is clicked. No page reload,
    no long scroll to reach a project.
- **URL sync:** selecting a project sets the hash (`/projects#homelab-infrastructure`); loading a
  hash directly preselects that project. Reuse the existing `slug` values.
- **From the home Projects section:** compact feature entries deep-link into
  `/projects#<slug>` with that project preselected (so a home click lands you directly on the
  detail, never mid-scroll).
- **Detail transition:** cross-fade + slight upward slide of the right pane on selection change
  (200–260ms, ease-out-quart). Reduced-motion → instant swap.
- **Mobile:** the two-pane collapses into an **accordion** — the project list is the page;
  tapping a title expands its full detail inline beneath it and collapses others. Still no hunting
  by scroll: the list is short and each item is one tap from full content.

Keep the existing client routing approach in `src/utils/navigation.js` / `App.jsx`
(`route === 'projects'`); extend it to carry the selected slug.

---

## 5. Per-section UI spec

Render order is locked (§1). Treatments:

- **Navbar (`Navbar.jsx`):** slim top bar per §4.1 (logo + Résumé + socials). Sticky, `bg/80` +
  `backdrop-blur`, hairline `line` bottom border. Remove the horizontal section list.
- **Hero (`Hero.jsx`):** asymmetric. Left: large `Bricolage` name (`clamp` display), role in
  **ember**, tagline in `ink`/`muted`, primary glossy "View Projects" button + matte-outline
  "Download Résumé", then the 3 social icons. Right: profile image in a **soft-cornered
  rectangular frame** (not the current circle — differentiate), with a warm ember glow bloom
  behind it and a slow parallax on scroll. Add a **cursor-following ember light** (a radial glow
  that trails the pointer over the hero only; disable on touch + reduced-motion).
- **About (`About.jsx`):** editorial two-column — heading + lead paragraph left, remaining
  `aboutParagraphs` in a comfortable measure. A vertical ember hairline in the gutter.
- **Education (`Education.jsx`):** a single strong statement block (university, degree, duration)
  — large type, minimal chrome, ember hairline underline.
- **Skills (`Skills.jsx`):** group by the `skills` object keys (Programming, Web, Systems, Tools).
  Present as **matte inline tag clusters** with ember hover, not uniform cards. Vary column widths.
- **Projects (home section, `Projects.jsx`):** editorial **feature list** (not identical cards):
  each project is a full-width row — index number (mono), title (`Bricolage`), one-line
  description, tech tags, status dot, and a "View →" that deep-links to `/projects#<slug>`.
  Hover: row lifts subtly, ember hairline draws in.
- **Projects page (`ProjectsPage.jsx`):** the Master–Detail experience from §4.2.
- **CTF Activity (`CTFActivity.jsx`):** keep the chart, but re-skin the `ctf-shell`/`ctf-chart-*`
  classes in `index.css` to ember (replace all `rgba(78,244,255,*)` / `rgba(63,140,255,*)` /
  `rgba(125,255,200,*)` cyan/blue/mint values with ember/oxblood equivalents). Keep the 3D
  perspective grid — it fits the "instrument in the dark" mood.
- **Awards/Certificates (`Awards.jsx`):** matte certificate tiles from the `awards` array;
  credential id in mono; ember accent on the verify/label.
- **Contact (`Contact.jsx`):** restyle `.contact-tile` in `index.css` to ember (border/glow).
  Keep email + socials + resume.
- **Footer (`Footer.jsx`):** minimal, ember period on the wordmark, `muted` copyright.
- **Utility:** `ScrollProgress` → ember gradient bar. `BackToTop` → matte ember FAB.
  `Reveal.jsx` → upgrade to the motion system in §6.

---

## 6. Motion system (slow, warm, cinematic)

- **Libraries:** add `framer-motion` (component reveals, master–detail transitions) and `lenis`
  (smooth momentum scroll — reinforces the cinematic feel). GSAP optional for the hero parallax.
- **Reveal:** replace the current opacity+translate `.reveal` with a **clip-path wipe** that reads
  like an ember glow spreading (`clip-path: inset(...)` or a mask sweep), 600–800ms
  ease-out-quart, staggered per child where a list is revealed (not one uniform reflex on every
  section). Content is **visible by default** and enhanced — never gated behind a class that could
  ship blank on a headless render.
- **Hero:** cursor-follow ember light; image parallax; name does a subtle mask-up reveal on load.
- **Master–detail:** cross-fade/slide on project switch (§4.2).
- **Hover:** ember glow bloom + 1–2px lift on interactive elements; ember hairline draw-in.
- **Reduced motion (mandatory):** wrap all of the above in `@media (prefers-reduced-motion: reduce)`
  / Framer's `useReducedMotion()` — fall back to instant/cross-fade, disable Lenis, disable
  cursor light and parallax.

---

## 7. Responsiveness

- Breakpoints via Tailwind defaults. Index rail ≥1024px; below that use the mobile sections sheet.
- Master–detail two-pane ≥768px; accordion below.
- Test hero display copy at 360 / 768 / 1024 / 1440 — the long name/role must not overflow;
  reduce clamp max or wrap if it does.
- Profile image frame scales down gracefully; parallax disabled on touch.

---

## 8. Accessibility (target WCAG AA)

- Verify: body `ink`-on-`bg` ✓; `muted` for secondary only; `ember` text only at large sizes,
  else `emberBright`; glossy buttons use dark text.
- Full keyboard operability: index rail items, master–detail list, all buttons/links are real
  focusable elements with a **visible ember focus ring** (`focus-visible:ring-2 ring-ember`).
- `scrollIntoView` + master–detail selection must be reachable and operable by keyboard.
- Every animation has a reduced-motion fallback (§6). Images keep descriptive alt text (already in
  `siteData.js` for project media).

---

## 9. File-by-file checklist

1. `tailwind.config.js` — new colors, fonts, shadows (§2.4).
2. `src/index.css` — new font `@import`, warm body bg, re-skin `.contact-tile`, `.ctf-*`,
   `.status-*`, add grain overlay, new reveal/clip-path utilities (§2, §5, §6).
3. `src/utils/navigation.js` / `src/App.jsx` — carry selected project slug for master–detail;
   keep section order.
4. `src/components/Navbar.jsx` — slim top bar (§5).
5. **New:** `src/components/IndexRail.jsx` — fixed scroll-spy rail + mobile sections sheet (§4.1).
6. `src/components/Hero.jsx` — asymmetric layout, rectangular framed image, cursor light, parallax.
7. `src/components/About/Education/Skills.jsx` — editorial treatments (§5).
8. `src/components/Projects.jsx` — editorial feature list deep-linking to `/projects#<slug>`.
9. `src/components/ProjectsPage.jsx` — Master–Detail + accordion + hash sync (§4.2).
10. `src/components/CTFActivity.jsx` + related CSS — ember re-skin.
11. `src/components/Awards/Contact/Footer/ScrollProgress/BackToTop/Reveal.jsx` — re-skin + motion.
12. `package.json` — add `framer-motion`, `lenis` (and `gsap` if used).

---

## 10. Acceptance criteria (QA before calling it done)

- [ ] No cyan/blue/mint (`#4ef4ff` / `#3f8cff` / `#7dffc8`) remains anywhere (grep the repo).
- [ ] Ember palette + Bricolage/Hanken fonts applied everywhere; matte default, glossy only on
      ember accents.
- [ ] Section order matches the locked list; image, socials, resume all present and working.
- [ ] `/projects` master–detail works: click any project → detail swaps in place, no scroll;
      hash deep-links work; mobile accordion works.
- [ ] Home → project deep-links land directly on the detail.
- [ ] Index rail scroll-spy highlights the correct section; mobile sheet works.
- [ ] All animations have reduced-motion fallbacks; nothing ships blank on reduced-motion.
- [ ] Contrast spot-checked (body ≥4.5:1); visible focus rings on all interactive elements.
- [ ] Responsive at 360 / 768 / 1024 / 1440 with no heading overflow.
- [ ] New projects added to `siteData.js` appear automatically (data-driven).

---

## 11. Do / Don't

**Do** commit to warmth and asymmetry; let ember be the one voice; keep motion slow and cinematic.
**Don't** reintroduce identical card grids, per-section uppercase eyebrows, gradient text,
side-stripe borders, or glassmorphism. **Don't** borrow Phosphor's command palette, modal cards,
mono headings, or grid-native layout — Ember must feel like a different site.
