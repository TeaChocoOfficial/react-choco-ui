//-Path: "react-choco-ui/lib/src/custom/createUi.tsx"
import { ChocoUi } from '$Type/Choco';
import { chocoProps } from './chocoProps';
import { forwardRef, useRef } from 'react';

export const createUi = <UiType extends ChocoUi.Ui<any>>(
    render: (props: UiType['Prop'], ref: UiType['Ref']) => React.ReactNode,
    name: string = 'CComponentUi',  
): UiType['Component'] => {
    const Component = forwardRef<UiType['Element'], UiType['Prop']>(
        (props, ref) =>
            render(
                chocoProps(props, name),
                (ref ?? useRef<UiType['Element']>(null)) as React.RefObject<
                    UiType['Element']
                >,
            ),
    );

    Component.displayName = name;
    return Component as UiType['Component'];
};
