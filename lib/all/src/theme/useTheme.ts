//-Path: "react-choco-ui/lib/src/theme/useTheme.ts"
import { ChocoUi } from '$Type/Choco';
import { useTheme as useEmotionTheme } from '@emotion/react';

export const useTheme = (): ChocoUi.Theme => useEmotionTheme() as ChocoUi.Theme;
