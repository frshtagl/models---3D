import type { EvidenceProfile } from './stages';
import type { CardinalModel } from './cardinalNetwork';

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
  cardinalModel?: CardinalModel;
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
    selectedStructure: 'left-umbilical-inflow',
    visibleLayers: [
      ...CONTEXT,
      'left-umbilical-inflow',
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
      'left-umbilical-inflow',
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
      'left-umbilical-inflow',
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
      'left-umbilical-inflow'
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
      'left-umbilical-inflow',
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
,
  {
    id: 'classical-hepatic-outflow',
    title: 'Trace the classical hepatic efferent route',
    stageId: 'cs14',
    profile: 'classical-2008',
    camera: 'posterior',
    selectedStructure: 'classical-subdiaphragmatic-anastomosis',
    visibleLayers: [
      ...CONTEXT,
      'hepatic-sinusoidal-plexus',
      'classical-venae-revehentes',
      'classical-subdiaphragmatic-anastomosis',
      'classical-right-terminal-hepatic-outflow',
      'classical-left-terminal-hepatic-outflow',
      'vitelline-right-hepatocardiac',
      'vitelline-left-hepatocardiac'
    ],
    learningPoint: 'The classical hepatic efferent route drains sinusoidal blood through venae revehentes to the subdiaphragmatic anastomosis and then toward the venous sinus.',
    narration: 'Start in the sinusoidal plexus. Follow the two classical venae revehentes cranially to the subdiaphragmatic intervitelline bridge. From there, blood leaves through the terminal primitive vitelline channels toward the venous pole. The model keeps the early bilateral arrangement visible before showing the right-sided dominance in later bins.',
    askLearners: 'Which channels carry blood away from the hepatic sinusoids in the classical account?'
  },
  {
    id: 'human-terminal-hepatic-veins',
    title: 'Identify the terminal hepatic veins',
    stageId: 'cs15',
    profile: 'human-2017',
    camera: 'posterior',
    selectedStructure: 'human-terminal-hepatic-veins',
    visibleLayers: [
      ...CONTEXT,
      'hepatic-sinusoidal-plexus',
      'human-right-hepatic-drainage',
      'human-terminal-hepatic-veins',
      'vitelline-right-hepatocardiac'
    ],
    learningPoint: 'The 2024 CS15 reconstruction identifies right, middle and left hepatic veins draining toward the IVC.',
    narration: 'Select the three terminal hepatic-vein collectors. They drain the intrahepatic venous network toward the right hepatic outflow junction and then into the hepatic IVC contribution. These paths are simplified teaching centre-lines, not a specimen-derived adult hepatic-vein tree.',
    askLearners: 'What is the direction of flow through the terminal hepatic veins: toward or away from the liver?'
  },
  {
    id: 'human-venous-duct',
    title: 'Follow the human venous duct',
    stageId: 'cs15',
    profile: 'human-2017',
    camera: 'oblique',
    selectedStructure: 'human-ductus-venosus',
    visibleLayers: [
      ...CONTEXT,
      'left-umbilical-inflow',
      'human-portal-sinus',
      'human-ductus-venosus',
      'vitelline-right-hepatocardiac'
    ],
    learningPoint: 'The human venous duct is a direct left umbilical-vein-to-right-hepatocardiac shunt, separate from the portal sinus.',
    narration: 'Begin at the left umbilical-vein hilum and follow the curved venous duct to the right hepatocardiac channel. The narrow central segment is exaggerated slightly for visibility and reflects the regional narrowing described in the CS15 human venous-route reconstruction. The venous duct is branchless in this teaching model.',
    askLearners: 'Which two vessels are joined by the venous duct in the human reconstruction?'
  },
  {
    id: 'classical-ductus-venosus',
    title: 'Compare the classical ductus venosus',
    stageId: 'cs16',
    profile: 'classical-2008',
    camera: 'oblique',
    selectedStructure: 'classical-ductus-venosus',
    visibleLayers: [
      ...CONTEXT,
      'left-umbilical-inflow',
      'classical-portal-sinus',
      'classical-ductus-venosus',
      'vitelline-right-hepatocardiac'
    ],
    learningPoint: 'The classical account places the ductus venosus between the left angle of the portal sinus and the IVC.',
    narration: 'Trace the branchless channel from the left portal-sinus angle toward the IVC / hepatic outflow junction. Compare it with the previous human-reconstruction step: the named starting point and the described developmental mechanism are not identical.',
    askLearners: 'Does the classical ductus venosus begin at the portal sinus or directly in the umbilical-vein lumen?'
  },
  {
    id: 'fetal-hepatic-venous-route',
    title: 'Trace the fetal hepatic venous route',
    stageId: 'cs16',
    profile: 'human-2017',
    camera: 'anterior',
    selectedStructure: 'human-ductus-venosus',
    visibleLayers: [
      ...CONTEXT,
      'left-umbilical-inflow',
      'human-portal-sinus',
      'human-ductus-venosus',
      'human-right-hepatic-drainage',
      'human-terminal-hepatic-veins',
      'vitelline-right-hepatocardiac',
      'human-right-portal-branches',
      'human-left-portal-branches',
      'portal-gallbladder'
    ],
    learningPoint: 'The portal sinus, venous duct and hepatic veins are three different pathways with different destinations.',
    narration: 'Trace the umbilical inflow to the hilum. One shunt, the portal sinus, joins the right vitelline portal pathway and distributes blood into the liver. A second shunt, the venous duct, reaches the right hepatocardiac channel and bypasses the sinusoidal bed. Blood leaving the sinusoids drains through hepatic veins into the hepatic IVC outflow. At birth, the umbilical vein becomes the ligamentum teres and the venous duct becomes the ligamentum venosum.',
    askLearners: 'Can you distinguish the portal sinus shunt from the venous duct shunt and the hepatic venous outflow?'
  },
  {
    id: 'paired-umbilical-veins-early',
    title: 'Trace the early paired umbilical veins',
    stageId: 'cs10',
    profile: 'human-2017',
    cardinalModel: 'human-cardinal-2015',
    camera: 'anterior',
    selectedStructure: 'right-umbilical-vein',
    visibleLayers: [
      ...CONTEXT,
      'placenta',
      'umbilical-cord',
      'left-umbilical-inflow',
      'left-umbilical-sinus-horn-connection',
      'right-umbilical-vein',
      'sinus-venosus'
    ],
    learningPoint: 'The early umbilical system is paired; the left umbilical vein becomes the dominant persistent placental inflow while the right side regresses.',
    narration: 'Begin at the placental end and trace both umbilical channels toward the venous pole. The left umbilical-vein path from the placental root to the hepatic hilum is shown in the portal context layer; the early direct sinus-horn connection is a separate layer. The right umbilical vein is drawn as a paired early channel and later becomes indistinct. Do not confuse either umbilical vein with the vitelline veins draining the yolk sac.',
    askLearners: 'Which umbilical vein persists as the dominant placental inflow: right or left?'
  },
  {
    id: 'right-umbilical-vein-regression',
    title: 'Follow right umbilical-vein regression',
    stageId: 'cs14',
    profile: 'human-2017',
    cardinalModel: 'human-cardinal-2015',
    camera: 'oblique',
    selectedStructure: 'right-umbilical-vein',
    visibleLayers: [
      ...CONTEXT,
      'left-umbilical-inflow',
      'right-umbilical-vein',
      'left-umbilical-sinus-horn-connection',
      'human-portal-sinus',
      'human-ductus-venosus',
      'vitelline-right-hepatocardiac'
    ],
    learningPoint: 'Right umbilical-vein regression is distinct from persistence of the left umbilical vein and formation of the venous duct.',
    narration: 'At this stage the right umbilical vein is shown regressing as a distinct large channel. The left umbilical vein remains as the dominant placental inflow and has separate intrahepatic relationships. The portal sinus joins the left umbilical vein to the right vitelline portal pathway; the venous duct is a different shunt toward the right hepatocardiac outflow.',
    askLearners: 'Name the two separate left-to-right shunts and the vessels each one connects.'
  },
  {
    id: 'cardinal-cranial-and-common',
    title: 'Trace anterior and common cardinal veins',
    stageId: 'cs12',
    profile: 'human-2017',
    cardinalModel: 'human-cardinal-2015',
    camera: 'posterior',
    selectedStructure: 'common-cardinal-veins',
    visibleLayers: [
      ...CONTEXT,
      'dorsal-aorta',
      'anterior-cardinal-veins',
      'common-cardinal-veins',
      'caudal-cardinal-veins',
      'sinus-venosus'
    ],
    learningPoint: 'Anterior cardinal veins drain the cranial embryo; common cardinal veins carry that return into the sinus venosus.',
    narration: 'Follow each anterior cardinal vein caudally to its common cardinal junction, then continue through the common cardinal vein into the corresponding sinus horn. The caudal cardinal channels join this common cardinal region from below. The head and neck drainage territories are not reconstructed, so the cranial ends are positional anchors only.',
    askLearners: 'Which paired venous segment is also called the duct of Cuvier?'
  },
  {
    id: 'caudal-cardinal-extension',
    title: 'Follow caudal cardinal-vein extension',
    stageId: 'cs15',
    profile: 'human-2017',
    cardinalModel: 'human-cardinal-2015',
    camera: 'posterior',
    selectedStructure: 'caudal-cardinal-veins',
    visibleLayers: [
      ...CONTEXT,
      'dorsal-aorta',
      'mesonephros-right',
      'mesonephros-left',
      'common-cardinal-veins',
      'caudal-cardinal-veins',
      'iliac-venous-confluence'
    ],
    learningPoint: 'In the 2015 human reconstruction, caudal cardinal veins extend from the common cardinal region toward the pelvis through CS11–CS15.',
    narration: 'Trace the paired caudal cardinal channels from the common cardinal region toward the caudal body. At CS15 the caudal extension is nearly complete and a mesonephric venous plexus begins to develop from these channels. The model labels the pathway caudal cardinal in accordance with the 2015 human reconstruction; conventional texts often use posterior cardinal for the early paired system.',
    askLearners: 'In the 2015 human reconstruction, when does the caudal extension approach completion?'
  },
  {
    id: 'subcardinal-mesonephric-plexus',
    title: 'Identify the subcardinal plexus',
    stageId: 'cs15',
    profile: 'human-2017',
    cardinalModel: 'human-cardinal-2015',
    camera: 'posterior',
    selectedStructure: 'subcardinal-mesonephric-plexus',
    visibleLayers: [
      ...CONTEXT,
      'dorsal-aorta',
      'mesonephros-right',
      'mesonephros-left',
      'caudal-cardinal-veins',
      'subcardinal-mesonephric-plexus',
      'iliac-venous-confluence'
    ],
    learningPoint: 'The human 2015 study describes the subcardinal plexus developing in and around the mesonephroi from CS15 as a ventral outgrowth of the caudal cardinal system.',
    narration: 'Inspect the paired mesonephroi and the plexus around them. In the 2015 reconstruction, the subcardinal system is not treated as a wholly independent pair appearing without connection: it develops as a plexus continuous with the caudal cardinal veins. The visible paths are simplified centre-lines, not a histological capillary reconstruction.',
    askLearners: 'Where is the developing subcardinal plexus positioned relative to the mesonephroi?'
  },
  {
    id: 'subcardinal-longitudinal-and-renal-connection',
    title: 'Trace subcardinal channels and their cross-connection',
    stageId: 'cs16',
    profile: 'human-2017',
    cardinalModel: 'human-cardinal-2015',
    camera: 'posterior',
    selectedStructure: 'intersubcardinal-anastomosis',
    visibleLayers: [
      ...CONTEXT,
      'dorsal-aorta',
      'mesonephros-right',
      'mesonephros-left',
      'caudal-cardinal-veins',
      'subcardinal-mesonephric-plexus',
      'subcardinal-longitudinal-veins',
      'intersubcardinal-anastomosis',
      'iliac-venous-confluence'
    ],
    learningPoint: 'At CS16 the 2015 human reconstruction identifies longitudinal subcardinal channels and early intersubcardinal anastomoses.',
    narration: 'Follow the ventromedial longitudinal channels along the mesonephroi. The transverse intersubcardinal connection is placed just caudal to the superior mesenteric artery in the cited reconstruction. This is an early renal-region connection, not the complete adult renal collar or a completed IVC. The later hepatosubcardinal junction and final caval remodeling occur beyond the current CS16 timeline.',
    askLearners: 'Why should this CS16 connection not yet be labelled the complete adult renal collar?'
  },
  {
    id: 'textbook-supracardinal-comparison',
    title: 'Compare the conventional supracardinal model',
    stageId: 'cs16',
    profile: 'human-2017',
    cardinalModel: 'textbook-segmental',
    camera: 'posterior',
    selectedStructure: 'textbook-supracardinal-veins',
    visibleLayers: [
      ...CONTEXT,
      'dorsal-aorta',
      'mesonephros-right',
      'mesonephros-left',
      'caudal-cardinal-veins',
      'subcardinal-longitudinal-veins',
      'intersubcardinal-anastomosis',
      'textbook-supracardinal-veins',
      'iliac-venous-confluence'
    ],
    learningPoint: 'The conventional four-segment IVC model assigns the infrarenal segment to the right supracardinal vein and the thoracic azygos system to supracardinal channels.',
    narration: 'Switching to the conventional segmental model reveals the paired supracardinal channels. In this interpretation, the right-sided channel contributes to the infrarenal IVC and thoracic supracardinal pathways contribute to the azygos system. This model is shown as an alternative interpretation, not as an extra layer to add to the 2015 human reconstruction.',
    askLearners: 'Which embryonic channel is traditionally assigned to the infrarenal IVC in the conventional model?'
  },
  {
    id: 'human-cardinal-2015-comparison',
    title: 'Compare the 2015 human cardinal reconstruction',
    stageId: 'cs16',
    profile: 'human-2017',
    cardinalModel: 'human-cardinal-2015',
    camera: 'posterior',
    selectedStructure: 'caudal-cardinal-veins',
    visibleLayers: [
      ...CONTEXT,
      'dorsal-aorta',
      'mesonephros-right',
      'mesonephros-left',
      'caudal-cardinal-veins',
      'subcardinal-mesonephric-plexus',
      'subcardinal-longitudinal-veins',
      'intersubcardinal-anastomosis',
      'iliac-venous-confluence'
    ],
    learningPoint: 'The 2015 human reconstruction interprets the infrarenal IVC and azygos system as continuations of caudal cardinal veins, with the renal region arising from the subcardinal system.',
    narration: 'The supracardinal layer is now hidden. The caudal cardinal veins extend toward the pelvis; their later right-sided continuation contributes to the infrarenal caval pathway, while their cranial remnants form the azygos system. The subcardinal system contributes to the renal region. These final transformations are not yet animated because the current timeline ends at CS16; later CS18–CS23 stages are a separate implementation task.',
    askLearners: 'What is the main difference between the 2015 human reconstruction and the conventional supracardinal interpretation?'
  }];