# Interactive Embryonic Venous Development Laboratory

A version-controlled, interactive 3D embryology project. The first module is the **vitelline veins**, designed as the foundation for later umbilical-vein and cardinal-vein modules.

## Project status

**Current milestone:** Milestone 0 — scientific specification and architecture baseline  
**Application status:** 3D application not yet implemented  
**Active development branch:** feature/vitelline-veins-3d  
**Stable branch:** main

## Start here

1. [Vitelline veins master prompt](docs/prompts/VITELLINE_VEINS_MASTER_PROMPT.md)
2. [Developmental anatomy specification](docs/anatomy/vitelline-veins/DEVELOPMENTAL_SPEC.md)
3. [Segment-by-segment fate map](docs/anatomy/vitelline-veins/FATE_MAP.md)
4. [Evidence and competing models](docs/anatomy/vitelline-veins/EVIDENCE_AND_VARIANTS.md)
5. [Scientific references](docs/anatomy/vitelline-veins/REFERENCES.md)
6. [3D coordinate system](docs/architecture/COORDINATE_SYSTEM.md)
7. [Project architecture](docs/architecture/PROJECT_ARCHITECTURE.md)
8. [Milestone 0 report](docs/milestones/MILESTONE_0_REPORT.md)

## Scientific policy

The project preserves two distinct published approaches:
- the classical vestigial / anastomotic model summarized by Collardeau-Frachon and Scoazec (2008);
- the human 3D reconstruction / lineage and hemodynamic model reported by Hikspoors and colleagues (2017).

They must not be blended into a single invented sequence. Each model has its own stage-specific vessel graph and citations.

## Planned implementation

- Milestone 0: scientific specification, fate map, source register, coordinate contract, architecture.
- Milestone 1: browser application shell and navigatable 3D anatomical blockout.
- Milestone 2: paired vitelline veins and yolk-sac drainage.
- Milestone 3: hepatic interaction and sinusoidal pathways.
- Milestone 4: model-specific intervitelline anastomoses.
- Milestone 5: regression, portal vein and lineage tracing.
- Milestone 6: hepatic outflow and context-only fetal circulation.
- Milestone 7: learning, exploration and assessment tools.
- Milestone 8: verification and release.

## Development principles

- Anatomy before visual effects.
- Source-traceable claims and visible uncertainty.
- Landmark-first geometry and explicit vessel topology.
- Editable procedural source geometry; GLB is an export, not the source of truth.
- Atomic commits and verified milestones.
- No claim of completion without actual browser and test verification.

## Repository visibility

This repository is currently public. Do not commit private information, copyrighted textbook scans, unlicensed models, credentials or other sensitive material.
