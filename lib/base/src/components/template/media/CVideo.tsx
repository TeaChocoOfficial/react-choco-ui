//-Path: "react-choco-ui/lib/src/components/template/media/CVideo.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CVideoType = ChocoUi.Ui<'video'>;

export const CVideo = customUi<CVideoType>('video', 'CVideo')()();
