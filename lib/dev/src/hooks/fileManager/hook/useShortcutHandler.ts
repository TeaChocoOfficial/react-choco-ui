//-Path: "react-choco-ui/lib/dev/src/hooks/fileManager/hook/useShortcutHandler.ts"
import { ARY } from '../../array';
import { useKeyPress } from './useKeyPress';
import { FileManager } from '../fileManager';
import { useLayout } from '../context/Layout';
import { useClipBoard } from '../context/Clipboard';
import { useSelection } from '../context/Selection';
import { useFileNavigation } from '../context/FileNavigation';

export const useShortcutHandler = (
    triggerAction: FileManager.TriggerAction,
    permissions?: FileManager.Permissions,
    onRefresh?: FileManager.Callback,
) => {
    const { setActiveLayout } = useLayout();
    const { currentFolder, currentPathFiles } = useFileNavigation();
    const { setClipBoard, handleCutCopy, handlePasting } = useClipBoard();
    const { selectedFiles, setSelectedFiles, handleDownload } = useSelection();

    const triggerCreateFolder = () => {
        permissions?.create && triggerAction.show('createFolder');
    };

    const triggerUploadFiles = () => {
        permissions?.upload && triggerAction.show('uploadFile');
    };

    const triggerCutItems = () => {
        permissions?.move && handleCutCopy(true);
    };

    const triggerCopyItems = () => {
        permissions?.copy && handleCutCopy(false);
    };

    const triggerPasteItems = () => {
        handlePasting(currentFolder);
    };

    const triggerRename = () => {
        permissions?.rename && triggerAction.show('rename');
    };

    const triggerDownload = () => {
        permissions?.download && handleDownload();
    };

    const triggerDelete = () => {
        if (permissions?.delete && selectedFiles.length) {
            triggerAction.show('delete');
        }
    };

    const triggerSelectFirst = () => {
        if (currentPathFiles.length > 0) {
            setSelectedFiles([currentPathFiles[0]]);
        }
    };

    const triggerSelectLast = () => {
        if (currentPathFiles.length > 0) {
            const file = ARY.at(currentPathFiles, -1);
            if (file) setSelectedFiles([file]);
        }
    };

    const triggerSelectAll = () => {
        setSelectedFiles(currentPathFiles);
    };

    const triggerClearSelection = () => {
        setSelectedFiles((prev) => (prev.length > 0 ? [] : prev));
    };

    const triggerRefresh = () => {
        FileManager.validateApiCallback(onRefresh, 'onRefresh');
        setClipBoard(null);
    };

    const triggerGridLayout = () => {
        setActiveLayout('grid');
    };
    const triggerListLayout = () => {
        setActiveLayout('list');
    };

    // Keypress detection will be disbaled when some Action is in active state.
    useKeyPress(
        FileManager.shortcuts.createFolder,
        triggerCreateFolder,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.uploadFiles,
        triggerUploadFiles,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.cut,
        triggerCutItems,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.copy,
        triggerCopyItems,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.paste,
        triggerPasteItems,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.rename,
        triggerRename,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.download,
        triggerDownload,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.delete,
        triggerDelete,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.jumpToFirst,
        triggerSelectFirst,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.jumpToLast,
        triggerSelectLast,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.selectAll,
        triggerSelectAll,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.clearSelection,
        triggerClearSelection,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.refresh,
        triggerRefresh,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.gridLayout,
        triggerGridLayout,
        triggerAction.isActive,
    );
    useKeyPress(
        FileManager.shortcuts.listLayout,
        triggerListLayout,
        triggerAction.isActive,
    );
};
