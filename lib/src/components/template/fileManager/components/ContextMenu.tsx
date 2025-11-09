//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/ContextMenu.tsx"
import './ContextMenu.scss';
import { UiTypes } from '$Type/ui';
import { SetState } from '$Type/Type';
import { createUi } from '$/custom/test/createUi';
import { CIcon } from '$Compo/template/CIcon';
import { FileManager } from '$Hook/fileManager/fileManager';
import { SubMenu, SubMenuType } from './SubMenu';
import { useEffect, useRef, useState } from 'react';

interface ClickPosition {
    clickX: number;
    clickY: number;
}

interface ContextMenuProps {
    visible: boolean;
    clickPosition: ClickPosition;
    setVisible?: SetState<boolean>;
    menuItems: FileManager.MenuItem[];
    filesViewRef: React.RefObject<HTMLDivElement>;
}

export type ContextMenuType = UiTypes<'div', ContextMenuProps>;

export const ContextMenu = createUi<ContextMenuType>(
    (
        { visible, menuItems, setVisible, filesViewRef, clickPosition },
        contextMenuRef,
    ) => {
        const [left, setLeft] = useState<string>('0');
        const [top, setTop] = useState<string>('0');
        const [activeSubMenuIndex, setActiveSubMenuIndex] = useState<
            number | null
        >(null);
        const [subMenuPosition, setSubMenuPosition] =
            useState<FileManager.SubMenuPosition>('right');

        const subMenuRef = useRef<SubMenuType['Element']>(null);

        const contextMenuPosition = () => {
            const { clickX, clickY } = clickPosition;

            const container = filesViewRef.current;
            if (!container || !contextMenuRef.current) return;

            const containerRect = container.getBoundingClientRect();
            const scrollBarWidth =
                container.offsetWidth - container.clientWidth;

            // Context menu size
            const contextMenuContainer =
                contextMenuRef.current.getBoundingClientRect();
            const menuWidth = contextMenuContainer.width;
            const menuHeight = contextMenuContainer.height;

            // Check if there is enough space at the right for the context menu
            const leftToCursor = clickX - containerRect.left;
            const right =
                containerRect.width - (leftToCursor + scrollBarWidth) >
                menuWidth;
            const left = !right;

            const topToCursor = clickY - containerRect.top;
            const topSpace = containerRect.height - topToCursor > menuHeight;
            const bottom = !topSpace;

            if (right) {
                setLeft(`${leftToCursor}px`);
                setSubMenuPosition('right');
            } else if (left) {
                // Location: -width of the context menu from cursor's position i.e. left side
                setLeft(`${leftToCursor - menuWidth}px`);
                setSubMenuPosition('left');
            }

            if (topSpace) {
                setTop(`${topToCursor + container.scrollTop}px`);
            } else if (bottom) {
                setTop(`${topToCursor + container.scrollTop - menuHeight}px`);
            }
        };

        const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const handleMouseOver = (index: number) => {
            setActiveSubMenuIndex(index);
        };

        useEffect(() => {
            if (visible && contextMenuRef.current) {
                contextMenuPosition();
            } else {
                setTop('0');
                setLeft('0');
                setActiveSubMenuIndex(null);
            }
        }, [visible, clickPosition]); // เพิ่ม clickPosition ใน dependencies ถ้าต้องการอัปเดตเมื่อ position เปลี่ยน

        if (visible) {
            return (
                <div
                    ref={contextMenuRef}
                    style={{ top, left }}
                    onContextMenu={handleContextMenu}
                    onClick={(e) => e.stopPropagation()}
                    className={`fm-context-menu ${
                        top !== '0' ? 'visible' : 'hidden'
                    }`} // ปรับเช็ค top !== '0' เพื่อความแม่นยำ
                >
                    <div className="file-context-menu-list">
                        <ul>
                            {menuItems
                                .filter((item) => !item.hidden)
                                .map((item, index) => {
                                    const hasChildren =
                                        item.children &&
                                        item.children.length > 0;
                                    const activeSubMenu =
                                        activeSubMenuIndex === index &&
                                        hasChildren;
                                    return (
                                        <div key={`${item.title}-${index}`}>
                                            {' '}
                                            {/* ใช้ key ที่ unique กว่า */}
                                            <li
                                                onClick={item.onClick}
                                                className={`${
                                                    item.className ?? ''
                                                } ${
                                                    activeSubMenu
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onMouseOver={() =>
                                                    handleMouseOver(index)
                                                }
                                            >
                                                {item.icon}
                                                <span>{item.title}</span>
                                                {hasChildren && (
                                                    <>
                                                        <CIcon
                                                            size={14}
                                                            icon="FaChevronRight"
                                                            className="list-expand-icon"
                                                        />
                                                        {activeSubMenu && (
                                                            <SubMenu
                                                                ref={subMenuRef}
                                                                list={
                                                                    item.children
                                                                }
                                                                position={
                                                                    subMenuPosition
                                                                }
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </li>
                                            {item.divider &&
                                                index !==
                                                    menuItems.filter(
                                                        (item) => !item.hidden,
                                                    ).length -
                                                        1 && (
                                                    <div className="divider"></div>
                                                )}
                                        </div>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            );
        }
        return null;
    },
    'ContextMenu',
);
