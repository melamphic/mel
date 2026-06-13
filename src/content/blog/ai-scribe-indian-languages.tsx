
export const content = (
  <>
    <p>
      Most AI scribe demos are filmed in a quiet room with one person speaking clean, unbroken English.
      A real Indian OPD is none of those things. The doctor starts a sentence in Malayalam, drops in
      three English drug names, switches to Hindi to reassure the patient's mother, and a fan is going
      the whole time. The honest question is not whether AI scribes work. It is whether they survive
      that.
    </p>

    <h3>The thing English-first tools get wrong</h3>
    <p>
      The global scribe boom was built on American and British English. Those models are genuinely good
      — on the speech they were trained on. Point them at a code-mixed consult and the cracks show:
      they drop the vernacular portions, mangle Indian drug brand names, or quietly "translate" what
      they did not understand into something plausible and wrong. Independent evaluations of clinical
      speech recognition across Indian languages have found exactly this pattern — systems that score
      well on Indian English and then fall apart on code-switched or fully vernacular speech.
    </p>
    <p>
      And code-switching is not an edge case here. Something like 250 million Indians routinely mix
      English with Hindi or a regional language in ordinary conversation. For a clinic, the
      "edge case" is the normal case.
    </p>

    <h3>What the Indian players are doing</h3>
    <p>
      This is why the serious Indian tools are built differently. Eka Care's scribe advertises support
      for fifteen-plus Indian and international languages and even an offline mode for low-connectivity
      clinics; Augnito, out of Mumbai, came up through medical transcription and voice recognition
      tuned for clinical vocabulary. The fact that India-first companies are putting this much into the
      language problem tells you it is real, and that a generic foreign scribe is not a safe default for
      an Indian practice.
    </p>

    <h3>How to actually test one</h3>
    <p>
      Do not test a scribe on a script. Test it on your worst Tuesday. Three checks separate the tools
      that work from the ones that demo well:
    </p>
    <ul>
      <li><strong>Code-mixing within a sentence.</strong> Not "speaks Hindi" or "speaks English" — switching languages mid-sentence, the way you actually talk to a patient. Many tools handle one language cleanly and collapse on the mix.</li>
      <li><strong>Indian drug and brand names.</strong> Does it get the local brand right, or substitute a similar-sounding foreign one? A wrong drug in the note is not a typo, it is a liability.</li>
      <li><strong>Noise and a real microphone.</strong> A phone on a busy OPD desk, not a podcast mic in a studio.</li>
    </ul>

    <h3>The part that matters more than the transcript</h3>
    <p>
      Here is the trap, though. Even a perfect transcript is not a clinical record. A wall of accurately
      transcribed speech still has to become a structured note, with the consent captured, the drug
      entry made, the advice recorded. A scribe that hands you a tidy paragraph has done the easy
      ten percent. The work that protects you is turning that into a record an assessor or a consumer
      forum would accept.
    </p>
    <p>
      That is the line Salvia is built on. The multilingual capture matters because it has to work on a
      real Indian consult — but the point is what happens next: the spoken note becomes a structured,
      policy-checked record with the drug register and consent already filled, not just a transcript you
      still have to do something with.
    </p>

    <h3>The deeper point</h3>
    <p>
      The right way to judge an AI scribe in India is to assume your messiest consult, not your
      cleanest. If it only works when you speak slow, formal English, it does not work — because that is
      not how medicine is practised here. Pick the tool that survives the code-mixing, and then judge it
      on whether it gives you a record, not a paragraph.
    </p>
  </>
);
