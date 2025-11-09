//-Path: "react-choco-ui/lib/src/components/ui/CBox.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CBoxType = ChocoUi.Ui;

export const CBox = customUi<CBoxType>(
    'div',
    'CBox',
)(({ props, Element, ref }) => <Element ref={ref} {...props} />)();
