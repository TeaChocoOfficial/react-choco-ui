//-Path: "react-choco-ui/lib/src/types/Choco.ts"
import * as CSSType from 'csstype';
import { CColor } from '$/custom/color/CColor';
import { DeepPartial } from '@teachoco-dev/cli';
import { ChocoShade } from '$/custom/color/ChocoShade';
import type { StyledComponent } from '@emotion/styled';
import type { CSSPropertiesWithMultiValues } from '@emotion/serialize';

export namespace ChocoUi {
    export type CSS =
        | Emotion.InterpolationPrimitive
        | Emotion.ArrayCSSInterpolation;
    export namespace Emotion {
        export type ArrayCSSInterpolation = ReadonlyArray<CSS>;
        export type InterpolationPrimitive =
            | null
            | undefined
            | boolean
            | number
            | string
            | SerializedStyles
            | CSSObject;
        export type ArrayInterpolation<Props = unknown> = ReadonlyArray<
            Interpolation<Props>
        >;
        export interface FunctionInterpolation<Props = unknown> {
            (props: Props): Interpolation<Props>;
        }
        export type Interpolation<Props = unknown> =
            | InterpolationPrimitive
            | ArrayInterpolation<Props>
            | FunctionInterpolation<Props>;
        export type InterpolationObject = SerializedStyles & CSSObject;
        export type SerializedStyles = {
            name: string;
            styles: string;
            next?: SerializedStyles;
        };
        export type CSSPseudos = {
            [K in CSSType.Pseudos]?: CSSObject;
        };
        export type CSSOthers = CSSPseudos & CSSPropertiesWithMultiValues;
        export type CSSObject = Props & CSSOthers & CSSOthersObject;
        // export interface CSSObject
        //     extends CSSPropertiesWithMultiValues,
        //         CSSPseudos,
        //         CSSOthersObject {}
        export interface CSSOthersObject {
            [propertiesName: string]: CSS;
        }
    }
    export namespace Color {
        export type Hex = `#${string}`;
        export type Hsl = `hsl(${number},${number}%,${number}%)`;
        export type HslaStr = `hsla(${number},${number}%,${number}%,${number})`;
        export type Type =
            | null
            | Hex
            | Hsl
            | HslaStr
            | Rgba
            | Hsla
            | number
            | CColor
            | ChocoShade;

        export class Rgba {
            constructor(
                public r: number = 0,
                public g: number = 0,
                public b: number = 0,
                public a: number = 0,
            ) {}
        }
        export class Hsla {
            constructor(
                public h: number = 0,
                public s: number = 0,
                public l: number = 0,
                public a: number = 1,
            ) {}
        }

        export const clrHexChars = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'a',
            'A',
            'b',
            'B',
            'c',
            'C',
            'd',
            'D',
            'e',
            'E',
            'f',
            'F',
        ] as const;

        export type ClrHexChars = (typeof clrHexChars)[number];

        export const mains = [
            'info',
            'warn',
            'error',
            'success',
            'inverse',
            'primary',
            'secondary',
        ] as const;

        export type Main = (typeof mains)[number];

        export const texts = [
            'infoText',
            'warnText',
            'errorText',
            'successText',
            'inverseText',
            'primaryText',
            'secondaryText',
        ] as const;

        export type Text = (typeof texts)[number];

        export const inherit = ['main', 'text'] as const;

        export type Colors = { [key in Shade.Key]: CColor };

        export type Inherit = (typeof inherit)[number];

        export type ColorType = Main | Text | Inherit;

        export type ColorsType =
            | React.CSSProperties['color']
            | `${ColorType}-${Shade.Key}`
            | Color.Type
            | ColorType
            | Colors;

        export namespace Shade {
            export type Key = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
            export type MapCallbackFn<MapCallback> = (
                color: CColor,
                key: Key,
                index: number,
            ) => MapCallback;
            export type Method = {
                map: <MapCallback>(
                    callbackfn: MapCallbackFn<MapCallback>,
                ) => MapCallback[];
            };
        }
    }

    export interface Theme {
        responsive: {
            keys: Size.Key[];
            fixed: number;
            spacing: number;
            percent: Record<Size.Key, number>;
            breakpoints: Record<Size.Key, number>;
        };
        palette: Record<Color.Inherit, Record<Color.Main, Color.Colors>>;
        typography: {
            fontFamily: string;
            fontSize: {
                small: string;
                medium: string;
                large: string;
            };
        };
    }
    export namespace Size {
        export type Key = 'm' | 't' | 'l' | 'd';
        export type Obj = { [K in Key]?: Value };
        export type Value = string | number | undefined;
        export type Function = (percent: number, key: Key) => Value;
    }
    export type TagKey =
        | keyof React.JSX.IntrinsicElements
        | React.ComponentType<any>;
    export type ElementUi<
        ComponentProps extends {},
        SpecificComponentProps extends {} = {},
        JSXProps extends {} = {},
    > = StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

    export type StyledUiProps<
        Tag extends TagKey,
        ExtraProps = {},
    > = React.ComponentPropsWithoutRef<Tag> & ExtraProps & Props;

    export interface Ui<
        Tag extends TagKey = 'div',
        Props extends object = {},
        ElementType = Tag extends keyof HTMLElementTagNameMap
            ? HTMLElementTagNameMap[Tag]
            : HTMLElement,
    > {
        Tag: Tag;
        Prop: StyledUiProps<Tag, Props>;
        RefObj: React.RefObject<ElementType>;
        Element: ElementType;
        Component: React.ForwardRefExoticComponent<
            StyledUiProps<Tag, Props> & React.RefAttributes<ElementType>
        >;
    }

    export interface StyleProp<ElementType extends TagKey> {
        theme?: Theme;
        as?: ElementType;
    }

    export interface StyledUiRenderProp<Ui extends ChocoUi.Ui> {
        ref: React.RefObject<Ui['Element']>;
        props: Ui['Prop'];
        Element: ElementUi<
            React.JSX.LibraryManagedAttributes<
                Ui['Tag'],
                React.ComponentProps<Ui['Tag']>
            > & { theme?: Theme }
        >;
    }

    export type StyledUiStyleProp<Ui extends ChocoUi.Ui> = StyleProp<
        Ui['Tag']
    > &
        React.JSX.IntrinsicElements[Ui['Tag']] & {
            theme: Theme;
        };

    export type RenderUi<Ui extends ChocoUi.Ui<any, any, any>> = (
        render: (prop: StyledUiRenderProp<Ui>) => React.ReactNode,
    ) => StyledUi<Ui>;

    export type StyledUi<Ui extends ChocoUi.Ui> = (
        style?:
            | Styles
            | ((
                  props: React.ComponentPropsWithoutRef<Ui['Tag']>,
                  styleProp: StyledUiStyleProp<Ui>,
              ) => Styles),
    ) => React.ForwardRefExoticComponent<
        React.PropsWithoutRef<Ui['Prop']> & React.RefAttributes<Ui['Element']>
    >;

    export type Styles = DeepPartial<CSS>;

    export interface Props {
        p?: Size.Value;
        pt?: Size.Value;
        pr?: Size.Value;
        pb?: Size.Value;
        pl?: Size.Value;
        px?: Size.Value;
        py?: Size.Value;
        m?: Size.Value;
        mt?: Size.Value;
        mr?: Size.Value;
        mb?: Size.Value;
        ml?: Size.Value;
        mx?: Size.Value;
        my?: Size.Value;
        h?: Size.Value;
        w?: Size.Value;
        wh?: Size.Value;
        minH?: Size.Value;
        minW?: Size.Value;
        minWh?: Size.Value;
        maxH?: Size.Value;
        maxW?: Size.Value;
        maxWh?: Size.Value;
        text?: Size.Value;
        full?: boolean;
        wFull?: boolean;
        hFull?: boolean;
        screen?: boolean;
        wScreen?: boolean;
        hScreen?: boolean;
        flex?: boolean;
        block?: boolean;
        bg?: Color.ColorsType;
        clr?: Color.ColorsType;
        bgClr?: Color.ColorsType;
    }
}
