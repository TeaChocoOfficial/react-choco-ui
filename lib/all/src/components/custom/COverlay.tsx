//-Path: "react-choco-ui/lib/src/components/custom/COverlay.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { CBox, CBoxType } from '$Compo/ui/CBox';

export type COverlayType = ChocoUi.Ui<
    'div',
    {
        show?: boolean;
        bgProps?: CBoxType['Prop'];
        colors?: ChocoUi.Color.ColorsType;
        onClose?: React.MouseEventHandler<HTMLDivElement>;
    }
>;

export const COverlay = customUi<COverlayType>(
    'div',
    'COverlay',
)(
    ({
        Element,
        restProps: {
            bgProps,
            onClose,
            children,
            colors = 'common.overlay-10',
            ...restProps
        },
        ref,
    }) => (
        <Element ref={ref} {...restProps}>
            <CBox
                posA
                t={0}
                l={0}
                screen
                bgClr={colors}
                onClick={onClose}
                {...bgProps}
            />
            {children}
        </Element>
    ),
)(({ show }) => ({
    z: 'overlay',
    t: 0,
    l: 0,
    ai: 'c',
    jc: 'c',
    dp: 'f',
    pos: 'f',
    screen: true,
    op: show ? 1 : 0,
    us: show ? 'a' : 'n',
    delay: 'opacity  0.5s',
    event: show ? 'a' : 'n',
}));
