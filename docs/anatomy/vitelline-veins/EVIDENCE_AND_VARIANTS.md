# Evidence, Competing Models, and Uncertainty Register

**Status:** Milestone 0 scientific risk-control document  
**Purpose:** prevent a visually seamless but scientifically false hybrid model.

## 1. Why multiple models are necessary

The remodeling of the embryonic hepatic venous system has historically been explained through a “vestigial” model in which pre-existing vitelline and umbilical veins are interrupted / fragmented by growing hepatoblasts and remodeled into sinusoidal, portal and hepatic channels.

Hikspoors et al. (2017) revisited human embryonic material using 3D reconstructions and argued for a “lineage” interpretation in which the vitelline and umbilical conduits remain identifiable for a time after being enclosed by the growing liver, while important left-to-right shunts arise de novo. The study explicitly states that it found no evidence for large-scale fragmentation as proposed by the vestigial theory.

The 2008 synthesis and 2017 reconstruction do not describe every intermediate connection in the same way. Therefore, one fixed animation that presents all claims as simultaneously true would misrepresent the evidence.

## 2. Comparison matrix

| Topic | Classical synthesis: Collardeau-Frachon & Scoazec (2008) | Human 3D reconstruction: Hikspoors et al. (2017) | Product decision |
|---|---|---|---|
| Intrahepatic vitelline veins | Hepatic trabeculae interrupt segments between subhepatic and subdiaphragmatic connections; channels resolve into sinusoidal plexus | Veins remain identifiable as large conduits after enclosure; right and left behave differently; left conduit breaks up while right persists longer | Provide separate profile-specific stages and geometries |
| Number of intervitelline connections | Three prehepatic connections plus a fourth subdiaphragmatic connection | Dorsal extrahepatic connection at CS13 and a small, transient, more caudal ventral connection during CS14 are described | Do not force the four-connection pattern into the 2017 profile |
| Dorsal connection | Middle / retroduodenal anastomosis; first of the three prehepatic connections to appear in the cited synthesis | Dorsal anastomosis forms at CS13 caudal to dorsal pancreatic bud | Preserve source-specific timing and topography |
| Ventral connections | Cranial-ventral / subhepatic and caudal-ventral prehepatic connections | A smaller ventral connection, more caudal than the dorsal one, is described temporarily during CS14 | Do not claim the same permanence or chronology |
| Portal trunk | Constructed from left vitelline segment, middle dorsal IVA, and right vitelline segment between middle and subhepatic IVA | A small left-sided midgut-derived vein enters the left vitelline vein just upstream of the dorsal IVA; right vitelline conduit contributes to portal arrangement | Expose two selectable lineage models |
| Portal sinus | Derived from subhepatic IVA; connects portal and umbilical circulations | Left-to-right shunt between left umbilical vein and right vitelline (portal) vein | Do not silently treat these as identical mechanistic claims |
| Intrahepatic portal branches | Portal branches emerge from portal trunk / portal sinus tributaries | Right portal branches from right vitelline vein; left branches from left umbilical vein in the reconstructed account | Show source-specific right / left lineage |
| Hepatic outflow | Vitelline-derived efferent channels / venae revehentes drain toward subdiaphragmatic and hepatocardiac outflow | Right hepatocardiac channel enlarges; left channel becomes incorporated into sinus venosus wall and regresses as distinct channel | Shared right-sided dominance can be shown; detailed lineage remains attributed |
| Ductus venosus | Connects portal sinus with IVC; separate from vitelline system | Called “venous duct” in the article; connects left umbilical vein with right hepatocardiac channel | Treat venous duct / ductus venosus as the umbilical-system shunt, not as a vitelline derivative |

## 3. What can be shown as shared core anatomy

The following may be included in a shared introductory stage:
- paired right and left vitelline veins;
- yolk-sac drainage toward the venous pole of the heart;
- paired hepatocardiac channels as cranial outflow pathways;
- developing hepatic primordium and transverse septum;
- hepatoblast invasion and close association with vascular channels;
- a developing hepatic sinusoidal network;
- rightward asymmetry of hepatic venous drainage;
- vitelline contribution to portal and hepatic venous architecture;
- a right vitelline / hepatocardiac contribution to the hepatic IVC region.

When a claim is not common to both accounts, it must be profile-tagged.

## 4. Claims requiring explicit qualification

### 4.1 “The liver breaks up the vitelline veins into sinusoids”

This is the classical vestigial account. The 2017 human reconstruction found that the veins remained identifiable as conduits after enclosure and argued against large-scale fragmentation. The UI should say “Classical account” or “2017 reconstruction” rather than state one as universally settled.

### 4.2 “There are four intervitelline anastomoses”

The four-connection scheme is explicitly described in the 2008 synthesis: three prehepatic and one subdiaphragmatic. The 2017 reconstruction describes a dorsal extrahepatic connection and a transient smaller ventral connection in its sampled human stages. The 3D viewer must allow the learner to choose the account and must not show all four as an observed universal configuration.

### 4.3 “The portal vein is made from three named segments”

The three-segment construction is the classical vestigial theory summarized by Collardeau-Frachon & Scoazec. Hikspoors et al. describe a small left-sided midgut-derived portal precursor entering the left vitelline vein near the dorsal connection. Both must be represented as model-specific interpretations.

### 4.4 “The portal sinus is the subhepatic anastomosis”

This is the 2008 description. Hikspoors et al. describe a left-to-right umbilico-vitelline shunt between the left umbilical vein and right vitelline vein. The resulting channel may be discussed under portal-sinus terminology, but the formation mechanism differs. Keep the source's exact wording and model profile visible.

### 4.5 “The left portal branches are vitelline-derived”

Do not make this a universal statement. The 2017 reconstruction describes left-sided intrahepatic portal branches arising from the left umbilical vein and right-sided branches from the right vitelline (portal) vein.

### 4.6 “The right vitelline vein forms the entire hepatic venous system”

This is too broad. Distinguish the portal afferent system, sinusoidal network, hepatic efferent channels, hepatocardiac channel, and hepatic segment of IVC. Show only source-supported lineage claims.

## 5. Confidence and evidence labels

Use these labels in the UI and metadata:
- **Well-established shared anatomy:** described consistently across selected primary sources.
- **Classical teaching model:** widely used anatomical explanation, but mechanistic interpretation is disputed.
- **Human reconstruction finding:** directly reported from the human embryo reconstruction series; sample and stage limits must be stated.
- **Comparative evidence:** animal model evidence; do not silently transfer to humans.
- **Schematic reconstruction:** spatial shape is explanatory rather than specimen-measured.
- **Uncertain / unresolved:** source evidence does not justify a single definitive fate claim.

Avoid numerical confidence percentages unless a validated method exists.

## 6. Model-selection UX

At module entry, the learner sees:
- **Classical teaching model**
- **Human 3D reconstruction model**
- **Compare both**

The selected model name remains visible beside the timeline. In Compare mode:
- use matching camera position and scale;
- keep left/right and cranial/caudal orientation identical;
- highlight only the differences;
- do not overlay incompatible vessel paths;
- provide a short “Why these models differ” note and source citation.

## 7. Review requirements before release

Before any stage is marked anatomically approved:
1. A human embryology reviewer checks labels and developmental order.
2. Every vessel connection is traceable to a source statement or figure.
3. The selected profile's vessel topology is internally consistent.
4. “Not observed” is not mislabelled “regressed.”
5. Context-only umbilical and cardinal structures are not mislabelled as vitelline derivatives.
6. The right hepatic IVC contribution is separated from the remainder of the composite IVC.
7. All uncertain claims remain visible in documentation.

## 8. Primary evidence

- Collardeau-Frachon & Scoazec (2008), DOI 10.1002/ar.20679.
- Hikspoors et al. (2017), DOI 10.1111/joa.12671.

Full details and links: REFERENCES.md.