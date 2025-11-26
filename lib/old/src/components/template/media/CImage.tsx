//-Path: "react-choco-ui/lib/src/components/template/media/CImage.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CImageType = ChocoUi.Ui<'img'>;

export const CImage = customUi<CImageType>('img', 'CImage')()();
