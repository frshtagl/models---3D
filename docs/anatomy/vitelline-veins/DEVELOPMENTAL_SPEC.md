# Vitelline Veins — Developmental Anatomy Specification

**Status:** Milestone 0 scientific baseline  
**Module:** Vitelline veins  
**Repository:** frshtagl/models---3D  
**Evidence cutoff:** 25 November 2026  
**Primary species:** Human. Comparative animal evidence must be identified as such.

## 1. Purpose and scope

This specification defines the anatomy, developmental sequence, terminology, and scientific uncertainty that the first interactive 3D module must represent.

The module follows the paired right and left vitelline (omphalomesenteric) veins from yolk-sac drainage through their relationships with the developing liver, extrahepatic venous connections, portal venous formation, hepatic sinusoidal pathways, and hepatic venous return.

It does not implement the full umbilical or cardinal venous systems. Those systems may appear as muted context structures where required to explain hepatic circulation or the hepatic IVC boundary.

The model is educational and schematic unless a specific geometry is derived from a cited specimen reconstruction. It must never imply that normalized 3D coordinates are measured embryonic dimensions.

## 2. Core anatomy

### 2.1 Initial venous arrangement

The paired vitelline veins drain the yolk sac / umbilical vesicle and associated early gut region toward the venous pole of the heart. The paired umbilical veins carry placental blood, while the cardinal veins drain the embryo proper. These are distinct venous systems even though their inflows converge near the sinus venosus.

The hepatocardiac channel is the common cranial venous entrance to the venous sinus described in human reconstructions. The vitelline and umbilical components join this channel on each side; they must not be drawn as if they were one undifferentiated vessel along their entire course.

### 2.2 Liver primordium and hepatic vascularization

The liver primordium is first identifiable around Carnegie Stage (CS)10, approximately 28 days post-fertilization in the Hikspoors series. Hepatic endoderm proliferates and hepatoblasts invade the transverse septum. From CS12–CS13, hepatoblast cords and vascular channels form a three-dimensional, highly vascular hepatic primordium.

The application must distinguish:
- hepatic endoderm / hepatoblast cords (epithelial tissue);
- endothelial vessels and capillaries;
- the hepatic sinusoidal network;
- larger afferent and efferent venous conduits.

Do not render hepatoblast cords as blood vessels. Do not assume that all sinusoids are simply surviving tubes from one named vitelline segment. The origin and remodeling of the intrahepatic vascular network are debated.

### 2.3 Afferent and efferent pathways

The classical hepatic vascular account uses:
- venae advehentes: afferent channels conveying blood toward the sinusoidal network;
- venae revehentes: efferent channels draining the sinusoidal network toward the cranial venous outflow / hepatocardiac connection.

The UI must explain these as directional functional terms, not as two additional paired named embryonic veins. The precise course and lineage of intrahepatic channels must be tied to the selected evidence profile.

## 3. Developmental chronology

Carnegie Stage is the primary timeline key. Days are approximate post-fertilization ages and must be displayed as ranges or approximate anchors, not exact deadlines.

| Carnegie stage | Approximate post-fertilization age | Relevant hepatic / venous event |
|---|---:|---|
| CS9 | ~26 days in the 2017 reconstruction | Foregut and yolk-sac boundary identifiable; liver primordium not yet clearly specified |
| CS10 | ~28 days in the 2017 reconstruction | Liver primordium becomes identifiable; paired vitelline and umbilical systems drain toward venous sinus |
| CS11 | ~24 days in the 2008 table | Hepatic primordium expands; note source-specific staging / age discrepancy |
| CS12 | ~28 days (26–30) in the 2008 table | Hepatic diverticulum / bud; hepatoblast invasion begins; transverse septum expands |
| CS13 | ~30 days (28–32) in the 2008 table | Hepatoblasts enclose vitelline veins; dorsal intervitelline connection reported in the 2017 reconstruction |
| CS14 | ~33 days (31–35) in the 2008 table | Asymmetric hepatic vascular pattern; right-sided vitelline dominance; transient ventral connection in the 2017 series |
| CS15 | ~36 days (35–38) in the 2008 table | Right umbilical vein no longer connects to liver in the 2017 series; portal branches visible |
| CS16 | ~40 days (37–42) in the 2008 table | Definitive fetal hepatic circulation pattern described in the 2008 synthesis |

**Chronology caution:** published stage-age tables do not align perfectly across sources. The 2008 review's table lists CS11 at 24 days and CS12 at 28 days, while the 2017 reconstruction identifies CS10 at about 28 days. Do not infer a simple one-day-per-stage progression or silently reorder source-specific observations. Use Carnegie stage first, and preserve each source's age/stage convention in the data.

## 4. Two evidence profiles — do not merge them into one invented sequence

The application must support at least two explicit profiles.

### Profile A — Classical vestigial / anastomotic teaching model

Primary synthesis: Collardeau-Frachon & Scoazec (2008), supplemented by classical embryology and portal-vein teaching diagrams.

This account describes:
- three prehepatic intervitelline anastomoses: cranial-ventral / subhepatic, middle dorsal / retroduodenal, and caudal-ventral;
- an additional subdiaphragmatic intervitelline anastomosis immediately below the sinus venosus;
- interruption / redistribution of intrahepatic vitelline channels as hepatic trabeculae grow;
- venae advehentes and venae revehentes linking the subhepatic and subdiaphragmatic regions with the sinusoidal plexus;
- selective regression of primitive vessel segments;
- a portal trunk assembled from a caudal left vitelline segment, the middle dorsal anastomosis, and a right vitelline segment between the middle and subhepatic anastomoses;
- transformation of the subhepatic anastomosis into the portal sinus / sinus intermedius;
- vitelline contribution to hepatic efferent channels and the hepatic IVC region.

Within this profile, label the portal-trunk construction as the classical vestigial model, not as an uncontested observation.

### Profile B — Human 3D reconstruction / lineage and hemodynamic model

Primary study: Hikspoors et al. (2017), Journal of Anatomy, DOI 10.1111/joa.12671.

This account is based on 3D reconstructions of human embryos from 3 to 10 weeks, with comparative pig and mouse material.

Key findings reported for human embryos:
- paired vitelline and umbilical veins enter the venous sinus through common hepatocardiac channels;
- the dorsolateral liver lobes engulf the vitelline veins around CS13; the conduits remain identifiable for a period inside the liver;
- the right intrahepatic vitelline conduit is substantially wider than the left in the described stages;
- the left intrahepatic vitelline conduit breaks up / disappears as a large conduit by early CS14, while the right-sided conduit persists longer;
- a dorsal extrahepatic intervitelline anastomosis is present caudal to the dorsal pancreatic bud at CS13 and is well formed by early CS14;
- a much smaller, more caudal ventral intervitelline anastomosis is described temporarily during CS14;
- a small left-sided vein from the developing midgut mesentery enters the left vitelline vein just upstream of the dorsal anastomosis and is identified as the future portal vein;
- a left-to-right umbilico-vitelline shunt / portal sinus develops between the left umbilical vein and right vitelline (portal) vein;
- intrahepatic portal branches are described as arising from the right vitelline (portal) vein on the right and from the left umbilical vein on the left;
- the right hepatocardiac channel enlarges while the left becomes incorporated into the venous sinus wall and regresses as a distinct channel.

Do not automatically render the classical cranial, middle, caudal and subdiaphragmatic anastomoses as four simultaneous connections in this profile. The observed extrahepatic connections and their timing differ.

### 4.1 Interpretation policy

A user-facing model selector must say which profile is active. A comparison mode may show both interpretations side-by-side, but it must not blend their geometries into a single vessel network.

Where the profiles agree, use the shared anatomy. Where they differ, preserve the disagreement with citations and a short plain-language explanation.

## 5. Portal venous formation

### 5.1 Classical segmental account

In the classical vestigial account, the portal trunk is described from caudal to cranial as:
1. left vitelline vein segment from the mesenteric venous termination to the middle dorsal / retroduodenal anastomosis;
2. the middle dorsal / retroduodenal intervitelline anastomosis;
3. right vitelline vein segment between the middle and subhepatic anastomoses.

Other primitive segments regress. The resulting path curves around the duodenum and explains the characteristic S-shaped course.

The exact tributary contribution of superior mesenteric and splenic veins must not be simplified into an unsupported claim that all adult portal tributaries are direct continuations of one vitelline trunk. Show mesenteric / splenic tributaries joining the developing portal system and annotate the developmental source used.

### 5.2 Human reconstruction account

Hikspoors et al. describe a small left-sided vessel from the developing midgut mesentery entering the left vitelline vein just upstream of the dorsal intervitelline anastomosis. They then describe a right-sided vitelline portal conduit and an umbilico-vitelline shunt forming the portal sinus. Intrahepatic right portal branches and left-sided umbilical-derived portal branches are distinguished.

This account must be represented as a separate evidence profile. Do not force its small left-sided portal precursor into the classical three-anastomosis segmental construction.

## 6. Hepatic venous outflow and IVC boundary

The vitelline system contributes to hepatic efferent venous channels. The classical account describes venous channels draining the sinusoidal plexus toward the subdiaphragmatic anastomosis / hepatocardiac outflow. The right hepatocardiac channel becomes dominant; the left-sided channel regresses as a distinct outflow route in the described asymmetric remodeling.

The hepatic segment of the IVC is associated with the right vitelline / right hepatocardiac channel. The application must show only this relevant hepatic contribution as vitelline-related. It must not color the entire IVC as a vitelline derivative: the IVC is composite and its other segments have different embryonic origins, including cardinal-system contributions.

The exact topological description of the right hepatocardiac channel, subdiaphragmatic anastomosis and hepatic IVC junction must cite the selected source profile. Do not collapse these into one unlabelled tube.

## 7. Context-only structures

The following may appear in grey / muted context mode:
- right and left umbilical veins at early stages;
- persistent left umbilical vein at fetal stages;
- portal sinus / umbilico-vitelline shunt;
- ductus venosus / venous duct;
- sinus venosus;
- common cardinal veins;
- hepatic IVC segment and a faint outline of the remaining IVC.

The ductus venosus (also called venous duct in some literature) is not a vitelline-vein derivative. In the 2017 account, the venous duct is described as a left-to-right connection between the left umbilical vein and right hepatocardiac channel. The portal sinus is a separate left-to-right connection between the left umbilical vein and right vitelline (portal) vein.

## 8. Terminology and labels

Use consistent primary labels:
- Right vitelline vein
- Left vitelline vein
- Right hepatocardiac channel
- Left hepatocardiac channel
- Dorsal / retroduodenal intervitelline anastomosis
- Cranial-ventral / subhepatic intervitelline anastomosis
- Caudal-ventral intervitelline anastomosis
- Subdiaphragmatic intervitelline anastomosis
- Hepatic sinusoidal plexus
- Venae advehentes (afferent channels)
- Venae revehentes (efferent channels)
- Portal vein / portal trunk
- Portal sinus / sinus intermedius
- Hepatic venous outflow
- Hepatic segment of IVC

Where a selected source uses alternative terms, show the synonym in parentheses and store the source's exact wording in metadata.

## 9. Educational boundaries

The module should explain the vitelline contribution to:
- portal venous trunk and selected intrahepatic portal channels;
- hepatic sinusoidal and efferent venous pathways;
- right hepatocardiac / hepatic IVC contribution.

It must not claim:
- that all hepatic sinusoids are simply persisting vitelline veins;
- that the adult portal vein is the unchanged right vitelline vein;
- that all intrahepatic portal branches have the same lineage;
- that the whole IVC is vitelline-derived;
- that the ductus venosus is a vitelline derivative;
- that the classical four-connection scheme is directly observed in every human embryo at one fixed stage.

## 10. Primary references

See REFERENCES.md and EVIDENCE_AND_VARIANTS.md for the source register and model comparison.