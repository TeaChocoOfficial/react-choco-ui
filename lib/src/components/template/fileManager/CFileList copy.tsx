//-Path: "react-choco-ui/lib/src/components/template/fileManager/CFileList.tsx"
// import './styles/FileList.scss';
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { FileListChilds } from './FileListChilds';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { useFileList } from '../../../hooks/fileManager/hook/useFileList';
import { useTriggerActionContext } from '$Hook/fileManager/context/TriggerAction';

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

        const { activeLayout } = useLayout();
        const triggerAction = useTriggerActionContext();
        const {
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
        } = useFileList(
            enableFilePreview,
            permissions,
            triggerAction,
            onFileOpen,
            onRefresh,
        );

        return (
            <Element
                ref={ref}
                onClick={unselectFiles}
                onContextMenu={handleContextMenu}
                className={['files', activeLayout, className].join(' ')}
                {...restProps}
            >
                <FileListChilds
                    visible={visible}
                    clickPosition={clickPosition}
                    selecCtxItems={selecCtxItems}
                    isSelectionCtx={isSelectionCtx}
                    emptySelecCtxItems={emptySelecCtxItems}
                    selectedFileIndexes={selectedFileIndexes}
                    setVisible={setVisible}
                    unselectFiles={unselectFiles}
                    handleContextMenu={handleContextMenu}
                    setLastSelectedFile={setLastSelectedFile}
                    icons={icons}
                    actions={actions}
                    filesViewRef={ref}
                    onRename={onRename}
                    onRefresh={onRefresh}
                    formatDate={formatDate}
                    onFileOpen={onFileOpen}
                    permissions={permissions}
                    onCreateFolder={onCreateFolder}
                    enableFilePreview={enableFilePreview}
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
