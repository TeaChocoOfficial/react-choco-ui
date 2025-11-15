//-Path: "react-choco-ui/lib/src/components/ui/CProgress.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CProgressType = ChocoUi.Ui<'div'>;

export const CProgress = customUi<CProgressType>('div', 'CProgress')()();
