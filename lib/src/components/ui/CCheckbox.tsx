//-Path: "react-choco-ui/lib/src/components/ui/CCheckbox.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CCheckboxType = ChocoUi.Ui<'input'>;

export const CCheckbox = customUi<CCheckboxType>(
    'input',
    'CCheckbox',
)(({ props: { className, ...props }, ref }) => {
    return (
        <input
            ref={ref}
            className={`fm-checkbox ${className}`}
            {...props}
            type="checkbox"
        />
    );
})()