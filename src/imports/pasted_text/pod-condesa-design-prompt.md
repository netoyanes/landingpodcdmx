POD CONDESA — Website Design Prompt
For AI web-building agent · Phase 1 · Cultural Positioning & Events

DESIGN SYSTEM
Typography: Poppins (SemiBold +7.5ls for eyebrows/labels, Medium for body, ExtraBold −1ls for large display numbers) paired with Playfair Display (Black for editorial titles, Italic for subtitles and taglines). Never mix weights arbitrarily — eyebrows are always Poppins SemiBold uppercase tracked, titles are always Playfair Black or Poppins Medium.
Colors: Background #0D0D0D (obsidian black). Primary text #EFEFE0 (warm cream). Secondary/metadata text #CDCDB9 (muted cream). Surface cards #1A1A1A. Borders/dividers #323232. No pure whites. No grays with blue undertones. The palette is always warm, dark, and editorial.
Logo: The POD symbol is a 4-petal curved mark (like a compass rose or 4-pointed star formed by arcs). Always rendered in #EFEFE0 on dark backgrounds or #0D0D0D on cream surfaces. Wordmark: POD ART HOUSE in Poppins SemiBold, letter-spacing +7.5px. Sub-label: CONDESA · CDMX in Poppins Medium, letter-spacing +4px, color #CDCDB9.
Spacing: Base unit 8px. Section padding 80–120px vertical. Content max-width 1440px. Generous negative space — the emptiness is intentional and part of the aesthetic.

SITE ARCHITECTURE & SECTION SPECS
Build a single-page scroll website, fully responsive, with the following sections in order:

01 · NAV
Fixed top navigation. Background #0D0D0D at 92% opacity with backdrop blur. Left: POD symbol + wordmark. Right: navigation links in Poppins SemiBold 11px +3ls uppercase — EXPOSICIONES · EVENTOS · ESPACIO · CONTACTO. On mobile: hamburger menu, full-screen overlay in #0D0D0D, links centered in Playfair Display Italic 32px.

02 · HERO
Full viewport height. Dark background #0D0D0D. Background layer: full-bleed image or video (16:9 horizontal, space/community footage) at 50–60% opacity as texture — not as the subject. Foreground: large editorial headline in Playfair Display Black, 120–140px desktop / 56px mobile, color #EFEFE0, positioned left-aligned with generous top margin. Below headline: a one-line descriptor in Poppins Medium 18px #CDCDB9. Below that: a thin horizontal rule #EFEFE0 at 15% opacity, 80px wide. Below rule: primary CTA button — outlined style, border #EFEFE0 1px, text Poppins SemiBold 11px +3ls uppercase #EFEFE0, padding 14px 32px, no fill, hover state fills #EFEFE0 with text #0D0D0D. Bottom of hero: scroll indicator — small Poppins Medium 9px +2ls "SCROLL" with a 40px vertical line below it.
Placeholder headline: "Un espacio donde converge el arte, la cultura y la comunidad."
Placeholder CTA: VER EVENTOS

03 · CURRENT EXHIBITION
Section label: eyebrow in Poppins SemiBold 9px +4ls #CDCDB9 — "EXPOSICIÓN ACTUAL". Title in Playfair Display Black 72px #EFEFE0. Artist name in Poppins SemiBold 28px +2ls #EFEFE0. Curatorial statement in Poppins Light 16px #EFEFE0 at 65% opacity, max-width 560px, line-height 28px. Dates in Poppins SemiBold 11px +3ls #CDCDB9. Layout: two-column on desktop — left column text (45% width), right column full-bleed image (55% width) with no border-radius. Image has a subtle #EFEFE0 1px border at 10% opacity. On mobile: image full-width first, then text below. Opening info (if applicable) shown as a small card at bottom of text column: #1A1A1A background, #EFEFE0 8% opacity border, Poppins Medium 11px. Thin gold-cream accent line (2px, #EFEFE0 40% opacity, 40px wide) placed above the title as a decorative separator.

04 · UPCOMING EXHIBITIONS
Dark surface section #1A1A1A. Section eyebrow: "PRÓXIMAS EXPOSICIONES". Horizontal scroll row of cards on mobile, 3-column grid on desktop. Each card: #0D0D0D background, 1px border #323232, border-radius 4px. Card anatomy: image top (aspect ratio 4:3, object-fit cover), 2px accent line in #EFEFE0 40% opacity, artist name in Poppins SemiBold 14px, date in Poppins Medium 11px #CDCDB9, short text in Poppins Light 12px #EFEFE0 55% opacity. Hover state: border color lifts to #EFEFE0 30% opacity, subtle scale 1.02.

05 · EVENT OF THE WEEK
Full-width section. Left half: #0D0D0D background with text content. Right half: event image full-bleed. Text side layout (top to bottom): eyebrow "EVENTO DE LA SEMANA" in Poppins SemiBold 9px +4ls #CDCDB9. Event name in Playfair Display Black 56px #EFEFE0. Facilitator in Poppins Medium 16px #CDCDB9. Date + time in Poppins SemiBold 14px +2ls #EFEFE0. Horizontal rule #323232 1px full-width. Description in Poppins Light 15px #EFEFE0 65% opacity, line-height 26px. Price in Poppins SemiBold 18px #EFEFE0. CTA button: filled #EFEFE0 background, text #0D0D0D Poppins SemiBold 11px +3ls "REGISTRARSE". On mobile: stacked vertically, image above, content below.

06 · THE SPACE
Three-column image grid (or 2+1 asymmetric layout) showing interior, rooftop, and community in use. No captions. Pure visual. Below grid: single centered line in Playfair Display Italic 28px #EFEFE0 — a mood phrase. Section background #0D0D0D.

07 · FOOTER
Background #0D0D0D. Top: thin horizontal rule #EFEFE0 10% opacity. Three columns: left — POD symbol large (80px) + wordmark + address in Poppins Light 12px #CDCDB9. Center — navigation links repeated, Poppins Medium 12px #EFEFE0 60% opacity, vertical list. Right — Instagram handle + email + hours, Poppins Medium 12px #CDCDB9. Bottom row: copyright in Poppins Medium 9px #EFEFE0 25% opacity, centered.

INTERACTION & MOTION
Page scroll: sections fade up on enter (opacity 0→1, translateY 20px→0, 600ms ease-out). No aggressive animations. Hero headline: word-by-word stagger reveal on load (80ms between words). Image hover: scale 1.02, transition 400ms ease. CTA buttons: 200ms fill transition. Cursor: default — no custom cursors.

RESPONSIVE BREAKPOINTS
Desktop: 1440px max-width, 80px horizontal padding. Tablet: 768px, 40px padding, 2-column grids become stacked. Mobile: 375px min, 20px padding, all grids single column, font sizes scale down 30–40%.

TECHNICAL REQUIREMENTS
Stack: HTML/CSS/JS or React. No heavy frameworks unless necessary. Fonts loaded via Google Fonts (Poppins + Playfair Display). Images: lazy loading, WebP format. Performance target: LCP under 2.5s. All CTAs open in new tab if external. Mobile-first CSS. No login, no e-commerce, no memberships in Phase 1.

CONTENT PLACEHOLDERS
Where real content is missing, use:

Images: dark #1A1A1A rectangles with centered "[ IMAGEN ]" in Poppins SemiBold 9px #EFEFE0 20% opacity
Text: brackets notation — [Nombre del artista], [Fecha], [Statement curatorial]
Video: dark background with centered POD symbol at 20% opacity as placeholder