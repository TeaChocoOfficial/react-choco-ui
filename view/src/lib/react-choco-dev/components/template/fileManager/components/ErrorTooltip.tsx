//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/components/ErrorTooltip.tsx"
import { FileManager } from '../../../../hooks/fileManager/fileManager';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

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
)(
    ({
        ref,
        Element,
        restProps: { message, xPlacement, yPlacement, ...restProps },
    }) => {
        return (
            <Element
                ref={ref}
                className={`error-tooltip ${xPlacement} ${yPlacement}`}
                {...restProps}
            >
                {message}
            </Element>
        );
    },
)({
    z: 1,
    m: 0,
    p: 2,
    l: 16,
    w: 300,
    b: -68,
    ta: 'l',
    borR: 2,
    pos: 'a',
    bgClr: 'paper',
});
