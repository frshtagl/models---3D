# Milestone 8 — 3D geometry refinement

## Goal
Replace the blockout-like vessel appearance with smoother, more legible teaching geometry without altering authored anatomical centre-lines or silently changing source-specific venous topology.

## Implemented
- Centripetal Catmull–Rom interpolation for vessel and organ guide curves, reducing overshoot at unevenly spaced control points.
- Custom Frenet-frame tube surfaces with a smooth longitudinal radius profile, denser circular cross-sections and consistent vertex normals.
- Optuna TPE search over spline parameterisation and tessellation density, evaluated against the checked-in centre-line sets for deviation, curvature energy, overshoot and render cost.
- Lower-profile flow arrows positioned along the vessel rather than at the terminal junction.
- A low-opacity C-shaped embryonic body envelope for spatial orientation.
- A more volumetric hepatic primordium, refined venous pole with bilateral horns, softer yolk-sac / placental context and less intrusive scene lighting / grid.

## Anatomical safeguards
- Optuna does not move, reorder or invent anatomical control points.
- The body envelope is explicitly a teaching silhouette, not a specimen-derived surface.
- The liver, mesonephros, placenta and sinus venosus remain schematic context structures.
- Aesthetic smoothing must not be used to merge the classical and human reconstruction models or infer missing CS18–CS23 anatomy.

## Verification
Optuna TPE completed 80 deterministic-seed trials over 86 authored centre-lines. Best settings: centripetal interpolation, 20 samples per unit, 32 radial segments and 16 subdivisions per control-point interval for the objective evaluation. The selected settings are applied in the renderer; anatomical control points are unchanged. GitHub Actions TypeScript validation, graph validation and Vite production build passed. Browser pixel inspection is separate and is not claimed by the automated build.
