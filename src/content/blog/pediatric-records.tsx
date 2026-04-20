
export const content = (
  <>
    <p>
      This is one of the most confusing areas of medical records law because the answer is
      genuinely different in almost every US state, and different again depending on what the
      15-year-old came in for. There's no single right answer — but there's a reasonably clean
      decision tree you can hold in your head.
    </p>

    <h3>Start with the category of care</h3>
    <p>
      Most states grant minors the right to consent — and the right to confidentiality — for a
      specific list of sensitive services, typically:
    </p>
    <ul>
      <li>Reproductive health (contraception, pregnancy, STI testing/treatment).</li>
      <li>Mental health care (outpatient, usually with an age floor like 12 or 14).</li>
      <li>Substance use treatment.</li>
      <li>Care for sexual assault.</li>
    </ul>
    <p>
      If the visit falls into one of those categories, your state almost certainly gives the
      minor sole control over the record for that episode of care. Parent does not get portal
      access, insurance EOBs may need to be suppressed, and the minor's consent is the legal
      consent — not the parent's.
    </p>
    <p>
      For anything <em>outside</em> that list (say, a sports injury or a rash), parental
      consent and access usually apply, unless the minor is legally emancipated or meets your
      state's "mature minor" standard.
    </p>

    <h3>The EMR portal problem</h3>
    <p>
      Here's what trips up more practices than actual consent law: your EMR's patient portal
      was almost certainly not designed with minor-confidentiality segmentation in mind. In
      many systems, once a parent has proxy access, they see everything — labs, diagnoses,
      visit notes, billing — regardless of whether the visit was for a category the minor has
      sole-consent rights over.
    </p>
    <p>
      This is a real compliance risk. A common failure pattern:
    </p>
    <ul>
      <li>15yo comes in for an STI screen. Consents as the sole decision-maker under state law.</li>
      <li>You chart the visit accurately. The lab result gets filed to the chart.</li>
      <li>Parent, who has proxy portal access for billing purposes, receives a notification or EOB showing the lab. Confidentiality is broken.</li>
    </ul>
    <p>
      The minor trusted your practice. Your EMR undid that trust without you doing anything
      wrong individually. The regulators don't care about the distinction.
    </p>

    <h3>What to put in the chart</h3>
    <p>
      For a sensitive-service visit with a minor:
    </p>
    <ul>
      <li><strong>Document capacity explicitly.</strong> "Patient presented alone, demonstrated understanding of the risks and benefits of [test/treatment], able to articulate reasons for seeking care. Consent obtained from patient per [state statute / practice policy for sensitive services]."</li>
      <li><strong>Document confidentiality discussion.</strong> One line: "Discussed that this visit is confidential; patient asked specifically that parents not be informed."</li>
      <li><strong>Flag the chart.</strong> If your EMR has a confidentiality / break-the-glass flag for this episode, apply it, and document that you applied it.</li>
      <li><strong>Know what auto-routes.</strong> Before the visit ends, confirm with your billing and front-desk that nothing about this visit — ICD code, CPT code, EOB — is going to auto-route to the parent's address or the shared portal.</li>
    </ul>

    <h3>When there is no good answer</h3>
    <p>
      Sometimes the tension is unresolvable. The patient asks for confidentiality, but you
      have reason to believe parental involvement is in their best interest (safety concerns,
      severe mental illness). State laws almost all carve out a safety exception that lets you
      disclose to parents when there is risk of serious harm. Use it sparingly and document
      the specific reason — "patient disclosed suicidal ideation with plan; parental
      involvement deemed necessary for safety" — not just "told mom."
    </p>

    <h3>Where structured forms earn their keep</h3>
    <p>
      This is an area where free-typing into an EMR note is genuinely dangerous, because the
      fields that matter (capacity, consent basis, confidentiality flag) are easy to forget
      when you're rushed. A visit-type-specific form that requires the clinician to
      affirmatively select the consent basis and confidentiality status — rather than leaving
      it to prose — eliminates the most common failure mode. That's exactly the kind of
      schema-level enforcement that tools like Salvia are built for: the fields can't be left
      ambiguous, and the audit trail shows that the clinician considered them on the day of
      the encounter, not reconstructed it later.
    </p>
    <p>
      And when in doubt on the specific state law — ask your compliance officer or a family-
      law attorney before the visit, not after. The minor-consent statutes are available, they
      just aren't memorable. No one expects you to hold 50 of them in your head.
    </p>
  </>
);
