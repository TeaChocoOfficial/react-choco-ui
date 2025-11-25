//-Path: "react-choco-ui/lib/src/components/ui/CLable.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CLabelType = ChocoUi.Ui<'label'>;

export const CLabel = customUi<CLabelType>('label', 'CLabel')()();
