//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Modal.tsx"
// import './Modal.scss';
import { CBox } from '$Compo/ui/CBox';
import { ChocoUi } from '$Type/Choco';
import { SetState } from '$Type/Type';
import { CText } from '$Compo/ui/CText';
import { customUi } from '$/custom/customUi';
import { CIcon } from '$Compo/template/CIcon';
import { CGlobal } from '$Compo/config/CGlobal';
import { CDialog, CDialogType } from '$Compo/template/CDialog';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

export type ModalType = ChocoUi.Ui<
    typeof CDialog,
    {
        show?: boolean;
        setShow: SetState<boolean>;
        heading?: React.ReactNode;
        children?: React.ReactNode;
        dialogWidth?: string | number;
        closeButton?: boolean;
    },
    CDialogType['Element']
>;

export const Modal = customUi<ModalType>(
    CDialog,
    'Modal',
)(
    ({
        ref,
        Element,
        props: {
            show,
            setShow,
            heading,
            children,
            dialogWidth = '25%',
            closeButton = true,
            ...props
        },
    }) => {
        const t = useTranslation();

        const handleKeyDown: React.KeyboardEventHandler<
            CDialogType['Element']
        > = (event) => {
            if (event.key === 'Escape') setShow(false);
        };

        return (
            <>
                <CGlobal
                    cs={{
                        '@keyframes expand': {
                            '0%': {
                                trans: 'scale(0)',
                            },
                            '100%': {
                                trans: 'scale(1)',
                            },
                        },
                    }}
                />

                <Element
                    ref={ref}
                    open={show}
                    onKeyDown={handleKeyDown}
                    className={`fm-modal dialog`}
                    style={{
                        minWidth: dialogWidth,
                        animation: 'expand 0.4s forwards',
                    }}
                    {...props}
                >
                    <CBox
                        dFlex
                        px={1}
                        py={0.5}
                        aiCenter
                        jcBetween
                        brB={{
                            width: 0.5,
                            color: 'primary',
                        }}
                        className="fm-modal-header"
                    >
                        <CText
                            m={0}
                            tag="span"
                            fontW="bold"
                            className="fm-modal-heading"
                        >
                            {heading}
                        </CText>
                        {closeButton && (
                            <CIcon
                                fontS={18}
                                clr="error"
                                icon="MdClose"
                                title={t('close')}
                                className="close-icon"
                                onClick={() => setShow(false)}
                            />
                        )}
                    </CBox>
                    {children}
                </Element>
            </>
        );
    },
)();
