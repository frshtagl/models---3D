# Milestone 6 — Hepatic Outflow, Venous Duct and Hepatic IVC Contribution

**Status:** Source implementation added; graph audit and GitHub Actions verification pending  
**Date:** 25 November 2026  
**Branch:** feature/vitelline-veins-3d  
**Version:** 0.6.0

## 1. Objective

Extend the portal-system workstation into an interactive hepatic venous outflow lesson. Keep the classical 2008 efferent model separate from the 2017 human reconstruction, use the 2024 human reconstruction for CS15 venous-route morphology and terminal hepatic-vein context, and avoid presenting the hepatic IVC contribution as the complete composite IVC.

## 2. Implemented 3D structures

The new source module, src/data/hepaticOutflowNetwork.ts, adds six selectable layers, ten centre-line paths and two additional graph nodes:

1. Classical subdiaphragmatic intervitelline anastomosis.
2. Classical right terminal vitelline hepatic outflow.
3. Classical transient left terminal hepatic outflow.
4. Classical branchless ductus venosus from the left angle of the portal sinus toward the IVC.
5. Human venous duct from the left umbilical vein at the hepatic hilum to the right hepatocardiac channel.
6. Human right, middle and left terminal hepatic-vein collectors.

The new paths are rendered as Three.js tubes from editable centre-line source data. Directional cone markers indicate flow direction on terminal paths. The human venous duct is split into three connected paths so its narrowed middle segment can be displayed at a smaller radius.

## 3. Classical hepatic efferent pathway

Collardeau-Frachon and Scoazec describe:
- venae revehentes draining the hepatic sinusoidal plexus;
- a subdiaphragmatic anastomosis joining the cranial right and left vitelline channels;
- drainage from this anastomosis toward the sinus venosus through the terminal primitive vitelline segments;
- primary right and left hepatic draining vessels in the early arrangement.

The new classical layers make the sinusoidal-to-venous-pole route traceable. The left terminal outflow is shown transiently and becomes no longer distinct in the later teaching bins; this is a schematic teaching interpretation, not a claim of an exact specimen-level regression date.

## 4. Two distinct ductus-venosus explanations

### Classical 2008 synthesis

The classical ductus venosus is described as a large, branchless vessel connecting the left angle of the portal sinus to the inferior vena cava. It lies in the prolongation of the umbilical vein but is not a direct continuation of the umbilical-vein lumen.

The model therefore starts this layer at node-left-iva-subhepatic, the left angle of the classical subhepatic / portal-sinus connection, not at the simplified umbilical hilar node.

### Human 2017 reconstruction

Hikspoors et al. describe a de novo left-to-right shunt between the left umbilical vein in the liver hilum and the right hepatocardiac channel. The model draws this as a separate three-section curved venous duct:
- hilar inlet;
- narrowed middle segment;
- right hepatocardiac outlet.

The path is not merged with the human portal sinus, which is represented separately as the left umbilical-to-right vitelline portal shunt in the 2017 profile.

## 5. 2024 human morphology context

Isotani et al. (2024) reconstruct the venous route in human embryos and early fetal specimens. Their study describes:
- a curved / S-shaped ductus venosus route with regional narrowing;
- a CS15 reconstruction of the umbilical venous route, ductus venosus and IVC;
- right, middle and left hepatic veins joining the IVC in the CS15 reconstruction;
- regional changes in the venous route through later embryonic stages.

The app uses this evidence for the three named terminal hepatic-vein collectors and for a visibly narrowed venous-duct segment. The model does not claim that its tube radii or centre-line coordinates are specimen measurements.

### Portal-sinus nomenclature caution

The 2017 paper describes the portal sinus as a left umbilical-to-right vitelline shunt. The 2024 paper's overview describes portal-sinus connections between the right hepatocardiac channel and right vitelline vein. These descriptions are not silently merged into a new path in this milestone. The existing portal-sinus layer remains the 2017 reconstruction pathway; the 2024 source is used here for venous-duct morphology and terminal hepatic-vein context. This nomenclature / topology difference should be reviewed by an embryology specialist before revising portal-sinus geometry.

## 6. Hepatic IVC scope boundary

The existing right hepatocardiac channel is relabelled as the hepatic / suprahepatic IVC contribution. The new terminal hepatic veins converge on its hepatic outflow junction.

This does **not** model the complete composite IVC. The subcardinal, supracardinal, posterior-cardinal and infrahepatic components are outside this milestone. The project must not teach that the entire IVC is derived from the vitelline system.

## 7. Stage bins

- CS13: classical hepatic efferent channels begin to be displayed in their early teaching bin.
- CS14: classical outflow bridge and both source-specific ductus-venosus models can be compared; the human venous duct is shown as developing.
- CS15: the human terminal hepatic veins are displayed as developing; the human venous duct is expanding and shown with a narrowed segment.
- CS16: the early fetal hepatic inflow and outflow arrangement is shown as persistent.

These are broad teaching bins. The 2024 study provides detailed later-stage specimens, but does not establish every onset date at a precise Carnegie-stage boundary. Hidden layers are not proof of biological absence.

## 8. Teaching application

The in-browser guided sequence now has 14 steps:
- the original nine portal-system steps;
- classical hepatic efferent outflow;
- human terminal hepatic veins;
- human venous duct;
- classical ductus venosus;
- the integrated fetal hepatic venous route.

Each step sets its profile, Carnegie stage, camera, selected structure and visible layer set. The 3D view remains manually orbitable and selectable. Flow-direction arrows are rendered on the new terminal pathways.

See [Hepatic Outflow Browser Teaching Guide](../teaching/HEPATIC_OUTFLOW_BROWSER_TEACHING_GUIDE.md).

## 9. Validation

The new source graph validator checks:
- unique layer, path and node IDs;
- declared path start / end nodes;
- centre-line endpoints against their graph-node coordinates;
- complete stage-state maps;
- no leakage into the incompatible evidence profile;
- correct classical ductus-venosus origin at the left portal-sinus angle;
- correct human venous-duct origin and right hepatocardiac destination;
- a separately narrowed human venous-duct segment;
- exactly three human terminal hepatic-vein collectors.

These deterministic source checks do not replace visual inspection in a browser or specialist embryology review.

## 10. Scientific and geometric limitations

- All coordinates and radii are normalized schematic teaching geometry, not specimen measurements.
- The right, middle and left terminal hepatic veins are simplified collector paths based on the 2024 CS15 reconstruction context; they are not a complete adult hepatic venous tree.
- The human right hepatic draining network and terminal hepatic-vein collectors are separate visual layers and may be toggled independently.
- The human venous duct's narrow segment is exaggerated for legibility.
- The hepatic / suprahepatic IVC contribution is shown only through the right hepatocardiac channel; the full composite IVC is not modeled.
- The left umbilical vein remains a simplified context path. The right umbilical vein, full placental inflow and complete umbilical system are not modeled.
- Postnatal derivatives are explained in the inspector and teaching narration: umbilical vein → ligamentum teres; ductus venosus → ligamentum venosum. The ligaments are not yet separate 3D meshes.

## 11. Primary sources

- Collardeau-Frachon S, Scoazec J-Y (2008). *Vascular Development and Differentiation During Human Liver Organogenesis*. The Anatomical Record 291:614–627. DOI: [10.1002/ar.20679](https://doi.org/10.1002/ar.20679). See “Efferent Venous Vessels,” “Symmetrical Stage,” and “Remodeling of the Umbilical Circulation, the Formation of the Portal Sinus and the Development of the Ductus Venosus.”
- Hikspoors J P J M et al. (2017). *The Fate of the Vitelline and Umbilical Veins During the Development of the Human Liver*. Journal of Anatomy 231:718–735. DOI: [10.1111/joa.12671](https://doi.org/10.1111/joa.12671). See “Right-sided hepatic drainage to the heart” and “Anastomoses in the hilar region of the liver.”
- Isotani N et al. (2024). *Regional differences in the umbilical vein and ductus venosus at different stages of normal human development*. The Anatomical Record 307(10):3306–3326. DOI: [10.1002/ar.25421](https://doi.org/10.1002/ar.25421). See the CS15 reconstruction, venous-duct regional narrowing and hepatic-vein / IVC route.

## 12. Next milestone

Milestone 7 should add the complete paired umbilical-vein system and then the cardinal venous networks required to build the composite IVC segment by segment. The hepatic IVC contribution must remain a separate, explicitly labelled part of that later reconstruction.
