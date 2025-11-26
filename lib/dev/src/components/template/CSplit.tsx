//-Path: "react-choco-ui/lib/dev/src/components/template/CSplit.tsx"
import {
    Allotment,
    type AllotmentProps,
    type AllotmentHandle,
} from 'allotment';
import { setSashSize } from 'allotment';
import { SpilteStyle } from './SpilteStyle';
import { PaneProps } from 'allotment/dist/types/src/allotment.js';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CSplitType = ChocoUi.Ui<
    'div',
    {
        aId?: string;
        sash?: number;
        sashHover?: number;
        sashDelay?: number;
        children?: React.ReactNode;
        focusColor?: ChocoUi.Color.ColorsType;
        separatorColor?: ChocoUi.Color.ColorsType;
    } & Omit<AllotmentProps, 'children'>,
    AllotmentHandle
>;

export type CSplitPaneType = ChocoUi.Ui<
    typeof Allotment.Pane,
    PaneProps & { children?: React.ReactNode },
    HTMLDivElement
>;

export const CSplitMain = customUi<CSplitType>(
    'div',
    'CSplitMain',
)(
    ({
        ref,
        Element,
        restProps: {
            aId,
            snap,
            sizes,
            minSize,
            maxSize,
            onReset,
            onChange,
            vertical,
            children,
            separator,
            onDragEnd,
            focusColor,
            onDragStart,
            defaultSizes,
            separatorColor,
            onVisibleChange,
            proportionalLayout,
            ...restProps
        },
    }) => (
        <Element {...restProps}>
            {children}
            {/* <Allotment
                id={aId}
                ref={ref}
                snap={snap}
                sizes={sizes}
                minSize={minSize}
                maxSize={maxSize}
                onReset={onReset}
                onChange={onChange}
                vertical={vertical}
                separator={separator}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
                defaultSizes={defaultSizes}
                onVisibleChange={onVisibleChange}
                proportionalLayout={proportionalLayout}
            >
                {children}
            </Allotment> */}
        </Element>
    ),
)(SpilteStyle);

// สร้าง Pane component แยก
export const CSplitPane = customUi<CSplitPaneType>(
    Allotment.Pane,
    'CSplitPane',
)(
    ({
        ref,
        Element,
        restProps: {
            snap,
            minSize,
            maxSize,
            visible,
            priority,
            children,
            preferredSize,
            ...restProps
        },
    }) => (
        <Element
            ref={ref}
            snap={snap}
            minSize={minSize}
            maxSize={maxSize}
            visible={visible}
            priority={priority}
            preferredSize={preferredSize}
            {...restProps}
        >
            {children}
        </Element>
    ),
)({ full: true });

export const CSplit = CSplitMain as ChocoUi.Uis<
    CSplitType,
    { Pane: CSplitPaneType }
>;

CSplit.Pane = CSplitPane;

// max is 10
export const setSplitSashSize = (sashSize: number) => setSashSize(sashSize);
