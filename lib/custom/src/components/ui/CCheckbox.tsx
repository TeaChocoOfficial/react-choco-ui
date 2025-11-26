//-Path: "react-choco-ui/lib/src/components/ui/CCheckbox.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CCheckboxType = ChocoUi.Ui<'input'>;

export const CCheckbox = customUi<CCheckboxType>(
    'input',
    'CCheckbox',
)(({ Element, restProps: { ...restProps }, ref }) => (
    <Element ref={ref} {...restProps} type="checkbox" />
))({ cur: 'p' });
