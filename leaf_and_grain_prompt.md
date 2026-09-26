# "Leaf & Grain" — Modern Cafe Website Build Spec

ACT AS:
A world-class Awwwards-level Creative Developer and Brand Designer, specializing in warm, modern, editorial hospitality/food-and-beverage web design, Next.js, Tailwind CSS, and clean component-driven marketing sites for specialty coffee shops.

THE TASK:
Design and implement a warm, modern, fully responsive one-page marketing website for a specialty coffee shop called **"Leaf & Grain"** (swap in your own brand name/logo). This is NOT a scroll-hijacked cinematic experience — it's a clean, confident, componentized landing page: distinct full-width sections stacked vertically, each with organic rounded "blob" shape dividers, soft sage-green and cream color blocking, and a friendly, grounded, nature-meets-craft tone (specialty beans, fresh roasting, handmade pastries, cozy atmosphere).

TECH STACK INTENT (for behavior/style, not code generation):
- Framework: Next.js 14 (App Router mental model)
- Styling: Tailwind CSS utility thinking (consistent spacing scale, rounded-2xl/rounded-3xl corners throughout)
- Components: reusable Card, Badge/IconFeature, MenuItem, ProductChip, NewsletterForm
- Forms: a working "Reserve a table" button/modal and a newsletter email-capture form (client-side validation, can post to a placeholder API route)
- Icons: simple line-icon set (leaf, flame, barista/person, coffee cup, location pin, clock, phone)

VISUAL DIRECTION & BRAND AESTHETIC:
Overall vibe: warm, natural, modern-editorial, approachable-premium — sage green + cream + one warm orange accent. Friendly and grounded rather than luxury/cinematic; feels like a neighborhood specialty coffee shop that takes its craft seriously.

Color Palette:
- Background (page): warm cream `#F6F0E4`.
- Section block backgrounds (alternating): sage green `#AEC1A0` for feature/menu/beans sections, cream `#F6F0E4` for hero and dessert sections — creating a clear rhythm of green → cream → green → cream down the page.
- Logo mark: small circular badge in deep forest green `#3B5C46` with a white leaf icon.
- Headings: near-black warm charcoal `#242220`, bold, no gradients.
- Body text: soft warm gray-brown `#5B564E` at reduced opacity for readability.
- Primary accent (CTA buttons, price highlights): warm terracotta-orange `#E8703A`.
- Secondary accent: same deep forest green `#3B5C46` used for secondary buttons and icon strokes.
- Card backgrounds: off-white `#FBF7EF` with soft shadows, rounded-3xl corners.

Shape language (important, distinctive to this design):
- Every full-width section is divided from the next with a large, soft, organic "blob" curve (like an oversized rounded speech-bubble edge) rather than a straight horizontal line — alternating which corner the curve bulges from, section to section.
- Photos are placed inside large rounded-corner frames (rounded-[2.5rem] or similar), often bleeding slightly outside their section's edge into the neighboring section for depth.

Typography:
- Headings: a bold, slightly rounded geometric sans (e.g. a warm grotesk) — big, confident, tight line-height, dark charcoal.
- Body: a clean humanist sans, medium size, warm gray-brown, generous line-height, short conversational sentences.
- Prices: bold, slightly larger, in the terracotta accent or charcoal, right-aligned or beside the item name.

NAVBAR:
- Sticky top nav on a cream background, no blur/glassmorphism needed (this design is flatter/friendlier than a tech product page).
- Left: circular leaf-badge logo + two-line wordmark — brand name (bold) and a small tagline underneath (e.g. "specialty coffee").
- Center: nav links — "Menu", "About", "Beans", "Delivery", "Contact".
- Right: a filled terracotta-orange pill button, "Reserve a Table" (opens a simple reservation modal/form: name, phone/email, date, time, party size, submit).
- On scroll: nav can gain a subtle soft shadow/opacity shift; no heavy transformation needed.

SECTION-BY-SECTION BREAKDOWN:

**1) HERO (cream background, sage-green blob accent in a top corner)**
- Left column:
  - Large bold headline (2–3 lines): "Coffee you fall in love with from the first sip." (or equivalent warm, sensory headline for your brand)
  - Subheadline: "Specialty coffee, fresh pastries, and a cozy atmosphere in the heart of the city."
  - Primary CTA button (terracotta): "View Menu"
  - A row of 3 small feature badges with icons + short labels, e.g. "Specialty coffee", "Made with love", "Fresh every day"
- Right column:
  - Large rounded-corner photo: a latte-art cup and saucer beside a croissant, shot from above/three-quarter angle, warm natural light, on a sage-green backdrop that bleeds into the section's green color blocking.
  - A small rounded badge overlapping the photo's corner: "100% Arabica" (or your own trust badge).

**2) FEATURE STRIP (cream background, 4-column icon row)**
- Four equal columns, each: icon (leaf / flame / person / cup), bold short title, one-line description.
  - "Selected beans" — "We work only with trusted farms and specialty lots."
  - "Fresh roasting" — "Small batches roasted every week."
  - "Skilled baristas" — "Professionals who pour with care and attention."
  - "Cozy space" — "Bright, calm, and full of flavor — your place of strength."

**3) POPULAR DRINKS (sage-green background block, rounded-3xl corners on the whole section)**
- Left: section heading "Popular Drinks", one-line subcopy, and a secondary button "View Full Menu" (outline style).
- Right/main: a horizontal row of 3 drink cards, each with:
  - Circular or rounded-square photo of the drink from above
  - Name (bold)
  - One-line flavor description
  - Price, right-aligned, bold
  - e.g. "Latte — Smooth and creamy — 250 ₽", "Matcha Latte — Green harmony — 280 ₽", "Iced Filter — Refreshing and light — 260 ₽"

**4) RECOMMENDED TREATS (cream background)**
- Small kicker heading with leaf/decorative flourish: "✦ Recommend Trying ✦"
- 3 dessert cards in a row, each: photo, name, one-line description, price, and a small circular "+" add-to-cart icon button in the bottom-right corner of the card (functional — adds to a simple cart state/counter).
  - e.g. "Almond Croissant — Crispy outside, tender inside — 220 ₽", "Berry Cheesecake — Soft dessert with seasonal berries — 260 ₽", "Chocolate Chip Cookie — Warm, soft, and very chocolatey — 160 ₽"

**5) OUR BEANS (sage-green background block, rounded-3xl)**
- Left: heading "Beans We're Proud Of", short paragraph about sourcing/roasting/care, a filled dark-green button "Choose Your Beans", and a row of 3 small icon+label items ("Direct from farmers", "Roasted to order", "Freshness in every bag").
- Right: photo of a branded coffee-bag product shot next to a small potted plant and raw beans in a bowl, warm and tactile.

**6) FOOTER / CONTACT + NEWSLETTER (cream background, rounded-3xl top corners)**
- Left block: "Come visit us!" heading, address (with pin icon), opening hours (with clock icon), phone number (with phone icon).
- Right block: "Stay updated on news and special offers" heading, an email input + terracotta "Subscribe" button (functional client-side validated form), and a small decorative line-art illustration of a cafe table/chairs with plants.
- Bottom bar: copyright line + "Privacy Policy" / "Terms of Use" links, small.

FUNCTIONAL FEATURES TO IMPLEMENT (not just visual):
1. **Reserve a Table** — button opens a modal/inline form (name, contact, date picker, time, party size); on submit, show a success confirmation state.
2. **Newsletter signup** — email input with basic validation (valid email format), submit button, success/error state message.
3. **Add-to-cart on dessert cards** — clicking the "+" increments a small cart-count indicator (can live in the nav or as a floating badge); purely client-side state is fine.
4. **Sticky nav** with smooth-scroll anchor links to each section (Menu, About, Beans, Contact).
5. **Responsive behavior**: on mobile, the multi-column rows (feature strip, drinks, desserts) become horizontally scrollable card carousels or stack vertically; the nav collapses into a hamburger menu; the organic blob dividers simplify to gentle curves or straight rounded edges to avoid visual clutter on small screens.
6. **Hover/press states**: buttons get a subtle scale/opacity shift; cards get a soft lift/shadow increase on hover.

UI & VISUAL POLISH (KEYWORDS):
warm, modern, natural, editorial, approachable-premium, organic shapes, rounded corners, soft shadows, sage green, terracotta accent, handcrafted, cozy, inviting, clean iconography, generous whitespace, friendly typography, Awwwards-level component polish.

LAYOUT RULES:
- Max content width ~1200–1280px, centered, generous side padding.
- Consistent rounded-corner radius scale (e.g. 24px small cards, 40px+ large section/photo frames).
- Alternate section background colors (cream → sage → cream → sage → cream) to create rhythm without needing scroll-triggered animation.
- Keep motion minimal and confident: gentle fade/slide-up on scroll-into-view for each section, no aggressive parallax or pinned canvases (this is a friendlier, less "cinematic" brand than a tech-product reveal).

---

## FINAL PROMPT (COMBINED, READY-TO-USE)

"Design and build a warm, modern, fully responsive one-page marketing website for a specialty coffee shop called 'Leaf & Grain' (or [your brand name]). Use a friendly, natural, approachable-premium aesthetic: a cream background `#F6F0E4` alternating with sage-green section blocks `#AEC1A0`, each section separated by large soft organic 'blob' curves instead of straight lines. Headings use a bold, slightly rounded geometric sans in near-black charcoal `#242220`; body text is a warm gray-brown `#5B564E`. The primary accent color is a warm terracotta-orange `#E8703A` used for CTA buttons and prices, with a deep forest green `#3B5C46` as a secondary accent for the logo badge and secondary buttons. All cards and photo frames use large rounded corners (24–40px) with soft shadows.

Include a sticky top nav with a circular leaf-logo badge and two-line wordmark on the left, centered links for 'Menu', 'About', 'Beans', 'Delivery', 'Contact', and a right-aligned terracotta pill button reading 'Reserve a Table' that opens a working reservation form (name, contact info, date picker, time, party size, with a success confirmation on submit).

Build these sections in order: (1) a hero with a bold multi-line headline like 'Coffee you fall in love with from the first sip.', a one-line subheadline, a 'View Menu' CTA, three small feature badges, and a large rounded photo of latte art beside a croissant on a sage-green backdrop with a '100% Arabica' badge overlapping its corner; (2) a four-column feature strip with icons for 'Selected beans', 'Fresh roasting', 'Skilled baristas', and 'Cozy space', each with a one-line description; (3) a sage-green 'Popular Drinks' block with a heading, a 'View Full Menu' outline button, and three drink cards (photo, name, one-line description, bold price) for items like a Latte, Matcha Latte, and Iced Filter coffee; (4) a cream 'Recommended Treats' section with a decorative kicker heading and three dessert cards (photo, name, description, price, and a functional circular '+' add-to-cart button that increments a small cart counter); (5) a sage-green 'Our Beans' block with sourcing/roasting copy, a dark-green 'Choose Your Beans' button, three small trust icons, and a photo of a branded coffee bag with raw beans and a plant; (6) a cream footer with address/hours/phone on the left, a functional email newsletter signup (validated input + 'Subscribe' button with success/error states) on the right beside a simple line-art illustration of a cafe table, and a bottom bar with copyright and legal links.

Make the whole page fully responsive: multi-column rows become horizontally scrollable cards or stack vertically on mobile, the nav collapses to a hamburger menu, and the organic blob dividers simplify on small screens. Add subtle fade/slide-up-on-scroll-into-view animation per section (no pinned-canvas or scroll-hijacking effects — this brand is friendly and grounded, not a cinematic product reveal). Implement working client-side functionality for the reservation form, the newsletter signup, and the dessert add-to-cart buttons. Overall, aim for a warm, natural, Awwwards-level component-driven design with generous whitespace, organic shapes, and a cozy specialty-coffee-shop feeling throughout."
