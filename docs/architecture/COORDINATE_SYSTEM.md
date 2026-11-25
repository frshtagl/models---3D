# Embryonic 3D Coordinate and Orientation Specification

**Status:** Milestone 0 coordinate contract  
**Units:** normalized schematic units unless specimen-derived measurements are explicitly supplied  
**Primary use:** vitelline module; reusable by later umbilical and cardinal modules.

## 1. Canonical anatomical axes

Use one project-wide coordinate system. Never change anatomical handedness between stages or camera presets.

| World axis | Positive direction | Negative direction |
|---|---|---|
| X | Embryonic right | Embryonic left |
| Y | Cranial / superior | Caudal / inferior |
| Z | Dorsal / posterior | Ventral / anterior |

The anterior / ventral camera looks from negative Z toward the origin. With this camera orientation, embryonic right (+X) appears on the viewer's left, as it should in an anterior anatomical view.

**Mandatory UI rule:** always display a small orientation widget with R, L, A, P, C and Ca labels. Do not rely on camera memory alone.

## 2. Camera presets

All presets target the current stage's anatomical focus point. They must preserve the canonical world axes.

| Preset | Camera direction | Intended view |
|---|---|---|
| Anterior / ventral | (0, 0, -1) | Face embryo from ventral side; embryonic right appears viewer-left |
| Posterior / dorsal | (0, 0, +1) | View from dorsal side |
| Right lateral | (+1, 0, 0) | View from embryo's right |
| Left lateral | (-1, 0, 0) | View from embryo's left |
| Superior | (0, +1, 0) | Look caudally from cranial side |
| Inferior | (0, -1, 0) | Look cranially from caudal side |
| Oblique | (+/-1, +/-1, +/-1) normalized | Reveal depth and relationships |

Use an explicit camera up vector for superior / inferior views to prevent roll flips. Camera presets must be tested against a labeled left-right landmark.

## 3. Landmark-first coordinate construction

Do not hard-code every vessel as unrelated world coordinates. Construct each stage from named anatomical landmarks and local coordinate frames.

Required landmark anchors:
- embryo midline;
- cranial and caudal poles of primitive gut region;
- ventral and dorsal surfaces of duodenum;
- right and left sides of duodenum;
- yolk-sac stalk;
- hepatic primordium / liver envelope;
- transverse septum;
- sinus venosus / venous pole;
- dorsal pancreatic bud when the selected stage includes it;
- gallbladder landmark when the selected stage includes it.

Vessel paths must be generated relative to these landmarks, with explicit start and end nodes and connection topology. A vessel that crosses the duodenum in projection must be placed at the correct depth in 3D.

## 4. Duodenal reference frame

The duodenum is the central spatial landmark for the extrahepatic portal / vitelline network.

Represent it as a curved tubular organ with a recognizable lumen and a distinct ventral and dorsal surface. It must be sufficiently opaque in the default view to establish which vessels pass anterior or posterior to it. Provide a transparent mode, but do not make transparency the only way to understand depth.

For the classical profile:
- cranial-ventral / subhepatic connection: ventral to the relevant duodenal segment, below hepatic primordium;
- middle dorsal / retroduodenal connection: posterior to the duodenum;
- caudal-ventral connection: ventral to distal duodenal segment;
- subdiaphragmatic connection: cranial to hepatic primordium and immediately caudal to sinus venosus.

For the 2017 human reconstruction profile:
- dorsal extrahepatic intervitelline connection: caudal to dorsal pancreatic bud;
- small transient ventral connection: more caudal than dorsal connection, just below liver, present only in the described CS14 window;
- do not add the other classical anastomoses unless the Compare / Classical profile is active.

## 5. Relative coordinate scaffold

The following is a normalized starting scaffold, not specimen measurement. It is a placement guide only; final curves must be fitted to the selected stage's anatomical landmarks.

- Duodenal centerline: near X = 0; craniocaudal extent along Y; curved loop with a depth component.
- Right vitelline trunk: primarily X > 0, with a stage-dependent dorsal bend.
- Left vitelline trunk: primarily X < 0, with a stage-dependent dorsal bend.
- Dorsal / retroduodenal anastomosis: crosses behind the duodenum at Z > 0.
- Ventral anastomosis: crosses in front of the duodenum at Z < 0.
- Hepatic primordium: cranial to the duodenum, with a ventral foregut connection.
- Sinus venosus: cranial to the hepatic primordium.
- Yolk-sac stalk: caudal and ventral relative to the early embryo / gut junction.

Do not assign final numerical coordinates to all landmarks until a stage-specific anatomical blockout has been reviewed. The relative constraints above are the invariant requirements.

## 6. Stage transforms

The embryo's anatomy changes shape and orientation over time. Use a stage-specific transform and stage-specific landmark positions. Do not animate development by scaling the entire embryo or stretching one static vessel graph.

Every stage must define:
- anatomical focus point;
- landmark positions / transforms;
- vessel path control points;
- vessel radius profile;
- visibility and state for each segment;
- connections active at that stage;
- camera target and useful framing distance.

## 7. Vessel geometry and topology

Each vessel segment is a separately selectable object with a stable ID. Adjacent segments must meet at shared connection nodes, not merely overlap visually.

Required checks:
- each open endpoint is either an intentional terminal or connected to a named structure;
- each anastomosis connects the intended right and left channel in the correct profile;
- dorsal and ventral paths have distinct Z-depth;
- vessel radii taper smoothly and do not create obvious gaps;
- no unintended self-intersections or detached floating branches;
- vessel centerlines remain inside or at the surface of the intended organ when described as intrahepatic.

The rendered mesh may be smoothed, but the source centerline and node graph remain editable and authoritative.

## 8. Scale, orientation and rendering notes

- All models are labelled “schematic — not to scale” unless measured source data are used.
- Use the same orientation and palette across stages.
- Use a visible scale note rather than suggesting a normalized radius is a measured vessel diameter.
- The orientation widget and left/right labels remain visible when the model is isolated.
- The same anatomical orientation is used in the classical and human-reconstruction profiles.

## 9. Geometry QA

Before a stage is approved:
1. Inspect anterior, posterior, right lateral, left lateral, superior, and inferior views.
2. Confirm the dorsal connection is behind the duodenum and the ventral connection is in front.
3. Confirm right and left are not mirrored.
4. Inspect the model with duodenum and liver opaque, transparent, and hidden.
5. Check selected vessel connections in the structure tree.
6. Capture a stage screenshot with orientation widget and profile label visible.

A visual projection alone is not proof of correct topology.