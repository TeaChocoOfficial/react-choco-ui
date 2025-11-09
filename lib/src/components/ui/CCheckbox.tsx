//-Path: "react-choco-ui/lib/src/components/ui/CCheckbox.tsx"
import { ChocoUi } from '$Type/Choco';
import { createUi } from '$/custom/test/createUi';

// ระบุ override สำหรับ Element และ Ref
export type CCheckboxType = ChocoUi.Ui<'input'>;

export const CCheckbox = createUi<CCheckboxType>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`fm-checkbox ${className}`}
                {...props}
                type="checkbox"
            />
        );
    },
    'CCheckbox',
);
