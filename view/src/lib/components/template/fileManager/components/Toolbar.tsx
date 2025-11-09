//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Toolbar.tsx"
import './Toolbar.scss';
import { useState } from 'react';
import { ChocoUi } from '$Type/Choco';
import { createUi } from '$/custom/test/createUi';
import { CIcon } from '$Compo/template/CIcon';
import { LayoutToggler } from './LayoutToggler';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { useSelection } from '$Hook/fileManager/context/Selection';
import { useClipBoard } from '$Hook/fileManager/context/Clipboard';
import { useFileNavigation } from '$Hook/fileManager/context/FileNavigation';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

export type ToolbarType = ChocoUi.Ui<
    'div',
    {
        onRefresh?: () => void;
        permissions: FileManager.Permissions;
        triggerAction: FileManager.TriggerAction;
        onLayoutChange?: (key: FileManager.LayoutType) => void;
    }
>;

export const Toolbar = createUi<ToolbarType>(
    ({ onLayoutChange, onRefresh, triggerAction, permissions }, ref) => {
        const [showToggleViewMenu, setShowToggleViewMenu] = useState(false);
        const { currentFolder } = useFileNavigation();
        const { selectedFiles, setSelectedFiles, handleDownload } =
            useSelection();
        const { clipBoard, setClipBoard, handleCutCopy, handlePasting } =
            useClipBoard();
        const { activeLayout } = useLayout();
        const t = useTranslation();

        // Toolbar Items
        const toolbarLeftItems = [
            {
                icon: (
                    <CIcon
                        size={17}
                        icon="BsFolderPlus"
                        style={{ strokeWidth: 0.3 }}
                    />
                ),
                text: t('newFolder'),
                permission: permissions.create,
                onClick: () => triggerAction.show('createFolder'),
            },
            {
                icon: <CIcon icon="MdOutlineFileUpload" size={18} />,
                text: t('upload'),
                permission: permissions.upload,
                onClick: () => triggerAction.show('uploadFile'),
            },
            {
                icon: <CIcon icon="FaRegPaste" size={18} />,
                text: t('paste'),
                permission: !!clipBoard,
                onClick: handleFilePasting,
            },
        ];

        const toolbarRightItems = [
            {
                icon:
                    activeLayout === 'grid' ? (
                        <CIcon icon="BsGridFill" size={16} />
                    ) : (
                        <CIcon icon="FaListUl" size={16} />
                    ),
                title: t('changeView'),
                onClick: () => setShowToggleViewMenu((prev) => !prev),
            },
            {
                icon: <CIcon icon="FiRefreshCw" size={16} />,
                title: t('refresh'),
                onClick: () => {
                    FileManager.validateApiCallback(onRefresh, 'onRefresh');
                    setClipBoard(null);
                },
            },
        ];

        function handleFilePasting() {
            handlePasting(currentFolder);
        }

        const handleDownloadItems = () => {
            handleDownload();
            setSelectedFiles([]);
        };

        // Selected File/Folder Actions
        if (selectedFiles.length > 0) {
            return (
                <div ref={ref} className="toolbar file-selected">
                    <div className="file-action-container">
                        <div>
                            {permissions.move && (
                                <button
                                    className="item-action file-action"
                                    onClick={() => handleCutCopy(true)}
                                >
                                    <CIcon icon="BsScissors" size={18} />
                                    <span>{t('cut')}</span>
                                </button>
                            )}
                            {permissions.copy && (
                                <button
                                    className="item-action file-action"
                                    onClick={() => handleCutCopy(false)}
                                >
                                    <CIcon
                                        size={17}
                                        icon="BsCopy"
                                        style={{ strokeWidth: 0.1 }}
                                    />
                                    <span>{t('copy')}</span>
                                </button>
                            )}
                            {(clipBoard?.files?.length ?? 0) > 0 && (
                                <button
                                    className="item-action file-action"
                                    onClick={handleFilePasting}
                                    // disabled={!clipBoard}
                                >
                                    <CIcon icon="FaRegPaste" size={18} />
                                    <span>{t('paste')}</span>
                                </button>
                            )}
                            {selectedFiles.length === 1 &&
                                permissions.rename && (
                                    <button
                                        className="item-action file-action"
                                        onClick={() =>
                                            triggerAction.show('rename')
                                        }
                                    >
                                        <CIcon icon="BiRename" size={19} />
                                        <span>{t('rename')}</span>
                                    </button>
                                )}
                            {permissions.download && (
                                <button
                                    className="item-action file-action"
                                    onClick={handleDownloadItems}
                                >
                                    <CIcon
                                        size={19}
                                        icon="MdOutlineFileDownload"
                                    />
                                    <span>{t('download')}</span>
                                </button>
                            )}
                            {permissions.delete && (
                                <button
                                    className="item-action file-action"
                                    onClick={() => triggerAction.show('delete')}
                                >
                                    <CIcon size={19} icon="MdOutlineDelete" />
                                    <span>{t('delete')}</span>
                                </button>
                            )}
                        </div>
                        <button
                            className="item-action file-action"
                            title={t('clearSelection')}
                            onClick={() => setSelectedFiles([])}
                        >
                            <span>
                                {selectedFiles.length}{' '}
                                {t(
                                    selectedFiles.length > 1
                                        ? 'itemsSelected'
                                        : 'itemSelected',
                                )}
                            </span>
                            <CIcon icon="MdClear" size={18} />
                        </button>
                    </div>
                </div>
            );
        }
        //

        return (
            <div ref={ref} className="toolbar">
                <div className="fm-toolbar">
                    <div>
                        {toolbarLeftItems
                            .filter((item) => item.permission)
                            .map((item, index) => (
                                <button
                                    className="item-action"
                                    key={index}
                                    onClick={item.onClick}
                                >
                                    {item.icon}
                                    <span>{item.text}</span>
                                </button>
                            ))}
                    </div>
                    <div>
                        {toolbarRightItems.map((item, index) => (
                            <div key={index} className="toolbar-left-items">
                                <button
                                    className="item-action icon-only"
                                    title={item.title}
                                    onClick={item.onClick}
                                >
                                    {item.icon}
                                </button>
                                {index !== toolbarRightItems.length - 1 && (
                                    <div className="item-separator"></div>
                                )}
                            </div>
                        ))}

                        {showToggleViewMenu && (
                            <LayoutToggler
                                setShowToggleViewMenu={setShowToggleViewMenu}
                                onLayoutChange={onLayoutChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    },
    'Toolbar',
);
