//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Button.tsx"
import './Button.scss';
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type ButtonType = ChocoUi.Ui<
    'button',
    { p?: string | number; color?: ChocoUi.Color.ColorsType }
>;

export const Button = customUi<ButtonType>(
    'button',
    'Button',
)(
    ({
        props: { className, color = 'primary', p = '0.4rem 0.8rem', ...props },
        ref,
    }) => {
        return (
            <button
                ref={ref}
                style={{ padding: p }}
                className={`fm-button fm-button-${color} ${className}`}
                {...props}
            />
        );
    },
)();
