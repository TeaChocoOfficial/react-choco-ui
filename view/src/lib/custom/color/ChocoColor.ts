//-Path: "react-choco-ui/lib/src/custom/color/ChocoColor.ts"
import { CColor } from './CColor';
import { ChocoUi } from '$Type/Choco';
import { ChocoShade } from './ChocoShade';
import { useTheme } from '$/theme/useTheme';
import { ChocoStyle } from '../ChocoStyle';

export class ChocoColor {
    private _theme: ChocoUi.Theme;
    constructor(theme?: ChocoUi.Theme) {
        this._theme = theme ?? useTheme();
    }
    get(color?: ChocoUi.Color.ColorsType): CColor {
        try {
            const palette = this._theme.palette;
            if (color === undefined) return new CColor();
            const colorMap: Record<
                ChocoUi.Color.ColorType,
                ChocoUi.Color.Colors
            > = {
                main: palette.main.inverse,
                text: palette.text.inverse,

                //*inherit
                inverse: palette.main.inverse,
                inverseText: palette.text.inverse,

                //*primary
                primary: palette.main.primary,
                primaryText: palette.text.primary,

                //*secondary
                secondary: palette.main.secondary,
                secondaryText: palette.text.secondary,

                //*warning
                warn: palette.main.warn,
                warnText: palette.text.warn,

                //*info
                info: palette.main.info,
                infoText: palette.text.info,

                //*error
                error: palette.main.error,
                errorText: palette.text.error,

                //*success
                success: palette.main.success,
                successText: palette.text.success,
            };
            if (color === null) return new CColor(null);
            if (
                typeof color === 'string' &&
                (color as ChocoUi.Color.Hex).startsWith('#')
            )
                return new CColor(color as ChocoUi.Color.Type);
            if ((color as ChocoUi.Color.ColorType) in colorMap)
                return colorMap[color as ChocoUi.Color.ColorType][5];
            if (typeof color === 'string' && color.startsWith('common.')) {
                const path = color.split('.').slice(1);
                let result: any = palette.common;
                for (const key of path) {
                    result = result?.[key];
                    if (!result) return new CColor();
                }
                return result instanceof CColor
                    ? result
                    : typeof result === 'string' && result.startsWith('#')
                    ? new CColor(color as ChocoUi.Color.Type)
                    : result;
            }
            if (color instanceof CColor) return color;
            const defaultColor = palette.main[color as ChocoUi.Color.Main];
            return defaultColor?.[5] ?? color;
        } catch (error) {
            console.error(error);
            return new CColor();
        }
    }
    set(
        color: ChocoUi.Color.ColorType = 'secondary',
        option?: ChocoUi.Color.Set.Option,
    ): ChocoUi.Color.Set.Get {
        const index = ChocoUi.Color.mains.findIndex((clr) =>
            color.startsWith(clr),
        );
        const clr = ChocoUi.Color.mains[index];
        const setColors: ChocoUi.Color.Set.Colors = color.startsWith(clr)
            ? { main: clr, text: `${clr}Text` }
            : { main: 'main', text: 'text' };
        return this.getSet(setColors, color, option);
    }

    getSet(
        setColors: ChocoUi.Color.Set.Colors,
        color: ChocoUi.Color.ColorType,
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

        if (isText) {
            return {
                shadesColor,
                colors: {
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
                },
            };
        }
        return {
            shadesColor,
            colors: {
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
            },
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
        isFocus = true,
        isBorder = true,
        defaultColor = 'secondary',
        disabled: isDisabled = false,
    }: ChocoUi.Color.Set.UseGetProp): ChocoUi.Color.Set.Styles {
        let cs: ChocoUi.Style.CSSObject = {};
        const { width } = this._theme.shape.border;
        const { colors, shadesColor } = this.set(color ?? defaultColor, {
            text: text || outline,
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

        if (outline)
            cs = {
                ...cs,
                clr,
                bgClr: null,
                br: isBorder ? { width: -width, color: bor } : null,
                ':hover': {
                    clr: hover,
                    bgClr: bgHover,
                    borders: { width: -width, color: borHover },
                },
                ':active': {
                    clr: active,
                    bgClr: bgActive,
                    borders: { width: -width, color: borActive },
                },
            };
        else
            cs = {
                ...cs,
                clr,
                bgClr,
                borders: null,
                ':hover': { bgClr: bgHover },
                ':active': { clr: active, bgClr: bgActive },
            };

        const disableds: ChocoUi.Style.CSSObject = {
            clr: disabled,
            bgClr: outline ? null : bgDisabled,
            borders:
                outline && isBorder
                    ? { width: -width, color: borDisabled }
                    : null,
            ':hover': {
                clr: disabledHover,
                bgClr: bgDisabledHover,
                borders:
                    outline && isBorder
                        ? { width: -width, color: borDisabledHover }
                        : null,
            },
        };
        if (isDisabled === true) cs = { ...cs, event: 'n', ...disableds };
        const focusStyles: ChocoUi.Style.CSSObject = {
            ':focus': {
                outlin: { width: -width, color: focus },
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
