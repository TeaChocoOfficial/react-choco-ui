//-Path: "react-choco-ui/lib/dev/src/hooks/fileManager/fileManager.ts"

export namespace FileManager {
    export const duplicateNameHandler = (
        originalFileName: string,
        isDirectory: boolean,
        files: FileData[],
    ) => {
        if (files.find((f) => f.name === originalFileName)) {
            const fileExtension = isDirectory
                ? ''
                : '.' + originalFileName.split('.').pop();
            const fileName = isDirectory
                ? originalFileName
                : originalFileName.split('.').slice(0, -1).join('.');

            // Generating new file name for duplicate file
            let maxFileNum = 0;
            // If there exists a file with name fileName (1), fileName (2), etc.
            // Check if the number is greater than the maxFileNum, then set it to that greater number
            const fileNameRegex = new RegExp(`${fileName} \\(\\d+\\)`);
            files.forEach((f) => {
                const fName =
                    (f.isDirectory
                        ? f.name
                        : f.name?.split('.').slice(0, -1).join('.')) ?? '';
                if (fileNameRegex.test(fName)) {
                    const fileNumStr = fName
                        .split(`${fileName} (`)
                        .pop()
                        ?.slice(0, -1);
                    if (fileNumStr !== undefined) {
                        const fileNum = parseInt(fileNumStr);
                        if (!isNaN(fileNum) && fileNum > maxFileNum) {
                            maxFileNum = fileNum;
                        }
                    }
                }
            });
            const appendNum = ` (${++maxFileNum})`;
            const newFileName = fileName + appendNum + fileExtension;
            //

            return newFileName;
        } else {
            return originalFileName;
        }
    };

    export type FormatDate = (date?: string | number | Date) => string;

    export const formatDate: FormatDate = (date) => {
        if (!date) return '';

        const newDate = new Date(date);
        let hours = newDate.getHours();
        const minutes = newDate.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const year = newDate.getFullYear();

        return `${month}/${day}/${year} ${hours}:${
            minutes < 10 ? '0' + minutes : minutes
        } ${ampm}`;
    };

    export const getDataSize = (size?: number, decimalPlaces: number = 2) => {
        if (!size || isNaN(size)) return '';

        const KiloBytes = size / 1024;
        const MegaBytes = KiloBytes / 1024;
        const GigaBytes = MegaBytes / 1024;

        if (KiloBytes < 1024) {
            return `${KiloBytes.toFixed(decimalPlaces)} KB`;
        } else if (MegaBytes < 1024) {
            return `${MegaBytes.toFixed(decimalPlaces)} MB`;
        } else if (MegaBytes >= 1024) {
            return `${GigaBytes.toFixed(decimalPlaces)} GB`;
        }
    };

    export const getFileExtension = (fileName?: string): string | undefined =>
        fileName?.split('.').pop();

    export const getParentPath = (path?: string): string | undefined =>
        path?.split('/').slice(0, -1).join('/');

    export const sortFiles = (
        items: FileData[],
        sortKey: string = 'name',
        direction: sortFilesDirection = 'asc',
    ) => {
        // Separate folders and files
        const folders = items.filter((file) => file.isDirectory);
        const files = items.filter((file) => !file.isDirectory);

        // Sort function based on key and direction
        const sortFunction = (a: FileData, b: FileData) => {
            let comparison = 0;

            switch (sortKey) {
                case 'name':
                    // Use localeCompare for proper string sorting
                    comparison = a.name?.localeCompare(b.name ?? '') ?? 0;
                    break;

                case 'size':
                    // Handle missing size values
                    const sizeA = a.size || 0;
                    const sizeB = b.size || 0;
                    comparison = sizeA - sizeB;
                    break;

                case 'modified':
                    // Handle date sorting
                    const dateA = a.updatedAt
                        ? new Date(a.updatedAt).getTime()
                        : 0;
                    const dateB = b.updatedAt
                        ? new Date(b.updatedAt).getTime()
                        : 0;
                    comparison = dateA - dateB;
                    break;

                default:
                    // Fallback to name sorting
                    comparison = a.name?.localeCompare(b.name ?? '') ?? 0;
            }

            // Apply sort direction
            return direction === 'asc' ? comparison : -comparison;
        };

        // Sort folders and files separately
        const sortedFolders = [...folders].sort(sortFunction);
        const sortedFiles = [...files].sort(sortFunction);

        // Always return folders first, then files
        return [...sortedFolders, ...sortedFiles];
    };

    export const validateApiCallback = (
        callback?: (...args: any[]) => void,
        callbackName?: string,
        ...args: unknown[]
    ) => {
        try {
            if (typeof callback === 'function') {
                callback(...args);
            } else {
                throw new Error(
                    `<FileManager /> Missing prop: Callback function "${callbackName}" is required.`,
                );
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    export const defaultPermissions: Permissions = {
        create: true,
        upload: true,
        move: true,
        copy: true,
        rename: true,
        download: true,
        delete: true,
    };

    export const shortcuts = {
        createFolder: ['Alt', 'Shift', 'N'],
        uploadFiles: ['Control', 'U'],
        cut: ['Control', 'X'],
        copy: ['Control', 'C'],
        paste: ['Control', 'V'],
        rename: ['F2'],
        download: ['Control', 'D'],
        delete: ['Delete'],
        selectAll: ['Control', 'A'],
        selectArrows: ['Shift', 'Arrows'], // (pending)
        navigation: ['Arrows'], // (pending)
        jumpToFirst: ['Home'],
        jumpToLast: ['End'],
        listLayout: ['Control', 'Shift', '!'], // Act as Ctrl + Shift + 1 but could cause problems for QWERTZ or DVORAK etc. keyborad layouts.
        gridLayout: ['Control', 'Shift', '@'], // Act as Ctrl + Shift + 2 but could cause problems for QWERTZ or DVORAK etc. keyborad layouts.
        refresh: ['F5'],
        clearSelection: ['Escape'],
    };

    export interface Permissions {
        copy?: boolean;
        move?: boolean;
        rename?: boolean;
        upload?: boolean;
        create?: boolean; // Disable "Create Folder"
        delete?: boolean; // Disable "Delete"
        download?: boolean; // Enable "Download"
    }

    export interface FileData {
        file?: File;
        key?: number;
        name?: string;
        path?: string;
        size?: number;
        class?: string;
        removed?: boolean;
        updatedAt?: string;
        isEditing?: boolean;
        isDirectory?: boolean;
        error?: boolean | string;
        subDirectories?: FileData[];
        appendData?: Record<string, any>;
    }

    export interface Error {
        type: string;
        message: string;
        response?: {
            status: number;
            statusText: string;
            data: any;
        };
    }

    export interface UploadConfig {
        url: string;
        method: string;
        headers: { Authorization: string };
    }

    export interface Locale {
        newFolder: string;
        upload: string;
        paste: string;
        changeView: string;
        refresh: string;
        cut: string;
        copy: string;
        rename: string;
        download: string;
        delete: string;
        itemSelected: string;
        itemsSelected: string;
        cancel: string;
        clearSelection: string;
        completed: string;
        fileNameChangeWarning: string;
        no: string;
        yes: string;
        close: string;
        fileTypeNotAllowed: string;
        fileAlreadyExist: string;
        maxUploadSize: string;
        dragFileToUpload: string;
        chooseFile: string;
        uploadFail: string;
        uploading: string;
        uploaded: string;
        remove: string;
        abortUpload: string;
        preview: string;
        previewUnavailable: string;
        home: string;
        showMoreFolder: string;
        moveTo: string;
        folderEmpty: string;
        selectAll: string;
        view: string;
        grid: string;
        list: string;
        open: string;
        nothingHereYet: string;
        name: string;
        modified: string;
        size: string;
        deleteItemConfirm: string;
        deleteItemsConfirm: string;
        percentDone: string;
        canceled: string;
        invalidFileName: string;
        folderExists: string;
        collapseNavigationPane: string;
        expandNavigationPane: string;
    }

    export type sortFilesDirection = 'asc' | 'desc';
    export type SubMenuPosition = 'left' | 'right';
    export type ErrorPlacement = 'left' | 'right' | 'top' | 'bottom';

    export type Callback = (...args: unknown[]) => void;

    export interface Position {
        x: number;
        y: number;
    }

    export type SortConfig = {
        key: string;
        direction: sortFilesDirection;
    };

    export interface Action {
        title: string;
        divider: boolean;
        icon: React.ReactNode;
        onClick: (selectedFiles: FileData[]) => void;
    }

    export interface IconData {
        list: React.JSX.Element;
        grid: React.JSX.Element;
        open: React.JSX.Element;
        closed: React.JSX.Element;
        default: React.JSX.Element;
    }

    export type ActionType =
        | 'rename'
        | 'delete'
        | 'uploadFile'
        | 'previewFile'
        | 'createFolder';

    export interface TriggerAction {
        show: (type: ActionType) => void;
        close: () => void;
        isActive: boolean;
        actionType: string | null;
    }

    export interface MenuItem {
        title: string;
        hidden?: boolean;
        divider?: boolean;
        selected?: boolean;
        children?: MenuItem[];
        icon: React.ReactNode;
        disablePaste?: boolean;
        onClick?: React.MouseEventHandler<HTMLElement>;
    }
    /*
     * grid is Def
     */
    export type LayoutType = 'list' | 'grid';

    export interface LayoutOption {
        key: LayoutType;
        name: string;
        icon: React.JSX.Element;
    }
}
