# Intervitelline Anastomoses — Anatomy and Stage Guide

## Scope

This document describes the six profile-specific anastomosis layers in Milestone 4. It distinguishes the classical four-connection teaching model from the two extrahepatic connections reported in the 2017 human reconstruction.

The viewer uses Carnegie stages as teaching bins. Do not interpret schematic visibility bins as exact specimen-level onset or regression dates.

## 1. Classical teaching model — 2008 synthesis

Collardeau-Frachon and Scoazec describe four intervitelline anastomoses: three in the prehepatic segment and one subdiaphragmatic connection.

### 1.1 Middle / dorsal / retroduodenal anastomosis

- First of the three prehepatic connections to appear in the review's account.
- Reported in a 3.5–4-mm embryo.
- Passes dorsal / posterior to the duodenum.
- In the classical portal-trunk construction, this middle connection forms the dorsal limb of the retained portal-trunk pathway.

The app uses an approximate CS12 developing state, then shows the channel as persistent in subsequent stage bins. This is a teaching-stage approximation to the source's size-based observation.

### 1.2 Inferior / caudal-ventral anastomosis

- Most caudal of the three prehepatic connections.
- Located on the ventral / anterior side of the distal duodenal segment.
- Reported in a 5-mm embryo.
- Not listed as one of the three segments retained in the final portal-trunk construction summarized by the review.

The viewer marks it developing in CS13 and present in CS14. Later bins are **not separately resolved**. The application does not invent a precise regression stage.

### 1.3 Superior / subhepatic / cranial-ventral anastomosis

- Cranial-most prehepatic connection.
- Located immediately beneath the hepatic primordium.
- Passes ventral / anterior to the duodenal segment.
- In the classical account, the subhepatic anastomosis enlarges and becomes the portal sinus (sinus intermedius).

This classical portal-sinus description is not silently substituted for the human reconstruction's left umbilical-to-right vitelline shunt. The viewer shows the left-to-right subhepatic bridge through the CS14 teaching bin; later bins are marked not separately resolved because the umbilical-to-portal sinus connection is outside this vitelline-only milestone.

### 1.4 Subdiaphragmatic anastomosis

- Lies above the hepatic primordium.
- Lies immediately below the sinus venosus.
- Receives the classical venae revehentes, which drain the hepatic sinusoidal plexus toward the sinus venosus.

It is spatially separate from the three prehepatic connections around the duodenum. The viewer shows it through the CS14 symmetrical-stage bin; later hepatic outflow remodeling is deferred rather than depicting this as a persistent left-to-right bridge.

## 2. Human 3D reconstruction — 2017

### 2.1 Dorsal extrahepatic intervitelline anastomosis

Hikspoors et al. report a dorsal anastomosis developing between the left and right vitelline veins just caudal to the dorsal pancreatic bud at CS13. A well-formed channel is present at early CS14.

The app therefore:
- shows a developing connection at CS13;
- shows a well-formed connection at CS14;
- marks later stage bins **not separately resolved**, rather than asserting regression.

The connection is placed posterior to the duodenum (+Z) and caudal to the dorsal pancreatic bud (−Y relative to the bud).

### 2.2 Small transient ventral intervitelline anastomosis

The same reconstruction reports a much smaller ventral connection:
- more caudal than the established dorsal connection;
- just underneath the liver;
- temporarily present during CS14 only.

The viewer displays this connection at CS14 only. It is not called the classical inferior / caudal-ventral anastomosis: the source, topographic description and observed stage window differ.

## 3. Why the two profiles are separate

| Question | Classical 2008 synthesis | Human 2017 reconstruction |
|---|---|---|
| How many connections are represented? | Four: three prehepatic plus one subdiaphragmatic | Two extrahepatic connections in the reported human series |
| Dorsal connection | Middle / retroduodenal anastomosis | Dorsal connection caudal to dorsal pancreatic bud |
| Ventral connection(s) | Cranial-ventral / subhepatic and caudal-ventral | One smaller, more caudal transient connection in CS14 |
| Subdiaphragmatic bridge | Explicitly described | Not represented as a separate left-to-right bridge |
| Portal sinus | Subhepatic anastomosis becomes portal sinus | Left umbilical vein connects to right vitelline (portal) vein via an umbilico-vitelline shunt |

The 2017 paper also describes a small left-sided midgut-derived vein entering the left vitelline vein just upstream of the dorsal connection. This portal precursor is reserved for Milestone 5.

## 4. Coordinate and rendering contract

The project-wide coordinate system is:
- +X: embryonic right;
- −X: embryonic left;
- +Y: cranial;
- −Y: caudal;
- +Z: dorsal / posterior;
- −Z: ventral / anterior.

The 3D paths use these relationships:
- middle / human dorsal connections pass posterior to the duodenum in positive Z;
- subhepatic and caudal / transient ventral connections pass anterior to the relevant duodenal segments in negative Z;
- subdiaphragmatic connection is cranial to the hepatic primordium and immediately caudal to the sinus venosus.

The dorsal pancreatic bud is a small stage-specific landmark, not a full pancreas model. Its location provides a reference for the human dorsal connection.

## 5. Meaning of stage states

- **Not yet visible:** the layer is not rendered in the selected stage bin; this is not proof of biological absence.
- **Developing:** an early schematic connection is rendered.
- **Persistent:** the connection is represented as present in the selected source profile.
- **Transient:** the source describes a short-lived connection in the selected stage window.
- **Regressing:** the source supports a regression interpretation.
- **Not separately resolved:** the cited source does not separately trace the connection in the later stage range; no regression claim is made.
- **Not in profile:** the connection belongs to the other evidence model and is intentionally hidden.

## 6. Graph topology

Each anastomosis is a separate source-data object with:
- stable ID;
- left and right attachment node IDs;
- editable centre-line control points;
- display radius and colour;
- profile-specific stage states;
- profile-specific evidence notes;
- source IDs.

The ten attachment nodes are embedded in the existing vitelline / hepatocardiac parent vessel centre-lines. Validation checks that the declared endpoints coincide with those parent paths. The rendered Three.js tube is a disposable visualisation of the source centre-line.

## 7. References

- Collardeau-Frachon S, Scoazec J-Y. (2008). *Vascular Development and Differentiation During Human Liver Organogenesis*. The Anatomical Record 291:614–627. DOI: [10.1002/ar.20679](https://doi.org/10.1002/ar.20679).
- Hikspoors J P J M et al. (2017). *The Fate of the Vitelline and Umbilical Veins During the Development of the Human Liver*. Journal of Anatomy 231:718–735. DOI: [10.1111/joa.12671](https://doi.org/10.1111/joa.12671).