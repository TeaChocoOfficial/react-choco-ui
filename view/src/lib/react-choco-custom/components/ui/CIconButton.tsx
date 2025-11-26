//-Path: "react-choco-ui/lib/src/components/ui/CIconButton.tsx"
import { Icon, TypeIcon } from '../custom/Icon';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CIconButtonType = ChocoUi.Ui<
    'button',
    ChocoUi.Custom.ContainerProps & { icon?: TypeIcon }
>;

export const CIconButton = customUi<CIconButtonType>(
    'button',
    'CIconButton',
)(({ ref, Element, restProps: { icon, children, ...restProps } }) => (
    <Element ref={ref} {...restProps}>
        {icon && <Icon icon={icon} />}
        {children}
    </Element>
))(
    (
        { sz, text = true, color, outline, disabled, container },
        { chocoColor },
    ) => {
        const styles = chocoColor.style({
            text,
            color,
            outline,
            disabled,
            container,
            defaultColor: 'primaryText',
        });
        return {
            p: sz,
            dp: 'f',
            ai: 'c',
            jc: 'c',
            br: null,
            cur: 'p',
            wh: sz * 32,
            circlr: true,
            bgClr: 'transparent',
            ...styles.cs,
        };
    },
);
