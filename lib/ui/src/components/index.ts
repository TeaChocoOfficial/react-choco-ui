//-Path: "react-choco-ui/lib/src/components/index.ts"
import { CActivity } from './config/CActivity';
import { CGlobal } from './config/CGlobal';

import { CFPSDisplay } from './custom/CFPSDisplay';

import { CBreadCrumb } from './template/fileManager/CBreadCrumb';
import { CFileItem } from './template/fileManager/CFileItem';
import { CFileList } from './template/fileManager/CFileList';
import { CFileManager } from './template/fileManager/CFileManager';
import { CFilesHeader } from './template/fileManager/CFilesHeader';
import { CCollapse } from './template/CCollapse';
import { CDialog } from './template/CDialog';
import { CIcon } from './template/CIcon';
import { CList } from './template/CList';
import { CSplit } from './template/CSplit';

import { CAlert } from './test/CAlert';
import { CAvatar } from './test/CAvatar';
import { CBadge } from './test/CBadge';
import { CBreadcrumbs } from './test/CBreadcrumbs';
import { CChip } from './test/CChip';
import { CContainer } from './test/CContainer';
import { CDrawer } from './test/CDrawer';
import { CIconButton } from './ui/CIconButton';
import { CImage } from './template/media/CImage';
import { CInput } from './test/CInput';
import { CMenu } from './test/CMenu';
import { CNavbar } from './test/CNavbar';
import { CNavigation } from './test/CNavigation';
import { CPagination } from './test/CPagination';
import { CRating } from './test/CRating';
import { CSkeleton } from './test/CSkeleton';
import { CSlider } from './test/CSlider';
import { CSnackbar } from './test/CSnackbar';
import { CStepper } from './test/CStepper';
import { CSwitch } from './test/CSwitch';
import { CTable } from './test/CTable';
import { CTabs } from './test/CTabs';
import { CTextarea } from './test/CTextarea';
import { CTooltip } from './test/CTooltip';

import { CBox } from './ui/CBox';
import { CButton } from './ui/CButton';
import { CCheckbox } from './ui/CCheckbox';
import { CLabel } from './ui/CLabel';
import { CPaper } from './ui/CPaper';
import { CProgress } from './ui/CProgress';
import { CText } from './ui/CText';

/** ChocoComponents */
const C = {
    // Config
    Activity: CActivity,
    Global: CGlobal,

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
    Dialog: CDialog,
    Icon: CIcon,
    List: CList,
    Split: CSplit,

    // Test Components
    Alert: CAlert,
    Avatar: CAvatar,
    Badge: CBadge,
    Breadcrumbs: CBreadcrumbs,
    Chip: CChip,
    Container: CContainer,
    Drawer: CDrawer,
    IconButton: CIconButton,
    Image: CImage,
    Input: CInput,
    Menu: CMenu,
    Navbar: CNavbar,
    Navigation: CNavigation,
    Pagination: CPagination,
    Rating: CRating,
    Skeleton: CSkeleton,
    Slider: CSlider,
    Snackbar: CSnackbar,
    Stepper: CStepper,
    Switch: CSwitch,
    Table: CTable,
    Tabs: CTabs,
    Textarea: CTextarea,
    Tooltip: CTooltip,

    // UI Components
    Box: CBox,
    Button: CButton,
    Checkbox: CCheckbox,
    Label: CLabel,
    Paper: CPaper,
    Progress: CProgress,
    Text: CText,
} as const;

export default C;
