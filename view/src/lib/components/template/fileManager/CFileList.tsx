//-Path: "react-choco-ui/lib/src/components/template/fileManager/CFileList.tsx"
import './styles/FileList.scss';
import { tw } from '$/config/utils';
import { ChocoUi } from '$Type/Choco';
import { CFileItem } from './CFileItem';
import { createUi } from '$/custom/test/createUi';
import { CFilesHeader } from './CFilesHeader';
import { CActivity } from '$Compo/config/CActivity';
import { useFileList } from './fileList/useFileList';
import { ContextMenu } from './components/ContextMenu';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';
import { useDetectOutsideClick } from '$Hook/fileManager/hook/useDetectOutsideClick';

export type CFileListType = ChocoUi.Ui<
    'div',
    {
        icons?: Map<string, FileManager.IconData>;
        actions?: Map<string, FileManager.Action[]>;
        permissions: FileManager.Permissions;
        triggerAction: FileManager.TriggerAction;
        formatDate: FileManager.FormatDate;
        onRename?: FileManager.Callback;
        onRefresh?: FileManager.Callback;
        onFileOpen?: (file: FileManager.FileData) => void;
        onCreateFolder?: FileManager.Callback;
        enableFilePreview: boolean;
    }
>;

export const CFileList = createUi<CFileListType>(
    (
        {
            icons,
            actions,
            onRename,
            onRefresh,
            formatDate,
            onFileOpen,
            className,
            permissions,
            triggerAction,
            onCreateFolder,
            enableFilePreview,
            ...props
        },
        filesViewRef,
    ) => {
        const t = useTranslation();
        const { activeLayout } = useLayout();
        const { currentPathFiles, sortConfig, setSortConfig } =
            useFileNavigation();
        const {
            visible,
            setVisible,
            unselectFiles,
            clickPosition,
            selecCtxItems,
            isSelectionCtx,
            emptySelecCtxItems,
            selectedFileIndexes,
            setLastSelectedFile,
            handleContextMenu,
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

        const handleSort = (key: string) => {
            setSortConfig({
                key,
                direction:
                    sortConfig.key === key && sortConfig.direction === 'asc'
                        ? 'desc'
                        : 'asc',
            });
        };

        const customActionClick: React.MouseEventHandler<HTMLElement> = (
            event,
        ) => {
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
                            customAction.title === event.currentTarget.innerText
                        ) {
                            const selectedFiles = currentPathFiles.filter(
                                (f, i) => selectedFileIndexes.includes(i),
                            );
                            customAction.onClick(selectedFiles);
                        }
                    }
                }
            }
        };

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
        return (
            <div
                ref={filesViewRef}
                onClick={unselectFiles}
                onContextMenu={handleContextMenu}
                className={tw(`files ${activeLayout}`, className)}
                {...props}
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
                            key={index}
                            file={file}
                            icons={icons}
                            index={index}
                            onRename={onRename}
                            onFileOpen={onFileOpen}
                            setVisible={setVisible}
                            formatDate={formatDate}
                            filesViewRef={filesViewRef}
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
                    <div className="empty-folder">{t('folderEmpty')}</div>
                )}

                <ContextMenu
                    visible={visible}
                    setVisible={setVisible}
                    ref={contextMenuRef.ref}
                    filesViewRef={filesViewRef}
                    clickPosition={clickPosition}
                    menuItems={
                        isSelectionCtx ? contextItems : emptySelecCtxItems
                    }
                />
            </div>
        );
    },
    'CFileList',
);
