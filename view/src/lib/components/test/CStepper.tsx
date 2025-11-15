//-Path: "react-choco-ui/lib/src/components/test/CStepper.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CStepperType = ChocoUi.Ui<'div'>;

export const CStepper = customUi<CStepperType>('div', 'CStepper')()();
