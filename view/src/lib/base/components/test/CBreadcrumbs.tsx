//-Path: "react-choco-ui/lib/src/components/test/CBreadcrumbs.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CBreadcrumbsType = ChocoUi.Ui<'div'>;

export const CBreadcrumbs = customUi<CBreadcrumbsType>('div', 'CBreadcrumbs')()();
