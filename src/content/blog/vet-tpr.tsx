
export const content = (
  <>
    <p>
      Getting cited for a "missing TPR" is one of those weirdly common citations that feels
      disproportionate to what's actually wrong. You did take the temp. You did listen to the
      chest. You did palpate. The problem is that the note doesn't prove it, and a VMR or state
      board inspector reading the chart cold has to assume it didn't happen.
    </p>
    <p>
      The good news: the bar for "minimum SOAP note" is actually published, consistent across
      most regions, and not that high. The issue is that most of us stopped writing against it
      the moment we built personal template habits. Here's the floor.
    </p>

    <h3>What inspectors look for in the first 10 seconds</h3>
    <p>
      A former VMR inspector walked me through her mental checklist. She pulls a random file, and
      in about ten seconds she's decided whether the note is compliant or not. She's looking for:
    </p>
    <ul>
      <li><strong>Patient identifier.</strong> Name + species + breed + sex + age on every note. Not in a separate "patient record" page — on the note itself. A lot of clinics get clipped here.</li>
      <li><strong>TPR with units.</strong> Temperature, pulse, respiration, each with the unit (°C, bpm, rpm). "T: 38.5" without a unit is not a TPR — it's a number.</li>
      <li><strong>Weight.</strong> With the unit and the date it was recorded. For anything dosed by weight (most things), this is the foundation of every drug decision you make.</li>
      <li><strong>Structured S/O/A/P blocks.</strong> Not necessarily labelled, but visually distinct. A wall of prose with no separation reads as "clinical stream of consciousness," and boards hate it.</li>
      <li><strong>The assessment in clinical terms.</strong> "Dog seems uncomfortable" is not an assessment. "Differential: mild OA of the right stifle vs. soft-tissue strain" is.</li>
      <li><strong>A plan that's actionable.</strong> Drug names, doses, routes, durations, and follow-up timing. "Prescribed meloxicam" without dose or duration is a citation waiting to happen.</li>
    </ul>

    <h3>The TPR trap specifically</h3>
    <p>
      The number of notes that fail on TPR alone is striking. The most common pattern: the vet
      took the temperature, wrote it on a post-it or in their head, examined the animal, and then
      when typing the note, forgot to transcribe the actual numbers. The note ends up with
      "vitals within normal limits" — which is a conclusion, not a record. Inspectors can't
      verify a conclusion. They need the numbers.
    </p>
    <p>
      This is why structured forms with required TPR fields are so much safer than freeform SOAP
      boxes. If the field has to be filled before you can save, you can't accidentally submit a
      TPR-less record. Salvia's form engine handles this at the schema level — fields marked
      required can't be left blank, and the AI that fills fields from your voice note will
      explicitly flag missing vitals rather than hallucinating "WNL" into them. That distinction
      matters: a tool that leaves a field empty when you didn't mention it is safer than one that
      fills in a plausible default.
    </p>

    <h3>The minimum SOAP note, as a template</h3>
    <p>
      Here's the absolute floor. If your note has all of this, you're not getting cited for TPR
      again.
    </p>

    <blockquote>
      <strong>Signalment:</strong> Bella, DSH cat, 4 yo, female spayed, 4.6 kg.<br/>
      <strong>S:</strong> Owner reports vomiting once daily for 3 days, partially digested food,
      no diarrhoea, normal appetite between episodes.<br/>
      <strong>O:</strong> T: 38.8 °C, P: 160 bpm, R: 32 rpm. BCS 5/9. Hydration normal. Abdomen
      palpation unremarkable, no masses, non-painful.<br/>
      <strong>A:</strong> Acute GI upset, likely dietary. DDx: early pancreatitis, foreign body
      less likely given clinical picture.<br/>
      <strong>P:</strong> Anti-emetic (maropitant 1 mg/kg SC ×1). Bland diet 5 days. Recheck if
      not resolved within 48h. Owner advised to return for bloods if vomiting persists or
      appetite drops.
    </blockquote>

    <p>
      Six lines. Every required field. The inspector's ten-second scan ends with a shrug and
      they move on to the next file.
    </p>

    <h3>The broader fix</h3>
    <p>
      If you keep getting cited for different things across different audits, the issue isn't
      your knowledge — it's that you're asking prose to do structured-data work. Voice-noting
      into a form that has the required fields as its skeleton (rather than free-typing into a
      SOAP box) is a workflow change that eliminates a category of errors rather than fixing
      them one at a time. Worth considering if citations are becoming a pattern.
    </p>
  </>
);
