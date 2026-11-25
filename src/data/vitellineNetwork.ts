import type { EvidenceProfile } from './stages';

export type VitellineStageId = 'cs10' | 'cs12' | 'cs13' | 'cs14' | 'cs15' | 'cs16';
export type VesselSide = 'right' | 'left';
export type VesselRegion = 'yolk-sac-root' | 'extrahepatic' | 'intrahepatic' | 'hepatocardiac';
export type VesselState =
  | 'present'
  | 'incorporated'
  | 'dominant'
  | 'remodeling'
  | 'fragmenting'
  | 'regressing'
  | 'not-distinct';

export type Point3 = readonly [number, number, number];

export interface VesselNode {
  id: string;
  label: string;
  position: Point3;
  description: string;
  terminal?: boolean;
}

export interface VesselSegment {
  id: string;
  name: string;
  side: VesselSide;
  region: VesselRegion;
  fromNode: string;
  toNode: string;
  points: readonly Point3[];
  radius: number;
  color: string;
  description: string;
  states: Record<EvidenceProfile, Record<VitellineStageId, VesselState>>;
  pathOverrides?: Partial<
    Record<EvidenceProfile, Partial<Record<VitellineStageId, readonly (readonly Point3[])[]>>>
  >;
}

export interface VesselPresentation {
  state: VesselState;
  statusLabel: string;
  opacity: number;
  radiusScale: number;
  paths: readonly (readonly Point3[])[];
  visible: boolean;
}

const STAGES: VitellineStageId[] = ['cs10', 'cs12', 'cs13', 'cs14', 'cs15', 'cs16'];

const RIGHT = '#53b7d8';
const LEFT = '#a58de4';

const point = (x: number, y: number, z: number): Point3 => [x, y, z];

export const VITELLINE_NODES: VesselNode[] = [
  {
    id: 'node-yolk-sac-right',
    label: 'Right yolk-sac venous root',
    position: point(0.68, -1.68, -0.54),
    description: 'Schematic attachment of the right vitelline channel to the yolk-sac venous plexus.',
    terminal: true
  },
  {
    id: 'node-right-caudal',
    label: 'Right caudal vitelline junction',
    position: point(0.86, -1.12, -0.32),
    description: 'Shared node joining the right yolk-sac root to the extrahepatic trunk.'
  },
  {
    id: 'node-right-hepatic-entry',
    label: 'Right hepatic entry',
    position: point(0.92, 0.95, 0.3),
    description: 'Schematic point where the right vitelline channel becomes enclosed by the developing hepatic primordium.'
  },
  {
    id: 'node-right-hepatic-exit',
    label: 'Right hepatocardiac junction',
    position: point(0.3, 2.02, 0.25),
    description: 'Schematic junction between the right intrahepatic conduit and its cranial hepatocardiac outflow.'
  },
  {
    id: 'node-venous-pole-right',
    label: 'Right venous-pole entry',
    position: point(0.45, 2.82, 0.2),
    description: 'Right-sided entry region at the sinus venosus / venous pole.',
    terminal: true
  },
  {
    id: 'node-yolk-sac-left',
    label: 'Left yolk-sac venous root',
    position: point(-0.68, -1.68, -0.54),
    description: 'Schematic attachment of the left vitelline channel to the yolk-sac venous plexus.',
    terminal: true
  },
  {
    id: 'node-left-caudal',
    label: 'Left caudal vitelline junction',
    position: point(-0.86, -1.12, -0.32),
    description: 'Shared node joining the left yolk-sac root to the extrahepatic trunk.'
  },
  {
    id: 'node-left-hepatic-entry',
    label: 'Left hepatic entry',
    position: point(-0.92, 0.95, 0.3),
    description: 'Schematic point where the left vitelline channel enters the developing hepatic primordium.'
  },
  {
    id: 'node-left-hepatic-exit',
    label: 'Left hepatocardiac junction',
    position: point(-0.3, 2.02, 0.25),
    description: 'Schematic junction between the left intrahepatic conduit and its cranial hepatocardiac outflow.'
  },
  {
    id: 'node-venous-pole-left',
    label: 'Left venous-pole entry',
    position: point(-0.25, 2.82, 0.2),
    description: 'Left-sided entry region at the sinus venosus / venous pole.',
    terminal: true
  }
];

const rightStates = {
  'yolk-sac-root': {
    'classical-2008': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' },
    'human-2017': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' }
  },
  extrahepatic: {
    'classical-2008': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' },
    'human-2017': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' }
  },
  intrahepatic: {
    'classical-2008': { cs10: 'present', cs12: 'present', cs13: 'incorporated', cs14: 'dominant', cs15: 'dominant', cs16: 'dominant' },
    'human-2017': { cs10: 'present', cs12: 'present', cs13: 'incorporated', cs14: 'dominant', cs15: 'dominant', cs16: 'dominant' }
  },
  hepatocardiac: {
    'classical-2008': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'dominant', cs15: 'dominant', cs16: 'dominant' },
    'human-2017': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'dominant', cs15: 'dominant', cs16: 'dominant' }
  }
} as const satisfies Record<VesselRegion, Record<EvidenceProfile, Record<VitellineStageId, VesselState>>>;

const leftStates = {
  'yolk-sac-root': {
    'classical-2008': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' },
    'human-2017': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' }
  },
  extrahepatic: {
    'classical-2008': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' },
    'human-2017': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'present', cs15: 'present', cs16: 'present' }
  },
  intrahepatic: {
    'classical-2008': { cs10: 'present', cs12: 'present', cs13: 'remodeling', cs14: 'remodeling', cs15: 'remodeling', cs16: 'remodeling' },
    'human-2017': { cs10: 'present', cs12: 'present', cs13: 'incorporated', cs14: 'fragmenting', cs15: 'not-distinct', cs16: 'not-distinct' }
  },
  hepatocardiac: {
    'classical-2008': { cs10: 'present', cs12: 'present', cs13: 'present', cs14: 'regressing', cs15: 'not-distinct', cs16: 'not-distinct' },
    'human-2017': { cs10: 'present', cs12: 'present', cs13: 'remodeling', cs14: 'regressing', cs15: 'not-distinct', cs16: 'not-distinct' }
  }
} as const satisfies Record<VesselRegion, Record<EvidenceProfile, Record<VitellineStageId, VesselState>>>;

function statesFor(side: VesselSide, region: VesselRegion) {
  return side === 'right' ? rightStates[region] : leftStates[region];
}

const rightRoot: VesselSegment = {
  id: 'vitelline-right-yolk-sac-root',
  name: 'Right vitelline vein — yolk-sac root',
  side: 'right',
  region: 'yolk-sac-root',
  fromNode: 'node-yolk-sac-right',
  toNode: 'node-right-caudal',
  points: [
    point(0.68, -1.68, -0.54),
    point(0.73, -1.48, -0.49),
    point(0.81, -1.28, -0.4),
    point(0.86, -1.12, -0.32)
  ],
  radius: 0.075,
  color: RIGHT,
  description: 'The right vitelline channel begins in the yolk-sac venous drainage and joins the extrahepatic right-sided trunk. The centerline is schematic, not a specimen measurement.',
  states: statesFor('right', 'yolk-sac-root')
};

const rightExtrahepatic: VesselSegment = {
  id: 'vitelline-right-extrahepatic',
  name: 'Right vitelline vein — extrahepatic trunk',
  side: 'right',
  region: 'extrahepatic',
  fromNode: 'node-right-caudal',
  toNode: 'node-right-hepatic-entry',
  points: [
    point(0.86, -1.12, -0.32),
    point(0.99, -0.78, -0.18),
    point(1.08, -0.36, -0.03),
    point(1.07, 0.3, 0.14),
    point(0.92, 0.95, 0.3)
  ],
  radius: 0.085,
  color: RIGHT,
  description: 'The right extrahepatic vitelline trunk is kept lateral to the gut reference. No intervitelline anastomosis is included in this milestone.',
  states: statesFor('right', 'extrahepatic')
};

const rightIntrahepatic: VesselSegment = {
  id: 'vitelline-right-intrahepatic',
  name: 'Right vitelline vein — intrahepatic conduit',
  side: 'right',
  region: 'intrahepatic',
  fromNode: 'node-right-hepatic-entry',
  toNode: 'node-right-hepatic-exit',
  points: [
    point(0.92, 0.38, 0.3),
    point(0.98, 1.2, 0.36),
    point(0.82, 1.48, 0.4),
    point(0.58, 1.78, 0.34),
    point(0.3, 2.02, 0.25)
  ],
  radius: 0.09,
  color: RIGHT,
  description: 'A schematic right intrahepatic vitelline conduit. In the 2017 human reconstruction the right conduit is wider than the left and persists as the dominant vitelline / portal pathway in the described stages.',
  states: statesFor('right', 'intrahepatic')
};

const rightHepatocardiac: VesselSegment = {
  id: 'vitelline-right-hepatocardiac',
  name: 'Right vitelline vein — hepatocardiac channel',
  side: 'right',
  region: 'hepatocardiac',
  fromNode: 'node-right-hepatic-exit',
  toNode: 'node-venous-pole-right',
  points: [
    point(0.3, 2.02, 0.25),
    point(0.34, 2.27, 0.23),
    point(0.4, 2.54, 0.21),
    point(0.45, 2.82, 0.2)
  ],
  radius: 0.095,
  color: RIGHT,
  description: 'The right hepatocardiac channel carries the right hepatic venous outflow toward the venous pole and becomes the dominant right-sided channel in the cited reconstructions.',
  states: statesFor('right', 'hepatocardiac')
};

const leftRoot: VesselSegment = {
  id: 'vitelline-left-yolk-sac-root',
  name: 'Left vitelline vein — yolk-sac root',
  side: 'left',
  region: 'yolk-sac-root',
  fromNode: 'node-yolk-sac-left',
  toNode: 'node-left-caudal',
  points: [
    point(-0.68, -1.68, -0.54),
    point(-0.73, -1.48, -0.49),
    point(-0.81, -1.28, -0.4),
    point(-0.86, -1.12, -0.32)
  ],
  radius: 0.075,
  color: LEFT,
  description: 'The left vitelline channel begins in the yolk-sac venous drainage and joins the extrahepatic left-sided trunk. The centerline is schematic, not a specimen measurement.',
  states: statesFor('left', 'yolk-sac-root')
};

const leftExtrahepatic: VesselSegment = {
  id: 'vitelline-left-extrahepatic',
  name: 'Left vitelline vein — extrahepatic trunk',
  side: 'left',
  region: 'extrahepatic',
  fromNode: 'node-left-caudal',
  toNode: 'node-left-hepatic-entry',
  points: [
    point(-0.86, -1.12, -0.32),
    point(-0.99, -0.78, -0.18),
    point(-1.08, -0.36, -0.03),
    point(-1.07, 0.3, 0.14),
    point(-0.92, 0.95, 0.3)
  ],
  radius: 0.085,
  color: LEFT,
  description: 'The left extrahepatic vitelline trunk is kept lateral to the gut reference. It remains distinct from the later profile-specific portal anastomoses.',
  states: statesFor('left', 'extrahepatic')
};

const leftIntrahepatic: VesselSegment = {
  id: 'vitelline-left-intrahepatic',
  name: 'Left vitelline vein — intrahepatic conduit',
  side: 'left',
  region: 'intrahepatic',
  fromNode: 'node-left-hepatic-entry',
  toNode: 'node-left-hepatic-exit',
  points: [
    point(-0.92, 0.38, 0.3),
    point(-0.98, 1.2, 0.36),
    point(-0.82, 1.48, 0.4),
    point(-0.58, 1.78, 0.34),
    point(-0.3, 2.02, 0.25)
  ],
  radius: 0.075,
  color: LEFT,
  description: 'The left intrahepatic vitelline conduit is initially paired with the right. In the 2017 human reconstruction it breaks up and is no longer identifiable as a large conduit by early CS14; this does not mean that all left intrahepatic vascular channels disappear.',
  states: statesFor('left', 'intrahepatic'),
  pathOverrides: {
    'human-2017': {
      cs14: [
        [point(-0.96, 1.08, 0.36), point(-0.9, 1.24, 0.38)],
        [point(-0.82, 1.38, 0.4), point(-0.73, 1.52, 0.4)],
        [point(-0.65, 1.66, 0.37), point(-0.55, 1.8, 0.34)]
      ],
      cs15: [
        [point(-0.84, 1.42, 0.4), point(-0.8, 1.48, 0.4)],
        [point(-0.63, 1.72, 0.37), point(-0.59, 1.78, 0.35)]
      ],
      cs16: [
        [point(-0.77, 1.52, 0.4), point(-0.73, 1.58, 0.4)]
      ]
    }
  }
};

const leftHepatocardiac: VesselSegment = {
  id: 'vitelline-left-hepatocardiac',
  name: 'Left vitelline vein — hepatocardiac channel',
  side: 'left',
  region: 'hepatocardiac',
  fromNode: 'node-left-hepatic-exit',
  toNode: 'node-venous-pole-left',
  points: [
    point(-0.3, 2.02, 0.25),
    point(-0.34, 2.27, 0.23),
    point(-0.3, 2.54, 0.21),
    point(-0.25, 2.82, 0.2)
  ],
  radius: 0.08,
  color: LEFT,
  description: 'The left hepatocardiac channel becomes incorporated into the sinus venosus wall and regresses as a distinct channel in the human reconstruction. It is not the entire left vitelline vein.',
  states: statesFor('left', 'hepatocardiac'),
  pathOverrides: {
    'human-2017': {
      cs14: [
        [point(-0.3, 2.02, 0.25), point(-0.29, 2.17, 0.23)]
      ],
      cs15: [
        [point(-0.27, 2.2, 0.23), point(-0.25, 2.28, 0.22)]
      ],
      cs16: [
        [point(-0.25, 2.27, 0.22), point(-0.24, 2.31, 0.22)]
      ]
    },
    'classical-2008': {
      cs15: [
        [point(-0.29, 2.05, 0.25), point(-0.27, 2.16, 0.23)]
      ],
      cs16: [
        [point(-0.26, 2.14, 0.23), point(-0.25, 2.2, 0.22)]
      ]
    }
  }
};

export const VITELLINE_SEGMENTS: VesselSegment[] = [
  rightRoot,
  rightExtrahepatic,
  rightIntrahepatic,
  rightHepatocardiac,
  leftRoot,
  leftExtrahepatic,
  leftIntrahepatic,
  leftHepatocardiac
];

const STATE_PRESENTATION: Record<VesselState, Omit<VesselPresentation, 'state' | 'paths'>> = {
  present: { statusLabel: 'Present', opacity: 0.94, radiusScale: 1, visible: true },
  incorporated: { statusLabel: 'Enclosed by developing liver', opacity: 0.98, radiusScale: 1.02, visible: true },
  dominant: { statusLabel: 'Enlarged / dominant', opacity: 1, radiusScale: 1.24, visible: true },
  remodeling: { statusLabel: 'Remodeling — source-specific', opacity: 0.7, radiusScale: 0.84, visible: true },
  fragmenting: { statusLabel: 'Fragmenting as a large conduit', opacity: 0.58, radiusScale: 0.76, visible: true },
  regressing: { statusLabel: 'Regressing as a distinct channel', opacity: 0.42, radiusScale: 0.72, visible: true },
  'not-distinct': { statusLabel: 'No longer distinct as a large channel', opacity: 0.25, radiusScale: 0.58, visible: true }
};

export function getVesselPresentation(
  segment: VesselSegment,
  profile: EvidenceProfile,
  stageId: VitellineStageId
): VesselPresentation {
  const state = segment.states[profile][stageId];
  const presentation = STATE_PRESENTATION[state];
  const override = segment.pathOverrides?.[profile]?.[stageId];
  const paths = override ?? [segment.points];
  return {
    state,
    ...presentation,
    paths,
    visible: presentation.visible && paths.length > 0
  };
}

export function validateVitellineNetwork(): string[] {
  const issues: string[] = [];
  const nodeMap = new Map(VITELLINE_NODES.map((node) => [node.id, node]));
  const segmentIds = new Set<string>();

  for (const segment of VITELLINE_SEGMENTS) {
    if (segmentIds.has(segment.id)) issues.push('Duplicate vessel segment ID: ' + segment.id);
    segmentIds.add(segment.id);

    const from = nodeMap.get(segment.fromNode);
    const to = nodeMap.get(segment.toNode);
    if (!from) issues.push(segment.id + ' has missing start node ' + segment.fromNode);
    if (!to) issues.push(segment.id + ' has missing end node ' + segment.toNode);
    if (segment.points.length < 2) issues.push(segment.id + ' needs at least two centerline points');

    if (from && segment.points.length > 0) {
      const first = segment.points[0];
      const distance = Math.hypot(first[0] - from.position[0], first[1] - from.position[1], first[2] - from.position[2]);
      if (distance > 0.0001) issues.push(segment.id + ' does not begin at its declared start node');
    }

    if (to && segment.points.length > 0) {
      const last = segment.points[segment.points.length - 1];
      const distance = Math.hypot(last[0] - to.position[0], last[1] - to.position[1], last[2] - to.position[2]);
      if (distance > 0.0001) issues.push(segment.id + ' does not end at its declared end node');
    }

    for (const profile of ['classical-2008', 'human-2017'] as const) {
      for (const stage of STAGES) {
        if (!segment.states[profile][stage]) issues.push(segment.id + ' has no state for ' + profile + ' / ' + stage);
      }
    }
  }

  const chains = [
    ['vitelline-right-yolk-sac-root', 'vitelline-right-extrahepatic', 'vitelline-right-intrahepatic', 'vitelline-right-hepatocardiac'],
    ['vitelline-left-yolk-sac-root', 'vitelline-left-extrahepatic', 'vitelline-left-intrahepatic', 'vitelline-left-hepatocardiac']
  ];
  for (const chain of chains) {
    const segments = chain.map((id) => VITELLINE_SEGMENTS.find((segment) => segment.id === id));
    if (segments.some((segment) => !segment)) {
      issues.push('A paired vitelline drainage chain is incomplete: ' + chain.join(' → '));
      continue;
    }
    for (let index = 0; index < segments.length - 1; index += 1) {
      if (segments[index]!.toNode !== segments[index + 1]!.fromNode) {
        issues.push('Disconnected vessel junction between ' + segments[index]!.id + ' and ' + segments[index + 1]!.id);
      }
    }
  }

  return issues;
}

export const VITELLINE_NETWORK_ISSUES = validateVitellineNetwork();
