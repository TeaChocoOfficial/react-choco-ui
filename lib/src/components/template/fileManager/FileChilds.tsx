//-Path: "react-choco-ui/lib/src/components/template/fileManager/FileChilds.tsx"
import { CIcon } from '../CIcon';
import { FileManagerCs } from './cs';
import { CBox } from '$Compo/ui/CBox';
import { CText } from '$Compo/ui/CText';
import { CCheckbox } from '$Compo/ui/CCheckbox';
import { RenameAction } from './actions/Rename';
import { FileManager } from '$Hook/fileManager/fileManager';
import { CreateFolderAction } from './actions/CreateFolder';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { cloneElement, useMemo, useRef, useState } from 'react';
import { useFileIcons } from '$Hook/fileManager/hook/useFileIcons';

const dragIconSize = 50;

export type FileChildsProps = {
    fileSelected: boolean;
    checkboxVisible: boolean;
    file: FileManager.FileData;
    formatDate: FileManager.FormatDate;
    triggerAction: FileManager.TriggerAction;
    icons?: Map<string, FileManager.IconData>;
    tooltipPosition: FileManager.Position | null;
    filesViewRef: React.RefObject<HTMLDivElement>;
    dragIconRef: React.RefObject<HTMLDivElement | null>;
    onRename?: (oldPath: FileManager.FileData, newPath: string) => void;
    onCreateFolder?: (
        name: string,
        folder: FileManager.FileData | null,
    ) => void;
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FileChilds({
    file,
    icons,
    onRename,
    formatDate,
    dragIconRef,
    filesViewRef,
    fileSelected,
    triggerAction,
    onCreateFolder,
    checkboxVisible,
    tooltipPosition,
    handleCheckboxChange,
}: FileChildsProps) {
    const { activeLayout } = useLayout();
    const iconSize = useMemo(
        () => (activeLayout === 'grid' ? 48 : 20),
        [activeLayout],
    );
    const getFileIcons = useFileIcons(iconSize);
    const getDragIcons = useFileIcons(dragIconSize);
    const icon = useMemo(() => icons?.get(`${file.class}`), [file, icons]);
    const fileExtension = useMemo(
        () => file.name?.split('.').pop()?.toLowerCase(),
        [file],
    );

    return (
        <>
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
                            visibility: checkboxVisible ? 'visible' : 'hidden',
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
                        (activeLayout === 'grid' ? icon.grid : icon.list) || (
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
        </>
    );
}
