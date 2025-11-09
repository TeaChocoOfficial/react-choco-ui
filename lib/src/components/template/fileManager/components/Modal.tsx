//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Modal.tsx"
import './Modal.scss';
import { useEffect } from 'react';
import { ChocoUi } from '$Type/Choco';
import { SetState } from '$Type/Type';
import { createUi } from '$/custom/test/createUi';
import { CIcon } from '$Compo/template/CIcon';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

export type ModalType = ChocoUi.Ui<
    'dialog',
    {
        show?: boolean;
        setShow: SetState<boolean>;
        heading?: React.ReactNode;
        children?: React.ReactNode;
        dialogWidth?: string | number;
        closeButton?: boolean;
    }
>;

export const Modal = createUi<ModalType>(
    (
        {
            show,
            setShow,
            heading,
            children,
            dialogWidth = '25%',
            closeButton = true,
            ...props
        },
        ref,
    ) => {
        const t = useTranslation();

        const handleKeyDown: React.KeyboardEventHandler<HTMLDialogElement> = (
            event,
        ) => {
            if (event.key === 'Escape') setShow(false);
        };

        useEffect(() => {
            console.log(ref);

            if (show) {
                ref?.current?.showModal();
            } else {
                ref?.current?.close();
            }
        }, [ref, show]);

        return (
            <dialog
                ref={ref}
                onKeyDown={handleKeyDown}
                className={`fm-modal dialog`}
                style={{ width: dialogWidth }}
                {...props}
            >
                <div className="fm-modal-header">
                    <span className="fm-modal-heading">{heading}</span>
                    {closeButton && (
                        <CIcon
                            size={18}
                            icon="MdClose"
                            title={t('close')}
                            className="close-icon"
                            onClick={() => setShow(false)}
                        />
                    )}
                </div>
                {children}
            </dialog>
        );
    },
);
