
export const content = (
  <>
    <p>
      Yes, in both jurisdictions — but "legally" is doing a lot of work in that question. Neither
      the AVA in Australia nor VCNZ in New Zealand has explicitly banned AI scribes, and neither
      has explicitly endorsed them. The governing standards are written for human
      record-keeping, and they mostly still apply unchanged. What's novel is the workflow, not
      the legal obligations.
    </p>
    <p>
      This is the point where a lot of practices get nervous and either adopt nothing ("too
      risky") or adopt everything ("nobody's said no"). Both are the wrong read. The calibrated
      answer is: use AI scribes, but the responsibility stays entirely with you as the
      registered vet, and your obligations to the record don't change because a machine helped
      write it.
    </p>

    <h3>What the AVMA, AVA, and VCNZ actually say</h3>
    <p>
      The common position across most Anglophone regulators is essentially three rules:
    </p>
    <ul>
      <li><strong>The registered veterinarian is responsible for the record.</strong> If an AI tool generates a note and you sign it, you're vouching for its accuracy — the same way you would for a note a human scribe wrote. "The AI made a mistake" is not a defence.</li>
      <li><strong>Record content standards don't change.</strong> Whatever your board requires in a clinical record (TPR, assessment, plan, drug details, consent) still has to be there. AI that omits required fields is non-compliant regardless of how time-saving it is.</li>
      <li><strong>Privacy and data handling obligations apply fully.</strong> In AU, that's APP principles under the Privacy Act 1988 (for health info, plus the My Health Records Act where relevant). In NZ, it's HIPC 2020. Any AI vendor that can't show you where their data is stored and how it's encrypted should be disqualified immediately.</li>
    </ul>

    <h3>Where "legal" shades into "risky"</h3>
    <p>
      There are four specific patterns that are technically legal but quietly set you up to
      fail:
    </p>
    <ul>
      <li><strong>Using a general-purpose AI (ChatGPT, etc.) with pasted clinical info.</strong> Unless you have an enterprise agreement with data-residency guarantees, you may be exporting PHI outside your regulator's jurisdiction. This is a privacy complaint waiting to happen.</li>
      <li><strong>Signing AI output without reviewing it line by line.</strong> If your workflow is "hit the button, glance, sign," the AI's hallucinations are your hallucinations. Regulators will not entertain a "but it seemed right" defence.</li>
      <li><strong>Letting the AI paraphrase client consent.</strong> If the client consented to X and the AI wrote Y in the note, the record now misrepresents what happened. Consent sections should be direct quotations where possible.</li>
      <li><strong>Not retaining the evidence trail.</strong> If a board asks "how did the AI arrive at this note?", and you can't show the audio or the intermediate transcript, you have a record with no provenance.</li>
    </ul>

    <h3>The regulation that's coming</h3>
    <p>
      Expect this to tighten. The AVA has been publishing practice-advisory material on
      AI-assisted clinical records since late 2024, and VCNZ's standards consultation cycle is
      likely to add AI-specific language in the next revision. The trajectory is clear: AI is
      permitted, but the evidentiary burden on the practice increases — audio retention,
      consent for recording, and auditable edit trails will all move from "best practice" to
      "required."
    </p>
    <p>
      The smart move is to run your practice as though the stricter standard already applies.
      That means picking an AI scribe that (a) holds your data in-region, (b) retains the audio
      and transcript as part of the record, (c) shows field-level evidence back to the audio,
      and (d) lets you export everything in a single auditable archive.
    </p>

    <h3>Why the architecture matters more than the "AI"</h3>
    <p>
      Most vets comparing AI scribes focus on output quality — "does the note sound right." The
      regulators care about something different: can you prove, later, what was said, what was
      captured, what the AI inferred, and what you changed? Salvia is built specifically for
      this: every encounter produces an Audit Pack with the audio, per-word transcript, evidence
      trace for each field, final signed note, and SHA256 over the whole thing. That's not a
      feature list — it's the shape of a record that survives regulator scrutiny.
    </p>
    <p>
      You can use any AI scribe in AU/NZ today. You can only use a subset of them defensibly.
      The difference is in the archive, not the output.
    </p>
  </>
);
