//-Path: "react-choco-ui/lib/src/components/test/CInput.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CInputType = ChocoUi.Ui<'div'>;

export const CInput = customUi<CInputType>('div', 'CInput')()();
