//-Path: "react-choco-ui/lib/src/components/template/fileManager/CFileItem.tsx"
import { CIcon } from '../CIcon';
import { FileManagerCs } from './cs';
import { ChocoUi } from '$Type/Choco';
import { SetState } from '$Type/Type';
import { CBox } from '$Compo/ui/CBox';
import { CText } from '$Compo/ui/CText';
import { customUi } from '$/custom/customUi';
import { CCheckbox } from '$Compo/ui/CCheckbox';
import { RenameAction } from './actions/Rename';
import { FileManager } from '$Hook/fileManager/fileManager';
import { CreateFolderAction } from './actions/CreateFolder';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { cloneElement, useEffect, useRef, useState } from 'react';
import { useFileIcons } from '$Hook/fileManager/hook/useFileIcons';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useClipBoard } from '$Hook/fileManager/context/Clipboard';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';

const dragIconSize = 50;

export type CFileItemType = ChocoUi.Ui<
    'div',
    {
        index: number;
        draggable?: boolean;
        file: FileManager.FileData;
        enableFilePreview: boolean;
        setVisible: SetState<boolean>;
        selectedFileIndexes: number[];
        formatDate: FileManager.FormatDate;
        triggerAction: FileManager.TriggerAction;
        icons?: Map<string, FileManager.IconData>;
        filesViewRef: React.RefObject<HTMLDivElement>;
        onFileOpen?: (file: FileManager.FileData) => void;
        setLastSelectedFile: (file: FileManager.FileData | null) => void;
        onRename?: (oldPath: FileManager.FileData, newPath: string) => void;
        onCreateFolder?: (
            name: string,
            folder: FileManager.FileData | null,
        ) => void;
        handleContextMenu: (e: React.MouseEvent, isSelection: boolean) => void;
    }
>;

export const CFileItem = customUi<CFileItemType>(
    'div',
    'CFileItem',
)(
    ({
        ref,
        chocoColor,
        ChocoShade,
        restProps: {
            file,
            icons,
            index,
            onRename,
            draggable,
            formatDate,
            onFileOpen,
            setVisible,
            filesViewRef,
            triggerAction,
            onCreateFolder,
            enableFilePreview,
            handleContextMenu,
            setLastSelectedFile,
            selectedFileIndexes,
            ...restProps
        },
    }) => {
        const dragIconRef = useRef<HTMLDivElement>(null);
        const [lastClickTime, setLastClickTime] = useState(0);
        const [dropZoneClass, setDropZoneClass] = useState('');
        const [fileSelected, setFileSelected] = useState(false);
        const [checkboxVisible, setCheckboxVisible] = useState(false);
        const [tooltipPosition, setTooltipPosition] =
            useState<FileManager.Position | null>(null);

        const { activeLayout, color } = useLayout();
        const iconSize = activeLayout === 'grid' ? 48 : 20;
        const getFileIcons = useFileIcons(iconSize);
        const { setSelectedFiles } = useSelection();
        const getDragIcons = useFileIcons(dragIconSize);
        const { setCurrentPath, currentPathFiles, onFolderChange } =
            useFileNavigation();
        const { clipBoard, handleCutCopy, setClipBoard, handlePasting } =
            useClipBoard();

        const isFileMoving =
            clipBoard?.isMoving &&
            clipBoard.files.find(
                (f) => f.name === file.name && f.path === file.path,
            );

        const handleFileAccess = () => {
            onFileOpen?.(file);
            if (file.isDirectory) {
                setCurrentPath(file.path ?? '');
                onFolderChange?.(file.path ?? '');
                setSelectedFiles([]);
            } else {
                enableFilePreview && triggerAction.show('previewFile');
            }
        };

        const handleFileRangeSelection = (
            shiftKey: boolean,
            ctrlKey: boolean,
        ) => {
            if (selectedFileIndexes.length > 0 && shiftKey) {
                let reverseSelection = false;
                let startRange = selectedFileIndexes[0];
                let endRange = index;

                // Reverse Selection
                if (startRange >= endRange) {
                    const temp = startRange;
                    startRange = endRange;
                    endRange = temp;
                    reverseSelection = true;
                }

                const filesRange = currentPathFiles.slice(
                    startRange,
                    endRange + 1,
                );
                setSelectedFiles(
                    reverseSelection ? filesRange.reverse() : filesRange,
                );
            } else if (selectedFileIndexes.length > 0 && ctrlKey) {
                // Remove file from selected files if it already exists on CTRL + Click, otherwise push it in selectedFiles
                setSelectedFiles((prev) => {
                    const filteredFiles = prev.filter(
                        (f) => f.path !== file.path,
                    );
                    if (prev.length === filteredFiles.length) {
                        return [...prev, file];
                    }
                    return filteredFiles;
                });
            } else {
                setSelectedFiles([file]);
            }
        };

        const handleFileSelection = (e: React.MouseEvent) => {
            e.stopPropagation();
            console.log(file.isEditing);

            if (file.isEditing) return;

            handleFileRangeSelection(e.shiftKey, e.ctrlKey || e.metaKey);

            const currentTime = new Date().getTime();
            if (currentTime - lastClickTime < 300) {
                handleFileAccess();
                return;
            }
            setLastClickTime(currentTime);
        };

        const handleOnKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.stopPropagation();
                setSelectedFiles([file]);
                handleFileAccess();
            }
        };

        const handleItemContextMenu = (e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();

            if (file.isEditing) return;
            if (!fileSelected) setSelectedFiles([file]);

            setLastSelectedFile(file);
            handleContextMenu(e, true);
        };

        // Selection Checkbox Functions
        const handleMouseOver = () => setCheckboxVisible(true); //'visible'

        const handleMouseLeave = () =>
            !fileSelected && setCheckboxVisible(false); //hidden

        const handleCheckboxChange = (
            e: React.ChangeEvent<HTMLInputElement>,
        ) => {
            if (e.target.checked) {
                setSelectedFiles((prev) => [...prev, file]);
            } else {
                setSelectedFiles((prev) =>
                    prev.filter(
                        (f) => f.name !== file.name && f.path !== file.path,
                    ),
                );
            }

            setFileSelected(e.target.checked);
        };
        //

        const handleDragStart = (event: React.DragEvent) => {
            if (dragIconRef.current) {
                event.dataTransfer.setDragImage(dragIconRef.current, 30, 50);
            }
            event.dataTransfer.effectAllowed = 'copy';
            handleCutCopy(true);
        };

        const handleDragEnd = () => setClipBoard(null);

        const handleDragEnterOver = (e: React.DragEvent) => {
            e.preventDefault();
            if (fileSelected || !file.isDirectory) {
                e.dataTransfer.dropEffect = 'none';
            } else {
                setTooltipPosition({ x: e.clientX, y: e.clientY + 12 });
                e.dataTransfer.dropEffect = 'copy';
                setDropZoneClass('file-drop-zone');
            }
        };

        const handleDragLeave = (e: React.DragEvent) => {
            // To stay in dragging state for the child elements of the target drop-zone
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setDropZoneClass((prev) => (prev ? '' : prev));
                setTooltipPosition(null);
            }
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            if (fileSelected || !file.isDirectory) return;

            handlePasting(file);
            setDropZoneClass((prev) => (prev ? '' : prev));
            setTooltipPosition(null);
        };

        useEffect(() => {
            setFileSelected(selectedFileIndexes.includes(index));
            setCheckboxVisible(
                selectedFileIndexes.includes(index), // ? 'visible' : 'hidden',
            );
        }, [selectedFileIndexes, index]);

        const icon = icons?.get(`${file.class}`);
        const fileExtension = file.name?.split('.').pop()?.toLowerCase();

        const selectedColor = fileSelected
            ? new ChocoShade(chocoColor.get(color).alpha(0.4))[10]
            : null;

        return (
            <CBox
                ref={ref}
                mx={0}
                tabIndex={0}
                borS="solid"
                bgClr={selectedColor}
                borClr={selectedColor}
                dFlex={activeLayout === 'list'}
                fullW={activeLayout === 'list'}
                my={activeLayout === 'list' ? 0 : 1}
                borR={activeLayout === 'list' ? 0 : 1}
                cs={{
                    ':hover': {
                        bgClr:
                            fileSelected || !!file.isEditing
                                ? color
                                : new ChocoShade(chocoColor.get(color))[10],
                        borClr:
                            fileSelected || !!file.isEditing
                                ? new ChocoShade(chocoColor.get(color))[3]
                                : color,
                    },
                }}
                title={file.name}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                onKeyDown={handleOnKeyDown}
                // onClick={handleFileSelection}
                onDragStart={handleDragStart}
                onDragLeave={handleDragLeave}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onDragOver={handleDragEnterOver}
                onDragEnter={handleDragEnterOver}
                draggable={fileSelected && draggable}
                onContextMenu={handleItemContextMenu}
                className={`file-item-container ${dropZoneClass} ${
                    fileSelected || !!file.isEditing ? 'file-selected' : ''
                } ${isFileMoving ? 'file-moving' : ''}`}
                {...restProps}
            >
                <CBox
                    posR
                    dFlex
                    pb={2}
                    pt={3}
                    g={0.5}
                    borR={1}
                    aiCenter
                    borW={0.5}
                    // borS="solid"
                    // bgClr={selectedColor}
                    // borClr={selectedColor}
                    column={activeLayout === 'grid'}
                    h={activeLayout === 'grid' ? 98 : 13}
                    jc={activeLayout === 'grid' ? 'b' : null}
                    p={activeLayout === 'list' ? 4 : undefined}
                    pl={activeLayout === 'list' ? 10 : undefined}
                    w={activeLayout === 'grid' ? 128 : 'calc(72% - 50px)'}
                    className="file-item"
                >
                    {!file.isEditing && (
                        <CCheckbox
                            posA
                            l={5}
                            // op={0}
                            // eventN
                            style={{
                                visibility: checkboxVisible
                                    ? 'visible'
                                    : 'hidden',
                            }}
                            id={file.name}
                            name={file.name}
                            checked={fileSelected}
                            className={`selection-checkbox ${
                                checkboxVisible ? 'visible' : 'hidden'
                            }`}
                            onChange={handleCheckboxChange}
                            onClick={(event) => event.stopPropagation()}
                        />
                    )}
                    {file.isDirectory ? (
                        file.class && icons && icon ? (
                            (activeLayout === 'grid'
                                ? icon.grid
                                : icon.list) || (
                                <CIcon icon="FaFolder" fontS={iconSize} />
                            )
                        ) : (
                            <CIcon icon="FaRegFolderOpen" fontS={iconSize} />
                        )
                    ) : file.class && icons && icon ? (
                        cloneElement(icon.open || icon.default, {
                            height: 40,
                        })
                    ) : (
                        <>
                            {' '}
                            {getFileIcons(fileExtension) ?? (
                                <CIcon icon="FaRegFile" fontS={iconSize} />
                            )}{' '}
                        </>
                    )}

                    {file.isEditing ? (
                        <CBox
                            fullW
                            dFlex
                            aiCenter
                            ta={activeLayout === 'grid' ? 'c' : 'l'}
                            t={activeLayout === 'grid' ? 64 : undefined}
                            className={`rename-file-container ${activeLayout}`}
                        >
                            {triggerAction.actionType === 'createFolder' ? (
                                <CreateFolderAction
                                    file={file}
                                    filesViewRef={filesViewRef}
                                    triggerAction={triggerAction}
                                    onCreateFolder={onCreateFolder}
                                />
                            ) : (
                                <RenameAction
                                    file={file}
                                    onRename={onRename}
                                    filesViewRef={filesViewRef}
                                    triggerAction={triggerAction}
                                />
                            )}
                        </CBox>
                    ) : (
                        <CText
                            tag="span"
                            cs={FileManagerCs.textTruncate}
                            maxW={activeLayout === 'list' ? 285 : undefined}
                            className="text-truncate file-name"
                        >
                            {file.name}
                        </CText>
                    )}
                </CBox>

                {activeLayout === 'list' && (
                    <>
                        <CBox
                            dFlex
                            pl={2}
                            w="20%"
                            jcStart
                            aiCenter
                            fontS={0.8}
                            className="modified-date"
                        >
                            {formatDate(file.updatedAt)}
                        </CBox>
                        <CBox
                            dFlex
                            pl={2}
                            w="10%"
                            jcStart
                            aiCenter
                            fontS={0.8}
                            className="size"
                        >
                            {file?.size && file.size > 0
                                ? FileManager.getDataSize(file.size)
                                : ''}
                        </CBox>
                    </>
                )}

                {/* Drag Icon & Tooltip Setup */}
                {tooltipPosition && (
                    <CBox
                        posF
                        z={2}
                        pl={1}
                        pr={6}
                        py={0.5}
                        borR={1}
                        fontS={0.75}
                        fontW="bold"
                        bgClr="paper"
                        clr="secondary"
                        t={tooltipPosition.y}
                        l={tooltipPosition.x}
                        br={{
                            width: 1,
                            style: 'dashed',
                            color: 'primary',
                        }}
                        cs={{ textWrap: 'nowrap' }}
                        className="drag-move-tooltip"
                    >
                        Move to{' '}
                        <CText tag="span" className="drop-zone-file-name">
                            {file.name}
                        </CText>
                    </CBox>
                )}

                <CBox
                    ref={dragIconRef}
                    posA
                    z={-1}
                    py={1}
                    px={2}
                    borR={1}
                    t={-1000}
                    l={-1000}
                    className="drag-icon"
                >
                    {file.isDirectory ? (
                        <CIcon icon="FaRegFolderOpen" fontS={dragIconSize} />
                    ) : (
                        <>
                            {getDragIcons(fileExtension) ?? (
                                <CIcon icon="FaRegFile" fontS={dragIconSize} />
                            )}
                        </>
                    )}
                </CBox>
                {/* Drag Icon & Tooltip Setup */}
            </CBox>
        );
    },
)();
