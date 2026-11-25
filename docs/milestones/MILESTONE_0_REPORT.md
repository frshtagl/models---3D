# Milestone 0 — Scientific Specification and Architecture Baseline

**Status:** Documentation baseline committed  
**Date:** 25 November 2026  
**Repository:** frshtagl/models---3D  
**Branch:** feature/vitelline-veins-3d  
**Application code:** Not started  
**Milestone objective:** establish the evidence-aware anatomical and technical specification before 3D implementation.

## 1. Repository inspection

- Repository: frshtagl/models---3D
- Default branch: main
- Visibility: public
- Initial state before project prompt: empty repository
- Existing first commit: master prompt file
- No pre-existing application code or user project files were present at inspection.
- A dedicated feature branch was created from main: feature/vitelline-veins-3d.

Existing user work was preserved. No force-push, deletion, or history rewrite was performed.

## 2. Scientific work completed

- Defined the paired vitelline system and its relationship to yolk sac, hepatic primordium, transverse septum and sinus venosus.
- Added a Carnegie-stage-based chronology with approximate post-fertilization age notes.
- Added segment-by-segment fate maps for classical and human-reconstruction profiles.
- Compared Collardeau-Frachon & Scoazec (2008) with Hikspoors et al. (2017).
- Recorded the classical three prehepatic plus subdiaphragmatic connection model.
- Recorded the 2017 human reconstruction findings, including the dorsal connection and transient ventral connection.
- Separated portal trunk formation, portal sinus, hepatic sinusoidal pathways, hepatocardiac outflow and ductus venosus.
- Defined conservative language for the vitelline contribution to the hepatic IVC segment.
- Added rules preventing “not observed” from being treated as “regressed.”

## 3. Architecture work completed

- Selected React + TypeScript + Vite + Three.js as the initial browser stack.
- Deferred VTK.js unless volumetric medical-image workflows become necessary.
- Defined reusable structure, stage, evidence-profile and geometry data records.
- Defined a shared core suitable for later umbilical and cardinal modules.
- Defined a canonical anatomical coordinate system and camera orientation rules.
- Added unit, topology, browser and visual regression test plans.

## 4. Files delivered in this milestone

- README.md
- docs/prompts/VITELLINE_VEINS_MASTER_PROMPT.md
- docs/anatomy/vitelline-veins/DEVELOPMENTAL_SPEC.md
- docs/anatomy/vitelline-veins/FATE_MAP.md
- docs/anatomy/vitelline-veins/EVIDENCE_AND_VARIANTS.md
- docs/anatomy/vitelline-veins/REFERENCES.md
- docs/architecture/COORDINATE_SYSTEM.md
- docs/architecture/PROJECT_ARCHITECTURE.md
- docs/milestones/MILESTONE_0_REPORT.md

## 5. Scientific acceptance criteria

| Criterion | Status |
|---|---|
| Paired right / left vitelline system defined | Documented |
| Carnegie stage chronology established | Documented; ages remain approximate |
| Classical three prehepatic + subdiaphragmatic model documented | Documented |
| Human 3D reconstruction model documented separately | Documented |
| Competing portal-vein lineage interpretations recorded | Documented |
| Portal sinus and ductus venosus distinguished | Documented |
| Hepatic IVC contribution bounded correctly | Documented |
| Context-only umbilical / cardinal structures identified | Documented |
| Source register added | Documented |
| Coordinate handedness defined | Documented |

## 6. Technical acceptance criteria

| Criterion | Status |
|---|---|
| Repository and existing work inspected | Complete |
| Feature branch created | Complete |
| Reusable architecture specified | Complete |
| Coordinate system specified | Complete |
| Application shell | Not started — next milestone |
| 3D scene | Not started — next milestone |
| Automated CI | Not started — next milestone |
| Browser verification | Not applicable yet |

## 7. Known limitations

- No 3D mesh or application has been implemented in Milestone 0.
- Coordinate values are intentionally normalized constraints, not measured embryonic anatomy.
- The two scientific profiles are literature-based models and require expert review before being treated as definitive teaching content.
- The source register is a curated starting point; further primary sources may be added as implementation exposes specific anatomical questions.
- The project is in a public GitHub repository. Do not add private or copyrighted source material.

## 8. Next milestone

**Milestone 1 — Working 3D foundation**

Build only:
- React + TypeScript + Vite application shell;
- responsive scientific workstation layout;
- Three.js viewport;
- orbit / pan / zoom and reset;
- anterior, posterior, lateral, superior and inferior camera presets;
- embryo orientation axes;
- simple primitive gut / duodenum / liver reference geometry;
- stage selector scaffold and profile selector scaffold.

Do not add detailed vessels until coordinate orientation and organ landmarks have been visually verified.

## 9. Release rule

Milestone 0 is a documentation baseline, not a software release. Do not tag it as a stable application version.