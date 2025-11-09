//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/ErrorTooltip.tsx"
import './ErrorTooltip.scss';
import { UiTypes } from '$Type/ui';
import { createUi } from '$/custom/test/createUi';
import { FileManager } from '$Hook/fileManager/fileManager';

export type ErrorTooltipType = UiTypes<
    'p',
    {
        message?: React.ReactNode;
        xPlacement: FileManager.ErrorPlacement;
        yPlacement: FileManager.ErrorPlacement;
    }
>;

export const ErrorTooltip = createUi<ErrorTooltipType>(
    ({ message, xPlacement, yPlacement, ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={`error-tooltip ${xPlacement} ${yPlacement}`}
                {...props}
            >
                {message}
            </p>
        );
    },
);
