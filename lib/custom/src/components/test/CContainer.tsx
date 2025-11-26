//-Path: "react-choco-ui/lib/src/components/test/CContainer.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CContainerType = ChocoUi.Ui<'div'>;

export const CContainer = customUi<CContainerType>('div', 'CContainer')()();
