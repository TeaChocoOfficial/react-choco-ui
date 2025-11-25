//-Path: "react-choco-ui/lib/src/components/test/CNavbar.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CNavbarType = ChocoUi.Ui<'div'>;

export const CNavbar = customUi<CNavbarType>('div', 'CNavbar')()();
