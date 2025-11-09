//-Path: "react-choco-ui/lib/src/hooks/fileManager/context/Clipboard.tsx"
import { useSelection } from './Selection';
import { FileManager } from '$Hook/fileManager/fileManager';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ClipBoardData {
    files: FileManager.FileData[];
    isMoving: boolean;
}

interface ClipBoardContextType {
    clipBoard: ClipBoardData | null;
    setClipBoard: (data: ClipBoardData | null) => void;
    handleCutCopy: (isMoving: boolean) => void;
    handlePasting: (destinationFolder: FileManager.FileData | null) => void;
}

interface ClipBoardProviderProps {
    children: ReactNode;
    onPaste?: (
        files: FileManager.FileData[],
        destinationFolder: FileManager.FileData | null,
        operationType: 'copy' | 'move',
    ) => void;
    onCut?: (files: FileManager.FileData[]) => void;
    onCopy?: (files: FileManager.FileData[]) => void;
}

const ClipBoardContext = createContext<ClipBoardContextType | undefined>(
    undefined,
);

export const ClipBoardProvider: React.FC<ClipBoardProviderProps> = ({
    children,
    onPaste,
    onCut,
    onCopy,
}) => {
    const [clipBoard, setClipBoard] = useState<ClipBoardData | null>(null);
    const { selectedFiles, setSelectedFiles } = useSelection();

    const handleCutCopy = (isMoving: boolean) => {
        setClipBoard({
            files: selectedFiles,
            isMoving: isMoving,
        });

        if (isMoving) {
            onCut && onCut(selectedFiles);
        } else {
            onCopy && onCopy(selectedFiles);
        }
    };

    // Todo: Show error if destination folder already has file(s) with the same name
    const handlePasting = (destinationFolder: FileManager.FileData | null) => {
        if (destinationFolder && !destinationFolder.isDirectory) return;

        if (!clipBoard) return;

        const copiedFiles = clipBoard.files;
        const operationType = clipBoard.isMoving ? 'move' : 'copy';

        FileManager.validateApiCallback(
            onPaste,
            'onPaste',
            copiedFiles,
            destinationFolder,
            operationType,
        );

        clipBoard.isMoving && setClipBoard(null);
        setSelectedFiles([]);
    };

    return (
        <ClipBoardContext.Provider
            value={{ clipBoard, setClipBoard, handleCutCopy, handlePasting }}
        >
            {children}
        </ClipBoardContext.Provider>
    );
};

export const useClipBoard = (): ClipBoardContextType => {
    const context = useContext(ClipBoardContext);
    if (context === undefined) {
        throw new Error('useClipBoard must be used within a ClipBoardProvider');
    }
    return context;
};
