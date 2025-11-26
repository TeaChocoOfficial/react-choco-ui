//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/actions/PreviewFile.tsx"
import { Loader } from '../components/Loader';
import {
    CBox,
    CText,
    CIcon,
    CImage,
    CAudio,
    CVideo,
    CIframe,
    CButton,
} from '@teachoco-official/react-choco-custom';
import { useMemo, useState, isValidElement } from 'react';
import { FileManager } from '../../../../hooks/fileManager/fileManager';
import { useLayout } from '../../../../hooks/fileManager/context/Layout';
import { useFileIcons } from '../../../../hooks/fileManager/hook/useFileIcons';
import { useSelection } from '../../../../hooks/fileManager/context/Selection';
import { useTranslation } from '../../../../hooks/fileManager/context/TranslationProvider';

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
    const { color } = useLayout();
    const getFileIcons = useFileIcons(73);
    const { selectedFiles } = useSelection();
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const filePath = `${filePreviewPath ?? ''}${selectedFiles[0].path}`;
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
        <CBox
            tag="section"
            p={8}
            dFlex
            jcCenter
            fontS="base"
            h={extension === 'pdf' ? '85dvh' : '40dvh'}
            className={`file-previewer ${
                extension === 'pdf' ? 'pdf-previewer' : ''
            }`}
        >
            {(hasError || !isSupportedExtension) && (
                <CBox
                    g={2}
                    dFlex
                    column
                    aiCenter
                    jcCenter
                    className="preview-error"
                >
                    <CText
                        span
                        g={2}
                        dFlex
                        column
                        aiCenter
                        jcCenter
                        className="error-icon"
                    >
                        {getFileIcons(extension) ?? (
                            <CIcon icon="FaRegFileAlt" fontS={73} />
                        )}
                    </CText>
                    <CText
                        span
                        mb={1}
                        fontS={18}
                        fontW="medium"
                        className="error-msg"
                    >
                        {t('previewUnavailable')}
                    </CText>
                    <CBox dFlex g={2} aiCenter my={1} className="file-info">
                        <CText
                            span
                            px={1}
                            py={4}
                            borR={1}
                            bgClr="paper"
                            br={{ color: 'paper-5' }}
                            className="file-name"
                        >
                            {selectedFiles[0].name}
                        </CText>
                        {selectedFiles[0].size && <span>-</span>}
                        <CText span fontS={0.8} className="file-size">
                            {FileManager.getDataSize(selectedFiles[0].size)}
                        </CText>
                    </CBox>
                    <CButton
                        color="info"
                        onClick={handleDownload}
                        className="download-btn"
                    >
                        <CIcon icon="MdOutlineFileDownload" fontS={18} />
                        <CText span>{t('download')}</CText>
                    </CButton>
                </CBox>
            )}

            {imageExtensions.includes(extension) && (
                <>
                    <Loader loading={isLoading} />
                    <CImage
                        src={filePath}
                        loading="lazy"
                        alt="Preview Unavailable"
                        cs={{
                            objectFit: 'contain',
                            op: isLoading ? 0 : 1,
                            br: { width: 0.5, color },
                            delay: 'opacity 0.5s ease-in-out',
                            wh: isLoading ? 0 : '-webkit-fill-available',
                        }}
                        className={`photo-popup-image ${
                            isLoading ? 'img-loading' : ''
                        }`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                </>
            )}

            {videoExtensions.includes(extension) && (
                <CVideo
                    src={filePath}
                    controls
                    autoPlay
                    w="-webkit-fill-available"
                    className="video-preview"
                />
            )}

            {audioExtensions.includes(extension) && (
                <CAudio
                    src={filePath}
                    w="60%"
                    controls
                    autoPlay
                    cs={{ alignSelf: 'center' }}
                    className="audio-preview"
                />
            )}

            {iFrameExtensions.includes(extension) && (
                <CIframe
                    src={filePath}
                    frameBorder={0}
                    title="File Preview"
                    w="-webkit-fill-available"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={`photo-popup-iframe ${
                        isLoading ? 'img-loading' : ''
                    }`}
                ></CIframe>
            )}
        </CBox>
    );
};
