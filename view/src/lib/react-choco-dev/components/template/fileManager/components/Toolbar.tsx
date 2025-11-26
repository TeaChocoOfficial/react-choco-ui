//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/components/Toolbar.tsx"
import { useState } from 'react';
import {
    CBox,
    CIcon,
    CText,
    CButton,
    CIconButton,
} from '@teachoco-official/react-choco-custom';
import { LayoutToggler } from './LayoutToggler';
import { FileManager } from '../../../../hooks/fileManager/fileManager';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';
import { useLayout } from '../../../../hooks/fileManager/context/Layout';
import { useSelection } from '../../../../hooks/fileManager/context/Selection';
import { useClipBoard } from '../../../../hooks/fileManager/context/Clipboard';
import { useFileNavigation } from '../../../../hooks/fileManager/context/FileNavigation';
import { useTranslation } from '../../../../hooks/fileManager/context/TranslationProvider';
import { useTriggerActionContext } from '../../../../hooks/fileManager/context/TriggerAction';

export type ToolbarType = ChocoUi.Ui<
    'div',
    {
        onRefresh?: () => void;
        permissions: FileManager.Permissions;
        // triggerAction: FileManager.TriggerAction;
        onLayoutChange?: (key: FileManager.LayoutType) => void;
    }
>;

export const Toolbar = customUi<ToolbarType>(
    'div',
    'Toolbar',
)(
    ({
        ref,
        Element,
        props: {
            onRefresh,
            permissions,
            // triggerAction,
            onLayoutChange,
        },
    }) => {
        const t = useTranslation();
        const { activeLayout } = useLayout();
        const { currentFolder } = useFileNavigation();
        const triggerAction = useTriggerActionContext();
        const [showToggleViewMenu, setShowToggleViewMenu] = useState(false);
        const { clipBoard, setClipBoard, handleCutCopy, handlePasting } =
            useClipBoard();
        const { selectedFiles, setSelectedFiles, handleDownload } =
            useSelection();

        const handleFilePasting = () => handlePasting(currentFolder);

        const handleDownloadItems = () => {
            handleDownload();
            setSelectedFiles([]);
        };

        // Toolbar Items
        const toolbarLeftItems = [
            {
                icon: (
                    <CIcon
                        fontS={17}
                        icon="BsFolderPlus"
                        style={{ strokeWidth: 0.3 }}
                    />
                ),
                text: t('newFolder'),
                permission: permissions.create,
                onClick: () => triggerAction.show('createFolder'),
            },
            {
                icon: <CIcon icon="MdOutlineFileUpload" fontS={18} />,
                text: t('upload'),
                permission: permissions.upload,
                onClick: () => triggerAction.show('uploadFile'),
            },
            {
                icon: <CIcon icon="FaRegPaste" fontS={18} />,
                text: t('paste'),
                permission: !!clipBoard,
                onClick: handleFilePasting,
            },
        ];

        const toolbarRightItems = [
            {
                icon:
                    activeLayout === 'grid' ? (
                        <CIcon icon="BsGridFill" fontS={16} />
                    ) : (
                        <CIcon icon="FaListUl" fontS={16} />
                    ),
                title: t('changeView'),
                onClick: () => setShowToggleViewMenu((prev) => !prev),
            },
            {
                icon: <CIcon icon="FiRefreshCw" fontS={16} />,
                title: t('refresh'),
                onClick: () => {
                    FileManager.validateApiCallback(onRefresh, 'onRefresh');
                    setClipBoard(null);
                },
            },
        ];

        // Selected File/Folder Actions
        if (selectedFiles.length > 0) {
            return (
                <Element ref={ref} className="toolbar file-selected">
                    <CBox dFlex jcBetween className="file-action-container">
                        <CBox dFlex>
                            {permissions.move && (
                                <CButton
                                    text
                                    g={2}
                                    color="paperText"
                                    className="item-action file-action"
                                    onClick={() => handleCutCopy(true)}
                                >
                                    <CIcon icon="BsScissors" fontS={18} />
                                    <CText span>{t('cut')}</CText>
                                </CButton>
                            )}
                            {permissions.copy && (
                                <CButton
                                    text
                                    g={2}
                                    color="paperText"
                                    className="item-action file-action"
                                    onClick={() => handleCutCopy(false)}
                                >
                                    <CIcon
                                        fontS={17}
                                        icon="BsCopy"
                                        style={{ strokeWidth: 0.1 }}
                                    />
                                    <CText span>{t('copy')}</CText>
                                </CButton>
                            )}
                            {(clipBoard?.files?.length ?? 0) > 0 && (
                                <CButton
                                    text
                                    g={2}
                                    color="paperText"
                                    className="item-action file-action"
                                    onClick={handleFilePasting}
                                    // disabled={!clipBoard}
                                >
                                    <CIcon icon="FaRegPaste" fontS={18} />
                                    <CText span>{t('paste')}</CText>
                                </CButton>
                            )}
                            {selectedFiles.length === 1 &&
                                permissions.rename && (
                                    <CButton
                                        text
                                        g={2}
                                        color="paperText"
                                        className="item-action file-action"
                                        onClick={() =>
                                            triggerAction.show('rename')
                                        }
                                    >
                                        <CIcon icon="BiRename" fontS={19} />
                                        <CText span>{t('rename')}</CText>
                                    </CButton>
                                )}
                            {permissions.download && (
                                <CButton
                                    text
                                    g={2}
                                    color="paperText"
                                    className="item-action file-action"
                                    onClick={handleDownloadItems}
                                >
                                    <CIcon
                                        fontS={19}
                                        icon="MdOutlineFileDownload"
                                    />
                                    <CText span>{t('download')}</CText>
                                </CButton>
                            )}
                            {permissions.delete && (
                                <CButton
                                    text
                                    g={2}
                                    color="paperText"
                                    className="item-action file-action"
                                    onClick={() => triggerAction.show('delete')}
                                >
                                    <CIcon fontS={19} icon="MdOutlineDelete" />
                                    <CText span>{t('delete')}</CText>
                                </CButton>
                            )}
                        </CBox>
                        <CButton
                            text
                            g={2}
                            color="paperText"
                            className="item-action file-action"
                            title={t('clearSelection')}
                            onClick={() => setSelectedFiles([])}
                        >
                            <CText span>
                                {selectedFiles.length}{' '}
                                {t(
                                    selectedFiles.length > 1
                                        ? 'itemsSelected'
                                        : 'itemSelected',
                                )}
                            </CText>
                            <CIcon icon="MdClear" fontS={18} />
                        </CButton>
                    </CBox>
                </Element>
            );
        }
        //

        return (
            <Element ref={ref} className="toolbar">
                <CBox dFlex aiCenter jcBetween className="fm-toolbar">
                    <CBox dFlex posR>
                        {toolbarLeftItems
                            .filter((item) => item.permission)
                            .map((item, index) => (
                                <CButton
                                    key={index}
                                    text
                                    g={2}
                                    color="paperText"
                                    onClick={item.onClick}
                                    className="item-action"
                                >
                                    {item.icon}
                                    <CText span>{item.text}</CText>
                                </CButton>
                            ))}
                    </CBox>
                    <CBox posR dFlex>
                        {toolbarRightItems.map((item, index) => (
                            <CBox
                                key={index}
                                posR
                                dFlex
                                className="toolbar-left-items"
                            >
                                <CIconButton
                                    title={item.title}
                                    onClick={item.onClick}
                                    className="item-action icon-only"
                                >
                                    {item.icon}
                                </CIconButton>
                                {index !== toolbarRightItems.length - 1 && (
                                    <CBox
                                        posR
                                        dFlex
                                        w={1}
                                        h={36}
                                        mx={1}
                                        bgClr="primary"
                                        className="item-separator"
                                    />
                                )}
                            </CBox>
                        ))}

                        {showToggleViewMenu && (
                            <LayoutToggler
                                setShowToggleViewMenu={setShowToggleViewMenu}
                                onLayoutChange={onLayoutChange}
                            />
                        )}
                    </CBox>
                </CBox>
            </Element>
        );
    },
)(() => {
    const { selectedFiles } = useSelection();
    return {
        py: 1,
        px: 2,
        brB: { width: 0.25, color: 'primary' },
        bgClr: selectedFiles.length > 0 ? 'rgb(0, 0, 0, 0.05)' : undefined,
    };
});
