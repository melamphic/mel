
export const content = (
  <>
    <p>
      You don't, really — not with certainty, not by reading the VMR code cover to cover. The
      code runs to hundreds of pages of cross-referenced clauses, and the sections that
      actually apply to your note depend on the species, the procedure, the drugs, and the
      consent context. Even vets who have read the whole thing end up guessing which clauses
      matter for a given encounter.
    </p>
    <p>
      That's a problem worth solving structurally, not by trying to memorise the code.
    </p>

    <h3>Why reading the code doesn't actually work</h3>
    <p>
      A few reasons compound:
    </p>
    <ul>
      <li><strong>The code is modular.</strong> The dental surgery clauses live in one section, controlled-drug clauses in another, consent in a third, euthanasia in a fourth. Any real encounter touches several. Holding the intersection in your head while also writing the note is genuinely hard.</li>
      <li><strong>The code updates.</strong> Minor amendments happen on a rolling basis. The version you read during registration is not the version in force two years later.</li>
      <li><strong>Compliance is contextual.</strong> A clause might say "where clinically indicated, document X." Whether X was indicated in your specific case is a judgement the code can't make for you. But the code will be read against you if you didn't document the judgement.</li>
    </ul>
    <p>
      The result is a lot of vets write notes that are clinically strong and procedurally
      compliant <em>most</em> of the time, and get caught on the 5% where a clause applied that
      they'd forgotten about. That's not an education gap — it's a workflow gap.
    </p>

    <h3>The structural answer: policy-at-write-time</h3>
    <p>
      The shift that actually works is embedding the policy into the charting workflow itself,
      so compliance is checked at the point the note is being written — not three weeks later
      by an auditor. Concretely, that looks like:
    </p>
    <ul>
      <li>A form engine that knows which VMR clauses apply to which procedure types.</li>
      <li>A conditional check that, for this specific encounter, surfaces the specific required fields (consent language, witness signature, retention tag, drug log link) before the note can be signed.</li>
      <li>A record of <em>which clauses were checked</em> at save time, so if the code changes, you can show what the rule was at the moment the note was finalised.</li>
    </ul>
    <p>
      This is exactly what Salvia's Policy Engine does. The clauses are encoded as structured
      rules (MUST / MAYBE / TRY), mapped to procedure types and jurisdictions, and evaluated
      live against the content of the note. If a controlled-drug administration is documented,
      the form won't let you sign until the witness field is populated and the drug-log
      reference is linked. If a euthanasia note is being finalised, the consent phrasing is
      checked against VMR requirements. Miss nothing isn't a motto — it's the default state.
    </p>

    <h3>What to do if you don't have a policy engine</h3>
    <p>
      A practical middle ground, doable in any PMS:
    </p>
    <ul>
      <li>Build a one-page checklist per high-risk encounter type (anaesthesia, euthanasia, controlled drug dispense, surgery over a certain complexity, exotic patient).</li>
      <li>Paste the checklist into the relevant template as a short section the vet fills before signing. It lives in the record, not in a separate compliance folder.</li>
      <li>Once a quarter, pull five records per checklist type and score them. This is the closest you can get to an internal audit without a dedicated tool.</li>
    </ul>
    <p>
      This won't catch the edge cases an active policy engine would, but it'll catch the
      predictable ones — which are the ones boards actually cite.
    </p>

    <h3>The uncomfortable truth about "standards"</h3>
    <p>
      Standards compliance isn't proven by reading policy documents — it's proven by the
      records you produce on ordinary days when nothing is going wrong. If your records are
      internally consistent, clinically reasoned, and procedurally complete on a random
      Tuesday, you're meeting the standard. If you have to hunt through the VMR code to
      reassure yourself, your workflow is asking your memory to do a compliance system's job.
      That's where the mistakes come from, and it's the one part worth fixing structurally.
    </p>
  </>
);
