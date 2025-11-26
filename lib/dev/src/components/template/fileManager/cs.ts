//-Path: "react-choco-ui/lib/src/components/template/fileManager/cs.ts"
import { ChocoUi } from '@teachoco-official/react-choco-base';

const cs = (css: ChocoUi.Style.CS): ChocoUi.Style.CS => css;

export const FileManagerCs = {
    textTruncate: cs({
        of: 'h',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }),
} as const;
