//-Path: "react-choco-ui/lib/src/components/template/fileManager/CFilesHeader.tsx"
import { UiTypes } from '$Type/ui';
import { useMemo, useState } from 'react';
import { createUi } from '$/custom/test/createUi';
import { CCheckbox } from '$Compo/ui/CCheckbox';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

export type CFilesHeaderType = UiTypes<
    'div',
    {
        onSort: (key: string) => void;
        sortConfig: FileManager.SortConfig;
        unselectFiles: () => void;
    }
>;

export const CFilesHeader = createUi<CFilesHeaderType>(
    ({ onSort, sortConfig, unselectFiles }, ref) => {
        const t = useTranslation();
        const { currentPathFiles } = useFileNavigation();
        const [showSelectAll, setShowSelectAll] = useState(false);
        const { selectedFiles, setSelectedFiles } = useSelection();

        const allFilesSelected = useMemo(() => {
            return (
                currentPathFiles.length > 0 &&
                selectedFiles.length === currentPathFiles.length
            );
        }, [selectedFiles, currentPathFiles]);

        const handleSelectAll: React.ChangeEventHandler<HTMLInputElement> = (
            event,
        ) => {
            if (event.target.checked) {
                setSelectedFiles(currentPathFiles);
                setShowSelectAll(true);
            } else {
                unselectFiles();
            }
        };

        const handleSort = (key: string) => {
            if (onSort) onSort(key);
        };

        return (
            <div
                ref={ref}
                className="files-header"
                onMouseOver={() => setShowSelectAll(true)}
                onMouseLeave={() => setShowSelectAll(false)}
            >
                <div className="file-select-all">
                    {(showSelectAll || allFilesSelected) && (
                        <CCheckbox
                            id="selectAll"
                            title="Select all"
                            checked={allFilesSelected}
                            onChange={handleSelectAll}
                            disabled={currentPathFiles.length === 0}
                        />
                    )}
                </div>
                <div
                    className={`file-name ${
                        sortConfig?.key === 'name' ? 'active' : ''
                    }`}
                    onClick={() => handleSort('name')}
                >
                    {t('name')}
                    {sortConfig?.key === 'name' && (
                        <span className="sort-indicator">
                            {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                        </span>
                    )}
                </div>
                <div
                    className={`file-date ${
                        sortConfig?.key === 'modified' ? 'active' : ''
                    }`}
                    onClick={() => handleSort('modified')}
                >
                    {t('modified')}
                    {sortConfig?.key === 'modified' && (
                        <span className="sort-indicator">
                            {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                        </span>
                    )}
                </div>
                <div
                    className={`file-size ${
                        sortConfig?.key === 'size' ? 'active' : ''
                    }`}
                    onClick={() => handleSort('size')}
                >
                    {t('size')}
                    {sortConfig?.key === 'size' && (
                        <span className="sort-indicator">
                            {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                        </span>
                    )}
                </div>
            </div>
        );
    },
);
