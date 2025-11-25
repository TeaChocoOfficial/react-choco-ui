//-Path: "react-choco-ui/lib/src/components/test/CTextarea.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CTextareaType = ChocoUi.Ui<'div'>;

export const CTextarea = customUi<CTextareaType>('div', 'CTextarea')()();
