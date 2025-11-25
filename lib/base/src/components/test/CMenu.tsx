//-Path: "react-choco-ui/lib/src/components/test/CMenu.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CMenuType = ChocoUi.Ui<'div'>;

export const CMenu = customUi<CMenuType>('div', 'CMenu')()();
