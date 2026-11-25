# Milestone 4 — Intervitelline Anastomoses

**Status:** Source implementation committed; attachment audit passed; GitHub Actions TypeScript validation and production build passed; browser visual review pending  
**Date:** 25 November 2026  
**Branch:** feature/vitelline-veins-3d

## 1. Objective

Add actual, editable 3D intervitelline connections to the paired right and left vitelline trunks. Preserve the classical teaching topology and the 2017 human reconstruction as separate evidence profiles.

This milestone adds the connections themselves, embedded attachment points on the parent veins, stage-aware display states, a dorsal pancreatic landmark, selectable inspector entries and graph validation.

## 2. Implemented anatomy

Six independently selectable anastomosis layers are implemented:

| Evidence profile | Anastomosis | Spatial relationship | Stage presentation |
|---|---|---|---|
| Classical 2008 | Superior / subhepatic | Cranial-most prehepatic connection; ventral to duodenum, below hepatic primordium | Developing CS13; present CS14; later left-to-right bridge not separately resolved as it remodels into portal sinus |
| Classical 2008 | Middle / dorsal / retroduodenal | Posterior to duodenum | First prehepatic connection described; approximate developing CS12, persistent CS13–CS16 |
| Classical 2008 | Inferior / caudal-ventral | Most caudal prehepatic connection; ventral to distal duodenum | Developing CS13; present CS14; not separately resolved after CS14 |
| Classical 2008 | Subdiaphragmatic | Above hepatic primordium, immediately below sinus venosus | Developing CS13; present CS14; later outflow remodeling not represented as a persistent bridge |
| Human 2017 | Dorsal extrahepatic | Just caudal to dorsal pancreatic bud and dorsal to duodenum | Developing CS13; well formed early CS14; later fate not separately resolved |
| Human 2017 | Small transient ventral | More caudal than dorsal connection, ventral to duodenum and just below liver | Reported temporarily during CS14 only |

The classical three-prehepatic-plus-subdiaphragmatic arrangement is not displayed in the human reconstruction profile. The two human-reconstruction connections are not relabelled classical structures.

## 3. Geometry connected to the parent veins

Ten named attachment nodes have been added to the existing vitelline graph. They are embedded directly in the editable centerlines of:
- right and left extrahepatic vitelline trunks;
- right and left hepatocardiac channels.

Every anastomosis starts and ends at one of these shared attachment nodes. The graph validator checks that the endpoint matches its node and that the node is an exact control point on its parent vitelline segment. These are real graph connections in the source data, not free-floating tubes that only appear to touch.

The 3D centre-lines contain 44 editable points across the six anastomoses. The six layers are separately selectable and can be hidden or isolated.

## 4. Anatomical orientation

The project-wide coordinate convention is preserved:
- +X = embryonic right;
- +Y = cranial;
- +Z = dorsal / posterior;
- −Z = ventral / anterior.

The dorsal / retroduodenal connections pass behind the duodenal reference in +Z. The cranial-ventral and caudal-ventral connections pass in front of the relevant duodenal segments in −Z. The subdiaphragmatic connection lies cranial to the hepatic primordium and immediately caudal to the sinus venosus.

A dorsal pancreatic bud landmark is added at CS13 onward. It is a positional reference only, not a complete pancreas reconstruction. The human dorsal anastomosis is placed caudal to this landmark.

The posterior camera is the default view for the new milestone so that the dorsal connection is immediately visible. The learner can switch to anterior, lateral, superior and inferior views.

## 5. Evidence profile A — Classical 2008 synthesis

Collardeau-Frachon and Scoazec describe:
- the inferior prehepatic anastomosis on the ventral side of the distal duodenum, reported in a 5-mm embryo;
- the middle / retro-duodenal anastomosis as the first to appear, in a 3.5–4-mm embryo, on the dorsal side of the duodenum;
- the superior / subhepatic anastomosis under the hepatic primordium, ventral to the duodenal segment;
- a fourth subdiaphragmatic connection above the hepatic primordium and immediately under the sinus venosus.

The classical portal-trunk account retains the left vitelline segment caudal to the middle connection, the middle dorsal anastomosis, and the right vitelline segment between the middle and subhepatic connections. The subhepatic anastomosis is described as becoming the portal sinus / sinus intermedius.

The source is a review synthesizing earlier embryological work. Stage bins used in the viewer are schematic; the size-based observations are not converted into exact Carnegie-stage onset dates.

The inferior / caudal-ventral connection is not listed as a retained segment in the review's final portal-trunk construction. Its later stage state is therefore marked **not separately resolved**, not assigned an invented regression date.

## 6. Evidence profile B — Human reconstruction 2017

Hikspoors et al. report:
- a dorsal extrahepatic anastomosis developing between the left and right vitelline veins just caudal to the dorsal pancreatic bud at CS13;
- a well-formed dorsal channel at early CS14;
- a much smaller ventral anastomosis, more caudal than the dorsal connection and just below the liver, temporarily present during CS14 only.

The human dorsal channel is not separately resolved in the cited description after early CS14. The viewer therefore uses **not separately resolved** for later bins rather than claiming regression.

The transient ventral connection is rendered only in CS14. It is not equated with the classical inferior / caudal-ventral connection.

The 2017 article describes the portal sinus as a left umbilical-to-right vitelline shunt, and states that the left vitelline vein was already regressing when this shunt developed. The classical subhepatic intervitelline anastomosis and the human umbilico-vitelline shunt are therefore not treated as one identical formation mechanism. The umbilical vein itself remains outside this vitelline-only milestone.

## 7. Interaction and inspector

- Each of the six anastomoses is a separate selectable anatomy layer.
- Each path can be selected in the scene or in the layer list.
- The inspector shows the stage state, active evidence profile, topological role, source-specific explanation and source ID.
- Stage changes alter visibility and caliber.
- Switching evidence profiles hides incompatible topology rather than overlaying both.
- The dorsal pancreatic bud is a selectable, stage-specific landmark.
- Show all, isolate selected and individual visibility toggles include the new layers.

## 8. Graph validation

validateIntervitellineNetwork() checks:
- unique anastomosis IDs;
- existence of both attachment nodes;
- centreline endpoints matching the declared attachment nodes;
- attachment nodes embedded in the correct parent vitelline / hepatocardiac segment;
- complete stage-state maps for both profiles;
- incompatible profile leakage (classical connections must be absent from the human profile and vice versa);
- dorsal paths in positive-Z depth and ventral paths in negative-Z depth;
- the human dorsal connection is caudal to the dorsal pancreatic bud;
- the human transient ventral connection is caudal to the dorsal connection.

These checks validate source topology and coordinate rules. An independent attachment audit at commit b6715cf1dd68638d9b5150fe85e904320f0d024f confirmed 20 vitelline nodes, 8 parent vessel segments, 6 anastomosis paths, 44 centre-line points, and no missing endpoint or parent-centreline attachment.

GitHub Actions: https://github.com/frshtagl/models---3D/actions/runs/45663666974

- TypeScript validation: passed.
- Production build: passed.
- Browser visual review: pending.
- Specialist embryology review: pending.

These checks do not replace browser visual review or specialist embryology review.

## 9. Scientific and geometric limitations

- All coordinates and vessel radii are normalized teaching geometry, not measured specimen data.
- The duodenum and dorsal pancreatic bud are simplified landmarks.
- The model demonstrates dorsal / ventral depth relationships; it is not a specimen-derived 3D reconstruction.
- The classical source is a review and its size-based observations do not justify exact CS onset claims.
- “Not separately resolved” is intentionally distinct from “regressed.”
- The human reconstruction's portal sinus / umbilico-vitelline shunt is not modeled in this milestone because the left umbilical vein is outside the current module.
- The portal trunk, portal tributaries and selective regression required to create the definitive extrahepatic portal vein remain for Milestone 5.

## 10. Primary sources

- Collardeau-Frachon S, Scoazec J-Y (2008). *Vascular Development and Differentiation During Human Liver Organogenesis*. The Anatomical Record 291:614–627. DOI: 10.1002/ar.20679. See the “Development of Intervitelline Anastomoses” section and Figures 4–5.
- Hikspoors J P J M et al. (2017). *The Fate of the Vitelline and Umbilical Veins During the Development of the Human Liver*. Journal of Anatomy 231:718–735. DOI: 10.1111/joa.12671. See “Extrahepatic intervitelline and interumbilical anastomoses” and Figures 8–9.

## 11. Next milestone

Milestone 5 will construct the extrahepatic portal trunk and its lineage alternatives. The classical three-segment portal-trunk model and the 2017 small left-sided midgut-derived portal precursor will remain separate. The human umbilico-vitelline portal-sinus shunt will be implemented as a distinct connection from the classical subhepatic anastomosis.