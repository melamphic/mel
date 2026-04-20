
export const content = (
  <>
    <p>
      If the board has given you a month's notice, that's actually more generous than it sounds
      — most of what they pull is visible in the first five records they look at, and you can
      fix 80% of it in a week. The trap is spending the month polishing your policies document
      while the actual records stay the way they were.
    </p>
    <p>
      A former state-board inspector, who has since moved into consulting, walked through her
      real workflow. It's less intimidating than you'd think.
    </p>

    <h3>What gets pulled first</h3>
    <p>
      Inspectors don't audit randomly. They look for patterns that flag concern. The top five
      categories in her pull list:
    </p>
    <ul>
      <li><strong>Controlled drug dispensing records.</strong> Always. Mismatches between the drug log, the chart entry, and the PMS inventory are the fastest way to escalate from "audit" to "investigation."</li>
      <li><strong>Anaesthetic records with complications.</strong> If your PMS has an "anaesthetic complication" code, every record with that code gets pulled.</li>
      <li><strong>Euthanasia records.</strong> Consent, drug, route, time, witness — all required, all audited.</li>
      <li><strong>Any record involving a client complaint in the past 24 months.</strong> She cross-references the board's complaint database to the PMS.</li>
      <li><strong>A random sample of "routine" records.</strong> 20 or so, pulled to establish your baseline — TPR, weight, exam, plan.</li>
    </ul>

    <h3>What she looks for in the first 10 seconds</h3>
    <p>
      Before reading a single sentence, she's assessing:
    </p>
    <ul>
      <li>Is the patient identifier complete on the note itself (not on a separate screen)?</li>
      <li>Is the weight current and unitised?</li>
      <li>Is the TPR present with units?</li>
      <li>Is the plan actionable — drug, dose, route, duration — or just "Rx'd"?</li>
      <li>Is there a visible signature with a timestamp within a reasonable window of the visit?</li>
    </ul>
    <p>
      Records that fail at this stage get flagged before the inspector has even read the
      assessment. That's the category of citation worth pre-empting, because it's almost
      entirely about structure, not clinical quality.
    </p>

    <h3>What she looks for on a deeper read</h3>
    <p>
      For records that pass the first pass, the deeper review asks:
    </p>
    <ul>
      <li><strong>Does the plan follow from the assessment?</strong> If the assessment is "likely dietary GI upset" and the plan is full bloodwork + imaging + antibiotics + hospitalisation, something doesn't line up. Either the assessment underestimates the clinical picture, or the plan is over-treating — and both look bad.</li>
      <li><strong>Is the consent documented specifically?</strong> "Owner consented to surgery" is not enough. "Owner consented to dental with possible extraction of 108, 208 pending intraoral radiographs; cost estimate $X provided and accepted" is.</li>
      <li><strong>Is the recheck/follow-up loop closed?</strong> If you said "recheck in 10 days," is there a record of the recheck, or a record of the owner declining it? A plan with no closure reads as abandoned care.</li>
      <li><strong>Are the drug doses right?</strong> Inspectors absolutely do check doses against the weight. A dose that's 20% too high gets noticed.</li>
    </ul>

    <h3>What to do in the next month</h3>
    <p>
      Don't rewrite old records — that's evidence-tampering territory. Instead, focus on:
    </p>
    <ul>
      <li>Pull your own random sample of 20 records from the past 6 months. Score them against the first-pass checklist above. Whatever the pattern of failures is, that's your training target for the team between now and the audit.</li>
      <li>Clean up your drug log. Reconcile it against the PMS for the past 12 months. If there are discrepancies, address them via a contemporaneous note <em>now</em>, not by quietly editing the log.</li>
      <li>Check that every staff member who signs records has current registration numbers in the PMS, and that locums have signed everything they worked on.</li>
      <li>Make sure every euthanasia and every controlled-drug administration has a witness signature.</li>
    </ul>

    <h3>The workflow change that pays off</h3>
    <p>
      If the audit reveals patterns — missing TPRs, vague plans, weight-unit omissions — the
      structural fix is to move the fields into the form, not the prose. A template that
      requires TPR, weight, and structured plan fields before saving eliminates the category
      of error that inspectors cite most often. Salvia's form engine enforces this at the
      schema level: required fields can't be silently skipped, and the AI that fills fields
      from your voice note flags missing vitals instead of fabricating "WNL." If the pattern
      of citations you're getting is structural rather than clinical, that's the kind of tool
      change that eliminates the category rather than fixing one record at a time.
    </p>
    <p>
      The practices that get glowing audit reports aren't the ones with the best clinical
      reasoning — they're the ones whose records show clinical reasoning consistently, visibly,
      and in the places the inspector is already looking.
    </p>
  </>
);
