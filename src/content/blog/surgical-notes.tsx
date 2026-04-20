
export const content = (
  <>
    <p>
      Office-practice oral surgery notes and hospital oral surgery reports are effectively two
      different genres. Hospital medical records committees are trained to review reports
      against general-surgery documentation standards (JCI / Joint Commission, local
      accreditation bodies), and an oral surgery note that reads like a dental chart entry
      gets rejected on the first pass — not because the surgery was wrong, but because the
      document doesn't match the template the reviewer is reading against.
    </p>
    <p>
      Matching that template isn't hard once you know what it looks like. The difficulty is
      that nobody teaches it during dental school and most oral surgeons learn it through
      rejection.
    </p>

    <h3>What a hospital operative report must include</h3>
    <p>
      The standard headings across most hospital-accreditation frameworks:
    </p>
    <ul>
      <li><strong>Pre-operative diagnosis</strong> (formal diagnostic phrasing, not "impacted tooth" — "fully impacted mandibular third molar with pericoronitis").</li>
      <li><strong>Post-operative diagnosis</strong> (may match the pre-op; any change documented with reason).</li>
      <li><strong>Procedure performed</strong> (named specifically, with CDT/CPT code where applicable).</li>
      <li><strong>Surgeon, assistant, anaesthetist / anaesthesia provider</strong> (full names, registration numbers).</li>
      <li><strong>Anaesthesia type</strong> (local, IV sedation, GA) and dosage details.</li>
      <li><strong>Indications for surgery</strong> (why this patient, why now).</li>
      <li><strong>Findings</strong> (what was encountered, including any anatomical variation or complication).</li>
      <li><strong>Description of procedure</strong> (step-by-step, in past tense, in clinical language — not narrative prose).</li>
      <li><strong>Specimens sent / not sent</strong> (pathology requisition number if applicable).</li>
      <li><strong>Instrument and sponge count</strong> (for anything involving general anaesthesia or sedation).</li>
      <li><strong>Estimated blood loss.</strong></li>
      <li><strong>Complications</strong> (or "none" explicitly — never omit this header).</li>
      <li><strong>Condition on transfer / discharge</strong>.</li>
      <li><strong>Post-operative plan and instructions.</strong></li>
      <li><strong>Signature and date.</strong></li>
    </ul>
    <p>
      Missing any of these is the most common rejection reason. Not because the surgeon forgot
      what they did — because the report's structure didn't surface the required field, so the
      reviewer flagged absence.
    </p>

    <h3>The writing style hospital reviewers expect</h3>
    <p>
      Hospital reports are written in a specific register: past-tense procedural, passive voice
      acceptable, clinical terminology throughout. Compare:
    </p>
    <blockquote>
      <strong>Office chart style (rejected):</strong> "Took out #32, roots came out cleanly,
      no problems, patient doing fine."
      <br/><br/>
      <strong>Hospital report style (accepted):</strong> "Following adequate local
      anaesthesia with 1.8 mL 2% lidocaine with 1:100,000 epinephrine, a mucoperiosteal flap
      was elevated in the right mandibular third molar region. Buccal bone was removed with a
      surgical bur under copious irrigation. Tooth #32 was sectioned and delivered in two
      pieces. The socket was irrigated with sterile saline. Hemostasis was achieved. The flap
      was approximated and closed with 4-0 chromic gut in a figure-of-eight pattern.
      Estimated blood loss: minimal. Patient tolerated the procedure well."
    </blockquote>
    <p>
      Same procedure. The second version is what hospital records committees are trained to
      read. It's not "fancier" — it's structured, specific, and reviewable against the
      procedure-note standard.
    </p>

    <h3>The single most common rejection: missing counts and EBL</h3>
    <p>
      Even when everything else is present, hospital committees reject reports that omit
      instrument/sponge counts and estimated blood loss. These feel vestigial for most oral
      surgery — EBL on a single extraction is trivially "minimal" — but the report has to say
      so explicitly. "Minimal" is an acceptable EBL entry. A blank field is not.
    </p>

    <h3>The hospital-specific fields that surprise office-based surgeons</h3>
    <p>
      Beyond the structure, hospital reports require fields that private practice typically
      skips:
    </p>
    <ul>
      <li><strong>ASA physical status classification</strong> of the patient at time of surgery.</li>
      <li><strong>Pre-op and post-op vital signs</strong>, documented by nursing or anaesthesia.</li>
      <li><strong>Time out / surgical safety checklist completion</strong> (this is WHO safe-surgery checklist derived and is effectively universal in hospital settings).</li>
      <li><strong>Informed consent form reference number / location</strong> — the report should reference the signed consent, not reproduce it.</li>
    </ul>

    <h3>Building the template that gets accepted</h3>
    <p>
      Two practical things that help most:
    </p>
    <ul>
      <li>Get your hospital's medical records committee to share their rejection criteria in writing. Every hospital has a checklist; most will share it if asked.</li>
      <li>Use their template, not your office template. Even if it looks verbose and redundant, the headings signal compliance to the reviewer and get through committee review without friction.</li>
    </ul>
    <p>
      This is an area where a form-driven documentation workflow genuinely shortens the
      operating-to-final-report loop. Salvia's form engine can hold a hospital-specific
      operative report template with all the required headings, captured via voice during or
      immediately after the procedure. The surgeon dictates once — steps, findings,
      complications, EBL, counts — and the form populates each structured field with the
      linked audio as evidence. The report that gets submitted to the hospital committee is
      structurally compliant by default, because the template enforced the structure. The
      alternative — dictating into a free-text box and hoping you hit every required heading
      — is the workflow that generates rejections.
    </p>
    <p>
      For the specific report that just got rejected: ask the records committee which fields
      they flagged, rewrite with their template, and resubmit. Future reports — use their
      template from the start.
    </p>
  </>
);
