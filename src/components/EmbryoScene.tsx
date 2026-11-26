import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { DevelopmentStage } from '../data/stages';
import type { StructureVisibility } from '../data/structures';
import type { EvidenceProfile } from '../data/stages';
import { VITELLINE_SEGMENTS, getVesselPresentation } from '../data/vitellineNetwork';
import type { Point3, VitellineStageId } from '../data/vitellineNetwork';
import { HEPATIC_VASCULAR_LAYERS, getHepaticLayerPresentation } from '../data/hepaticVascularNetwork';
import { HEPATIC_OUTFLOW_LAYERS, getHepaticOutflowPresentation } from '../data/hepaticOutflowNetwork';
import { INTERVITELLINE_ANASTOMOSES, INTERVITELLINE_LANDMARKS, getIntervitellinePresentation } from '../data/intervitellineNetwork';
import { PORTAL_LANDMARKS, PORTAL_VASCULAR_LAYERS, getPortalLayerPresentation } from '../data/portalNetwork';
import { UMBILICAL_VASCULAR_LAYERS, getUmbilicalLayerPresentation } from '../data/umbilicalNetwork';
import { CARDINAL_VASCULAR_LAYERS, getCardinalLayerPresentation } from '../data/cardinalNetwork';
import type { CardinalModel } from '../data/cardinalNetwork';
import { VESSEL_RENDER_CONFIG } from '../data/geometryTuning';

export type CameraPreset = 'anterior' | 'posterior' | 'right' | 'left' | 'superior' | 'inferior' | 'oblique' | 'reset';

interface Props {
  stage: DevelopmentStage;
  profile: EvidenceProfile;
  cardinalModel: CardinalModel;
  visibleLayers: StructureVisibility;
  selectedStructure: string | null;
  cameraPreset: CameraPreset;
  zoomStep: number;
  onSelectStructure: (id: string) => void;
}

interface MaterialFadeState {
  material: THREE.Material;
  opacity: number;
  transparent: boolean;
  depthWrite: boolean;
}
interface FadeRecord {
  object: THREE.Object3D;
  startedAt: number;
  duration: number;
  direction: 'in' | 'out';
  materials: MaterialFadeState[];
}
interface CameraTween {
  fromPosition: THREE.Vector3;
  toPosition: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toTarget: THREE.Vector3;
  fromQuaternion: THREE.Quaternion;
  toQuaternion: THREE.Quaternion;
  startedAt: number;
  duration: number;
}
interface SceneApi {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  objects: Map<string, THREE.Object3D>;
  transitionRoot: THREE.Group;
  fades: FadeRecord[];
  cameraTween: CameraTween | null;
  clock: THREE.Clock;
}
const STAGE_TRANSITION_DURATION_MS = 720;
const CAMERA_TRANSITION_DURATION_MS = 760;

function collectMaterialFadeStates(object: THREE.Object3D): MaterialFadeState[] {
  const states: MaterialFadeState[] = [];
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh || !mesh.material) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material) => states.push({
      material, opacity: material.opacity, transparent: material.transparent, depthWrite: material.depthWrite
    }));
  });
  return states;
}
function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry?.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material) => material.dispose());
  });
}
function clearGroup(group: THREE.Group, transitionRoot: THREE.Group, fades: FadeRecord[], animate: boolean) {
  // If the learner changes stages again mid-transition, let the current visual
  // opacity become the starting point for the next fade instead of competing tweens.
  for (let index = fades.length - 1; index >= 0; index -= 1) {
    if (fades[index].object === group) fades.splice(index, 1);
  }
  const children = [...group.children];
  const wasVisible = group.visible;
  group.clear();
  if (animate) {
    if (children.length) {
      const outgoing = new THREE.Group();
      outgoing.name = `${group.name}-outgoing`;
      outgoing.visible = wasVisible;
      children.forEach((child) => outgoing.add(child));
      transitionRoot.add(outgoing);
      const materials = collectMaterialFadeStates(outgoing);
      materials.forEach(({ material }) => {
        material.transparent = true;
        material.depthWrite = false;
        material.needsUpdate = true;
      });
      fades.push({ object: outgoing, startedAt: performance.now(), duration: STAGE_TRANSITION_DURATION_MS, direction: 'out', materials });
    }
    group.userData.pendingFadeIn = true;
    return;
  }
  group.userData.pendingFadeIn = false;
  children.forEach(disposeObject);
}
function beginFadeIn(group: THREE.Object3D, fades: FadeRecord[], now: number) {
  if (!group.userData.pendingFadeIn) return;
  group.userData.pendingFadeIn = false;
  const materials = collectMaterialFadeStates(group);
  if (!materials.length) return;
  materials.forEach(({ material }) => {
    material.transparent = true;
    material.depthWrite = false;
    material.opacity = 0;
    material.needsUpdate = true;
  });
  fades.push({ object: group, startedAt: now, duration: STAGE_TRANSITION_DURATION_MS, direction: 'in', materials });
}
function updateFadeTransitions(fades: FadeRecord[], transitionRoot: THREE.Group, now: number) {
  for (let index = fades.length - 1; index >= 0; index -= 1) {
    const fade = fades[index];
    const progress = Math.min(1, Math.max(0, (now - fade.startedAt) / fade.duration));
    const eased = progress * progress * (3 - 2 * progress);
    const scale = fade.direction === 'in' ? eased : 1 - eased;
    fade.materials.forEach((state) => { state.material.opacity = state.opacity * scale; });
    if (progress < 1) continue;
    if (fade.direction === 'in') {
      fade.materials.forEach((state) => {
        state.material.opacity = state.opacity;
        state.material.transparent = state.transparent;
        state.material.depthWrite = state.depthWrite;
        state.material.needsUpdate = true;
      });
    } else {
      transitionRoot.remove(fade.object);
      disposeObject(fade.object);
    }
    fades.splice(index, 1);
  }
}
function startCameraTween(api: SceneApi, position: THREE.Vector3, target: THREE.Vector3, up: THREE.Vector3, duration = CAMERA_TRANSITION_DURATION_MS) {
  const targetCamera = new THREE.PerspectiveCamera();
  targetCamera.position.copy(position);
  targetCamera.up.copy(up);
  targetCamera.lookAt(target);
  api.cameraTween = {
    fromPosition: api.camera.position.clone(), toPosition: position.clone(),
    fromTarget: api.controls.target.clone(), toTarget: target.clone(),
    fromQuaternion: api.camera.quaternion.clone(), toQuaternion: targetCamera.quaternion.clone(),
    startedAt: performance.now(), duration
  };
}

function tube(points: THREE.Vector3[], radius: number, color: string) {
  const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
  const tubularSegments = Math.max(VESSEL_RENDER_CONFIG.minTubularSegments, Math.min(160, Math.ceil(curve.getLength() * VESSEL_RENDER_CONFIG.samplesPerUnit)));
  const geometry = new THREE.TubeGeometry(curve, tubularSegments, radius, VESSEL_RENDER_CONFIG.radialSegments, false);
  const material = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.46,
    metalness: 0.01,
    clearcoat: 0.16,
    clearcoatRoughness: 0.42
  });
  return new THREE.Mesh(geometry, material);
}

function viewFor(preset: CameraPreset) {
  const views: Record<CameraPreset, [number, number, number]> = {
    anterior: [0, 0, -9],
    posterior: [0, 0, 9],
    right: [9, 0, 0],
    left: [-9, 0, 0],
    superior: [0, 9, 0],
    inferior: [0, -9, 0],
    oblique: [6.2, 4.1, -7.2],
    reset: [6.2, 4.1, -7.2]
  };
  return views[preset];
}

function makeLiver() {
  const geometry = new THREE.SphereGeometry(1, 72, 52);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;
    const y = vertex.y;
    const z = vertex.z;
    const rightLobe = x >= 0 ? 1.08 : 0.82;
    const inferiorNotch = Math.exp(-(((x - 0.08) / 0.2) ** 2) - (((y + 0.62) / 0.18) ** 2));
    const hilumIndent = Math.exp(-(((x - 0.02) / 0.28) ** 2) - (((y + 0.12) / 0.22) ** 2)) * Math.max(0, -z);
    const surfaceRelief = 0.018 * Math.sin(3.2 * x + 0.5) * Math.cos(2.6 * y);
    position.setXYZ(
      i,
      x * 1.58 * rightLobe + 0.07 * y,
      y * 0.78 + inferiorNotch * 0.12,
      z * (0.74 + surfaceRelief) + hilumIndent * 0.1
    );
  }

  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial({
    color: '#a96854',
    roughness: 0.62,
    metalness: 0,
    clearcoat: 0.08,
    transparent: true,
    opacity: 0.27,
    depthWrite: false,
    side: THREE.DoubleSide
  }));
  mesh.position.set(0, 1.4, 0.12);
  mesh.renderOrder = 1;
  return mesh;
}

function makeEmbryoEnvelope() {
  const geometry = new THREE.SphereGeometry(1, 80, 56);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i);
    const y = vertex.y;
    const headBulge = Math.exp(-(((y - 0.78) / 0.3) ** 2));
    const trunkWidth = 0.62 + 0.34 * Math.exp(-(((y - 0.08) / 0.78) ** 2)) + 0.12 * headBulge;
    const cBend = 0.48 * Math.pow((1 - y) * 0.5, 1.35) - 0.18 * headBulge;
    const surfaceRelief = 0.025 * Math.sin(vertex.x * 5.5) * Math.cos(y * 4.2);
    position.setXYZ(
      i,
      vertex.x * 0.92 * trunkWidth,
      y * 2.42,
      vertex.z * (0.52 + surfaceRelief) + cBend
    );
  }

  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial({
    color: '#b58d85',
    roughness: 0.78,
    metalness: 0,
    clearcoat: 0.04,
    transparent: true,
    opacity: 0.075,
    depthWrite: false,
    side: THREE.DoubleSide
  }));
  mesh.position.set(0, 0.3, 0.05);
  mesh.renderOrder = -2;
  return mesh;
}

function makeVenousPole() {
  const group = new THREE.Group();
  const sac = new THREE.Mesh(
    new THREE.SphereGeometry(1, 56, 40),
    new THREE.MeshPhysicalMaterial({
      color: '#5689b8',
      roughness: 0.38,
      metalness: 0.01,
      clearcoat: 0.22,
      transparent: true,
      opacity: 0.86
    })
  );
  sac.scale.set(0.46, 0.31, 0.34);
  sac.position.set(0.1, 2.82, 0.2);
  group.add(sac);
  group.add(tube([
    new THREE.Vector3(-0.25, 2.82, 0.2),
    new THREE.Vector3(-0.18, 2.84, 0.2),
    new THREE.Vector3(-0.08, 2.85, 0.2),
    new THREE.Vector3(0.1, 2.82, 0.2)
  ], 0.105, '#5689b8'));
  group.add(tube([
    new THREE.Vector3(0.45, 2.82, 0.2),
    new THREE.Vector3(0.36, 2.84, 0.2),
    new THREE.Vector3(0.24, 2.85, 0.2),
    new THREE.Vector3(0.1, 2.82, 0.2)
  ], 0.105, '#5689b8'));
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) object.userData.structureId = 'sinus-venosus';
  });
  return group;
}

function makeDorsalPancreaticBud() {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 28, 20),
    new THREE.MeshStandardMaterial({
      color: '#d9a46e',
      roughness: 0.62,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      emissive: '#3b2411',
      emissiveIntensity: 0.08
    })
  );
  mesh.scale.set(1.45, 0.58, 0.78);
  mesh.position.set(
    INTERVITELLINE_LANDMARKS[0].position[0],
    INTERVITELLINE_LANDMARKS[0].position[1],
    INTERVITELLINE_LANDMARKS[0].position[2]
  );
  return mesh;
}

function makePortalGallbladder() {
  const landmark = PORTAL_LANDMARKS.find((item) => item.id === 'portal-gallbladder');
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 24, 18),
    new THREE.MeshStandardMaterial({
      color: landmark?.color ?? '#a6b86d',
      roughness: 0.58,
      transparent: true,
      opacity: 0.92,
      emissive: '#263015',
      emissiveIntensity: 0.12
    })
  );
  mesh.scale.set(0.72, 1.48, 0.72);
  const position = landmark?.position ?? [0.05, 1.13, -0.43];
  mesh.position.set(position[0], position[1], position[2]);
  return mesh;
}

function highlight(object: THREE.Object3D, active: boolean) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) {
        if (material.userData.baseColor === undefined) material.userData.baseColor = material.color.getHex();
        material.color.setHex(active ? 0x8fc9ed : material.userData.baseColor);
      }
    });
  });
}

function makeVesselMesh(
  points: readonly Point3[],
  radius: number,
  color: string,
  opacity: number
): THREE.Mesh | null {
  if (points.length < 2 || radius <= 0) return null;
  const curvePoints = points.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  const curve = new THREE.CatmullRomCurve3(curvePoints, false, VESSEL_RENDER_CONFIG.curveType);
  const length = curve.getLength();
  const tubularSegments = Math.max(
    VESSEL_RENDER_CONFIG.minTubularSegments,
    Math.min(VESSEL_RENDER_CONFIG.maxTubularSegments, Math.ceil(length * VESSEL_RENDER_CONFIG.samplesPerUnit))
  );
  const radialSegments = VESSEL_RENDER_CONFIG.radialSegments;
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= tubularSegments; i += 1) {
    const t = i / tubularSegments;
    const point = curve.getPointAt(t);
    const edgeFraction = Math.min(1, Math.min(t, 1 - t) / 0.12);
    const easedEdge = edgeFraction * edgeFraction * (3 - 2 * edgeFraction);
    const endpointScale = VESSEL_RENDER_CONFIG.endpointRadiusScale
      + (1 - VESSEL_RENDER_CONFIG.endpointRadiusScale) * easedEdge;
    const midBulge = 1 + VESSEL_RENDER_CONFIG.midRadiusBoost * Math.sin(Math.PI * t) ** 2;
    const localRadius = radius * endpointScale * midBulge;

    for (let j = 0; j <= radialSegments; j += 1) {
      const v = j / radialSegments;
      const angle = v * Math.PI * 2;
      const normal = frames.normals[i].clone().multiplyScalar(Math.cos(angle))
        .addScaledVector(frames.binormals[i], Math.sin(angle)).normalize();
      const vertex = point.clone().addScaledVector(normal, localRadius);
      positions.push(vertex.x, vertex.y, vertex.z);
      normals.push(normal.x, normal.y, normal.z);
      uvs.push(t, v);
    }
  }

  for (let i = 0; i < tubularSegments; i += 1) {
    for (let j = 0; j < radialSegments; j += 1) {
      const a = i * (radialSegments + 1) + j;
      const b = (i + 1) * (radialSegments + 1) + j;
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  // Rounded end caps close open tube ends and soften connected graph junctions.
  const addCap = (center: THREE.Vector3) => {
    const cap = new THREE.SphereGeometry(radius * VESSEL_RENDER_CONFIG.endpointRadiusScale, radialSegments, 16);
    cap.translate(center.x, center.y, center.z);
    const capPositions = cap.attributes.position as THREE.BufferAttribute;
    const capNormals = cap.attributes.normal as THREE.BufferAttribute;
    const capUvs = cap.attributes.uv as THREE.BufferAttribute;
    const offset = positions.length / 3;
    for (let i = 0; i < capPositions.count; i += 1) {
      positions.push(capPositions.getX(i), capPositions.getY(i), capPositions.getZ(i));
      normals.push(capNormals.getX(i), capNormals.getY(i), capNormals.getZ(i));
      uvs.push(capUvs.getX(i), capUvs.getY(i));
    }
    const capIndices = cap.index?.array;
    if (capIndices) {
      for (let i = 0; i < capIndices.length; i += 1) indices.push(capIndices[i] + offset);
    }
    cap.dispose();
  };
  addCap(curve.getPointAt(0));
  addCap(curve.getPointAt(1));

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();

  const material = new THREE.MeshPhysicalMaterial({
    color,
    roughness: VESSEL_RENDER_CONFIG.roughness,
    metalness: 0.015,
    clearcoat: VESSEL_RENDER_CONFIG.clearcoat,
    clearcoatRoughness: VESSEL_RENDER_CONFIG.clearcoatRoughness,
    transparent: opacity < 0.98,
    opacity,
    depthWrite: opacity >= 0.98,
    emissive: color,
    emissiveIntensity: VESSEL_RENDER_CONFIG.emissiveIntensity
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return mesh;
}

function makeFlowArrow(points: readonly Point3[], color: string, radius: number): THREE.Mesh | null {
  if (points.length < 2) return null;
  const curve = new THREE.CatmullRomCurve3(
    points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false,
    VESSEL_RENDER_CONFIG.curveType
  );
  const position = curve.getPointAt(0.72);
  const direction = curve.getTangentAt(0.72).normalize();
  if (direction.lengthSq() < 1e-8) return null;
  const height = Math.max(radius * 2.5, 0.065);
  const arrow = new THREE.Mesh(
    new THREE.ConeGeometry(Math.max(radius * 1.35, 0.022), height, 16, 1),
    new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.34,
      metalness: 0.01,
      clearcoat: 0.24,
      emissive: color,
      emissiveIntensity: 0.08
    })
  );
  arrow.position.copy(position).addScaledVector(direction, height * 0.12);
  arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  arrow.userData.flowCurve = curve;
  arrow.userData.flowSpeed = 0.11;
  arrow.userData.flowOffset = (Math.abs(points[0][0]) * 0.173 + points.length * 0.071) % 1;
  return arrow;
}

export default function EmbryoScene({
  stage, profile, cardinalModel, visibleLayers, selectedStructure, cameraPreset, zoomStep, onSelectStructure
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<SceneApi | null>(null);
  const zoomStepRef = useRef(0);
  const stageChangePendingRef = useRef(false);
  const previousStageKeyRef = useRef<string | null>(null);
  const selectRef = useRef(onSelectStructure);
  selectRef.current = onSelectStructure;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const transitionRoot = new THREE.Group();
    transitionRoot.name = 'stage-transition-layer';
    scene.add(transitionRoot);
    scene.background = new THREE.Color('#07111f');
    scene.fog = new THREE.Fog('#07111f', 18, 36);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(6.2, 4.1, -7.2);
    camera.lookAt(0, 0.45, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.domElement.className = 'embryo-canvas';
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.minDistance = 4.5;
    controls.maxDistance = 18;
    controls.target.set(0, 0.45, 0);

    scene.add(new THREE.HemisphereLight('#d7e9ff', '#182332', 1.45));
    const key = new THREE.DirectionalLight('#fff0dc', 2.25);
    key.position.set(-4, 7, -5);
    scene.add(key);
    const rim = new THREE.DirectionalLight('#6da8d8', 1.15);
    rim.position.set(5, 3, 5);
    scene.add(rim);

    const objects = new Map<string, THREE.Object3D>();
    const add = (id: string, object: THREE.Object3D) => {
      object.name = id;
      object.userData.structureId = id;
      scene.add(object);
      objects.set(id, object);
    };

    add('embryo-envelope', makeEmbryoEnvelope());
    add('liver', makeLiver());

    add('duodenum', tube([
      new THREE.Vector3(-0.82, 0.94, -0.18),
      new THREE.Vector3(-0.48, 0.58, -0.18),
      new THREE.Vector3(-0.02, 0.24, -0.1),
      new THREE.Vector3(0.55, 0.02, -0.02),
      new THREE.Vector3(0.88, -0.34, 0.08),
      new THREE.Vector3(0.7, -0.78, 0.1),
      new THREE.Vector3(0.25, -1.02, 0.04),
      new THREE.Vector3(-0.22, -0.91, -0.02)
    ], 0.145, '#dcae7a'));

    add('dorsal-pancreatic-bud', makeDorsalPancreaticBud());
    add('portal-gallbladder', makePortalGallbladder());

    add('foregut', tube([
      new THREE.Vector3(-0.55, 2.25, -0.08),
      new THREE.Vector3(-0.48, 1.88, -0.08),
      new THREE.Vector3(-0.38, 1.48, -0.1),
      new THREE.Vector3(-0.32, 1.12, -0.13),
      new THREE.Vector3(-0.18, 0.83, -0.15)
    ], 0.125, '#bd8876'));

    const yolkGeometry = new THREE.SphereGeometry(1, 64, 44);
    const yolk = new THREE.Mesh(yolkGeometry, new THREE.MeshPhysicalMaterial({
      color: '#c6a56e',
      roughness: 0.7,
      metalness: 0,
      clearcoat: 0.06,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      side: THREE.DoubleSide
    }));
    yolk.scale.set(1.02, 0.8, 0.55);
    yolk.position.set(0, -2.18, -0.34);
    yolk.renderOrder = -1;
    add('yolk-sac', yolk);

    const placenta = new THREE.Mesh(
      new THREE.SphereGeometry(1, 56, 36),
      new THREE.MeshPhysicalMaterial({
        color: '#a97888',
        roughness: 0.72,
        clearcoat: 0.04,
        transparent: true,
        opacity: 0.38,
        depthWrite: false
      })
    );
    placenta.scale.set(1.05, 0.25, 0.18);
    placenta.position.set(0, -2.62, -0.9);
    placenta.renderOrder = -1;
    add('placenta', placenta);

    const umbilicalCord = new THREE.Group();
    umbilicalCord.add(tube([
      new THREE.Vector3(0, -2.58, -0.9),
      new THREE.Vector3(0, -2.46, -0.94),
      new THREE.Vector3(0, -2.35, -1.0)
    ], 0.13, '#b18a67'));
    umbilicalCord.add(tube([
      new THREE.Vector3(0, -2.35, -1.0),
      new THREE.Vector3(-0.13, -2.35, -1.0),
      new THREE.Vector3(-0.25, -2.35, -1.0)
    ], 0.075, '#b18a67'));
    umbilicalCord.add(tube([
      new THREE.Vector3(0, -2.35, -1.0),
      new THREE.Vector3(0.13, -2.35, -1.0),
      new THREE.Vector3(0.25, -2.35, -1.0)
    ], 0.075, '#b18a67'));
    umbilicalCord.traverse((object) => {
      if (object instanceof THREE.Mesh) object.userData.structureId = 'umbilical-cord';
    });
    add('umbilical-cord', umbilicalCord);

    add('dorsal-aorta', tube([
      new THREE.Vector3(0, -2.05, 0.62),
      new THREE.Vector3(0, -1.35, 0.62),
      new THREE.Vector3(0, -0.55, 0.62),
      new THREE.Vector3(0, 0.25, 0.62),
      new THREE.Vector3(0, 1.1, 0.62),
      new THREE.Vector3(0, 1.95, 0.62),
      new THREE.Vector3(0.08, 2.55, 0.52)
    ], 0.085, '#c96c72'));

    const makeMesonephros = (side: 'left' | 'right') => {
      const organ = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 32, 24),
        new THREE.MeshStandardMaterial({ color: '#8e7b91', roughness: 0.66, transparent: true, opacity: 0.55, depthWrite: false })
      );
      organ.scale.set(0.72, 1.62, 0.64);
      organ.position.set(side === 'right' ? 0.76 : -0.76, -0.86, 0.48);
      return organ;
    };
    add('mesonephros-right', makeMesonephros('right'));
    add('mesonephros-left', makeMesonephros('left'));

    add('sinus-venosus', makeVenousPole());

    const septum = new THREE.Mesh(
      new THREE.SphereGeometry(1, 40, 20),
      new THREE.MeshStandardMaterial({
        color: '#6f9c8a', transparent: true, opacity: 0.22,
        depthWrite: false, side: THREE.DoubleSide
      })
    );
    septum.scale.set(2.05, 0.12, 0.72);
    septum.position.set(0, 2.0, 0.48);
    add('transverse-septum', septum);

    const axes = new THREE.AxesHelper(1.1);
    axes.position.set(-3.05, -1.72, 0.3);
    add('orientation-axes', axes);

    VITELLINE_SEGMENTS.forEach((segment) => {
      add(segment.id, new THREE.Group());
    });
    HEPATIC_VASCULAR_LAYERS.forEach((layer) => {
      add(layer.id, new THREE.Group());
    });
    HEPATIC_OUTFLOW_LAYERS.forEach((layer) => {
      add(layer.id, new THREE.Group());
    });
    INTERVITELLINE_ANASTOMOSES.forEach((item) => {
      add(item.id, new THREE.Group());
    });
    PORTAL_VASCULAR_LAYERS.forEach((layer) => {
      add(layer.id, new THREE.Group());
    });
    UMBILICAL_VASCULAR_LAYERS.forEach((layer) => {
      add(layer.id, new THREE.Group());
    });
    CARDINAL_VASCULAR_LAYERS.forEach((layer) => {
      add(layer.id, new THREE.Group());
    });

    const grid = new THREE.GridHelper(12, 24, '#1d3448', '#132538');
    grid.position.y = -3.1;
    const gridMaterial = grid.material as THREE.Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.11;
    scene.add(grid);

    const fades: FadeRecord[] = [];
    const clock = new THREE.Clock();
    apiRef.current = { camera, controls, objects, transitionRoot, fades, cameraTween: null, clock };

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pointerDown = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(Array.from(objects.values()), true)
        .find((entry) => {
          let current: THREE.Object3D | null = entry.object;
          while (current) {
            if (!current.visible) return false;
            current = current.parent;
          }
          return typeof entry.object.userData.structureId === 'string';
        });
      if (hit) selectRef.current(hit.object.userData.structureId as string);
    };
    renderer.domElement.addEventListener('pointerdown', pointerDown);

    let frame = 0;
    const render = () => {
      frame = window.requestAnimationFrame(render);
      const api = apiRef.current;
      const delta = Math.min(clock.getDelta(), 0.05);
      const now = performance.now();

      if (api) {
        api.objects.forEach((object) => {
          beginFadeIn(object, api.fades, now);
          const targetScale = object.userData.targetScale;
          if (typeof targetScale === 'number') {
            const alpha = 1 - Math.exp(-6 * delta);
            const nextScale = object.scale.x + (targetScale - object.scale.x) * alpha;
            object.scale.setScalar(Math.abs(targetScale - nextScale) < 0.001 ? targetScale : nextScale);
          }
        });
        updateFadeTransitions(api.fades, api.transitionRoot, now);
        if (api.cameraTween) {
          const tween = api.cameraTween;
          const progress = Math.min(1, Math.max(0, (now - tween.startedAt) / tween.duration));
          const eased = progress * progress * (3 - 2 * progress);
          const target = tween.fromTarget.clone().lerp(tween.toTarget, eased);
          const fromOffset = tween.fromPosition.clone().sub(tween.fromTarget);
          const toOffset = tween.toPosition.clone().sub(tween.toTarget);
          const fromRadius = fromOffset.length();
          const toRadius = toOffset.length();
          const fromDirection = fromOffset.normalize();
          const toDirection = toOffset.normalize();
          const rotation = new THREE.Quaternion().setFromUnitVectors(fromDirection, toDirection);
          const direction = fromDirection.clone()
            .applyQuaternion(new THREE.Quaternion().identity().slerp(rotation, eased))
            .normalize();
          const radius = fromRadius + (toRadius - fromRadius) * eased;
          controls.target.copy(target);
          camera.position.copy(target).addScaledVector(direction, radius);
          camera.quaternion.copy(tween.fromQuaternion).slerp(tween.toQuaternion, eased);
          camera.up.set(0, 1, 0).applyQuaternion(camera.quaternion).normalize();
          if (progress >= 1) {
            camera.position.copy(tween.toPosition);
            controls.target.copy(tween.toTarget);
            camera.quaternion.copy(tween.toQuaternion);
            camera.up.set(0, 1, 0).applyQuaternion(camera.quaternion).normalize();
            api.cameraTween = null;
          }
        }
      }

      const elapsed = clock.elapsedTime;
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        const curve = mesh.userData.flowCurve as THREE.CatmullRomCurve3 | undefined;
        if (!mesh.isMesh || !curve) return;
        const offset = mesh.userData.flowOffset as number;
        const speed = mesh.userData.flowSpeed as number;
        const phase = (elapsed * speed + offset) % 1;
        const progress = 0.08 + phase * 0.84;
        const position = curve.getPointAt(progress);
        const direction = curve.getTangentAt(progress).normalize();
        mesh.position.copy(position).addScaledVector(direction, 0.02);
        mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
        mesh.scale.setScalar(0.92 + 0.08 * Math.sin(elapsed * 4.5 + offset * Math.PI * 2));
      });
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', pointerDown);
      controls.dispose();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    const nextKey = `${stage.id}:${profile}:${cardinalModel}`;
    stageChangePendingRef.current = previousStageKeyRef.current !== null
      && previousStageKeyRef.current !== nextKey;
    previousStageKeyRef.current = nextKey;
  }, [stage.id, profile, cardinalModel]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const vesselIds = new Set([
      ...VITELLINE_SEGMENTS.map((segment) => segment.id),
      ...HEPATIC_VASCULAR_LAYERS.map((layer) => layer.id),
      ...HEPATIC_OUTFLOW_LAYERS.map((layer) => layer.id),
      ...INTERVITELLINE_ANASTOMOSES.map((item) => item.id),
      ...PORTAL_VASCULAR_LAYERS.map((layer) => layer.id),
      ...UMBILICAL_VASCULAR_LAYERS.map((layer) => layer.id),
      ...CARDINAL_VASCULAR_LAYERS.map((layer) => layer.id)
    ]);
    api.objects.forEach((object, id) => {
      if (!vesselIds.has(id)) object.visible = visibleLayers[id] ?? true;
    });
  }, [visibleLayers]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    VITELLINE_SEGMENTS.forEach((segment) => {
      const group = api.objects.get(segment.id) as THREE.Group | undefined;
      if (!group) return;
      clearGroup(group, api.transitionRoot, api.fades, stageChangePendingRef.current);
      const presentation = getVesselPresentation(segment, profile, stageId);
      group.visible = (visibleLayers[segment.id] ?? true) && presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      presentation.paths.forEach((path) => {
        const mesh = makeVesselMesh(
          path,
          segment.radius * presentation.radiusScale,
          segment.color,
          presentation.opacity
        );
        if (!mesh) return;
        mesh.userData.structureId = segment.id;
        group.add(mesh);
      });
      highlight(group, segment.id === selectedStructure);
    });
  }, [stage, profile, visibleLayers, selectedStructure]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    HEPATIC_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      clearGroup(group, api.transitionRoot, api.fades, stageChangePendingRef.current);
      const presentation = getHepaticLayerPresentation(layer, profile, stageId);
      group.visible = (visibleLayers[layer.id] ?? true) && presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      layer.paths.forEach((pathItem) => {
        const mesh = makeVesselMesh(
          pathItem.points,
          layer.radius * presentation.radiusScale * (pathItem.radiusScale ?? 1),
          layer.color,
          presentation.opacity
        );
        if (!mesh) return;
        mesh.userData.structureId = layer.id;
        mesh.userData.pathId = pathItem.id;
        group.add(mesh);
      });
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage, profile, visibleLayers, selectedStructure]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    HEPATIC_OUTFLOW_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      clearGroup(group, api.transitionRoot, api.fades, stageChangePendingRef.current);
      const presentation = getHepaticOutflowPresentation(layer, profile, stageId);
      group.visible = (visibleLayers[layer.id] ?? true) && presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      layer.paths.forEach((pathItem) => {
        const radius = layer.radius * presentation.radiusScale * (pathItem.radiusScale ?? 1);
        const mesh = makeVesselMesh(pathItem.points, radius, layer.color, presentation.opacity);
        if (mesh) {
          mesh.userData.structureId = layer.id;
          mesh.userData.pathId = pathItem.id;
          group.add(mesh);
        }
        if (pathItem.flowArrow) {
          const arrow = makeFlowArrow(pathItem.points, layer.color, radius);
          if (arrow) {
            arrow.userData.structureId = layer.id;
            arrow.userData.pathId = pathItem.id;
            group.add(arrow);
          }
        }
      });
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage, profile, visibleLayers, selectedStructure]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    INTERVITELLINE_ANASTOMOSES.forEach((item) => {
      const group = api.objects.get(item.id) as THREE.Group | undefined;
      if (!group) return;
      clearGroup(group, api.transitionRoot, api.fades, stageChangePendingRef.current);
      const presentation = getIntervitellinePresentation(item, profile, stageId);
      group.visible = (visibleLayers[item.id] ?? true) && presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      const mesh = makeVesselMesh(
        item.points,
        item.radius * presentation.radiusScale,
        item.color,
        presentation.opacity
      );
      if (mesh) {
        mesh.userData.structureId = item.id;
        mesh.userData.anastomosisId = item.id;
        group.add(mesh);
      }
      highlight(group, item.id === selectedStructure);
    });
  }, [stage, profile, visibleLayers, selectedStructure]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    PORTAL_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      clearGroup(group, api.transitionRoot, api.fades, stageChangePendingRef.current);
      const presentation = getPortalLayerPresentation(layer, profile, stageId);
      group.visible = (visibleLayers[layer.id] ?? true) && presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      layer.paths.forEach((pathItem) => {
        const mesh = makeVesselMesh(
          pathItem.points,
          layer.radius * presentation.radiusScale * (pathItem.radiusScale ?? 1),
          layer.color,
          presentation.opacity
        );
        if (!mesh) return;
        mesh.userData.structureId = layer.id;
        mesh.userData.pathId = pathItem.id;
        group.add(mesh);
      });
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage, profile, visibleLayers, selectedStructure]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    UMBILICAL_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      clearGroup(group, api.transitionRoot, api.fades, stageChangePendingRef.current);
      const presentation = getUmbilicalLayerPresentation(layer, profile, stageId);
      group.visible = (visibleLayers[layer.id] ?? true) && presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      layer.paths.forEach((pathItem) => {
        const radius = layer.radius * presentation.radiusScale * (pathItem.radiusScale ?? 1);
        const mesh = makeVesselMesh(pathItem.points, radius, layer.color, presentation.opacity);
        if (mesh) {
          mesh.userData.structureId = layer.id;
          mesh.userData.pathId = pathItem.id;
          group.add(mesh);
        }
        if (pathItem.flowArrow) {
          const arrow = makeFlowArrow(pathItem.points, layer.color, radius);
          if (arrow) {
            arrow.userData.structureId = layer.id;
            arrow.userData.pathId = pathItem.id;
            group.add(arrow);
          }
        }
      });
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage, profile, visibleLayers, selectedStructure]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    CARDINAL_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      clearGroup(group, api.transitionRoot, api.fades, stageChangePendingRef.current);
      const presentation = getCardinalLayerPresentation(layer, cardinalModel, stageId);
      group.visible = (visibleLayers[layer.id] ?? true) && presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      layer.paths.forEach((pathItem) => {
        const radius = layer.radius * presentation.radiusScale * (pathItem.radiusScale ?? 1);
        const mesh = makeVesselMesh(pathItem.points, radius, layer.color, presentation.opacity);
        if (mesh) {
          mesh.userData.structureId = layer.id;
          mesh.userData.pathId = pathItem.id;
          group.add(mesh);
        }
        if (pathItem.flowArrow) {
          const arrow = makeFlowArrow(pathItem.points, layer.color, radius);
          if (arrow) {
            arrow.userData.structureId = layer.id;
            arrow.userData.pathId = pathItem.id;
            group.add(arrow);
          }
        }
      });
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage, cardinalModel, visibleLayers, selectedStructure]);

  useEffect(() => {
    stageChangePendingRef.current = false;
  }, [stage.id, profile, cardinalModel]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    UMBILICAL_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id);
      if (group) group.visible = (visibleLayers[layer.id] ?? true) && getUmbilicalLayerPresentation(layer, profile, stageId).visible;
    });
    CARDINAL_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id);
      if (group) group.visible = (visibleLayers[layer.id] ?? true) && getCardinalLayerPresentation(layer, cardinalModel, stageId).visible;
    });
    const mesonephrosVisible = ['cs13', 'cs14', 'cs15', 'cs16'].includes(stage.id);
    for (const id of ['mesonephros-right', 'mesonephros-left']) {
      const object = api.objects.get(id);
      if (object) object.visible = (visibleLayers[id] ?? true) && mesonephrosVisible;
    }
    const liver = api.objects.get('liver');
    if (liver) liver.userData.targetScale = stage.liverScale;
    const duodenum = api.objects.get('duodenum');
    if (duodenum) duodenum.userData.targetScale = stage.duodenumScale;
    const pancreas = api.objects.get('dorsal-pancreatic-bud');
    if (pancreas) {
      pancreas.visible = (visibleLayers['dorsal-pancreatic-bud'] ?? true)
        && ['cs13', 'cs14', 'cs15', 'cs16'].includes(stage.id);
    }
    const gallbladder = api.objects.get('portal-gallbladder');
    if (gallbladder) {
      gallbladder.visible = (visibleLayers['portal-gallbladder'] ?? true)
        && ['cs14', 'cs15', 'cs16'].includes(stage.id);
    }
  }, [stage, visibleLayers]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    api.objects.forEach((object, id) => highlight(object, id === selectedStructure));
  }, [selectedStructure]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) {
      zoomStepRef.current = zoomStep;
      return;
    }
    const zoomRatio = Math.pow(0.9, zoomStep - zoomStepRef.current);
    const target = api.controls.target.clone();
    const position = api.camera.position.clone().sub(target).multiplyScalar(zoomRatio).add(target);
    startCameraTween(api, position, target, api.camera.up.clone(), 420);
    zoomStepRef.current = zoomStep;
  }, [zoomStep]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const position = viewFor(cameraPreset);
    const target = new THREE.Vector3(0, 0.45, 0);
    const up = new THREE.Vector3(0, 1, 0);
    if (cameraPreset === 'superior') up.set(0, 0, -1);
    if (cameraPreset === 'inferior') up.set(0, 0, 1);
    const destination = new THREE.Vector3(position[0], position[1], position[2]);
    destination.sub(target).multiplyScalar(Math.pow(0.9, zoomStepRef.current)).add(target);
    startCameraTween(api, destination, target, up);
  }, [cameraPreset]);

  return <div className="scene-mount" ref={mountRef} />;
}