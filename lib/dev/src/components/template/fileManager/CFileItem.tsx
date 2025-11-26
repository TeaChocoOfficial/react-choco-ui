//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/CFileItem.tsx"
import { FileChilds } from './FileChilds';
import { SetState } from '../../../types/Type';
import { CBox } from '@teachoco-official/react-choco-custom';
import { FileManager } from '../../../hooks/fileManager/fileManager';
import { useLayout } from '../../../hooks/fileManager/context/Layout';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelection } from '../../../hooks/fileManager/context/Selection';
import { useClipBoard } from '../../../hooks/fileManager/context/Clipboard';
import { useFileNavigation } from '../../../hooks/fileManager/context/FileNavigation';

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
            index,
            icons,
            onRename,
            draggable,
            formatDate,
            onFileOpen,
            setVisible,
            filesViewRef,
            triggerAction,
            onCreateFolder,
            handleContextMenu,
            enableFilePreview,
            selectedFileIndexes,
            setLastSelectedFile,
            ...restProps
        },
    }) => {
        console.log('render CFileItem', index);

        const dragIconRef = useRef<HTMLDivElement>(null);
        const [lastClickTime, setLastClickTime] = useState(0);
        const [dropZoneClass, setDropZoneClass] = useState('');
        const [fileSelected, setFileSelected] = useState(false);
        const [checkboxVisible, setCheckboxVisible] = useState(false);
        const [tooltipPosition, setTooltipPosition] =
            useState<FileManager.Position | null>(null);

        const { setSelectedFiles } = useSelection();
        const { activeLayout, color } = useLayout();
        const { setCurrentPath, onFolderChange, currentPathFiles } =
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

        const handleFileRangeSelection = useCallback(
            (shiftKey: boolean, ctrlKey: boolean) => {
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
            },
            [selectedFileIndexes, currentPathFiles, file, index],
        );

        const handleFileSelection = (event: React.MouseEvent) => {
            event.stopPropagation();

            if (file.isEditing) return;

            handleFileRangeSelection(
                event.shiftKey,
                event.ctrlKey || event.metaKey,
            );

            const currentTime = new Date().getTime();
            if (currentTime - lastClickTime < 300) return handleFileAccess();
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

        const handleDragStart = (event: React.DragEvent) => {
            if (dragIconRef.current)
                event.dataTransfer.setDragImage(dragIconRef.current, 30, 50);
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
            setCheckboxVisible(selectedFileIndexes.includes(index));
        }, [selectedFileIndexes, index]); // ← re-run เมื่อ selectedFileIndexes เปลี่ยน

        const selectedColor = useMemo(
            () =>
                dropZoneClass
                    ? 'red'
                    : fileSelected
                    ? new ChocoShade(chocoColor.get(color).alpha(0.4))[10]
                    : null,
            [color, fileSelected],
        );

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
                {...restProps}
            >
                <FileChilds
                    file={file}
                    icons={icons}
                    filesViewRef={ref}
                    onRename={onRename}
                    formatDate={formatDate}
                    dragIconRef={dragIconRef}
                    fileSelected={fileSelected}
                    triggerAction={triggerAction}
                    onCreateFolder={onCreateFolder}
                    checkboxVisible={checkboxVisible}
                    tooltipPosition={tooltipPosition}
                    handleCheckboxChange={handleCheckboxChange}
                />
            </CBox>
        );
    },
)();
