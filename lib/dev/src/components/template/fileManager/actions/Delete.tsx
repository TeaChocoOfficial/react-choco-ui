//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/actions/Delete.tsx"
import { useEffect, useState } from 'react';
import { FileManager } from '../../../../hooks/fileManager/fileManager';
import { CBox, CText, CButton } from '@teachoco-official/react-choco-custom';
import { useSelection } from '../../../../hooks/fileManager/context/Selection';
import { useTranslation } from '../../../../hooks/fileManager/context/TranslationProvider';

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
