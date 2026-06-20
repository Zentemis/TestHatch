# AI Website Redesign Plan

## Overview
Replace the current `ai-site/` directory with a polished, modern AI landing page. This sits behind the Hatcher easter egg split on `feature/ai-website-hatcher-egg`, but should also work as a standalone website when served directly.

## Design Direction
- **Dark cosmic theme** — deep navy/purple backgrounds with subtle particle animations
- **Glassmorphism** — frosted panels with backdrop blur for cards and sections
- **Gradient accents** — violet-to-cyan gradients for CTAs and highlights
- **Smooth scroll reveals** — IntersectionObserver-driven fade-in animations
- **Responsive** — mobile-first, works from 320px up

## Page Structure

### 1. Navigation
- Fixed top bar with glass effect (blur + semi-transparent bg)
- Logo + nav links (Features, Models, Stats, Contact) + CTA button
- Mobile hamburger that slides in from right

### 2. Hero Section
- Full-viewport height
- Animated gradient text headline (e.g. "Intelligence that thinks like you do")
- Subtle floating orbs in background (CSS keyframes)
- CTA buttons: "Start Building" (primary) + "See Research" (secondary)
- Stats row below: 50M+ predictions, 99.97% uptime, 120+ countries

### 3. Features Grid
- 3-column grid (2 on tablet, 1 on mobile)
- 6 feature cards with icons (SVG inline), title, and description
- Cards have glass background, subtle border, hover lift effect with top gradient border

### 4. Models Showcase
- 3 model cards side by side
- Featured card (larger, with "FLAGSHIP" badge)
- Each shows model name, description, metric scores (MMLU, HumanEval, etc.)
- "Try Now" / "Learn More" buttons

### 5. Stats / Metrics Section
- Animated counters that count up when scrolled into view
- 4 columns: Active Builders, Inference Calls/Day, Uptime SLA, Models Available

### 6. Testimonials
- 4 testimonial cards in a 2x2 grid
- Quote, author avatar (initials), name, role
- Subtle card styling

### 7. CTA Section
- Big heading "Start building with AI in minutes, not months"
- Subtitle text
- Two buttons: "Get started free" + "Star on GitHub"

### 8. Footer
- 4-column layout: Brand description, Product links, Resources, Company
- Bottom bar with copyright

## Implementation Details

### File Structure
```
ai-site/
  index.html          — single self-contained HTML file (all CSS + JS inline)
  assets/
    images/
      favicon.svg     — optional
```

**Self-contained is key** — no external CSS/JS files. Everything inline in one HTML file so the iframe load is simple and reliable.

### CSS
- CSS custom properties for theming (colors, shadows, radii, transitions)
- `@import` for Google Fonts (Inter + Space Grotesk + JetBrains Mono)
- Glass card pattern: `background: rgba(15, 15, 25, 0.6); border: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(12px);`
- Ambient background orbs with `filter: blur(80px)` and float animation
- Noise texture overlay via SVG data URI for grain
- Reveal animation class: `.reveal { opacity: 0; transform: translateY(30px); transition: ... }` + `.visible` class toggled by IntersectionObserver

### JS (inline in same file)
- Particle canvas in background (floating dots with mouse repulsion + connection lines)
- IntersectionObserver for scroll reveals
- 3D tilt on hover for feature/model cards (CSS `perspective` + `rotateX/Y`)
- Animated counters with easing
- Mobile hamburger toggle
- Smooth scroll for nav anchor links

### Easter Egg Interaction (in the surrounding index.html)
The root `index.html` in the repo should be kept minimal:
- Single overlay with canvas (ball physics from original Hatcher)
- Click counter (5 clicks → counter shows progress)
- Shift+A triggers split
- Split: JS-freezes the canvas, creates two half-divs with `overflow:hidden`, 200%-wide content at `left:0` / `left:-100%`, and reveals the ai-site `<iframe>` behind it

## Execution Order
1. Create `ai-site/index.html` with full self-contained design
2. Strip the Hatcher overlay from the ai-site page (it should be a clean landing page)
3. Simplify root `index.html` overlay to the minimal working split (test locally)
4. Push to `ai-site-redesign` branch
5. Verify on GitHub (test in browser)
