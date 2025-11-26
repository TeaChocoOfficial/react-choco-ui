//-Path: "react-choco-ui/lib/src/components/test/CSlider.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CSliderType = ChocoUi.Ui<'div'>;

export const CSlider = customUi<CSliderType>('div', 'CSlider')()();
