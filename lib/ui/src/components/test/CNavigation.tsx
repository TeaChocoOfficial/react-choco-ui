//-Path: "react-choco-ui/lib/src/components/test/CNavigation.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CNavigationType = ChocoUi.Ui<'div'>;

export const CNavigation = customUi<CNavigationType>('div', 'CNavigation')()();
