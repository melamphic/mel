
export const content = (
  <>
    <p>
      Short answer: yes. The moment an AI scribe generates content that ends up in the chart, that
      output is part of the legal medical record. What's less obvious — and what trips up most
      practices — is that the <em>audio</em> and the <em>intermediate transcript</em> are almost
      certainly part of it too, if you ever need to defend the note.
    </p>
    <p>
      This matters because most clinicians assume the AI output is the record, and everything
      before it is scratch work. That's not how discovery or HIPAA think about it.
    </p>

    <h3>What HIPAA actually covers</h3>
    <p>
      Under 45 CFR 160.103, Protected Health Information includes any record "created or received"
      that relates to the care of a patient. An AI scribe that receives audio of your encounter
      and generates a note is handling PHI at every step: the audio, the transcript, the filled
      note, the model's intermediate outputs. If your vendor is storing any of it, they are a
      Business Associate and must have a signed BAA.
    </p>
    <p>
      Vendors that can't or won't sign a BAA are an immediate disqualifier. If the sales rep
      hedges on this question, end the meeting.
    </p>

    <h3>What the Cures Act adds</h3>
    <p>
      Since April 2021, the ONC's information-blocking rule gives patients the right to see
      essentially the full contents of their electronic health information on request. That
      includes AI-generated draft notes if they end up stored in the EHR. It doesn't include raw
      audio or transcripts that live only on the vendor's infrastructure — but if a patient or
      their attorney subpoenas your records in a malpractice claim, the scope widens.
    </p>

    <h3>The real legal risk: discoverability</h3>
    <p>
      Here's the part that surprises people. In a malpractice case, plaintiff's counsel can
      almost always subpoena <em>any recording</em> that exists of the encounter. If your AI
      vendor stored the audio (even briefly) and a trace of it survives anywhere, that audio is
      discoverable. This is bad if the audio contradicts the chart, and it's bad even if it
      doesn't — because now there's a second, contemporaneous source of truth the jury has to
      weigh against your typed note.
    </p>
    <p>
      The right framing is: <strong>treat the audio and the AI output as part of the legal
      record from day one</strong>. Don't treat the audio as ephemeral, because it's often not.
      A defensible setup is one where the audio, transcript, evidence trace, and final note are
      all retained together, hashed, and versioned — so the record <em>is</em> internally
      consistent, and you're not afraid of what a subpoena might find.
    </p>
    <p>
      This is explicitly how Salvia's Audit Pack is structured: one archive per encounter,
      containing the audio, the per-word transcript, the field-level evidence trace, and the
      signed note — with a SHA256 of the whole thing. Not because "we built a feature" but
      because the alternative (audio here, transcript there, note in the EHR, edit history
      nowhere) is the discovery nightmare.
    </p>

    <h3>What to check with your vendor, today</h3>
    <ul>
      <li><strong>Signed BAA.</strong> Non-negotiable.</li>
      <li><strong>Retention policy for audio.</strong> Is it deleted after the note is saved? Retained? For how long? In whose jurisdiction?</li>
      <li><strong>Versioning of edits.</strong> If you edit the AI-generated note, is the original retained? This matters for plaintiff-contradicts-your-edit cases.</li>
      <li><strong>Evidence trace.</strong> Can you show which line of audio supports which field of the note? This is the single biggest legal differentiator between AI scribes.</li>
      <li><strong>Export.</strong> Can you get the full record (audio + transcript + note) in one defensible file? Or is it scattered across the vendor's cloud?</li>
    </ul>
    <p>
      If three or more of these come back as "we're working on it," you have a record that isn't
      legally coherent, and that exposure sits with you, not the vendor.
    </p>
  </>
);
