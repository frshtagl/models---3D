# Hepatic Vascular Graph — Milestone 3

## Purpose

This graph represents the developing hepatic sinusoidal microvasculature and selected afferent / efferent pathways. It extends the paired vitelline graph without replacing it.

## Source of truth

    interface HepaticVascularNode {
      id: string;
      label: string;
      position: readonly [number, number, number];
      description: string;
      terminal?: boolean;
      linkedStructureNode?: string;
    }

    interface HepaticVascularPath {
      id: string;
      fromNode: string;
      toNode: string;
      points: readonly (readonly [number, number, number])[];
      radiusScale?: number;
    }

    interface HepaticVascularLayer {
      id: string;
      name: string;
      kind: 'sinusoid' | 'afferent' | 'efferent' |
            'sinusoidal-entry' | 'portal-branch' | 'hepatic-drainage';
      paths: readonly HepaticVascularPath[];
      states: Record<EvidenceProfile, Record<VitellineStageId, HepaticVascularState>>;
      evidence: Record<EvidenceProfile, string>;
      sourceIds: readonly string[];
    }

## Layers and stable IDs

- hepatic-sinusoidal-plexus: one selectable reticular network containing 20 stable path IDs.
- classical-venae-advehentes: classical afferent paths from subhepatic boundary anchors to the plexus.
- classical-venae-revehentes: classical efferent paths from the plexus to subdiaphragmatic boundary anchors.
- human-sinusoidal-entry: human-reconstruction entry relationship from the venous sinus.
- human-right-hepatic-drainage: right-dominant drainage paths from the right hepatocardiac channel.
- human-left-hepatic-drainage: small temporary left-sided drainage remnant.
- human-right-portal-branches: right intrahepatic portal branches associated with the right vitelline conduit.

The plexus is selected as one layer to avoid turning every capillary-like mesh edge into a separate item in the user-facing anatomy list. Its internal paths remain individually identified for editing and validation.

## Profile rules

### Classical 2008 synthesis

- Show the sinusoidal plexus from the early hepatic invasion window.
- Show venae advehentes as afferent channels from the subhepatic region toward the plexus.
- Show venae revehentes as efferent channels from the plexus toward the subdiaphragmatic outflow.
- Keep the anastomotic endpoints as explicit boundary anchors until the separate classical anastomosis graph is implemented.
- Describe sinusoidal origin cautiously: the review discusses pre-existing septum-transversum capillaries and vitelline-vein disruption as proposed mechanisms.

### Human 2017 reconstruction

- Show sinusoidal entry from the venous sinus as a distinct profile-specific relationship.
- Preserve the identity of larger intrahepatic vitelline and umbilical conduits for the stages in which they remain identifiable.
- Show a right-dominant hepatic draining network extending from the hepatocardiac channel.
- Show the left drainage remnant as temporary and no longer distinct in later stage bins.
- Show right portal branches from the right vitelline (portal) conduit.
- Do not show left portal branches as vitelline-derived; the reconstruction assigns them to the left umbilical vein.

## Stage-state vocabulary

- not-yet-visible: not rendered at the selected stage; this is not a claim of biological absence.
- developing: early schematic representation.
- expanding: increased visual prominence during the selected stage bin.
- persistent: represented as an established pathway in this profile.
- regressing: represented as a distinct pathway undergoing regression.
- not-distinct: not rendered as a distinct large channel in the selected profile.
- not-in-profile: deliberately excluded from the selected evidence model.

## Geometry and validation

- All coordinates are normalized schematic coordinates in the canonical project frame: +X embryonic right, +Y cranial, +Z dorsal.
- Each path must contain at least two points and begin / end at its declared node.
- Linked nodes explicitly identify shared structures such as the sinus venosus or the existing right vitelline conduit.
- The sinusoidal plexus must be one connected graph.
- Mesh radius and opacity are display parameters, not measured vessel diameters.
- The renderer creates disposable Three.js tube geometry from these source paths. Do not edit rendered meshes as the anatomical source.

## Boundaries

The following are intentionally absent until later milestones: intervitelline anastomoses, portal trunk precursor, portal sinus, left umbilical vein, left umbilical-derived portal branches, ductus venosus, hepatic artery, portal spaces and mature hepatic lobule / central-vein architecture.