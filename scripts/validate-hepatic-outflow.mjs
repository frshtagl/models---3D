import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const sources = [
  read('src/data/vitellineNetwork.ts'),
  read('src/data/hepaticVascularNetwork.ts'),
  read('src/data/portalNetwork.ts')
];
const outflow = read('src/data/hepaticOutflowNetwork.ts');

const issues = [];
const nodes = new Map();
const nodePattern = /id:\s*'([^']+)'[\s\S]{0,240}?position:\s*point\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\s*\)/g;

for (const source of [...sources, outflow]) {
  for (const match of source.matchAll(nodePattern)) {
    const id = match[1];
    const position = [Number(match[2]), Number(match[3]), Number(match[4])];
    if (nodes.has(id) && source === outflow) issues.push('Duplicate outflow node ID: ' + id);
    nodes.set(id, position);
  }
}

const layerStart = outflow.indexOf('export const HEPATIC_OUTFLOW_LAYERS');
const layerEnd = outflow.indexOf('const STATE_PRESENTATION', layerStart);
if (layerStart < 0 || layerEnd < 0) {
  issues.push('Could not locate the hepatic-outflow layer registry');
}
const layerSource = outflow.slice(layerStart, layerEnd);
const layerIds = [...layerSource.matchAll(/id:\s*'([^']+)',\s*\n\s*name:/g)].map((match) => match[1]);
if (layerIds.length !== 6) issues.push('Expected 6 hepatic-outflow layers; found ' + layerIds.length);
if (new Set(layerIds).size !== layerIds.length) issues.push('Duplicate hepatic-outflow layer IDs');

const pathPattern = /id:\s*'([^']+)',\s*fromNode:\s*'([^']+)',\s*toNode:\s*'([^']+)',\s*points:\s*\[([\s\S]*?)\]/g;
const pathIds = new Set();
const paths = [];
const samePoint = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 0.0001;

for (const match of layerSource.matchAll(pathPattern)) {
  const id = match[1];
  const fromNode = match[2];
  const toNode = match[3];
  const points = [...match[4].matchAll(/point\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\s*\)/g)]
    .map((pointMatch) => [Number(pointMatch[1]), Number(pointMatch[2]), Number(pointMatch[3])]);

  if (pathIds.has(id)) issues.push('Duplicate hepatic-outflow path ID: ' + id);
  pathIds.add(id);
  if (points.length < 2) issues.push(id + ' has fewer than two centre-line points');

  const start = nodes.get(fromNode);
  const end = nodes.get(toNode);
  if (!start) issues.push(id + ' references missing start node ' + fromNode);
  if (!end) issues.push(id + ' references missing end node ' + toNode);
  if (start && points.length && !samePoint(start, points[0])) issues.push(id + ' start coordinate does not match its node');
  if (end && points.length && !samePoint(end, points[points.length - 1])) issues.push(id + ' end coordinate does not match its node');

  paths.push({ id, fromNode, toNode, pointCount: points.length });
}

if (paths.length !== 10) issues.push('Expected 10 hepatic-outflow paths; found ' + paths.length);
if (new Set(pathIds).size !== paths.length) issues.push('Duplicate hepatic-outflow path IDs');

const hasPath = (id, from, to) => paths.some((path) => path.id === id && path.fromNode === from && path.toNode === to);
if (!hasPath('classical-ductus-venosus-channel', 'node-left-iva-subhepatic', 'node-right-hepatic-exit')) {
  issues.push('Classical ductus venosus must start at the left portal-sinus angle and end at the hepatic IVC junction');
}
if (!hasPath('human-venous-duct-inlet', 'node-left-umbilical-hilum', 'node-human-dv-inlet-bend')) {
  issues.push('Human venous duct must start at the left umbilical hilum');
}
if (!hasPath('human-venous-duct-outlet', 'node-human-dv-narrow-waist', 'node-human-hepatocardiac-right')) {
  issues.push('Human venous duct must terminate at the right hepatocardiac channel');
}
if (!layerSource.includes("id: 'human-venous-duct-narrow-waist'") || !layerSource.includes('radiusScale: 0.62')) {
  issues.push('Human venous duct narrow segment is missing');
}
const terminalCount = paths.filter((path) => path.id.includes('terminal-hepatic-vein')).length;
if (terminalCount !== 3) issues.push('Expected right, middle and left terminal hepatic-vein collectors; found ' + terminalCount);

const arrowCount = (layerSource.match(/flowArrow:\s*true/g) || []).length;
if (arrowCount !== 7) issues.push('Expected 7 flow-direction arrows; found ' + arrowCount);
if (!outflow.includes('ligamentum venosum')) {
  issues.push('Ductus-venosus postnatal fate note is missing');
}
if (![...sources, outflow].join('\n').toLowerCase().includes('complete composite ivc')) {
  issues.push('The hepatic-only IVC scope boundary is not documented in the source module');
}

if (issues.length) {
  process.stderr.write('Hepatic outflow graph validation failed:\n- ' + issues.join('\n- ') + '\n');
  process.exitCode = 1;
} else {
  process.stdout.write(
    'Hepatic outflow graph validation passed: ' +
    layerIds.length + ' layers, ' + paths.length + ' paths, ' +
    nodes.size + ' source graph nodes, ' + arrowCount + ' flow arrows.\n'
  );
}
