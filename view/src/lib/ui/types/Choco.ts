//-Path: "react-choco-ui/lib/src/types/Choco.ts"
import * as CSSType from 'csstype';
import { CColor } from '$/custom/color/CColor';
import { StyledComponent } from '@emotion/styled';
import { DeepPartial, Obj } from '@teachoco-dev/cli';
import { ChocoShade } from '$/custom/color/ChocoShade';
import { ChocoColor } from '$/custom/color/ChocoColor';

export namespace ChocoUi {
    export namespace Style {
        export type CSS = InterpolationPrimitive | ArrayCSSInterpolation;
        export type ArrayCSSInterpolation = ReadonlyArray<CSS>;
        export type InterpolationPrimitive =
            | null
            | string
            | number
            | object
            | boolean
            | undefined
            | CSSObject;

        export type CSSProperties = CSSType.PropertiesFallback<number | string>;
        export type CSSPropertiesWithMultiValues = {
            [K in keyof CSSProperties]:
                | CSSProperties[K]
                | ReadonlyArray<Extract<CSSProperties[K], string>>;
        };

        export type CSSObject = Cs & CSSOthers & CSSOthersObject;
        export type CSSOthers = CSSPseudos & CSSPropertiesWithMultiValues;

        export type CSSPseudos = { [K in CSSType.Pseudos]?: CSSObject };
        export interface CSSOthersObject {
            [propertiesName: string]: CSS;
        }

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
        export type CS = Interpolation<Theme>;

        export type Line =
            | 'dotted'
            | 'dashed'
            | 'solid'
            | 'double'
            | 'groove'
            | 'ridge'
            | 'inset'
            | 'outset'
            | 'none'
            | 'hidden';
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
            'paper',
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
            'paperText',
            'successText',
            'inverseText',
            'primaryText',
            'secondaryText',
        ] as const;

        export type Text = (typeof texts)[number];

        export const paletteKey = ['main', 'text'] as const;

        export type PaletteKey = (typeof paletteKey)[number];

        export type Colors = { [key in Shade.Key]: CColor };

        export type Palette = {
            common: Record<Theme.CommonKeys, ChocoShade>;
        } & Record<Color.PaletteKey, Record<Color.Main, ChocoShade>>;

        export type ColorMap = Record<
            ChocoUi.Color.ColorType,
            ChocoUi.Color.Colors
        >;

        export type ColorType = Main | Text | PaletteKey;
        export type ColorKey = `${ColorType}-${Shade.Key}`;
        export type ColorKeys = ColorType | ColorKey;

        export type CommonType = `common.${Theme.CommonKeys}`;
        export type CommonKey = `${CommonType}-${Shade.Key}`;
        export type CommonKeys = CommonType | CommonKey;

        export type ColorsType =
            | Style.CSSProperties['color']
            | Color.Type
            | CommonKeys
            | ColorKeys
            | Colors;

        export namespace Set {
            export type ColorTypes = {
                clr: CColor | null; //สีข้อความ
                bor: CColor | null; //สีขอบ
                hover: CColor | null; //สีข้อความตอนชี้
                bgClr: CColor | null; //สีพื้นหลัง
                focus: CColor | null; //สีข้อความตอนโฟกัส
                active: CColor | null; //สีข้อความตอนใช้งาน
                action: CColor | null; //สีข้อความตอนทำงาน
                bgHover: CColor | null; //สีพื้นหลังตอนชี้
                disabled: CColor | null; //สีข้อความตอนปิด
                bgActive: CColor | null; //สีพื้นหลังตอนใช้งาน
                borHover: CColor | null; //สีขอบตอนชี้
                borActive: CColor | null; //สีขอบตอนใช้งาน
                bgDisabled: CColor | null; //สีพื้นหลังตอนปิด
                borDisabled: CColor | null; //สีขอบตอนปิด
                disabledHover: CColor | null; //สีข้อความตอนปิดตอนชี้
                bgDisabledHover: CColor | null; //สีพื้นหลังตอนปิดตอนชี้
                borDisabledHover: CColor | null; //สีขอบตอนปิดตอนชี้
            };
            export type Colors = {
                text: ColorKeys;
                main: ColorKeys;
            };
            export type Shades = {
                text: ChocoShade;
                main: ChocoShade;
            };
            export type Get = {
                colors: ColorTypes;
                shadesColor: Shades;
            };

            export type Option = { text?: boolean };
            export type UseGetProp = {
                text?: boolean;
                color?: ColorType;
                isFocus?: boolean;
                outline?: boolean;
                disabled?: boolean;
                isBorder?: boolean;
                container?: boolean;
                defaultColor?: ColorType;
            };

            export type Styles = {
                cs: Style.CSSObject;
                colors: ColorTypes;
                hover: Style.CSSObject;
                focus: Style.CSSObject;
                active: Style.CSSObject;
                disableds: Style.CSSObject;
                shadesColor: Shades;
            };
        }

        export namespace Shade {
            export const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

    export namespace Theme {
        export type Mode = 'dark' | 'light';
        export type Def = Record<Mode | 'def', DeepPartial<Theme>> & {
            mode: Mode;
        };
        export type CommonKeys =
            | 'body'
            | 'surface'
            | 'overlay'
            | 'gray'
            | 'blue'
            | 'green'
            | 'red'
            | 'orange';
        export type ZindexKeys =
            | 'hide'
            | 'base'
            | 'docked'
            | 'dropdown'
            | 'sticky'
            | 'banner'
            | 'overlay'
            | 'appBar'
            | 'modal'
            | 'popover'
            | 'skipLink'
            | 'toast'
            | 'tooltip';
        export type CreateFunc = (options: {
            theme: Def;
            CColor: typeof CColor;
            ChocoShade: typeof ChocoShade;
        }) => Partial<Def>;
        export type Create = CreateFunc | Partial<Def>;
        export namespace Font {
            export const sizes = [
                'xs',
                'sm',
                'base',
                'lg',
                'xl',
                '2xl',
                '3xl',
                '4xl',
            ] as const;
            export type Size = (typeof sizes)[number];

            export type Weight =
                | 'light'
                | 'normal'
                | 'medium'
                | 'semibold'
                | 'bold'
                | 'extrabold';
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
        palette: Color.Palette;
        font: {
            unit: string;
            divide: number;
            family: string;
            size: Record<Theme.Font.Size, number>;
            weight: Record<Theme.Font.Weight, number>;
        };
        shape: {
            border: { width: number; radius: number };
            shadows: string[];
        };
        shadows: string[];
        zIndex: Record<Theme.ZindexKeys, number>;
    }

    export namespace Size {
        export type Key = 'm' | 't' | 'l' | 'd';
        export type Obj = { [K in Key]?: Value };
        export type Value = string | number | undefined;
        export type Function = (percent: number, key: Key) => Value;
        export type CSSLengthUnit = 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw';
        export type Lines = {
            width?: Value;
            style?: Style.Line;
            color?: Color.ColorsType;
        };
    }
    export type Ui<
        DefaultTag extends Custom.TagKey = 'div',
        Props extends object = {},
        ElementType = Custom.InferElementType<
            Custom.InferTagFromProps<
                Custom.Props<DefaultTag, Props>,
                DefaultTag
            >
        >,
    > = {
        Tag: Custom.InferTagFromProps<
            Custom.Props<DefaultTag, Props>,
            DefaultTag
        >;
        Prop: Custom.Prop<DefaultTag, Props>;
        Props: Custom.Props<DefaultTag, Props>;
        RefObj: React.RefObject<
            Custom.InferElementType<
                Custom.InferTagFromProps<
                    Custom.Props<DefaultTag, Props>,
                    DefaultTag
                >
            >
        >;
        Element: ElementType;
        Component: React.ForwardRefExoticComponent<
            Custom.Props<DefaultTag, Props> &
                React.RefAttributes<
                    Custom.InferElementType<
                        Custom.InferTagFromProps<
                            Custom.Props<DefaultTag, Props>,
                            DefaultTag
                        >
                    >
                >
        >;
    };
    export type Uis<
        Ui extends ChocoUi.Ui<any, any, any>,
        Items extends Record<string, ChocoUi.Ui<any, any, any>> = {},
    > = React.ForwardRefExoticComponent<
        React.PropsWithoutRef<Ui['Props']> & React.RefAttributes<Ui['Element']>
    > & {
        [Key in keyof Items]: React.ForwardRefExoticComponent<
            React.PropsWithoutRef<Items[Key]['Props']> &
                React.RefAttributes<Items[Key]['Element']>
        >;
    };
    export namespace Custom {
        export type TagKey =
            | keyof React.JSX.IntrinsicElements
            | React.ComponentType<any>;
        export type InferElementType<T extends TagKey> =
            T extends keyof HTMLElementTagNameMap
                ? HTMLElementTagNameMap[T]
                : T extends keyof SVGElementTagNameMap
                ? SVGElementTagNameMap[T]
                : HTMLElement;

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
        > = Tag;
        // Props extends { tag?: infer CustomTag }
        //     ? CustomTag extends TagKey
        //         ? CustomTag
        //         : Tag
        //     : Tag;

        export type IntrinsicElement<Tag> =
            Tag extends keyof React.JSX.IntrinsicElements
                ? React.JSX.IntrinsicElements[Tag]
                : never;

        export type Element<
            ComponentProps extends {},
            SpecificComponentProps extends {} = {},
            JSXProps extends {} = {},
        > = StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;

        export type Prop<Tag extends TagKey, ExtraProps = {}> = Omit<
            React.ComponentPropsWithoutRef<Tag>,
            keyof ExtraProps
        > &
            ExtraProps;

        export type Props<Tag extends TagKey, ExtraProps = {}> = Omit<
            React.ComponentPropsWithoutRef<Tag>,
            keyof ExtraProps
        > &
            SuppleProps &
            Cs &
            ExtraProps;

        export interface SuppleProps {
            sz?: number;
            cs?: Style.CS;
            tag?: TagKey;
        }
        export interface StyleProp<ElementType extends TagKey> {
            theme?: Theme;
            as?: ElementType;
        }

        export interface RenderProp<Ui extends ChocoUi.Ui> {
            ref: React.RefObject<
                Ui['Element']
                // InferElementFromProps<Ui['Prop'], Ui['Element']>
            >;
            theme: Theme;
            props: Ui['Props'] & { sz: number };
            Element: Element<
                React.JSX.LibraryManagedAttributes<
                    Ui['Tag'],
                    React.ComponentProps<Ui['Tag']>
                > & { theme?: Theme }
            >;
            restProps: Ui['Prop'];
            chocoColor: ChocoColor;
            ChocoShade: typeof ChocoShade;
        }

        export type StyledProp<Ui extends ChocoUi.Ui> = StyleProp<Ui['Tag']> &
            IntrinsicElement<Ui['Tag']> & {
                theme: Theme;
                chocoColor: ChocoColor;
                ChocoShade: typeof ChocoShade;
            };

        export type Render<Ui extends ChocoUi.Ui> = (
            render?: (prop: RenderProp<Ui>) => React.ReactNode,
        ) => Styled<Ui>;

        export type StyledFunc<Ui extends ChocoUi.Ui> = (
            props: Ui['Props'] & { sz: number },
            styleProp: StyledProp<Ui>,
        ) => Style.CSS;

        export type Styled<Ui extends ChocoUi.Ui> = (
            style?: Style.CSS | StyledFunc<Ui>,
        ) => Component<Ui>;

        export type Component<Ui extends ChocoUi.Ui<any>> =
            React.ForwardRefExoticComponent<
                React.PropsWithoutRef<Ui['Props']> &
                    React.RefAttributes<Ui['Element']>
            >;

        export interface ContainerProp {
            color?: Color.ColorType;
            variant?: 'text' | 'outline' | 'container';
        }
        export interface ContainerProps extends ContainerProp {
            text?: boolean;
            outline?: boolean;
            disabled?: boolean;
            container?: boolean;
        }
    }

    export interface Cs extends Data.Styles, Data.Style {
        /** Box shadow style. */
        bShadow?: string | null;

        /** Text shadow style. */
        tShadow?: string | null;

        /** Opacity level (0 to 1). */
        op?: number;

        /** Z-index for layering. */
        z?: Theme.ZindexKeys | number;

        /** Inset (all sides). */
        i?: Size.Value;

        /** Top inset. */
        t?: Size.Value;

        /** Bottom inset. */
        b?: Size.Value;

        /** Left inset. */
        l?: Size.Value;

        /** Right inset. */
        r?: Size.Value;

        /** Left and right inset. */
        x?: Size.Value;

        /** Top and bottom inset. */
        y?: Size.Value;

        /** Padding (all sides). */
        p?: Size.Value;

        /** Top padding. */
        pt?: Size.Value;

        /** Bottom padding. */
        pb?: Size.Value;

        /** Left padding. */
        pl?: Size.Value;

        /** Right padding. */
        pr?: Size.Value;

        /** Left and right padding. */
        px?: Size.Value;

        /** Top and bottom padding. */
        py?: Size.Value;

        /** Margin (all sides). */
        m?: Size.Value;

        /** Top margin. */
        mt?: Size.Value;

        /** Bottom margin. */
        mb?: Size.Value;

        /** Left margin. */
        ml?: Size.Value;

        /** Right margin. */
        mr?: Size.Value;

        /** Left and right margin. */
        mx?: Size.Value;

        /** Top and bottom margin. */
        my?: Size.Value;
        /** Gap between elements (all directions). */
        g?: Size.Value;

        /** Gap between rows. */
        gx?: Size.Value;

        /** Gap between columns. */
        gy?: Size.Value;

        /** Border width. */
        borW?: Size.Value | null;
        borWT?: Size.Value | null;
        borWL?: Size.Value | null;
        borWR?: Size.Value | null;
        borWB?: Size.Value | null;

        /** Border radius (all corners). */
        borR?: Size.Value | null;

        /** Border radius top-left. */
        borRTL?: Size.Value | null;

        /** Border radius top-right. */
        borRTR?: Size.Value | null;

        /** Border radius bottom-left. */
        borRBL?: Size.Value | null;

        /** Border radius bottom-right. */
        borRBR?: Size.Value | null;

        /** Border style. */
        borS?: Style.Line | null;
        borST?: Style.Line | null;
        borSL?: Style.Line | null;
        borSR?: Style.Line | null;
        borSB?: Style.Line | null;

        /** Border color. */
        borClr?: Color.ColorsType;
        borClrT?: Color.ColorsType;
        borClrL?: Color.ColorsType;
        borClrR?: Color.ColorsType;
        borClrB?: Color.ColorsType;

        /** Border (all sides). */
        br?: Size.Lines | string | null;

        /** Top border. */
        brT?: Size.Lines | string | null;

        /** Bottom border. */
        brB?: Size.Lines | string | null;

        /** Left border. */
        brL?: Size.Lines | string | null;

        /** Right border. */
        brR?: Size.Lines | string | null;

        /** Left and right border. */
        brX?: Size.Lines | string | null;

        /** Top and bottom border. */
        brY?: Size.Lines | string | null;

        h?: Size.Value;
        w?: Size.Value;
        wh?: Size.Value;
        minH?: Size.Value;
        minW?: Size.Value;
        minWh?: Size.Value;
        maxH?: Size.Value;
        maxW?: Size.Value;
        maxWh?: Size.Value;
        allH?: Size.Value;
        allW?: Size.Value;
        allWh?: Size.Value;

        /**
         * @remarks Font size for text.
         * @param value - Number or string (e.g., "24px", "2rem", 16).
         * @example "24px" | "2rem" | 16
         */
        fontS?: Theme.Font.Size | (string & {}) | number;

        /** Font weight. */
        fontW?: Theme.Font.Weight | (string & {}) | number;

        /** Font family. */
        fontF?: string;

        /** Text transform */
        txtTf?: Size.Value;

        /** Text decoration */
        txtDr?: Size.Value;

        /** Transition or style. */
        delay?: Size.Value;

        /** Transform style (e.g., rotate, scale). */
        trans?: string | null;

        /** Flex. */
        flx?: Size.Value;

        /** Content */
        coten?: string;

        /** Border radius 50% */
        circlr?: boolean;

        full?: boolean;
        fullW?: boolean;
        fullH?: boolean;
        fullMin?: boolean;
        fullMinW?: boolean;
        fullMinH?: boolean;
        fullMax?: boolean;
        fullMaxW?: boolean;
        fullMaxH?: boolean;
        screen?: boolean;
        screenW?: boolean;
        screenH?: boolean;
        screenMin?: boolean;
        screenMinW?: boolean;
        screenMinH?: boolean;
        screenMax?: boolean;
        screenMaxW?: boolean;
        screenMaxH?: boolean;
        bg?: Color.ColorsType;
        clr?: Color.ColorsType;
        bgClr?: Color.ColorsType;
    }

    export namespace Data {
        export const styleKeys = {
            dp: 'display',
            fd: 'flexDirection',
            ac: 'alignContent',
            ai: 'alignItems',
            jc: 'justifyContent',
            ji: 'justifyItems',
            ta: 'textAlign',
            pos: 'position',
            of: 'overflow',
            ofx: 'overflowX',
            ofy: 'overflowY',
            event: 'pointerEvents',
            cur: 'cursor',
            us: 'userSelect',
            bxSz: 'boxSizing',
        } as const;
        export type StyleKeys = keyof typeof styleKeys;
        export type StyleKeysValue = (typeof styleKeys)[StyleKeys];
        export interface Style extends Partial<Record<StyleKeys, any>> {
            //* Flex wrap
            fWrap?: boolean;

            //* Display
            //? none flex block inline inline-flex inline-block grid inline-grid table inline-table
            dp?: DisplayKey;

            //* Flex direction
            //? unset row reverse-row column reverse-column inherit
            fd?: FlexDirKey;

            //* Align content
            //? unset flex-end flex-start center space-around space-between stretch
            ac?: AlignContentKey;

            //* Align items
            //? unset flex-end flex-start center space-around space-between stretch
            ai?: AlignItemsKey;

            //* Justify content
            //? unset flex-end flex-start center space-around space-between space-evenly
            jc?: JustifyContentKey;

            //* Justify items
            //? unset end start center
            ji?: JustifyItemsKey;

            //* Text align
            //? unset end left start right center justify
            ta?: TextAlignKey;

            //* Position
            //? unset relative absolute fixed sticky
            pos?: PosKey;

            //* Overflow
            //? visible hidden scroll auto
            of?: OverflowKey;
            ofx?: OverflowKey;
            ofy?: OverflowKey;

            //* Pointer events
            //? none auto
            event?: EventKey;

            //* Cursor
            //? default pointer move not-allowed wait text crosshair alias copy col-resize
            cur?: CursorKey;

            //* User select
            //? unset none auto text all
            us?: UserSelectKey;

            //* Box sizing
            //? border-box content-box
            bxSz?: string;
        }

        export const propsKeys: (
            | keyof Cs
            | StyleKeys
            | keyof Custom.SuppleProps
        )[] = [
            'sz',
            'cs',
            'tag',

            'bShadow',
            'tShadow',
            'op',
            'z',
            'i',
            't',
            'b',
            'l',
            'r',
            'x',
            'y',
            'p',
            'pt',
            'pb',
            'pl',
            'pr',
            'px',
            'py',
            'm',
            'mt',
            'mb',
            'ml',
            'mr',
            'mx',
            'my',
            'g',
            'gx',
            'gy',
            'borW',
            'borWT',
            'borWL',
            'borWR',
            'borWB',
            'borR',
            'borRTL',
            'borRTR',
            'borRBL',
            'borRBR',
            'borS',
            'borST',
            'borSL',
            'borSR',
            'borSB',
            'borClr',
            'borClrT',
            'borClrL',
            'borClrR',
            'borClrB',
            'br',
            'brT',
            'brB',
            'brL',
            'brR',
            'brX',
            'brY',
            'h',
            'w',
            'wh',
            'minH',
            'minW',
            'minWh',
            'maxH',
            'maxW',
            'maxWh',
            'allH',
            'allW',
            'allWh',
            'fontS',
            'fontW',
            'fontF',
            'txtTf',
            'txtDr',
            'delay',
            'trans',
            'flx',
            'coten',
            'circlr',
            'full',
            'fullW',
            'fullH',
            'fullMin',
            'fullMinW',
            'fullMinH',
            'fullMax',
            'fullMaxW',
            'fullMaxH',
            'screen',
            'screenW',
            'screenH',
            'screenMin',
            'screenMinW',
            'screenMinH',
            'screenMax',
            'screenMaxW',
            'screenMaxH',
            'bg',
            'clr',
            'bgClr',
            ...Obj.keys(styleKeys),
        ];

        export type SetProp<KeyType extends string> = {
            [key in KeyType]?: boolean;
        };

        export type Styles = SetProp<DisplayKeys> &
            SetProp<FlexDirKeys> &
            SetProp<AlignContentKeys> &
            SetProp<AlignItemsKeys> &
            SetProp<JustifyContentKeys> &
            SetProp<JustifyItemsKeys> &
            SetProp<TextAlignKeys> &
            SetProp<PosKeys> &
            SetProp<OverflowKeys> &
            SetProp<OverflowXKeys> &
            SetProp<OverflowYKeys> &
            SetProp<EventKeys> &
            SetProp<CursorKeys> &
            SetProp<UserSelectKeys> &
            SetProp<BoxSizingKeys>;

        //* Display
        //? unset none flex block inline inline-flex inline-block grid inline-grid table inline-table
        export const display = {
            dUnset: { key: null, value: 'unset' },
            dNone: { key: 'n', value: 'none' },
            dFlex: { key: 'f', value: 'flex' },
            dBlock: { key: 'b', value: 'block' },
            dInline: { key: 'i', value: 'inline' },
            dInlineF: { key: 'if', value: 'inline-flex' },
            dInlineB: { key: 'ib', value: 'inline-block' },
            dGrid: { key: 'g', value: 'grid' },
            dInlineG: { key: 'ig', value: 'inline-grid' },
            dTable: { key: 't', value: 'table' },
            dInlineT: { key: 'it', value: 'inline-table' },
            dContents: { key: 'c', value: 'contents' },
        } as const;
        export type Display = typeof display;
        export type DisplayKeys = keyof Display;
        export type DisplayType = Display[DisplayKeys];
        export type DisplayKey = Display[DisplayKeys]['key'];
        export type DisplayValue = Display[DisplayKeys]['value'];

        //* Flex direction
        //? none row reverse-row reverse-column column fdInherit
        export const flexDir = {
            fdNone: { key: null, value: 'unset' },
            row: { key: 'r', value: 'row' },
            rRow: { key: 'rr', value: 'row-reverse' },
            column: { key: 'c', value: 'column' },
            rColumn: { key: 'cr', value: 'column-reverse' },
            fdInherit: { key: 'i', value: 'inherit' },
        } as const;
        export type FlexDir = typeof flexDir;
        export type FlexDirKeys = keyof FlexDir;
        export type FlexDirType = FlexDir[FlexDirKeys];
        export type FlexDirKey = FlexDir[FlexDirKeys]['key'];
        export type FlexDirValue = FlexDir[FlexDirKeys]['value'];

        //* Align content
        //? flex-end flex-start center space-around space-between stretch
        export const alignContent = {
            acNone: { key: null, value: 'unset' },
            acEnd: { key: 'e', value: 'flex-end' },
            acStart: { key: 's', value: 'flex-start' },
            acCenter: { key: 'c', value: 'center' },
            acAround: { key: 'a', value: 'space-around' },
            acBetween: { key: 'b', value: 'space-between' },
            acStretch: { key: 'st', value: 'stretch' },
        } as const;
        export type AlignContent = typeof alignContent;
        export type AlignContentKeys = keyof AlignContent;
        export type AlignContentType = AlignContent[AlignContentKeys];
        export type AlignContentKey = AlignContent[AlignContentKeys]['key'];
        export type AlignContentValue = AlignContent[AlignContentKeys]['value'];

        //* Align items
        //? flex-end flex-start center space-around space-between stretch baseline
        export const alignItems = {
            aiNone: { key: null, value: 'unset' },
            aiEnd: { key: 'e', value: 'flex-end' },
            aiStart: { key: 's', value: 'flex-start' },
            aiCenter: { key: 'c', value: 'center' },
            aiAround: { key: 'a', value: 'space-around' },
            aiBetween: { key: 'b', value: 'space-between' },
            aiStretch: { key: 'st', value: 'stretch' },
            aiBaseline: { key: 'bl', value: 'baseline' },
        } as const;
        export type AlignItems = typeof alignItems;
        export type AlignItemsKeys = keyof AlignItems;
        export type AlignItemsType = AlignItems[AlignItemsKeys];
        export type AlignItemsKey = AlignItems[AlignItemsKeys]['key'];
        export type AlignItemsValue = AlignItems[AlignItemsKeys]['value'];

        //* Justify content
        //? unset flex-end flex-start center space-evenly space-around space-between
        export const justifyContent = {
            jcNone: { key: null, value: 'unset' },
            jcEnd: { key: 'e', value: 'flex-end' },
            jcStart: { key: 's', value: 'flex-start' },
            jcCenter: { key: 'c', value: 'center' },
            jcAround: { key: 'a', value: 'space-around' },
            jcBetween: { key: 'b', value: 'space-between' },
            jcEvenly: { key: 'ev', value: 'space-evenly' },
        } as const;
        export type JustifyContent = typeof justifyContent;
        export type JustifyContentKeys = keyof JustifyContent;
        export type JustifyContentType = JustifyContent[JustifyContentKeys];
        export type JustifyContentKey =
            JustifyContent[JustifyContentKeys]['key'];
        export type JustifyContentValue =
            JustifyContent[JustifyContentKeys]['value'];

        //* Justify items
        //? unset end start center stretch
        export const justifyItems = {
            jiNone: { key: null, value: 'unset' },
            jiEnd: { key: 'e', value: 'end' },
            jiStart: { key: 's', value: 'start' },
            jiCenter: { key: 'c', value: 'center' },
            jiStretch: { key: 'st', value: 'stretch' },
        } as const;
        export type JustifyItems = typeof justifyItems;
        export type JustifyItemsKeys = keyof JustifyItems;
        export type JustifyItemsType = JustifyItems[JustifyItemsKeys];
        export type JustifyItemsKey = JustifyItems[JustifyItemsKeys]['key'];
        export type JustifyItemsValue = JustifyItems[JustifyItemsKeys]['value'];

        //* Text align
        //? end left start right center justify
        export const textAlign = {
            taNone: { key: null, value: 'unset' },
            taEnd: { key: 'e', value: 'end' },
            taLeft: { key: 'l', value: 'left' },
            taStart: { key: 's', value: 'start' },
            taRight: { key: 'r', value: 'right' },
            taCenter: { key: 'c', value: 'center' },
            taJustify: { key: 'j', value: 'justify' },
            taInitial: { key: 'i', value: 'initial' },
        } as const;
        export type TextAlign = typeof textAlign;
        export type TextAlignKeys = keyof TextAlign;
        export type TextAlignType = TextAlign[TextAlignKeys];
        export type TextAlignKey = TextAlign[TextAlignKeys]['key'];
        export type TextAlignValue = TextAlign[TextAlignKeys]['value'];

        //* Position
        //? position: relative absolute fixed sticky
        export const pos = {
            posNone: { key: null, value: 'unset' },
            posR: { key: 'r', value: 'relative' },
            posA: { key: 'a', value: 'absolute' },
            posF: { key: 'f', value: 'fixed' },
            posS: { key: 's', value: 'sticky' },
        } as const;
        export type Pos = typeof pos;
        export type PosKeys = keyof Pos;
        export type PosType = Pos[PosKeys];
        export type PosKey = Pos[PosKeys]['key'];
        export type PosValue = Pos[PosKeys]['value'];

        //* Overflow
        //? unset visible hidden scroll auto
        export const overflow = {
            ofNone: { key: null, value: 'unset' },
            ofV: { key: 'v', value: 'visible' },
            ofH: { key: 'h', value: 'hidden' },
            ofS: { key: 's', value: 'scroll' },
            ofA: { key: 'a', value: 'auto' },
        } as const;

        export const overflowX = {
            ofxNone: { key: null, value: 'unset' },
            ofxV: { key: 'v', value: 'visible' },
            ofxH: { key: 'h', value: 'hidden' },
            ofxS: { key: 's', value: 'scroll' },
            ofxA: { key: 'a', value: 'auto' },
        } as const;

        export const overflowY = {
            ofyNone: { key: null, value: 'unset' },
            ofyV: { key: 'v', value: 'visible' },
            ofyH: { key: 'h', value: 'hidden' },
            ofyS: { key: 's', value: 'scroll' },
            ofyA: { key: 'a', value: 'auto' },
        } as const;

        export type Overflow = typeof overflow;
        export type OverflowKeys = keyof Overflow;
        export type OverflowType = Overflow[OverflowKeys];
        export type OverflowKey = Overflow[OverflowKeys]['key'];
        export type OverflowValue = Overflow[OverflowKeys]['value'];

        export type OverflowX = typeof overflowX;
        export type OverflowXKeys = keyof OverflowX;
        export type OverflowXType = OverflowX[OverflowXKeys];
        export type OverflowXKey = OverflowX[OverflowXKeys]['key'];
        export type OverflowXValue = OverflowX[OverflowXKeys]['value'];

        export type OverflowY = typeof overflowY;
        export type OverflowYKeys = keyof OverflowY;
        export type OverflowYType = OverflowY[OverflowYKeys];
        export type OverflowYKey = OverflowY[OverflowYKeys]['key'];
        export type OverflowYValue = OverflowY[OverflowYKeys]['value'];

        //* Pointer events
        //? none auto
        export const event = {
            eventNone: { key: null, value: 'none' },
            eventN: { key: 'n', value: 'none' },
            eventA: { key: 'a', value: 'auto' },
        } as const;
        export type Event = typeof event;
        export type EventKeys = keyof Event;
        export type EventType = Event[EventKeys];
        export type EventKey = Event[EventKeys]['key'];
        export type EventValue = Event[EventKeys]['value'];

        //* Cursor
        //? default pointer move not-allowed wait text crosshair
        export const cursor = {
            curNone: { key: null, value: 'none' },
            curD: { key: 'd', value: 'default' },
            curP: { key: 'p', value: 'pointer' },
            curM: { key: 'm', value: 'move' },
            curN: { key: 'n', value: 'not-allowed' },
            curW: { key: 'w', value: 'wait' },
            curT: { key: 't', value: 'text' },
            curC: { key: 'c', value: 'crosshair' },
            curCr: { key: 'cr', value: 'col-resize' },
            curEr: { key: 'er', value: 'e-resize' },
            curEwr: { key: 'ewr', value: 'ew-resize' },
            curWr: { key: 'wr', value: 'w-resize' },
            curRr: { key: 'rr', value: 'row-resize' },
            curSr: { key: 'sr', value: 's-resize' },
            curNr: { key: 'nr', value: 'n-resize' },
            curNsr: { key: 'nsr', value: 'ns-resize' },
        } as const;
        export type Cursor = typeof cursor;
        export type CursorKeys = keyof Cursor;
        export type CursorType = Cursor[CursorKeys];
        export type CursorKey = Cursor[CursorKeys]['key'];
        export type CursorValue = Cursor[CursorKeys]['value'];

        //* User select
        //? unset none auto text all
        export const userSelect = {
            usNone: { key: null, value: 'none' },
            usN: { key: 'n', value: 'none' },
            usA: { key: 'a', value: 'auto' },
            usT: { key: 't', value: 'text' },
            usAll: { key: 'al', value: 'all' },
        } as const;
        export type UserSelect = typeof userSelect;
        export type UserSelectKeys = keyof UserSelect;
        export type UserSelectType = UserSelect[UserSelectKeys];
        export type UserSelectKey = UserSelect[UserSelectKeys]['key'];
        export type UserSelectValue = UserSelect[UserSelectKeys]['value'];

        //* Box sizing
        //? border-box content-box
        export const boxSizing = {
            bsNone: { key: null, value: 'none' },
            bsB: { key: 'b', value: 'border-box' },
            bsC: { key: 'c', value: 'content-box' },
        } as const;
        export type BoxSizing = typeof boxSizing;
        export type BoxSizingKeys = keyof BoxSizing;
        export type BoxSizingType = BoxSizing[BoxSizingKeys];
        export type BoxSizingKey = BoxSizing[BoxSizingKeys]['key'];
        export type BoxSizingValue = BoxSizing[BoxSizingKeys]['value'];
    }
}
