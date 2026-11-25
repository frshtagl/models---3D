import type { EvidenceProfile } from './stages';
import type { Point3, VitellineStageId } from './vitellineNetwork';
import { VITELLINE_NODES } from './vitellineNetwork';
import { PORTAL_NODES } from './portalNetwork';

export type UmbilicalState =
  | 'not-yet-visible'
  | 'present'
  | 'developing'
  | 'regressing'
  | 'not-distinct'
  | 'not-resolved'
  | 'not-in-profile';

export type UmbilicalStageStates = Record<VitellineStageId, UmbilicalState>;

export interface UmbilicalNode {
  id: string;
  label: string;
  position: Point3;
  description: string;
}

export interface UmbilicalPath {
  id: string;
  fromNode: string;
  toNode: string;
  points: readonly Point3[];
  radiusScale?: number;
  flowArrow?: boolean;
}

export interface UmbilicalVascularLayer {
  id: string;
  name: string;
  shortName: string;
  description: string;
  status: string;
  color: string;
  radius: number;
  profile: 'both';
  paths: readonly UmbilicalPath[];
  states: Record<EvidenceProfile, UmbilicalStageStates>;
  evidence: Record<EvidenceProfile, string>;
  sourceIds: readonly string[];
  postnatalFate?: string;
}

export interface UmbilicalPresentation {
  state: UmbilicalState;
  statusLabel: string;
  opacity: number;
  radiusScale: number;
  visible: boolean;
}

const point = (x: number, y: number, z: number): Point3 => [x, y, z];
const stages: VitellineStageId[] = ['cs10', 'cs12', 'cs13', 'cs14', 'cs15', 'cs16'];

const stateMap = (
  cs10: UmbilicalState,
  cs12: UmbilicalState,
  cs13: UmbilicalState,
  cs14: UmbilicalState,
  cs15: UmbilicalState,
  cs16: UmbilicalState
): UmbilicalStageStates => ({ cs10, cs12, cs13, cs14, cs15, cs16 });

const pairedStates = (states: UmbilicalStageStates): Record<EvidenceProfile, UmbilicalStageStates> => ({
  'classical-2008': states,
  'human-2017': states
});

export const UMBILICAL_NODES: UmbilicalNode[] = [
  {
    id: 'node-right-umbilical-root',
    label: 'Right umbilical vein — placental end',
    position: point(0.25, -2.35, -1.0),
    description: 'Schematic placental / chorionic end of the right umbilical vein. This is a normalized teaching anchor, not a measured fetal coordinate.'
  },
  {
    id: 'node-right-umbilical-hilum',
    label: 'Right umbilical vein — hepatic approach',
    position: point(0.72, 1.22, -0.28),
    description: 'Schematic point where the right umbilical vein approaches the developing liver and its early sinus-horn drainage route.'
  }
];

const presentThenRegress = stateMap('present', 'present', 'regressing', 'regressing', 'not-distinct', 'not-distinct');
const leftHornConnection = stateMap('present', 'present', 'not-resolved', 'not-resolved', 'not-resolved', 'not-resolved');

export const UMBILICAL_VASCULAR_LAYERS: UmbilicalVascularLayer[] = [
  {
    id: 'right-umbilical-vein',
    name: 'Right umbilical vein',
    shortName: 'Right umbilical vein',
    description: 'The early right umbilical vein carries placental blood toward the right side of the venous pole. It is shown as a paired early channel that becomes regressive and is no longer represented as a distinct large conduit in the later stage bins. The persistent left umbilical vein is kept separate in the portal-system layer.',
    status: 'Paired umbilical system · right-sided channel',
    color: '#d5a85c',
    radius: 0.052,
    profile: 'both',
    paths: [
      {
        id: 'right-umbilical-extrahepatic',
        fromNode: 'node-right-umbilical-root',
        toNode: 'node-right-umbilical-hilum',
        points: [
          point(0.25, -2.35, -1.0),
          point(0.3, -1.8, -0.9),
          point(0.42, -1.2, -0.78),
          point(0.55, -0.55, -0.62),
          point(0.68, 0.15, -0.44),
          point(0.72, 1.22, -0.28)
        ],
        flowArrow: true
      },
      {
        id: 'right-umbilical-sinus-horn-connection',
        fromNode: 'node-right-umbilical-hilum',
        toNode: 'node-venous-pole-right',
        points: [
          point(0.72, 1.22, -0.28),
          point(0.7, 1.62, -0.12),
          point(0.62, 2.04, 0.02),
          point(0.52, 2.42, 0.12),
          point(0.45, 2.82, 0.2)
        ],
        flowArrow: true
      }
    ],
    states: pairedStates(presentThenRegress),
    evidence: {
      'classical-2008': 'The classical synthesis describes the umbilical veins as initially paired, followed by remodeling of the umbilical circulation and persistence of the left umbilical route. The right-sided channel is shown here as an early paired vessel and then regressing as a distinct conduit.',
      'human-2017': 'Human reconstructions describe paired early umbilical channels and subsequent right-sided regression, while the left umbilical vein remains the dominant placental inflow. Stage bins here are broad teaching approximations, not exact onset or closure dates.'
    },
    sourceIds: ['CF2008', 'HIKSPOORS2017', 'ISOTANI2024'],
    postnatalFate: 'The right umbilical vein regresses as a distinct vessel; it does not form the ligamentum teres hepatis.'
  },
  {
    id: 'left-umbilical-sinus-horn-connection',
    name: 'Early left umbilical vein — sinus-horn connection',
    shortName: 'Left umbilical horn connection',
    description: 'This layer shows only the early cranial connection from the left umbilical-vein hilar region to the left sinus venosus horn. It is not the whole left umbilical vein. The persistent left umbilical inflow from the placental end to the hepatic hilum remains in the separate left-umbilical-inflow portal layer.',
    status: 'Paired umbilical system · early cranial connection',
    color: '#d9b36e',
    radius: 0.048,
    profile: 'both',
    paths: [
      {
        id: 'left-umbilical-sinus-horn-path',
        fromNode: 'node-left-umbilical-hilum',
        toNode: 'node-venous-pole-left',
        points: [
          point(-0.72, 1.22, -0.28),
          point(-0.62, 1.58, -0.16),
          point(-0.5, 1.98, -0.02),
          point(-0.38, 2.4, 0.1),
          point(-0.25, 2.82, 0.2)
        ],
        flowArrow: true
      }
    ],
    states: pairedStates(leftHornConnection),
    evidence: {
      'classical-2008': 'The classical account describes the early paired umbilical drainage and later remodeling of the left umbilical route into the fetal hepatic circulation. This layer isolates the early direct sinus-horn connection; its later fate is not separately resolved in the current source set. The persistent left umbilical vein and its portal / ductus-venosus relationships are separate layers.',
      'human-2017': 'The human reconstruction distinguishes the persistent left umbilical inflow from its later intrahepatic shunts. The direct early sinus-horn connection is shown only as an early paired-system component, not as the later venous duct.'
    },
    sourceIds: ['CF2008', 'HIKSPOORS2017', 'ISOTANI2024']
  }
];

const PRESENTATION: Record<UmbilicalState, Omit<UmbilicalPresentation, 'state'>> = {
  'not-yet-visible': { statusLabel: 'Not yet represented in this stage bin', opacity: 0, radiusScale: 0, visible: false },
  present: { statusLabel: 'Present', opacity: 0.94, radiusScale: 1, visible: true },
  developing: { statusLabel: 'Developing', opacity: 0.7, radiusScale: 0.88, visible: true },
  regressing: { statusLabel: 'Regressing as a distinct channel', opacity: 0.42, radiusScale: 0.72, visible: true },
  'not-distinct': { statusLabel: 'No longer distinct as a large channel', opacity: 0, radiusScale: 0, visible: false },
  'not-resolved': { statusLabel: 'Not separately resolved in this source / stage bin', opacity: 0, radiusScale: 0, visible: false },
  'not-in-profile': { statusLabel: 'Not represented in this evidence profile', opacity: 0, radiusScale: 0, visible: false }
};

export function getUmbilicalLayerPresentation(
  layer: UmbilicalVascularLayer,
  profile: EvidenceProfile,
  stageId: VitellineStageId
): UmbilicalPresentation {
  const state = layer.states[profile][stageId];
  return { state, ...PRESENTATION[state] };
}

export function validateUmbilicalNetwork(): string[] {
  const issues: string[] = [];
  const nodes = new Map<string, Point3>();
  for (const node of [...VITELLINE_NODES, ...PORTAL_NODES, ...UMBILICAL_NODES]) {
    if (nodes.has(node.id)) issues.push('Duplicate umbilical graph node ID: ' + node.id);
    nodes.set(node.id, node.position);
  }

  const layerIds = new Set<string>();
  const pathIds = new Set<string>();
  for (const layer of UMBILICAL_VASCULAR_LAYERS) {
    if (layerIds.has(layer.id)) issues.push('Duplicate umbilical layer ID: ' + layer.id);
    layerIds.add(layer.id);
    if (layer.paths.length === 0) issues.push(layer.id + ' has no paths');
    for (const profile of ['classical-2008', 'human-2017'] as const) {
      for (const stage of stages) {
        if (!layer.states[profile][stage]) issues.push(layer.id + ' has no state for ' + profile + ' / ' + stage);
      }
      if (!layer.evidence[profile]) issues.push(layer.id + ' has no evidence note for ' + profile);
    }
    for (const path of layer.paths) {
      if (pathIds.has(path.id)) issues.push('Duplicate umbilical path ID: ' + path.id);
      pathIds.add(path.id);
      if (path.points.length < 2) issues.push(path.id + ' needs at least two centre-line points');
      const from = nodes.get(path.fromNode);
      const to = nodes.get(path.toNode);
      if (!from) issues.push(path.id + ' has missing start node ' + path.fromNode);
      if (!to) issues.push(path.id + ' has missing end node ' + path.toNode);
      if (from && path.points.length && Math.hypot(from[0] - path.points[0][0], from[1] - path.points[0][1], from[2] - path.points[0][2]) > 0.0001) {
        issues.push(path.id + ' start point does not match its graph node');
      }
      const last = path.points[path.points.length - 1];
      if (to && last && Math.hypot(to[0] - last[0], to[1] - last[1], to[2] - last[2]) > 0.0001) {
        issues.push(path.id + ' end point does not match its graph node');
      }
      if (path.radiusScale !== undefined && path.radiusScale <= 0) issues.push(path.id + ' has a non-positive radius scale');
    }
  }

  const rightVein = UMBILICAL_VASCULAR_LAYERS.find((layer) => layer.id === 'right-umbilical-vein');
  if (rightVein?.states['human-2017'].cs16 !== 'not-distinct') {
    issues.push('The right umbilical vein must no longer be a distinct large channel by the CS16 teaching bin');
  }
  const leftConnection = UMBILICAL_VASCULAR_LAYERS.find((layer) => layer.id === 'left-umbilical-sinus-horn-connection');
  if (leftConnection?.states['human-2017'].cs16 !== 'not-resolved') {
    issues.push('The early left sinus-horn connection must remain un-resolved rather than inferred to regress or persist');
  }
  if (!PORTAL_NODES.some((node) => node.id === 'node-left-umbilical-hilum')) {
    issues.push('The persistent left umbilical vein hilar node is missing from the portal network');
  }
  return issues;
}

export const UMBILICAL_NETWORK_ISSUES = validateUmbilicalNetwork();
