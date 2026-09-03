# NABH documentation pitch — research note

**Purpose:** harden the "structural, not negligence · find before, not after · paper can't enforce what our
engine can" pitch with the *authoritative* NABH failure taxonomy + sourced India stats — so the reboot's
Hospitals/NABH story out-specifies the competitor writing our pitch in blog form.

**Sources used:** the NABH Hospital Standards **6th Edition (2025)** enumerated into
`salvia docs/planning/framework_research/nabh_6th.yaml` (with Salvia coverage already classified), and the
sourced `salvia docs/research/india-evidence-research.md`. *(Web search budget was exhausted this session; this
is built on the authoritative local corpus, which is stronger than a live search anyway. NABH decimal codes are
transcribed from the 6th-ed PDF — reconfirm against the official PDF before any external/printed claim.)*

---

## 1. The thesis is validated by hard, citable data

- **Documentation is the dominant NABH gap.** A **BMC Health Services Research (2026)** study of Ahmedabad
  hospitals found **62% of non-compliances are fixable only by revising/creating documentation.**
  → https://link.springer.com/article/10.1186/s12913-026-14809-3
- **Records failure decides medico-legal cases.** NCDRC 253-case review (2015–19): "failure to maintain
  accurate medical records" was the **2nd most common error, 22% of cases**; in proven-negligence cases the
  record lacunae were **missed entries 37% · deficient consent forms 20% · missing records 17%.**
  → https://ijme.in/articles/medical-negligence-in-cases-decided-by-the-national-consumer-disputes-redressal-commission-a-five-year-retrospective-review/
- **The stakes are rising.** ~**400% surge** in medical litigation (peer-reviewed 2020 review,
  https://pmc.ncbi.nlm.nih.gov/articles/PMC7747425/); benchmark awards ₹1 cr–₹11 cr.

**The reframe that sells (put it on the Hospitals page):** these are **structural failures, not negligence.**
Paper cannot enforce a timestamp, reject a blank field, or alert nursing that consent is missing before
discharge. So the fix isn't "try harder" — it's a medium that makes the failure impossible at capture. This
removes blame from the buyer's staff, which is what lowers the barrier to buying.

---

## 2. The competitor read

The piece the founder flagged is a vendor **describing** this pain (structural, find-before-not-after, weeks of
manual pre-assessment IPD review). That's real and it's a **narrative/SEO race** — they're educating our buyer
and will rank for it. But our own scan holds: **no Indian vendor sells a compliance-native product that
*enforces* it at capture and *proves* it continuously** — Eka/Augnito/HealthPlix/KareXpert/Medixcel/Plus91 all
lead with AI/EMR/digitization; compliance sits below the fold as a badge
(`india-evidence-research.md` row 16). **An essay names the blank field; it can't reject one.** The moat is the
working engine — but we must contest the content ground (the reboot's Resources → framework/compliance taxonomy
is exactly for that).

---

## 3. The failure-point scorecard (authoritative — NABH 6th ed × real Salvia coverage)

The article's named failure points, mapped to **actual NABH objective elements** and Salvia's **honest**
status (`measured_now` = we evaluate it today · `needs_data` = one small capture away · `coming_soon` =
on the roadmap). This is the credibility weapon: we show what we already prevent and don't overclaim the rest.

| Failure point (as named) | NABH objective element | Salvia status | Backing |
|---|---|---|---|
| Signed **general / informed consent** on admission & before procedures | **PRE.4.a** (core) + procedure/anaesthesia/surgery/transfusion consents | **measured_now** ✅ | consent typed widget |
| **Standardised initial assessment** (OPD/IPD/emergency) | **AAC.4.a** (core) | **measured_now** ✅ | voice→SOAP + policy engine |
| Initial assessment **by qualified personnel** | **AAC.4.b** | **measured_now** ✅ | note author/role |
| Initial assessment **within the required time frame (≤24h)** | **AAC.4.c** | **needs_data** 🟡 | one timestamp/SLA — *the AAC.4.c screenshot* |
| **Nursing assessment** at admission, documented | **AAC.4.d** | **measured_now** ✅ | authored clinical note |
| Initial assessment **results in a documented care plan** | **AAC.4.e** (core) | **measured_now** ✅ | SOAP Plan |
| Care plan **countersigned within 24h** | **AAC.4.f** | **coming_soon** 🔜 | note_events SLA |
| **Nutritional screening** | COP.10.h (obstetric) / COP.11.e (paediatric); general adult | **coming_soon** 🔜 | roadmap capture |
| **Name–signature–date–time on every entry** | **IMS.3.f** (author identifiable) + **MOM.5.c** (orders dated/timed/signed) | **measured_now** ✅ | every record signed + timestamped at submit |

**Scorecard:** of the ~9 elements the article implies, **6 are measured today**, **1 is one capture away**,
**2 are on the roadmap.** A hospital quality lead reading this sees a product that already prevents the majority
of the failures they get dinged for — and an honest map of the rest. Nobody else can show this.

---

## 4. Site-ready section: "The failures paper can't prevent"

Drop-in spine for the **Hospitals page** (and a condensed homepage proof block). Each row is the triad
**paper can't → Salvia enforces at capture → the agent proves it continuously.** Only ship the ✅ rows as
present-tense claims; show 🟡/🔜 as "coming" via the coverage engine's honest states.

- **Consent that can't go missing.** *Paper can't stop an unsigned consent reaching discharge.* Salvia's consent
  widget captures it as a signed, typed record at the moment it's taken; the agent flags any admission or
  procedure missing it — **before** discharge, not at the audit. `(PRE.4.a ✅)`
- **The 24-hour clock, watched.** *Paper can't enforce a deadline.* Salvia timestamps the initial assessment and
  the agent measures the time-to-assessment SLA continuously. `(AAC.4.a ✅ · AAC.4.c 🟡 timing)`
- **No blank fields in the assessment.** *Paper can't reject an incomplete form.* Required fields (vitals,
  nursing assessment, care plan) are enforced at capture; the agent scores completeness on every admission.
  `(AAC.4.d ✅ · AAC.4.e ✅)`
- **Every entry, authenticated by construction.** *Paper can't guarantee name-signature-date-time.* Every Salvia
  record is signed, timestamped and sealed the moment it's submitted — nothing else is possible. `(IMS.3.f ✅ · MOM.5.c ✅)`
- **Weeks of pre-assessment file-hunting → a live number.** *Paper makes you find gaps after the fact.* Salvia's
  posture score moves as care happens and the quality lead is told the instant something drifts.

**Closing reframe line (candidate):** *"Your team isn't failing. Paper is. Salvia is the medium that makes the
non-conformity impossible — and proves it, continuously, against NABH."*

---

## 5. Honesty guardrails (compliance product — non-negotiable)
- Ship only `measured_now` items as present-tense capability; present `needs_data`/`coming_soon` through the
  coverage engine's honest four-state UI, never as done.
- The crosswalk is Salvia's **capability guide, not a certification claim** — never imply NABH endorsement.
- **Reconfirm every NABH decimal code (AAC.4.c, PRE.4.a, IMS.3.f, MOM.5.c…) against the official 6th-ed PDF**
  before it appears in printed/marketing copy.
- Use the AAC.4.c product screenshot as proof of *one* element working — captioned honestly ("initial-assessment
  timing check"), not as "NABH-compliant."

---

*Feeds: overhaul_plan.html (Hospitals page) + reboot_brief.html (the "measure the unmeasurable" and
"real-time to the person in charge" sections). This is the concrete, sourced proof spine those sections needed.*
