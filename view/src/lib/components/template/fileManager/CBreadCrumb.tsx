//-Path: "react-choco-ui/lib/src/components/template/fileManager/CBreadCrumb.tsx"
import { CIcon } from '../CIcon';
import { ARY } from '$Hook/array';
import './styles/BreadCrumb.scss';
import { ChocoUi } from '$Type/Choco';
import { SetState } from '$Type/Type';
import { customUi } from '$/custom/customUi';
import { useEffect, useRef, useState } from 'react';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';
import { useDetectOutsideClick } from '$Hook/fileManager/hook/useDetectOutsideClick';

interface FolderItem {
    name: string;
    path: string;
}

type CBreadCrumbType = ChocoUi.Ui<
    'div',
    {
        collapsibleNav?: boolean;
        isNavigationPaneOpen: boolean;
        setNavigationPaneOpen: SetState<boolean>;
    }
>;

export const CBreadCrumb = customUi<CBreadCrumbType>(
    'div',
    'CBreadCrumb',
)(
    ({
        props: {
            collapsibleNav = false,
            isNavigationPaneOpen,
            setNavigationPaneOpen,
        },
        ref,
    }) => {
        const t = useTranslation();
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

        const getBreadCrumbWidth = (): number => {
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
        };

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

        return (
            <div ref={ref} className="bread-crumb-container">
                <div className="breadcrumb" ref={breadCrumbRef}>
                    {collapsibleNav && (
                        <>
                            <div
                                ref={navTogglerRef}
                                className="nav-toggler"
                                title={`${
                                    isNavigationPaneOpen
                                        ? t('collapseNavigationPane')
                                        : t('expandNavigationPane')
                                }`}
                            >
                                <span
                                    className="folder-name folder-name-btn"
                                    onClick={() =>
                                        setNavigationPaneOpen((prev) => !prev)
                                    }
                                >
                                    {isNavigationPaneOpen ? (
                                        <CIcon icon="TbLayoutSidebarLeftCollapseFilled" />
                                    ) : (
                                        <CIcon icon="TbLayoutSidebarLeftExpand" />
                                    )}
                                </span>
                            </div>
                            <div className="divider" />
                        </>
                    )}
                    {folders.map((folder, index) => (
                        <div key={index} style={{ display: 'contents' }}>
                            <span
                                className="folder-name"
                                onClick={() => switchPath(folder.path)}
                                ref={(el) => {
                                    foldersRef.current[index] = el;
                                }}
                            >
                                {index === 0 ? (
                                    <CIcon icon="MdHome" />
                                ) : (
                                    <CIcon icon="MdOutlineNavigateNext" />
                                )}
                                {folder.name}
                            </span>
                            {hiddenFolders?.length > 0 && index === 0 && (
                                <button
                                    className="folder-name folder-name-btn"
                                    onClick={() => setShowHiddenFolders(true)}
                                    ref={moreBtnRef}
                                    title={t('showMoreFolder')}
                                >
                                    <CIcon
                                        icon="MdMoreHoriz"
                                        size={22}
                                        className="hidden-folders"
                                    />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {showHiddenFolders && (
                    <ul
                        ref={popoverRef.ref}
                        className="hidden-folders-container"
                    >
                        {hiddenFolders.map((folder, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    switchPath(folder.path);
                                    setShowHiddenFolders(false);
                                }}
                            >
                                {folder.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    },
)();
