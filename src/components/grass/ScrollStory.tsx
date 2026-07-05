import React, { useRef } from 'react';

import { useScrollFx } from './Rv';

// The whole system in one scroll: build the form, link the policies,
// speak, sealed. Illustration-led; pins on desktop, stacks on mobile.

const BEATS = [
  {
    art: '/illustrations/story_form.webp',
    alt: 'Form fields assembling themselves into a clinical form',
    title: <>Build your form.</>,
    copy: 'Drag together the exact form your clinic uses — consent, OPD note, drug entry — or start from a ready template. Your fields, your order, your language.',
  },
  {
    art: '/illustrations/story_policy.webp',
    alt: 'A policy rulebook plugging into a clinical form',
    title: <>Link your <span className="g-hl">policies.</span></>,
    copy: 'Attach the rules that matter to each form — dosage limits, mandatory consent, retention. From now on, every note is checked against them.',
  },
  {
    art: '/illustrations/ill_speak.webp',
    alt: 'A doctor speaking, sound waves flowing from a microphone',
    title: <>Then just <span className="g-hl">speak.</span></>,
    copy: 'The consult fills the form on its own — ambient in the OPD or a quick voice note after. The clinician reviews every field before it counts.',
  },
  {
    art: '/illustrations/ill_seal.webp',
    alt: 'A completed record with a green verified badge and a lock',
    title: <>Sealed as <span className="g-hl">evidence.</span></>,
    copy: 'Signed, policy-checked, original audio attached. Retrievable in minutes — even years later, even after the doctor has moved on.',
  },
];

export const ScrollStory: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFx(ref, { mode: 'pin', stages: [0, 0.3, 0.55, 0.8] });

  return (
    <div className="g-story" id="how-it-works" ref={ref} data-stage="1">
      <div className="g-story-pin">
        <div className="g-container g-story-inner">
          <div className="g-story-beats">
            {BEATS.map((b, i) => (
              <div className={`g-beat g-beat--${i + 1}`} key={i}>
                <div className="g-beat-copy">
                  <h2 className="g-h2">{b.title}</h2>
                  <p>{b.copy}</p>
                </div>
                <div className="g-beat-art">
                  <img src={b.art} alt={b.alt} loading="lazy"
                    onError={(e) => ((e.target as HTMLImageElement).style.visibility = 'hidden')} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="g-story-bar" aria-hidden="true" />
      </div>
    </div>
  );
};
