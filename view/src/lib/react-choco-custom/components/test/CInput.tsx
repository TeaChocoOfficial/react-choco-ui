//-Path: "react-choco-ui/lib/src/components/test/CInput.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CInputType = ChocoUi.Ui<'div'>;

export const CInput = customUi<CInputType>('div', 'CInput')()();
