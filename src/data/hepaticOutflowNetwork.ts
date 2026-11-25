import type { EvidenceProfile } from './stages';
import { HEPATIC_VASCULAR_NODES } from './hepaticVascularNetwork';
import { PORTAL_NODES } from './portalNetwork';
import type { Point3, VitellineStageId } from './vitellineNetwork';
import { VITELLINE_NODES } from './vitellineNetwork';

export type HepaticOutflowState =
  | 'not-yet-visible'
  | 'developing'
  | 'expanding'
  | 'persistent'
  | 'regressing'
  | 'not-distinct'
  | 'not-in-profile';

export type HepaticOutflowStageStates = Record<VitellineStageId, HepaticOutflowState>;

export interface HepaticOutflowNode {
  id: string;
  label: string;
  position: Point3;
  description: string;
}

export interface HepaticOutflowPath {
  id: string;
  fromNode: string;
  toNode: string;
  points: readonly Point3[];
  radiusScale?: number;
  flowArrow?: boolean;
}

export interface HepaticOutflowLayer {
  id: string;
  name: string;
  shortName: string;
  description: string;
  status: string;
  color: string;
  radius: number;
  profile: EvidenceProfile;
  paths: readonly HepaticOutflowPath[];
  states: Record<EvidenceProfile, HepaticOutflowStageStates>;
  evidence: Record<EvidenceProfile, string>;
  sourceIds: readonly string[];
  postnatalFate?: string;
}

export interface HepaticOutflowPresentation {
  state: HepaticOutflowState;
  statusLabel: string;
  opacity: number;
  radiusScale: number;
  visible: boolean;
}

const point = (x: number, y: number, z: number): Point3 => [x, y, z];

const hidden: HepaticOutflowStageStates = {
  cs10: 'not-in-profile',
  cs12: 'not-in-profile',
  cs13: 'not-in-profile',
  cs14: 'not-in-profile',
  cs15: 'not-in-profile',
  cs16: 'not-in-profile'
};

const stageMap = (
  cs10: HepaticOutflowState,
  cs12: HepaticOutflowState,
  cs13: HepaticOutflowState,
  cs14: HepaticOutflowState,
  cs15: HepaticOutflowState,
  cs16: HepaticOutflowState
): HepaticOutflowStageStates => ({ cs10, cs12, cs13, cs14, cs15, cs16 });

const profiles = (
  classical: HepaticOutflowStageStates,
  human: HepaticOutflowStageStates
): Record<EvidenceProfile, HepaticOutflowStageStates> => ({
  'classical-2008': classical,
  'human-2017': human
});

export const HEPATIC_OUTFLOW_NODES: HepaticOutflowNode[] = [
  {
    id: 'node-human-dv-inlet-bend',
    label: 'Venous duct — hilar bend',
    position: point(-0.38, 1.48, 0.1),
    description: 'Schematic bend along the left umbilical-vein-to-right-hepatocardiac venous duct.'
  },
  {
    id: 'node-human-dv-narrow-waist',
    label: 'Venous duct — narrow segment',
    position: point(-0.02, 1.66, 0.28),
    description: 'Schematic narrow portion used to teach the regional narrowing described in the CS15 venous route.'
  }
];

export const HEPATIC_OUTFLOW_LAYERS: HepaticOutflowLayer[] = [
  {
    id: 'classical-subdiaphragmatic-anastomosis',
    name: 'Subdiaphragmatic intervitelline anastomosis',
    shortName: 'Subdiaphragmatic bridge',
    description: 'The classical cranial connection between the right and left vitelline outflow channels above the hepatic primordium. It receives the venae revehentes and drains toward the venous sinus.',
    status: 'Classical model · cranial hepatic outflow',
    color: '#e7a36f',
    radius: 0.055,
    profile: 'classical-2008',
    paths: [
      {
        id: 'classical-subdiaphragmatic-bridge',
        fromNode: 'node-classical-subdiaphragmatic-left',
        toNode: 'node-classical-subdiaphragmatic-right',
        points: [
          point(-0.42, 2.28, 0.3),
          point(-0.2, 2.35, 0.34),
          point(0, 2.38, 0.35),
          point(0.2, 2.35, 0.34),
          point(0.42, 2.28, 0.3)
        ]
      }
    ],
    states: profiles(
      stageMap('not-yet-visible', 'not-yet-visible', 'developing', 'expanding', 'persistent', 'persistent'),
      hidden
    ),
    evidence: {
      'classical-2008': 'Collardeau-Frachon and Scoazec describe a subdiaphragmatic anastomosis joining the cranial vitelline channels above the liver. Venae revehentes drain the sinusoidal plexus into this anastomosis, which then drains toward the sinus venosus through the terminal primitive vitelline segments.',
      'human-2017': 'This classical named anastomosis is not imposed on the human-reconstruction pathway.'
    },
    sourceIds: ['CF2008']
  },
  {
    id: 'classical-right-terminal-hepatic-outflow',
    name: 'Right terminal vitelline hepatic outflow',
    shortName: 'Right terminal outflow',
    description: 'The right terminal continuation from the classical subdiaphragmatic outflow toward the right venous pole. It is shown as the dominant retained cranial route in the later teaching bins.',
    status: 'Classical model · right terminal outflow',
    color: '#ed9a72',
    radius: 0.066,
    profile: 'classical-2008',
    paths: [
      {
        id: 'classical-right-terminal-outflow-path',
        fromNode: 'node-classical-subdiaphragmatic-right',
        toNode: 'node-venous-pole-right',
        points: [
          point(0.42, 2.28, 0.3),
          point(0.43, 2.45, 0.27),
          point(0.44, 2.62, 0.23),
          point(0.45, 2.82, 0.2)
        ],
        flowArrow: true
      }
    ],
    states: profiles(
      stageMap('not-yet-visible', 'not-yet-visible', 'developing', 'expanding', 'persistent', 'persistent'),
      hidden
    ),
    evidence: {
      'classical-2008': 'The 2008 synthesis describes the subdiaphragmatic anastomosis draining into the sinus venosus through the last portions of the primitive vitelline veins. The right-sided path is emphasized as the persistent hepatic outflow context; it is not the entire composite IVC.',
      'human-2017': 'The classical terminal-vitelline construction is not substituted for the human right hepatocardiac channel.'
    },
    sourceIds: ['CF2008']
  },
  {
    id: 'classical-left-terminal-hepatic-outflow',
    name: 'Left terminal vitelline hepatic outflow',
    shortName: 'Left terminal outflow',
    description: 'A schematic left terminal continuation from the subdiaphragmatic bridge. It is shown transiently and then becomes no longer distinct in the classical teaching sequence.',
    status: 'Classical model · transient left outflow',
    color: '#b49bda',
    radius: 0.052,
    profile: 'classical-2008',
    paths: [
      {
        id: 'classical-left-terminal-outflow-path',
        fromNode: 'node-classical-subdiaphragmatic-left',
        toNode: 'node-venous-pole-left',
        points: [
          point(-0.42, 2.28, 0.3),
          point(-0.38, 2.45, 0.27),
          point(-0.31, 2.62, 0.23),
          point(-0.25, 2.82, 0.2),
        ],
        flowArrow: true
      }
    ],
    states: profiles(
      stageMap('not-yet-visible', 'not-yet-visible', 'developing', 'regressing', 'not-distinct', 'not-distinct'),
      hidden
    ),
    evidence: {
      'classical-2008': 'The classical symmetric outflow is represented schematically on both sides before right-sided dominance. The exact timing and detailed fate of every terminal channel are not established by this simplified geometry.',
      'human-2017': 'The classical left terminal outflow is not used to represent the human reconstruction.'
    },
    sourceIds: ['CF2008']
  },
  {
    id: 'classical-ductus-venosus',
    name: 'Ductus venosus — classical portal-sinus-to-IVC route',
    shortName: 'Classical ductus venosus',
    description: 'A branchless channel from the left angle of the portal sinus toward the IVC. This classical route is kept separate from the direct left-umbilical-to-right-hepatocardiac shunt in the human reconstruction.',
    status: 'Classical model · fetal shunt',
    color: '#8ec5e8',
    radius: 0.054,
    profile: 'classical-2008',
    paths: [
      {
        id: 'classical-ductus-venosus-channel',
        fromNode: 'node-left-iva-subhepatic',
        toNode: 'node-right-hepatic-exit',
        points: [
          point(-0.996, 0.62, 0.22),
          point(-0.78, 0.91, 0.24),
          point(-0.52, 1.2, 0.27),
          point(-0.27, 1.48, 0.29),
          point(0.02, 1.74, 0.3),
          point(0.3, 2.02, 0.25)
        ],
        flowArrow: true
      }
    ],
    states: profiles(
      stageMap('not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'developing', 'expanding', 'persistent'),
      hidden
    ),
    evidence: {
      'classical-2008': 'The 2008 review describes a large, branchless ductus venosus connecting the left angle of the portal sinus to the inferior vena cava. It lies in the prolongation of the umbilical vein but is not described as a direct continuation of the umbilical-vein lumen.',
      'human-2017': 'The classical portal-sinus-to-IVC route is not used to represent the human reconstruction-specific venous duct.'
    },
    sourceIds: ['CF2008'],
    postnatalFate: 'After birth, the ductus venosus closes and becomes the ligamentum venosum.'
  },
  {
    id: 'human-ductus-venosus',
    name: 'Venous duct — left umbilical to right hepatocardiac shunt',
    shortName: 'Human venous duct',
    description: 'A de novo left-to-right shunt from the left umbilical vein at the liver hilum to the right hepatocardiac channel. Three centre-line sections show the curved course and a narrowed waist for teaching.',
    status: 'Human reconstruction · 2017 / 2024',
    color: '#82c8ee',
    radius: 0.061,
    profile: 'human-2017',
    paths: [
      {
        id: 'human-venous-duct-inlet',
        fromNode: 'node-left-umbilical-hilum',
        toNode: 'node-human-dv-inlet-bend',
        points: [
          point(-0.72, 1.22, -0.28),
          point(-0.62, 1.35, -0.08),
          point(-0.5, 1.43, 0.03),
          point(-0.38, 1.48, 0.1)
        ],
        radiusScale: 1
      },
      {
        id: 'human-venous-duct-narrow-waist',
        fromNode: 'node-human-dv-inlet-bend',
        toNode: 'node-human-dv-narrow-waist',
        points: [
          point(-0.38, 1.48, 0.1),
          point(-0.22, 1.56, 0.22),
          point(-0.02, 1.66, 0.28)
        ],
        radiusScale: 0.62
      },
      {
        id: 'human-venous-duct-outlet',
        fromNode: 'node-human-dv-narrow-waist',
        toNode: 'node-human-hepatocardiac-right',
        points: [
          point(-0.02, 1.66, 0.28),
          point(0.12, 1.8, 0.31),
          point(0.22, 1.92, 0.29),
          point(0.3, 2.02, 0.25)
        ],
        radiusScale: 0.86,
        flowArrow: true
      }
    ],
    states: profiles(
      hidden,
      stageMap('not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'developing', 'expanding', 'persistent')
    ),
    evidence: {
      'classical-2008': 'The classical account is represented in the separate classical ductus-venosus layer.',
      'human-2017': 'Hikspoors et al. describe a de novo shunt between the left umbilical vein in the liver hilum and the right hepatocardiac channel. The 2024 Isotani et al. reconstruction documents the venous route at CS15 as a large curved channel with regional narrowing; this schematic waist is an orientation aid, not a measured lumen diameter.'
    },
    sourceIds: ['HIKSPOORS2017', 'ISOTANI2024'],
    postnatalFate: 'After birth, the venous duct closes and becomes the ligamentum venosum. The left umbilical vein separately becomes the ligamentum teres.'
  },
  {
    id: 'human-terminal-hepatic-veins',
    name: 'Right, middle and left terminal hepatic veins',
    shortName: 'Terminal hepatic veins',
    description: 'Three schematic hepatic-vein collectors draining the intrahepatic venous network toward the right hepatic outflow junction. Their paths are shown as separate vessels, not as a complete adult segmental venous tree.',
    status: 'Human reconstruction · CS15 hepatic outflow',
    color: '#e99b78',
    radius: 0.047,
    profile: 'human-2017',
    paths: [
      {
        id: 'human-left-terminal-hepatic-vein',
        fromNode: 'node-sinusoid-upper-left',
        toNode: 'node-human-hepatocardiac-right',
        points: [
          point(-0.78, 1.96, 0.12),
          point(-0.56, 2.0, 0.17),
          point(-0.25, 2.02, 0.22),
          point(0.3, 2.02, 0.25)
        ],
        radiusScale: 0.9,
        flowArrow: true
      },
      {
        id: 'human-middle-terminal-hepatic-vein',
        fromNode: 'node-sinusoid-upper-inner-left',
        toNode: 'node-human-hepatocardiac-right',
        points: [
          point(-0.25, 2.02, 0.2),
          point(-0.08, 2.03, 0.22),
          point(0.12, 2.03, 0.24),
          point(0.3, 2.02, 0.25)
        ],
        radiusScale: 0.9,
        flowArrow: true
      },
      {
        id: 'human-right-terminal-hepatic-vein',
        fromNode: 'node-sinusoid-upper-right',
        toNode: 'node-human-hepatocardiac-right',
        points: [
          point(0.82, 1.92, 0.12),
          point(0.62, 1.98, 0.17),
          point(0.45, 2.0, 0.22),
          point(0.3, 2.02, 0.25)
        ],
        radiusScale: 0.9,
        flowArrow: true
      }
    ],
    states: profiles(
      hidden,
      stageMap('not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'developing', 'expanding')
    ),
    evidence: {
      'classical-2008': 'The classical review describes primary right and left hepatic veins and later terminal hepatic veins, but this three-vein CS15 reconstruction is not used as its source-specific model.',
      'human-2017': 'The 2017 reconstruction describes a right-dominant hepatocardiac drainage network. Isotani et al. (2024) explicitly reconstruct the right, middle and left hepatic veins joining the IVC in CS15 human specimens. The three paths here are schematic collectors and do not claim exact specimen-derived branching.'
    },
    sourceIds: ['HIKSPOORS2017', 'ISOTANI2024']
  }
];

const STATE_PRESENTATION: Record<HepaticOutflowState, Omit<HepaticOutflowPresentation, 'state'>> = {
  'not-yet-visible': { statusLabel: 'Not yet shown in this stage bin', opacity: 0, radiusScale: 0, visible: false },
  developing: { statusLabel: 'Developing', opacity: 0.62, radiusScale: 0.84, visible: true },
  expanding: { statusLabel: 'Expanding', opacity: 0.84, radiusScale: 1, visible: true },
  persistent: { statusLabel: 'Persistent in this profile', opacity: 0.96, radiusScale: 1.04, visible: true },
  regressing: { statusLabel: 'Regressing as a distinct channel', opacity: 0.42, radiusScale: 0.7, visible: true },
  'not-distinct': { statusLabel: 'No longer distinct in this profile', opacity: 0, radiusScale: 0, visible: false },
  'not-in-profile': { statusLabel: 'Not represented in this evidence profile', opacity: 0, radiusScale: 0, visible: false }
};

export function getHepaticOutflowPresentation(
  layer: HepaticOutflowLayer,
  profile: EvidenceProfile,
  stageId: VitellineStageId
): HepaticOutflowPresentation {
  const state = layer.states[profile][stageId];
  return { state, ...STATE_PRESENTATION[state] };
}

export function validateHepaticOutflowNetwork(): string[] {
  const issues: string[] = [];
  const nodeMap = new Map<string, Point3>();
  const externalNodes = [
    ...VITELLINE_NODES,
    ...HEPATIC_VASCULAR_NODES,
    ...PORTAL_NODES
  ];

  externalNodes.forEach((node) => nodeMap.set(node.id, node.position));
  HEPATIC_OUTFLOW_NODES.forEach((node) => {
    if (nodeMap.has(node.id)) issues.push('Duplicate hepatic outflow node ID: ' + node.id);
    nodeMap.set(node.id, node.position);
  });

  const layerIds = new Set<string>();
  const pathIds = new Set<string>();
  const otherProfile = (profile: EvidenceProfile): EvidenceProfile =>
    profile === 'classical-2008' ? 'human-2017' : 'classical-2008';

  for (const layer of HEPATIC_OUTFLOW_LAYERS) {
    if (layerIds.has(layer.id)) issues.push('Duplicate hepatic outflow layer ID: ' + layer.id);
    layerIds.add(layer.id);
    if (layer.paths.length === 0) issues.push(layer.id + ' has no geometry paths');
    if (!layer.evidence[layer.profile]) issues.push(layer.id + ' has no evidence note for its source profile');

    const hiddenStates = layer.states[otherProfile(layer.profile)];
    if (Object.values(hiddenStates).some((state) => state !== 'not-in-profile')) {
      issues.push(layer.id + ' leaks into the incompatible evidence profile');
    }

    for (const stage of ['cs10', 'cs12', 'cs13', 'cs14', 'cs15', 'cs16'] as const) {
      if (!layer.states[layer.profile][stage]) issues.push(layer.id + ' has no state for ' + stage);
    }

    for (const pathItem of layer.paths) {
      if (pathIds.has(pathItem.id)) issues.push('Duplicate hepatic outflow path ID: ' + pathItem.id);
      pathIds.add(pathItem.id);
      if (pathItem.points.length < 2) issues.push(pathItem.id + ' needs at least two centre-line points');

      const from = nodeMap.get(pathItem.fromNode);
      const to = nodeMap.get(pathItem.toNode);
      if (!from) issues.push(pathItem.id + ' has a missing start node ' + pathItem.fromNode);
      if (!to) issues.push(pathItem.id + ' has a missing end node ' + pathItem.toNode);
      if (from && pathItem.points.length > 0) {
        const first = pathItem.points[0];
        if (Math.hypot(first[0] - from[0], first[1] - from[1], first[2] - from[2]) > 0.0001) {
          issues.push(pathItem.id + ' does not begin at its declared start node');
        }
      }
      if (to && pathItem.points.length > 0) {
        const last = pathItem.points[pathItem.points.length - 1];
        if (Math.hypot(last[0] - to[0], last[1] - to[1], last[2] - to[2]) > 0.0001) {
          issues.push(pathItem.id + ' does not end at its declared end node');
        }
      }
      if (pathItem.radiusScale !== undefined && pathItem.radiusScale <= 0) {
        issues.push(pathItem.id + ' has a non-positive radius scale');
      }
      if (pathItem.flowArrow && pathItem.points.length < 2) {
        issues.push(pathItem.id + ' cannot show a flow arrow without a centre-line tangent');
      }
    }
  }

  const classicalDuctus = HEPATIC_OUTFLOW_LAYERS.find((layer) => layer.id === 'classical-ductus-venosus');
  const humanDuctus = HEPATIC_OUTFLOW_LAYERS.find((layer) => layer.id === 'human-ductus-venosus');
  const terminalVeins = HEPATIC_OUTFLOW_LAYERS.find((layer) => layer.id === 'human-terminal-hepatic-veins');
  if (classicalDuctus?.paths[0]?.fromNode !== 'node-left-iva-subhepatic' || classicalDuctus?.paths[0]?.toNode !== 'node-right-hepatic-exit') {
    issues.push('Classical ductus venosus must run from the left portal-sinus angle toward the IVC / hepatic outflow junction');
  }
  if (humanDuctus?.paths[0]?.fromNode !== 'node-left-umbilical-hilum' || humanDuctus?.paths[2]?.toNode !== 'node-human-hepatocardiac-right') {
    issues.push('Human venous duct must run from the left umbilical hilum to the right hepatocardiac channel');
  }
  if (humanDuctus?.paths[1]?.radiusScale !== 0.62) {
    issues.push('Human venous duct must preserve its separately modelled narrow waist');
  }
  if (terminalVeins?.paths.length !== 3) {
    issues.push('Human terminal hepatic-vein layer must contain right, middle and left collectors');
  }

  return issues;
}

export const HEPATIC_OUTFLOW_NETWORK_ISSUES = validateHepaticOutflowNetwork();
