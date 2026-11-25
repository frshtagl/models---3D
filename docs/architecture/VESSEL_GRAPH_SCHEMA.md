# Vessel Graph Schema

## Purpose

The graph is the source of truth for all embryonic vessel geometry. Three.js meshes are generated from graph data and must never become the only editable anatomy representation.

## Data structures

    interface VesselNode {
      id: string;
      label: string;
      position: readonly [number, number, number];
      description: string;
      terminal?: boolean;
    }

    interface VesselSegment {
      id: string;
      name: string;
      side: 'right' | 'left';
      region: 'yolk-sac-root' | 'extrahepatic' | 'intrahepatic' | 'hepatocardiac';
      fromNode: string;
      toNode: string;
      points: readonly (readonly [number, number, number])[];
      radius: number;
      color: string;
      description: string;
      states: Record<EvidenceProfile, Record<VitellineStageId, VesselState>>;
    }

## Invariants

1. Segment IDs remain stable across developmental stages.
2. Each segment has an explicit start and end node.
3. Consecutive segments on one continuous named channel share the same node ID.
4. Right and left channels remain distinct unless a source-supported anastomosis is explicitly added.
5. Every profile and stage has a declared vessel state.
6. A regressing vessel is not silently deleted from the source graph.
7. “Not distinct as a large conduit” is not synonymous with “no vascular channels remain.”
8. Centerline points use the canonical project axes: +X embryonic right, +Y cranial, +Z dorsal.
9. Mesh radius and normalized coordinates are explanatory values unless specimen measurements are documented.
10. Every profile-specific path or state must carry a citation in the scientific data register.

## Current Milestone 2 graph

- 10 nodes.
- 8 segments.
- Two separate drainage chains: right and left.
- No intervitelline anastomosis yet.
- Human reconstruction and classical synthesis states remain separate.

## Geometry lifecycle

For each stage / profile pair:
1. Resolve the segment's developmental state.
2. Resolve stage-specific centerline path overrides if present.
3. Build a tube mesh from the resolved centerline.
4. Apply the stage / profile radius and opacity.
5. Preserve the stable segment ID on the mesh for picking and selection.
6. Dispose replaced geometry and materials when the stage changes.

## Validation

validateVitellineNetwork() checks segment IDs, endpoint node references, endpoint coordinate agreement, profile-stage coverage and chain continuity. Future milestones must extend validation to anastomosis topology, graph connectivity, self-intersections, vessel-to-organ containment and profile-specific stage rules.