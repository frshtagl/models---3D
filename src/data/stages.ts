export type EvidenceProfile = 'classical-2008' | 'human-2017';

export interface DevelopmentStage {
  id: string;
  label: string;
  carnegieStage: string;
  age: string;
  title: string;
  summary: string;
  events: string[];
  liverScale: number;
  duodenumScale: number;
}

export const DEVELOPMENT_STAGES: DevelopmentStage[] = [
  {
    id: 'cs10',
    label: 'CS10',
    carnegieStage: 'Carnegie stage 10',
    age: 'Approximately 28 days in the 2017 reconstruction',
    title: 'Early hepatic primordium',
    summary: 'The liver primordium becomes identifiable. Paired vitelline and umbilical venous channels approach the venous pole through hepatocardiac channels.',
    events: [
      'Paired right and left vitelline veins are represented as separate channels.',
      'The hepatic primordium is a small landmark, not a mature liver.',
      'The yolk-sac drainage route is shown as context for the vitelline system.'
    ],
    liverScale: 0.48,
    duodenumScale: 0.72
  },
  {
    id: 'cs12',
    label: 'CS12',
    carnegieStage: 'Carnegie stage 12',
    age: 'Approximately 26–30 days in the 2008 review',
    title: 'Hepatic invasion and early sinusoids',
    summary: 'The hepatic bud expands into the transverse septum. Early sinusoidal channels appear among invading hepatoblast cords in the classical synthesis; the human reconstruction describes sinusoids entering from the venous sinus during this developmental window.',
    events: [
      'Separate hepatoblast cords from endothelial sinusoidal channels.',
      'The sinusoidal plexus is a schematic microvascular network, not a measured capillary reconstruction.',
      'Keep the classical and human-reconstruction explanations of sinusoidal origin distinct.'
    ],
    liverScale: 0.66,
    duodenumScale: 0.82
  },
  {
    id: 'cs13',
    label: 'CS13',
    carnegieStage: 'Carnegie stage 13',
    age: 'Approximately 28–32 days in the 2008 review',
    title: 'Hepatic enclosure and expanding plexus',
    summary: 'The liver encloses the vitelline conduits while the intrahepatic microvascular network expands. The classical profile introduces venae advehentes and venae revehentes; the human reconstruction describes sinusoidal entry from the venous sinus and temporarily identifiable large venous conduits.',
    events: [
      'The classical afferent and efferent channels are separate from the sinusoidal mesh.',
      'The human-reconstruction profile keeps the larger vitelline conduits identifiable after enclosure.',
      'Do not treat a schematic plexus path as a measured embryonic capillary.'
    ],
    liverScale: 0.82,
    duodenumScale: 0.9
  },
  {
    id: 'cs14',
    label: 'CS14',
    carnegieStage: 'Carnegie stage 14',
    age: 'Approximately 31–35 days in the 2008 review',
    title: 'Asymmetric hepatic drainage',
    summary: 'Right-sided hepatic drainage becomes more prominent. In the 2017 reconstruction, portal branches are identifiable from the right vitelline conduit, while the left-sided portal branches are associated with the left umbilical vein.',
    events: [
      'The human profile shows a right-dominant hepatic draining network developing from the hepatocardiac channel.',
      'The left portal branches are umbilical-derived in the 2017 reconstruction and are not drawn in this vitelline-only module.',
      'The transient ventral intervitelline connection is a separate extrahepatic feature.'
    ],
    liverScale: 0.98,
    duodenumScale: 0.96
  },
  {
    id: 'cs15',
    label: 'CS15',
    carnegieStage: 'Carnegie stage 15',
    age: 'Approximately 35–38 days in the 2008 review',
    title: 'Intrahepatic portal pathways',
    summary: 'Portal branches become more distinct. The 2017 reconstruction assigns right-sided branches to the right vitelline (portal) conduit and left-sided branches to the left umbilical vein; this module renders only the right vitelline contribution.',
    events: [
      'Right portal branches are shown emerging from the right intrahepatic vitelline conduit.',
      'Left portal branches are not vitelline-derived in the 2017 reconstruction and remain outside this module.',
      'The portal sinus and venous duct are distinct shunts and are deferred to later milestones.'
    ],
    liverScale: 1.08,
    duodenumScale: 1.0
  },
  {
    id: 'cs16',
    label: 'CS16',
    carnegieStage: 'Carnegie stage 16',
    age: 'Approximately 37–42 days in the 2008 review',
    title: 'Developing fetal hepatic circulation',
    summary: 'The selected model now shows a more organized fetal hepatic vascular arrangement. Sinusoidal endothelial differentiation continues beyond this embryonic stage range, so the model is not a mature adult liver.',
    events: [
      'Trace afferent portal and efferent hepatic drainage as distinct pathways.',
      'The hepatic IVC contribution must not be confused with the entire composite IVC.',
      'Keep source-specific sinusoidal and portal lineage notes visible.'
    ],
    liverScale: 1.16,
    duodenumScale: 1.04
  }
];

export const PROFILE_LABELS: Record<EvidenceProfile, string> = {
  'classical-2008': 'Classical teaching model · 2008',
  'human-2017': 'Human 3D reconstruction · 2017'
};

export const PROFILE_DESCRIPTIONS: Record<EvidenceProfile, string> = {
  'classical-2008': 'Classical vestigial / anastomotic interpretation summarized by Collardeau-Frachon and Scoazec. Includes the sinusoidal plexus, venae advehentes and venae revehentes; its three prehepatic plus subdiaphragmatic connection scheme remains distinct.',
  'human-2017': 'Human embryo reconstruction interpretation reported by Hikspoors and colleagues. Sinusoids enter from the venous sinus, larger conduits remain temporarily identifiable and a right-dominant drainage network develops. Its dorsal and transient ventral connections are not blended with the classical scheme.'
};