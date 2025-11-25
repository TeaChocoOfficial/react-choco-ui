//-Path: "react-choco-ui/lib/src/components/template/CDialog.tsx"
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { CPaper, CPaperType } from '../ui/CPaper';
import { COverlay, COverlayType } from '$Compo/custom/COverlay';

export type CDialogType = ChocoUi.Ui<
    typeof CPaper,
    {
        open?: boolean;
        fullScrenn?: boolean;
        overlayProps?: COverlayType['Prop'];
        onClose?: React.MouseEventHandler<HTMLDivElement>;
    },
    CPaperType['Element']
>;

export const CDialog = customUi<CDialogType>(
    CPaper,
    'CDialog',
)(
    ({
        Element,
        restProps: { open, onClose, overlayProps, ...restProps },
        ref,
    }) => (
        <COverlay show={open} onClose={onClose} {...overlayProps}>
            <Element ref={ref} {...restProps} />
        </COverlay>
    ),
)(({ fullScrenn }) => ({
    z: 'modal',
    screen: fullScrenn ?? undefined,
    borR: fullScrenn ? 0 : undefined,
}));
