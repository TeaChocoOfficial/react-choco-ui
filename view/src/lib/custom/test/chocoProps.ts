//-Path: "react-choco-ui/lib/src/custom/chocoProps.ts"
import { tw } from '$/config/utils';
import { ChocoUi } from '$Type/Choco';

// Export main function
export function chocoProps<UiType extends ChocoUi.Ui>(
    {
        h,
        flex,
        block,
        full,
        hFull,
        wFull,
        screen,
        wScreen,
        hScreen,
        className,
        ...props
    }: UiType['Prop'],
    name: string,
): UiType['Prop'] {
    return {
        className: tw(
            `ChocoUi`,
            name,
            {
                flex,
                block,
                'w-full': wFull,
                'h-full': hFull,
                'w-full h-full': full,
                'w-screen': wScreen,
                'h-screen': hScreen,
                'w-screen h-screen': screen,
            },
            className,
        ),
        ...props,
    };
}
