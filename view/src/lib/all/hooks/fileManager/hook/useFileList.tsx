//-Path: "react-choco-ui/lib/src/hooks/fileManager/hook/useFileList.tsx"
import { CIcon } from '$Compo/template/CIcon';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useClipBoard } from '$Hook/fileManager/context/Clipboard';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

export const useFileList = (
    enableFilePreview: boolean,
    permissions: FileManager.Permissions,
    triggerAction: FileManager.TriggerAction,
    onFileOpen?: (file: FileManager.FileData) => void,
    onRefresh?: FileManager.Callback,
) => {
    const t = useTranslation();
    const [visible, setVisible] = useState(false);
    const { activeLayout, setActiveLayout } = useLayout();
    const [isSelectionCtx, setIsSelectionCtx] = useState(false);
    const [clickPosition, setClickPosition] = useState<FileManager.Position>({
        x: 0,
        y: 0,
    });
    const [lastSelectedFile, setLastSelectedFile] =
        useState<FileManager.FileData | null>(null);

    const [selectedFileIndexes, setSelectedFileIndexes] = useState<number[]>(
        [],
    );
    const { clipBoard, setClipBoard, handleCutCopy, handlePasting } =
        useClipBoard();
    const { selectedFiles, setSelectedFiles, handleDownload } = useSelection();
    const {
        currentPath,
        currentPathFiles,
        onFolderChange,
        setCurrentPath,
        setCurrentPathFiles,
    } = useFileNavigation();

    // Context Menu Handlers - memoized callbacks
    const handleFileOpen = useCallback(() => {
        if (!lastSelectedFile) return;
        onFileOpen?.(lastSelectedFile);
        if (lastSelectedFile.isDirectory) {
            setCurrentPath(lastSelectedFile.path ?? '');
            onFolderChange?.(lastSelectedFile.path ?? '');
            setSelectedFileIndexes([]);
            setSelectedFiles([]);
        } else enableFilePreview && triggerAction.show('previewFile');
        setVisible(false);
    }, [
        lastSelectedFile,
        onFileOpen,
        setCurrentPath,
        onFolderChange,
        enableFilePreview,
        triggerAction,
    ]);

    const handleMoveOrCopyItems = useCallback(
        (isMoving: boolean) => {
            handleCutCopy(isMoving);
            setVisible(false);
        },
        [handleCutCopy],
    );

    const handleFilePasting = useCallback(() => {
        handlePasting(lastSelectedFile);
        setVisible(false);
    }, [handlePasting, lastSelectedFile]);

    const handleRenaming = useCallback(() => {
        setVisible(false);
        triggerAction.show('rename');
    }, [triggerAction]);

    const handleDownloadItems = useCallback(() => {
        handleDownload();
        setVisible(false);
    }, [handleDownload]);

    const handleDelete = useCallback(() => {
        setVisible(false);
        triggerAction.show('delete');
    }, [triggerAction]);

    const handleRefresh = useCallback(() => {
        setVisible(false);
        FileManager.validateApiCallback(onRefresh, 'onRefresh');
        setClipBoard(null);
    }, [onRefresh, setClipBoard]);

    const handleCreateNewFolder = useCallback(() => {
        triggerAction.show('createFolder');
        setVisible(false);
    }, [triggerAction]);

    const handleUpload = useCallback(() => {
        setVisible(false);
        triggerAction.show('uploadFile');
    }, [triggerAction]);

    const handleselectAllFiles = useCallback(() => {
        setSelectedFiles(currentPathFiles);
        setVisible(false);
    }, [currentPathFiles]);

    // Memoized context menu items
    const emptySelecCtxItems: FileManager.MenuItem[] = useMemo(
        () => [
            {
                title: t('view'),
                onClick: () => {},
                icon: (
                    <CIcon
                        fontS={18}
                        icon={activeLayout === 'grid' ? 'BsGrid' : 'FaListUl'}
                    />
                ),
                children: [
                    {
                        title: t('grid'),
                        selected: activeLayout === 'grid',
                        icon: <CIcon icon="BsGrid" fontS={18} />,
                        onClick: () => {
                            setActiveLayout('grid');
                            setVisible(false);
                        },
                    },
                    {
                        title: t('list'),
                        selected: activeLayout === 'list',
                        icon: <CIcon icon="FaListUl" fontS={18} />,
                        onClick: () => {
                            setActiveLayout('list');
                            setVisible(false);
                        },
                    },
                ],
            },
            {
                divider: true,
                title: t('refresh'),
                onClick: handleRefresh,
                icon: <CIcon icon="FiRefreshCw" fontS={18} />,
            },
            {
                title: t('newFolder'),
                hidden: !permissions.create,
                divider: !permissions.upload,
                onClick: handleCreateNewFolder,
                icon: <CIcon icon="BsFolderPlus" fontS={18} />,
            },
            {
                divider: true,
                title: t('upload'),
                onClick: handleUpload,
                hidden: !permissions.upload,
                icon: <CIcon icon="MdOutlineFileUpload" fontS={18} />,
            },
            {
                title: t('selectAll'),
                onClick: handleselectAllFiles,
                icon: <CIcon icon="BiSelectMultiple" fontS={18} />,
            },
        ],
        [
            t,
            activeLayout,
            setActiveLayout,
            handleRefresh,
            permissions,
            handleCreateNewFolder,
            handleUpload,
            handleselectAllFiles,
        ],
    );

    const selecCtxItems: FileManager.MenuItem[] = useMemo(
        () => [
            {
                divider: true,
                title: t('open'),
                onClick: handleFileOpen,
                icon: lastSelectedFile?.isDirectory ? (
                    <CIcon icon="PiFolderOpen" fontS={20} />
                ) : (
                    <CIcon icon="FaRegFile" fontS={16} />
                ),
            },
            {
                title: t('cut'),
                hidden: !permissions.move,
                onClick: () => handleMoveOrCopyItems(true),
                icon: <CIcon icon="BsScissors" fontS={19} />,
                divider: !lastSelectedFile?.isDirectory && !permissions.copy,
            },
            {
                title: t('copy'),
                hidden: !permissions.copy,
                divider: !lastSelectedFile?.isDirectory,
                onClick: () => handleMoveOrCopyItems(false),
                icon: (
                    <CIcon
                        fontS={17}
                        icon="BsCopy"
                        style={{ strokeWidth: 0.1 }}
                    />
                ),
            },
            {
                divider: true,
                title: t('paste'),
                onClick: handleFilePasting,
                disablePaste: Boolean(clipBoard),
                hidden:
                    !lastSelectedFile?.isDirectory ||
                    (!permissions.move && !permissions.copy),
                icon: <CIcon icon="FaRegPaste" fontS={18} />,
            },
            {
                title: t('rename'),
                onClick: handleRenaming,
                icon: <CIcon icon="BiRename" fontS={19} />,
                hidden: selectedFiles.length > 1 || !permissions.rename,
            },
            {
                title: t('download'),
                onClick: handleDownloadItems,
                hidden: !permissions.download,
                icon: <CIcon icon="MdOutlineFileDownload" fontS={18} />,
            },
            {
                title: t('delete'),
                onClick: handleDelete,
                hidden: !permissions.delete,
                icon: <CIcon icon="MdOutlineDelete" fontS={19} />,
            },
        ],
        [
            t,
            handleFileOpen,
            lastSelectedFile,
            permissions,
            handleMoveOrCopyItems,
            handleFilePasting,
            clipBoard,
            handleRenaming,
            selectedFiles.length,
            handleDownloadItems,
            handleDelete,
        ],
    );

    const handleFolderCreating = useCallback(() => {
        setCurrentPathFiles((prev) => {
            return [
                ...prev,
                {
                    name: FileManager.duplicateNameHandler(
                        'New Folder',
                        true,
                        prev,
                    ),
                    isDirectory: true,
                    path: currentPath,
                    isEditing: true,
                    key: new Date().valueOf(),
                } as FileManager.FileData,
            ];
        });
    }, [currentPath, setCurrentPathFiles]);

    const handleItemRenaming = useCallback(() => {
        setCurrentPathFiles((prev) => {
            const lastFileIndex =
                selectedFileIndexes.length > 0
                    ? selectedFileIndexes[selectedFileIndexes.length - 1]
                    : undefined;

            if (lastFileIndex === undefined || !prev[lastFileIndex]) {
                triggerAction.close();
                return prev;
            }

            return prev.map((file, index) =>
                index === lastFileIndex ? { ...file, isEditing: true } : file,
            );
        });

        setSelectedFileIndexes([]);
        setSelectedFiles([]);
    }, [selectedFileIndexes, triggerAction]);

    const unselectFiles = useCallback(() => {
        setSelectedFileIndexes([]);
        setSelectedFiles((prev) => (prev.length > 0 ? [] : prev));
    }, []);

    const handleContextMenu = useCallback(
        (event: React.MouseEvent, isSelection: boolean = false) => {
            event.preventDefault();
            setClickPosition({ x: event.clientX, y: event.clientY });
            setIsSelectionCtx(isSelection);
            !isSelection && unselectFiles();
            setVisible(true);
        },
        [unselectFiles],
    );

    // Effects
    useEffect(() => {
        if (triggerAction.isActive) {
            switch (triggerAction.actionType) {
                case 'createFolder':
                    handleFolderCreating();
                    break;
                case 'rename':
                    handleItemRenaming();
                    break;
            }
        }
    }, [
        triggerAction.isActive,
        triggerAction.actionType,
        handleFolderCreating,
        handleItemRenaming,
    ]);

    useEffect(() => {
        setSelectedFileIndexes([]);
        setSelectedFiles([]);
    }, [currentPath]);

    useEffect(() => {
        const newIndexes = selectedFiles
            .map((selectedFile) =>
                currentPathFiles.findIndex((f) => f.path === selectedFile.path),
            )
            .filter((index) => index !== -1);

        setSelectedFileIndexes(newIndexes);
    }, [selectedFiles, currentPathFiles]);

    return useMemo(
        () => ({
            visible,
            clickPosition,
            selecCtxItems,
            isSelectionCtx,
            emptySelecCtxItems,
            selectedFileIndexes,
            setVisible,
            unselectFiles,
            handleContextMenu,
            setLastSelectedFile,
        }),
        [
            visible,
            clickPosition,
            selecCtxItems,
            isSelectionCtx,
            emptySelecCtxItems,
            selectedFileIndexes,
            unselectFiles,
            handleContextMenu,
        ],
    );
};
