//-Path: "react-choco-ui/lib/src/components/test/CSkeleton.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CSkeletonType = ChocoUi.Ui<'div'>;

export const CSkeleton = customUi<CSkeletonType>('div', 'CSkeleton')()();
