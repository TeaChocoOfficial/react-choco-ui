//-Path: "react-choco-ui/lib/src/components/test/CBadge.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CBadgeType = ChocoUi.Ui<'div'>;

export const CBadge = customUi<CBadgeType>('div', 'CBadge')()();
