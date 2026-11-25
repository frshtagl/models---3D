import type { EvidenceProfile } from './stages';
import type { Point3, VitellineStageId } from './vitellineNetwork';

export type HepaticVascularKind =
  | 'sinusoid'
  | 'afferent'
  | 'efferent'
  | 'sinusoidal-entry'
  | 'portal-branch'
  | 'hepatic-drainage';

export type HepaticVascularState =
  | 'not-yet-visible'
  | 'developing'
  | 'expanding'
  | 'persistent'
  | 'regressing'
  | 'not-distinct'
  | 'not-in-profile';

export interface HepaticVascularNode {
  id: string;
  label: string;
  position: Point3;
  description: string;
  terminal?: boolean;
  linkedStructureNode?: string;
}

export interface HepaticVascularPath {
  id: string;
  fromNode: string;
  toNode: string;
  points: readonly Point3[];
  radiusScale?: number;
}

export type HepaticStageStates = Record<VitellineStageId, HepaticVascularState>;

export interface HepaticVascularLayer {
  id: string;
  name: string;
  shortName: string;
  kind: HepaticVascularKind;
  description: string;
  status: string;
  color: string;
  radius: number;
  paths: readonly HepaticVascularPath[];
  states: Record<EvidenceProfile, HepaticStageStates>;
  evidence: Record<EvidenceProfile, string>;
  sourceIds: readonly string[];
}

export interface HepaticLayerPresentation {
  state: HepaticVascularState;
  statusLabel: string;
  opacity: number;
  radiusScale: number;
  visible: boolean;
}

const point = (x: number, y: number, z: number): Point3 => [x, y, z];

export const HEPATIC_VASCULAR_NODES: HepaticVascularNode[] = [
  { id: 'node-sinusoid-lower-left', label: 'Sinusoid lower left', position: point(-1.12, 1.25, -0.08), description: 'Schematic node in the caudal-left portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-lower-inner-left', label: 'Sinusoid lower inner left', position: point(-0.55, 1.28, 0.02), description: 'Schematic node in the caudal-left portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-lower-center', label: 'Sinusoid lower centre', position: point(0.05, 1.25, 0.1), description: 'Schematic node in the caudal-central portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-lower-inner-right', label: 'Sinusoid lower inner right', position: point(0.65, 1.28, 0.08), description: 'Schematic node in the caudal-right portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-lower-right', label: 'Sinusoid lower right', position: point(1.12, 1.3, -0.02), description: 'Schematic node in the caudal-right portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-mid-left', label: 'Sinusoid middle left', position: point(-1.05, 1.62, 0.08), description: 'Schematic node in the middle-left portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-mid-inner-left', label: 'Sinusoid middle inner left', position: point(-0.5, 1.65, 0.15), description: 'Schematic node in the middle-left portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-mid-center', label: 'Sinusoid middle centre', position: point(0.05, 1.65, 0.2), description: 'Schematic node in the central portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-mid-inner-right', label: 'Sinusoid middle inner right', position: point(0.62, 1.65, 0.18), description: 'Schematic node in the middle-right portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-mid-right', label: 'Sinusoid middle right', position: point(1.08, 1.62, 0.08), description: 'Schematic node in the middle-right portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-upper-left', label: 'Sinusoid upper left', position: point(-0.78, 1.96, 0.12), description: 'Schematic node in the cranial-left portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-upper-inner-left', label: 'Sinusoid upper inner left', position: point(-0.25, 2.02, 0.2), description: 'Schematic node in the cranial-central portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-upper-inner-right', label: 'Sinusoid upper inner right', position: point(0.35, 2.0, 0.2), description: 'Schematic node in the cranial-central portion of the hepatic sinusoidal plexus.' },
  { id: 'node-sinusoid-upper-right', label: 'Sinusoid upper right', position: point(0.82, 1.92, 0.12), description: 'Schematic node in the cranial-right portion of the hepatic sinusoidal plexus.' },

  { id: 'node-classical-subhepatic-left', label: 'Classical subhepatic inlet — left', position: point(-0.9, 1.08, -0.12), description: 'Boundary anchor for the classical afferent pathway; the subhepatic anastomosis itself is deferred to Milestone 4.', terminal: true },
  { id: 'node-classical-subhepatic-right', label: 'Classical subhepatic inlet — right', position: point(0.78, 1.08, -0.1), description: 'Boundary anchor for the classical afferent pathway; the subhepatic anastomosis itself is deferred to Milestone 4.', terminal: true },
  { id: 'node-classical-subdiaphragmatic-left', label: 'Classical subdiaphragmatic outlet — left', position: point(-0.42, 2.28, 0.3), description: 'Boundary anchor for the classical efferent pathway; the subdiaphragmatic anastomosis itself is deferred to Milestone 4.', terminal: true },
  { id: 'node-classical-subdiaphragmatic-right', label: 'Classical subdiaphragmatic outlet — right', position: point(0.42, 2.28, 0.3), description: 'Boundary anchor for the classical efferent pathway; the subdiaphragmatic anastomosis itself is deferred to Milestone 4.', terminal: true },

  { id: 'node-human-sinus-venosus', label: 'Human reconstruction — sinus venosus source', position: point(0.12, 2.82, 0.2), description: 'Shared source landmark for the sinusoidal entry paths described in the 2017 human reconstruction.', terminal: true, linkedStructureNode: 'sinus-venosus' },
  { id: 'node-human-hepatocardiac-right', label: 'Human reconstruction — right hepatocardiac channel', position: point(0.3, 2.02, 0.25), description: 'Shared outlet landmark for the right-sided hepatic drainage network.', linkedStructureNode: 'node-right-hepatic-exit' },
  { id: 'node-human-hepatocardiac-left', label: 'Human reconstruction — left hepatocardiac channel', position: point(-0.3, 2.02, 0.25), description: 'Shared outlet landmark for the smaller left-sided hepatic drainage pathway.', linkedStructureNode: 'node-left-hepatic-exit' },
  { id: 'node-human-right-vitelline-branch-cranial', label: 'Right vitelline conduit — cranial branch origin', position: point(0.82, 1.48, 0.4), description: 'Anchor on the existing right intrahepatic vitelline conduit.', linkedStructureNode: 'vitelline-right-intrahepatic' },
  { id: 'node-human-right-vitelline-branch-caudal', label: 'Right vitelline conduit — caudal branch origin', position: point(0.58, 1.78, 0.34), description: 'Anchor on the existing right intrahepatic vitelline conduit.', linkedStructureNode: 'vitelline-right-intrahepatic' }
];

const nodeMap = new Map(HEPATIC_VASCULAR_NODES.map((node) => [node.id, node]));

function path(
  id: string,
  fromNode: string,
  toNode: string,
  control?: Point3,
  radiusScale = 1
): HepaticVascularPath {
  const from = nodeMap.get(fromNode);
  const to = nodeMap.get(toNode);
  if (!from || !to) throw new Error('Unknown hepatic vascular path endpoint: ' + id);
  return {
    id,
    fromNode,
    toNode,
    points: control ? [from.position, control, to.position] : [from.position, to.position],
    radiusScale
  };
}

const notInProfile = (): HepaticStageStates => ({
  cs10: 'not-in-profile',
  cs12: 'not-in-profile',
  cs13: 'not-in-profile',
  cs14: 'not-in-profile',
  cs15: 'not-in-profile',
  cs16: 'not-in-profile'
});

const states = (
  classical: HepaticStageStates,
  human: HepaticStageStates
): Record<EvidenceProfile, HepaticStageStates> => ({
  'classical-2008': classical,
  'human-2017': human
});

const plexusStates: HepaticStageStates = {
  cs10: 'not-yet-visible',
  cs12: 'developing',
  cs13: 'expanding',
  cs14: 'expanding',
  cs15: 'persistent',
  cs16: 'persistent'
};

const notInClassical = notInProfile();
const notInHuman = notInProfile();

const sinusoidalPaths: HepaticVascularPath[] = [
  path('sinusoid-row-caudal-01', 'node-sinusoid-lower-left', 'node-sinusoid-lower-inner-left', point(-0.84, 1.18, -0.02)),
  path('sinusoid-row-caudal-02', 'node-sinusoid-lower-inner-left', 'node-sinusoid-lower-center', point(-0.25, 1.34, 0.08)),
  path('sinusoid-row-caudal-03', 'node-sinusoid-lower-center', 'node-sinusoid-lower-inner-right', point(0.36, 1.17, 0.16)),
  path('sinusoid-row-caudal-04', 'node-sinusoid-lower-inner-right', 'node-sinusoid-lower-right', point(0.9, 1.38, 0.02)),
  path('sinusoid-row-middle-01', 'node-sinusoid-mid-left', 'node-sinusoid-mid-inner-left', point(-0.78, 1.73, 0.1)),
  path('sinusoid-row-middle-02', 'node-sinusoid-mid-inner-left', 'node-sinusoid-mid-center', point(-0.22, 1.55, 0.2)),
  path('sinusoid-row-middle-03', 'node-sinusoid-mid-center', 'node-sinusoid-mid-inner-right', point(0.34, 1.75, 0.23)),
  path('sinusoid-row-middle-04', 'node-sinusoid-mid-inner-right', 'node-sinusoid-mid-right', point(0.88, 1.55, 0.12)),
  path('sinusoid-row-cranial-01', 'node-sinusoid-upper-left', 'node-sinusoid-upper-inner-left', point(-0.52, 2.08, 0.16)),
  path('sinusoid-row-cranial-02', 'node-sinusoid-upper-inner-left', 'node-sinusoid-upper-inner-right', point(0.05, 1.92, 0.24)),
  path('sinusoid-row-cranial-03', 'node-sinusoid-upper-inner-right', 'node-sinusoid-upper-right', point(0.63, 2.06, 0.17)),
  path('sinusoid-bridge-left-caudal', 'node-sinusoid-lower-left', 'node-sinusoid-mid-left', point(-1.18, 1.44, 0.04)),
  path('sinusoid-bridge-left-central', 'node-sinusoid-lower-inner-left', 'node-sinusoid-mid-inner-left', point(-0.58, 1.47, 0.1)),
  path('sinusoid-bridge-centre', 'node-sinusoid-lower-center', 'node-sinusoid-mid-center', point(0.02, 1.48, 0.17)),
  path('sinusoid-bridge-right-central', 'node-sinusoid-lower-inner-right', 'node-sinusoid-mid-inner-right', point(0.66, 1.47, 0.15)),
  path('sinusoid-bridge-right-caudal', 'node-sinusoid-lower-right', 'node-sinusoid-mid-right', point(1.18, 1.45, 0.02)),
  path('sinusoid-bridge-left-cranial', 'node-sinusoid-mid-left', 'node-sinusoid-upper-left', point(-0.95, 1.82, 0.12)),
  path('sinusoid-bridge-upper-left', 'node-sinusoid-mid-inner-left', 'node-sinusoid-upper-inner-left', point(-0.38, 1.84, 0.2)),
  path('sinusoid-bridge-upper-right', 'node-sinusoid-mid-inner-right', 'node-sinusoid-upper-inner-right', point(0.48, 1.84, 0.22)),
  path('sinusoid-bridge-right-cranial', 'node-sinusoid-mid-right', 'node-sinusoid-upper-right', point(0.98, 1.8, 0.1))
];

export const HEPATIC_VASCULAR_LAYERS: HepaticVascularLayer[] = [
  {
    id: 'hepatic-sinusoidal-plexus',
    name: 'Hepatic sinusoidal plexus',
    shortName: 'Sinusoidal plexus',
    kind: 'sinusoid',
    description: 'A schematic intrahepatic reticular microvascular network between developing hepatoblast cords. It is not a measured capillary reconstruction and is not presented as the direct fate of every vitelline segment.',
    status: 'Intrahepatic microvascular network',
    color: '#e6c77a',
    radius: 0.018,
    paths: sinusoidalPaths,
    states: states(plexusStates, plexusStates),
    evidence: {
      'classical-2008': 'Collardeau-Frachon and Scoazec describe sinusoids appearing as hepatic cords invade the septum transversum. They discuss two proposed sources: pre-existing septum-transversum capillaries and disruption of vitelline veins; these mechanisms are not resolved as one exclusive explanation.',
      'human-2017': 'Hikspoors et al. report sinusoids entering from the venous sinus to form a network while the larger vitelline and umbilical conduits remain temporarily identifiable after enclosure by hepatoblasts.'
    },
    sourceIds: ['CF2008', 'HIKSPOORS2017']
  },
  {
    id: 'classical-venae-advehentes',
    name: 'Venae advehentes — classical afferent channels',
    shortName: 'Venae advehentes',
    kind: 'afferent',
    description: 'Small afferent channels directed toward the hepatic sinusoidal plexus in the classical 2008 account. Their boundary anchors are schematic; the associated intervitelline anastomoses are deferred to Milestone 4.',
    status: 'Classical model · afferent',
    color: '#58c7a8',
    radius: 0.031,
    paths: [
      path('advehent-left', 'node-classical-subhepatic-left', 'node-sinusoid-lower-left', point(-1.0, 1.18, -0.08)),
      path('advehent-right', 'node-classical-subhepatic-right', 'node-sinusoid-lower-inner-right', point(0.72, 1.18, -0.04))
    ],
    states: states(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'expanding', cs15: 'persistent', cs16: 'persistent' },
      notInHuman
    ),
    evidence: {
      'classical-2008': 'The review describes venae advehentes conveying blood from the subhepatic anastomosis toward the sinusoidal plexus. The actual subhepatic anastomosis is not part of this milestone.',
      'human-2017': 'Not represented as a separate named venae-advehentes system in this profile. Right portal branches from the right vitelline conduit are shown separately.'
    },
    sourceIds: ['CF2008']
  },
  {
    id: 'classical-venae-revehentes',
    name: 'Venae revehentes — classical efferent channels',
    shortName: 'Venae revehentes',
    kind: 'efferent',
    description: 'Efferent channels draining the hepatic sinusoidal plexus toward the cranial / subdiaphragmatic outflow in the classical 2008 account. They represent the primary right and left hepatic draining vessels (venae revehentes) in this simplified early arrangement.',
    status: 'Classical model · efferent',
    color: '#ef9b72',
    radius: 0.031,
    paths: [
      path('revehent-left', 'node-sinusoid-upper-left', 'node-classical-subdiaphragmatic-left', point(-0.58, 2.18, 0.26)),
      path('revehent-right', 'node-sinusoid-upper-inner-right', 'node-classical-subdiaphragmatic-right', point(0.46, 2.18, 0.27))
    ],
    states: states(
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'expanding', cs15: 'persistent', cs16: 'persistent' },
      notInHuman
    ),
    evidence: {
      'classical-2008': 'The review describes venae revehentes draining the sinusoidal plexus into the subdiaphragmatic anastomosis and onward toward the sinus venosus. The anastomosis itself is not drawn in this milestone.',
      'human-2017': 'Not represented as a separate named venae-revehentes system in this profile. The human reconstruction instead describes a draining-vein network developing retrogradely from hepatocardiac channels.'
    },
    sourceIds: ['CF2008']
  },
  {
    id: 'human-sinusoidal-entry',
    name: 'Sinusoidal entry from the venous sinus — human reconstruction',
    shortName: 'Sinusoidal entry',
    kind: 'sinusoidal-entry',
    description: 'Schematic entry paths representing the 2017 reconstruction description of sinusoids entering from the venous sinus to form the intrahepatic network.',
    status: 'Human reconstruction · 2017',
    color: '#8ebce8',
    radius: 0.028,
    paths: [
      path('sinusoidal-entry-left', 'node-human-sinus-venosus', 'node-sinusoid-upper-left', point(-0.42, 2.43, 0.22)),
      path('sinusoidal-entry-right', 'node-human-sinus-venosus', 'node-sinusoid-upper-inner-right', point(0.42, 2.43, 0.22))
    ],
    states: states(
      notInClassical,
      { cs10: 'not-yet-visible', cs12: 'developing', cs13: 'expanding', cs14: 'expanding', cs15: 'persistent', cs16: 'persistent' }
    ),
    evidence: {
      'classical-2008': 'This explicit entry route from the venous sinus is not drawn as a separate pathway in the classical profile.',
      'human-2017': 'The discussion in Hikspoors et al. describes sinusoids entering from the venous sinus during the CS12–CS14 expansion of the hepatic primordium.'
    },
    sourceIds: ['HIKSPOORS2017']
  },
  {
    id: 'human-right-hepatic-drainage',
    name: 'Right hepatic draining-vein network — human reconstruction',
    shortName: 'Right hepatic drainage',
    kind: 'hepatic-drainage',
    description: 'A schematic right-dominant draining network extending from the right hepatocardiac channel into the liver. It represents a network, not a single named vein.',
    status: 'Human reconstruction · right drainage',
    color: '#ef9b72',
    radius: 0.034,
    paths: [
      path('right-drainage-upper', 'node-human-hepatocardiac-right', 'node-sinusoid-upper-inner-right', point(0.52, 1.98, 0.27), 1.25),
      path('right-drainage-middle', 'node-human-hepatocardiac-right', 'node-sinusoid-mid-inner-right', point(0.78, 1.82, 0.26), 1.0),
      path('right-drainage-lower', 'node-human-hepatocardiac-right', 'node-sinusoid-lower-inner-right', point(0.96, 1.55, 0.18), 0.82)
    ],
    states: states(
      notInClassical,
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'expanding', cs15: 'persistent', cs16: 'persistent' }
    ),
    evidence: {
      'classical-2008': 'Not drawn as the same reconstruction-specific retrograde network in this profile; use the classical venae revehentes layer instead.',
      'human-2017': 'Hikspoors et al. describe a network of draining veins developing in a retrograde direction from the hepatocardiac channels, with pronounced left–right asymmetry. Geometry is schematic.'
    },
    sourceIds: ['HIKSPOORS2017']
  },
  {
    id: 'human-left-hepatic-drainage',
    name: 'Left hepatic draining-vein remnant — human reconstruction',
    shortName: 'Left hepatic drainage',
    kind: 'hepatic-drainage',
    description: 'A small left-sided draining pathway is shown only during its reported temporary presence; it regresses as a distinct channel in the human reconstruction.',
    status: 'Human reconstruction · left drainage',
    color: '#b7a0df',
    radius: 0.022,
    paths: [
      path('left-drainage-remnant', 'node-human-hepatocardiac-left', 'node-sinusoid-upper-inner-left', point(-0.48, 1.98, 0.22), 0.72)
    ],
    states: states(
      notInClassical,
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'developing', cs14: 'regressing', cs15: 'not-distinct', cs16: 'not-distinct' }
    ),
    evidence: {
      'classical-2008': 'Not drawn as a separate reconstruction-specific left drainage remnant in this profile.',
      'human-2017': 'The 2017 reconstruction describes a small left hepatocardiac vein and tributaries persisting temporarily and disappearing as distinct channels by late CS14 in the sampled series.'
    },
    sourceIds: ['HIKSPOORS2017']
  },
  {
    id: 'human-right-portal-branches',
    name: 'Right intrahepatic portal branches — vitelline contribution',
    shortName: 'Right portal branches',
    kind: 'portal-branch',
    description: 'Schematic right-sided portal branches arising from the intrahepatic right vitelline (portal) conduit. Left-sided portal branches are intentionally not drawn here because the 2017 reconstruction assigns them to the left umbilical vein.',
    status: 'Human reconstruction · right portal inflow',
    color: '#5ca9d6',
    radius: 0.029,
    paths: [
      path('right-portal-branch-cranial', 'node-human-right-vitelline-branch-cranial', 'node-sinusoid-mid-inner-right', point(0.72, 1.55, 0.29)),
      path('right-portal-branch-central', 'node-human-right-vitelline-branch-caudal', 'node-sinusoid-mid-center', point(0.34, 1.7, 0.28)),
      path('right-portal-branch-caudal', 'node-human-right-vitelline-branch-caudal', 'node-sinusoid-lower-inner-right', point(0.48, 1.48, 0.2), 0.82)
    ],
    states: states(
      notInClassical,
      { cs10: 'not-yet-visible', cs12: 'not-yet-visible', cs13: 'not-yet-visible', cs14: 'developing', cs15: 'expanding', cs16: 'persistent' }
    ),
    evidence: {
      'classical-2008': 'This explicit right-versus-left portal branch lineage is not used as a combined statement in the classical profile.',
      'human-2017': 'Hikspoors et al. report that right intrahepatic portal branches arise from the intrahepatic right vitelline (portal) vein. The left-sided branches arise from the left umbilical vein and are outside this vitelline-only layer.'
    },
    sourceIds: ['HIKSPOORS2017']
  }
];

const STATE_PRESENTATION: Record<HepaticVascularState, Omit<HepaticLayerPresentation, 'state'>> = {
  'not-yet-visible': { statusLabel: 'Not yet represented at this stage', opacity: 0, radiusScale: 0, visible: false },
  developing: { statusLabel: 'Developing', opacity: 0.58, radiusScale: 0.84, visible: true },
  expanding: { statusLabel: 'Expanding', opacity: 0.82, radiusScale: 1, visible: true },
  persistent: { statusLabel: 'Persistent in this profile', opacity: 0.94, radiusScale: 1.04, visible: true },
  regressing: { statusLabel: 'Regressing as a distinct channel', opacity: 0.42, radiusScale: 0.72, visible: true },
  'not-distinct': { statusLabel: 'No longer distinct in this profile', opacity: 0, radiusScale: 0, visible: false },
  'not-in-profile': { statusLabel: 'Not represented in this evidence profile', opacity: 0, radiusScale: 0, visible: false }
};

export function getHepaticLayerPresentation(
  layer: HepaticVascularLayer,
  profile: EvidenceProfile,
  stageId: VitellineStageId
): HepaticLayerPresentation {
  const state = layer.states[profile][stageId];
  return { state, ...STATE_PRESENTATION[state] };
}

export function validateHepaticVascularNetwork(): string[] {
  const issues: string[] = [];
  const nodeIds = new Set<string>();
  const layerIds = new Set<string>();
  const pathIds = new Set<string>();
  const knownExternalAnchors = new Set([
    'sinus-venosus',
    'vitelline-right-intrahepatic',
    'vitelline-left-intrahepatic',
    'node-right-hepatic-exit',
    'node-left-hepatic-exit'
  ]);

  for (const node of HEPATIC_VASCULAR_NODES) {
    if (nodeIds.has(node.id)) issues.push('Duplicate hepatic vascular node ID: ' + node.id);
    nodeIds.add(node.id);
    if (node.linkedStructureNode && !knownExternalAnchors.has(node.linkedStructureNode)) {
      issues.push(node.id + ' links to an unknown external structure ' + node.linkedStructureNode);
    }
  }

  for (const layer of HEPATIC_VASCULAR_LAYERS) {
    if (layerIds.has(layer.id)) issues.push('Duplicate hepatic vascular layer ID: ' + layer.id);
    layerIds.add(layer.id);
    if (layer.paths.length === 0) issues.push(layer.id + ' has no geometry paths');

    for (const pathItem of layer.paths) {
      if (pathIds.has(pathItem.id)) issues.push('Duplicate hepatic vascular path ID: ' + pathItem.id);
      pathIds.add(pathItem.id);
      if (!nodeIds.has(pathItem.fromNode)) issues.push(pathItem.id + ' has a missing start node ' + pathItem.fromNode);
      if (!nodeIds.has(pathItem.toNode)) issues.push(pathItem.id + ' has a missing end node ' + pathItem.toNode);
      if (pathItem.points.length < 2) issues.push(pathItem.id + ' needs at least two centreline points');

      const from = HEPATIC_VASCULAR_NODES.find((node) => node.id === pathItem.fromNode);
      const to = HEPATIC_VASCULAR_NODES.find((node) => node.id === pathItem.toNode);
      if (from && pathItem.points.length > 0) {
        const first = pathItem.points[0];
        const distance = Math.hypot(first[0] - from.position[0], first[1] - from.position[1], first[2] - from.position[2]);
        if (distance > 0.0001) issues.push(pathItem.id + ' does not begin at its declared start node');
      }
      if (to && pathItem.points.length > 0) {
        const last = pathItem.points[pathItem.points.length - 1];
        const distance = Math.hypot(last[0] - to.position[0], last[1] - to.position[1], last[2] - to.position[2]);
        if (distance > 0.0001) issues.push(pathItem.id + ' does not end at its declared end node');
      }
    }

    for (const profile of ['classical-2008', 'human-2017'] as const) {
      for (const stage of ['cs10', 'cs12', 'cs13', 'cs14', 'cs15', 'cs16'] as const) {
        if (!layer.states[profile][stage]) issues.push(layer.id + ' has no state for ' + profile + ' / ' + stage);
      }
      if (!layer.evidence[profile]) issues.push(layer.id + ' has no evidence note for ' + profile);
    }
  }

  const plexus = HEPATIC_VASCULAR_LAYERS.find((layer) => layer.id === 'hepatic-sinusoidal-plexus');
  if (plexus) {
    const adjacency = new Map<string, Set<string>>();
    const usedNodes = new Set<string>();
    for (const edge of plexus.paths) {
      usedNodes.add(edge.fromNode);
      usedNodes.add(edge.toNode);
      if (!adjacency.has(edge.fromNode)) adjacency.set(edge.fromNode, new Set());
      if (!adjacency.has(edge.toNode)) adjacency.set(edge.toNode, new Set());
      adjacency.get(edge.fromNode)!.add(edge.toNode);
      adjacency.get(edge.toNode)!.add(edge.fromNode);
    }
    const first = plexus.paths[0]?.fromNode;
    const visited = new Set<string>();
    if (first) {
      const queue = [first];
      while (queue.length) {
        const current = queue.shift()!;
        if (visited.has(current)) continue;
        visited.add(current);
        adjacency.get(current)?.forEach((next) => {
          if (!visited.has(next)) queue.push(next);
        });
      }
    }
    if (visited.size !== usedNodes.size) {
      issues.push('The hepatic sinusoidal plexus is disconnected: reached ' + visited.size + ' of ' + usedNodes.size + ' path nodes');
    }
  }

  return issues;
}

export const HEPATIC_VASCULAR_NETWORK_ISSUES = validateHepaticVascularNetwork();
