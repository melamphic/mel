
export const content = (
  <>
    <p>
      Almost certainly not yet. The instinct to delete deceased-patient records is
      understandable — they feel like clutter, they're emotionally heavy, and the owner is no
      longer coming in. But the retention clock doesn't start ticking on death; in most
      jurisdictions it starts on the date of last contact, and for many records it runs much
      longer than three years.
    </p>
    <p>
      Two numbers do most of the work: <strong>the default retention period in your
      jurisdiction</strong>, and <strong>the longer period that applies if controlled drugs
      were dispensed or the case had any complication</strong>. Get those two right and you're
      almost always fine.
    </p>

    <h3>What the common jurisdictions actually require</h3>
    <p>
      Rough baselines, subject to your state/province specifics:
    </p>
    <ul>
      <li><strong>US (state veterinary practice acts):</strong> Most states require 3–7 years from last visit. Some (California, Texas) require 5. Controlled-drug records under DEA 21 CFR 1304.04 must be retained at least 2 years — and in practice, keep the full chart as long as the CSA record, not separately.</li>
      <li><strong>Australia (state practice acts + AVA guidance):</strong> 7 years is the common floor. For minor patients (owner under 18 at time of treatment), the clock can run until the owner turns 25.</li>
      <li><strong>New Zealand (VCNZ Code of Professional Conduct):</strong> 10 years from date of last treatment is the conservative default.</li>
      <li><strong>UK (RCVS):</strong> Practice Standards Scheme requires a minimum of 2 years but the VMD's Controlled Drugs guidance extends this for CD records, and insurance-claim records are often held 7+.</li>
    </ul>
    <p>
      These are floors, not ceilings. Your PI insurer's policy wording almost certainly
      requires longer retention as a condition of coverage — and that's the number that
      actually matters in a dispute.
    </p>

    <h3>Why "last visit" not "date of death" matters</h3>
    <p>
      A three-year-old death where the animal was last seen five years ago means you've been
      sitting on those records for five years, not three. For a chronic case where the animal
      was seen monthly for the last year of life, the clock effectively starts at the
      euthanasia visit — because that's the last contact.
    </p>
    <p>
      The practical implication: you can't safely prune records based on death date alone.
      You need the last-contact date and the retention floor, and you keep the larger of the
      two durations.
    </p>

    <h3>When the retention clock runs longer</h3>
    <p>
      Several situations extend retention well beyond the default:
    </p>
    <ul>
      <li><strong>Controlled drugs dispensed or administered.</strong> The CD record must survive alongside the clinical record, often 2–5 years beyond the CD audit cycle.</li>
      <li><strong>Any complaint, board notification, or litigation (active or threatened).</strong> The moment you're notified, a legal hold applies. Don't delete anything — even records unrelated to the complaint — until your insurer or attorney signs off.</li>
      <li><strong>Minor owners.</strong> Where the client was a minor during the episode of care, statutes of limitation for malpractice often run until the minor turns 18 or 21, plus additional years.</li>
      <li><strong>Insurance / pet-health-plan claims.</strong> If a claim is pending or was disputed, keep the records until the claim is final and the appeal window has closed.</li>
    </ul>

    <h3>What "deletion" actually means in 2026</h3>
    <p>
      This part trips people up. Deletion isn't just hitting "delete" in the PMS. It has to
      cover:
    </p>
    <ul>
      <li>The PMS record itself.</li>
      <li>Backups (which may be retained longer than the live record by the vendor).</li>
      <li>Any separate imaging / lab / anaesthesia system.</li>
      <li>Any AI-scribe or documentation vendor that retained audio or transcripts as part of the encounter.</li>
    </ul>
    <p>
      If you're about to delete a record, it's worth a single-page deletion checklist that
      names every system where data might live, and who is responsible for each. A deletion
      that doesn't propagate to a backup is not a deletion — it's a record that exists somewhere
      an inspector can find it while you're claiming you don't have it.
    </p>

    <h3>The cleanest posture</h3>
    <p>
      Rather than chasing deletion as a goal, the defensible posture is <em>archive, don't
      delete</em>. Move old records to a cold storage location inside your compliance boundary.
      They're out of your day-to-day, but they're available if a dispute or audit surfaces
      years later. This is the default behaviour of Salvia's Audit Pack model — encounters are
      archived as hashed, signed bundles, per-patient, and retained per your configured
      retention policy. You never lose them; they just move out of the way.
    </p>
    <p>
      In short: don't delete yet. Check your jurisdiction's floor, check your insurer's
      clause, and default to keeping rather than pruning until you're certain. The downside of
      over-retaining is storage. The downside of under-retaining is a malpractice action with
      no record to defend yourself with.
    </p>
  </>
);
