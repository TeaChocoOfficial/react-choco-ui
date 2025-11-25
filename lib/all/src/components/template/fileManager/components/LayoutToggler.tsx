//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/LayoutToggler.tsx"
import { ChocoUi } from '$Type/Choco';
import { SetState } from '$Type/Type';
import { CText } from '$Compo/ui/CText';
import { customUi } from '$/custom/customUi';
import { CIcon } from '$Compo/template/CIcon';
import { CList } from '$Compo/template/CList';
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

export const LayoutToggler = customUi<LayoutTogglerType>(
    'div',
    'LayoutToggler',
)(({ ref, Element, props: { setShowToggleViewMenu, onLayoutChange } }) => {
    const toggleViewRef = useDetectOutsideClick<HTMLDivElement>(() => {
        setShowToggleViewMenu(false);
    }, ref);
    const t = useTranslation();
    const { activeLayout, setActiveLayout } = useLayout();

    const layoutOptions: FileManager.LayoutOption[] = [
        {
            key: 'grid',
            name: t('grid'),
            icon: <CIcon icon="BsGridFill" fontS={18} />,
        },
        {
            key: 'list',
            name: t('list'),
            icon: <CIcon icon="FaListUl" fontS={18} />,
        },
    ];

    const handleSelection = (key: FileManager.LayoutType) => {
        setActiveLayout(key);
        onLayoutChange?.(key);
        setShowToggleViewMenu(false);
    };

    return (
        <Element
            ref={toggleViewRef.ref}
            role="dropdown"
            className="toggle-view"
        >
            <CList
                g={1}
                dFlex
                column
                my={0.5}
                role="menu"
                aria-orientation="vertical"
            >
                {layoutOptions.map((option) => (
                    <CList.Item
                        curP
                        dFlex
                        g={2}
                        px={3}
                        py={2}
                        aiCenter
                        cs={{
                            ':hover': { bgClr: 'paper-1' },
                        }}
                        role="menuitem"
                        key={option.key}
                        onClick={() => handleSelection(option.key)}
                        onKeyDown={() => handleSelection(option.key)}
                    >
                        <CText span w={14}>
                            {option.key === activeLayout && (
                                <CIcon icon="FaCheck" fontS={13} />
                            )}
                        </CText>
                        <CText span>{option.icon}</CText>
                        <CText span>{option.name}</CText>
                    </CList.Item>
                ))}
            </CList>
        </Element>
    );
})({
    z: 3,
    m: 0,
    borR: 2,
    pos: 'a',
    r: '20%',
    t: '100%',
    bgClr: 'paper-3',
    br: { color: 'paper-6' },
});
