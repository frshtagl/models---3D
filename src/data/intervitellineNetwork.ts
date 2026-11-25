import type { EvidenceProfile } from './stages';
import {
  VITELLINE_NODES,
  VITELLINE_SEGMENTS
} from './vitellineNetwork';
import type { Point3, VitellineStageId } from './vitellineNetwork';

export type AnastomosisState =
  | 'not-yet-visible'
  | 'developing'
  | 'persistent'
  | 'transient'
  | 'regressing'
  | 'not-distinct'
  | 'not-resolved'
  | 'not-in-profile';

export type AnastomosisRegion =
  | 'subhepatic-cranial-ventral'
  | 'middle-dorsal-retroduodenal'
  | 'caudal-ventral'
  | 'subdiaphragmatic'
  | 'human-dorsal-extrahepatic'
  | 'human-transient-ventral';

export interface IntervitellineStageStates {
  cs10: AnastomosisState;
  cs12: AnastomosisState;
  cs13: AnastomosisState;
  cs14: AnastomosisState;
  cs15: AnastomosisState;
  cs16: AnastomosisState;
}

export interface IntervitellineAnastomosis {
  id: string;
  name: string;
  shortName: string;
  region: AnastomosisRegion;
  profile: EvidenceProfile;
  description: string;
  topologyRole: string;
  fromNode: string;
  toNode: string;
  points: readonly Point3[];
  radius: number;
  color: string;
  states: Record<EvidenceProfile, IntervitellineStageStates>;
  evidence: Record<EvidenceProfile, string>;
  sourceIds: readonly string[];
}

export interface AnastomosisPresentation {
  state: AnastomosisState;
  statusLabel: string;
  opacity: number;
  radiusScale: number;
  visible: boolean;
}

export interface IntervitellineLandmark {
  id: string;
  name: string;
  position: Point3;
  description: string;
  appearsFrom: VitellineStageId;
  sourceIds: readonly string[];
}

const point = (x: number, y: number, z: number): Point3 => [x, y, z];
const notInProfile = (): IntervitellineStageStates => ({
  cs10: 'not-in-profile',
  cs12: 'not-in-profile',
  cs13: 'not-in-profile',
  cs14: 'not-in-profile',
  cs15: 'not-in-profile',
  cs16: 'not-in-profile'
});

const stateMap = (
  classical: IntervitellineStageStates,
  human: IntervitellineStageStates
): Record<EvidenceProfile, IntervitellineStageStates> => ({
  'classical-2008': classical,
  'human-2017': human
});

const allHiddenClassical = notInProfile();
const allHiddenHuman = notInProfile();

export const INTERVITELLINE_LANDMARKS: IntervitellineLandmark[] = [
  {
    id: 'dorsal-pancreatic-bud',
    name: 'Dorsal pancreatic bud',
    position: point(0.02, 0.2, 0.64),
    description: 'A small schematic landmark placed dorsal to the duodenal reference. In the 2017 reconstruction, the dorsal extrahepatic intervitelline anastomosis is described just caudal to this bud. The bud is a positional landmark, not a full pancreatic model.',
    appearsFrom: 'cs13',
    sourceIds: ['HIKSPOORS2017']
  }
];

const attachmentMap: Record<string, string> = {
  'node-right-iva-subhepatic': 'vitelline-right-extrahepatic',
  'node-left-iva-subhepatic': 'vitelline-left-extrahepatic',
  'node-right-iva-middle-dorsal': 'vitelline-right-extrahepatic',
  'node-left-iva-middle-dorsal': 'vitelline-left-extrahepatic',
  'node-right-iva-caudal-ventral': 'vitelline-right-extrahepatic',
  'node-left-iva-caudal-ventral': 'vitelline-left-extrahepatic',
  'node-right-iva-subdiaphragmatic': 'vitelline-right-hepatocardiac',
  'node-left-iva-subdiaphragmatic': 'vitelline-left-hepatocardiac',
  'node-right-iva-human-ventral': 'vitelline-right-extrahepatic',
  'node-left-iva-human-ventral': 'vitelline-left-extrahepatic'
};

const anastomosis = (
  id: string,
  name: string,
  shortName: string,
  region: AnastomosisRegion,
  profile: EvidenceProfile,
  description: string,
  topologyRole: string,
  fromNode: string,
  toNode: string,
  points: readonly Point3[],
  color: string,
  states: Record<EvidenceProfile, IntervitellineStageStates>,
  evidence: Record<EvidenceProfile, string>,
  sourceIds: readonly string[],
  radius = 0.038
): IntervitellineAnastomosis => ({
  id, name, shortName, region, profile, description, topologyRole,
  fromNode, toNode, points, color, radius, states, evidence, sourceIds
});

export const INTERVITELLINE_ANASTOMOSES: IntervitellineAnastomosis[] = [
  anastomosis(
    'classical-subhepatic-anastomosis',
    'Superior / subhepatic intervitelline anastomosis',
    'Subhepatic · cranial ventral',
    'subhepatic-cranial-ventral',
    'classical-2008',
    'The cranial-most prehepatic connection in the classical four-connection scheme. It crosses ventral to the duodenum, immediately beneath the hepatic primordium. In the classical account this connection later enlarges and is described as the portal sinus / sinus intermedius.',
    'Classical prehepatic connection · subhepatic · ventral to duodenum',
    'node-left-iva-subhepatic',
    'node-right-iva-subhepatic',
    [
      point(-0.996, 0.62, 0.22),
      point(-0.78, 0.64, -0.25),
      point(-0.55, 0.66, -0.58),
      point(-0.25, 0.67, -0.68),
      point(0, 0.67, -0.7),
      point(0.25, 0.67, -0.68),
      point(0.55, 0.66, -0.58),
      point(0.78, 0.64, -0.25),
      point(0.996, 0.62, 0.22)
    ],
    '#5bc9a8',
    stateMap(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'persistent', cs15: 'persistent', cs16: 'persistent' },
      allHiddenHuman
    ),
    {
      'classical-2008': 'Collardeau-Frachon and Scoazec place the superior / subhepatic anastomosis on the ventral side of the duodenal segment, beneath the hepatic primordium. Their classical account describes its later transformation into the portal sinus (sinus intermedius). The CS13–CS16 display bins are a schematic teaching chronology, not exact observed onset dates.',
      'human-2017': 'Not drawn as a left-to-right intervitelline connection in the 2017 human reconstruction. Its portal-sinus account is different: a left umbilical-to-right vitelline shunt develops intrahepatically.'
    },
    ['CF2008']
  ),
  anastomosis(
    'classical-middle-dorsal-anastomosis',
    'Middle / dorsal (retroduodenal) intervitelline anastomosis',
    'Middle · dorsal',
    'middle-dorsal-retroduodenal',
    'classical-2008',
    'The middle prehepatic connection passes dorsal / posterior to the duodenum. It is the first of the three prehepatic connections described in the classical account and forms the dorsal limb of the teaching-model figure-of-eight arrangement.',
    'Classical prehepatic connection · retroduodenal · dorsal to duodenum',
    'node-left-iva-middle-dorsal',
    'node-right-iva-middle-dorsal',
    [
      point(-1.076, -0.1, 0.037),
      point(-0.76, -0.1, 0.39),
      point(-0.42, -0.1, 0.66),
      point(0, -0.1, 0.74),
      point(0.42, -0.1, 0.66),
      point(0.76, -0.1, 0.39),
      point(1.076, -0.1, 0.037)
    ],
    '#5bc9a8',
    stateMap(
      { cs10: 'not-yet-visible', cs12: 'developing', cs13: 'persistent', cs14: 'persistent', cs15: 'persistent', cs16: 'persistent' },
      allHiddenHuman
    ),
    {
      'classical-2008': 'The review describes the middle / retro-duodenal anastomosis as the first to appear, in a 3.5–4 mm embryo, and locates it dorsal to the duodenum. The classical portal-trunk construction retains this middle dorsal connection as a segment of the portal vein. Its display at CS12 is an approximate stage bin for the reported size range.',
      'human-2017': 'The 2017 study describes a dorsal extrahepatic anastomosis at a similar topographic level, but it is a separately sourced reconstruction finding and is rendered as a different layer.'
    },
    ['CF2008']
  ),
  anastomosis(
    'classical-caudal-ventral-anastomosis',
    'Inferior / caudal-ventral intervitelline anastomosis',
    'Caudal · ventral',
    'caudal-ventral',
    'classical-2008',
    'The most caudal prehepatic connection crosses ventral to the distal duodenal segment. It completes the classical three-prehepatic-connection arrangement but is not included as a persistent segment in the classical portal-trunk construction.',
    'Classical prehepatic connection · inferior · ventral to distal duodenum',
    'node-left-iva-caudal-ventral',
    'node-right-iva-caudal-ventral',
    [
      point(-0.99, -0.78, -0.18),
      point(-0.7, -0.78, -0.39),
      point(-0.35, -0.78, -0.58),
      point(0, -0.78, -0.66),
      point(0.35, -0.78, -0.58),
      point(0.7, -0.78, -0.39),
      point(0.99, -0.78, -0.18)
    ],
    '#5bc9a8',
    stateMap(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'persistent', cs15: 'not-resolved', cs16: 'not-resolved' },
      allHiddenHuman
    ),
    {
      'classical-2008': 'The review locates the inferior prehepatic anastomosis on the ventral side of the distal duodenum and reports it in a 5-mm embryo. It is not one of the three segments listed in the review as forming the definitive portal trunk. Later states are marked not separately resolved rather than asserting a specimen-observed regression date.',
      'human-2017': 'The 2017 reconstruction reports a distinct, smaller and more caudal ventral connection during CS14 only. That observation is rendered separately and must not be conflated with this classical inferior anastomosis.'
    },
    ['CF2008']
  ),
  anastomosis(
    'classical-subdiaphragmatic-anastomosis',
    'Subdiaphragmatic intervitelline anastomosis',
    'Subdiaphragmatic',
    'subdiaphragmatic',
    'classical-2008',
    'A cranial connection between the vitelline channels, above the hepatic primordium and immediately below the sinus venosus. It receives the classical venae revehentes and provides the cranial outflow route in the symmetrical-stage teaching model.',
    'Classical cranial connection · above liver · below sinus venosus',
    'node-left-iva-subdiaphragmatic',
    'node-right-iva-subdiaphragmatic',
    [
      point(-0.38, 2.44, 0.217),
      point(-0.26, 2.45, 0.39),
      point(-0.12, 2.45, 0.52),
      point(0, 2.45, 0.57),
      point(0.12, 2.45, 0.52),
      point(0.26, 2.45, 0.39),
      point(0.38, 2.44, 0.217)
    ],
    '#5bc9a8',
    stateMap(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'persistent', cs15: 'persistent', cs16: 'persistent' },
      allHiddenHuman
    ),
    {
      'classical-2008': 'The review locates the subdiaphragmatic anastomosis above the hepatic primordium and immediately beneath the sinus venosus. The venae revehentes drain toward this connection, from which blood passes to the sinus venosus.',
      'human-2017': 'The human reconstruction describes rightward dominance and remodeling of the hepatocardiac channels but does not identify this classical left-to-right subdiaphragmatic intervitelline bridge as a separate connection.'
    },
    ['CF2008']
  ),
  anastomosis(
    'human-dorsal-extrahepatic-anastomosis',
    'Dorsal extrahepatic intervitelline anastomosis — human reconstruction',
    'Human · dorsal',
    'human-dorsal-extrahepatic',
    'human-2017',
    'A dorsal left-to-right extrahepatic connection located just caudal to the dorsal pancreatic bud. It is shown as its own human-reconstruction layer, not as a relabelled classical middle anastomosis.',
    'Human reconstruction · dorsal to duodenum · caudal to dorsal pancreatic bud',
    'node-left-iva-middle-dorsal',
    'node-right-iva-middle-dorsal',
    [
      point(-1.076, -0.1, 0.037),
      point(-0.76, -0.12, 0.42),
      point(-0.42, -0.12, 0.68),
      point(0, -0.12, 0.76),
      point(0.42, -0.12, 0.68),
      point(0.76, -0.12, 0.42),
      point(1.076, -0.1, 0.037)
    ],
    '#e7b86a',
    stateMap(
      allHiddenClassical,
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'persistent', cs15: 'not-resolved', cs16: 'not-resolved' }
    ),
    {
      'classical-2008': 'Not drawn as a separate reconstruction-specific connection in the classical profile. Use the classical middle / dorsal anastomosis instead.',
      'human-2017': 'Hikspoors et al. report a dorsal anastomosis just caudal to the dorsal pancreatic bud at CS13, well formed by early CS14. The source does not separately trace its later fate in the sampled description; CS15–CS16 are therefore marked not separately resolved, not regressed.'
    },
    ['HIKSPOORS2017']
  ),
  anastomosis(
    'human-transient-ventral-anastomosis',
    'Transient ventral intervitelline anastomosis — human reconstruction',
    'Human · transient ventral',
    'human-transient-ventral',
    'human-2017',
    'A much smaller ventral connection, more caudal than the dorsal anastomosis and just below the liver. The 2017 human reconstruction reports it temporarily during CS14 only.',
    'Human reconstruction · ventral to duodenum · caudal to dorsal connection',
    'node-left-iva-human-ventral',
    'node-right-iva-human-ventral',
    [
      point(-1.041, -0.54, -0.094),
      point(-0.72, -0.54, -0.34),
      point(-0.36, -0.54, -0.53),
      point(0, -0.54, -0.59),
      point(0.36, -0.54, -0.53),
      point(0.72, -0.54, -0.34),
      point(1.041, -0.54, -0.094)
    ],
    '#e7b86a',
    stateMap(
      allHiddenClassical,
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'not-yet-visible', cs14: 'transient', cs15: 'not-distinct', cs16: 'not-distinct' }
    ),
    {
      'classical-2008': 'Not drawn as a separate human-reconstruction feature in the classical profile. The classical inferior prehepatic anastomosis is a different named teaching-model structure.',
      'human-2017': 'Hikspoors et al. describe a much smaller ventral anastomosis, more caudal than the established dorsal connection and just below the liver, temporarily present during CS14 only.'
    },
    ['HIKSPOORS2017'],
    0.026
  )
];

const PRESENTATION: Record<AnastomosisState, Omit<AnastomosisPresentation, 'state'>> = {
  'not-yet-visible': { statusLabel: 'Not yet represented at this stage', opacity: 0, radiusScale: 0, visible: false },
  developing: { statusLabel: 'Developing · schematic stage bin', opacity: 0.72, radiusScale: 0.9, visible: true },
  persistent: { statusLabel: 'Present in this evidence profile', opacity: 0.96, radiusScale: 1, visible: true },
  transient: { statusLabel: 'Transient · reported in CS14 only', opacity: 0.94, radiusScale: 0.82, visible: true },
  regressing: { statusLabel: 'Regressing as a distinct connection', opacity: 0.48, radiusScale: 0.72, visible: true },
  'not-distinct': { statusLabel: 'No longer distinct in this profile', opacity: 0, radiusScale: 0, visible: false },
  'not-resolved': { statusLabel: 'Not separately resolved by this source', opacity: 0, radiusScale: 0, visible: false },
  'not-in-profile': { statusLabel: 'Not included in this evidence profile', opacity: 0, radiusScale: 0, visible: false }
};

export function getIntervitellinePresentation(
  item: IntervitellineAnastomosis,
  profile: EvidenceProfile,
  stageId: VitellineStageId
): AnastomosisPresentation {
  const state = item.states[profile][stageId];
  return { state, ...PRESENTATION[state] };
}

const STAGE_IDS: VitellineStageId[] = ['cs10', 'cs12', 'cs13', 'cs14', 'cs15', 'cs16'];
const EPSILON = 0.0002;

function samePoint(a: Point3, b: Point3): boolean {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) <= EPSILON;
}

function findNode(id: string) {
  return VITELLINE_NODES.find((node) => node.id === id);
}

function findSegment(id: string) {
  return VITELLINE_SEGMENTS.find((segment) => segment.id === id);
}

export function validateIntervitellineNetwork(): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  const knownNodes = new Set(VITELLINE_NODES.map((node) => node.id));

  for (const item of INTERVITELLINE_ANASTOMOSES) {
    if (ids.has(item.id)) issues.push('Duplicate intervitelline anastomosis ID: ' + item.id);
    ids.add(item.id);

    if (item.points.length < 4) issues.push(item.id + ' needs a curved centerline with at least four points');
    if (item.radius <= 0) issues.push(item.id + ' must have a positive vessel radius');
    if (!knownNodes.has(item.fromNode)) issues.push(item.id + ' has a missing left attachment node');
    if (!knownNodes.has(item.toNode)) issues.push(item.id + ' has a missing right attachment node');

    const from = findNode(item.fromNode);
    const to = findNode(item.toNode);
    if (from && item.points.length && !samePoint(item.points[0], from.position)) {
      issues.push(item.id + ' centerline does not begin at its declared attachment node');
    }
    if (to && item.points.length && !samePoint(item.points[item.points.length - 1], to.position)) {
      issues.push(item.id + ' centerline does not end at its declared attachment node');
    }

    for (const nodeId of [item.fromNode, item.toNode]) {
      const parentId = attachmentMap[nodeId];
      const node = findNode(nodeId);
      const parent = parentId ? findSegment(parentId) : undefined;
      if (!parentId || !parent || !node) {
        issues.push(item.id + ' attachment ' + nodeId + ' is not mapped to an existing vitelline segment');
      } else if (!parent.points.some((candidate) => samePoint(candidate, node.position))) {
        issues.push(item.id + ' attachment ' + nodeId + ' is not embedded in ' + parentId + ' centerline');
      }
    }

    for (const profile of ['classical-2008', 'human-2017'] as const) {
      for (const stage of STAGE_IDS) {
        if (!item.states[profile][stage]) issues.push(item.id + ' has no state for ' + profile + ' / ' + stage);
        const shouldBeHidden = profile !== item.profile;
        if (shouldBeHidden && item.states[profile][stage] !== 'not-in-profile') {
          issues.push(item.id + ' leaks into the incompatible evidence profile ' + profile);
        }
        if (!shouldBeHidden && item.states[profile][stage] === 'not-in-profile') {
          issues.push(item.id + ' is incorrectly marked outside its own evidence profile');
        }
      }
    }

    const middle = item.points[Math.floor(item.points.length / 2)];
    if (item.region.includes('dorsal') && middle[2] <= 0.3) {
      issues.push(item.id + ' is not positioned dorsal / posterior to the gut reference (+Z)');
    }
    if (item.region.includes('ventral') && middle[2] >= -0.3) {
      issues.push(item.id + ' is not positioned ventral / anterior to the gut reference (-Z)');
    }
  }

  const humanDorsal = INTERVITELLINE_ANASTOMOSES.find((item) => item.id === 'human-dorsal-extrahepatic-anastomosis');
  const humanVentral = INTERVITELLINE_ANASTOMOSES.find((item) => item.id === 'human-transient-ventral-anastomosis');
  const pancreas = INTERVITELLINE_LANDMARKS.find((item) => item.id === 'dorsal-pancreatic-bud');
  if (humanDorsal && pancreas && !(humanDorsal.points[3][1] < pancreas.position[1])) {
    issues.push('The human dorsal anastomosis is not caudal to the dorsal pancreatic bud');
  }
  if (humanDorsal && humanVentral && !(humanVentral.points[3][1] < humanDorsal.points[3][1])) {
    issues.push('The human transient ventral connection is not caudal to the dorsal connection');
  }

  return issues;
}

export const INTERVITELLINE_NETWORK_ISSUES = validateIntervitellineNetwork();
