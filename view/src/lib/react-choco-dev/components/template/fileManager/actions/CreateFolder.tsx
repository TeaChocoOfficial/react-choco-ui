//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/actions/CreateFolder.tsx"
import { ErrorTooltip } from '../components/ErrorTooltip';
import { NameInput, NameInputType } from '../components/NameInput';
import { useEffect, useState, KeyboardEvent, ChangeEvent } from 'react';
import { FileManager } from '../../../../hooks/fileManager/fileManager';
import { useLayout } from '../../../../hooks/fileManager/context/Layout';
import { useFileNavigation } from '../../../../hooks/fileManager/context/FileNavigation';
import { useTranslation } from '../../../../hooks/fileManager/context/TranslationProvider';
import { useDetectOutsideClick } from '../../../../hooks/fileManager/hook/useDetectOutsideClick';

const maxNameLength = 220;

interface CreateFolderActionProps {
    file: FileManager.FileData & { key?: number };
    filesViewRef: React.RefObject<HTMLDivElement>;
    triggerAction: FileManager.TriggerAction;
    onCreateFolder?: (
        name: string,
        folder: FileManager.FileData | null,
    ) => void;
}

export const CreateFolderAction: React.FC<CreateFolderActionProps> = ({
    file,
    filesViewRef,
    triggerAction,
    onCreateFolder,
}) => {
    const [folderName, setFolderName] = useState(file.name);
    const [folderNameError, setFolderNameError] = useState(false);
    const [folderErrorMessage, setFolderErrorMessage] = useState('');
    const [errorXPlacement, setErrorXPlacement] =
        useState<FileManager.ErrorPlacement>('right');
    const [errorYPlacement, setErrorYPlacement] =
        useState<FileManager.ErrorPlacement>('bottom');
    const outsideClick = useDetectOutsideClick<NameInputType['Element']>(
        (event) => {
            event.preventDefault();
            event.stopPropagation();
        },
    );
    const { currentFolder, currentPathFiles, setCurrentPathFiles } =
        useFileNavigation();
    const { activeLayout } = useLayout();
    const t = useTranslation();

    // Folder name change handler function
    const handleFolderNameChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFolderName(e.target.value);
        setFolderNameError(false);
    };
    //

    // Validate folder name and call "onCreateFolder" function
    const handleValidateFolderName = (
        e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            e.preventDefault();
            handleFolderCreating();
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            triggerAction.close();
            setCurrentPathFiles((prev) =>
                prev.filter((f) => f.key !== file.key),
            );
            return;
        }

        const invalidCharsRegex = /[\\/:*?"<>|]/;
        if (invalidCharsRegex.test(e.key)) {
            e.preventDefault();
            setFolderErrorMessage(t('invalidFileName'));
            setFolderNameError(true);
        } else {
            setFolderNameError(false);
            setFolderErrorMessage('');
        }
    };

    // Auto hide error message after 7 seconds
    useEffect(() => {
        if (folderNameError) {
            const autoHideError = setTimeout(() => {
                setFolderNameError(false);
                setFolderErrorMessage('');
            }, 7000);

            return () => clearTimeout(autoHideError);
        }
    }, [folderNameError]);
    //

    function handleFolderCreating() {
        let newFolderName = folderName?.trim() ?? '';
        const syncedCurrPathFiles = currentPathFiles.filter(
            (f) => !(!!f.key && f.key === file.key),
        );

        const alreadyExists = syncedCurrPathFiles.find((f) => {
            return f.name?.toLowerCase() === newFolderName.toLowerCase();
        });

        if (alreadyExists) {
            setFolderErrorMessage(
                t('folderExists', { renameFile: newFolderName }),
            );
            setFolderNameError(true);
            outsideClick.ref.current?.focus();
            (
                outsideClick.ref.current as
                    | HTMLInputElement
                    | HTMLTextAreaElement
            )?.select();
            outsideClick.setIsClicked(false);
            return;
        }

        if (newFolderName === '') {
            newFolderName = FileManager.duplicateNameHandler(
                'New Folder',
                true,
                syncedCurrPathFiles,
            );
        }

        FileManager.validateApiCallback(
            onCreateFolder,
            'onCreateFolder',
            newFolderName,
            currentFolder,
        );
        setCurrentPathFiles((prev) => prev.filter((f) => f.key !== file.key));
        triggerAction.close();
    }
    //

    // Folder name text selection upon visible
    useEffect(() => {
        outsideClick.ref.current?.focus();
        (
            outsideClick.ref.current as HTMLInputElement | HTMLTextAreaElement
        )?.select();

        // Dynamic Error Message Placement based on available space
        if (outsideClick.ref?.current && filesViewRef.current) {
            const errorMessageWidth = 292 + 8 + 8 + 5; // 8px padding on left and right + additional 5px for gap
            const errorMessageHeight = 56 + 20 + 10 + 2; // 20px :before height
            const filesContainer = filesViewRef.current;
            const filesContainerRect = filesContainer.getBoundingClientRect();
            const nameInputContainer = outsideClick.ref.current;
            const nameInputContainerRect =
                nameInputContainer.getBoundingClientRect();

            const rightAvailableSpace =
                filesContainerRect.right - nameInputContainerRect.left;
            rightAvailableSpace > errorMessageWidth
                ? setErrorXPlacement('right')
                : setErrorXPlacement('left');

            const bottomAvailableSpace =
                filesContainerRect.bottom -
                (nameInputContainerRect.top + nameInputContainer.clientHeight);
            bottomAvailableSpace > errorMessageHeight
                ? setErrorYPlacement('bottom')
                : setErrorYPlacement('top');
        }
    }, []);
    //

    useEffect(() => {
        if (outsideClick.isClicked) {
            handleFolderCreating();
        }
    }, [outsideClick.isClicked]);

    return (
        <>
            <NameInput
                id="newFolder"
                value={folderName}
                ref={outsideClick.ref}
                maxLength={maxNameLength}
                onChange={handleFolderNameChange}
                onKeyDown={handleValidateFolderName}
                onClick={(event) => event.stopPropagation()}
                {...(activeLayout === 'list' && { rows: 1 })}
            />
            {folderNameError && (
                <ErrorTooltip
                    message={folderErrorMessage}
                    xPlacement={errorXPlacement}
                    yPlacement={errorYPlacement}
                />
            )}
        </>
    );
};
