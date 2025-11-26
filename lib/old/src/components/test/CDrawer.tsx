//-Path: "react-choco-ui/lib/src/components/test/CDrawer.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CDrawerType = ChocoUi.Ui<'div'>;

export const CDrawer = customUi<CDrawerType>('div', 'CDrawer')()();
