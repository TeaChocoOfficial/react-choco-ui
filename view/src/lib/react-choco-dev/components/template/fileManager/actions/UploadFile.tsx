//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/actions/UploadFile.tsx"
import UploadItem from './UploadItem';
import { Loader } from '../components/Loader';
import {
    CBox,
    CIcon,
    CText,
    CList,
    CUploadFile,
} from '@teachoco-official/react-choco-custom';
import { useFiles } from '../../../../hooks/fileManager/context/Files';
import { FileManager } from '../../../../hooks/fileManager/fileManager';
import { useRef, useState, ChangeEvent, DragEvent, KeyboardEvent } from 'react';
import { useFileNavigation } from '../../../../hooks/fileManager/context/FileNavigation';
import { useTranslation } from '../../../../hooks/fileManager/context/TranslationProvider';

interface UploadFileActionProps {
    fileUploadConfig?: FileManager.UploadConfig;
    maxFileSize?: number;
    acceptedFileTypes?: string[];
    onFileUploading?: (file: File, currentFolder: any) => any;
    onFileUploaded?: (file: File, response?: any) => void;
}

export const UploadFileAction: React.FC<UploadFileActionProps> = ({
    fileUploadConfig,
    maxFileSize,
    acceptedFileTypes,
    onFileUploading,
    onFileUploaded,
}) => {
    const [files, setFiles] = useState<FileManager.FileData[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState<Record<number, boolean>>({});
    const { currentFolder, currentPathFiles } = useFileNavigation();
    const { onError } = useFiles();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const t = useTranslation();

    // To open choose file if the "Choose File" button is focused and Enter key is pressed
    const handleChooseFileKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter') {
            fileInputRef.current?.click();
        }
    };

    const checkFileError = (file: File): string | undefined => {
        if (acceptedFileTypes) {
            const extError = !acceptedFileTypes.includes(
                `${FileManager.getFileExtension(file.name)}`,
            );
            if (extError) return t('fileTypeNotAllowed');
        }

        const fileExists = currentPathFiles.some(
            (item) =>
                item.name?.toLowerCase() === file.name.toLowerCase() &&
                !item.isDirectory,
        );
        if (fileExists) return t('fileAlreadyExist');

        const sizeError = maxFileSize && file.size > maxFileSize;
        if (sizeError)
            return `${t('maxUploadSize')} ${FileManager.getDataSize(
                maxFileSize,
                0,
            )}.`;

        return undefined;
    };

    const setSelectedFiles = (selectedFiles: File[]) => {
        selectedFiles = selectedFiles.filter(
            (item) =>
                !files.some(
                    (fileData) =>
                        fileData.file?.name.toLowerCase() ===
                        item.name.toLowerCase(),
                ),
        );

        if (selectedFiles.length > 0) {
            const newFiles = selectedFiles.map((file) => {
                const appendData = onFileUploading?.(file, currentFolder);
                const error = checkFileError(file);
                error && onError?.({ type: 'upload', message: error }, file);
                return {
                    file: file,
                    appendData: appendData,
                    ...(error && { error: error }),
                };
            });
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    // Todo: Also validate allowed file extensions on drop
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setSelectedFiles(droppedFiles);
    };

    const handleChooseFile = (e: ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.from(e.target.files || []);
        setSelectedFiles(chosenFiles);
    };

    const handleFileRemove = (index: number) => {
        setFiles((prev) => {
            const newFiles = prev.map((file, i) => {
                if (index === i) {
                    return {
                        ...file,
                        removed: true,
                    };
                }
                return file;
            });

            // If every file is removed, empty files array
            if (newFiles.every((file) => !!file.removed)) return [];

            return newFiles;
        });
    };

    return (
        <CBox
            dFlex
            g={5}
            px={4}
            py={5}
            className={`fm-upload-file ${
                files.length > 0 ? 'file-selcted' : ''
            }`}
        >
            <CBox dFlex g={2} column fullW className="select-files">
                <CBox
                    dFlex
                    mt={5}
                    h={220}
                    borR={2}
                    aiCenter
                    jcCenter
                    bgClr="primary-9"
                    br={{ width: 0.5, style: 'dashed', color: 'primary' }}
                    cs={{
                        ':hover': {
                            borClr: 'info',
                            bgClr: 'info-9',
                        },
                    }}
                    className={`draggable-file-input ${
                        isDragging ? 'dragging' : ''
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={() => setIsDragging(true)}
                    onDragLeave={() => setIsDragging(false)}
                >
                    <CBox dFlex column eventN aiCenter className="input-text">
                        <CIcon icon="AiOutlineCloudUpload" fontS={64} />
                        <CText tag="span">{t('dragFileToUpload')}</CText>
                    </CBox>
                </CBox>
                <CBox dFlex jcCenter className="btn-choose-file">
                    <CUploadFile
                        ref={fileInputRef}
                        fullW
                        id="chooseFile"
                        onChange={handleChooseFile}
                        className="choose-file-input"
                        accept={acceptedFileTypes?.join(',')}
                        buttonProps={{ onKeyDown: handleChooseFileKeyDown }}
                    >
                        {t('chooseFile')}
                    </CUploadFile>
                </CBox>
            </CBox>
            {files.length > 0 && (
                <CBox w="calc(60% - 18px)" className="files-progress">
                    <CBox dFlex g={1} className="heading">
                        {Object.values(isUploading).some(
                            (fileUploading) => fileUploading,
                        ) ? (
                            <>
                                <CText tag="h2" fontS={14} m={0}>
                                    {t('uploading')}
                                </CText>
                                <Loader
                                    upload
                                    loading
                                    className="upload-loading"
                                />
                            </>
                        ) : (
                            <CText tag="h2" fontS={14} m={0}>
                                {t('completed')}
                            </CText>
                        )}
                    </CBox>
                    <CList pr={1} pb={2} mt={0.75} h={220} ofyA fontW={500}>
                        {files.map((fileData, index) => (
                            <UploadItem
                                index={index}
                                key={index}
                                fileData={fileData}
                                setFiles={setFiles}
                                fileUploadConfig={fileUploadConfig}
                                setIsUploading={setIsUploading}
                                onFileUploaded={onFileUploaded}
                                handleFileRemove={handleFileRemove}
                            />
                        ))}
                    </CList>
                </CBox>
            )}
        </CBox>
    );
};
