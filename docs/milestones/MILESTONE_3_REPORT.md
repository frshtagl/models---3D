# Milestone 3 — Hepatic Sinusoidal Plexus and Intrahepatic Venous Pathways

**Status:** Source implementation committed; graph topology validation passed; GitHub Actions TypeScript and production build passed; browser review pending  
**Date:** 25 November 2026  
**Branch:** feature/vitelline-veins-3d

## 1. Objective

Extend the paired vitelline-vein blockout into the developing hepatic microvasculature. Add a schematic sinusoidal plexus and profile-specific afferent / efferent relationships without merging the classical 2008 synthesis with the 2017 human reconstruction.

## 2. Implemented graph

The milestone adds 7 selectable hepatic vascular layers, 23 named hepatic graph nodes and 33 centerline paths.

| Layer | Evidence profile | Paths | Role |
|---|---|---:|---|
| Hepatic sinusoidal plexus | Shared schematic layer; evidence note changes by profile | 20 | Intrahepatic reticular microvascular network |
| Venae advehentes | Classical 2008 only | 2 | Afferent channels toward sinusoids |
| Venae revehentes | Classical 2008 only | 2 | Efferent channels from sinusoids toward cranial outflow |
| Sinusoidal entry from venous sinus | Human 2017 only | 2 | Schematic entry relationship described in the reconstruction |
| Right hepatic drainage network | Human 2017 only | 3 | Right-dominant drainage network extending from the hepatocardiac channel |
| Left hepatic drainage remnant | Human 2017 only | 1 | Temporary left-sided channel shown regressing as a distinct pathway |
| Right intrahepatic portal branches | Human 2017 only | 3 | Right portal branches arising from the right vitelline (portal) conduit |

The 20-edge sinusoidal mesh is one selectable anatomical layer. Its constituent path IDs remain stable in the graph source.

## 3. Evidence profiles remain separate

### Classical synthesis — Collardeau-Frachon & Scoazec (2008)

- Sinusoids appear early as hepatic cords invade the septum transversum.
- The review discusses two proposed sources: pre-existing septum-transversum capillaries and disruption of pre-existing vitelline veins. These are presented as proposed, potentially non-exclusive mechanisms, not as a settled single origin.
- Venae advehentes convey blood from the subhepatic anastomosis toward the sinusoidal plexus.
- Venae revehentes drain the plexus toward the subdiaphragmatic anastomosis and sinus venosus.
- The boundary anchors for these channels are schematic. The corresponding intervitelline anastomoses are deferred to Milestone 4.

### Human 3D reconstruction — Hikspoors et al. (2017)

- The study describes sinusoids entering from the venous sinus to form an intrahepatic network.
- Larger vitelline and umbilical conduits remain temporarily identifiable after enclosure by hepatoblasts; the sinusoidal mesh is not presented as wholesale fragmentation of every vitelline conduit.
- A network of draining veins develops retrogradely from the hepatocardiac channels, with pronounced left-right asymmetry.
- The right intrahepatic portal branches arise from the right vitelline (portal) conduit.
- Left intrahepatic portal branches arise from the left umbilical vein in this reconstruction and are intentionally not drawn in this vitelline-only milestone.

## 4. Stage presentation

| Stage | Sinusoidal plexus | Classical advehent / revehent channels | Human reconstruction layers |
|---|---|---|---|
| CS10 | Not yet shown | Not yet shown | Not yet shown |
| CS12 | Developing | Not yet shown | Sinusoidal entry begins |
| CS13 | Expanding | Developing | Entry expands; hepatic drainage network begins |
| CS14 | Expanding | Expanding | Right drainage expands; left drainage remnant regresses; right portal branches appear |
| CS15 | Persistent | Persistent | Right drainage and portal branches persist; left remnant no longer distinct |
| CS16 | Persistent | Persistent | Right drainage and portal branches persist |

The states are teaching-stage bins, not exact day-by-day onset claims. Carnegie stage is the primary key; source-specific age conventions remain documented separately.

## 5. Interaction and rendering

- Every layer can be selected, hidden, shown or isolated from the anatomy inspector.
- Clicking any rendered path selects its parent anatomical layer.
- The inspector shows the active developmental state, layer role, profile-specific evidence note and source IDs.
- Stage and profile changes update visibility, opacity and schematic caliber.
- The sinusoidal mesh is generated from editable source paths; Three.js meshes are render products only.
- The scene legend distinguishes vitelline conduits, sinusoids, afferent channels and efferent / drainage channels.

## 6. Verification results

GitHub Actions run: https://github.com/frshtagl/models---3D/actions/runs/45659335054

| Verification | Result |
|---|---|
| TypeScript validation (npm run typecheck) | Passed |
| Production build (npm run build) | Passed |
| Hepatic graph topology checks | Passed — 23 nodes, 33 paths, connected 20-path plexus |
| Vitelline graph checks | Passed in the source-data validation |
| Browser visual / interaction review | Pending |
| Specialist embryology review | Pending |

## 6. Graph validation

The hepatic graph validator checks:
- unique node, layer and path IDs;
- valid start and end node references;
- centerline endpoints matching their declared node positions;
- complete state and evidence records for both profiles and all implemented stages;
- known links to shared external structures;
- connectivity of the 20-path sinusoidal plexus.

A separate vitelline graph validator continues to check the paired drainage chains. These are source-data checks, not substitutes for TypeScript, production build, browser or embryology review.

## 7. Deliberately deferred

- Classical three prehepatic plus subdiaphragmatic intervitelline anastomoses.
- 2017 dorsal and transient ventral extrahepatic connections.
- Portal trunk precursor and portal sinus / umbilico-vitelline shunt.
- Left umbilical vein and left umbilical-derived intrahepatic portal branches.
- Ductus venosus / venous duct.
- Full hepatic IVC and terminal hepatic-vein anatomy.
- Portal spaces, hepatic artery, mature lobular architecture and central-vein topology.
- Sinusoidal endothelial fenestration, basement-membrane remodeling and later fetal endothelial marker maturation.
- Kupffer cells, stellate cells and hematopoietic cell populations.

These are not represented by hidden or implied geometry. They require separate evidence-aware milestones.

## 8. Geometry and scientific limitations

- All coordinates and radii are normalized schematic teaching values, not measured embryonic dimensions.
- The plexus is a reticular teaching abstraction, not a specimen-derived capillary reconstruction.
- The classical subhepatic and subdiaphragmatic endpoints are boundary anchors, not completed anastomoses.
- The 2017 draining network is a schematic spatial relationship; its retrograde developmental description must not be confused with blood-flow arrow direction.
- A left portal branch network is not shown because the 2017 reconstruction assigns it to the left umbilical vein, which is outside this module.
- CS16 does not imply adult sinusoidal maturity; endothelial differentiation continues later in gestation.

## 9. Primary references

- Collardeau-Frachon S, Scoazec J-Y (2008). *Vascular development and differentiation during human liver organogenesis*. The Anatomical Record 291:614–627. DOI: 10.1002/ar.20679.
- Hikspoors J P J M et al. (2017). *The fate of the vitelline and umbilical veins during the development of the human liver*. Journal of Anatomy 231:718–735. DOI: 10.1111/joa.12671.

See docs/anatomy/vitelline-veins/REFERENCES.md and SINUSOIDAL_DEVELOPMENT.md for the evidence register and interpretation notes.

## 10. Next milestone

Milestone 4 will implement the model-specific extrahepatic intervitelline anastomoses. The classical three prehepatic plus subdiaphragmatic scheme and the 2017 dorsal plus transient ventral arrangement will remain separate selectable topologies.