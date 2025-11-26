//-Path: "react-choco-ui/lib/src/components/index.ts"
import { CFPSDisplay } from './custom/CFPSDisplay';

import { CBreadCrumb } from './template/fileManager/CBreadCrumb';
import { CFileItem } from './template/fileManager/CFileItem';
import { CFileList } from './template/fileManager/CFileList';
import { CFileManager } from './template/fileManager/CFileManager';
import { CFilesHeader } from './template/fileManager/CFilesHeader';
import { CCollapse } from './template/CCollapse';
import { CSplit } from './template/CSplit';

/** ChocoComponents */
const C = {
    // Custom
    FPSDisplay: CFPSDisplay,

    // Template - File Manager
    BreadCrumb: CBreadCrumb,
    FileItem: CFileItem,
    FileList: CFileList,
    FileManager: CFileManager,
    FilesHeader: CFilesHeader,

    // Template
    Collapse: CCollapse,
    Split: CSplit,
} as const;

export default C;
