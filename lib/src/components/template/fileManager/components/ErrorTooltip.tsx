//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/ErrorTooltip.tsx"
import './ErrorTooltip.scss';
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { FileManager } from '$Hook/fileManager/fileManager';

export type ErrorTooltipType = ChocoUi.Ui<
    'p',
    {
        message?: React.ReactNode;
        xPlacement: FileManager.ErrorPlacement;
        yPlacement: FileManager.ErrorPlacement;
    }
>;

export const ErrorTooltip = customUi<ErrorTooltipType>(
    'p',
    'ErrorTooltip',
)(({ props: { message, xPlacement, yPlacement, ...props }, ref }) => {
    return (
        <p
            ref={ref}
            className={`error-tooltip ${xPlacement} ${yPlacement}`}
            {...props}
        >
            {message}
        </p>
    );
})();
