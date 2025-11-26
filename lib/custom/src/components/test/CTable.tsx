//-Path: "react-choco-ui/lib/src/components/test/CTable.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CTableType = ChocoUi.Ui<'div'>;

export const CTable = customUi<CTableType>('div', 'CTable')()();
