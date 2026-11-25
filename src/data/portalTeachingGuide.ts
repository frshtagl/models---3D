import type { EvidenceProfile } from './stages';

export type TeachingCameraPreset =
  | 'anterior'
  | 'posterior'
  | 'right'
  | 'left'
  | 'superior'
  | 'inferior'
  | 'oblique'
  | 'reset';

export interface PortalTeachingStep {
  id: string;
  title: string;
  stageId: string;
  profile: EvidenceProfile;
  camera: TeachingCameraPreset;
  selectedStructure: string;
  visibleLayers: readonly string[];
  learningPoint: string;
  narration: string;
  askLearners: string;
}

const CONTEXT = ['liver', 'duodenum', 'foregut'];

export const PORTAL_TEACHING_STEPS: PortalTeachingStep[] = [
  {
    id: 'paired-vitelline-baseline',
    title: 'Start with the paired vitelline veins',
    stageId: 'cs12',
    profile: 'human-2017',
    camera: 'posterior',
    selectedStructure: 'vitelline-left-extrahepatic',
    visibleLayers: [
      ...CONTEXT,
      'yolk-sac',
      'vitelline-left-yolk-sac-root',
      'vitelline-right-yolk-sac-root',
      'vitelline-left-extrahepatic',
      'vitelline-right-extrahepatic',
      'vitelline-left-intrahepatic',
      'vitelline-right-intrahepatic'
    ],
    learningPoint: 'Orient the class before introducing the portal vein.',
    narration: 'The right and left vitelline veins return blood from the yolk-sac region. Keep the duodenum in view: the future portal pathway must cross from left to right behind it. The model is schematic, so use it to understand relationships rather than vessel measurements.',
    askLearners: 'Which side of the duodenum will the definitive portal pathway cross?'
  },
  {
    id: 'human-midgut-precursor',
    title: 'Find the left-sided midgut precursor',
    stageId: 'cs13',
    profile: 'human-2017',
    camera: 'posterior',
    selectedStructure: 'human-portal-trunk',
    visibleLayers: [
      ...CONTEXT,
      'dorsal-pancreatic-bud',
      'vitelline-left-extrahepatic',
      'vitelline-right-extrahepatic',
      'human-dorsal-extrahepatic-anastomosis',
      'human-portal-trunk',
      'human-transient-ventral-anastomosis'
    ],
    learningPoint: 'In the 2017 reconstruction, the extrahepatic portal precursor is not simply described as a surviving left vitelline segment.',
    narration: 'A small left-sided vein from the developing midgut mesentery enters the left vitelline vein just upstream of the dorsal intervitelline anastomosis. Select the gold portal-path overlay and trace it from the mesenteric root into the left vitelline channel.',
    askLearners: 'Where does the small portal precursor enter the left vitelline vein relative to the dorsal connection?'
  },
  {
    id: 'dorsal-crossing',
    title: 'Trace the dorsal crossing behind the duodenum',
    stageId: 'cs13',
    profile: 'human-2017',
    camera: 'posterior',
    selectedStructure: 'human-dorsal-extrahepatic-anastomosis',
    visibleLayers: [
      ...CONTEXT,
      'dorsal-pancreatic-bud',
      'vitelline-left-extrahepatic',
      'vitelline-right-extrahepatic',
      'human-dorsal-extrahepatic-anastomosis',
      'human-portal-trunk'
    ],
    learningPoint: 'The dorsal anastomosis provides the route by which the portal pathway crosses the duodenum.',
    narration: 'Use the posterior view to see the dorsal / retroduodenal depth relationship. The connection lies just caudal to the dorsal pancreatic bud in the human reconstruction. Rotate to the anterior view afterwards to appreciate why the portal vein passes behind the duodenum.',
    askLearners: 'Is this crossing anterior or posterior to the duodenum?'
  },
  {
    id: 'right-vitelline-continuation',
    title: 'Follow the right vitelline continuation',
    stageId: 'cs14',
    profile: 'human-2017',
    camera: 'right',
    selectedStructure: 'human-portal-trunk',
    visibleLayers: [
      ...CONTEXT,
      'vitelline-right-extrahepatic',
      'vitelline-right-intrahepatic',
      'human-portal-trunk',
      'human-right-portal-branches',
      'human-dorsal-extrahepatic-anastomosis'
    ],
    learningPoint: 'The right intrahepatic vitelline conduit remains identifiable and contributes to the right-sided portal pathway.',
    narration: 'Trace the gold overlay from the dorsal crossing into the right vitelline conduit. In the human reconstruction, right intrahepatic portal branches arise from the right vitelline (portal) vein. Do not confuse this with the left-sided branch origin.',
    askLearners: 'Which embryonic vein supplies the right-sided intrahepatic portal branches in this reconstruction?'
  },
  {
    id: 'left-umbilical-inflow',
    title: 'Add the left umbilical-vein inflow',
    stageId: 'cs14',
    profile: 'human-2017',
    camera: 'anterior',
    selectedStructure: 'left-umbilical-vein',
    visibleLayers: [
      ...CONTEXT,
      'left-umbilical-vein',
      'portal-gallbladder',
      'human-portal-trunk',
      'human-right-portal-branches'
    ],
    learningPoint: 'The fetal liver has a second major afferent venous source: the left umbilical vein.',
    narration: 'The purple vessel is a deliberately simplified left umbilical-vein teaching path. It is included here to make the portal sinus and left portal-branch origins understandable; the complete paired umbilical circulation is a separate module.',
    askLearners: 'Which vessel brings placental blood into the fetal liver?'
  },
  {
    id: 'human-portal-sinus',
    title: 'See the human portal sinus form',
    stageId: 'cs14',
    profile: 'human-2017',
    camera: 'anterior',
    selectedStructure: 'human-portal-sinus',
    visibleLayers: [
      ...CONTEXT,
      'left-umbilical-vein',
      'human-portal-trunk',
      'human-portal-sinus',
      'human-right-portal-branches',
      'human-left-portal-branches',
      'portal-gallbladder',
      'portal-cantlie-boundary-guide'
    ],
    learningPoint: 'The human portal sinus is an intrahepatic left umbilical-to-right vitelline shunt, not an intervitelline anastomosis.',
    narration: 'The portal sinus connects the left umbilical vein in the liver hilum to the right vitelline (portal) vein. In the 2017 account it develops as a left-to-right intrahepatic shunt; it is not the same structure or mechanism as the classical subhepatic intervitelline connection.',
    askLearners: 'Which two vessels are connected by the human portal sinus?'
  },
  {
    id: 'human-portal-branch-origins',
    title: 'Compare left and right portal-branch origins',
    stageId: 'cs15',
    profile: 'human-2017',
    camera: 'anterior',
    selectedStructure: 'human-left-portal-branches',
    visibleLayers: [
      'liver',
      'left-umbilical-vein',
      'human-portal-sinus',
      'human-portal-trunk',
      'human-left-portal-branches',
      'human-right-portal-branches',
      'portal-gallbladder',
      'portal-cantlie-boundary-guide'
    ],
    learningPoint: 'Right portal branches arise from the right vitelline (portal) vein; left-sided branches arise from the left umbilical vein.',
    narration: 'Use the gallbladder marker and thin Cantlie guide to orient the hepatic vascular midline. The right-sided portal branches are shown in blue from the right vitelline conduit; the left-sided branches are shown in violet from the left umbilical vein. These are simplified first-order pathways, not a complete Couinaud segmental tree.',
    askLearners: 'What is the embryonic source of the left-sided portal branches in the 2017 reconstruction?'
  },
  {
    id: 'classical-portal-trunk',
    title: 'Compare the classical three-segment portal trunk',
    stageId: 'cs15',
    profile: 'classical-2008',
    camera: 'posterior',
    selectedStructure: 'classical-portal-trunk',
    visibleLayers: [
      ...CONTEXT,
      'vitelline-left-extrahepatic',
      'vitelline-right-extrahepatic',
      'classical-middle-dorsal-anastomosis',
      'classical-portal-trunk',
      'classical-subhepatic-anastomosis',
      'left-umbilical-vein'
    ],
    learningPoint: 'The classical portal trunk is assembled from three retained vitelline components.',
    narration: 'From caudal to cranial, trace the left vitelline segment from the mesenteric-vein termination to the middle anastomosis, the middle retroduodenal anastomosis itself, and the right vitelline segment between the middle and subhepatic anastomoses. The gold overlay highlights these three components.',
    askLearners: 'Name the three components of the classical portal trunk in caudal-to-cranial order.'
  },
  {
    id: 'classical-portal-sinus',
    title: 'Contrast the classical portal sinus',
    stageId: 'cs16',
    profile: 'classical-2008',
    camera: 'anterior',
    selectedStructure: 'classical-portal-sinus',
    visibleLayers: [
      ...CONTEXT,
      'left-umbilical-vein',
      'classical-portal-trunk',
      'classical-portal-sinus',
      'classical-left-portal-branches',
      'classical-right-portal-branches',
      'portal-gallbladder',
      'portal-cantlie-boundary-guide'
    ],
    learningPoint: 'In the classical account, the subhepatic intervitelline anastomosis remodels into the portal sinus.',
    narration: 'The classical account describes regression of the left half of the subhepatic anastomosis and enlargement of the remaining part into the portal sinus. Compare this with the previous human-reconstruction step: the two accounts describe different developmental mechanisms for the portal sinus.',
    askLearners: 'What is the key difference between the classical and human-reconstruction explanations of the portal sinus?'
  }
];
