//-Path: "react-choco-ui/lib/dev/src/hooks/fileManager/context/Layout.tsx"
import { FileManager } from '../fileManager';
import { ChocoUi } from '@teachoco-official/react-choco-base';
import { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
    color?: ChocoUi.Color.ColorsType;
    activeLayout: FileManager.LayoutType;
    setActiveLayout: (layout: FileManager.LayoutType) => void;
}

interface LayoutProviderProps {
    color?: ChocoUi.Color.ColorsType;
    layout?: FileManager.LayoutType;
    children: ReactNode;
}

const LayoutContext = createContext<LayoutContextType>({
    color: 'secondary',
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
    color,
}) => {
    const [activeLayout, setActiveLayout] = useState<FileManager.LayoutType>(
        () => validateLayout(layout),
    );

    return (
        <LayoutContext.Provider
            value={{ color, activeLayout, setActiveLayout }}
        >
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
