import * as THREE from 'three';

export const ANIMATION_TIMINGS = {
  stageCrossfadeSeconds: 0.78,
  organScaleSeconds: 0.96,
  landmarkFadeSeconds: 0.58,
  cameraSeconds: 0.82,
  autoplayHoldMs: 3600,
  flowCyclesPerSecond: 0.075
} as const;

type AnimationTrack = { elapsed: number; duration: number; update: (progress: number) => void; onComplete?: () => void };
type MaterialBaseState = { opacity: number; transparent: boolean; depthWrite: boolean };
const MATERIAL_BASE_STATE = new WeakMap<THREE.Material, MaterialBaseState>();

function baseState(material: THREE.Material): MaterialBaseState {
  let state = MATERIAL_BASE_STATE.get(material);
  if (!state) {
    state = { opacity: material.opacity, transparent: material.transparent, depthWrite: material.depthWrite };
    MATERIAL_BASE_STATE.set(material, state);
  }
  return state;
}

function collectMaterials(root: THREE.Object3D): THREE.Material[] {
  const materials = new Set<THREE.Material>();
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh || !mesh.material) return;
    const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    list.forEach((material) => materials.add(material));
  });
  return [...materials];
}

function eased(progress: number): number {
  const t = THREE.MathUtils.clamp(progress, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Interruptible, keyed animation scheduler for the Three.js scene. */
export class AnimationEngine {
  private readonly tracks = new Map<string, AnimationTrack>();
  private reducedMotion: boolean;

  constructor(prefersReducedMotion = false) { this.reducedMotion = prefersReducedMotion; }
  get prefersReducedMotion(): boolean { return this.reducedMotion; }

  setReducedMotion(value: boolean): void {
    if (value === this.reducedMotion) return;
    this.reducedMotion = value;
    if (!value) return;
    const pending = [...this.tracks.values()];
    this.tracks.clear();
    pending.forEach((track) => { track.update(1); track.onComplete?.(); });
  }

  tween(key: string, duration: number, update: (progress: number) => void, onComplete?: () => void): void {
    this.cancel(key);
    if (this.reducedMotion || duration <= 0) { update(1); onComplete?.(); return; }
    const track: AnimationTrack = {
      elapsed: 0,
      duration,
      update: (progress) => update(eased(progress)),
      onComplete
    };
    this.tracks.set(key, track);
    track.update(0);
  }

  update(deltaSeconds: number): void {
    if (this.reducedMotion || this.tracks.size === 0) return;
    const delta = THREE.MathUtils.clamp(deltaSeconds, 0, 0.05);
    for (const [key, track] of [...this.tracks.entries()]) {
      if (this.tracks.get(key) !== track) continue;
      track.elapsed += delta;
      const progress = Math.min(1, track.elapsed / track.duration);
      track.update(progress);
      if (progress >= 1) { this.tracks.delete(key); track.onComplete?.(); }
    }
  }

  cancel(key: string): void { this.tracks.delete(key); }
  dispose(): void { this.tracks.clear(); }
}

export function setOpacityFactor(root: THREE.Object3D, factor: number): void {
  const scale = THREE.MathUtils.clamp(factor, 0, 1);
  collectMaterials(root).forEach((material) => {
    const base = baseState(material);
    const transparent = base.transparent || scale < 0.999;
    const depthWrite = scale < 0.999 ? false : base.depthWrite;
    if (material.transparent !== transparent || material.depthWrite !== depthWrite) material.needsUpdate = true;
    material.opacity = base.opacity * scale;
    material.transparent = transparent;
    material.depthWrite = depthWrite;
  });
}

export function fadeObject(
  engine: AnimationEngine, root: THREE.Object3D, targetFactor: number,
  duration: number, key: string, onComplete?: () => void
): void {
  const materials = collectMaterials(root);
  if (materials.length === 0) { onComplete?.(); return; }
  const target = THREE.MathUtils.clamp(targetFactor, 0, 1);
  const starts = materials.map((material) => material.opacity);
  const bases = materials.map((material) => baseState(material));
  materials.forEach((material) => {
    if (!material.transparent || material.depthWrite) material.needsUpdate = true;
    material.transparent = true;
    material.depthWrite = false;
  });
  engine.tween(key, duration, (progress) => {
    materials.forEach((material, index) => {
      const base = bases[index];
      material.opacity = THREE.MathUtils.lerp(starts[index], base.opacity * target, progress);
      const transparent = progress < 0.999 ? true : base.transparent;
      const depthWrite = progress < 0.999 ? false : base.depthWrite;
      if (material.transparent !== transparent || material.depthWrite !== depthWrite) material.needsUpdate = true;
      material.transparent = transparent;
      material.depthWrite = depthWrite;
    });
  }, onComplete);
}

export function crossFadeGroup(
  parent: THREE.Group, incoming: THREE.Group, engine: AnimationEngine,
  key: string, duration = ANIMATION_TIMINGS.stageCrossfadeSeconds
): void {
  engine.cancel(`${key}:out`);
  engine.cancel(`${key}:in`);
  const previousChildren = [...parent.children];
  if (previousChildren.length > 0) {
    const outgoing = new THREE.Group();
    outgoing.name = `${key}-outgoing`;
    previousChildren.forEach((child) => outgoing.add(child));
    parent.add(outgoing);
    fadeObject(engine, outgoing, 0, duration, `${key}:out`, () => {
      parent.remove(outgoing);
      disposeObjectTree(outgoing);
    });
  }
  incoming.name = `${key}-incoming`;
  parent.add(incoming);
  setOpacityFactor(incoming, 0);
  fadeObject(engine, incoming, 1, duration, `${key}:in`);
}

export function disposeObjectTree(root: THREE.Group): void {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    if (mesh.geometry) geometries.add(mesh.geometry);
    if (!mesh.material) return;
    const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    list.forEach((material) => materials.add(material));
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  root.clear();
}

export function tweenVector3(
  engine: AnimationEngine, key: string, target: THREE.Vector3,
  destination: THREE.Vector3, duration: number
): void {
  const start = target.clone();
  const end = destination.clone();
  engine.tween(key, duration, (progress) => target.lerpVectors(start, end, progress));
}
