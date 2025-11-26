//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/CBreadCrumb.tsx"
import { ARY } from '../../../hooks/array';
import {
    ChocoUi,
    customUi,
    CActivity,
} from '@teachoco-official/react-choco-base';
import {
    CBox,
    CIcon,
    CList,
    CButton,
    CIconButton,
} from '@teachoco-official/react-choco-custom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLayout } from '../../../hooks/fileManager/context/Layout';
import { useFileNavigation } from '../../../hooks/fileManager/context/FileNavigation';
import { useTranslation } from '../../../hooks/fileManager/context/TranslationProvider';
import { useDetectOutsideClick } from '../../../hooks/fileManager/hook/useDetectOutsideClick';

interface FolderItem {
    name: string;
    path: string;
}

type CBreadCrumbType = ChocoUi.Ui<
    'div',
    {
        collapsibleNav?: boolean;
        isNavigationPaneOpen: boolean;
        switchNavigationPane: () => void;
    }
>;

export const CBreadCrumb = customUi<CBreadCrumbType>(
    'div',
    'CBreadCrumb',
)(
    ({
        ref,
        theme,
        props: {
            collapsibleNav = false,
            isNavigationPaneOpen,
            switchNavigationPane,
        },
    }) => {
        const t = useTranslation();
        const { color } = useLayout();
        const navTogglerRef = useRef<HTMLDivElement>(null);
        const breadCrumbRef = useRef<HTMLDivElement>(null);
        const moreBtnRef = useRef<HTMLButtonElement>(null);
        const foldersRef = useRef<(HTMLSpanElement | null)[]>([]);
        const [folders, setFolders] = useState<FolderItem[]>([]);
        const [showHiddenFolders, setShowHiddenFolders] = useState(false);
        const [hiddenFolders, setHiddenFolders] = useState<FolderItem[]>([]);
        const [hiddenFoldersWidth, setHiddenFoldersWidth] = useState<number[]>(
            [],
        );
        const popoverRef = useDetectOutsideClick<HTMLUListElement>(() =>
            setShowHiddenFolders(false),
        );
        const { currentPath, setCurrentPath, onFolderChange } =
            useFileNavigation();

        useEffect(() => {
            setFolders(() => {
                let path = '';
                return (
                    currentPath?.split('/').map((item) => {
                        return {
                            name: item || t('home'),
                            path: item === '' ? item : (path += `/${item}`),
                        };
                    }) || []
                );
            });
            setHiddenFolders([]);
            setHiddenFoldersWidth([]);
        }, [currentPath, t]);

        const switchPath = (path: string) => {
            setCurrentPath(path);
            onFolderChange?.(path);
        };

        const getBreadCrumbWidth = useCallback((): number => {
            if (!breadCrumbRef.current) return 0;

            const containerWidth = breadCrumbRef.current.clientWidth;
            const containerStyles = getComputedStyle(breadCrumbRef.current);
            const paddingLeft = parseFloat(containerStyles.paddingLeft);
            const navTogglerGap = collapsibleNav ? 2 : 0;
            const navTogglerDividerWidth = 1;
            const navTogglerWidth =
                collapsibleNav && navTogglerRef.current
                    ? navTogglerRef.current.clientWidth + navTogglerDividerWidth
                    : 0;
            const moreBtnGap = hiddenFolders.length > 0 ? 1 : 0;
            const flexGap =
                parseFloat(containerStyles.gap) *
                (folders.length + moreBtnGap + navTogglerGap);
            return containerWidth - (paddingLeft + flexGap + navTogglerWidth);
        }, [breadCrumbRef, collapsibleNav]);

        const checkAvailableSpace = (): number => {
            const availableSpace = getBreadCrumbWidth();
            const remainingFoldersWidth = foldersRef.current.reduce(
                (prev, curr) => {
                    if (!curr) return prev;
                    return prev + curr.clientWidth;
                },
                0,
            );
            const moreBtnWidth = moreBtnRef.current?.clientWidth || 0;
            return availableSpace - (remainingFoldersWidth + moreBtnWidth);
        };

        const isBreadCrumbOverflowing = (): boolean => {
            if (!breadCrumbRef.current) return false;
            return (
                breadCrumbRef.current.scrollWidth >
                breadCrumbRef.current.clientWidth
            );
        };

        useEffect(() => {
            if (isBreadCrumbOverflowing()) {
                const hiddenFolder = folders[1];
                const hiddenFolderWidth =
                    foldersRef.current[1]?.clientWidth || 0;

                if (hiddenFolder) {
                    setHiddenFoldersWidth((prev) => [
                        ...prev,
                        hiddenFolderWidth,
                    ]);
                    setHiddenFolders((prev) => [...prev, hiddenFolder]);
                    setFolders((prev) =>
                        prev.filter((_, index) => index !== 1),
                    );
                }
            } else if (
                hiddenFolders.length > 0 &&
                checkAvailableSpace() > (ARY.at(hiddenFoldersWidth, -1) || 0)
            ) {
                const lastHiddenFolder = ARY.at(hiddenFolders, -1);
                if (lastHiddenFolder) {
                    const newFolders = [
                        folders[0],
                        lastHiddenFolder,
                        ...folders.slice(1),
                    ];
                    setFolders(newFolders);
                    setHiddenFolders((prev) => prev.slice(0, -1));
                    setHiddenFoldersWidth((prev) => prev.slice(0, -1));
                }
            }
        }, [folders, hiddenFolders, hiddenFoldersWidth]);

        const folderNameCs: ChocoUi.Style.CS = {
            g: 4,
            dp: 'f',
            ai: 'c',
            fontW: 500,
            minW: 'fit-content',
            ':hover': { cur: 'p', clr: color },
        };

        return (
            <CBox ref={ref} posR fontS={16} className="bread-crumb-container">
                <CBox
                    ref={breadCrumbRef}
                    ofxH
                    dFlex
                    g={2}
                    pl={2}
                    py={1.5}
                    // p="6px 0 6px 16px"
                    className="breadcrumb"
                    allH={theme.font.size.base * 2}
                    brB={{ width: 0.25, color: 'primary' }}
                    cs={{
                        '&::-webkit-scrollbar': { h: 3 },
                        '&::-webkit-scrollbar-thumb': {
                            bg: 'var(--file-manager-primary-color) !important',
                        },
                    }}
                >
                    <CActivity show={collapsibleNav}>
                        <CBox
                            ref={navTogglerRef}
                            dFlex
                            aiCenter
                            title={t(
                                isNavigationPaneOpen
                                    ? 'collapseNavigationPane'
                                    : 'expandNavigationPane',
                            )}
                            className="nav-toggler"
                        >
                            <CIconButton
                                cs={folderNameCs}
                                onClick={switchNavigationPane}
                                className="folder-name folder-name-btn"
                                icon={
                                    isNavigationPaneOpen
                                        ? 'TbLayoutSidebarLeftCollapseFilled'
                                        : 'TbLayoutSidebarLeftExpand'
                                }
                            />
                        </CBox>
                        <CBox className="divider" w={1} bgClr="primary" />
                    </CActivity>
                    {folders.map((folder, index) => (
                        <CBox key={index} dContents>
                            <CBox
                                tag="span"
                                cs={folderNameCs}
                                className="folder-name"
                                onClick={() => switchPath(folder.path)}
                                ref={(element) => {
                                    foldersRef.current[index] = element;
                                }}
                            >
                                {index === 0 ? (
                                    <CIcon icon="MdHome" />
                                ) : (
                                    <CIcon icon="MdOutlineNavigateNext" />
                                )}
                                {folder.name}
                            </CBox>
                            {hiddenFolders?.length > 0 && index === 0 && (
                                <CButton
                                    ref={moreBtnRef}
                                    cs={folderNameCs}
                                    title={t('showMoreFolder')}
                                    className="folder-name folder-name-btn"
                                    onClick={() => setShowHiddenFolders(true)}
                                >
                                    <CIcon
                                        fontS={22}
                                        icon="MdMoreHoriz"
                                        className="hidden-folders"
                                    />
                                </CButton>
                            )}
                        </CBox>
                    ))}
                </CBox>
                {showHiddenFolders && (
                    <CList
                        ref={popoverRef.ref}
                        p={1}
                        g={1}
                        z={2}
                        posA
                        dFlex
                        column
                        l={42}
                        borR={2}
                        bg="red"
                        clr="red"
                        className="hidden-folders-container"
                    >
                        {hiddenFolders.map((folder, index) => (
                            <CList.Item
                                key={index}
                                py={1}
                                px={2}
                                cs={{
                                    ':hover': {
                                        cur: 'p',
                                        bgClr: 'blue',
                                    },
                                }}
                                onClick={() => {
                                    switchPath(folder.path);
                                    setShowHiddenFolders(false);
                                }}
                            >
                                {folder.name}
                            </CList.Item>
                        ))}
                    </CList>
                )}
            </CBox>
        );
    },
)();
