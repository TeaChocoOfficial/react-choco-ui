//-Path: "react-choco-ui/lib/src/components/ui/CProgress.tsx"
import { UiTypes } from '$Type/ui';
import { createUi } from '$/custom/test/createUi';

export type CProgressType = UiTypes;

export const CProgress = createUi<CProgressType>(({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
}, 'CProgress');
