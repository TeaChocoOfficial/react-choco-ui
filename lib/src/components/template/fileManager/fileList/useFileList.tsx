//-Path: "react-choco-ui/lib/src/components/template/fileManager/fileList/useFileList.tsx"
import { useEffect, useState } from 'react';
import { CIcon } from '$Compo/template/CIcon';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { useClipBoard } from '$Hook/fileManager/context/Clipboard';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

interface ContextMenuItem {
    icon: React.ReactNode;
    title: string;
    hidden?: boolean;
    divider?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
    children?: ContextMenuItem[];
    selected?: boolean;
    className?: string;
}

interface ClickPosition {
    clickX: number;
    clickY: number;
}

export const useFileList = (
    enableFilePreview: boolean,
    permissions: FileManager.Permissions,
    triggerAction: FileManager.TriggerAction,
    onFileOpen?: (file: FileManager.FileData) => void,
    onRefresh?: FileManager.Callback,
) => {
    const [selectedFileIndexes, setSelectedFileIndexes] = useState<number[]>(
        [],
    );
    const [visible, setVisible] = useState(false);
    const [isSelectionCtx, setIsSelectionCtx] = useState(false);
    const [clickPosition, setClickPosition] = useState<ClickPosition>({
        clickX: 0,
        clickY: 0,
    });
    const [lastSelectedFile, setLastSelectedFile] =
        useState<FileManager.FileData | null>(null);

    const { clipBoard, setClipBoard, handleCutCopy, handlePasting } =
        useClipBoard();
    const { selectedFiles, setSelectedFiles, handleDownload } = useSelection();
    const {
        currentPath,
        setCurrentPath,
        currentPathFiles,
        setCurrentPathFiles,
        onFolderChange,
    } = useFileNavigation();
    const { activeLayout, setActiveLayout } = useLayout();
    const t = useTranslation();

    // Context Menu
    const handleFileOpen = () => {
        if (!lastSelectedFile) return;

        onFileOpen?.(lastSelectedFile);
        if (lastSelectedFile.isDirectory) {
            setCurrentPath(lastSelectedFile.path ?? '');
            onFolderChange?.(lastSelectedFile.path ?? '');
            setSelectedFileIndexes([]);
            setSelectedFiles([]);
        } else {
            enableFilePreview && triggerAction.show('previewFile');
        }
        setVisible(false);
    };

    const handleMoveOrCopyItems = (isMoving: boolean) => {
        handleCutCopy(isMoving);
        setVisible(false);
    };

    const handleFilePasting = () => {
        handlePasting(lastSelectedFile);
        setVisible(false);
    };

    const handleRenaming = () => {
        setVisible(false);
        triggerAction.show('rename');
    };

    const handleDownloadItems = () => {
        handleDownload();
        setVisible(false);
    };

    const handleDelete = () => {
        setVisible(false);
        triggerAction.show('delete');
    };

    const handleRefresh = () => {
        setVisible(false);
        FileManager.validateApiCallback(onRefresh, 'onRefresh');
        setClipBoard(null);
    };

    const handleCreateNewFolder = () => {
        triggerAction.show('createFolder');
        setVisible(false);
    };

    const handleUpload = () => {
        setVisible(false);
        triggerAction.show('uploadFile');
    };

    const handleselectAllFiles = () => {
        setSelectedFiles(currentPathFiles);
        setVisible(false);
    };

    const emptySelecCtxItems: ContextMenuItem[] = [
        {
            title: t('view'),
            icon:
                activeLayout === 'grid' ? (
                    <CIcon icon="BsGrid" size={18} />
                ) : (
                    <CIcon icon="FaListUl" size={18} />
                ),
            onClick: () => {},
            children: [
                {
                    title: t('grid'),
                    icon: <CIcon icon="BsGrid" size={18} />,
                    selected: activeLayout === 'grid',
                    onClick: () => {
                        setActiveLayout('grid');
                        setVisible(false);
                    },
                },
                {
                    title: t('list'),
                    icon: <CIcon icon="FaListUl" size={18} />,
                    selected: activeLayout === 'list',
                    onClick: () => {
                        setActiveLayout('list');
                        setVisible(false);
                    },
                },
            ],
        },
        {
            title: t('refresh'),
            icon: <CIcon icon="FiRefreshCw" size={18} />,
            onClick: handleRefresh,
            divider: true,
        },
        {
            title: t('newFolder'),
            icon: <CIcon icon="BsFolderPlus" size={18} />,
            onClick: handleCreateNewFolder,
            hidden: !permissions.create,
            divider: !permissions.upload,
        },
        {
            title: t('upload'),
            icon: <CIcon icon="MdOutlineFileUpload" size={18} />,
            onClick: handleUpload,
            divider: true,
            hidden: !permissions.upload,
        },
        {
            title: t('selectAll'),
            icon: <CIcon icon="BiSelectMultiple" size={18} />,
            onClick: handleselectAllFiles,
        },
    ];

    const selecCtxItems: ContextMenuItem[] = [
        {
            title: t('open'),
            icon: lastSelectedFile?.isDirectory ? (
                <CIcon icon="PiFolderOpen" size={20} />
            ) : (
                <CIcon icon="FaRegFile" size={16} />
            ),
            onClick: handleFileOpen,
            divider: true,
        },
        {
            title: t('cut'),
            icon: <CIcon icon="BsScissors" size={19} />,
            onClick: () => handleMoveOrCopyItems(true),
            divider: !lastSelectedFile?.isDirectory && !permissions.copy,
            hidden: !permissions.move,
        },
        {
            title: t('copy'),
            icon: (
                <CIcon size={17} icon="BsCopy" style={{ strokeWidth: 0.1 }} />
            ),
            onClick: () => handleMoveOrCopyItems(false),
            divider: !lastSelectedFile?.isDirectory,
            hidden: !permissions.copy,
        },
        {
            title: t('paste'),
            icon: <CIcon icon="FaRegPaste" size={18} />,
            onClick: handleFilePasting,
            className: `${clipBoard ? '' : 'disable-paste'}`,
            hidden:
                !lastSelectedFile?.isDirectory ||
                (!permissions.move && !permissions.copy),
            divider: true,
        },
        {
            title: t('rename'),
            icon: <CIcon icon="BiRename" size={19} />,
            onClick: handleRenaming,
            hidden: selectedFiles.length > 1 || !permissions.rename,
        },
        {
            title: t('download'),
            icon: <CIcon icon="MdOutlineFileDownload" size={18} />,
            onClick: handleDownloadItems,
            hidden: !permissions.download,
        },
        {
            title: t('delete'),
            icon: <CIcon icon="MdOutlineDelete" size={19} />,
            onClick: handleDelete,
            hidden: !permissions.delete,
        },
    ];

    const handleFolderCreating = () => {
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
    };

    const handleItemRenaming = () => {
        setCurrentPathFiles((prev) => {
            const lastFileIndex =
                selectedFileIndexes.length > 0
                    ? selectedFileIndexes[selectedFileIndexes.length - 1]
                    : undefined;

            if (lastFileIndex === undefined || !prev[lastFileIndex]) {
                triggerAction.close();
                return prev;
            }

            return prev.map((file, index) => {
                if (index === lastFileIndex) {
                    return {
                        ...file,
                        isEditing: true,
                    };
                }

                return file;
            });
        });

        setSelectedFileIndexes([]);
        setSelectedFiles([]);
    };

    const unselectFiles = () => {
        setSelectedFileIndexes([]);
        setSelectedFiles((prev) => (prev.length > 0 ? [] : prev));
    };

    const handleContextMenu = (
        e: React.MouseEvent,
        isSelection: boolean = false,
    ) => {
        e.preventDefault();
        setClickPosition({ clickX: e.clientX, clickY: e.clientY });
        setIsSelectionCtx(isSelection);
        !isSelection && unselectFiles();
        setVisible(true);
    };

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
    }, [triggerAction.isActive]);

    useEffect(() => {
        setSelectedFileIndexes([]);
        setSelectedFiles([]);
    }, [currentPath]);

    useEffect(() => {
        if (selectedFiles.length > 0) {
            setSelectedFileIndexes(() => {
                return selectedFiles.map((selectedFile) => {
                    return currentPathFiles.findIndex(
                        (f) => f.path === selectedFile.path,
                    );
                });
            });
        } else {
            setSelectedFileIndexes([]);
        }
    }, [selectedFiles, currentPathFiles]);

    return {
        emptySelecCtxItems,
        selecCtxItems,
        handleContextMenu,
        unselectFiles,
        visible,
        setVisible,
        setLastSelectedFile,
        selectedFileIndexes,
        clickPosition,
        isSelectionCtx,
    };
};
