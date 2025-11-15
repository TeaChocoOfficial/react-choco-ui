//-Path: "react-choco-ui/lib/src/custom/customUi.tsx"
import { OBJ } from '$Hook/object';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ChocoUi } from '$Type/Choco';
import { ChocoStyle } from './ChocoStyle';
import { forwardRef, useRef } from 'react';
import { Ary, Obj } from '@teachoco-dev/cli';
import { ChocoColor } from './color/ChocoColor';

export function customUi<Ui extends ChocoUi.Ui<any, any, any>>(
    tag: Ui['Tag'],
    name: string = 'CComponentUi',
): ChocoUi.Custom.Render<Ui> {
    const styledElement = styled(tag);
    return (render) => {
        return (style) => {
            const Component = forwardRef<Ui['Element'], Ui['Prop']>(
                (prop, forRef) => {
                    const { cs, className, ...restProp } = prop;
                    const props = {
                        className: ['ChocoUi', name, className]
                            .filter(Boolean)
                            .join(' '),
                        ...restProp,
                    } as Ui['Prop'];

                    const Element = styledElement((styleProp) => {
                        const styleBack: ChocoUi.Style.CSS =
                            typeof style === 'function'
                                ? style(props, {
                                      chocoColor: new ChocoColor(
                                          styleProp.theme,
                                      ),
                                      ...styleProp,
                                  })
                                : style;

                        const restStyle = Obj.reduce<
                            typeof restProp,
                            ChocoUi.Cs
                        >(
                            restProp,
                            (acc, key, value) => {
                                const hasKey = OBJ.find(
                                    ChocoStyle.applyDatas,
                                    (value) => value && key in value,
                                );

                                if (
                                    hasKey ||
                                    key in ChocoStyle.applyKeys ||
                                    key in ChocoUi.Data.styleKeys
                                )
                                    acc[key as keyof ChocoUi.Cs] = value;
                                return acc;
                            },
                            {},
                        );

                        const chocoCs = new ChocoStyle(cs);
                        const chocoRest = new ChocoStyle(restStyle);
                        const chocoBack = new ChocoStyle(styleBack);
                        const args = Ary.is(chocoBack.cs)
                            ? chocoBack.cs
                            : [chocoBack.cs];
                        args.push(
                            ...(Ary.is(chocoRest.cs)
                                ? chocoRest.cs
                                : [chocoRest.cs]),
                        );
                        args.push(
                            ...(Ary.is(chocoCs.cs) ? chocoCs.cs : [chocoCs.cs]),
                        );
                        return css(...args);
                    });
                    const ref = (forRef ??
                        useRef<Ui['Element']>(null)) as React.RefObject<
                        Ui['Element']
                    >;
                    const renderProp: ChocoUi.Custom.RenderProp<Ui> = {
                        ref,
                        props,
                        Element,
                    };
                    const rendered: React.ReactNode = render?.(renderProp) ?? (
                        <Element ref={ref} {...props} />
                    );
                    return rendered;
                },
            );
            Component.displayName = name;
            return Component;
        };
    };
}
