//-Path: "react-choco-ui/lib/src/components/test/CMenu.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CMenuType = ChocoUi.Ui<'div'>;

export const CMenu = customUi<CMenuType>('div', 'CMenu')()();
