//-Path: "react-choco-ui/lib/src/components/ui/CPaper.tsx"
import { tw } from '$/config/utils';
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CPaperType = ChocoUi.Ui<
    'div',
    {
        /**
         * ระดับความสูงของเงา (elevation)
         * @default 1
         */
        elevation?:
            | 50
            | 100
            | 200
            | 300
            | 400
            | 500
            | 600
            | 700
            | 800
            | 900
            | 950;

        outlined?: boolean;

        /**
         * ทำให้มุมโค้งมน
         * @default true
         */
        square?: boolean;
    }
>;

export const CPaper = customUi<CPaperType>(
    'div',
    'CPaper',
)(
    ({
        props: {
            className,
            elevation = 500,
            outlined,
            square = false,
            children,
            ...props
        },
        ref,
    }) => {
        // Base classes
        const baseClasses = tw`tcco_ui duration-300 p-4 box-border`;

        // Background or border based on outlined prop
        const colorClasses = tw({
            [`border-4 border-gray-${elevation}`]: outlined,
            [`bg-gray-${elevation}`]: !outlined,
        });

        // Border radius
        const radiusClasses = tw({ 'rounded-lg': !square });

        // Combine all classes
        const combinedClasses = tw(
            baseClasses,
            colorClasses,
            radiusClasses,
            className,
        );

        return (
            <div ref={ref} className={combinedClasses} {...props}>
                {children}
            </div>
        );
    },
)()