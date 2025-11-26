//-Path: "react-choco-ui/lib/src/components/test/CTextarea.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CTextareaType = ChocoUi.Ui<'div'>;

export const CTextarea = customUi<CTextareaType>('div', 'CTextarea')()();
