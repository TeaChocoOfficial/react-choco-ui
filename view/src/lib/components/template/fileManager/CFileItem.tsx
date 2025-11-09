//-Path: "react-choco-ui/lib/src/components/template/fileManager/CFileItem.tsx"
import { CIcon } from '../CIcon';
import { ChocoUi } from '$Type/Choco';
import { SetState } from '$Type/Type';
import { createUi } from '$/custom/test/createUi';
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

interface CFileItemProps {
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

interface TooltipPosition {
    x: number;
    y: number;
}

export type CFileItemType = ChocoUi.Ui<'div', CFileItemProps>;

export const CFileItem: React.FC<CFileItemProps> = createUi<CFileItemType>(
    (
        {
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
        },
        ref,
    ) => {
        const dragIconRef = useRef<HTMLDivElement>(null);
        const [lastClickTime, setLastClickTime] = useState(0);
        const [dropZoneClass, setDropZoneClass] = useState('');
        const [fileSelected, setFileSelected] = useState(false);
        const [checkboxClassName, setCheckboxClassName] = useState('hidden');
        const [tooltipPosition, setTooltipPosition] =
            useState<TooltipPosition | null>(null);

        const { activeLayout } = useLayout();
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

            if (!fileSelected) {
                setSelectedFiles([file]);
            }

            setLastSelectedFile(file);
            handleContextMenu(e, true);
        };

        // Selection Checkbox Functions
        const handleMouseOver = () => {
            setCheckboxClassName('visible');
        };

        const handleMouseLeave = () => {
            !fileSelected && setCheckboxClassName('hidden');
        };

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
            setCheckboxClassName(
                selectedFileIndexes.includes(index) ? 'visible' : 'hidden',
            );
        }, [selectedFileIndexes, index]);

        const icon = icons?.get(`${file.class}`);
        const fileExtension = file.name?.split('.').pop()?.toLowerCase();

        return (
            <div
                ref={ref}
                tabIndex={0}
                title={file.name}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                onKeyDown={handleOnKeyDown}
                onClick={handleFileSelection}
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
            >
                <div className="file-item">
                    {!file.isEditing && (
                        <CCheckbox
                            name={file.name}
                            id={file.name}
                            checked={fileSelected}
                            className={`selection-checkbox ${checkboxClassName}`}
                            onChange={handleCheckboxChange}
                            onClick={(event) => event.stopPropagation()}
                        />
                    )}
                    {file.isDirectory ? (
                        file.class && icons && icon ? (
                            (activeLayout === 'grid'
                                ? icon.grid
                                : icon.list) || (
                                <CIcon icon="FaFolder" size={iconSize} />
                            )
                        ) : (
                            <CIcon icon="FaRegFolderOpen" size={iconSize} />
                        )
                    ) : file.class && icons && icon ? (
                        cloneElement(icon.open || icon.default, {
                            height: 40,
                        })
                    ) : (
                        <>
                            {' '}
                            {getFileIcons(fileExtension) ?? (
                                <CIcon icon="FaRegFile" size={iconSize} />
                            )}{' '}
                        </>
                    )}

                    {file.isEditing ? (
                        <div
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
                        </div>
                    ) : (
                        <span className="text-truncate file-name">
                            {file.name}
                        </span>
                    )}
                </div>

                {activeLayout === 'list' && (
                    <>
                        <div className="modified-date">
                            {formatDate(file.updatedAt)}
                        </div>
                        <div className="size">
                            {file?.size && file.size > 0
                                ? FileManager.getDataSize(file.size)
                                : ''}
                        </div>
                    </>
                )}

                {/* Drag Icon & Tooltip Setup */}
                {tooltipPosition && (
                    <div
                        style={{
                            top: `${tooltipPosition.y}px`,
                            left: `${tooltipPosition.x}px`,
                        }}
                        className="drag-move-tooltip"
                    >
                        Move to{' '}
                        <span className="drop-zone-file-name">{file.name}</span>
                    </div>
                )}

                <div ref={dragIconRef} className="drag-icon">
                    {file.isDirectory ? (
                        <CIcon icon="FaRegFolderOpen" size={dragIconSize} />
                    ) : (
                        <>
                            {getDragIcons(fileExtension) ?? (
                                <CIcon icon="FaRegFile" size={dragIconSize} />
                            )}
                        </>
                    )}
                </div>
                {/* Drag Icon & Tooltip Setup */}
            </div>
        );
    },
    'CFileItem',
);
