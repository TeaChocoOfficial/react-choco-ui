//-Path: "react-choco-ui/lib/src/components/ui/CText.tsx"
import { UiTypes } from '$Type/ui';
import { createUi } from '$/custom/test/createUi';

export type CTextType = UiTypes<'p'>;

export const CText = createUi<CTextType>(({ ...props }, ref) => {
    return <p ref={ref} {...props} />;
}, 'CText');
