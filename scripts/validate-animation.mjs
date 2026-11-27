import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [engine, scene, app, stages, network, hepatic, pkg] = await Promise.all([
  readFile('src/animation/AnimationEngine.ts', 'utf8'),
  readFile('src/components/EmbryoScene.tsx', 'utf8'),
  readFile('src/App.tsx', 'utf8'),
  readFile('src/data/stages.ts', 'utf8'),
  readFile('src/data/vitellineNetwork.ts', 'utf8'),
  readFile('src/data/hepaticVascularNetwork.ts', 'utf8'),
  readFile('package.json', 'utf8')
]);

assert.match(engine, /export class AnimationEngine/);
assert.match(engine, /setReducedMotion/);
assert.match(engine, /prefersReducedMotion/);
assert.match(engine, /export function crossFadeGroup/);
assert.match(engine, /export function disposeObjectTree/);
assert.match(engine, /export function tweenVector3/);
assert.match(scene, /animator\.update\(deltaSeconds\)/);
assert.match(scene, /crossFadeGroup\(group, next, api\.animator/);
assert.match(scene, /stage-visibility:/);
assert.match(scene, /organ-scale:/);
assert.match(scene, /camera:preset/);
assert.match(scene, /flowCurve/);
assert.match(scene, /curve\.getPointAt\(progress, position\)/);
assert.match(scene, /controls\.addEventListener\('start'/);
assert.doesNotMatch(scene, /clearGroup\(group\)/);
assert.doesNotMatch(scene, /group\.visible = \(visibleLayers/);
assert.match(app, /ANIMATION_TIMINGS\.autoplayHoldMs/);
assert.match(app, /window\.setTimeout/);
assert.doesNotMatch(app, /window\.setInterval/);
assert.match(stages, /liverScale: 0\.48/);
assert.match(stages, /duodenumScale: 1\.04/);
assert.match(network, /getVesselPresentation/);
assert.match(hepatic, /getHepaticLayerPresentation/);
assert.match(pkg, /validate:animation/);

console.log('Developmental animation checks passed: interruptible stage crossfades, authored organ-scale interpolation, camera easing, direction-only flow markers, reduced-motion support, and geometry disposal.');
