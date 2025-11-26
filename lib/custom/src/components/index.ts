//-Path: "react-choco-ui/lib/custom/src/components/index.ts"
import { CDialog } from './template/CDialog';
import { CIcon } from './template/CIcon';
import { CList } from './template/CList';
import { CUploadFile } from './template/CUploadFile';

// Media components
import { CAudio } from './template/media/CAudio';
import { CIframe } from './template/media/CIframe';
import { CImage } from './template/media/CImage';
import { CVideo } from './template/media/CVideo';

// Custom components
import { COverlay } from './custom/COverlay';

// Test components
import { CAlert } from './test/CAlert';
import { CAvatar } from './test/CAvatar';
import { CBadge } from './test/CBadge';
import { CBreadcrumbs } from './test/CBreadcrumbs';
import { CChip } from './test/CChip';
import { CContainer } from './test/CContainer';
import { CDrawer } from './test/CDrawer';
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

// UI components
import { CBox } from './ui/CBox';
import { CButton } from './ui/CButton';
import { CCheckbox } from './ui/CCheckbox';
import { CIconButton } from './ui/CIconButton';
import { CLabel } from './ui/CLabel';
import { CPaper } from './ui/CPaper';
import { CProgress } from './ui/CProgress';
import { CText } from './ui/CText';

/** ChocoComponents */
const C = {
    // Template Components
    Dialog: CDialog,
    Icon: CIcon,
    List: CList,
    UploadFile: CUploadFile,

    // Media Components
    Audio: CAudio,
    Iframe: CIframe,
    Image: CImage,
    Video: CVideo,

    // Custom Components
    Overlay: COverlay,

    // Test Components
    Alert: CAlert,
    Avatar: CAvatar,
    Badge: CBadge,
    Breadcrumbs: CBreadcrumbs,
    Chip: CChip,
    Container: CContainer,
    Drawer: CDrawer,
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
    IconButton: CIconButton,
    Label: CLabel,
    Paper: CPaper,
    Progress: CProgress,
    Text: CText,
} as const;

// Export default object
export default C;
