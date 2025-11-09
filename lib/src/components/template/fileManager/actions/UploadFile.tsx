//-Path: "react-choco-ui/lib/src/components/template/fileManager/actions/UploadFile.tsx"
import './UploadFile.scss';
import UploadItem from './UploadItem';
import { Loader } from '../components/Loader';
import { CIcon } from '$Compo/template/CIcon';
import { Button } from '../components/Button';
import { useFiles } from '$Hook/fileManager/context/Files';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';
import { useRef, useState, ChangeEvent, DragEvent, KeyboardEvent } from 'react';

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
        <div
            className={`fm-upload-file ${
                files.length > 0 ? 'file-selcted' : ''
            }`}
        >
            <div className="select-files">
                <div
                    className={`draggable-file-input ${
                        isDragging ? 'dragging' : ''
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={() => setIsDragging(true)}
                    onDragLeave={() => setIsDragging(false)}
                >
                    <div className="input-text">
                        <CIcon icon="AiOutlineCloudUpload" size={30} />
                        <span>{t('dragFileToUpload')}</span>
                    </div>
                </div>
                <div className="btn-choose-file">
                    <Button p={0} onKeyDown={handleChooseFileKeyDown}>
                        <label htmlFor="chooseFile">{t('chooseFile')}</label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            id="chooseFile"
                            className="choose-file-input"
                            onChange={handleChooseFile}
                            multiple
                            accept={acceptedFileTypes?.join(',')}
                        />
                    </Button>
                </div>
            </div>
            {files.length > 0 && (
                <div className="files-progress">
                    <div className="heading">
                        {Object.values(isUploading).some(
                            (fileUploading) => fileUploading,
                        ) ? (
                            <>
                                <h2>{t('uploading')}</h2>
                                <Loader
                                    loading={true}
                                    className="upload-loading"
                                />
                            </>
                        ) : (
                            <h2>{t('completed')}</h2>
                        )}
                    </div>
                    <ul>
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
                    </ul>
                </div>
            )}
        </div>
    );
};
