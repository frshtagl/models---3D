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
import { ANIMATION_TIMINGS, AnimationEngine, crossFadeGroup, fadeObject, tweenVector3 } from '../animation/AnimationEngine';

const FLOW_AXIS = new THREE.Vector3(0, 1, 0);

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

interface SceneApi {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  objects: Map<string, THREE.Object3D>;
  animator: AnimationEngine;
  flowMarkers: Set<THREE.Mesh>;
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
  const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)), false, VESSEL_RENDER_CONFIG.curveType);
  const position = curve.getPointAt(0.72);
  const direction = curve.getTangentAt(0.72).normalize();
  if (direction.lengthSq() < 1e-8) return null;
  const height = Math.max(radius * 1.55, 0.04);
  const arrow = new THREE.Mesh(
    new THREE.ConeGeometry(Math.max(radius * 0.82, 0.014), height, 12, 1),
    new THREE.MeshPhysicalMaterial({
      color, roughness: 0.72, metalness: 0, clearcoat: 0.035,
      emissive: '#000000', emissiveIntensity: 0
    })
  );
  arrow.position.copy(position).addScaledVector(direction, height * 0.08);
  arrow.quaternion.setFromUnitVectors(FLOW_AXIS, direction);
  arrow.userData.flowMarker = true;
  arrow.userData.flowCurve = curve;
  arrow.userData.flowSpeed = ANIMATION_TIMINGS.flowCyclesPerSecond;
  arrow.userData.flowOffset = (Math.abs(points[0][0]) * 0.173 + points.length * 0.071) % 1;
  arrow.userData.flowPosition = new THREE.Vector3();
  arrow.userData.flowTangent = new THREE.Vector3();
  return arrow;
}

export default function EmbryoScene({
  stage, profile, cardinalModel, visibleLayers, selectedStructure, cameraPreset, zoomStep, onSelectStructure
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<SceneApi | null>(null);
  const zoomStepRef = useRef(0);
  const selectRef = useRef(onSelectStructure);
  selectRef.current = onSelectStructure;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animator = new AnimationEngine(motionPreference.matches);
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => animator.setReducedMotion(event.matches);
    motionPreference.addEventListener('change', onMotionPreferenceChange);

    const scene = new THREE.Scene();
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
    const cancelCameraAnimation = () => animator.cancel('camera:preset');
    controls.addEventListener('start', cancelCameraAnimation);
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
    const flowMarkers = new Set<THREE.Mesh>();
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

    apiRef.current = { camera, controls, objects, animator, flowMarkers };

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

    const clock = new THREE.Clock();
    let elapsedSeconds = 0;
    let frame = 0;
    const render = () => {
      frame = window.requestAnimationFrame(render);
      const deltaSeconds = Math.min(clock.getDelta(), 0.05);
      animator.update(deltaSeconds);
      elapsedSeconds += deltaSeconds;
      if (!animator.prefersReducedMotion) {
        for (const marker of flowMarkers) {
          if (!marker.parent) { flowMarkers.delete(marker); continue; }
          if (!marker.visible) continue;
          const curve = marker.userData.flowCurve as THREE.CatmullRomCurve3 | undefined;
          const position = marker.userData.flowPosition as THREE.Vector3 | undefined;
          const tangent = marker.userData.flowTangent as THREE.Vector3 | undefined;
          if (!curve || !position || !tangent) continue;
          const speed = (marker.userData.flowSpeed as number | undefined) ?? ANIMATION_TIMINGS.flowCyclesPerSecond;
          const offset = (marker.userData.flowOffset as number | undefined) ?? 0;
          const progress = (elapsedSeconds * speed + offset) % 1;
          curve.getPointAt(progress, position);
          curve.getTangentAt(progress, tangent).normalize();
          marker.position.copy(position);
          marker.quaternion.setFromUnitVectors(FLOW_AXIS, tangent);
        }
      }
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', pointerDown);
      controls.removeEventListener('start', cancelCameraAnimation);
      controls.dispose();
      animator.dispose();
      motionPreference.removeEventListener('change', onMotionPreferenceChange);
      flowMarkers.clear();
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
    const api = apiRef.current;
    if (!api) return;
    api.objects.forEach((object, id) => {
      const layerVisible = visibleLayers[id] ?? true;
      object.userData.layerVisible = layerVisible;
      const stageVisible = object.userData.stageVisible !== false;
      if (!layerVisible) object.visible = false;
      else if (stageVisible) object.visible = true;
    });
  }, [visibleLayers]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    VITELLINE_SEGMENTS.forEach((segment) => {
      const group = api.objects.get(segment.id) as THREE.Group | undefined;
      if (!group) return;
      const next = new THREE.Group();
      const presentation = getVesselPresentation(segment, profile, stageId);
      next.visible = presentation.visible;
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
        next.add(mesh);
      });
      crossFadeGroup(group, next, api.animator, `vitelline:${segment.id}`);
      highlight(group, segment.id === selectedStructure);
    });
  }, [stage.id, profile]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    HEPATIC_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      const next = new THREE.Group();
      const presentation = getHepaticLayerPresentation(layer, profile, stageId);
      next.visible = presentation.visible;
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
        next.add(mesh);
      });
      crossFadeGroup(group, next, api.animator, `hepatic:${layer.id}`);
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage.id, profile]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    HEPATIC_OUTFLOW_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      const next = new THREE.Group();
      const presentation = getHepaticOutflowPresentation(layer, profile, stageId);
      next.visible = presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      layer.paths.forEach((pathItem) => {
        const radius = layer.radius * presentation.radiusScale * (pathItem.radiusScale ?? 1);
        const mesh = makeVesselMesh(pathItem.points, radius, layer.color, presentation.opacity);
        if (mesh) {
          mesh.userData.structureId = layer.id;
          mesh.userData.pathId = pathItem.id;
          next.add(mesh);
        }
        if (pathItem.flowArrow) {
          const arrow = makeFlowArrow(pathItem.points, layer.color, radius);
          if (arrow) {
            arrow.userData.structureId = layer.id;
            arrow.userData.pathId = pathItem.id;
            next.add(arrow);
            api.flowMarkers.add(arrow);
          }
        }
      });
      crossFadeGroup(group, next, api.animator, `hepatic-outflow:${layer.id}`);
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage.id, profile]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    INTERVITELLINE_ANASTOMOSES.forEach((item) => {
      const group = api.objects.get(item.id) as THREE.Group | undefined;
      if (!group) return;
      const next = new THREE.Group();
      const presentation = getIntervitellinePresentation(item, profile, stageId);
      next.visible = presentation.visible;
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
        next.add(mesh);
      }
      crossFadeGroup(group, next, api.animator, `intervitelline:${item.id}`);
      highlight(group, item.id === selectedStructure);
    });
  }, [stage.id, profile]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    PORTAL_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      const next = new THREE.Group();
      const presentation = getPortalLayerPresentation(layer, profile, stageId);
      next.visible = presentation.visible;
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
        next.add(mesh);
      });
      crossFadeGroup(group, next, api.animator, `portal:${layer.id}`);
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage.id, profile]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    UMBILICAL_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      const next = new THREE.Group();
      const presentation = getUmbilicalLayerPresentation(layer, profile, stageId);
      next.visible = presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      layer.paths.forEach((pathItem) => {
        const radius = layer.radius * presentation.radiusScale * (pathItem.radiusScale ?? 1);
        const mesh = makeVesselMesh(pathItem.points, radius, layer.color, presentation.opacity);
        if (mesh) {
          mesh.userData.structureId = layer.id;
          mesh.userData.pathId = pathItem.id;
          next.add(mesh);
        }
        if (pathItem.flowArrow) {
          const arrow = makeFlowArrow(pathItem.points, layer.color, radius);
          if (arrow) {
            arrow.userData.structureId = layer.id;
            arrow.userData.pathId = pathItem.id;
            next.add(arrow);
            api.flowMarkers.add(arrow);
          }
        }
      });
      crossFadeGroup(group, next, api.animator, `umbilical:${layer.id}`);
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage.id, profile]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const stageId = stage.id as VitellineStageId;
    CARDINAL_VASCULAR_LAYERS.forEach((layer) => {
      const group = api.objects.get(layer.id) as THREE.Group | undefined;
      if (!group) return;
      const next = new THREE.Group();
      const presentation = getCardinalLayerPresentation(layer, cardinalModel, stageId);
      next.visible = presentation.visible;
      group.userData.vesselState = presentation.state;
      group.userData.statusLabel = presentation.statusLabel;
      layer.paths.forEach((pathItem) => {
        const radius = layer.radius * presentation.radiusScale * (pathItem.radiusScale ?? 1);
        const mesh = makeVesselMesh(pathItem.points, radius, layer.color, presentation.opacity);
        if (mesh) {
          mesh.userData.structureId = layer.id;
          mesh.userData.pathId = pathItem.id;
          next.add(mesh);
        }
        if (pathItem.flowArrow) {
          const arrow = makeFlowArrow(pathItem.points, layer.color, radius);
          if (arrow) {
            arrow.userData.structureId = layer.id;
            arrow.userData.pathId = pathItem.id;
            next.add(arrow);
            api.flowMarkers.add(arrow);
          }
        }
      });
      crossFadeGroup(group, next, api.animator, `cardinal:${layer.id}`);
      highlight(group, layer.id === selectedStructure);
    });
  }, [stage.id, cardinalModel]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;

    const animateScale = (id: string, value: number) => {
      const object = api.objects.get(id);
      if (!object) return;
      tweenVector3(
        api.animator,
        `organ-scale:${id}`,
        object.scale,
        new THREE.Vector3(value, value, value),
        ANIMATION_TIMINGS.organScaleSeconds
      );
    };

    const transitionStageVisibility = (id: string, stageVisible: boolean) => {
      const object = api.objects.get(id);
      if (!object) return;
      object.userData.stageVisible = stageVisible;
      const layerVisible = object.userData.layerVisible !== false;
      if (stageVisible) object.visible = layerVisible;
      else if (layerVisible) object.visible = true;
      fadeObject(
        api.animator,
        object,
        stageVisible ? 1 : 0,
        ANIMATION_TIMINGS.landmarkFadeSeconds,
        `stage-visibility:${id}`,
        () => { if (object.userData.stageVisible === false) object.visible = false; }
      );
    };

    animateScale('liver', stage.liverScale);
    animateScale('duodenum', stage.duodenumScale);
    const mesonephrosVisible = ['cs13', 'cs14', 'cs15', 'cs16'].includes(stage.id);
    transitionStageVisibility('mesonephros-right', mesonephrosVisible);
    transitionStageVisibility('mesonephros-left', mesonephrosVisible);
    transitionStageVisibility('dorsal-pancreatic-bud', mesonephrosVisible);
    const gallbladderVisible = ['cs14', 'cs15', 'cs16'].includes(stage.id);
    transitionStageVisibility('portal-gallbladder', gallbladderVisible);
  }, [stage.id]);

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
    api.camera.position.sub(api.controls.target).multiplyScalar(zoomRatio).add(api.controls.target);
    api.controls.update();
    zoomStepRef.current = zoomStep;
  }, [zoomStep]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const target = new THREE.Vector3(0, 0.45, 0);
    const position = viewFor(cameraPreset);
    const destination = new THREE.Vector3(position[0], position[1], position[2]);
    destination.sub(target).multiplyScalar(Math.pow(0.9, zoomStepRef.current)).add(target);
    const up = new THREE.Vector3(0, 1, 0);
    if (cameraPreset === 'superior') up.set(0, 0, -1);
    if (cameraPreset === 'inferior') up.set(0, 0, 1);
    const startPosition = api.camera.position.clone();
    const startTarget = api.controls.target.clone();
    const startUp = api.camera.up.clone();
    api.animator.tween('camera:preset', ANIMATION_TIMINGS.cameraSeconds, (progress) => {
      api.camera.position.lerpVectors(startPosition, destination, progress);
      api.controls.target.lerpVectors(startTarget, target, progress);
      api.camera.up.lerpVectors(startUp, up, progress).normalize();
      api.camera.lookAt(api.controls.target);
      api.controls.update();
    });
  }, [cameraPreset]);

  return <div className="scene-mount" ref={mountRef} />;
}