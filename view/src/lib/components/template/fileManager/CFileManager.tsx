//-Path: "react-choco-ui/lib/src/components/template/fileManager/CFileManager.tsx"
import './styles/FileManager.scss';
import { ChocoUi } from '$Type/Choco';
import { CFileList } from './CFileList';
import { useMemo, useState } from 'react';
import { CBreadCrumb } from './CBreadCrumb';
import { Loader } from './components/Loader';
import { customUi } from '$/custom/customUi';
import { Actions } from './components/Actions';
import { Toolbar } from './components/Toolbar';
import { Locales } from '$Hook/fileManager/locales';
import { FileManager } from '$Hook/fileManager/fileManager';
import { NavigationPane } from './components/NavigationPane';
import { FilesProvider } from '$Hook/fileManager/context/Files';
import { LayoutProvider } from '$Hook/fileManager/context/Layout';
import { SelectionProvider } from '$Hook/fileManager/context/Selection';
import { ClipBoardProvider } from '$Hook/fileManager/context/Clipboard';
import { useColumnResize } from '$Hook/fileManager/hook/useColumnResize';
import { useTriggerAction } from '$Hook/fileManager/hook/useTriggerAction';
import { FileNavigationProvider } from '$Hook/fileManager/context/FileNavigation';
import { TranslationProvider } from '$Hook/fileManager/context/TranslationProvider';

export type CFileManagerType = ChocoUi.Ui<
    'main',
    {
        language?: Locales;
        isLoading?: boolean;
        fontFamily?: string;
        maxFileSize?: number;
        initialPath?: string;
        primaryColor?: string;
        width?: string | number;
        layout?: 'grid' | 'list';
        height?: string | number;
        collapsibleNav?: boolean;
        filePreviewPath?: string;
        acceptedFileTypes?: string[];
        enableFilePreview?: boolean;
        defaultNavExpanded?: boolean;
        files?: FileManager.FileData[];
        icons?: Map<string, FileManager.IconData>;
        actions?: Map<string, FileManager.Action[]>;
        permissions?: FileManager.Permissions;
        formatDate?: FileManager.FormatDate;
        onCut?: FileManager.Callback;
        onCopy?: FileManager.Callback;
        onPaste?: FileManager.Callback;
        onError?: (error: FileManager.Error, file?: File) => void;
        onRename?: FileManager.Callback;
        onDelete?: (files: FileManager.FileData[]) => void;
        onSelect?: FileManager.Callback;
        onRefresh?: FileManager.Callback;
        onFileOpen?: (file: FileManager.FileData) => void;
        onDownload?: FileManager.Callback;
        fileUploadConfig?: FileManager.UploadConfig;
        onCreateFolder?: FileManager.Callback;
        onFileUploaded?: FileManager.Callback;
        onFolderChange?: FileManager.Callback;
        onFileUploading?: FileManager.Callback;
        onSelectionChange?: FileManager.Callback;
        filePreviewComponent?: (
            file: FileManager.FileData,
        ) => React.ReactElement;
        onLayoutChange?: (key: FileManager.LayoutType) => void;
    }
>;

export const CFileManager = customUi<CFileManagerType>(
    'main',
    'CFileManager',
)(
    ({
        props: {
            style,
            className,
            maxFileSize,
            initialPath,
            width = '100%',
            height = '100%',
            language = 'en-US',
            fontFamily = 'Nunito Sans, sans-serif',
            primaryColor = '#6155b4',
            collapsibleNav,
            acceptedFileTypes,
            enableFilePreview = true,
            defaultNavExpanded = true,
            permissions: userPermissions,
            fileUploadConfig,
            isLoading,
            actions,
            layout = 'grid',
            files,
            icons,
            onCut,
            onCopy,
            onPaste,
            onSelect,
            onRename,
            onDownload,
            onError,
            onDelete,
            onRefresh,
            onFileOpen,
            onCreateFolder,
            onFolderChange,
            onLayoutChange,
            onFileUploaded,
            onFileUploading,
            filePreviewPath,
            onSelectionChange,
            filePreviewComponent,
            formatDate = FileManager.formatDate,
            ...props
        },
        ref,
    }) => {
        const [isNavigationPaneOpen, setNavigationPaneOpen] =
            useState(defaultNavExpanded);
        const triggerAction = useTriggerAction();
        const {
            containerRef,
            colSizes,
            isDragging,
            handleMouseMove,
            handleMouseUp,
            handleMouseDown,
        } = useColumnResize(20, 80);

        const customStyles = {
            '--file-manager-font-family': fontFamily,
            '--file-manager-primary-color': primaryColor,
            height,
            width,
        };

        const permissions = useMemo(
            () => ({ ...FileManager.defaultPermissions, ...userPermissions }),
            [userPermissions],
        );

        return (
            <main
                ref={ref}
                className={`file-explorer ${className}`}
                style={{ ...customStyles, ...style }}
                {...props}
            >
                <Loader loading={isLoading} />
                <TranslationProvider language={language}>
                    <FilesProvider filesData={files} onError={onError}>
                        <FileNavigationProvider
                            initialPath={initialPath}
                            onFolderChange={onFolderChange}
                        >
                            <SelectionProvider
                                onSelect={onSelect}
                                onDownload={onDownload}
                                onSelectionChange={onSelectionChange}
                            >
                                <ClipBoardProvider
                                    onCut={onCut}
                                    onCopy={onCopy}
                                    onPaste={onPaste}
                                >
                                    <LayoutProvider layout={layout}>
                                        <Toolbar
                                            onRefresh={onRefresh}
                                            permissions={permissions}
                                            triggerAction={triggerAction}
                                            onLayoutChange={onLayoutChange}
                                        />
                                        <section
                                            ref={containerRef}
                                            onMouseUp={handleMouseUp}
                                            className="files-container"
                                            onMouseMove={handleMouseMove}
                                        >
                                            <div
                                                className={`navigation-pane ${
                                                    isNavigationPaneOpen
                                                        ? 'open'
                                                        : 'closed'
                                                }`}
                                                style={{
                                                    width: colSizes.col1 + '%',
                                                }}
                                            >
                                                <NavigationPane
                                                    icons={icons}
                                                    onFileOpen={onFileOpen}
                                                />
                                                <div
                                                    className={`sidebar-resize ${
                                                        isDragging
                                                            ? 'sidebar-dragging'
                                                            : ''
                                                    }`}
                                                    onMouseDown={
                                                        handleMouseDown
                                                    }
                                                />
                                            </div>

                                            <div
                                                className="folders-preview"
                                                style={{
                                                    width:
                                                        (isNavigationPaneOpen
                                                            ? colSizes.col2
                                                            : 100) + '%',
                                                }}
                                            >
                                                <CBreadCrumb
                                                    collapsibleNav={
                                                        collapsibleNav
                                                    }
                                                    isNavigationPaneOpen={
                                                        isNavigationPaneOpen
                                                    }
                                                    setNavigationPaneOpen={
                                                        setNavigationPaneOpen
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
                                                    triggerAction={
                                                        triggerAction
                                                    }
                                                    onCreateFolder={
                                                        onCreateFolder
                                                    }
                                                    enableFilePreview={
                                                        enableFilePreview
                                                    }
                                                />
                                            </div>
                                        </section>
                                        <Actions
                                            fileUploadConfig={fileUploadConfig}
                                            onFileUploading={onFileUploading}
                                            onFileUploaded={onFileUploaded}
                                            onDelete={onDelete}
                                            onRefresh={onRefresh}
                                            maxFileSize={maxFileSize}
                                            filePreviewPath={filePreviewPath}
                                            filePreviewComponent={
                                                filePreviewComponent
                                            }
                                            acceptedFileTypes={
                                                acceptedFileTypes
                                            }
                                            triggerAction={triggerAction}
                                            permissions={permissions}
                                        />
                                    </LayoutProvider>
                                </ClipBoardProvider>
                            </SelectionProvider>
                        </FileNavigationProvider>
                    </FilesProvider>
                </TranslationProvider>
            </main>
        );
    },
)();
