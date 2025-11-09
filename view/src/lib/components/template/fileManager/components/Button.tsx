//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Button.tsx"
import './Button.scss';
import { ChocoUi } from '$Type/Choco';
import { createUi } from '$/custom/test/createUi';

export type ButtonType = ChocoUi.Ui<
    'button',
    { p?: string | number; color?: ChocoUi.Color }
>;

export const Button = createUi<ButtonType>(
    ({ className, color = 'primary', p = '0.4rem 0.8rem', ...props }) => {
        return (
            <button
                className={`fm-button fm-button-${color} ${className}`}
                style={{ padding: p }}
                {...props}
            />
        );
    },
    'Button',
);
