
export const content = (
  <>
    <p>
      Cloning a normal-exam block is legal. The issue is never the template itself — it's the
      pattern that emerges when a board auditor pulls ten of your records and sees the same
      paragraph, word for word, across ten different animals, on ten different days, with ten
      different presenting complaints. That's the moment "template" stops meaning "efficient"
      and starts meaning "fabricated."
    </p>
    <p>
      Most boards (AVMA member boards, the VMR, state veterinary boards in AU/NZ) use some
      version of the same test: does the record show that <em>this specific animal</em> was
      examined on <em>this specific day</em>? If the answer reads the same as yesterday and last
      Tuesday's patient, the assumption is no.
    </p>

    <h3>What auditors actually flag</h3>
    <p>
      Real citations from recent state-board decisions tend to cluster around three patterns:
    </p>
    <ul>
      <li><strong>Identical "normals" across visits on the same animal.</strong> Every recheck has "BAR, MMs pink &amp; moist, CRT &lt;2s, abdomen soft non-painful, auscultation WNL." The animal has been limping for six weeks. At no point does the exam acknowledge the presenting problem.</li>
      <li><strong>Identical text across animals.</strong> The same "history" paragraph appears on a German Shepherd's chart and a rabbit's chart within the same week. This is the one that ends careers.</li>
      <li><strong>Auto-populated findings that contradict the plan.</strong> Exam says "cardiac auscultation unremarkable." Plan says "recommend cardiology referral for suspected murmur." That's a template that filled itself without the vet reading it. Boards treat this as evidence the exam wasn't performed.</li>
    </ul>

    <h3>Where the actual line is</h3>
    <p>
      The standard most boards enforce isn't "no templates." It's roughly: <em>a record must
      contain enough unique, case-specific detail that it could not plausibly be a
      carry-forward from another encounter</em>. Practically, that means at minimum:
    </p>
    <ul>
      <li>The presenting complaint, in enough specificity that the clinical reasoning is visible.</li>
      <li>At least one exam finding that's specific to <em>this</em> visit — even if it's "palpation of right stifle reproduces lameness previously described; no new findings in contralateral limb."</li>
      <li>A plan that references the specific animal's response to prior plans, if relevant ("owner reports meloxicam gave 3 days of improvement then plateau").</li>
    </ul>
    <p>
      If those three things are present and different from last week's note, it's almost
      impossible for an auditor to call the record cloned.
    </p>

    <h3>The subtler trap: "WNL everything"</h3>
    <p>
      A template that defaults to WNL on every system and makes you actively un-check
      abnormalities is the single biggest generator of cloned-record citations. It looks
      efficient. In practice, vets under time pressure sign it without un-checking, and the
      record says the exam was unremarkable when the vet only auscultated the chest and
      glanced at the abdomen.
    </p>
    <p>
      The safer pattern is the inverse: a template that defaults to <em>blank</em> and requires
      you to affirmatively enter "WNL" or the actual finding for each system. The cognitive
      cost is marginal. The audit defence is massive: a board can't accuse you of documenting
      an exam you didn't do if the field was blank until you spoke it.
    </p>
    <p>
      This is how Salvia's form engine is structured by default — fields are empty, the AI fills
      them from your voice note, and anything you didn't mention stays empty (with a "not
      recorded" marker). The alternative — a tool that cheerfully fills "WNL" into anything you
      skipped — is how cloned-record citations happen in the first place.
    </p>

    <h3>The practical fix, starting tomorrow</h3>
    <p>
      If you're on a conventional PMS with default templates, two small changes dramatically
      reduce your audit exposure:
    </p>
    <ul>
      <li>For every recheck or re-examination, write the first sentence of each SOAP block fresh. Not the whole note. Just the first sentence. This single habit breaks the cloning signature.</li>
      <li>At the end of each chart, skim for anything that reads "like last time." If it does, change it or delete it.</li>
    </ul>
    <p>
      Boards aren't trying to punish efficient documentation. They're trying to punish
      documentation that's so templated no one can tell what actually happened. Those are
      different problems with different solutions.
    </p>
  </>
);
