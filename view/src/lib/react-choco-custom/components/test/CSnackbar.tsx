//-Path: "react-choco-ui/lib/src/components/test/CSnackbar.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CSnackbarType = ChocoUi.Ui<'div'>;

export const CSnackbar = customUi<CSnackbarType>('div', 'CSnackbar')()();
