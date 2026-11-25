# Interactive Embryonic Venous Development Laboratory

An evidence-aware, version-controlled 3D embryology workstation. The first learning module focuses on the vitelline veins and establishes a reusable foundation for later umbilical-vein and cardinal-vein modules.

## Current status

- **Development branch:** feature/vitelline-veins-3d
- **Current milestone:** Milestone 5 — portal vein, portal sinus and browser teaching walkthrough
- **Application:** React + TypeScript + Vite + Three.js
- **Anatomy status:** paired vitelline channels, hepatic sinusoidal network, six profile-specific intervitelline connections, classical and human portal-trunk pathways, two portal-sinus mechanisms, simplified left umbilical inflow and first-order portal branches
- **Verification:** portal graph and attachment audit pending; GitHub Actions TypeScript validation and production build pending; browser visual review pending
- **Scientific profiles:** stage-aware classical 2008 synthesis and human 2017 reconstruction profiles

## Run locally

Requirements: Node.js 20 or later.

    npm install
    npm run dev

Open the local Vite address printed in the terminal.

Production verification:

    npm run typecheck
    npm run build
    npm run preview

## Current interactions

- Orbit, pan and zoom the 3D scene.
- Switch between anterior, posterior, right, left, superior and inferior camera views.
- Navigate Carnegie stages CS10, CS12, CS13, CS14, CS15 and CS16.
- Play the stage sequence.
- Select structures from the scene or anatomy layer list.
- Toggle layer visibility or isolate the selected structure.
- Switch the scientific evidence profile; the profile changes left-sided remodeling states without blending the two published models.
- Inspect eight vitelline-vein segments connected through twenty named vitelline graph nodes, including ten embedded anastomosis attachment points.
- Inspect seven hepatic vascular layers containing 33 editable paths, including a connected sinusoidal plexus.
- Compare classical venae advehentes / revehentes with human-reconstruction sinusoidal entry and right-dominant hepatic drainage.
- Compare the classical three-segment portal trunk with the human midgut-derived portal precursor and right vitelline continuation.
- Compare the classical subhepatic-anastomosis portal sinus with the human intrahepatic umbilico-vitelline shunt.
- Inspect right vitelline-derived and left umbilical-derived portal branches with the gallbladder / Cantlie orientation guide.
- Run the nine-step in-browser portal-vein teaching walkthrough and use full-screen mode for classroom projection.
- Inspect four classical intervitelline connections or the two human-reconstruction connections without overlaying incompatible models.
- Inspect nine portal-system layers with 19 editable paths and separate classical / human portal-sinus mechanisms.
- Inspect the human dorsal connection relative to the dorsal pancreatic bud and the transient CS14 ventral connection.
- Navigate dorsal / posterior and ventral / anterior anastomoses relative to the duodenum.
- Follow the paired yolk-sac roots, extrahepatic trunks, intrahepatic conduits and hepatocardiac channels.
- Inspect the stage-dependent right-sided dominance and the profile-specific left-sided remodeling.

All current organ and vessel geometry is normalized schematic geometry, not a measured embryo reconstruction. Stage-dependent organ scaling and vessel radii are visual teaching parameters, not exact growth or diameter measurements.

## Scientific policy

The project preserves two distinct published approaches:
- the classical vestigial / anastomotic model summarized by Collardeau-Frachon and Scoazec (2008);
- the human 3D reconstruction / lineage and hemodynamic model reported by Hikspoors and colleagues (2017).

They must not be blended into one invented developmental sequence. Each profile will receive its own stage-specific vessel graph and citations.

## Start here

1. [Vitelline veins master prompt](docs/prompts/VITELLINE_VEINS_MASTER_PROMPT.md)
2. [Developmental anatomy specification](docs/anatomy/vitelline-veins/DEVELOPMENTAL_SPEC.md)
3. [Segment-by-segment fate map](docs/anatomy/vitelline-veins/FATE_MAP.md)
4. [Evidence and competing models](docs/anatomy/vitelline-veins/EVIDENCE_AND_VARIANTS.md)
5. [Scientific references](docs/anatomy/vitelline-veins/REFERENCES.md)
6. [3D coordinate system](docs/architecture/COORDINATE_SYSTEM.md)
7. [Project architecture](docs/architecture/PROJECT_ARCHITECTURE.md)
8. [Milestone 0 report](docs/milestones/MILESTONE_0_REPORT.md)
9. [Milestone 1 report](docs/milestones/MILESTONE_1_REPORT.md)
10. [Milestone 2 report](docs/milestones/MILESTONE_2_REPORT.md)
11. [Milestone 3 report](docs/milestones/MILESTONE_3_REPORT.md)
12. [Vessel graph schema](docs/architecture/VESSEL_GRAPH_SCHEMA.md)
13. [Hepatic vascular graph](docs/architecture/HEPATIC_VASCULAR_GRAPH.md)
14. [Sinusoidal development evidence](docs/anatomy/vitelline-veins/SINUSOIDAL_DEVELOPMENT.md)
15. [Milestone 4 report](docs/milestones/MILESTONE_4_REPORT.md)
16. [Intervitelline anastomosis anatomy guide](docs/anatomy/vitelline-veins/INTERVITELLINE_ANASTOMOSES.md)
17. [Intervitelline graph architecture](docs/architecture/INTERVITELLINE_GRAPH.md)
18. [Portal vein development guide](docs/anatomy/vitelline-veins/PORTAL_VEIN_DEVELOPMENT.md)
19. [Portal vascular graph architecture](docs/architecture/PORTAL_VASCULAR_GRAPH.md)
20. [Milestone 5 report](docs/milestones/MILESTONE_5_REPORT.md)
21. [Browser teaching guide](docs/teaching/PORTAL_VEIN_BROWSER_TEACHING_GUIDE.md)

## Planned development

- Milestone 0: scientific specification, fate map, source register, coordinate contract and architecture.
- Milestone 1: browser application shell and navigatable 3D anatomical blockout.
- Milestone 2: paired vitelline veins and yolk-sac drainage — implemented; the current branch CI build also compiles this milestone.
- Milestone 3: hepatic sinusoidal plexus and intrahepatic venous pathways — implemented; TypeScript and production build passed; browser visual review pending.
- Milestone 4: model-specific intervitelline anastomoses — implemented; attachment audit, TypeScript validation and production build passed; browser visual review pending.
- Milestone 5: portal trunk, portal sinus, first-order portal branches and browser teaching walkthrough — source implementation added; graph / CI / browser verification pending.
- Milestone 6: hepatic outflow, venous duct and context-only fetal circulation.
- Milestone 7: learning, exploration and assessment tools.
- Milestone 8: scientific review, verification and release.

## Development principles

- Anatomy before visual effects.
- Source-traceable claims and visible uncertainty.
- Landmark-first geometry and explicit vessel topology.
- Editable procedural source geometry; GLB is an export, not the source of truth.
- Atomic commits and verified milestones.
- No claim of completion without actual browser and test verification.

## Repository safety

This repository is currently public. Do not commit private information, copyrighted textbook scans, unlicensed models, credentials or other sensitive material.