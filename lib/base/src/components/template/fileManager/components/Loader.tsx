//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Loader.tsx"
// import './Loader.scss';
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { CIcon } from '$Compo/template/CIcon';
import { CGlobal } from '$Compo/config/CGlobal';

export type LoaderType = ChocoUi.Ui<
    'div',
    { upload?: boolean; loading?: boolean }
>;

export const Loader = customUi<LoaderType>(
    'div',
    'Loader',
)(({ Element, props: { upload, loading, className, ...props }, ref }) =>
    loading ? (
        <Element
            ref={ref}
            className={`loader-container ${className}`}
            {...props}
        >
            <CGlobal
                cs={{
                    '@keyframes spin': {
                        '0%': {
                            trans: 'rotate(0deg)',
                        },
                        '100%': {
                            trans: 'rotate(360deg)',
                        },
                    },
                }}
            />
            <CIcon
                icon="ImSpinner2"
                className="spinner"
                fontS={upload ? 16 : 64}
                // clr={upload ? 'black' : 'white'}
                style={{ animation: 'spin 1s linear infinite' }}
            />
        </Element>
    ) : null,
)(({ upload }) => ({
    jc: 'c',
    ai: 'c',
    z: upload ? 0 : 1000,
    dp: upload ? 'b' : 'f',
    pos: upload ? 'r' : 'a',
    wh: '-webkit-fill-available',
    bgClr: upload ? null : 'rgba(0, 0, 0, 0.5)',
}));
