# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

An individual speedcuber practicing and mastering the Roux method for 3x3 Rubik's Cube. Uses RouxCraft as a personal algorithm notebook, interactive 3D case authoring studio, automated Roux solver, and practice timer across both desktop and mobile screens.

## Product Purpose

Provide a focused, distraction-free personal workbook and speedcubing workbench for the Roux method (First Block, Second Block, CMLL, LSE). Success means opening the app at any hour—day or night, on laptop or phone—and immediately reading cases at a glance, authoring custom 3D cube diagrams with shorthand algorithms, simulating turns physically in 3D, and timing solves without visual clutter.

## Positioning

Unlike generic CFOP-centric algorithm databases or static cheat sheets, RouxCraft unifies a customizable 4-column visual Roux algorithm notebook (with drag-and-drop reordering and permanent case pruning), a live 360-degree interactive 3D sticker/arrow studio, a full speedcubing shorthand parser (`[U] F (R U R' U')3 F'`, commutators, conjugates), a native Roux-phase solver, and an integrated WCA-style speedcubing timer in one local-first static web app.

## Operating Context

Used flexibly day and night on desktop computers and mobile devices, often beside a physical 3x3 cube while drilling algorithms, checking finger-tricks, adding custom F2B/CMLL/LSE cases, or timing practice sessions. Requires effortless readability in varied lighting and immediate access to tools without decorative banners or bloated toolbars.

## Capabilities and Constraints

- Static client-side HTML/CSS/JS web application (`index.html`, `css/style.css`, `js/*.js`, `vendor/*.js`) with `localStorage` persistence; must remain deployable directly to GitHub Pages with zero build step.
- Core workspaces that must remain fully functional:
  1. **Tờ Hướng Dẫn Giải (Cheat Sheet):** 4-column desktop grid of cases (no cluttered description box on cards; large cube diagrams; step-by-step guide modal; 3D playback modal with camera angle presets; drag-and-drop + quick move reordering; permanent deletion of default & custom cases; category filters & search; PDF/Poster/JSON export & import).
  2. **Xưởng Vẽ Cube (3D Studio):** True 26-cubie interactive 3D cube with 360° orbit, left-click paint, right-click erase, 3D arrow overlays, 5 quick camera snaps, live 3D turn keypad, animated shorthand simulator, Roux mask presets, automatic custom-cube solver, and flat 2D net fallback.
  3. **Luyện Tập & Bấm Giờ (Timer):** WCA scramble generator with 2D preview, Spacebar/touch hold-to-ready timer, Ao5/Ao12/Best stats, solve history, and automatic Roux step-by-step solver with 3D playback.
- Streamlining constraint: Top navigation bar and the 4-step overview roadmap banner may be condensed, folded, or streamlined so the user reaches the working tools and algorithm cards immediately.
- Vietnamese UI copy throughout; standard WCA/Roux color scheme (U Yellow, D White, F Red, B Orange, L Blue, R Green, X Masked Grey) must stay accurate and instantly distinguishable on cube diagrams.

## Brand Commitments

- Brand name: **RouxCraft** (retained).
- Requires a distinctive, recognizable, premium bespoke logo appropriate for speedcubing/Roux without forcing a literal clichéd Rubik's cube illustration.
- Anti-reference: reject generic "plastic / AI slop" aesthetics (glowing cyan neon borders, dark-navy generic SaaS gradient boxes, decorative pills and cluttered chrome).

## Evidence on Hand

- 44 verified built-in Roux cases (`js/roux-data.js`: 4 FB, 4 SB, 24 CMLL, 12 LSE) plus user-authored custom cases in `localStorage`.
- Full 3D physical CSS cube engine (`js/virtual-cube-3d.js`), SVG diagram renderer (`js/cube-renderer.js`), shorthand algorithm parser (`js/cube-model.js`), Roux solver (`js/cube-solver.js`), and timer (`js/cube-timer.js`).

## Product Principles

1. **Tool first, chrome invisible:** Strip away redundant headers, promotional step banners, and decorative badges so the cubes and algorithms command the viewport immediately.
2. **Color belongs to the cube:** The UI shell and neutrals must stay disciplined and quiet so the six vivid Rubik's sticker colors (Yellow, White, Red, Orange, Blue, Green) read with zero visual interference in both bright and dim environments.
3. **Precision craft over novelty:** Every control, card, modal, and typographic hierarchy should feel like a finely calibrated physical instrument or technical manual—sharp, tactile, and free of gimmicky glow effects.
4. **Effortless legibility everywhere:** Crisp contrast, tabular monospace alignment for algorithms and timer readouts, and seamless responsiveness across desktop and mobile.
