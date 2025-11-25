//-Path: "react-choco-ui/lib/src/components/test/CContainer.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CContainerType = ChocoUi.Ui<'div'>;

export const CContainer = customUi<CContainerType>('div', 'CContainer')()();
