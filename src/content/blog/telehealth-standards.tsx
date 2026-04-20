
export const content = (
  <>
    <p>
      The short version: a tele-dental note has to contain everything an in-person note would,
      <em>plus</em> a handful of remote-specific fields. The standards are still fragmented —
      the DCA in India, the GDC in the UK, and individual state boards in the US all have their
      own wording — but the overlap between them is large enough that if you cover the common
      denominators, you're compliant almost everywhere.
    </p>
    <p>
      What changes in tele-dental isn't the clinical reasoning. It's the evidentiary burden:
      you can't palpate, so the chart has to work harder to show what you did assess and how
      you reached your conclusions.
    </p>

    <h3>The remote-specific fields every board wants</h3>
    <p>
      Across most jurisdictions, a tele-dental note needs to additionally include:
    </p>
    <ul>
      <li><strong>Patient location at the time of consult.</strong> Not just the address on file — where they are right now (city, country). This determines which board's jurisdiction applies.</li>
      <li><strong>Clinician location.</strong> Required by most boards to demonstrate the clinician is registered in a jurisdiction authorised to treat the patient.</li>
      <li><strong>Modality.</strong> Synchronous video, synchronous audio-only, asynchronous (store-and-forward photos), or hybrid.</li>
      <li><strong>Verbal consent for remote care.</strong> Specifically: that the patient understands the limitations of a remote dental assessment and accepts those limitations. This should be a direct quote or a documented "yes" response, not a checkbox.</li>
      <li><strong>Technology used,</strong> in enough detail that another clinician could reproduce the setup (platform name, whether photos were submitted, photo source).</li>
      <li><strong>Identity verification.</strong> How you confirmed the person on the other end of the video is who they claim to be — usually by displayed ID or a known patient relationship.</li>
      <li><strong>Connectivity notes.</strong> If the call dropped, video lagged, or audio was poor at any point, document it. A dropped call during a clinical recommendation is a defence vulnerability if you don't note it.</li>
    </ul>

    <h3>What remote-assessment limitations actually mean in the note</h3>
    <p>
      This is where most tele-dental notes are weakest. You can't probe, can't percuss, can't
      palpate, can't see intraoral mirror images at the angle a clinical exam would give. The
      note should say so explicitly — not as a disclaimer, but as part of the clinical
      reasoning:
    </p>
    <blockquote>
      "Assessment based on patient-submitted intraoral photos and synchronous video review.
      Unable to perform palpation, probing, or percussion. Differential below constructed from
      available information; recommendation to be confirmed with in-person exam within 48h if
      acute or within 2 weeks if non-acute."
    </blockquote>
    <p>
      This reads as a clinician being honest about the scope of a remote assessment. That
      honesty is legally protective. A note that silently treats tele-consult as equivalent to
      in-person exam is not.
    </p>

    <h3>The scope-of-practice trap</h3>
    <p>
      The single most common tele-dental compliance failure isn't about note content — it's
      about scope. You can diagnose, triage, advise, and prescribe (in some jurisdictions)
      remotely. You generally <em>cannot</em> write a definitive treatment plan for a crown,
      endodontic, or implant case based on a tele-consult alone. The correct framing in the
      note is "triage / assessment / referral" rather than "diagnosis / treatment plan."
    </p>
    <p>
      If the encounter ends with a specific recommendation for in-person care, make that the
      headline of the plan section. The tele-consult note is the bridge; the in-person note is
      the commitment.
    </p>

    <h3>A minimum tele-dental note template</h3>
    <blockquote>
      <strong>Modality:</strong> Synchronous video via [platform], 18 minutes, no connectivity
      interruptions.<br/>
      <strong>Patient location:</strong> Bengaluru, KA, India.<br/>
      <strong>Clinician location:</strong> Mumbai, MH, India (registered: [number]).<br/>
      <strong>Identity verification:</strong> Patient known from prior in-person care
      [date].<br/>
      <strong>Consent:</strong> Patient acknowledged understanding of remote assessment
      limitations. Stated: "Yes, I understand we can't do a full exam online."<br/>
      <strong>S:</strong> [chief complaint + history]<br/>
      <strong>O:</strong> [video inspection findings + patient-submitted photos reviewed]<br/>
      <strong>A:</strong> [working assessment with explicit note of remote limitations]<br/>
      <strong>P:</strong> [triage recommendation + in-person follow-up timing + what to watch
      for]<br/>
      <strong>Tech notes:</strong> [photos attached, saved to record; any connectivity
      issues]
    </blockquote>

    <h3>Where the workflow helps</h3>
    <p>
      The fields above aren't prose — they're discrete data points, and they're the kind of
      fields that disappear into freeform notes under time pressure. A form-based tool that
      requires patient location, modality, consent quote, and limitation acknowledgement
      before the note can be signed will eliminate the category of omissions that get
      flagged. Salvia's form engine handles this natively: remote-consult templates surface
      the tele-specific fields by default, and the voice capture preserves the consent
      statement as audio evidence linked to the field. If you ever need to prove the patient
      said "yes" to remote care, the waveform and the transcript are both in the Audit Pack.
    </p>
    <p>
      Tele-dentistry is legitimate, clinically useful, and increasingly normal. The
      documentation standard is just higher — because the record is doing more of the
      evidentiary work the exam can't.
    </p>
  </>
);
