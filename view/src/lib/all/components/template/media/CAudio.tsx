//-Path: "react-choco-ui/lib/src/components/template/media/CAudio.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CAudioType = ChocoUi.Ui<'audio'>;

export const CAudio = customUi<CAudioType>('audio', 'CAudio')()();
