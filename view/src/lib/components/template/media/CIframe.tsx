//-Path: "react-choco-ui/lib/src/components/template/media/CIframe.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CIframeType = ChocoUi.Ui<
    'iframe',
    { frameBorder?: string | number }
>;

export const CIframe = customUi<CIframeType>('iframe', 'CIframe')()();
