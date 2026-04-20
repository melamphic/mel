
export const content = (
  <>
    <p>
      First: breathe. A PMS crash during surgery is stressful but it's not a documentation
      emergency — it's a bridging problem. The legal standard isn't "your EMR worked." It's
      "you kept a contemporaneous record in whatever form was available, and you reconciled
      it back into the chart when systems recovered." If you do those two things, the record
      is defensible.
    </p>
    <p>
      The practices that get into trouble after downtime aren't the ones who used paper — it's
      the ones who used nothing.
    </p>

    <h3>What actually needs to be captured during downtime</h3>
    <p>
      The minimum bar for any clinical encounter, paper or digital:
    </p>
    <ul>
      <li>Patient identifier + species/breed (for vet) + weight.</li>
      <li>Time-stamped vital signs (monitoring record for anaesthesia, if applicable).</li>
      <li>Drugs given: name, dose, route, time.</li>
      <li>Procedure performed, findings, and any complications.</li>
      <li>The person performing the procedure (and assistant, if relevant).</li>
      <li>The <em>real</em> clock time of each event — not "2pm-ish."</li>
    </ul>
    <p>
      A paper anaesthesia sheet and a clipboard are perfectly adequate. A whiteboard photo is
      adequate. A voice memo on your phone, consented to and captured in-room, is adequate. The
      thing that is <em>not</em> adequate is reconstructing the whole procedure from memory at
      7pm after the PMS comes back.
    </p>

    <h3>The bridging-back part, which everyone forgets</h3>
    <p>
      Downtime documentation has two parts: (1) capture during the outage, (2) reconciliation
      after. Step 2 is where practices quietly fail compliance.
    </p>
    <p>
      When your PMS is back up, the expected workflow is:
    </p>
    <ul>
      <li>Enter the clinical record from your paper / phone capture, with the <em>actual</em> times of events — not the current time.</li>
      <li>Mark the note as a downtime-reconciled record. Your PMS likely has a field for this; if not, put it in the body of the note: <em>"System downtime 14:20–16:05. Clinical events captured on paper during outage, reconciled into PMS at 18:40."</em></li>
      <li>Scan the paper record in and attach it to the chart. Don't throw it out. If the PMS entry is ever challenged, the paper is the contemporaneous evidence.</li>
    </ul>

    <h3>The legal risk if you skip the bridging</h3>
    <p>
      If a PMS record exists with an 18:40 timestamp describing a surgical event at 14:30, and
      there's no reference to the downtime, it looks — on audit or in litigation — like you
      wrote the whole surgery record four hours late from memory. That's a much worse record
      than the accurate one that says "captured on paper during outage, transcribed at 18:40."
      Downtime is explainable. Late documentation without context isn't.
    </p>

    <h3>Designing for this before it happens again</h3>
    <p>
      Three things worth having ready in the drawer, before your next outage:
    </p>
    <ul>
      <li>A printed downtime packet: blank SOAP sheet, blank anaesthesia record, blank drug log. Takes 5 minutes to set up once and buys you an entire calm response later.</li>
      <li>A practice policy that says, in writing, where downtime records live and who is responsible for reconciling them. (This is a surprisingly common audit citation — not having a policy.)</li>
      <li>A secondary capture path that's independent of the PMS. This is where voice-capture tools help: if Salvia is capturing audio to a structured form that saves locally first and syncs later, your clinical record is still being written even if the PMS is down. When it comes back, the reconciled note already exists.</li>
    </ul>
    <p>
      A crash isn't the problem. A crash with no backup capture and no reconciliation pathway
      is. Solve it once and it stops being an existential event.
    </p>
  </>
);
