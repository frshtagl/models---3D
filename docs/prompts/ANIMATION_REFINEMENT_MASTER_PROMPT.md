# Master Prompt — Core Embryology Anatomy Geometry & Animation Upgrade

## Mission
Upgrade the actual anatomical 3D diagrams and developmental animations in `frshtagl/models---3D`. Work only on `upgrade/animation-refinement`, based on `feature/vitelline-veins-3d`.

**Priority is the core 3D model, not the React wrapper.** Do not spend implementation time on cards, sidebars, CSS, decorative UI, labels, or wrapper components. Improve actual vessel meshes, organ surfaces, branch junctions, depth relationships, and developmental motion.

## Scientific invariants
1. Preserve authored anatomical centre-lines, node positions, vessel origins, endpoints, topology, stage states, evidence profiles, and anatomical labels unless a source-backed scientific correction is separately approved.
2. Keep the classical 2008 vestigial / anastomotic model separate from the 2017 human reconstruction / lineage model. Never blend incompatible graphs into a fictitious hybrid.
3. Preserve canonical axes: +X embryonic right, +Y cranial, +Z dorsal. Do not mirror left and right.
4. Keep dorsal / retroduodenal paths posterior to the duodenum (+Z) and ventral paths anterior to it (-Z).
5. Treat normalized dimensions and organ growth as schematic, not specimen measurements.
6. Keep hepatic tissue, sinusoidal plexus, afferent vessels, efferent vessels and named venous conduits distinct.
7. Flow markers communicate direction only. Never imply measured blood velocity, pressure or pulsatility.
8. Never call a visual result verified without browser inspection and saved evidence.

## Core model work order

### 1. Vessel surfaces — highest priority
- Improve the actual tube mesh generator: stable Frenet frames, smooth radius profiles, clean rounded endpoints, bounded adaptive tessellation, consistent normals and non-self-intersecting surfaces.
- Replace crude overlapping endpoint caps with a visually continuous but editable representation.
- Blend only genuine shared graph junctions using existing node IDs and endpoints. Do not invent branch points or move centre-lines.
- Keep major conduits visibly distinct from small sinusoidal channels. Do not make every vessel the same thickness.
- Preserve material clarity and anatomical colour coding; avoid excessive glow, metallic shine or game-like effects.
- Keep source paths editable in the TypeScript network files.

### 2. Hepatic sinusoidal and portal diagrams
- Improve the actual reticular appearance of the hepatic sinusoidal plexus using its existing authored paths and shared nodes.
- Smooth the mesh at true branch junctions; avoid a bead-like chain or a regular wireframe-grid appearance.
- Keep the plexus visually finer than afferent / efferent conduits.
- Preserve the distinct classical venae advehentes / revehentes and human reconstruction sinusoidal-entry / retrograde drainage explanations.
- Make portal branches and the portal sinus visually traceable without merging the two evidence profiles.

### 3. Organ geometry and depth
- Refine the embryonic liver primordium silhouette, hilum, inferior contour and surface normals. Do not make it look like a generic perfect sphere or an adult liver transplanted into an embryo.
- Model the duodenum as a recognizable curved organ with an inspectable lumen and distinct ventral / dorsal depth.
- Refine the dorsal pancreatic bud as an embryonic bud, not a mature pancreas.
- Refine the sinus venosus / venous pole chamber and gallbladder landmark without inventing unreferenced structures.
- Maintain clear anterior/posterior separation so learners can identify which vessels pass behind or in front of the duodenum.

### 4. Developmental animation — animate the anatomy
- Crossfade stage-specific vessel configurations rather than morphing incompatible topologies into hybrid vessels.
- Interpolate only already-authored stage scale parameters for the liver and duodenum; do not invent quantitative growth.
- Animate directional markers only on paths explicitly marked for flow direction in source data.
- Use smooth camera interpolation that respects the current orbit and anatomical up vectors.
- Keep stage changes interruptible and dispose of obsolete geometry / materials.
- Avoid rebuilding high-poly anatomy when the learner only selects a structure or toggles visibility.
- Update registered animated objects directly; do not traverse the entire scene every frame.
- Keep manual stage navigation and pause responsive.

### 5. Performance and geometry quality
- Use adaptive longitudinal tessellation and a bounded radial segment count.
- Reuse vectors and quaternions in animation loops; avoid per-frame allocations.
- Preserve geometry while only visibility / selection state changes.
- Dispose transient meshes and materials exactly once.
- Respect reduced-motion preferences if a global motion option is introduced.
- Prefer measurable geometry and rendering improvements over arbitrary polygon inflation.

## Required implementation sequence
1. Inspect the core scene renderer, all source network files, stage maps, coordinate specification and current master prompt.
2. Keep all work on the isolated upgrade branch; do not modify the base branch.
3. Improve vessel mesh quality and shared-node continuity first.
4. Refine the liver, duodenum lumen, pancreatic bud, venous pole and gallbladder landmark.
5. Improve the developmental animation loop and remove unnecessary geometry rebuilds.
6. Add automated checks for mesh quality, anatomy preservation, topology separation and animation wiring.
7. Run TypeScript, graph validation, animation validation, Optuna geometry analysis and the production build.
8. Inspect all six Carnegie stages, both vitelline evidence profiles, both cardinal models, all six camera directions, and opaque / transparent / hidden organ states.
9. Capture real browser screenshots for anterior, posterior, right, left, superior, inferior and oblique views. Compare dorsal / ventral depth explicitly.
10. Commit focused changes and update the draft pull request. Never merge automatically.

## Acceptance criteria
- Improvement is visible in the actual anatomical 3D scene, not merely the application wrapper.
- Major vessels have smooth, consistent surfaces and clean shared junctions.
- The hepatic sinusoidal plexus reads as a fine reticular network.
- The duodenum has a visible lumen; dorsal and ventral paths remain spatially distinct.
- The liver and embryonic landmarks have more convincing, stage-appropriate forms.
- No unsupported anatomy or new centre-line coordinates have been introduced.
- Selecting structures and toggling visibility do not regenerate all vascular geometry.
- Stage transitions, flow markers and camera motion remain smooth and responsive.
- TypeScript, anatomy graph, animation, geometry and production-build checks pass.
- Browser visual QA is explicitly pending until it is actually completed.
