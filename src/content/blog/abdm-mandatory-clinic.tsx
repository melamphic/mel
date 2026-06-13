
export const content = (
  <>
    <p>
      The confusion around ABDM is genuine, and it comes from mixing up two different questions. One is
      whether a patient must have an ABHA number. The other is whether your clinic must be part of the
      digital health ecosystem. The answers are different, and most of the panic online is people
      answering the first question when they meant the second.
    </p>

    <h3>For the patient: voluntary</h3>
    <p>
      Creating an ABHA (Ayushman Bharat Health Account) is voluntary for patients. Nobody can be denied
      care for not having one, and an ABHA is not health insurance — it is a portable identifier that
      links a person's records across facilities. If a patient declines, you treat them anyway. That
      part is settled.
    </p>

    <h3>For the clinic: "voluntary" on paper, mandatory in practice</h3>
    <p>
      Here is where it gets real. ABDM participation is not yet a blanket legal mandate for every
      clinic in the country. But it is becoming a practical condition for the things that pay your
      bills. State authorities are increasingly tying <strong>AB-PMJAY empanelment</strong> to ABDM
      certification, insurers prefer ABDM-linked facilities, and corporate tie-ups expect it. If your
      revenue touches government schemes or cashless insurance, "optional" is fast becoming a polite
      fiction.
    </p>
    <p>
      Two registrations sit at the base of it. Your facility registers on the
      <strong> Health Facility Registry (HFR)</strong>, and your doctors register on the
      <strong> Healthcare Professionals Registry (HPR)</strong>. Without those, you cannot participate
      in the network or get the software certifications that empanelment increasingly asks for.
    </p>

    <h3>What "ABDM compliant" actually requires</h3>
    <p>
      Being on the registries is the easy step. The harder one is the records. ABDM is built on
      <strong> ABHA-linked, FHIR-structured</strong> health records — data shaped so it can be shared,
      with patient consent, across the ecosystem. The uncomfortable reality, noted even in NABH's own
      digital-health material, is that almost no clinic today actually generates ABHA-linked,
      FHIR-ready records. Most "ABDM-ready" claims stop at letting a patient scan a QR code, not at
      producing an interoperable record.
    </p>
    <p>
      The milestones are staged for a reason — ABHA verification first, then health-record linkage,
      then full interoperability. A clinic can be early on that path and still be losing empanelment
      points to a competitor who is further along.
    </p>

    <h3>The practical move</h3>
    <p>
      You do not need to rip out your HMIS to start. Register on HFR and HPR now; they are
      prerequisites for everything else. Then look honestly at whether your documentation can produce a
      structured, shareable record or only a scanned PDF. Salvia's role here is the record itself: a
      spoken consult becomes a structured clinical note that is built to be ABHA-linked and shared with
      consent, rather than a flat document that satisfies a QR code and nothing more. We are honest
      that deep, certified interoperability is a roadmap, not a checkbox — but the structured record is
      where it has to start.
    </p>

    <h3>The deeper point</h3>
    <p>
      Treating ABDM as "voluntary, so ignore it" is the expensive reading. The mandate is arriving
      through the back door of empanelment and insurance, not the front door of a law. The clinics
      that register early and start producing real structured records will keep their scheme revenue.
      The ones waiting for a formal order will be retrofitting under deadline pressure, which is always
      the costliest way to comply.
    </p>
  </>
);
