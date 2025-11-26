//-Path: "react-choco-ui/lib/src/components/template/media/CIframe.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CIframeType = ChocoUi.Ui<
    'iframe',
    { frameBorder?: string | number }
>;

export const CIframe = customUi<CIframeType>('iframe', 'CIframe')()();
