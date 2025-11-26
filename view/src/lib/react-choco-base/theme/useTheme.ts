//-Path: "react-choco-ui/lib/src/theme/useTheme.ts"
import { ChocoUi } from '../types/ChocoUi';
import { useTheme as useEmotionTheme } from '@emotion/react';

export const useTheme = (): ChocoUi.Theme => useEmotionTheme() as ChocoUi.Theme;
