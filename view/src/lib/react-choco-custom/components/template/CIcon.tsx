//-Path: "react-choco-ui/lib/src/components/template/CIcon.tsx"
import { CText, CTextType } from '../ui/CText';
import { Icon, IconProp, TypeIcon, typeIcons } from '../custom/Icon';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CIconType = ChocoUi.Ui<
    typeof CText,
    IconProp &
        CTextType['Prop'] & {
            color?: ChocoUi.Color.ColorKeys;
            disabled?: boolean;
        },
    CTextType['Element']
>;

export function renderIcon<Render = React.ReactNode>(
    icon?: TypeIcon | React.ReactNode,
    props?: CIconType['Props'],
): Render {
    if (typeof icon === 'string' && typeIcons.includes(icon as TypeIcon)) {
        return (<CIcon icon={icon as TypeIcon} {...props} />) as Render;
    }
    return icon as Render;
}

export const CIcon = customUi<CIconType>(
    CText,
    'CIcon',
)(
    ({
        props: {
            icon,
            ai,
            bi,
            bs,
            cg,
            ci,
            di,
            fa,
            fa6,
            fc,
            fi,
            gi,
            go,
            gr,
            hi,
            hi2,
            im,
            io,
            io5,
            lia,
            lib,
            lu,
            md,
            pi,
            ri,
            rx,
            si,
            sl,
            tb,
            tfi,
            ti,
            vsc,
            wi,
            solid,
            brand,
            regular,
            props,

            ...textProps
        },
        ref,
    }) => {
        const iconProps: IconProp = {
            icon,
            ai,
            bi,
            bs,
            cg,
            ci,
            di,
            fa,
            fa6,
            fc,
            fi,
            gi,
            go,
            gr,
            hi,
            hi2,
            im,
            io,
            io5,
            lia,
            lib,
            lu,
            md,
            pi,
            ri,
            rx,
            si,
            sl,
            tb,
            tfi,
            ti,
            vsc,
            wi,
            solid,
            brand,
            regular,
            props,
        };

        return (
            <CText ref={ref} dFlex aiCenter {...textProps}>
                <Icon {...iconProps} />
            </CText>
        );
    },
)();
