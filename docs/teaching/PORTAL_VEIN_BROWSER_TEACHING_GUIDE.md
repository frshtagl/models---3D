# Portal Vein Development — Browser Teaching Guide

This guide is for using the interactive 3D model in a lecture, practical class, tutorial or small-group discussion.

## 1. Open the 3D model in a browser

The application is a local browser-based React / Three.js workstation. It does not require a separate 3D desktop program.

### First-time setup

Requirements: Node.js 20 or later.

1. Clone the repository:

       git clone https://github.com/frshtagl/models---3D.git

2. Enter the project folder:

       cd models---3D

3. Install dependencies:

       npm install

4. Start the local development server:

       npm run dev

5. Open the local address printed in the terminal. The default Vite address is:

       http://localhost:5173

Keep the terminal open while teaching. Stop the server with Ctrl+C when finished.

### Production preview

To test the optimized production build:

    npm run typecheck
    npm run build
    npm run preview

Open the preview URL printed by Vite.

The app is browser-based but is not automatically a hosted public website merely because the repository is public. Local browser use is the supported workflow in this milestone.

## 2. Start the guided lesson

1. Open the app in Chrome, Edge or Firefox on a computer with WebGL enabled.
2. Select **Teaching guide** in the top-right header.
3. The first teaching step is applied automatically: evidence profile, Carnegie stage, camera view, selected vessel and relevant visible layers are set together.
4. Read the learning point and instructor narration.
5. Use **Next lesson** and **Previous** to move through the 14-step sequence. The first nine steps cover the portal system; the final five cover hepatic outflow and the venous duct.
6. Close the card with × to leave the model in its current state. Reopen the guide to resume the selected step.

The guided sequence is designed for an instructor to narrate while projecting the 3D viewport. It is not an automatic animation of every vessel. For the final five hepatic-outflow lessons, see the [Hepatic Outflow Browser Teaching Guide](HEPATIC_OUTFLOW_BROWSER_TEACHING_GUIDE.md).

## 3. Nine-step classroom sequence

| Step | Main teaching point | Suggested view |
|---|---|---|
| 1. Paired vitelline baseline | Orient right and left vitelline trunks around the duodenum | Posterior |
| 2. Human midgut precursor | Identify the small left-sided midgut-derived portal precursor entering the left vitelline vein | Posterior |
| 3. Dorsal crossing | Show the dorsal anastomosis behind the duodenum and caudal to the dorsal pancreatic bud | Posterior, then anterior |
| 4. Right vitelline continuation | Trace the right vitelline contribution into the right intrahepatic portal pathway | Right lateral |
| 5. Left umbilical inflow | Introduce the left umbilical vein as the second fetal hepatic inflow source | Anterior |
| 6. Human portal sinus | Show the intrahepatic left umbilical-to-right vitelline shunt | Anterior |
| 7. Portal branch origins | Compare right vitelline-derived branches with left umbilical-derived branches; use gallbladder / Cantlie guide | Anterior |
| 8. Classical portal trunk | Trace the three retained vitelline components in caudal-to-cranial order | Posterior |
| 9. Classical portal sinus | Contrast subhepatic-anastomosis remodeling with the human intrahepatic shunt | Anterior |

## 4. Mouse, camera and layer controls

- **Left mouse drag:** orbit / rotate around the model.
- **Scroll wheel:** zoom in and out.
- **Right mouse drag:** pan the model.
- **Anterior / Posterior / Right / Left / Superior / Inferior:** snap to anatomical camera views.
- **Reset camera:** restore the oblique overview.
- **Anatomy layers:** select a name to inspect it; use the switch to show or hide it.
- **Show all:** restore all layer visibility toggles.
- **Isolate selected:** hide every other layer to focus on one structure.
- **Play stages:** automatically advance through the six Carnegie-stage bins. Pause before explaining a detailed connection.
- **Teaching guide:** apply the next instructor-prepared scene.
- **Full screen:** enter browser full-screen mode; press Esc to exit.

The guide changes the model to a prepared teaching view, but the instructor can still orbit, zoom, select vessels and toggle layers while the card remains open.

## 5. Suggested lecture delivery

### Part A — Establish orientation

Start with the paired vitelline veins and duodenum. Rotate between posterior and anterior views. Ask learners to predict where a portal vessel crossing behind the duodenum should be seen.

### Part B — Human reconstruction

At CS13, identify the small left-sided midgut-derived precursor entering the left vitelline vein. Follow it to the dorsal intervitelline anastomosis and across to the right vitelline pathway. At CS14, show the right intrahepatic portal contribution.

### Part C — Umbilical contribution and portal sinus

Turn on the left umbilical vein. Explain that the human portal sinus is a distinct intrahepatic left umbilical-to-right vitelline shunt. Do not call it an intervitelline anastomosis.

### Part D — Left and right portal branches

Show the blue right portal branches and violet left portal branches. Use the gallbladder marker and Cantlie guide to orient the hepatic vascular midline. Emphasize that the two sides have different embryonic venous sources in the 2017 reconstruction.

### Part E — Compare the classical account

Switch to the classical 2008 profile. Trace the left vitelline segment, middle dorsal anastomosis and right vitelline segment. Then show the classical subhepatic anastomosis / portal sinus explanation. Ask learners to compare it with the human reconstruction rather than merge the two accounts.

## 6. Projector and classroom setup

- Prefer a laptop connected to a 1080p or higher projector / display.
- Use the app's **Full screen** control or the browser's F11 key to reduce browser chrome.
- Keep the teaching card open while narrating; close it temporarily if the class needs an unobstructed model.
- Use posterior view for the dorsal retroduodenal crossing and anterior view for the portal sinus / left umbilical inflow.
- Avoid showing every vessel layer simultaneously when explaining one pathway. Use the guided views or **Isolate selected** to reduce clutter.
- If the model appears black or blank, check that browser hardware acceleration / WebGL is enabled and reload the page.

## 7. Scientific caveats to say aloud

- The geometry is schematic and not to scale.
- The Carnegie-stage visibility bins are teaching approximations, not exact onset dates for every vessel.
- The classical 2008 synthesis and 2017 human reconstruction are alternative evidence profiles; do not present them as one hybrid.
- The left umbilical vein is only a simplified context path in this milestone. The right umbilical vein, full placental inflow, venous duct and complete fetal circulation are not modeled here.
- The portal branches are first-order teaching paths, not a complete Couinaud segmental tree.
- The Cantlie guide is an orientation marker, not a vessel.

## 8. Evidence to read alongside the model

- Collardeau-Frachon S, Scoazec J-Y (2008). *Vascular Development and Differentiation During Human Liver Organogenesis*. The Anatomical Record 291:614–627. DOI: [10.1002/ar.20679](https://doi.org/10.1002/ar.20679).
- Hikspoors J P J M et al. (2017). *The Fate of the Vitelline and Umbilical Veins During the Development of the Human Liver*. Journal of Anatomy 231:718–735. DOI: [10.1111/joa.12671](https://doi.org/10.1111/joa.12671).