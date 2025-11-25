//-Path: "react-choco-ui/lib/src/Test.tsx"
import { OBJ } from '$Hook/object';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Ary, Obj } from '@teachoco-dev/cli';
import { ChocoStyle } from './custom/ChocoStyle';
import { StyledComponent } from '@emotion/styled';
import { forwardRef, useMemo, useRef } from 'react';
import { ChocoColor } from './custom/color/ChocoColor';

export namespace ChocoUi {
    export namespace Style {
        export type CSS = {} | ArrayCSSInterpolation;
        export type ArrayCSSInterpolation = ReadonlyArray<CSS>;
        export type InterpolationPrimitive =
            | null
            | string
            | number
            | object
            | boolean
            | undefined
            | Cs;

        export type CS = InterpolationPrimitive;
    }
    export interface Cs {
        //... rest
    }
    export type Ui<
        DefaultTag extends Custom.TagKey = 'div',
        Props extends object = {},
        ElementType = Custom.Props<DefaultTag, Props> extends {
            tag?: infer CustomTag;
        }
            ? CustomTag extends Custom.TagKey
                ? Custom.InferElementType<CustomTag>
                : Custom.InferElementType<DefaultTag>
            : Custom.InferElementType<DefaultTag>,
    > = {
        Tag: Custom.Props<DefaultTag, Props> extends { tag?: infer CustomTag }
            ? CustomTag extends Custom.TagKey
                ? CustomTag
                : DefaultTag
            : DefaultTag;
        Prop: Custom.Props<DefaultTag, Props>;
        RefObj: React.RefObject<
            Custom.Props<DefaultTag, Props> extends { tag?: infer CustomTag }
                ? CustomTag extends Custom.TagKey
                    ? Custom.InferElementType<CustomTag>
                    : Custom.InferElementType<DefaultTag>
                : Custom.InferElementType<DefaultTag>
        >;
        Element: ElementType;
        Component: React.ForwardRefExoticComponent<
            Custom.Props<DefaultTag, Props> &
                React.RefAttributes<
                    Custom.Props<DefaultTag, Props> extends {
                        tag?: infer CustomTag;
                    }
                        ? CustomTag extends Custom.TagKey
                            ? Custom.InferElementType<CustomTag>
                            : Custom.InferElementType<DefaultTag>
                        : Custom.InferElementType<DefaultTag>
                >
        >;
    };
    export namespace Custom {
        export type TagKey =
            | keyof React.JSX.IntrinsicElements
            | React.ComponentType<any>;
        export type InferElementType<CustomTag extends TagKey> =
            CustomTag extends keyof HTMLElementTagNameMap
                ? HTMLElementTagNameMap[CustomTag]
                : // : CustomTag extends keyof SVGElementTagNameMap
                  // ? SVGElementTagNameMap[CustomTag]
                  HTMLElement;

        export type InferElementFromProps<
            Props extends object,
            Element,
        > = Props extends { tag?: infer CustomTag }
            ? CustomTag extends TagKey
                ? InferElementType<CustomTag>
                : Element
            : Element;

        export type InferTagFromProps<
            Props extends object,
            Tag extends TagKey,
        > = Props extends { tag?: infer CustomTag }
            ? CustomTag extends TagKey
                ? CustomTag
                : Tag
            : Tag;

        export type IntrinsicElement<Tag> =
            Tag extends keyof React.JSX.IntrinsicElements
                ? React.JSX.IntrinsicElements[Tag]
                : never;

        export type Element<
            ComponentProps extends {},
            SpecificComponentProps extends {} = {},
            JSXProps extends {} = {},
        > = StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

        export type Props<
            Tag extends TagKey,
            ExtraProps = {},
        > = React.ComponentPropsWithoutRef<Tag> & {
            cs?: Style.CS;
            tag?: TagKey;
        } & Cs &
            ExtraProps;

        export interface StyleProp<ElementType extends TagKey> {
            theme?: Theme;
            as?: ElementType;
        }

        export interface RenderProp<Ui extends ChocoUi.Ui> {
            ref: React.RefObject<
                Ui['Prop'] extends { tag?: infer CustomTag }
                    ? CustomTag extends TagKey
                        ? InferElementType<CustomTag>
                        : Ui['Element']
                    : Ui['Element']
                // InferElementFromProps<Ui['Prop'], Ui['Element']>
            >;
            props: Ui['Prop'];
            Element: Element<
                React.JSX.LibraryManagedAttributes<
                    Ui['Prop'] extends { tag?: infer CustomTag }
                        ? CustomTag extends TagKey
                            ? CustomTag
                            : Ui['Tag']
                        : Ui['Tag'],
                    // InferTagFromProps<Ui['Prop'], Ui['Tag']>,
                    React.ComponentProps<
                        Ui['Prop'] extends { tag?: infer CustomTag }
                            ? CustomTag extends TagKey
                                ? CustomTag
                                : Ui['Tag']
                            : Ui['Tag']
                        // InferTagFromProps<Ui['Prop'], Ui['Tag']>
                    >
                > & { theme?: Theme }
            >;
        }

        export type StyledProp<Ui extends ChocoUi.Ui> = StyleProp<
            Ui['Prop'] extends { tag?: infer CustomTag }
                ? CustomTag extends TagKey
                    ? CustomTag
                    : Ui['Tag']
                : Ui['Tag']
            // InferTagFromProps<Ui['Prop'], Ui['Tag']>
        > &
            IntrinsicElement<
                Ui['Prop'] extends { tag?: infer CustomTag }
                    ? CustomTag extends TagKey
                        ? CustomTag
                        : Ui['Tag']
                    : Ui['Tag']
                // InferTagFromProps<Ui['Prop'], Ui['Tag']>
            > & {
                theme: Theme;
                chocoColor: ChocoColor;
            };

        export type Render<Ui extends ChocoUi.Ui> = (
            render?: (prop: RenderProp<Ui>) => React.ReactNode,
        ) => Styled<Ui>;

        export type Styled<Ui extends ChocoUi.Ui> = (
            style?:
                | Style.CSS
                | ((props: Ui['Prop'], styleProp: StyledProp<Ui>) => Style.CSS),
        ) => React.ForwardRefExoticComponent<
            React.PropsWithoutRef<Ui['Prop']> &
                React.RefAttributes<Ui['Element']>
        >;
        export interface ContainerProp {
            color?: string;
            variant?: 'text' | 'outline' | 'container';
        }
        export interface ContainerProps extends ContainerProp {
            text?: boolean;
            outline?: boolean;
            disabled?: boolean;
        }
    }
    export interface Theme {}
    export namespace Data {
        export const styleKeys = {
            // rest
        } as const;
    }
}

export function customUi<Ui extends ChocoUi.Ui<any, any>>(
    tag: Ui['Tag'],
    name: string = 'CComponentUi',
): ChocoUi.Custom.Render<Ui> {
    return (render) => {
        return (style) => {
            const Component = forwardRef<Ui['Element'], Ui['Prop']>(
                (prop, forRef) => {
                    const {
                        cs,
                        className,
                        tag: TagComponent,
                        ...restProp
                    } = prop;
                    const ActualTag = (TagComponent ?? tag) as Ui['Tag'];
                    const styledElement = useMemo(
                        () => styled(ActualTag),
                        [ActualTag],
                    );
                    const props = {
                        className: ['ChocoUi', name, className]
                            .filter(Boolean)
                            .join(' '),
                        ...restProp,
                    } as Ui['Prop'];

                    const Element = styledElement((styleProp) => {
                        const styledProp = {
                            chocoColor: new ChocoColor(styleProp.theme),
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
                                    (acc as any)[key as keyof ChocoUi.Cs] =
                                        value;
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

export type BoxType = ChocoUi.Ui;

export const Box = customUi<BoxType>('div', 'Box')()();

export function Problem() {
    const ulRef = useRef<HTMLUListElement>(null);

    return <Box tag="ul" ref={ulRef} />; // RefAttributes<HTMLElement | SVGSymbolElement | HTMLObjectElement | HTMLAnchorElement | HTMLAreaElement | ... 116 more ... | SVGMPathElement>.ref?: Ref<HTMLElement | SVGSymbolElement | HTMLObjectElement | HTMLAnchorElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | ... 106 more ... | SVGMPathElement> | undefined
}

export function Normal() {
    const boxRef = useRef<HTMLDivElement>(null);

    return <Box ref={boxRef} />; // RefAttributes<HTMLElement | HTMLDivElement | SVGSymbolElement | HTMLObjectElement | HTMLAnchorElement | ... 116 more ... | SVGViewElement>.ref?: Ref<HTMLElement | HTMLDivElement | SVGSymbolElement | HTMLObjectElement | HTMLAnchorElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableCaptionElement | ... 107 more ... | SVGViewElement> | undefined
}
