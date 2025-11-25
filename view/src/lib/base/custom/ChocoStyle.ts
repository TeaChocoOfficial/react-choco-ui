//-Path: "react-choco-ui/lib/src/custom/ChocoStyle.ts"
import { ChocoUi } from '$Type/Choco';
import { CColor } from './color/CColor';
import { useTheme } from '$/theme/useTheme';
import { Ary, Obj } from '@teachoco-dev/cli';
import { ChocoShade } from './color/ChocoShade';
import { ChocoColor } from './color/ChocoColor';

export type ApplyData = { key: string | null; value: string };

export type ApplyDatas = Partial<
    Record<ChocoUi.Data.StyleKeysValue, Record<string, ApplyData>>
>;

export class ChocoStyle {
    cs: ChocoUi.Style.CSS = {};
    static spacingKeys: (keyof ChocoUi.Cs)[] = [
        'm',
        'mt',
        'ml',
        'mr',
        'mb',
        'my',
        'mx',
        'p',
        'pt',
        'pl',
        'pr',
        'pb',
        'py',
        'px',
        'g',
        'gx',
        'gy',
    ];
    static fixedKeys: (keyof ChocoUi.Cs)[] = [
        'borW',
        'borWT',
        'borWL',
        'borWR',
        'borWB',
        'borR',
        'borRBL',
        'borRBR',
        'borRTL',
        'borRTR',
    ];
    static applyKeys: {
        [key in keyof ChocoUi.Cs]:
            | ChocoUi.Style.CSSOthers
            | keyof ChocoUi.Style.CSSOthers
            | (keyof ChocoUi.Style.CSSOthers)[]
            | ((value: ChocoUi.Cs[key]) => ChocoUi.Style.CSSOthers);
    } = {
        op: 'opacity',
        z: (value) => {
            const theme = useTheme();
            return {
                zIndex: typeof value === 'string' ? theme.zIndex[value] : value,
            };
        },
        // === NEW: Shadow Properties ===
        bShadow: 'boxShadow',
        tShadow: 'textShadow',

        // === NEW: Inset Properties (Positioning) ===
        i: 'inset',
        t: 'top',
        b: 'bottom',
        l: 'left',
        r: 'right',
        x: (value) => ({
            left: value,
            right: value,
        }),
        y: (value) => ({
            top: value,
            bottom: value,
        }),

        // === UPDATED: Spacing - Margin ===
        m: 'margin',
        mt: 'marginTop',
        ml: 'marginLeft',
        mr: 'marginRight',
        mb: 'marginBottom',
        my: ['marginTop', 'marginBottom'],
        mx: ['marginLeft', 'marginRight'],

        // === UPDATED: Spacing - Padding ===
        p: 'padding',
        pt: 'paddingTop',
        pl: 'paddingLeft',
        pr: 'paddingRight',
        pb: 'paddingBottom',
        py: ['paddingTop', 'paddingBottom'],
        px: ['paddingLeft', 'paddingRight'],

        // === NEW: Gap Properties ===
        g: 'gap',
        gx: 'columnGap',
        gy: 'rowGap',

        // === NEW: Border Properties ===
        borW: 'borderWidth',
        borWT: 'borderTopWidth',
        borWL: 'borderLeftWidth',
        borWR: 'borderRightWidth',
        borWB: 'borderBottomWidth',
        borR: 'borderRadius',
        borRTL: 'borderTopLeftRadius',
        borRTR: 'borderTopRightRadius',
        borRBL: 'borderBottomLeftRadius',
        borRBR: 'borderBottomRightRadius',
        borS: 'borderStyle',
        borST: 'borderTopStyle',
        borSL: 'borderLeftStyle',
        borSR: 'borderRightStyle',
        borSB: 'borderBottomStyle',
        borClr: 'borderColor',
        borClrT: 'borderTopColor',
        borClrL: 'borderLeftColor',
        borClrR: 'borderRightColor',
        borClrB: 'borderBottomColor',

        // === NEW: Complex Border Properties ===
        br: (value) => this.borderApply(value, ''),
        brT: (value) => this.borderApply(value, 'Top'),
        brL: (value) => this.borderApply(value, 'Left'),
        brR: (value) => this.borderApply(value, 'Right'),
        brB: (value) => this.borderApply(value, 'Bottom'),
        brX: (value) => this.borderApply(value, 'Left', 'Right'),
        brY: (value) => this.borderApply(value, 'Top', 'Bottom'),

        // === UPDATED: Dimensions - Width & Height ===
        w: 'width',
        h: 'height',
        wh: (value) => ({
            width: value,
            height: value,
        }),

        // === UPDATED: Min Dimensions ===
        minW: 'minWidth',
        minH: 'minHeight',
        minWh: (value) => ({
            minWidth: value,
            minHeight: value,
        }),

        // === UPDATED: Max Dimensions ===
        maxW: 'maxWidth',
        maxH: 'maxHeight',
        maxWh: (value) => ({
            maxWidth: value,
            maxHeight: value,
        }),

        // === UPDATED: All Dimensions ===
        allW: (value) => ({
            width: value,
            minWidth: value,
            maxWidth: value,
        }),
        allH: (value) => ({
            height: value,
            minHeight: value,
            maxHeight: value,
        }),
        allWh: (value) => ({
            width: value,
            height: value,
            minWidth: value,
            minHeight: value,
            maxWidth: value,
            maxHeight: value,
        }),

        // === NEW: Typography Properties ===
        fontF: 'fontFamily',
        fontS: (value) => {
            const theme = useTheme();
            const keys = Obj.keys(theme.font.size);
            const size = value as ChocoUi.Theme.Font.Size;
            return {
                fontSize: keys.includes(size) ? theme.font.size[size] : value,
            };
        },
        fontW: (value) => {
            const theme = useTheme();
            const keys = Obj.keys(theme.font.weight);
            const weight = value as ChocoUi.Theme.Font.Weight;
            return {
                fontWeight: keys.includes(weight)
                    ? theme.font.weight[weight]
                    : value,
            };
        },
        txtTf: 'textTransform',
        txtDr: 'textDecoration',

        // === NEW: Transition & Transform ===
        delay: (value) => ({
            transition: typeof value === 'number' ? `${value}s` : value,
        }),
        trans: 'transform',
        flx: 'flex',

        // === NEW: Content ===
        coten: (value) => ({ content: `"${value}"` }),

        circlr: { borderRadius: '50%' },

        // === UPDATED: Full Size ===
        full: { width: '100%', height: '100%' },
        fullW: { width: '100%' },
        fullH: { height: '100%' },

        fullMin: { minWidth: '100%', minHeight: '100%' },
        fullMinW: { minWidth: '100%' },
        fullMinH: { minHeight: '100%' },

        fullMax: { maxWidth: '100%', maxHeight: '100%' },
        fullMaxW: { maxWidth: '100%' },
        fullMaxH: { maxHeight: '100%' },

        // === UPDATED: Screen Size ===
        screen: { width: '100vw', height: '100vh' },
        screenW: { width: '100vw' },
        screenH: { height: '100vh' },

        screenMin: { minWidth: '100vw', minHeight: '100vh' },
        screenMinW: { minWidth: '100vw' },
        screenMinH: { minHeight: '100vh' },

        screenMax: { maxWidth: '100vw', maxHeight: '100vh' },
        screenMaxW: { maxWidth: '100vw' },
        screenMaxH: { maxHeight: '100vh' },

        // === UPDATED: Colors ===
        bg: 'background',
        clr: 'color',
        bgClr: 'backgroundColor',

        bxSz: 'boxSizing',

        fWrap: { flexWrap: 'wrap' },
    };

    static get applyNulls(): {
        [key in keyof ChocoUi.Cs]?: ChocoUi.Cs[key];
    } {
        const theme = useTheme();
        return {
            bg: 'transparent',
            bgClr: 'transparent',
            borClr: 'transparent',
            borClrT: 'transparent',
            borClrL: 'transparent',
            borClrR: 'transparent',
            borClrB: 'transparent',
            borW: theme.shape.border.width,
            borWT: theme.shape.border.width,
            borWL: theme.shape.border.width,
            borWR: theme.shape.border.width,
            borWB: theme.shape.border.width,
            borR: theme.shape.border.radius,
            borRTL: theme.shape.border.radius,
            borRTR: theme.shape.border.radius,
            borRBL: theme.shape.border.radius,
            borRBR: theme.shape.border.radius,
        };
    }

    static applyDatas: ApplyDatas = {
        display: ChocoUi.Data.display,
        flexDirection: ChocoUi.Data.flexDir,
        alignContent: ChocoUi.Data.alignContent,
        alignItems: ChocoUi.Data.alignItems,
        justifyContent: ChocoUi.Data.justifyContent,
        justifyItems: ChocoUi.Data.justifyItems,
        textAlign: ChocoUi.Data.textAlign,
        position: ChocoUi.Data.pos,
        overflow: ChocoUi.Data.overflow,
        overflowX: ChocoUi.Data.overflowX,
        overflowY: ChocoUi.Data.overflowY,
        pointerEvents: ChocoUi.Data.event,
        cursor: ChocoUi.Data.cursor,
        userSelect: ChocoUi.Data.userSelect,
        boxSizing: ChocoUi.Data.boxSizing,
    };

    constructor(styles: ChocoUi.Style.CS) {
        if (styles) {
            if (Ary.is(styles))
                this.cs = (styles as ChocoUi.Style.ArrayCSSInterpolation).map(
                    (style) => {
                        const chocoStyle = new ChocoStyle(style);
                        return chocoStyle.cs;
                    },
                );
            if (typeof styles === 'function') {
                const theme = useTheme();
                const chocoStyle = new ChocoStyle(styles(theme));
                this.cs = chocoStyle.cs;
            }
            if (typeof styles === 'object') {
                this.cs = { ...styles } as ChocoUi.Style.CSSObject;
                this.processStyles();
            }
        }
    }

    static borderApply(
        value?: string | ChocoUi.Size.Lines | null,
        ...keys: ('' | 'Top' | 'Left' | 'Right' | 'Bottom')[]
    ): ChocoUi.Style.CSSOthers {
        const mapCss = (
            css: ChocoUi.Style.CSSOthers[],
        ): ChocoUi.Style.CSSOthers =>
            css.reduce((acc, cs) => ({ ...acc, ...cs }), {});
        if (typeof value === 'object' && value !== null) {
            const chocoColor = new ChocoColor();
            const color = chocoColor.get(value.color);

            const css = keys.map((key) => {
                const borKey = key.slice(0, 1) as '' | 'T' | 'L' | 'R' | 'B';
                return {
                    [`border${key}Style`]: value.style ?? 'solid',
                    [`border${key}Width`]: this.resValue(
                        value.width,
                        `borW${borKey}`,
                    ),
                    [`border${key}Color`]: this.resValue(
                        color,
                        `borClr${borKey}`,
                    ),
                };
            });
            return mapCss(css);
        }
        const css = keys.map((key) => ({
            [`border${key}`]: value === null ? '0px' : value,
        }));
        return mapCss(css);
    }

    static response(
        key: 'spacing' | 'fixed',
        value: ChocoUi.Style.CSS,
    ): ChocoUi.Style.CSS {
        if (typeof value !== 'number') return value;
        const theme = useTheme();
        return value * theme.responsive[key];
    }

    static resValue(
        value: ChocoUi.Style.CSS,
        keyProp: keyof ChocoUi.Cs,
    ): ChocoUi.Style.CSS {
        const chocoColor = new ChocoColor();
        const isFixed = Boolean(
            ChocoStyle.fixedKeys.find((key) => key === keyProp),
        );
        const isSpacing = Boolean(
            ChocoStyle.spacingKeys.find((key) => key === keyProp),
        );
        const hasKeyNull = Obj.keys(ChocoStyle.applyNulls).includes(keyProp);
        if (hasKeyNull && value === null)
            value = ChocoStyle.applyNulls[keyProp];
        if (isFixed) return ChocoStyle.response('fixed', value);
        else if (isSpacing) return ChocoStyle.response('spacing', value);
        else if (chocoColor.is(value)) return chocoColor.get(value).hex();
        else if (value instanceof CColor || value instanceof ChocoShade)
            return value.toString();
        else return value;
    }

    private setValue(
        value: ChocoUi.Style.CSS,
        key: keyof ChocoUi.Style.CSSObject,
        keyProp: keyof ChocoUi.Cs,
    ) {
        const cs = this.cs as ChocoUi.Style.CSSObject;
        cs[key] = ChocoStyle.resValue(value, keyProp);
    }

    private processStyles() {
        const cs = this.cs as ChocoUi.Style.CSSObject;
        const theme = useTheme();
        const keys = Obj.keys(cs);

        keys.forEach((key) => {
            const value = cs[key];
            const keyProp = key as keyof ChocoUi.Cs;
            const keyData = key as keyof ChocoUi.Style.CSSOthers;

            const hasKey = Obj.reduce<
                ApplyDatas,
                ChocoUi.Data.StyleKeysValue | null
            >(
                ChocoStyle.applyDatas,
                (acc, dataKey, value) =>
                    value && key in value ? dataKey : acc,
                null,
            );
            const datas = hasKey
                ? ChocoStyle.applyDatas[hasKey]?.[keyData]
                : null;

            const mapping = ChocoStyle.applyKeys[keyProp];
            if (keyProp === 'fontS') {
                const size = value as ChocoUi.Cs['fontS'];
                let fontS = size;
                const find = ChocoUi.Theme.Font.sizes.find(
                    (value) => value === size,
                );
                if (find) fontS = theme.font.size[find];
                if (typeof fontS === 'number')
                    fontS = `${fontS / theme.font.divide}${theme.font.unit}`;
                cs.fontSize = fontS;
            } else if (hasKey && datas && value === true) {
                this.setValue(datas.value, hasKey, keyProp);
            } else if (mapping) {
                if (Ary.is(mapping)) {
                    mapping.forEach(
                        (map) => this.setValue(value, map, keyProp), // กำหนดค่าให้ property ใหม่
                    );
                    // ลบ key เดิมหลังจากกำหนดค่าทั้งหมดแล้ว
                } else if (typeof mapping === 'function') {
                    // Handle function mappings (for complex values)
                    const result = (
                        mapping as (
                            value: ChocoUi.Style.CSS,
                        ) => ChocoUi.Style.CSSOthers
                    )(value);
                    Object.assign(cs, result);
                } else if (typeof mapping === 'string') {
                    // Handle string mappings (simple key-value)
                    this.setValue(value, mapping, keyProp);
                } else if (value === true) {
                    Obj.map(mapping, (value, mapKey) =>
                        this.setValue(value, mapKey, keyProp),
                    );
                }
            } else if (typeof value === 'object' && value !== null) {
                const chocoStyle = new ChocoStyle(value);
                cs[key] = chocoStyle.cs;
                return;
            } else {
                const isData = key in ChocoUi.Data.styleKeys;
                if (isData) {
                    const styleKey: ChocoUi.Data.StyleKeysValue =
                        ChocoUi.Data.styleKeys[key as ChocoUi.Data.StyleKeys];
                    const applyData = ChocoStyle.applyDatas[styleKey];
                    if (applyData) {
                        const data = Obj.reduce<
                            Record<string, ApplyData>,
                            ApplyData | null
                        >(
                            applyData,
                            (acc, _, cssValue) =>
                                cssValue.key === value ? cssValue : acc,
                            null,
                        );
                        if (data) {
                            cs[styleKey as keyof ChocoUi.Style.CSSObject] =
                                data.value;
                        }
                    } else {
                        console.log(key, value, styleKey);
                    }
                }
            }
            delete cs[key];
        });
    }
}
