
export const content = (
  <>
    <p>
      This is, statistically, one of the harder cases to defend. Failure-to-diagnose periodontal
      disease is the most common cause of dental malpractice claims in the US and UK, and the
      single thing plaintiff's counsel will ask for first is your <strong>periodontal charting
      history</strong>. If there's no full-mouth probing at routine intervals, the case is
      almost always settleable before it gets to trial — because the defence has nothing
      concrete to stand on.
    </p>
    <p>
      That said, defensible doesn't mean perfect. You can have a real defence even with gaps,
      if the chart shows a consistent clinical pattern of monitoring, and if the specific
      findings align with a plausible rate of progression. Here's what actually matters.
    </p>

    <h3>What plaintiff's counsel will ask for</h3>
    <p>
      In a perio-malpractice discovery request, the standard list is:
    </p>
    <ul>
      <li>Full-mouth six-point probing depths, at what intervals.</li>
      <li>Bleeding-on-probing (BOP) records.</li>
      <li>Mobility and furcation grading.</li>
      <li>Bitewing and periapical radiographs with dates.</li>
      <li>All hygiene visit notes, especially any risk-factor discussions.</li>
      <li>Any referrals to a periodontist, and patient acceptance/refusal.</li>
      <li>Maintenance recall intervals and whether the patient attended.</li>
    </ul>
    <p>
      The weakest link usually isn't the probing itself — most hygienists probe routinely. It's
      whether the probing was <em>recorded</em>, specifically and consistently, at defensible
      intervals (typically annually at minimum, more often for patients with existing disease
      or risk factors).</p>

    <h3>Where the defence falls apart</h3>
    <p>
      Patterns that sink these cases:
    </p>
    <ul>
      <li><strong>"WNL" in the perio box with no numbers.</strong> A conclusion, not a record. Plaintiff's expert will testify that you can't tell from "WNL" whether a 4mm pocket was present that progressed.</li>
      <li><strong>Probing done at hygiene but not on the dentist's exam.</strong> Juries expect the dentist to have looked at the chart the hygienist produced and documented a response to it. If your exam note is silent on perio, it suggests you didn't review.</li>
      <li><strong>Radiographs taken but not interpreted in writing.</strong> "Bitewings taken" is not a reading. A record with no written interpretation of radiographic bone levels is almost always insufficient.</li>
      <li><strong>A recall interval that never tightened despite worsening numbers.</strong> If probing depths drifted from 3mm → 4mm → 5mm over 18 months and the recall stayed at 6 months, the chart documents its own negligence.</li>
    </ul>

    <h3>What a defensible perio record looks like</h3>
    <p>
      The spine of a case you can defend:
    </p>
    <ul>
      <li>Full-mouth six-point probing at least annually, with specific numbers (not "WNL").</li>
      <li>BOP recorded site-by-site, because sites with BOP are where progression happens.</li>
      <li>A classification applied (Stage/Grade per 2017 AAP classification, or the equivalent in your jurisdiction) — not just "perio."</li>
      <li>A recall interval that responds to the findings — 3 months for active disease, 6 for maintenance, adjusted when numbers change.</li>
      <li>A written risk-factor discussion: smoking, diabetes, family history. Patient-facing education notes ("discussed impact of smoking on perio prognosis; patient declines smoking cessation referral").</li>
      <li>Referral offered for Stage III/IV disease, and the patient's response documented in their own words.</li>
    </ul>

    <h3>The specific case you're describing</h3>
    <p>
      If you missed a pocket two years ago and the patient now has bone loss, the defence
      hinges on two questions: what does your <em>prior</em> charting show, and how fast can
      this particular disease progress? Perio isn't a light switch — even aggressive forms
      progress over months, not weeks. If your records from two years before show 3mm pockets
      and acceptable BOP on that tooth, and the next visit shows 6mm + bone loss, a
      periodontist expert can reasonably testify that the disease progressed between routine
      visits. Not all progression is negligence.
    </p>
    <p>
      What kills the defence is when the chart is silent. Silence gets interpreted as absence.
    </p>

    <h3>Where the workflow has to change</h3>
    <p>
      The structural fix is straightforward: perio numbers need to be captured at the source,
      in structured fields, not transcribed from paper or memory. Salvia's dental form engine
      treats probing as six individual numbers per tooth that the AI fills as the hygienist
      calls them out — each probe depth linked back to the exact audio timestamp. If the
      hygienist says "4, 3, 2 on the buccal of 14," those numbers populate the chart
      automatically, with the audio as evidence they were called out at the time. The record
      that emerges is one where a plaintiff's expert can't argue the probing wasn't done — the
      waveform says it was, and the field-level evidence trace shows where.
    </p>
    <p>
      For the case in front of you now: talk to your PI insurer before you talk to anyone else.
      Don't edit the old records. Don't explain retroactively in the chart. Produce what you
      have, let the defence be built on the actual pattern of your care, and make the workflow
      change so the next five years of records aren't defendable in the same shaky way.
    </p>
  </>
);
