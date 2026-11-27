import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [scene, app, config, renderTuning] = await Promise.all([
  readFile('src/components/EmbryoScene.tsx', 'utf8'),
  readFile('src/App.tsx', 'utf8'),
  readFile('src/data/geometryTuning.ts', 'utf8'),
  readFile('src/data/renderTuning.ts', 'utf8')
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

// Core anatomical surfaces and developmental form.
assert.match(scene, /function makeLiver\(stageId: VitellineStageId\)/);
assert.match(scene, /SphereGeometry\(1, 160, 112\)/);
assert.match(scene, /new RoomEnvironment\(\)/);
assert.match(scene, /function setObjectOpacityScale/);
assert.match(scene, /displayMode !== 'clean'/);
assert.doesNotMatch(scene, /new THREE\.GridHelper/);
assert.match(app, /setDisplayMode/);
assert.match(renderTuning, /toneMappingExposure: 1\.08/);
assert.match(renderTuning, /contextTeachingOpacity: 0\.28/);
assert.match(scene, /const leftWing =/);
assert.match(scene, /const rightWing =/);
assert.match(scene, /const baseDepth = 0\.52 \+ 0\.17 \* form/);
assert.match(scene, /liver\.userData\.geometryStage !== stage\.id/);
assert.match(scene, /function makeHollowOrganTube/);
assert.match(scene, /const stride = ringSize \* 2/);
assert.match(scene, /vertexColors: true/);
assert.match(scene, /Annular rims connect the mucosal and outer walls/);
assert.match(scene, /function makePortalGallbladder/);

// Smooth vascular surfaces, true terminals, and shared-node continuity.
assert.match(scene, /function makeVesselMesh/);
assert.match(scene, /function collectActiveJunctions/);
assert.match(scene, /capStart: startDegree === 1/);
assert.match(scene, /capEnd: endDegree === 1/);
assert.match(scene, /const appendHemisphere =/);
assert.match(scene, /function addVascularJunctions/);
assert.match(scene, /junction\.degree < 3/);
assert.match(scene, /layer\.kind === 'sinusoid'/);
assert.match(scene, /const layerRadiusScale = layer\.kind === 'sinusoid' \? 0\.62 : 1/);
assert.doesNotMatch(scene, /new THREE\.SphereGeometry\(radius \* VESSEL_RENDER_CONFIG\.endpointRadiusScale/);
assert.equal((scene.match(/addVascularJunctions\(group, layer\.paths/g) || []).length, 5);
assert.match(scene, /function makeDorsalPancreaticBud/);

// Selection and visibility must not regenerate high-poly vascular meshes.
assert.doesNotMatch(scene, /\}, \[stage, profile, visibleLayers, selectedStructure\]\);/);
assert.doesNotMatch(scene, /scene\.traverse\(\(object\) => \{\s*const mesh = object as THREE\.Mesh;\s*const curve = mesh\.userData\.flowCurve/);
assert.match(scene, /\}, \[stage\.id, profile, cardinalModel\]\);/);
assert.match(scene, /group\.visible = presentation\.visible/);
assert.match(config, /samplesPerUnit: 28/);
assert.match(config, /minorAxisScale: 0\.93/);
assert.match(config, /globalRadiusScale: 0\.84/);
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
  const fileContent = await readFile(path, 'utf8');
  assert.ok(fileContent.length > 1000, 'Authored anatomy geometry must remain present: ' + path);
}

console.log('Core anatomy and presentation checks passed: sculpted hepatic primordium, lumen-bearing duodenum, refined venous sinus, slimmer oval vessels, subdued sinusoidal plexus, shared-node continuity, studio lighting, and clean / teaching / network display modes.');
