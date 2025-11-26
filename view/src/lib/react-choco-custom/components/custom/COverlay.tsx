//-Path: "react-choco-ui/lib/custom/src/components/custom/COverlay.tsx"
import { CBox, CBoxType } from '../ui/CBox';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type COverlayType = ChocoUi.Ui<
    'div',
    {
        show?: boolean;
        bgProps?: CBoxType['Prop'];
        colors?: ChocoUi.Color.ColorsType;
        onClose?: React.MouseEventHandler<HTMLDivElement>;
    }
>;

const createUi = customUi('div');
createUi

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
