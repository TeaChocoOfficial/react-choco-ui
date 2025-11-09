//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/FolderTree.tsx"
import { ChocoUi } from '$Type/Choco';
import { Collapse } from './Collapse';
import { useEffect, useState } from 'react';
import { createUi } from '$/custom/test/createUi';
import { CIcon } from '$Compo/template/CIcon';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';

export type FolderTreeType = ChocoUi.Ui<
    'div',
    {
        folder: FileManager.FileData;
        icons?: Map<string, FileManager.IconData>;
        onFileOpen?: (file: FileManager.FileData) => void;
    }
>;

export const FolderTree = createUi<FolderTreeType>(
    ({ folder, onFileOpen, icons }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isActive, setIsActive] = useState(false);
        const { currentPath, setCurrentPath, onFolderChange } =
            useFileNavigation();

        const handleFolderSwitch = () => {
            setIsActive(true);
            onFileOpen?.(folder);
            setCurrentPath(folder.path ?? '');
            onFolderChange?.(folder.path ?? '');
        };

        const handleCollapseChange: React.MouseEventHandler<HTMLSpanElement> = (
            event,
        ) => {
            event.stopPropagation();
            setIsOpen((prev) => !prev);
        };

        useEffect(() => {
            setIsActive(currentPath === folder.path); //Setting isActive to a folder if its path matches currentPath

            // Auto expand parent folder if its child is accessed via file navigation
            // Explanation: Checks if the current folder's parent path matches with any folder path i.e. Folder's parent
            // then expand that parent.
            const currentPathArray = currentPath.split('/');
            currentPathArray.pop(); //splits with '/' and pops to remove last element to get current folder's parent path
            const currentFolderParentPath = currentPathArray.join('/');
            if (currentFolderParentPath === folder.path) {
                setIsOpen(true);
            }
            //
        }, [currentPath]);

        const icon = icons?.get(`${folder.class}`);

        if ((folder.subDirectories?.length ?? 0) > 0) {
            return (
                <>
                    <div
                        ref={ref}
                        className={`sb-folders-list-item ${
                            isActive ? 'active-list-item' : ''
                        }`}
                        onClick={handleFolderSwitch}
                    >
                        <span onClick={handleCollapseChange}>
                            <CIcon
                                size={20}
                                icon="MdKeyboardArrowRight"
                                className={`folder-icon-default ${
                                    isOpen ? 'folder-rotate-down' : ''
                                }`}
                            />
                        </span>
                        <div className="sb-folder-details">
                            {isOpen ? ( //{isOpen || isActive ? (
                                folder.class && icons && icon ? (
                                    icon.open || icon.default
                                ) : (
                                    <CIcon
                                        size={20}
                                        icon="FaRegFolderOpen"
                                        className="folder-open-icon"
                                    />
                                )
                            ) : folder.class && icons && icon ? (
                                icon.closed || icon.default
                            ) : (
                                <CIcon
                                    size={17}
                                    icon="FaRegFolder"
                                    className="folder-close-icon"
                                />
                            )}
                            <span
                                className="sb-folder-name"
                                title={folder.name}
                            >
                                {folder.name}
                            </span>
                        </div>
                    </div>
                    <Collapse open={isOpen}>
                        <div className="folder-collapsible">
                            {folder.subDirectories?.map((item, index) => (
                                <FolderTree
                                    key={index}
                                    folder={item}
                                    onFileOpen={onFileOpen}
                                    icons={icons}
                                />
                            ))}
                        </div>
                    </Collapse>
                </>
            );
        } else {
            return (
                <div
                    ref={ref}
                    className={`sb-folders-list-item ${
                        isActive ? 'active-list-item' : ''
                    }`}
                    onClick={handleFolderSwitch}
                >
                    <span className="non-expanable"></span>
                    <div className="sb-folder-details">
                        {isActive ? (
                            folder.class && icons && icon ? (
                                icon.open || icon.default
                            ) : (
                                <CIcon
                                    size={20}
                                    icon="FaRegFolderOpen"
                                    className="folder-open-icon"
                                />
                            )
                        ) : folder.class && icons && icon ? (
                            icon.closed || icon.default
                        ) : (
                            <CIcon
                                size={17}
                                icon="FaRegFolder"
                                className="folder-close-icon"
                            />
                        )}
                        <span className="sb-folder-name" title={folder.name}>
                            {folder.name}
                        </span>
                    </div>
                </div>
            );
        }
    },
    'FolderTree',
);
