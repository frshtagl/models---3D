# Hepatic Outflow and Venous Duct — Browser Teaching Guide

This guide covers the full 14-step in-browser teaching sequence: the first nine steps teach the portal system, and the final five teach hepatic outflow and the venous duct.

## 1. Launch the browser workstation

Requirements: Node.js 20 or later.

~~~bash
git clone https://github.com/frshtagl/models---3D.git
cd models---3D
npm install
npm run dev
~~~

Open the local Vite address shown in the terminal. The default is:

http://localhost:5173

Keep the terminal open while teaching. Press Ctrl+C to stop the development server.

For a production preview:

~~~bash
npm run typecheck
npm run build
npm run preview
~~~

The workstation is browser-based, but it is not yet a hosted public website. The supported teaching route in this milestone is the local browser app.

## 2. Open the guided lesson

1. Open the app in Chrome, Edge or Firefox with WebGL enabled.
2. Select **Teaching guide** in the upper-right header.
3. The guide applies the selected evidence profile, Carnegie stage, camera view, selected structure and layer visibility.
4. Read the learning point and instructor narration.
5. Use **Next lesson** and **Previous** to move through all 14 steps.
6. The guide does not lock the 3D model: orbit, zoom, select a vessel or change visibility at any time.
7. Close the card to leave the current scene configuration in place.

## 3. New hepatic-outflow lessons (steps 10–14)

| Step | Profile / stage | Focus |
|---|---|---|
| 10. Classical hepatic efferent route | Classical 2008 · CS14 | Sinusoids → venae revehentes → subdiaphragmatic anastomosis → terminal vitelline outflow |
| 11. Terminal hepatic veins | Human 2017 / 2024 · CS15 | Right, middle and left hepatic-vein collectors |
| 12. Human venous duct | Human 2017 / 2024 · CS15 | Left umbilical-vein hilum → right hepatocardiac channel |
| 13. Classical ductus venosus | Classical 2008 · CS16 | Left portal-sinus angle → IVC |
| 14. Fetal hepatic venous route | Human 2017 / 2024 · CS16 | Portal sinus, venous duct, hepatic veins and hepatic IVC contribution |

## 4. How to teach the two ductus-venosus pathways

### Human reconstruction view

1. Choose the human reconstruction profile.
2. Set CS15.
3. Open the teaching guide's **Human venous duct** step.
4. Start at the left umbilical-vein hilar node.
5. Follow the curved cyan channel to the right hepatocardiac channel.
6. Point out the narrower middle section and its flow arrow.
7. Keep the portal sinus visible to show that it is a different shunt.

### Classical view

1. Switch to the classical 2008 profile.
2. Set CS16.
3. Open **Classical ductus venosus**.
4. Trace the channel from the left angle of the portal sinus toward the IVC / hepatic outflow junction.
5. Compare its origin with the human reconstruction.

Do not combine these paths into one hybrid vessel.

## 5. Teaching hepatic efferent drainage

- Start with the sinusoidal plexus.
- Select **Venae revehentes** in the classical profile.
- Follow the paths cranially toward the subdiaphragmatic anastomosis.
- Turn on the bridge and terminal vitelline outflow layers.
- Switch to the human profile and select the right hepatic draining network.
- At CS15, show the right, middle and left terminal hepatic-vein collectors.
- Use the arrowheads to indicate blood moving away from the sinusoidal bed toward the hepatic IVC outflow.

The model's right hepatocardiac channel is the hepatic / suprahepatic IVC contribution only. It is not the full composite IVC.

## 6. Camera, selection and layer controls

- **Left mouse drag:** orbit / rotate.
- **Scroll wheel:** zoom.
- **Right mouse drag:** pan.
- **Anterior / Posterior / Right / Left / Superior / Inferior:** snap to anatomical views.
- **Reset camera:** restore the overview.
- **Anatomy layers:** select a name to inspect it; use the switch to show or hide it.
- **Show all:** restore all layer visibility toggles.
- **Isolate selected:** hide other layers to focus on one structure.
- **Play stages:** advance through CS10, CS12, CS13, CS14, CS15 and CS16.
- **Teaching guide:** apply the next prepared teaching view.
- **Full screen:** enter browser full-screen mode; press Esc to exit.

The new hepatic-outflow layers show flow-direction arrowheads on the terminal portions of their paths. The narrowed venous-duct waist is exaggerated slightly for visibility.

## 7. Postnatal fates

When the class reaches CS16, explain:
- left umbilical vein → ligamentum teres hepatis;
- ductus venosus → ligamentum venosum.

These are separate vessels and separate postnatal remnants. The current app explains these fates in the teaching narration and venous-duct inspector; it does not yet render the postnatal ligaments as separate meshes.

## 8. Scientific caveats to state aloud

- The geometry is schematic and not to scale.
- The stage bins are teaching approximations, not exact specimen-level onset dates.
- Classical 2008 and human 2017 routes are alternative evidence profiles, not one blended developmental mechanism.
- The 2024 source adds detailed CS15 venous-route morphology and terminal hepatic-vein context; the model does not use it to overwrite the 2017 portal-sinus route.
- The terminal hepatic veins are simplified collectors, not a full adult hepatic-vein tree.
- The right hepatocardiac channel is the hepatic / suprahepatic IVC contribution only. The infrahepatic IVC and its other embryonic venous contributions are not modeled.
- The complete paired umbilical-vein system and right umbilical vein are not modeled.
- The venous duct's narrow waist is a visual teaching aid, not a measured diameter.

## 9. Primary references

- Collardeau-Frachon S, Scoazec J-Y (2008). *Vascular Development and Differentiation During Human Liver Organogenesis*. The Anatomical Record 291:614–627. DOI: [10.1002/ar.20679](https://doi.org/10.1002/ar.20679).
- Hikspoors J P J M et al. (2017). *The Fate of the Vitelline and Umbilical Veins During the Development of the Human Liver*. Journal of Anatomy 231:718–735. DOI: [10.1111/joa.12671](https://doi.org/10.1111/joa.12671).
- Isotani N et al. (2024). *Regional differences in the umbilical vein and ductus venosus at different stages of normal human development*. The Anatomical Record 307(10):3306–3326. DOI: [10.1002/ar.25421](https://doi.org/10.1002/ar.25421).
