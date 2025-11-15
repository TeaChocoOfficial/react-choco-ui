//-Path: "react-choco-ui/lib/src/components/template/CSplit.tsx"
import {
    Allotment,
    type AllotmentProps,
    type AllotmentHandle,
} from 'allotment';
import 'allotment/dist/style.css';
import { CBox } from '../ui/CBox';
import { ChocoUi } from '$Type/Choco';
import { setSashSize } from 'allotment';
import { customUi } from '$/custom/customUi';
import { PaneProps } from 'allotment/dist/types/src/allotment.js';

export type CSplitType = ChocoUi.Ui<
    typeof Allotment,
    AllotmentProps & { focusColor?: string; separatorColor?: string },
    AllotmentHandle
>;

export const CSplit = customUi<CSplitType>(
    Allotment,
    'CSplit',
)(({ props: { focusColor, separatorColor, p, ...props }, ref }) => {
    return (
        <CBox
            className="w-full h-full"
            style={
                {
                    '--focus-border': focusColor ?? '#007fd4',
                    '--separator-border': separatorColor ?? '#838383',
                } as React.CSSProperties
            }
        >
            <Allotment ref={ref} {...props} />
        </CBox>
    );
})();

export type CSplitPaneType = ChocoUi.Ui<'div', PaneProps>;

// สร้าง Pane component แยก
export const CSplitPane = customUi<CSplitPaneType>(
    'div',
    'CSplit',
)(({ props, ref }) => {
    return <Allotment.Pane ref={ref} {...props} />;
})();

// max is 10
export const setSplitSashSize = (sashSize: number) => setSashSize(sashSize);
