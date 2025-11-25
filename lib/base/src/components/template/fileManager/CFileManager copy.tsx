//-Path: "react-choco-ui/lib/src/components/template/fileManager/CFileManager.tsx"
// import './styles/FileManager.scss';
import { CBox } from '$Compo/ui/CBox';
import { ChocoUi } from '$Type/Choco';
import { CFileList } from './CFileList';
import { useMemo, useState } from 'react';
import { CBreadCrumb } from './CBreadCrumb';
import { Loader } from './components/Loader';
import { customUi } from '$/custom/customUi';
import { Toolbar } from './components/Toolbar';
import { Actions } from './components/Actions';
import { Locales } from '$Hook/fileManager/locales';
import { CActivity } from '$Compo/config/CActivity';
import { FileManager } from '$Hook/fileManager/fileManager';
import { NavigationPane } from './components/NavigationPane';
import { Providers } from '$Hook/fileManager/context/Providers';
import { useColumnResize } from '$Hook/fileManager/hook/useColumnResize';
import { useTriggerAction } from '$Hook/fileManager/context/TriggerAction';

export type CFileManagerType = ChocoUi.Ui<
    'main',
    {
        language?: Locales;
        isLoading?: boolean;
        fontFamily?: string;
        maxFileSize?: number;
        initialPath?: string;
        width?: string | number;
        height?: string | number;
        collapsibleNav?: boolean;
        filePreviewPath?: string;
        acceptedFileTypes?: string[];
        enableFilePreview?: boolean;
        defaultNavExpanded?: boolean;
        files?: FileManager.FileData[];
        layout?: FileManager.LayoutType;
        color?: ChocoUi.Color.ColorsType;
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
        ref,
        Element,
        restProps: {
            maxFileSize,
            initialPath,
            language = 'en-US',
            color = 'secondary',
            collapsibleNav,
            acceptedFileTypes,
            enableFilePreview = true,
            defaultNavExpanded = true,
            permissions: userPermissions,
            fileUploadConfig,
            className,
            isLoading,
            actions,
            layout = 'grid',
            files,
            icons,
            onCut,
            onCopy,
            onPaste,
            onError,
            onSelect,
            onRename,
            onDelete,
            onRefresh,
            onDownload,
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
            ...restProps
        },
    }) => {
        console.log('render file manager');

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

        const permissions = useMemo(
            () => ({ ...FileManager.defaultPermissions, ...userPermissions }),
            [userPermissions],
        );

        return (
            <Element
                ref={ref}
                className={`file-explorer ${className}`}
                {...restProps}
            >
                <Loader loading={isLoading} />
                <Providers
                    onCut={onCut}
                    layout={layout}
                    onCopy={onCopy}
                    onPaste={onPaste}
                    onError={onError}
                    filesData={files}
                    onSelect={onSelect}
                    language={language}
                    onDownload={onDownload}
                    initialPath={initialPath}
                    onFolderChange={onFolderChange}
                    onSelectionChange={onSelectionChange}
                >
                    <Toolbar
                        onRefresh={onRefresh}
                        permissions={permissions}
                        triggerAction={triggerAction}
                        onLayoutChange={onLayoutChange}
                    />

                    <CBox
                        ref={containerRef}
                        tag="section"
                        dFlex
                        h="calc(100% - 46px)"
                        onMouseUp={handleMouseUp}
                        className="files-container"
                        onMouseMove={handleMouseMove}
                    >
                        <CActivity show={isNavigationPaneOpen}>
                            <CBox
                                posR
                                z={1}
                                pt={2}
                                w={colSizes.col1 + '%'}
                                className="navigation-pane"
                            >
                                <NavigationPane
                                    icons={icons}
                                    onFileOpen={onFileOpen}
                                />
                                <CBox
                                    posA
                                    t={0}
                                    b={0}
                                    r={0}
                                    w={4}
                                    z={10}
                                    cur="cr"
                                    borR={2}
                                    bgClr={isDragging ? 'secondary' : 'primary'}
                                    cs={{ ':hover': { bgClr: 'secondary' } }}
                                    className={`sidebar-resize ${
                                        isDragging ? 'sidebar-dragging' : ''
                                    }`}
                                    onMouseDown={handleMouseDown}
                                />
                            </CBox>
                        </CActivity>

                        <CBox
                            z={2}
                            className="folders-preview"
                            w={
                                (isNavigationPaneOpen ? colSizes.col2 : 100) +
                                '%'
                            }
                        >
                            <CBreadCrumb
                                collapsibleNav={collapsibleNav}
                                isNavigationPaneOpen={isNavigationPaneOpen}
                                setNavigationPaneOpen={setNavigationPaneOpen}
                            />
                            <CFileList
                                icons={icons}
                                actions={actions}
                                onRename={onRename}
                                onRefresh={onRefresh}
                                formatDate={formatDate}
                                onFileOpen={onFileOpen}
                                permissions={permissions}
                                triggerAction={triggerAction}
                                onCreateFolder={onCreateFolder}
                                enableFilePreview={enableFilePreview}
                            />
                        </CBox>
                    </CBox>
                    <Actions
                        onDelete={onDelete}
                        onRefresh={onRefresh}
                        permissions={permissions}
                        maxFileSize={maxFileSize}
                        triggerAction={triggerAction}
                        onFileUploaded={onFileUploaded}
                        onFileUploading={onFileUploading}
                        filePreviewPath={filePreviewPath}
                        fileUploadConfig={fileUploadConfig}
                        acceptedFileTypes={acceptedFileTypes}
                        filePreviewComponent={filePreviewComponent}
                    />
                </Providers>
            </Element>
        );
    },
)(
    (
        {
            width = '100%',
            height = '100%',
            fontFamily = 'Nunito Sans, sans-serif',
        },
        {},
    ) => ({
        us: 'n',
        pos: 'r',
        cur: 'd',
        w: width,
        h: height,
        full: true,
        fontF: fontFamily,
    }),
);
