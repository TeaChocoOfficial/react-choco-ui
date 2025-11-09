// //-Path: "react-choco-ui/lib/src/custom/ChocoColor.ts"
// import { CColor } from './CColor';
// import { ChocoUi } from '$Type/Choco';
// import { useTheme } from '$/theme/useTheme';

// export class ChocoColor {
//     private _theme: ChocoUi.Theme;
//     constructor(theme?: ChocoUi.Theme) {
//         this._theme = theme ?? useTheme();
//     }
//     get(color?: ChocoUi.Color.Colors): CColor {
//         try {
//             const palette = this._theme.palette;
//             if (color === undefined) return new CColor();
//             const colorMap: Record<ColorType, ChocoShade> = {
//                 main: palette.main.inherit,
//                 text: palette.text.inherit,

//                 //*inherit
//                 inherit: palette.main.inherit,
//                 inheritText: palette.text.inherit,

//                 //*primary
//                 primary: palette.main.primary,
//                 primaryText: palette.text.primary,

//                 //*disabled
//                 disabled: palette.main.disabled,
//                 disabledText: palette.text.disabled,

//                 //*secondary
//                 secondary: palette.main.secondary,
//                 secondaryText: palette.text.secondary,

//                 //*error
//                 error: palette.main.error,
//                 errorText: palette.text.error,

//                 //*warning
//                 warning: palette.main.warning,
//                 warningText: palette.text.warning,

//                 //*info
//                 info: palette.main.info,
//                 infoText: palette.text.info,

//                 //*success
//                 success: palette.main.success,
//                 successText: palette.text.success,
//             };
//             if (color === null) return new CColor(null);
//             if (
//                 typeof color === 'string' &&
//                 (color as ColorHex).startsWith('#')
//             )
//                 return new CColor(color);
//             if ((color as ColorType) in colorMap)
//                 return colorMap[color as ColorType][5];
//             if (typeof color === 'string' && color.startsWith('common.')) {
//                 const path = color.split('.').slice(1);
//                 let result: any = palette.common;
//                 for (const key of path) {
//                     result = result?.[key];
//                     if (!result) return new CColor();
//                 }
//                 return result instanceof CColor
//                     ? result
//                     : typeof result === 'string' && result.startsWith('#')
//                     ? new CColor(color)
//                     : result;
//             }
//             if (color instanceof CColor) return color;
//             const defaultColor = palette.main[color as ColorMainType];
//             return defaultColor?.[5] ?? color;
//         } catch (e) {
//             Debug.err(e);
//             return new CColor();
//         }
//     }
//     set(color: ColorType = 'secondary', option?: ChocoColorOption) {
//         const index = ColorMain.findIndex((clr) => color.startsWith(clr));
//         const clr = ColorMain[index];
//         const setColors: SetColorsType = color.startsWith(clr)
//             ? { main: clr, text: `${clr}Text` }
//             : { main: 'main', text: 'text' };
//         return this.getSet(setColors, color, option);
//     }

//     getSet(
//         setColors: SetColorsType,
//         color: ColorType,
//         option: ChocoColorOption = {},
//     ): GetsetClrType {
//         const isContrast = color.toLocaleLowerCase().includes('text');
//         const shadesColor: SetShadesColorType = {
//             text: new ChocoShade(
//                 this.get(setColors[isContrast ? 'main' : 'text']),
//             ),
//             main: new ChocoShade(
//                 this.get(setColors[isContrast ? 'text' : 'main']),
//             ),
//         };

//         const { text, main } = shadesColor;
//         const { text: isText } = option;

//         if (isText) {
//             return {
//                 shadesColor,
//                 setColor: {
//                     bgClr: null,
//                     clr: main[5],
//                     bor: main[5],
//                     hover: main[4],
//                     bgActive: null,
//                     active: main[3],
//                     action: main[5],
//                     bgDisabled: null,
//                     borHover: main[4],
//                     borActive: main[3],
//                     focus: main[4].alpha(0.6),
//                     bgHover: main[4].alpha(0.2),
//                     disabled: main[6].alpha(0.7),
//                     borDisabled: main[6].alpha(0.7),
//                     disabledHover: main[4].alpha(0.9),
//                     bgDisabledHover: main[4].alpha(0.2),
//                     borDisabledHover: main[4].alpha(0.9),
//                 },
//             };
//         }
//         return {
//             shadesColor,
//             setColor: {
//                 bor: null,
//                 clr: text[5],
//                 hover: text[4],
//                 bgClr: main[5],
//                 borHover: null,
//                 active: text[3],
//                 action: main[5],
//                 borActive: null,
//                 bgHover: main[4],
//                 bgActive: main[3],
//                 borDisabled: null,
//                 borDisabledHover: null,
//                 focus: main[4].alpha(0.6),
//                 disabled: text[6].alpha(0.7),
//                 bgDisabled: main[6].alpha(0.7),
//                 disabledHover: text[4].alpha(0.9),
//                 bgDisabledHover: main[4].alpha(0.6),
//             },
//             //     setColor: {
//             //     bor: null,
//             //     clr: main[10],//text
//             //     hover: main[8],//text
//             //     bgClr: main[5],
//             //     borHover: null,
//             //     active: main[7],//text
//             //     action: main[5],
//             //     borActive: null,
//             //     bgHover: main[4],
//             //     bgActive: main[3],
//             //     borDisabled: null,
//             //     borDisabledHover: null,
//             //     focus: main[4].alpha(0.6),
//             //     disabled: main[0].alpha(0.7),//text
//             //     bgDisabled: main[7].alpha(0.7),
//             //     disabledHover: main[9].alpha(0.9),//text
//             //     bgDisabledHover: main[2].alpha(0.6),
//             // },
//         };
//     }

//     style({
//         text,
//         setClr,
//         outline,
//         isFocus = true,
//         isBorder = true,
//         defaultColor = 'secondary',
//         disabled: isDisabled = false,
//     }: UseGetsetClrPropType) {
//         const cs = new CsStyle();
//         const { border } = this._theme.root.multiply;
//         const { setColor: setClrs, shadesColor } = this.set(
//             setClr ?? defaultColor,
//             { text: text || outline },
//         );

//         const {
//             clr,
//             bor,
//             hover,
//             focus,
//             bgClr,
//             active,
//             bgHover,
//             borHover,
//             disabled,
//             bgActive,
//             borActive,
//             bgDisabled,
//             borDisabled,
//             disabledHover,
//             bgDisabledHover,
//             borDisabledHover,
//         } = setClrs;

//         if (outline)
//             cs.add({
//                 clr,
//                 bgClr: null,
//                 borders: isBorder ? { width: -border, color: bor } : null,
//                 css: {
//                     ':hover': {
//                         clr: hover,
//                         bgClr: bgHover,
//                         borders: { width: -border, color: borHover },
//                     },
//                     ':active': {
//                         clr: active,
//                         bgClr: bgActive,
//                         borders: { width: -border, color: borActive },
//                     },
//                 },
//             });
//         else
//             cs.add({
//                 clr,
//                 bgClr,
//                 borders: null,
//                 css: {
//                     ':hover': { bgClr: bgHover },
//                     ':active': { clr: active, bgClr: bgActive },
//                 },
//             });

//         const disableds: ChocoStylesType = {
//             clr: disabled,
//             bgClr: outline ? null : bgDisabled,
//             borders:
//                 outline && isBorder
//                     ? { width: -border, color: borDisabled }
//                     : null,
//             css: {
//                 ':hover': {
//                     clr: disabledHover,
//                     bgClr: bgDisabledHover,
//                     borders:
//                         outline && isBorder
//                             ? { width: -border, color: borDisabledHover }
//                             : null,
//                 },
//             },
//         };
//         if (isDisabled === true) cs.add({ event: 'n', ...disableds });
//         const focusStyles: ChocoStylesType = {
//             css: {
//                 ':focus': {
//                     outlin: { width: -border, color: focus },
//                 },
//             },
//         };
//         if (isFocus) cs.add(focusStyles);
//         const setClrProps: SetClrPropsType = {
//             styles: cs,
//             setClrs,
//             disableds,
//             shadesColor,
//             hover: cs.cs.css?.[':hover'] ?? {},
//             active: cs.cs.css?.[':active'] ?? {},
//             focus: focusStyles.css?.[':focus'] ?? {},
//         };

//         return setClrProps;
//     }
// }
