import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const sourceFiles = {
  vitelline: read('src/data/vitellineNetwork.ts'),
  hepatic: read('src/data/hepaticVascularNetwork.ts'),
  portal: read('src/data/portalNetwork.ts'),
  intervitelline: read('src/data/intervitellineNetwork.ts'),
  outflow: read('src/data/hepaticOutflowNetwork.ts'),
  umbilical: read('src/data/umbilicalNetwork.ts'),
  cardinal: read('src/data/cardinalNetwork.ts'),
  stages: read('src/data/stages.ts')
};
const teachingGuide = read('src/data/portalTeachingGuide.ts');
const structures = read('src/data/structures.ts');

const issues = [];
const nodeMap = new Map();
const nodePattern = /id:\s*'(node-[^']+)'[\s\S]{0,180}?position:\s*point\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\s*\)/g;

for (const [sourceName, source] of Object.entries(sourceFiles)) {
  for (const match of source.matchAll(nodePattern)) {
    const id = match[1];
    if (!id.startsWith('node-')) continue;
    const position = [Number(match[2]), Number(match[3]), Number(match[4])];
    if (nodeMap.has(id)) issues.push('Duplicate graph node ID ' + id + ' in ' + sourceName);
    nodeMap.set(id, position);
  }
}

const knownStructures = new Set();
for (const source of [...Object.values(sourceFiles), structures]) {
  for (const match of source.matchAll(/id:\s*'([^']+)'/g)) knownStructures.add(match[1]);
}
for (const match of sourceFiles.portal.matchAll(/portalLayer\(\s*'([^']+)'/g)) knownStructures.add(match[1]);
for (const match of sourceFiles.intervitelline.matchAll(/anastomosis\(\s*'([^']+)'/g)) knownStructures.add(match[1]);

const contextText = teachingGuide.match(/const CONTEXT = \[([\s\S]*?)\];/)?.[1] ?? '';
const contextLayers = [...contextText.matchAll(/'([^']+)'/g)].map((match) => match[1]);
const stepText = teachingGuide.slice(teachingGuide.indexOf('export const PORTAL_TEACHING_STEPS'));
const stepBlocks = stepText.split(/\n  \{\n    id:/).slice(1);
if (stepBlocks.length !== 22) issues.push('Expected 22 guided teaching steps; found ' + stepBlocks.length);

for (const block of stepBlocks) {
  const stepId = block.match(/^ '([^']+)'/)?.[1] ?? block.match(/^'([^']+)'/)?.[1] ?? 'unknown-step';
  const selected = block.match(/selectedStructure:\s*'([^']+)'/)?.[1];
  const model = block.match(/cardinalModel:\s*'([^']+)'/)?.[1];
  const visibleBlock = block.match(/visibleLayers:\s*\[([\s\S]*?)\]/)?.[1] ?? '';
  const visible = [...visibleBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]).concat(contextLayers);
  if (selected && !knownStructures.has(selected)) issues.push(stepId + ' selects unknown structure ' + selected);
  if (model && !['human-cardinal-2015', 'textbook-segmental'].includes(model)) issues.push(stepId + ' selects unknown cardinal model ' + model);
  for (const layerId of new Set(visible)) {
    if (!knownStructures.has(layerId)) issues.push(stepId + ' shows unknown layer ' + layerId);
  }
}

const samePoint = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 0.0001;
const pathPattern = /id:\s*'([^']+)',\s*fromNode:\s*'([^']+)',\s*toNode:\s*'([^']+)',\s*points:\s*\[([\s\S]*?)\]/g;

function auditLayerRegistry({ source, start, end, label, expectedLayers, expectedPaths, expectedArrows }) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex);
  if (startIndex < 0 || endIndex < 0) {
    issues.push('Could not locate ' + label + ' layer registry');
    return { layerCount: 0, pathCount: 0, arrowCount: 0, paths: [] };
  }
  const registry = source.slice(startIndex, endIndex);
  const layerIds = [...registry.matchAll(/id:\s*'([^']+)',\s*\n\s*name:/g)].map((match) => match[1]);
  if (layerIds.length !== expectedLayers) issues.push(label + ': expected ' + expectedLayers + ' layers; found ' + layerIds.length);
  if (new Set(layerIds).size !== layerIds.length) issues.push(label + ': duplicate layer IDs');

  const pathIds = new Set();
  const paths = [];
  for (const match of registry.matchAll(pathPattern)) {
    const id = match[1];
    const fromNode = match[2];
    const toNode = match[3];
    const points = [...match[4].matchAll(/point\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\s*\)/g)]
      .map((pointMatch) => [Number(pointMatch[1]), Number(pointMatch[2]), Number(pointMatch[3])]);

    if (pathIds.has(id)) issues.push(label + ': duplicate path ID ' + id);
    pathIds.add(id);
    if (points.length < 2) issues.push(label + ': ' + id + ' has fewer than two centre-line points');

    const startNode = nodeMap.get(fromNode);
    const endNode = nodeMap.get(toNode);
    if (!startNode) issues.push(label + ': ' + id + ' references missing start node ' + fromNode);
    if (!endNode) issues.push(label + ': ' + id + ' references missing end node ' + toNode);
    if (startNode && points.length && !samePoint(startNode, points[0])) issues.push(label + ': ' + id + ' start coordinate mismatch');
    if (endNode && points.length && !samePoint(endNode, points[points.length - 1])) issues.push(label + ': ' + id + ' end coordinate mismatch');
    paths.push({ id, fromNode, toNode, points });
  }

  const arrowCount = (registry.match(/flowArrow:\s*true/g) || []).length;
  if (paths.length !== expectedPaths) issues.push(label + ': expected ' + expectedPaths + ' paths; found ' + paths.length);
  if (arrowCount !== expectedArrows) issues.push(label + ': expected ' + expectedArrows + ' flow arrows; found ' + arrowCount);
  return { layerCount: layerIds.length, pathCount: paths.length, arrowCount, paths, registry };
}

const outflow = auditLayerRegistry({
  source: sourceFiles.outflow,
  start: 'export const HEPATIC_OUTFLOW_LAYERS',
  end: 'const STATE_PRESENTATION',
  label: 'Hepatic outflow',
  expectedLayers: 6,
  expectedPaths: 10,
  expectedArrows: 7
});
const umbilical = auditLayerRegistry({
  source: sourceFiles.umbilical,
  start: 'export const UMBILICAL_VASCULAR_LAYERS',
  end: 'const PRESENTATION',
  label: 'Umbilical',
  expectedLayers: 2,
  expectedPaths: 3,
  expectedArrows: 3
});
const cardinal = auditLayerRegistry({
  source: sourceFiles.cardinal,
  start: 'export const CARDINAL_VASCULAR_LAYERS',
  end: 'const PRESENTATION',
  label: 'Cardinal',
  expectedLayers: 8,
  expectedPaths: 19,
  expectedArrows: 9
});

const hasPath = (paths, id, from, to) => paths.some((path) => path.id === id && path.fromNode === from && path.toNode === to);
if (!hasPath(outflow.paths, 'classical-ductus-venosus-channel', 'node-left-iva-subhepatic', 'node-right-hepatic-exit')) {
  issues.push('Classical ductus venosus must start at the left portal-sinus angle and end at the hepatic IVC junction');
}
if (!hasPath(outflow.paths, 'human-venous-duct-inlet', 'node-left-umbilical-hilum', 'node-human-dv-inlet-bend')) {
  issues.push('Human venous duct must start at the left umbilical hilum');
}
if (!hasPath(outflow.paths, 'human-venous-duct-outlet', 'node-human-dv-narrow-waist', 'node-human-hepatocardiac-right')) {
  issues.push('Human venous duct must terminate at the right hepatocardiac channel');
}
if (!outflow.registry?.includes("id: 'human-venous-duct-narrow-waist'") || !outflow.registry?.includes('radiusScale: 0.62')) {
  issues.push('Human venous duct narrow segment is missing');
}
if (outflow.paths.filter((path) => path.id.includes('terminal-hepatic-vein')).length !== 3) {
  issues.push('Expected right, middle and left terminal hepatic-vein collectors');
}
if (!sourceFiles.outflow.includes('ligamentum venosum')) issues.push('Ductus-venosus postnatal fate note is missing');

if (!hasPath(umbilical.paths, 'right-umbilical-extrahepatic', 'node-right-umbilical-root', 'node-right-umbilical-hilum')) {
  issues.push('Right umbilical vein is missing its placental-to-hilum path');
}
if (!hasPath(umbilical.paths, 'right-umbilical-sinus-horn-connection', 'node-right-umbilical-hilum', 'node-venous-pole-right')) {
  issues.push('Right umbilical vein is missing its early sinus-horn connection');
}
if (!sourceFiles.umbilical.includes("const presentThenRegress = stateMap('present', 'present', 'regressing', 'regressing', 'not-distinct', 'not-distinct')")) issues.push('Right umbilical vein regression state is missing');
if (!sourceFiles.umbilical.includes("const leftHornConnection = stateMap('present', 'present', 'not-resolved', 'not-resolved', 'not-resolved', 'not-resolved')")) issues.push('Early left sinus-horn connection must remain unresolved rather than inferred to regress or persist');
if (!sourceFiles.portal.includes('ligamentum teres hepatis')) issues.push('Persistent left umbilical-vein postnatal fate note is missing');

if (!hasPath(cardinal.paths, 'right-caudal-cardinal-lower-path', 'node-cardinal-right-caudal-pelvic', 'node-cardinal-right-caudal-mesonephric')) {
  issues.push('Right caudal cardinal lower segment is missing');
}
if (!hasPath(cardinal.paths, 'right-caudal-cardinal-upper-path', 'node-cardinal-right-caudal-mesonephric', 'node-cardinal-right-common')) {
  issues.push('Right caudal cardinal upper segment must connect to the common cardinal junction');
}
if (!hasPath(cardinal.paths, 'right-subcardinal-mesonephric-plexus-lateral-loop', 'node-cardinal-right-caudal-mesonephric', 'node-cardinal-right-plexus-lateral')) {
  issues.push('Right subcardinal plexus does not connect to the caudal cardinal branch point');
}
if (!hasPath(cardinal.paths, 'right-subcardinal-mesonephric-plexus-medial-limb', 'node-cardinal-right-plexus-lateral', 'node-cardinal-right-subcardinal-caudal')) {
  issues.push('Right subcardinal plexus does not connect to the longitudinal subcardinal channel');
}
if (!hasPath(cardinal.paths, 'right-subcardinal-longitudinal-path', 'node-cardinal-right-subcardinal-caudal', 'node-cardinal-right-subcardinal-cranial')) {
  issues.push('Right longitudinal subcardinal channel is missing');
}
if (!hasPath(cardinal.paths, 'intersubcardinal-transverse-path', 'node-cardinal-left-subcardinal-cranial', 'node-cardinal-right-subcardinal-cranial')) {
  issues.push('Intersubcardinal anastomosis is missing');
}
if (!cardinal.registry?.includes("model: 'textbook-segmental'") || !cardinal.registry?.includes('states: models(') || !cardinal.registry?.includes('hidden(),')) {
  issues.push('Conventional supracardinal layer is not isolated from the human 2015 model');
}
if (!sourceFiles.cardinal.includes('CS18–CS23')) issues.push('Later CS18–CS23 remodeling limitation is not documented');
if (!sourceFiles.cardinal.toLowerCase().includes('not included in the 2015 human reconstruction model')) {
  issues.push('The human 2015 / textbook supracardinal distinction is not documented');
}

if (![...Object.values(sourceFiles), structures].join('\n').toLowerCase().includes('complete composite ivc')) {
  issues.push('The full composite IVC scope boundary is not documented');
}

if (issues.length) {
  process.stderr.write('Venous network validation failed:\n- ' + issues.join('\n- ') + '\n');
  process.exitCode = 1;
} else {
  process.stdout.write(
    'Venous network validation passed: ' +
    outflow.layerCount + ' hepatic-outflow layers / ' + outflow.pathCount + ' paths; ' +
    umbilical.layerCount + ' umbilical layers / ' + umbilical.pathCount + ' paths; ' +
    cardinal.layerCount + ' cardinal layers / ' + cardinal.pathCount + ' paths; ' +
    stepBlocks.length + ' teaching steps; ' + nodeMap.size + ' graph nodes.\n'
  );
}
