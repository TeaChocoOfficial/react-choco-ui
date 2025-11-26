//-Path: "react-choco-ui/lib/src/components/test/CSkeleton.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CSkeletonType = ChocoUi.Ui<'div'>;

export const CSkeleton = customUi<CSkeletonType>('div', 'CSkeleton')()();
