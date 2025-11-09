//-Path: "react-choco-ui/lib/src/components/ui/CButton.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CButtonType = ChocoUi.Ui<'button'>;

export const CButton = customUi<CButtonType>(
    'button',
    'CButton',
)(({ props, Element, ref }) => <Element ref={ref} {...props} />)(
    (_, { theme }) => ({
        py: 2,
        px: 4,
        bgClr: theme.palette.main.error[5].hex(),
    }),
); 
