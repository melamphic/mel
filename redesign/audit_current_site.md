# Salvia marketing site ("mel") — current-state audit

**Auditor's brief:** prove, concretely, why the founder feels the current site is "a confused mess," judged against the target positioning (India-first AI clinical-documentation + agentic-compliance platform; clinical-value wedge now, compliance vision signaled).

**Repo:** `/Users/aby/work/melamphic/mel` · React 19 + React Router 7, SSG via `prerender.mjs` + `snapshot.mjs`, design system in `src/styles/grass.css`.

**Launch mode:** `INDIA_ONLY = true` by default (`src/config.ts:35`). This forces the India market everywhere and hides the country/currency switcher — but, as this audit shows, large parts of the site still ship the pre-India multi-country / per-seat / Anglo-vertical machinery underneath the India veneer. That layering **is** the confusion.

---

## Headline finding

The site is **two products wearing one skin**:

1. **The intended product (mostly on the Landing + Hospitals pages):** India-first "evidence layer" — audio → sealed, policy-checked clinical record — priced per note, for Indian clinics & hospitals. Clean, coherent, well-written, on the green "grass" system.
2. **The legacy product still shipping underneath:** a multi-country (NZ/AU/UK/IE/US) SaaS for four Anglo verticals (vet/dental/GP/allied-health) + six allied sub-disciplines, priced **per seat** (Practice/Pro, "AI recording seats"), with a 56-framework catalog that is 79% foreign regulators, a blog built for RCVS/CQC/AHPRA, and JSON-LD that tells Google "Salvia serves 6 countries."

The nav shows product #1. The footer, pricing engine, frameworks page, signup form, blog and structured data expose product #2. Nothing tells the visitor which one they're buying, for which country, as which persona. **The agentic-compliance vision — the actual north star — appears almost nowhere.**

---

## Inventory counts

- **Distinct routes/pages:** 30 templates — 1 landing, 1 hospitals, 1 pricing, 1 signup, 4 vertical, 6 allied-discipline (one template), 3 product-module, 1 frameworks, 1 blog index, 1 blog article template, 1 company (melamphic), 1 assets, 7 legal, 1 404, + `/contact-sales`→`/start` redirect.
- **Blog posts:** 32 in registry (`blogContent.tsx`); **17 visible** in India-only mode (6 India + 11 jurisdiction-neutral), **15 ROW posts hidden** (`blogMarkets.mjs`).
- **Top-level sections audited across primary pages:** ~95 (see site map).
- **Dead code:** **23 of 30** components in `src/components/` are imported nowhere (~5,200 lines of orphaned pre-grass components). Only 2 pages (`/assets`, `/404`) still use the legacy `Header`/`Footer`.
- **Frameworks catalog:** 56 entries — IN 12, AU 12, NZ 10, US 9, GB 8, IE 4. **India is 21% of a catalog shown in full to an India-only audience.**

---

# (a) Site map — every page, every section, with quoted copy

Nav (`GrassHeader.tsx`) exposes only: **How it works · Why · Hospitals · Pricing · Blog** + "Get started" CTA. Verticals, product modules, frameworks and company are reachable only from the footer or SEO — they are **orphaned from primary navigation**.

## 1. `/` Landing (`LandingPage.tsx`)
SEO title: *"The Evidence Layer for Indian Healthcare — AI Clinical Records."*

1. **Hero** (`HeroGrass.tsx`) — H1: **"Every consult, on the record."** Sub: *"Salvia listens — ambient in the OPD or a short voice note after the consult — and turns the audio into complete clinical documentation, checked against your policies. The clinician verifies. The record is sealed. You can prove what happened."* Product screenshot (`patient-profile.png`). **No CTA button in the hero.**
2. **ColorTrio** (`ColorTrio.tsx`) — H2: **"You talk. It becomes the record."** Three blocks: "Speak, it writes." / "Checked before signed." / "Sealed as evidence." (mock capture card, policy pass/fail rows, PDF SHA-256 card). Anchor `#how-it-works`.
3. **Form builder** (`ProductSections.tsx`) — H2: **"Build the exact form your clinic uses."** Sub names typed widgets (Consent · Drug op · Incident · Pain score…). Drawn form-builder UI.
4. **Policy engine** — H2: **"Write the rule once. Every note obeys it."** *"…must, should, or try… overriding needs a written justification, recorded in the audit log."* "Ships with 58 ready policies."
5. **Template library** — H2: **"Don't start from a blank page. 107 templates ship inside."** 12 template cards; footer line *"…and 95 more across veterinary, dental, general practice, allied health and aged care."* (Cross-vertical — includes Aged care, which has no page.)
6. **RegisterShowcase** (`RegisterShowcase.tsx`) — H2: **"The paperwork that can sink you. Handled."** 5 tabs: OPD notes / Consent / Drug register / Incidents / Discharge. Anchor `#products`.
7. **PDF section** — H2: **"The PDF that answers for you."** SHA-256 content hash, Audit Pack.
8. **SixYearGrass** (`EvidenceGrass.tsx`) — H2: **"A complaint from 2020 just arrived. The treating doctor left last year."** 4 sourced NCDRC stats, giant "22%", quote *"Poor records mean poor defense. No records mean no defense."* Anchor `#six-year-test` (the nav's "Why").
9. **HospitalsBand** (`CommercialGrass.tsx`) — H2: **"Your HMIS runs the hospital. Salvia defends it."** "62% of NABH non-compliances." CTA → `/hospitals`.
10. **PricingTeaserGrass** — H2: **"Priced per note. Not per doctor."** 3 India tiers from `INDIA_TIERS` + Hospitals-Custom card. "Start with 50 free notes."
11. **FinalCTAGrass** — H2: **"The record you'll be glad exists."** CTAs: "Start free" / "Watch the demo" (`#demo` — **anchor does not exist on the page**).
12. **Footer** (`GrassFooter.tsx`) — 5 columns exposing **all** legacy surface: By practice (Hospitals/Vet/Dental/GP/Allied), Allied disciplines (6), Modules (Audio→Forms/Form Engine/Policy Engine), Company, Legal. Tagline: *"The evidence layer for Indian healthcare."* "Made in India 🇮🇳" · "Made in Malabar, for the world."

## 2. `/hospitals` (`HospitalsPage.tsx`) — the strongest page on the site
1. **Hero** — H1: **"Your HMIS runs the hospital. Salvia defends it."** CTAs: "Talk to us" / "See pricing." Hospital-dome video.
2. **HMIS vs can't** — H2: **"What your HMIS holds. What it can't."** *"That gap is the product."* Two fact columns.
3. **Capture modes** — H2: **"Works the way your floor works."** Ambient OPD / Post-consult voice note / Guided IP rounds. Malayalam/Hindi/English.
4. **NABH math** — H2: **"Documentation is the audit."** Stats: 62% / +10% PM-JAY / 3–6 mo.
5. **Six-year test** — duplicate of Landing §8, hospital-tuned ("What does your hospital hand over?").
6. **Custom pricing CTA** — H2: **"Hospitals run on custom plans."** "Per note, committed minimum · None, ever (per-seat) · Net-30 · Premium tier."

## 3. `/pricing` (`PricingPage.tsx`)
1. **Hero** — H1: **"Priced per note. Not per doctor."** *"No credit card required. Unlimited nurses, hygienists and admin staff on every plan."* (Currency selector hidden under `INDIA_ONLY`.)
2. **India tiers** (`IndiaPricingSection`) — 3 cards from `INDIA_TIERS`: **Starter ₹999 / Clinic ₹2,999 / Group ₹5,999**, note caps 400/1,500/3,000; annual toggle "2 months free."
3. **India feature grid** (`IndiaFeatureGrid`) — hardcoded columns *"Starter · ₹999 / Clinic · ₹2,999 / Group · ₹5,999"*; rows for AI form/policy gen, multi-location, support SLAs.
4. **[Dead path]** Non-India branch renders vertical tabs (Veterinary/Dental/GP/Allied), per-seat `TierCard`s ("3 AI recording seats," "Practice 1–3 / Pro 4–7"), `EnterpriseBanner` ("Enterprise · 8+ clinicians"), and `GlobalFeatureGrid`. Unreachable while `INDIA_ONLY`, but shipped and SEO-described.

## 4. `/start` (`SignupPage.tsx`)
1. **Pitch (left)** — H1: **"Get started with Salvia."** 4-step timeline (Today → Day 22). "21 days of full access, free, no card."
2. **Form (right)** — fields: name, clinic, email, phone, **Type of practice** (Veterinary / Dental / General practice / Allied health — **no Hospital option**), **Country** (NZ, AU, IN, UK, IE, CA, US — **7 countries on an India-only site**), best call window. Default vertical = **veterinary**; default country = IN. India-only conditional note lists English/Hindi/Malayalam/Tamil.
3. **Success page** — "Thanks, {clinic}. You're all set."

## 5–8. Vertical pages (all India-rewritten copy, grass system)
Common skeleton: Hero + "Designed for" regulator chips → voice→record (drawn UI) → register/showcase → a stat block → Before/After → Honest scope (does / "Salvia won't") → **₹999 pricing teaser** → FAQ (FAQPage JSON-LD) → "From the compliance desk" blog rail → Final CTA.

- **`/veterinary`** (`VeterinaryPage.tsx`) — H1: **"Records that survive any inspection."** Chips: VCI · IVC Act 1984 · Schedule H1 · CCSEA · State Councils · DPDP Act. Stat: "365 days a year your records stay assessment-ready." **Blog rail links to `cma-vet-deadline`, `rcvs-record-inspection`, `vcnz-records-standard`, `au-vet-board-records` — all four are `ROW` posts → all four 404 in India-only mode (see problem #4).**
- **`/dental`** (`DentalPage.tsx`) — H1: **"Every field an audit looks for. Captured."** Chips: DCI · Dentists Act 1948 · NABH · AERB · CEA 2010 · DPDP. Stat: "9/20 records… missing BPE scores." Blog rail: `cqc-dental-2026`, `ahpra-dental-records`, `signed-edits-dental` (all ROW → 404) + `malpractice-dental` (OK).
- **`/general-practice`** (`GeneralClinicPage.tsx`) — H1: **"Clinical records that hold up under scrutiny."** Chips: NMC · NABH · ABDM · CEA 2010 · CGHS/PM-JAY · DPDP. No blog rail. Scope line: "ABHA-ready, FHIR-structured output."
- **`/allied-health`** (`AlliedHealthPage.tsx`) — H1: **"Records that map to your regulator."** Chips: NCAHP · RCI · NABH · ABDM · CEA 2010 · DPDP. Six-discipline grid. **FAQ self-contradicts pricing:** *"Same tier structure (Practice 1–3 clinicians, Pro 4–7 clinicians), same per-market pricing"* — on a page whose teaser says "₹999… per note, never per clinician, unlimited staff."

## 9. `/physiotherapy` /osteopathy /chiropractic /occupational-therapy /podiatry /speech-therapy (`AlliedDisciplineTemplate.tsx` + `alliedDisciplines.ts`)
One template, six data-driven pages. India-rewritten (physio chips: NCAHP · Physio Council · RCI · NABH · ABDM). Sections: Hero → "Framework-aware" regulator cards → feature checks → Before/After → Honest scope → ₹999 teaser → FAQ → (blog rail empty for all six) → **"Other allied disciplines on Salvia"** sibling grid → Final CTA. Six near-identical pages = **thin-content / IA bloat** for a pre-traction India launch.

## 10–12. Product-module pages (grass system, India-rewritten copy, jargon URLs)
- **`/products/point-of-care-evidence`** (`AudioToFormsPage.tsx`) — H1: **"Voice note in. Audit-ready record out."** SEO title "Point-of-Care Evidence Capture." Chips: NMC/DCI/VCI/NABH/CEA 2010/DPDP. **But the drawn example is a Labrador vet consult** ("Max · Labrador," metronidazole mg/kg, euthanasia consent) on a page SEO'd for Indian human healthcare.
- **`/products/statutory-form-infrastructure`** (`FormEnginePage.tsx`) — H1: **"Records that can't be argued with."** Immutable versioning / addendum trail.
- **`/products/institutional-compliance-hub`** (`PolicyEnginePage.tsx`) — H1: **"A policy no one reads is a liability."** Coverage-map UI, staff attestation. **Closest thing to the agentic-compliance story, but framed as static policy attestation, not a self-improving agent.**

URL slugs ("statutory-form-infrastructure," "institutional-compliance-hub," "point-of-care-evidence") are enterprise jargon; footer labels them "Form Engine," "Policy Engine," "Audio → Forms" — **three names for each module.**

## 13. `/frameworks` (`FrameworksPage.tsx`)
1. **Hero** — H1: **"Every framework Salvia generates records against."** "{56} frameworks across {6} regions."
2. **Country totals bar** — chips **IN · GB · AU · NZ · US · IE** with counts.
3. **Sticky filters** — Country (All/IN/GB/AU/NZ/US/IE) + Vertical (vet/dental/gp/allied) + search.
4. **Results** — grouped by country; cards link to vertical pages.
5. **Custom CTA** — H2: **"Don't see yours? We'll write it."**

On an India-only site this page **foregrounds 44 foreign regulators** (CORU/HCPC/AHPRA/RCVS/CQC/GDC/GOsC/GCC/AVA/VCNZ/MCNZ…). SEO keywords even list "CORU compliance software," "HCPC software," etc. in the non-India branch.

## 14. `/blog` (`InsightsPage.tsx`)
1. **Header** — H1: **"The questions clinicians actually ask. Straight answers."** *"We trawl forums, boards and subreddits…"*
2. **Search + domain tabs** — Everything / Clinics / Vets / Dental (with counts).
3. **Featured** + **grid** of visible posts. Tabs are `GENERAL/VETERINARY/DENTAL` only — **no India / hospital / compliance taxonomy**.

## 15. `/blog/:id` (`ArticlePage.tsx`)
Template: back-link, tag row, title (the question), excerpt lede, author/date/read-time, illustration, body, Sources block, internal product-link box, keyword chips, "Keep reading" related grid. **Design regression:** this page uses **legacy orange tokens** — `--salvia-accent: #FF4E00`, `rgba(255,78,0,…)` tag/CTA backgrounds, `--accent-vet` blue — i.e. it is **off the green grass system** while wearing the grass header/footer. Reads from `VISIBLE_BLOG_CONTENT`, so any link to a ROW slug renders **"Post not found."**

## 16. `/melamphic` (`MelamphicPage.tsx`)
Hero "We build AI for work under pressure." → Mission → Vision → "What we've built: Salvia" (facts: "First market — India — clinics and hospitals") → `ProductNoteSection` → Team (2 founders, real LinkedIn) → Contact. On-brand, honest, India-consistent.

## 17. `/assets` (`AssetsPage.tsx`) & `*` 404 (`NotFoundPage.tsx`)
Both still import the **legacy `Header`/`Footer`** (orange system) — visually inconsistent with every grass page. `/assets` is also **not in the SSR route table** (see problem #3).

## 18. Legal (`LegalPage.tsx` × 7): `/privacy /terms /cookies /dpa /refund-policy /acceptable-use /security`
Grass header/footer, slug-driven content. Note: `/subprocessors` is prerendered and in the sitemap but **has no client route** in `App.tsx` → 404s in-app (problem #3).

---

# (b) Per-section verdict table

| Page · Section | Job it's doing | Problem vs. target positioning | Verdict |
|---|---|---|---|
| Landing · Hero | Lead value prop | Strong line, but **no CTA button**; "on the record" is evidence-first, undersells the clinical-time win the wedge pilots buy on | **Rework** (add CTA + clinical benefit) |
| Landing · ColorTrio | Explain the loop | Clear, on-message, great | **Keep** |
| Landing · Form builder / Policy engine / Templates / Registers / PDF | Show real product depth | Excellent, concrete, sourced; but **cross-vertical** (Aged care/PainAD/vet euthanasia) dilutes India-clinic focus | **Keep, trim verticals** |
| Landing · SixYearGrass | Fear/stakes closer | Strong, sourced (NCDRC/IJME). Duplicated verbatim on /hospitals | **Keep** (dedupe) |
| Landing · HospitalsBand | Route hospitals | Good | **Keep** |
| Landing · PricingTeaser | Price anchor | Fine, but pulls from `INDIA_TIERS` that contradict the pricing page's other models | **Keep, fix data** |
| Landing · FinalCTA | Convert | "Watch the demo" → `#demo` **anchor doesn't exist**; globe-on-India art good | **Rework** |
| Hospitals · (all) | Sell hospital wedge | Best-articulated page on the site; on-strategy, India-true | **Keep — use as the model** |
| Pricing · India tiers | Convert | Solid; ₹999 "unlimited staff" undercuts the hospital per-note story if a hospital lands here | **Keep, reconcile** |
| Pricing · Global/per-seat branch | (legacy) | **Dead but shipped**: per-seat "AI recording seats," Practice/Pro, 5 currencies — contradicts "never per seat" everywhere else | **Cut** |
| Signup · Form | Capture lead | **No Hospital vertical**; **7 country options** on India-only site; defaults to "veterinary" | **Rework** |
| Vertical pages (vet/dental/gp) | SEO + persona landing | Copy is good & India-true, but **compliance-only framing** (audits/inspections/negligence) — the clinical-value wedge is barely sold; blog rails 404 | **Rework** |
| Vet/Dental · blog rails | Internal links | **Link to ROW posts hidden in India-only → "Post not found"** | **Cut/fix now (bug)** |
| Allied-health + 6 disciplines | SEO long-tail | 7 pages of near-duplicate thin content; India-priced but heavy IA for pre-traction; allied FAQ contradicts pricing | **Cut to 1** (or defer) |
| Product modules ×3 | Explain modules | Good UI demos, but **jargon URLs**, **3 names per module**, **orphaned from nav**, vet example on human-health page | **Rework/merge** |
| Product · Policy engine | Compliance story | Only place the compliance-coverage idea appears — but static, not the **self-improving agent** north star | **Rework up** (elevate the agent) |
| Frameworks | Trust/SEO | Foregrounds **44 foreign regulators** to an India audience; muddies country focus | **Rework** (India-first, collapse RoW) |
| Blog index | Content hub | Taxonomy is vet/dental/clinic — **no India/hospital/compliance lens**; positioned as forum-answers not thought leadership | **Rework** |
| Article page | Read | **Legacy orange design**, off-system; ROW links dead-end | **Rework** |
| Melamphic | Company/credibility | On-brand, India-true | **Keep** |
| Assets / 404 | Utility | **Legacy Header/Footer** (orange), off-system; /assets not SSR'd | **Rework** |
| Legal ×7 | Compliance | Fine; `/subprocessors` orphaned route | **Keep, fix route** |

---

# (c) Top 10 site-wide problems, ranked

**1. Two identities, one site — no answer to "who is this for, where?"**
The nav/Landing/Hospitals sell an India-first per-note evidence platform; the footer, pricing engine, `/frameworks`, `/start`, the blog and the JSON-LD sell a 6-country, 4-vertical, per-seat Anglo SaaS. A visitor cannot tell which is real. Root cause: `INDIA_ONLY` was bolted on as a **view filter** over a multi-market codebase (`pricing.ts`, `frameworks.ts`, `blogMarkets.mjs`, `entry-server`, `prerender.mjs` all still carry the old world). This is *the* "confused mess."

**2. Pricing is internally contradictory — three models in one file.**
`src/data/pricing.ts` ships **all three simultaneously**: `PRODUCTS` (per-seat Practice/Pro, per-vertical, 5 currencies), `INDIA_TIERS` (per-note ₹999/₹2,999/₹5,999), and `MARKET_PRICING` — a "unified note-pool" model whose own comment says it *"Supersedes the seat-based PRODUCTS… and INDIA_TIERS above once PricingPage is migrated"* but which is **wired into nothing**. Result: the pricing page's live India path says "per note, never per seat," its dead global path sells "AI recording seats," the allied-health FAQ says "Practice 1–3 clinicians, Pro 4–7," and the prerendered crawler meta says "Starter ₹1,000/Clinic ₹3,000/Group ₹6,000" (vs on-page ₹999/₹2,999/₹5,999). No single source of truth.

**3. Prerender/SSR is out of sync with the router — primary pages get 404 bodies baked in.**
`entry-server.tsx`'s route table (used by `snapshot.mjs` to fill `<div id="root">`) is **missing `/hospitals`, `/assets`, `/subprocessors`** — yet `prerender.mjs` generates static HTML for `/hospitals` (a top GTM page) and lists `/subprocessors` in the sitemap. Because `snapshot.mjs` renders those routes through the SSR bundle that lacks them, they fall through to the `*` NotFoundPage → **the static HTML body for `/hospitals` is the 404 page**. Crawlers/AI bots and first paint see "Post not found." The file even carries the comment *"Keep this route table in sync with src/App.tsx."* It isn't. `/subprocessors` has no client route at all → in-app 404 from a sitemap'd URL.

**4. Dead internal links: vertical blog rails point to hidden ROW posts.**
`ArticlePage` reads `VISIBLE_BLOG_CONTENT`, which drops all `ROW` posts under `INDIA_ONLY`. But `VeterinaryPage` links its "From the compliance desk" rail to `cma-vet-deadline`, `rcvs-record-inspection`, `vcnz-records-standard`, `au-vet-board-records` — **all four ROW → all four render "Post not found."** `DentalPage` has 3 of 4 dead the same way (`cqc-dental-2026`, `ahpra-dental-records`, `signed-edits-dental`). The titles were rewritten to India regulators while the slugs/market tags stayed Anglo — a half-finished market swap.

**5. The agentic-compliance north star is essentially absent.**
The differentiator — a self-improving agent that maps captured data to NABH/JCI/etc. and shows covered / needs-one-datapoint / coming-soon / out-of-scope — appears **nowhere** as such. The closest surface is `/products/institutional-compliance-hub`'s static "coverage map" and "58 ready policies," framed as staff attestation. The site sells document sealing + policy checks (today's engine) but never signals the compliance-copilot vision the company is built around.

**6. The clinical-value wedge is under-sold; almost everything leads with fear/compliance.**
Pilot doctors buy on faster/better documentation. Yet Landing, all four verticals, and both closers lead with audits, inspections, NCDRC negligence awards, "the day someone asks 'prove it.'" The time-saved / less-typing / "before you leave the room" benefit exists in body copy but never as the primary hook. For the near-term wedge, the emotional order is backwards.

**7. Information architecture is bloated and orphaned.**
30 page templates for a pre-traction launch: 4 verticals + 6 allied sub-disciplines (near-duplicate thin content) + 3 differently-named product modules + a 56-row frameworks catalog — **none of which are in the primary nav** (nav = 5 links). Users reach 20+ pages only via footer/SEO. Meanwhile there's a Landing template rail promising "Aged care" (PainAD, MAR) with no aged-care page, and `#demo`/`#products` anchor mismatches.

**8. Geography leaks contradict the India-only story.**
`/frameworks` leads with GB/AU/NZ/US/IE chips (44 foreign frameworks); `/start` offers 7 countries incl. Canada; `prerender.mjs` `ORG_SCHEMA`/`SOFTWARE_SCHEMA` (baked into **every** page, incl. India-only) declares *areaServed = Australia, NZ, UK, Ireland, US, India* and describes Salvia as a vet/dental Anglo product citing "RCVS, CQC, GDC, AHPRA, VCNZ." Google and AI engines are being told the opposite of what users see.

**9. Design-system is only ~85% migrated.**
Grass (green `#48CD5F`, Archivo, white/hairline) is clean and consistent on ~25 pages — but `ArticlePage` renders in the **legacy orange** (`--salvia-accent #FF4E00`), and `/assets` + `/404` still use the legacy `Header`/`Footer`. (Also worth noting: `grass.css` is **one font — Archivo**; the "Archivo + Instrument Serif" in the brief is not what shipped — Instrument Serif is unused.) 23 orphaned legacy components (~5,200 LOC) remain in the tree.

**10. Vertical/example cross-contamination and vague AI-slop patches.**
`/products/point-of-care-evidence` demos a **Labrador euthanasia** case under human-health SEO (NMC/DCI). The Landing template list mixes vet/dental/aged-care into one India-clinic story. Copy is mostly strong, but several headlines are interchangeable filler ("Records that can't be argued with," "Records that survive any inspection," "Audit-ready records, from day one" repeated across pages), and "Made in Malabar, for the world" sits under a "Made in India / first market India" story — aspiration and focus fighting each other.

---

# (d) What's worth keeping (reuse, don't nuke)

- **The grass design system** (`src/styles/grass.css`) — white canvas, one accent green `#48CD5F`, Archivo, hairline rules, `.g-*` primitives (`g-h1/2/3`, `g-btn`, `g-facts`, `g-card`, `g-tpl`, `g-price`, `g-showcase`, `g-ui--panel`). Genuinely clean, modern, coherent. Keep as the foundation.
- **The `/hospitals` page** — the clearest articulation of the whole strategy ("Your HMIS runs the hospital. Salvia defends it." / "That gap is the product."). Use its structure as the template for the rest of the site.
- **The drawn product UIs** — `RegisterShowcase`, the form-builder panel, policy-check rows, PDF SHA-256 card, per-vertical consult panels, the coverage-map panel. Screenshot-fidelity, product-true, no stock art. High reuse value.
- **The sourced stats + "six-year test"** — real NCDRC/IJME/BMC citations with links; the negligence/records narrative is credible and India-specific. Keep the substance (rebalance where it leads).
- **Landing §3–§7** (form builder → policy engine → templates → registers → PDF) — concrete, honest product depth pulled from the real codebase.
- **`MelamphicPage`** — on-brand mission/vision/team, India-consistent, real founders + LinkedIn.
- **The SSG + SEO plumbing** (per-route meta, JSON-LD, FAQPage schema, sitemap generation, blog market-gating) — the *mechanism* is solid; it just needs its data (frameworks, pricing, org schema, blog markets, entry-server routes) collapsed to the India-only truth.
- **The honest-scope pattern** ("What it does — and what it doesn't / Salvia won't…") — trust-building, keep it.
- **`SignupPage` mechanics** — honeypot + speed-trap + optional Turnstile, PostHog identify/track, clean form UX. Keep; just fix vertical/country options.

---

## One-line diagnosis
The redesign successfully built a beautiful India-first evidence-platform **front end**, but left the multi-country, per-seat, Anglo-vertical **back end** (pricing models, frameworks catalog, blog markets, signup options, SSR routes, structured data) running underneath it — and never surfaced the agentic-compliance vision or the clinical-time wedge. The site isn't badly made; it's **two strategies deep**, and the seams show on every secondary page.
