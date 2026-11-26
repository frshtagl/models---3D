import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [scene, app, config] = await Promise.all([
  readFile('src/components/EmbryoScene.tsx', 'utf8'),
  readFile('src/App.tsx', 'utf8'),
  readFile('src/data/geometryTuning.ts', 'utf8')
]);

// Developmental animation and camera.
assert.match(scene, /STAGE_TRANSITION_DURATION_MS\s*=\s*720/);
assert.match(scene, /function updateFadeTransitions/);
assert.match(scene, /function beginFadeIn/);
assert.match(scene, /stageChangePendingRef/);
assert.match(scene, /function startCameraTween/);
assert.match(scene, /camera\.quaternion\.copy\(tween\.fromQuaternion\)\.slerp/);
assert.match(scene, /curve\.getPointAt\(progress, api\.flowPosition\)/);
assert.match(scene, /api\.flowMarkers\.forEach/);
assert.match(scene, /api\.flowMarkers\.add\(arrow\)/);
assert.match(scene, /userData\.targetScale\s*=\s*stage\.liverScale/);
assert.match(scene, /Math\.exp\(-6 \* delta\)/);
assert.match(app, /},\s*3200\);/);

// Core anatomical geometry: actual 3D surfaces, a lumen-bearing duodenum and shared-node junctions.
assert.match(scene, /SphereGeometry\(1, 128, 88\)/);
assert.match(scene, /function makeHollowOrganTube/);
assert.match(scene, /TubeGeometry\(curve, tubularSegments, innerRadius, radialSegments, false\)/);
assert.match(scene, /side: THREE\.BackSide/);
assert.match(scene, /function addVascularJunctions/);
assert.match(scene, /junction\.degree < 3/);
assert.equal((scene.match(/addVascularJunctions\(group, layer\.paths/g) || []).length, 5);
assert.match(scene, /function makeDorsalPancreaticBud/);
assert.match(scene, /function makePortalGallbladder/);

// Selection and visibility must not regenerate high-poly vascular meshes.
assert.doesNotMatch(scene, /\}, \[stage, profile, visibleLayers, selectedStructure\]\);/);
assert.doesNotMatch(scene, /scene\.traverse\(\(object\) => \{\s*const mesh = object as THREE\.Mesh;\s*const curve = mesh\.userData\.flowCurve/);
assert.match(scene, /\}, \[stage\.id, profile\]\);/);
assert.match(scene, /group\.visible = presentation\.visible/);
assert.match(config, /samplesPerUnit: 24/);
assert.match(config, /endpointRadiusScale: 0\.9/);
assert.match(config, /radialSegments: 32/);

// Authored anatomical graph files remain present and editable.
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

console.log('Core anatomy checks passed: sculpted organs, hollow duodenum, branch junctions, vessel tessellation, registered animation, and non-rebuilding visibility / selection.');
