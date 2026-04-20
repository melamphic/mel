
export const content = (
  <>
    <p>
      The short answer is: probably more than you want to, and the trend is only going one way.
      Under the 21st Century Cures Act and the ONC information-blocking rule, patients in the US
      already have a right to most of their electronic health information on request — and
      several state courts have been interpreting "electronic health information" to include
      audit trail metadata when relevant to a dispute.
    </p>
    <p>
      What changes is whether you hand it over casually (as a goodwill gesture) or whether it's
      produced under subpoena during discovery. The answer depends on what's actually in your
      audit trail — and most clinicians have never looked.
    </p>

    <h3>What an EMR audit trail actually contains</h3>
    <p>
      Every modern certified EHR records, per-note:
    </p>
    <ul>
      <li>Who created, viewed, edited, or exported the record, and when (down to the second).</li>
      <li>Every field that was changed, including the pre-edit and post-edit values.</li>
      <li>Who signed, re-signed, or addended the note, and at what time relative to the encounter.</li>
      <li>Whether a template was applied, copy-pasted blocks were inserted, or autofill was used.</li>
    </ul>
    <p>
      The uncomfortable part: your EMR has been quietly collecting this since the day you turned
      it on. A patient asking for "every change made to my chart" is not asking for something
      exotic — they're asking the EHR to export something it already has.
    </p>

    <h3>What patients can actually demand</h3>
    <p>
      In the US:
    </p>
    <ul>
      <li><strong>The note content itself.</strong> Patients have a right to this under HIPAA's Privacy Rule and an accelerated right under the Cures Act / Open Notes.</li>
      <li><strong>An accounting of disclosures.</strong> Under 45 CFR 164.528, patients can request who their PHI was disclosed to.</li>
      <li><strong>The audit log.</strong> This is the grey area. HIPAA doesn't automatically compel its release to patients, but in litigation, plaintiff's counsel will subpoena it — and increasingly, judges are granting that subpoena without much resistance.</li>
    </ul>

    <h3>Where this gets painful</h3>
    <p>
      The audit trail is often the first place a note stops being defensible. A common pattern
      in malpractice depositions:
    </p>
    <ul>
      <li>The note is dated the day of the encounter.</li>
      <li>The signature timestamp is three days later, at 11:47pm.</li>
      <li>The audit trail shows seven edits between the original save and the signature.</li>
      <li>Two of those edits changed the assessment section <em>after</em> the patient's second visit — suggesting the original assessment was revised in hindsight.</li>
    </ul>
    <p>
      None of that is necessarily malpractice. All of it is going to be shown to a jury.
    </p>

    <h3>The defensible posture</h3>
    <p>
      Stop treating the audit trail as hidden plumbing. Work as though it's going to be read out
      loud. In practice, that means:
    </p>
    <ul>
      <li>Sign notes within the shift, or at least the same day. Every 12-hour gap between visit and signature is a question you'll have to answer.</li>
      <li>Use the formal addendum mechanism for late edits, not the "edit signed note" button. An addendum reads as "I added more information"; an edit reads as "I changed my story."</li>
      <li>If you ever correct a significant clinical finding, put the reason in the addendum. "Reviewed lab from 15:30 showing WBC 18.2 — updating assessment to include possible infection" reads very differently from a silent edit.</li>
    </ul>
    <p>
      This is one area where modern, evidence-traced documentation platforms genuinely help.
      Salvia's audit trail is bundled into the same exportable Audit Pack as the note itself —
      so when a patient (or a plaintiff's attorney) asks for "everything," you produce one file
      with audio, transcript, note, and full edit history. Same day. Same hash. Nothing
      scattered, nothing hidden. When the record is that clean, transparency stops being a
      threat.
    </p>
  </>
);
