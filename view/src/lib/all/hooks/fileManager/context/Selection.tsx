//-Path: "react-choco-ui/lib/src/hooks/fileManager/context/Selection.tsx"
import {
    useState,
    ReactNode,
    useEffect,
    useContext,
    createContext,
} from 'react';
import { SetState } from '$Type/Type';
import { FileManager } from '$Hook/fileManager/fileManager';

interface SelectionContextType {
    handleDownload: () => void;
    selectedFiles: FileManager.FileData[];
    setSelectedFiles: SetState<FileManager.FileData[]>;
}

interface SelectionProviderProps {
    children: ReactNode;
    onDownload?: (files: FileManager.FileData[]) => void;
    onSelect?: (files: FileManager.FileData[]) => void;
    onSelectionChange?: (files: FileManager.FileData[]) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(
    undefined,
);

export const SelectionProvider: React.FC<SelectionProviderProps> = ({
    children,
    onSelect,
    onDownload,
    onSelectionChange,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<FileManager.FileData[]>(
        [],
    );

    useEffect(() => {
        onSelect?.(selectedFiles);
        onSelectionChange?.(selectedFiles);
    }, [selectedFiles]);

    const handleDownload = () => {
        FileManager.validateApiCallback(
            onDownload,
            'onDownload',
            selectedFiles,
        );
    };

    return (
        <SelectionContext.Provider
            value={{ selectedFiles, setSelectedFiles, handleDownload }}
        >
            {children}
        </SelectionContext.Provider>
    );
};

export const useSelection = (): SelectionContextType => {
    const context = useContext(SelectionContext);
    if (context === undefined)
        throw new Error('useSelection must be used within a SelectionProvider');
    return context;
};
