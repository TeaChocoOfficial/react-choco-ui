//-Path: "react-choco-ui/lib/src/components/test/CIconButton.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CIconButtonType = ChocoUi.Ui<'div'>;

export const CIconButton = customUi<CIconButtonType>('div', 'CIconButton')()();
