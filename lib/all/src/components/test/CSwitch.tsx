//-Path: "react-choco-ui/lib/src/components/test/CSwitch.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CSwitchType = ChocoUi.Ui<'div'>;

export const CSwitch = customUi<CSwitchType>('div', 'CSwitch')()();
