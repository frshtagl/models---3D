# Developmental Animation Engine

## Purpose

The viewer uses an interruptible animation engine for developmental stage changes, landmark visibility, organ-scale transitions, camera presets, and explicitly annotated flow-direction markers. It animates the existing anatomical model; it does not create new embryological events or infer missing vessel paths.

## Transition model

- Stage-specific vessel configurations are cross-faded as separate scene groups.
- Incompatible vascular topologies are never interpolated into a synthetic hybrid.
- A new stage can interrupt an in-progress transition. Currently visible layers fade out while the new configuration fades in.
- Replaced geometry and materials are disposed after the outgoing layer finishes fading.
- Selecting a structure or changing layer visibility does not regenerate its vascular geometry.

## Continuous motion

- Liver and duodenum transitions interpolate only the authored `liverScale` and `duodenumScale` values in `src/data/stages.ts`.
- Camera presets use eased position, target, and anatomical-up interpolation. Direct user orbit input interrupts the camera tween.
- Direction markers move only on paths whose source data explicitly sets `flowArrow`.
- Marker movement is a visual direction cue, not measured blood velocity, pressure, pulsatility, or a hemodynamic simulation.

## Accessibility and performance

- The engine respects `prefers-reduced-motion`. When enabled, active tweens finish immediately and continuous marker movement stops.
- Frame delta is clamped to avoid large jumps after a background-tab pause.
- Animation tracks are keyed and interruptible; repeated stage changes do not leave stale callbacks running.
- The render loop updates registered flow markers directly and does not traverse the entire scene every frame.
- Selection and visibility changes operate on existing objects.
- Geometry is disposed after its outgoing transition; scene teardown disposes remaining resources.

## Scientific invariants

- Canonical axes remain +X embryonic right, +Y cranial, +Z dorsal.
- Source network centre-lines, node positions, stage-state maps, and evidence profiles are unchanged.
- The classical 2008 model and human 2017 reconstruction remain separate.
- Portal sinus and venous duct remain separate routes.
- Vessel paths and organ growth remain schematic where source measurements are unavailable.

## Verification

```bash
npm run typecheck
npm run validate:graph
npm run validate:animation
npm run build
```

Automated checks verify animation wiring and repository invariants. They do not replace browser review of all stages, evidence profiles, camera views, and visibility combinations.
