//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/NavigationPane.tsx"
import './NavigationPane.scss';
import { OBJ } from '$Hook/object';
import { ChocoUi } from '$Type/Choco';
import { FolderTree } from './FolderTree';
import { useEffect, useState } from 'react';
import { customUi } from '$/custom/customUi';
import { useFiles } from '$Hook/fileManager/context/Files';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

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
)(({ props: { icons, onFileOpen } }) => {
    const [foldersTree, setFoldersTree] = useState<FileManager.FileData[]>([]);
    const { files } = useFiles();
    const t = useTranslation();

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
        <div className="sb-folders-list">
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
                <div className="empty-nav-pane">{t('nothingHereYet')}</div>
            )}
        </div>
    );
})();
