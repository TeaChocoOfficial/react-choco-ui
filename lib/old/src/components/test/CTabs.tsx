//-Path: "react-choco-ui/lib/src/components/test/CTabs.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CTabsType = ChocoUi.Ui;

export const CTabs = customUi<CTabsType>('div', 'CTabs')()();
