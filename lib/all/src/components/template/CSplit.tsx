//-Path: "react-choco-ui/lib/src/components/template/CSplit.tsx"
import {
    Allotment,
    type AllotmentProps,
    type AllotmentHandle,
} from 'allotment';
import { ChocoUi } from '$Type/Choco';
import { setSashSize } from 'allotment';
import { customUi } from '$/custom/customUi';
import { PaneProps } from 'allotment/dist/types/src/allotment.js';

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
            <Allotment
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
            </Allotment>
        </Element>
    ),
)(
    ({
        sash = 8,
        sashHover = 4,
        sashDelay = 0.1,
        focusColor = 'secondary',
        separatorColor = 'common.surface-3',
    }) => ({
        full: true,
        // Root styles
        '.allotment-module_splitView__L-yRc': {
            of: 'h',
            pos: 'r',
            full: true,
        },
        '.allotment-module_splitView__L-yRc > .allotment-module_sashContainer__fzwJF':
            { pos: 'a', full: true, event: 'n' },
        '.allotment-module_splitView__L-yRc > .allotment-module_sashContainer__fzwJF > .allotment-module_sash__QA-2t':
            { event: 'a' },
        '.allotment-module_splitView__L-yRc > .allotment-module_splitViewContainer__rQnVa':
            { pos: 'r', full: true, whiteSpace: 'nowrap' },
        '.allotment-module_splitView__L-yRc > .allotment-module_splitViewContainer__rQnVa > .allotment-module_splitViewView__MGZ6O':
            { of: 'h', pos: 'a', whiteSpace: 'initial' },
        '.allotment-module_splitView__L-yRc.allotment-module_vertical__WSwwa > .allotment-module_splitViewContainer__rQnVa > .allotment-module_splitViewView__MGZ6O':
            { fullW: true },
        '.allotment-module_splitView__L-yRc.allotment-module_horizontal__7doS8 > .allotment-module_splitViewContainer__rQnVa > .allotment-module_splitViewView__MGZ6O':
            { fullH: true },

        // Separator border styles
        '.allotment-module_splitView__L-yRc.allotment-module_separatorBorder__x-rDS > .allotment-module_splitViewContainer__rQnVa > .allotment-module_splitViewView__MGZ6O:not(:first-of-type)::before':
            {
                z: 5,
                t: 0,
                l: 0,
                pos: 'a',
                coten: '',
                event: 'n',
                bgClr: separatorColor,
            },
        '.allotment-module_splitView__L-yRc.allotment-module_separatorBorder__x-rDS.allotment-module_vertical__WSwwa > .allotment-module_splitViewContainer__rQnVa > .allotment-module_splitViewView__MGZ6O:not(:first-of-type)::before':
            { h: 1, fullW: true },
        '.allotment-module_splitView__L-yRc.allotment-module_separatorBorder__x-rDS.allotment-module_horizontal__7doS8 > .allotment-module_splitViewContainer__rQnVa > .allotment-module_splitViewView__MGZ6O:not(:first-of-type)::before':
            { w: 1, fullH: true },

        // Sash base styles
        '.sash-module_sash__K-9lB': {
            z: 35,
            ta: 'i',
            pos: 'a',
            event: 'a',
            touchAction: 'none',
        },

        // Vertical sash cursor styles
        '.sash-module_sash__K-9lB.sash-module_mac__Jf6OJ.sash-module_vertical__pB-rs':
            { cur: 'cr' },
        '.sash-module_sash__K-9lB.sash-module_vertical__pB-rs.sash-module_minimum__-UKxp':
            { cur: 'er' },
        '.sash-module_sash__K-9lB.sash-module_vertical__pB-rs.sash-module_maximum__TCWxD':
            { cur: 'wr' },

        // Horizontal sash cursor styles
        '.sash-module_sash__K-9lB.sash-module_mac__Jf6OJ.sash-module_horizontal__kFbiw':
            { cur: 'rr' },
        '.sash-module_sash__K-9lB.sash-module_horizontal__kFbiw.sash-module_minimum__-UKxp':
            { cur: 'sr' },
        '.sash-module_sash__K-9lB.sash-module_horizontal__kFbiw.sash-module_maximum__TCWxD':
            { cur: 'nr' },

        // Disabled sash
        '.sash-module_sash__K-9lB.sash-module_disabled__Hm-wx': {
            cur: 'd',
            event: 'n',
        },

        // Vertical sash positioning
        '.sash-module_sash__K-9lB.sash-module_vertical__pB-rs': {
            t: 0,
            w: sash,
            cur: 'ewr',
            fullH: true,
        },

        // Horizontal sash positioning
        '.sash-module_sash__K-9lB.sash-module_horizontal__kFbiw': {
            l: 0,
            h: sash,
            cur: 'nsr',
            fullW: true,
        },

        // Orthogonal drag handle
        '.sash-module_sash__K-9lB:not(.sash-module_disabled__Hm-wx) > .sash-module_orthogonal-drag-handle__Yii2-':
            {
                z: 100,
                dp: 'b',
                pos: 'a',
                coten: '',
                wh: sash * 2,
                cursor: 'all-scroll',
            },

        // Orthogonal edge cursor styles
        '.sash-module_sash__K-9lB.sash-module_horizontal__kFbiw.sash-module_orthogonal-edge-north__f7Noe:not(.sash-module_disabled__Hm-wx) > .sash-module_orthogonal-drag-handle__Yii2-.sash-module_start__uZEDk, .sash-module_sash__K-9lB.sash-module_horizontal__kFbiw.sash-module_orthogonal-edge-south__6ZrFC:not(.sash-module_disabled__Hm-wx) > .sash-module_orthogonal-drag-handle__Yii2-.sash-module_end__0TP-R':
            { cursor: 'nwse-resize' },

        // Orthogonal edge cursor styles สำหรับทิศทางอื่น
        '.sash-module_sash__K-9lB.sash-module_horizontal__kFbiw.sash-module_orthogonal-edge-north__f7Noe:not(.sash-module_disabled__Hm-wx) > .sash-module_orthogonal-drag-handle__Yii2-.sash-module_end__0TP-R, .sash-module_sash__K-9lB.sash-module_horizontal__kFbiw.sash-module_orthogonal-edge-south__6ZrFC:not(.sash-module_disabled__Hm-wx) > .sash-module_orthogonal-drag-handle__Yii2-.sash-module_start__uZEDk':
            {
                cursor: 'nesw-resize',
            },

        // Orthogonal drag handle positioning สำหรับ vertical
        '.sash-module_sash__K-9lB.sash-module_vertical__pB-rs > .sash-module_orthogonal-drag-handle__Yii2-.sash-module_start__uZEDk':
            { l: sash * -0.5, t: sash * -1 },
        '.sash-module_sash__K-9lB.sash-module_vertical__pB-rs > .sash-module_orthogonal-drag-handle__Yii2-.sash-module_end__0TP-R':
            { l: sash * -0.5, b: sash * -1 },

        // Orthogonal drag handle positioning สำหรับ horizontal
        '.sash-module_sash__K-9lB.sash-module_horizontal__kFbiw > .sash-module_orthogonal-drag-handle__Yii2-.sash-module_start__uZEDk':
            { t: sash * -0.5, l: sash * -1 },
        '.sash-module_sash__K-9lB.sash-module_horizontal__kFbiw > .sash-module_orthogonal-drag-handle__Yii2-.sash-module_end__0TP-R':
            { t: sash * -0.5, r: sash * -1 },

        // Sash hover effect - before pseudo element
        '.sash-module_sash__K-9lB:before': {
            pos: 'a',
            coten: '',
            event: 'n',
            full: true,
            bgCLr: null,
            delay: `background-color ${sashDelay}s ease-out`,
        },

        // Vertical sash hover positioning
        '.sash-module_sash__K-9lB.sash-module_vertical__pB-rs:before': {
            w: sashHover,
            l: `calc(50% - (${sashHover / 2}px))`,
        },

        // Horizontal sash hover positioning
        '.sash-module_sash__K-9lB.sash-module_horizontal__kFbiw:before': {
            h: sashHover,
            t: `calc(50% - (${sashHover / 2}px))`,
        },

        // Hover and active states
        '.sash-module_sash__K-9lB.sash-module_hover__80W6I:before, .sash-module_sash__K-9lB.sash-module_active__bJspD:before':
            { bgClr: focusColor },
    }),
);

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
