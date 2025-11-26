//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/components/ContextMenu.tsx"
import {
    CBox,
    CText,
    CList,
    CIcon,
} from '@teachoco-official/react-choco-custom';
import { SubMenu, SubMenuType } from './SubMenu';
import { SetState } from '../../../../types/Type';
import { useEffect, useRef, useState } from 'react';
import { FileManager } from '../../../../hooks/fileManager/fileManager';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

interface ContextMenuProps {
    visible: boolean;
    clickPosition: FileManager.Position;
    setVisible?: SetState<boolean>;
    menuItems: FileManager.MenuItem[];
    filesViewRef: React.RefObject<HTMLDivElement>;
}

export type ContextMenuType = ChocoUi.Ui<'div', ContextMenuProps>;

export const ContextMenu = customUi<ContextMenuType>(
    'div',
    'ContextMenu',
)(
    ({
        props: { visible, menuItems, setVisible, filesViewRef, clickPosition },
        ref: contextMenuRef,
    }) => {
        const [top, setTop] = useState(0);
        const [left, setLeft] = useState(0);
        const [activeSubMenuIndex, setActiveSubMenuIndex] = useState<
            number | null
        >(null);
        const [subMenuPosition, setSubMenuPosition] =
            useState<FileManager.SubMenuPosition>('right');

        const subMenuRef = useRef<SubMenuType['Element']>(null);

        const contextMenuPosition = () => {
            const { x, y } = clickPosition;

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
            const leftToCursor = x - containerRect.left;
            const right =
                containerRect.width - (leftToCursor + scrollBarWidth) >
                menuWidth;
            const left = !right;

            const topToCursor = y - containerRect.top;
            const topSpace = containerRect.height - topToCursor > menuHeight;
            const bottom = !topSpace;

            if (right) {
                setLeft(leftToCursor);
                setSubMenuPosition('right');
            } else if (left) {
                // Location: -width of the context menu from cursor's position i.e. left side
                setLeft(leftToCursor - menuWidth);
                setSubMenuPosition('left');
            }

            if (topSpace) {
                setTop(topToCursor + container.scrollTop);
            } else if (bottom) {
                setTop(topToCursor + container.scrollTop - menuHeight);
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
                setTop(0);
                setLeft(0);
                setActiveSubMenuIndex(null);
            }
        }, [visible, clickPosition]); // เพิ่ม clickPosition ใน dependencies ถ้าต้องการอัปเดตเมื่อ position เปลี่ยน

        if (visible) {
            return (
                <CBox
                    ref={contextMenuRef}
                    posA
                    z={1}
                    t={top}
                    l={left}
                    borR={2}
                    fontS={16}
                    bgClr="paper-4"
                    delay="opacity 0.1s linear"
                    br={{
                        width: 1,
                        color: 'paper-6',
                    }}
                    cs={{
                        op: top !== 0 ? 1 : 0,
                        event: top !== 0 ? 'a' : 'n',
                        visibility: top !== 0 ? 'visible' : 'hidden',
                    }}
                    onContextMenu={handleContextMenu}
                    onClick={(e) => e.stopPropagation()}
                    className={`fm-context-menu ${
                        top !== 0 ? 'visible' : 'hidden'
                    }`} // ปรับเช็ค top !== '0' เพื่อความแม่นยำ
                >
                    <CBox fontS={18} className="file-context-menu-list">
                        <CList m={0} g={1} pl={0} dFlex column>
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
                                        <CBox key={`${item.title}-${index}`}>
                                            {' '}
                                            {/* ใช้ key ที่ unique กว่า */}
                                            <CList.Item
                                                posR
                                                g={2}
                                                dFlex
                                                py={1}
                                                px={3}
                                                borR={1}
                                                aiCenter
                                                op={item.disablePaste ? 0.5 : 1}
                                                bgClr={
                                                    activeSubMenu
                                                        ? 'rgb(0, 0, 0, 0.07)'
                                                        : null
                                                }
                                                cs={{
                                                    ':hover': {
                                                        cur: item.disablePaste
                                                            ? 'd'
                                                            : 'p',
                                                        bgClr: item.disablePaste
                                                            ? null
                                                            : 'rgb(0, 0, 0, 0.07)',
                                                    },
                                                }}
                                                className={`${
                                                    item.disablePaste
                                                        ? 'disable-paste'
                                                        : ''
                                                } ${
                                                    activeSubMenu
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={item.onClick}
                                                onMouseOver={() =>
                                                    handleMouseOver(index)
                                                }
                                            >
                                                {item.icon}
                                                <CText tag="span">
                                                    {item.title}
                                                </CText>
                                                {hasChildren && (
                                                    <>
                                                        <CIcon
                                                            ml="auto"
                                                            fontS={14}
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
                                            </CList.Item>
                                            {item.divider &&
                                                index !==
                                                    menuItems.filter(
                                                        (item) => !item.hidden,
                                                    ).length -
                                                        1 && (
                                                    <CBox
                                                        my={1}
                                                        brB={{
                                                            width: 0.25,
                                                            color: 'primary',
                                                        }}
                                                        className="divider"
                                                    />
                                                )}
                                        </CBox>
                                    );
                                })}
                        </CList>
                    </CBox>
                </CBox>
            );
        }
        return null;
    },
)();
