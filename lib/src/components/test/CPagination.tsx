//-Path: "react-choco-ui/lib/src/components/test/CPagination.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CPaginationType = ChocoUi.Ui<'div'>;

export const CPagination = customUi<CPaginationType>('div', 'CPagination')()();
