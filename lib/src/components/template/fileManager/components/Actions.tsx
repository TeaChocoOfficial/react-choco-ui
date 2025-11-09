//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Actions.tsx"
import { useEffect, useState } from 'react';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';
import { Modal } from './Modal';
import { useShortcutHandler } from '$Hook/fileManager/hook/useShortcutHandler';
import { UploadFileAction } from '../actions/UploadFile';
import { PreviewFileAction } from '../actions/PreviewFile';
import { DeleteAction } from '../actions/Delete';

interface FileUploadConfig {
    url: string;
    method: string;
    headers: { Authorization: string };
}

interface ActionsProps {
    fileUploadConfig?: FileUploadConfig;
    onFileUploading?: (file: File) => void;
    onFileUploaded?: (file: File, response: any) => void;
    maxFileSize?: number;
    filePreviewPath?: string;
    acceptedFileTypes?: string[];
    permissions?: FileManager.Permissions;
    onRefresh?: FileManager.Callback;
    triggerAction: FileManager.TriggerAction;
    onDelete?: (files: FileManager.FileData[]) => void;
    filePreviewComponent?: (file: FileManager.FileData) => React.ReactElement;
}

interface ActionType {
    title: string;
    component: React.ReactNode;
    width: string;
}

export const Actions: React.FC<ActionsProps> = ({
    fileUploadConfig,
    onFileUploading,
    onFileUploaded,
    onDelete,
    onRefresh,
    maxFileSize,
    filePreviewPath,
    filePreviewComponent,
    acceptedFileTypes,
    triggerAction,
    permissions,
}) => {
    const t = useTranslation();
    const { selectedFiles } = useSelection();
    const [activeAction, setActiveAction] = useState<ActionType | null>(null);

    // Triggers all the keyboard shortcuts based actions
    useShortcutHandler(triggerAction, permissions, onRefresh);

    const actionTypes: Record<string, ActionType> = {
        uploadFile: {
            title: t('upload'),
            component: (
                <UploadFileAction
                    fileUploadConfig={fileUploadConfig}
                    maxFileSize={maxFileSize}
                    acceptedFileTypes={acceptedFileTypes}
                    onFileUploading={onFileUploading}
                    onFileUploaded={onFileUploaded}
                />
            ),
            width: '35%',
        },
        delete: {
            title: t('delete'),
            component: (
                <DeleteAction
                    triggerAction={triggerAction}
                    onDelete={onDelete}
                />
            ),
            width: '25%',
        },
        previewFile: {
            title: t('preview'),
            component: (
                <PreviewFileAction
                    filePreviewPath={filePreviewPath}
                    filePreviewComponent={filePreviewComponent}
                />
            ),
            width: '50%',
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
