//-Path: "react-choco-ui/lib/src/components/template/fileManager/actions/Rename.tsx"
import { Modal } from '../components/Modal';
import { CButton } from '$Compo/ui/CButton';
import { CIcon } from '$Compo/template/CIcon';
import { ErrorTooltip } from '../components/ErrorTooltip';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { NameInput, NameInputType } from '../components/NameInput';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';
import { useRef, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useDetectOutsideClick } from '$Hook/fileManager/hook/useDetectOutsideClick';

const maxNameLength = 220;

interface RenameActionProps {
    file: FileManager.FileData & { key?: number; isEditing?: boolean };
    onRename?: (file: FileManager.FileData, newName: string) => void;
    filesViewRef: React.RefObject<HTMLDivElement>;
    triggerAction: FileManager.TriggerAction;
}

export const RenameAction: React.FC<RenameActionProps> = ({
    file,
    onRename,
    filesViewRef,
    triggerAction,
}) => {
    const t = useTranslation();
    const { activeLayout } = useLayout();
    const [renameFile, setRenameFile] = useState(file?.name);
    const [fileRenameError, setFileRenameError] = useState(false);
    const [errorXPlacement, setErrorXPlacement] =
        useState<FileManager.ErrorPlacement>('right');
    const [errorYPlacement, setErrorYPlacement] =
        useState<FileManager.ErrorPlacement>('bottom');
    const [renameErrorMessage, setRenameErrorMessage] = useState('');
    const [renameFileWarning, setRenameFileWarning] = useState(false);
    const { currentPathFiles, setCurrentPathFiles } = useFileNavigation();

    const warningModalRef = useRef<HTMLDivElement>(null);
    const outsideClick = useDetectOutsideClick<NameInputType['Element']>(
        (event) => {
            if (!warningModalRef.current?.contains(event.target as Node)) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
    );

    const handleValidateFolderRename = (
        e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            e.preventDefault();
            outsideClick.setIsClicked(true);
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            setCurrentPathFiles((prev) =>
                prev.map((f) => {
                    if (f.key === file.key) {
                        return { ...f, isEditing: false };
                    }
                    return f;
                }),
            );
            triggerAction.close();
            return;
        }

        const invalidCharsRegex = /[\\/:*?"<>|]/;
        if (invalidCharsRegex.test(e.key)) {
            e.preventDefault();
            setRenameErrorMessage(t('invalidFileName'));
            setFileRenameError(true);
        } else {
            setFileRenameError(false);
        }
    };

    // Auto hide error message after 7 seconds
    useEffect(() => {
        if (fileRenameError) {
            const autoHideError = setTimeout(() => {
                setFileRenameError(false);
                setRenameErrorMessage('');
            }, 7000);

            return () => clearTimeout(autoHideError);
        }
    }, [fileRenameError]);
    //

    function handleFileRenaming(isConfirmed: boolean) {
        if (renameFile === '' || renameFile === file.name) {
            setCurrentPathFiles((prev) =>
                prev.map((f) => {
                    if (f.key === file.key) {
                        return { ...f, isEditing: false };
                    }
                    return f;
                }),
            );
            triggerAction.close();
            return;
        } else if (currentPathFiles.some((f) => f.name === renameFile)) {
            setFileRenameError(true);
            setRenameErrorMessage(t('folderExists', { renameFile }));
            outsideClick.setIsClicked(false);
            return;
        } else if (!file.isDirectory && !isConfirmed) {
            const fileExtension = FileManager.getFileExtension(file.name);
            const renameFileExtension =
                FileManager.getFileExtension(renameFile);
            if (fileExtension !== renameFileExtension) {
                setRenameFileWarning(true);
                return;
            }
        }
        setFileRenameError(false);
        FileManager.validateApiCallback(onRename, 'onRename', file, renameFile);
        setCurrentPathFiles((prev) => prev.filter((f) => f.key !== file.key)); // Todo: Should only filter on success API call
        triggerAction.close();
    }

    const focusName = () => {
        outsideClick.ref?.current?.focus();

        if (file.isDirectory) {
            (
                outsideClick.ref.current as
                    | HTMLInputElement
                    | HTMLTextAreaElement
            )?.select();
        } else {
            const fileExtension = FileManager.getFileExtension(file.name);
            const fileNameLength =
                (file.name?.length ?? 0) - (fileExtension?.length ?? 0) - 1;
            (
                outsideClick.ref.current as
                    | HTMLInputElement
                    | HTMLTextAreaElement
            )?.setSelectionRange(0, fileNameLength);
        }
    };

    useEffect(() => {
        focusName();

        // Dynamic Error Message Placement based on available space
        if (outsideClick.ref?.current && filesViewRef.current) {
            const errorMessageWidth = 292 + 8 + 8 + 5; // 8px padding on left and right + additional 5px for gap
            const errorMessageHeight = 56 + 20 + 10 + 2; // 20px :before height
            const filesContainer = filesViewRef.current;
            const filesContainerRect = filesContainer.getBoundingClientRect();
            const renameInputContainer = outsideClick.ref.current;
            const renameInputContainerRect =
                renameInputContainer.getBoundingClientRect();

            const rightAvailableSpace =
                filesContainerRect.right - renameInputContainerRect.left;
            rightAvailableSpace > errorMessageWidth
                ? setErrorXPlacement('right')
                : setErrorXPlacement('left');

            const bottomAvailableSpace =
                filesContainerRect.bottom -
                (renameInputContainerRect.top +
                    renameInputContainer.clientHeight);
            bottomAvailableSpace > errorMessageHeight
                ? setErrorYPlacement('bottom')
                : setErrorYPlacement('top');
        }
    }, []);

    useEffect(() => {
        if (outsideClick.isClicked) {
            handleFileRenaming(false);
        }
        focusName();
    }, [outsideClick.isClicked]);

    const handleRenameChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRenameFile(e.target.value);
        setFileRenameError(false);
    };

    return (
        <>
            <NameInput
                id={file.name}
                value={renameFile}
                ref={outsideClick.ref}
                maxLength={maxNameLength}
                onChange={handleRenameChange}
                onKeyDown={handleValidateFolderRename}
                onClick={(e) => e.stopPropagation()}
                {...(activeLayout === 'list' && { rows: 1 })}
            />
            {fileRenameError && (
                <ErrorTooltip
                    message={renameErrorMessage}
                    xPlacement={errorXPlacement}
                    yPlacement={errorYPlacement}
                />
            )}

            <Modal
                heading={t('rename')}
                show={renameFileWarning}
                setShow={setRenameFileWarning}
                dialogWidth={'25vw'}
                closeButton={false}
            >
                <div
                    className="fm-rename-folder-container"
                    ref={warningModalRef}
                >
                    <div className="fm-rename-folder-input">
                        <div className="fm-rename-warning">
                            <CIcon
                                fontS={70}
                                color="warn"
                                icon="IoWarningOutline"
                            />
                            <div>{t('fileNameChangeWarning')}</div>
                        </div>
                    </div>
                    <div className="fm-rename-folder-action">
                        <CButton
                            color="secondary"
                            onClick={() => {
                                setCurrentPathFiles((prev) =>
                                    prev.map((f) => {
                                        if (f.key === file.key) {
                                            return { ...f, isEditing: false };
                                        }
                                        return f;
                                    }),
                                );
                                setRenameFileWarning(false);
                                triggerAction.close();
                            }}
                        >
                            {t('no')}
                        </CButton>
                        <CButton
                            color="error"
                            onClick={() => {
                                setRenameFileWarning(false);
                                handleFileRenaming(true);
                            }}
                        >
                            {t('yes')}
                        </CButton>
                    </div>
                </div>
            </Modal>
        </>
    );
};
