import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { DevelopmentStage } from '../data/stages';
import type { StructureVisibility } from '../data/structures';

export type CameraPreset = 'anterior' | 'posterior' | 'right' | 'left' | 'superior' | 'inferior' | 'oblique' | 'reset';

interface Props {
  stage: DevelopmentStage;
  visibleLayers: StructureVisibility;
  selectedStructure: string | null;
  cameraPreset: CameraPreset;
  onSelectStructure: (id: string) => void;
}

interface SceneApi {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  objects: Map<string, THREE.Object3D>;
}

function tube(points: THREE.Vector3[], radius: number, color: string) {
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35);
  return new THREE.Mesh(
    new THREE.TubeGeometry(curve, 72, radius, 14, false),
    new THREE.MeshStandardMaterial({ color, roughness: 0.55 })
  );
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
  const shape = new THREE.Shape();
  shape.moveTo(-1.7, 0.1);
  shape.bezierCurveTo(-1.9, 0.65, -1.1, 0.85, -0.45, 0.7);
  shape.bezierCurveTo(0.35, 0.9, 1.2, 0.7, 1.75, 0.35);
  shape.bezierCurveTo(2, 0.1, 1.5, -0.15, 1.15, -0.2);
  shape.bezierCurveTo(0.5, -0.5, -0.2, -0.35, -0.7, -0.3);
  shape.bezierCurveTo(-1.3, -0.45, -1.7, -0.2, -1.7, 0.1);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.7, bevelEnabled: true, bevelSegments: 3,
    steps: 1, bevelSize: 0.07, bevelThickness: 0.09
  });
  geometry.translate(0, 0, -0.35);
  const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    color: '#b96f4d', roughness: 0.65, emissive: '#29100b', emissiveIntensity: 0.14
  }));
  mesh.position.set(0, 1.4, 0.12);
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

export default function EmbryoScene({
  stage, visibleLayers, selectedStructure, cameraPreset, onSelectStructure
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<SceneApi | null>(null);
  const selectRef = useRef(onSelectStructure);
  selectRef.current = onSelectStructure;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#07111f');
    scene.fog = new THREE.Fog('#07111f', 14, 28);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(6.2, 4.1, -7.2);
    camera.lookAt(0, 0.45, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.className = 'embryo-canvas';
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.minDistance = 4.5;
    controls.maxDistance = 18;
    controls.target.set(0, 0.45, 0);

    scene.add(new THREE.HemisphereLight('#d7e9ff', '#182332', 1.9));
    const key = new THREE.DirectionalLight('#fff0dc', 3);
    key.position.set(-4, 7, -5);
    scene.add(key);
    const rim = new THREE.DirectionalLight('#6da8d8', 2);
    rim.position.set(5, 3, 5);
    scene.add(rim);

    const objects = new Map<string, THREE.Object3D>();
    const add = (id: string, object: THREE.Object3D) => {
      object.name = id;
      object.userData.structureId = id;
      scene.add(object);
      objects.set(id, object);
    };

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
    ], 0.19, '#dcae7a'));

    add('foregut', tube([
      new THREE.Vector3(-0.55, 2.25, -0.08),
      new THREE.Vector3(-0.48, 1.88, -0.08),
      new THREE.Vector3(-0.38, 1.48, -0.1),
      new THREE.Vector3(-0.32, 1.12, -0.13),
      new THREE.Vector3(-0.18, 0.83, -0.15)
    ], 0.16, '#bd8876'));

    const yolk = new THREE.Mesh(
      new THREE.SphereGeometry(1, 40, 28),
      new THREE.MeshStandardMaterial({ color: '#c79a49', roughness: 0.72 })
    );
    yolk.scale.set(1.08, 0.86, 0.62);
    yolk.position.set(0, -2.18, -0.34);
    add('yolk-sac', yolk);

    const sinus = new THREE.Mesh(
      new THREE.SphereGeometry(0.43, 36, 24),
      new THREE.MeshStandardMaterial({ color: '#5689b8', roughness: 0.4 })
    );
    sinus.scale.set(1.35, 0.78, 0.8);
    sinus.position.set(0.12, 2.82, 0.2);
    add('sinus-venosus', sinus);

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

    const grid = new THREE.GridHelper(12, 24, '#244057', '#172b3d');
    grid.position.y = -3.1;
    grid.material.transparent = true;
    grid.material.opacity = 0.2;
    scene.add(grid);

    apiRef.current = { camera, controls, objects };

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
        .find((entry) => typeof entry.object.userData.structureId === 'string');
      if (hit) selectRef.current(hit.object.userData.structureId as string);
    };
    renderer.domElement.addEventListener('pointerdown', pointerDown);

    let frame = 0;
    const render = () => {
      frame = window.requestAnimationFrame(render);
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
    const api = apiRef.current;
    if (!api) return;
    api.objects.forEach((object, id) => { object.visible = visibleLayers[id] ?? true; });
  }, [visibleLayers]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    api.objects.get('liver')?.scale.setScalar(stage.liverScale);
    api.objects.get('duodenum')?.scale.setScalar(stage.duodenumScale);
  }, [stage]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    api.objects.forEach((object, id) => highlight(object, id === selectedStructure));
  }, [selectedStructure]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;
    const position = viewFor(cameraPreset);
    api.camera.up.set(0, 1, 0);
    if (cameraPreset === 'superior') api.camera.up.set(0, 0, -1);
    if (cameraPreset === 'inferior') api.camera.up.set(0, 0, 1);
    api.camera.position.set(position[0], position[1], position[2]);
    api.camera.lookAt(0, 0.45, 0);
    api.controls.target.set(0, 0.45, 0);
    api.controls.update();
  }, [cameraPreset]);

  return <div className="scene-mount" ref={mountRef} />;
}