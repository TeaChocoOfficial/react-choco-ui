//-Path: "react-choco-ui/lib/base/src/custom/customUi.tsx"
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { OBJ } from '../hooks/object';
import { ChocoUi } from '../types/ChocoUi';
import { ChocoStyle } from './ChocoStyle';
import { Ary, Obj } from '@teachoco-dev/cli';
import { useTheme } from '../theme/useTheme';
import { ChocoColor } from './color/ChocoColor';
import { ChocoShade } from './color/ChocoShade';
import { forwardRef, memo, useMemo, useRef } from 'react';

export const customUi = <Ui extends ChocoUi.Ui<any, any>>(
    tag: Ui['Tag'],
    name: string = 'CComponentUi',
    tagFunc?: (prop: Ui['Props'], defTag: Ui['Tag']) => ChocoUi.Custom.TagKey,
): ChocoUi.Custom.Render<Ui> => {
    return (render) => {
        return (style) => {
            const Component = forwardRef<Ui['Element'], Ui['Prop']>(
                (prop, forRef) => {
                    const {
                        cs,
                        sz = 1,
                        className,
                        tag: TagComponent, // รับ tag จาก props
                        ...restProp
                    } = prop;

                    const props = {
                        sz,
                        className: ['ChocoUi', name, className]
                            .filter(Boolean)
                            .join(' '),
                        ...restProp,
                    } as Ui['Props'];

                    const restProps = Obj.reduce<Ui['Props'], Ui['Prop']>(
                        props,
                        (acc, key, value) => {
                            const notFind = !ChocoUi.Data.propsKeys.includes(
                                key as keyof ChocoUi.Cs,
                            );
                            if (notFind) acc[key] = value;
                            return acc;
                        },
                        {},
                    );

                    // ใช้ tag จาก props ถ้ามี, ไม่ก็ใช้ default tag
                    const ActualTag = (TagComponent ??
                        (tagFunc ? tagFunc(props, tag) : tag)) as Ui['Tag'];

                    const styledElement = useMemo(
                        () => styled(ActualTag),
                        [ActualTag],
                    );

                    const Element = styledElement((styleProp) => {
                        const styledProp = {
                            ChocoShade,
                            chocoColor: new ChocoColor(
                                styleProp.theme as ChocoUi.Theme,
                            ),
                            ...styleProp,
                        } as ChocoUi.Custom.StyledProp<Ui>;
                        const styleBack: ChocoUi.Style.CSS =
                            typeof style === 'function'
                                ? style(props, styledProp)
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
                                    acc[key as keyof ChocoUi.Cs] = value as any;
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
                    const theme = useTheme();
                    const chocoColor = new ChocoColor();
                    const renderProp: ChocoUi.Custom.RenderProp<Ui> = {
                        ref,
                        props,
                        theme,
                        Element,
                        restProps,
                        chocoColor,
                        ChocoShade,
                    };

                    const rendered: React.ReactNode = render ? (
                        render(renderProp)
                    ) : (
                        <Element ref={ref} {...restProps} />
                    );
                    return rendered;
                },
            );
            Component.displayName = name;
            return memo(Component);
        };
    };
};
