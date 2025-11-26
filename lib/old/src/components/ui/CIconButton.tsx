//-Path: "react-choco-ui/lib/src/components/ui/CIconButton.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { Icon, TypeIcon } from '$Compo/custom/Icon';

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
