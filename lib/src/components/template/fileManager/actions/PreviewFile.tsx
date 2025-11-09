//-Path: "react-choco-ui/lib/src/components/template/fileManager/actions/PreviewFile.tsx"
import './PreviewFile.scss';
import { CIcon } from '$Compo/template/CIcon';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { useMemo, useState, isValidElement } from 'react';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useFileIcons } from '$Hook/fileManager/hook/useFileIcons';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

interface PreviewFileActionProps {
    filePreviewPath?: string;
    filePreviewComponent?: (file: FileManager.FileData) => React.ReactElement;
}

const imageExtensions = ['jpg', 'jpeg', 'png'];
const videoExtensions = ['mp4', 'mov', 'avi'];
const audioExtensions = ['mp3', 'wav', 'm4a'];
const iFrameExtensions = ['txt', 'pdf'];

export const PreviewFileAction: React.FC<PreviewFileActionProps> = ({
    filePreviewPath,
    filePreviewComponent,
}) => {
    const t = useTranslation();
    const getFileIcons = useFileIcons(73);
    const { selectedFiles } = useSelection();
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const filePath = `${filePreviewPath}${selectedFiles[0].path}`;
    const extension: string =
        FileManager.getFileExtension(selectedFiles[0].name)?.toLowerCase() ??
        '';

    // Custom file preview component
    const customPreview = useMemo(
        () => filePreviewComponent?.(selectedFiles[0]),
        [filePreviewComponent, selectedFiles],
    );

    const handleImageLoad = (): void => {
        setIsLoading(false); // Loading is complete
        setHasError(false); // No error
    };

    const handleImageError = (): void => {
        setIsLoading(false); // Loading is complete
        setHasError(true); // Error occurred
    };

    const handleDownload = (): void => {
        window.location.href = filePath;
    };

    if (isValidElement(customPreview)) {
        return customPreview;
    }

    const isSupportedExtension = [
        ...imageExtensions,
        ...videoExtensions,
        ...audioExtensions,
        ...iFrameExtensions,
    ].includes(extension);

    return (
        <section
            className={`file-previewer ${
                extension === 'pdf' ? 'pdf-previewer' : ''
            }`}
        >
            {hasError || !isSupportedExtension ? (
                <div className="preview-error">
                    <span className="error-icon">
                        {getFileIcons(extension) ?? (
                            <CIcon icon="FaRegFileAlt" size={73} />
                        )}
                    </span>
                    <span className="error-msg">{t('previewUnavailable')}</span>
                    <div className="file-info">
                        <span className="file-name">
                            {selectedFiles[0].name}
                        </span>
                        {selectedFiles[0].size && <span>-</span>}
                        <span className="file-size">
                            {FileManager.getDataSize(selectedFiles[0].size)}
                        </span>
                    </div>
                    <Button onClick={handleDownload} p="0.45rem .9rem">
                        <div className="download-btn">
                            <CIcon icon="MdOutlineFileDownload" size={18} />
                            <span>{t('download')}</span>
                        </div>
                    </Button>
                </div>
            ) : null}

            {imageExtensions.includes(extension) && (
                <>
                    <Loader loading={isLoading} />
                    <img
                        src={filePath}
                        loading="lazy"
                        alt="Preview Unavailable"
                        className={`photo-popup-image ${
                            isLoading ? 'img-loading' : ''
                        }`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                </>
            )}

            {videoExtensions.includes(extension) && (
                <video
                    src={filePath}
                    className="video-preview"
                    controls
                    autoPlay
                />
            )}

            {audioExtensions.includes(extension) && (
                <audio
                    src={filePath}
                    controls
                    autoPlay
                    className="audio-preview"
                />
            )}

            {iFrameExtensions.includes(extension) && (
                <iframe
                    src={filePath}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    frameBorder="0"
                    className={`photo-popup-iframe ${
                        isLoading ? 'img-loading' : ''
                    }`}
                    title="File Preview"
                ></iframe>
            )}
        </section>
    );
};
