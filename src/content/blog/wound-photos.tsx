
export const content = (
  <>
    <p>
      They want photos — specifically, photos that show them what you're billing for, with
      enough detail that a claim adjuster can verify the diagnosis without having to trust
      you. This isn't new policy exactly; the insurers have been tightening photographic
      requirements for restorative claims over the past two years, and the pattern is now
      consistent enough that you can pre-empt almost every denial with a short shot-list.
    </p>
    <p>
      The frustrating part: the requirements are in the insurer's processor manual, not in
      the patient-facing explainer you get with a denial. So clinicians end up guessing what
      "lack of documentation" means when the actual answer is specific and checkable.
    </p>

    <h3>What the big insurers actually want for a crown claim</h3>
    <p>
      The common denominators across Delta Dental, Cigna, MetLife, and the major Blues:
    </p>
    <ul>
      <li><strong>A pre-op photo of the tooth in question,</strong> showing the existing condition that justifies the crown (fracture, failed restoration, caries into dentin, cuspal coverage need, etc.).</li>
      <li><strong>A diagnostic-quality radiograph</strong> (periapical, not just bitewing) with the date visible.</li>
      <li><strong>A periodontal status note</strong> — pocket depths on the tooth, mobility, and a quick statement that the periodontium supports the restoration.</li>
      <li><strong>A narrative that connects symptoms to clinical findings to the specific code being billed.</strong> Not "crown indicated." Instead: "tooth #14 with fractured MO amalgam, recurrent decay into pulpal third, cuspal coverage required; D2750 indicated."</li>
      <li><strong>For D2750+ (porcelain-fused-to-metal, all-ceramic, etc.), photographic evidence that the clinical need matches the higher code.</strong> Aesthetic codes often need a photo showing a visible tooth; posterior full-coverage codes often need a photo showing the extent of structure loss.</li>
    </ul>

    <h3>The shot-list that stops denials</h3>
    <p>
      Six photos, taken routinely on every restorative case. Less than 90 seconds at the
      chair if your DA is trained:
    </p>
    <ul>
      <li><strong>Pre-op full arch</strong> (shows context and adjacent teeth).</li>
      <li><strong>Pre-op occlusal of the specific tooth</strong> (shows fracture lines, existing restoration, caries).</li>
      <li><strong>Pre-op buccal of the specific tooth</strong> (critical for cervical breakdown or perio issues).</li>
      <li><strong>Pre-op radiograph</strong> (diagnostic-quality, aligned with insurer's preferred type — most want PA).</li>
      <li><strong>Mid-treatment photo after caries removal</strong> (this is the single most persuasive shot for denied claims — it shows how much structure was missing once the existing restoration was removed).</li>
      <li><strong>Post-op photo of the completed restoration</strong>.</li>
    </ul>
    <p>
      When you submit with those six, the processor has everything they need. The denial rate
      drops dramatically because there's nothing left to ask for.
    </p>

    <h3>Why denials happen even when you send photos</h3>
    <p>
      Three common failure modes:
    </p>
    <ul>
      <li><strong>Photos aren't linked to the specific tooth in the claim.</strong> If you submit a 10-photo attachment and don't label which tooth each shows, processors may only skim and not find what they need. Label every image with the tooth number.</li>
      <li><strong>Narratives that use dental jargon without clinical detail.</strong> "Tooth needs crown due to fracture" is not a narrative. The processor needs to see the clinical reasoning the way another dentist would write it.</li>
      <li><strong>Mismatched codes and findings.</strong> If your narrative describes a simple cuspal-coverage case and you billed the all-ceramic code, the claim reads as upcoded even if it wasn't.</li>
    </ul>

    <h3>The audit angle you might not know about</h3>
    <p>
      Insurers increasingly do post-payment audits on restorative procedures. If they audit
      and you don't have the photos in the chart at the time the claim was submitted — even
      if you have them now — they can demand the payment back. Timestamp metadata on your
      intraoral photos matters. If the photo was taken three weeks after the claim was
      submitted, an audit will notice.
    </p>
    <p>
      This is one place where structured documentation pays off quietly. If your photos are
      captured into a patient record that's timestamped, linked to the tooth-level finding,
      and retained with a hash so they can't be silently re-dated later, post-payment audits
      are a non-event. Salvia's dental form engine treats intraoral photos as first-class
      evidence: each image is linked to the specific tooth and finding, timestamped with
      capture metadata, and bundled into the Audit Pack alongside the note and any audio
      commentary. If you need to produce evidence that the photo existed before the claim was
      submitted, the hash and the archive prove it.
    </p>

    <h3>What to do this week</h3>
    <p>
      Pull the last five denied claims. Look at what the insurer actually said — the specific
      line, not just "lack of documentation." Map those reasons against the six-photo list
      above. You'll usually see a pattern: it'll be one or two specific gaps that account for
      most of your denials. Fix those two first. The rest is iteration.
    </p>
  </>
);
