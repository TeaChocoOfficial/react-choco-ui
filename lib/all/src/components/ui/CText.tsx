//-Path: "react-choco-ui/lib/src/components/ui/CText.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CTextType = ChocoUi.Ui<
    'p',
    { span?: boolean; h1?: boolean; h2?: boolean; h3?: boolean }
>;

export const CText = customUi<CTextType>(
    'p',
    'CText',
    ({ span, h1, h2, h3 }, tag) =>
        span ? 'span' : h1 ? 'h1' : h2 ? 'h2' : h3 ? 'h3' : tag,
)(({ ref, Element, restProps: { span, h1, h2, h3, ...restProps } }) => (
    <Element ref={ref} {...restProps} />
))();
