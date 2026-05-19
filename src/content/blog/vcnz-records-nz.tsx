
export const content = (
  <>
    <p>
      The Veterinary Council of New Zealand published its updated Code of Professional
      Conduct in 2024. The records section is the most operationally demanding it's ever
      been, and the complaints process that follows non-compliance is faster than most
      New Zealand vet owners realise.
    </p>

    <h3>What VCNZ now requires in a clinical record</h3>
    <p>
      The 2024 Code makes explicit what was previously implied. Every clinical record for
      a consultation or treatment must contain:
    </p>
    <ul>
      <li><strong>Date, practice name, and client/patient identification.</strong> This is the baseline — and records that are pulled for complaints frequently fail here when exported outside the PMS, because the identifier is only in the system header, not in the note body.</li>
      <li><strong>A structured history including presenting complaint and relevant background.</strong> "Dog came in" isn't a history. "Labrador, 6yo M/N, presented with 3-day history of vomiting, 2x/day, no haematemesis, diet unchanged, no known toxin access" is.</li>
      <li><strong>Physical examination findings with specific vitals.</strong> Temperature, pulse, respiration, and weight with units are mandatory — not optional if the SOAP looks otherwise complete. The Code now requires that weight be recorded at every visit where a drug is administered, and that the drug dose visibly traces to that weight.</li>
      <li><strong>Assessment and differential diagnoses.</strong> The reasoning behind the treatment choice must be documented. "Treated for GI upset" without a documented differential is not adequate under the 2024 Code.</li>
      <li><strong>Complete prescribing record.</strong> Under the Veterinary Medicines Regulations, prescriptions issued at or from the practice must include: date, patient ID, drug name (generic and brand), strength, quantity, directions, and the prescribing vet's name and VCNZ number.</li>
      <li><strong>Consent record for procedures and cost estimates.</strong> The Code now specifically requires that consent for surgical procedures includes a cost estimate provided before the procedure, with the client's acceptance documented. "Owner happy to proceed" doesn't satisfy this.</li>
    </ul>

    <h3>The Schedule 3 drug register — the most audited record in NZ</h3>
    <p>
      In every VCNZ audit, the Controlled Drugs register is pulled first. What inspectors
      look for:
    </p>
    <ul>
      <li>Running balance that reconciles with physical stock</li>
      <li>Every entry signed by the administering vet and a witness</li>
      <li>Date, patient, drug, quantity, route, and purpose on every line</li>
      <li>No corrections — only subsequent entries with explanation</li>
    </ul>
    <p>
      A drug register discrepancy isn't treated as a clerical error. It's treated as a
      potential controlled substance diversion until proved otherwise. VCNZ has referred
      cases to the police on the basis of register discrepancies alone, without any other
      clinical concern.
    </p>

    <h3>How the complaints process moves in NZ</h3>
    <p>
      VCNZ complaints are faster than the Australian state board model. A complaint filed
      in week one can result in a records request in week two and an interim conditions
      order in week six if the records reveal a pattern of concern. The practice's ability
      to respond quickly and completely — with records that are legible, complete, and
      internally consistent — is the single biggest factor in whether an investigation
      broadens or resolves.
    </p>
    <p>
      "We're still compiling the records" is not a response that VCNZ handles well. The
      expectation is that records are retrievable, complete, and accurate on demand. That's
      not a CYA standard — it's a professional standard, and the 2024 Code makes it explicit.
    </p>

    <h3>Getting to VCNZ standard before you need to</h3>
    <p>
      The practices in New Zealand that handle complaints and audits well have the same
      feature: the record structure makes compliance the default. Required fields can't
      be skipped. Drug entries go through a workflow that populates the controlled drug
      register automatically. Consent is captured digitally against a specific procedure
      template, not signed on a generic form. The clinician doesn't need to remember
      everything — the system requires it.
    </p>
    <p>
      That's what audit-ready looks like in 2026. Not a folder of policies, not a
      retrospective review, but records that are right when they're made.
    </p>
  </>
);
