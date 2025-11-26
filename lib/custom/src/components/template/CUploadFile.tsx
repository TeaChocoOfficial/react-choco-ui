//-Path: "react-choco-ui/lib/src/components/template/CUploadFile.tsx"
import { CLabel, CLabelType } from '../ui/CLabel';
import { CButton, CButtonType } from '../ui/CButton';
import { ChocoUi, customUi } from '@teachoco-official/react-choco-base';

export type CUploadFileType = ChocoUi.Ui<
    'input',
    {
        id: string;
        labelProps?: CLabelType['Prop'];
        buttonProps?: CButtonType['Prop'];
    }
>;

export const CUploadFile = customUi<CUploadFileType>(
    'input',
    'CUploadFile',
)(
    ({
        ref,
        Element,
        props: { fullW },
        restProps: { id, children, labelProps, buttonProps, ...restProps },
    }) => (
        <CButton color="info" borW={0} p={0} fullW={fullW} {...buttonProps}>
            <CLabel
                curP
                py={3}
                px={5}
                dInlineB
                htmlFor={id}
                fullW={fullW}
                {...labelProps}
            >
                {children}
            </CLabel>
            <Element ref={ref} id={id} multiple type="file" {...restProps} />
        </CButton>
    ),
)({ dp: 'n' });
