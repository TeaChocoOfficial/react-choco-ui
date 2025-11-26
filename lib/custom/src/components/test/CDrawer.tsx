//-Path: "react-choco-ui/lib/src/components/test/CDrawer.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CDrawerType = ChocoUi.Ui<'div'>;

export const CDrawer = customUi<CDrawerType>('div', 'CDrawer')()();
