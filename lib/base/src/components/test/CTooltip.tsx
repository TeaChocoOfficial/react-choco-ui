//-Path: "react-choco-ui/lib/src/components/test/CTooltip.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CTooltipType = ChocoUi.Ui<'div'>;

export const CTooltip = customUi<CTooltipType>('div', 'CTooltip')()();
