//-Path: "react-choco-ui/lib/src/custom/customUi.tsx"
import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ChocoUi } from '$Type/Choco';
import { Ary } from '@teachoco-dev/cli';
import { ChocoStyle } from './ChocoStyle';

export function cs(styles: ChocoUi.Styles): ChocoUi.Styles {
    if (Ary.is(styles)) {
        return styles.map(cs);
    } else {
        new ChocoStyle(styles);
    }
    return styles;
}

export function customUi<Ui extends ChocoUi.Ui<any, any, any>>(
    tag: Ui['Tag'],
    name: string = 'CComponentUi',
): ChocoUi.RenderUi<Ui> {
    const styledElement = styled(tag);
    return (render) => {
        return (style) => {
            const Component = forwardRef<Ui['Element'], Ui['Prop']>(
                (prop, ref) => {
                    const { className, ...restProp } = prop;
                    const props = {
                        className: ['ChocoUi', name, className]
                            .filter(Boolean)
                            .join(' '),
                        ...restProp,
                    } as React.ComponentPropsWithoutRef<Ui['Tag']>;
                    const styles = (
                        styleProp: ChocoUi.StyledUiStyleProp<Ui>,
                    ) => {
                        const styleBack =
                            typeof style === 'function'
                                ? style(props, styleProp)
                                : style;
                        return cs(styleBack);
                    };
                    const Element = styledElement((styleProp) => {
                        const arg = styles(styleProp);
                        const args = Ary.is(arg) ? arg : [arg];
                        return css(...args);
                    });
                    const renderProp: ChocoUi.StyledUiRenderProp<Ui> = {
                        ref,
                        props,
                        Element,
                    };
                    return render(renderProp);
                },
            );
            Component.displayName = name;
            return Component;
        };
    };
}
