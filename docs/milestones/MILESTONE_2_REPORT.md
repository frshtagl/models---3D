# Milestone 2 — Paired Vitelline Veins and Yolk-Sac Drainage

**Status:** Source implementation committed; graph-data validation passed; TypeScript / CI / browser verification pending  
**Date:** 25 November 2026  
**Branch:** feature/vitelline-veins-3d

## 1. Objective

Add the paired right and left vitelline venous pathways to the navigatable 3D blockout. Every vessel segment must have a stable ID, explicit start and end nodes, a selectable mesh, a source-profile-specific developmental state and a visible stage-dependent presentation.

## 2. Implemented network

The initial graph contains 8 independently selectable segments and 10 named nodes:

| Side | Segment | From | To |
|---|---|---|---|
| Right | Yolk-sac root | Right yolk-sac venous root | Right caudal junction |
| Right | Extrahepatic trunk | Right caudal junction | Right hepatic entry |
| Right | Intrahepatic conduit | Right hepatic entry | Right hepatocardiac junction |
| Right | Hepatocardiac channel | Right hepatocardiac junction | Right venous-pole entry |
| Left | Yolk-sac root | Left yolk-sac venous root | Left caudal junction |
| Left | Extrahepatic trunk | Left caudal junction | Left hepatic entry |
| Left | Intrahepatic conduit | Left hepatic entry | Left hepatocardiac junction |
| Left | Hepatocardiac channel | Left hepatocardiac junction | Left venous-pole entry |

The source graph is stored in src/data/vitellineNetwork.ts. It is the authoritative editable representation; the Three.js tubes are generated render geometry.

## 3. Interactive features

- Right and left channels have separate colors and selectable segments.
- Each segment can be hidden, shown or isolated.
- Clicking a rendered vessel selects the corresponding segment in the inspector.
- The inspector reports the active stage and profile-specific state.
- Stage changes update vessel caliber and opacity.
- The left intrahepatic conduit is represented differently in the two evidence profiles.
- The right intrahepatic and hepatocardiac pathways become visually dominant in later stages.
- The 3D scene retains the project-wide coordinate convention.

## 4. Evidence-profile handling

### Human 3D reconstruction — Hikspoors et al. (2017)

- The right intrahepatic conduit becomes dominant and persists longer.
- The left intrahepatic conduit is shown as a large conduit through the earlier stages, then as separated low-opacity schematic fragments from CS14 onward to communicate its reported breakup as a large vessel.
- These fragments are a visual cue only; they are not claimed to be a measured capillary network.
- The left hepatocardiac channel is shortened and faded during regression and is not drawn as a complete persistent channel at later stages.

### Classical synthesis — Collardeau-Frachon & Scoazec (2008)

- The right-sided hepatic / hepatocardiac pathway becomes dominant.
- The left intrahepatic pathway is labelled as remodeling rather than being assigned the exact human-reconstruction breakup sequence.
- The left hepatocardiac channel is shown regressing as a distinct channel.
- This profile is not merged with the 2017 reconstruction.

## 5. Deliberately not implemented yet

- Intervitelline anastomoses.
- Classical three prehepatic plus subdiaphragmatic connection network.
- The 2017 dorsal and transient ventral extrahepatic connections.
- Portal vein precursor and final portal trunk.
- Portal sinus / umbilico-vitelline shunt.
- Sinusoidal plexus and venae advehentes / revehentes.
- Ductus venosus and full umbilical system.
- Cardinal veins and the full composite IVC.

These structures are deferred to later milestones so that incompatible profiles are not accidentally combined.

## 6. Geometry and scientific limitations

- All vessel centerlines are normalized schematic coordinates, not specimen measurements.
- The paired early channels are represented as lateral pathways around the gut reference; exact 3D positions require specialist review against the cited human embryo reconstructions.
- The mesh radius is a visual teaching parameter, not a measured embryonic vessel diameter.
- A short faded remnant indicates “no longer distinct as a large named channel”; it does not claim complete absence of all endothelial or vascular channels.
- A connection node indicates an explicit software topology junction. It does not independently prove the biological presence of an anastomosis.

## 7. Data validation

validateVitellineNetwork() checks:
- unique segment IDs;
- existence of declared endpoint nodes;
- centerline start / end agreement with node coordinates;
- complete stage-state data for both profiles;
- continuity of the four-segment right and left drainage chains.

The UI reports the current graph-validation result. This data-level check does not replace build, browser, geometric or anatomical review.

## 8. Verification checklist

| Check | Status |
|---|---|
| 8 segment definitions committed | Passed |
| 10 named endpoint nodes committed | Passed |
| Segment endpoint and right / left chain validation | Passed — 0 graph issues |
| Two separate source profiles | Implemented |
| Stage-specific vessel state | Implemented |
| Click-to-select vessel meshes | Implemented; browser check pending |
| Visibility / isolate controls | Implemented; browser check pending |
| TypeScript strict check | Pending CI |
| Production build | Pending CI |
| Browser console and camera test | Pending |
| Vessel placement / depth review | Pending embryology review |

## 9. Next milestone

Milestone 3 will add the liver-enclosed vascular plexus and hepatic afferent / efferent relationships. The portal-forming anastomoses remain a separate later step, with separate graph data for the classical and human-reconstruction profiles.