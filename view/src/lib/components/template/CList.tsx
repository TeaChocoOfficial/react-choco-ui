//-Path: "react-choco-ui/lib/src/components/template/CList.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';

export type CListType = ChocoUi.Ui<
    'ul',
    {
        open?: boolean;
        children?:
            | React.ReactNode
            | ((
                  Item: ChocoUi.Custom.Component<CListItemType>,
              ) => React.ReactNode);
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
)(({ Element, restProps: { children, style, ...restProps }, ref }) => {
    return (
        <Element
            ref={ref}
            style={{ listStyleType: 'none', ...style }}
            {...restProps}
        >
            {typeof children === 'function' ? children(CListItem) : children}
        </Element>
    );
})();

export const CList = CListMain as ChocoUi.Uis<
    CListType,
    { Item: CListItemType }
>;

CList.Item = CListItem;
