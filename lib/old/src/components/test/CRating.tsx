//-Path: "react-choco-ui/lib/src/components/test/CRating.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CRatingType = ChocoUi.Ui<'div'>;

export const CRating = customUi<CRatingType>('div', 'CRating')()();
