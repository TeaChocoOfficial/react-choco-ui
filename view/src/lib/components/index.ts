//-Path: "react-choco-ui/lib/src/components/index.ts"
import { CFileManager } from './template/fileManager/CFileManager';
import { CDialog } from './template/CDialog';
import { CIcon } from './template/CIcon';
import { CSplit } from './template/CSplit';

import { CBox } from './ui/CBox';
import { CButton } from './ui/CButton';
import { CPaper } from './ui/CPaper';

/** ChocoCompoents */
const C = {
    Box: CBox,
    Button: CButton,
    Dialog: CDialog,
    FileManager: CFileManager,
    Paper: CPaper,
    Split: CSplit,
    Icon: CIcon,
};

export default C;
