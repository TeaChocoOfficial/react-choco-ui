//-Path: "react-choco-ui/lib/src/components/ui/CText.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CTextType = ChocoUi.Ui<'p'>;

export const CText = customUi<CTextType>('p', 'CText')()();
