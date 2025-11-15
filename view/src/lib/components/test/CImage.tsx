//-Path: "react-choco-ui/lib/src/components/test/CImage.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CImageType = ChocoUi.Ui<'div'>;

export const CImage = customUi<CImageType>('div', 'CImage')()();
