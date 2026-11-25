import { useEffect, useState } from 'react';
import EmbryoScene from './components/EmbryoScene';
import type { CameraPreset } from './components/EmbryoScene';
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

const CAMERA_PRESETS: { id: CameraPreset; label: string }[] = [
  { id: 'anterior', label: 'Anterior' },
  { id: 'posterior', label: 'Posterior' },
  { id: 'right', label: 'Right' },
  { id: 'left', label: 'Left' },
  { id: 'superior', label: 'Superior' },
  { id: 'inferior', label: 'Inferior' }
];

export default function App() {
  const [stageIndex, setStageIndex] = useState(0);
  const [profile, setProfile] = useState<EvidenceProfile>('human-2017');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('oblique');
  const [visibleLayers, setVisibleLayers] = useState<StructureVisibility>(() => ({ ...DEFAULT_VISIBILITY }));
  const [selectedStructure, setSelectedStructure] = useState<string | null>('liver');
  const [playing, setPlaying] = useState(false);

  const stage = DEVELOPMENT_STAGES[stageIndex];
  const selected = ANATOMICAL_STRUCTURES.find((item) => item.id === selectedStructure);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStageIndex((current) => (current + 1) % DEVELOPMENT_STAGES.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [playing]);

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
          <span className="version-chip">v0.1 · BLOCKOUT</span>
        </div>
      </header>

      <main className="workspace">
        <aside className="panel left-panel">
          <div className="panel-heading">
            <div className="eyebrow">DEVELOPMENT CONTROL</div>
            <h2>Stage explorer</h2>
            <p>Move through the early hepatic developmental sequence.</p>
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
              Profile selection is a scientific data scaffold in this milestone. Detailed vessel graphs are added in later milestones.
            </div>
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
              <div className="eyebrow">3D ANATOMICAL BLOCKOUT</div>
              <h1>Hepatic region <span>/ {stage.label}</span></h1>
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
              <button className="reset-button" onClick={() => setCameraPreset('reset')} title="Reset camera" aria-label="Reset camera">↺</button>
            </div>
          </div>

          <div className="viewport-wrap">
            <EmbryoScene
              stage={stage}
              visibleLayers={visibleLayers}
              selectedStructure={selectedStructure}
              cameraPreset={cameraPreset}
              onSelectStructure={setSelectedStructure}
            />
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
              <span><i className="legend-dot liver-dot" /> Hepatic region</span>
              <span><i className="legend-dot gut-dot" /> Gut reference</span>
              <span><i className="legend-dot venous-dot" /> Venous pole</span>
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
            <div className="section-label">MILESTONE 1 SCOPE</div>
            <div className="scope-status"><span className="status-dot" /> Reference anatomy blockout</div>
            <p>Vessel paths are intentionally not shown yet. First we verify the gut, hepatic region, venous pole and orientation in 3D.</p>
            <div className="scope-progress"><span /></div>
            <div className="scope-foot"><span>3D foundation</span><strong>IN PROGRESS</strong></div>
          </section>
        </aside>
      </main>

      <footer className="app-footer">
        <span>EMBRYOLAB <b>·</b> VITELLINE VEIN MODULE</span>
        <span>Human development · Evidence-aware · Procedural reference geometry</span>
        <span>Development build 0.1.0</span>
      </footer>
    </div>
  );
}