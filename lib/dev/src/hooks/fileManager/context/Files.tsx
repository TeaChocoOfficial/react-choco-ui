//-Path: "react-choco-ui/lib/dev/src/hooks/fileManager/context/Files.tsx"
import { FileManager } from '../fileManager';
import { SetState } from '../../../types/Type';
import { createContext, useContext, useEffect, useState } from 'react';

type FilesManagerContext = {
    files: FileManager.FileData[];
    setFiles: SetState<FileManager.FileData[]>;
    getChildren: (file: FileManager.FileData) => FileManager.FileData[];
    onError: (error: FileManager.Error, file?: File) => void;
};

const FilesContext = createContext<FilesManagerContext>({
    files: [],
    setFiles() {},
    getChildren: () => [],
    onError() {},
});

export const FilesProvider = ({
    onError = () => {},
    children,
    filesData = [],
}: {
    onError?: (error: FileManager.Error, file?: File) => void;
    children: React.ReactNode;
    filesData?: FileManager.FileData[];
}) => {
    const [files, setFiles] = useState<FileManager.FileData[]>([]);

    useEffect(() => {
        setFiles(filesData);
    }, [filesData]);

    const getChildren = (file: FileManager.FileData) => {
        if (!file.isDirectory) return [];

        return files.filter(
            (child) => child.path === `${file.path}/${child.name}`,
        );
    };

    return (
        <FilesContext.Provider
            value={{ files, setFiles, getChildren, onError }}
        >
            {children}
        </FilesContext.Provider>
    );
};

export const useFiles = () => useContext(FilesContext);
