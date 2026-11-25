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
    title: 'Hepatic diverticulum and invasion',
    summary: 'The hepatic bud expands into the transverse septum. Hepatoblast invasion and early vascular relationships become increasingly important.',
    events: [
      'Distinguish hepatoblast tissue from endothelial channels.',
      'Keep the primitive gut and duodenum as spatial reference structures.',
      'Do not interpret schematic geometry as measured specimen dimensions.'
    ],
    liverScale: 0.66,
    duodenumScale: 0.82
  },
  {
    id: 'cs13',
    label: 'CS13',
    carnegieStage: 'Carnegie stage 13',
    age: 'Approximately 28–32 days in the 2008 review',
    title: 'Hepatic enclosure and early anastomosis',
    summary: 'The hepatic primordium becomes more vascular. The 2017 human reconstruction describes vitelline conduits enclosed by the growing liver and a dorsal extrahepatic intervitelline connection.',
    events: [
      'The human-reconstruction profile describes a dorsal intervitelline anastomosis.',
      'The right intrahepatic vitelline conduit is wider than the left in the reported series.',
      'The classical profile uses its own anastomotic sequence and must remain separate.'
    ],
    liverScale: 0.82,
    duodenumScale: 0.9
  },
  {
    id: 'cs14',
    label: 'CS14',
    carnegieStage: 'Carnegie stage 14',
    age: 'Approximately 31–35 days in the 2008 review',
    title: 'Asymmetric venous remodeling',
    summary: 'Right-sided dominance becomes more evident. The 2017 reconstruction reports a transient, smaller ventral intervitelline connection during this stage window.',
    events: [
      'Keep right and left vessel identity explicit.',
      'A transient ventral connection belongs only to the 2017 profile and its reported stage window.',
      'Do not label an unobserved connection as biologically regressed.'
    ],
    liverScale: 0.98,
    duodenumScale: 0.96
  },
  {
    id: 'cs15',
    label: 'CS15',
    carnegieStage: 'Carnegie stage 15',
    age: 'Approximately 35–38 days in the 2008 review',
    title: 'Portal branches become distinct',
    summary: 'Portal branches are identifiable in the developing liver. The 2017 reconstruction describes right vitelline and left umbilical contributions to intrahepatic portal branches.',
    events: [
      'The right and left intrahepatic portal pathways must not be assigned one universal lineage.',
      'The left umbilical vein is context anatomy in this vitelline-focused milestone.',
      'The ductus venosus remains a separate umbilical-system shunt.'
    ],
    liverScale: 1.08,
    duodenumScale: 1.0
  },
  {
    id: 'cs16',
    label: 'CS16',
    carnegieStage: 'Carnegie stage 16',
    age: 'Approximately 37–42 days in the 2008 review',
    title: 'Fetal hepatic circulation pattern',
    summary: 'The classical synthesis describes a more definitive fetal hepatic circulation pattern. The hepatic segment of the IVC must be distinguished from the rest of the composite IVC.',
    events: [
      'Trace portal afferent and hepatic efferent pathways separately.',
      'Show the right hepatocardiac / hepatic IVC contribution without coloring the entire IVC as vitelline-derived.',
      'Preserve source-specific lineage notes.'
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
  'classical-2008': 'Classical vestigial / anastomotic interpretation summarized by Collardeau-Frachon and Scoazec. Its three prehepatic plus subdiaphragmatic connection scheme is kept distinct.',
  'human-2017': 'Human embryo reconstruction interpretation reported by Hikspoors and colleagues. Its observed dorsal and transient ventral connections are not blended with the classical four-connection scheme.'
};