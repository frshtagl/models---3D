import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [scene, app] = await Promise.all([
  readFile('src/components/EmbryoScene.tsx', 'utf8'),
  readFile('src/App.tsx', 'utf8')
]);

assert.match(scene, /STAGE_TRANSITION_DURATION_MS\s*=\s*720/);
assert.match(scene, /function updateFadeTransitions/);
assert.match(scene, /function beginFadeIn/);
assert.match(scene, /stageChangePendingRef/);
assert.match(scene, /function startCameraTween/);
assert.match(scene, /userData\.flowCurve\s*=\s*curve/);
assert.match(scene, /curve\.getPointAt\(progress\)/);
assert.match(scene, /userData\.targetScale\s*=\s*stage\.liverScale/);
assert.match(scene, /Math\.exp\(-6 \* delta\)/);
assert.match(app, /},\s*3200\);/);

const authoredGeometryFiles = [
  'src/data/vitellineNetwork.ts',
  'src/data/hepaticVascularNetwork.ts',
  'src/data/intervitellineNetwork.ts',
  'src/data/portalNetwork.ts',
  'src/data/hepaticOutflowNetwork.ts',
  'src/data/umbilicalNetwork.ts',
  'src/data/cardinalNetwork.ts'
];
for (const path of authoredGeometryFiles) {
  const content = await readFile(path, 'utf8');
  assert.ok(content.length > 1000, 'Authored anatomy geometry must remain present: ' + path);
}

console.log('Animation checks passed: stage crossfades, flow markers, camera easing, organ interpolation and authored anatomy preservation.');
