# Vitelline Veins — Segment-by-Segment Fate Map

**Status:** Milestone 0; provisional anatomy data for implementation  
**Important:** the two columns below describe different published models. They are not to be merged.

## 1. Classical vestigial / anastomotic profile

| Structure / segment | Early position and connection | Classical remodeling description | Teaching / implementation status |
|---|---|---|---|
| Right vitelline vein, caudal extrahepatic segment | Right yolk-sac / yolk-stalk channel approaching gut and liver | Caudal portions are selectively lost; retained right-sided segments contribute to portal and hepatic outflow pathways according to the segmental scheme | Model as independently selectable subsegments |
| Left vitelline vein, caudal extrahepatic segment | Left counterpart of paired yolk-sac drainage | A caudal segment from mesenteric venous termination to middle anastomosis is retained in the classical portal trunk; more caudal primitive portions regress | Keep retained portal precursor distinct from regressing caudal segments |
| Right vitelline vein, cranial / intrahepatic segment | Passes through hepatic primordium toward right hepatocardiac outflow | Intrahepatic channels participate in sinusoidal and efferent remodeling; right hepatocardiac outflow becomes dominant | Show intrahepatic plexus and cranial outflow as separate objects |
| Left vitelline vein, cranial / intrahepatic segment | Left-sided counterpart | Left-sided cranial / hepatocardiac pathway regresses as right-sided outflow becomes dominant; intrahepatic channels are remodeled | Animate selected source-specific regression |
| Right hepatocardiac channel | Cranial continuation toward right side of sinus venosus | Enlarges and contributes to hepatic outflow / hepatic IVC region | Highlight as vitelline-related hepatic IVC contribution, not the entire IVC |
| Left hepatocardiac channel | Cranial continuation toward left sinus venosus horn | Regresses / becomes incorporated into sinus venosus wall as asymmetry develops | Show regression as a distinct event, not as whole-left-vein disappearance |
| Cranial-ventral / subhepatic IVA | Ventral to duodenum beneath hepatic primordium | In Collardeau-Frachon & Scoazec, subhepatic anastomosis is remodeled into portal sinus / sinus intermedius; simpler diagrams may call the cranial-ventral connection a left portal-vein precursor | Preserve exact naming convention per source |
| Middle dorsal / retroduodenal IVA | Posterior to duodenum | Persists as a major component of the classical portal trunk | Main selectable portal precursor in classical profile |
| Caudal-ventral IVA | Ventral to distal duodenum | Regresses in classical portal remodeling account | Display segment-by-segment involution |
| Subdiaphragmatic IVA | Above hepatic primordium, below sinus venosus | Participates in cranial hepatic venous drainage / hepatocardiac outflow in classical hepatic vascular account | Keep distinct from three prehepatic connections |
| Venae advehentes | Afferent channels between subhepatic region and hepatic sinusoidal plexus | Carry blood toward sinusoids | Use directional arrows and clear legend |
| Venae revehentes | Efferent channels between sinusoids and cranial / subdiaphragmatic outflow | Drain sinusoids toward sinus venosus | Use directional arrows and clear legend |
| Hepatic sinusoidal plexus | Within developing liver | Forms specialized sinusoidal vascular network; classical account emphasizes extensive interruption / redistribution of intrahepatic vitelline channels | Label as classical and do not overstate consensus |
| Mesenteric venous termination | Caudal connection of developing mesenteric venous drainage to left vitelline side in classical scheme | Joins retained left vitelline segment that forms caudal portal trunk | Keep superior mesenteric / splenic tributary development separately sourced |
| Portal trunk | Runs around duodenum | Left vitelline segment + middle dorsal IVA + right vitelline segment between middle and subhepatic IVA | Show lineage tracing to each precursor segment |
| Portal sinus / sinus intermedius | At subhepatic / hilar region | Derived from subhepatic IVA in the 2008 account; links portal and umbilical circulations in fetal liver | Show umbilical connection as context-only |
| Right intrahepatic portal branches | Within right liver | Vitelline contributions are described | Do not extrapolate to all left branches |
| Left intrahepatic portal branches | Within left liver | Classical descriptions vary; Collardeau describes branches from portal sinus tributaries | Display source-specific lineage and flag differences |

## 2. Human 3D reconstruction / lineage profile (Hikspoors et al., 2017)

| Structure / segment | Human reconstruction observation | Fate / relationship reported | Implementation status |
|---|---|---|---|
| Paired right and left vitelline veins | Present at CS10 along yolk-sac stalk; join venous sinus through hepatocardiac channels | Become incorporated into dorsolateral liver wings by CS13; remain identifiable temporarily | Model as separate conduits with stage-specific dorsal bending |
| Right hepatocardiac channel | Becomes substantially wider than left-sided counterpart | Enlarges and persists as right-sided outflow channel | Show enlargement and rightward asymmetry |
| Left hepatocardiac channel | Incorporated into venous sinus wall and becomes difficult to discern after CS13 | Narrows / disappears as a distinct channel | Animate as source-specific regression |
| Right intrahepatic vitelline conduit | Wide, dorsally bent conduit; wider than left | Persists longer; right vitelline (portal) vein contributes to right portal branches; portal sinus forms between it and left umbilical vein | Keep vessel identity and portal sinus as distinct objects |
| Left intrahepatic vitelline conduit | Initially identifiable within left dorsolateral liver region | Breaks up / disappears as a large conduit by early CS14 in the reconstructed series | Show progressive change without asserting all sinusoids are derived from it |
| Dorsal extrahepatic intervitelline anastomosis | Develops at CS13 just caudal to dorsal pancreatic bud; well-formed by early CS14 | Connects right and left vitelline veins | Primary extrahepatic connection in this profile |
| Transient ventral intervitelline anastomosis | Small and more caudal than dorsal connection; described during CS14 only | Transient connection; not equivalent to a permanent classical caudal ring | Display only in its described stage window |
| Future portal vein precursor | Small left-sided vein from developing midgut mesentery joins left vitelline vein just upstream of dorsal anastomosis | Forms extrahepatic portal entry in this account | Model separately from vitelline trunk |
| Portal sinus / umbilico-vitelline shunt | Forms between left umbilical vein in liver hilum and right vitelline (portal) vein | Becomes a transverse component of left portal venous pathway | Show left umbilical vein only as context-only; clearly identify this as a shunt |
| Right intrahepatic portal branches | Arise from right vitelline (portal) vein | Supply right-sided liver territory | Trace to right vitelline conduit |
| Left intrahepatic portal branches | Arise from left umbilical vein in the described reconstruction | Supply left-sided liver territory | Mark as umbilical-lineage context; defer full modeling to umbilical module |
| Venous duct / ductus venosus | Connection between left umbilical vein and right hepatocardiac channel | Separate from portal sinus; not a vitelline-vein derivative | Show as muted context-only vessel |
| Right umbilico-vitelline shunt | Hilar connection between left umbilical vein and right vitelline vein | Described as portal sinus | Show separately from venous duct |
| Left-right positional shift | Sinuatrial junction moves rightward; left umbilical circulation becomes dominant | Contributes to asymmetric shunt formation | Animate positional / caliber changes only schematically |

## 3. Lineage and regression coding rules

Every modeled segment must have:
- a stable anatomical ID;
- a source-profile ID;
- a stage-specific state;
- a lineage / predecessor list;
- a fate classification;
- an explicit connection list;
- a confidence / evidence note;
- a citation list.

Allowed state values:
- not-yet-present
- present
- enlarging
- remodeling
- temporarily-patent
- regressing
- incorporated
- persistent
- not-observed-in-profile
- uncertain

Allowed fate values:
- persists
- regresses
- remodels-into
- contributes-to
- incorporated-without-direct-lineage-claim
- transient-connection
- context-only
- uncertain

**Important:** not-observed-in-profile is not the same as regressed. Absence from a reconstruction must not be silently converted into a biological regression event.

## 4. Adult derivative mapping — conservative wording

| Adult / fetal structure | Vitelline relationship to teach | Caution |
|---|---|---|
| Main portal vein | Classical model: selected segments of both vitelline veins plus middle dorsal anastomosis; 2017 model: left-sided midgut-derived precursor enters left vitelline vein, with right vitelline conduit contributing to portal arrangement | Present as competing developmental explanations |
| Right intrahepatic portal branches | Vitelline contribution is supported in both accounts, with 2017 study identifying right vitelline origin | Keep source attribution explicit |
| Left intrahepatic portal branches | 2017 study identifies left umbilical vein contribution; classical descriptions vary and include portal sinus tributaries | Do not assign all left branches to vitelline veins |
| Hepatic sinusoids | Associated with vascular channels entering / developing within hepatic primordium; classical account emphasizes remodeling of vitelline channels; 2017 account challenges wholesale fragmentation | Avoid a single unqualified lineage claim |
| Hepatic venous outflow | Vitelline-related efferent channels / venae revehentes and hepatocardiac channels | Exact developmental interpretation is source-dependent |
| Hepatic segment of IVC | Associated with right vitelline / right hepatocardiac outflow | The rest of the IVC is not vitelline-derived |
| Portal sinus | Classical account: subhepatic IVA-derived; 2017 account: left umbilical-to-right vitelline shunt | Keep the two models separate |
| Ductus venosus | Not a vitelline derivative; connects umbilical inflow with systemic venous outflow | Context only in this module |

## 5. Source notes

Primary comparison:
- Collardeau-Frachon & Scoazec (2008), sections “Development of Intervitelline Anastomoses,” “Development of the Portal Vein,” and “Remodeling of the Umbilical Circulation.”
- Hikspoors et al. (2017), sections “Enclosure of the vitelline and umbilical veins by hepatoblasts,” “Right-sided hepatic drainage to the heart,” “Anastomoses in the hilar region,” “Origin of intrahepatic portions of portal veins,” and “Extrahepatic intervitelline and interumbilical anastomoses.”

See REFERENCES.md.