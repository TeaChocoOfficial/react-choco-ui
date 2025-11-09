//-Path: "react-choco-ui/lib/src/custom/styledUi.tsx"
import { ChocoUi } from '$Type/Choco';
import React, { forwardRef } from 'react';
import styled, {
    StyledComponent,
    CreateStyledComponent,
} from '@emotion/styled';

export function styledUi<
    Tag extends keyof React.JSX.IntrinsicElements,
    Props extends object,
    Prop extends ChocoUi.StyledUiProps<Tag, Props>,
>(
    tag: Tag,
    render: (prop: {
        props: React.ComponentPropsWithoutRef<Tag>;
        Element: StyledComponent<
            ChocoUi.StyleProp,
            React.JSX.IntrinsicElements[Tag],
            {}
        >;
        ref: React.ForwardedRef<HTMLDivElement>;
    }) => React.ReactNode,
    name: string = 'CComponentUi',
): ChocoUi.StyledUi<Tag> {
    const styledElement = styled(tag);
    return (style) => {
        const Component = forwardRef<HTMLDivElement, Prop>((prop, ref) => {
            const { className, ...restProp } = prop;
            const props = {
                className: ['ChocoUi', name, className]
                    .filter(Boolean)
                    .join(' '),
                ...restProp,
            } as React.ComponentPropsWithoutRef<Tag>;
            const styles = (
                styleProp: ChocoUi.StyleProp &
                    React.JSX.IntrinsicElements[Tag] & {
                        theme: ChocoUi.Theme;
                    },
            ) => {
                const styleBack =
                    typeof style === 'function'
                        ? style(props, styleProp)
                        : style;
                return styleBack;
            };
            const Element = styledElement((styleProp) => {
                return {
                    display: 'flex',
                };
            });
            return render({
                ref,
                props,
                Element,
            });
        });
        Component.displayName = name;
        return Component;
    };
}
