//-Path: "react-choco-ui/lib/src/hooks/fileManager/useColumnResize.ts"
import { SetState } from '$Type/Type';
import { useRef, useState } from 'react';

export type ColumnResize = {
    isDragging: boolean;
    colSizes: { col1: number; col2: number };
    handleMouseUp: React.MouseEventHandler;
    handleMouseDown: React.MouseEventHandler;
    handleMouseMove: React.MouseEventHandler;
    containerRef: React.RefObject<HTMLElement | null>;
    setColSizes: SetState<{ col1: number; col2: number }>;
};

export const useColumnResize = (
    col1Size: number,
    col2Size: number,
): ColumnResize => {
    const containerRef = useRef<HTMLElement>(null);
    const [colSizes, setColSizes] = useState({
        col1: col1Size,
        col2: col2Size,
    });
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove: React.MouseEventHandler = (event) => {
        if (!isDragging) return;
        // Prevent text selection during drag
        event.preventDefault();

        // Calculate new sizes based on mouse movement
        const container = containerRef.current;
        const containerRect = container?.getBoundingClientRect();
        const newCol1Size =
            ((event.clientX - (containerRect?.left ?? 0)) /
                (containerRect?.width ?? 0)) *
            100;

        // Limiting the resizing to 15% to 60% for better UX
        if (newCol1Size >= 15 && newCol1Size <= 60) {
            setColSizes({ col1: newCol1Size, col2: 100 - newCol1Size });
        }
    };

    return {
        containerRef,
        colSizes,
        setColSizes,
        isDragging,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
    };
};
