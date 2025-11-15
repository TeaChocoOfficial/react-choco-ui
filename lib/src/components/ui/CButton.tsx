//-Path: "react-choco-ui/lib/src/components/ui/CButton.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CButtonType = ChocoUi.Ui<'button', ChocoUi.Custom.ContainerProps>;

export const CButton = customUi<CButtonType>('button', 'CButton')()(
    ({ text, color, outline, disabled }, { theme, chocoColor }) => {
        const styles = chocoColor.style({ text, color, outline, disabled });
        console.log(styles);

        return {
            py: 2,
            px: 4,
            borR: theme.shape.border.radius,
            ...styles.cs,
        };
    },
);
