//-Path: "react-choco-ui/lib/dev/src/components/template/fileManager/components/NameInput.tsx"
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';
import { useLayout } from '../../../../hooks/fileManager/context/Layout';

export type NameInputType = ChocoUi.Ui<'textarea'>;

export const NameInput = customUi<NameInputType>(
    'textarea',
    'NameInput',
)(({ ref, Element, restProps: { className, ...restProps } }) => (
    <Element
        ref={ref}
        style={{ resize: 'none', outline: 'none' }}
        className={['rename-file', className].join(' ')}
        {...restProps}
    />
))((_, { chocoColor, ChocoShade }) => {
    const { color, activeLayout } = useLayout();
    return {
        z: 1,
        px: 2,
        py: 0.5,
        borR: 2,
        pos: 'r',
        bgClr: null,
        clr: 'primaryText',
        whiteSpace: 'none',
        fieldSizing: 'content',
        maxW: '-webkit-fill-available',
        ta: activeLayout === 'grid' ? 'c' : 'l',
        ofy: activeLayout === 'grid' ? 'a' : 'h',
        ovx: activeLayout === 'grid' ? 'h' : 'a',
        minW: activeLayout === 'grid' ? '69%' : '15%',
        br: { width: 0.5, color: new ChocoShade(chocoColor.get(color))[8] },
    };
});
