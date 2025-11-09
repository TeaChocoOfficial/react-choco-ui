//-Path: "react-choco-ui/lib/src/components/template/CDialog.tsx"
import { UiTypes } from '$Type/ui';
import { createUi } from '$/custom/test/createUi';

export type CDialogType = UiTypes<'div', { open?: boolean }>;

export const CDialog = createUi<CDialogType>(({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
}, 'CDialog');
