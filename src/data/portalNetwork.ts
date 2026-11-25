import type { EvidenceProfile } from './stages';
import {
  VITELLINE_NODES,
  VITELLINE_SEGMENTS
} from './vitellineNetwork';
import type { Point3, VitellineStageId } from './vitellineNetwork';
import { INTERVITELLINE_ANASTOMOSES } from './intervitellineNetwork';

export type PortalState =
  | 'not-yet-visible'
  | 'developing'
  | 'present'
  | 'expanding'
  | 'persistent'
  | 'regressing'
  | 'not-resolved'
  | 'not-in-profile';

export interface PortalStageStates {
  cs10: PortalState;
  cs12: PortalState;
  cs13: PortalState;
  cs14: PortalState;
  cs15: PortalState;
  cs16: PortalState;
}

export interface PortalNode {
  id: string;
  label: string;
  position: Point3;
  description: string;
  parentSegmentId?: string;
}

export interface PortalPath {
  id: string;
  fromNode: string;
  toNode: string;
  points: readonly Point3[];
  radiusScale?: number;
}

export interface PortalVascularLayer {
  id: string;
  name: string;
  shortName: string;
  category: 'vessel' | 'landmark' | 'context';
  description: string;
  status: string;
  color: string;
  radius: number;
  profile: EvidenceProfile | 'both';
  paths: readonly PortalPath[];
  states: Record<EvidenceProfile, PortalStageStates>;
  evidence: Record<EvidenceProfile, string>;
  sourceIds: readonly string[];
  postnatalFate?: string;
}

export interface PortalPresentation {
  state: PortalState;
  statusLabel: string;
  opacity: number;
  radiusScale: number;
  visible: boolean;
}

export interface PortalLandmark {
  id: string;
  name: string;
  shortName: string;
  category: 'landmark' | 'context';
  position: Point3;
  description: string;
  color: string;
  appearsFrom: VitellineStageId;
  sourceIds: readonly string[];
}

const point = (x: number, y: number, z: number): Point3 => [x, y, z];
const STAGES: VitellineStageId[] = ['cs10', 'cs12', 'cs13', 'cs14', 'cs15', 'cs16'];

const notInProfile = (): PortalStageStates => ({
  cs10: 'not-in-profile',
  cs12: 'not-in-profile',
  cs13: 'not-in-profile',
  cs14: 'not-in-profile',
  cs15: 'not-in-profile',
  cs16: 'not-in-profile'
});

const states = (
  classical: PortalStageStates,
  human: PortalStageStates
): Record<EvidenceProfile, PortalStageStates> => ({
  'classical-2008': classical,
  'human-2017': human
});

const classicalHidden = notInProfile();
const humanHidden = notInProfile();

export const PORTAL_NODES: PortalNode[] = [
  {
    id: 'node-mesenteric-portal-root',
    label: 'Developing midgut mesenteric venous root',
    position: point(-1.72, -1.02, -0.55),
    description: 'Schematic origin in the left-sided developing midgut mesentery. The point is a teaching anchor, not a specimen-measured coordinate.'
  },
  {
    id: 'node-left-portal-entry',
    label: 'Portal precursor entry into left vitelline vein',
    position: point(-1.08, -0.36, -0.03),
    description: 'The human reconstruction places the small left-sided midgut-derived portal precursor just upstream of the dorsal intervitelline anastomosis.',
    parentSegmentId: 'vitelline-left-extrahepatic'
  },
  {
    id: 'node-right-portal-sinus-attachment',
    label: 'Right vitelline portal-sinus attachment',
    position: point(0.82, 1.48, 0.4),
    description: 'Schematic attachment on the right intrahepatic vitelline (portal) conduit.',
    parentSegmentId: 'vitelline-right-intrahepatic'
  },
  {
    id: 'node-left-umbilical-root',
    label: 'Left umbilical vein — umbilical entry',
    position: point(-0.25, -2.35, -1.0),
    description: 'Placental / connecting-stalk end of the persistent left umbilical vein. The paired right umbilical vein and early sinus-horn connections are represented in the separate umbilical module.'
  },
  {
    id: 'node-left-umbilical-hilum',
    label: 'Left umbilical vein — hepatic hilum',
    position: point(-0.72, 1.22, -0.28),
    description: 'Schematic hepatic-hilar end of the left umbilical vein, where the portal sinus and left-sided portal branches are represented.'
  },
  {
    id: 'node-left-portal-branch-cranial',
    label: 'Left portal branch — cranial distribution',
    position: point(-1.32, 1.92, 0.08),
    description: 'Schematic left-lobe portal branch endpoint.'
  },
  {
    id: 'node-left-portal-branch-caudal',
    label: 'Left portal branch — caudal distribution',
    position: point(-1.18, 1.38, 0.18),
    description: 'Schematic left-sided ventromedial portal branch endpoint.'
  },
  {
    id: 'node-right-portal-branch-cranial',
    label: 'Right portal branch — cranial distribution',
    position: point(1.36, 1.92, 0.14),
    description: 'Schematic right-lobe portal branch endpoint.'
  },
  {
    id: 'node-right-portal-branch-caudal',
    label: 'Right portal branch — caudal distribution',
    position: point(1.22, 1.36, 0.16),
    description: 'Schematic right-sided ventromedial portal branch endpoint.'
  },
  {
    id: 'node-gallbladder-cantlie',
    label: 'Gallbladder / Cantlie boundary landmark',
    position: point(0.05, 1.13, -0.43),
    description: 'The gallbladder is used as a visible landmark for the hepatic vascular midline described in the 2017 reconstruction.'
  },
  {
    id: 'node-cantlie-cranial-guide',
    label: 'Cantlie boundary cranial guide point',
    position: point(0.18, 2.18, 0.22),
    description: 'Schematic cranial end of the Cantlie boundary teaching guide.'
  }
];

const pointOn = (segmentId: string, candidate: Point3): boolean => {
  const segment = VITELLINE_SEGMENTS.find((item) => item.id === segmentId);
  return Boolean(segment?.points.some((p) =>
    Math.hypot(p[0] - candidate[0], p[1] - candidate[1], p[2] - candidate[2]) < 0.0002
  ));
};

const classicalDorsal = INTERVITELLINE_ANASTOMOSES.find(
  (item) => item.id === 'classical-middle-dorsal-anastomosis'
);
const humanDorsal = INTERVITELLINE_ANASTOMOSES.find(
  (item) => item.id === 'human-dorsal-extrahepatic-anastomosis'
);
const classicalSubhepatic = INTERVITELLINE_ANASTOMOSES.find(
  (item) => item.id === 'classical-subhepatic-anastomosis'
);
if (!classicalDorsal || !humanDorsal || !classicalSubhepatic) {
  throw new Error('Portal network requires both profile-specific dorsal intervitelline anastomoses.');
}

const classicalLeftVitellineLimb: readonly Point3[] = [
  point(-0.86, -1.12, -0.32),
  point(-0.99, -0.78, -0.18),
  point(-1.041, -0.54, -0.094),
  point(-1.08, -0.36, -0.03),
  point(-1.076, -0.1, 0.037)
];

const classicalRightVitellineLimb: readonly Point3[] = [
  point(1.076, -0.1, 0.037),
  point(1.07, 0.3, 0.14),
  point(0.996, 0.62, 0.22)
];

const humanRightExtrahepaticLimb: readonly Point3[] = [
  point(1.076, -0.1, 0.037),
  point(1.07, 0.3, 0.14),
  point(0.996, 0.62, 0.22),
  point(0.92, 0.95, 0.3)
];

const humanRightIntrahepaticLimb: readonly Point3[] = [
  point(0.92, 0.95, 0.3),
  point(0.98, 1.2, 0.36),
  point(0.82, 1.48, 0.4)
];

const portalLayer = (
  id: string,
  name: string,
  shortName: string,
  description: string,
  status: string,
  color: string,
  radius: number,
  profile: EvidenceProfile | 'both',
  paths: readonly PortalPath[],
  stageStates: Record<EvidenceProfile, PortalStageStates>,
  evidence: Record<EvidenceProfile, string>,
  sourceIds: readonly string[],
  category: PortalVascularLayer['category'] = 'vessel',
  postnatalFate?: string
): PortalVascularLayer => ({
  id, name, shortName, category, description, status, color, radius,
  profile, paths, states: stageStates, evidence, sourceIds, postnatalFate
});

export const PORTAL_VASCULAR_LAYERS: PortalVascularLayer[] = [
  portalLayer(
    'classical-portal-trunk',
    'Classical portal vein trunk — three retained vitelline segments',
    'Classical portal trunk',
    'A highlighted composite pathway from the left vitelline segment, across the middle retroduodenal anastomosis, and into the right vitelline segment up to the subhepatic anastomosis. The gold overlay identifies the three classical components; it is not an additional fourth vessel.',
    'Classical 2008 synthesis · portal trunk',
    '#f2c76a',
    0.108,
    'classical-2008',
    [
      { id: 'classical-left-vitelline-segment', fromNode: 'node-left-caudal', toNode: 'node-left-iva-middle-dorsal', points: classicalLeftVitellineLimb },
      { id: 'classical-middle-retroduodenal-segment', fromNode: 'node-left-iva-middle-dorsal', toNode: 'node-right-iva-middle-dorsal', points: classicalDorsal.points },
      { id: 'classical-right-vitelline-segment', fromNode: 'node-right-iva-middle-dorsal', toNode: 'node-right-iva-subhepatic', points: classicalRightVitellineLimb }
    ],
    states(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'developing', cs15: 'present', cs16: 'persistent' },
      humanHidden
    ),
    {
      'classical-2008': 'Collardeau-Frachon and Scoazec describe the classical portal trunk, from caudal to cranial, as: (1) the left vitelline segment from the mesenteric-vein termination to the middle intervitelline anastomosis; (2) the middle / retroduodenal anastomosis; and (3) the right vitelline segment between the middle and subhepatic anastomoses. The remaining vitelline segments collapse in this account. The CS13–CS16 display is a broad teaching chronology, not a claim that each segment first appears at an exact CS date.',
      'human-2017': 'Not used as the same three-segment vestigial construction in the 2017 human reconstruction. Use the separately modeled left-sided midgut-derived precursor and right vitelline continuation.'
    },
    ['CF2008']
  ),
  portalLayer(
    'human-portal-trunk',
    'Human portal vein pathway — midgut precursor and right vitelline continuation',
    'Human portal pathway',
    'A highlighted pathway from a small left-sided midgut-derived venous precursor into the left vitelline vein, across the dorsal extrahepatic anastomosis, and along the right vitelline conduit. It is kept separate from the classical three-segment lineage model.',
    'Human 3D reconstruction · 2017',
    '#f2c76a',
    0.105,
    'human-2017',
    [
      {
        id: 'human-midgut-derived-portal-precursor',
        fromNode: 'node-mesenteric-portal-root',
        toNode: 'node-left-portal-entry',
        points: [
          point(-1.72, -1.02, -0.55),
          point(-1.52, -0.88, -0.42),
          point(-1.3, -0.66, -0.23),
          point(-1.08, -0.36, -0.03)
        ]
      },
      {
        id: 'human-left-vitelline-portal-limb',
        fromNode: 'node-left-portal-entry',
        toNode: 'node-left-iva-middle-dorsal',
        points: [
          point(-1.08, -0.36, -0.03),
          point(-1.076, -0.1, 0.037)
        ]
      },
      {
        id: 'human-dorsal-intervitelline-crossing',
        fromNode: 'node-left-iva-middle-dorsal',
        toNode: 'node-right-iva-middle-dorsal',
        points: humanDorsal.points
      },
      {
        id: 'human-right-vitelline-extrahepatic-limb',
        fromNode: 'node-right-iva-middle-dorsal',
        toNode: 'node-right-hepatic-entry',
        points: humanRightExtrahepaticLimb
      },
      {
        id: 'human-right-vitelline-intrahepatic-continuation',
        fromNode: 'node-right-hepatic-entry',
        toNode: 'node-right-portal-sinus-attachment',
        points: humanRightIntrahepaticLimb
      }
    ],
    states(
      humanHidden,
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'present', cs15: 'persistent', cs16: 'persistent' }
    ),
    {
      'classical-2008': 'Not presented as the classical three-segment vestigial trunk. The 2017 reconstruction identifies a small left-sided vein from the developing midgut mesentery entering the left vitelline vein just upstream of the dorsal intervitelline anastomosis; the dorsal connection accounts for the portal vein crossing behind the duodenum.',
      'human-2017': 'Hikspoors et al. describe the future extrahepatic portal vein as a small left-sided vein from the developing midgut mesentery draining into the left vitelline vein just upstream of the dorsal anastomosis. The right vitelline conduit remains identifiable and contributes to the portal pathway. This composite path is a teaching overlay on the vitelline vessels, not a claim that the authors traced every millimetre of a single uninterrupted portal trunk in each specimen.'
    },
    ['HIKSPOORS2017']
  ),
  portalLayer(
    'left-umbilical-vein',
    'Left umbilical vein — simplified portal inflow context',
    'Left umbilical vein',
    'A simplified persistent left umbilical-vein path from the placental entry to the hepatic hilum. The right umbilical vein and the early left sinus-horn connection are modeled separately in umbilicalNetwork.ts; this layer is reused by the paired-system lessons rather than duplicated.',
    'Persistent left umbilical inflow · paired system',
    '#b49de2',
    0.078,
    'both',
    [
      {
        id: 'left-umbilical-inflow',
        fromNode: 'node-left-umbilical-root',
        toNode: 'node-left-umbilical-hilum',
        points: [
          point(-0.25, -2.35, -1.0),
          point(-0.3, -1.8, -0.9),
          point(-0.42, -1.2, -0.78),
          point(-0.55, -0.55, -0.62),
          point(-0.68, 0.15, -0.44),
          point(-0.72, 1.22, -0.28)
        ]
      }
    ],
    states(
      { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' },
      { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' }
    ),
    {
      'classical-2008': 'The 2008 synthesis describes the left umbilical vein enlarging, continuing through the liver, and connecting with the left angle of the subhepatic intervitelline anastomosis. The path here is simplified and is not a full reconstruction of both umbilical veins.',
      'human-2017': 'Hikspoors et al. describe the left umbilical vein as the dominant umbilical inflow. At early CS14 it forms intrahepatic connections with the vitelline conduits; the portal sinus and venous duct are distinct left-to-right shunts.'
    },
    ['CF2008', 'HIKSPOORS2017'],
    'context',
    'After birth, the persistent left umbilical vein closes and forms the ligamentum teres hepatis (round ligament of the liver).'
  ),
  portalLayer(
    'classical-portal-sinus',
    'Classical portal sinus — remodeled subhepatic anastomosis',
    'Classical portal sinus',
    'The classical portal-sinus layer highlights the subhepatic intervitelline anastomosis as it remodels into the portal sinus, plus the left umbilical-vein approach to its left angle. The retained rightward channel connects the portal trunk with the umbilical inflow.',
    'Classical 2008 synthesis · portal sinus',
    '#eea66d',
    0.092,
    'classical-2008',
    [
      {
        id: 'classical-subhepatic-portal-sinus-remnant',
        fromNode: 'node-left-iva-subhepatic',
        toNode: 'node-right-iva-subhepatic',
        points: classicalSubhepatic.points
      },
      {
        id: 'classical-left-umbilical-approach',
        fromNode: 'node-left-umbilical-hilum',
        toNode: 'node-left-iva-subhepatic',
        points: [
          point(-0.72, 1.22, -0.28),
          point(-0.8, 0.98, -0.12),
          point(-0.91, 0.76, 0.08),
          point(-0.996, 0.62, 0.22)
        ]
      }
    ],
    states(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'developing', cs15: 'persistent', cs16: 'persistent' },
      humanHidden
    ),
    {
      'classical-2008': 'The classical review describes the subhepatic anastomosis transforming into the portal sinus. Regression of its left half and enlargement of the remaining part are proposed; the left umbilical vein terminates at the left angle, while the portal trunk reaches the right angle. This layer highlights the subhepatic bridge and its left umbilical approach; it does not add a second independent intervitelline bridge.',
      'human-2017': 'Not drawn as a continuation of the classical subhepatic intervitelline bridge. The human reconstruction describes a de novo intrahepatic left umbilical-to-right vitelline shunt.'
    },
    ['CF2008']
  ),
  portalLayer(
    'human-portal-sinus',
    'Human portal sinus — intrahepatic umbilico-vitelline shunt',
    'Human portal sinus',
    'A separate intrahepatic connection from the left umbilical vein to the right vitelline (portal) conduit. It is not an intervitelline anastomosis and is not the same formation mechanism as the classical subhepatic bridge.',
    'Human 3D reconstruction · 2017',
    '#eea66d',
    0.092,
    'human-2017',
    [
      {
        id: 'human-umbilico-vitelline-portal-sinus',
        fromNode: 'node-left-umbilical-hilum',
        toNode: 'node-right-portal-sinus-attachment',
        points: [
          point(-0.72, 1.22, -0.28),
          point(-0.4, 1.42, -0.34),
          point(0, 1.55, -0.32),
          point(0.42, 1.62, -0.12),
          point(0.82, 1.48, 0.4)
        ]
      }
    ],
    states(
      classicalHidden,
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'not-yet-visible', cs14: 'developing', cs15: 'persistent', cs16: 'persistent' }
    ),
    {
      'classical-2008': 'Not drawn as the same de novo umbilico-vitelline shunt in this profile. The classical account describes the subhepatic intervitelline anastomosis becoming the portal sinus.',
      'human-2017': 'Hikspoors et al. describe a large intrahepatic left umbilical-to-right vitelline shunt at early / late CS14, after the left intrahepatic vitelline conduit is already regressing. It persists as the transverse part of the left portal vein.'
    },
    ['HIKSPOORS2017']
  ),
  portalLayer(
    'classical-left-portal-branches',
    'Classical left portal branches — portal sinus contribution',
    'Classical left portal branches',
    'Simplified left-sided intrahepatic portal branches connected to the left angle of the portal sinus / ramus angularis region.',
    'Classical 2008 synthesis · left portal branches',
    '#9e8cda',
    0.031,
    'classical-2008',
    [
      {
        id: 'classical-left-portal-cranial-branch',
        fromNode: 'node-left-iva-subhepatic',
        toNode: 'node-left-portal-branch-cranial',
        points: [point(-0.996, 0.62, 0.22), point(-1.12, 1.22, 0.12), point(-1.32, 1.92, 0.08)]
      },
      {
        id: 'classical-left-portal-caudal-branch',
        fromNode: 'node-left-iva-subhepatic',
        toNode: 'node-left-portal-branch-caudal',
        points: [point(-0.996, 0.62, 0.22), point(-1.12, 1.0, 0.06), point(-1.18, 1.38, 0.18)]
      }
    ],
    states(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'not-yet-visible', cs14: 'developing', cs15: 'expanding', cs16: 'persistent' },
      humanHidden
    ),
    {
      'classical-2008': 'The 2008 synthesis describes branches from the portal trunk and portal-sinus tributaries giving rise to the intrahepatic portal circulation. The left portal vein is derived from the portal sinus and its tributaries in the adult pattern. Branch geometry is illustrative.',
      'human-2017': 'Not shown as the left-sided umbilical-derived branch pattern in the classical profile.'
    },
    ['CF2008']
  ),
  portalLayer(
    'classical-right-portal-branches',
    'Classical right portal branches — vitelline contribution',
    'Classical right portal branches',
    'Simplified right-sided intrahepatic branches arising from the right vitelline-derived portal pathway.',
    'Classical 2008 synthesis · right portal branches',
    '#58b7d5',
    0.031,
    'classical-2008',
    [
      {
        id: 'classical-right-portal-cranial-branch',
        fromNode: 'node-right-iva-subhepatic',
        toNode: 'node-right-portal-branch-cranial',
        points: [point(0.996, 0.62, 0.22), point(1.16, 1.15, 0.22), point(1.36, 1.92, 0.14)]
      },
      {
        id: 'classical-right-portal-caudal-branch',
        fromNode: 'node-right-iva-subhepatic',
        toNode: 'node-right-portal-branch-caudal',
        points: [point(0.996, 0.62, 0.22), point(1.14, 1.0, 0.1), point(1.22, 1.36, 0.16)]
      }
    ],
    states(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'not-yet-visible', cs14: 'developing', cs15: 'expanding', cs16: 'persistent' },
      humanHidden
    ),
    {
      'classical-2008': 'The classical account identifies the right intrahepatic portal vein as a remnant of the primitive right vitelline vein. The branches shown are simplified teaching branches, not specimen-derived segmental anatomy.',
      'human-2017': 'Not used for the human reconstruction profile; use the separately sourced right portal branches from the right vitelline conduit.'
    },
    ['CF2008']
  ),
  portalLayer(
    'human-left-portal-branches',
    'Human left portal branches — left umbilical-vein contribution',
    'Human left portal branches',
    'Simplified left-sided intrahepatic portal branches arising from the left umbilical vein. The model keeps this origin separate from the right vitelline-derived right portal branches.',
    'Human 3D reconstruction · left portal branches',
    '#9e8cda',
    0.031,
    'human-2017',
    [
      {
        id: 'human-left-portal-cranial-branch',
        fromNode: 'node-left-umbilical-hilum',
        toNode: 'node-left-portal-branch-cranial',
        points: [point(-0.72, 1.22, -0.28), point(-1.02, 1.56, -0.05), point(-1.32, 1.92, 0.08)]
      },
      {
        id: 'human-left-portal-caudal-branch',
        fromNode: 'node-left-umbilical-hilum',
        toNode: 'node-left-portal-branch-caudal',
        points: [point(-0.72, 1.22, -0.28), point(-0.98, 1.34, -0.05), point(-1.18, 1.38, 0.18)]
      }
    ],
    states(
      humanHidden,
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'not-yet-visible', cs14: 'developing', cs15: 'expanding', cs16: 'persistent' }
    ),
    {
      'classical-2008': 'Not represented as a separately traced left umbilical-derived branch set in this classical profile.',
      'human-2017': 'Hikspoors et al. report that left-sided portal branches in the ventromedial and left dorsolateral liver arise from the left umbilical vein, spiraling from the craniolateral region near the venous duct toward the caudoventral umbilical entry. The two paths here are schematic.'
    },
    ['HIKSPOORS2017']
  ),
  portalLayer(
    'portal-cantlie-boundary-guide',
    'Gallbladder / Cantlie boundary guide — schematic',
    'Cantlie boundary guide',
    'A thin non-vascular orientation guide. In the 2017 reconstruction, the gallbladder marks the hepatic vascular midline between left-sided umbilical-derived portal branches and right-sided vitelline-derived branches.',
    'Orientation landmark · not a vessel',
    '#d7e2ec',
    0.012,
    'both',
    [
      {
        id: 'cantlie-midline-guide',
        fromNode: 'node-gallbladder-cantlie',
        toNode: 'node-cantlie-cranial-guide',
        points: [
          point(0.05, 1.13, -0.43),
          point(0.08, 1.48, -0.31),
          point(0.12, 1.83, -0.04),
          point(0.18, 2.18, 0.22)
        ]
      }
    ],
    states(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'not-yet-visible', cs14: 'developing', cs15: 'present', cs16: 'present' },
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'not-yet-visible', cs14: 'developing', cs15: 'present', cs16: 'present' }
    ),
    {
      'classical-2008': 'The gallbladder is shown as a positional landmark only. The thin guide is not a classical named vein and must not be interpreted as a vessel.',
      'human-2017': 'Hikspoors et al. describe the gallbladder as a reliable marker of the hepatic vascular midline / line of Cantlie between left umbilical-derived and right portal-derived branches.'
    },
    ['HIKSPOORS2017'],
    'landmark'
  )
];

export const PORTAL_LANDMARKS: PortalLandmark[] = [
  {
    id: 'portal-gallbladder',
    name: 'Gallbladder — portal vascular midline landmark',
    shortName: 'Gallbladder',
    category: 'landmark',
    position: point(0.05, 1.13, -0.43),
    description: 'A small schematic gallbladder marker. Hikspoors et al. describe the gallbladder as a reliable marker for the hepatic vascular midline separating left umbilical-derived from right vitelline-derived portal branches.',
    color: '#a6b86d',
    appearsFrom: 'cs14',
    sourceIds: ['HIKSPOORS2017']
  }
];

const PRESENTATION: Record<PortalState, Omit<PortalPresentation, 'state'>> = {
  'not-yet-visible': { statusLabel: 'Not yet represented at this stage', opacity: 0, radiusScale: 0, visible: false },
  developing: { statusLabel: 'Developing · schematic stage bin', opacity: 0.68, radiusScale: 0.88, visible: true },
  present: { statusLabel: 'Present in this evidence profile', opacity: 0.94, radiusScale: 1, visible: true },
  expanding: { statusLabel: 'Expanding', opacity: 0.86, radiusScale: 1.04, visible: true },
  persistent: { statusLabel: 'Persistent in this evidence profile', opacity: 0.98, radiusScale: 1.06, visible: true },
  regressing: { statusLabel: 'Regressing as a distinct channel', opacity: 0.45, radiusScale: 0.72, visible: true },
  'not-resolved': { statusLabel: 'Not separately resolved by this source', opacity: 0, radiusScale: 0, visible: false },
  'not-in-profile': { statusLabel: 'Not included in this evidence profile', opacity: 0, radiusScale: 0, visible: false }
};

export function getPortalLayerPresentation(
  layer: PortalVascularLayer,
  profile: EvidenceProfile,
  stageId: VitellineStageId
): PortalPresentation {
  const state = layer.states[profile][stageId];
  return { state, ...PRESENTATION[state] };
}

const samePoint = (a: Point3, b: Point3): boolean =>
  Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) <= 0.0002;

const allNodes = new Map<string, Point3>([
  ...VITELLINE_NODES.map((node) => [node.id, node.position] as [string, Point3]),
  ...PORTAL_NODES.map((node) => [node.id, node.position] as [string, Point3])
]);

export function validatePortalNetwork(): string[] {
  const issues: string[] = [];
  const layerIds = new Set<string>();
  const pathIds = new Set<string>();

  for (const layer of PORTAL_VASCULAR_LAYERS) {
    if (layerIds.has(layer.id)) issues.push('Duplicate portal layer ID: ' + layer.id);
    layerIds.add(layer.id);
    if (layer.paths.length === 0) issues.push(layer.id + ' has no geometry paths');
    if (layer.radius <= 0) issues.push(layer.id + ' must have a positive vessel radius');

    for (const pathItem of layer.paths) {
      if (pathIds.has(pathItem.id)) issues.push('Duplicate portal path ID: ' + pathItem.id);
      pathIds.add(pathItem.id);
      if (pathItem.points.length < 2) issues.push(pathItem.id + ' needs at least two centre-line points');
      const from = allNodes.get(pathItem.fromNode);
      const to = allNodes.get(pathItem.toNode);
      if (!from) issues.push(pathItem.id + ' has a missing start node ' + pathItem.fromNode);
      if (!to) issues.push(pathItem.id + ' has a missing end node ' + pathItem.toNode);
      if (from && pathItem.points.length && !samePoint(pathItem.points[0], from)) {
        issues.push(pathItem.id + ' does not begin at its declared node');
      }
      if (to && pathItem.points.length && !samePoint(pathItem.points[pathItem.points.length - 1], to)) {
        issues.push(pathItem.id + ' does not end at its declared node');
      }
    }

    for (const profile of ['classical-2008', 'human-2017'] as const) {
      for (const stage of STAGES) {
        if (!layer.states[profile][stage]) issues.push(layer.id + ' has no state for ' + profile + ' / ' + stage);
      }
      if (!layer.evidence[profile]) issues.push(layer.id + ' has no evidence note for ' + profile);
      if (layer.profile !== 'both' && layer.profile !== profile) {
        for (const stage of STAGES) {
          if (layer.states[profile][stage] !== 'not-in-profile') {
            issues.push(layer.id + ' leaks into incompatible profile ' + profile);
          }
        }
      }
    }
  }

  for (const node of PORTAL_NODES) {
    if (node.parentSegmentId && !pointOn(node.parentSegmentId, node.position)) {
      issues.push(node.id + ' is not embedded in parent segment ' + node.parentSegmentId);
    }
  }

  const classicalTrunk = PORTAL_VASCULAR_LAYERS.find((layer) => layer.id === 'classical-portal-trunk');
  const humanTrunk = PORTAL_VASCULAR_LAYERS.find((layer) => layer.id === 'human-portal-trunk');
  const classicalSinus = PORTAL_VASCULAR_LAYERS.find((layer) => layer.id === 'classical-portal-sinus');
  const humanSinus = PORTAL_VASCULAR_LAYERS.find((layer) => layer.id === 'human-portal-sinus');
  if (classicalTrunk?.paths.length !== 3) issues.push('Classical portal trunk must contain exactly three retained vitelline components');
  if (humanTrunk?.paths.length !== 5) issues.push('Human portal pathway must contain the mesenteric precursor, left limb, dorsal crossing and right vitelline continuation');
  if (classicalSinus?.paths[0]?.fromNode !== 'node-left-iva-subhepatic' || classicalSinus?.paths[0]?.toNode !== 'node-right-iva-subhepatic') {
    issues.push('Classical portal sinus must highlight the left-to-right subhepatic anastomosis remnant');
  }
  if (classicalSinus?.paths[1]?.fromNode !== 'node-left-umbilical-hilum' || classicalSinus?.paths[1]?.toNode !== 'node-left-iva-subhepatic') {
    issues.push('Classical left umbilical vein must approach the left angle of the subhepatic anastomosis');
  }
  if (humanSinus?.paths[0]?.toNode !== 'node-right-portal-sinus-attachment') {
    issues.push('Human portal sinus must connect to the right intrahepatic vitelline conduit');
  }
  if (!PORTAL_NODES.some((node) => node.id === 'node-left-portal-entry' && node.parentSegmentId === 'vitelline-left-extrahepatic')) {
    issues.push('Human midgut-derived portal precursor must enter the left vitelline extrahepatic trunk');
  }

  return issues;
}

export const PORTAL_NETWORK_ISSUES = validatePortalNetwork();
