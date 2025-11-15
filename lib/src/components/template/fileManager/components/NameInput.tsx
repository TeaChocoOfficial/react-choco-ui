//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/NameInput.tsx"
import './NameInput.scss';
import { tw } from '$/config/utils';
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type NameInputType = ChocoUi.Ui<'textarea'>;

export const NameInput = customUi<NameInputType>(
    'textarea',
    'NameInput',
)(({ props: { className, ...props }, ref }) => {
    return (
        <textarea
            ref={ref}
            className={tw('rename-file', className)}
            {...props}
        />
    );
})();
