//-Path: "react-choco-ui/lib/src/config/ChocoUiProvider.tsx"
import { ChocoUi } from '$Type/Choco';
import { Obj } from '@teachoco-dev/cli';
import { defaultTheme } from '$/theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CColor } from '$/custom/color/CColor';
import { CGlobal } from '$Compo/config/CGlobal';
import { ChocoShade } from '$/custom/color/ChocoShade';

export type ChocoUiProviderProps = {
    baseCss?: boolean;
    children?: React.ReactNode;
    createTheme?: ChocoUi.Theme.Create;
};

export function ChocoUiProvider({
    baseCss,
    children,
    createTheme,
}: ChocoUiProviderProps) {
    const cs: ChocoUi.Style.CS = ({ palette, shape }) => ({
        '*': {
            p: 0,
            m: 0,
            bxSz: 'border-box',
        },
        body: {
            w: '100dvw',
            h: '100dvh',
            clr: palette.text.primary,
            bgClr: palette.common.body,
        },
        '*::-webkit-scrollbar': {
            wh: shape.border.width,
        },
        '*::-webkit-scrollbar-track': {
            bgClr: palette.main.primary[8].alpha(0.3),
            borders: {
                width: -(shape.border.width / 4),
                color: palette.main.primary[2],
            },
        },
        '*::-webkit-scrollbar-thumb': {
            bgClr: palette.main.secondary.alpha(0.6),
        },
        '*::-webkit-scrollbar-track:hover': {
            bgClr: palette.main.primary[8],
            borders: {
                width: -(shape.border.width / 4),
                color: palette.main.primary[2],
            },
        },
        '*::-webkit-scrollbar-thumb:hover': {
            borR: -shape.border.width,
            bgClr: palette.main.secondary,
        },
    });
    const theme =
        typeof createTheme === 'function'
            ? createTheme?.({ theme: defaultTheme, CColor, ChocoShade })
            : createTheme;
    const mode = theme?.mode ?? defaultTheme.mode;
    const useTheme = Obj.mix<ChocoUi.Theme>(
        defaultTheme.def,
        defaultTheme[mode],
        theme?.def ?? {},
        theme?.[mode] ?? {},
    );

    return (
        <ThemeProvider theme={useTheme}>
            <CGlobal cs={baseCss && cs} />
            {children}
        </ThemeProvider>
    );
}
