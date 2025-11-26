//-Path: "react-choco-ui/lib/src/hooks/fileManager/context/TriggerAction.tsx"
import { FileManager } from '../fileManager';
import { useState, createContext, useContext } from 'react';

// สร้าง Context สำหรับ TriggerAction
const TriggerActionContext = createContext<FileManager.TriggerAction | null>(
    null,
);

// Provider Component
interface TriggerActionProviderProps {
    children: React.ReactNode;
}

export const TriggerActionProvider: React.FC<TriggerActionProviderProps> = ({
    children,
}) => {
    const [isActive, setIsActive] = useState(false);
    const [actionType, setActionType] = useState<FileManager.ActionType | null>(
        null,
    );

    const show = (type: FileManager.ActionType) => {
        setIsActive(true);
        setActionType(type);
    };

    const close = () => {
        setIsActive(false);
        setActionType(null);
    };

    return (
        <TriggerActionContext.Provider
            value={{
                show,
                close,
                isActive,
                actionType,
            }}
        >
            {children}
        </TriggerActionContext.Provider>
    );
};

// Hook สำหรับใช้ TriggerAction ใน components อื่น
export const useTriggerActionContext = (): FileManager.TriggerAction => {
    const context = useContext(TriggerActionContext);
    if (!context) {
        throw new Error(
            'useTriggerActionContext must be used within a TriggerActionProvider',
        );
    }
    return context;
};
