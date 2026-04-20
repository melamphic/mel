
export const content = (
  <>
    <p>
      Paper isn't the problem. Paper is legal in almost every dental jurisdiction, and plenty
      of defensible practices still use it. The problem is <em>how</em> paper interacts with
      the rest of a modern practice — the imaging that's digital, the lab that's digital, the
      insurance claims that are digital, the patient communications that are digital. A paper
      chart that can't be cross-referenced with any of those is where the real exposure sits.
    </p>
    <p>
      The question worth asking isn't "should we digitise?" It's "where specifically is paper
      failing us, and can we fix those seams without abandoning what paper does well?"
    </p>

    <h3>What paper still does well</h3>
    <p>
      A paper chart, well kept, has real advantages. It can't be hacked in a ransomware
      attack. It survives a power outage. It doesn't force you into a vendor lock-in with an
      unpleasant PMS. Inspectors can read it without needing your login. The record is
      physically present in one place, which some compliance frameworks actually prefer.
    </p>
    <p>
      If your paper charts are legible, consistently filed, indexed, and retained, you're not
      obviously worse off than a mediocre digital practice. The catastrophic failure modes of
      paper are all about specific seams.
    </p>

    <h3>Where paper actually exposes you</h3>
    <p>
      The four real risks, in descending order:
    </p>
    <ul>
      <li><strong>Legibility.</strong> An illegible chart is almost indefensible. If a plaintiff's expert can't read your handwriting, they'll argue nobody could — including the colleague covering you during an emergency. The standard isn't "can a sympathetic person read it." It's "can a juror."</li>
      <li><strong>Loss and damage.</strong> Paper charts get misfiled, destroyed in floods, left behind when a practice moves. A record that doesn't exist is a record you can't defend yourself with. Boards typically require retention in a form that survives common disasters — paper alone usually doesn't meet that without a scan backup.</li>
      <li><strong>Cross-referencing gaps.</strong> Your paper chart says "see radiograph dated 04/12." The radiograph is in a digital imaging system. If the radiograph isn't labelled correctly or the chart note doesn't reference the specific image, the linkage can break. In a malpractice case, the paper chart and the digital imaging don't form a single coherent record.</li>
      <li><strong>Addendum ambiguity.</strong> A paper chart with ink of a different colour next to a line — or a margin note — is not a clean addendum. It looks like a later edit, and it's hard to prove otherwise without a timestamping mechanism.</li>
    </ul>

    <h3>The insurance audit angle</h3>
    <p>
      Dental insurers running post-payment audits increasingly ask for specific evidence
      alongside claims — intraoral photos, perio charting in a structured format, digital
      radiographs. A paper-only practice either can't provide these in the form the insurer
      wants, or has to scan and assemble them case by case. That's not strictly a compliance
      failure, but it costs real money in denied claims and slow appeals.
    </p>

    <h3>The lowest-cost digitisation path</h3>
    <p>
      If you want to de-risk paper without committing to a full PMS, the minimum intervention
      that pays off:
    </p>
    <ul>
      <li><strong>Scan the chart at the end of each day.</strong> A simple batch-scanner + a cloud backup with a retention policy. This alone addresses the loss-and-damage risk and gives you something that survives a fire.</li>
      <li><strong>Use a digital imaging system that's properly labelled.</strong> Every radiograph tagged with patient name, date, tooth number. The paper chart can reference these by image ID.</li>
      <li><strong>Capture intraoral photos routinely.</strong> As above — this is increasingly the evidentiary backbone for insurance claims and malpractice defence alike.</li>
      <li><strong>Structured periodontal charting.</strong> Even if the rest of the note stays on paper, perio-charting is one area where the structured digital form is so much stronger defensively that it's worth breaking the paper-only habit.</li>
    </ul>

    <h3>When to actually migrate to a PMS</h3>
    <p>
      The real tipping point is when your practice volume or case complexity exceeds what paper
      can cross-reference reliably. That varies — a two-operator practice with a stable patient
      base can run paper well. A five-operator practice with high restorative volume and
      insurance complexity almost certainly can't.
    </p>
    <p>
      If you do migrate, the workflow pattern that's emerged for modern dental is: digital
      charting for the clinical record, imaging system for radiographs and intraoral photos,
      and a documentation layer — like Salvia — that captures the clinician's voice during the
      encounter and fills the structured fields with linked audio evidence. That combination
      produces a record that's legible, cross-referenced, version-controlled, and
      audit-ready, without the clinician typing more than they do on paper.
    </p>

    <h3>The honest answer to the question</h3>
    <p>
      Paper isn't a malpractice suit waiting to happen. Poorly-kept paper is. Legible,
      consistently filed, well-backed-up paper survives audits and defends cases. But the
      trend is clear: the evidentiary standard is rising, and the easiest way to meet it is
      structured, timestamped, linkable records. If you're having this conversation at all,
      the answer is probably to start the transition — not out of panic, but because the cost
      of staying purely on paper keeps going up while the cost of digitisation keeps going
      down.
    </p>
  </>
);
