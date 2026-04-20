
export const content = (
  <>
    <p>
      Don't overwrite the signed note. That's the single most important thing, and it's the
      mistake that turns what would have been a clean correction into a serious compliance
      problem. Overwriting a signed note with corrected billing codes — especially a higher
      one — is how a CDT miscode becomes an allegation of retroactive upcoding, and how a
      dental office ends up in front of an insurance special-investigations unit.
    </p>
    <p>
      The clean fix exists, and it takes about two minutes.
    </p>

    <h3>Why overwriting is the wrong move</h3>
    <p>
      Every certified PMS audit-trails signed-note edits with who, when, and what changed.
      When a billing code changes after claim submission, insurers can pull that audit log.
      A silent edit from D2391 to D2740, with no corresponding clinical-note update, looks
      exactly like fraud — even when it was just a typo. The investigator doesn't see the
      typo; they see the edit and the higher reimbursement.
    </p>
    <p>
      The defence that's hard to mount: "I meant to bill D2391 all along and just clicked the
      wrong thing." The defence that's easy to mount: "I made a billing-code error, I caught
      it, I documented the correction in an addendum with the reason, and I re-submitted the
      claim with the corrected code."
    </p>

    <h3>The right workflow</h3>
    <p>
      Four steps, in this order:
    </p>
    <ul>
      <li><strong>Leave the signed note alone.</strong> Don't edit the procedure, don't edit the code, don't touch the existing content.</li>
      <li><strong>Create an addendum.</strong> Every PMS has this; if yours doesn't expose it clearly, ask your vendor — it's there. The addendum is a timestamped, separately-signed entry attached to the original note.</li>
      <li><strong>Write the correction explicitly.</strong> "Addendum to note of [date]: billing code originally entered as D2740 in error; procedure performed was a composite restoration (D2391) as documented in the clinical narrative. Claim to be re-submitted with corrected code." Be boring. The less editorial the better.</li>
      <li><strong>Reverse the original claim and re-submit.</strong> If the original claim has already been paid, you may need to refund the payer before re-submitting. This is unpleasant but it's the only clean path.</li>
    </ul>

    <h3>When the claim is already paid at the wrong rate</h3>
    <p>
      If the miscode was upward (you billed higher than what you did), refund the difference
      proactively. Do not wait for the insurer to catch it on audit. A proactive refund with
      an addendum is routine administrative hygiene. A refund demanded by the insurer after
      they've spotted the discrepancy is the beginning of a recoupment investigation.
    </p>
    <p>
      If the miscode was downward (you billed lower than what you did), you can submit a
      corrected claim with the addendum as supporting documentation. Whether you actually
      recover the difference depends on the insurer's claim-correction window, but even if
      you can't recover, the addendum makes sure the chart matches the procedure — which is
      what matters for any future audit.
    </p>

    <h3>What to put in the addendum, specifically</h3>
    <p>
      The addendum should read like an incident log, not an apology:
    </p>
    <ul>
      <li>Date of original note and date of addendum.</li>
      <li>The specific error ("procedure code incorrectly entered as X, should have been Y").</li>
      <li>The corroborating clinical evidence from the original note (so a reader doesn't have to cross-reference).</li>
      <li>The corrective action taken (claim corrected / refund issued / resubmission date).</li>
      <li>Your signature and timestamp.</li>
    </ul>
    <p>
      A good addendum reads as: "I noticed, I fixed, here's the paper trail." An insurance
      investigator reading it should immediately lose interest.
    </p>

    <h3>Where versioning matters</h3>
    <p>
      This whole class of problem exists because most PMS systems treat the note as mutable
      and the audit trail as a hidden log. The right structure is the opposite: the signed
      note is immutable, corrections are first-class addenda, and the version history is
      visible and exportable. Salvia's Audit Pack bundles the original signed note, every
      addendum, and the full version history into one archive per encounter, with a hash over
      the bundle. If an insurer or regulator ever asks "show me the complete history of this
      note," the answer is one file. That's the shape of a correction workflow that doesn't
      create its own liability.
    </p>
    <p>
      Billing typos are inevitable. Billing-typo investigations are not.
    </p>
  </>
);
