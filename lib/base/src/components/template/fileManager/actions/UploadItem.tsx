//-Path: "react-choco-ui/lib/src/components/template/fileManager/actions/UploadItem.tsx"
import { SetState } from '$Type/Type';
import { CIcon } from '$Compo/template/CIcon';
import { Progress } from '../components/Progress';
import { useEffect, useRef, useState } from 'react';
import { useFiles } from '$Hook/fileManager/context/Files';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useFileIcons } from '$Hook/fileManager/hook/useFileIcons';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';
import { CText } from '$Compo/ui/CText';
import { FileManagerCs } from '../cs';
import { CList } from '$Compo/template/CList';
import { CBox } from '$Compo/ui/CBox';

interface UploadItemProps {
    index: number;
    fileData: FileManager.FileData;
    setFiles: SetState<FileManager.FileData[]>;
    setIsUploading: SetState<Record<number, boolean>>;
    fileUploadConfig?: FileManager.UploadConfig;
    handleFileRemove: (index: number) => void;
    onFileUploaded?: (file: File, response?: any) => void;
}

const UploadItem: React.FC<UploadItemProps> = ({
    index,
    fileData,
    setFiles,
    setIsUploading,
    fileUploadConfig,
    onFileUploaded,
    handleFileRemove,
}) => {
    const t = useTranslation();
    const { onError } = useFiles();
    const getFileIcons = useFileIcons(33);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [isCanceled, setIsCanceled] = useState<boolean>(false);
    const [uploadFailed, setUploadFailed] = useState<boolean>(false);
    const xhrRef = useRef<XMLHttpRequest | null>(null);

    const handleUploadError = (xhr: XMLHttpRequest): void => {
        setUploadProgress(0);
        setIsUploading((prev) => ({
            ...prev,
            [index]: false,
        }));

        const error = {
            type: 'upload',
            message: t('uploadFail'),
            response: {
                status: xhr.status,
                statusText: xhr.statusText,
                data: xhr.response,
            },
        };

        setFiles((prev) =>
            prev.map((file, i) => {
                if (index === i) {
                    return {
                        ...file,
                        error: error.message,
                    };
                }
                return file;
            }),
        );

        setUploadFailed(true);
        onError(error, fileData.file);
    };

    const fileUpload = (fileData: FileManager.FileData): Promise<any> => {
        if (fileData.error) return Promise.reject('File has error');
        if (!fileUploadConfig)
            return Promise.reject("Don't have file upload config");

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhrRef.current = xhr;

            setIsUploading((prev) => ({
                ...prev,
                [index]: true,
            }));

            xhr.upload.onprogress = (event: ProgressEvent) => {
                if (event.lengthComputable) {
                    const progress = Math.round(
                        (event.loaded / event.total) * 100,
                    );
                    setUploadProgress(progress);
                }
            };

            xhr.onload = () => {
                setIsUploading((prev) => ({
                    ...prev,
                    [index]: false,
                }));

                if (xhr.status === 200 || xhr.status === 201) {
                    setIsUploaded(true);
                    onFileUploaded?.(xhr.response as File);
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                    handleUploadError(xhr);
                }
            };

            xhr.onerror = () => {
                reject(xhr.statusText);
                handleUploadError(xhr);
            };

            const method = fileUploadConfig?.method || 'POST';
            if (fileUploadConfig) xhr.open(method, fileUploadConfig.url, true);

            const headers = fileUploadConfig?.headers;
            if (headers) {
                for (const key in headers) {
                    xhr.setRequestHeader(
                        key,
                        `${headers[key as keyof typeof headers]}`,
                    );
                }
            }

            const formData = new FormData();
            const appendData = fileData.appendData;

            if (appendData) {
                for (const key in appendData) {
                    if (appendData[key]) {
                        formData.append(key, appendData[key]);
                    }
                }
            }

            if (fileData.file) formData.append('file', fileData.file);
            xhr.send(formData);
        });
    };

    useEffect(() => {
        // Prevent double uploads with strict mode
        if (!xhrRef.current) {
            fileUpload(fileData);
        }
    }, []);

    const handleAbortUpload = (): void => {
        if (xhrRef.current) {
            xhrRef.current.abort();
            setIsUploading((prev) => ({
                ...prev,
                [index]: false,
            }));
            setIsCanceled(true);
            setUploadProgress(0);
        }
    };

    const handleRetry = (): void => {
        if (fileData?.file) {
            setFiles((prev) =>
                prev.map((file, i) => {
                    if (index === i) {
                        return {
                            ...file,
                            error: false,
                        };
                    }
                    return file;
                }),
            );
            fileUpload({ ...fileData, error: false });
            setIsCanceled(false);
            setUploadFailed(false);
        }
    };

    // File was removed by the user because it was unsupported or exceeds file size limit.
    if (fileData.removed) {
        return null;
    }

    const fileExtension = FileManager.getFileExtension(fileData.file?.name);
    const displayFileIcon = getFileIcons(fileExtension) ?? (
        <CIcon icon="FaRegFile" fontS={33} />
    );

    return (
        <CList.Item
            dFlex
            g={2}
            pb={3}
            mb={5}
            brB={{ width: 0.5, color: 'primary' }}
        >
            <CBox w="10%" className="file-icon">
                {displayFileIcon}
            </CBox>
            <CBox w="86%" className="file">
                <CBox mb={1} dFlex aiCenter jcBetween className="file-details">
                    <CBox w="90%" dFlex aiBaseline className="file-info">
                        <CText
                            tag="span"
                            mr={2}
                            dInlineB
                            maxW="66%"
                            title={fileData.file?.name}
                            cs={FileManagerCs.textTruncate}
                            className="file-name text-truncate" //???text-truncate
                        >
                            {fileData.file?.name}
                        </CText>
                        <CText tag="span" fontS={12} className="file-size">
                            {FileManager.getDataSize(fileData.file?.size)}
                        </CText>
                    </CBox>
                    {isUploaded ? (
                        <CIcon
                            clr="success"
                            title={t('uploaded')}
                            icon="FaRegCheckCircle"
                            className="upload-success"
                        />
                    ) : isCanceled || uploadFailed ? (
                        <CIcon
                            curP
                            p={1}
                            circlr
                            title="Retry"
                            icon="IoMdRefresh"
                            onClick={handleRetry}
                            className="retry-upload"
                            cs={{
                                ':hover': {
                                    clr: 'secondary',
                                    bgClr: 'rgba(0, 0, 0, 0.07)',
                                },
                            }}
                        />
                    ) : (
                        <CBox
                            curP
                            clr="error"
                            className="rm-file"
                            title={
                                fileData.error ? t('remove') : t('abortUpload')
                            }
                            onClick={
                                fileData.error
                                    ? () => handleFileRemove(index)
                                    : handleAbortUpload
                            }
                        >
                            <CIcon icon="AiOutlineClose" />
                        </CBox>
                    )}
                </CBox>
                <Progress
                    error={fileData.error}
                    percent={uploadProgress}
                    isCanceled={isCanceled}
                    isCompleted={isUploaded}
                />
            </CBox>
        </CList.Item>
    );
};

export default UploadItem;
