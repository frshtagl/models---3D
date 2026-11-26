# Master Prompt — Embryology 3D Animation Refinement

## Mission
Improve the existing React + TypeScript + Three.js embryonic venous-development workstation. Work only on the isolated animation-upgrade branch. Preserve the scientific source models and all authored anatomical centre-lines.

## Primary quality target
Turn abrupt stage changes into a clear, cinematic, medically legible developmental sequence. The result should feel like a premium interactive anatomy atlas, not a game effect or decorative motion demo.

## Non-negotiable scientific constraints
1. Do not alter vessel origins, endpoints, topology, regression states, source-specific profiles, stage timing, anatomical labels, or authored control points as part of visual polish.
2. Never interpolate between incompatible classical and human-reconstruction vessel graphs. A transition may crossfade one source-specific state into another, but must not create a fictitious hybrid vessel.
3. Treat stage-to-stage scaling as schematic presentation, not a measured growth rate.
4. Flow markers communicate direction only. Do not imply measured blood velocity, pulsatility, pressure, or physiologic flow rates.
5. Keep the anatomical coordinate system and left/right orientation unchanged.
6. Maintain explicit distinctions between persistent channels, remodeled anastomoses, sinusoidal plexus, regressed segments, and context-only anatomy.
7. Never claim browser visual verification unless a real browser inspection has been completed.

## Animation work order
1. Developmental transitions: crossfade outgoing and incoming stage-specific vessel groups over a short, interruptible interval. Dispose of retired geometries and materials after the fade. Manual layer visibility and selection changes should remain immediate; do not animate every UI rerender.
2. Flow direction: move restrained directional markers along only those authored paths already designated for flow arrows. Follow the existing path tangent. Keep movement subtle, deterministic and independent of the selected evidence profile.
3. Camera motion: ease camera presets and zoom changes from the current orbit position. Preserve anatomical up-vectors for superior and inferior views and do not snap the learner out of an orbit unexpectedly.
4. Organ development: smoothly interpolate existing stage scale parameters for the liver and duodenum. Do not add new dimensions or infer quantitative growth.
5. Performance: cap frame delta, keep geometry tessellation bounded, avoid per-frame allocations where practical, and dispose all transient objects and materials.
6. Accessibility: keep manual stage navigation and pause responsive. Respect reduced-motion preferences if a broader animation setting is introduced.

## Implementation sequence
- Inspect the current scene lifecycle and every group-rebuild effect before editing.
- Create an isolated branch from feature/vitelline-veins-3d.
- Implement one animation subsystem at a time: crossfades, flow markers, camera easing, organ interpolation.
- Add automated checks for animation wiring and confirm authored anatomy data remains present and untouched.
- Run TypeScript checks, graph validation, animation checks, and the production build.
- Review the rendered browser scene at all six Carnegie stages, both evidence profiles, all six camera presets, and narrow/mobile viewports before calling the work visually complete.
- Commit in small, reviewable steps and open a pull request against feature/vitelline-veins-3d. Never merge automatically.

## Acceptance criteria
- Stage changes have no hard geometry pop; old geometry fades out while the new stage appears.
- Flow arrows travel along their own source path and remain tangent-aligned.
- Camera presets and zoom are eased, including superior/inferior orientation.
- Liver and duodenum scale changes are interpolated.
- Pausing autoplay and manual stage selection remain immediate.
- No anatomical network source file is modified by animation-only work.
- TypeScript, graph, animation and production-build checks pass.
- The PR explicitly states that browser pixel review is still pending if it has not been performed.
