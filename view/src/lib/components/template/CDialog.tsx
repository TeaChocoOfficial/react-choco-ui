//-Path: "react-choco-ui/lib/src/components/template/CDialog.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CDialogType = ChocoUi.Ui<'div', { open?: boolean }>;

export const CDialog = customUi<CDialogType>(
    'div',
    'CDialog',
)(({ props: { ...props }, ref }) => {
    return <div ref={ref} {...props} />;
});
