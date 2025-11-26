//-Path: "react-choco-ui/lib/src/components/template/media/CAudio.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CAudioType = ChocoUi.Ui<'audio'>;

export const CAudio = customUi<CAudioType>('audio', 'CAudio')()();
