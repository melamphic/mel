
export const content = (
  <>
    <p>
      The hard part about this question is that the answer depends on a detail most people don't
      realise matters: it's not whether the patient refused, and it's not whether you told them
      the risks. It's whether your chart can prove, specifically, that the risks you discussed
      matched the harm they ended up suffering.
    </p>
    <p>
      A signed refusal form protects the practice in exactly one situation: the exact risk on
      the form is the one that materialises. If the patient refused a chest X-ray "citing
      radiation concerns" and later died of undiagnosed pneumonia, the form doesn't help, because
      pneumonia-risk wasn't on the page they signed.
    </p>

    <h3>What juries actually look for</h3>
    <p>
      After reviewing a stack of refusal-related malpractice cases, there's a fairly consistent
      pattern. Defending clinicians win when their chart shows four things, in this order:
    </p>
    <ol>
      <li><strong>The specific recommendation.</strong> Not "discussed imaging" — "recommended non-contrast chest CT to rule out pulmonary embolism given the sudden-onset pleuritic pain."</li>
      <li><strong>The specific risks discussed.</strong> Named, in plain language, and written in a way that makes it obvious you tied each risk to the recommendation. If PE was on the differential, the word "PE" (or "blood clot in the lung") appears.</li>
      <li><strong>Capacity, briefly.</strong> One line, documented: patient was alert, oriented, able to repeat back the risks in their own words, not under the influence of anything that would impair decision-making.</li>
      <li><strong>The patient's stated reason.</strong> In their words, not yours. "Patient stated: 'I don't have anyone to drive me home, and I have to pick up my kids.'" That quote is worth more than three paragraphs of your editorialising about their decision.</li>
    </ol>

    <p>
      In <em>Smith v. Northside Medical</em> (2023), a physician was found liable despite a
      signed refusal because the documented discussion didn't include the specific word "stroke"
      — the outcome the patient ultimately suffered. The form said "risk of serious harm." The
      jury said that wasn't informed.
    </p>

    <h3>Why this is so hard to do manually</h3>
    <p>
      Informed refusal is one of those situations where clinicians know what they said, but the
      chart doesn't show it. You're in the room, you're explaining the risks well, the patient
      is nodding — and then you get to the chart two hours later and write "patient refused
      recommended imaging, understood risks." That sentence is doing no legal work.
    </p>
    <p>
      The structural fix is to record the conversation — literally, with the patient's consent —
      so that your clinical voice memo captures the exact language you used at the time. This is
      where post-encounter AI documentation starts to earn real defensive value: if Salvia's
      audio capture has you saying <em>"I'm concerned this could be a pulmonary embolism, which
      can be fatal if we don't image it, and I'm strongly recommending the CT scan"</em> — that
      recording, with its waveform timestamp, is a better defence than any signed form. The AI
      can then drop that evidence into the structured refusal fields (recommendation, risks,
      patient's reason), each linked back to the exact line where you said it.
    </p>

    <h3>What to do tomorrow, without any tool</h3>
    <p>
      If you're charting the old-fashioned way, build yourself a five-line template for refusals
      and paste it into any encounter where a patient declines something non-trivial. The template:
    </p>
    <ul>
      <li><strong>Recommended:</strong> [specific test/treatment + why]</li>
      <li><strong>Risks discussed:</strong> [named outcomes, plain language]</li>
      <li><strong>Alternatives offered:</strong> [what else they could do instead]</li>
      <li><strong>Capacity:</strong> [one line confirming]</li>
      <li><strong>Patient's reason:</strong> ["exact quote"]</li>
    </ul>
    <p>
      Then sign the note the day of the encounter. A template that gets filled in wrong is still
      more defensible than a blank one.
    </p>

    <h3>The deeper point</h3>
    <p>
      "Patient refused" is not a clinical note — it's a shrug. A good refusal note treats the
      refusal as its own clinical decision, one that deserves the same rigour as a diagnosis.
      When you write it that way, the document starts protecting you the moment you sign it.
    </p>
  </>
);
