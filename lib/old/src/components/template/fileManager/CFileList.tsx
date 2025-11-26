//-Path: "react-choco-ui/lib/src/components/template/fileManager/CFileList.tsx"
// import './styles/FileList.scss';
import { CBox } from '$Compo/ui/CBox';
import { ChocoUi } from '$Type/Choco';
import { CFileItem } from './CFileItem';
import { customUi } from '$/custom/customUi';
import { useCallback, useMemo } from 'react';
import { CFilesHeader } from './CFilesHeader';
import { CActivity } from '$Compo/config/CActivity';
import { ContextMenu } from './components/ContextMenu';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { useFileList } from '../../../hooks/fileManager/hook/useFileList';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';
import { useTriggerActionContext } from '$Hook/fileManager/context/TriggerAction';
import { useDetectOutsideClick } from '$Hook/fileManager/hook/useDetectOutsideClick';

export type CFileListType = ChocoUi.Ui<
    'div',
    {
        icons?: Map<string, FileManager.IconData>;
        actions?: Map<string, FileManager.Action[]>;
        permissions: FileManager.Permissions;
        formatDate: FileManager.FormatDate;
        onRename?: FileManager.Callback;
        onRefresh?: FileManager.Callback;
        onFileOpen?: (file: FileManager.FileData) => void;
        onCreateFolder?: FileManager.Callback;
        enableFilePreview: boolean;
    }
>;

export const CFileList = customUi<CFileListType>(
    'div',
    'CFileList',
)(
    ({
        ref,
        Element,
        restProps: {
            icons,
            actions,
            onRename,
            onRefresh,
            formatDate,
            onFileOpen,
            className,
            permissions,
            onCreateFolder,
            enableFilePreview,
            ...restProps
        },
    }) => {
        console.log('render CFileList');

        const t = useTranslation();
        const { activeLayout } = useLayout();
        const triggerAction = useTriggerActionContext();
        const { currentPathFiles, sortConfig, setSortConfig } =
            useFileNavigation();
        const {
            visible,
            setVisible,
            unselectFiles,
            clickPosition,
            selecCtxItems,
            isSelectionCtx,
            handleContextMenu,
            emptySelecCtxItems,
            selectedFileIndexes,
            setLastSelectedFile,
        } = useFileList(
            enableFilePreview,
            permissions,
            triggerAction,
            onFileOpen,
            onRefresh,
        );

        const contextMenuRef = useDetectOutsideClick<HTMLDivElement>(() =>
            setVisible(false),
        );

        const handleSort = useCallback(
            (key: string) => {
                setSortConfig({
                    key,
                    direction:
                        sortConfig.key === key && sortConfig.direction === 'asc'
                            ? 'desc'
                            : 'asc',
                });
            },
            [sortConfig.key, sortConfig.direction],
        );

        const customActionClick = useCallback(
            (event: React.MouseEvent<HTMLElement>) => {
                setVisible(false);
                if (!actions) return;

                for (let actionKey of actions.keys()) {
                    const allSameClass =
                        selectedFileIndexes.length > 0 &&
                        selectedFileIndexes.every(
                            (i) => currentPathFiles[i]?.class === actionKey,
                        );
                    const action = actions?.get(actionKey);
                    if (allSameClass && action) {
                        for (let customAction of action) {
                            if (
                                customAction.title ===
                                event.currentTarget.innerText
                            ) {
                                const selectedFiles = currentPathFiles.filter(
                                    (f, i) => selectedFileIndexes.includes(i),
                                );
                                customAction.onClick(selectedFiles);
                            }
                        }
                    }
                }
            },
            [actions, selectedFileIndexes, currentPathFiles],
        );

        const contextItems = useMemo(() => {
            let contextItems = selecCtxItems;
            if (actions) {
                for (let actionKey of actions.keys()) {
                    let allSameClass =
                        selectedFileIndexes.length > 0 &&
                        selectedFileIndexes.every(
                            (i) => currentPathFiles[i].class === actionKey,
                        );
                    const action = actions.get(actionKey);
                    if (allSameClass && action) {
                        contextItems[contextItems.length - 1].divider = true;
                        for (let customAction of action) {
                            contextItems.push({
                                icon: customAction.icon,
                                title: customAction.title,
                                onClick: customActionClick,
                                divider: customAction.divider,
                            });
                        }
                    }
                }
            }
            return contextItems;
        }, [
            actions,
            selecCtxItems,
            currentPathFiles,
            customActionClick,
            selectedFileIndexes,
        ]);

        return (
            <Element
                ref={ref}
                onClick={unselectFiles}
                onContextMenu={handleContextMenu}
                className={['files', activeLayout, className].join(' ')}
                {...restProps}
            >
                <CActivity show={activeLayout === 'list'}>
                    <CFilesHeader
                        onSort={handleSort}
                        sortConfig={sortConfig}
                        unselectFiles={unselectFiles}
                    />
                </CActivity>

                {currentPathFiles?.length > 0 ? (
                    currentPathFiles.map((file, index) => (
                        <CFileItem
                            key={file.path}
                            file={file}
                            icons={icons}
                            index={index}
                            filesViewRef={ref}
                            onRename={onRename}
                            onFileOpen={onFileOpen}
                            setVisible={setVisible}
                            formatDate={formatDate}
                            draggable={permissions.move}
                            triggerAction={triggerAction}
                            onCreateFolder={onCreateFolder}
                            enableFilePreview={enableFilePreview}
                            handleContextMenu={handleContextMenu}
                            selectedFileIndexes={selectedFileIndexes}
                            setLastSelectedFile={setLastSelectedFile}
                        />
                    ))
                ) : (
                    <CBox full dFlex jcCenter aiCenter className="empty-folder">
                        {t('folderEmpty')}
                    </CBox>
                )}

                <ContextMenu
                    visible={visible}
                    filesViewRef={ref}
                    setVisible={setVisible}
                    ref={contextMenuRef.ref}
                    clickPosition={clickPosition}
                    menuItems={
                        isSelectionCtx ? contextItems : emptySelecCtxItems
                    }
                />
            </Element>
        );
    },
)(() => {
    const { activeLayout } = useLayout();

    return {
        ac: 's',
        dp: 'f',
        pos: 'r',
        ofy: 'a',
        fullH: true,
        fWrap: activeLayout === 'grid',
        column: activeLayout === 'list',
        p: activeLayout === 'grid' && 2,
        pr: activeLayout === 'grid' && 1,
        gx: activeLayout === 'grid' && 1,
        gy: activeLayout === 'grid' && 0.5,
    };
});
