//-Path: "react-choco-ui/lib/src/config/ChocoUiProvider.tsx"
import '../style.css';
import { ChocoUi } from '$Type/Choco';
import { defaultTheme } from '$/theme/theme';
import { ThemeProvider } from '@emotion/react';
import { DeepPartial } from '@teachoco-dev/cli';

export type ChocoUiProviderProps = {
    theme?: DeepPartial<ChocoUi.Theme>;
    children: React.ReactNode;
};

export function ChocoUiProvider({ theme, children }: ChocoUiProviderProps) {
    return (
        <ThemeProvider theme={theme ?? defaultTheme}>{children}</ThemeProvider>
    );
}
