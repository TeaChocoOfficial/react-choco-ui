//-Path: "react-choco-ui/view/src/lib/components/ui/CProgress.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CProgressType = ChocoUi.Ui;

export const CProgress = customUi<CProgressType>('div', 'CProgress')()();
