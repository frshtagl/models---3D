# Interactive Embryonic Venous Development Laboratory

An evidence-aware, version-controlled 3D embryology workstation. The first learning module focuses on the vitelline veins and establishes a reusable foundation for later umbilical-vein and cardinal-vein modules.

## Current status

- **Development branch:** feature/vitelline-veins-3d
- **Current milestone:** Milestone 1 — interactive 3D foundation
- **Application:** React + TypeScript + Vite + Three.js
- **Anatomy status:** reference-organ blockout only; detailed vitelline vessels are not implemented yet
- **Scientific profiles:** classical 2008 synthesis and human 2017 reconstruction are selectable scaffolds

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
- Switch the scientific evidence profile.

The present geometry is a schematic orientation blockout, not a measured embryo reconstruction. Stage-dependent organ scaling is illustrative and is not intended to represent exact growth measurements.

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

## Planned development

- Milestone 0: scientific specification, fate map, source register, coordinate contract and architecture.
- Milestone 1: browser application shell and navigatable 3D anatomical blockout.
- Milestone 2: paired vitelline veins and yolk-sac drainage.
- Milestone 3: hepatic interaction and sinusoidal pathways.
- Milestone 4: model-specific intervitelline anastomoses.
- Milestone 5: regression, portal vein and lineage tracing.
- Milestone 6: hepatic outflow and context-only fetal circulation.
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