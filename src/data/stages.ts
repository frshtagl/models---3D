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
      'Keep the classical and human-reconstruction explanations of sinusoidal origin distinct.',
      'The classical middle dorsal intervitelline connection is described as the first prehepatic anastomosis to appear (3.5–4 mm embryo); its CS12 display is an approximate teaching bin.',
      'The paired anterior, common and caudal cardinal channels form the early systemic venous return; the common cardinal veins enter the sinus venosus.'
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
      'Do not treat a schematic plexus path as a measured embryonic capillary.',
      'The human reconstruction reports a dorsal extrahepatic intervitelline connection just caudal to the dorsal pancreatic bud at CS13.'
    ],
    liverScale: 0.82,
    duodenumScale: 0.9
  },
  {
    id: 'cs14',
    label: 'CS14',
    carnegieStage: 'Carnegie stage 14',
    age: 'Approximately 31–35 days in the 2008 review',
    title: 'Asymmetric hepatic inflow and shunts',
    summary: 'Right-sided hepatic drainage becomes more prominent. In the 2017 reconstruction, the portal sinus and venous duct are distinct left-to-right shunts: the portal sinus joins the left umbilical vein to the right vitelline vein, while the venous duct joins the left umbilical vein at the hilum to the right hepatocardiac channel. The classical ductus-venosus route is shown separately.',
    events: [
      'The human profile shows a right-dominant hepatic draining network developing from the hepatocardiac channel.',
      'The limited left umbilical-vein corridor is included here only to show the left portal-branch and portal-sinus origins; the complete umbilical system remains a separate module.',
      'The transient ventral intervitelline connection is a separate extrahepatic feature.',
      'The human reconstruction describes a much smaller, more caudal ventral connection temporarily during CS14 only; it is not the classical caudal-ventral connection.',
      'The human venous duct is shown developing from the left umbilical-vein hilum to the right hepatocardiac channel; this is a separate shunt from the portal sinus.'
    ],
    liverScale: 0.98,
    duodenumScale: 0.96
  },
  {
    id: 'cs15',
    label: 'CS15',
    carnegieStage: 'Carnegie stage 15',
    age: 'Approximately 35–38 days in the 2008 review',
    title: 'Portal pathways and hepatic outflow',
    summary: 'Portal branches become more distinct and the venous duct is established as a left umbilical-to-right hepatocardiac shunt in the human reconstruction. The 2024 human study documents the curved, regionally narrowed venous route at CS15 and reconstructs right, middle and left hepatic veins joining the IVC.',
    events: [
      'Right portal branches are shown emerging from the right intrahepatic vitelline conduit; left portal branches are shown from the left umbilical vein.',
      'Left portal branches are not vitelline-derived in the 2017 reconstruction; they arise from the left umbilical vein.',
      'The portal sinus is modeled as a separate intrahepatic shunt; the venous duct is shown as a distinct left umbilical-to-right hepatocardiac shunt.',
      'The human dorsal anastomosis is not separately resolved after early CS14 in the cited description; this model does not infer that it regressed.',
      'The 2024 CS15 reconstruction identifies right, middle and left hepatic veins draining into the IVC; the model uses simplified collector paths, not specimen-derived branching.',
      'In the 2015 human cardinal reconstruction, the caudal cardinal extension is nearly complete and a subcardinal plexus begins developing in and around the mesonephroi.',
      'The venous duct is shown with a narrowed waist as a teaching approximation of the regional narrowing described at CS15.'
    ],
    liverScale: 1.08,
    duodenumScale: 1.0
  },
  {
    id: 'cs16',
    label: 'CS16',
    carnegieStage: 'Carnegie stage 16',
    age: 'Approximately 37–42 days in the 2008 review',
    title: 'Early fetal hepatic inflow and outflow',
    summary: 'The early fetal model now distinguishes portal inflow, umbilical inflow, portal sinus, ductus venosus and terminal hepatic venous drainage. The right hepatocardiac channel is shown as the hepatic / suprahepatic IVC contribution only; the complete composite IVC is not modeled.',
    events: [
      'Trace afferent portal and efferent hepatic drainage as distinct pathways.',
      'The hepatic IVC contribution must not be confused with the entire composite IVC.',
      'Keep source-specific sinusoidal and portal lineage notes visible.',
      'Trace the venous duct as a branchless fetal shunt; after birth it closes to the ligamentum venosum.',
      'The left umbilical vein closes after birth to form the ligamentum teres; it is not the same remnant as the ductus venosus.',
      'The hepatic IVC contribution is vitelline / hepatocardiac in origin; do not label the whole IVC as vitelline-derived.',
      'The 2015 human reconstruction describes longitudinal subcardinal channels and intersubcardinal anastomoses beginning at CS16; the final renal and infrarenal IVC are not complete in this stage bin.'
    ],
    liverScale: 1.16,
    duodenumScale: 1.04
  }
];

export const PROFILE_LABELS: Record<EvidenceProfile, string> = {
  'classical-2008': 'Classical teaching model · 2008',
  'human-2017': 'Human reconstruction · 2017 / 2024'
};

export const PROFILE_DESCRIPTIONS: Record<EvidenceProfile, string> = {
  'classical-2008': 'Classical vestigial / anastomotic interpretation summarized by Collardeau-Frachon and Scoazec. Includes the three retained vitelline components of the portal trunk, the subhepatic-anastomosis-derived portal sinus, the subdiaphragmatic hepatic outflow bridge, venae advehentes / revehentes, and a branchless ductus venosus from the left portal-sinus angle to the IVC.',
  'human-2017': 'Human embryo reconstruction interpretation reported by Hikspoors and colleagues, supplemented by the 2024 human venous-route reconstructions of Isotani et al. It includes the midgut-derived portal precursor, right vitelline portal contribution, left umbilical-derived portal branches, distinct portal-sinus and venous-duct shunts, and schematic terminal hepatic veins. The classical topology remains separate.'
};