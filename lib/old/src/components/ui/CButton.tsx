//-Path: "react-choco-ui/lib/src/components/ui/CButton.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CButtonType = ChocoUi.Ui<'button', ChocoUi.Custom.ContainerProps>;

export const CButton = customUi<CButtonType>('button', 'CButton')()(
    ({ sz, text, color, outline, disabled }, { theme, chocoColor }) => {
        const styles = chocoColor.style({ text, color, outline, disabled });
        return {
            g: sz * 2,
            py: sz * 2,
            px: sz * 4,
            dp: 'f',
            ai: 'c',
            jc: 'c',
            cur: 'p',
            borR: theme.shape.border.radius,
            ...styles.cs,
        };
    },
);
