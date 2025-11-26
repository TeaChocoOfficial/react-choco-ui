//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/SubMenu.tsx"
import { ChocoUi } from '$Type/Choco';
import { CText } from '$Compo/ui/CText';
import { customUi } from '$/custom/customUi';
import { CIcon } from '$Compo/template/CIcon';
import { CList, CListType } from '$Compo/template/CList';
import { FileManager } from '$Hook/fileManager/fileManager';

export type SubMenuType = ChocoUi.Ui<
    typeof CList,
    {
        list?: FileManager.MenuItem[];
        position: FileManager.SubMenuPosition;
    },
    CListType['Element']
>;

export const SubMenu = customUi<SubMenuType>(
    CList,
    'SubMenu',
)(({ ref, Element, props: { list, position = 'right' } }) => (
    <Element ref={ref} className={`sub-menu ${position}`}>
        {list?.map((item) => (
            <CList.Item
                key={item.title}
                posR
                g={2}
                dFlex
                py={1}
                px={3}
                borR={1}
                aiCenter
                cs={{
                    ':hover': {
                        cur: 'p',
                        bgClr: 'rgb(0, 0, 0, 0.07)',
                    },
                }}
                onClick={item.onClick}
            >
                <CText tag="span" w={14} className="item-selected">
                    {item.selected && <CIcon icon="FaCheck" fontS={13} />}
                </CText>
                {item.icon}
                <CText tag="span">{item.title}</CText>
            </CList.Item>
        ))}
    </Element>
))(({ position }) => ({
    t: 0,
    m: 0,
    p: 1,
    z: 1,
    pl: 0,
    dp: 'f',
    fd: 'c',
    pos: 'a',
    borR: 1,
    bgClr: 'paper-4',
    br: { width: 1, color: 'paper-6' },
    l: position === 'left' ? '-100%' : '100%',
}));
