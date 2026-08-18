# Buffalo Jump NYC — website

A redesign of [buffalojumpnyc.com](https://www.buffalojumpnyc.com/). One self-contained
`index.html`: no build step, no dependencies, no framework. Open it in a browser, or drop the
folder on any static host (Netlify, Cloudflare Pages, GitHub Pages, S3).

## What's in it

| | |
|---|---|
| **Single page** | Hero → the name → story → menu → find us → catering → Native Food Connect → footer, with sticky anchor nav |
| **Themes** | Dark-first, with a full light palette. Follows the visitor's OS setting; the sun button overrides it and remembers the choice |
| **Motion** | Hero entrance + scroll reveals, all disabled under `prefers-reduced-motion` |
| **No-JS** | Fully readable with JavaScript off (animation states are gated behind a `.js` class) |
| **A11y** | Skip link, semantic landmarks, visible focus rings, real button semantics on the nav toggle, contrast checked in both themes |
| **SEO** | Meta description, Open Graph tags, and `FoodEstablishment` JSON-LD (name, cuisine, email, area served, social profiles) |
| **Weight** | ~37 KB of HTML/CSS/JS, plus three Google Fonts |

## Design

- **Palette** — prairie night (`#0C1311`), bone (`#F2EEE3`), ember gold (`#F0A83C`),
  wojapi berry (`#8E1B3E`), sage (`#9BB394`). Night market lights and berry sauce, not the
  usual cream-and-terracotta "artisanal restaurant" look.
- **Type** — Bricolage Grotesque (display), Karla (body), DM Mono (labels, times, data).
- **Layout** — full-bleed alternating bands; menu set as a market board with dotted leaders
  rather than cards; catering gets the one saturated berry band.

Every color is a CSS custom property defined in three places at the top of the `<style>` block
(`:root` = dark, the `prefers-color-scheme: light` media query, and `:root[data-theme="light"]`).
Change a hex in all three and the whole page follows.

## Before this goes live

1. **Photography.** Four dashed placeholder frames sit in the Our story section (search
   `class="frame"`). Replace each `<div class="frame">…</div>` with an `<img>` — the container
   is `aspect-ratio: 4 / 5`, so 1200×1500 or larger works well. Add `alt` text.
2. **Prices.** Deliberately left off — no verified price sheet was available. Add a
   `<span>` after each `.dish__name`, or leave the page price-free and let the market board
   carry it.
3. **Find Us dates.** The schedule block is marked with an HTML comment. The Queens Night
   Market entries reflect the published 2026 season (Saturdays 4 PM–midnight, break Aug 23 –
   Sep 18 for the US Open, fall run Sep 19 – Oct 31) — confirm before publishing, and refresh
   each season.
4. **Copy check.** Text about the owners, the mission quote, and the menu was assembled from
   what's publicly published about Buffalo Jump NYC. Read it once as the owners and correct
   anything that isn't how you'd say it — especially the "buffalo jump" section, which should
   read the way you want that history told.
5. **Native Food Connect.** The button links to `/join` on the current site. Point it wherever
   the signup actually lives.
6. **Booking.** Both CTAs open a prefilled `mailto:` to `BuffaloJumpNYC@gmail.com`. Swap in a
   real form (Tally, Formspree) if you'd rather not hand out the address.
7. **Favicon.** Add `favicon.ico` / `apple-touch-icon.png` next to `index.html` and link them
   in the `<head>`. The wordmark SVG in the header is a good starting point.

## Local preview

```
python3 -m http.server 8080 --directory buffalo-jump
# → http://localhost:8080
```
