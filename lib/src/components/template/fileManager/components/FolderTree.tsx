//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/FolderTree.tsx"
import { CBox } from '$Compo/ui/CBox';
import { ChocoUi } from '$Type/Choco';
import { Collapse } from './Collapse';
import { CText } from '$Compo/ui/CText';
import { useEffect, useState } from 'react';
import { customUi } from '$/custom/customUi';
import { CIcon } from '$Compo/template/CIcon';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';

export type FolderTreeType = ChocoUi.Ui<
    'div',
    {
        folder: FileManager.FileData;
        icons?: Map<string, FileManager.IconData>;
        onFileOpen?: (file: FileManager.FileData) => void;
    }
>;

export const FolderTree = customUi<FolderTreeType>(
    'div',
    'FolderTree',
)(
    ({
        ref,
        Element,
        restProps: { folder, icons, className, onFileOpen, ...restProps },
    }) => {
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
                    <Element
                        ref={ref}
                        onClick={handleFolderSwitch}
                        className={`sb-folders-list-item ${
                            isActive ? 'active-list-item' : ''
                        } ${className}`}
                        {...restProps}
                    >
                        <CText span onClick={handleCollapseChange}>
                            <CIcon
                                fontS={20}
                                icon="MdKeyboardArrowRight"
                                delay="transform 0.5s ease-in-out"
                                trans={`rotate(${isOpen ? 90 : 0}deg)`}
                                className={`folder-icon-default ${
                                    isOpen ? 'folder-rotate-down' : ''
                                }`}
                            />
                        </CText>
                        <CBox dFlex aiCenter className="sb-folder-details">
                            {isOpen || isActive ? (
                                folder.class && icons && icon ? (
                                    icon.open || icon.default
                                ) : (
                                    <CIcon
                                        mx={2}
                                        fontS={20}
                                        icon="FaRegFolderOpen"
                                        className="folder-open-icon"
                                    />
                                )
                            ) : folder.class && icons && icon ? (
                                icon.closed || icon.default
                            ) : (
                                <CIcon
                                    mx={2}
                                    fontS={17}
                                    icon="FaRegFolder"
                                    className="folder-close-icon"
                                />
                            )}
                            <CText
                                span
                                w="max-content"
                                title={folder.name}
                                className="sb-folder-name"
                            >
                                {folder.name}
                            </CText>
                        </CBox>
                    </Element>
                    <Collapse open={isOpen}>
                        <CBox ml={2.5} className="folder-collapsible">
                            {folder.subDirectories?.map((item, index) => (
                                <FolderTree
                                    key={index}
                                    icons={icons}
                                    folder={item}
                                    onFileOpen={onFileOpen}
                                />
                            ))}
                        </CBox>
                    </Collapse>
                </>
            );
        } else {
            return (
                <Element
                    ref={ref}
                    onClick={handleFolderSwitch}
                    className={`sb-folders-list-item ${
                        isActive ? 'active-list-item' : ''
                    } ${className}`}
                    {...restProps}
                >
                    <CText span minW={20} className="non-expanable" />
                    <CBox dFlex aiCenter className="sb-folder-details">
                        {isActive ? (
                            folder.class && icons && icon ? (
                                icon.open || icon.default
                            ) : (
                                <CIcon
                                    mx={2}
                                    fontS={20}
                                    icon="FaRegFolderOpen"
                                    className="folder-open-icon"
                                />
                            )
                        ) : folder.class && icons && icon ? (
                            icon.closed || icon.default
                        ) : (
                            <CIcon
                                mx={2}
                                fontS={17}
                                icon="FaRegFolder"
                                className="folder-close-icon"
                            />
                        )}
                        <CText
                            span
                            w="max-content"
                            title={folder.name}
                            className="sb-folder-name"
                        >
                            {folder.name}
                        </CText>
                    </CBox>
                </Element>
            );
        }
    },
)((_, { ChocoShade, chocoColor }) => {
    const { color } = useLayout();
    return {
        mb: 1,
        py: 1,
        px: 1.5,
        dp: 'f',
        ai: 'c',
        borR: 1,
        cur: 'p',
        clr: 'primaryText',
        ':hover': {
            bgClr: new ChocoShade(chocoColor.get(color))[6], // 'secondary-6',
        },
        '&.active-list-item': {
            bgClr: new ChocoShade(chocoColor.get(color))[8], // 'secondary-8',
            ':hover': {
                bgClr: new ChocoShade(chocoColor.get(color))[2], //'secondary-2',
            },
        },
    };
});
