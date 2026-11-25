# MASTER PROMPT — VITELLINE VEINS: INTERACTIVE 3D DEVELOPMENT MODULE

## Mission

Act as a coordinated senior team consisting of a human embryologist, developmental vascular anatomist, hepatobiliary anatomist, scientific 3D visualization engineer, 3D technical artist, senior TypeScript/WebGL application engineer, educational UX designer, and rigorous QA/documentation engineer.

Design and build the first module of an **Interactive 3D Embryonic Venous Development Laboratory**. This first module teaches the development of the right and left vitelline (omphalomesenteric) veins from their early paired state through hepatic remodeling, portal venous formation, and the relevant hepatic venous outflow contributions.

The result must be a genuinely navigatable, interactive, step-by-step 3D learning experience. It must not be a static illustration, slideshow, or collection of disconnected diagrams.

Project repository: **frshtagl/models---3D**

Build this module so that future modules for the **umbilical veins** and **cardinal veins** can be added to the same application without rewriting the core architecture. Do not implement those later modules now. Show only enough of their anatomy to explain relationships with the vitelline system.

---

## 1. Non-negotiable scientific accuracy rules

1. Anatomical correctness is more important than visual spectacle.
2. Research and cross-check the developmental sequence before constructing the 3D geometry.
3. Prefer human embryological evidence, peer-reviewed developmental anatomy, and established medical embryology references.
4. Distinguish what is directly established by human embryological observations, the classical simplified teaching model, more detailed or debated interpretations, and any geometry that is schematic because exact specimen-level geometry is unavailable.
5. Do not invent vessel origins, connections, regression events, developmental dates, or adult derivatives.
6. Do not make every textbook convention look identical. Where simplified diagrams and detailed descriptions differ, explain the difference and let the learner switch between a **Classical teaching view** and a **Detailed anatomical view**.
7. Use approximate developmental timing honestly. Prefer Carnegie stages and embryo measurements where available. Clearly state whether an age is post-fertilization embryonic age or obstetric gestational age. Never present an approximate day as an exact universal date.
8. Keep left and right correct from the embryo's own anatomical perspective. The camera must not silently reverse the learner's left and right.
9. Do not confuse vitelline veins with umbilical veins, cardinal veins, vitelline arteries, or the ductus venosus.
10. Do not state that the whole inferior vena cava is derived from the vitelline veins. Explain only the relevant hepatic/hepatocardiac contribution.
11. Do not oversimplify adult portal tributaries by claiming that the splenic, superior mesenteric, and inferior mesenteric veins each arise as simple direct continuations of one named vitelline vein. Explain the vitelline contribution to the portal venous scaffold and distinguish it from remodeling of mesenteric and splenic tributaries.
12. Keep a visible **Evidence and uncertainty** note for details whose interpretation varies between sources.
13. Every educational claim shown in the interface must be traceable to a source entry in project documentation.

### Core scientific references to consult and cite

- Collardeau-Frachon S, Scoazec J-Y. *Vascular Development and Differentiation During Human Liver Organogenesis*. The Anatomical Record. 2008;291:614–627. DOI: https://doi.org/10.1002/ar.20679
- Duke University Embryology, Cardiovascular System Development: https://embryology.oit.duke.edu/embryoModules/cardiovascular/cardiovascular.html
- StatPearls, Anatomy, Abdomen and Pelvis: Inferior Vena Cava: https://www.ncbi.nlm.nih.gov/books/NBK482353/
- StatPearls, Anatomy, Abdomen and Pelvis: Portal Venous System: https://www.ncbi.nlm.nih.gov/books/NBK554589/
- Carneiro C, et al. *All about portal vein: a pictorial display to anatomy, variants and physiopathology*. Insights into Imaging. 2019. https://pmc.ncbi.nlm.nih.gov/articles/PMC6428891/
- UNSW Embryology, Liver Development: https://embryology.med.unsw.edu.au/embryology/index.php/Gastrointestinal_Tract_-_Liver_Development

Add full bibliographic details and access dates to a references file. Do not reproduce copyrighted textbook figures. Create original schematic diagrams and original procedural 3D geometry.

---

## 2. Anatomical learning scope

The learner must understand the vitelline veins as a changing vascular network, not as two tubes that simply disappear or become one adult vein.

### A. Initial paired vitelline veins

Show the right and left vitelline veins as paired vessels returning blood from the yolk sac toward the sinus venosus.

Include:
- yolk sac;
- paired right and left vitelline veins;
- primitive gut / foregut region;
- primitive duodenum;
- septum transversum;
- early hepatic region;
- sinus venosus and its relationship to the primitive heart.

Explain the initial route of blood flow from the yolk sac through the paired vitelline veins to the sinus venosus.

Use **omphalomesenteric veins** as an alternative synonym, not as a separate vessel system.

### B. Interaction with the developing liver

Show the hepatic primordium / hepatic diverticulum developing from the ventral foregut and growing into the septum transversum.

Animate or stage the hepatic cords / trabeculae growing among and around pre-existing venous channels. Demonstrate how the vitelline venous channels are interrupted, redistributed, and remodeled into an intrahepatic sinusoidal plexus.

Teach these distinctions:
- hepatic cords are not veins;
- hepatic sinusoids are vascular channels associated with the growing hepatic cords;
- the original paired vitelline veins do not remain as two intact tubes through the liver;
- the intrahepatic network has afferent and efferent pathways.

Where useful, introduce:
- hepatic sinusoids;
- venae advehentes, channels carrying blood toward the sinusoidal plexus;
- venae revehentes, channels draining blood away from the sinusoidal plexus.

Explain each term in plain language and show its direction of flow.

### C. Intervitelline anastomoses around the duodenum

This is a central teaching objective. Make the anastomoses three-dimensionally obvious.

The classical prehepatic description includes three connections between the right and left vitelline veins:

1. **Superior / subhepatic / cranio-ventral anastomosis** — below the hepatic primordium and ventral to the relevant duodenal segment.
2. **Middle / retroduodenal / dorsal anastomosis** — behind (dorsal to) the duodenum; this is described as the first of the three prehepatic anastomoses to appear.
3. **Inferior / caudal-ventral anastomosis** — ventral to the more caudal part of the duodenum.

A more detailed account also describes a **fourth, subdiaphragmatic anastomosis**, above the hepatic primordium and immediately below the sinus venosus. Show this separately in the detailed view. Do not confuse it with the three prehepatic connections conventionally used to teach portal-vein formation.

Requirements:
- Show the duodenum as a solid, recognizable 3D landmark.
- Let the learner rotate the model to see which connection is anterior/ventral and which is posterior/dorsal.
- Provide anterior, posterior, right lateral, left lateral, superior, and inferior camera presets.
- Use an optional transparent duodenum and liver mode.
- Label every anastomosis with both its descriptive name and its position.
- Provide a toggle between the classical three-anastomosis diagram and the detailed view including the subdiaphragmatic connection.
- Explain that the anastomoses form a network around the duodenum; they are not all located in one flat plane.

### D. Selective regression and remodeling

Make regression visible as an actual developmental event.

Do not merely hide the entire left vitelline vein or shrink all early vessels simultaneously. Show the relevant segments separately and explain why the surviving channels establish the definitive asymmetric arrangement.

The classical portal-vein remodeling scheme includes regression of:
- the caudal part of the right vitelline vein;
- the cranial part of the left vitelline vein; and
- the caudal-ventral intervitelline anastomosis.

The dorsal / middle retroduodenal connection and the relevant cranial-ventral / subhepatic connection persist and participate in the definitive portal arrangement. The detailed model must use the more specific segmental account below rather than relying only on a simplified three-line diagram.

For the detailed portal-vein account, teach the usual described components of the main portal-vein trunk from caudal to cranial:
1. a segment of the left vitelline vein extending from the mesenteric venous termination to the middle intervitelline anastomosis;
2. the middle (retroduodenal / dorsal) intervitelline anastomosis; and
3. a segment of the right vitelline vein between the middle and subhepatic anastomoses.

Show the other primitive segments regressing in the appropriate sequence. Explain that the subhepatic anastomosis is remodeled into the portal sinus (also called the sinus intermedius in the cited literature), connecting the portal and umbilical circulations during fetal life.

Make the developing portal vein's characteristic curved / S-shaped relationship to the duodenum understandable from the surviving segments.

Where sources use different simplified labels for the cranial-ventral connection or portal branches, document the naming convention and avoid silently mixing the schemes.

### E. Hepatic sinusoids and hepatic venous outflow

Do not focus only on the portal vein. The learner must understand the other major fate of the intrahepatic vitelline network.

Show:
- the sinusoidal plexus within the developing liver;
- afferent channels entering the sinusoidal network;
- efferent channels draining it;
- the subdiaphragmatic connection and its relationship to the sinus venosus;
- remodeling of the right and left hepatic outflow channels.

Include an advanced optional layer explaining the described remodeling of the primary hepatic veins: the right-sided channel becomes dominant, the left primary hepatic outflow regresses, and additional channels remodel to form the definitive hepatic venous drainage. Clearly distinguish this detailed hepatic outflow process from the portal-vein-forming process.

Explain the right vitelline / hepatocardiac channel contribution to the **hepatic segment of the inferior vena cava**. Show the connection anatomically and label the contribution precisely. Do not color or label the entire IVC as vitelline-derived; other IVC segments have different embryonic origins and belong to later cardinal-system teaching.

### F. Relationship to the umbilical venous system

The first module is about vitelline veins, so do not implement the complete umbilical-vein developmental module yet.

However, the fetal liver circulation cannot be explained accurately without showing the relevant relationship. Include a subdued, clearly marked **context-only** left umbilical vein and ductus venosus when needed to explain:
- the portal sinus connection;
- the fetal liver's umbilical inflow; and
- the ductus venosus bypass toward the IVC.

Mark these structures as **outside the current module**. Never describe the ductus venosus as a vitelline-vein derivative. The later umbilical-vein module must replace these placeholders with the full developmental model.

### G. Final anatomy and adult derivatives

End with a clean, navigatable adult-oriented view that highlights the structures to which the vitelline network contributes:
- hepatic sinusoids / intrahepatic sinusoidal channels;
- the portal venous trunk and its intrahepatic branches;
- the relevant hepatic venous outflow channels;
- the hepatic / hepatocardiac contribution to the IVC.

Show embryonic precursor segments beside the final structures through a lineage mode. A learner must be able to click an adult structure and trace backward to its embryonic components, and click an embryonic segment to see its fate.

Explicitly distinguish:
- persistent vessel segments;
- remodeled anastomoses;
- sinusoidal plexus formation;
- regressed segments; and
- neighboring structures that are present only for context.

Do not imply that the adult portal vein is simply the unchanged right vitelline vein.

---

## 3. Developmental timeline and stage navigation

Build a timeline with independently selectable developmental stages. Treat the sequence as overlapping biological remodeling, not as a perfectly synchronized mechanical animation.

Use these as initial stage anchors, subject to source verification:

- **Stage 0 — Early paired system:** approximately late third / early fourth week; paired vitelline veins connect yolk-sac drainage to the sinus venosus.
- **Stage 1 — Hepatic primordium appears:** fourth week; hepatic diverticulum and hepatic cords begin interacting with the vitelline and umbilical venous systems.
- **Stage 2 — Symmetrical hepatic vascular stage:** late fourth week; paired vitelline channels and intervitelline communications are visible; hepatic growth disrupts intrahepatic portions into a sinusoidal plexus.
- **Stage 3 — Anastomotic network:** show the three classical prehepatic connections and the additional subdiaphragmatic connection in detailed mode.
- **Stage 4 — Asymmetric remodeling:** fifth to sixth week; selective regression and persistence establish portal and hepatic outflow pathways.
- **Stage 5 — Fetal hepatic venous pattern:** show the portal vein, portal sinus, hepatic sinusoids, hepatic outflow, and context-only umbilical / ductus venosus relationships.
- **Stage 6 — Adult-oriented derivative view:** isolate the portal system, hepatic sinusoids, hepatic veins, and hepatic IVC contribution.

For every stage display:
- stage name;
- approximate age / Carnegie stage when reliably supported;
- what has newly appeared;
- what has enlarged;
- what has regressed;
- what persists;
- blood-flow direction;
- key learning point;
- source citation.

Provide Play, Pause, Previous, Next, speed control, and a draggable timeline. A learner must be able to pause at any moment and inspect the current anatomy.

---

## 4. 3D model and visual design requirements

### Scene composition

Build a coherent 3D scene containing:
- a restrained embryo / trunk orientation reference;
- yolk sac;
- primitive gut and duodenum;
- liver primordium and later developing liver;
- septum transversum;
- sinus venosus / primitive cardiac inflow;
- right and left vitelline veins;
- intervitelline anastomoses;
- intrahepatic sinusoidal plexus;
- portal-vein components;
- hepatic outflow and the relevant IVC segment;
- context-only umbilical vein and ductus venosus where required.

The model may be schematic, but it must be anatomically coherent. Label it as **schematic, not to scale** where dimensions are not based on measured specimens.

### Geometry

- Build vessels as separate, editable 3D objects with stable identifiers and metadata.
- Use smooth centerlines and swept tube geometry with controlled radii and tapered ends.
- Use real spatial separation for ventral and dorsal anastomoses; never fake the distinction with labels alone.
- Give the duodenum, liver, and septum transversum enough volume to establish meaningful spatial relationships.
- Keep original procedural geometry or editable source data in the repository. A GLB export alone is not sufficient as the only source of truth.
- Export useful GLB snapshots for reuse and inspection.
- Avoid unnecessarily heavy meshes, excessive polygons, decorative particles, and photorealistic clutter.
- Preserve correct topology at vessel junctions. Avoid visible gaps, floating ends, accidental intersections, and disconnected segments.
- Use smooth transitions where vessels join, while keeping each embryological segment separately selectable.

### Visual language

Use a consistent, accessible palette that identifies developmental lineage and fate, not blood oxygenation. For example:
- right vitelline lineage: deep blue;
- left vitelline lineage: cyan;
- intervitelline anastomoses: amber;
- hepatic sinusoidal plexus: violet / teal;
- persistent definitive portal components: green;
- regressing segments: muted red with dashed or fading treatment;
- context-only umbilical structures: pale neutral grey.

The exact palette may be refined, but maintain it across all stages and provide a permanent legend. Do not rely on color alone: use labels, line styles, opacity, and selection outlines as redundant cues. Ensure adequate contrast and color-vision accessibility.

---

## 5. Navigation and interaction

The application must support:

1. Smooth orbit rotation, pan, and zoom.
2. Preset anatomical views: anterior, posterior, superior, inferior, right lateral, left lateral, and oblique.
3. Click-to-select every named vessel and major anatomical landmark.
4. Hover highlighting and a clear selected-state outline.
5. A details panel containing name, side, developmental stage, connections, origin, fate, regression status, adult contribution, blood-flow role, and references.
6. Independent show / hide controls for each anatomical layer.
7. Isolation mode: select one vessel or one lineage and fade the rest.
8. Left-only, right-only, and bilateral comparison modes.
9. Transparent / X-ray mode for liver and duodenum.
10. Optional clipping / cutaway planes so learners can inspect deep structures.
11. Blood-flow arrows or restrained moving particles that follow actual vessel paths.
12. A regression mode that highlights disappearing segments in sequence.
13. A lineage mode that traces an adult structure back to its embryonic precursors.
14. A comparison mode for two developmental stages.
15. Reset camera and reset model controls.

All controls must work. Do not include decorative buttons that have no implemented action.

### Interface layout

Use a clean scientific workstation layout:
- **Top:** module title, stage indicator, and main navigation.
- **Left panel:** structure tree, layer toggles, and lineage filters.
- **Center:** large interactive 3D viewport.
- **Right panel:** selected-structure explanation, developmental fate, and source references.
- **Bottom:** stage timeline, playback controls, and concise narration / key point.

Make it responsive for desktop and tablet. On narrow screens, panels should collapse into accessible drawers without covering the 3D controls.

---

## 6. Teaching and assessment features

Create three modes:

### Learn mode
Guided, step-by-step progression with concise explanations, highlighted structures, and one key takeaway per stage.

### Explore mode
Free camera navigation, structure selection, layer isolation, comparison, and lineage tracing.

### Test mode
Interactive questions requiring the learner to:
- identify right and left vitelline veins;
- locate the dorsal and ventral anastomoses;
- distinguish the three classical prehepatic anastomoses from the fourth subdiaphragmatic connection;
- predict which segments regress;
- reconstruct the portal-vein trunk from its embryonic components;
- identify the sinusoidal afferent and efferent pathways;
- identify the right hepatocardiac contribution to the hepatic IVC;
- distinguish vitelline derivatives from context-only umbilical structures.

Include label-hide / label-reveal practice. Give explanatory feedback for wrong answers rather than merely marking them incorrect.

Add a compact high-yield summary and a glossary. Keep the main viewport uncluttered.

---

## 7. Technical architecture

Choose a stable, maintainable browser stack. Recommended starting point:
- React + TypeScript + Vite;
- Three.js, preferably React Three Fiber if it simplifies integration with the React UI;
- Drei or equivalent utilities only where they provide a real benefit;
- GLB / glTF for portable 3D exports;
- data-driven developmental stages and vessel metadata;
- automated lint, type-check, unit-test, and production-build checks.

Use VTK.js only if a later requirement genuinely needs volumetric medical-image rendering or VTK data workflows. Do not add VTK merely for its name if ordinary mesh-based embryological visualization is better served by Three.js.

Separate the code into clear modules, for example:
- application shell and navigation;
- 3D scene and camera controls;
- anatomy landmarks;
- vessel geometry factory;
- vessel / lineage data;
- developmental stage definitions;
- timeline and animation engine;
- selection and information panels;
- learning and quiz engine;
- source / citation registry;
- tests and visual regression fixtures.

Use a reusable data model for future venous modules. Each vessel segment should have a stable ID, display name, side, lineage, geometry definition, stage visibility, connections, developmental fate, source references, and explanatory text. Keep developmental facts in data files rather than scattering them through UI components.

Do not couple the vitelline module to assumptions that would prevent umbilical and cardinal modules from sharing the same viewer, stage engine, selection panel, timeline, and lineage system.

---

## 8. Development workflow — implement in controlled steps

Do not attempt the entire application in one enormous code dump. Work in small, verifiable milestones.

### Milestone 0 — Repository and scientific specification
- Inspect the current repository before changing anything.
- Record the current branch, files, and commit history.
- Write an anatomical specification and a segment-by-segment fate table.
- Record unresolved source differences and assumptions.
- Propose the architecture and folder structure before implementation.

### Milestone 1 — Working 3D foundation
- Create the application shell and 3D viewport.
- Add camera orbit, pan, zoom, reset, and anatomical view presets.
- Add embryo orientation axes and a simple primitive gut / duodenum / liver reference.
- Verify that the scene works in the browser before adding complex vessels.

### Milestone 2 — Initial paired vitelline veins
- Add the yolk sac, sinus venosus, and paired vitelline veins.
- Add labels, selection, details panel, and blood-flow direction.
- Save the first inspectable GLB snapshot.

### Milestone 3 — Hepatic interaction and sinusoidal plexus
- Add the liver primordium, hepatic cords as a distinct non-vascular structure, and the sinusoidal plexus.
- Animate the transition from paired channels to a distributed intrahepatic network.
- Add afferent and efferent pathway explanations.

### Milestone 4 — Intervitelline anastomoses
- Add the three classical prehepatic connections in their correct 3D positions.
- Add the fourth subdiaphragmatic connection in detailed mode.
- Verify dorsal / ventral relationships by rotating the camera and using section views.

### Milestone 5 — Regression and portal-vein formation
- Implement selective segment regression in the correct order.
- Construct the portal-vein pathway from its actual precursor segments.
- Validate vessel continuity and the spatial relationship to the duodenum.
- Add classical-versus-detailed teaching views.

### Milestone 6 — Hepatic outflow and fetal context
- Add sinusoidal efferent channels and the relevant right hepatocardiac / hepatic IVC contribution.
- Add subdued context-only umbilical vein and ductus venosus structures.
- Clearly label which structures belong to later modules.

### Milestone 7 — Learning tools and polish
- Add Learn, Explore, and Test modes.
- Add lineage tracing, stage comparison, glossary, and high-yield summary.
- Refine labels, transitions, accessibility, and responsive layout.

### Milestone 8 — Verification and release
- Run all automated checks.
- Open and inspect the actual application at every stage.
- Test every interactive control.
- Verify all anatomical connections and regression events.
- Fix errors before marking the milestone complete.
- Export final GLB snapshots and document how to run the project.
- Produce a concise release report listing what works, what was tested, what remains incomplete, and the next recommended step.

At the end of every milestone, report:
- files created or changed;
- what is now functional;
- tests and build commands run, with actual outcomes;
- screenshots or visual evidence where available;
- known limitations;
- commit SHA and GitHub link.

Never claim that a feature works merely because code was written. Run it and verify it.

---

## 9. GitHub version control and project hygiene

All durable project work belongs in **frshtagl/models---3D**.

- Inspect the repository before every implementation session.
- Preserve existing user work. Never force-push, delete unrelated files, or rewrite history.
- Use a dedicated feature branch for implementation, such as **feature/vitelline-veins-3d**.
- Make small, descriptive, atomic commits after verified milestones.
- Use clear commit messages, for example:
  - docs: add vitelline veins anatomical specification
  - feat: add interactive embryonic scene foundation
  - feat: model paired vitelline veins
  - feat: add intervitelline anastomoses
  - feat: animate vitelline regression and portal formation
  - test: validate vitelline vessel topology
- Keep the README, architecture notes, anatomy references, changelog, and run instructions current.
- Add GitHub Actions for linting, type checking, tests, and production build.
- Do not commit dependency folders, local caches, secrets, temporary exports, or unnecessary build output.
- Use Git LFS only if large binary assets genuinely require it; prefer editable procedural geometry and compact GLB exports.
- Do not upload copyrighted textbook scans or unlicensed reference models.
- Keep the current module isolated so later umbilical and cardinal modules can be added without damaging it.
- Tag a version only after the stated acceptance criteria pass. Do not label an untested build as stable.

---

## 10. Acceptance criteria

The first vitelline-vein module is not complete until all of the following are true:

- The learner can navigate a coherent 3D model from multiple anatomical directions.
- The right and left vitelline veins are separately selectable and correctly oriented.
- The yolk sac-to-sinus-venosus route is clear.
- The developing liver and sinusoidal network are represented as distinct anatomical components.
- All three classical prehepatic anastomoses are correctly located around the duodenum.
- The additional subdiaphragmatic anastomosis can be inspected in detailed mode.
- Ventral and dorsal connections are genuinely separated in 3D.
- Regression is demonstrated segment by segment.
- The final portal-vein pathway can be traced back to the correct embryonic segments.
- The hepatic sinusoidal and efferent pathways are understandable.
- The right hepatocardiac contribution to the hepatic IVC is accurately identified without misrepresenting the rest of the IVC.
- Context-only umbilical structures are clearly distinguished from vitelline derivatives.
- Every label, stage control, selection action, visibility toggle, and playback control works.
- The application builds successfully and automated checks pass.
- The repository contains editable source geometry, documentation, references, tests, and version history.

---

## 11. First response expected from the coding agent

Before writing implementation code, return:

1. A concise scientific overview of vitelline-vein development.
2. A stage-by-stage fate table for every named segment and anastomosis.
3. A diagram description showing the spatial relationships around the duodenum.
4. A list of facts that differ between classical simplified diagrams and the detailed hepatic vascular account.
5. The proposed repository structure and technical architecture.
6. A milestone plan with explicit acceptance tests.

Then begin **Milestone 0**. Do not skip directly to a polished final model. Build, inspect, test, and commit the system incrementally.

**Quality standard:** the finished experience should feel like a professional medical-school embryology visualization workstation: anatomically disciplined, visually clear, genuinely interactive, easy to navigate, carefully sourced, and maintainable for years of further development.
