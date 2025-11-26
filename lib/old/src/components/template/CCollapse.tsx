//-Path: "react-choco-ui/lib/src/components/template/CCollapse.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { useCollapse } from 'react-collapsed';

export type CollapseState =
    | 'expandStart'
    | 'expandEnd'
    | 'expanding'
    | 'collapseStart'
    | 'collapseEnd'
    | 'collapsing';

export type CCollapseType = ChocoUi.Ui<
    'div',
    {
        /**
         * Unique identifier used to for associating elements appropriately for accessibility.
         */
        uid?: string | number;
        /**
         * If true, the collapsible element is expanded.
         */
        open?: boolean;
        /**
         * Sets the transition-timing-function of the animation.
         * @default 'cubic-bezier(0.4, 0, 0.2, 1)'
         */
        easing?: string;
        /**
         * Sets the duration of the animation. If undefined, a 'natural' duration is
         * calculated based on the distance of the animation.
         */
        duration?: number;
        /**
         * If true, the collapsible element is expanded when it initially mounts.
         * @default false
         */
        defaultOpen?: boolean;
        /**
         * Handler called at each stage of the animation.
         */
        onTransition?: (state: CollapseState) => void;
        /**
         * Sets the height (Number) to which the elements collapses.
         * @default 0
         */
        collapsedHeight?: number;
        /**
         * If true, the animation is disabled. Overrides the hooks own logic for
         * disabling the animation according to reduced motion preferences.
         */
        disabledAnimation?: boolean;
    }
>;

export const CCollapse = customUi<CCollapseType>(
    'div',
    'CCollapse',
)(
    ({
        ref,
        Element,
        restProps: {
            uid,
            open,
            easing,
            duration,
            defaultOpen,
            onTransition,
            collapsedHeight,
            disabledAnimation,
            ...restProps
        },
    }) => {
        const { getCollapseProps } = useCollapse({
            easing,
            id: uid,
            duration,
            collapsedHeight,
            isExpanded: open,
            defaultExpanded: defaultOpen,
            onTransitionStateChange: onTransition,
            hasDisabledAnimation: disabledAnimation,
        });

        const { ref: collapseRef, ...collapseProps } = getCollapseProps();
        ref = collapseRef as React.RefObject<HTMLDivElement>;

        return <Element ref={ref} {...collapseProps} {...restProps} />;
    },
)();
