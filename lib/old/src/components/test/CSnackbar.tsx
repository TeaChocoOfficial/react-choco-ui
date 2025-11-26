//-Path: "react-choco-ui/lib/src/components/test/CSnackbar.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CSnackbarType = ChocoUi.Ui<'div'>;

export const CSnackbar = customUi<CSnackbarType>('div', 'CSnackbar')()();
