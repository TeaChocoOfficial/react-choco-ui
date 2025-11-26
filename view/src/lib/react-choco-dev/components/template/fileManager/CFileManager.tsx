//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/CFileManager.tsx"
import { Loader } from './components/Loader';
import { FileManagerChilds } from './FileManagerChilds';
import { Locales } from '../../../hooks/fileManager/locales';
import { FileManager } from '../../../hooks/fileManager/fileManager';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';
import { Providers } from '../../../hooks/fileManager/context/Providers';

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
            files,
            icons,
            color = 'secondary',
            layout = 'grid',
            actions,
            language = 'en-US',
            className,
            isLoading,
            permissions,
            initialPath,
            maxFileSize,
            collapsibleNav,
            filePreviewPath,
            fileUploadConfig,
            acceptedFileTypes,
            enableFilePreview = true,
            defaultNavExpanded = true,
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
            onSelectionChange,
            filePreviewComponent,
            formatDate = FileManager.formatDate,
            ...restProps
        },
    }) => {
        console.log('render file manager');

        return (
            <Element
                ref={ref}
                className={`file-explorer ${className}`}
                {...restProps}
            >
                <Loader loading={isLoading} />
                <Providers
                    color={color}
                    layout={layout}
                    filesData={files}
                    language={language}
                    initialPath={initialPath}
                    onCut={onCut}
                    onCopy={onCopy}
                    onError={onError}
                    onPaste={onPaste}
                    onSelect={onSelect}
                    onDownload={onDownload}
                    onFolderChange={onFolderChange}
                    onSelectionChange={onSelectionChange}
                >
                    <FileManagerChilds
                        icons={icons}
                        actions={actions}
                        permissions={permissions}
                        maxFileSize={maxFileSize}
                        collapsibleNav={collapsibleNav}
                        filePreviewPath={filePreviewPath}
                        fileUploadConfig={fileUploadConfig}
                        enableFilePreview={enableFilePreview}
                        acceptedFileTypes={acceptedFileTypes}
                        defaultNavExpanded={defaultNavExpanded}
                        onRename={onRename}
                        onDelete={onDelete}
                        onRefresh={onRefresh}
                        onFileOpen={onFileOpen}
                        formatDate={formatDate}
                        onCreateFolder={onCreateFolder}
                        onLayoutChange={onLayoutChange}
                        onFileUploaded={onFileUploaded}
                        onFileUploading={onFileUploading}
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
