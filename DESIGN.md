---
name: RouxCraft
description: Adaptive Apple Pro Dark and Cupertino Ceramic Light visual system for a high-precision Roux Method Rubik's cube workbench.
colors:
  cupertino-blue-fill: "#0071E3"
  cupertino-blue-fill-hover: "#0062C4"
  cupertino-blue-ink-dark: "#4CA6FF"
  cupertino-blue-ink-light: "#0066CC"
  space-black-ground: "#000000"
  titanium-card-dark: "#141416"
  graphite-elevated-dark: "#1C1C1E"
  obsidian-recessed-dark: "#0B0B0D"
  cube-stage-dark: "#0D0D10"
  ceramic-ground-light: "#F5F5F7"
  pure-ceramic-card-light: "#FFFFFF"
  silver-elevated-light: "#F2F2F7"
  ceramic-recessed-light: "#E8E8ED"
  cube-stage-light: "#EBEBF0"
  ink-primary-dark: "#F5F5F7"
  ink-secondary-dark: "#A1A1A6"
  ink-muted-dark: "#8E8E93"
  ink-primary-light: "#1D1D1F"
  ink-secondary-light: "#515154"
  ink-muted-light: "#6E6E73"
  status-emerald-dark: "#30D158"
  status-amber-dark: "#FFD60A"
  status-rose-dark: "#FF453A"
typography:
  display:
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"
    fontSize: "1.55rem"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"
    fontSize: "1.32rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"
    fontSize: "0.92rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.82rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.01em"
    fontFeature: "'tnum' 1"
rounded:
  sm: "8px"
  md: "11px"
  lg: "14px"
  xl: "18px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.cupertino-blue-fill}"
    textColor: "{colors.pure-ceramic-card-light}"
    rounded: "{rounded.sm}"
    height: "34px"
    padding: "0 13px"
  button-primary-hover:
    backgroundColor: "{colors.cupertino-blue-fill-hover}"
    textColor: "{colors.pure-ceramic-card-light}"
    rounded: "{rounded.sm}"
  button-secondary-dark:
    backgroundColor: "{colors.graphite-elevated-dark}"
    textColor: "{colors.ink-primary-dark}"
    rounded: "{rounded.sm}"
    height: "34px"
    padding: "0 11px"
  case-card-dark:
    backgroundColor: "{colors.titanium-card-dark}"
    textColor: "{colors.ink-primary-dark}"
    rounded: "{rounded.lg}"
    padding: "13.6px"
  case-card-light:
    backgroundColor: "{colors.pure-ceramic-card-light}"
    textColor: "{colors.ink-primary-light}"
    rounded: "{rounded.lg}"
    padding: "13.6px"
  search-input-dark:
    backgroundColor: "{colors.titanium-card-dark}"
    textColor: "{colors.ink-primary-dark}"
    rounded: "9px"
    height: "35px"
    padding: "0 14px 0 34px"
  filter-chip-active-dark:
    backgroundColor: "{colors.ink-primary-dark}"
    textColor: "{colors.space-black-ground}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
---

# Design System: RouxCraft

## Overview

**Creative North Star: "The Machined Optical Workbench"**

RouxCraft is modeled on Apple's pro-grade studio instruments—Final Cut Pro, Logic Pro, and macOS Sequoia utilities—where the chrome disappears into neutral anodized surfaces so the user's primary visual object commands 100% of the chromatic stage. Because a Rubik's cube already carries six high-saturation WCA sticker hues (red, orange, yellow, green, blue, white), the surrounding interface must remain strictly achromatic and calm.

The system ships with **Adaptive Appearance**: **Space Black Titanium** (`data-theme="dark"`, default) for glare-free evening speedcubing drills, paired with a one-click toggle to **Cupertino Ceramic Light** (`data-theme="light"`) for daylight reading and printed cheat-sheet work. Every surface relies on precision 1px hairlines, tonal recessing, and crisp Vietnamese-tuned typography rather than decorative gradients or glowing accents.

Confirmed visual rejections include neon cyan-on-navy glows, multi-stop gradient headlines, rainbow card borders, emoji icons, and introductory marketing banners that push the algorithm workbench below the fold.

**Key Characteristics:**
- Neutral Space Black and Ceramic Light grounds that preserve true WCA sticker legibility.
- Single-row 58px translucent macOS header with centered Segmented Control and overflow popover.
- Bespoke Sculpted Tri-Slice `R` emblem (`assets/logo.svg`) framed in a continuous macOS squircle, evoking Left Block, Free M-Slice, and Right Block without a literal cube cliché.
- Dense 4-column desktop cheat-sheet cards with pixel-locked horizontal baselines and borderless inner diagram stages.

## Colors

An achromatic titanium and ceramic palette punctuated by a single functional Cupertino Blue action voice, ensuring WCAG AA+ contrast across both Dark and Light appearances.

### Primary
- **Cupertino Blue Fill** (`#0071E3`, hover `#0062C4`): Used exclusively for filled primary CTAs (`+ Thêm Case`, active 3D play controls, hover highlights inside menus) paired with crisp white ink (`>= 4.75:1` contrast).
- **Cupertino Blue Ink — Dark** (`#4CA6FF`): Used for high-contrast blue links, active icons, and subtle blue focus rings on Space Black and Graphite surfaces (`>= 5.9:1` contrast).
- **Cupertino Blue Ink — Light** (`#0066CC`): Used for interactive blue text, links, and focus indicators on Ceramic Light surfaces (`>= 5.0:1` contrast).

### Neutral
- **Space Black Ground** (`#000000`): Default dark canvas behind all views and cards.
- **Titanium Card Surface — Dark** (`#141416`): Primary card and panel plates in dark mode.
- **Graphite Elevated — Dark** (`#1C1C1E`): Secondary controls, modals, and subtle pill tracks in dark mode.
- **Obsidian Recessed — Dark** (`#0B0B0D`) & **Cube Stage — Dark** (`#0D0D10`): Borderless recessed trays for algorithms and isometric cube previews.
- **Ceramic Ground — Light** (`#F5F5F7`): Light mode canvas mirroring macOS and Apple product pages.
- **Pure Ceramic Card — Light** (`#FFFFFF`): Crisp white case cards and elevated modals in light mode.
- **Silver Elevated — Light** (`#F2F2F7`), **Ceramic Recessed — Light** (`#E8E8ED`), & **Cube Stage — Light** (`#EBEBF0`): Tonal separation layers in light mode without heavy strokes.
- **Ink Hierarchy — Dark** (`#F5F5F7` primary, `#A1A1A6` secondary, `#8E8E93` muted) and **Light** (`#1D1D1F` primary, `#515154` secondary, `#6E6E73` muted).

### Semantic & Phase Indicators
- **System Emerald** (`#30D158` dark / `#248A3D` light): Timer ready state, solved confirmations, and Second Block phase dot.
- **System Amber** (`#FFD60A` dark / `#B25000` light): Hold warnings and CMLL phase dot.
- **System Rose** (`#FF453A` dark / `#D70015` light): Destructive delete actions (isolated from constructive controls).
- **Phase Dots (7–9px circular indicators only)**: Blue (`#3B82F6`, First Block), Emerald (`#10B981`, Second Block), Yellow (`#EAB308`, CMLL), Orange (`#F97316`, LSE), Violet (`#A855F7`, Custom).

### Named Rules
- **The Achromatic Stage Rule.** Never tint the background or card chrome with brand hues; keep all surfaces pure neutral grey/black/white so the six Rubik's sticker colors remain the sole chromatic focal point.
- **The Split Blue Contrast Rule.** Filled blue buttons always use `#0071E3` (hover `#0062C4`) with `#FFFFFF` ink; blue text on dark surfaces always uses `#4CA6FF` and on light surfaces `#0066CC`. Never put white text on `#0A84FF` or `#409CFF`.

## Typography

**Display & Heading Font:** `Be Vietnam Pro` (fallback `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif`)
**Body Font:** `Be Vietnam Pro` (fallback `-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif`)
**Algorithm & Chronograph Font:** `JetBrains Mono` (fallback `ui-monospace, 'SF Mono', Menlo, monospace`)

**Character:** Geometric, clean, and optically engineered for Vietnamese diacritics at tight display tracking (`-0.025em` to `-0.03em`), paired with tabular monospaced notation so Rubik's move sequences (`r U' r2' U r2`) and millisecond timer digits (`0.000`) never jitter.

### Hierarchy
- **Display (`<h1>` Workspace Title)** (`700`, `1.55rem`, line-height `1.18`, tracking `-0.03em`): Single visible page title (`Thư viện công thức Roux`) seated inline with search above the filter bar.
- **Headline (`<h2>` Phase Section)** (`700`, `1.32rem`, line-height `1.25`, tracking `-0.025em`): Numbered Roux phase headings (`1. First Block · Khối 1×2×3 Bên Trái`) prefixed with an inline 9px phase dot and followed by hoisted holding orientation guidance.
- **Title (`<h3>` Case Card)** (`700`, `0.92rem`, line-height `1.35`, tracking `-0.015em`): Concise case identifier (`FB-01: Line Cạnh Đáy D-L`).
- **Body & UI Controls** (`400–600`, `0.8125rem–0.875rem`, line-height `1.5`): Orientation subtitles, modal guides, popover items, and segmented tabs.
- **Algorithm & Timer Mono** (`600`, `0.82rem` cards / `clamp(3.25rem, 8vw, 5.25rem)` timer, `font-variant-numeric: tabular-nums`): Move notation, step counts, and chronograph readouts.

### Named Rules
- **The No-Kicker Rule.** Never stack uppercase monospace eyebrow pills above section headings; integrate sequence numbering directly into the heading title.
- **The Tabular Notation Rule.** Every move string, case count, and timer value must set `font-variant-numeric: tabular-nums`.

## Layout

- **Max Container Width:** `1480px` centered (`padding: 1.25rem 1.5rem 3.5rem` desktop, `1rem 0.85rem 2.5rem` mobile).
- **4-Column Workbench Grid:** `.cases-grid` uses `repeat(4, minmax(0, 1fr))` with `0.9rem` (`14.4px`) gap on viewports `> 1120px`, stepping down to `3` columns (`<= 1120px`), `2` columns (`<= 860px`), and `1` column (`<= 580px`). Every grid item carries `min-width: 0` so single-row footers and scrollable move strings never force horizontal track overflow.
- **Section Rhythm:** Generous `2.5rem` (`40px`) top separation before subsequent phase blocks versus `1rem` (`16px`) between section header and cards so headings visually bind to their own grid.
- **First Viewport Architecture:** 58px frosted top bar -> compact inline `<h1>` + search row -> single-row filter chips -> Phase 1 heading + full Row 1 of 4 case cards immediately visible above the 900px fold.
- **Print A4 Mode (`@media print`):** Hides interactive chrome, renders clean light header, and reflows cards into a 3-column break-avoiding sheet.

## Elevation & Depth

RouxCraft is **flat and hairline-delimited by default**. Depth is communicated through stepped tonal value (`#000000` -> `#141416` -> `#1C1C1E` in dark; `#F5F5F7` -> `#FFFFFF` in light) and subtle `1px` separators (`rgba(255,255,255,0.085)` dark / `rgba(0,0,0,0.08)` light). Ambient shadows appear strictly on floating overlays (frosted popovers, modal dialogs, toasts) and active segmented pills—never on resting grid cards.

### Shadow Vocabulary
- **Segment Active** (`0 1px 3px rgba(0,0,0,0.45), 0 0.5px 0 rgba(255,255,255,0.08) inset` dark / `0 1px 3px rgba(0,0,0,0.12), 0 0.5px 1px rgba(0,0,0,0.06)` light): Subtle raised cap for the active tab inside macOS segmented controls.
- **Overlay Medium** (`0 8px 24px -6px rgba(0,0,0,0.55)` dark / `0 8px 24px -8px rgba(0,0,0,0.09)` light): Toast notifications.
- **Modal / Popover Large** (`0 24px 56px -12px rgba(0,0,0,0.78)` dark / `0 24px 56px -12px rgba(0,0,0,0.18)` light): macOS overflow menu popover and 3D player / guide modal dialogs.

### Named Rules
- **The Zero-Glow Rule.** Zero-offset colored `box-shadow` glows and gradient text are banned everywhere.
- **The Borderless Interior Rule.** Never nest bordered boxes inside a bordered card; internal cube stages and algorithm plates use tonal recessing (`--cube-stage`, `--bg-recessed`) with zero borders.

## Shapes

- **Continuous macOS Squircle (`assets/logo.svg`):** Bespoke `64×64` cubic-bezier squircle housing framing the three-plane sculptural `R` mark, with a crisp specular rim visible against both dark and light bars.
- **Radius Scale:** Subtle `8px` (`--radius-sm`) for buttons and recessed algorithm trays; `10px–11px` (`--radius-md`) for segmented controls, cube stages, and popovers; `14px` (`--radius-lg`) for case cards; `18px` (`--radius-xl`) for Studio panels and modals; `9999px` full pills for phase filter chips and SVG face orientation badges.
- **Motion Timing:** Apple deceleration curve `cubic-bezier(0.22, 1, 0.36, 1)` at `140ms` fast / `220ms` normal, respecting `prefers-reduced-motion`.

## Components

### Buttons
- **Shape:** Gently rounded rectangle (`8px` radius), `34px` height in the header.
- **Primary (`+ Thêm Case`, `Chạy`):** Cupertino Blue Fill (`#0071E3`) with `#FFFFFF` label; darkens cleanly to `#0062C4` on hover with tactile `scale(0.98)` on press. On viewports `<= 680px`, header primary CTA compacts into a `34×34px` icon-only `+` square.
- **Secondary / Ghost:** Elevated neutral surface (`#1C1C1E` dark / `#F2F2F7` light) with 1px hairline border; icon-only square buttons (`34×34px`) for Theme Toggle and `...` Tools Popover.

### Navigation & Segmented Control
- **Top Bar:** Sticky `58px` frosted translucent bar (`backdrop-filter: saturate(180%) blur(22px)`), 3-column grid (Brand left, Segmented Control center, streamlined actions right).
- **Segmented Control:** Recessed track (`10px` radius, `3px` inset padding) holding `Tờ Hướng Dẫn`, `Xưởng Vẽ 3D`, and `Bấm Giờ`. Active tab elevates on `--segment-active-bg` with subtle segment shadow. On mobile `<= 680px`, wraps cleanly onto full-width Row 2.
- **Overflow Popover (`...`):** Consolidates secondary utilities (Export PDF, Export Poster PNG, Sound Toggle, Backup/Restore JSON) behind a single macOS frosted menu (`12px` radius, `5px` padding) with blue row hover.

### Filter Chips
- **Style:** Full pill (`9999px`), `1px` subtle hairline border, optional `7px` colored phase dot.
- **Active State:** High-contrast inverted monochrome pill (`#F5F5F7` fill / `#000000` ink in dark mode; `#1D1D1F` fill / `#FFFFFF` ink in light mode).

### Case Cards (Signature Component)
- **Anatomy:** Outer `14px` hairline card (`padding: 0.85rem`) containing: (1) compact top utility bar with borderless drag/move control pill and subtle group badge; (2) bold 1–2 line case `<h3>`; (3) baseline-locked (`margin-top: auto`) borderless `194px` cube stage with theme-adaptive SVG face pills (`.cube-badge-bg` white in light, dark charcoal in dark); (4) borderless recessed `JetBrains Mono` algorithm strip with 1-click copy; (5) hairline-separated single-row non-wrapping action footer (`Sửa`, `Ảnh`, isolated `Trash`, `Chi tiết`, tinted `Chạy 3D`).

### Inputs & Search
- **Style:** `35px` height, `9px` radius, subtle hairline border, leading 14px Lucide search icon (`305px` desktop width, `100%` mobile).
- **Focus:** `3px` translucent blue ring (`--focus-ring`) + `--accent` border transition.

## Do's and Don'ts

### Do:
- **Do** keep every card's `.case-body`, `.case-alg-box`, and `.case-footer` horizontally baseline-locked across 4-column rows via `margin-top: auto` on `.case-body` and `minmax(0, 1fr)` grid tracks.
- **Do** hoist category-wide metadata (such as cube holding orientation) once into the phase section header instead of repeating it inside every card.
- **Do** pair Dark Mode and Light Mode changes simultaneously, including SVG diagram badges (`.cube-badge-bg` / `.cube-badge-text`).
- **Do** use Lucide SVG icons or bespoke authored SVGs (`assets/logo.svg`) for all chrome and action controls.

### Don't:
- **Don't** add zero-offset neon glows, gradient text fills, or colored left/right accent stripes (`border-left: 3px solid`).
- **Don't** nest bordered inner boxes inside bordered cards or add redundant floating `3D` pills over clickable cube previews.
- **Don't** place uppercase monospace kicker pills above headings or add marketing/roadmap banners above the workbench grid.
- **Don't** place white text on `#0A84FF` or `#409CFF` fills; use `#0071E3` (`>= 4.75:1`) for filled blue buttons.
