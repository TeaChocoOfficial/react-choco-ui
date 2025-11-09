//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/NameInput.tsx"
import './NameInput.scss';
import { ChocoUi } from '$Type/Choco';
import { tw } from '$/config/utils';
import { createUi } from '$/custom/test/createUi';

export type NameInputType = ChocoUi.Ui<'textarea'>;

export const NameInput = createUi<NameInputType>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={tw('rename-file', className)}
                {...props}
            />
        );
    },
);
