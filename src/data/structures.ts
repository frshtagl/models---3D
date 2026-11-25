import { HEPATIC_VASCULAR_LAYERS } from './hepaticVascularNetwork';

export interface AnatomicalStructure {
  id: string;
  name: string;
  shortName: string;
  category: 'organ' | 'landmark' | 'context' | 'vessel';
  description: string;
  status: string;
  color: string;
}

export const ANATOMICAL_STRUCTURES: AnatomicalStructure[] = [
  { id: 'liver', name: 'Hepatic primordium', shortName: 'Liver primordium', category: 'organ', description: 'A schematic early hepatic mass used to orient developing hepatic vascular pathways. It is not a mature liver model.', status: 'Reference anatomy', color: '#c98a58' },
  { id: 'duodenum', name: 'Duodenum', shortName: 'Duodenum', category: 'organ', description: 'A curved gut landmark. Its dorsal and ventral surfaces are essential for understanding the depth of retroduodenal and ventral intervitelline connections.', status: 'Reference anatomy', color: '#e5b77f' },
  { id: 'foregut', name: 'Foregut reference', shortName: 'Foregut', category: 'organ', description: 'A simplified foregut segment that provides orientation for the hepatic diverticulum and duodenal region.', status: 'Context structure', color: '#c78f78' },
  { id: 'yolk-sac', name: 'Yolk sac / umbilical vesicle', shortName: 'Yolk sac', category: 'context', description: 'The vitelline veins drain the yolk sac. This context structure is schematic and does not depict the full extraembryonic circulation.', status: 'Context structure', color: '#d6a94f' },
  { id: 'sinus-venosus', name: 'Sinus venosus / venous pole', shortName: 'Sinus venosus', category: 'landmark', description: 'The venous pole is the cranial destination for early paired venous inflows. This landmark is shown without modeling the full heart.', status: 'Landmark', color: '#6c9acb' },
  { id: 'transverse-septum', name: 'Transverse septum region', shortName: 'Transverse septum', category: 'landmark', description: 'A positional reference for the hepatic primordium. The rendered sheet is a simplified spatial guide, not a histological reconstruction.', status: 'Landmark', color: '#7c9b8b' },
  { id: 'vitelline-right-yolk-sac-root', name: 'Right vitelline vein — yolk-sac root', shortName: 'Right yolk-sac root', category: 'vessel', description: 'The right vitelline channel begins in the yolk-sac venous drainage and joins the extrahepatic right-sided trunk. Its centerline is schematic.', status: 'Vitelline vessel · right', color: '#53b7d8' },
  { id: 'vitelline-right-extrahepatic', name: 'Right vitelline vein — extrahepatic trunk', shortName: 'Right extrahepatic trunk', category: 'vessel', description: 'The right extrahepatic vitelline trunk is kept lateral to the gut reference. No intervitelline anastomosis is included in this milestone.', status: 'Vitelline vessel · right', color: '#53b7d8' },
  { id: 'vitelline-right-intrahepatic', name: 'Right vitelline vein — intrahepatic conduit', shortName: 'Right intrahepatic conduit', category: 'vessel', description: 'A schematic right intrahepatic vitelline conduit. The 2017 human reconstruction describes a wider right-sided conduit that persists longer.', status: 'Vitelline vessel · right', color: '#53b7d8' },
  { id: 'vitelline-right-hepatocardiac', name: 'Right hepatocardiac channel — vitelline connection', shortName: 'Right hepatocardiac channel', category: 'vessel', description: 'The shared cranial hepatocardiac outlet receives vitelline and umbilical contributions. This module shows its vitelline connection; the umbilical contribution is deferred to the umbilical module.', status: 'Vitelline vessel · right', color: '#53b7d8' },
  { id: 'vitelline-left-yolk-sac-root', name: 'Left vitelline vein — yolk-sac root', shortName: 'Left yolk-sac root', category: 'vessel', description: 'The left vitelline channel begins in the yolk-sac venous drainage and joins the extrahepatic left-sided trunk. Its centerline is schematic.', status: 'Vitelline vessel · left', color: '#a58de4' },
  { id: 'vitelline-left-extrahepatic', name: 'Left vitelline vein — extrahepatic trunk', shortName: 'Left extrahepatic trunk', category: 'vessel', description: 'The left extrahepatic vitelline trunk is kept lateral to the gut reference and distinct from later portal anastomoses.', status: 'Vitelline vessel · left', color: '#a58de4' },
  { id: 'vitelline-left-intrahepatic', name: 'Left vitelline vein — intrahepatic conduit', shortName: 'Left intrahepatic conduit', category: 'vessel', description: 'The left intrahepatic vitelline conduit is initially paired with the right. In the 2017 reconstruction it breaks up as a large conduit by early CS14; this does not mean all left intrahepatic vascular channels disappear.', status: 'Vitelline vessel · left', color: '#a58de4' },
  { id: 'vitelline-left-hepatocardiac', name: 'Left hepatocardiac channel — vitelline connection', shortName: 'Left hepatocardiac channel', category: 'vessel', description: 'The shared left hepatocardiac outlet receives vitelline and umbilical contributions. This module shows only its vitelline connection; the channel later becomes incorporated into the sinus venosus wall and regresses as a distinct channel.', status: 'Vitelline vessel · left', color: '#a58de4' },
  ...HEPATIC_VASCULAR_LAYERS.map((layer) => ({ id: layer.id, name: layer.name, shortName: layer.shortName, category: 'vessel' as const, description: layer.description, status: layer.status, color: layer.color })),
  { id: 'orientation-axes', name: 'Anatomical orientation axes', shortName: 'Orientation axes', category: 'landmark', description: 'Coordinate convention: +X embryonic right, +Y cranial, +Z dorsal. The anterior view is from the ventral side.', status: 'Navigation aid', color: '#9aa9bc' }
];

export type StructureVisibility = Record<string, boolean>;
export const DEFAULT_VISIBILITY: StructureVisibility = Object.fromEntries(
  ANATOMICAL_STRUCTURES.map((structure) => [structure.id, true])
);