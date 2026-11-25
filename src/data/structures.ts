export interface AnatomicalStructure {
  id: string;
  name: string;
  shortName: string;
  category: 'organ' | 'landmark' | 'context';
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
  { id: 'orientation-axes', name: 'Anatomical orientation axes', shortName: 'Orientation axes', category: 'landmark', description: 'Coordinate convention: +X embryonic right, +Y cranial, +Z dorsal. The anterior view is from the ventral side.', status: 'Navigation aid', color: '#9aa9bc' }
];

export type StructureVisibility = Record<string, boolean>;
export const DEFAULT_VISIBILITY: StructureVisibility = Object.fromEntries(
  ANATOMICAL_STRUCTURES.map((structure) => [structure.id, true])
);