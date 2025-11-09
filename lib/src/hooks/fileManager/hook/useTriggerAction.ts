//-Path: "react-choco-ui/lib/src/hooks/fileManager/hook/useTriggerAction.ts"
import { useState } from 'react';
import { FileManager } from '$Hook/fileManager/fileManager';

export const useTriggerAction = (): FileManager.TriggerAction => {
    const [isActive, setIsActive] = useState(false);
    const [actionType, setActionType] = useState<string | null>(null);

    const show = (type: string) => {
        setIsActive(true);
        setActionType(type);
    };

    const close = () => {
        setIsActive(false);
        setActionType(null);
    };

    return { show, close, isActive, actionType };
};
