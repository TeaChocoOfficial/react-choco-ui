//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/components/Actions.tsx"
import { Modal } from './Modal';
import { useEffect, useState } from 'react';
import { DeleteAction } from '../actions/Delete';
import { UploadFileAction } from '../actions/UploadFile';
import { PreviewFileAction } from '../actions/PreviewFile';
import { FileManager } from '../../../../hooks/fileManager/fileManager';
import { useSelection } from '../../../../hooks/fileManager/context/Selection';
import { useTranslation } from '../../../../hooks/fileManager/context/TranslationProvider';
import { useShortcutHandler } from '../../../../hooks/fileManager/hook/useShortcutHandler';
import { useTriggerActionContext } from '../../../../hooks/fileManager/context/TriggerAction';

interface ActionsProps {
    permissions?: FileManager.Permissions;
    maxFileSize?: number;
    filePreviewPath?: string;
    acceptedFileTypes?: string[];
    fileUploadConfig?: FileManager.UploadConfig;
    // triggerAction: FileManager.TriggerAction;
    onFileUploading?: (file: File) => void;
    onRefresh?: FileManager.Callback;
    onDelete?: (files: FileManager.FileData[]) => void;
    onFileUploaded?: (file: File, response: any) => void;
    filePreviewComponent?: (file: FileManager.FileData) => React.ReactElement;
}

interface ActionType {
    title: string;
    width: string;
    component: React.ReactNode;
}

export const Actions: React.FC<ActionsProps> = ({
    onDelete,
    onRefresh,
    permissions,
    maxFileSize,
    // triggerAction,
    onFileUploaded,
    onFileUploading,
    filePreviewPath,
    fileUploadConfig,
    acceptedFileTypes,
    filePreviewComponent,
}) => {
    const t = useTranslation();
    const { selectedFiles } = useSelection();
    const triggerAction = useTriggerActionContext();
    const [activeAction, setActiveAction] = useState<ActionType | null>(null);

    // Triggers all the keyboard shortcuts based actions
    useShortcutHandler(triggerAction, permissions, onRefresh);

    const actionTypes: Record<string, ActionType> = {
        uploadFile: {
            width: '35%',
            title: t('upload'),
            component: (
                <UploadFileAction
                    maxFileSize={maxFileSize}
                    onFileUploaded={onFileUploaded}
                    onFileUploading={onFileUploading}
                    fileUploadConfig={fileUploadConfig}
                    acceptedFileTypes={acceptedFileTypes}
                />
            ),
        },
        delete: {
            width: '25%',
            title: t('delete'),
            component: (
                <DeleteAction
                    onDelete={onDelete}
                    triggerAction={triggerAction}
                />
            ),
        },
        previewFile: {
            width: '50%',
            title: t('preview'),
            component: (
                <PreviewFileAction
                    filePreviewPath={filePreviewPath}
                    filePreviewComponent={filePreviewComponent}
                />
            ),
        },
    };

    useEffect(() => {
        if (triggerAction.isActive) {
            const actionType = triggerAction.actionType;
            if (actionType === 'previewFile') {
                // Create a new object to avoid mutation
                const previewAction = {
                    ...actionTypes[actionType],
                    title: selectedFiles?.[0]?.name ?? t('preview'),
                };
                setActiveAction(previewAction);
            } else if (actionType !== null) {
                setActiveAction(actionTypes[actionType]);
            }
        } else {
            setActiveAction(null);
        }
    }, [triggerAction.isActive, triggerAction.actionType, selectedFiles, t]);

    if (activeAction) {
        return (
            <Modal
                heading={activeAction.title}
                show={triggerAction.isActive}
                setShow={triggerAction.close}
                dialogWidth={activeAction.width}
            >
                {activeAction.component}
            </Modal>
        );
    }

    return null;
};
