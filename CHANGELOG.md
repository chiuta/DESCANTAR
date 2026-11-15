# Changelog

## 1.4.0 — 2026-11-15

- New: accessibility on every screen — the “Aa” button (text size, high contrast, no animations, readable text, underlined links, read aloud), a “Back to top” arrow and “Skip to content”; the window always fits the screen; the magnifier zoom and “fit screen” controls now sit on the left edge (fff-kit 1.6.0).

## 1.3.2 — 2026-11-15

- Changed: shared interface kit refreshed (ux v2) — on touch screens, small controls get a 44 px touch target; rows that would no longer fit keep their size. No change to the app's own logic or texts.

## 1.3.1 — 2026-11-15

- New: hyper-detailed fractal textures (fff-texturi 1.1.2) — the background and large surfaces (cards, panels, headers, buttons; tabs and dialogs that are hidden at load, once they open) get a locally generated material (WebGL2, no network, no images) that tiles seamlessly; the app keeps its own colours. Turn it off in the "Transparency" dialog or with `?notex=1`.

## 1.3.0 — 2026-11-14

- All folklore content (readings, signs, 12 charms, Oltenian rules, guide) translated into EN, FR, IT, ES, PT, DE, HU, with Romanian fallback. AI-generated, not reviewed by native speakers.
- Footer note updated; test covers translated results in all languages.

## 1.2.0 — 2026-11-14

- First public release: three methods (3×3 by the book, Oltenia with strict/wide readings, three piles), copyable guide, 12 charms, history.
- fff-kit 1.5.0, `#app-version`, metas, `app.json`; CSP with SHA-256 script hashes; axe 0 violations.
