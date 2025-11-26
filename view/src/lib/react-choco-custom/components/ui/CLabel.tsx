//-Path: "react-choco-ui/lib/src/components/ui/CLable.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CLabelType = ChocoUi.Ui<'label'>;

export const CLabel = customUi<CLabelType>('label', 'CLabel')()();
