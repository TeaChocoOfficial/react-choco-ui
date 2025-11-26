//-Path: "react-choco-ui/lib/src/components/test/CTable.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CTableType = ChocoUi.Ui<'div'>;

export const CTable = customUi<CTableType>('div', 'CTable')()();
