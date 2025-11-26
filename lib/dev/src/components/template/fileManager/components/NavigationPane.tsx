//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/components/NavigationPane.tsx"
import { FolderTree } from './FolderTree';
import { useEffect, useState } from 'react';
import { OBJ } from '../../../../hooks/object';
import { CBox } from '@teachoco-official/react-choco-custom';
import { useFiles } from '../../../../hooks/fileManager/context/Files';
import { FileManager } from '../../../../hooks/fileManager/fileManager';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';
import { useTranslation } from '../../../../hooks/fileManager/context/TranslationProvider';

export type NavigationPaneType = ChocoUi.Ui<
    'div',
    {
        icons?: Map<string, FileManager.IconData>;
        onFileOpen?: (file: FileManager.FileData) => void;
    }
>;

export const NavigationPane = customUi<NavigationPaneType>(
    'div',
    'NavigationPane',
)(({ ref, Element, restProps: { icons, onFileOpen, ...restProps } }) => {
    const t = useTranslation();
    const { files } = useFiles();
    const [foldersTree, setFoldersTree] = useState<FileManager.FileData[]>([]);

    const createChildRecursive = (
        path: string,
        foldersStruct: Record<string, FileManager.FileData[]>,
    ): FileManager.FileData[] => {
        if (!foldersStruct[path]) return []; // No children for this path (folder)
        return (
            foldersStruct[path]?.map((folder) => {
                return {
                    ...folder,
                    subDirectories: createChildRecursive(
                        folder.path ?? '',
                        foldersStruct,
                    ),
                };
            }) || []
        );
    };

    useEffect(() => {
        if (Array.isArray(files)) {
            const folders = files.filter((file) => file.isDirectory);
            // Grouping folders by parent path
            const foldersStruct = OBJ.groupBy(
                folders,
                ({ path }) => `${FileManager.getParentPath(path)}`,
            ) as Record<string, FileManager.FileData[]>;

            setFoldersTree(() => {
                const rootPath = '';
                return createChildRecursive(rootPath, foldersStruct);
            });
        }
    }, [files]);

    return (
        <Element ref={ref} className="sb-folders-list" {...restProps}>
            {foldersTree?.length > 0 ? (
                foldersTree?.map((folder, index) => (
                    <FolderTree
                        key={index}
                        icons={icons}
                        folder={folder}
                        onFileOpen={onFileOpen}
                    />
                ))
            ) : (
                <CBox fullH dFlex jcCenter aiCenter className="empty-nav-pane">
                    {t('nothingHereYet')}
                </CBox>
            )}
        </Element>
    );
})({ mx: 1, fullH: true, ofy: 'a' });
