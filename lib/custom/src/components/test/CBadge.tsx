//-Path: "react-choco-ui/lib/src/components/test/CBadge.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CBadgeType = ChocoUi.Ui<'div'>;

export const CBadge = customUi<CBadgeType>('div', 'CBadge')()();
