# CURSOR MASTER PROMPT - SO SLUSHI MENU

You are updating/building the **SO SLUSHI / سو سلوشي** digital restaurant menu.

## 1. MASTER REFERENCE: CUPID BURGER
Treat the existing **Cupid Burger / Copid-menu** project as the MASTER UI/UX reference. Reuse its proven structure and behavior rather than redesigning from scratch.

Preserve/reuse the same concepts already used in Cupid:
- Header / logo area.
- Sticky category navigation and smooth category scrolling.
- Data-driven product grid/cards and the same card proportions / spacing logic.
- Existing price badge patterns and product-detail behavior if present.
- Arabic/English language support using `{ ar, en }` data and immediate RTL/LTR switching.
- Mobile-first behavior for roughly 360–430 px screens, then responsive tablet/desktop.
- Lazy-loaded menu images and good image framing.
- The same overall component architecture and minimal-change philosophy.
- If the existing Cupid code has calories, allergens, descriptions, detail modals, or other optional fields, REUSE the existing data shape only. Do not invent values for SO SLUSHI.

This is a **digital restaurant menu**, not a delivery/e-commerce platform. Do not add cart, checkout, login, delivery tracking, or unrelated flows unless they already exist and are explicitly required by the current project.

## 2. BRAND IDENTITY: SO SLUSHI ONLY
Keep Cupid's UI/UX structure, but completely separate the visual brand identity.

SO SLUSHI identity:
- Primary background: near-black / black.
- Surfaces: subtle layered blacks / charcoal.
- Accent: warm premium gold, NOT bright yellow.
- Text: warm off-white.
- Overall feel: cinematic, premium, modern steak/burger restaurant.

Use the supplied brand references in:
- `assets/brand/logo-reference-crop.webp`
- `assets/brand/shirt-brand-reference.webp`

Suggested starting tokens are available in `menu-data.json`. Adjust only slightly if needed to match the logo reference.

## 3. SINGLE SOURCE OF TRUTH
Use `menu-data.json` as the menu content source.

Important:
- The CURRENT prices in `menu-data.json` override all old-menu prices.
- Do not scrape, infer, or reuse old PDF prices.
- Do not invent descriptions, calories, ingredients, allergens, or prices.
- If a field has no data, hide that UI element gracefully or keep it empty according to the existing Cupid data model.
- Keep product order exactly as provided unless a technical requirement forces otherwise.

## 4. CATEGORY ORDER
Render categories in this order:
1. برجر الدجاج / Chicken Burgers
2. برجر اللحم / Beef Burgers
3. الأضلاع والستيك / Ribs & Steaks
4. الفرايز والسلطات / Fries & Salads
5. السلايدر / Sliders
6. الصوصات / Sauces
7. المشروبات / Drinks

## 5. PRICE UI
For products with sandwich + meal prices:
- Show both clearly using the same compact price treatment from Cupid.
- Arabic labels: `ساندوتش` and `وجبة`.
- English labels: `Sandwich` and `Meal`.

For `برجر سماش سلوشي`, also show the supplied variant label `دبل / Double` without inventing another variant.

For single-price items (steaks, ribs, fries, salads, sauces, drinks), show one clear SAR price.

Currency:
- Arabic: `ر.س`
- English: `SAR`

## 6. IMAGES
Use only the optimized images in `assets/menu-final/` for active product cards.

Rules:
- Do NOT re-import duplicate images from the original shoot.
- Do NOT substitute a visually similar product for a missing product.
- `لحم كيتو` has no confidently matched new image. Its `image` is null. Use the existing no-image/fallback card treatment if the project has one; otherwise make a clean text-focused card. Do NOT generate or borrow a wrong burger photo.
- `Tenderloin Steak` and `Ribeye Steak` currently use two edited variants derived from the same photographed steak source. Keep them as supplied; do not claim they are independently photographed cuts.
- Slider chicken and beef assets are deliberate crops derived from the mixed-slider photo.
- Preserve the card/image container behavior from Cupid. Avoid global CSS changes just to fit one photo. If needed, use per-item `object-position` or a tiny per-item framing override.

## 7. SAUCES
The old menu confirms these sauce names:
- صوص سلوشي / Slushi Sauce
- صوص كلاسيك / Classic Sauce
- صوص داينمت / Dynamite Sauce
- صوص الخردل بالعسل / Honey Mustard Sauce
- صوص الفقع / Truffle Sauce
- صوص الميبل / Maple Sauce

CURRENT price: every sauce is **3 SAR**.

There are 8 supplied sauce photos in `assets/sauces-reference/`, but the exact image-to-name mapping is not explicit. Therefore:
- Render sauces as a compact premium list/chip/grid with names + 3 SAR.
- Do NOT automatically bind a generic sauce-reference image to a named sauce.
- Do not guess the mapping.

## 8. DRINKS
Use these drink names from the legacy menu, with CURRENT price override:
- Coca-Cola / كوكاكولا — 3 SAR
- Sprite / سبرايت — 3 SAR
- Diet Cola / كولا دايت — 3 SAR
- Fanta Orange / فانتا برتقال — 3 SAR
- Mojito / موهيتو — 10 SAR

No new drink photos were confidently included in the photo ZIP, so keep this section clean and text-first unless the current project already has verified drink assets.

## 9. DUPLICATE / EXCLUDED IMAGE POLICY
`image-audit.csv` documents all 46 supplied images.

Honor these statuses:
- `USE`, `USE_AND_CROP`, `USE_SHARED_SOURCE` => allowed for active menu.
- `DROP_DUPLICATE` => do not use.
- `EXCLUDE_NOT_CURRENT` / `EXCLUDE_UNMATCHED` => do not put on the live menu.
- `REFERENCE_ONLY` => not an active product image.

Do not add old-only products just because a photo exists. The live menu should follow `menu-data.json`.

## 10. IMPLEMENTATION RULES
1. Inspect the repository first and identify the existing Cupid-style components/data conventions before editing.
2. Make the smallest clean set of changes needed. Do not perform an unnecessary global refactor.
3. Keep menu content in one data source; do not duplicate product arrays across components.
4. Keep all Arabic strings RTL and all English strings LTR.
5. The language switch must update category names, product names, price labels, UI labels, and direction immediately.
6. Preserve responsive behavior and avoid horizontal overflow on 360–430 px mobile widths.
7. Preserve/implement smooth sticky category navigation.
8. Use semantic buttons/links and accessible text contrast.
9. Use optimized supplied WebP files; do not replace them with AI-generated food.
10. Do not use the shirt photo itself as a hero/menu product background. It is brand reference only.

## 11. VISUAL DIRECTION
The result should feel like the same high-quality product family as Cupid Burger, but unmistakably SO SLUSHI:
- Black canvas.
- Warm gold accents/borders/active states.
- Large cinematic food photography.
- Clean premium spacing.
- Strong product name hierarchy.
- Price is immediately readable.
- Gold should be restrained and elegant.
- Avoid noisy gradients, excessive glow, generic restaurant templates, and bright yellow.

## 12. QA BEFORE FINISHING
Before considering the task complete:
- Run the production build.
- Fix all TypeScript/lint/build errors that are caused by your changes.
- Test Arabic + English.
- Test 360 px, 390 px, 430 px, tablet, and desktop widths.
- Verify sticky category nav scroll targets.
- Verify every image path in `menu-data.json` resolves.
- Verify all CURRENT prices match `menu-data.json` exactly.
- Verify no `DROP_DUPLICATE` or excluded photo is used.
- Verify missing-photo items do not show a broken image.
- If this project uses Vercel/PWA/service worker caching, ensure the updated menu/assets are not stuck behind stale cache behavior.

## 13. FINAL REPORT
When finished, report concisely:
- Files/components changed.
- Build result.
- Number of live products by category.
- Any item intentionally left without a photo.
- Any remaining low/medium-confidence mapping from `menu-data.json` that was preserved rather than guessed.

Do not ask for clarification before starting. Use the supplied files and data, implement the best supported result, and do not invent missing business information.
