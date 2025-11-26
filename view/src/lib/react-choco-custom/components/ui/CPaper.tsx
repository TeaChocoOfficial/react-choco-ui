//-Path: "react-choco-ui/lib/src/components/ui/CPaper.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CPaperType = ChocoUi.Ui<
    'div',
    {
        /**
         * ระดับความสูงของเงา (shade)
         * @default 5
         */
        shade?: ChocoUi.Color.Shade.Key;

        /**
         * ทำให้มุมโค้งมน
         * @default false
         */
        square?: boolean;

        outlined?: boolean | number;
    }
>;

export const CPaper = customUi<CPaperType>('div', 'CPaper')()(
    ({ shade = 5, outlined, square }) => ({
        p: 4,
        borR: square ? undefined : null,
        br: {
            color: `paper-${
                outlined ? shade + (Number(outlined) ?? 1) : shade
            }`,
        },
        bgClr: `paper-${
            outlined ? 10 - shade - (Number(outlined) ?? 1) : shade
        }`,
    }),
);
