//-Path: "react-choco-ui/lib/base/src/custom/color/ChocoColor.ts"
import { CColor } from './CColor';
import { ChocoShade } from './ChocoShade';
import { ChocoUi } from '../../types/ChocoUi';
import { useTheme } from '../../theme/useTheme';

export class ChocoColor {
    private _theme: ChocoUi.Theme;
    constructor(theme?: ChocoUi.Theme) {
        this._theme = theme ?? useTheme();
    }
    get colorMap(): ChocoUi.Color.ColorMap {
        const palette = this._theme.palette;
        const colorMap = ChocoUi.Color.mains.reduce(
            (acc, main) => ({
                ...acc,
                [main]: palette.main[main],
                [`${main}Text`]: palette.text[main],
            }),
            {} as ChocoUi.Color.ColorMap,
        );
        return {
            ...colorMap,
            main: palette.main.inverse,
            text: palette.text.inverse,
        };
    }
    is(value: unknown): value is ChocoUi.Color.ColorsType {
        if (
            value instanceof CColor ||
            (value as ChocoUi.Color.ColorType) in this.colorMap ||
            (typeof value === 'string' &&
                (ChocoUi.Color.mains.find((main) =>
                    ChocoUi.Color.Shade.keys.find(
                        (key) => value === `${main}-${key}`,
                    ),
                ) ||
                    value.startsWith('#') ||
                    value.startsWith('common.')))
        ) {
            return true;
        }
        return false;
    }
    get(color?: ChocoUi.Color.ColorsType): CColor {
        try {
            const palette = this._theme.palette;
            if (color instanceof CColor) return color;
            if (color === null) return new CColor(null);
            if (color === undefined) return new CColor();
            if ((color as ChocoUi.Color.ColorType) in this.colorMap)
                return this.colorMap[color as ChocoUi.Color.ColorType][5];
            if (typeof color === 'string') {
                if ((color as ChocoUi.Color.Hex).startsWith('#'))
                    return new CColor(color as ChocoUi.Color.Type);
                if (
                    ChocoUi.Color.mains.find((main) =>
                        ChocoUi.Color.Shade.keys.find((key) =>
                            [`${main}-${key}`, `${main}Text-${key}`].includes(
                                color,
                            ),
                        ),
                    )
                ) {
                    const colors = color.split('-');
                    const shade = Number(colors[1]) as ChocoUi.Color.Shade.Key;
                    if (colors[0].includes('Text'))
                        return palette.text[
                            colors[0].slice(0, -4) as ChocoUi.Color.Main
                        ][shade];
                    return palette.main[colors[0] as ChocoUi.Color.Main][shade];
                }
                if (color.startsWith('common.')) {
                    const common = color.split('.')[1];
                    const colors = common.split('-');
                    const commonKey = colors[0] as ChocoUi.Theme.CommonKeys;
                    const shade = Number(
                        colors[1] ?? 5,
                    ) as ChocoUi.Color.Shade.Key;
                    return palette.common[commonKey][shade];
                }
            }
            const defaultColor = palette.main[color as ChocoUi.Color.Main];
            return defaultColor?.[5] ?? color;
        } catch (error) {
            console.error(error);
            return new CColor();
        }
    }
    set(
        color: ChocoUi.Color.ColorKeys = 'secondary',
        option?: ChocoUi.Color.Set.Option,
    ): ChocoUi.Color.Set.Get {
        const index = ChocoUi.Color.mains.findIndex((clr) =>
            color.startsWith(clr),
        );
        const clr = ChocoUi.Color.mains[index];
        const shade = Number(color.split('-')[1] ?? 5);
        const setColors: ChocoUi.Color.Set.Colors = color.startsWith(clr)
            ? {
                  main: `${clr}-${shade}` as ChocoUi.Color.ColorKey,
                  text: `${clr}Text-${shade}` as ChocoUi.Color.ColorKey,
              }
            : { main: 'main', text: 'text' };
        return this.getSet(setColors, color, option);
    }

    getSet(
        setColors: ChocoUi.Color.Set.Colors,
        color: ChocoUi.Color.ColorKeys,
        option: ChocoUi.Color.Set.Option = {},
    ): ChocoUi.Color.Set.Get {
        const isContrast = color.toLocaleLowerCase().includes('text');
        const shadesColor: ChocoUi.Color.Set.Shades = {
            text: new ChocoShade(
                this.get(setColors[isContrast ? 'main' : 'text']),
            ),
            main: new ChocoShade(
                this.get(setColors[isContrast ? 'text' : 'main']),
            ),
        };

        const { text, main } = shadesColor;
        const { text: isText } = option;

        const colors = isText
            ? {
                  bgClr: null,
                  clr: main[5],
                  bor: main[5],
                  hover: main[4],
                  bgActive: null,
                  active: main[3],
                  action: main[5],
                  bgDisabled: null,
                  borHover: main[4],
                  borActive: main[3],
                  focus: main[4].alpha(0.6),
                  bgHover: main[4].alpha(0.2),
                  disabled: main[6].alpha(0.7),
                  borDisabled: main[6].alpha(0.7),
                  disabledHover: main[4].alpha(0.9),
                  bgDisabledHover: main[4].alpha(0.2),
                  borDisabledHover: main[4].alpha(0.9),
              }
            : {
                  bor: null,
                  clr: text[5],
                  hover: text[4],
                  bgClr: main[5],
                  borHover: null,
                  active: text[3],
                  action: main[5],
                  borActive: null,
                  bgHover: main[4],
                  bgActive: main[3],
                  borDisabled: null,
                  borDisabledHover: null,
                  focus: main[4].alpha(0.6),
                  disabled: text[6].alpha(0.7),
                  bgDisabled: main[6].alpha(0.7),
                  disabledHover: text[4].alpha(0.9),
                  bgDisabledHover: main[4].alpha(0.6),
              };

        return {
            colors,
            shadesColor,
            //     setColor: {
            //     bor: null,
            //     clr: main[10],//text
            //     hover: main[8],//text
            //     bgClr: main[5],
            //     borHover: null,
            //     active: main[7],//text
            //     action: main[5],
            //     borActive: null,
            //     bgHover: main[4],
            //     bgActive: main[3],
            //     borDisabled: null,
            //     borDisabledHover: null,
            //     focus: main[4].alpha(0.6),
            //     disabled: main[0].alpha(0.7),//text
            //     bgDisabled: main[7].alpha(0.7),
            //     disabledHover: main[9].alpha(0.9),//text
            //     bgDisabledHover: main[2].alpha(0.6),
            // },
        };
    }

    style({
        text,
        color,
        outline,
        container,
        isFocus = true,
        isBorder = true,
        defaultColor = 'primary',
        disabled: isDisabled = false,
    }: ChocoUi.Color.Set.UseGetProp): ChocoUi.Color.Set.Styles {
        let cs: ChocoUi.Style.CSSObject = {};
        const { width } = this._theme.shape.border;
        const { colors, shadesColor } = this.set(color ?? defaultColor, {
            text: (text || outline) && !container,
        });

        const {
            clr,
            bor,
            hover,
            focus,
            bgClr,
            active,
            bgHover,
            borHover,
            disabled,
            bgActive,
            borActive,
            bgDisabled,
            borDisabled,
            disabledHover,
            bgDisabledHover,
            borDisabledHover,
        } = colors;

        if (outline && !container)
            cs = {
                ...cs,
                clr,
                bgClr: null,
                br: { width, color: isBorder ? bor : null },
                ':hover': {
                    clr: hover,
                    bgClr: bgHover,
                    br: { width, color: borHover },
                },
                ':active': {
                    clr: active,
                    bgClr: bgActive,
                    br: { width, color: borActive },
                },
            };
        else
            cs = {
                ...cs,
                clr,
                bgClr,
                br: { width, color: null },
                ':hover': { bgClr: bgHover },
                ':active': { clr: active, bgClr: bgActive },
            };

        const disableds: ChocoUi.Style.CSSObject = {
            clr: disabled,
            bgClr: outline ? null : bgDisabled,
            br: { width, color: outline && isBorder ? borDisabled : null },
            ':hover': {
                clr: disabledHover,
                bgClr: bgDisabledHover,
                br: {
                    width,
                    color: outline && isBorder ? borDisabledHover : null,
                },
            },
        };
        if (isDisabled === true) cs = { ...cs, event: 'n', ...disableds };
        const focusStyles: ChocoUi.Style.CSSObject = {
            ':focus': {
                outlin: { width, color: focus },
            },
        };
        if (isFocus) cs = { ...cs, ...focusStyles };
        const setStyles: ChocoUi.Color.Set.Styles = {
            cs,
            colors,
            disableds,
            shadesColor,
            hover: cs[':hover'] ?? {},
            active: cs[':active'] ?? {},
            focus: focusStyles[':focus'] ?? {},
        };

        return setStyles;
    }
}
