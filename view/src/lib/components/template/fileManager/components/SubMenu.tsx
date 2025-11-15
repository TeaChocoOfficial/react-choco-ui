//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/SubMenu.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { CIcon } from '$Compo/template/CIcon';
import { FileManager } from '$Hook/fileManager/fileManager';

export type SubMenuType = ChocoUi.Ui<
    'ul',
    {
        list?: FileManager.MenuItem[];
        position: FileManager.SubMenuPosition;
    }
>;

export const SubMenu = customUi<SubMenuType>(
    'ul',
    'SubMenu',
)(({ props: { list, position = 'right' }, ref }) => {
    return (
        <ul ref={ref} className={`sub-menu ${position}`}>
            {list?.map((item) => (
                <li key={item.title} onClick={item.onClick}>
                    <span className="item-selected">
                        {item.selected && <CIcon icon="FaCheck" size={13} />}
                    </span>
                    {item.icon}
                    <span>{item.title}</span>
                </li>
            ))}
        </ul>
    );
})();
