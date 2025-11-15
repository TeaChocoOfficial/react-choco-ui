//-Path: "react-choco-ui/lib/src/custom/ChocoStyle.ts"
import { ChocoUi } from '$Type/Choco';
import { CColor } from './color/CColor';
import { useTheme } from '$/theme/useTheme';
import { Ary, Obj } from '@teachoco-dev/cli';
import { ChocoShade } from './color/ChocoShade';

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
        'borR',
        'borRBL',
        'borRBR',
        'borRTL',
        'borRTR',
        'fontS',
    ];
    static applyKeys: {
        [key in keyof ChocoUi.Cs]:
            | ChocoUi.Style.CSSOthers
            | keyof ChocoUi.Style.CSSOthers
            | (keyof ChocoUi.Style.CSSOthers)[]
            | ((value: ChocoUi.Cs[key]) => ChocoUi.Style.CSSOthers);
    } = {
        op: 'opacity',
        z: 'zIndex',
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
        borR: 'borderRadius',
        borRTL: 'borderTopLeftRadius',
        borRTR: 'borderTopRightRadius',
        borRBL: 'borderBottomLeftRadius',
        borRBR: 'borderBottomRightRadius',
        borS: 'borderStyle',
        borClr: 'borderColor',

        // === NEW: Complex Border Properties ===
        br: (value) => {
            if (typeof value === 'object' && value !== null) {
                // TODO: fix this value
                return {
                    borderWidth: value.width,
                    borderColor: value.color,
                    borderStyle: value.style,
                } as ChocoUi.Style.CSSOthers;
            }
            return { border: value ?? undefined };
        },
        brT: (value) => {
            if (typeof value === 'object' && value !== null) {
                return {
                    borderTopWidth: value.width,
                    borderTopColor: value.color,
                    borderTopStyle: value.style,
                } as ChocoUi.Style.CSSOthers;
            }
            return { borderTop: value ?? undefined };
        },
        brB: (value) => {
            if (typeof value === 'object' && value !== null) {
                return {
                    borderBottomWidth: value.width,
                    borderBottomColor: value.color,
                    borderBottomStyle: value.style,
                } as ChocoUi.Style.CSSOthers;
            }
            return { borderBottom: value ?? undefined };
        },
        brL: (value) => {
            if (typeof value === 'object' && value !== null) {
                return {
                    borderLeftWidth: value.width,
                    borderLeftColor: value.color,
                    borderLeftStyle: value.style,
                } as ChocoUi.Style.CSSOthers;
            }
            return { borderLeft: value ?? undefined };
        },
        brR: (value) => {
            if (typeof value === 'object' && value !== null) {
                return {
                    borderRightWidth: value.width,
                    borderRightColor: value.color,
                    borderRightStyle: value.style,
                } as ChocoUi.Style.CSSOthers;
            }
            return { borderRight: value ?? undefined };
        },
        brX: (value) => {
            if (typeof value === 'object' && value !== null) {
                return {
                    borderLeftWidth: value.width,
                    borderLeftColor: value.color,
                    borderLeftStyle: value.style,
                    borderRightWidth: value.width,
                    borderRightColor: value.color,
                    borderRightStyle: value.style,
                } as ChocoUi.Style.CSSOthers;
            }
            return {
                borderLeft: value ?? undefined,
                borderRight: value ?? undefined,
            };
        },
        brY: (value) => {
            if (typeof value === 'object' && value !== null) {
                return {
                    borderTopWidth: value.width,
                    borderTopColor: value.color,
                    borderTopStyle: value.style,
                    borderBottomWidth: value.width,
                    borderBottomColor: value.color,
                    borderBottomStyle: value.style,
                } as ChocoUi.Style.CSSOthers;
            }
            return {
                borderTop: value ?? undefined,
                borderBottom: value ?? undefined,
            };
        },

        // === UPDATED: Dimensions - Width & Height ===
        w: 'width',
        h: 'height',
        wh: (value) => ({
            width: value,
            height: value,
        }),

        // === UPDATED: Min Dimensions ===
        minH: 'minHeight',
        minW: 'minWidth',
        minWh: (value) => ({
            minWidth: value,
            minHeight: value,
        }),

        // === UPDATED: Max Dimensions ===
        maxH: 'maxHeight',
        maxW: 'maxWidth',
        maxWh: (value) => ({
            maxWidth: value,
            maxHeight: value,
        }),

        // === NEW: Typography Properties ===
        fontS: 'fontSize',
        fontF: 'fontFamily',
        fontW: 'fontWeight',
        txtTf: 'textTransform',
        txtDr: 'textDecoration',

        // === NEW: Transition & Transform ===
        delay: 'transitionDelay',
        trans: 'transform',

        // === NEW: Content ===
        coten: 'content',

        // === UPDATED: Full Size ===
        full: { width: '100%', height: '100%' },
        fullW: { width: '100%' },
        fullH: { height: '100%' },

        // === UPDATED: Screen Size ===
        screen: { width: '100vw', height: '100vh' },
        screenW: { width: '100vw' },
        screenH: { height: '100vh' },

        // === UPDATED: Colors ===
        bg: 'background',
        clr: 'color',
        bgClr: 'backgroundColor',
    };

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
                this.processStyles(this.cs as ChocoUi.Style.CSSObject);
            }
        }
    }

    private spacing(value: ChocoUi.Style.CSS): ChocoUi.Style.CSS {
        if (typeof value !== 'number') return value;
        const theme = useTheme();
        return value * theme.responsive.spacing;
    }

    private processStyles(cs: ChocoUi.Style.CSSObject) {
        const keys = Obj.keys(cs);

        keys.forEach((key) => {
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
            const value = cs[key];
            const isSpacing = Boolean(
                ChocoStyle.spacingKeys.find((key) => key === keyProp),
            );

            const responseValue = (
                value: ChocoUi.Style.CSS,
            ): ChocoUi.Style.CSS => {
                if (isSpacing) return this.spacing(value);
                if (value instanceof CColor || value instanceof ChocoShade)
                    return value.hex();
                return value;
            };

            if (hasKey && datas) {
                cs[hasKey as keyof ChocoUi.Style.CSSObject] = datas.value;
                delete cs[key];
            } else if (mapping) {
                if (Ary.is(mapping)) {
                    mapping.forEach(
                        (map) =>
                            (cs[map as keyof typeof cs] = responseValue(value)), // กำหนดค่าให้ property ใหม่
                    );
                    delete cs[key]; // ลบ key เดิมหลังจากกำหนดค่าทั้งหมดแล้ว
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
                    cs[mapping as keyof typeof this.cs] = responseValue(value);
                    delete cs[key];
                } else if (value === true) {
                    Obj.map(
                        mapping,
                        (value, mapKey) =>
                            (cs[mapKey as keyof typeof this.cs] =
                                responseValue(value)),
                    );
                    delete cs[key];
                }
            } else if (typeof value === 'object' && value !== null) {
                const chocoStyle = new ChocoStyle(value);
                cs[key] = chocoStyle.cs;
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
                            delete cs[key];
                        }
                    }
                }
            }
        });
    }
}
