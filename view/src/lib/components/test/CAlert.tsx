//-Path: "react-choco-ui/lib/src/components/test/CAlert.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CAlertType = ChocoUi.Ui<'div'>;

export const CAlert = customUi<CAlertType>('div', 'CAlert')()();
