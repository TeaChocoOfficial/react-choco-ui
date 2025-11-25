//-Path: "react-choco-ui/lib/src/hooks/fileManager/context/FileNavigation.tsx"
import { useFiles } from './Files';
import { SetState } from '$Type/Type';
import { FileManager } from '$Hook/fileManager/fileManager';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

export interface FileNavigationContextType {
    currentPath: string;
    sortConfig: FileManager.SortConfig;
    currentFolder: FileManager.FileData | null;
    currentPathFiles: FileManager.FileData[];
    setSortConfig: SetState<FileManager.SortConfig>;
    setCurrentPath: SetState<string>;
    onFolderChange?: (path: string) => void;
    setCurrentFolder: SetState<FileManager.FileData | null>;
    setCurrentPathFiles: SetState<FileManager.FileData[]>;
}

export interface FileNavigationProviderProps {
    children: React.ReactNode;
    initialPath?: string;
    onFolderChange?: (path: string) => void;
}

const defSortConfig: FileManager.SortConfig = {
    key: 'name',
    direction: 'asc',
};

const FileNavigationContext = createContext<FileNavigationContextType>({
    currentPath: '',
    sortConfig: defSortConfig,
    currentFolder: null,
    currentPathFiles: [],
    setSortConfig: () => {},
    setCurrentPath: () => {},
    setCurrentFolder: () => {},
    setCurrentPathFiles: () => {},
});

export const FileNavigationProvider: React.FC<FileNavigationProviderProps> = ({
    children,
    initialPath = '',
    onFolderChange,
}) => {
    const { files } = useFiles();
    const isMountRef = useRef(false);
    const [currentPath, setCurrentPath] = useState('');
    const [currentFolder, setCurrentFolder] =
        useState<FileManager.FileData | null>(null);
    const [currentPathFiles, setCurrentPathFiles] = useState<
        FileManager.FileData[]
    >([]);
    const [sortConfig, setSortConfig] =
        useState<FileManager.SortConfig>(defSortConfig);

    useEffect(() => {
        if (Array.isArray(files) && files.length > 0) {
            setCurrentPathFiles(() => {
                const currPathFiles = files.filter(
                    (file) => file.path === `${currentPath}/${file.name}`,
                );
                return FileManager.sortFiles(
                    currPathFiles,
                    sortConfig.key,
                    sortConfig.direction,
                );
            });

            setCurrentFolder(() => {
                return files.find((file) => file.path === currentPath) ?? null;
            });
        } else {
            setCurrentPathFiles([]);
            setCurrentFolder(null);
        }
    }, [files, currentPath, sortConfig]);

    useEffect(() => {
        if (!isMountRef.current && Array.isArray(files) && files.length > 0) {
            const activePath = files.some(
                (file) => file.isDirectory && file.path === initialPath,
            )
                ? initialPath
                : '';
            setCurrentPath(activePath);
            isMountRef.current = true;
        }
    }, [files]);

    return (
        <FileNavigationContext.Provider
            value={{
                sortConfig,
                currentPath,
                currentFolder,
                currentPathFiles,
                setSortConfig,
                setCurrentPath,
                onFolderChange,
                setCurrentFolder,
                setCurrentPathFiles,
            }}
        >
            {children}
        </FileNavigationContext.Provider>
    );
};

export const useFileNavigation = () => useContext(FileNavigationContext);
