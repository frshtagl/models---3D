import type { Point3, VitellineStageId } from './vitellineNetwork';
import { VITELLINE_NODES } from './vitellineNetwork';

export type CardinalModel = 'human-cardinal-2015' | 'textbook-segmental';

export type CardinalState =
  | 'not-yet-visible'
  | 'present'
  | 'developing'
  | 'expanding'
  | 'persistent'
  | 'remodeling'
  | 'regressing'
  | 'not-in-model';

export type CardinalStageStates = Record<VitellineStageId, CardinalState>;

export interface CardinalNode {
  id: string;
  label: string;
  position: Point3;
  description: string;
}

export interface CardinalPath {
  id: string;
  fromNode: string;
  toNode: string;
  points: readonly Point3[];
  radiusScale?: number;
  flowArrow?: boolean;
}

export interface CardinalVascularLayer {
  id: string;
  name: string;
  shortName: string;
  description: string;
  status: string;
  color: string;
  radius: number;
  model: CardinalModel | 'shared';
  paths: readonly CardinalPath[];
  states: Record<CardinalModel, CardinalStageStates>;
  evidence: Record<CardinalModel, string>;
  sourceIds: readonly string[];
}

export interface CardinalPresentation {
  state: CardinalState;
  statusLabel: string;
  opacity: number;
  radiusScale: number;
  visible: boolean;
}

const point = (x: number, y: number, z: number): Point3 => [x, y, z];
const STAGES: VitellineStageId[] = ['cs10', 'cs12', 'cs13', 'cs14', 'cs15', 'cs16'];

const stageMap = (
  cs10: CardinalState,
  cs12: CardinalState,
  cs13: CardinalState,
  cs14: CardinalState,
  cs15: CardinalState,
  cs16: CardinalState
): CardinalStageStates => ({ cs10, cs12, cs13, cs14, cs15, cs16 });

const hidden = (): CardinalStageStates => ({
  cs10: 'not-in-model',
  cs12: 'not-in-model',
  cs13: 'not-in-model',
  cs14: 'not-in-model',
  cs15: 'not-in-model',
  cs16: 'not-in-model'
});

const paired = (states: CardinalStageStates): Record<CardinalModel, CardinalStageStates> => ({
  'human-cardinal-2015': states,
  'textbook-segmental': states
});

const models = (
  human: CardinalStageStates,
  textbook: CardinalStageStates
): Record<CardinalModel, CardinalStageStates> => ({
  'human-cardinal-2015': human,
  'textbook-segmental': textbook
});

export const CARDINAL_MODEL_LABELS: Record<CardinalModel, string> = {
  'human-cardinal-2015': 'Human reconstruction · 2015',
  'textbook-segmental': 'Conventional segmental model'
};

export const CARDINAL_MODEL_DESCRIPTIONS: Record<CardinalModel, string> = {
  'human-cardinal-2015': 'Hikspoors et al. reconstruct caudal cardinal veins extending from CS11 to CS15, followed by a subcardinal plexus at CS15 and longitudinal subcardinal channels at CS16. In their human series, the infrarenal IVC and azygos system are traced to caudal cardinal veins, while the renal region develops from the subcardinal system. Later remodeling through CS18–CS23 is not yet animated in this six-stage application.',
  'textbook-segmental': 'The conventional four-segment teaching model describes hepatic IVC from the right vitelline / hepatocardiac channel, suprarenal IVC from the right subcardinal vein, renal IVC from subcardinal–supracardinal anastomoses, and infrarenal IVC from the right supracardinal vein. The model is shown as a separate interpretation; it is not merged with the 2015 human reconstruction.'
};

export const CARDINAL_NODES: CardinalNode[] = [
  { id: 'node-cardinal-right-anterior-cranial', label: 'Right anterior cardinal — cranial end', position: point(0.88, 2.78, 0.78), description: 'Cranial drainage anchor; the head and neck are not reconstructed in this module.' },
  { id: 'node-cardinal-left-anterior-cranial', label: 'Left anterior cardinal — cranial end', position: point(-0.88, 2.78, 0.78), description: 'Cranial drainage anchor; the head and neck are not reconstructed in this module.' },
  { id: 'node-cardinal-right-common', label: 'Right common cardinal junction', position: point(0.62, 2.28, 0.72), description: 'Junction of the right anterior and caudal cardinal pathways before entering the right sinus horn.' },
  { id: 'node-cardinal-left-common', label: 'Left common cardinal junction', position: point(-0.62, 2.28, 0.72), description: 'Junction of the left anterior and caudal cardinal pathways before entering the left sinus horn.' },
  { id: 'node-cardinal-right-caudal-mesonephric', label: 'Right caudal cardinal — mesonephric level', position: point(0.72, -0.88, 0.72), description: 'A branch point at the mesonephric level from which the subcardinal plexus is shown developing.' },
  { id: 'node-cardinal-left-caudal-mesonephric', label: 'Left caudal cardinal — mesonephric level', position: point(-0.72, -0.88, 0.72), description: 'A branch point at the mesonephric level from which the subcardinal plexus is shown developing.' },
  { id: 'node-cardinal-right-caudal-pelvic', label: 'Right caudal cardinal — pelvic end', position: point(0.48, -2.22, 0.72), description: 'Caudal end of the right caudal cardinal pathway in the developing pelvic region.' },
  { id: 'node-cardinal-left-caudal-pelvic', label: 'Left caudal cardinal — pelvic end', position: point(-0.48, -2.22, 0.72), description: 'Caudal end of the left caudal cardinal pathway in the developing pelvic region.' },
  { id: 'node-cardinal-right-subcardinal-cranial', label: 'Right subcardinal — cranial mesonephric end', position: point(0.48, -0.42, 0.2), description: 'Cranial part of the right subcardinal channel on the ventromedial side of the mesonephros.' },
  { id: 'node-cardinal-left-subcardinal-cranial', label: 'Left subcardinal — cranial mesonephric end', position: point(-0.48, -0.42, 0.2), description: 'Cranial part of the left subcardinal channel on the ventromedial side of the mesonephros.' },
  { id: 'node-cardinal-right-subcardinal-caudal', label: 'Right subcardinal — caudal mesonephric end', position: point(0.5, -1.34, 0.2), description: 'Caudal part of the right subcardinal channel, connected to the caudal cardinal / mesonephric plexus.' },
  { id: 'node-cardinal-left-subcardinal-caudal', label: 'Left subcardinal — caudal mesonephric end', position: point(-0.5, -1.34, 0.2), description: 'Caudal part of the left subcardinal channel, connected to the caudal cardinal / mesonephric plexus.' },
  { id: 'node-cardinal-right-plexus-lateral', label: 'Right mesonephric venous plexus — lateral', position: point(0.9, -0.88, 0.42), description: 'Schematic lateral extent of the subcardinal plexus around the right mesonephros.' },
  { id: 'node-cardinal-left-plexus-lateral', label: 'Left mesonephric venous plexus — lateral', position: point(-0.9, -0.88, 0.42), description: 'Schematic lateral extent of the subcardinal plexus around the left mesonephros.' },
  { id: 'node-cardinal-iliac-confluence', label: 'Developing iliac venous confluence', position: point(0, -2.35, 0.72), description: 'Schematic midline junction of the caudal cardinal / iliac venous channels.' },
  { id: 'node-textbook-right-supracardinal-caudal', label: 'Right supracardinal — caudal reference', position: point(0.92, -1.82, 0.96), description: 'Dorsolateral position of the right supracardinal teaching channel.' },
  { id: 'node-textbook-right-supracardinal-cranial', label: 'Right supracardinal — cranial reference', position: point(0.92, 1.42, 0.96), description: 'Thoracic continuation used in the conventional azygos / infrarenal IVC teaching model.' },
  { id: 'node-textbook-left-supracardinal-caudal', label: 'Left supracardinal — caudal reference', position: point(-0.92, -1.82, 0.96), description: 'Dorsolateral position of the left supracardinal teaching channel.' },
  { id: 'node-textbook-left-supracardinal-cranial', label: 'Left supracardinal — cranial reference', position: point(-0.92, 1.42, 0.96), description: 'Thoracic continuation used in the conventional azygos / hemiazygos teaching model.' }
];

export const CARDINAL_VASCULAR_LAYERS: CardinalVascularLayer[] = [
  {
    id: 'anterior-cardinal-veins',
    name: 'Paired anterior cardinal veins',
    shortName: 'Anterior cardinals',
    description: 'Paired cranial-body drainage channels. They join the caudal cardinal pathways to form the common cardinal veins, which enter the sinus venosus.',
    status: 'Cardinal system · cranial drainage',
    color: '#c58a9b',
    radius: 0.052,
    model: 'shared',
    paths: [
      {
        id: 'right-anterior-cardinal-path',
        fromNode: 'node-cardinal-right-anterior-cranial',
        toNode: 'node-cardinal-right-common',
        points: [
          point(0.88, 2.78, 0.78),
          point(0.82, 2.62, 0.78),
          point(0.72, 2.45, 0.75),
          point(0.62, 2.28, 0.72)
        ],
        flowArrow: true
      },
      {
        id: 'left-anterior-cardinal-path',
        fromNode: 'node-cardinal-left-anterior-cranial',
        toNode: 'node-cardinal-left-common',
        points: [
          point(-0.88, 2.78, 0.78),
          point(-0.82, 2.62, 0.78),
          point(-0.72, 2.45, 0.75),
          point(-0.62, 2.28, 0.72)
        ],
        flowArrow: true
      }
    ],
    states: paired(stageMap('present', 'present', 'present', 'present', 'present', 'present')),
    evidence: {
      'human-cardinal-2015': 'The cranial cardinal system drains the cranial part of the embryo. This module shows only the caudal ends of the anterior cardinal veins because the head and neck are outside the current anatomical blockout.',
      'textbook-segmental': 'The anterior cardinal veins drain the cranial embryo and join the posterior cardinal veins to form the common cardinal veins.'
    },
    sourceIds: ['HIKSPOORS2015', 'MOORE_IVC']
  },
  {
    id: 'common-cardinal-veins',
    name: 'Paired common cardinal veins (ducts of Cuvier)',
    shortName: 'Common cardinals',
    description: 'Each common cardinal vein receives anterior and posterior / caudal cardinal return and enters the corresponding horn of the sinus venosus.',
    status: 'Cardinal system · venous-pole entry',
    color: '#c58a9b',
    radius: 0.058,
    model: 'shared',
    paths: [
      {
        id: 'right-common-cardinal-path',
        fromNode: 'node-cardinal-right-common',
        toNode: 'node-venous-pole-right',
        points: [
          point(0.62, 2.28, 0.72),
          point(0.58, 2.43, 0.6),
          point(0.52, 2.62, 0.4),
          point(0.45, 2.82, 0.2)
        ],
        flowArrow: true
      },
      {
        id: 'left-common-cardinal-path',
        fromNode: 'node-cardinal-left-common',
        toNode: 'node-venous-pole-left',
        points: [
          point(-0.62, 2.28, 0.72),
          point(-0.5, 2.45, 0.58),
          point(-0.38, 2.63, 0.38),
          point(-0.25, 2.82, 0.2)
        ],
        flowArrow: true
      }
    ],
    states: paired(stageMap('present', 'present', 'present', 'present', 'present', 'present')),
    evidence: {
      'human-cardinal-2015': 'The paired common cardinal veins drain into the sinus venosus. The caudal cardinal system is represented separately from the common cardinal segment.',
      'textbook-segmental': 'The common cardinal veins (ducts of Cuvier) are formed by the junction of the anterior and posterior cardinal veins and enter the sinus venosus.'
    },
    sourceIds: ['HIKSPOORS2015', 'MOORE_IVC']
  },
  {
    id: 'caudal-cardinal-veins',
    name: 'Paired caudal (posterior) cardinal veins',
    shortName: 'Caudal cardinals',
    description: 'Paired longitudinal channels drain the caudal body. The 2015 human reconstruction traces their caudal extension from the common cardinal region between CS11 and CS15. The conventional textbook model uses the term posterior cardinal veins for the early paired channels.',
    status: 'Cardinal system · caudal body drainage',
    color: '#b27f93',
    radius: 0.052,
    model: 'shared',
    paths: [
      {
        id: 'right-caudal-cardinal-lower-path',
        fromNode: 'node-cardinal-right-caudal-pelvic',
        toNode: 'node-cardinal-right-caudal-mesonephric',
        points: [
          point(0.48, -2.22, 0.72),
          point(0.58, -1.58, 0.72),
          point(0.72, -0.88, 0.72)
        ]
      },
      {
        id: 'right-caudal-cardinal-upper-path',
        fromNode: 'node-cardinal-right-caudal-mesonephric',
        toNode: 'node-cardinal-right-common',
        points: [
          point(0.72, -0.88, 0.72),
          point(0.82, -0.18, 0.72),
          point(0.82, 0.62, 0.72),
          point(0.72, 1.36, 0.72),
          point(0.62, 2.28, 0.72)
        ],
        flowArrow: true
      },
      {
        id: 'left-caudal-cardinal-lower-path',
        fromNode: 'node-cardinal-left-caudal-pelvic',
        toNode: 'node-cardinal-left-caudal-mesonephric',
        points: [
          point(-0.48, -2.22, 0.72),
          point(-0.58, -1.58, 0.72),
          point(-0.72, -0.88, 0.72)
        ]
      },
      {
        id: 'left-caudal-cardinal-upper-path',
        fromNode: 'node-cardinal-left-caudal-mesonephric',
        toNode: 'node-cardinal-left-common',
        points: [
          point(-0.72, -0.88, 0.72),
          point(-0.82, -0.18, 0.72),
          point(-0.82, 0.62, 0.72),
          point(-0.72, 1.36, 0.72),
          point(-0.62, 2.28, 0.72)
        ],
        flowArrow: true
      }
    ],
    states: paired(stageMap('not-yet-visible', 'developing', 'developing', 'expanding', 'expanding', 'persistent')),
    evidence: {
      'human-cardinal-2015': 'Hikspoors et al. report caudal extensions of the caudal cardinal veins from the common cardinal region in CS11–CS15 human embryos. Their later remodeling continues beyond CS16; the current path is an early schematic channel, not the final infrarenal IVC.',
      'textbook-segmental': 'The paired posterior cardinal veins drain the caudal embryo before later subcardinal and supracardinal remodeling. The label caudal cardinal is retained as a source-specific human reconstruction term.'
    },
    sourceIds: ['HIKSPOORS2015', 'MOORE_IVC']
  },
  {
    id: 'subcardinal-mesonephric-plexus',
    name: 'Subcardinal / mesonephric venous plexus',
    shortName: 'Subcardinal plexus',
    description: 'A developing venous plexus around the mesonephroi. In the human 2015 reconstruction it sprouts ventrally from the caudal cardinal system from CS15; this plexus is the precursor context for the longitudinal subcardinal channels.',
    status: 'Cardinal system · mesonephric plexus',
    color: '#76b9a6',
    radius: 0.041,
    model: 'shared',
    paths: [
      {
        id: 'right-subcardinal-mesonephric-plexus-lateral-loop',
        fromNode: 'node-cardinal-right-caudal-mesonephric',
        toNode: 'node-cardinal-right-plexus-lateral',
        points: [
          point(0.72, -0.88, 0.72),
          point(0.94, -1.12, 0.55),
          point(0.94, -1.28, 0.42),
          point(0.9, -0.88, 0.42)
        ]
      },
      {
        id: 'right-subcardinal-mesonephric-plexus-medial-limb',
        fromNode: 'node-cardinal-right-plexus-lateral',
        toNode: 'node-cardinal-right-subcardinal-caudal',
        points: [
          point(0.9, -0.88, 0.42),
          point(0.78, -1.12, 0.28),
          point(0.62, -1.28, 0.2),
          point(0.5, -1.34, 0.2)
        ]
      },
      {
        id: 'left-subcardinal-mesonephric-plexus-lateral-loop',
        fromNode: 'node-cardinal-left-caudal-mesonephric',
        toNode: 'node-cardinal-left-plexus-lateral',
        points: [
          point(-0.72, -0.88, 0.72),
          point(-0.94, -1.12, 0.55),
          point(-0.94, -1.28, 0.42),
          point(-0.9, -0.88, 0.42)
        ]
      },
      {
        id: 'left-subcardinal-mesonephric-plexus-medial-limb',
        fromNode: 'node-cardinal-left-plexus-lateral',
        toNode: 'node-cardinal-left-subcardinal-caudal',
        points: [
          point(-0.9, -0.88, 0.42),
          point(-0.78, -1.12, 0.28),
          point(-0.62, -1.28, 0.2),
          point(-0.5, -1.34, 0.2)
        ]
      }
    ],
    states: paired(stageMap('not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'developing', 'expanding')),
    evidence: {
      'human-cardinal-2015': 'The 2015 human reconstruction describes a plexus developing in and around the mesonephroi from CS15, in continuity with the caudal cardinal veins. It is not a separately arising, unrelated venous pair in that interpretation.',
      'textbook-segmental': 'The conventional account describes subcardinal veins as a paired longitudinal system around the mesonephroi. The mesh here is an early plexus approximation, not a detailed histological reconstruction.'
    },
    sourceIds: ['HIKSPOORS2015', 'MOORE_IVC']
  },
  {
    id: 'subcardinal-longitudinal-veins',
    name: 'Paired longitudinal subcardinal veins',
    shortName: 'Subcardinal veins',
    description: 'Longitudinal channels form on the ventromedial sides of the mesonephroi. The 2015 human reconstruction identifies the channels beginning at CS16 and becoming right-dominant later.',
    status: 'Cardinal system · renal / mesonephric drainage',
    color: '#76b9a6',
    radius: 0.052,
    model: 'shared',
    paths: [
      {
        id: 'right-subcardinal-longitudinal-path',
        fromNode: 'node-cardinal-right-subcardinal-caudal',
        toNode: 'node-cardinal-right-subcardinal-cranial',
        points: [
          point(0.5, -1.34, 0.2),
          point(0.52, -1.02, 0.2),
          point(0.52, -0.72, 0.2),
          point(0.48, -0.42, 0.2)
        ],
        flowArrow: true
      },
      {
        id: 'left-subcardinal-longitudinal-path',
        fromNode: 'node-cardinal-left-subcardinal-caudal',
        toNode: 'node-cardinal-left-subcardinal-cranial',
        points: [
          point(-0.5, -1.34, 0.2),
          point(-0.52, -1.02, 0.2),
          point(-0.52, -0.72, 0.2),
          point(-0.48, -0.42, 0.2)
        ],
        flowArrow: true
      }
    ],
    states: paired(stageMap('not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'developing')),
    evidence: {
      'human-cardinal-2015': 'Hikspoors et al. describe longitudinal subcardinal channels forming from the mesonephric plexus at CS16. Right-sided dominance is first observed at CS16 and becomes complete at CS18. The later hepatosubcardinal junction is outside the current stage range.',
      'textbook-segmental': 'The conventional IVC model uses the right subcardinal vein for the suprarenal IVC and the subcardinal–supracardinal anastomosis for the renal segment. Those definitive contributions are not yet completed in the current CS16 view.'
    },
    sourceIds: ['HIKSPOORS2015', 'MOORE_IVC']
  },
  {
    id: 'intersubcardinal-anastomosis',
    name: 'Intersubcardinal anastomosis',
    shortName: 'Renal venous cross-connection',
    description: 'A transverse connection between the paired subcardinal channels. The 2015 human reconstruction places its early appearance at CS16 just caudal to the superior mesenteric artery. This is not yet the complete adult renal collar.',
    status: 'Cardinal system · early renal connection',
    color: '#8ac9b5',
    radius: 0.044,
    model: 'shared',
    paths: [
      {
        id: 'intersubcardinal-transverse-path',
        fromNode: 'node-cardinal-left-subcardinal-cranial',
        toNode: 'node-cardinal-right-subcardinal-cranial',
        points: [
          point(-0.48, -0.42, 0.2),
          point(-0.28, -0.42, 0.02),
          point(0, -0.42, -0.12),
          point(0.28, -0.42, 0.02),
          point(0.48, -0.42, 0.2)
        ]
      }
    ],
    states: paired(stageMap('not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'developing')),
    evidence: {
      'human-cardinal-2015': 'The 2015 human reconstruction describes intersubcardinal anastomoses beginning at CS16 just caudal to the superior mesenteric artery. This single transverse path is a schematic teaching connection, not the complete renal collar.',
      'textbook-segmental': 'The conventional model includes subcardinal and supracardinal connections in formation of the renal venous collar. The current layer shows only the early intersubcardinal limb; the dorsal supracardinal limb is deferred.'
    },
    sourceIds: ['HIKSPOORS2015', 'IVC_REVIEW_2023']
  },
  {
    id: 'iliac-venous-confluence',
    name: 'Developing iliac venous confluence',
    shortName: 'Iliac confluence',
    description: 'The caudal cardinal channels form a transverse connection in the pelvic region. This is an early precursor to the common iliac confluence, not a finished adult common iliac vein pair.',
    status: 'Cardinal system · caudal confluence',
    color: '#b27f93',
    radius: 0.045,
    model: 'shared',
    paths: [
      {
        id: 'left-iliac-confluence-limb',
        fromNode: 'node-cardinal-left-caudal-pelvic',
        toNode: 'node-cardinal-iliac-confluence',
        points: [
          point(-0.48, -2.22, 0.72),
          point(-0.3, -2.28, 0.72),
          point(-0.14, -2.32, 0.72),
          point(0, -2.35, 0.72)
        ]
      },
      {
        id: 'right-iliac-confluence-limb',
        fromNode: 'node-cardinal-right-caudal-pelvic',
        toNode: 'node-cardinal-iliac-confluence',
        points: [
          point(0.48, -2.22, 0.72),
          point(0.3, -2.28, 0.72),
          point(0.14, -2.32, 0.72),
          point(0, -2.35, 0.72)
        ]
      }
    ],
    states: paired(stageMap('not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'developing', 'expanding')),
    evidence: {
      'human-cardinal-2015': 'The human reconstruction describes intercardinal anastomoses forming the confluence of the iliac veins during the caudal extension of the caudal cardinal system. The current stage bins show the developing confluence, not its final adult course.',
      'textbook-segmental': 'The conventional model describes the common iliac veins as persistent caudal cardinal / posterior cardinal derivatives. This early confluence is shown before definitive remodeling.'
    },
    sourceIds: ['HIKSPOORS2015', 'IVC_REVIEW_2023']
  },
  {
    id: 'textbook-supracardinal-veins',
    name: 'Paired supracardinal veins — conventional model',
    shortName: 'Supracardinal veins',
    description: 'An alternative textbook interpretation in which the thoracic supracardinal channels contribute to azygos / hemiazygos veins and the right caudal supracardinal channel contributes to the infrarenal IVC. The left-sided channel regresses as a distinct large vessel. This layer is hidden in the human 2015 reconstruction model.',
    status: 'Alternative model · conventional segmental IVC',
    color: '#6d9ec7',
    radius: 0.047,
    model: 'textbook-segmental',
    paths: [
      {
        id: 'right-supracardinal-channel',
        fromNode: 'node-textbook-right-supracardinal-caudal',
        toNode: 'node-textbook-right-supracardinal-cranial',
        points: [
          point(0.92, -1.82, 0.96),
          point(0.95, -1.12, 0.96),
          point(0.95, -0.42, 0.96),
          point(0.94, 0.38, 0.96),
          point(0.92, 1.42, 0.96)
        ],
        flowArrow: true
      },
      {
        id: 'left-supracardinal-channel',
        fromNode: 'node-textbook-left-supracardinal-caudal',
        toNode: 'node-textbook-left-supracardinal-cranial',
        points: [
          point(-0.92, -1.82, 0.96),
          point(-0.95, -1.12, 0.96),
          point(-0.95, -0.42, 0.96),
          point(-0.94, 0.38, 0.96),
          point(-0.92, 1.42, 0.96)
        ]
      }
    ],
    states: models(
      hidden(),
      stageMap('not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'not-yet-visible', 'developing')
    ),
    evidence: {
      'human-cardinal-2015': 'Not included in the 2015 human reconstruction model, which interprets the infrarenal IVC and azygos system as continuations of the caudal cardinal system.',
      'textbook-segmental': 'The conventional four-segment model assigns the infrarenal IVC to the right supracardinal vein and the thoracic azygos / hemiazygos channels to the supracardinal system. Other human reconstructions dispute this independent-system nomenclature; compare the human 2015 model rather than blending them.'
    },
    sourceIds: ['IVC_REVIEW_2023', 'HIKSPOORS2015']
  }
];

const PRESENTATION: Record<CardinalState, Omit<CardinalPresentation, 'state'>> = {
  'not-yet-visible': { statusLabel: 'Not yet represented in this stage bin', opacity: 0, radiusScale: 0, visible: false },
  present: { statusLabel: 'Present', opacity: 0.94, radiusScale: 1, visible: true },
  developing: { statusLabel: 'Developing', opacity: 0.66, radiusScale: 0.88, visible: true },
  expanding: { statusLabel: 'Expanding', opacity: 0.86, radiusScale: 1, visible: true },
  persistent: { statusLabel: 'Persistent in this model', opacity: 0.96, radiusScale: 1.04, visible: true },
  remodeling: { statusLabel: 'Remodeling', opacity: 0.62, radiusScale: 0.8, visible: true },
  regressing: { statusLabel: 'Regressing as a distinct channel', opacity: 0.42, radiusScale: 0.72, visible: true },
  'not-in-model': { statusLabel: 'Not included in the selected model', opacity: 0, radiusScale: 0, visible: false }
};

export function getCardinalLayerPresentation(
  layer: CardinalVascularLayer,
  model: CardinalModel,
  stageId: VitellineStageId
): CardinalPresentation {
  const state = layer.states[model][stageId];
  return { state, ...PRESENTATION[state] };
}

export function validateCardinalNetwork(): string[] {
  const issues: string[] = [];
  const nodeMap = new Map<string, Point3>();
  for (const node of [...VITELLINE_NODES, ...CARDINAL_NODES]) {
    if (nodeMap.has(node.id)) issues.push('Duplicate cardinal graph node ID: ' + node.id);
    nodeMap.set(node.id, node.position);
  }

  const layerIds = new Set<string>();
  const pathIds = new Set<string>();
  for (const layer of CARDINAL_VASCULAR_LAYERS) {
    if (layerIds.has(layer.id)) issues.push('Duplicate cardinal layer ID: ' + layer.id);
    layerIds.add(layer.id);
    if (layer.paths.length === 0) issues.push(layer.id + ' has no paths');
    for (const model of ['human-cardinal-2015', 'textbook-segmental'] as const) {
      if (!layer.evidence[model]) issues.push(layer.id + ' has no evidence note for ' + model);
      for (const stage of STAGES) {
        if (!layer.states[model][stage]) issues.push(layer.id + ' has no state for ' + model + ' / ' + stage);
      }
      if (layer.model !== 'shared' && layer.model !== model && Object.values(layer.states[model]).some((state) => state !== 'not-in-model')) {
        issues.push(layer.id + ' leaks into the incompatible cardinal model');
      }
    }
    for (const path of layer.paths) {
      if (pathIds.has(path.id)) issues.push('Duplicate cardinal path ID: ' + path.id);
      pathIds.add(path.id);
      if (path.points.length < 2) issues.push(path.id + ' needs at least two centre-line points');
      const from = nodeMap.get(path.fromNode);
      const to = nodeMap.get(path.toNode);
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

  const rightCaudal = CARDINAL_VASCULAR_LAYERS.find((layer) => layer.id === 'caudal-cardinal-veins');
  const subcardinal = CARDINAL_VASCULAR_LAYERS.find((layer) => layer.id === 'subcardinal-longitudinal-veins');
  const renal = CARDINAL_VASCULAR_LAYERS.find((layer) => layer.id === 'intersubcardinal-anastomosis');
  if (!rightCaudal?.paths.some((path) => path.fromNode === 'node-cardinal-right-caudal-mesonephric' && path.toNode === 'node-cardinal-right-common')) {
    issues.push('Right caudal cardinal channel must connect its mesonephric level to the common cardinal vein');
  }
  const subcardinalPlexus = CARDINAL_VASCULAR_LAYERS.find((layer) => layer.id === 'subcardinal-mesonephric-plexus');
  if (!subcardinalPlexus?.paths.some((path) => path.fromNode === 'node-cardinal-right-caudal-mesonephric' && path.toNode === 'node-cardinal-right-plexus-lateral') || !subcardinalPlexus.paths.some((path) => path.fromNode === 'node-cardinal-right-plexus-lateral' && path.toNode === 'node-cardinal-right-subcardinal-caudal')) {
    issues.push('Right subcardinal plexus must connect the caudal cardinal vein to the longitudinal subcardinal channel');
  }
  if (subcardinal?.states['human-cardinal-2015'].cs16 !== 'developing') {
    issues.push('The human 2015 subcardinal longitudinal channels should begin in the CS16 teaching bin');
  }
  if (renal?.states['human-cardinal-2015'].cs16 !== 'developing') {
    issues.push('The early intersubcardinal connection should be represented in the CS16 teaching bin');
  }
  const textbook = CARDINAL_VASCULAR_LAYERS.find((layer) => layer.id === 'textbook-supracardinal-veins');
  if (textbook?.states['human-cardinal-2015'].cs16 !== 'not-in-model') {
    issues.push('Textbook supracardinal channels must not leak into the human 2015 reconstruction');
  }
  return issues;
}

export const CARDINAL_NETWORK_ISSUES = validateCardinalNetwork();
