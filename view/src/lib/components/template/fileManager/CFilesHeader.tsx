//-Path: "react-choco-ui/lib/src/components/template/fileManager/CFilesHeader.tsx"
import { CBox } from '$Compo/ui/CBox';
import { ChocoUi } from '$Type/Choco';
import { useMemo, useState } from 'react';
import { customUi } from '$/custom/customUi';
import { CCheckbox } from '$Compo/ui/CCheckbox';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';
import { CText } from '$Compo/ui/CText';
import { useLayout } from '$Hook/fileManager/context/Layout';

export type CFilesHeaderType = ChocoUi.Ui<
    'div',
    {
        onSort: (key: string) => void;
        sortConfig: FileManager.SortConfig;
        unselectFiles: () => void;
    }
>;

export const CFilesHeader = customUi<CFilesHeaderType>(
    'div',
    'CFilesHeader',
)(
    ({
        ref,
        Element,
        restProps: { onSort, sortConfig, unselectFiles, ...restProps },
    }) => {
        const t = useTranslation();
        const { color } = useLayout();
        const { currentPathFiles } = useFileNavigation();
        const [showSelectAll, setShowSelectAll] = useState(false);
        const { selectedFiles, setSelectedFiles } = useSelection();

        const allFilesSelected = useMemo(
            () =>
                currentPathFiles.length > 0 &&
                selectedFiles.length === currentPathFiles.length,
            [selectedFiles, currentPathFiles],
        );

        const handleSelectAll: React.ChangeEventHandler<HTMLInputElement> = (
            event,
        ) => {
            if (event.target.checked) {
                setSelectedFiles(currentPathFiles);
                setShowSelectAll(true);
            } else unselectFiles();
        };

        const handleSort = (key: string) => {
            if (onSort) onSort(key);
        };

        return (
            <Element
                ref={ref}
                className="files-header"
                onMouseOver={() => setShowSelectAll(true)}
                onMouseLeave={() => setShowSelectAll(false)}
                {...restProps}
            >
                <CBox w="2%" className="file-select-all">
                    {(showSelectAll || allFilesSelected) && (
                        <CCheckbox
                            id="selectAll"
                            title="Select all"
                            checked={allFilesSelected}
                            onChange={handleSelectAll}
                            disabled={currentPathFiles.length === 0}
                        />
                    )}
                </CBox>
                <CBox
                    usN
                    curP
                    fullH
                    dFlex
                    pl={8}
                    aiCenter
                    w="calc(70% - 50px)"
                    brL={{ width: 0.25, color: 'primary' }}
                    bgClr={sortConfig?.key === 'name' ? 'paper' : null}
                    clr={sortConfig?.key === 'name' ? color : 'primaryText'}
                    className={`file-name ${
                        sortConfig?.key === 'name' ? 'active' : ''
                    }`}
                    onClick={() => handleSort('name')}
                >
                    {t('name')}
                    {sortConfig?.key === 'name' && (
                        <CText
                            span
                            fontS={0.8}
                            ml={1}
                            className="sort-indicator"
                        >
                            {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                        </CText>
                    )}
                </CBox>
                <CBox
                    usN
                    curP
                    dFlex
                    fullH
                    pl={2}
                    w="20%"
                    aiCenter
                    taCenter
                    brL={{ width: 0.25, color: 'primary' }}
                    bgClr={sortConfig?.key === 'modified' ? 'paper' : null}
                    clr={sortConfig?.key === 'modified' ? color : 'primaryText'}
                    className={`file-date ${
                        sortConfig?.key === 'modified' ? 'active' : ''
                    }`}
                    onClick={() => handleSort('modified')}
                >
                    {t('modified')}
                    {sortConfig?.key === 'modified' && (
                        <CText
                            span
                            fontS={0.8}
                            ml={1}
                            className="sort-indicator"
                        >
                            {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                        </CText>
                    )}
                </CBox>
                <CBox
                    usN
                    curP
                    dFlex
                    fullH
                    pl={2}
                    w="10%"
                    aiCenter
                    brL={{ width: 0.25, color: 'primary' }}
                    bgClr={sortConfig?.key === 'size' ? 'paper' : null}
                    clr={sortConfig?.key === 'size' ? color : 'primaryText'}
                    className={`file-size ${
                        sortConfig?.key === 'size' ? 'active' : ''
                    }`}
                    onClick={() => handleSort('size')}
                >
                    {t('size')}
                    {sortConfig?.key === 'size' && (
                        <CText
                            span
                            fontS={0.8}
                            ml={1}
                            className="sort-indicator"
                        >
                            {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                        </CText>
                    )}
                </CBox>
            </Element>
        );
    },
)((_, { theme }) => ({
    h: theme.font.size.base * 1.5,
    z: 1,
    t: 0,
    px: 2,
    ai: 'c',
    dp: 'f',
    pos: 's',
    fontS: 0.85,
    fontW: 'semibold',
    bgClr: 'common.body-6',
    brB: { width: 0.25, color: 'primary' },
}));
