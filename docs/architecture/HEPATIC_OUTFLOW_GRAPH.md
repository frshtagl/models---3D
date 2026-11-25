# Hepatic Outflow Graph — Milestone 6

## Source of truth

The Milestone 6 source graph is src/data/hepaticOutflowNetwork.ts. Parent graph nodes are reused from:
- src/data/vitellineNetwork.ts;
- src/data/hepaticVascularNetwork.ts;
- src/data/portalNetwork.ts.

The new graph contributes two nodes for the human venous-duct bend and narrow segment. All geometry remains editable Three.js centre-line source data.

## Layer IDs

- classical-subdiaphragmatic-anastomosis
- classical-right-terminal-hepatic-outflow
- classical-left-terminal-hepatic-outflow
- classical-ductus-venosus
- human-ductus-venosus
- human-terminal-hepatic-veins

## Path inventory

| Layer | Paths | Profile |
|---|---:|---|
| Classical subdiaphragmatic bridge | 1 | classical-2008 |
| Classical right terminal outflow | 1 | classical-2008 |
| Classical left terminal outflow | 1 | classical-2008 |
| Classical ductus venosus | 1 | classical-2008 |
| Human venous duct | 3 | human-2017 |
| Human terminal hepatic veins | 3 | human-2017 |

Total: 6 layers, 10 centre-line paths, 2 new nodes.

## Topology contracts

### Classical efferent route

- Venae revehentes remain in src/data/hepaticVascularNetwork.ts.
- Their cranial ends connect to node-classical-subdiaphragmatic-left and node-classical-subdiaphragmatic-right.
- The new bridge joins these two nodes.
- Right and left terminal channels continue toward their respective venous-pole nodes.
- The left terminal outflow is shown as transient in the later stage bins.

### Classical ductus venosus

- Start node: node-left-iva-subhepatic, the left angle of the classical subhepatic / portal-sinus connection.
- End node: node-right-hepatic-exit, the hepatic IVC / right outflow junction.
- The channel is branchless in this teaching model.
- It is visible only in the classical profile.

### Human venous duct

- Start node: node-left-umbilical-hilum.
- Intermediate nodes: node-human-dv-inlet-bend, node-human-dv-narrow-waist.
- End node: node-human-hepatocardiac-right.
- The middle path has a smaller radiusScale to represent the narrowed waist for teaching.
- The layer is visible only in the human reconstruction profile.

### Human terminal hepatic veins

- Right, middle and left collector paths begin at upper sinusoidal-network nodes.
- All three converge on node-human-hepatocardiac-right.
- Flow-arrow markers are rendered at the terminal end of each collector.
- This is a simplified CS15 human reconstruction context, not a complete adult hepatic venous tree.

## Flow-arrow implementation

EmbryoScene.tsx creates a cone marker at the terminal tangent of each path with flowArrow: true. The arrow inherits the path's colour and is included in the same selectable structure group. Clearing or rebuilding the group disposes of the arrow geometry and material along with the vessel tube.

## Validation contracts

Run the independent source audit with `npm run validate:graph`. The production build runs this validator before Vite. It checks:
- unique layer and path IDs;
- all path endpoints resolve to nodes from the combined source graphs;
- first and last centre-line points match declared node coordinates;
- every layer has complete states for CS10, CS12, CS13, CS14, CS15 and CS16;
- source-specific layers do not leak into the incompatible evidence profile;
- classical ductus venosus starts at the left portal-sinus angle;
- human venous duct runs from the left umbilical hilum to the right hepatocardiac channel;
- the narrowed venous-duct path remains distinct;
- the human terminal hepatic-vein layer contains exactly three collectors.

The build-time validator checked the original 14 hepatic / portal lessons against the anatomy registry; Milestone 7 extends this to 22 guided steps across the full app. At commit 5efc8eb2b8e71a4669e81d4b98d8778600ec00eb, it passed with 6 layers, 10 paths, 58 source graph nodes and 7 flow arrows. GitHub Actions TypeScript validation and production build passed: https://github.com/frshtagl/models---3D/actions/runs/45677428811.

These are source-coordinate checks. They do not replace visual review of the rendered scene or specialist anatomical review.
