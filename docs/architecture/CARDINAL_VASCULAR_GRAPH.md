# Cardinal Venous Graph — Milestone 7

## Source of truth

The source graph is src/data/cardinalNetwork.ts. It reuses the venous-pole nodes from src/data/vitellineNetwork.ts.

## Model selector

CardinalModel is independent of the liver / portal evidence profile:

- human-cardinal-2015
- textbook-segmental

Shared early cardinal layers remain visible in both. The conventional supracardinal layer is visible only in textbook-segmental.

## Layer inventory

| Layer ID | Paths | Visibility |
|---|---:|---|
| anterior-cardinal-veins | 2 | Shared |
| common-cardinal-veins | 2 | Shared |
| caudal-cardinal-veins | 4 | Shared |
| subcardinal-mesonephric-plexus | 4 | Shared |
| subcardinal-longitudinal-veins | 2 | Shared |
| intersubcardinal-anastomosis | 1 | Shared |
| iliac-venous-confluence | 2 | Shared |
| textbook-supracardinal-veins | 2 | Conventional model only |

Total: 8 layers, 19 centre-line paths.

## Topology contracts

- Anterior cardinal paths end at the same common-cardinal junctions used by caudal cardinal paths.
- Common cardinal paths drain from those junctions to the right and left sinus venosus horns.
- Caudal cardinal paths are split at the mesonephric level so the subcardinal plexus has a real graph attachment rather than a visual crossing.
- Subcardinal plexus paths connect the caudal cardinal branch points to the lateral mesonephric plexus and then to the caudal ends of the longitudinal subcardinal channels.
- Longitudinal subcardinal channels connect to the intersubcardinal anastomosis.
- The iliac confluence is a separate caudal intercardinal connection.
- The conventional supracardinal channels use separate nodes and are hidden in the human 2015 model.

## Evidence boundary

The 2015 human reconstruction reports a caudal-cardinal / subcardinal lineage and does not require a separate supracardinal system for its reconstructed infrahepatic IVC and azygos pathways. Conventional radiology / anatomy teaching sources use a four-segment IVC model with right supracardinal contribution to the infrarenal segment.

These are alternative interpretations. The application exposes them as a selector rather than adding both sets of channels simultaneously.

## Stage and scope boundary

The current network is stage-aware through CS16. It does not yet include:
- CS18–CS23 later remodeling;
- the completed hepatosubcardinal junction;
- complete renal venous collar;
- final hepatic, suprarenal, renal and infrarenal IVC assembly;
- completed azygos / hemiazygos channels;
- detailed cranial cardinal / brachiocephalic / SVC development.

All centre-lines and radii are normalized schematic geometry. They are not specimen measurements.

## Build verification

At commit 7559821e325c639ef50e918287f079afc7501b64, the build-time validator passed with 8 cardinal layers, 19 paths, 77 unique graph nodes and 22 guided teaching steps. GitHub Actions TypeScript validation and Vite production build passed: https://github.com/frshtagl/models---3D/actions/runs/45698752351. Browser visual review remains pending.
