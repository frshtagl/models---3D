# Milestone 7 — Paired Umbilical Veins and Cardinal Venous Foundations

**Status:** Source implementation added; TypeScript, graph validation and production build pending  
**Version:** 0.7.0  
**Branch:** feature/vitelline-veins-3d

## 1. Objective

Extend the vitelline / hepatic workstation with:
- the early paired umbilical venous system;
- persistence of the left umbilical vein and regression of the right;
- the anterior, common and caudal cardinal pathways;
- the mesonephric subcardinal plexus and early intersubcardinal connection;
- an explicit selector for two competing interpretations of infrahepatic IVC and azygos development.

The milestone deliberately stops before claiming a complete adult IVC reconstruction. The global timeline still ends at CS16; the later human reconstruction changes through CS18–CS23 are described but not animated.

## 2. Implemented umbilical structures

The new source module, src/data/umbilicalNetwork.ts, adds:
- right umbilical vein, split into an extrahepatic path and early cranial sinus-horn connection;
- a separate early left umbilical sinus-horn connection;
- stage-dependent regression / disappearance states;
- a graph validator for nodes, endpoints, states and profile evidence.

The persistent left umbilical vein from placental entry to hepatic hilum remains the existing left-umbilical-inflow layer in portalNetwork.ts. It is intentionally reused rather than duplicated. Its postnatal fate is now shown in the inspector: closure to form the ligamentum teres hepatis.

The new right-umbilical-vein layer is a paired early vessel that becomes regressive and is no longer represented as a distinct large conduit in later stage bins. The left sinus-horn connection is a separate early connection; its disappearance does not mean the persistent left umbilical vein itself regresses.

## 3. Implemented cardinal structures

The new src/data/cardinalNetwork.ts adds eight selectable layers and 19 centre-line paths:

1. Paired anterior cardinal veins.
2. Paired common cardinal veins (ducts of Cuvier).
3. Paired caudal / posterior cardinal veins.
4. Subcardinal / mesonephric venous plexus.
5. Paired longitudinal subcardinal veins.
6. Intersubcardinal anastomosis.
7. Developing iliac venous confluence.
8. Alternative paired supracardinal channels in the conventional segmental model.

The source graph connects the anterior and caudal cardinal paths to common cardinal junctions, and the caudal cardinal channels to the mesonephric subcardinal plexus. The subcardinal longitudinal channels connect to the early intersubcardinal cross-connection.

Context geometry was added for the dorsal aorta, paired mesonephroi, placental reference and umbilical cord / connecting stalk. These are positional teaching structures, not full organ or vascular reconstructions.

## 4. Two IVC / azygos interpretations are kept separate

### Conventional four-segment teaching model

The conventional segmental model assigns:
- hepatic IVC to the right vitelline / hepatocardiac contribution;
- suprarenal IVC to the right subcardinal vein;
- renal IVC to subcardinal–supracardinal anastomoses;
- infrarenal IVC to the right supracardinal vein;
- common iliac veins to posterior-cardinal derivatives;
- thoracic azygos / hemiazygos channels to the supracardinal system.

The conventional supracardinal layer is visible only when this model is selected.

### Hikspoors et al. human reconstruction (2015)

The 2015 human reconstruction reports:
- caudal cardinal extensions from the common cardinal region between CS11 and CS15;
- a subcardinal plexus developing in and around the mesonephroi from CS15;
- longitudinal subcardinal channels and intersubcardinal anastomoses beginning at CS16;
- right-sided subcardinal dominance first observed at CS16 and complete at CS18;
- the infrarenal IVC arising from the right caudal cardinal vein;
- the renal part arising from the subcardinal system;
- the azygos system arising from the cranial parts of the caudal cardinal veins.

The authors argue that separate supracardinal / sacrocardinal systems are not needed to explain the reconstructed human caudal venous system. The app therefore hides the conventional supracardinal layer in this model.

The model selector changes the alternative geometry and evidence shown; it does not merge the two interpretations.

## 5. Current stage coverage and explicit boundary

- CS10–CS12: paired umbilical inflow and early cardinal drainage context.
- CS13–CS14: right umbilical-vein regression is represented in broad teaching bins; left umbilical inflow remains separate.
- CS15: caudal cardinal extension and subcardinal mesonephric plexus are shown.
- CS16: longitudinal subcardinal channels and early intersubcardinal anastomosis are shown.

The 2015 human reconstruction continues through CS18–CS23 for the mature infrahepatic IVC and azygos topology. Those later stages are not part of this milestone. The current CS16 scene must not be labelled as a completed renal, infrarenal or adult IVC.

## 6. Browser teaching walkthrough

The in-browser guided sequence now contains 22 steps:
- 14 previous portal / hepatic outflow lessons;
- 2 paired umbilical-vein lessons;
- 6 cardinal-system and competing-model lessons.

The cardinal / IVC interpretation selector offers:
- Human reconstruction · 2015.
- Conventional segmental model.

The 3D scene can still be orbited, selected and isolated while the guided lesson is open.

## 7. Validation

The build-time graph validator is being extended to verify:
- every new path start and end against declared nodes;
- unique cardinal and umbilical layer / path IDs;
- the right umbilical-vein later-stage regression state;
- the left umbilical postnatal fate note;
- caudal-cardinal connection to the common cardinal junction;
- subcardinal plexus continuity with the caudal cardinal and longitudinal subcardinal channels;
- the textbook supracardinal layer remaining hidden in the human 2015 model;
- every selected structure and visible layer referenced by the 22-step teaching guide.

These source checks do not replace browser visual inspection or specialist embryology review.

## 8. Scientific and geometric limitations

- All new vessel coordinates and radii are normalized schematic teaching geometry, not specimen measurements.
- The right umbilical vein is shown as a broad early route; its regression timing is binned for teaching and is not an exact specimen-level date.
- The persistent left umbilical vein is reused from the portal module; it is not duplicated in the new umbilical graph.
- The head / neck drainage territory of the anterior cardinal veins is not reconstructed.
- The mesonephroi and dorsal aorta are positional context meshes, not histological or arterial-development models.
- The subcardinal plexus is represented by simplified centre-lines, not a capillary-level plexus.
- The conventional supracardinal interpretation and the 2015 human caudal-cardinal interpretation are alternatives. Do not display them as simultaneous parts of one developmental sequence.
- The complete IVC, renal collar, azygos / hemiazygos final configuration and CS18–CS23 remodeling are deferred.

## 9. Primary sources

- Collardeau-Frachon S, Scoazec J-Y (2008). *Vascular Development and Differentiation During Human Liver Organogenesis*. The Anatomical Record 291:614–627. DOI: [10.1002/ar.20679](https://doi.org/10.1002/ar.20679).
- Hikspoors J P J M et al. (2017). *The Fate of the Vitelline and Umbilical Veins During the Development of the Human Liver*. Journal of Anatomy 231:718–735. DOI: [10.1111/joa.12671](https://doi.org/10.1111/joa.12671).
- Isotani N et al. (2024). *Regional differences in the umbilical vein and ductus venosus at different stages of normal human development*. The Anatomical Record 307(10):3306–3326. DOI: [10.1002/ar.25421](https://doi.org/10.1002/ar.25421).
- Hikspoors J P J M et al. (2015). *Development of the human infrahepatic inferior caval and azygos venous systems*. Journal of Anatomy 226:113–125. DOI: [10.1111/joa.12266](https://doi.org/10.1111/joa.12266).
- *Imaging of inferior vena cava normal variants, anomalies and pathologies, Part 1: Congenital* (2023). [PMC10788309](https://pmc.ncbi.nlm.nih.gov/articles/PMC10788309/).

## 10. Next milestone

Milestone 8 should extend the timeline through CS18, CS20 and the later stages needed for IVC assembly. It should model the hepatic, suprarenal, renal and infrarenal segments, the renal venous collar / anastomoses and azygos system as separate source-specific alternatives. The human 2015 reconstruction and conventional four-segment model must remain switchable rather than merged.
