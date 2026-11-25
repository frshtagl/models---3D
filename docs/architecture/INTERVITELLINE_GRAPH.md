# Intervitelline Graph — Milestone 4

## Source of truth

    interface IntervitellineAnastomosis {
      id: string;
      name: string;
      region: AnastomosisRegion;
      profile: EvidenceProfile;
      fromNode: string;
      toNode: string;
      points: readonly Point3[];
      radius: number;
      color: string;
      states: Record<EvidenceProfile, Record<VitellineStageId, AnastomosisState>>;
      evidence: Record<EvidenceProfile, string>;
      sourceIds: readonly string[];
    }

The implementation lives in src/data/intervitellineNetwork.ts. The existing src/data/vitellineNetwork.ts remains the source of truth for the paired parent veins and the ten embedded attachment nodes.

## Stable layer IDs

- classical-subhepatic-anastomosis
- classical-middle-dorsal-anastomosis
- classical-caudal-ventral-anastomosis
- classical-subdiaphragmatic-anastomosis
- human-dorsal-extrahepatic-anastomosis
- human-transient-ventral-anastomosis

The dorsal pancreatic bud landmark is dorsal-pancreatic-bud.

## Attachment nodes

Each anastomosis is an edge between named left and right attachment nodes. The attachment nodes are part of VITELLINE_NODES, and their positions are also explicit control points in the corresponding parent vessel centerline.

| Attachment region | Parent segments |
|---|---|
| Subhepatic | Left and right extrahepatic vitelline trunks |
| Middle dorsal | Left and right extrahepatic vitelline trunks |
| Caudal ventral | Left and right extrahepatic vitelline trunks |
| Human transient ventral | Left and right extrahepatic vitelline trunks |
| Subdiaphragmatic | Left and right hepatocardiac channels |

The human dorsal connection reuses the same dorsal attachment nodes as the classical middle dorsal connection because the two profiles describe a similar left-to-right topographic level. The two edges remain distinct source objects and are never visible in the same profile.

## Profile isolation

The profile on each item determines which evidence model owns that layer. The opposite profile must have not-in-profile for every stage. The validator checks this condition.

- Classical 2008: four separate anastomosis edges.
- Human 2017: two separate extrahepatic edges.
- No combined six-edge hybrid is allowed.

## Stage states

not-resolved is different from regressing. It means that the source does not separately trace the connection in the later stage range. This is used for the later human dorsal connection bins and for the classical inferior connection after the stage in which it is represented.

## Geometry constraints

- Dorsal / retroduodenal paths must be in positive Z relative to the gut reference.
- Ventral / anterior paths must be in negative Z.
- The subdiaphragmatic path is cranial to the hepatic primordium and immediately caudal to the sinus venosus.
- The human dorsal connection must be caudal to the dorsal pancreatic bud.
- The human transient ventral connection must be caudal to the dorsal connection.

All geometry is normalized schematic data, not specimen-measured coordinates.

## Validation

validateIntervitellineNetwork() checks:
- unique IDs;
- known attachment nodes;
- centre-line endpoint / node equality;
- attachment node membership in the correct parent vessel centreline;
- complete state maps for both profiles and all stage bins;
- no cross-profile layer leakage;
- dorsal / ventral depth sign;
- dorsal pancreatic bud and caudal / cranial ordering constraints.

CI typecheck and production build are required after every topology update. Browser review is a separate release requirement.