# Interactive Embryonic Venous Development Laboratory — Architecture

**Status:** Original Milestone 0 architecture proposal; the React / TypeScript / Vite / Three.js browser workstation is now implemented through Milestone 5  
**Repository:** frshtagl/models---3D  
**Initial module:** Vitelline veins  
**Future modules:** Umbilical veins, cardinal veins

## 1. Product architecture

Build one reusable 3D embryology workstation with modular anatomy datasets. Each venous family is a module that plugs into a shared viewer, timeline, selection system, lineage engine, evidence registry and assessment framework.

The first module now demonstrates the shared core with vitelline, hepatic and portal pathways. Full umbilical and cardinal venous families remain separate future modules.

## 2. Proposed technology

Recommended first implementation:
- React + TypeScript + Vite for the browser application;
- Three.js for mesh geometry, camera, raycasting and GLB/glTF export;
- React Three Fiber only if it simplifies React lifecycle and scene composition;
- Drei only for useful camera / controls / helper components;
- Zustand or React context for simple, explicit application state;
- Vitest for unit tests;
- Playwright for browser interaction tests;
- ESLint and TypeScript strict mode;
- GitHub Actions for lint, type-check, tests and production build.

Do not introduce VTK.js in the initial module. VTK is appropriate later if the project needs volumetric medical-image data, segmentation volumes or scientific visualization workflows. For procedural vessels, organs and landmarks, Three.js is the simpler fit.

## 3. Proposed repository structure

    /
    ├── README.md
    ├── CHANGELOG.md
    ├── LICENSE
    ├── docs/
    │   ├── prompts/
    │   │   └── VITELLINE_VEINS_MASTER_PROMPT.md
    │   ├── anatomy/
    │   │   └── vitelline-veins/
    │   │       ├── DEVELOPMENTAL_SPEC.md
    │   │       ├── FATE_MAP.md
    │   │       ├── EVIDENCE_AND_VARIANTS.md
    │   │       └── REFERENCES.md
    │   ├── architecture/
    │   │   ├── COORDINATE_SYSTEM.md
    │   │   └── PROJECT_ARCHITECTURE.md
    │   └── milestones/
    │       └── MILESTONE_0_REPORT.md
    ├── public/
    │   └── models/
    │       └── vitelline/
    ├── src/
    │   ├── app/
    │   ├── core/
    │   │   ├── anatomy/
    │   │   ├── geometry/
    │   │   ├── lineage/
    │   │   ├── stages/
    │   │   ├── evidence/
    │   │   └── interaction/
    │   ├── modules/
    │   │   └── vitelline/
    │   │       ├── data/
    │   │       ├── geometry/
    │   │       ├── stages/
    │   │       └── tests/
    │   ├── components/
    │   ├── state/
    │   └── styles/
    ├── tests/
    │   ├── unit/
    │   └── e2e/
    └── .github/
        └── workflows/
            └── ci.yml

The tree is a target structure, not a claim that these directories already exist. Create code folders only when their milestone begins.

## 4. Reusable anatomy data model

The anatomy data must be separate from React components and mesh rendering.

### Structure record

Each anatomical item should include:
- stable ID;
- display name and synonyms;
- structure type (vessel, organ, landmark, context);
- venous family / lineage family;
- laterality (right, left, midline, bilateral, not applicable);
- source-profile membership;
- source references;
- stage-specific state;
- geometry reference or procedural path definition;
- start / end nodes and explicit connections;
- predecessor / precursor IDs;
- adult / fetal derivative IDs;
- fate classification;
- flow direction where applicable;
- concise educational description;
- evidence note and confidence label.

### Developmental stage record

Each stage should include:
- stable stage ID;
- Carnegie stage and source-specific age range;
- stage title;
- source-profile ID;
- landmark transforms;
- structure state overrides;
- active connections;
- flow direction;
- key changes (appears, enlarges, remodels, regresses, persists);
- learning objective;
- citations.

### Evidence profile record

At minimum:
- classical-vestigial-2008
- human-reconstruction-2017

Each profile must own its own stage-specific vessel graph. Shared data may be reused only where the anatomy is actually shared. Do not use one profile's connection topology to fill gaps in another.

### Geometry record

A vessel geometry record should store:
- centerline control points;
- local coordinate frame;
- radius profile;
- taper settings;
- connection-node IDs;
- source stage / profile;
- schematic-versus-measured flag.

A GLB is an export artifact. Editable centerline and metadata remain the source of truth.

## 5. State and animation architecture

Keep anatomy state separate from animation time.

- A stage selection determines which anatomical structures and connections exist in the selected teaching model.
- Playback interpolates only between approved stage states.
- Pause freezes the current interpolation and preserves selection.
- A user may inspect a vessel while animation is paused.
- Regression must change the named segment's state and appearance; do not hide an entire parent vessel group.
- The same segment ID may persist across stages, but its geometry can change through stage-specific path data.

## 6. Interaction architecture

Shared interactions:
- orbit, pan, zoom, reset;
- anatomical camera presets;
- select / hover / isolate;
- structure tree and layer toggles;
- transparency and cutaway;
- stage timeline and playback;
- flow arrows;
- lineage tracing;
- model-profile selection and comparison;
- quiz and label-hide mode.

No inert UI controls. Every visible control must have an acceptance test.

## 7. Testing strategy

### Unit tests
- vessel graph connection integrity;
- unique stable IDs;
- valid stage references;
- no missing source IDs;
- allowed state and fate values;
- profile-specific connections;
- regression-state transitions;
- valid geometry path endpoints;
- lineage graph has no accidental cycles.

### Geometry tests
- right and left orientation;
- dorsal / ventral depth constraints;
- no disconnected intended anastomoses;
- no unconnected accidental vessel ends;
- stage-specific presence / absence.

### Browser tests
- application loads without console errors;
- camera controls work;
- anatomical presets preserve handedness;
- structure selection opens the correct details;
- stage navigation updates anatomy;
- profile switch updates the correct graph;
- visibility and isolate toggles work;
- pause / play / next / previous work;
- mobile/tablet panels remain usable.

### Visual regression
Capture consistent views for each stage and each evidence profile. Screenshots must include the stage name, profile name and orientation widget.

## 8. Git workflow

- Keep main as the stable baseline.
- Implement on feature/vitelline-veins-3d.
- Commit verified documentation and milestones separately.
- Use atomic messages such as “docs: add vitelline developmental specification”.
- Never force-push or overwrite user work.
- A release tag is permitted only after the full acceptance checklist passes.
- Do not claim a feature works until it has been run in a browser and tested.

## 9. Future module compatibility

The core anatomy viewer must not hard-code vitelline-specific assumptions. Future umbilical and cardinal modules should supply their own:
- structures;
- developmental stages;
- evidence profiles;
- geometry paths;
- lineage and fate relationships;
- references;
- quizzes.

They should reuse the same renderer, stage engine, selection UI, camera, evidence display, and tests.