
export const content = (
  <>
    <p>
      If you're reading this at 10:47pm with a laptop on your knees and three charts left to
      sign, you are not alone. A 2024 AMA survey put it at 72% of primary care physicians doing
      at least one hour of "pajama time" per weekday. The real number is probably higher because
      the burned-out people stop filling out the surveys.
    </p>

    <p>
      The honest answer to "how do I stop this" is: you probably can't, not with the workflow
      you have. But you <em>can</em> make it a lot less bad, and — more importantly for anyone
      who's ever had a patient lawyer over a chart — you can stop the pajama-time workflow from
      quietly destroying your legal defensibility.
    </p>

    <h3>What's actually happening at 11pm</h3>
    <p>
      Two problems compound. The first is medical: recall drops measurably after 90–120 minutes.
      By the time you're writing the note, your description of that rash, that cough, that "patient
      seemed a bit off today" is reconstructed, not observed. The second is legal: every EMR stamps
      a server-side <strong>"note entered"</strong> timestamp that your signature cannot override.
      You can date the encounter 2:30pm. The audit trail says 11:04pm.
    </p>
    <p>
      In a malpractice deposition, this combination is brutal. Opposing counsel doesn't need to
      prove you did the wrong thing — they need to prove your documentation is unreliable. An 11pm
      timestamp for a 2:30pm visit, twelve days in a row across your chart set, does that work for
      them before you've opened your mouth.
    </p>

    <h3>The three things that actually help</h3>

    <p><strong>1. Capture at the encounter, finalise later.</strong> The legally defensible version
    of late charting isn't "write the whole note at 11pm." It's "record what happened while you
    can prove the patient was still in front of you, then tidy the language later." That can be
    handwritten bullet points with a timestamp, a two-minute voice note on your phone, a structured
    EMR draft with the vitals and assessment blocks filled in. The later prose polish is addendum
    work and is fine. The clinical observations need to be anchored to the visit.</p>

    <p>This is where AI documentation tools like Salvia earn their keep — not because they save
    time on the note itself, but because the recording of your voice-note <em>becomes the
    contemporaneous evidence</em>. The filled form is timestamped to when you spoke it, not when
    you reviewed it. If a jury ever needs to know when the clinical information was actually
    captured, there's a waveform, not a guess.</p>

    <p><strong>2. If you must finish at home, make it an addendum, not a first draft.</strong>
    If your EMR allows it, the safest way to complete a note late is to:
    </p>
    <ul>
      <li>Save a structured skeleton during the encounter (vitals, chief complaint, key findings).</li>
      <li>Mark the note as a draft and timestamp the skeleton yourself in the body: <em>"Clinical findings documented at time of visit; narrative finalised [time]."</em></li>
      <li>Sign once, don't edit-after-sign unless you use the formal addendum workflow (overwriting a signed note is how billing mistakes become insurance-fraud investigations — see <a href="/blog/signed-edits-dental" style={{ color: 'var(--salvia-accent)' }}>this post</a>).</li>
    </ul>

    <p><strong>3. Fix the part of your workflow that's stealing the time.</strong> For most
    clinicians it's not "typing is slow" — it's "I need to be present with the patient and I can't
    split attention." That's why dictation and ambient AI tools work: the cognitive load of
    capturing information moves off your attention during the visit. For others it's template
    hell, or an EMR that buries the right fields three clicks deep. The answer depends which one
    it is for you. Be specific about the bottleneck before you buy a solution.</p>

    <h3>What good looks like</h3>
    <p>
      A defensible note is one where the clinical content is captured at the encounter and the
      timestamps reflect that, regardless of when the prose gets polished. A tool that records
      your voice in the room, drops evidence into structured fields with confidence scores, and
      retains the audio as part of the record — that's a note that stops being a liability.
    </p>
    <p>
      And you get your evenings back. Which is, frankly, the actual win.
    </p>
  </>
);
