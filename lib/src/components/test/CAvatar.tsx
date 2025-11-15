//-Path: "react-choco-ui/lib/src/components/test/CAvatar.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CAvatarType = ChocoUi.Ui<'div'>;

export const CAvatar = customUi<CAvatarType>('div', 'CAvatar')()();
