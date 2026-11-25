# Interactive Embryonic Venous Development Laboratory

An evidence-aware, version-controlled 3D embryology workstation. The first learning module focuses on the vitelline veins and establishes a reusable foundation for later umbilical-vein and cardinal-vein modules.

## Current status

- **Development branch:** feature/vitelline-veins-3d
- **Current milestone:** Milestone 7 — paired umbilical veins and cardinal venous foundations
- **Application:** React + TypeScript + Vite + Three.js
- **Anatomy status:** paired vitelline channels, hepatic sinusoidal network, classical and human portal pathways, six hepatic-outflow layers, paired umbilical-vein pathways, eight cardinal layers, subcardinal plexus and an explicit two-model IVC / azygos interpretation selector
- **Verification:** Milestone 6 TypeScript, graph validation and production build passed; Milestone 7 validation and production build pending; browser visual review pending
- **Scientific profiles:** classical 2008 synthesis and human 2017 reconstruction, supplemented by 2024 CS15 venous-route morphology

## Run locally

Requirements: Node.js 20 or later.

    npm install
    npm run dev

Open the local Vite address printed in the terminal.

Production verification:

    npm run typecheck
    npm run validate:graph
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
- Inspect six hepatic-outflow layers with ten editable paths, flow arrows, two distinct ductus-venosus routes and three terminal hepatic-vein collectors.
- Use the 22-step guided teaching walkthrough to compare portal inflow, hepatic efferent drainage, paired umbilical veins, cardinal drainage and two competing IVC interpretations.
- Inspect the right umbilical vein as an early paired channel and compare its regression with the persistent left umbilical inflow.
- Inspect anterior, common and caudal cardinal veins, the mesonephric subcardinal plexus, longitudinal subcardinal channels and the early intersubcardinal connection.
- Switch between the 2015 human caudal-cardinal reconstruction and the conventional supracardinal four-segment IVC teaching model.
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
21. [Portal browser teaching guide](docs/teaching/PORTAL_VEIN_BROWSER_TEACHING_GUIDE.md)
22. [Hepatic outflow and venous duct anatomy](docs/anatomy/vitelline-veins/HEPATIC_OUTFLOW_AND_VENOUS_DUCT.md)
23. [Hepatic outflow graph architecture](docs/architecture/HEPATIC_OUTFLOW_GRAPH.md)
24. [Milestone 6 report](docs/milestones/MILESTONE_6_REPORT.md)
25. [Hepatic outflow browser teaching guide](docs/teaching/HEPATIC_OUTFLOW_BROWSER_TEACHING_GUIDE.md)
26. [Umbilical and cardinal vein anatomy](docs/anatomy/vitelline-veins/UMBILICAL_AND_CARDINAL_VEINS.md)
27. [Cardinal vascular graph architecture](docs/architecture/CARDINAL_VASCULAR_GRAPH.md)
28. [Milestone 7 report](docs/milestones/MILESTONE_7_REPORT.md)
29. [Umbilical and cardinal browser teaching guide](docs/teaching/UMBILICAL_CARDINAL_BROWSER_TEACHING_GUIDE.md)

## Planned development

- Milestone 0: scientific specification, fate map, source register, coordinate contract and architecture.
- Milestone 1: browser application shell and navigatable 3D anatomical blockout.
- Milestone 2: paired vitelline veins and yolk-sac drainage — implemented; the current branch CI build also compiles this milestone.
- Milestone 3: hepatic sinusoidal plexus and intrahepatic venous pathways — implemented; TypeScript and production build passed; browser visual review pending.
- Milestone 4: model-specific intervitelline anastomoses — implemented; attachment audit, TypeScript validation and production build passed; browser visual review pending.
- Milestone 5: portal trunk, portal sinus, first-order portal branches and browser teaching walkthrough — implemented; portal-path / attachment audit and GitHub Actions typecheck / production build passed; browser visual review pending.
- Milestone 6: classical hepatic efferent route, human venous duct, classical ductus venosus, terminal hepatic veins and flow arrows — implemented; TypeScript, source-graph / teaching-step validation and production build passed; browser visual review pending.
- Milestone 7: paired umbilical veins, early cardinal drainage, subcardinal plexus, iliac confluence and alternative IVC / azygos interpretations — implemented; final CI validation pending.
- Milestone 8: extend the timeline through CS18–CS23 and build the complete source-specific IVC, renal collar and azygos reconstructions.
- Milestone 9: learning, exploration and assessment tools.
- Milestone 10: scientific review, browser inspection, verification and release.

## Development principles

- Anatomy before visual effects.
- Source-traceable claims and visible uncertainty.
- Landmark-first geometry and explicit vessel topology.
- Editable procedural source geometry; GLB is an export, not the source of truth.
- Atomic commits and verified milestones.
- No claim of completion without actual browser and test verification.

## Repository safety

This repository is currently public. Do not commit private information, copyrighted textbook scans, unlicensed models, credentials or other sensitive material.