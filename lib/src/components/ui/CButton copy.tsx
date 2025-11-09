//-Path: "react-choco-ui/lib/src/components/ui/CButton.tsx"
import { tw } from '$/config/utils';
import { ChocoUi } from '$Type/Choco';
import { createUi } from '$/custom/test/createUi';

export type CButtonType = ChocoUi.Ui<
    'button',
    {
        variant?: 'primary' | 'secondary' | 'outline';
        size?: 'sm' | 'md' | 'lg';
        children?: React.ReactNode;
        theme?: 'secondary' | 'danger';
    }
>;

// ใช้ ForwardRefExoticComponent แทน React.FC
export const CButton = createUi<CButtonType>(
    (
        {
            variant = 'primary',
            size = 'md',
            children,
            className = '',
            ...props
        },
        ref,
    ) => {
        // const { button } = useTheme();
        const baseClasses = tw`font-medium rounded-lg transition-colors`;

        const variantClasses = tw({
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-600 text-white hover:bg-gray-700': variant === 'secondary',
            'border-2 border-blue-600 text-blue-600 hover:bg-blue-50':
                variant === 'outline',
        });

        const sizeClasses = tw({
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
        });

        const combinedClasses = tw(
            baseClasses,
            variantClasses,
            sizeClasses,
            className,
        );

        return (
            <button ref={ref} className={combinedClasses} {...props}>
                {children}
            </button>
        );
    },
    'CButton',
);
