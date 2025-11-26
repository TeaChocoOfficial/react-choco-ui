//-Path: "react-choco-ui/lib/src/components/test/CChip.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CChipType = ChocoUi.Ui;

export const CChip = customUi<CChipType>('div', 'CChip')()();
