# Milestone 5 — Portal Vein, Portal Sinus and Teaching Walkthrough

**Status:** Source implementation committed; graph and CI verification pending  
**Date:** 25 November 2026  
**Branch:** feature/vitelline-veins-3d

## 1. Objective

Extend the vitelline-vein workstation into an interactive portal-system teaching model. Implement the classical portal-trunk lineage and the 2017 human-reconstruction pathway as separate evidence profiles. Add the distinct portal-sinus mechanisms, simplified left umbilical inflow, first-order portal branches and an in-browser teaching walkthrough.

## 2. Implemented portal anatomy

The portal data module adds:
- the classical three-component portal trunk;
- the human left-sided midgut-derived portal precursor and right vitelline continuation;
- a simplified left umbilical-vein inflow path;
- a classical portal sinus layer;
- a human umbilico-vitelline portal sinus layer;
- classical left and right first-order portal branch layers;
- human left portal branches, alongside the existing human right portal branch layer;
- a gallbladder landmark and a thin Cantlie boundary guide.

All vascular paths are editable Three.js centre-line source data. The rendered tubes are generated from the source paths at runtime. The milestone adds 9 portal layers, 19 portal centre-line paths and 11 portal-specific graph nodes; two portal anchors are checked against existing parent vitelline segments.

## 3. Classical 2008 portal-trunk construction

Collardeau-Frachon and Scoazec describe the classical portal trunk, from caudal to cranial, as three retained vitelline components:

1. The left vitelline segment from the termination of the mesenteric vein to the middle intervitelline anastomosis.
2. The middle / retroduodenal intervitelline anastomosis.
3. The right vitelline segment between the middle and subhepatic anastomoses.

The other segments of the right and left vitelline veins collapse in this account. The portal trunk ends at the right angle of the subhepatic anastomosis. The subhepatic anastomosis remodels into the portal sinus / sinus intermedius, connecting the umbilical and portal circulations.

The three retained components are highlighted in gold as one composite portal-trunk layer. They are not rendered as a new fourth vessel.

## 4. Human 2017 portal pathway

Hikspoors et al. describe the future extrahepatic portal vein as a small left-sided vein from the developing midgut mesentery entering the left vitelline vein just upstream of the dorsal intervitelline anastomosis. The dorsal anastomosis provides the passage of the portal vein behind the duodenum. The right vitelline conduit remains identifiable and contributes to the right-sided portal pathway.

The model highlights this as a separate teaching path:
- left-sided midgut-derived portal precursor;
- short left vitelline limb upstream of the dorsal crossing;
- dorsal extrahepatic intervitelline crossing;
- right extrahepatic vitelline continuation;
- right intrahepatic vitelline / portal continuation.

This is an evidence-aware composite teaching overlay, not a claim that the article traced every millimetre of one uninterrupted portal trunk in every specimen.

## 5. Portal sinus — two distinct mechanisms

### Classical profile

The 2008 synthesis describes the subhepatic intervitelline anastomosis becoming the portal sinus. Regression of its left half and enlargement of the remaining part are proposed; the left umbilical vein terminates at the left angle, while the portal trunk reaches the right angle. The model highlights the subhepatic bridge and its left umbilical approach.

### Human reconstruction profile

The 2017 reconstruction describes a de novo intrahepatic left-to-right shunt between the left umbilical vein in the liver hilum and the right vitelline (portal) vein. The left vitelline conduit was already regressing when this shunt developed. The portal sinus persists as the transverse part of the left portal vein.

These two pathways are separate layers. They must not be displayed as one hybrid mechanism.

## 6. Portal-branch origins and the gallbladder landmark

The human reconstruction identifies portal branches at CS14:
- right-sided portal branches arise from the right intrahepatic vitelline (portal) vein;
- left-sided portal branches arise from the left umbilical vein in a spiraling arrangement;
- the gallbladder is a reliable marker of the hepatic vascular midline / line of Cantlie.

The app adds simplified first-order left and right portal branches and a small gallbladder landmark. A thin Cantlie guide is explicitly labelled as an orientation aid, not a vessel. These paths are not a complete Couinaud segmental tree or specimen-derived reconstruction.

The classical profile shows schematic first-order branches from the portal trunk and portal-sinus tributaries, with distinct source notes.

## 7. Stage presentation

The stage timeline remains CS10, CS12, CS13, CS14, CS15 and CS16.

- CS13: human midgut-derived precursor and dorsal crossing are shown as developing.
- CS14: portal branches are represented as developing; the human portal sinus is shown as developing in the late-CS14 teaching bin.
- CS15: portal trunk, portal sinus and portal branches are shown as established / expanding.
- CS16: the organized early fetal portal arrangement is shown.

These are broad teaching bins. They do not convert every source observation into an exact specimen-level onset date. The left umbilical vein is a simplified context path only; the full paired umbilical system and venous duct are deferred.

## 8. In-browser teaching walkthrough

The app adds a nine-step guided lesson. The “Teaching guide” control applies the profile, stage, camera, selected structure and visible layers for each step.

The sequence covers:
1. Paired vitelline baseline.
2. Left-sided human midgut portal precursor.
3. Dorsal crossing behind the duodenum.
4. Right vitelline continuation.
5. Left umbilical inflow.
6. Human portal sinus.
7. Left / right portal-branch origins and Cantlie landmark.
8. Classical three-segment portal trunk.
9. Classical portal sinus and comparison with the human model.

Each step includes a learning point, a short teaching narration and a question to ask learners. The model remains fully interactive while the card is open. Closing the card leaves the current model configuration in place. The full-screen control supports classroom projection.

## 9. Graph validation

The portal validator checks:
- unique layer and path IDs;
- positive radii and valid centre-line lengths;
- every path start and end matching its declared graph nodes;
- the midgut portal precursor entering the left extrahepatic vitelline trunk at an embedded point;
- the right portal-sinus attachment lying on the right intrahepatic vitelline conduit;
- complete stage-state maps for both evidence profiles;
- no classical / human layer leakage;
- the classical portal trunk containing exactly three retained vitelline components;
- the human portal pathway containing the midgut precursor, dorsal crossing and right vitelline continuation;
- distinct classical and human portal-sinus endpoints.

These are source-graph and coordinate checks. They do not replace visual inspection of the rendered 3D scene or expert anatomical review.

## 10. Scientific and geometric limitations

- All coordinates and radii are normalized schematic teaching geometry, not specimen measurements.
- The portal precursor is represented as a short schematic branch from the developing midgut mesentery.
- The left umbilical vein is included as a simplified context path only; right umbilical vein, paired prehepatic trunks, placenta and complete umbilical circulation are not modeled here.
- The human right portal branches reuse the existing reconstruction-specific layer; left portal branches are newly represented as schematic first-order paths.
- The gallbladder and Cantlie guide are orientation aids.
- The model does not yet include the venous duct / ductus venosus, full hepatic outflow remodeling, portal tributary tree, or adult segmental portal anatomy.
- Classical and human-reconstruction portal sinus mechanisms remain separate.

## 11. Browser teaching and local run

See the [Portal Vein Browser Teaching Guide](../teaching/PORTAL_VEIN_BROWSER_TEACHING_GUIDE.md) for installation, classroom use, guided lesson steps, camera controls and full-screen projection.

Run locally with Node.js 20 or later:

    npm install
    npm run dev

Open the Vite local URL printed in the terminal. For a production check:

    npm run typecheck
    npm run build
    npm run preview

## 12. Primary sources

- Collardeau-Frachon S, Scoazec J-Y (2008). *Vascular Development and Differentiation During Human Liver Organogenesis*. The Anatomical Record 291:614–627. DOI: 10.1002/ar.20679. See “Development of the Portal Vein” and “Remodeling of the Umbilical Circulation, the Formation of the Portal Sinus and the Development of the Ductus Venosus.”
- Hikspoors J P J M et al. (2017). *The Fate of the Vitelline and Umbilical Veins During the Development of the Human Liver*. Journal of Anatomy 231:718–735. DOI: 10.1111/joa.12671. See “Origin of intrahepatic portions of portal veins,” “Extrahepatic intervitelline and interumbilical anastomoses,” and “Contribution of umbilical veins to liver vasculature.”

## 13. Next milestone

Milestone 6 will add hepatic outflow / terminal hepatic veins and the venous duct as a separately sourced umbilical-system shunt. The composite IVC will be built segment by segment and must not be represented as a single vessel of one embryonic origin.