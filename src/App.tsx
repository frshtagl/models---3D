import { useEffect, useState } from 'react';
import EmbryoScene from './components/EmbryoScene';
import type { CameraPreset, SceneDisplayMode } from './components/EmbryoScene';
import {
  DEVELOPMENT_STAGES,
  PROFILE_DESCRIPTIONS,
  PROFILE_LABELS
} from './data/stages';
import type { EvidenceProfile } from './data/stages';
import {
  ANATOMICAL_STRUCTURES,
  DEFAULT_VISIBILITY
} from './data/structures';
import type { StructureVisibility } from './data/structures';
import { VITELLINE_NODES, VITELLINE_SEGMENTS, VITELLINE_NETWORK_ISSUES, getVesselPresentation } from './data/vitellineNetwork';
import type { VitellineStageId } from './data/vitellineNetwork';
import { HEPATIC_VASCULAR_LAYERS, HEPATIC_VASCULAR_NODES, HEPATIC_VASCULAR_NETWORK_ISSUES, getHepaticLayerPresentation } from './data/hepaticVascularNetwork';
import { INTERVITELLINE_ANASTOMOSES, INTERVITELLINE_NETWORK_ISSUES, getIntervitellinePresentation } from './data/intervitellineNetwork';
import { PORTAL_NETWORK_ISSUES, PORTAL_NODES, PORTAL_VASCULAR_LAYERS, getPortalLayerPresentation } from './data/portalNetwork';
import { HEPATIC_OUTFLOW_LAYERS, HEPATIC_OUTFLOW_NODES, HEPATIC_OUTFLOW_NETWORK_ISSUES, getHepaticOutflowPresentation } from './data/hepaticOutflowNetwork';
import { UMBILICAL_VASCULAR_LAYERS, UMBILICAL_NODES, UMBILICAL_NETWORK_ISSUES, getUmbilicalLayerPresentation } from './data/umbilicalNetwork';
import { CARDINAL_VASCULAR_LAYERS, CARDINAL_NODES, CARDINAL_NETWORK_ISSUES, CARDINAL_MODEL_LABELS, CARDINAL_MODEL_DESCRIPTIONS, getCardinalLayerPresentation } from './data/cardinalNetwork';
import type { CardinalModel } from './data/cardinalNetwork';
import { PORTAL_TEACHING_STEPS } from './data/portalTeachingGuide';

const CAMERA_PRESETS: { id: CameraPreset; label: string }[] = [
  { id: 'anterior', label: 'Anterior' },
  { id: 'posterior', label: 'Posterior' },
  { id: 'right', label: 'Right' },
  { id: 'left', label: 'Left' },
  { id: 'superior', label: 'Superior' },
  { id: 'inferior', label: 'Inferior' }
];

export default function App() {
  const [stageIndex, setStageIndex] = useState(4);
  const [profile, setProfile] = useState<EvidenceProfile>('human-2017');
  const [cardinalModel, setCardinalModel] = useState<CardinalModel>('human-cardinal-2015');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('oblique');
  const [displayMode, setDisplayMode] = useState<SceneDisplayMode>('clean');
  const [visibleLayers, setVisibleLayers] = useState<StructureVisibility>(() => ({ ...DEFAULT_VISIBILITY }));
  const [selectedStructure, setSelectedStructure] = useState<string | null>('human-ductus-venosus');
  const [playing, setPlaying] = useState(false);
  const [teachingOpen, setTeachingOpen] = useState(false);
  const [teachingStepIndex, setTeachingStepIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [zoomStep, setZoomStep] = useState(0);

  const stage = DEVELOPMENT_STAGES[stageIndex];
  const selected = ANATOMICAL_STRUCTURES.find((item) => item.id === selectedStructure);
  const selectedVessel = VITELLINE_SEGMENTS.find((item) => item.id === selectedStructure);
  const selectedVesselPresentation = selectedVessel
    ? getVesselPresentation(selectedVessel, profile, stage.id as VitellineStageId)
    : null;
  const selectedHepaticLayer = HEPATIC_VASCULAR_LAYERS.find((item) => item.id === selectedStructure);
  const selectedHepaticPresentation = selectedHepaticLayer
    ? getHepaticLayerPresentation(selectedHepaticLayer, profile, stage.id as VitellineStageId)
    : null;
  const selectedOutflowLayer = HEPATIC_OUTFLOW_LAYERS.find((item) => item.id === selectedStructure);
  const selectedOutflowPresentation = selectedOutflowLayer
    ? getHepaticOutflowPresentation(selectedOutflowLayer, profile, stage.id as VitellineStageId)
    : null;
  const selectedAnastomosis = INTERVITELLINE_ANASTOMOSES.find((item) => item.id === selectedStructure);
  const selectedAnastomosisPresentation = selectedAnastomosis
    ? getIntervitellinePresentation(selectedAnastomosis, profile, stage.id as VitellineStageId)
    : null;
  const selectedPortalLayer = PORTAL_VASCULAR_LAYERS.find((item) => item.id === selectedStructure);
  const selectedPortalPresentation = selectedPortalLayer
    ? getPortalLayerPresentation(selectedPortalLayer, profile, stage.id as VitellineStageId)
    : null;
  const selectedUmbilicalLayer = UMBILICAL_VASCULAR_LAYERS.find((item) => item.id === selectedStructure);
  const selectedUmbilicalPresentation = selectedUmbilicalLayer
    ? getUmbilicalLayerPresentation(selectedUmbilicalLayer, profile, stage.id as VitellineStageId)
    : null;
  const selectedCardinalLayer = CARDINAL_VASCULAR_LAYERS.find((item) => item.id === selectedStructure);
  const selectedCardinalPresentation = selectedCardinalLayer
    ? getCardinalLayerPresentation(selectedCardinalLayer, cardinalModel, stage.id as VitellineStageId)
    : null;
  const networkIssues = [...VITELLINE_NETWORK_ISSUES, ...HEPATIC_VASCULAR_NETWORK_ISSUES, ...HEPATIC_OUTFLOW_NETWORK_ISSUES, ...INTERVITELLINE_NETWORK_ISSUES, ...PORTAL_NETWORK_ISSUES, ...UMBILICAL_NETWORK_ISSUES, ...CARDINAL_NETWORK_ISSUES];
  const hepaticPathCount = HEPATIC_VASCULAR_LAYERS.reduce((total, layer) => total + layer.paths.length, 0);
  const intervitellinePointCount = INTERVITELLINE_ANASTOMOSES.reduce((total, item) => total + item.points.length, 0);
  const portalPathCount = PORTAL_VASCULAR_LAYERS.reduce((total, layer) => total + layer.paths.length, 0);
  const totalGraphNodeCount = new Set([
    ...VITELLINE_NODES,
    ...HEPATIC_VASCULAR_NODES,
    ...PORTAL_NODES,
    ...HEPATIC_OUTFLOW_NODES,
    ...UMBILICAL_NODES,
    ...CARDINAL_NODES
  ].map((node) => node.id)).size;
  const outflowPathCount = HEPATIC_OUTFLOW_LAYERS.reduce((total, layer) => total + layer.paths.length, 0);
  const umbilicalPathCount = UMBILICAL_VASCULAR_LAYERS.reduce((total, layer) => total + layer.paths.length, 0);
  const cardinalPathCount = CARDINAL_VASCULAR_LAYERS.reduce((total, layer) => total + layer.paths.length, 0);
  const teachingStep = PORTAL_TEACHING_STEPS[teachingStepIndex];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStageIndex((current) => (current + 1) % DEVELOPMENT_STAGES.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  const changeVisibility = (id: string) => {
    setVisibleLayers((current) => ({ ...current, [id]: !(current[id] ?? true) }));
  };

  const showAll = () => setVisibleLayers({ ...DEFAULT_VISIBILITY });

  const isolateSelected = () => {
    if (!selectedStructure) return;
    setVisibleLayers(Object.fromEntries(
      ANATOMICAL_STRUCTURES.map((item) => [item.id, item.id === selectedStructure])
    ));
  };

  const goToStage = (index: number) => {
    setStageIndex(Math.max(0, Math.min(DEVELOPMENT_STAGES.length - 1, index)));
  };

  const applyTeachingStep = (index: number) => {
    const next = PORTAL_TEACHING_STEPS[index];
    if (!next) return;
    const nextStageIndex = DEVELOPMENT_STAGES.findIndex((item) => item.id === next.stageId);
    if (nextStageIndex < 0) return;
    setPlaying(false);
    setTeachingStepIndex(index);
    setStageIndex(nextStageIndex);
    setProfile(next.profile);
    if (next.cardinalModel) setCardinalModel(next.cardinalModel);
    setCameraPreset(next.camera);
    setSelectedStructure(next.selectedStructure);
    setVisibleLayers(Object.fromEntries(
      ANATOMICAL_STRUCTURES.map((item) => [item.id, next.visibleLayers.includes(item.id)])
    ));
    setTeachingOpen(true);
  };

  const moveTeachingStep = (direction: -1 | 1) => {
    const nextIndex = teachingStepIndex + direction;
    if (nextIndex < 0) return;
    if (nextIndex >= PORTAL_TEACHING_STEPS.length) {
      setTeachingOpen(false);
      return;
    }
    applyTeachingStep(nextIndex);
  };

  const toggleTeachingGuide = () => {
    if (teachingOpen) {
      setTeachingOpen(false);
      return;
    }
    applyTeachingStep(teachingStepIndex);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => setIsFullscreen(false));
    } else {
      void document.documentElement.requestFullscreen().catch(() => setIsFullscreen(false));
    }
  };

  const resetCamera = () => {
    setZoomStep(0);
    setCameraPreset((current) => current === 'reset' ? 'oblique' : 'reset');
  };

  useEffect(() => {
    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      if (target.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]')) return true;
      return false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      if (isEditableTarget(event.target)) return;
      if (event.target instanceof HTMLElement && event.target.closest('button')
        && (event.code === 'Space' || event.key === 'Enter')) return;

      const key = event.key.toLowerCase();

      if (key === 'escape') {
        if (shortcutsOpen) setShortcutsOpen(false);
        else if (teachingOpen) setTeachingOpen(false);
        return;
      }

      if (key === '?') {
        event.preventDefault();
        setShortcutsOpen((open) => !open);
        return;
      }

      if (shortcutsOpen) return;

      if (key === 'arrowleft') {
        event.preventDefault();
        setPlaying(false);
        goToStage(stageIndex - 1);
        return;
      }
      if (key === 'arrowright') {
        event.preventDefault();
        setPlaying(false);
        goToStage(stageIndex + 1);
        return;
      }
      if (key === 'home') {
        event.preventDefault();
        setPlaying(false);
        goToStage(0);
        return;
      }
      if (key === 'end') {
        event.preventDefault();
        setPlaying(false);
        goToStage(DEVELOPMENT_STAGES.length - 1);
        return;
      }
      if (key === ' ' || event.code === 'Space') {
        event.preventDefault();
        setPlaying((value) => !value);
        return;
      }
      if (/^[1-6]$/.test(key)) {
        event.preventDefault();
        setCameraPreset(CAMERA_PRESETS[Number(key) - 1].id);
        return;
      }
      if (key === '0' || key === 'r') {
        event.preventDefault();
        resetCamera();
        return;
      }
      if (key === '+' || key === '=') {
        event.preventDefault();
        setZoomStep((value) => Math.min(12, value + 1));
        return;
      }
      if (key === '-' || key === '_') {
        event.preventDefault();
        setZoomStep((value) => Math.max(-6, value - 1));
        return;
      }
      if (key === 'g') {
        event.preventDefault();
        toggleTeachingGuide();
        return;
      }
      if (key === 'f') {
        event.preventDefault();
        toggleFullscreen();
        return;
      }
      if (key === 'a') {
        event.preventDefault();
        showAll();
        return;
      }
      if (key === 'i') {
        event.preventDefault();
        isolateSelected();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stageIndex, shortcutsOpen, teachingOpen, teachingStepIndex, selectedStructure]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><span /><span /><span /></div>
          <div>
            <div className="brand-title">EMBRYO<span>LAB</span></div>
            <div className="brand-subtitle">VENOUS DEVELOPMENT · 3D WORKSTATION</div>
          </div>
        </div>
        <div className="topbar-right">
          <span className="status-dot" />
          <span>LOCAL INTERACTIVE MODULE</span>
          <button className="topbar-action" onClick={toggleTeachingGuide}>{teachingOpen ? 'Hide teaching guide' : 'Teaching guide'}</button>
          <button
            className="topbar-action"
            onClick={() => setShortcutsOpen((open) => !open)}
            aria-expanded={shortcutsOpen}
            aria-controls="keyboard-shortcuts"
            title="Show keyboard shortcuts (?)"
          >Shortcuts (?)</button>
          <button className="topbar-action" onClick={toggleFullscreen}>{isFullscreen ? 'Exit full screen' : 'Full screen'}</button>
          <span className="version-chip">v0.8 · REFINED VESSEL GEOMETRY</span>
        </div>
      </header>

      {shortcutsOpen && (
        <div
          className="shortcuts-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShortcutsOpen(false);
          }}
        >
          <section
            className="shortcuts-dialog"
            id="keyboard-shortcuts"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-title"
          >
            <div className="shortcuts-header">
              <div>
                <div className="eyebrow">QUICK NAVIGATION</div>
                <h2 id="shortcuts-title">Keyboard shortcuts</h2>
                <p>Navigate the stages and inspect the 3D model without reaching for the toolbar.</p>
              </div>
              <button className="teaching-close" onClick={() => setShortcutsOpen(false)} aria-label="Close keyboard shortcuts">×</button>
            </div>

            <div className="shortcut-groups">
              <div className="shortcut-group">
                <h3>Development stages</h3>
                <div className="shortcut-row"><span>Previous / next stage</span><div className="shortcut-keys"><kbd>←</kbd><kbd>→</kbd></div></div>
                <div className="shortcut-row"><span>First / last stage</span><div className="shortcut-keys"><kbd>Home</kbd><kbd>End</kbd></div></div>
                <div className="shortcut-row"><span>Play / pause sequence</span><div className="shortcut-keys"><kbd>Space</kbd></div></div>
              </div>

              <div className="shortcut-group">
                <h3>Camera and model</h3>
                <div className="shortcut-row"><span>Camera views</span><div className="shortcut-keys"><kbd>1–6</kbd></div></div>
                <div className="shortcut-row"><span>Zoom in / out</span><div className="shortcut-keys"><kbd>+</kbd><kbd>−</kbd></div></div>
                <div className="shortcut-row"><span>Reset camera and zoom</span><div className="shortcut-keys"><kbd>0</kbd><kbd>R</kbd></div></div>
                <div className="shortcut-row"><span>Show all anatomy layers</span><div className="shortcut-keys"><kbd>A</kbd></div></div>
                <div className="shortcut-row"><span>Isolate selected structure</span><div className="shortcut-keys"><kbd>I</kbd></div></div>
              </div>

              <div className="shortcut-group">
                <h3>Workspace</h3>
                <div className="shortcut-row"><span>Toggle teaching guide</span><div className="shortcut-keys"><kbd>G</kbd></div></div>
                <div className="shortcut-row"><span>Toggle full screen</span><div className="shortcut-keys"><kbd>F</kbd></div></div>
                <div className="shortcut-row"><span>Show / hide this panel</span><div className="shortcut-keys"><kbd>?</kbd></div></div>
                <div className="shortcut-row"><span>Close panel or guide</span><div className="shortcut-keys"><kbd>Esc</kbd></div></div>
              </div>
            </div>
            <p className="shortcuts-note">Shortcuts pause stage playback when you move manually. They are suspended while typing or changing a form control.</p>
          </section>
        </div>
      )}

      <main className="workspace">
        <aside className="panel left-panel">
          <div className="panel-heading">
            <div className="eyebrow">DEVELOPMENT CONTROL</div>
            <h2>Stage explorer</h2>
            <p>Move through the embryonic venous developmental sequence.</p>
          </div>

          <section className="control-section">
            <div className="section-label">EVIDENCE PROFILE</div>
            <select
              className="profile-select"
              value={profile}
              onChange={(event) => setProfile(event.target.value as EvidenceProfile)}
              aria-label="Select scientific evidence profile"
            >
              <option value="human-2017">{PROFILE_LABELS['human-2017']}</option>
              <option value="classical-2008">{PROFILE_LABELS['classical-2008']}</option>
            </select>
            <p className="profile-description">{PROFILE_DESCRIPTIONS[profile]}</p>
            <div className="profile-note">
              <span className="note-icon">i</span>
              {profile === 'human-2017' ? 'Human reconstruction: the dorsal extrahepatic intervitelline connection is shown caudal to the dorsal pancreatic bud; the smaller ventral connection is shown only at CS14. Neither is merged with the classical four-connection scheme.' : 'Classical account: three prehepatic connections (cranial ventral, middle dorsal and caudal ventral) plus a subdiaphragmatic connection are shown as a separate topology. The subhepatic connection is distinct from the human umbilico-vitelline portal-sinus shunt.'}
            </div>
          </section>

          <section className="control-section">
            <div className="section-label">CARDINAL / IVC INTERPRETATION</div>
            <select
              className="profile-select"
              value={cardinalModel}
              onChange={(event) => setCardinalModel(event.target.value as CardinalModel)}
              aria-label="Select cardinal and inferior vena cava developmental interpretation"
            >
              <option value="human-cardinal-2015">{CARDINAL_MODEL_LABELS['human-cardinal-2015']}</option>
              <option value="textbook-segmental">{CARDINAL_MODEL_LABELS['textbook-segmental']}</option>
            </select>
            <p className="profile-description">{CARDINAL_MODEL_DESCRIPTIONS[cardinalModel]}</p>
          </section>

          <section className="control-section stage-section">
            <div className="section-row">
              <div className="section-label">CARNEGIE STAGES</div>
              <span className="stage-count">{stageIndex + 1} / {DEVELOPMENT_STAGES.length}</span>
            </div>
            <div className="stage-list">
              {DEVELOPMENT_STAGES.map((item, index) => (
                <button
                  className={'stage-button' + (index === stageIndex ? ' active' : '')}
                  key={item.id}
                  onClick={() => { goToStage(index); setPlaying(false); }}
                  aria-pressed={index === stageIndex}
                >
                  <span className="stage-node">{index + 1}</span>
                  <span className="stage-button-copy">
                    <strong>{item.label}</strong>
                    <small>{item.title}</small>
                  </span>
                  {index === stageIndex && <span className="active-arrow">›</span>}
                </button>
              ))}
            </div>
            <div className="stage-navigation">
              <button className="subtle-button" onClick={() => { goToStage(stageIndex - 1); setPlaying(false); }} disabled={stageIndex === 0}>← Previous</button>
              <button className="subtle-button" onClick={() => { goToStage(stageIndex + 1); setPlaying(false); }} disabled={stageIndex === DEVELOPMENT_STAGES.length - 1}>Next →</button>
            </div>
          </section>

          <section className="control-section stage-summary">
            <div className="section-label">CURRENT DEVELOPMENT</div>
            <div className="stage-summary-title">{stage.title}</div>
            <div className="stage-age">{stage.age}</div>
            <p>{stage.summary}</p>
            <ul>
              {stage.events.map((event) => <li key={event}>{event}</li>)}
            </ul>
          </section>
        </aside>

        <section className="viewer-column">
          <div className="viewer-toolbar">
            <div>
              <div className="eyebrow">INTERACTIVE EMBRYONIC VENOUS DEVELOPMENT</div>
              <h1>Embryonic venous development <span>/ {stage.label}</span></h1>
            </div>
            <div className="camera-toolbar">
              {CAMERA_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  className={'camera-button' + (cameraPreset === preset.id ? ' active' : '')}
                  onClick={() => setCameraPreset(preset.id)}
                >
                  {preset.label}
                </button>
              ))}
              <button className="reset-button" onClick={resetCamera} title="Reset camera and zoom (0)" aria-label="Reset camera and zoom">↺</button>
            </div>
          </div>

          <div className="render-mode-toolbar" role="group" aria-label="3D render mode">
            <span className="render-mode-label">RENDER</span>
            {(['clean', 'teaching', 'network'] as const).map((mode) => (
              <button
                key={mode}
                className={'render-mode-button' + (displayMode === mode ? ' active' : '')}
                onClick={() => setDisplayMode(mode)}
                aria-pressed={displayMode === mode}
              >
                {mode === 'clean' ? 'Clean' : mode === 'teaching' ? 'Teaching' : 'Full network'}
              </button>
            ))}
          </div>

          <div className="viewport-wrap">
            <EmbryoScene
              stage={stage}
              profile={profile}
              cardinalModel={cardinalModel}
              visibleLayers={visibleLayers}
              selectedStructure={selectedStructure}
              cameraPreset={cameraPreset}
              zoomStep={zoomStep}
              displayMode={displayMode}
              onSelectStructure={setSelectedStructure}
            />
            {teachingOpen && teachingStep && (
              <section className="teaching-card" aria-live="polite" aria-label="Guided embryonic venous teaching walkthrough">
                <div className="teaching-card-header">
                  <div>
                    <div className="eyebrow">EMBRYONIC VENOUS WALKTHROUGH · STEP {teachingStepIndex + 1} / {PORTAL_TEACHING_STEPS.length}</div>
                    <div className="teaching-context">{PROFILE_LABELS[teachingStep.profile]} · {teachingStep.stageId.toUpperCase()}</div>
                  </div>
                  <button className="teaching-close" onClick={() => setTeachingOpen(false)} aria-label="Close teaching guide">×</button>
                </div>
                <div className="teaching-progress"><span style={{ width: ((teachingStepIndex + 1) / PORTAL_TEACHING_STEPS.length * 100) + '%' }} /></div>
                <h3>{teachingStep.title}</h3>
                <div className="teaching-learning-point">{teachingStep.learningPoint}</div>
                <p>{teachingStep.narration}</p>
                <div className="teaching-question"><strong>Ask the class</strong>{teachingStep.askLearners}</div>
                <div className="teaching-actions">
                  <button className="subtle-button" onClick={() => moveTeachingStep(-1)} disabled={teachingStepIndex === 0}>← Previous</button>
                  <button className="play-button" onClick={() => moveTeachingStep(1)}>{teachingStepIndex === PORTAL_TEACHING_STEPS.length - 1 ? 'Finish lesson' : 'Next lesson →'}</button>
                </div>
              </section>
            )}
            <div className="orientation-card">
              <div className="orientation-title">ANATOMICAL ORIENTATION</div>
              <div className="orientation-grid">
                <span><b>R</b> +X</span>
                <span><b>L</b> −X</span>
                <span><b>C</b> +Y</span>
                <span><b>Ca</b> −Y</span>
                <span><b>P</b> +Z</span>
                <span><b>A</b> −Z</span>
              </div>
            </div>
            <div className="viewport-legend">
              <span><i className="legend-dot right-vein-dot" /> Vitelline conduits</span>
              <span><i className="legend-dot sinusoid-dot" /> Sinusoids</span>
              <span><i className="legend-dot afferent-dot" /> Afferent</span>
              <span><i className="legend-dot efferent-dot" /> Efferent / drainage</span>
              <span><i className="legend-dot classical-iva-dot" /> Classical IVA</span>
              <span><i className="legend-dot human-iva-dot" /> Human 2017 IVA</span>
              <span><i className="legend-dot pancreas-dot" /> Dorsal pancreatic bud</span>
              <span><i className="legend-dot portal-dot" /> Portal trunk</span>
              <span><i className="legend-dot umbilical-dot" /> Left umbilical vein</span>
              <span><i className="legend-dot right-umbilical-dot" /> Right umbilical vein</span>
              <span><i className="legend-dot cardinal-dot" /> Cardinal veins</span>
              <span><i className="legend-dot subcardinal-dot" /> Subcardinal system</span>
              <span><i className="legend-dot portal-sinus-dot" /> Portal sinus</span>
              <span><i className="legend-dot portal-branch-dot" /> Portal branches</span>
              <span><i className="legend-dot ductus-dot" /> Ductus venosus / venous duct</span>
              <span><i className="legend-dot terminal-hepatic-dot" /> Terminal hepatic veins</span>
              <span><i className="legend-dot flow-arrow-dot" /> Flow direction</span>
            </div>
            <div className="scene-instruction">DRAG TO ORBIT <span>·</span> SCROLL TO ZOOM <span>·</span> RIGHT-DRAG TO PAN</div>
            <div className="schematic-stamp">SCHEMATIC · NOT TO SCALE</div>
          </div>

          <div className="timeline-panel">
            <div className="timeline-header">
              <div>
                <div className="section-label">DEVELOPMENTAL TIMELINE</div>
                <strong>{stage.carnegieStage}</strong>
              </div>
              <div className="timeline-actions">
                <button className="play-button" onClick={() => setPlaying((value) => !value)}>
                  {playing ? 'Ⅱ Pause' : '▶ Play stages'}
                </button>
                <button className="subtle-button" onClick={() => { setStageIndex(0); setPlaying(false); }}>Restart</button>
              </div>
            </div>
            <input
              className="stage-range"
              type="range"
              min="0"
              max={DEVELOPMENT_STAGES.length - 1}
              step="1"
              value={stageIndex}
              onChange={(event) => { setStageIndex(Number(event.target.value)); setPlaying(false); }}
              aria-label="Developmental stage timeline"
            />
            <div className="timeline-ticks">
              {DEVELOPMENT_STAGES.map((item, index) => (
                <button key={item.id} className={index === stageIndex ? 'current' : ''} onClick={() => { goToStage(index); setPlaying(false); }}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="panel right-panel">
          <div className="panel-heading">
            <div className="eyebrow">MODEL INSPECTOR</div>
            <h2>Anatomy layers</h2>
            <p>Select a structure in the scene or from this list.</p>
          </div>

          <div className="layer-actions">
            <button className="subtle-button" onClick={showAll}>Show all</button>
            <button className="subtle-button" onClick={isolateSelected} disabled={!selectedStructure}>Isolate selected</button>
          </div>

          <div className="structure-list">
            {ANATOMICAL_STRUCTURES.map((item) => (
              <div className={'structure-row' + (selectedStructure === item.id ? ' selected' : '')} key={item.id}>
                <button className="structure-select" onClick={() => setSelectedStructure(item.id)}>
                  <span className="structure-swatch" style={{ backgroundColor: item.color }} />
                  <span className="structure-copy">
                    <strong>{item.shortName}</strong>
                    <small>{item.status}</small>
                  </span>
                </button>
                <label className="visibility-toggle" title={'Toggle ' + item.name}>
                  <input type="checkbox" checked={visibleLayers[item.id] ?? true} onChange={() => changeVisibility(item.id)} />
                  <span />
                </label>
              </div>
            ))}
          </div>

          <section className="inspector-card">
            <div className="section-label">SELECTED STRUCTURE</div>
            {selected ? (
              <>
                <div className="inspector-title">{selected.name}</div>
                <span className="category-tag">{selected.category}</span>
                <p>{selected.description}</p>
                {selectedVessel && selectedVesselPresentation && (
                  <div className="vessel-state-card">
                    <div className="section-label">DEVELOPMENTAL STATE</div>
                    <strong>{selectedVesselPresentation.statusLabel}</strong>
                    <small>{selectedVessel.side} side · {selectedVessel.region.replace('-', ' ')}</small>
                  </div>
                )}
                {selectedHepaticLayer && selectedHepaticPresentation && (
                  <>
                    <div className="vessel-state-card">
                      <div className="section-label">DEVELOPMENTAL STATE</div>
                      <strong>{selectedHepaticPresentation.statusLabel}</strong>
                      <small>{selectedHepaticLayer.kind.replace(/-/g, ' ')} · {selectedHepaticLayer.paths.length} schematic paths</small>
                    </div>
                    <p className="evidence-note">{selectedHepaticLayer.evidence[profile]}</p>
                    <div className="source-meta">Evidence register: {selectedHepaticLayer.sourceIds.join(' · ')}</div>
                  </>
                )}
                {selectedOutflowLayer && selectedOutflowPresentation && (
                  <>
                    <div className="vessel-state-card">
                      <div className="section-label">DEVELOPMENTAL STATE</div>
                      <strong>{selectedOutflowPresentation.statusLabel}</strong>
                      <small>{selectedOutflowLayer.profile === 'classical-2008' ? 'Classical teaching model · 2008' : 'Human reconstruction · 2017 / 2024'} · {selectedOutflowLayer.paths.length} path(s)</small>
                    </div>
                    <div className="inspector-meta">
                      <span>Evidence profile</span>
                      <strong>{PROFILE_LABELS[profile]}</strong>
                    </div>
                    <p className="evidence-note">{selectedOutflowLayer.evidence[profile]}</p>
                    {selectedOutflowLayer.postnatalFate && (
                      <div className="postnatal-fate-note">
                        <strong>Postnatal fate</strong>
                        <span>{selectedOutflowLayer.postnatalFate}</span>
                      </div>
                    )}
                    <div className="source-meta">Evidence register: {selectedOutflowLayer.sourceIds.join(' · ')}</div>
                  </>
                )}
                {selectedAnastomosis && selectedAnastomosisPresentation && (
                  <>
                    <div className="vessel-state-card">
                      <div className="section-label">DEVELOPMENTAL STATE</div>
                      <strong>{selectedAnastomosisPresentation.statusLabel}</strong>
                      <small>{selectedAnastomosis.profile === 'classical-2008' ? 'Classical teaching model · 2008' : 'Human 3D reconstruction · 2017'} · {selectedAnastomosis.points.length} centre-line points</small>
                    </div>
                    <div className="inspector-meta">
                      <span>Topological position</span>
                      <strong>{selectedAnastomosis.topologyRole}</strong>
                    </div>
                    <p className="evidence-note">{selectedAnastomosis.evidence[profile]}</p>
                    <div className="source-meta">Evidence register: {selectedAnastomosis.sourceIds.join(' · ')}</div>
                  </>
                )}
                {selectedPortalLayer && selectedPortalPresentation && (
                  <>
                    <div className="vessel-state-card">
                      <div className="section-label">DEVELOPMENTAL STATE</div>
                      <strong>{selectedPortalPresentation.statusLabel}</strong>
                      <small>{selectedPortalLayer.profile === 'both' ? 'Shared context layer' : selectedPortalLayer.profile === 'classical-2008' ? 'Classical teaching model · 2008' : 'Human 3D reconstruction · 2017'} · {selectedPortalLayer.paths.length} path(s)</small>
                    </div>
                    <div className="inspector-meta">
                      <span>Evidence profile</span>
                      <strong>{PROFILE_LABELS[profile]}</strong>
                    </div>
                    <p className="evidence-note">{selectedPortalLayer.evidence[profile]}</p>
                    <div className="source-meta">Evidence register: {selectedPortalLayer.sourceIds.join(' · ')}</div>
                    {selectedPortalLayer.postnatalFate && (
                      <div className="postnatal-fate-note">
                        <strong>Postnatal fate</strong>
                        <span>{selectedPortalLayer.postnatalFate}</span>
                      </div>
                    )}
                  </>
                )}
                {selectedUmbilicalLayer && selectedUmbilicalPresentation && (
                  <>
                    <div className="vessel-state-card">
                      <div className="section-label">DEVELOPMENTAL STATE</div>
                      <strong>{selectedUmbilicalPresentation.statusLabel}</strong>
                      <small>{selectedUmbilicalLayer.paths.length} path(s) · paired umbilical system</small>
                    </div>
                    <p className="evidence-note">{selectedUmbilicalLayer.evidence[profile]}</p>
                    {selectedUmbilicalLayer.postnatalFate && (
                      <div className="postnatal-fate-note">
                        <strong>Postnatal fate</strong>
                        <span>{selectedUmbilicalLayer.postnatalFate}</span>
                      </div>
                    )}
                    <div className="source-meta">Evidence register: {selectedUmbilicalLayer.sourceIds.join(' · ')}</div>
                  </>
                )}
                {selectedCardinalLayer && selectedCardinalPresentation && (
                  <>
                    <div className="vessel-state-card">
                      <div className="section-label">DEVELOPMENTAL STATE</div>
                      <strong>{selectedCardinalPresentation.statusLabel}</strong>
                      <small>{CARDINAL_MODEL_LABELS[cardinalModel]} · {selectedCardinalLayer.paths.length} path(s)</small>
                    </div>
                    <p className="evidence-note">{selectedCardinalLayer.evidence[cardinalModel]}</p>
                    <div className="source-meta">Evidence register: {selectedCardinalLayer.sourceIds.join(' · ')}</div>
                  </>
                )}
                <div className="inspector-meta">
                  <span>Stage context</span>
                  <strong>{stage.label}</strong>
                </div>
              </>
            ) : (
              <p className="empty-selection">Choose a structure to inspect its role and spatial context.</p>
            )}
          </section>

          <section className="inspector-card milestone-card">
            <div className="section-label">NETWORK VALIDATION</div>
            <div className="scope-status">
              <span className={networkIssues.length === 0 ? 'status-dot' : 'status-dot warning-dot'} />
              {networkIssues.length === 0 ? 'Vessel graph checks passed' : networkIssues.length + ' graph issues found'}
            </div>
            <p>{VITELLINE_SEGMENTS.length} vitelline segments · {HEPATIC_VASCULAR_LAYERS.length} hepatic layers · {hepaticPathCount} hepatic paths · {INTERVITELLINE_ANASTOMOSES.length} intervitelline connections · {PORTAL_VASCULAR_LAYERS.length} portal layers · {portalPathCount} portal paths · {HEPATIC_OUTFLOW_LAYERS.length} hepatic-outflow layers · {outflowPathCount} outflow paths · {UMBILICAL_VASCULAR_LAYERS.length} umbilical layers · {umbilicalPathCount} umbilical paths · {CARDINAL_VASCULAR_LAYERS.length} cardinal layers · {cardinalPathCount} cardinal paths · {intervitellinePointCount} IVA points · {totalGraphNodeCount} unique venous graph nodes.</p>
            <p>Classical and human portal-sinus pathways remain separate. Classical and human ductus-venosus routes remain separate. The cardinal-model selector keeps the 2015 human reconstruction apart from the conventional supracardinal four-segment IVC interpretation.</p>
            {networkIssues.length > 0 && (
              <ul className="network-issues">{networkIssues.map((issue) => <li key={issue}>{issue}</li>)}</ul>
            )}
            <div className="scope-progress"><span /></div>
            <div className="scope-foot"><span>Milestone 8 · vessel geometry refinement</span><strong>IMPLEMENTED</strong></div>
          </section>
        </aside>
      </main>

      <footer className="app-footer">
        <span>EMBRYOLAB <b>·</b> EMBRYONIC VENOUS DEVELOPMENT</span>
        <span>Human development · Evidence-aware · Procedural reference geometry</span>
        <span>Development build 0.8.0</span>
      </footer>
    </div>
  );
}