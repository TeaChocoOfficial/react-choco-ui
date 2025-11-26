//-Path: "react-choco-ui/lib/base/src/components/template/CList.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CListType = ChocoUi.Ui<
    'ul',
    {
        open?: boolean;
        children?: React.ReactNode;
    }
>;
export type CListItemType = ChocoUi.Ui<'li', { open?: boolean }>;

const CListItem = customUi<CListItemType>(
    'li',
    'CListItem',
)(({ Element, props: { ...props }, ref }) => {
    return <Element ref={ref} {...props} />;
})();

const CListMain = customUi<CListType>(
    'ul',
    'CListMain',
)(({ Element, restProps: { style, ...restProps }, ref }) => {
    return (
        <Element
            ref={ref}
            style={{ listStyleType: 'none', ...style }}
            {...restProps}
        />
    );
})();

export const CList = CListMain as ChocoUi.Uis<
    CListType,
    { Item: CListItemType }
>;

CList.Item = CListItem;
