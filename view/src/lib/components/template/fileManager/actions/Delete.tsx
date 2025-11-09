//-Path: "react-choco-ui/lib/src/components/template/fileManager/actions/Delete.tsx"
import './Delete.scss';
import { Button } from '../components/Button';
import React, { useEffect, useState } from 'react';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

interface DeleteActionProps {
    triggerAction: FileManager.TriggerAction;
    onDelete?: (files: FileManager.FileData[]) => void;
}

export const DeleteAction: React.FC<DeleteActionProps> = ({
    triggerAction,
    onDelete,
}) => {
    const [deleteMsg, setDeleteMsg] = useState<string>('');
    const { selectedFiles, setSelectedFiles } = useSelection();
    const t = useTranslation();

    useEffect(() => {
        setDeleteMsg(() => {
            if (selectedFiles.length === 1) {
                return t('deleteItemConfirm', {
                    fileName: selectedFiles[0].name,
                });
            } else if (selectedFiles.length > 1) {
                return t('deleteItemsConfirm', { count: selectedFiles.length });
            }
            return '';
        });
    }, [selectedFiles, t]);

    const handleDeleting = () => {
        onDelete?.(selectedFiles);
        setSelectedFiles([]);
        triggerAction.close();
    };

    return (
        <div className="file-delete-confirm">
            <p className="file-delete-confirm-text">{deleteMsg}</p>
            <div className="file-delete-confirm-actions">
                <Button color="secondary" onClick={() => triggerAction.close()}>
                    {t('cancel')}
                </Button>
                <Button color="danger" onClick={handleDeleting}>
                    {t('delete')}
                </Button>
            </div>
        </div>
    );
};