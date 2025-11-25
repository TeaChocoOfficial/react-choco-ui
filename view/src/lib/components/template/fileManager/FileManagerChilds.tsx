//-Path: "react-choco-ui/lib/src/components/template/fileManager/FileManagerChilds.tsx"
import { CSplit } from '../CSplit';
import { CFileList } from './CFileList';
import { useMemo, useState } from 'react';
import { CBreadCrumb } from './CBreadCrumb';
import { Toolbar } from './components/Toolbar';
import { Actions } from './components/Actions';
import { FileManager } from '$Hook/fileManager/fileManager';
import { NavigationPane } from './components/NavigationPane';

export interface FileManagerChildsProps {
    maxFileSize?: number;
    collapsibleNav?: boolean;
    filePreviewPath?: string;
    acceptedFileTypes?: string[];
    enableFilePreview?: boolean;
    defaultNavExpanded?: boolean;
    permissions?: FileManager.Permissions;
    icons?: Map<string, FileManager.IconData>;
    actions?: Map<string, FileManager.Action[]>;
    fileUploadConfig?: FileManager.UploadConfig;
    onRename?: FileManager.Callback;
    onRefresh?: FileManager.Callback;
    formatDate?: FileManager.FormatDate;
    onCreateFolder?: FileManager.Callback;
    onFileUploaded?: FileManager.Callback;
    onFileUploading?: FileManager.Callback;
    onFileOpen?: (file: FileManager.FileData) => void;
    onDelete?: (files: FileManager.FileData[]) => void;
    onLayoutChange?: (key: FileManager.LayoutType) => void;
    filePreviewComponent?: (file: FileManager.FileData) => React.ReactElement;
}

export const FileManagerChilds = ({
    icons,
    actions,
    maxFileSize,
    collapsibleNav,
    filePreviewPath,
    fileUploadConfig,
    acceptedFileTypes,
    enableFilePreview = true,
    defaultNavExpanded = true,
    permissions: userPermissions,
    onRename,
    onDelete,
    onRefresh,
    onFileOpen,
    onCreateFolder,
    onLayoutChange,
    onFileUploaded,
    onFileUploading,
    filePreviewComponent,
    formatDate = FileManager.formatDate,
}: FileManagerChildsProps) => {
    console.log('render file manager childs');

    const [isNavigationPaneOpen, setNavigationPaneOpen] =
        useState(defaultNavExpanded);

    const permissions = useMemo(
        () => ({ ...FileManager.defaultPermissions, ...userPermissions }),
        [userPermissions],
    );

    const FoldersPreview = () => (
        <CSplit.Pane z={2} fullW className="folders-preview">
            <CBreadCrumb
                collapsibleNav={collapsibleNav}
                isNavigationPaneOpen={isNavigationPaneOpen}
                switchNavigationPane={() =>
                    setNavigationPaneOpen((prev) => !prev)
                }
            />
            <CFileList
                icons={icons}
                actions={actions}
                onRename={onRename}
                onRefresh={onRefresh}
                formatDate={formatDate}
                onFileOpen={onFileOpen}
                permissions={permissions}
                // triggerAction={triggerAction}
                onCreateFolder={onCreateFolder}
                enableFilePreview={enableFilePreview}
            />
        </CSplit.Pane>
    );

    return (
        <>
            <Toolbar
                onRefresh={onRefresh}
                permissions={permissions}
                // triggerAction={triggerAction}
                onLayoutChange={onLayoutChange}
            />
            {isNavigationPaneOpen ? (
                <CSplit tag="section" snap defaultSizes={[20, 80]}>
                    <CSplit.Pane
                        posR
                        fullW
                        z={1}
                        pt={2}
                        className="navigation-pane"
                    >
                        <NavigationPane icons={icons} onFileOpen={onFileOpen} />
                    </CSplit.Pane>
                    <FoldersPreview />
                </CSplit>
            ) : (
                <FoldersPreview />
            )}
            <Actions
                onDelete={onDelete}
                onRefresh={onRefresh}
                permissions={permissions}
                maxFileSize={maxFileSize}
                // triggerAction={triggerAction}
                onFileUploaded={onFileUploaded}
                onFileUploading={onFileUploading}
                filePreviewPath={filePreviewPath}
                fileUploadConfig={fileUploadConfig}
                acceptedFileTypes={acceptedFileTypes}
                filePreviewComponent={filePreviewComponent}
            />
        </>
    );
};
