# Portal Vascular Graph — Milestone 5

## Source of truth

Portal paths are stored in src/data/portalNetwork.ts. The existing vitelline parent segments remain in src/data/vitellineNetwork.ts; intervitelline paths remain in src/data/intervitellineNetwork.ts.

Each PortalVascularLayer contains:
- stable layer ID and display name;
- evidence-profile ownership (classical-2008, human-2017, or both);
- source-specific stage states and evidence notes;
- editable centre-line paths with stable path IDs;
- graph-node endpoints;
- radius and display colour;
- source IDs.

## Portal layer IDs

- classical-portal-trunk
- human-portal-trunk
- left-umbilical-vein
- classical-portal-sinus
- human-portal-sinus
- classical-left-portal-branches
- classical-right-portal-branches
- human-left-portal-branches
- portal-cantlie-boundary-guide

The existing hepatic network supplies human-right-portal-branches.

The gallbladder landmark is portal-gallbladder.

## Topology contracts

### Classical portal trunk

The classical layer contains exactly three paths:
1. Left vitelline segment from the left caudal vitelline junction to the left middle-dorsal attachment.
2. Middle retroduodenal anastomosis from left to right.
3. Right vitelline segment from the right middle-dorsal attachment to the right subhepatic attachment.

The gold overlay intentionally traces these retained segments over the parent vitelline / anastomosis paths.

### Human portal pathway

The human layer contains five paths:
1. Midgut-derived precursor from the left developing mesentery to the left vitelline portal-entry point.
2. Short left vitelline limb from that entry to the dorsal anastomosis.
3. Dorsal intervitelline crossing.
4. Right extrahepatic vitelline continuation.
5. Right intrahepatic vitelline / portal continuation.

This is a source-aware teaching composite, not a claim that every millimetre of the portal trunk was directly traced in every specimen.

### Portal sinus

The classical portal-sinus layer highlights the subhepatic anastomosis from node-left-iva-subhepatic to node-right-iva-subhepatic and a separate left-umbilical approach from the hilar node to the left angle. The left and right ends of the retained subhepatic bridge therefore remain topologically explicit.

The human portal sinus runs from the simplified left umbilical-vein hilar node to node-right-portal-sinus-attachment, an embedded point on the right intrahepatic vitelline conduit. Its endpoint and evidence mechanism are deliberately different.

### Portal branches

The right human portal branches reuse the existing human-reconstruction layer. The new left human portal branches arise from the left umbilical-vein hilar node. Classical left and right first-order branch paths are separate layers with classical evidence notes.

The gallbladder and Cantlie guide are orientation aids, not vessels. The Cantlie guide is a thin schematic path, not a complete anatomical plane.

## Embedded parent anchors

Two new portal attachment anchors are registered:
- node-left-portal-entry lies exactly on vitelline-left-extrahepatic.
- node-right-portal-sinus-attachment lies exactly on vitelline-right-intrahepatic.

The portal validator checks that these positions remain embedded in the source parent centre-lines. Moving a parent vessel without updating the anchor should fail validation.

## Profile isolation and stage states

Every portal layer has complete states for both evidence profiles and all six stage bins. Profile-specific layers must use not-in-profile in the incompatible model. The validator checks this.

not-resolved and not-in-profile are not the same as biological regression. Do not infer a disappearance date from a layer being hidden in the viewer.

## Browser teaching state

The guided sequence lives in src/data/portalTeachingGuide.ts. Each step declares:
- evidence profile;
- Carnegie stage;
- camera preset;
- selected structure;
- visible anatomy layer IDs;
- learning point;
- instructor narration;
- a question for learners.

The React application applies the step atomically to the profile, stage, camera, selection and visibility state. The instructor can still orbit the model, select a vessel or change visibility while the guide is open.

## Validation

The portal validator checks:
- unique portal layer and path IDs;
- path endpoints match declared nodes;
- every path has at least two centre-line points;
- positive layer radii;
- left portal-entry and right portal-sinus anchors lie on the correct parent vitelline segments;
- complete stage-state maps;
- no incompatible evidence-profile leakage;
- exactly three classical portal-trunk components;
- five components in the human portal pathway;
- different destination anchors for classical and human portal-sinus mechanisms.

An independent audit at commit 076fb96f44d98f6f0ba2551bce5f37ac4727d233 checked 19 portal paths and both embedded parent anchors with no endpoint or attachment mismatch. GitHub Actions TypeScript validation and production build passed: https://github.com/frshtagl/models---3D/actions/runs/45669974332. Browser visual review and specialist embryology review remain separate requirements.