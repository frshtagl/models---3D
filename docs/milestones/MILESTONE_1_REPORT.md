# Milestone 1 — Interactive 3D Foundation

**Status:** Initial implementation committed; automated build and browser verification pending  
**Date:** 25 November 2026  
**Branch:** feature/vitelline-veins-3d

## 1. Objective

Create the first runnable browser application and verify a reusable anatomical blockout before adding detailed vitelline vessels.

## 2. Implemented

- React + TypeScript + Vite application shell.
- Three.js scene with orbit, pan and zoom through OrbitControls.
- Camera presets: anterior, posterior, right, left, superior and inferior, plus reset.
- Anatomical orientation legend using the project coordinate convention.
- Procedural reference geometry for:
  - hepatic primordium;
  - duodenum;
  - foregut;
  - yolk sac / umbilical vesicle;
  - sinus venosus / venous pole;
  - transverse septum region.
- Carnegie-stage selector scaffold: CS10, CS12, CS13, CS14, CS15 and CS16.
- Stage playback and previous / next navigation.
- Selectable anatomy layers and visibility toggles.
- Selected-structure inspector and isolate / show-all controls.
- Selectable classical 2008 and human reconstruction 2017 evidence profiles.
- Responsive dark scientific workstation layout.
- GitHub Actions workflow for TypeScript and production-build checks.

## 3. Scientific and geometric limitations

- This milestone does not yet contain vitelline-vein meshes or anastomoses.
- The reference geometry is procedural and schematic, not a measured specimen reconstruction.
- The stage-dependent liver and duodenum scale factors are interface placeholders, not quantitative embryonic growth data.
- The evidence-profile selector is a scaffold; detailed profile-specific vessel graphs will be added in later milestones.
- No claim is made that the current organ blockout has been validated by an embryology reviewer.

## 4. Verification checklist

| Check | Status |
|---|---|
| Application source and dependencies committed | Implemented |
| TypeScript strict configuration | Implemented |
| Three.js scene and navigation | Implemented; browser check pending |
| Anatomical orientation presets | Implemented; handedness review pending |
| Stage selector and playback | Implemented; browser check pending |
| Structure selection and visibility | Implemented; browser check pending |
| Automated TypeScript check | Pending CI |
| Production build | Pending CI |
| Browser console / interaction test | Pending |
| Scientific review of organ landmarks | Pending |

## 5. Next work

1. Confirm CI passes and correct all compiler / build errors.
2. Run the application in a browser and inspect all camera presets.
3. Correct any left-right or dorsal-ventral orientation issues.
4. Review the duodenum, hepatic primordium, yolk sac and venous-pole placement.
5. Only after blockout acceptance, implement the paired vitelline channels with stable segment IDs and stage-specific topology.

## 6. Release rule

This is a development milestone, not a stable release. Do not merge to main or tag a release until automated checks and visual / anatomical acceptance checks pass.