//-Path: "react-choco-ui/lib/src/components/test/CRating.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CRatingType = ChocoUi.Ui<'div'>;

export const CRating = customUi<CRatingType>('div', 'CRating')()();
