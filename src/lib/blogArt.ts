// Content-matched illustration per blog article — one style family, picked
// by what the article is actually about. Every id in blogContent has an
// explicit entry; unknown/future ids fall back to their domain's world.

const ART: Record<string, string> = {
  // General clinic
  'ai-scribe-pricing-india': '/illustrations/price_coins.webp',
  'consumer-court-records': '/illustrations/court_scene.webp',
  'patient-records-access-india': '/illustrations/ill_verify.webp',
  'nabh-small-clinic-worth-it': '/illustrations/tpl_work_cert.webp',
  'abdm-mandatory-clinic': '/illustrations/ill_globe_india.webp',
  'ai-scribe-indian-languages': '/illustrations/ill_speak.webp',
  'pajama-time': '/illustrations/night_scene.webp',
  'informed-refusal': '/illustrations/vet_estimate.webp',
  'ai-legal': '/illustrations/shield.webp',
  'stranger-rule': '/illustrations/tpl_soap.webp',
  'audit-trail': '/illustrations/ill_seal.webp',
  'difficult-patients': '/illustrations/clinic_world.webp',
  'pediatric-records': '/illustrations/speech_world.webp',

  // Veterinary
  'vet-tpr': '/illustrations/stetho.webp',
  'copy-paste-vet': '/illustrations/story_form.webp',
  'emr-crash-vet': '/illustrations/vault.webp',
  'ai-vet-legal': '/illustrations/vet_shield_paw.webp',
  'vet-audit-prep': '/illustrations/vet_world.webp',
  'retention-vet': '/illustrations/tpl_cd_register.webp',
  'logic-vet': '/illustrations/story_policy.webp',
  'cma-vet-deadline': '/illustrations/vet_shield_paw.webp',
  'rcvs-record-inspection': '/illustrations/ill_verify.webp',
  'au-vet-board-records': '/illustrations/vet_mic_dog.webp',
  'vcnz-records-standard': '/illustrations/tpl_cd_register.webp',

  // Dental
  'malpractice-dental': '/illustrations/court_scene.webp',
  'oral-photography': '/illustrations/dental_xray.webp',
  'signed-edits-dental': '/illustrations/story_form.webp',
  'teledentistry-standards': '/illustrations/signup_scene.webp',
  'manual-dental-risk': '/illustrations/tpl_dental_chart.webp',
  'surgical-prep-dental': '/illustrations/tpl_anaesthesia.webp',
  'cqc-dental-2026': '/illustrations/tpl_work_cert.webp',
  'ahpra-dental-records': '/illustrations/dental_world.webp',
};

const DOMAIN_FALLBACK: Record<string, string> = {
  GENERAL: '/illustrations/clinic_world.webp',
  VETERINARY: '/illustrations/vet_world.webp',
  DENTAL: '/illustrations/dental_world.webp',
};

export function blogArt(id: string, domain: string): string {
  return ART[id] ?? DOMAIN_FALLBACK[domain] ?? '/illustrations/clinic_world.webp';
}
