//-Path: "react-choco-ui/lib/src/components/template/fileManager/actions/Delete.tsx"
// import './Delete.scss';
import { CBox } from '$Compo/ui/CBox';
import { CText } from '$Compo/ui/CText';
import { CButton } from '$Compo/ui/CButton';
import React, { useEffect, useState } from 'react';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

interface DeleteActionProps {
    triggerAction: FileManager.TriggerAction;
    onDelete?: (files: FileManager.FileData[]) => void;
}

export const DeleteAction: React.FC<DeleteActionProps> = ({
    onDelete,
    triggerAction,
}) => {
    const t = useTranslation();
    const [deleteMsg, setDeleteMsg] = useState('');
    const { selectedFiles, setSelectedFiles } = useSelection();

    useEffect(() => {
        setDeleteMsg(() =>
            selectedFiles.length === 1
                ? t('deleteItemConfirm', { fileName: selectedFiles[0].name })
                : selectedFiles.length > 1
                ? t('deleteItemsConfirm', { count: selectedFiles.length })
                : '',
        );
    }, [selectedFiles, t]);

    const handleDeleting = () => {
        onDelete?.(selectedFiles);
        setSelectedFiles([]);
        triggerAction.close();
    };

    return (
        <CBox className="file-delete-confirm">
            <CText p={4} fontW="medium" className="file-delete-confirm-text">
                {deleteMsg}
            </CText>
            <CBox
                dFlex
                jcEnd
                g={2}
                mr={1}
                className="file-delete-confirm-actions"
            >
                <CButton color="inverse" onClick={() => triggerAction.close()}>
                    {t('cancel')}
                </CButton>
                <CButton color="error" onClick={handleDeleting}>
                    {t('delete')}
                </CButton>
            </CBox>
        </CBox>
    );
};
