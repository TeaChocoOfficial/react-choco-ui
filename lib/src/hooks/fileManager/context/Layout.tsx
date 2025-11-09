//-Path: "react-choco-ui/lib/src/hooks/fileManager/context/Layout.tsx"
import { FileManager } from '$Hook/fileManager/fileManager';
import { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
    activeLayout: FileManager.LayoutType;
    setActiveLayout: (layout: FileManager.LayoutType) => void;
}

interface LayoutProviderProps {
    layout?: FileManager.LayoutType;
    children: ReactNode;
}

const LayoutContext = createContext<LayoutContextType>({
    activeLayout: 'grid',
    setActiveLayout: () => {},
});

function validateLayout(
    layout?: FileManager.LayoutType,
): FileManager.LayoutType {
    const acceptedValue: FileManager.LayoutType[] = ['list', 'grid'];
    return layout ? (acceptedValue.includes(layout) ? layout : 'grid') : 'grid';
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
    children,
    layout,
}) => {
    const [activeLayout, setActiveLayout] = useState<FileManager.LayoutType>(
        () => validateLayout(layout),
    );

    return (
        <LayoutContext.Provider value={{ activeLayout, setActiveLayout }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = (): LayoutContextType => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};
