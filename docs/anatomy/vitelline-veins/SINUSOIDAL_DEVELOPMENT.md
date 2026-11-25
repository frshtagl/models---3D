# Hepatic Sinusoidal Development — Evidence Notes

## Scope

This note explains the hepatic sinusoidal plexus and its relationship to afferent and efferent venous channels in the two selectable evidence profiles. It is not a single merged developmental sequence.

## 1. Classical synthesis — Collardeau-Frachon & Scoazec (2008)

The review describes hepatic sinusoids appearing early, as hepatic cords invade the septum transversum during the fourth week. It discusses two proposed mechanisms for their origin:

1. Pre-existing capillary vessels in the septum transversum become surrounded by expanding hepatic cords.
2. Pre-existing vitelline veins are disrupted by the expanding hepatic primordium and contribute to the sinusoidal network.

The review treats these as proposed mechanisms that may not be mutually exclusive. The software therefore displays a sinusoidal plexus but does not encode one exclusive cellular lineage for every sinusoidal channel.

In the classical fetal vascular arrangement:
- **Venae advehentes** are small afferent channels conveying blood from the subhepatic anastomosis toward the sinusoidal plexus.
- **Venae revehentes** are efferent channels draining the plexus toward the subdiaphragmatic anastomosis and sinus venosus.

These are functional groups of intrahepatic channels, not two additional paired named embryonic veins. Their endpoints in Milestone 3 are schematic boundary anchors; the actual classical anastomoses are deferred to Milestone 4.

## 2. Human 3D reconstruction — Hikspoors et al. (2017)

The reconstruction reports that:
- Sinusoids enter from the venous sinus to form an intrahepatic network during expansion of the hepatic primordium.
- Vitelline and umbilical veins are engulfed by hepatoblasts but remain temporarily identifiable as larger conduits.
- The study found no evidence for large-scale fragmentation of embryonic veins into sinusoids in its reconstructed human material.
- A network of draining veins develops in a retrograde direction from the hepatocardiac channels, with pronounced left-right asymmetry.
- Right-sided intrahepatic portal branches arise from the right vitelline (portal) conduit.
- Left-sided intrahepatic portal branches arise from the left umbilical vein in the reported reconstruction.

The application renders only the right vitelline-associated portal branches in this module. The left umbilical vein and its portal branches are deferred to the umbilical-system module. This avoids falsely assigning left portal branches to the vitelline system.

The rendered draining network is a spatial teaching abstraction. “Retrograde” describes the reported direction of developmental extension from the hepatocardiac channels; it must not be interpreted as an arrow showing blood-flow direction.

## 3. Stage presentation in this application

| Stage | Application representation | Interpretation boundary |
|---|---|---|
| CS10 | No sinusoidal network rendered yet | Not-yet-visible is not proof of biological absence |
| CS12 | Early sinusoidal plexus and human sinusoidal entry begin | Schematic onset window; do not infer exact day |
| CS13 | Plexus expands; classical afferent / efferent channels and human drainage network begin | Profiles remain separate |
| CS14 | Plexus expands; right hepatic drainage is prominent; right portal branches begin | Left portal branches in the human profile are umbilical-derived |
| CS15 | Plexus and right portal branches persist | Portal sinus and full umbilical pathway are not yet modeled |
| CS16 | Developing fetal vascular arrangement | Not a mature adult sinusoidal architecture |

Carnegie stage is the timeline key. Published age conventions differ; stage labels should not be converted into exact day claims.

## 4. Sinusoidal endothelial maturation is a later process

The 2008 review describes progressive sinusoidal endothelial differentiation after the early plexus appears, including remodeling of the perisinusoidal matrix and acquisition of endothelial fenestrations over later fetal weeks. The review also discusses later acquisition of sinusoidal endothelial markers.

Milestone 3 does not model:
- endothelial fenestrations;
- basement-membrane loss;
- sinusoidal endothelial marker expression;
- stellate-cell, Kupffer-cell or hematopoietic-cell populations;
- mature portal spaces, lobular plates or central-vein architecture.

The CS10–CS16 network is therefore a developmental topology model, not a mature histological or ultrastructural model.

## 5. Source register

- **CF2008:** Collardeau-Frachon S, Scoazec J-Y. (2008). *Vascular development and differentiation during human liver organogenesis*. The Anatomical Record 291:614–627. DOI: [10.1002/ar.20679](https://doi.org/10.1002/ar.20679).
- **HIKSPOORS2017:** Hikspoors J P J M et al. (2017). *The fate of the vitelline and umbilical veins during the development of the human liver*. Journal of Anatomy 231:718–735. DOI: [10.1111/joa.12671](https://doi.org/10.1111/joa.12671).

The two sources are a review / synthesis and a human embryo reconstruction study, respectively. The model selector exposes their different interpretations rather than treating either as a universal final answer.