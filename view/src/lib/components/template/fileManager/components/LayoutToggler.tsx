//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/LayoutToggler.tsx"
import { ChocoUi } from '$Type/Choco';
import { SetState } from '$Type/Type';
import { createUi } from '$/custom/test/createUi';
import { CIcon } from '$Compo/template/CIcon';
import { FileManager } from '$Hook/fileManager/fileManager';
import { useLayout } from '$Hook/fileManager/context/Layout';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';
import { useDetectOutsideClick } from '$Hook/fileManager/hook/useDetectOutsideClick';

export type LayoutTogglerType = ChocoUi.Ui<
    'div',
    {
        setShowToggleViewMenu: SetState<boolean>;
        onLayoutChange?: (key: FileManager.LayoutType) => void;
    }
>;

export const LayoutToggler = createUi<LayoutTogglerType>(
    ({ setShowToggleViewMenu, onLayoutChange }, ref) => {
        const toggleViewRef = useDetectOutsideClick<HTMLDivElement>(() => {
            setShowToggleViewMenu(false);
        }, ref);
        const { activeLayout, setActiveLayout } = useLayout();
        const t = useTranslation();

        const layoutOptions: FileManager.LayoutOption[] = [
            {
                key: 'grid',
                name: t('grid'),
                icon: <CIcon icon="BsGridFill" size={18} />,
            },
            {
                key: 'list',
                name: t('list'),
                icon: <CIcon icon="FaListUl" size={18} />,
            },
        ];

        const handleSelection = (key: FileManager.LayoutType) => {
            setActiveLayout(key);
            onLayoutChange?.(key);
            setShowToggleViewMenu(false);
        };

        return (
            <div
                ref={toggleViewRef.ref}
                role="dropdown"
                className="toggle-view"
            >
                <ul role="menu" aria-orientation="vertical">
                    {layoutOptions.map((option) => (
                        <li
                            role="menuitem"
                            key={option.key}
                            onClick={() => handleSelection(option.key)}
                            onKeyDown={() => handleSelection(option.key)}
                        >
                            <span>
                                {option.key === activeLayout && (
                                    <CIcon icon="FaCheck" size={13} />
                                )}
                            </span>
                            <span>{option.icon}</span>
                            <span>{option.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
    'LayoutToggler',
);
